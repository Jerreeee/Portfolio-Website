'use client';

import React, { createContext, useContext, useRef, useCallback, useMemo } from 'react';
import type { Direction } from '../ScrollBar/ScrollBarCmp';
import { getScrollOffset, getScrollRange, getVisibleRatio } from './ScrollableCmp';

export interface ScrollableContextType {
  registerContainer: (id: string, dir: Direction, el: HTMLDivElement) => void;
  unregisterContainer: (id: string, el: HTMLDivElement) => void;
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

export interface ContainersInfo {
  arr: HTMLDivElement[];
  info: ContainerInfo[];
}

export interface Authority {
  biggestRangeEl: React.RefObject<HTMLDivElement>;
  biggestRangeElDir: Direction;
  smallestRatioEl: React.RefObject<HTMLDivElement>;
  smallestRatioElDir: Direction;
}

export function useScrollableRegistry(): ScrollableContextType {
  const containers = useRef(new Map<string, ContainersInfo>());
  const authorities = useRef(new Map<string, Authority>());
  const scrollbars = useRef(new Map<string, Set<(ratio: number, scrollRange: number) => void>>());
  const authorityListeners = useRef(new Map<string, Set<() => void>>());
  const pendingAuthorityUpdates = new Set<string>();
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
    if (pendingAuthorityUpdates.has(id)) return;
    pendingAuthorityUpdates.add(id);

    // Schedule notifications at next animation frame
    // this ensure that if many updates happen in the same frame, we only notify once
    requestAnimationFrame(() => {
      const subs = authorityListeners.current.get(id);
      if (subs) {
        subs.forEach((cb) => cb());
      }
      pendingAuthorityUpdates.delete(id);
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

    const currentRange = getScrollRange(authority.biggestRangeEl.current, authority.biggestRangeElDir);
    const currentVisibleRatio = getVisibleRatio(authority.smallestRatioEl.current, authority.smallestRatioElDir);

    return {
      betterRange: newRange > currentRange,
      betterRatio: newVisibleRatio < currentVisibleRatio,
    };
  };

  // --- Replace authority for given id if the element is better ---
  const replaceAuthorityIfBetter = (id: string, el: HTMLDivElement, dir: Direction) => {
    let authority = authorities.current.get(id);
    const { betterRange, betterRatio } = compareWithAuthority(id, el, dir);

    // Initialize authority if it doesn't exist yet
    if (!authority) {
      authority = {
        biggestRangeEl: { current: el },
        biggestRangeElDir: dir,
        smallestRatioEl: { current: el },
        smallestRatioElDir: dir,
      };
      authorities.current.set(id, authority);
      notifyAuthorityChange(id);
      return;
    }

    if (betterRange) {
      authority.biggestRangeEl = { current: el };
      authority.biggestRangeElDir = dir;
    }

    if (betterRatio) {
      authority.smallestRatioEl = { current: el };
      authority.smallestRatioElDir = dir;
    }

    authorities.current.set(id, authority);
  };

  // --- Set authority by rescanning all containers for a given id ---
  // (used when an authority element is removed)
  const setAuthorityForId = (id: string) => {
    const entry = containers.current.get(id);
    if (!entry || !entry.arr.length) {
      authorities.current.delete(id);
      return;
    }

    let bestRange = -1;
    let bestRatio = Number.MAX_VALUE;
    let bestRangeEl: HTMLDivElement | null = null;
    let bestRatioEl: HTMLDivElement | null = null;
    let bestRangeDir: Direction = 'horizontal';
    let bestRatioDir: Direction = 'horizontal';

    for (let i = 0; i < entry.arr.length; i++) {
      const el = entry.arr[i];
      const { dir } = entry.info[i];
      const range = getScrollRange(el, dir);
      const visibleRatio = getVisibleRatio(el, dir);

      if (range > bestRange) {
        bestRange = range;
        bestRangeEl = el;
        bestRangeDir = dir;
      }
      if (visibleRatio < bestRatio) {
        bestRatio = visibleRatio;
        bestRatioEl = el;
        bestRatioDir = dir;
      }
    }

    if (bestRangeEl && bestRatioEl) {
      authorities.current.set(id, {
        biggestRangeEl: { current: bestRangeEl },
        biggestRangeElDir: bestRangeDir,
        smallestRatioEl: { current: bestRatioEl },
        smallestRatioElDir: bestRatioDir,
      });
      notifyAuthorityChange(id);
    }
  };

  const getAuthority = useCallback((id: string) => {
    // Try to get the current authority
    let authority = authorities.current.get(id);

    if (!authority) {
      // No authority yet, set it
      setAuthorityForId(id);
      authority = authorities.current.get(id);
    }

    if (!authority) return null;
    return { current: authority };
  }, []);

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
        existing.info.push({ dir });
      } else {
        existing.info[index].dir = dir;
      }

      // incremental authority update for each registered container
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
        (authority.biggestRangeEl.current === el ||
          authority.smallestRatioEl.current === el);

      if (isAuthorityRemoved) {
        setAuthorityForId(id);
      }
    },
    []
  );

  const updateScroll = useCallback(
    (id: string, ratio: number, scrollRange: number, source?: HTMLDivElement) => {
      const entry = containers.current.get(id);
      if (!entry || entry.arr.length === 0) return;

      const authority = authorities.current.get(id);
      if (!authority) return;

      const authRange = getScrollRange(authority.biggestRangeEl.current, authority.biggestRangeElDir);
      const globalOffset = ratio * authRange;

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
        subs.forEach((cb) => cb(ratio, scrollRange ?? authRange));
      }
    },
    []
  );

  return useMemo(
    () => ({
      registerContainer,
      unregisterContainer,
      updateScroll,
      getContainers,
      getAuthority,
      subscribeScrollbar,
      subscribeAuthorityListener,
    }),
    [registerContainer, unregisterContainer, updateScroll, getContainers, getAuthority]
  );
}

export { ScrollableContext };
