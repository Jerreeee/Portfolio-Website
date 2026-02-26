"use client";

import { Box, Typography, Link, Divider, styled } from "@mui/material";

const ACCENT = "#00d474";

/* ===========================
   PAGE + LAYOUT
=========================== */

export const PageContainer = styled(Box)({
  width: "210mm",
  height: "297mm",
  margin: "auto",
  background: "#ffffff",
  color: "#111",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  boxShadow: "0 0 8mm rgba(0,0,0,0.25)",
  "@media print": {
    boxShadow: "none",
    margin: 0,
  },
});

export const RightColumn = styled(Box)({
  width: "100%",
  boxSizing: "border-box",
  padding: "6mm",
  display: "flex",
  flexDirection: "column",
  gap: "calc(3mm * var(--sm, 1))",
  flex: 1,
  minHeight: 0,
});

/* ===========================
   HEADER
=========================== */

export const ResumeHeader = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  paddingTop: "2mm",
  paddingBottom: "6mm",
  paddingLeft: "6mm",
  paddingRight: "6mm",
  position: "relative",
});

export const HeaderName = styled(Typography)({
  fontSize: "11mm",
  fontWeight: 900,
  lineHeight: 1,
  letterSpacing: "-0.25mm",
});

export const HeaderFirstName = styled("span")({
  fontWeight: 900,
});

export const HeaderLastName = styled("span")({
  fontWeight: 900,
});

export const HeaderRight = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "2mm",
  fontSize: "3.3mm",
  lineHeight: 1.3,
  opacity: 0.9,
});

export const HeaderContactRow = styled(Box)({
  display: "grid",
  gridTemplateColumns: "22mm auto",
  alignItems: "baseline",
  columnGap: "3mm",
});

export const HeaderLabel = styled("span")({
  fontWeight: 600,
  textAlign: "right",
  opacity: 0.65,
});

export const HeaderContactLink = styled(Link)({
  color: "inherit",
  textDecoration: "none",
  borderBottom: "0.2mm solid rgba(0,0,0,0.2)",
  paddingBottom: "0.2mm",
  transition: "border-color 0.2s ease",
});

export const HeaderContactText = styled("span")({});

export const HeaderDivider = styled("div")({
  position: "absolute",
  bottom: 0,
  left: "6mm",
  right: "6mm",
  height: "1px",
  backgroundColor: "#000",
});

/* ===========================
   TALL SECTION
=========================== */

export const TallSectionWrapper = styled(Box)({
  display: "flex",
  gap: "4mm",
  breakInside: "avoid",
  pageBreakInside: "avoid",
  flexShrink: 1,
});

export const TallBar = styled(Box)({
  width: "1.2mm",
  background: ACCENT,
  borderRadius: "1mm",
  flexShrink: 0,
});

export const TallContent = styled(Box)({
  flex: 1,
  minHeight: 0,
});

export const TallTitle = styled(Typography)({
  fontSize: "calc(5mm * var(--sf, 1))",
  fontWeight: 800,
  letterSpacing: "0.5mm",
  lineHeight: 1,
  display: "inline-flex",
  alignItems: "flex-end",
  margin: 0,
  padding: 0,
});

export const TallDivider = styled(Divider)({
  marginTop: "0.3mm",
  marginBottom: "calc(1.2mm * var(--sm, 1))",
  borderColor: "#000",
});

export const SummaryText = styled(Typography)({
  fontSize: "calc(3.3mm * var(--sf, 1))",
  lineHeight: "calc(1.5 * var(--sm, 1))",
});

/* ===========================
   EXPERIENCE SUB-SECTION
=========================== */

export const DividerBar = styled(Box)({
  width: "22mm",
  height: "0.6mm",
  background: ACCENT,
  borderRadius: "1mm",
});

export const SectionHeaderRight = styled(Typography)({
  fontWeight: 700,
  fontSize: "calc(4.2mm * var(--sf, 1))",
  lineHeight: 1,
  marginBottom: 0,
  paddingBottom: 0,
  textAlign: "left",
});

/* ===========================
   ENTRY
=========================== */

export const EntryWrapper = styled(Box)({
  marginTop: "calc(2mm * var(--sm, 1))",
  breakInside: "avoid",
  pageBreakInside: "avoid",
});

export const EntryRow = styled(Box)({
  display: "flex",
  alignItems: "baseline",
  gap: "1.6mm",
  marginBottom: "1mm",
});

export const EntryTitle = styled(Typography)({
  fontWeight: 700,
  fontSize: "calc(3.4mm * var(--sf, 1))",
  flex: 1,
  lineHeight: 1.05,
});

export const EntryRight = styled(Typography)({
  fontSize: "calc(3.1mm * var(--sf, 1))",
  lineHeight: 1,
});

export const EntrySub = styled(Typography)({
  fontSize: "calc(2.9mm * var(--sf, 1))",
  fontStyle: "italic",
  color: "#444",
  marginTop: "-3mm",
  marginBottom: "0.5mm",
  lineHeight: 1,
});

export const EntryBody = styled(Typography)({
  fontSize: "calc(3.1mm * var(--sf, 1))",
  lineHeight: "calc(1.45 * var(--sm, 1))",
});

export const EntryLink = styled(Link)({
  fontSize: "calc(3.1mm * var(--sf, 1))",
  color: "#0a84ff",
});
