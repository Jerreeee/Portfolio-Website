'use client';

import React from 'react';
import { useTimeline } from './Context';
import { useTheme } from '@/Themes/ThemeProvider';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { timelineBarLayerCmp } from './TimelineBarLayerCmpClasses';

const makeSlot = makeSlotFactory('TimelineBarLayerCmp', timelineBarLayerCmp);

const BarLayerRoot = makeSlot('div', 'root')(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  height: '100%',
}));

const Bar = makeSlot('div', 'bar')(({ theme }) => ({
  position: 'absolute',
  top: '20%',
  height: '60%',
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  fontSize: theme.typography.caption.fontSize,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export interface TimelineCmpBar {
  start: number;
  end: number;
  label?: string;
  color?: string;
}

export interface TimelineCmpBarLayerProps {
  bars: TimelineCmpBar[];
}

export default function TimelineCmpBarLayer({ bars }: TimelineCmpBarLayerProps) {
  const { rangeProvider: provider } = useTimeline();
  const { scale, start, end, fitToRange, pixelsPerUnit } = provider;
  const { theme } = useTheme();

  return (
    <BarLayerRoot>
      {bars.map((bar, i) => {
        const left  = scale(bar.start) * 100;
        const width = (scale(bar.end) - scale(bar.start)) * 100;
        return (
          <Bar
            key={i}
            sx={{
              left: `${left}%`,
              width: `${width}%`,
              backgroundColor: bar.color || theme.palette.primary.main,
            }}
          >
            {bar.label}
          </Bar>
        );
      })}
    </BarLayerRoot>
  );
}
