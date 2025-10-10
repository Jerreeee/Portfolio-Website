'use client';

import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import ScrollBarCmp from '@/Themes/Default/Components/ScrollBar/ScrollBarCmp';
import { Size } from '@/types/extra';
import { useTheme } from '@/Themes/ThemeProvider';
import { useCheckOverflow } from '@/hooks/useCheckOverflow';
import { useSizeObserver } from '@/hooks/useSizeObserver';
import { makeSlotFactory } from '@/utils/makeSlotFactory';
import { scrollableCmp } from './ScrollableCmpClasses';

// =====================================================================
// ========================= Slot Definitions ==========================

const makeSlot = makeSlotFactory('ScrollableCmp', scrollableCmp);

const ScrollableRoot = makeSlot('div', 'root')({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column', // vertical stacking by default
});

const ViewportWrapper = makeSlot('div', 'viewportWrapper')({
  position: 'relative',
  flex: '1 1 auto',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  display: 'flex',
});

const ScrollableContainer = makeSlot('div', 'container')<{
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

const ScrollbarRow = makeSlot('div', 'row')(({ theme }) => ({
  flexShrink: 0,
  width: '100%',
  height: theme.components?.ScrollBarCmp?.settings?.thickness ?? 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ScrollbarColumn = makeSlot('div', 'column')(({ theme }) => ({
  flexShrink: 0,
  width: theme.components?.ScrollBarCmp?.settings?.thickness ?? 12,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// =====================================================================
// ============================= Component =============================

export interface ScrollableCmpSettings {}

export interface ScrollableCmpProps {
  children: React.ReactNode;
  direction?: 'both' | 'horizontal' | 'vertical';
}

export default function ScrollableCmp({
  children,
  direction = 'both',
}: ScrollableCmpProps) {
  const { theme } = useTheme();
  const thickness = theme.components?.ScrollBarCmp?.settings?.thickness ?? 12;

  const { ref: sizeRef, size } = useSizeObserver<HTMLDivElement>({});
  const { ref: containerRef, overflowsX, overflowsY } = useCheckOverflow<HTMLDivElement>([size?.width, size?.height, children]);

  return (
    <ScrollableRoot>
      {/* Viewport measured separately */}
      <ViewportWrapper ref={sizeRef}>
        <ScrollableContainer
          ref={containerRef}
          size={size}
          direction={direction}
        >
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
            sx={{
              width: overflowsY ? `calc(100% - ${thickness}px)` : '100%',
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
                width: thickness,
                height: thickness,
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
