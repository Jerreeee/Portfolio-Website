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
  height: '100%',
  overflow: 'hidden',
}));

// =====================================================================
// ============================= Component ==============================

export interface ImageMultiCompareCmpProps {
  images: ImageCompareItem[];
  size?: Size;
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

  const bottomAlt = bottomImage?.alt || bottomImage?.src || bottomImage?.src;
  const topAlt = topImage?.alt || topImage?.src || topImage?.src;

  return (
    <ImageMultiCompareRoot>
      {/* --- Top bar: left and right image labels --- */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          background: `rgba(${theme.palette.background.default
            .replace(/[^\d,]/g, '')}, 0.7)`, // subtle overlay
          backdropFilter: 'blur(6px)',
          borderTopLeftRadius: theme.shape.borderRadius,
          borderTopRightRadius: theme.shape.borderRadius,
          padding: '0.35rem 1rem',
          fontSize: theme.typography.body2.fontSize,
          color: theme.palette.text.primary,
          fontWeight: 500,
          userSelect: 'none',
          zIndex: 2,
        }}
      >
        <Box
          component="span"
          sx={{
            textShadow: '0 0 4px rgba(0,0,0,0.4)',
            opacity: 0.9,
          }}
        >
          {topAlt}
        </Box>
        <Box
          component="span"
          sx={{
            textShadow: '0 0 4px rgba(0,0,0,0.4)',
            opacity: 0.9,
          }}
        >
          {bottomAlt}
        </Box>
      </Box>

      {/* --- Comparison image --- */}
      <ImageCompareCmp
        size={props.size}
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
        <SegmentSliderCmp
          tickCount={imageCount}
          percentage={sliderState.percentage}
          onChange={setSliderState}
        />
      )}

      {/* --- Timeline --- */}
      {imageCount > 2 && (
        <TimelineCmp
          showTopBar={false}
          rangeProvider={makeDefaultRangeProvider([0, imageCount], {
            pixelsPerUnit: 10,
            fitToRange: true,
          })}
        >
          <TimelineCmp.TopBar tickCount={20} formatter={(v) => `${v.toFixed(0)}s`} />
          <TimelineCmp.Group>
            <TimelineCmp.BarLayer
              bars={[
                { start: 0, end: 20, label: 'Phase A', color: '#8e24aa' },
                { start: 30, end: 80, label: 'Phase B', color: '#43a047' },
                { start: 90, end: 140, label: 'Phase C', color: '#fdd835' },
                { start: 160, end: 200, label: 'Phase D', color: '#ef5350' },
              ]}
            />
          </TimelineCmp.Group>
        </TimelineCmp>
      )}
    </ImageMultiCompareRoot>
  );
}
