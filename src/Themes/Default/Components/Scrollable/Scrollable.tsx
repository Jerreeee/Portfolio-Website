'use client';

import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import ScrollBarCmp from '@/Themes/Default/Components/ScrollBar/ScrollBar';
import { Size } from '@/types/extra';
import { ParentSizeObserver } from '../ParentSizeObserver/ParentSizeObserver';
import { useCheckOverflow } from '@/hooks/useCheckOverflow';
import { useSizeObserver } from '@/hooks/useSizeObserver';
import { SxProps, Theme } from '@mui/material/styles';

// =====================================================================
// ========================= Slot Definitions ==========================

const ScrollableRoot = styled('div')({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column', // vertical stacking by default
});

const ViewportWrapper = styled('div')({
  position: 'relative',
  flex: '1 1 auto',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  display: 'flex',
});

const ScrollableContainer = styled('div')<{
  size?: Size;
  direction?: 'both' | 'horizontal' | 'vertical';
}>(({ theme, size, direction }) => ({
  position: 'relative',
  display: direction === 'both' ? 'block' : 'flex',
  flexDirection:
    direction === 'horizontal'
      ? 'row'
      : direction === 'vertical'
      ? 'column'
      : undefined,
  width: size?.width ? `${size.width}px` : '100%',
  height: size?.height ? `${size.height}px` : '100%',
  overflowX: direction === 'horizontal' || direction === 'both' ? 'auto' : 'hidden',
  overflowY: direction === 'vertical' || direction === 'both' ? 'auto' : 'hidden',
  borderRadius: theme.shape.borderRadius,
  // zIndex: 0,
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': { display: 'none', width: 0, height: 0 },
}));

const ScrollbarRow = styled('div')({
  flexShrink: 0,
  width: '100%',
  height: '12px', // your scrollbar height
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ScrollbarColumn = styled('div')({
  flexShrink: 0,
  width: '12px', // your scrollbar width
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});


// =====================================================================
// ============================= Component =============================

export interface ScrollableProps {
  children: React.ReactNode;
  direction?: 'both' | 'horizontal' | 'vertical';
  containerSx?: SxProps<Theme>;
}

export default function ScrollableCmp({
  children,
  direction = 'both',
  containerSx,
}: ScrollableProps) {
  const { ref: sizeRef, size } = useSizeObserver<HTMLDivElement>({});
  const { ref: containerRef, overflowsX, overflowsY } = useCheckOverflow<HTMLDivElement>([size?.width, size?.height, children]);

  return (
    <ScrollableRoot>
      {/* Viewport measured separately */}
      <ViewportWrapper ref={sizeRef}>
        <ScrollableContainer ref={containerRef} size={size} direction={direction} sx={containerSx}>
          {children}
        </ScrollableContainer>

        {/* Vertical scrollbar on the right */}
        {direction !== 'horizontal' && overflowsY && (
          <ScrollbarColumn>
            <ScrollBarCmp scrollContainer={containerRef} direction="vertical" />
          </ScrollbarColumn>
        )}
      </ViewportWrapper>

      {/* Horizontal scrollbar below */}
      {direction !== 'vertical' && overflowsX && (
        <div style={{ display: 'flex', width: '100%' }}>
          {/* Horizontal scrollbar */}
          <ScrollbarRow
            style={{
              width: overflowsY ? 'calc(100% - 12px)' : '100%',
            }}
          >
            <ScrollBarCmp
              scrollContainer={containerRef}
              direction="horizontal"
            />
          </ScrollbarRow>

          {/* Bottom-right corner filler (only if both scrollbars exist) */}
          {overflowsY && (
            <div
              style={{
                width: 12,
                height: 12,
                flexShrink: 0,
                background: 'transparent',
              }}
            />
          )}
        </div>
      )}
    </ScrollableRoot>
  );
}

