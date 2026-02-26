"use client";

import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { Box, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useAppTheme } from "@/Themes/ThemeProvider";
import Resume from "@/Themes/Default/Components/Resume/Resume";

const A4_W_MM = 210;
const A4_H_MM = 297;
const MM_TO_PX = 3.7795275591;
const A4_W_PX = A4_W_MM * MM_TO_PX;
const A4_H_PX = A4_H_MM * MM_TO_PX;

export default function ResumePage() {
  const { theme } = useAppTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  const [fitScale, setFitScale] = useState(0);
  const [zoomScale, setZoomScale] = useState(1);

  const rawNavH = theme.components?.NavbarCmp?.defaultProps?.height ?? 0;
  const navH = typeof rawNavH === "number" ? rawNavH : parseFloat(rawNavH);
  const borderThickness = 4;
  const cornerR = Number.parseFloat(theme.shape.borderRadius.toString());
  const innerR = Math.max(0, cornerR - borderThickness);

  // Auto-fit: resize observer on the scrollable canvas below the button bar.
  // The canvas uses CSS flex (flex:1) so its measured dimensions already
  // exclude the button bar — no need to track buttonH in JS.
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const calc = (width: number, height: number) => {
      if (!width || !height) return;
      const usableW = width - borderThickness * 2;
      const usableH = height - borderThickness * 2;
      const next = Math.min(usableW / A4_W_PX, usableH / A4_H_PX);
      if (Number.isFinite(next) && next > 0) setFitScale(next);
    };

    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      calc(width, height);
    });

    const { width, height } = el.getBoundingClientRect();
    calc(width, height);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Ctrl+scroll zoom (0.25× – 6×)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      const factor = Math.pow(1.0015, -e.deltaY);
      setZoomScale((s) => Math.min(6, Math.max(0.25, s * factor)));
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel as EventListener);
  }, []);

  const appliedScale = fitScale * zoomScale;
  const scaledW = Math.round(A4_W_PX * appliedScale);
  const scaledH = Math.round(A4_H_PX * appliedScale);
  const frameW = scaledW + 2 * borderThickness;
  const frameH = scaledH + 2 * borderThickness;

  return (
    <Box
      sx={{
        width: "100%",
        height: `calc(100dvh - ${navH}px)`,
        background: theme.palette.gradients.background(),
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Download button bar — takes natural height, never grows */}
      <Box
        sx={{
          flexShrink: 0,
          display: "grid",
          placeItems: "center",
          py: "10px",
        }}
      >
        <Button
          variant="contained"
          size="small"
          startIcon={<DownloadIcon />}
          sx={{ textTransform: "none", fontWeight: 600, borderRadius: `${cornerR}px` }}
          href="/files/resume.pdf"
          download
        >
          Download PDF
        </Button>
      </Box>

      {/* Scrollable canvas — fills all remaining vertical space */}
      <Box
        ref={containerRef}
        sx={{
          flex: 1,
          minHeight: 0,
          position: "relative",
          overflowY: "auto",
          overflowX: "auto",
        }}
      >
        {fitScale > 0 && (
          // Bordered frame — sized to the scaled A4 page, centered horizontally
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: `${frameW}px`,
              height: `${frameH}px`,
              boxSizing: "border-box",
              border: `${borderThickness}px solid transparent`,
              borderRadius: `${cornerR}px`,
              background: `linear-gradient(#0000, #0000) padding-box,
                           linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}) border-box`,
              overflow: "hidden",
            }}
          >
            {/* Inner clip — rounded corners, white paper background */}
            <Box
              sx={{
                width: `${scaledW}px`,
                height: `${scaledH}px`,
                borderRadius: `${innerR}px`,
                overflow: "hidden",
                background: "#fff",
              }}
            >
              {/* A4 page scaled to fit */}
              <Box
                sx={{
                  width: "210mm",
                  height: "297mm",
                  transform: `scale(${appliedScale})`,
                  transformOrigin: "top left",
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                }}
              >
                <Resume />
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
