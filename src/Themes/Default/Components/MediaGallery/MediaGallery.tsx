'use client';

import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/Themes/ThemeProvider';
import MediaCmp, { MediaItem } from '@/Themes/Default/Components/Media/Media';
import ScrollableCmp from '../Scrollable/Scrollable';
import { useElementSize } from '@/hooks/useElementSize';

// =====================================================================
// ========================= Slot Definitions ==========================

const GalleryRoot = styled('div', { name: 'MediaGallery', slot: 'Root' })({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

const GalleryMain = styled('div', { name: 'MediaGallery', slot: 'Main' })(({ theme }) => ({
  position: 'relative',
  width: '100%',
  aspectRatio: '16 / 9',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
}));

const GalleryThumbs = styled('div', { name: 'MediaGallery', slot: 'Thumbs' })(({ theme }) => ({
  width: '100%',
  height: '100px',
  border: '2px solid red',
  gap: '1rem',
}));

const ThumbButton = styled('button', { name: 'MediaGallery', slot: 'ThumbButton',
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  position: 'relative',
  flexShrink: 0,
  width: 'auto',
  overflow: 'hidden',
  alignItems: 'center',
  background: 'transparent',
  border: `2px solid ${active ? theme.palette.common.white : 'transparent'}`,
  transition: 'border-color 0.2s',
  cursor: 'pointer',
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    borderColor: active ? theme.palette.common.white : theme.palette.grey[400],
  },
}));

const VideoOverlay = styled('div', { name: 'MediaGallery', slot: 'VideoOverlay' })({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0,0,0,0.4)',
  color: '#fff',
  fontSize: '1.8rem',
});

// =====================================================================
// ============================= Component =============================

export interface MediaGalleryProps {
  media: MediaItem[];
}

export default function MediaGalleryCmp({ media }: MediaGalleryProps) {
  const { theme: activeTheme } = useTheme();

  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = media[activeIndex];

  const [mainRef, mainSize] = useElementSize<HTMLDivElement>();

  return (
    <GalleryRoot>
      {/* Main media display */}
      <GalleryMain ref={mainRef}>
        <AnimatePresence mode="wait">
          <MediaCmp
            item={activeItem}
            fit='contain'
            override={{ width: mainSize?.width, height: mainSize?.height }}
          />
        </AnimatePresence>
      </GalleryMain>

      {/* Thumbnails */}
      <GalleryThumbs>
        <ScrollableCmp direction='horizontal'>
          {media.map((item, index) => {
            const isActive = index === activeIndex;
            const thumbItem =
              item.type === 'embeddedVideo'
                ? { ...item, playerProps: { ...item.playerProps, light: true } }
                : item.type === 'image'
                ? item
                : { ...item, src: item.thumbnail || item.src };

            return (
              <ThumbButton key={index} active={isActive} onClick={() => setActiveIndex(index)}>
                <MediaCmp
                  item={thumbItem}
                  override={{ height: '100%', aspectRatio: '16/9' }}
                />
                {item.type !== 'image' && <VideoOverlay>▶</VideoOverlay>}
              </ThumbButton>
            );
          })}
        </ScrollableCmp>
      </GalleryThumbs>
    </GalleryRoot>
  );
}
