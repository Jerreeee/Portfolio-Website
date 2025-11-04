// DrawioEmbed.tsx
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    GraphViewer?: any; // viewer.min.js global (static .processElements or constructor)
  }
}

type DrawioEmbedProps = {
  url: string;
  darkMode?: "0" | "1" | "auto";
  fit?: "page" | "width" | "none";
  toolbar?: string;
  highlight?: string;
  nav?: boolean;
  style?: React.CSSProperties; // Parent must control height
};

// ---- Load viewer.min.js only once ----
let viewerLoadPromise: Promise<void> | null = null;
function ensureViewerScript(): Promise<void> {
  if (window.GraphViewer) return Promise.resolve();
  if (viewerLoadPromise) return viewerLoadPromise;

  viewerLoadPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://viewer.diagrams.net/js/viewer.min.js";
    script.async = true;
    script.onload = () => {
      requestAnimationFrame(() => resolve());
    };
    script.onerror = () => reject(new Error("Failed to load viewer.min.js"));
    document.head.appendChild(script);
  });

  return viewerLoadPromise;
}

export default function DrawioEmbed(props: DrawioEmbedProps) {
  const {
    url,
    darkMode = "auto",
    fit = "width",
    toolbar = "",
    highlight = "#000000",
    nav = false,
    style = {},
  } = props;

  const elRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState<boolean>(!!window.GraphViewer);

  const mxConfig = {
    url,
    dark: darkMode,
    fit,
    toolbar,
    nav,
    highlight,
    resize: true,
    zoom: true,
  };

  // Load viewer.min.js, with proper async cancellation (fixes React warning)
  useEffect(() => {
    if (window.GraphViewer) {
      setReady(true);
      return;
    }

    const cancel = { done: false };

    ensureViewerScript()
      .then(() => {
        if (!cancel.done) setReady(!!window.GraphViewer);
      })
      .catch((err) => {
        if (!cancel.done) {
          console.warn("[DrawioEmbed] Failed to load viewer.min.js:", err);
        }
      });

    return () => {
      cancel.done = true;
    };
  }, []);

  // Render / re-render logic
  const render = () => {
    const el = elRef.current;
    const GV = window.GraphViewer;
    if (!el || !GV) return;

    const w = el.offsetWidth;
    const h = el.offsetHeight;
    if (w === 0 || h === 0) return;

    if (el.firstElementChild && el.firstElementChild.tagName === "IFRAME") {
      el.innerHTML = "";
      el.classList.add("mxgraph");
      el.setAttribute("data-mxgraph", JSON.stringify(mxConfig));
    }

    try {
      if (typeof GV.processElements === "function") {
        GV.processElements([el]);
      } else if (typeof GV === "function") {
        // eslint-disable-next-line no-new
        new GV(el);
      }
    } catch (err) {
      console.warn("[DrawioEmbed] Viewer failed to render:", err);
    }
  };

  // Initial run on mount (covers unmount/remount cases)
  useEffect(() => {
    if (!ready) return;
    const id = requestAnimationFrame(render);
    return () => cancelAnimationFrame(id);
  }, [ready, url, darkMode, fit, toolbar, highlight, nav]);

  // Re-run when visible again (covers display:none tab switching)
  useEffect(() => {
    if (!ready) return;
    const el = elRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          requestAnimationFrame(render);
        }
      },
      { threshold: 0.01 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [ready]);

  // Re-run when resized (covers collapsed → expanded / responsive layouts)
  useEffect(() => {
    if (!ready) return;
    const el = elRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(render);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [ready]);

  return (
    <div
      ref={elRef}
      className="mxgraph"
      data-mxgraph={JSON.stringify(mxConfig)}
      style={{ width: "100%", height: "100%", ...style }}
    />
  );
}
