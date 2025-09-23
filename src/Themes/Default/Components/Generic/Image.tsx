'use client';

import React from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { Component } from '@/Themes/BaseTheme'
import { useTheme } from '@/Themes/ThemeProvider';

export type ImageSettings = {};

export interface ImageProps extends Omit<NextImageProps, 'className' | 'style'> {
  removeWrapper?: boolean;
}

export const ImageCmp = ImageCmpInternal as Component<
  ImageSettings,
  ImageProps
>;

function ImageCmpInternal({ removeWrapper, ...imageProps }: ImageProps) {
  const { theme: activeTheme } = useTheme();
  const settings: ImageSettings = activeTheme.components.image?.settings;
  if (!settings) return null;

  return (
    <div className={removeWrapper ? '' : 'image__wrapper'} >
      <NextImage
        fill
        {...imageProps}
        className="image"
      />
    </div>
  );
}
