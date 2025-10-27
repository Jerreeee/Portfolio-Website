'use client';

import React from 'react';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { ScrollableContext, useScrollableRegistry } from './Context';
import { scrollableCmp } from './ScrollableCmpClasses';

import { Direction } from '../ScrollBar/ScrollBarCmp';
import { Group } from './Group';
import { VerticalScrollbar, HorizontalScrollbar } from './Scrollbar';


const makeSlot = makeSlotFactory('ScrollableCmp', scrollableCmp);

const ScrollableRoot = makeSlot('div', 'root')({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
});

const ViewportWrapper = makeSlot('div', 'viewportWrapper')({
  position: 'relative',
  flex: '1 1 auto',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  display: 'flex',
});

export const hideNativeScrollbarsStyles = {
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': { display: 'none', width: 0, height: 0 },
} as const;

const ScrollableContainer = makeSlot('div', 'container')({
  position: 'relative',
  flex: '1 1 auto',
  width: '100%',
  height: '100%',
  overflow: 'auto',
  ...hideNativeScrollbarsStyles,
});

// ---------------------------------------------------------------------------
// Root ScrollableCmp
// ---------------------------------------------------------------------------

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
 * 1. A self-contained scrollable region (simple mode)
 * 2. A scroll registry provider (advanced mode) for linked containers + bars
 */
export default function ScrollableCmp({ children, direction = 'both' }: ScrollableCmpProps) {
  const registry = useScrollableRegistry();

  // Detect advanced usage — any ScrollableCmp.Group, Vertical, or Horizontal child
  const hasAdvancedChildren = (() => {
    function containsAdvanced(node: React.ReactNode): boolean {
      return React.Children.toArray(node).some((child) => {
        if (!React.isValidElement(child)) return false;
        const role = (child.type as any)?.__scrollableRole;
        if (role) return true;

        // Type guard: child is a ReactElement, so props exists
        const childProps = child.props as { children?: React.ReactNode };
        return childProps?.children ? containsAdvanced(childProps.children) : false;
      });
    }

    return containsAdvanced(children);
    })();

    console.log("hasAdvancedChildren: ", hasAdvancedChildren);

  if (!hasAdvancedChildren) {
    // SIMPLE MODE (classic ScrollableCmp)
    return (
      <ScrollableRoot>
        <ViewportWrapper>
          <ScrollableContainer>{children}</ScrollableContainer>
        </ViewportWrapper>
      </ScrollableRoot>
    );
  }

  // ADVANCED MODE (provides shared context)
  if (hasAdvancedChildren) {
    return (
      <ScrollableRoot>
        <ViewportWrapper>
          <ScrollableContext.Provider value={registry}>
            {children}
          </ScrollableContext.Provider>
        </ViewportWrapper>
      </ScrollableRoot>
    );
  }
}

// Attach subcomponents for declarative use
ScrollableCmp.Group = Group;
ScrollableCmp.Vertical = VerticalScrollbar;
ScrollableCmp.Horizontal = HorizontalScrollbar;
