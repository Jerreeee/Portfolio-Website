'use client';

import Image from 'next/image';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';
import { useTheme } from '@/Themes/ThemeProvider';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { mediaCmp } from './MediaCmpClasses';

const makeSlot = makeSlotFactory('MediaCmp', mediaCmp);

const MediaRoot = makeSlot(motion.div, 'root')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  // height: '100%',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

type FitMode = 'cover' | 'contain' | 'fill';

export interface ImageMediaItem {
  type: 'image';
  src: string;
  alt: string;
  width: number;
  height: number;
  imageProps?: Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'>;
}

export interface FileVideoMediaItem {
  type: 'fileVideo';
  src: string;
  videoProps?: Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'src'>;
}

export interface EmbeddedVideoMediaItem {
  type: 'embeddedVideo';
  src: string;
  playerProps?: Omit<React.ComponentProps<typeof ReactPlayer>, 'url'>;
}

export type MediaItem = ImageMediaItem | FileVideoMediaItem | EmbeddedVideoMediaItem;

export interface MediaCmpProps {
  item: MediaItem;
  fit?: FitMode;
}

export default function MediaCmp({ item, fit = 'cover' }: MediaCmpProps) {
  const { theme } = useTheme();
  const objectFit = fit;

  return (
    <MediaRoot>
      {item.type === 'image' && (
        <Image
          src={item.src}
          alt={item.alt || ''}
          // fill
          width={item.width}
          height={item.height}
          style={{ objectFit }}
          {...item.imageProps}
        />
      )}

      {item.type === 'fileVideo' && (
        <video
          src={item.src}
          style={{
            objectFit,
            width: '100%',
            height: '100%',
            display: 'block',
          }}
          controls
          {...item.videoProps}
        />
      )}

      {item.type === 'embeddedVideo' && (
        <ReactPlayer
          src={item.src}
          width="100%"
          height="100%"
          style={{ objectFit }}
          {...item.playerProps}
        />
      )}
    </MediaRoot>
  );
}
