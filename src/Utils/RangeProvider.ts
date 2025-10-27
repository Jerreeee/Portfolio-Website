export interface RangeProvider {
  start: number;
  end: number;
  step?: number;
  normalize: (v: number) => number;
  denormalize: (r: number) => number;
  clampToRange?: boolean;
}

export function makeDefaultRangeProvider(
  range: [number, number],
  options?: { clampToRange?: boolean }
): RangeProvider {
  const [start, end] = range;
  const clampToRange = options?.clampToRange ?? true;
  const span = end - start;

  const normalize = (v: number): number => {
    const normalized = (v - start) / span;
    return clampToRange ? Math.min(Math.max(normalized, 0), 1): normalized;
  };

  const denormalize = (v: number): number => {
    const value = clampToRange ? Math.min(Math.max(v, 0), 1) : v;
    return start + value * span;
  };

  return { start, end, clampToRange, normalize: normalize, denormalize: denormalize };
}
