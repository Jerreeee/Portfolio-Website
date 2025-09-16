  'use client';

  import React, { JSX } from 'react';
  import { useTheme } from '@/Themes/ThemeProvider';

  export type TextLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'p';

  export type TextTheme = {
    className?: string;
    style?: React.CSSProperties;
  };

  export interface TextProps extends Partial<TextTheme> {
    children?: React.ReactNode;
  }

  export interface TextBaseProps extends TextProps {
    as: TextLevel; //h1' | 'h2' | 'h3' | 'h4' | 'p';
  }

export function TextBaseCmp(props: TextBaseProps) {
  const { theme: activeTheme } = useTheme();
  const theme: TextTheme = (activeTheme.components as any)[props.as].theme;

  const Tag = props.as as keyof JSX.IntrinsicElements;

  // Merge theme and prop styles. props.style overrides theme.style
  const finalStyle: React.CSSProperties = {
    ...(theme.style ?? {}),
    ...(props.style ?? {}),
  };

   const finalClassName = [theme.className, props.className].filter(Boolean).join(' ');

  return (
    <Tag className={finalClassName} style={finalStyle}>
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
