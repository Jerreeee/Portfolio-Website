'use client';

import React, { useEffect, useRef } from 'react';
import { getScrollRange, hideNativeScrollbarsStyles } from './ScrollableCmp';
import { useScrollableContext } from './Context';

export interface GroupProps {
  id?: string; // used for both axes if no specific ids provided
  horizontalId?: string;
  verticalId?: string;
  blockSource?: boolean;

  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Group({
  id,
  horizontalId,
  verticalId,
  blockSource,
  children,
  style,
}: GroupProps) {
  const ctx = useScrollableContext();
  const ref = useRef<HTMLDivElement>(null);

  const hId = horizontalId ?? id;
  const vId = verticalId ?? id;

  // Register containers for both axes if they exist
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (hId) ctx.registerContainer(hId, 'horizontal', el);
    if (vId) ctx.registerContainer(vId, 'vertical', el);

    return () => {
      if (hId) ctx.unregisterContainer(hId, el);
      if (vId) ctx.unregisterContainer(vId, el);
    };
  }, [ctx, hId, vId]);

  const lastX = useRef(0);
  const lastY = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!blockSource) {
      // Normal interactive group: listen to scroll updates
      const onScroll = () => {
        if ((el as any).dataset.__scrollSync === '1') return;

        const dx = el.scrollLeft - lastX.current;
        const dy = el.scrollTop - lastY.current;

        if (hId && dx !== 0) {
          const range = getScrollRange(el, 'horizontal');
          const ratio = range === 0 ? 0 : el.scrollLeft / range;
          ctx.updateScroll(hId, ratio, range, el);
        }

        if (vId && dy !== 0) {
          const range = getScrollRange(el, 'vertical');
          const ratio = range === 0 ? 0 : el.scrollTop / range;
          ctx.updateScroll(vId, ratio, range, el);
        }

        lastX.current = el.scrollLeft;
        lastY.current = el.scrollTop;
      };

      el.addEventListener('scroll', onScroll);
      return () => el.removeEventListener('scroll', onScroll);
    } else {
      // Blocked source group: prevent user interaction
      const preventUserScroll = (e: Event) => e.preventDefault();

      el.addEventListener('wheel', preventUserScroll, { passive: false });
      el.addEventListener('mousedown', preventUserScroll, { passive: false });
      el.addEventListener('keydown', preventUserScroll, { passive: false });

      return () => {
        el.removeEventListener('wheel', preventUserScroll);
        el.removeEventListener('mousedown', preventUserScroll);
        el.removeEventListener('keydown', preventUserScroll);
      };
    }
  }, [ctx, hId, vId, blockSource]);

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'auto',
        minHeight: 0,
        minWidth: 0,
        ...hideNativeScrollbarsStyles,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

(Group as any).__scrollableRole = 'group';
