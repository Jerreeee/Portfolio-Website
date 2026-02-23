'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { useAppTheme } from '@/Themes/ThemeProvider';
import { iconManifest, type IconKey } from '@/Data/Icons/icons-manifest';

// ================================================================
// ========================= Slot Definitions ======================

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
  /** Key name used to look up a custom icon from the manifest */
  techName?: string;
  /** Any ReactNode (MUI icon etc.) — inherits color from context */
  libraryIcon?: React.ReactNode;

  showDisplayName?: boolean;
  height?: number | string;
}

export default function IconCmp(inProps: IconCmpProps) {
  const { theme } = useAppTheme();
  const defaultProps = theme.components?.IconCmp?.defaultProps ?? {};
  const props = { ...defaultProps, ...inProps };

  // ── Library icon (MUI / any ReactNode) ───────────────────────
  if (props.libraryIcon) {
    return (
      <IconWrapper style={{ height: props.height ?? '100%' }}>
        {props.libraryIcon}
      </IconWrapper>
    );
  }

  // ── Custom icon from manifest ─────────────────────────────────
  const key = props.techName as IconKey | undefined;
  const icon = key ? iconManifest[key] : undefined;

  if (!icon) {
    if (key) {
      console.warn(
        `⚠️ Icon "${props.techName}" not found in iconManifest — showing name only.`,
      );
    }
    return (
      <IconWrapper style={{ height: props.height ?? '100%' }}>
        <IconLabel variant="caption">{props.techName}</IconLabel>
      </IconWrapper>
    );
  }

  const displayName = icon.displayName ?? props.techName;
  const isDark = theme.palette.mode === 'dark';
  const imgFilter =
    'invertOnDark' in icon && icon.invertOnDark && isDark ? 'invert(1)' : undefined;

  return (
    <IconWrapper style={{ height: props.height ?? '100%' }}>
      <IconImage
        src={icon.src}
        alt={displayName}
        sx={{ aspectRatio: icon.aspectRatio, filter: imgFilter }}
      />
      {props.showDisplayName && (
        <IconLabel variant="caption">{displayName}</IconLabel>
      )}
    </IconWrapper>
  );
}
