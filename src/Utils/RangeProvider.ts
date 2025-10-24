export interface RangeProvider {
  start: number;
  end: number;
  step?: number;
  scale: (v: number) => number;
  unscale: (r: number) => number;
  pixelsPerUnit: number;
  fitToRange?: boolean;
}

export function makeDefaultRangeProvider(
  range: [number, number],
  options?: { pixelsPerUnit?: number; fitToRange?: boolean }
): RangeProvider {
  const [start, end] = range;
  const pixelsPerUnit = options?.pixelsPerUnit ?? 100;
  const fitToRange = options?.fitToRange ?? false;

  return {
    start,
    end,
    scale: (v) => (v - start) / (end - start),
    unscale: (r) => start + r * (end - start),
    pixelsPerUnit,
    fitToRange,
  };
}
