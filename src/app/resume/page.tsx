import React, { FC, ReactNode } from "react";
import {
  Box,
  Typography,
  Divider,
  Link as MuiLink,
  CssBaseline,
  GlobalStyles,
} from "@mui/material";
import { IconCmp } from "@/Themes/Default/Components/Icon";

/** ========== Props Types ========== */
interface SectionLabelProps {
  children: ReactNode;
}

interface LabelProps {
  children: ReactNode;
}

interface TallSectionProps {
  title: string;
  children: ReactNode;
}

interface EntryProps {
  title: string;
  right?: string;
  sub?: string;
  body: string;
  link?: string;
}

/** ========== Reusable Components ========== */

const SectionLabel: FC<SectionLabelProps> = ({ children }) => (
  <Typography sx={{ fontSize: "4mm", fontWeight: 800, letterSpacing: "0.6mm" }}>
    {children}
  </Typography>
);

/** ENTRY BLOCK */
const Entry: FC<EntryProps> = ({ title, right, sub, body, link }) => (
  <Box sx={{ mt: "1mm", breakInside: "avoid", pageBreakInside: "avoid" }}>
    {/* Title + Years in one row */}
    <Box sx={{ display: "flex", alignItems: "baseline", gap: "2mm", mb: "0.5mm" }}>
      <Typography sx={{ fontWeight: 700, fontSize: "3.4mm", flex: 1 }}>{title}</Typography>
      {right && <Typography sx={{ fontSize: "3.1mm" }}>{right}</Typography>}
    </Box>

    {/* Honors line (closer to title) */}
    {sub && (
      <Typography
        sx={{
          fontSize: "2.9mm",
          fontStyle: "italic",
          color: "#444",
          mt: "-5mm",
          mb: "0.5mm",
        }}
      >
        {sub}
      </Typography>
    )}

    {/* Body text */}
    <Typography sx={{ fontSize: "3.1mm", lineHeight: 1.45 }}>{body}</Typography>

    {/* Optional link */}
    {link && (
      <MuiLink href={link} sx={{ fontSize: "3.1mm", color: "#0a84ff" }} underline="hover">
        {link}
      </MuiLink>
    )}
  </Box>
);

/** UPDATED TALLSECTION WITH TIGHT TITLE SPACING */
const TallSection: FC<TallSectionProps> = ({ title, children }) => (
  <Box
    sx={{
      display: "flex",
      gap: "4mm",
      breakInside: "avoid",
      pageBreakInside: "avoid",
    }}
  >
    {/* FULL HEIGHT BAR */}
    <Box sx={{ width: "1.2mm", bgcolor: "#00d474", borderRadius: "1mm" }} />

    {/* CONTENT BLOCK */}
    <Box sx={{ flex: 1 }}>
      <Typography
        sx={{
          fontSize: "5mm",
          fontWeight: 800,
          letterSpacing: "0.5mm",
          lineHeight: 1,
          display: "inline-flex",
          alignItems: "flex-end",
          margin: 0,
          padding: 0,
        }}
      >
        {title}
      </Typography>
      <Divider sx={{ mt: "0.3mm", mb: "1mm", borderColor: "#000" }} />
      <Typography sx={{ fontSize: "3.3mm", lineHeight: 1.5 }}>{children}</Typography>
    </Box>
  </Box>
);

/** ========== PAGE COMPONENT ========== */

