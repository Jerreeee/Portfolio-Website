import { useEffect, useMemo, useState } from 'react';

type SvgParseResult = {
  processedSvg: string;
  originalColors: Record<string, string>;
  aspectRatio?: number;
};

const svgCache = new Map<string, SvgParseResult>();

function extractCssFills(doc: Document): Map<string, string> {
  const styleContent = doc.querySelector('style')?.textContent || '';
  const styleMap = new Map<string, string>();
  const regex = /\.([a-zA-Z0-9_-]+)\s*\{\s*fill:\s*([^;}]+)\s*;?\s*\}/g;

  let match;
  while ((match = regex.exec(styleContent))) {
    const className = match[1];
    const color = match[2];
    styleMap.set(className, color);
  }

  return styleMap;
}

export function useParsedSvg(
  rawSvg: string,
  overrideColors?: Record<string, string>
): {
  processedSvg: string | null;
  colorVars: React.CSSProperties;
  aspectRatio?: number;
} {
  const [parsed, setParsed] = useState<SvgParseResult | null>(null);

  svgCache.clear();
  useEffect(() => {
    if (!rawSvg) return;
  
    if (svgCache.has(rawSvg)) {
      console.log('⚡ served from cache');
      setParsed(svgCache.get(rawSvg)!);
      return;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(rawSvg, 'image/svg+xml');
    const svg = doc.querySelector('svg');
    if (!svg) return;

    const styleMap = extractCssFills(doc);
    const fills: Record<string, string> = {};
    let colorIndex = 0;

    const walker = document.createTreeWalker(svg, NodeFilter.SHOW_ELEMENT);
    let node = walker.nextNode();

    while (node) {
      const el = node as Element;

      let fill: string | undefined = el.getAttribute('fill') ?? undefined;

      // inline style
      if (!fill && el.hasAttribute('style')) {
        const match = el.getAttribute('style')?.match(/fill:\s*([^;]+)/);
        if (match)
          fill = match[1];
      }

      // class-based style
      if (!fill && el.hasAttribute('class')) {
        const classes = el.getAttribute('class')!.split(/\s+/);
        for (const cls of classes) {
          const classFill = styleMap.get(cls);
          if (classFill) {
            fill = classFill;
            break;
          }
        }

        // Remove the class to prevent CSS from overriding new fill
        el.removeAttribute('class');
      }

      // Default fallback for visible paths
      if (!fill && el.tagName.toLowerCase() === 'path') {
        fill = '#000';
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

    // Remove <style> to avoid override
    const styleTag = svg.querySelector('style');
    if (styleTag) styleTag.remove();

    // Extract viewBox → width/height → aspectRatio
    let aspectRatio: number | undefined;
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

    // Debug
    console.log('[useParsedSvg] Parsed:', {
      rawSvg,
      fills,
      aspectRatio,
    });

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
