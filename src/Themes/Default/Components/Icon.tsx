'use client';

import React from 'react';
import {useParsedSVG} from '@/Utils/UseParsedSVG';
import { icons, IconKey, IconData } from '@/Icons';
import { useTheme } from '@/Themes/ThemeProvider';
import { toGrayScale, applyTint } from '@/Utils/Color';

export interface IconProps {
  techName: string;
  className?: string;
  style?: React.CSSProperties;
}

export type IconTheme = {
  convertToGrayScale: boolean;
  tintColor?: string;
  tintStrength?: number;
  grayScaleIconColor: string;
}

export function IconCmp({ techName, className, style }: IconProps) {
  const { theme: activeTheme } = useTheme();
  const theme = activeTheme.components.icon.theme;

  let iconEntry: IconData | undefined = icons[techName as IconKey];
  if (!iconEntry) {
    iconEntry = icons.Error;
  }

  const processedSvg = useParsedSVG(techName, iconEntry.rawSvg);
  if (!processedSvg)
    return null;


  const colorVars: Record<string, string> = {};
  //Modify colors based on theme settings
  (processedSvg.originalColors ?? []).forEach((c, i) => {
    let finalColor = c;

    if (iconEntry.isGrayScale)
    {
      finalColor = theme.grayScaleIconColor;
    }
    else
    {
      //Apply grayScale conversion
      if (theme.convertToGrayScale) {
        finalColor = toGrayScale(finalColor);
      }

      //Apply tint
      if (theme.tintColor) {
          finalColor = applyTint(finalColor, theme.tintColor, theme.tintStrength);
      }
    }

    colorVars[`--color${i}`] = finalColor;
  });

  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        aspectRatio: processedSvg.aspectRatio ? `${processedSvg.aspectRatio}` : undefined,
        ...style,
        ...colorVars
      }}
      dangerouslySetInnerHTML={{ __html: processedSvg.svgHTML }}
    />
  );
}
