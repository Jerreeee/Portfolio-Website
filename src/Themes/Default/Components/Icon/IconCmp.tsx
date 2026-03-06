'use client';

import React, { useRef, useState, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { useAppTheme } from '@/Themes/ThemeProvider';
import { iconManifest, type IconKey } from '@/Data/Icons/icons-manifest';

function getLuminance(r: number, g: number, b: number): number {
  return (r * 299 + g * 587 + b * 114) / 1000;
}

function parseColor(str: string): { r: number; g: number; b: number; a: number } | null {
  // rgb()/rgba()
  const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (m) {
    return {
      r: parseInt(m[1]),
      g: parseInt(m[2]),
      b: parseInt(m[3]),
      a: m[4] !== undefined ? parseFloat(m[4]) : 1,
    };
  }
  // hex (#rgb, #rrggbb)
  const h = str.match(/^#([0-9a-f]{3,8})$/i);
  if (h) {
    const hex = h[1];
    if (hex.length === 3 || hex.length === 4) {
      return {
        r: parseInt(hex[0] + hex[0], 16),
        g: parseInt(hex[1] + hex[1], 16),
        b: parseInt(hex[2] + hex[2], 16),
        a: hex.length === 4 ? parseInt(hex[3] + hex[3], 16) / 255 : 1,
      };
    }
    if (hex.length === 6 || hex.length === 8) {
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
        a: hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1,
      };
    }
  }
  return null;
}

function getAncestorBackground(
  el: HTMLElement | null,
  fallbackColor: string,
): 'light' | 'dark' {
  let node = el;
  while (node) {
    const c = parseColor(getComputedStyle(node).backgroundColor);
    if (c && c.a > 0.1) {
      return getLuminance(c.r, c.g, c.b) > 128 ? 'light' : 'dark';
    }
    node = node.parentElement;
  }
  // No opaque ancestor found - fall back to the theme's background color.
  const fb = parseColor(fallbackColor);
  if (fb) return getLuminance(fb.r, fb.g, fb.b) > 128 ? 'light' : 'dark';
  return 'dark';
}

// ================================================================
// ========================= Slot Definitions ======================

const IconWrapper = styled(motion.div)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(0.75),
  overflow: 'visible',
}));

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
  fontSize: theme.typography.caption.fontSize,
  whiteSpace: 'nowrap',
}));

// ================================================================
// ========================== Component ============================

export interface IconCmpSettings {
  hoverScale?: number;
}

export interface IconCmpProps {
  /** Key name used to look up a custom icon from the manifest */
  techName?: string;
  /** Any ReactNode (MUI icon etc.) — inherits color from context */
  libraryIcon?: React.ReactNode;

  showDisplayName?: boolean;
  height?: number | string;
  /** Override auto background detection for invertOnDark icons. */
  forceBackground?: 'light' | 'dark';
}

export default function IconCmp(inProps: IconCmpProps) {
  const { theme } = useAppTheme();
  const defaultProps = theme.components?.IconCmp?.defaultProps ?? {};
  const props = { ...defaultProps, ...inProps };

  const hoverScale = theme.components?.IconCmp?.settings?.hoverScale;
  const hoverProps = hoverScale
    ? { whileHover: { scale: hoverScale, transition: { duration: theme.transitions.duration.shortest / 1000 } } }
    : {};

  // ── Library icon (MUI / any ReactNode) ───────────────────────
  if (props.libraryIcon) {
    return (
      <IconWrapper style={{ height: props.height ?? '100%' }} {...hoverProps}>
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
      <IconWrapper style={{ height: props.height ?? '100%' }} {...hoverProps}>
        <IconLabel variant="caption">{props.techName}</IconLabel>
      </IconWrapper>
    );
  }

  const displayName = icon.displayName ?? props.techName;
  const needsBgCheck =
    'invertOnDark' in icon && icon.invertOnDark && !props.forceBackground;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [bgIsDark, setBgIsDark] = useState(
    props.forceBackground
      ? props.forceBackground === 'dark'
      : theme.palette.mode === 'dark',
  );

  useLayoutEffect(() => {
    if (needsBgCheck && wrapperRef.current) {
      const bg = getAncestorBackground(
        wrapperRef.current,
        theme.palette.background.default,
      );
      setBgIsDark(bg === 'dark');
    }
  }, [needsBgCheck, theme.palette.background.default]);

  const shouldInvert =
    'invertOnDark' in icon && icon.invertOnDark && bgIsDark;
  const imgFilter = shouldInvert ? 'invert(1)' : undefined;

  return (
    <IconWrapper ref={wrapperRef} style={{ height: props.height ?? '100%' }} {...hoverProps}>
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
