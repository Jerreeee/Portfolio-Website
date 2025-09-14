'use client';

import { useEffect, useMemo, useState } from 'react';

type SvgParseResult = {
  svgHTML: string;
  originalColors: string[];
  aspectRatio?: number;
};

const svgCache = new Map<string, SvgParseResult>();

function extractAndPatchStyleFills(doc: Document): string[] {
  const styleEl = doc.querySelector("style");
  if (!styleEl || !styleEl.textContent)
    return [];

  let styleContent = styleEl.textContent;
  const colors: string[] = [];

  // Regex finds `.classname { ... fill: #xxxxxx; ... }`
  styleContent = styleContent.replace(
    /fill:\s*([^;]+);?/g,
    (_match, color) => {
      const key = `--color${colors.length}`;
      colors.push(color.trim());
      return `fill: var(${key});`;
    }
  );

  // Replace the <style> content with patched version
  styleEl.textContent = styleContent;

  return colors;
}

export function useParsedSVG(ID: string, rawSvg: string): SvgParseResult | null {
  const [parsed, setParsed] = useState<SvgParseResult | null>(null);

  useEffect(() => {
    if (!rawSvg)
      return;

    const cached = svgCache.get(ID);
    if (cached)
    {
      setParsed(cached)
      return;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(rawSvg, "image/svg+xml");
    const svg = doc.querySelector("svg");
    if (!svg)
      return;

    const originalColors: string[] = [];
    const styleColors = extractAndPatchStyleFills(doc);
    originalColors.push(...styleColors);

    const walker = document.createTreeWalker(svg, NodeFilter.SHOW_ELEMENT);
    let node = walker.nextNode();
    // console.log("ID", ID);
    // console.log("styleColors", styleColors);

    let colorIndex = originalColors.length;

    while (node) {
      const el = node as Element;
      let fill: string | undefined = el.getAttribute("fill") ?? undefined;

      // inline style
      if (!fill && el.hasAttribute("style")) {
        const match = el.getAttribute("style")?.match(/fill:\s*([^;]+)/);
        if (match) fill = match[1];
      }

        // Default fallback for visible paths
        if (!fill && el.tagName.toLowerCase() === "path")
          fill = "#FFFFFF";

      if (fill) {
        originalColors.push(fill);
        const key = `color${colorIndex}`;
        el.setAttribute("fill", `var(--${key})`);
        colorIndex++;
      }

      node = walker.nextNode();
    }

    // Aspect ratio
    let aspectRatio: number | undefined;
    let viewBox = svg.getAttribute("viewBox");

    if (viewBox) {
      const [, , wStr, hStr] = viewBox.trim().split(/\s+/);
      const width = parseFloat(wStr);
      const height = parseFloat(hStr);
      if (width && height) aspectRatio = width / height;
    } else {
      // If no viewBox, derive from width/height
      const widthAttr = svg.getAttribute("width");
      const heightAttr = svg.getAttribute("height");
      const width = widthAttr ? parseFloat(widthAttr) : undefined;
      const height = heightAttr ? parseFloat(heightAttr) : undefined;
      if (width && height) {
        aspectRatio = width / height;
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      }
    }

    svg.removeAttribute("width");
    svg.removeAttribute("height");

    if (aspectRatio) {
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
      svg.style.display = "block";
      svg.style.aspectRatio = aspectRatio.toString();
    }

    const result: SvgParseResult = {
      svgHTML: svg.outerHTML,
      originalColors,
      aspectRatio,
    };

    svgCache.set(ID, result);
    setParsed(result);
  }, [ID, rawSvg]);

  return parsed;
}
