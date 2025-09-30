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

export type ImageMediaItem = {
  type: 'image';
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  imageProps?: Omit<ImageProps, 'src' | 'alt'>;
};

export type FileVideoMediaItem = {
  type: 'fileVideo';
  src: string;
  width?: number;
  height?: number;
  thumbnail?: string;
  videoProps?: Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'src'>;
};

export type EmbeddedVideoMediaItem = {
  type: 'embeddedVideo';
  src: string;
  width?: number;
  height?: number;
  playerProps?: Omit<ReactPlayerProps, 'src'>;
};

export type MediaItem = ImageMediaItem | FileVideoMediaItem | EmbeddedVideoMediaItem;

export interface MediaProps {
  item: MediaItem;
  fit?: FitMode;
}

export default function MediaCmp({ item, fit = 'cover' }: MediaProps) {
  const { theme } = useTheme();
  const anim = theme.components?.Media?.slotAnimations ?? {};
  const objectFit = fit;

  return (
    <MediaRoot
      width={item.width}
      height={item.height}
      aspectRatio={item.width && item.height ? `${item.width} / ${item.height}` : undefined}
      {...(anim.root || {})}
    >
      {item.type === 'image' && (
        <MediaImage {...(anim.image || {})}>
          <Image
            src={item.src}
            alt={item.alt || ''}
            fill
            style={{ objectFit }}
              {...(item.imageProps?.width && item.imageProps?.height
                ? item.imageProps
                : { fill: true })}
          />
        </MediaImage>
      )}

      {item.type === 'fileVideo' && (
        <MediaFileVideo {...(anim.fileVideo || {})} controls style={{ objectFit }} {...item.videoProps}>
          <source src={item.src} />
          Your browser does not support the video tag.
        </MediaFileVideo>
      )}

      {item.type === 'embeddedVideo' && (
        <MediaEmbeddedVideo {...(anim.embeddedVideo || {})}>
          <ReactPlayer
            src={item.src}
            width="100%"
            height="100%"
            controls
            style={{ objectFit }}
            {...item.playerProps}
          />
        </MediaEmbeddedVideo>
      )}
    </MediaRoot>
  );
}
