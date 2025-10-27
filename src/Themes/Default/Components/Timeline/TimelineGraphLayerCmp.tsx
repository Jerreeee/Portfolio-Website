'use client';

import React from 'react';
import { useTimeline } from './Context';
import { useTheme } from '@/Themes/ThemeProvider';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { timelineCmp } from './TimelineCmpClasses';

const makeSlot = makeSlotFactory('TimelineGraphLayerCmp', timelineCmp);

const GraphLayerRoot = makeSlot('div', 'root')(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  overflow: 'hidden',
}));

export interface TimelineCmpGraphPoint {
  time: number;
  value: number;
}

export interface TimelineCmpGraphLayerProps {
  data: TimelineCmpGraphPoint[];
  color?: string;
  strokeWidth?: number;
  minY?: number;
  maxY?: number;
  filled?: boolean;
  fillOpacity?: number;
}

/**
 * Renders a simple SVG line or area graph using the global X scale from the timeline.
 * Y values are scaled locally within this layer.
 */
export default function TimelineCmpGraphLayer({
  data,
  color,
  strokeWidth = 2,
  minY,
  maxY,
  filled = false,
  fillOpacity = 0.15,
}: TimelineCmpGraphLayerProps) {
  const { rangeProvider: provider } = useTimeline();
  const { normalize: scale, start, end, clampToRange: fitToRange, pixelsPerUnit } = provider;
  const { theme } = useTheme();

  if (!data || data.length === 0) return null;

  // Compute Y domain
  const yMin = minY ?? Math.min(...data.map((d) => d.value));
  const yMax = maxY ?? Math.max(...data.map((d) => d.value));
  const yRange = yMax - yMin || 1;

  // Y scale maps values → pixel positions (0 at top, 1 at bottom)
  const scaleY = (v: number, height: number) => height * (1 - (v - yMin) / yRange);

  // Compute SVG path string
  const getPath = (width: number, height: number) => {
    const points = data.map((d) => {
      const x = scale(d.time) * width;
      const y = scaleY(d.value, height);
      return [x, y];
    });

    const path = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ');
    return path;
  };

  return (
    <GraphLayerRoot>
      <svg
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0 }}
        preserveAspectRatio="none"
      >
        <GraphPath
          color={color || theme.palette.primary.main}
          strokeWidth={strokeWidth}
          filled={filled}
          fillOpacity={fillOpacity}
          getPath={getPath}
        />
      </svg>
    </GraphLayerRoot>
  );
}

/**
 * Internal component that measures SVG size and renders the path accordingly.
 * (needed because we need container width/height to compute coordinates)
 */
function GraphPath({
  color,
  strokeWidth,
  filled,
  fillOpacity,
  getPath,
}: {
  color: string;
  strokeWidth: number;
  filled: boolean;
  fillOpacity: number;
  getPath: (width: number, height: number) => string;
}) {
  const ref = React.useRef<SVGPathElement>(null);
  const [size, setSize] = React.useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  React.useLayoutEffect(() => {
    const parent = ref.current?.ownerSVGElement?.getBoundingClientRect();
    if (parent) {
      setSize({ width: parent.width, height: parent.height });
    }
  }, []);

  const d = size.width > 0 ? getPath(size.width, size.height) : '';

  return (
    <>
      {filled && (
        <path
          d={`${d} L${size.width},${size.height} L0,${size.height} Z`}
          fill={color}
          opacity={fillOpacity}
        />
      )}
      <path ref={ref} d={d} fill="none" stroke={color} strokeWidth={strokeWidth} />
    </>
  );
}
