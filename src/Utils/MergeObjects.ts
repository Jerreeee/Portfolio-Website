import type { Variants } from 'motion/react';

function IsObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function DeepMergePreserveLeaves(target: any, source: any): any {
  const result = { ...target };

  for (const key in source) {
    const sourceVal = source[key];
    const targetVal = result[key];

    if (IsObject(sourceVal) && IsObject(targetVal)) {
      result[key] = DeepMergePreserveLeaves(targetVal, sourceVal);
    } else if (targetVal === undefined) {
      result[key] = sourceVal;
    }
    // If target already has a non-object value, we keep it (don't overwrite)
  }

  return result;
}

export function MergeVariants(...variants: Variants[]): Variants {
  let merged: Variants = {};

  for (const variant of variants) {
    for (const key in variant) {
      merged[key] = DeepMergePreserveLeaves(merged[key] || {}, variant[key] || {});
    }
  }

  return merged;
}
