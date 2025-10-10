'use client';

import React, { useLayoutEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useTheme } from '@/Themes/ThemeProvider'
import { makeSlotFactory } from '@/utils/makeSlotFactory';
import { segmentSliderCmp } from './SegmentSliderCmpClasses';

// =====================================================================
// ========================= Slot Definitions ==========================

const makeSlot = makeSlotFactory('SegmentSliderCmp', segmentSliderCmp);

const SegmentSliderRoot = makeSlot('div', 'root')(({ theme }) => ({
  position: 'relative',
  height: theme.spacing(3), // ~24px
  width: '100%',
  userSelect: 'none',
}));

const SegmentSliderBar = makeSlot('div', 'bar')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: 0,
  width: '100%',
  height: theme.spacing(0.25),
  backgroundColor: theme.palette.grey[700],
  borderRadius: theme.shape.borderRadius,
  transform: 'translateY(-50%)',
}));

const SegmentSliderTicks = makeSlot('div', 'ticks')({
  position: 'absolute',
  top: '50%',
  left: 0,
  width: '100%',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
});

const SegmentSliderTick = makeSlot('div', 'tick')(({ theme }) => ({
  position: 'absolute',
  width: 1,
  height: theme.spacing(1),
  backgroundColor: theme.palette.grey[500],
  transform: 'translateY(-50%)',
}));

const SegmentSliderHighlight = makeSlot('div', 'highlight')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  height: theme.spacing(0.25),
  backgroundColor: 'rgba(255,255,255,0.2)',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
}));

const SegmentSliderHandle = makeSlot('div', 'handle')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  width: theme.spacing(1),
  height: theme.spacing(3),
  backgroundColor: theme.palette.common.white,
  borderRadius: typeof theme.shape.borderRadius === 'number'
    ? `${theme.shape.borderRadius}px`
    : theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  cursor: 'pointer',
  transform: 'translateX(-50%)',
  pointerEvents: 'none',
}));

// =====================================================================
// ============================= Component =============================

export interface SegmentSliderState {
    percentage: number;
    segmentIndex: number;
    segmentPercentage: number;
    prevTickIdx: number;
    nextTickIdx: number;
}

export interface SegmentSliderCmpSettings {}

export interface SegmentSliderCmpProps {
  tickCount: number;          // number of tick marks, segmentCount will be tickCount - 1
  percentage: number;         // 0 – 1
  segmentIndex?: number;       // currently active segment
  onChange?: (props: SegmentSliderState) => void;
}

SegmentSliderCmp.computeState = function computeSliderState(
  percentage: number,
  tickCount: number
): SegmentSliderState {
  const segmentCount = tickCount - 1;
  const raw = percentage * segmentCount;
  const segmentIndex = Math.min(Math.floor(raw), segmentCount - 1);
  const segmentPercentage = raw - segmentIndex;
  const prevTickIdx = segmentIndex;
  const nextTickIdx = Math.min(segmentIndex + 1, segmentCount);
  return { percentage, segmentIndex, segmentPercentage, prevTickIdx, nextTickIdx };
};

SegmentSliderCmp.computeGlobalPercentage = function computeGlobalPercentage(
  percentage: number,
  tickCount: number,
  segmentIndex?: number
): number {
  return segmentIndex !== undefined ? (segmentIndex + percentage) / (tickCount - 1) : percentage;
};

export default function SegmentSliderCmp(props: SegmentSliderCmpProps) {
  const { theme } = useTheme();
  
  const segmentCount = props.tickCount - 1;
  const [state, setState] = useState<SegmentSliderState>(
    () => SegmentSliderCmp.computeState(SegmentSliderCmp.computeGlobalPercentage(props.percentage, props.tickCount, props.segmentIndex), props.tickCount)
  );

  useLayoutEffect(() => {
    setState(SegmentSliderCmp.computeState(SegmentSliderCmp.computeGlobalPercentage(props.percentage, props.tickCount, props.segmentIndex), props.tickCount));
  }, [props.tickCount, props.percentage, props.segmentIndex]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newGlobalPercentage = parseFloat(e.target.value);
    const newInfo = SegmentSliderCmp.computeState(newGlobalPercentage, props.tickCount);
    setState(newInfo);
    props.onChange?.(newInfo);
  }

  return (
    <SegmentSliderRoot>
      {/* Horizontal Bar */}
      <SegmentSliderBar/>

      {/* Tick Marks */}
      <SegmentSliderTicks>
        {Array.from({ length: props.tickCount }).map((_, i) => (
          <SegmentSliderTick
            key={i}
            sx={{ left: `${(i / segmentCount) * 100}%` }}
          />
        ))}
      </SegmentSliderTicks>

      {/* Current Segment Highlight */}
      <SegmentSliderHighlight
        sx={{
          left: `${(state.segmentIndex / segmentCount) * 100}%`,
          width: `${100 / segmentCount}%`,
        }}
      />

      {/* Draggable Handle */}
      <SegmentSliderHandle
        sx={{ left: `${state.percentage * 100}%` }}
      />

      {/* Transparent Range Input */}
      <input
        type="range"
        min={0}
        max={1}
        step="any"
        value={state.percentage}
        onChange={handleChange}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
          cursor: 'pointer',
          zIndex: 100,
        }}
      />
    </SegmentSliderRoot>
  );
}
