import React from 'react';
import {useParsedSvg} from '@/Utils/useParsedSVG'
import { icons } from '@/Icons'; // your icons map

interface IconProps {
  techName: string;
  overrideColors?: Record<string, string>;
  className?: string;
  style?: React.CSSProperties;
}

export function IconCmp({ techName, overrideColors, className, style }: IconProps) {
  const iconEntry = icons[techName];

  if (!iconEntry) {
    // console.warn(`No icon found for tech "${techName}"`);
    return null;
  }


  const { processedSvg, colorVars, aspectRatio } = useParsedSvg(iconEntry.svg, overrideColors);

  if (!processedSvg) return null;


  // console.log("🔥 IconCmp running", { techName, overrideColors, className, style });
  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        aspectRatio: aspectRatio ? `${aspectRatio}` : undefined,
        ...style,
        ...colorVars,
      }}
      dangerouslySetInnerHTML={{ __html: processedSvg }}
    />
  );
}
