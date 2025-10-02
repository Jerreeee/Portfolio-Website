import React, { useRef, useState, useEffect, ReactNode } from "react";
import { Size } from "@/types/extra";
import { styled } from "@mui/material/styles";

// =====================================================================
// ========================= Slot Definitions ==========================

// =====================================================================
// ============================= Component =============================

type RenderProp = (size: Size | undefined) => ReactNode;

type ParentSizeObserverProps = {
  children: ReactNode | RenderProp;
  aspectRatio?: number; // width / height
  mode?: "width" | "height" | "both";
};

export function ParentSizeObserver({
  children,
  aspectRatio,
  mode = "both",
}: ParentSizeObserverProps) {
  const markerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size | undefined>(undefined);

  const passThroughSize = typeof children === "function";

  const measure = () => {
    if (!markerRef.current?.parentElement) return;
    const rect = markerRef.current.parentElement.getBoundingClientRect();

    let measured: Size = { width: rect.width, height: rect.height };

    if (aspectRatio) {
      if (mode === "width") {
        measured = {
          width: rect.width,
          height: rect.width / aspectRatio,
        };
      } else if (mode === "height") {
        measured = {
          width: rect.height * aspectRatio,
          height: rect.height,
        };
      }
      // mode === "both" → keep rect as is
    }

    setSize(measured);
  };

  useEffect(() => {
    // initial measure
    measure();

    // re-measure on screen resize
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
    };
  }, [aspectRatio, mode]);

  const content = passThroughSize
    ? (children as RenderProp)(size)
    : children;

  return (
    <div
      ref={markerRef}
      style={
        passThroughSize
          ? { display: "contents" }
          : size
          ? { width: `${size.width}px`, height: `${size.height}px` }
          : undefined
      }
    >
      {content}
    </div>
  );
}
