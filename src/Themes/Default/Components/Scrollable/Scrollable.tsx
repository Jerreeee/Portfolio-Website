'use client';

import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import ScrollBarCmp from '@/Themes/Default/Components/ScrollBar/ScrollBar';
import { Size } from '@/types/extra';
import { ParentSizeObserver } from '../ParentSizeObserver/ParentSizeObserver';
import { useCheckChildOverflow } from '@/hooks/useCheckChildOverflow';
import { useSizeObserver } from '@/hooks/useSizeObserver';

// =====================================================================
// ========================= Slot Definitions ==========================

const ScrollableRoot = styled('div', {
  name: 'Scrollable',
  slot: 'Root',
})({
  position: 'relative',
  width: '100%',
  height: '100%',
});

const ScrollableContainer = styled('div')<{ size?: Size }>(({ size }) => ({
  position: 'relative',
  display: 'block',
  width: size?.width ? `${size.width}px` : '100%',
  height: size?.height ? `${size.height}px` : 'auto',
  overflow: 'auto',
  zIndex: 0,
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': { display: 'none', width: 0, height: 0 },
}));

const OverlayScrollbar = styled('div')({
  position: 'absolute',
  zIndex: 50,
  pointerEvents: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'none',
});

// =====================================================================
// ============================= Component =============================

export interface ScrollableProps {
  children: React.ReactNode;
}

export default function ScrollableCmp(props: ScrollableProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: sizeRef, size } = useSizeObserver<HTMLDivElement>({});
  const { overflowsX, overflowsY } = useCheckChildOverflow(containerRef, [
    size?.width,
    size?.height,
    props.children,
  ]);

  return (
    <ScrollableRoot ref={sizeRef}>
      <ScrollableContainer ref={containerRef} size={size}>
        {props.children}
      </ScrollableContainer>

      {overflowsX && (
        <OverlayScrollbar style={{ left: 0, right: 0, bottom: 0 }}>
          <ScrollBarCmp scrollContainer={containerRef} direction="horizontal" />
        </OverlayScrollbar>
      )}

      {overflowsY && (
        <OverlayScrollbar style={{ top: 0, bottom: 0, right: 0 }}>
          <ScrollBarCmp scrollContainer={containerRef} direction="vertical" />
        </OverlayScrollbar>
      )}
    </ScrollableRoot>
  );
}
