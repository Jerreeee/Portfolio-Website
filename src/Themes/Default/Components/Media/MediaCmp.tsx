'use client';

import Image from 'next/image';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';
import { useTheme } from '@/Themes/ThemeProvider';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { mediaCmp } from './MediaCmpClasses';

const makeSlot = makeSlotFactory('MediaCmp', mediaCmp);

/**
 * MediaRoot is ONLY a centering wrapper.
 * It must NOT force width/height stretching, so media can size naturally.
 */
const MediaRoot = makeSlot(motion.div, 'root')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  borderRadius: theme.shape.borderRadius,
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
  thumbnail?: string;
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
  fit?: FitMode; // default = contain
  priority?: boolean;
}

/**
 * UNIVERSAL MEDIA COMPONENT
 * - Always keeps aspect ratio
 * - Scales until it hits parent constraint (width OR height)
 * - Works for images, file videos, embedded videos
 * - Default objectFit = "contain"
 */
export default function MediaCmp({ item, fit = 'contain', priority }: MediaCmpProps) {
  const { theme } = useTheme();
  const objectFit = fit;

  // Shared style for ALL media types
  const responsiveStyle: React.CSSProperties = {
    display: 'block',
  	maxWidth: '100%',
    maxHeight: '100%',
    width: '100%',
    height: '100%',
    objectFit,
  };

  return (
    <MediaRoot>
      {item.type === 'image' && (
        <Image
          src={item.src}
          alt={item.alt || ''}
          width={item.width}
          height={item.height}
          priority={priority}
          style={responsiveStyle}
          {...item.imageProps}
        />
      )}

      {item.type === 'fileVideo' && (
        <video
          src={item.src}
          controls
          style={responsiveStyle}
          {...item.videoProps}
        />
      )}

      {item.type === 'embeddedVideo' && (
        <ReactPlayer
          src={item.src}
          style={responsiveStyle}
          width="auto"
          height="auto"
          {...item.playerProps}
        />
      )}
    </MediaRoot>
  );
}
