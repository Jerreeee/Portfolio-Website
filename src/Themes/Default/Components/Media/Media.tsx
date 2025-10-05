'use client';

import type { ComponentProps } from 'react';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
export type ReactPlayerProps = ComponentProps<typeof ReactPlayer>;
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import Image, { ImageProps } from 'next/image';
import { shouldForwardProp } from '@mui/system';

// =====================================================================
// ========================= Slot Definitions ==========================

const MediaRoot = styled(motion.div, {
  shouldForwardProp: (prop) => prop !== 'aspectRatio' && prop !== 'width' && prop !== 'height',
})<{
  aspectRatio: string | number;
  width?: number | string;
  height?: number | string;
}>(({ theme, aspectRatio, width, height }) => ({
  position: 'relative',
  width: width ?? '100%',
  height: height ?? 'auto',
  aspectRatio,
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
}));

// =====================================================================
// ============================= Component =============================

export type ImageMediaItem = {
  type: 'image';
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  aspectRatio?: string | number;
  imageProps?: Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'>;
};

export type FileVideoMediaItem = {
  type: 'fileVideo';
  src: string;
  aspectRatio?: string | number;
  thumbnail?: string;
  videoProps?: Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'src'>;
};

export type EmbeddedVideoMediaItem = {
  type: 'embeddedVideo';
  src: string;
  aspectRatio?: string | number;
  playerProps?: Omit<ReactPlayerProps, 'src'>;
};

export type MediaItem =
  | ImageMediaItem
  | FileVideoMediaItem
  | EmbeddedVideoMediaItem;

export type MediaProps = {
  item: MediaItem;
  fit?: 'cover' | 'contain' | 'fill';
  override?: { width?: number | string; height?: number | string, aspectRatio?: number | string };
};

export default function MediaCmp({ item, fit = 'contain', override }: MediaProps) {
  const [calculatedRatio, setCalculatedRatio] = useState<string | number | null>(
    item.aspectRatio ?? null
  );
  const objectFit = fit;

  // For images: calculate natural ratio
  useEffect(() => {
    if (item.type === 'image' && !item.aspectRatio) {
      const img = new window.Image();
      img.src = item.src;
      img.onload = () => {
        if (img.naturalWidth && img.naturalHeight) {
          setCalculatedRatio(`${img.naturalWidth} / ${img.naturalHeight}`);
        }
      };
    }
  }, [item]);

  // For file videos: calculate ratio on metadata load
  const handleVideoMetadata = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    if (!item.aspectRatio) {
      const video = e.currentTarget;
      if (video.videoWidth && video.videoHeight) {
        setCalculatedRatio(`${video.videoWidth} / ${video.videoHeight}`);
      }
    }
  };

  // Default ratio for embedded video if not provided
  const effectiveRatio = calculatedRatio ?? item.aspectRatio ?? '16/9';

  return (
    <MediaRoot
      aspectRatio={effectiveRatio}
      width={override?.width}
      height={override?.height}
    >
      {item.type === 'image' && (
        <Image
          src={item.src}
          alt={item.alt ?? ''}
          fill
          style={{ objectFit}}
          {...item.imageProps}
        />
      )}

      {item.type === 'fileVideo' && (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <video
            src={item.src}
            controls
            onLoadedMetadata={handleVideoMetadata}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit,
            }}
            {...item.videoProps}
          />
        </div>
      )}

      {item.type === 'embeddedVideo' && (
<div style={{
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "black", // gives you letterbox bars
}}>
  <ReactPlayer
    src={item.src}
    controls
    width="100%"     // force full container width
    height="100%"    // force full container height
    style={{ maxWidth: "100%", maxHeight: "100%" }}
  />
</div>
      )}
    </MediaRoot>
  );
}
