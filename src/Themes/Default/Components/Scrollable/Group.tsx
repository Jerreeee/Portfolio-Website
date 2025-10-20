'use client';

import React, { useEffect, useRef } from 'react';
import { hideNativeScrollbarsStyles } from './ScrollableCmp';
import { useScrollableContext } from './Context';

export interface GroupProps {
  id: string;
  direction?: 'horizontal' | 'vertical' | 'both';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Group({ id, direction = 'both', children, style }: GroupProps) {
  const ctx = useScrollableContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ctx || !ref.current) return;
    ctx.registerContainer(id, ref.current);
    return () => ctx.unregisterContainer(id, ref.current!);
  }, [ctx, id]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !ctx) return;

    function onScroll() {
      const hRatio = el!.scrollLeft / ((el!.scrollWidth - el!.clientWidth) || 1);
      const vRatio = el!.scrollTop / ((el!.scrollHeight - el!.clientHeight) || 1);
      if (direction === 'horizontal' || direction === 'both') ctx.updateScroll(id, 'horizontal', hRatio);
      if (direction === 'vertical' || direction === 'both') ctx.updateScroll(id, 'vertical', vRatio);
    }

    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, [ctx, id, direction]);

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflowX: direction !== 'vertical' ? 'auto' : 'hidden',
        overflowY: direction !== 'horizontal' ? 'auto' : 'hidden',
        ...hideNativeScrollbarsStyles,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

(Group as any).__scrollableRole = 'group';
