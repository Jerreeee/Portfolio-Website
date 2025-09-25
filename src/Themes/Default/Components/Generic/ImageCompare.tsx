'use client';

import React, { useLayoutEffect, useState } from 'react';
import { useTheme } from '@/Themes/ThemeProvider';
import { ImageProps, ImageTheme } from '@/Themes/Default/Components/Generic/Image';
import { StyleProps, mergeStyleProps } from '@/utils/StyleProps'

export interface ImageCompareItem {
  src: string;
  alt?: string;
  imageProps?: Omit<ImageProps, 'src' | 'alt'>;
}

export type ImageCompareTheme = {};

export interface ImageCompareProps {
  images: ImageCompareItem[];
  styleOverride?: StyleProps;
}

export interface ImageMaskProps {
  bottom: ImageCompareItem;
  top: ImageCompareItem;
  progress: number;
  styleOverride?: StyleProps;
  showHandle?: boolean;
  enableDrag?: boolean;
  onDrag?: (newProgress: number) => void;
}

/** Generic two-image horizontal reveal. */
export function ImageMaskCmp(props: ImageMaskProps) {
  const { theme: activeTheme } = useTheme();
  const theme: ImageTheme = activeTheme.components.image.theme;

  const Image = activeTheme.components.image.cmp;
  
  const finalStyle = mergeStyleProps(theme.style, props.styleOverride);

  // Internal progress state, initialized from the `progress` prop
  const [_progress, setProgress] = useState(props.progress);

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
    setProgress(props.progress);
  }, [props.progress]);

  // Handle range input changes
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = parseFloat(e.target.value);
    setProgress(newValue);
    props.onDrag?.(newValue);
  }

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none ${finalStyle.className}`}
      style={props.styleOverride?.style}
    >
      {/** Bottom Image */}
      <Image
        src={props.bottom.src}
        alt={props.bottom.alt || ''}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover select-none"
        {...props.bottom.imageProps}
      />

      {/** Top Image */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - _progress * 100}% 0 0)` }}
      >
        <Image
          src={props.top.src}
          alt={props.top.alt || ''}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover select-none"
          {...props.top.imageProps}
        />
      </div>

      {/** Vertical Handle */}
      {props.showHandle && (
        <div
          className="absolute top-0 bottom-0 w-[1px] bg-white shadow-md pointer-events-none"
          style={{ left: `${_progress * 100}%`, transform: 'translateX(-50%)' }}
        />
      )}

      {/* Transparent range input for drag/touch/keyboard control */}
      {props.enableDrag && (
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

export function ImageCompareCmp(props: ImageCompareProps) {
  const { theme: activeTheme } = useTheme();
  const SegmentSlider = activeTheme.components.segmentSlider.cmp;

  if (props.images.length === 2) {
    return (
        <ImageMaskCmp
          progress={0.5}
          bottom={props.images[0]}
          top={props.images[1]}
          styleOverride={props.styleOverride}
        />
    );
  }

  //images.length > 2
  const segmentCount = props.images.length - 1;
  const [sliderValue, setSliderValue] = useState(0);
  const raw = sliderValue * segmentCount;
  const segmentIndex = Math.min(Math.floor(raw), segmentCount - 1);
  const segmentProgress = raw - segmentIndex;
  const nextIndex = Math.min(segmentIndex + 1, props.images.length - 1);

  function handleSegmentDrag(newProgress: number) {
    // Using 0.99999 to prevent skipping to next segment when fully dragged
    const progress = segmentIndex < segmentCount - 1 ? Math.min(newProgress, 0.99999) : newProgress;
    const newSliderValue = (segmentIndex + progress) / segmentCount;
    setSliderValue(newSliderValue);
  }

  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <ImageMaskCmp
        bottom={props.images[segmentIndex]}
        top={props.images[nextIndex]}
        progress={segmentProgress}
        enableDrag
        onDrag={handleSegmentDrag}
        styleOverride={props.styleOverride}
      />

      {/* Bottom slider remains unchanged */}
      <SegmentSlider
        count={props.images.length}
        segmentCount={segmentCount}
        segmentIndex={segmentIndex}
        sliderValue={sliderValue}
        onChange={setSliderValue}
      />
    </div>
  );
}
