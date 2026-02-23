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
  const measureRef = useRef<HTMLDivElement>(null);

  const [fitScale, setFitScale] = useState(0);
  const [zoomScale, setZoomScale] = useState(1);
  const [viewportH, setViewportH] = useState(0);

  const rawNavH = theme.components?.NavbarCmp?.defaultProps?.height ?? 0;
  const navH = typeof rawNavH === "number" ? rawNavH : parseFloat(rawNavH);
  const borderThickness = 2;
  const buttonH = 50;
  const cornerR = Number.parseFloat(theme.shape.borderRadius.toString());
  const innerR = Math.max(0, cornerR - borderThickness);

  // Track viewport height
  useEffect(() => {
    const update = () => setViewportH(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Auto-fit resume to container
  useLayoutEffect(() => {
    const el = measureRef.current;
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

    const rect = el.getBoundingClientRect();
    calc(rect.width, rect.height);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Ctrl+scroll zoom
  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      const factor = Math.pow(1.0015, -e.deltaY);
      setZoomScale((s) => clamp(s * factor, 0.25, 6));
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel as EventListener);
  }, []);

  const appliedScale = fitScale * zoomScale;

  const scaledW = Math.round(A4_W_PX * appliedScale);
  const scaledH = Math.round(A4_H_PX * appliedScale);
  const borderW = scaledW + 2 * borderThickness;
  const borderH = scaledH + 2 * borderThickness;

  const ready = viewportH > 0 && fitScale > 0;

  return (
    <Box
      sx={{
        width: "100%",
        height: viewportH - navH,
        background: theme.palette.gradients.background(),
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top bar */}
      <Box
        sx={{
          width: "100%",
          height: `${buttonH}px`,
          display: "grid",
          placeItems: "center",
        }}
      >
        <Button
          variant="contained"
          size="small"
          startIcon={<DownloadIcon />}
          sx={{ textTransform: "none", fontWeight: 600, borderRadius: `${theme.shape.borderRadius}px` }}
          href="/files/resume.pdf"
          download
        >
          Download PDF
        </Button>
      </Box>

      {/* GREEN container */}
      <Box
        ref={measureRef}
        sx={{
          position: "relative",
          width: "100%",
          height: `calc(100% - ${buttonH}px)`,
          border: "0px solid green",
          boxSizing: "border-box",
          overflowY: "auto",
          overflowX: "auto",
        }}
      >
        {ready && (
          // Outer rounded frame with gradient ring
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              transformOrigin: "top center",
              width: `${borderW}px`,
              height: `${borderH}px`,
              boxSizing: "border-box",
              border: `${borderThickness}px solid transparent`,
              borderRadius: `${cornerR}px`,
              background: `linear-gradient(#0000,#0000) padding-box, ${theme.palette.gradients.primary()} border-box`,

              // clip INSIDE this frame so the resume can't overflow the rounded corners
              overflow: "hidden",
            }}
          >
            {/* Middle clipper: exact inner area, rounded + hidden overflow */}
            <Box
              sx={{
                width: `${scaledW}px`,
                height: `${scaledH}px`,
                borderRadius: `${innerR}px`,
                overflow: "hidden",
                background: "#fff",
              }}
            >
              {/* Scaled A4 page (no radius here) */}
              <Box
                sx={{
                  width: "210mm",
                  height: "297mm",
                  transform: `scale(${appliedScale})`,
                  transformOrigin: "top left",
                  // rendering niceties
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