export default function Resume() {
  return (
    <div id="resume-page">
      {/* Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <CssBaseline />

      {/* Global print/page rules */}
      <GlobalStyles
        styles={{
          "@page": { size: "A4", margin: 0 },
          "html, body, #root": {
            margin: 0,
            padding: 0,
            height: "100%",
            background: "#000",
            fontFamily: "'Montserrat', sans-serif",
          },
          ".no-break": { breakInside: "avoid", pageBreakInside: "avoid" },
        }}
      />

      {/* A4 PAGE */}
      <Box
        sx={{
          width: "210mm",
          height: "297mm",
          mx: "auto",
          my: 2,
          bgcolor: "#ffffff",
          color: "#111",
          boxShadow: 3,
          display: "flex",
          overflow: "hidden",
          fontFamily: "'Montserrat', sans-serif",
          "@media print": {
            boxShadow: "none",
            my: 0,
          },
        }}
      >
        {/* LEFT COLUMN (35%) */}
        <Box
          sx={{
            width: "35%",
            bgcolor: "#1f1f1f",
            color: "#fff",
            boxSizing: "border-box",
            p: "10mm",
            display: "flex",
            flexDirection: "column",
            gap: "6mm",
          }}
        >
          {/* NAME + TITLE */}
          <Box>
            <Typography sx={{ fontSize: "11mm", fontWeight: 800, lineHeight: 1 }}>Jeroen</Typography>
            <Typography sx={{ fontSize: "11mm", fontWeight: 800, lineHeight: 1 }}>Denayer</Typography>
            <Typography sx={{ fontSize: "4mm", mt: "2mm" }}>
              C++ Programmer &amp; Technical Artist
            </Typography>
          </Box>

          {/* CONTACT */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: "2mm" }}>
            <SectionLabel>CONTACT</SectionLabel>

            <Box sx={{ display: "flex", alignItems: "center", fontSize: "3.2mm" }}>
              <IconCmp techName="Mail" height="4.2mm" />
              <MuiLink
                href="mailto:jeroen@denayer.com"
                color="#b3ffc8"
                underline="hover"
                sx={{ fontSize: "3.2mm" }}
              >
                jeroen@denayer.com
              </MuiLink>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "2.5mm" }}>
              <MuiLink href="https://github.com/Jerreeee" underline="none">
                <IconCmp techName="Github" height="4.2mm" />
              </MuiLink>
              <MuiLink href="https://www.linkedin.com/in/jeroen-denayer/" underline="none">
                <IconCmp techName="Linkedin" height="4.2mm" />
              </MuiLink>
              <MuiLink href="https://www.artstation.com/jeroendenayer" underline="none">
                <IconCmp techName="ArtStation" height="4.2mm" />
              </MuiLink>
            </Box>

            <Box>
              <img
                src="/files/resume/qr_code.png"
                alt="QR Code"
                style={{ width: "23mm", height: "23mm" }}
              />
            </Box>
          </Box>

          {/* SKILLS */}
          <SectionLabel>TECHNICAL SKILLS</SectionLabel>
          <Typography sx={{ fontWeight: 700, fontSize: "3.3mm" }}>PROGRAMMING</Typography>
          <Typography sx={{ fontSize: "3.3mm" }}>• C++ &nbsp; • C# &nbsp; • Lua</Typography>

          <Typography sx={{ fontWeight: 700, fontSize: "3.3mm", mt: "2mm" }}>API</Typography>
          <Typography sx={{ fontSize: "3.3mm" }}>• Vulkan &nbsp; • DirectX 11</Typography>

          <Typography sx={{ fontWeight: 700, fontSize: "3.3mm", mt: "2mm" }}>ENGINES</Typography>
          <Typography sx={{ fontSize: "3.3mm" }}>• Unreal 5 &nbsp; • Unity 6 &nbsp; • s&amp;box</Typography>

          <Typography sx={{ fontWeight: 700, fontSize: "3.3mm", mt: "2mm" }}>TOOLS</Typography>
          <Typography sx={{ fontSize: "3.3mm" }}>
            • Houdini &nbsp; • Blender &nbsp; • CMake &nbsp; • Perforce &nbsp; • GitHub
          </Typography>

          <SectionLabel>LANGUAGES</SectionLabel>
          <Typography sx={{ fontSize: "3.3mm" }}>• Dutch (Native)</Typography>
          <Typography sx={{ fontSize: "3.3mm" }}>• English (Fluent)</Typography>
        </Box>

        {/* RIGHT COLUMN (65%) */}
        <Box
          sx={{
            width: "65%",
            boxSizing: "border-box",
            p: "10mm",
            display: "flex",
            flexDirection: "column",
            gap: "8mm",
          }}
        >

          {/* SUMMARY */}
          <TallSection title="SUMMARY">
            I’m Jeroen Denayer, a C++ programmer and technical artist who became fascinated by how much of both
            creative and technical work can be automated and improved. During my Game Graphics Production studies
            at DAE, I discovered procedural workflows through Houdini and grew passionate about optimizing processes
            through smart tools. This curiosity led me to pursue a second bachelor in Game Development, where I focused
            on C++ and low-level GPU programming. Now, I’m driven to build efficient tools and pipelines that make
            complex artistic and technical work simpler, faster, and far less repetitive.
          </TallSection>

          {/* EXPERIENCE */}
          <TallSection title="EXPERIENCE">

            {/* WORK */}
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "3.6mm",
                lineHeight: 1,
                display: "inline-flex",
                alignItems: "flex-end",
                margin: 0,
                padding: 0,
              }}
            >
              WORK
            </Typography>
            <Box
              sx={{
                width: "22mm",
                height: "0.6mm",
                bgcolor: "#00d474",
                borderRadius: "1mm",
                mt: "0.3mm",
                mb: "1mm",
              }}
            />

            <Entry
              title="Internship / Technical Artist — Neopica"
              right="22–23"
              body="Building and maintaining a set of Houdini-based procedural tools for Unreal Engine, each handling a specific part of the level pipeline—terrain, road, cliff, vegetation generation/placement—linked together through PCG so large worlds could be generated efficiently in chunks. Responsible for extending functionality, solving pipeline issues, and keeping the tools flexible and performant for environment artists."
            />

            {/* PROJECTS */}
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "3.6mm",
                mt: "4mm",
                lineHeight: 1,
                display: "inline-flex",
                alignItems: "flex-end",
                margin: 0,
                padding: 0,
              }}
            >
              PROJECTS
            </Typography>
            <Box
              sx={{
                width: "22mm",
                height: "0.6mm",
                bgcolor: "#00d474",
                borderRadius: "1mm",
                mt: "0.3mm",
                mb: "1mm",
              }}
            />

            <Entry
              title="ISS Docking Simulator — Team Project"
              right="Sept – Dec 21"
              body="Responsible for modelling and texturing high-quality ISS modules and components as part of a multi-disciplinary team. Worked collaboratively using shared asset pipelines and version control, strengthening communication, teamwork, and problem-solving skills while delivering production-ready real-time assets."
            />

          </TallSection>

          {/* EDUCATION */}
          <TallSection title="EDUCATION">
            <Entry
              title="Digital Arts & Entertainment — Game Development"
              right="23–25"
              sub="Graduated magna cum laude"
              body="C++ gameplay and engine programming, shader and tool development, with work spanning graphics, AI, UI and core engine systems, including real-time rendering with Vulkan and custom WPF tools in C#, all aimed at building efficient, performance-focused games and development pipelines."
            />
            <Entry
              title="Digital Arts & Entertainment — Game Graphics Production"
              right="19– Feb 22"
              sub="Graduated cum laude"
              body="Creation of optimized 2D and 3D PBR assets from blockout to engine, focused on procedural workflows in Houdini, scripting tools to accelerate production, and handling modelling, texturing, lighting and shading in a real-time pipeline while balancing visual quality with performance targets."
            />
          </TallSection>

        </Box>
      </Box>
    </div>
  );
}
