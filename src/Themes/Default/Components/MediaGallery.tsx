'use client';

import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/Themes/ThemeProvider';

export type MediaGalleryTheme = {
}

export type MediaItem = {
  type: 'image' | 'video' | 'youtube';
  src: string;        // image URL or video URL
  thumbnail?: string; // optional separate thumbnail image
  alt?: string;
};  

export interface MediaGalleryProps {
  media: MediaItem[];
  className?: string;
}

export function MediaGalleryCmp({ media, className }: MediaGalleryProps) {
  const { theme: activeTheme } = useTheme();
  const theme: MediaGalleryTheme = activeTheme.components.mediaGallery.theme;

  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = media[activeIndex];
  
  const Image = activeTheme.components.image.cmp;
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
            {activeItem.type === 'image' ? (
                <Image
                    src={activeItem.src}
                    alt={activeItem.alt || ''}
                    fill
                    priority
                />
            ) : activeItem.type === 'youtube' ? (
                <ReactPlayer
                    src={activeItem.src}
                    width="100%"
                    height="100%"
                    controls
                    playing={false}
                />
            ) : (
                <video
                    src={activeItem.src}
                    autoPlay
                    loop
                    muted
                    controls
                    className="w-full h-full object-cover"
                />
            )}
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
              {item.type === 'image' ? (
                <Image
                  src={item.thumbnail || item.src}
                  alt={item.alt || ''}
                  fill
                  className="object-cover"
                />
              ) : (
                <>
                  <video
                    src={item.thumbnail || item.src}
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Play icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-3xl">
                    ▶
                  </div>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
