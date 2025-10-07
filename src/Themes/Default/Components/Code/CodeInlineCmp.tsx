'use client';

import React from 'react';
import { styled } from '@mui/material/styles';

const CodeInlineRoot = styled('code', {
  name: 'CodeInline',
  slot: 'Root',
})(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  padding: '0 0.25rem',
  borderRadius: theme.shape.borderRadius,
  fontFamily: `'Fira Code', monospace`,
  fontSize: '0.875rem',
  lineHeight: 1.4,

  // Kill unwanted token backgrounds from syntax highlighters
  background: 'transparent',
  '& span': {
    background: 'transparent !important',
  },
}));

export interface CodeInlineCmpSettings {}

export interface CodeInlineCmpProps {
  children: React.ReactNode;
}

export default function CodeInlineCmp({ children }: CodeInlineCmpProps) {
  return <CodeInlineRoot>{children}</CodeInlineRoot>;
}
