'use client';

import React, { createContext, useContext, useRef, useCallback, useMemo } from 'react';
import type { Direction } from '../ScrollBar/ScrollBarCmp';
import { getScrollOffset, getScrollRange, getScrollRatio, getScrollVisibleArea, getVisibleRatio } from './ScrollableCmp';

export interface ScrollableContextType {
  registerContainer: (id: string, dir: Direction, el: HTMLDivElement) => void;
  unregisterContainer: (id: string, el: HTMLDivElement) => void;
  containerChanged: (id: string,  dir: Direction, el: HTMLDivElement) => void;
  updateScroll: (id: string, ratio: number, scrollRange: number, source?: HTMLDivElement) => void;
  getContainers: (id: string) => HTMLDivElement[];
  getAuthority: (id: string) => React.RefObject<Authority> | null;
  subscribeScrollbar: (id: string, callback: (ratio: number, scrollRange: number) => void) => () => void;
  subscribeAuthorityListener: (id: string, callback: () => void) => () => void;
}

const ScrollableContext = createContext<ScrollableContextType | null>(null);
export const useScrollableContext = () => {
  const ctx = useContext(ScrollableContext);
  if (!ctx) throw new Error('useScrollableContext must be used within a ScrollableCmp');
  return ctx;
};

export interface ContainerInfo {
  dir: Direction;
}

export interface Container extends ContainerInfo  {
  el: HTMLDivElement;
}


export interface ContainersInfo {
  arr: HTMLDivElement[];
  info: ContainerInfo[];
}

export interface Authority {
  biggestScrollRange: {
    el: React.RefObject<HTMLDivElement>,
    dir: Direction,
    range: number,
  };
  smallestVisibleRatio: {
    el: React.RefObject<HTMLDivElement>,
    dir: Direction,
    ratio: number,
  }
}

