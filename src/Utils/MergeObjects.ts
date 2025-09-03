import type { Variants, MotionProps } from 'motion/react';

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function deepMergePreserveLeaves(target: any, source: any): any {
  const result = { ...target };

  for (const key in source) {
    const sourceVal = source[key];
    const targetVal = result[key];

    if (isObject(sourceVal) && isObject(targetVal)) {
      result[key] = deepMergePreserveLeaves(targetVal, sourceVal);
    } else if (targetVal === undefined) {
      result[key] = sourceVal;
    }
    // If target already has a non-object value, we keep it (don't overwrite)
  }

  return result;
}

export function mergeVariants(...variants: Variants[]): Variants {
  let merged: Variants = {};

  for (const variant of variants) {
    for (const key in variant) {
      merged[key] = deepMergePreserveLeaves(merged[key] || {}, variant[key] || {});
    }
  }

  return merged;
}

/**
 * Merge multiple Variants into MotionProps
 * - Deep merges all variants
 * - Auto-assigns props when a variant key matches a MotionProp key
 */
export function mergeAnims(addDefaultProps: boolean, ...variants: Variants[]): MotionProps {
  const merged: MotionProps = { variants: {} };

  for (const variant of variants) {
    for (const key in variant) {
      const existing = (merged.variants as any)[key];
      const incoming = (variant as any)[key];

      if (existing && Object.keys(incoming).length > 0) {
        throw new Error(
          `mergeAnims: duplicate variant key "${key}" detected. 
           You tried to merge multiple animations that both define "${key}".`
        );
      }

      (merged.variants as any)[key] = deepMergePreserveLeaves(
        existing || {},
        incoming || {}
      );
    }
  }

  // Auto-assign matching props
  if (addDefaultProps && merged.variants) {
    for (const key in merged.variants) {
      if ((merged as any)[key] === undefined) {
        (merged as any)[key] = key;
      }
    }
  }

  return merged;
}
