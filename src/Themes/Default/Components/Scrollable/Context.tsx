'use client';

import React, { createContext, useContext, useRef, useCallback, useMemo } from 'react';
import type { Direction } from '../ScrollBar/ScrollBarCmp';
import { getScrollOffset, getScrollRange } from './ScrollableCmp';

export interface ScrollableContextType {
  registerContainer: (id: string, dir: Direction, el: HTMLDivElement) => void;
  unregisterContainer: (id: string, el: HTMLDivElement) => void;
  updateScroll: (id: string, ratio: number, source?: HTMLDivElement) => void;
  getContainers: (id: string) => HTMLDivElement[];
  getAuthority: (id: string) => React.RefObject<HTMLDivElement> | null;
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
  el: HTMLDivElement;
  dir: Direction;
}

export function useScrollableRegistry(): ScrollableContextType {
  const containers = useRef(new Map<string, ContainersInfo>());
  const authority = useRef(new Map<string, Authority>());
  const lock = useRef<Set<HTMLDivElement>>(new Set());

  const getContainers = useCallback((id: string): HTMLDivElement[] => {
      const entry = containers.current.get(id);
      return entry ? entry.arr : [];
    },
    []
  );

  const chooseAuthority = useCallback((id: string) => {
    const entry = containers.current.get(id);
    if (!entry || !entry.arr.length) return null;

    let best: HTMLDivElement | null = null;
    let bestRange = -1;
    let bestDir: Direction = 'vertical'; // default

    for (let i = 0; i < entry.arr.length; i++) {
      const el = entry.arr[i];
      const { dir } = entry.info[i];
      const range = getScrollRange(el, dir);

      if (range > bestRange) {
        bestRange = range;
        best = el;
        bestDir = dir;
      }
    }

    if (best) authority.current.set(id, { el: best, dir: bestDir });
    return best;
  }, []);

  const getAuthority = useCallback((id: string) => {
    const entry = authority.current.get(id)?.el ?? chooseAuthority(id);
    if (!entry) return null;
    return { current: entry };
  }, [chooseAuthority]);

  const registerContainer = useCallback(
    (id: string, dir: Direction, el: HTMLDivElement) => {
      let existing = containers.current.get(id);

      if (!existing) {
        // first registration for this id
        existing = { arr: [el], info: [{ dir }] };
        containers.current.set(id, existing);
      }

      const index = existing.arr.indexOf(el);
      if (index === -1) {
        existing.arr.push(el);
        existing.info.push({ dir });
      } else { // override existing
        existing.info[index].dir = dir;
      }

      // re-evaluate authority
      chooseAuthority(id);
    },
    [chooseAuthority]
  );

  const unregisterContainer = useCallback(
    (id: string, el: HTMLDivElement) => {
      const entry = containers.current.get(id);
      if (!entry) return;

      const idx = entry.arr.findIndex(
        (e, i) => e === el
      );
      if (idx === -1) return;

      // remove the element + its info in place
      entry.arr.splice(idx, 1);
      entry.info.splice(idx, 1);

      if (entry.arr.length === 0) {
        containers.current.delete(id);
        authority.current.delete(id);
      } else {
        // re-evaluate authority
        chooseAuthority(id);
      }
    },
    [chooseAuthority]
  );

  const updateScroll = useCallback(
    (id: string, ratio: number, source?: HTMLDivElement) => {
      const entry = containers.current.get(id);
      if (!entry || entry.arr.length === 0) {
        console.warn(`[updateScroll:${id}] No containers registered`);
        return;
      }

      const auth = authority.current.get(id);
      if (!auth) {
        console.warn(`[updateScroll:${id}] No authority found`);
        return;
      }

      const { el: authEl, dir: authDir } = auth;

      // --- DEBUG: print all scroll ranges ---
      console.groupCollapsed(`[updateScroll:${id}] (${authDir.toUpperCase()})`);
      entry.arr.forEach((el, i) => {
        const d = entry.info[i].dir;
        const scrollRange =
          d === 'horizontal'
            ? el.scrollWidth - el.clientWidth
            : el.scrollHeight - el.clientHeight;
        const currentOffset =
          d === 'horizontal' ? el.scrollLeft : el.scrollTop;
        console.log(`Container #${i}`, {
          element: el,
          scrollRange,
          currentOffset,
          isAuthority: el === authEl,
          isSource: el === source,
          dir: d,
        });
      });

      // --- Determine globalOffset from source or ratio ---
      let globalOffset: number;
      const authRange = getScrollRange(authEl, authDir);

      if (source) { // Triggered from a Group
        const sourceIdx = entry.arr.indexOf(source);
        if (sourceIdx === -1) return;

        const srcDir = entry.info[sourceIdx].dir;
        const srcRange = getScrollRange(source, srcDir);
        const srcOffset = getScrollOffset(source, srcDir);

        globalOffset = (srcOffset / (srcRange || 1)) * authRange;

        console.log('→ Using SOURCE offset', { globalOffset, srcDir, srcOffset });
      } else {
        globalOffset = ratio * authRange;
        console.log('→ Using RATIO offset', { globalOffset });
      }

// --- Apply absolute scroll ---
for (let i = 0; i < entry.arr.length; i++) {
  const el = entry.arr[i];
  const d = entry.info[i].dir;

  if (!el || el === source) continue;
  if (lock.current.has(el)) continue;

  lock.current.add(el);
  // ✅ mark this as programmatic so Group.onScroll can ignore it
  (el as any).dataset.__scrollSync = '1';

  const range = getScrollRange(el, d);
  const target = Math.min(globalOffset, range);

  if (d === 'horizontal') el.scrollLeft = target;
  else el.scrollTop = target;

  requestAnimationFrame(() => {
    delete (el as any).dataset.__scrollSync;
    lock.current.delete(el);
  });
}

      console.log('Final globalOffset:', globalOffset);
      console.groupEnd();
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
    }),
    [registerContainer, unregisterContainer, updateScroll, getContainers, getAuthority]
  );
}

export { ScrollableContext };
