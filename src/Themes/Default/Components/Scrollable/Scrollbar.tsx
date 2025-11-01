'use client';

import React, { useEffect, useState, CSSProperties, useRef } from 'react';
import { useScrollableContext } from './Context';
import ScrollBarCmp from '../ScrollBar/ScrollBarCmp';
import { Direction } from '../ScrollBar/ScrollBarCmp';
import { getScrollRange, getVisibleRatio } from './ScrollableCmp';

interface ScrollbarProps {
  id: string;
  direction: Direction;
  style?: CSSProperties;
}

function Scrollbar({ id, direction, style }: ScrollbarProps) {
  const ctx = useScrollableContext();
  const [ratio, setRatio] = useState(0);
  const [thumbRatio, setThumbRatio] = useState(0);
  const [scrollRange, setScrollRange] = useState(0);
  const draggingRef = useRef(false);

  useEffect(() => {
    // Helper to recompute local state
    const updateFromAuthority = () => {
      const authority = ctx.getAuthority(id);
      if (!authority) return;


      console.log("Updating scrollbar from authority:");
      const biggest = authority.current.biggestScrollRange.el.current;
      const smallest = authority.current.smallestVisibleRatio.el.current;
      const biggestDir = authority.current.biggestScrollRange.dir;
      const smallestDir = authority.current.smallestVisibleRatio.dir;

      if (!biggest || !smallest) return;

      setScrollRange(getScrollRange(biggest, biggestDir));
      console.log("New ScrollRange:", getScrollRange(biggest, biggestDir));
      setThumbRatio(getVisibleRatio(smallest, smallestDir));
    };

    // Run once immediately (handles mount)
    updateFromAuthority();

    // Subscribe for live updates
    const unsubscribe = ctx.subscribeAuthorityListener(id, updateFromAuthority);

    return unsubscribe;
  }, [ctx, id]);

  // --- Subscribe to ratio + range updates from context ---
  useEffect(() => {
    const unsubscribe = ctx.subscribeScrollbar(id, (_ratio, _scrollRange) => {
      if (draggingRef.current) return;

      // Convert sender's ratio to an absolute offset (in px)
      const absoluteOffset = _ratio * _scrollRange;
      // Normalize that offset to this scrollbar's own range
      const localRatio = scrollRange > 0 ? Math.min(absoluteOffset / scrollRange, 1) : 0;
      setRatio(localRatio);
    });

    return unsubscribe;
  }, [ctx, id, scrollRange]);

  const handleChange = (ratio: number, scrollRange: number) => {
    draggingRef.current = true;
    ctx.updateScroll(id, ratio, scrollRange);
  };

  const handleOnDragEnded = () => {
    draggingRef.current = false;
  };

  const baseStyle: CSSProperties =
    direction === 'vertical'
      ? { display: 'flex', flexDirection: 'column', height: '100%' }
      : { display: 'flex', flexDirection: 'row', width: '100%' };

  if (thumbRatio >= 1) return null;

  return (
    <div style={{ ...baseStyle, ...style }}>
      <ScrollBarCmp
        direction={direction}
        value={ratio}
        manualControl={{ thumbRatio, scrollRange }}
        onChange={handleChange}
        onDragEnded={handleOnDragEnded}
      />
    </div>
  );
}

export const VerticalScrollbar = (props: Omit<ScrollbarProps, 'direction'>) => (
  <Scrollbar {...props} direction="vertical" />
);
export const HorizontalScrollbar = (props: Omit<ScrollbarProps, 'direction'>) => (
  <Scrollbar {...props} direction="horizontal" />
);

(VerticalScrollbar as any).__scrollableRole = 'vertical';
(HorizontalScrollbar as any).__scrollableRole = 'horizontal';
