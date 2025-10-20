'use client';

import React, { useEffect, useRef } from 'react';
import { hideNativeScrollbarsStyles } from './ScrollableCmp';
import { useScrollableContext } from './Context';
import { Direction, MultiDirection } from '../ScrollBar/ScrollBarCmp'

export interface GroupProps {
  /** Optional: single id used for whichever axes are enabled by `direction` */
  id?: string;

  /** Use different link ids per axis (recommended when syncing to separate groups) */
  horizontalId?: string;
  verticalId?: string;
  direction?: MultiDirection; // Which axes this container should scroll on
  blockSource?: boolean; // If true, this container will not be used as a scroll source

  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Group({
  id,
  horizontalId,
  verticalId,
  direction = 'horizontal',
  blockSource,
  children,
  style,
}: GroupProps) {
  const ctx = useScrollableContext();
  const ref = useRef<HTMLDivElement>(null);

  // Resolve which ids to register per axis
  const hId = horizontalId ?? (direction === 'horizontal' ? id : undefined);
  const vId = verticalId ?? (direction === 'vertical' ? id : undefined);

  // Register for one/both axes
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (direction !== 'vertical' && hId) ctx.registerContainer(hId, 'horizontal', el);
    if (direction !== 'horizontal' && vId && vId !== hId) ctx.registerContainer(vId, 'vertical', el);

    return () => {
      if (direction !== 'vertical' && hId) ctx.unregisterContainer(hId, el);
      if (direction !== 'horizontal' && vId) ctx.unregisterContainer(vId, el);
    };
  }, [ctx, hId, vId, direction]);

  // Track last known scroll positions to detect which axis changed
  const lastX = useRef(0);
  const lastY = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      // Ignore programmatic scrolls
      if ((el as any).dataset.__scrollSync === '1') return;

      const dx = el.scrollLeft - lastX.current;
      const dy = el.scrollTop - lastY.current;

      if (hId && direction !== 'vertical' && dx !== 0) {
        ctx.updateScroll(hId, 0, el);
      }
      if (vId && direction !== 'horizontal' && dy !== 0) {
        ctx.updateScroll(vId, 0, el);
      }

      lastX.current = el.scrollLeft;
      lastY.current = el.scrollTop;
    };

    if (!blockSource) {
      el.addEventListener('scroll', onScroll);
    }

    // Block user-initiated scrolling (wheel/MMB/keyboard)
    const preventUserScroll = (e: Event) => {
      if (blockSource) e.preventDefault();
    };

    el.addEventListener('wheel', preventUserScroll, { passive: false });
    el.addEventListener('mousedown', preventUserScroll, { passive: false });
    el.addEventListener('keydown', preventUserScroll, { passive: false });

    return () => {
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('wheel', preventUserScroll);
      el.removeEventListener('mousedown', preventUserScroll);
      el.removeEventListener('keydown', preventUserScroll);
    };
  }, [ctx, hId, vId, direction, blockSource]);

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflowX: direction !== 'vertical' ? 'auto' : 'hidden',
        overflowY: direction !== 'horizontal' ? 'auto' : 'hidden',
        // These help inside CSS grid/flex so the element can actually scroll:
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
