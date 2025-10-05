'use client';

import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import ScrollBarCmp from '@/Themes/Default/Components/ScrollBar/ScrollBar';
import { Size } from '@/types/extra';

// =====================================================================
// ========================= Slot Definitions ==========================

const ScrollableRoot = styled('div', {
  name: 'Scrollable',
  slot: 'Root',
})<{ size?: Size }>(({ size }) => ({
  position: 'relative',
  width: size?.width ? `${size.width}px` : '100%',
  height: size?.height ? `${size.height}px` : '100%',
}));

const ScrollableContainer = styled('div', { name: 'Scrollable', slot: 'Container' })({
  position: 'relative',
  display: 'block',
  width: '100%',
  height: '100%',
  overflow: 'auto',
  zIndex: 0,
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': { display: 'none', width: 0, height: 0 },
});

const OverlayScrollbar = styled('div')({
  position: 'absolute',
  zIndex: 50,
  pointerEvents: 'auto', // ✅ allow interaction
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'none',
});

// =====================================================================
// ============================= Component =============================

export interface ScrollableProps {
  children: React.ReactNode;
  size?: Size;
}

export default function ScrollableCmp(props: ScrollableProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [needsHorizontal, setNeedsHorizontal] = useState(false);
  const [needsVertical, setNeedsVertical] = useState(false);

  console.log("needsHorizontal", needsHorizontal);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const checkScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      setNeedsHorizontal(el.scrollWidth > el.clientWidth);
      setNeedsVertical(el.scrollHeight > el.clientHeight);
    };

    // Initial check after mount
    checkScroll();

    // Observe content size changes dynamically
    const observer = new ResizeObserver(checkScroll);
    const firstChild = el.firstElementChild as HTMLElement | null;
    if (firstChild) observer.observe(firstChild);

    // Also listen to container resize (e.g. window resize)
    const containerObserver = new ResizeObserver(checkScroll);
    containerObserver.observe(el);

    return () => {
      observer.disconnect();
      containerObserver.disconnect();
    };
  }, [props.size?.width, props.size?.height, props.children]);

  return (
    <ScrollableRoot size={props.size}>
      <ScrollableContainer ref={containerRef}>{props.children}</ScrollableContainer>

      {needsHorizontal && (
        <OverlayScrollbar style={{ left: 0, right: 0, bottom: 0 }}>
          <ScrollBarCmp scrollContainer={containerRef} direction="horizontal" />
        </OverlayScrollbar>
      )}

      {needsVertical && (
        <OverlayScrollbar style={{ top: 0, bottom: 0, right: 0 }}>
          <ScrollBarCmp scrollContainer={containerRef} direction="vertical" />
        </OverlayScrollbar>
      )}
    </ScrollableRoot>
  );
}
