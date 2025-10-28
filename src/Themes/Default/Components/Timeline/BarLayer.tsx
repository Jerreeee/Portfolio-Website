// @generate-component-classes
'use client';

import React from 'react';
import { useTheme } from '@/Themes/ThemeProvider';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { barLayer } from './BarLayerClasses';
import { useTimeline } from './Context';

export const BAR_FLAG = '__isTimelineBarLayer';

const makeSlot = makeSlotFactory('TimelineBarLayer', barLayer);

const Root = makeSlot('div', 'root')(() => ({
  position: 'relative',
  width: '100%',
  height: '100%',
}));

const Bar = makeSlot('div', 'bar')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  height: '100%',
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  fontSize: theme.typography.caption.fontSize,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

export interface Bar {
  start: number;
  end: number;
  label?: string;
  color?: string;
}

export interface BarLayerProps {
  bars: Bar[];
  /** Optional height override for this visual layer (default 28px) */
  height?: number;
}

export default function BarLayer({ bars, height = 20 }: BarLayerProps) {
  const { theme } = useTheme();
  const { rangeProvider } = useTimeline();
  const { normalize } = rangeProvider;

  return (
    <Root style={{ height }}>
      {bars.map((b, i) => {
        const left = normalize(b.start) * 100;
        const width = (normalize(b.end) - normalize(b.start)) * 100;
        if (left >= 100 || width <= 0) return null;

        return (
          <Bar
            key={i}
            sx={{
              left: `${left}%`,
              width: `${width}%`,
              backgroundColor: b.color || theme.palette.primary.main,
            }}
            title={b.label}
          >
            {b.label}
          </Bar>
        );
      })}
    </Root>
  );
}

(BarLayer as any)[BAR_FLAG] = true;
