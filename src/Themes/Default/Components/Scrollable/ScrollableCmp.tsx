'use client';

import React, { useMemo } from 'react';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { ScrollableContext, useScrollableRegistry } from './Context';
import { scrollableCmp } from './ScrollableCmpClasses';

import { Direction } from '../ScrollBar/ScrollBarCmp';
import { Group } from './Group';
import { VerticalScrollbar, HorizontalScrollbar } from './Scrollbar';


const makeSlot = makeSlotFactory('ScrollableCmp', scrollableCmp);

const ScrollableRoot = makeSlot('div', 'root')({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

// ---------------------------------------------------------------------------
// Utility helpers (used by Group, Scrollbar, Context)
// ---------------------------------------------------------------------------

export const hideNativeScrollbarsStyles = {
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': { display: 'none', width: 0, height: 0 },
} as const;

export function getScrollRange(el: HTMLDivElement, dir: Direction): number {
  const diff = dir === 'horizontal'
    ? el.scrollWidth - el.clientWidth
    : el.scrollHeight - el.clientHeight;
  return Math.max(0, diff < 1 ? 0 : diff);
}

export function getScrollVisibleArea(el: HTMLDivElement, dir: Direction): number {
  return dir === 'horizontal' ? el.clientWidth : el.clientHeight;
}

export function getScrollArea(el: HTMLDivElement, dir: Direction): number {
  return dir === 'horizontal' ? el.scrollWidth : el.scrollHeight;
}

export function getScrollOffset(el: HTMLDivElement, dir: Direction): number {
  return dir === 'horizontal' ? el.scrollLeft : el.scrollTop;
}

export function getScrollRatio(el: HTMLDivElement, dir: Direction): number {
  const range = getScrollRange(el, dir);
  return range === 0 ? 0 : getScrollOffset(el, dir) / range;
}

export function getVisibleRatio(el: HTMLDivElement, dir: Direction): number {
  const visible = getScrollVisibleArea(el, dir);
  const area = getScrollArea(el, dir);
  return area === 0 ? 1 : visible / area;
}

export interface ScrollableCmpSettings {}

export interface ScrollableCmpProps {
  children?: React.ReactNode;
  direction?: 'horizontal' | 'vertical' | 'both';
}

/**
 * Acts as either:
 * 1. A self-contained scrollable region with auto-injected scrollbars (simple mode)
 * 2. A scroll registry provider (advanced mode) for linked containers + bars
 */
export default function ScrollableCmp({ children, direction = 'both' }: ScrollableCmpProps) {
  const registry = useScrollableRegistry();

  // Detect advanced usage — any ScrollableCmp.Group, Vertical, or Horizontal child
  const hasAdvancedChildren = useMemo(() => {
    function containsAdvanced(node: React.ReactNode): boolean {
      return React.Children.toArray(node).some((child) => {
        if (!React.isValidElement(child)) return false;
        const role = (child.type as any)?.__scrollableRole;
        if (role) return true;

        const childProps = child.props as { children?: React.ReactNode };
        return childProps?.children ? containsAdvanced(childProps.children) : false;
      });
    }

    return containsAdvanced(children);
  }, [children]);

  if (!hasAdvancedChildren) {
    // SIMPLE MODE — Group acts as the scroll container; scrollbars are auto-injected
    const showH = direction === 'horizontal' || direction === 'both';
    const showV = direction === 'vertical' || direction === 'both';

    return (
      <ScrollableContext.Provider value={registry}>
        <ScrollableRoot>
          {/* Row: scrollable content + vertical bar */}
          <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
            <Group
              horizontalId={showH ? '_h' : undefined}
              verticalId={showV ? '_v' : undefined}
              style={{ flex: 1, width: 'auto' }}
            >
              {children}
            </Group>
            {showV && <VerticalScrollbar id="_v" />}
          </div>
          {/* Horizontal bar below */}
          {showH && <HorizontalScrollbar id="_h" />}
        </ScrollableRoot>
      </ScrollableContext.Provider>
    );
  }

  // ADVANCED MODE — provides shared context; caller owns all layout
  return (
    <ScrollableContext.Provider value={registry}>
      {children}
    </ScrollableContext.Provider>
  );
}

// Attach subcomponents for declarative use
ScrollableCmp.Group = Group;
ScrollableCmp.Vertical = VerticalScrollbar;
ScrollableCmp.Horizontal = HorizontalScrollbar;
