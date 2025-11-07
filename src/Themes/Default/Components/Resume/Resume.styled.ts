"use client";

import { Box, Typography, Divider, styled } from "@mui/material";

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
  overflow: "hidden",
  boxShadow: "0 0 8mm rgba(0,0,0,0.25)",
  "@media print": {
    boxShadow: "none",
    margin: 0,
  },
});

export const LeftColumn = styled(Box)({
  width: "35%",
  background: "#1f1f1f",
  color: "#fff",
  boxSizing: "border-box",
  padding: "clamp(6mm, 3vh, 10mm)",
  display: "flex",
  flexDirection: "column",
  gap: "clamp(3mm, 2vh, 6mm)",
  flexShrink: 1,
  minHeight: 0,
  alignItems: "center",
  textAlign: "center",
});

export const RightColumn = styled(Box)({
  width: "65%",
  boxSizing: "border-box",
  padding: "clamp(6mm, 3vh, 10mm)",
  display: "flex",
  flexDirection: "column",
  gap: "clamp(4mm, 2vh, 7mm)",
  flexShrink: 1,
  minHeight: 0,
});

/* ===========================
   NAME BLOCK
=========================== */

export const NameBlock = styled(Box)({
  flexShrink: 1,
  textAlign: "center",
});

export const FirstName = styled(Typography)({
  fontSize: "clamp(8mm, 3vw, 11mm)",
  fontWeight: 800,
  lineHeight: 1,
});

export const LastName = styled(Typography)({
  fontSize: "clamp(8mm, 3vw, 11mm)",
  fontWeight: 800,
  lineHeight: 1,
});

export const Tagline = styled(Typography)({
  fontSize: "clamp(3mm, 1vw, 4mm)",
  marginTop: "2mm",
});

/* ===========================
   CONTACT
=========================== */

export const ContactBlock = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "clamp(1.5mm, 1vh, 3mm)",
  flexShrink: 1,
  minHeight: 0,
  alignItems: "center",
  textAlign: "center",
});

export const ContactRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "clamp(2.4mm, 0.8vw, 3.2mm)",
  width: "100%",
  textAlign: "center",
});

export const SocialRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "2.5mm",
  width: "100%",
});

export const QRWrapper = styled(Box)({
  width: "23mm",
  height: "23mm",
  img: { width: "100%", height: "100%" },
});

/* ===========================
   SKILLS
=========================== */

export const SkillsBlock = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "clamp(1.4mm, 1vh, 3mm)",
  flexShrink: 1,
  minHeight: 0,
  alignItems: "center",
  textAlign: "center",
});

export const SkillGroup = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  width: "100%",
});

export const SkillGroupTitle = styled(Typography)({
  fontWeight: 700,
  fontSize: "clamp(2.7mm, 0.8vw, 3.3mm)",
  lineHeight: 1,
});

export const SkillGroupText = styled(Typography)({
  fontSize: "clamp(2.6mm, 0.8vw, 3.2mm)",
  lineHeight: 1.15,
  whiteSpace: "pre-line",
  textAlign: "center",
});

export const SkillGrid3 = styled(Box)({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  columnGap: "2.2mm",
  rowGap: "0.3mm", // ✅ tighter vertical spacing
  justifyItems: "center",
  alignItems: "center",
  textAlign: "center",
});

export const DividerBar = styled(Box)({
  width: "22mm",
  height: "0.6mm",
  background: "#00d474",
  borderRadius: "1mm",
});

/* ===========================
   TALL SECTION ELEMENTS
=========================== */

export const TallBar = styled(Box)({
  width: "1.2mm",
  background: "#00d474",
  borderRadius: "1mm",
  flexShrink: 0,
});

export const TallTitle = styled(Typography)({
  fontSize: "clamp(3.6mm, 1.4vw, 5mm)",
  fontWeight: 800,
  letterSpacing: "0.5mm",
  lineHeight: 1,
  display: "inline-flex",
  alignItems: "flex-end",
});

export const TallDivider = styled(Divider)({
  marginTop: "0.3mm",
  marginBottom: "clamp(0.6mm, 0.5vh, 1.2mm)",
  borderColor: "#000",
});

/* ===========================
   ENTRY BLOCK
=========================== */

export const EntryWrapper = styled(Box)({
  marginTop: "clamp(0.8mm, 0.5vh, 2mm)",
  breakInside: "avoid",
  pageBreakInside: "avoid",
});

export const EntryRow = styled(Box)({
  display: "flex",
  alignItems: "baseline",
  gap: "1.6mm",
  marginBottom: "clamp(0.2mm, 0.4vh, 1mm)",
});

export const EntryTitle = styled(Typography)({
  fontWeight: 700,
  fontSize: "clamp(2.8mm, 0.9vw, 3.4mm)",
  flex: 1,
  lineHeight: 1.05,
});

export const EntryRight = styled(Typography)({
  fontSize: "clamp(2.4mm, 0.8vw, 3.1mm)",
  lineHeight: 1,
});

export const EntrySub = styled(Typography)({
  fontSize: "clamp(2.3mm, 0.7vw, 2.9mm)",
  fontStyle: "italic",
  color: "#444",
  marginTop: "-3mm",
  marginBottom: "0.5mm",
  lineHeight: 1,
});

export const EntryBody = styled(Typography)({
  fontSize: "clamp(2.5mm, 0.85vw, 3.1mm)",
  lineHeight: 1.45,
});

/* ===========================
   SECTION HEADER
=========================== */

export const SectionHeaderLeft = styled(Typography)({
  fontWeight: 700,
  fontSize: "clamp(3.6mm, 1vw, 4.2mm)",
  lineHeight: 1,
  marginBottom: "0.6mm",
  textAlign: "center",       // stays centered
});

export const SectionHeaderRight = styled(Typography)({
  fontWeight: 700,
  fontSize: "clamp(3.6mm, 1vw, 4.2mm)",
  lineHeight: 1,
  marginBottom: 0,
  paddingBottom: 0,
  textAlign: "left",
});
