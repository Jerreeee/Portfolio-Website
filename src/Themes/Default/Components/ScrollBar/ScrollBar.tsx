'use client';

import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useTheme } from '@/Themes/ThemeProvider'

// =====================================================================
// ========================= Slot Definitions ==========================

const ScrollBarRoot = styled('div', { name: 'ScrollBar', slot: 'Root' })(({ theme }) => ({
  position: 'relative',
  height: theme.spacing(1), // ~8px
  width: '100%',
  backgroundColor: theme.palette.grey[700],
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

const ScrollBarThumb = styled('div', { name: 'ScrollBar', slot: 'Thumb' })(({ theme }) => ({
  position: 'absolute',
  top: 0,
  height: theme.spacing(1),
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
}));

// =====================================================================
// ============================= Component =============================

export interface ScrollBarProps {
  /** Ref to the horizontally scrollable container this bar controls */
  scrollContainer: React.RefObject<HTMLDivElement | null>;
}

export default function ScrollBarCmp({ scrollContainer }: ScrollBarProps) {
  const { theme } = useTheme();

  const [thumbWidth, setThumbWidth] = useState(0);
  const [thumbLeft, setThumbLeft] = useState(0);

  const dragging = useRef(false);
  const startX = useRef(0);
  const startLeft = useRef(0);

  // Update thumb size and position when the container scrolls or resizes
  useEffect(() => {
    const el = scrollContainer.current;
    if (!el) return;

    function update() {
      if (!el) return;
      const visibleRatio = el.clientWidth / el.scrollWidth;
      const newThumbWidth = Math.max(visibleRatio * el.clientWidth, 20); // minimum width
      const scrollRatio = el.scrollLeft / (el.scrollWidth - el.clientWidth || 1);
      setThumbWidth(newThumbWidth);
      setThumbLeft(scrollRatio * (el.clientWidth - newThumbWidth));
    }

    update();
    el.addEventListener('scroll', update);
    window.addEventListener('resize', update);

    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [scrollContainer]);

  // Drag handlers
  function onMouseDown(e: React.MouseEvent) {
    dragging.current = true;
    startX.current = e.clientX;
    startLeft.current = thumbLeft;
    e.preventDefault();
  }

  function onMouseMove(e: MouseEvent) {
    if (!dragging.current || !scrollContainer.current) return;
    const el = scrollContainer.current;
    const maxLeft = el.clientWidth - thumbWidth;
    const newLeft = Math.min(Math.max(startLeft.current + (e.clientX - startX.current), 0), maxLeft);
    const scrollRatio = newLeft / (maxLeft || 1);
    el.scrollLeft = scrollRatio * (el.scrollWidth - el.clientWidth);
  }

  function onMouseUp() {
    dragging.current = false;
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
    <ScrollBarRoot>
      <ScrollBarThumb
        style={{ width: thumbWidth, left: thumbLeft }}
        onMouseDown={onMouseDown}
      />
    </ScrollBarRoot>
  );
}
