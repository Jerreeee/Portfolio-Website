'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';
import { useTheme } from '@/Themes/ThemeProvider';
import ImageCompareCmp, { ImageCompareItem } from '@/Themes/Default/Components/ImageCompare/ImageCompareCmp';
import SegmentSliderCmp, { SegmentSliderState } from '@/Themes/Default/Components/SegmentSlider/SegmentSliderCmp';
import { Size } from '@/Types/extra';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { imageMultiCompareCmp } from './ImageMultiCompareCmpClasses';
import Timeline from '../Timeline/Timeline'; // ✅ import directly
import { makeDefaultRangeProvider } from '@/Utils/RangeProvider';
import ParentSizeObserver from '../ParentSizeObserver/ParentSizeObserverCmp';
import { BarLayerProps } from '../Timeline/BarLayer';

// =====================================================================
// ============================= Slot Definitions ======================

const makeSlot = makeSlotFactory('ImageMultiCompareCmp', imageMultiCompareCmp);

const ImageMultiCompareRoot = makeSlot(motion.div, 'root', {
  shouldForwardProp: (prop) => prop !== 'size',
})<{ size?: Size }>(({ size }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  width: '100%',
}));

// =====================================================================
// ============================= Component ==============================

export interface ImageMultiCompareCmpSettings {}

export interface ImageMultiCompareCmpProps {
  images: ImageCompareItem[];
  bars?: BarLayerProps[];
}

export default function ImageMultiCompareCmp({ images, bars = [] }: ImageMultiCompareCmpProps) {
  const { theme } = useTheme();
  const imageCount = images.length;

  const initialProgress = 0.5 * (1 / (imageCount - 1));
  const [sliderState, setSliderState] = useState<SegmentSliderState>(
    SegmentSliderCmp.computeState(initialProgress, imageCount)
  );

  const { segmentIndex, nextTickIdx, segmentPercentage } = sliderState;
  const bottomImage = images[segmentIndex];
  const topImage = images[nextTickIdx];

  if (imageCount < 2) {
    console.error(`[ImageCompareCmp] Expected at least 2 media items, received ${imageCount}. Component will not render.`);
    return null;
  }
  
  return (
    <ImageMultiCompareRoot>
      {/* --- Comparison image --- */}
      <ImageCompareCmp
        bottom={bottomImage}
        top={topImage}
        progress={segmentPercentage}
        enableDrag
        onDrag={(newSegmentProgress) => {
          const segmentCount = imageCount - 1;
          const newGlobalPercentage =
            (segmentIndex + Math.min(newSegmentProgress, 0.9999)) / segmentCount;
          setSliderState({
            ...sliderState,
            percentage: newGlobalPercentage,
            segmentPercentage: newSegmentProgress,
          });
        }}
      />

      {/* --- Segment Slider --- */}
      {imageCount > 2 && (
        <>
          <SegmentSliderCmp
            tickCount={imageCount}
            percentage={sliderState.percentage}
            onChange={setSliderState}
          />

          {/* --- Timeline --- */}
          {bars.length > 0 && (
            <Timeline rangeProvider={makeDefaultRangeProvider([0, imageCount - 1])} showLabels={false} scaleToFit showTopBar={false}>
              {bars.map((barProps, i) => (
                <Timeline.Group key={i}>
                  <Timeline.BarLayer {...barProps} />
                </Timeline.Group>
              ))}
            </Timeline>
          )}
        </>
      )}
    </ImageMultiCompareRoot>
  );
}
