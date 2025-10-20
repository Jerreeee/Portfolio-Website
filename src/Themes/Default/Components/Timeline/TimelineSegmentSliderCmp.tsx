'use client';

import React, { useLayoutEffect, useState } from 'react';
import { useTheme } from '@/Themes/ThemeProvider';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { timelineSegmentSliderCmp } from './TimelineSegmentSliderCmpClasses';
import { useTimeline } from './Context';

const makeSlot = makeSlotFactory('TimelineSegmentSliderCmp', timelineSegmentSliderCmp);

const SegmentSliderRoot = makeSlot('div', 'root')(({ theme }) => ({
  position: 'relative',
  height: theme.spacing(3),
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

const SegmentSliderTick = makeSlot('div', 'tick')(({ theme }) => ({
  position: 'absolute',
  width: 1,
  height: theme.spacing(1),
  backgroundColor: theme.palette.grey[500],
  transform: 'translateY(-50%)',
}));

const SegmentSliderHandle = makeSlot('div', 'handle')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  width: theme.spacing(1),
  height: theme.spacing(3),
  backgroundColor: theme.palette.common.white,
  borderRadius:
    typeof theme.shape.borderRadius === 'number'
      ? `${theme.shape.borderRadius}px`
      : theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  cursor: 'pointer',
  transform: 'translateX(-50%)',
  pointerEvents: 'none',
}));

export interface TimelineCmpSegmentSliderProps {
  tickCount: number;
}

export default function TimelineCmpSegmentSlider({ tickCount }: TimelineCmpSegmentSliderProps) {
  // const { currentValue, setCurrentValue, range, scale, unscale } = useTimeline();
  // const { theme } = useTheme();

  // const [percentage, setPercentage] = useState(scale(currentValue));
  // const segmentCount = tickCount - 1;

  // useLayoutEffect(() => {
  //   setPercentage(scale(currentValue));
  // }, [currentValue, scale]);

  // function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   const newPercentage = parseFloat(e.target.value);
  //   const newValue = unscale(newPercentage);
  //   setPercentage(newPercentage);
  //   setCurrentValue(newValue);
  // }

  // return (
  //   <SegmentSliderRoot>
  //     <SegmentSliderBar />
  //     {Array.from({ length: tickCount }).map((_, i) => (
  //       <SegmentSliderTick key={i} sx={{ left: `${(i / segmentCount) * 100}%` }} />
  //     ))}
  //     <SegmentSliderHandle sx={{ left: `${percentage * 100}%` }} />
  //     <input
  //       type="range"
  //       min={0}
  //       max={1}
  //       step="any"
  //       value={percentage}
  //       onChange={handleChange}
  //       style={{
  //         position: 'absolute',
  //         inset: 0,
  //         width: '100%',
  //         height: '100%',
  //         opacity: 0,
  //         cursor: 'pointer',
  //         zIndex: 100,
  //       }}
  //     />
  //   </SegmentSliderRoot>
  // );
}
