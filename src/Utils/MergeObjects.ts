import type { Variants, MotionProps } from "motion/react";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function arraysEqual(a: unknown[], b: unknown[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function deepMergeOrThrowOnLeafConflict(
  target: unknown,
  source: unknown,
  path: string[] = []
): unknown {
  if (target === undefined) return source;
  if (source === undefined) return target;

  // Both plain objects -> recurse
  if (isPlainObject(target) && isPlainObject(source)) {
    const out: Record<string, unknown> = { ...target };
    const keys = new Set([...Object.keys(target), ...Object.keys(source)]);
    for (const key of keys) {
      out[key] = deepMergeOrThrowOnLeafConflict(
        (target as Record<string, unknown>)[key],
        (source as Record<string, unknown>)[key],
        [...path, key]
      );
    }
    return out;
  }

  // Both arrays -> must be identical
  if (Array.isArray(target) && Array.isArray(source)) {
    if (arraysEqual(target, source)) return target;
    throw new Error(
      `mergeAnims: conflicting array at "${path.join(".")}"`
    );
  }

  // Type mismatch (one object/array, one not) -> conflict
  const targetIsObj = isPlainObject(target) || Array.isArray(target);
  const sourceIsObj = isPlainObject(source) || Array.isArray(source);
  if (targetIsObj !== sourceIsObj) {
    throw new Error(
      `mergeAnims: type conflict at "${path.join(".")}" (${typeof target} vs ${typeof source})`
    );
  }

  // Both leaves -> must be strictly equal
  if (target !== source) {
    throw new Error(
      `mergeAnims: conflicting leaf at "${path.join(".")}" (${JSON.stringify(
        target
      )} vs ${JSON.stringify(source)})`
    );
  }

  return target; // equal leaves
}

export function mergeVariants(...variants: Variants[]): Variants {
  const merged: Variants = {};
  for (const variant of variants) {
    for (const key in variant) {
      merged[key] = deepMergeOrThrowOnLeafConflict(
        merged[key],
        variant[key],
        [key]
      ) as Variants[string];
    }
  }
  return merged;
}

const motionPropKeys = new Set([
  "whileHover",
  "whileTap",
  "whileFocus",
  "whileInView",
  "drag",
  "layout",
  "transition",
  "style",
  "viewport",
]);

export function mergeAnims(
  addDefaultProps: boolean,
  ...items: (Variants | MotionProps)[]
): MotionProps {
  const merged: MotionProps = { variants: {} };

  for (const item of items) {
    for (const key in item) {
      if (motionPropKeys.has(key)) {
        (merged as Record<string, unknown>)[key] = deepMergeOrThrowOnLeafConflict(
          (merged as Record<string, unknown>)[key],
          (item as Record<string, unknown>)[key],
          [key]
        );
      } else {
        (merged.variants as Record<string, unknown>)[key] =
          deepMergeOrThrowOnLeafConflict(
            (merged.variants as Record<string, unknown>)[key],
            (item as Record<string, unknown>)[key],
            [key]
          );
      }
    }
  }

  if (addDefaultProps && merged.variants) {
    for (const key in merged.variants) {
      if ((merged as Record<string, unknown>)[key] === undefined) {
        (merged as Record<string, unknown>)[key] = key;
      }
    }
  }

  return merged;
}
