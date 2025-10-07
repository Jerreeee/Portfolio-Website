'use client';

import type { ComponentProps } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
export type ReactPlayerProps = ComponentProps<typeof ReactPlayer>;
import { styled } from '@mui/material/styles';
import { useTheme } from '@/Themes/ThemeProvider';

const MediaRoot = styled(motion.div, {
  shouldForwardProp: (prop) =>
    prop !== 'width' && prop !== 'height' && prop !== 'aspectRatio',
})<{
  width?: number | string;
  height?: number | string;
  aspectRatio?: string;
}>(({ width, height, aspectRatio }) => ({
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
}));

const sharedMediaStyles = {
  position: 'relative' as const,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
};

const MediaImage = styled(motion.div)(sharedMediaStyles);
const MediaFileVideo = styled(motion.video)(sharedMediaStyles);
const MediaEmbeddedVideo = styled(motion.div)(sharedMediaStyles);

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
};

export interface FileVideoMediaItem {
  type: 'fileVideo';
  src: string;
  width?: number;
  height?: number;
  thumbnail?: string;
  videoProps?: Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'src'>;
};

export interface EmbeddedVideoMediaItem {
  type: 'embeddedVideo';
  src: string;
  width?: number;
  height?: number;
  playerProps?: Omit<ReactPlayerProps, 'src'>;
};

export type MediaItem = ImageMediaItem | FileVideoMediaItem | EmbeddedVideoMediaItem;

export interface MediaCmpSettings {}

export interface MediaCmpProps {
  item: MediaItem;
  fit?: FitMode;
  override?: {width?: number, height?: number, aspectRatio?: number};
}

export default function MediaCmp({ item, fit = 'cover', override}: MediaCmpProps) {
  const { theme } = useTheme();
  const anim = theme.components?.MediaCmp?.slotAnimations ?? {};
  const objectFit = fit;
  
 let width: number | string | undefined = override?.width;
  let height: number | string | undefined = override?.height;
  let aspectRatio: string | undefined = undefined;

  if (item.width && item.height) {
    if (override?.width && !override?.height) {
      // width fixed, height auto, preserve ratio
      height = 'auto';
      aspectRatio = `${item.width} / ${item.height}`;
    } else if (override?.height && !override?.width) {
      // height fixed, width auto, preserve ratio
      width = 'auto';
      aspectRatio = `${item.width} / ${item.height}`;
    } else if (!override?.width && !override?.height) {
      // nothing overridden, just use intrinsic aspect ratio
      width = 'auto';
      height = 'auto';
      aspectRatio = `${item.width} / ${item.height}`;
    }
    // if both width & height are overridden → no aspectRatio
  }

  return (
    <MediaRoot
      width={width}
      height={height}
      aspectRatio={aspectRatio}
      {...(anim.root || {})}
    >
      {item.type === 'image' && (
        <MediaImage {...(anim.image || {})}>
          <Image
            src={item.src}
            alt={item.alt || ''}
            style={{ objectFit }}
            fill
            {...item.imageProps}
          />
        </MediaImage>
      )}

      {item.type === 'fileVideo' && (
        <MediaFileVideo
          {...(anim.fileVideo || {})}
          controls
          style={{ objectFit }}
          width={width}
          height={height}
          {...item.videoProps}
        >
          <source src={item.src} />
          Your browser does not support the video tag.
        </MediaFileVideo>
      )}

      {item.type === 'embeddedVideo' && (
        <MediaEmbeddedVideo {...(anim.embeddedVideo || {})}>
          <ReactPlayer
            src={item.src}
            width={width || '100%'}
            height={height || '100%'}
            controls
            style={{ objectFit }}
            {...item.playerProps}
          />
        </MediaEmbeddedVideo>
      )}
    </MediaRoot>
  );
}
