'use client';

import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import ScrollBarCmp from '@/Themes/Default/Components/ScrollBar/ScrollBar';
import { Size } from '@/types/extra';
import { ParentSizeObserver } from '../ParentSizeObserver/ParentSizeObserver';
import { useCheckOverflow } from '@/hooks/useCheckOverflow';
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

const ScrollableContainer = styled('div')<{
  size?: Size;
  direction?: 'both' | 'horizontal' | 'vertical';
}>(({ size, direction }) => ({
  position: 'relative',
  display: direction === 'both' ? 'block' : 'flex',
  flexDirection: direction === 'horizontal' ? 'row' :  direction === 'vertical' ? 'column' : undefined,
  width: size?.width ? `${size.width}px` : '100%',
  height: size?.height ? `${size.height}px` : '100%',
  overflowX: direction === 'horizontal' || direction === 'both' ? 'auto' : 'hidden',
  overflowY: direction === 'vertical' || direction === 'both' ? 'auto' : 'hidden',
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
  direction?: 'both' | 'horizontal' | 'vertical';
}

export default function ScrollableCmp({children, direction = 'both'}: ScrollableProps) {
  const { ref: sizeRef, size } = useSizeObserver<HTMLDivElement>({});
  const { ref: containerRef, overflowsX, overflowsY } = useCheckOverflow<HTMLDivElement>([size, children]);

  return (
    <ScrollableRoot ref={sizeRef}>
      <ScrollableContainer ref={containerRef} size={size} direction={direction}>
        {children}
      </ScrollableContainer>

      {direction !== 'vertical' && overflowsX && (
        <OverlayScrollbar style={{ left: 0, right: 0, bottom: 0 }}>
          <ScrollBarCmp scrollContainer={containerRef} direction="horizontal" />
        </OverlayScrollbar>
      )}

      {direction !== 'horizontal' && overflowsY && (
        <OverlayScrollbar style={{ top: 0, bottom: 0, right: 0 }}>
          <ScrollBarCmp scrollContainer={containerRef} direction="vertical" />
        </OverlayScrollbar>
      )}
    </ScrollableRoot>
  );
}
