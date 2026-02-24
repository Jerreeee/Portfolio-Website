'use client';

// @generate-component-classes

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAppTheme } from '@/Themes/ThemeProvider';
import MediaCmp from '@/Themes/Default/Components/Media/MediaCmp';
import { MediaItem } from '@/Types/media';
import ScrollableCmp from '../Scrollable/ScrollableCmp';
import { useElementSize } from '@/Hooks/useElementSize';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { mediaGalleryCmp } from './MediaGalleryCmpClasses';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// =====================================================================
// ========================= Slot Definitions ==========================

const makeSlot = makeSlotFactory('MediaGalleryCmp', mediaGalleryCmp);

const GalleryRoot = makeSlot('div', 'root')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const GalleryMain = makeSlot('div', 'main')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  aspectRatio: '16 / 9',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  touchAction: 'pan-y',
  backgroundColor: theme.palette.background.paper,
}));

const GalleryThumbs = makeSlot('div', 'thumbs')(({ theme }) => ({
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

const VideoOverlay = makeSlot('div', 'videoOverlay')(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const NavArrow = makeSlot('button', 'navArrow', { shouldForwardProp: (p) => p !== 'side' })<{
  side: 'left' | 'right';
}>(({ theme, side }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  [side]: theme.spacing(1),
  zIndex: 2,
  background: 'rgba(0,0,0,0.35)',
  border: 'none',
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.common.white,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0.5),
  opacity: 0.7,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 1 },
}));

const DotStrip = makeSlot('div', 'dotStrip')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(0.75, 1.5),
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
}));

const DotItem = makeSlot('div', 'dotItem', {
  shouldForwardProp: (p) => p !== 'active' && p !== 'isVideo',
})<{
  active: boolean;
  isVideo: boolean;
}>(({ theme, active, isVideo }) => ({
  opacity: active ? 1 : 0.3,
  cursor: 'pointer',
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: active ? 1 : 0.65 },
  ...(isVideo
    ? {
        width: 0,
        height: 0,
        borderTop: '5px solid transparent',
        borderBottom: '5px solid transparent',
        borderLeft: `8px solid ${theme.palette.text.primary}`,
      }
    : {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: theme.palette.text.primary,
      }),
}));

// =====================================================================
// ============================= Component =============================

export interface MediaGalleryCmpSettings {}

export interface MediaGalleryCmpProps {
  media: MediaItem[];
  compactStrip?: boolean;
}

export default function MediaGalleryCmp({ media, compactStrip }: MediaGalleryCmpProps) {
  const { theme: activeTheme } = useAppTheme();

  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = media[activeIndex];

  const [mainRef, mainSize] = useElementSize<HTMLDivElement>();

  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    thumbRefs.current[activeIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });
  }, [activeIndex]);

  const swipeStartX = useRef<number | null>(null);
  const swipeStartY = useRef<number | null>(null);

  const goNext = () => setActiveIndex((i) => (i + 1) % media.length);
  const goPrev = () => setActiveIndex((i) => (i - 1 + media.length) % media.length);

  const handleSwipeStart = (e: React.PointerEvent) => {
    swipeStartX.current = e.clientX;
    swipeStartY.current = e.clientY;
  };

  const handleSwipeEnd = (e: React.PointerEvent) => {
    if (swipeStartX.current == null || swipeStartY.current == null) return;
    const dx = e.clientX - swipeStartX.current;
    const dy = e.clientY - swipeStartY.current;
    swipeStartX.current = null;
    swipeStartY.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? goNext() : goPrev();
    }
  };

  if (media.length === 0) return null;

  return (
    <GalleryRoot>
      {/* Main media display */}
      <GalleryMain ref={mainRef} onPointerDown={handleSwipeStart} onPointerUp={handleSwipeEnd}>
        <AnimatePresence mode="wait">
          <MediaCmp
            item={activeItem}
            fit="contain"
            mode="upscale"
          />
        </AnimatePresence>
        {media.length > 1 && (
          <>
            <NavArrow side="left" onClick={goPrev}>
              <ChevronLeftIcon />
            </NavArrow>
            <NavArrow side="right" onClick={goNext}>
              <ChevronRightIcon />
            </NavArrow>
          </>
        )}
      </GalleryMain>

      {/* Compact strip OR full thumbnail strip */}
      {media.length > 1 &&
        (compactStrip ? (
          <DotStrip>
            {media.map((item, i) => (
              <DotItem key={i} active={i === activeIndex} isVideo={item.type !== 'image'} onClick={() => setActiveIndex(i)} />
            ))}
          </DotStrip>
        ) : (
          <GalleryThumbs>
            <div style={{ height: '100px', maxWidth: '100%' }}>
              <ScrollableCmp>
                <ScrollableCmp.Group horizontalId="0">
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: activeTheme.spacing(1),
                    }}
                  >
                    {media.map((item, index) => {
                      const isActive = index === activeIndex;
                      const thumbH = 100;
                      const thumbW =
                        item.width && item.height
                          ? Math.round((item.width / item.height) * thumbH)
                          : thumbH;
                      const thumbItem =
                        item.type === 'embeddedVideo'
                          ? { ...item, playerProps: { ...item.playerProps, light: true } }
                          : item;

                      return (
                        <ThumbButton
                          key={index}
                          ref={(el) => { thumbRefs.current[index] = el as HTMLButtonElement | null; }}
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
        ))}
    </GalleryRoot>
  );
}
