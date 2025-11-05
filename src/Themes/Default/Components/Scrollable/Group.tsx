'use client';

import React, { useEffect, useRef } from 'react';
import { getScrollRange, hideNativeScrollbarsStyles } from './ScrollableCmp';
import { useScrollableContext } from './Context';

export interface GroupProps {
  id?: string;
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

  // ──────────────────────────────────────────────
  // Register / unregister once on mount/unmount
  // ──────────────────────────────────────────────
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

  // ──────────────────────────────────────────────
  // Detect container or content resize/zoom changes
  // ──────────────────────────────────────────────
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf: number | null = null;
    let lastDevicePixelRatio = window.devicePixelRatio;

    const handleResize = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (hId) ctx.containerChanged(hId, 'horizontal', el);
        if (vId) ctx.containerChanged(vId, 'vertical', el);
        raf = null;
      });
    };

    // --- ResizeObserver for container + child ---
    const ro = new ResizeObserver(handleResize);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);

    // --- Window resize fallback ---
    window.addEventListener('resize', handleResize);

    // --- Detect browser zoom / DPI changes ---
    const zoomCheck = setInterval(() => {
      if (window.devicePixelRatio !== lastDevicePixelRatio) {
        lastDevicePixelRatio = window.devicePixelRatio;
        handleResize();
      }
    }, 500);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', handleResize);
      clearInterval(zoomCheck);
    };
  }, [ctx, hId, vId]);

  // ──────────────────────────────────────────────
  // 3Scroll event sync or block
  // ──────────────────────────────────────────────
  const lastX = useRef(0);
  const lastY = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!blockSource) {
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
    }

    // When blockSource is true, prevent user-driven scrolling (but allow MMB)
    const preventUserScroll = (e: MouseEvent | WheelEvent | KeyboardEvent) => {
      if (e instanceof MouseEvent && e.button === 1) return; // allow MMB drag
      e.preventDefault();
    };

    el.addEventListener('wheel', preventUserScroll, { passive: false });
    el.addEventListener('mousedown', preventUserScroll as EventListener, { passive: false });
    el.addEventListener('keydown', preventUserScroll as EventListener, { passive: false });

    return () => {
      el.removeEventListener('wheel', preventUserScroll as EventListener);
      el.removeEventListener('mousedown', preventUserScroll as EventListener);
      el.removeEventListener('keydown', preventUserScroll as EventListener);
    };
  }, [ctx, hId, vId, blockSource]);

  // ──────────────────────────────────────────────
  // 4️Render container
  // ──────────────────────────────────────────────
  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: 0,
        minWidth: 0,
        ...style,
        overflowX: hId ? 'auto' : 'hidden',
        overflowY: vId ? 'auto' : 'hidden',
        ...hideNativeScrollbarsStyles,
      }}
    >
      {children}
    </div>
  );
}

(Group as any).__scrollableRole = 'group';
