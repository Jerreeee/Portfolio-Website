'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { iconCmp } from './IconCmpClasses';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { iconManifest, type IconKey } from '@/Data/Icons/icons-manifest';

// ================================================================
// ========================= Slot Definitions ======================

const makeSlot = makeSlotFactory('IconCmp', iconCmp);

const IconImage = styled(motion.img)({
  display: 'block',
  width: '100%',
  height: 'auto',
});

// ================================================================
// ========================== Component ============================

export interface IconCmpProps {
  /** Loosely typed so any label or tech name can be passed */
  techName: string;
}

/**
 * Renders an icon from the pre-generated manifest.
 * Falls back to the "error" icon if missing; logs a warning if even that is missing.
 */
export default function IconCmp({ techName }: IconCmpProps) {
  const key = techName as IconKey;
  let icon = iconManifest[key];

  // Fallback to "error" icon
  if (!icon) {
    console.warn(`⚠️ Icon "${techName}" not found in iconManifest — using fallback.`);
    icon = iconManifest['error'] ?? iconManifest['error'];

    // If even the fallback doesn't exist, log a critical warning
    if (!icon) {
      console.error('❌ Error icon not found in iconManifest.');
      return null;
    }
  }

  return (
    <IconImage
      src={icon.src}
      alt={techName}
      style={{ aspectRatio: icon.aspectRatio }}
    />
  );
}
