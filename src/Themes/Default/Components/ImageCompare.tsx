'use client';

import React, { useState, useRef } from 'react';
import { useTheme } from '@/Themes/ThemeProvider';
import { ImageProps } from '@/Themes/Default/Components/Image';

export interface ImageCompareItem {
  src: string;
  alt?: string;
  imageProps?: Omit<ImageProps, 'src' | 'alt'>;
}

export interface ImageCompareProps {
  images: ImageCompareItem[];
  className?: string;
}

/** Generic two-image horizontal reveal. */
function ImageMaskCmp({
  bottom,
  top,
  progress,
  className,
  showHandle = true,
}: {
  bottom: ImageCompareItem;
  top: ImageCompareItem;
  progress: number;
  className?: string;
  showHandle?: boolean;
}) {
  const { theme: activeTheme } = useTheme();
  const Image = activeTheme.components.image.cmp;

  return (
    <div className={`relative aspect-video overflow-hidden select-none ${className ?? ''}`}>
      <Image
        src={bottom.src}
        alt={bottom.alt || ''}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover select-none"
        {...bottom.imageProps}
      />
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - progress * 100}% 0 0)` }}
      >
        <Image
          src={top.src}
          alt={top.alt || ''}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover select-none"
          {...top.imageProps}
        />
      </div>
      {showHandle && (
        <div
          className="absolute top-0 bottom-0 w-1 bg-white/80 shadow-md pointer-events-none"
          style={{ left: `${progress * 100}%`, transform: 'translateX(-50%)' }}
        />
      )}
    </div>
  );
}

export function ImageCompareCmp({ images, className }: ImageCompareProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  if (images.length === 2) {
    const [dividerX, setDividerX] = useState(0.5);

    function handleDrag(e: React.MouseEvent) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width;
      setDividerX(Math.min(1, Math.max(0, x)));
    }

    return (
      <div
        ref={containerRef}
        className={`relative ${className ?? ''}`}
        onMouseMove={(e) => e.buttons === 1 && handleDrag(e)}
        onMouseDown={handleDrag}
      >
        <ImageMaskCmp bottom={images[0]} top={images[1]} progress={dividerX} />
      </div>
    );
  }

  const [sliderValue, setSliderValue] = useState(0);
  const segmentCount = images.length - 1;
  const raw = sliderValue * segmentCount;
  const segmentIndex = Math.min(Math.floor(raw), segmentCount - 1);
  const segmentProgress = raw - segmentIndex;
  const nextIndex = Math.min(segmentIndex + 1, images.length - 1);

  return (
    <div className={`flex flex-col gap-4 ${className ?? ''}`}>
      <ImageMaskCmp bottom={images[segmentIndex]}
        top={images[nextIndex]}
        progress={segmentProgress}
      />

      <div className="relative h-6 w-full select-none">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700 rounded transform -translate-y-1/2" />
        <div className="absolute top-1/2 left-0 w-full transform -translate-y-1/2 pointer-events-none">
          {images.map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-4 bg-gray-500 transform -translate-y-1/2"
              style={{ left: `${(i / segmentCount) * 100}%`, top: '50%' }}
            />
          ))}
        </div>
        <div className="absolute top-1/2 h-1 bg-white/20 transform -translate-y-1/2 pointer-events-none"
          style={{
            left: `${(segmentIndex / segmentCount) * 100}%`,
            width: `${100 / segmentCount}%`,
          }}
        />
        <div className="absolute top-0 w-3 h-6 bg-white rounded-full shadow-md cursor-pointer transform -translate-x-1/2"
          style={{ left: `${sliderValue * 100}%` }}
        />
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={sliderValue}
          onChange={(e) => setSliderValue(parseFloat(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}
