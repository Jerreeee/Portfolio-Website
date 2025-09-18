'use client';

import React from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { useTheme } from '@/Themes/ThemeProvider';
import { StyleProps, mergeStyleProps } from '@/Utils/StyleProps'

export type ImageTheme = {
  style?: StyleProps;
};

export interface ImageProps extends NextImageProps {
  styleOverride?: StyleProps;
}

export function ImageCmp(props: ImageProps) {
  const { theme: activeTheme } = useTheme();
  const theme: ImageTheme = activeTheme.components.image.theme;
  
  const finalStyle = mergeStyleProps(theme.style, props.styleOverride);

  return (
    <NextImage
      fill
      {...props}
      className={finalStyle.className}
      style={finalStyle.style}
    />
  );
}
