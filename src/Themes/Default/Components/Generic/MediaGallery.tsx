'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Component } from '@/Themes/BaseTheme'
import { useTheme } from '@/Themes/ThemeProvider';
import { MediaItem } from '@/Themes/Default/Components/Generic/Media';

export type MediaGallerySettings = {};

export interface MediaGalleryProps {
  media: MediaItem[];
}

export const MediaGalleryCmp = MediaGalleryCmpInternal as Component<
  MediaGallerySettings,
  MediaGalleryProps
>;

function MediaGalleryCmpInternal(props: MediaGalleryProps) {
  const { theme: activeTheme } = useTheme();
  const settings: MediaGallerySettings = activeTheme.components.mediaGallery?.settings;
  if (!settings) return null;

  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = props.media[activeIndex];
  const [needsScroll, setNeedsScroll] = useState(false);

  const Media = activeTheme.components.media.cmp;

  const ScrollBar = activeTheme.components.scrollBar.cmp;
  const thumbContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    function checkScroll() {
      const el = thumbContainerRef.current;
      if (el) {
        setNeedsScroll(el.scrollWidth > el.clientWidth);
      }
    }

    requestAnimationFrame(checkScroll);
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [props.media]);

  return (
    <div className="flex flex-col gap-2">
      {/* Main display area */}
      <div
        className={`relative w-full aspect-video overflow-hidden`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full"
          >
            <Media
              item={activeItem}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnail strip */}
      <div
        ref={thumbContainerRef}
        className="flex gap-3 overflow-x-auto media-gallery-thumbs">
        {props.media.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative flex-shrink-0 w-32 aspect-video overflow-hidden
                border-2 transition-colors
                ${isActive ? 'border-white' : 'border-transparent hover:border-gray-400'}`}
            >
              <div className='absolute inset-0 object-cover' >
                <Media
                  item={{
                    ...item,
                    ...(item.type === 'embeddedVideo'
                      ? { playerProps: { ...item.playerProps, light: true } }
                      : { src: item.type === 'image' ? item.src : item.thumbnail || item.src })
                  }}
                />
              </div>
              {item.type !== 'image' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-3xl">
                  ▶
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Slider */}
      {needsScroll && <ScrollBar scrollContainer={thumbContainerRef} />}
    </div>
  );
}
