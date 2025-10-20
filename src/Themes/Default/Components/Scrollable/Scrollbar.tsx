'use client';

import React, { useEffect, useState, useMemo, CSSProperties } from 'react';
import { useScrollableContext } from './Context';
import ScrollBarCmp from '../ScrollBar/ScrollBarCmp';
import { Direction } from '../ScrollBar/ScrollBarCmp'
import { getScrollRange, getScrollRatio } from './ScrollableCmp';

interface ScrollbarProps {
  id: string;
  direction: Direction;
  style?: CSSProperties;
}

function Scrollbar({ id, direction, style }: ScrollbarProps) {
  const ctx = useScrollableContext();
  const [ratio, setRatio] = useState(0);

  const authority = ctx.getAuthority(id);

useEffect(() => {
  const el = authority?.current;
  if (!el) return;

  const updateRatio = () => {
    const r = getScrollRatio(el, direction);
    setRatio(r);
  };

  updateRatio();
  el.addEventListener('scroll', updateRatio);
  window.addEventListener('resize', updateRatio);

  return () => {
    el.removeEventListener('scroll', updateRatio);
    window.removeEventListener('resize', updateRatio);
  };
}, [authority?.current, direction]);


  const handleChange = (r: number) => {
    setRatio(r);
    ctx.updateScroll(id, r);
  };

  const baseStyle: CSSProperties =
    direction === 'vertical'
      ? { display: 'flex', flexDirection: 'column', height: '100%' }
      : { display: 'flex', flexDirection: 'row', width: '100%' };

  return (
    <div style={{ ...baseStyle, ...style }}>
      <ScrollBarCmp scrollContainer={authority ?? undefined} direction={direction} value={ratio} onChange={handleChange} />
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
