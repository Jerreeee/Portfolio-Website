'use client';

import type { ComponentProps } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
export type ReactPlayerProps = ComponentProps<typeof ReactPlayer>;
import { styled } from '@mui/material/styles';
import { useTheme } from '@/Themes/ThemeProvider';
import { makeSlotFactory } from '@/utils/makeSlotFactory';
import { mediaCmp } from './MediaCmpClasses';

// =====================================================================
// ========================= Slot Definitions ==========================

const makeSlot = makeSlotFactory('MediaCmp', mediaCmp);

const MediaRoot = makeSlot(motion.div, 'root', {
  shouldForwardProp: (prop) =>
    prop !== 'width' && prop !== 'height' && prop !== 'aspectRatio',
})<{
  width?: number | string;
  height?: number | string;
  aspectRatio?: string;
}>(({ theme, width, height, aspectRatio }) => ({
  position: 'relative',
  width: width ?? 'auto',
  height: height ?? 'auto',
  ...(aspectRatio ? { aspectRatio } : {}),
  maxWidth: '100%',
  maxHeight: '100%',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
}));

// =====================================================================
// ============================= Component =============================

type FitMode = 'cover' | 'contain' | 'fill';

export interface ImageMetaData {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface ImageMediaItem {
  type: 'image';
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  imageProps?: Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'>;
}

export interface FileVideoMediaItem {
  type: 'fileVideo';
  src: string;
  width?: number;
  height?: number;
  thumbnail?: string;
  videoProps?: Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'src'>;
}

export interface EmbeddedVideoMediaItem {
  type: 'embeddedVideo';
  src: string;
  width?: number;
  height?: number;
  playerProps?: Omit<ReactPlayerProps, 'src'>;
}

export type MediaItem = ImageMediaItem | FileVideoMediaItem | EmbeddedVideoMediaItem;

export interface MediaCmpSettings {}

export interface MediaCmpProps {
  item: MediaItem;
  fit?: FitMode;
  override?: { width?: number; height?: number; aspectRatio?: number };
}

export default function MediaCmp({ item, fit = 'cover', override }: MediaCmpProps) {
  const { theme } = useTheme();
  const anim = theme.components?.MediaCmp?.slotAnimations ?? {};
  const objectFit = fit;

  let width: number | string | undefined = override?.width;
  let height: number | string | undefined = override?.height;
  let aspectRatio: string | undefined = undefined;

  if (item.width && item.height) {
    if (override?.width && !override?.height) {
      height = 'auto';
      aspectRatio = `${item.width} / ${item.height}`;
    } else if (override?.height && !override?.width) {
      width = 'auto';
      aspectRatio = `${item.width} / ${item.height}`;
    } else if (!override?.width && !override?.height) {
      width = 'auto';
      height = 'auto';
      aspectRatio = `${item.width} / ${item.height}`;
    }
  }

  return (
    <MediaRoot width={width} height={height} aspectRatio={aspectRatio}>
      {item.type === 'image' && (
        <Image
          src={item.src}
          alt={item.alt || ''}
          style={{ objectFit }}
          fill
          {...item.imageProps}
        />
      )}

      {item.type === 'fileVideo' && (
        <video
          controls
          style={{
            objectFit,
            width: '100%',
            height: '100%',
            display: 'block',
          }}
          width={width}
          height={height}
          {...item.videoProps}
        >
          <source src={item.src} />
          Your browser does not support the video tag.
        </video>
      )}

      {item.type === 'embeddedVideo' && (
        <ReactPlayer
          src={item.src}
          width={width || '100%'}
          height={height || '100%'}
          controls
          style={{ objectFit }}
          {...item.playerProps}
        />
      )}
    </MediaRoot>
  );
}
