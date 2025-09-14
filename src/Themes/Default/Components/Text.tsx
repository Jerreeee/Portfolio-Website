  'use client';

  import React, { JSX } from 'react';
  import { useTheme } from '@/Themes/ThemeProvider';

  export type TextLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'p';

  export type TextTheme = {
    fontSize: string;
    fontWeight: string;
    color: string;
  };

  export interface TextProps extends Partial<TextTheme> {
    text: string;
    className?: string;
  }

  export interface TextBaseProps extends TextProps {
    as: TextLevel; //h1' | 'h2' | 'h3' | 'h4' | 'p';
  }

  export function TextBaseCmp(props: TextBaseProps) {
    const { theme: activeTheme } = useTheme();

    // dynamically select the right theme
    const theme: TextTheme = (activeTheme.components as any)[props.as].theme;

    // decide which tag to render
    const Tag = props.as as keyof JSX.IntrinsicElements;

    const style: React.CSSProperties = {};

    if (props.fontSize !== '')
      style.fontSize = props.fontSize ?? theme.fontSize;
    
    if (props.fontWeight !== '')
      style.fontWeight = props.fontWeight ?? theme.fontWeight;
    
    if (props.color !== '')
      style.color = props.color ?? theme.color;

    return (
      <Tag
        className={props.className ?? ''}
        style={style}
      >
        {props.text}
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
