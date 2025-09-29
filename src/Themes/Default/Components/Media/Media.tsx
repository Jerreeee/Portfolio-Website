'use client';

import type { ComponentProps } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
export type ReactPlayerProps = ComponentProps<typeof ReactPlayer>;
import { styled } from '@mui/material/styles';
import { useTheme } from '@/Themes/ThemeProvider'

// =====================================================================
// ========================= Slot Definitions ==========================

const MediaRoot = styled(motion.div, { name: 'Media', slot: 'Root' })(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
}));

const MediaImage = styled(motion.div, { name: 'Media', slot: 'Image' })(({ theme }) => ({
  position: 'relative',
  width: '100%',
  aspectRatio: '16 / 9',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
}));

const MediaFileVideo = styled(motion.video, { name: 'Media', slot: 'FileVideo' })(({ theme }) => ({
  width: '100%',
  height: 'auto',
  borderRadius: theme.shape.borderRadius,
}));

const MediaEmbeddedVideo = styled(motion.div, { name: 'Media', slot: 'EmbeddedVideo' })(({ theme }) => ({
  position: 'relative',
  width: '100%',
  aspectRatio: '16 / 9',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

// =====================================================================
// ============================= Component =============================

export type ImageMediaItem = {
    type: 'image';
    src: string;
    alt?: string;
    imageProps?: Omit<ImageProps, 'src' | 'alt'>;
};

export type FileVideoMediaItem = {
    type: 'fileVideo';
    src: string;
    thumbnail?: string;
    videoProps?: Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'src'>;
};

export type EmbeddedVideoMediaItem = {
    type: 'embeddedVideo';
    src: string;
    playerProps?: Omit<ReactPlayerProps, 'src'>;
};

// Union of all types
export type MediaItem =
    | ImageMediaItem
    | FileVideoMediaItem
    | EmbeddedVideoMediaItem;

export interface MediaProps {
  item: MediaItem
}

export default function MediaCmp(props: MediaProps) {
  const { theme } = useTheme();
  const anim = theme.components?.Media?.slotAnimations ?? {};

  return (
    <MediaRoot {...(anim.root || {})}>
      {props.item.type === 'image' && (
        <MediaImage {...(anim.image || {})}>
          <Image src={props.item.src} alt={props.item.alt || ''} fill style={{ objectFit: 'cover' }} />
        </MediaImage>
      )}

      {props.item.type === 'fileVideo' && (
        <MediaFileVideo {...(anim.fileVideo || {})} controls>
          <source src={props.item.src} />
          Your browser does not support the video tag.
        </MediaFileVideo>
      )}

      {props.item.type === 'embeddedVideo' && (
        <MediaEmbeddedVideo {...(anim.embeddedVideo || {})}>
          <ReactPlayer src={props.item.src} width="100%" height="100%" controls />
        </MediaEmbeddedVideo>
      )}
    </MediaRoot>
  );
}
