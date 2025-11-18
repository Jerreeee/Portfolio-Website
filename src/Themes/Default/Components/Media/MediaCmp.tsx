'use client';

import Image from 'next/image';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';
import { SxProps, styled } from '@mui/material';
import { useTheme } from '@/Themes/ThemeProvider';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { mediaCmp } from './MediaCmpClasses';
import { MediaItem } from '@/Types/media';

const makeSlot = makeSlotFactory('MediaCmp', mediaCmp);

/**
 * MediaRoot is ONLY a centering wrapper.
 * It must NOT force width/height stretching, so media can size naturally.
 */

const MediaRoot = makeSlot(motion.div, 'root', {
    shouldForwardProp: (prop) => prop !== 'align',
  }
)<{ align?: Alignment }>(
  ({ theme, align = 'center' }) => ({
    position: 'relative',
    display: 'flex',
    justifyContent: align,
    alignItems: align,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    borderRadius: theme.shape.borderRadius,
  })
);

export function getMediaLabel(item: MediaItem) {
  if (item.type === "image" || item.type === "fileVideo") {
    return item.alt ?? item.name ?? "";
  }

  return "";
}

type FitMode = 'cover' | 'contain' | 'fill';
type Alignment = 'flex-start' | 'center' | 'flex-end';

export interface MediaCmpSettings {}

export interface MediaCmpProps {
  item: MediaItem;
  fit?: FitMode; // default = contain
  priority?: boolean;
  sx?: SxProps;
  alignItems?: Alignment;
}

/**
 * UNIVERSAL MEDIA COMPONENT
 * - Always keeps aspect ratio
 * - Scales until it hits parent constraint (width OR height)
 * - Default objectFit = "contain"
 */
export default function MediaCmp({ item, fit = 'contain', priority, alignItems = 'center' }: MediaCmpProps) {
  const { theme } = useTheme();
  const objectFit = fit;

  if (!item) return;

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
    <MediaRoot align={alignItems}>
      {item.type === 'image' && (
        <Image
          src={item.src}
          alt={item.alt || ''}
          width={item.width}
          height={item.height}
          priority={priority}
          style={{...responsiveStyle, border: '2px solid red'}}
          {...item.imageProps}
        />
      )}

      {item.type === 'fileVideo' && (
        <video
          src={item.src}
          width={item.width}
          height={item.height}
          controls
          style={responsiveStyle}
          {...item.videoProps}
        />
      )}

      {item.type === 'embeddedVideo' && (
        <ReactPlayer
          src={item.src}
          width="auto"
          height="auto"
          style={responsiveStyle}
          {...item.playerProps}
        />
      )}
    </MediaRoot>
  );
}
