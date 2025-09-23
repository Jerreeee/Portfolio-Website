'use client';

import React, { useLayoutEffect, useState } from 'react';
import { Component } from '@/Themes/BaseTheme';
import { useTheme } from '@/Themes/ThemeProvider';
import { ImageProps } from './Image';

export interface ImageCompareItem {
  src: string;
  alt?: string;
  imageProps?: Omit<ImageProps, 'src' | 'alt'>;
}

export type ImageMaskSettings = {};

export interface ImageMaskProps {
  bottom: ImageCompareItem;
  top: ImageCompareItem;
  progress: number;
  showHandle?: boolean;
  enableDrag?: boolean;
  onDrag?: (newProgress: number) => void;
  removeWrapper?: boolean;
}

export const ImageMaskCmp = ImageMaskCmpInternal as Component<
  ImageMaskSettings,
  ImageMaskProps
>;

function ImageMaskCmpInternal(props: ImageMaskProps) {
  const { theme: activeTheme } = useTheme();
  const settings: ImageMaskSettings = activeTheme.components.imageMask?.settings;
  if (!settings) return null;

  const Image = activeTheme.components.image.cmp;
  const [_progress, setProgress] = useState(props.progress);

  useLayoutEffect(() => {
    setProgress(props.progress);
  }, [props.progress]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = parseFloat(e.target.value);
    setProgress(newValue);
    props.onDrag?.(newValue);
  }

  return (
    <div className={props.removeWrapper ? '' : 'image-mask__wrapper relative w-full h-full overflow-hidden select-none'} >
      {/* Bottom image */}
      <div className='absolute inset-0 w-full h-full object-cover select-none' >
        <Image
          src={props.bottom.src}
          alt={props.bottom.alt || ''}
          draggable={false}
          removeWrapper
          {...props.bottom.imageProps}
        />
      </div>

      {/* Top image (clipped) */}
        <div
          className="absolute inset-0 w-full h-full object-cover select-none"
          style={{ clipPath: `inset(0 ${100 - _progress * 100}% 0 0)` }}
        >
          <Image
            src={props.top.src}
            alt={props.top.alt || ''}
            draggable={false}
            removeWrapper
            {...props.top.imageProps}
          />
        </div>

      {/* Handle */}
      {props.showHandle && (
        <div
          className="image-mask__handle absolute top-0 bottom-0 w-[1px] pointer-events-none"
          style={{
            left: `${_progress * 100}%`,
            transform: 'translateX(-50%)',
          }}
        />
      )}

      {/* Invisible range input for dragging */}
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

/* -------------------------------------------------------------------------- */

export type ImageCompareSettings = {};

export interface ImageCompareProps {
  images: ImageCompareItem[];
}

export const ImageCompareCmp = ImageCompareCmpInternal as Component<
  ImageCompareSettings,
  ImageCompareProps
>;

function ImageCompareCmpInternal(props: ImageCompareProps) {
  const { theme: activeTheme } = useTheme();
  const settings: ImageCompareSettings = activeTheme.components.imageCompare?.settings;
  if (!settings) return null;

  const SegmentSlider = activeTheme.components.segmentSlider.cmp;

  if (props.images.length === 2) {
    return (
      <ImageMaskCmp
        progress={0.5}
        bottom={props.images[0]}
        top={props.images[1]}
      />
    );
  }

  const segmentCount = props.images.length - 1;
  const [sliderValue, setSliderValue] = useState(0);
  const raw = sliderValue * segmentCount;
  const segmentIndex = Math.min(Math.floor(raw), segmentCount - 1);
  const segmentProgress = raw - segmentIndex;
  const nextIndex = Math.min(segmentIndex + 1, props.images.length - 1);

  function handleSegmentDrag(newProgress: number) {
    const progress =
      segmentIndex < segmentCount - 1
        ? Math.min(newProgress, 0.99999)
        : newProgress;
    const newSliderValue = (segmentIndex + progress) / segmentCount;
    setSliderValue(newSliderValue);
  }

  return (
    <div className={"image-compare__container flex flex-col w-full h-full gap-2"} >
      <ImageMaskCmp
        bottom={props.images[segmentIndex]}
        top={props.images[nextIndex]}
        progress={segmentProgress}
        enableDrag
        onDrag={handleSegmentDrag}
      />
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
