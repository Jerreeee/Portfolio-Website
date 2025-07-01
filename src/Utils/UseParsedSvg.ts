import { useEffect, useMemo, useState } from 'react';

type SvgParseResult = {
  processedSvg: string;
  originalColors: Record<string, string>;
  aspectRatio?: number;
};

const svgCache = new Map<string, SvgParseResult>();

export function useParsedSvg(
  rawSvg: string,
  overrideColors?: Record<string, string>
): {
  processedSvg: string | null;
  colorVars: React.CSSProperties;
  aspectRatio?: number;
} {
  const [parsed, setParsed] = useState<SvgParseResult | null>(null);

  useEffect(() => {
    if (!rawSvg) return;

    if (svgCache.has(rawSvg)) {
      setParsed(svgCache.get(rawSvg)!);
      return;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(rawSvg, 'image/svg+xml');
    const svg = doc.querySelector('svg');
    if (!svg) return;

    const fills: Record<string, string> = {};
    let colorIndex = 0;

    const walker = document.createTreeWalker(svg, NodeFilter.SHOW_ELEMENT);
    let node = walker.nextNode();

    while (node) {
      const el = node as Element;
      let fill = el.getAttribute('fill');

      if (!fill && el.hasAttribute('style')) {
        const match = el.getAttribute('style')?.match(/fill:\s*([^;]+)/);
        if (match) fill = match[1];
      }

      if (!fill || fill === 'none') {
        node = walker.nextNode();
        continue;
      }

      const key = `color${colorIndex}`;
      fills[key] = fill;
      el.setAttribute('fill', `var(--${key})`);
      el.setAttribute('data-original-color-key', key);

      colorIndex++;
      node = walker.nextNode();
    }

    // Extract viewBox → width/height → aspectRatio
    let aspectRatio: number | undefined = undefined;
    const viewBox = svg.getAttribute('viewBox');
    if (viewBox) {
      const [, , wStr, hStr] = viewBox.trim().split(/\s+/);
      const width = parseFloat(wStr);
      const height = parseFloat(hStr);
      if (width && height) {
        aspectRatio = width / height;
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svg.style.display = 'block';
        svg.style.aspectRatio = `${width} / ${height}`;
      }
    }

    const result: SvgParseResult = {
      processedSvg: svg.outerHTML,
      originalColors: fills,
      aspectRatio,
    };

    svgCache.set(rawSvg, result);
    setParsed(result);
  }, [rawSvg]);

  const colorVars = useMemo(() => {
    const vars: React.CSSProperties = {};
    if (!parsed) return vars;

    for (const [key, value] of Object.entries(parsed.originalColors)) {
      vars[`--${key}`] = overrideColors?.[key] ?? value;
    }
    return vars;
  }, [parsed, overrideColors]);

  return {
    processedSvg: parsed?.processedSvg ?? null,
    colorVars,
    aspectRatio: parsed?.aspectRatio,
  };
}
