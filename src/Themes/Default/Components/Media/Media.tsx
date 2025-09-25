'use client';

import { styled, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import Image from 'next/image';

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

export interface MediaSettings {}

export interface MediaProps {
  type: 'image' | 'fileVideo' | 'embeddedVideo';
  src: string;
  alt?: string;
}

export default function MediaCmp({ type, src, alt }: MediaProps) {
  const theme = useTheme();
  const anim = theme.components?.Media?.slotAnimations ?? {};

  return (
    <MediaRoot {...(anim.root || {})}>
      {type === 'image' && (
        <MediaImage {...(anim.image || {})}>
          <Image src={src} alt={alt || ''} fill style={{ objectFit: 'cover' }} />
        </MediaImage>
      )}

      {type === 'fileVideo' && (
        <MediaFileVideo {...(anim.fileVideo || {})} controls>
          <source src={src} />
          Your browser does not support the video tag.
        </MediaFileVideo>
      )}

      {type === 'embeddedVideo' && (
        <MediaEmbeddedVideo {...(anim.embeddedVideo || {})}>
          <ReactPlayer src={src} width="100%" height="100%" controls />
        </MediaEmbeddedVideo>
      )}
    </MediaRoot>
  );
}
