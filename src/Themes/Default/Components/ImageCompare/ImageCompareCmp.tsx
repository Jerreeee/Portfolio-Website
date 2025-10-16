'use client';

import React, { useLayoutEffect, useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from '@/Themes/ThemeProvider'
import { ImageMediaItem } from '../Media/MediaCmp';
import { Size } from '@/Types/extra';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { imageCompareCmp } from './ImageCompareCmpClasses';

// =====================================================================
// ========================= Slot Definitions ==========================

const makeSlot = makeSlotFactory('ImageCompareCmp', imageCompareCmp);

const ImageCompareRoot = makeSlot(motion.div, 'root', {
  shouldForwardProp: (prop) => prop !== "size",
})<{ size?: Size }>(({ theme, size }) => ({
  position: "relative",
  width: size?.width ? `${size.width}px` : "100%",
  height: size?.height ? `${size.height}px` : "100%",
  overflow: "hidden",
  userSelect: "none",
  borderRadius: theme.shape.borderRadius,
}));

const ImageCompareHandle = makeSlot('div', 'handle')(({ theme }) => ({
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

export type ImageCompareItem = Omit<ImageMediaItem, 'imageProps'>;

export interface ImageCompareCmpSettings {}

export interface ImageCompareCmpProps {
  bottom: ImageCompareItem;
  top: ImageCompareItem;
  size?: Size;
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

export default function ImageCompareCmp(props: ImageCompareCmpProps) {
  const { theme } = useTheme();

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
    <ImageCompareRoot
      size={props.size}
    >
      {/* Bottom image */}
      <Image
        src={props.bottom.src}
        alt={props.bottom.alt || ''}
        draggable={false}
        fill
        style={{ objectFit: 'contain', width: '100%', height: '100%'}}
        {...props.imageProps}
      />

      {/* Top clipped image */}
      <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - _progress * 100}% 0 0)` }} >
        <Image
          fill
          src={props.top.src}
          alt={props.top.alt || ''}
          draggable={false}
          style={{ objectFit: 'contain' }}
          {...props.imageProps}
        />
      </div>

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
