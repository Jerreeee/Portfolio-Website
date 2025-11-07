"use client";

import { useRef, useState, useLayoutEffect } from "react";
import { useTheme } from "@/Themes/ThemeProvider";
import Resume from "@/Themes/Default/Components/Resume/Resume";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";

/** A4 physical size for scaling logic */
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const MM_TO_PX = 3.7795275591;
const A4_WIDTH_PX = A4_WIDTH_MM * MM_TO_PX;
const A4_HEIGHT_PX = A4_HEIGHT_MM * MM_TO_PX;

export default function ResumePage() {
  const { theme } = useTheme();
  const measureRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const rawNavbarHeight =
    theme.components?.NavbarCmp?.defaultProps?.height ?? 0;
  const navbarHeight =
    typeof rawNavbarHeight === "number"
      ? rawNavbarHeight
      : parseFloat(rawNavbarHeight);

  useLayoutEffect(() => {
    const node = measureRef.current;
    if (!node) return;

    const resize = () => {
      const rect = node.getBoundingClientRect();
      const safeW = Math.floor(rect.width - 0.5);
      const safeH = Math.floor(rect.height - 0.5);

      const scaleW = safeW / A4_WIDTH_PX;
      const scaleH = safeH / A4_HEIGHT_PX;
      setScale(Math.min(scaleW, scaleH));
    };

    const ro = new ResizeObserver(resize);
    ro.observe(node);
    resize();
    return () => ro.disconnect();
  }, []);

  const scaledW = Math.round(A4_WIDTH_PX * scale);
  const scaledH = Math.round(A4_HEIGHT_PX * scale);

  const BORDER = 10;
  const frameW = scaledW + BORDER * 2;
  const frameH = scaledH + BORDER * 2;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: `calc(100vh - ${navbarHeight}px)`,
        overflow: "hidden",
        // gap: "20px",
        // paddingBottom: "50px",
      }}
    >
      {/* Centered download button */}
      <div
        style={{
          height: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<DownloadIcon />}
          sx={{ textTransform: "none", fontWeight: 600, borderRadius: "6px" }}
          href="/files/resume.pdf"
          download
        >
          Download PDF
        </Button>
      </div>

      {/* Main layout area */}
      <div
        ref={measureRef}
        style={{
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "#000",
          border: "5px solid #1faa00",
          marginBottom: '20px',
        }}
      >
        {/* Frame with orange border — now the only wrapper */}
        <div
          style={{
            width: `${frameW}px`,
            height: `${frameH}px`,
            boxSizing: "border-box",
            border: `${BORDER}px solid orange`,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Resume scale={scale} />
        </div>
      </div>
    </div>
  );
}
