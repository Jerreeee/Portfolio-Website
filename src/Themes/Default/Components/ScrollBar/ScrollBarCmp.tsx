'use client';

import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useTheme } from '@/Themes/ThemeProvider';
import { makeSlotFactory } from '@/utils/makeSlotFactory';
import { scrollBarCmp } from './ScrollBarCmpClasses';

// =====================================================================
// ========================= Slot Definitions ==========================

const makeSlot = makeSlotFactory('ScrollBarCmp', scrollBarCmp);

const ScrollBarRoot = makeSlot('div', 'root', {
  shouldForwardProp: (prop) => prop !== 'direction' && prop !== 'dragging',
})<{
  direction: 'horizontal' | 'vertical';
  dragging?: boolean
}>(({ theme, direction, dragging }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[700],
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  opacity: dragging ? 1 : 0.5, // opaque when dragging
  transition: 'opacity 0.2s ease',
  '&:hover': { opacity: 1 }, // opaque on hover
  ...(direction === 'horizontal'
    ? { height: theme.components?.ScrollBarCmp?.settings?.thickness, width: '100%' }
    : { width: theme.components?.ScrollBarCmp?.settings?.thickness, height: '100%' }),
}));

const ScrollBarThumb = makeSlot('div', 'thumb', {
  shouldForwardProp: (prop) => prop !== 'direction' && prop !== 'dragging',
})<{
  direction: 'horizontal' | 'vertical';
  dragging?: boolean
}>(({ theme, direction, dragging }) => ({
  position: 'absolute',
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  opacity: dragging ? 1 : 0.6,                  // ← thumb also opaque when dragging
  transition: 'opacity 0.2s ease, background-color 0.2s ease',
  ...(direction === 'horizontal'
    ? { top: 0, height: theme.components?.ScrollBarCmp?.settings?.thickness ?? 12 }
    : { left: 0, width: theme.components?.ScrollBarCmp?.settings?.thickness ?? 12 }),
}));

// =====================================================================
// ============================= Component =============================

export interface ScrollBarCmpSettings {
  thickness: number;
}

export interface ScrollBarCmpProps {
  scrollContainer: React.RefObject<HTMLDivElement | null>;
  direction?: 'horizontal' | 'vertical';
}

export default function ScrollBarCmp({ scrollContainer, direction = 'horizontal', ...props}: ScrollBarCmpProps) {
  const { theme: activeTheme } = useTheme();
  const cmp = activeTheme.components?.ScrollBarCmp;
  console.log("ScrollBarCMp: ", cmp);

  const [thumbSize, setThumbSize] = useState(0);
  const [thumbOffset, setThumbOffset] = useState(0);

  const dragging = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef(0);
  const startOffset = useRef(0);

  // Update thumb size and position
  useEffect(() => {
    const el = scrollContainer.current;
    if (!el) return;

    function update() {
      if (!el) return;

      if (direction === 'horizontal') {
        const visibleRatio = el.clientWidth / el.scrollWidth;
        const newSize = Math.max(visibleRatio * el.clientWidth, 20);
        const scrollRatio = el.scrollLeft / (el.scrollWidth - el.clientWidth || 1);
        setThumbSize(newSize);
        setThumbOffset(scrollRatio * (el.clientWidth - newSize));
      } else {
        const visibleRatio = el.clientHeight / el.scrollHeight;
        const newSize = Math.max(visibleRatio * el.clientHeight, 20);
        const scrollRatio = el.scrollTop / (el.scrollHeight - el.clientHeight || 1);
        setThumbSize(newSize);
        setThumbOffset(scrollRatio * (el.clientHeight - newSize));
      }
    }

    update();
    el.addEventListener('scroll', update);
    window.addEventListener('resize', update);

    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [scrollContainer, direction]);

  // Drag handlers
  function onMouseDown(e: React.MouseEvent) {
    dragging.current = true;
    setIsDragging(true);
    startPos.current = direction === 'horizontal' ? e.clientX : e.clientY;
    startOffset.current = thumbOffset;
    e.preventDefault();
  }

  function onMouseMove(e: MouseEvent) {
    if (!dragging.current || !scrollContainer.current) return;
    const el = scrollContainer.current;

    if (direction === 'horizontal') {
      const maxOffset = el.clientWidth - thumbSize;
      const newOffset = Math.min(
        Math.max(startOffset.current + (e.clientX - startPos.current), 0),
        maxOffset
      );
      const scrollRatio = newOffset / (maxOffset || 1);
      el.scrollLeft = scrollRatio * (el.scrollWidth - el.clientWidth);
    } else {
      const maxOffset = el.clientHeight - thumbSize;
      const newOffset = Math.min(
        Math.max(startOffset.current + (e.clientY - startPos.current), 0),
        maxOffset
      );
      const scrollRatio = newOffset / (maxOffset || 1);
      el.scrollTop = scrollRatio * (el.scrollHeight - el.clientHeight);
    }
  }

  function onMouseUp() {
    dragging.current = false;
    setIsDragging(false);
  }

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [thumbSize, direction]);

  return (
    <ScrollBarRoot
      direction={direction}
      dragging={isDragging}
    >
      <ScrollBarThumb
        direction={direction}
        dragging={isDragging}
        style={
          direction === 'horizontal'
            ? { width: thumbSize, left: thumbOffset }
            : { height: thumbSize, top: thumbOffset }
        }
        onMouseDown={onMouseDown}
      />
    </ScrollBarRoot>
  );
}
