'use client';

import React, { useLayoutEffect, useState } from 'react';
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
export function ImageMaskCmp({
  bottom,
  top,
  progress = 0.5,
  className,
  showHandle = true,
  enableDrag = true,
  onDrag,
}: {
  bottom: ImageCompareItem;
  top: ImageCompareItem;
  progress?: number;
  className?: string;
  showHandle?: boolean;
  enableDrag?: boolean;
  onDrag?: (newProgress: number) => void;
}) {
  const { theme: activeTheme } = useTheme();
  const Image = activeTheme.components.image.cmp;

  // Internal progress state, initialized from the `progress` prop
  const [_progress, setProgress] = useState(progress);

  // Keep internal `_progress` in perfect sync with the `progress` prop.
  //
  // Why useLayoutEffect instead of useEffect?
  // - useEffect runs *after* the browser paints, so the component renders
  //   once with the old _progress value and then corrects it on the next frame.
  //   This caused a 1-frame flicker when switching segments.
  // - useLayoutEffect runs right after React commits the DOM changes but
  //   *before* the browser paints, so setProgress(progress) happens
  //   synchronously and the user never sees an outdated value.
  useLayoutEffect(() => {
    setProgress(progress);
  }, [progress]);

  // Handle range input changes
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = parseFloat(e.target.value);
    setProgress(newValue);
    onDrag?.(newValue);
  }

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none ${className ?? ''}`}
    >
      {/** Bottom Image */}
      <Image
        src={bottom.src}
        alt={bottom.alt || ''}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover select-none"
        {...bottom.imageProps}
      />

      {/** Top Image */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - _progress * 100}% 0 0)` }}
      >
        <Image
          src={top.src}
          alt={top.alt || ''}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover select-none"
          {...top.imageProps}
        />
      </div>

      {/** Vertical Handle */}
      {showHandle && (
        <div
          className="absolute top-0 bottom-0 w-1 bg-white/80 shadow-md pointer-events-none"
          style={{ left: `${_progress * 100}%`, transform: 'translateX(-50%)' }}
        />
      )}

      {/* Transparent range input for drag/touch/keyboard control */}
      {enableDrag && (
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={_progress}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      )}
    </div>
  );
}

export function ImageCompareCmp({ images, className }: ImageCompareProps) {
  if (images.length === 2) {
    return (
        <ImageMaskCmp bottom={images[0]} top={images[1]} />
    );
  }

  //images.length > 2
  const segmentCount = images.length - 1;
  const [sliderValue, setSliderValue] = useState(0);
  const raw = sliderValue * segmentCount;
  const segmentIndex = Math.min(Math.floor(raw), segmentCount - 1);
  const segmentProgress = raw - segmentIndex;
  const nextIndex = Math.min(segmentIndex + 1, images.length - 1);

  function handleSegmentDrag(newProgress: number) {
    // Prevent skipping to next segment when fully dragged
    const progress = segmentIndex < segmentCount - 1 ? Math.min(newProgress, 0.99999) : newProgress;
    const newSliderValue = (segmentIndex + progress) / segmentCount;
    setSliderValue(newSliderValue);
  }

  return (
    <div className={`flex flex-col gap-4 w-full h-full ${className ?? ''}`}>
      <ImageMaskCmp
        bottom={images[segmentIndex]}
        top={images[nextIndex]}
        progress={segmentProgress}
        enableDrag
        onDrag={handleSegmentDrag}
      />

      {/* Bottom slider remains unchanged */}
      <div className="relative h-6 w-full select-none">
        {/* Horizontal Bar */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700 rounded transform -translate-y-1/2" />
        {/* Tick Marks */}
        <div className="absolute top-1/2 left-0 w-full transform -translate-y-1/2 pointer-events-none">
          {images.map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-4 bg-gray-500 transform -translate-y-1/2"
              style={{ left: `${(i / segmentCount) * 100}%`, top: '50%' }}
            />
          ))}
        </div>
        {/* Current Segment Highlight */}
        <div
          className="absolute top-1/2 h-1 bg-white/20 transform -translate-y-1/2 pointer-events-none"
          style={{
            left: `${(segmentIndex / segmentCount) * 100}%`,
            width: `${100 / segmentCount}%`,
          }}
        />
        {/* Draggable Handle */}
        <div
          className="absolute top-0 w-3 h-6 bg-white rounded-full shadow-md cursor-pointer transform -translate-x-1/2"
          style={{ left: `${sliderValue * 100}%` }}
        />
        {/* Transparent Range Input */}
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
