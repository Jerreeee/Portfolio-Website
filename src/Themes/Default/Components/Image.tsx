'use client';

import React from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { useTheme } from '@/Themes/ThemeProvider';

export type ImageTheme = {
  className?: string;
  style?: React.CSSProperties;
};

export interface ImageProps
  extends Omit<NextImageProps, 'className' | 'style'>,
    Partial<ImageTheme> {}

/**
 * Themed Image wrapper that merges theme className & style
 * with props from the caller (caller overrides win).
 */
export function ImageCmp(props: ImageProps) {
  const { theme: activeTheme } = useTheme();
  const theme: ImageTheme = activeTheme.components.image.theme;

  const finalStyle: React.CSSProperties = {
    ...(theme.style ?? {}),
    ...(props.style ?? {}),
  };

  const finalClassName = [theme.className, props.className].filter(Boolean).join(' ');

  return (
    <NextImage
      {...props}
      className={finalClassName}
      style={finalStyle}
    />
  );
}
