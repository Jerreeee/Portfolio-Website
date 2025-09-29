'use client';

import React, { useLayoutEffect, useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { useTheme } from '@/Themes/ThemeProvider'

// =====================================================================
// ========================= Slot Definitions ==========================

const ImageCompareRoot = styled(motion.div, { name: 'ImageCompare', slot: 'Root' })({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  userSelect: 'none',
});

const ImageCompareLayer = styled('div', { name: 'ImageCompare', slot: 'Layer' })({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
});

const ImageCompareHandle = styled('div', { name: 'ImageCompare', slot: 'Handle' })(({ theme }) => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: 1,
  backgroundColor: theme.palette.common.white,
  boxShadow: theme.shadows[2],
  pointerEvents: 'none',
  transform: 'translateX(-50%)',
}));

// =====================================================================
// ============================= Component =============================

export interface ImageCompareItem {
  src: string;
  alt?: string;
}

export interface ImageCompareProps {
    bottom: ImageCompareItem;
    top: ImageCompareItem;
    imageProps?: ImageProps;
  /** progress between 0 and 1 */
  progress: number;
  /** show a vertical handle at the split */
  showHandle?: boolean;
  /** allow dragging to update progress */
  enableDrag?: boolean;
  /** callback when dragging changes progress */
  onDrag?: (newProgress: number) => void;
}

export default function ImageCompareCmp(props: ImageCompareProps) {
  const { theme } = useTheme();
  const anim = theme.components?.ImageCompare?.slotAnimations ?? {};

  // internal state to sync with external progress without flicker
  const [_progress, SetProgress] = useState(props.progress);

  useLayoutEffect(() => {
    SetProgress(props.progress);
  }, [props.progress]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = parseFloat(e.target.value);
    SetProgress(newValue);
    props.onDrag?.(newValue);
  }

  return (
    <ImageCompareRoot {...(anim.root || {})} >
      {/* Bottom image */}
      <ImageCompareLayer>
        <Image
            fill
          src={props.bottom.src}
          alt={props.bottom.alt || ''}
          draggable={false}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          {...props.imageProps}
        />
      </ImageCompareLayer>

      {/* Top clipped image */}
      <ImageCompareLayer
        style={{ clipPath: `inset(0 ${100 - _progress * 100}% 0 0)` }}
      >
        <Image
            fill
          src={props.top.src}
          alt={props.top.alt || ''}
          draggable={false}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          {...props.imageProps}
        />
      </ImageCompareLayer>

      {/* Optional vertical handle */}
      {props.showHandle && (
        <ImageCompareHandle style={{ left: `${_progress * 100}%` }} />
      )}

      {/* Transparent range input for dragging */}
      {props.enableDrag && (
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={_progress}
          onChange={handleChange}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
          }}        
        />
      )}
    </ImageCompareRoot>
  );
}
