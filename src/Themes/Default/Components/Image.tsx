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

export function ImageCmp(props: ImageProps) {
  const { theme: activeTheme } = useTheme();
  const theme: ImageTheme = activeTheme.components.image.theme;
  
  const finalClassName = [theme.className, props.className].filter(Boolean).join(' ');
  const finalStyle: React.CSSProperties = {
    ...(theme.style ?? {}),
    ...(props.style ?? {}),
  };

  return (
    <NextImage
      fill
      {...props}
      className={finalClassName}
      style={finalStyle}
    />
  );
}
