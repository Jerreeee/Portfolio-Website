'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/Themes/ThemeProvider';

export type ScrollBarTheme = {};

export interface ScrollBarProps {
  scrollContainer: React.RefObject<HTMLDivElement | null>;
}

/**
 * Custom horizontal scrollbar that syncs with a scrollable container.
 */
export function ScrollBarCmp(props: ScrollBarProps) {
  const { theme: activeTheme } = useTheme();
  const theme: ScrollBarTheme = activeTheme.components.scrollBar.theme;

  const [thumbWidth, setThumbWidth] = useState(0);
  const [thumbLeft, setThumbLeft] = useState(0);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startLeft = useRef(0);

  // Update thumb size and position whenever scroll changes
  useEffect(() => {
    function update() {
      const el = props.scrollContainer.current;
      if (!el) return;
      const visibleRatio = el.clientWidth / el.scrollWidth;
      const newThumbWidth = Math.max(visibleRatio * el.clientWidth, 20); // min width
      const scrollRatio = el.scrollLeft / (el.scrollWidth - el.clientWidth);
      setThumbWidth(newThumbWidth);
      setThumbLeft(scrollRatio * (el.clientWidth - newThumbWidth));
    }

    update();
    const el = props.scrollContainer.current;
    el?.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    return () => {
      el?.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [props.scrollContainer]);

  // Handle dragging
  function onMouseDown(e: React.MouseEvent) {
    dragging.current = true;
    startX.current = e.clientX;
    startLeft.current = thumbLeft;
    e.preventDefault();
  }

  function onMouseMove(e: MouseEvent) {
    if (!dragging.current || !props.scrollContainer.current) return;
    const deltaX = e.clientX - startX.current;
    const el = props.scrollContainer.current;
    const maxLeft = el.clientWidth - thumbWidth;
    const newLeft = Math.min(Math.max(startLeft.current + deltaX, 0), maxLeft);
    const scrollRatio = newLeft / maxLeft;
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
    <div className="relative h-2 w-full bg-gray-700 rounded" >
      <div
        className="absolute top-0 h-2 bg-white rounded cursor-pointer"
        style={{ width: `${thumbWidth}px`, left: `${thumbLeft}px` }}
        onMouseDown={onMouseDown}
      />
    </div>
  );
}
