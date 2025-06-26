'use client';

import React from "react";
import { icons } from '@/icons';

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
    <span className={className ?? "inline-flex items-center space-x-2"}>
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={name ?? ""}
          title={name ?? ""}
          className={iconClassName ?? "h-6 w-6"}
        />
      ) : (
        icon && <span className={iconClassName ?? ""}>{icon}</span>
      )}
      {name && <span className={textClassName ?? ""}>{name}</span>}
    </span>
  );
};

export function GetIcon(techName: string) {
  const iconData = icons[techName];
  if (!iconData) {
    return <span>{techName}</span>;
  }

  const { component: IconComponent, canInvert } = iconData;

  return (
    <IconComponent
      className={`w-full h-full text-[var(--foreground)] ${canInvert ? '' : 'invert-0'}`}
    />
  );
}

