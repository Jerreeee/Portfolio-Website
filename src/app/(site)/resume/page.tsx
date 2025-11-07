"use client";

import { useRef, useState, useLayoutEffect } from "react";
import { useTheme } from "@/Themes/ThemeProvider";
import Resume from "@/Themes/Default/Components/Resume/Resume";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const MM_TO_PX = 3.7795275591; // browser conversion

const A4_WIDTH_PX = A4_WIDTH_MM * MM_TO_PX;
const A4_HEIGHT_PX = A4_HEIGHT_MM * MM_TO_PX;

export default function ResumePage() {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const rawNavbarHeight = theme.components?.NavbarCmp?.defaultProps?.height ?? 0;
  const navbarHeight = typeof rawNavbarHeight === "number"
    ? rawNavbarHeight
    : parseFloat(rawNavbarHeight);

  useLayoutEffect(() => {
    const node = containerRef.current;
    if (!node) return;


  const resize = () => {
    const rect = node.getBoundingClientRect();

    const scaleH = rect.height / A4_HEIGHT_PX;
    const scaleW = rect.width / A4_WIDTH_PX;

    setScale(Math.min(scaleH, scaleW));
  };

    const obs = new ResizeObserver(resize);
    obs.observe(node);
    resize(); // run once immediately

    return () => obs.disconnect();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: `calc(100vh - ${navbarHeight}px)`,
        overflow: "hidden",
      }}
    >
<div
  style={{
    height: 50,
    display: "flex",
    justifyContent: "center",  // ⬅️ center horizontally
    alignItems: "center",      // ⬅️ center vertically
  }}
>
  <Button
    variant="contained"
    color="primary"
    size="small"
    startIcon={<DownloadIcon />}
    sx={{
      textTransform: "none",
      fontWeight: 600,
      borderRadius: "6px",
    }}
    href="/files/resume.pdf"
    download
  >
    Download PDF
  </Button>
</div>

 <div
  ref={containerRef}
  style={{
    flex: 1,
    minHeight: 0,
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    background: "#000",
    border: '5px solid green',
  }}
>
  {/* wrapper that matches the *scaled* size so flexbox can center correctly */}
  <div
    style={{
      width: `${A4_WIDTH_PX * scale}px`,
      height: `${A4_HEIGHT_PX * scale}px`,
      position: "relative",
      border: '3px solid orange',
      // margin: '30px',
    }}
  >
    <Resume scale={scale} />
  </div>
</div>
    </div>
  );
}
