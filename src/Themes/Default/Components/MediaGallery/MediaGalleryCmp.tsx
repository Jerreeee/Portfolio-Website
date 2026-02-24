'use client';

import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppTheme } from '@/Themes/ThemeProvider';
import MediaCmp from '@/Themes/Default/Components/Media/MediaCmp';
import { MediaItem } from '@/Types/media';
import ScrollableCmp from '../Scrollable/ScrollableCmp';
import { useElementSize } from '@/Hooks/useElementSize';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { mediaGalleryCmp } from './MediaGalleryCmpClasses';
import { alignItems, border, display, flexDirection } from '@mui/system';

// =====================================================================
// ========================= Slot Definitions ==========================

const makeSlot = makeSlotFactory('MediaGalleryCmp', mediaGalleryCmp);

const GalleryRoot = makeSlot(
  'div',
  'root',
)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const GalleryMain = makeSlot(
  'div',
  'main',
)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  aspectRatio: '16 / 9',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
}));

const GalleryThumbs = makeSlot(
  'div',
  'thumbs',
)(({ theme }) => ({
  width: '100%',
  height: '100px',
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2),
}));

const ThumbButton = makeSlot('button', 'thumbButton', { shouldForwardProp: (prop) => prop !== 'active' })<{
  active: boolean;
}>(({ theme, active }) => ({
  position: 'relative',
  height: '100px',
  flexShrink: 0,
  background: 'transparent',
  border: `2px solid ${active ? theme.palette.common.white : 'transparent'}`,
  transition: theme.transitions.create('borderColor'),
  cursor: 'pointer',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

const VideoOverlay = makeSlot(
  'div',
  'videoOverlay',
)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

// =====================================================================
// ============================= Component =============================

export interface MediaGalleryCmpSettings {}

export interface MediaGalleryCmpProps {
  media: MediaItem[];
}

export default function MediaGalleryCmp({ media }: MediaGalleryCmpProps) {
  const { theme: activeTheme } = useAppTheme();

  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = media[activeIndex];

  const [mainRef, mainSize] = useElementSize<HTMLDivElement>();

  if (media.length === 0) return null;

  return (
    <GalleryRoot>
      {/* Main media display */}
      <GalleryMain ref={mainRef}>
        <AnimatePresence mode="wait">
          <MediaCmp
            item={activeItem}
            fit="contain"
            mode="upscale"
          />
        </AnimatePresence>
      </GalleryMain>

      {/* Thumbnails */}
      {media.length > 1 && (
        <GalleryThumbs>
          {/* ⬇ THIS must shrink to content size, not be 100% */}
          <div style={{ height: '100px', maxWidth: '100%' }}>
            <ScrollableCmp>
              <ScrollableCmp.Group horizontalId="0">
                <div style={{ display: 'flex', flexDirection: 'row', gap: activeTheme.spacing(1) }}>
                  {media.map((item, index) => {
                    const isActive = index === activeIndex;
                    const thumbH = 100;
                    const thumbW = item.width && item.height
                      ? Math.round((item.width / item.height) * thumbH)
                      : thumbH;
                    const thumbItem =
                      item.type === 'embeddedVideo'
                        ? { ...item, playerProps: { ...item.playerProps, light: true } }
                        : item;

                    return (
                      <ThumbButton
                        key={index}
                        active={isActive}
                        onClick={() => setActiveIndex(index)}
                        style={{ width: thumbW }}
                      >
                        <MediaCmp item={thumbItem} />
                        {item.type !== 'image' && <VideoOverlay>▶</VideoOverlay>}
                      </ThumbButton>
                    );
                  })}
                </div>
              </ScrollableCmp.Group>
              <ScrollableCmp.Horizontal id="0" />
            </ScrollableCmp>
          </div>
        </GalleryThumbs>
        // <div style={{ height: '100px', maxWidth: '100%' }}>

        // </div>
      )}
    </GalleryRoot>
  );
}
