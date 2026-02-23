'use client';

import React from 'react';
import { styled } from '@mui/material/styles';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { codeInlineCmp } from './CodeInlineCmpClasses';

// =====================================================================
// ========================= Slot Definitions ==========================  

const makeSlot = makeSlotFactory('CodeInlineCmp', codeInlineCmp);

const CodeInlineRoot = makeSlot('code', 'root')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
  color: theme.palette.text.primary,
  padding: '0.125rem 0.375rem',
  borderRadius: theme.shape.borderRadius,
  fontFamily: `'Fira Code', monospace`,
  fontSize: '0.875rem',
  lineHeight: 1.4,
  // Kill unwanted token backgrounds from syntax highlighters
  '& span': {
    background: 'transparent !important',
  },
}));

// =====================================================================
// ============================= Component =============================

export interface CodeInlineCmpSettings {}

export interface CodeInlineCmpProps {
  children: React.ReactNode;
}

export default function CodeInlineCmp({ children }: CodeInlineCmpProps) {
  return <CodeInlineRoot>{children}</CodeInlineRoot>;
}
