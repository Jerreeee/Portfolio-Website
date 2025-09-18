'use client';

import React from 'react';
import { useTheme } from '@/Themes/ThemeProvider';

export type SegmentSliderTheme = {};

export interface SegmentSliderProps {
  count: number;                   // total images
  segmentCount: number;            // images.length - 1
  segmentIndex: number;            // current segment index
  sliderValue: number;             // 0 – 1
  onChange: (value: number) => void;
}

/**
 * Pure visual & interactive bottom slider for ImageCompareCmp
 */
export function SegmentSliderCmp(props: SegmentSliderProps) {
  const { theme: activeTheme } = useTheme();
  const theme: SegmentSliderTheme = activeTheme.components.segmentSlider.theme;

  return (
    <div className="relative h-6 w-full select-none ">
      {/* Horizontal Bar */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700 rounded transform -translate-y-1/2" />

      {/* Tick Marks */}
      <div className="absolute top-1/2 left-0 w-full transform -translate-y-1/2 pointer-events-none">
        {Array.from({ length: props.count }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-4 bg-gray-500 transform -translate-y-1/2"
            style={{ left: `${(i / props.segmentCount) * 100}%`, top: '50%' }}
          />
        ))}
      </div>

      {/* Current Segment Highlight */}
      <div
        className="absolute top-1/2 h-1 bg-white/20 transform -translate-y-1/2 pointer-events-none"
        style={{
          left: `${(props.segmentIndex / props.segmentCount) * 100}%`,
          width: `${100 / props.segmentCount}%`,
        }}
      />

      {/* Draggable Handle */}
      <div
        className="absolute top-0 w-3 h-6 bg-white rounded-full shadow-md cursor-pointer transform -translate-x-1/2"
        style={{ left: `${props.sliderValue * 100}%` }}
      />

      {/* Transparent Range Input */}
      <input
        type="range"
        min={0}
        max={1}
        step="any"
        value={props.sliderValue}
        onChange={(e) => props.onChange(parseFloat(e.target.value))}
        className="absolute inset-0 w-full opacity-0 cursor-pointer"
      />
    </div>
  );
}
