import type { Variants, MotionProps } from 'motion/react';

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function arraysEqual(a: unknown[], b: unknown[]) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

/**
 * Deep-merge two objects.
 * - If both sides are plain objects: recurse.
 * - If both sides are arrays: they must be identical, else error (no array merge semantics).
 * - If both sides are leaves (primitives/functions/etc.): they must be strictly equal, else error.
 * - If one side is object/array and the other is not: error (type conflict).
 * - If one side is undefined: return the other.
 * Throws with the exact conflicting path when a leaf conflict occurs.
 */
function deepMergeOrThrowOnLeafConflict(
  target: any,
  source: any,
  path: string[] = []
): any {
  // Fast paths for undefined
  if (target === undefined) return source;
  if (source === undefined) return target;

  // Both plain objects -> recurse
  if (isPlainObject(target) && isPlainObject(source)) {
    const out: Record<string, any> = { ...target };
    const keys = new Set([...Object.keys(target), ...Object.keys(source)]);
    for (const key of keys) {
      out[key] = deepMergeOrThrowOnLeafConflict(
        target[key],
        source[key],
        [...path, key]
      );
    }
    return out;
  }

  // Both arrays -> must be identical
  if (Array.isArray(target) && Array.isArray(source)) {
    if (arraysEqual(target, source)) return target;
    throw new Error(
      `mergeAnims: conflicting array at "${path.join('.')}" (${JSON.stringify(
        target
      )} vs ${JSON.stringify(source)})`
    );
  }

  // Type mismatch (one object/array, one not) -> conflict
  const targetIsObj = isPlainObject(target) || Array.isArray(target);
  const sourceIsObj = isPlainObject(source) || Array.isArray(source);
  if (targetIsObj !== sourceIsObj) {
    throw new Error(
      `mergeAnims: type conflict at "${path.join('.')}" (${typeof target} vs ${typeof source})`
    );
  }

  // Both leaves -> must be strictly equal
  if (target !== source) {
    throw new Error(
      `mergeAnims: conflicting leaf at "${path.join('.')}" (${JSON.stringify(
        target
      )} vs ${JSON.stringify(source)})`
    );
  }
  return target; // equal leaves
}

export function mergeVariants(...variants: Variants[]): Variants {
  let merged: Variants = {};
  for (const variant of variants) {
    for (const key in variant) {
      merged[key] = deepMergeOrThrowOnLeafConflict(
        merged[key],
        (variant as any)[key],
        [key]
      );
    }
  }
  return merged;
}

/** Keys that belong only on MotionProps (never inside variants) */
const motionPropKeys = new Set([
  'whileHover',
  'whileTap',
  'whileFocus',
  'whileInView',
  'drag',
  'layout',
  'transition',
  'style',
  'viewport',
]);

/**
 * Merge multiple Variants into MotionProps
 * - Deep merges all variants
 * - Auto-assigns props when a variant key matches a MotionProp key (e.g., "initial", "animate", "exit")
 * - Throws ONLY on conflicting leaf values (or incompatible types)
 */
export function mergeAnims(
  addDefaultProps: boolean,
  ...items: (Variants | MotionProps)[]
): MotionProps {
  const merged: MotionProps = { variants: {} };

  for (const item of items) {
    for (const key in item) {
      if (motionPropKeys.has(key)) {
        (merged as any)[key] = deepMergeOrThrowOnLeafConflict(
          (merged as any)[key],
          (item as any)[key],
          [key]
        );
      } else {
        (merged.variants as any)[key] = deepMergeOrThrowOnLeafConflict(
          (merged.variants as any)[key],
          (item as any)[key],
          [key]
        );
      }
    }
  }

  if (addDefaultProps && merged.variants) {
    for (const key in merged.variants) {
      if ((merged as any)[key] === undefined) {
        (merged as any)[key] = key;
      }
    }
  }

  return merged;
}
