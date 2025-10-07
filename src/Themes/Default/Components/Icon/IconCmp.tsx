'use client';

import React from 'react';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useTheme } from '@/Themes/ThemeProvider';
import { icons, IconKey, IconData } from '@/data/Icons';
import { useParsedSVG } from '@/utils/UseParsedSvg';
import { toGrayScale, applyTint } from '@/utils/Color';

// =====================================================================
// ========================= Slot Definitions ==========================

const IconRoot = styled(motion.div, { name: 'Icon', slot: 'Root' })(({ theme }) => ({
  display: 'inline-block',
  width: '100%',
  height: '100%',
  maxWidth: '100%',
  maxHeight: '100%',
}));

// =====================================================================
// ============================= Component =============================

export interface IconCmpSettings {}

export interface IconCmpProps {
  techName: string;
  convertToGrayScale?: boolean;
  tintColor?: string;
  tintStrength?: number;
  grayScaleIconColor?: string;
}

export default function IconCmp(props: IconCmpProps) {
  const { theme } = useTheme();

  const iconEntry: IconData | undefined = icons[props.techName as IconKey] ?? icons.Error;
  const processedSvg = useParsedSVG(props.techName, iconEntry.rawSvg);
  if (!processedSvg) return null;

  // compute final colors based on theme logic
  const colorVars: Record<string, string> = {};
  (processedSvg.originalColors ?? []).forEach((c, i) => {
    let finalColor = c;

    if (iconEntry.isGrayScale) {
      finalColor = props?.grayScaleIconColor ?? c;
    } else {
      if (props?.convertToGrayScale) {
        finalColor = toGrayScale(finalColor);
      }
      if (props?.tintColor) {
        finalColor = applyTint(finalColor, props.tintColor, props.tintStrength);
      }
    }

    colorVars[`--color${i}`] = finalColor;
  });

  return (
    <IconRoot
        sx={{
            aspectRatio: processedSvg.aspectRatio || undefined,
            ...colorVars,
        }}
        dangerouslySetInnerHTML={{ __html: processedSvg.svgHTML }}
    />
  );
}
