// @generate-component-classes
'use client';

import React from 'react';
import { useTheme } from '@/Themes/ThemeProvider';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { graphLayer } from './GraphLayerClasses';
import { useTimeline } from './Context';
import type { LayerProps } from './Layer';

export const GRAPH_FLAG = '__isTimelineGraphLayer';

const makeSlot = makeSlotFactory('TimelineGraphLayer', graphLayer);

const Root = makeSlot('div', 'root')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  background: theme.palette.background.default,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export interface GraphPoint {
  x: number;
  y: number; // normalized [0..1]
}

export interface GraphLayerProps extends LayerProps {
  data: GraphPoint[];
  strokeWidth?: number;
  /** Optional height override for this visual layer (default 60px) */
  color?: string;
}

export default function GraphLayer({
  name,
  data,
  strokeWidth = 2,
  height = 60,
  color,
  children,
}: GraphLayerProps) {
  const { theme } = useTheme();
  const { rangeProvider } = useTimeline();
  const { normalize } = rangeProvider;

  const stroke = color ?? theme.palette.primary.main;

  // Generate snapped coordinates (to reduce subpixel blur)
  const points = data
    .map((p) => {
      const x = Math.round(normalize(p.x) * 1000) / 10; // snap to 0.1
      const y = Math.round((1 - p.y) * 1000) / 10;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <Root sx={{ height: height }}>
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        style={{ display: 'block' }}
        shapeRendering="geometricPrecision"
      >
        <polyline
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          vectorEffect="non-scaling-stroke"
          points={points}
        />
      </svg>
    </Root>
  );
}

(GraphLayer as any)[GRAPH_FLAG] = true;
