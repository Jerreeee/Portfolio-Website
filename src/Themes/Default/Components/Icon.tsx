'use client';

import React from 'react';
import { icons } from '@/Themes/Default/Icons';

export interface IconProps {
  icon: React.ReactNode;
  name: string;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showName?: boolean;
}

export function IconCmp({
  icon,
  name,
  className,
  iconClassName,
  textClassName,
  showName = true,
}: IconProps) {
  return (
    <span className={className ?? 'inline-flex items-center space-x-2'}>
      {icon && <span className={iconClassName ?? ''}>{icon}</span>}
      {showName && name && <span className={textClassName ?? ''}>{name}</span>}
    </span>
  );
}

export function GetIcon(techName: string) {
  const iconData = icons[techName as keyof typeof icons];

  if (!iconData) {
    return <span>{techName}</span>;
  }

  const { component: IconComponent } = iconData;

  return <IconComponent className="w-full h-full" />;
}
