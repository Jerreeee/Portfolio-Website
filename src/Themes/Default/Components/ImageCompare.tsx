'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/Themes/ThemeProvider';
import { ImageProps } from '@/Themes/Default/Components/Image';

export interface RenderCompareItem {
  src: string;
  alt?: string;
  imageProps?: Omit<ImageProps, 'src' | 'alt'>;
}

export interface ImageCompareProps {
  images: RenderCompareItem[];
  className?: string;
}

export function ImageCompareCmp({ images, className }: ImageCompareProps) {
  const { theme: activeTheme } = useTheme();
  const Image = activeTheme.components.image.cmp;
  const containerRef = useRef<HTMLDivElement>(null);

  // Two images → handle dragging
  if (images.length === 2) {
    const [dividerX, setDividerX] = useState(50); // percentage

    function handleDrag(e: React.MouseEvent) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      setDividerX(Math.min(100, Math.max(0, x)));
    }

    return (
      <div
        ref={containerRef}
        className={`relative overflow-hidden aspect-video select-none ${className ?? ''}`}
        onMouseMove={(e) => e.buttons === 1 && handleDrag(e)}
        onMouseDown={handleDrag}
      >
        {/* Bottom image (always full size) */}
        <Image
          src={images[0].src}
          alt={images[0].alt || ''}
          className="absolute inset-0 w-full h-full object-cover"
          {...images[0].imageProps}
        />

        {/* Top image, fully sized, clipped to divider */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: `inset(0 ${100 - dividerX}% 0 0)`, // reveal left part only
          }}
        >
          <Image
            src={images[1].src}
            alt={images[1].alt || ''}
            className="absolute inset-0 w-full h-full object-cover"
            {...images[1].imageProps}
          />
        </div>

        {/* draggable vertical handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-md"
          style={{ left: `${dividerX}%`, transform: 'translateX(-50%)' }}
        />
      </div>
    );
  }

  // n images → slider
  const [sliderValue, setSliderValue] = useState(0); // 0..1
  const segmentCount = images.length - 1;
  const raw = sliderValue * segmentCount;
  const segmentIndex = Math.floor(raw);
  const segmentProgress = raw - segmentIndex;
  const nextIndex = Math.min(segmentIndex + 1, images.length - 1);

  return (
    <div className={`flex flex-col gap-4 ${className ?? ''}`}>
      <div className="relative aspect-video overflow-hidden select-none">
        {/* Base (current) image */}
        <Image
          src={images[segmentIndex].src}
          alt={images[segmentIndex].alt || ''}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover select-none"
          {...images[segmentIndex].imageProps}
        />

        {/* Overlay next image, clipped left→right */}
        {segmentIndex !== nextIndex && (
          <div
            className="absolute inset-0"
            style={{
              clipPath: `inset(0 ${100 - segmentProgress * 100}% 0 0)`,
            }}
          >
            <Image
              src={images[nextIndex].src}
              alt={images[nextIndex].alt || ''}
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover select-none"
              {...images[nextIndex].imageProps}
            />
          </div>
        )}

        {/* optional handle indicator */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white/80 shadow-md pointer-events-none"
          style={{
            left: `${segmentProgress * 100}%`,
            transform: 'translateX(-50%)',
          }}
        />
      </div>

      {/* Bottom slider controlling whole sequence */}
      <input
        type="range"
        min={0}
        max={1}
        step='any'
        value={sliderValue}
        onChange={(e) => setSliderValue(parseFloat(e.target.value))}
        className="w-full accent-white"
      />

      {/* Optional dots */}
      <div className="flex justify-between px-1 text-xs text-gray-400">
        {images.map((_, i) => (
          <span key={i}>•</span>
        ))}
      </div>
    </div>
  );
}
