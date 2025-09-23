'use client';

import React from 'react';
import { Component } from '@/Themes/BaseTheme'
import { useTheme } from '@/Themes/ThemeProvider';

export type SegmentSliderSettings = {};

export interface SegmentSliderProps {
  count: number;                   // total images
  segmentCount: number;            // images.length - 1
  segmentIndex: number;            // current segment index
  sliderValue: number;             // 0 – 1
  onChange: (value: number) => void;
}

export const SegmentSliderCmp = SegmentSliderCmpInternal as Component<
  SegmentSliderSettings,
  SegmentSliderProps
>;

/**
 * Pure visual & interactive bottom slider for ImageCompareCmp
 */
export function SegmentSliderCmpInternal(props: SegmentSliderProps) {
  const { theme: activeTheme } = useTheme();
  const settings: SegmentSliderSettings = activeTheme.components.segmentSlider?.settings;
  if (!settings) return null;

    return (
    <div className="segment-slider relative h-6 w-full select-none">
      {/* Horizontal Bar */}
      <div className="bg-red segment-slider__bar absolute top-1/2 left-0 w-full h-1 transform -translate-y-1/2" />

      {/* Tick Marks */}
      <div className="segment-slider__ticks absolute top-1/2 left-0 w-full transform -translate-y-1/2 pointer-events-none">
        {Array.from({ length: props.count }).map((_, i) => (
          <div
            key={i}
            className="segment-slider__tick absolute w-px h-4 transform -translate-y-1/2"
            style={{ left: `${(i / props.segmentCount) * 100}%`, top: '50%' }}
          />
        ))}
      </div>

      {/* Current Segment Highlight */}
      <div
        className="segment-slider__highlight absolute top-1/2 h-1 transform -translate-y-1/2 pointer-events-none"
        style={{
          left: `${(props.segmentIndex / props.segmentCount) * 100}%`,
          width: `${100 / props.segmentCount}%`,
        }}
      />

      {/* Draggable Handle */}
      <div
        className="segment-slider__handle absolute top-0 w-3 h-6 transform -translate-x-1/2 cursor-pointer"
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
