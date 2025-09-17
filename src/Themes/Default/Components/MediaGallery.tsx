'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/Themes/ThemeProvider';
import { MediaItem } from '@/Themes/Default/Components/Media';

export type MediaGalleryTheme = {};

export interface MediaGalleryProps {
  media: MediaItem[];
  className?: string;
}

export function MediaGalleryCmp({ media, className }: MediaGalleryProps) {
  const { theme: activeTheme } = useTheme();
  const theme: MediaGalleryTheme = activeTheme.components.mediaGallery.theme;

  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = media[activeIndex];

  const Media = activeTheme.components.media.cmp;
  const ImageTheme = activeTheme.components.image.theme;

  return (
    <div className={`flex flex-col ${className ?? ''}`}>
      {/* Main display area */}
      <div
        className={`relative w-full aspect-video overflow-hidden ${ImageTheme.className ?? ''}`}
        style={ImageTheme.style}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Media
              item={activeItem}
              className="w-full h-full"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnail strip */}
      <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
        {media.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative flex-shrink-0 w-32 aspect-video rounded-md overflow-hidden
                border-2 transition-colors
                ${isActive ? 'border-white' : 'border-transparent hover:border-gray-400'}`}
            >
              <Media
                item={{
                  ...item,
                  ...(item.type === 'embeddedVideo'
                    ? { playerProps: { ...item.playerProps, light: true } }
                    : { src: item.type === 'image' ? item.src : item.thumbnail || item.src })
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {item.type !== 'image' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-3xl">
                  ▶
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
