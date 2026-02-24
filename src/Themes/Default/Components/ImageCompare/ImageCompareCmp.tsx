'use client';

import React, { useLayoutEffect, useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { useAppTheme } from '@/Themes/ThemeProvider';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { imageCompareCmp } from './ImageCompareCmpClasses';
import { MediaItem } from '@/Types/media';
import MediaCmp, { getMediaLabel } from '../Media/MediaCmp';

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
  color: theme.palette.common.white,
  padding: theme.spacing(0.25, 0.75),
  fontSize: theme.typography.caption.fontSize,
  whiteSpace: 'nowrap',
  zIndex: 3,
  transition: 'none',
  borderRadius: theme.shape.borderRadius,
}));

export type ImageCompareItem = MediaItem;

export interface ImageCompareCmpSettings {}

export interface ImageCompareCmpProps {
  bottom: ImageCompareItem;
  top: ImageCompareItem;
  progress: number;
  hideHandle?: boolean;
  enableDrag?: boolean;
  onDrag?: (newProgress: number) => void;
  hideAlt?: boolean;
}

export default function ImageCompareCmp(props: ImageCompareCmpProps) {
  const { theme } = useAppTheme();
  const [_progress, SetProgress] = useState(props.progress);

  useLayoutEffect(() => {
    SetProgress(props.progress);
  }, [props.progress]);

  function handlePointer(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const newValue = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    SetProgress(newValue);
    props.onDrag?.(newValue);
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    handlePointer(e);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    handlePointer(e);
  }

  const handlePos = _progress * 100;
  const topClip = `inset(0 ${100 - handlePos}% 0 0)`;

  const bottomLabel = props.hideAlt ? "" : getMediaLabel(props.bottom);
  const topLabel = props.hideAlt ? "" : getMediaLabel(props.top);

  // Compute aspect ratio from bottom image metadata
  const aspectRatio =
    props.bottom?.width && props.bottom?.height
      ? props.bottom.width / props.bottom.height
      : undefined;

  return (
    <ImageCompareRoot aspectRatio={aspectRatio}>
      {/* --- Bottom image --- */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <MediaCmp item={props.bottom} />

        {bottomLabel && (
          <AltTextLabel
            sx={{
              left: `calc(${handlePos}% + 8px)`,
              zIndex: 2,
            }}
          >
            {bottomLabel}
          </AltTextLabel>
        )}
      </div>

      {/* --- Top image (slides in from left→right) --- */}
      <div style={{ position: 'absolute', inset: 0, clipPath: topClip }}>
        <MediaCmp item={props.top} />

        {topLabel && (
          <AltTextLabel
            sx={{
              left: 8,
              zIndex: 3,
            }}
          >
            {topLabel}
          </AltTextLabel>
        )}
      </div>

      {!props.hideHandle && (
        <ImageCompareHandle style={{ left: `${handlePos}%` }} />
      )}

      {props.enableDrag && (
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          style={{
            position: 'absolute',
            inset: 0,
            cursor: 'pointer',
            touchAction: 'pan-y',
          }}
        />
      )}
    </ImageCompareRoot>
  );
}
