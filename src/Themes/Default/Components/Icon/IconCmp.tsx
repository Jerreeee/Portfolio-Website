'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';
import { useTheme } from '@/Themes/ThemeProvider';
import { iconCmp } from './IconCmpClasses';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { iconManifest, type IconKey } from '@/Data/Icons/icons-manifest';

// ================================================================
// ========================= Slot Definitions ======================

const makeSlot = makeSlotFactory('IconCmp', iconCmp);

const IconWrapper = styled(motion.div)({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  overflow: 'visible',
});

const IconImage = styled(motion.img)({
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  width: 'auto',
  height: '100%',
  objectFit: 'contain',
});

const IconLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.7rem',
  whiteSpace: 'nowrap',
}));

// ================================================================
// ========================== Component ============================

export interface IconCmpSettings {}

export interface IconCmpProps {
  techName: string; // Key name used to look up the icon from manifest

  /** optional visual filters */
  convertToGrayScale?: boolean;
  tintColor?: string;
  tintStrength?: number;
  grayScaleIconColor?: string;

  showDisplayName?: boolean;
  height?: number | string;
}

/**
 * Renders an icon (and optional display label) from the pre-generated manifest.
 * Automatically scales to parent constraints while maintaining aspect ratio.
 */
export default function IconCmp(inProps: IconCmpProps) {
  const { theme } = useTheme(); 
  const defaultProps = theme.components?.IconCmp?.defaultProps ?? {};
  const props = { ...defaultProps, ...inProps };

  const key = props.techName as IconKey;
  const icon = iconManifest[key];

  // Handle missing icons gracefully
  if (!icon) {
    console.warn(`⚠️ Icon "${props.techName}" not found in iconManifest — showing name only.`);
    return (
      <IconWrapper style={{ height: props.height ?? '100%' }}>
        <IconLabel variant="caption">{props.techName}</IconLabel>
      </IconWrapper>
    );
  }

  const displayName = icon.displayName ?? props.techName;

  return (
    <IconWrapper
      style={{
        height: props.height ?? '100%',
      }}
    >
      <IconImage
        src={icon.src}
        alt={displayName}
        sx={{ aspectRatio: icon.aspectRatio }}
      />
      {props.showDisplayName && <IconLabel variant="caption">{displayName}</IconLabel>}
    </IconWrapper>
  );
}
