'use client';

import React from 'react';
import { useParsedSVG } from '@/Utils/UseParsedSVG';
import { Component } from '@/Themes/BaseTheme'
import { icons, IconKey, IconData } from '@/data/Icons';
import { useTheme } from '@/Themes/ThemeProvider';
import { toGrayScale, applyTint } from '@/Utils/Color';

export type IconSettings = {
  convertToGrayScale: boolean;
  tintColor?: string;
  tintStrength?: number;
  grayScaleIconColor: string;
}

export interface IconProps {
  techName: string;
}

export const IconCmp = IconCmpInternal as Component<
  IconSettings,
  IconProps
>;

export function IconCmpInternal(props: IconProps) {
  const { theme: activeTheme } = useTheme();
  const settings: IconSettings = activeTheme.components.icon?.settings;
  if (!settings) return null;

  let iconEntry: IconData | undefined = icons[props.techName as IconKey];
  if (!iconEntry) {
    iconEntry = icons.Error;
  }

  const processedSvg = useParsedSVG(props.techName, iconEntry.rawSvg);
  if (!processedSvg)
    return null;

  const colorVars: Record<string, string> = {};
  //Modify colors based on theme settings
  (processedSvg.originalColors ?? []).forEach((c, i) => {
    let finalColor = c;

    if (iconEntry.isGrayScale)
    {
      finalColor = settings.grayScaleIconColor;
    }
    else
    {
      //Apply grayScale conversion
      if (settings.convertToGrayScale) {
        finalColor = toGrayScale(finalColor);
      }

      //Apply tint
      if (settings.tintColor) {
          finalColor = applyTint(finalColor, settings.tintColor, settings.tintStrength);
      }
    }

    colorVars[`--color${i}`] = finalColor;
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        aspectRatio: processedSvg.aspectRatio ? `${processedSvg.aspectRatio}` : undefined,
        ...colorVars
      }}
      dangerouslySetInnerHTML={{ __html: processedSvg.svgHTML }}
    />
  );
}
