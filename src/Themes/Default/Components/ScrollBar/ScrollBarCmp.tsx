'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useAppTheme } from '@/Themes/ThemeProvider';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { scrollBarCmp } from './ScrollBarCmpClasses';
import { getScrollRange, getScrollRatio, getScrollVisibleArea } from '../Scrollable/ScrollableCmp';
import { useSizeObserver } from '@/Hooks/useSizeObserver';

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
  transition: theme.transitions.create('opacity', { duration: theme.transitions.duration.shorter }),
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
  transition: theme.transitions.create(['opacity', 'backgroundColor'], { duration: theme.transitions.duration.shorter }),
  ...(direction === 'horizontal'
    ? { top: 0, height: theme.components?.ScrollBarCmp?.settings?.thickness ?? 12 }
    : { left: 0, width: theme.components?.ScrollBarCmp?.settings?.thickness ?? 12 }),
}));

// ===========================================================================

export interface ScrollBarCmpSettings {
  thickness: number;
}

interface ManualControl {
  thumbRatio: number;
  scrollRange: number;
}

export interface ScrollBarCmpProps {
  /** Optional scrollable container to sync with */
  scrollContainer?: React.RefObject<HTMLDivElement | null>;
  direction?: Direction;
  /** Optional externally controlled thumbSize ratio [0;1] and scrollRange. Used only if scrollContainer is undefined */
  manualControl?: ManualControl;
  /** Optional externally controlled position ratio [0..1] */
  value?: number;
  /** Change callback */
  onChange?: (ratio: number, scrollRange: number) => void;
  onDragEnded?: () => void;
}

export default function ScrollBarCmp({
  scrollContainer,
  direction = 'horizontal',
  value,
  manualControl: externalControl,
  onChange,
  onDragEnded,
}: ScrollBarCmpProps) {
  const { ref: sizeRef, size: scrollbarSize } = useSizeObserver({ mode: direction });
  const [thumbSize, setThumbSize] = useState(0);
  const [thumbOffset, setThumbOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollRange, setScrollRange] = useState(0);


  const trackSize =
    direction === 'horizontal'
      ? scrollbarSize?.width ?? 0
      : scrollbarSize?.height ?? 0;

  const startPos = useRef(0);
  const startOffset = useRef(0);
  const userDragging = useRef(false);
  const onMouseMoveRef = useRef<(e: MouseEvent | TouchEvent) => void>(() => {});
  const onMouseUpRef = useRef<() => void>(() => {});
  const minThumbSize = 20;

  const getClientPos = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent): number => {
    if ('touches' in e) {
      return direction === 'horizontal' ? e.touches[0].clientX : e.touches[0].clientY;
    }
    return direction === 'horizontal' ? (e as MouseEvent).clientX : (e as MouseEvent).clientY;
  };

  // --- Sync thumb with scroll container (if provided)
  useEffect(() => {
    const el = scrollContainer?.current;
    if (!el) return;

    function updateThumbSize() {
      if (!el) return;
      const _scrollRange = getScrollRange(el, direction);
      setScrollRange(_scrollRange);
      const visible = getScrollVisibleArea(el, direction);
      const _thumbSize = Math.max((visible / (visible + _scrollRange)) * trackSize, minThumbSize);
      setThumbSize(_thumbSize);
    }

    function updateThumbOffset() {
      // Scroll position to thumb offset mapping
      if (!el) return;
      const ratio = getScrollRatio(el, direction);
      const travel = Math.max(trackSize - thumbSize, 0);
      const _thumbOffset = ratio * (travel || 1);
      setThumbOffset(_thumbOffset);
    }

    // Initial setup
    updateThumbSize();
    updateThumbOffset();

    // Resize => re-measure geometry
    window.addEventListener('resize', updateThumbSize);

    // Scroll => update only position
    el.addEventListener('scroll', updateThumbOffset);

    return () => {
      el.removeEventListener('scroll', updateThumbOffset);
      window.removeEventListener('resize', updateThumbSize);
    };
  }, [scrollContainer, direction, trackSize, thumbSize]);

  // --- Controlled value (external ratio position)
  useEffect(() => {
    if (value == null) return;
    const travel = Math.max(trackSize - thumbSize, 0);
    setThumbOffset(value * (travel || 1));
  }, [value, trackSize, thumbSize]);

  // --- Controlled thumb size (external thumb ratio)
  useEffect(() => {
    if (scrollContainer || externalControl == null) return;
    const _thumbSize = Math.max(trackSize * externalControl.thumbRatio, minThumbSize);
    setScrollRange(externalControl.scrollRange);
    setThumbSize(_thumbSize);
  }, [externalControl, trackSize, scrollContainer]);

  // --- Dragging logic ---
  function startDrag(e: React.MouseEvent | React.TouchEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const clientPos = getClientPos(e);
    const clickPos =
      direction === 'horizontal' ? clientPos - rect.left : clientPos - rect.top;
    const maxOffset = Math.max(trackSize - thumbSize, 0);

    const inThumb =
      clickPos >= thumbOffset && clickPos <= thumbOffset + thumbSize;

    let newOffset = thumbOffset;
    if (!inThumb) {
      // Center thumb where clicked
      newOffset = Math.min(Math.max(clickPos - thumbSize / 2, 0), maxOffset);
      const ratio = newOffset / (maxOffset || 1);
      setThumbOffset(newOffset);
      onChange?.(ratio, scrollRange);
    }

    userDragging.current = true;
    setIsDragging(true);
    startPos.current = clientPos;
    startOffset.current = newOffset;

    e.preventDefault();
  }

  const onMouseDown = (e: React.MouseEvent) => startDrag(e);
  const onTouchStart = (e: React.TouchEvent) => startDrag(e);

  onMouseMoveRef.current = (e: MouseEvent | TouchEvent) => {
    if (!userDragging.current) return;
    const delta = getClientPos(e) - startPos.current;
    const maxOffset = Math.max(trackSize - thumbSize, 0);
    const newOffset = Math.min(Math.max(startOffset.current + delta, 0), maxOffset);
    const ratio = newOffset / (maxOffset || 1);

    setThumbOffset(newOffset);
    onChange?.(ratio, scrollRange);

    const el = scrollContainer?.current;
    if (el) {
      const range =
        direction === 'horizontal'
          ? el.scrollWidth - el.clientWidth
          : el.scrollHeight - el.clientHeight;

      if (direction === 'horizontal') el.scrollLeft = ratio * range;
      else el.scrollTop = ratio * range;
    }
  };

  onMouseUpRef.current = () => {
    userDragging.current = false;
    setIsDragging(false);
    onDragEnded?.();
  };

  useEffect(() => {
    const move = (e: MouseEvent) => onMouseMoveRef.current(e);
    const up = () => onMouseUpRef.current();
    const touchMove = (e: TouchEvent) => { if (userDragging.current) e.preventDefault(); onMouseMoveRef.current(e); };
    const touchEnd = () => onMouseUpRef.current();
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', touchMove, { passive: false });
    window.addEventListener('touchend', touchEnd);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchmove', touchMove);
      window.removeEventListener('touchend', touchEnd);
    };
  }, []);

  return (
    <ScrollBarRoot
      ref={sizeRef}
      direction={direction}
      dragging={isDragging}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      <ScrollBarThumb
        direction={direction}
        dragging={isDragging}
        style={
          direction === 'horizontal'
            ? { width: thumbSize, left: thumbOffset }
            : { height: thumbSize, top: thumbOffset }
        }
      />
    </ScrollBarRoot>
  );
}
