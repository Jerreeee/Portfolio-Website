'use client';

import React, { useEffect, useRef } from 'react';
import { hideNativeScrollbarsStyles } from './ScrollableCmp';
import { useScrollableContext } from './Context';

export interface GroupProps {
  id?: string;
  horizontalId?: string;
  verticalId?: string;
  direction?: 'horizontal' | 'vertical' | 'both';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Group({
  id,
  horizontalId,
  verticalId,
  direction = 'both',
  children,
  style,
}: GroupProps) {
  const ctx = useScrollableContext();
  const ref = useRef<HTMLDivElement>(null);

  const hId = horizontalId ?? (direction !== 'vertical' ? id : undefined);
  const vId = verticalId ?? (direction !== 'horizontal' ? id : undefined);

  // Register the element for one or both ids
  useEffect(() => {
    const el = ref.current;
    if (!ctx || !el) return;
    if (hId) ctx.registerContainer(hId, el);
    if (vId && vId !== hId) ctx.registerContainer(vId, el);
    return () => {
      if (hId) ctx.unregisterContainer(hId, el);
      if (vId && vId !== hId) ctx.unregisterContainer(vId, el);
    };
  }, [ctx, hId, vId]);

  // Sync scroll events
  useEffect(() => {
    const el = ref.current;
    if (!el || !ctx) return;

    const onScroll = () => {
      const element = el as HTMLDivElement; // ✅ non-null narrowing
      const hRatio = element.scrollLeft / ((element.scrollWidth - element.clientWidth) || 1);
      const vRatio = element.scrollTop / ((element.scrollHeight - element.clientHeight) || 1);
      if (hId) ctx.updateScroll(hId, 'horizontal', hRatio, element);
      if (vId) ctx.updateScroll(vId, 'vertical', vRatio, element);
    };

    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, [ctx, hId, vId]);

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
