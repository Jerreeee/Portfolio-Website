'use client';

import React, { useLayoutEffect, useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { useTheme } from '@/Themes/ThemeProvider';
import { ImageMediaItem } from '../Media/MediaCmp';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { imageCompareCmp } from './ImageCompareCmpClasses';

const makeSlot = makeSlotFactory('ImageCompareCmp', imageCompareCmp);

const ImageCompareRoot = makeSlot('div', 'root', {
  shouldForwardProp: (prop) => prop !== 'aspectRatio',
})<{ aspectRatio?: number }>(({ theme, aspectRatio }) => ({
  position: 'relative',
  width: '100%',
  ...(aspectRatio ? { aspectRatio } : {}),
  overflow: 'hidden',
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

const AltTextLabel = makeSlot('div', 'altLabel')(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  backgroundColor: 'rgba(0,0,0,0.6)',
  color: 'white',
  padding: '2px 6px',
  fontSize: '0.75rem',
  whiteSpace: 'nowrap',
  zIndex: 3,
  transition: 'none',
  borderRadius: theme.shape.borderRadius,
}));

export type ImageCompareItem = Omit<ImageMediaItem, 'imageProps'>;

export interface ImageCompareCmpProps {
  bottom: ImageCompareItem;
  top: ImageCompareItem;
  imageProps?: ImageProps;
  progress: number;
  hideHandle?: boolean;
  enableDrag?: boolean;
  onDrag?: (newProgress: number) => void;
  hideAlt?: boolean;
}

export default function ImageCompareCmp(props: ImageCompareCmpProps) {
  const { theme } = useTheme();
  const [_progress, SetProgress] = useState(props.progress);

  useLayoutEffect(() => {
    SetProgress(props.progress);
  }, [props.progress]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = parseFloat(e.target.value);
    SetProgress(newValue);
    props.onDrag?.(newValue);
  }

  const handlePos = _progress * 100;
  const topClip = `inset(0 ${100 - handlePos}% 0 0)`;

  // Compute aspect ratio from bottom image metadata
  const aspectRatio =
    props.bottom?.width && props.bottom?.height
      ? props.bottom.width / props.bottom.height
      : undefined;

  return (
    <ImageCompareRoot aspectRatio={aspectRatio}>
      {/* --- Bottom image --- */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Image
          src={props.bottom.src}
          alt={props.bottom.alt || ''}
          draggable={false}
          fill
          style={{ objectFit: 'contain' }}
          {...props.imageProps}
        />

        {!props.hideAlt && props.bottom.alt && (
          <AltTextLabel
            sx={{
              left: `calc(${handlePos}% + 8px)`,
              zIndex: 2,
            }}
          >
            {props.bottom.alt}
          </AltTextLabel>
        )}
      </div>

      {/* --- Top image (slides in from left→right) --- */}
      <div style={{ position: 'absolute', inset: 0, clipPath: topClip }}>
        <Image
          fill
          src={props.top.src}
          alt={props.top.alt || ''}
          draggable={false}
          style={{ objectFit: 'contain' }}
          {...props.imageProps}
        />

        {!props.hideAlt && props.top.alt && (
          <AltTextLabel
            sx={{
              left: 8,
              zIndex: 3,
            }}
          >
            {props.top.alt}
          </AltTextLabel>
        )}
      </div>

      {!props.hideHandle && (
        <ImageCompareHandle style={{ left: `${handlePos}%` }} />
      )}

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
