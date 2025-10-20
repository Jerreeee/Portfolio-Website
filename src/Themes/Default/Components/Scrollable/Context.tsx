'use client';

import React, { createContext, useContext, useMemo, useRef, useCallback } from 'react';

// Registry of linked scrollables and scrollbars
export interface ScrollableRegistry {
  containers: Map<string, HTMLDivElement[]>;
  scrollbars: Map<string, { vertical?: HTMLDivElement[]; horizontal?: HTMLDivElement[] }>;
}

export interface ScrollableContextType {
  registerContainer: (id: string, el: HTMLDivElement) => void;
  unregisterContainer: (id: string, el: HTMLDivElement) => void;
  registerScrollbar: (id: string, el: HTMLDivElement, dir: 'horizontal' | 'vertical') => void;
  unregisterScrollbar: (id: string, el: HTMLDivElement, dir: 'horizontal' | 'vertical') => void;
  updateScroll: (id: string, dir: 'horizontal' | 'vertical', ratio: number, source?: HTMLDivElement) => void;
  getContainers: (id: string) => HTMLDivElement[];
}

export const ScrollableContext = createContext<ScrollableContextType | null>(null);

export const useScrollableContext = () => {
  const ctx = useContext(ScrollableContext);
  if (!ctx) throw new Error('useScrollableContext must be used within a <ScrollableCmp>');
  return ctx;
};

// --------------------------------------------------------------------------
// Provider hook (used in ScrollableCmp root)
// --------------------------------------------------------------------------
export function useScrollableRegistry(): ScrollableContextType {
  const registry = useRef<ScrollableRegistry>({
    containers: new Map(),
    scrollbars: new Map(),
  });

  const syncLock = useRef<Set<HTMLDivElement>>(new Set());

  const registerContainer = useCallback((id: string, el: HTMLDivElement) => {
    const r = registry.current;
    if (!r.containers.has(id)) r.containers.set(id, []);
    const arr = r.containers.get(id)!;
    if (!arr.includes(el)) arr.push(el);
  }, []);

  const unregisterContainer = useCallback((id: string, el: HTMLDivElement) => {
    const arr = registry.current.containers.get(id);
    if (!arr) return;
    registry.current.containers.set(id, arr.filter((e) => e !== el));
  }, []);

  const registerScrollbar = useCallback((id: string, el: HTMLDivElement, dir: 'horizontal' | 'vertical') => {
    const r = registry.current;
    if (!r.scrollbars.has(id)) r.scrollbars.set(id, {});
    const entry = r.scrollbars.get(id)!;
    const list = entry[dir] ?? [];
    if (!list.includes(el)) entry[dir] = [...list, el];
  }, []);

  const unregisterScrollbar = useCallback((id: string, el: HTMLDivElement, dir: 'horizontal' | 'vertical') => {
    const entry = registry.current.scrollbars.get(id);
    if (!entry || !entry[dir]) return;
    entry[dir] = entry[dir]!.filter((e) => e !== el);
  }, []);

  const updateScroll = useCallback(
    (id: string, dir: 'horizontal' | 'vertical', ratio: number, source?: HTMLDivElement) => {
      const containers = registry.current.containers.get(id);
      if (!containers) return;

      for (const el of containers) {
        if (!el || el === source) continue;
        if (syncLock.current.has(el)) continue;

        syncLock.current.add(el);
        requestAnimationFrame(() => syncLock.current.delete(el));

        if (dir === 'horizontal') {
          const max = el.scrollWidth - el.clientWidth;
          const target = ratio * max;
          if (Math.abs(el.scrollLeft - target) > 0.5) el.scrollLeft = target;
        } else {
          const max = el.scrollHeight - el.clientHeight;
          const target = ratio * max;
          if (Math.abs(el.scrollTop - target) > 0.5) el.scrollTop = target;
        }
      }
    },
    []
  );

  const getContainers = useCallback(
    (id: string) => registry.current.containers.get(id) ?? [],
    []
  );

  return useMemo(
    () => ({
      registerContainer,
      unregisterContainer,
      registerScrollbar,
      unregisterScrollbar,
      updateScroll,
      getContainers,
    }),
    [registerContainer, unregisterContainer, registerScrollbar, unregisterScrollbar, updateScroll, getContainers]
  );
}
