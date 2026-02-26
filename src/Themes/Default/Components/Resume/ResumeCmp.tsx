'use client';

// @generate-component-classes

import { Typography, Link, Divider } from '@mui/material';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { resumeCmp } from './ResumeCmpClasses';

export interface ResumeCmpProps {}
export interface ResumeCmpSettings {}

const makeSlot = makeSlotFactory('ResumeCmp', resumeCmp);

/* ===========================
   ROOT
=========================== */

export const Root = makeSlot('div', 'root')({});

/* ===========================
   PAGE + LAYOUT
=========================== */

export const PageContainer = makeSlot('div', 'pageContainer')({
  width: '210mm',
  height: '297mm',
  margin: 'auto',
  background: '#ffffff',
  color: '#111',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  boxShadow: '0 0 8mm rgba(0,0,0,0.25)',
  '@media print': {
    boxShadow: 'none',
    margin: 0,
  },
});

export const RightColumn = makeSlot('div', 'rightColumn')({
  width: '100%',
  boxSizing: 'border-box',
  padding: '6mm',
  display: 'flex',
  flexDirection: 'column',
  gap: 'calc(3mm * var(--sm, 1))',
  flex: 1,
  minHeight: 0,
});

/* ===========================
   HEADER
=========================== */

export const ResumeHeader = makeSlot('div', 'header')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '3mm',
  paddingBottom: '5mm',
  paddingLeft: '6mm',
  paddingRight: '6mm',
  position: 'relative',
});

export const HeaderName = makeSlot(Typography, 'headerName')({
  fontSize: '11mm',
  fontWeight: 900,
  lineHeight: 1,
  letterSpacing: '-0.25mm',
});

export const HeaderFirstName = makeSlot('span', 'headerFirstName')({
  fontWeight: 900,
});

export const HeaderLastName = makeSlot('span', 'headerLastName')({
  fontWeight: 900,
});

export const HeaderRight = makeSlot('div', 'headerRight')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '1.5mm',
  fontSize: '3.2mm',
  lineHeight: 1.3,
});

export const HeaderContactRow = makeSlot('div', 'headerContactRow')({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2mm',
});

export const HeaderLabel = makeSlot('span', 'headerLabel')({});

export const HeaderContactLink = makeSlot(Link, 'headerContactLink')(({ theme }) => ({
  color: '#222',
  textDecoration: 'none',
  transition: 'color 0.15s ease',
  '&:hover': {
    color: theme.palette.secondary.main,
  },
}));

export const HeaderContactText = makeSlot('span', 'headerContactText')({
  color: '#222',
});

export const HeaderDivider = makeSlot('div', 'headerDivider')(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: '6mm',
  right: '6mm',
  height: '2px',
  backgroundColor: theme.palette.secondary.main,
}));

/* ===========================
   TALL SECTION
=========================== */

export const TallSectionWrapper = makeSlot('div', 'tallSectionWrapper')({
  display: 'flex',
  gap: '4mm',
  breakInside: 'avoid',
  pageBreakInside: 'avoid',
  flexShrink: 1,
});

export const TallBar = makeSlot('div', 'tallBar')(({ theme }) => ({
  width: '1.2mm',
  background: theme.palette.secondary.main,
  borderRadius: '1mm',
  flexShrink: 0,
}));

export const TallContent = makeSlot('div', 'tallContent')({
  flex: 1,
  minHeight: 0,
});

export const TallTitle = makeSlot(Typography, 'tallTitle')({
  fontSize: 'calc(5mm * var(--sf, 1))',
  fontWeight: 800,
  letterSpacing: '0.5mm',
  lineHeight: 1,
  display: 'inline-flex',
  alignItems: 'flex-end',
  margin: 0,
  padding: 0,
});

export const TallDivider = makeSlot(Divider, 'tallDivider')({
  marginTop: '0.3mm',
  marginBottom: 'calc(1.2mm * var(--sm, 1))',
  borderColor: '#000',
});

export const SummaryText = makeSlot(Typography, 'summaryText')({
  fontSize: 'calc(3.3mm * var(--sf, 1))',
  lineHeight: 'calc(1.5 * var(--sm, 1))',
});

/* ===========================
   EXPERIENCE SUB-SECTION
=========================== */

export const SectionHeaderRight = makeSlot(Typography, 'sectionHeader')({
  fontWeight: 700,
  fontSize: 'calc(4.2mm * var(--sf, 1))',
  lineHeight: 1,
  marginBottom: 0,
  paddingBottom: 0,
  textAlign: 'left',
});

export const DividerBar = makeSlot('div', 'dividerBar')(({ theme }) => ({
  width: '22mm',
  height: '0.6mm',
  background: theme.palette.secondary.main,
  borderRadius: '1mm',
}));

/* ===========================
   ENTRY
=========================== */

export const EntryWrapper = makeSlot('div', 'entryWrapper')({
  marginTop: 'calc(2mm * var(--sm, 1))',
  breakInside: 'avoid',
  pageBreakInside: 'avoid',
});

export const EntryRow = makeSlot('div', 'entryRow')({
  display: 'flex',
  alignItems: 'baseline',
  gap: '1.6mm',
  marginBottom: '1mm',
});

export const EntryTitle = makeSlot(Typography, 'entryTitle')({
  fontWeight: 700,
  fontSize: 'calc(3.4mm * var(--sf, 1))',
  flex: 1,
  lineHeight: 1.05,
});

export const EntryRight = makeSlot(Typography, 'entryRight')({
  fontSize: 'calc(3.1mm * var(--sf, 1))',
  lineHeight: 1,
});

export const EntrySub = makeSlot(Typography, 'entrySub')({
  fontSize: 'calc(2.9mm * var(--sf, 1))',
  fontStyle: 'italic',
  color: '#444',
  marginTop: '-3mm',
  marginBottom: '0.5mm',
  lineHeight: 1,
});

export const EntryBody = makeSlot(Typography, 'entryBody')({
  fontSize: 'calc(3.1mm * var(--sf, 1))',
  lineHeight: 'calc(1.45 * var(--sm, 1))',
});

export const EntryLink = makeSlot(Link, 'entryLink')({
  fontSize: 'calc(3.1mm * var(--sf, 1))',
  color: '#0a84ff',
});
