'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { useTheme } from '@/Themes/ThemeProvider';
import ImageCompareCmp, { ImageCompareItem } from '@/Themes/Default/Components/ImageCompare/ImageCompareCmp';
import SegmentSliderCmp, { SegmentSliderState } from '@/Themes/Default/Components/SegmentSlider/SegmentSliderCmp';
import { Size } from '@/types/extra';
import { makeSlotFactory } from '@/utils/makeSlotFactory';
import { imageMultiCompareCmp } from './ImageMultiCompareCmpClasses';

// =====================================================================
// ============================= Slot Definitions =================================

const makeSlot = makeSlotFactory('ImageMultiCompareCmp', imageMultiCompareCmp);

const ImageMultiCompareRoot = makeSlot(motion.div, 'root', {
  shouldForwardProp: (prop) => prop !== "size",
})<{ size?: Size }>(({ size }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
}));

// =====================================================================
// ============================= Component ==============================

export interface ImageMultiCompareCmpSettings {}

export interface ImageMultiCompareCmpProps {
  images: ImageCompareItem[];
  size?: Size;
}

export default function ImageMultiCompareCmp(props: ImageMultiCompareCmpProps) {
  const { theme } = useTheme();

  const initialProgress = 0.5;
  // Multiple images case
  const [sliderState, setSliderState] = useState<SegmentSliderState>(SegmentSliderCmp.computeState(initialProgress, props.images.length));

  // Two images -> single ImageMask
  if (props.images.length === 2) {
    return (
      <ImageCompareCmp
        size={props.size}
        bottom={props.images[0]}
        top={props.images[1]}
        progress={initialProgress}
      />
    );
  }

  return (
      <ImageMultiCompareRoot>
        <ImageCompareCmp
          size={props.size}
          bottom={props.images[sliderState.segmentIndex]}
          top={props.images[sliderState.nextTickIdx]}
          progress={sliderState.segmentPercentage}
          enableDrag
          onDrag={(newSegmentProgress) => {
            const segmentCount = props.images.length - 1;
            const newGlobalPercentage = (sliderState.segmentIndex + Math.min(newSegmentProgress, 0.9999)) / segmentCount;
            setSliderState({
              ...sliderState,
              percentage: newGlobalPercentage,
              segmentPercentage: newSegmentProgress,
            });
          }}
        />

        {/* SegmentSlider */}
        <SegmentSliderCmp
          tickCount={props.images.length}
          percentage={sliderState.percentage}
          onChange={setSliderState}
        />
      </ImageMultiCompareRoot>
  );
}
