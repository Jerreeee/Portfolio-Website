'use client';

import React, { JSX } from 'react';
import { useTheme } from '@/Themes/ThemeProvider';
import { StyleProps, mergeStyleProps } from '@/Utils/StyleProps'
import { Component } from '@/Themes/BaseTheme';

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
  const settings: TextTheme = (activeTheme.components as any)[props.as].settings;

  const Tag = props.as as keyof JSX.IntrinsicElements;

  return (
    <Tag className={props.style?.className} style={props.style?.style}>
      {props.children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Presets                                   */
/* -------------------------------------------------------------------------- */

// Individual settings types for each preset (you can add fields later)
export type H1Settings = {};
export type H2Settings = {};
export type H3Settings = {};
export type H4Settings = {};
export type PSettings  = {};

// H1
export const H1 = H1Internal as Component<H1Settings, TextProps>;
export function H1Internal(props: TextProps) {
  return <TextBaseCmp {...props} as="h1" />;
}

// H2
export const H2 = H2Internal as Component<H2Settings, TextProps>;
export function H2Internal(props: TextProps) {
  return <TextBaseCmp {...props} as="h2" />;
}

// H3
export const H3 = H3Internal as Component<H3Settings, TextProps>;
export function H3Internal(props: TextProps) {
  return <TextBaseCmp {...props} as="h3" />;
}

// H4
export const H4 = H4Internal as Component<H4Settings, TextProps>;
export function H4Internal(props: TextProps) {
  return <TextBaseCmp {...props} as="h4" />;
}

// Paragraph (p)
export const P = PInternal as Component<PSettings, TextProps>;
export function PInternal(props: TextProps) {
  return <TextBaseCmp {...props} as="p" />;
}
