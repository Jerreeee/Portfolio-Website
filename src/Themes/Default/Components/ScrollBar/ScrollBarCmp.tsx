'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/Themes/ThemeProvider';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { scrollBarCmp } from './ScrollBarCmpClasses';
import { getScrollRange } from '../Scrollable/ScrollableCmp';

export type Direction = 'horizontal' | 'vertical';
export type MultiDirection = Direction | 'both';

const makeSlot = makeSlotFactory('ScrollBarCmp', scrollBarCmp);

const ScrollBarRoot = makeSlot('div', 'root', {
  shouldForwardProp: (p) => p !== 'direction' && p !== 'dragging',
})<{
  direction: Direction;
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
  direction: Direction;
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

export interface ScrollBarCmpSettings {
  thickness: number;
}

export interface ScrollBarCmpProps {
  /** Optional single linked scrollable container */
  scrollContainer?: React.RefObject<HTMLDivElement | null>;

  /** Optional external track size when not bound to a real container */
  trackSize?: number;

  /** Scroll direction */
  direction?: Direction;

  /** Controlled position ratio [0..1] */
  value?: number;

  /** Change callback */
  onChange?: (ratio: number) => void;
}

export default function ScrollBarCmp({
  scrollContainer,
  trackSize: externalTrackSize,
  direction = 'horizontal',
  value,
  onChange,
}: ScrollBarCmpProps) {
  const [thumbSize, setThumbSize] = useState(20);
  const [thumbOffset, setThumbOffset] = useState(0);
  const [trackSize, setTrackSize] = useState(externalTrackSize ?? 0);
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef(0);
  const startOffset = useRef(0);
  const userDragging = useRef(false);

  // --- Track container metrics ---
  useEffect(() => {
    const el = scrollContainer?.current;
    if (!el) return;

    function updateThumb() {
      const scrollRange = getScrollRange(el!, direction);
      const visible = direction === 'horizontal' ? el!.clientWidth : el!.clientHeight;
      const ratio =
        direction === 'horizontal'
          ? el!.scrollLeft / (scrollRange || 1)
          : el!.scrollTop / (scrollRange || 1);

      const size = Math.max((visible / (visible + scrollRange)) * visible, 20);
      const track = Math.max(visible - size, 0);
      const offset = ratio * (track || 1);

      setThumbSize(size);
      setTrackSize(track);
      setThumbOffset(offset);
    }

    updateThumb();
    el.addEventListener('scroll', updateThumb);
    window.addEventListener('resize', updateThumb);
    return () => {
      el.removeEventListener('scroll', updateThumb);
      window.removeEventListener('resize', updateThumb);
    };
  }, [scrollContainer, direction]);

  // Controlled mode: external value
  useEffect(() => {
    if (value == null) return;
    setThumbOffset(value * (trackSize || 1));
  }, [value, trackSize]);

  // --- Dragging ---
  function onMouseDown(e: React.MouseEvent) {
    userDragging.current = true;
    setIsDragging(true);
    startPos.current = direction === 'horizontal' ? e.clientX : e.clientY;
    startOffset.current = thumbOffset;
    e.preventDefault();
  }

  function onMouseMove(e: MouseEvent) {
    if (!userDragging.current) return;
    const delta = (direction === 'horizontal' ? e.clientX : e.clientY) - startPos.current;
    const maxOffset = trackSize;
    const newOffset = Math.min(Math.max(startOffset.current + delta, 0), maxOffset);
    const ratio = newOffset / (maxOffset || 1);

    setThumbOffset(newOffset);
    onChange?.(ratio);

    const el = scrollContainer?.current;
    if (el) {
      if (direction === 'horizontal') {
        const range = el.scrollWidth - el.clientWidth;
        el.scrollLeft = ratio * range;
      } else {
        const range = el.scrollHeight - el.clientHeight;
        el.scrollTop = ratio * range;
      }
    }
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

