'use client';

import React, { useEffect, useState, useMemo, CSSProperties } from 'react';
import { useScrollableContext } from './Context';
import ScrollBarCmp from '../ScrollBar/ScrollBarCmp';

interface ScrollbarProps {
  id: string;
  direction: 'horizontal' | 'vertical';
  style?: React.CSSProperties;
}

function Scrollbar({ id, direction, style }: ScrollbarProps) {
  const ctx = useScrollableContext();
  const [ratio, setRatio] = useState(0);
  const containers = ctx.getContainers(id);

  useEffect(() => {
    if (!containers.length) return;

    const updateRatio = () => {
      let sum = 0;
      let count = 0;
      for (const el of containers) {
        if (!el) continue;
        const range =
          direction === 'vertical'
            ? el.scrollHeight - el.clientHeight
            : el.scrollWidth - el.clientWidth;
        if (range <= 0) continue;
        const current =
          direction === 'vertical'
            ? el.scrollTop / range
            : el.scrollLeft / range;
        sum += current;
        count++;
      }
      if (count > 0) setRatio(sum / count);
    };

    updateRatio();
    containers.forEach((el) => el.addEventListener('scroll', updateRatio));
    window.addEventListener('resize', updateRatio);
    return () => {
      containers.forEach((el) => el.removeEventListener('scroll', updateRatio));
      window.removeEventListener('resize', updateRatio);
    };
  }, [containers, direction]);

  const handleChange = (r: number) => {
    setRatio(r);
    ctx.updateScroll(id, direction, r);
  };

  const refs = useMemo(() => containers.map((el) => ({ current: el })), [containers]);

  const defaultStyle: CSSProperties =
    direction === 'vertical'
      ? { display: 'flex', flexDirection: 'column', height: '100%' }
      : { display: 'flex', flexDirection: 'row', width: '100%' };

  return (
    <div style={{ ...defaultStyle, ...style }}>
      <ScrollBarCmp scrollContainer={refs} direction={direction} value={ratio} onChange={handleChange} />
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
