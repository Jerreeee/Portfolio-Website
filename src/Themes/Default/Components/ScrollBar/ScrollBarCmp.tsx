'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/Themes/ThemeProvider';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { scrollBarCmp } from './ScrollBarCmpClasses';

const makeSlot = makeSlotFactory('ScrollBarCmp', scrollBarCmp);

const ScrollBarRoot = makeSlot('div', 'root', {
  shouldForwardProp: (p) => p !== 'direction' && p !== 'dragging',
})<{
  direction: 'horizontal' | 'vertical';
  dragging?: boolean;
}>(({ theme, direction, dragging }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[700],
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  opacity: dragging ? 1 : 0.5,
  transition: 'opacity 0.2s ease',
  '&:hover': { opacity: 1 },
  ...(direction === 'horizontal'
    ? { height: theme.components?.ScrollBarCmp?.settings?.thickness ?? 12, width: '100%' }
    : { width: theme.components?.ScrollBarCmp?.settings?.thickness ?? 12, height: '100%' }),
}));

const ScrollBarThumb = makeSlot('div', 'thumb', {
  shouldForwardProp: (p) => p !== 'direction' && p !== 'dragging',
})<{
  direction: 'horizontal' | 'vertical';
  dragging?: boolean;
}>(({ theme, direction, dragging }) => ({
  position: 'absolute',
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  opacity: dragging ? 1 : 0.6,
  transition: 'opacity 0.2s ease, background-color 0.2s ease',
  ...(direction === 'horizontal'
    ? { top: 0, height: theme.components?.ScrollBarCmp?.settings?.thickness ?? 12 }
    : { left: 0, width: theme.components?.ScrollBarCmp?.settings?.thickness ?? 12 }),
}));

// ===========================================================================

export interface ScrollBarCmpProps {
  /** One or more linked scrollable containers */
  scrollContainer?: React.RefObject<HTMLDivElement | null> | React.RefObject<HTMLDivElement | null>[];
  direction?: 'horizontal' | 'vertical';
  value?: number;
  onChange?: (ratio: number) => void;
}

export default function ScrollBarCmp({
  scrollContainer,
  direction = 'horizontal',
  value,
  onChange,
}: ScrollBarCmpProps) {
  const { theme } = useTheme();
  const containers = Array.isArray(scrollContainer)
    ? scrollContainer
    : scrollContainer
    ? [scrollContainer]
    : [];

  const [thumbSize, setThumbSize] = useState(0);
  const [thumbOffset, setThumbOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef(0);
  const startOffset = useRef(0);
  const userDragging = useRef(false);

  // Update thumb from scroll events
useEffect(() => {
  const els = containers.map((r) => r?.current).filter(Boolean) as HTMLDivElement[];
  if (els.length === 0) return;

  function updateThumb() {
    let maxScrollable = 0;
    let maxVisible = 0;
    let avgRatio = 0;
    let count = 0;

    for (const el of els) {
      const scrollRange =
        direction === 'horizontal'
          ? el.scrollWidth - el.clientWidth
          : el.scrollHeight - el.clientHeight;
      const visible = direction === 'horizontal' ? el.clientWidth : el.clientHeight;

      // compute ratio for this container
      const ratio =
        direction === 'horizontal'
          ? el.scrollLeft / (scrollRange || 1)
          : el.scrollTop / (scrollRange || 1);

      if (scrollRange > maxScrollable) maxScrollable = scrollRange;
      if (visible > maxVisible) maxVisible = visible;

      avgRatio += ratio;
      count++;
    }

    if (count === 0) return;

    // average scroll position, largest scrollable range
    const meanRatio = avgRatio / count;
    const sizeRatio = maxVisible / (maxScrollable + maxVisible);
    const baseSize = direction === 'horizontal' ? maxVisible : maxVisible;

    const size = Math.max(sizeRatio * baseSize, 20);
    const offset = meanRatio * ((baseSize - size) || 1);

    setThumbSize(size);
    setThumbOffset(offset);
  }

  updateThumb();

  els.forEach((el) => el.addEventListener('scroll', updateThumb));
  window.addEventListener('resize', updateThumb);

  return () => {
    els.forEach((el) => el.removeEventListener('scroll', updateThumb));
    window.removeEventListener('resize', updateThumb);
  };
}, [containers, direction]);

  // Controlled value
  useEffect(() => {
    if (value == null) return;
    const first = containers[0]?.current;
    if (!first) return;
    const max = direction === 'horizontal' ? first.clientWidth - thumbSize : first.clientHeight - thumbSize;
    setThumbOffset(value * (max || 1));
  }, [value, direction, thumbSize]);

  function onMouseDown(e: React.MouseEvent) {
    userDragging.current = true;
    setIsDragging(true);
    startPos.current = direction === 'horizontal' ? e.clientX : e.clientY;
    startOffset.current = thumbOffset;
    e.preventDefault();
  }

  function onMouseMove(e: MouseEvent) {
    if (!userDragging.current) return;
    const first = containers[0]?.current;
    if (!first) return;

    const containerSize = direction === 'horizontal' ? first.clientWidth : first.clientHeight;
    const delta = (direction === 'horizontal' ? e.clientX : e.clientY) - startPos.current;
    const maxOffset = containerSize - thumbSize;
    const newOffset = Math.min(Math.max(startOffset.current + delta, 0), maxOffset);
    const ratio = newOffset / (maxOffset || 1);
    setThumbOffset(newOffset);
    onChange?.(ratio);

    containers.forEach((ref) => {
      const el = ref.current;
      if (!el) return;
      if (direction === 'horizontal') el.scrollLeft = ratio * (el.scrollWidth - el.clientWidth);
      else el.scrollTop = ratio * (el.scrollHeight - el.clientHeight);
    });
  }

  function onMouseUp() {
    userDragging.current = false;
    setIsDragging(false);
  }

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  });

  return (
    <ScrollBarRoot direction={direction} dragging={isDragging}>
      <ScrollBarThumb
        direction={direction}
        dragging={isDragging}
        onMouseDown={onMouseDown}
        style={
          direction === 'horizontal'
            ? { width: thumbSize, left: thumbOffset }
            : { height: thumbSize, top: thumbOffset }
        }
      />
    </ScrollBarRoot>
  );
}
