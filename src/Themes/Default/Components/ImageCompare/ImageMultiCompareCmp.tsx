'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';
import { useTheme } from '@/Themes/ThemeProvider';
import ImageCompareCmp, { ImageCompareItem } from '@/Themes/Default/Components/ImageCompare/ImageCompareCmp';
import SegmentSliderCmp, { SegmentSliderState } from '@/Themes/Default/Components/SegmentSlider/SegmentSliderCmp';
import { Size } from '@/Types/extra';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { imageMultiCompareCmp } from './ImageMultiCompareCmpClasses';
import { TimelineCmp } from '../Timeline';
import { makeDefaultRangeProvider } from '@/Utils/RangeProvider';
import ParentSizeObserver from '../ParentSizeObserver/ParentSizeObserverCmp';
import { TimelineCmpBarLayerProps } from '../Timeline/TimelineBarLayerCmp';

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
  // overflow: 'hidden',
}));

// =====================================================================
// ============================= Component ==============================

export interface ImageMultiCompareCmpProps {
  images: ImageCompareItem[];
  bars?: TimelineCmpBarLayerProps[];
}

export default function ImageMultiCompareCmp(props: ImageMultiCompareCmpProps) {
  const { theme } = useTheme();
  const imageCount = props.images.length;

  const initialProgress = 0;

  // Unified state logic for all cases (even 2 images)
  const [sliderState, setSliderState] = useState<SegmentSliderState>(
    SegmentSliderCmp.computeState(initialProgress, imageCount)
  );

  const { segmentIndex, nextTickIdx, segmentPercentage } = sliderState;

  const bottomImage = props.images[segmentIndex];
  const topImage = props.images[nextTickIdx];

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
            (segmentIndex + Math.min(newSegmentProgress, 0.9999)) /
            segmentCount;
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
          {props.bars && props.bars.length > 0 && (
            <TimelineCmp
              showTopBar={false}
              scaleToFit
              rangeProvider={makeDefaultRangeProvider([0, imageCount - 1])}
            >
              {props.bars.map((layer, i) => (
                <TimelineCmp.Group>
                  <TimelineCmp.BarLayer key={i} {...layer} />
                </TimelineCmp.Group>
              ))}
            </TimelineCmp>
          )}
        </>
      )}
    </ImageMultiCompareRoot>
  );
}
