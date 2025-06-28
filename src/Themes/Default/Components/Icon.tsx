'use client';

import React from 'react';
import { useTheme } from '@/Themes/ThemeProvider';
import { icons } from '@/Themes/Default/Icons';

export type IconTheme = {
  invert: boolean;
};

export interface IconProps {
  icon?: React.ReactNode;
  name?: string;
  imgSrc?: string;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

// Main Icon component
export const Icon = (props: IconProps) => {
  const { icon, name, imgSrc, className, iconClassName, textClassName } = props;

  return (
    <span className={className ?? 'inline-flex items-center space-x-2'}>
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={name ?? ''}
          title={name ?? ''}
          className={iconClassName ?? 'h-6 w-6'}
        />
      ) : (
        icon && <span className={iconClassName ?? ''}>{icon}</span>
      )}
      {name && <span className={textClassName ?? ''}>{name}</span>}
    </span>
  );
};

// Icon loader with theme-aware inversion
export function GetIcon(techName: string) {
  const { theme } = useTheme();
  const iconData = icons[techName as keyof typeof icons];
  const iconTheme = theme.components.icon;
  

  if (!iconData) {
    return <span>{techName}</span>;
  }

  const { component: IconComponent, canInvert } = iconData;

  const shouldInvert = iconTheme.invert && canInvert;

  return (
    <IconComponent
      className={`w-full h-full ${shouldInvert ? 'invert' : ''}`}
    />
  );
}
