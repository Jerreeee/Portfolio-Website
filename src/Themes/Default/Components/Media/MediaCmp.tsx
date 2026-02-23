'use client';

import Image from 'next/image';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';
import { styled } from '@mui/material';
import { useAppTheme } from '@/Themes/ThemeProvider';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { mediaCmp } from './MediaCmpClasses';
import { MediaItem } from '@/Types/media';
import { useMemo } from 'react';
import { useSizeObserver } from '@/Hooks/useSizeObserver';

export type MediaScaleMode = 'downscale' | 'upscale';
export type FitMode = 'contain' | 'cover' | 'fill';
export type Alignment = 'flex-start' | 'center' | 'flex-end';

const makeSlot = makeSlotFactory('MediaCmp', mediaCmp);

/**
 * MediaRoot becomes the *scaled element*, exactly like SmartImage's yellow box.
 * It receives width/height from computed scale (scaledW/scaledH).
 */
const MediaRoot = makeSlot(
  motion.div,
  'root',
)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
}));

export function getMediaLabel(item: MediaItem) {
  if (item.type === 'image' || item.type === 'fileVideo') {
    return item.alt ?? item.name ?? '';
  }

  return '';
}

export interface MediaCmpProps {
  item: MediaItem;
  fit?: FitMode;
  mode?: MediaScaleMode;
}

export interface MediaCmpSettings {}

export default function MediaCmp({
  item,
  fit = 'contain',
  mode = 'downscale',
}: MediaCmpProps) {
  const { theme } = useAppTheme();

  const naturalWidth = item.width ?? 1;
  const naturalHeight = item.height ?? 1;

  // Use the new size observer measuring the parent
  const { ref, size } = useSizeObserver<HTMLDivElement>({
    mode: 'both',
    measure: 'parent',
  });

  const scale = useMemo(() => {
    if (!size) return 1;

    const w = size.width;
    const h = size.height;

    const hasW = w > 0 && !isNaN(w);
    const hasH = h > 0 && !isNaN(h);

    let s = 1;

    if (hasW && hasH) {
      if (fit === 'cover') {
        // Cover → fill entire parent, crop overflow
        s = Math.max(w / naturalWidth, h / naturalHeight);
      } else {
        // Contain (default) → stay fully visible
        s = Math.min(w / naturalWidth, h / naturalHeight);
      }
    } else if (hasH) {
      s = h / naturalHeight;
    } else if (hasW) {
      s = w / naturalWidth;
    }

    if (fit === 'cover') {
      // cover MUST be allowed to upscale
    } else {
      if (mode === 'downscale') {
        s = Math.min(s, 1);
      }
    }

    return s;
  }, [size, naturalWidth, naturalHeight, mode, fit]);

  const scaledW = naturalWidth * scale;
  const scaledH = naturalHeight * scale;

  // Debug logging — optional
  // console.groupCollapsed(`MediaCmp: ${item.src}`);
  // console.log('Natural Size:', { naturalWidth, naturalHeight });
  // console.log('Parent Size:', size);
  // console.log('Scale:', scale);
  // console.log('Scaled Size:', { scaledW, scaledH });
  // console.groupEnd();

  if (!item) return null;

  // First render: size not known yet
  if (!size) return <MediaRoot ref={ref} />;

  return (
    <div
      ref={ref}
      style={{
        // border: '2px solid yellow',
        width: scaledW,
        height: scaledH,
        overflow: 'hidden',
        borderRadius: theme.shape.borderRadius,
      }}
    >
      {/* IMAGE */}
      {item.type === 'image' && (
        <Image
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
          }}
        />
      )}

      {/* FILE VIDEO */}
      {item.type === 'fileVideo' && (
        <video
          src={item.src}
          // width={item.width}
          // height={item.height}
          controls
          style={{
            width: '100%',
            height: '100%',
            objectFit: fit,
            display: 'block',
          }}
          {...item.videoProps}
        />
      )}

      {/* EMBEDDED VIDEO (YouTube, Vimeo, etc.) */}
      {item.type === 'embeddedVideo' && (
        <ReactPlayer
          src={item.src}
          width="auto"
          height="auto"
          {...item.playerProps}
        />
      )}
    </div>
  );
}