export function useScrollableRegistry(): ScrollableContextType {
  const containers = useRef(new Map<string, ContainersInfo>());
  const authorities = useRef(new Map<string, Authority>());
  const scrollbars = useRef(new Map<string, Set<(ratio: number, scrollRange: number) => void>>());
  const authorityListeners = useRef(new Map<string, Set<() => void>>());
  const pendingAuthorityUpdates = useRef(new Set<string>());
  const lock = useRef<Set<HTMLDivElement>>(new Set());

  const getContainers = useCallback((id: string): HTMLDivElement[] => {
      const entry = containers.current.get(id);
      return entry ? entry.arr : [];
    },
    []
  );

  const subscribeScrollbar = useCallback((id: string, cb: (ratio: number, scrollRange: number) => void) => {
    let set = scrollbars.current.get(id);
    if (!set) {
      set = new Set();
      scrollbars.current.set(id, set);
    }
    set.add(cb);

    return () => {
      set!.delete(cb);
      if (set!.size === 0) scrollbars.current.delete(id);
    };
  }, []);

  const subscribeAuthorityListener = useCallback((id: string, callback: () => void) => {
    let subs = authorityListeners.current.get(id);
    if (!subs) {
      subs = new Set();
      authorityListeners.current.set(id, subs);
    }
    subs.add(callback);
    return () => subs!.delete(callback);
  }, []);

  const notifyAuthorityChange = useCallback((id: string) => {
    // If an update for this id is already scheduled this frame, skip
    if (pendingAuthorityUpdates.current.has(id)) return;
    pendingAuthorityUpdates.current.add(id);

    // Schedule notifications at next animation frame
    // this ensure that if many updates happen in the same frame, we only notify once
    requestAnimationFrame(() => {
      const subs = authorityListeners.current.get(id);
      if (subs) {
        subs.forEach((cb) => cb());
      }
      pendingAuthorityUpdates.current.delete(id);
    });
  }, []);

  // --- Compare one element to the current authority ---
  // Returns which metrics (range/ratio) are better.
  const compareWithAuthority = (id: string, el: HTMLDivElement, dir: Direction): { betterRange: boolean; betterRatio: boolean } => {
    const authority = authorities.current.get(id);
    if (!authority) {
      // No authority yet — this element is automatically better for both metrics
      return { betterRange: true, betterRatio: true };
    }

    const newRange = getScrollRange(el, dir);
    const newVisibleRatio = getVisibleRatio(el, dir);

    const authorityRangeEl = authority.biggestScrollRange.el.current;
    const authorityRatioEl = authority.smallestVisibleRatio.el.current;
    if (!authorityRangeEl || !authorityRatioEl) return { betterRange: true, betterRatio: true };
    const currentRange = getScrollRange(authorityRangeEl, authority.biggestScrollRange.dir);
    const currentVisibleRatio = getVisibleRatio(authorityRatioEl, authority.smallestVisibleRatio.dir);

    return {
      betterRange: newRange > currentRange,
      betterRatio: newVisibleRatio < currentVisibleRatio,
    };
  };

  // --- Replace authority for given id if the element is better or if the current authority got worse ---
  const replaceAuthorityIfBetter = (id: string, el: HTMLDivElement, dir: Direction): boolean => {
    let authority = authorities.current.get(id);
    
    // If no authority exists el becomes authority for all metrics
    if (!authority) {
      authority = {
        biggestScrollRange: {
          el: { current: el },
          dir: dir,
          range: getScrollRange(el, dir),
        },
        smallestVisibleRatio: {
          el: { current: el },
          dir: dir,
          ratio: getVisibleRatio(el, dir),
        }
      };
      authorities.current.set(id, authority);
      notifyAuthorityChange(id);
      return true;
    }
    
    if (isAuthority(id, el)) return false;

    let authorityChanged = false;
    
    const { betterRange, betterRatio } = compareWithAuthority(id, el, dir);
    if (betterRange) {
      authority.biggestScrollRange.el = { current: el };
      authority.biggestScrollRange.dir = dir;
      authorityChanged = true;
    }

    if (betterRatio) {
      authority.smallestVisibleRatio.el = { current: el };
      authority.smallestVisibleRatio.dir = dir;
      authorityChanged = true;
    }

    if (authorityChanged) {
      authorities.current.set(id, authority);
      notifyAuthorityChange(id);
    }

    return authorityChanged;
  };

  // --- Set authority by rescanning all containers for a given id ---
  // (used when an authority element changes or degrades)
  const setAuthorityForId = (id: string): boolean => {
    const entry = containers.current.get(id);
    if (!entry || !entry.arr.length) {
      authorities.current.delete(id);
      return false;
    }

    const oldAuthority = authorities.current.get(id);

    let bestRange = -1;
    let bestRatio = Number.MAX_VALUE;
    let bestRangeEl: HTMLDivElement | null = null;
    let bestRatioEl: HTMLDivElement | null = null;
    let bestRangeDir: Direction = 'horizontal';
    let bestRatioDir: Direction = 'horizontal';

    // Find best candidates for both metrics
    for (let i = 0; i < entry.arr.length; i++) {
      const el = entry.arr[i];
      const { dir } = entry.info[i];
      const scrollRange = getScrollRange(el, dir);
      const visibleRatio = getVisibleRatio(el, dir);

      if (scrollRange > bestRange) {
        bestRange = scrollRange;
        bestRangeEl = el;
        bestRangeDir = dir;
      }
      if (visibleRatio < bestRatio) {
        bestRatio = visibleRatio;
        bestRatioEl = el;
        bestRatioDir = dir;
      }
    }

    if (!bestRangeEl || !bestRatioEl) return false;

    // Check if anything actually changed
    const authorityChanged =
      !oldAuthority ||
      bestRangeEl !== oldAuthority.biggestScrollRange.el.current ||
      bestRatioEl !== oldAuthority.smallestVisibleRatio.el.current;

    const geometryChanged =
      Math.abs(bestRange - (oldAuthority?.biggestScrollRange.range ?? 0)) > 1 ||
      Math.abs(bestRatio - (oldAuthority?.smallestVisibleRatio.ratio ?? 0.000001)) > 0.001;

    // Update authority data
    authorities.current.set(id, {
      biggestScrollRange: {
        el: { current: bestRangeEl },
        dir: bestRangeDir,
        range: bestRange,
      },
      smallestVisibleRatio: {
        el: { current: bestRatioEl },
        dir: bestRatioDir,
        ratio: bestRatio,
      },
    });

    // Notify scrollbars if something changed
    if (authorityChanged || geometryChanged) {
      notifyAuthorityChange(id);
      return true;
    }

    return false;
  };

  const getAuthority = useCallback((id: string) => {
    // Try to get the current authority
    let authority = authorities.current.get(id);

    if (!authority) {
      setAuthorityForId(id);
      authority = authorities.current.get(id);
    }

    if (!authority) return null;
    return { current: authority };
  }, []);

  const isAuthority = (id: string, el: HTMLDivElement): boolean => {
    const authority = authorities.current.get(id);
    if (!authority) return false;
    return el === authority.biggestScrollRange.el.current
        || el === authority.smallestVisibleRatio.el.current;
  }

  const registerContainer = useCallback(
    (id: string, dir: Direction, el: HTMLDivElement) => {
      // --- Ensure container entry exists ---
      let existing = containers.current.get(id);
      if (!existing) {
        existing = { arr: [], info: [] };
        containers.current.set(id, existing);
      }

      // --- Add or update container info ---
      const index = existing.arr.indexOf(el);
      if (index === -1) {
        existing.arr.push(el);
        existing.info.push({ dir: dir});
      } else {
        existing.info[index].dir = dir;
      }

      replaceAuthorityIfBetter(id, el, dir);
    },
    []
  );

  const unregisterContainer = useCallback(
    (id: string, el: HTMLDivElement) => {
      const entry = containers.current.get(id);
      if (!entry) return;

      const idx = entry.arr.indexOf(el);
      if (idx === -1) return;

      // --- Remove the element and its info ---
      entry.arr.splice(idx, 1);
      entry.info.splice(idx, 1);

      // --- If no containers remain, clear everything ---
      if (entry.arr.length === 0) {
        containers.current.delete(id);
        authorities.current.delete(id);
        return;
      }

      // --- If the element was an authority, re-evaluate once ---
      const authority = authorities.current.get(id);
      const isAuthorityRemoved =
        authority &&
        (authority.biggestScrollRange.el.current === el ||
          authority.smallestVisibleRatio.el.current === el);

      if (isAuthorityRemoved) {
        setAuthorityForId(id);
      }
    },
    []
  );

  const containerChanged = useCallback((id: string,  dir: Direction, el: HTMLDivElement) => {
    const entry = containers.current.get(id);
    if (!entry) return;

    const authority = authorities.current.get(id);
    if (!authority) return;

    if (isAuthority(id, el)) {
      setAuthorityForId(id);
    } else {
      replaceAuthorityIfBetter(id, el, dir);
    }
  }, []);

  const updateScroll = useCallback(
    (id: string, ratio: number, scrollRange: number, source?: HTMLDivElement) => {
      const entry = containers.current.get(id);
      if (!entry || entry.arr.length === 0) return;

      const authority = authorities.current.get(id);
      if (!authority) return;

      const authRange = getScrollRange(authority.biggestScrollRange.el.current, authority.biggestScrollRange.dir);
      // const globalOffset = ratio * authRange;
      const globalOffset = Math.min(ratio * scrollRange, authRange);

      for (let i = 0; i < entry.arr.length; i++) {
        const el = entry.arr[i];
        const dir = entry.info[i].dir;

        if (!el || el === source || lock.current.has(el)) continue;

        lock.current.add(el);
        (el as any).dataset.__scrollSync = '1';

        const targetRange = getScrollRange(el, dir);
        // const scaledOffset = globalOffset * (targetRange / authRange); // relative sync
        // const target = Math.min(scaledOffset, targetRange);
        const target = Math.min(globalOffset, targetRange); // absoulte sync

        if (dir === 'horizontal') el.scrollLeft = target;
        else el.scrollTop = target;

        requestAnimationFrame(() => {
          delete (el as any).dataset.__scrollSync;
          lock.current.delete(el);
        });
      }

      // --- Notify any subscribed scrollbars ---
      const subs = scrollbars.current.get(id);
      if (subs && subs.size > 0) {
        subs.forEach((cb) => cb(ratio, scrollRange));
      }
    },
    []
  );

  return useMemo(
    () => ({
      registerContainer,
      unregisterContainer,
      containerChanged,
      updateScroll,
      getContainers,
      getAuthority,
      subscribeScrollbar,
      subscribeAuthorityListener,
    }),
    [registerContainer, unregisterContainer, containerChanged, updateScroll, getContainers, getAuthority, subscribeScrollbar, subscribeAuthorityListener]
  );
}

export { ScrollableContext };
