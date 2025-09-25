'use client';

import React, { JSX } from 'react';
import { useTheme } from '@/Themes/ThemeProvider';
import { StyleProps, mergeStyleProps } from '@/utils/StyleProps'

export type TextLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'p';

export interface TextProps {
  children?: React.ReactNode;
  style?: StyleProps;
}

export type TextTheme = {
  style?: StyleProps;
};

  export interface TextBaseProps extends TextProps {
    as: TextLevel; //h1' | 'h2' | 'h3' | 'h4' | 'p';
  }

export function TextBaseCmp(props: TextBaseProps) {
  const { theme: activeTheme } = useTheme();
  const theme: TextTheme = (activeTheme.components as any)[props.as].theme;

  const Tag = props.as as keyof JSX.IntrinsicElements;

  const finalStyle = mergeStyleProps(theme.style, props.style);

  return (
    <Tag className={finalStyle.className} style={finalStyle.style}>
      {props.children}
    </Tag>
  );
}

  //Presets

  export function H1(props: Omit<TextProps, 'as'>) {
    return <TextBaseCmp {...props} as="h1" />;
  }

  export function H2(props: Omit<TextProps, 'as'>) {
    return <TextBaseCmp {...props} as="h2" />;
  }

  export function H3(props: Omit<TextProps, 'as'>) {
    return <TextBaseCmp {...props} as="h3" />;
  }

  export function H4(props: Omit<TextProps, 'as'>) {
    return <TextBaseCmp {...props} as="h4" />;
  }

  export function Paragraph(props: Omit<TextProps, 'as'>) {
    return <TextBaseCmp {...props} as="p" />;
  }
