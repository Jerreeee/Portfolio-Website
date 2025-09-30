'use client';

import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/Themes/ThemeProvider';
import MediaCmp, { MediaItem } from '@/Themes/Default/Components/Media/Media';
import ScrollableCmp from '../Scrollable/Scrollable';

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
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
}));

const GalleryMotionFrame = styled(motion.div, {
  name: 'MediaGallery',
  slot: 'MotionFrame',
})({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
});

const GalleryThumbs = styled('div', { name: 'MediaGallery', slot: 'Thumbs' })(({ theme }) => ({
  height: "100px",
  overflow: 'hidden',
  border: "1px solid yellow",
}));

const ThumbButton = styled('button', { name: 'MediaGallery', slot: 'ThumbButton',
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  position: 'relative',
  flexShrink: 0,
  height: '100%',          // ✅ fill the strip’s height
  width: 'auto',           // ✅ let MediaCmp decide the width
  overflow: 'hidden',
  background: 'transparent',
  // border: active ? `2px solid ${theme.palette.common.white}` : 'none',
  border: '2px solid red',
  transition: 'border-color 0.2s',
  cursor: 'pointer',
  display: 'inline-flex',         // ensures child fills height
  alignItems: 'center',
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

  return (
    <GalleryRoot>
      {/* Main media display */}
      <GalleryMain>
        <AnimatePresence mode="wait">
          <GalleryMotionFrame
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <MediaCmp item={activeItem} />
          </GalleryMotionFrame>
        </AnimatePresence>
      </GalleryMain>

      {/* Thumbnails */}
      <GalleryThumbs>
        <ScrollableCmp>
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
                <MediaCmp item={thumbItem} />
                {item.type !== 'image' && <VideoOverlay>▶</VideoOverlay>}
              </ThumbButton>
            );
          })}
        </ScrollableCmp>
      </GalleryThumbs>
    </GalleryRoot>
  );
}
