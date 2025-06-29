import type { Variants } from 'motion/react';

export function MergeVariants(...variants: Variants[]): Variants {
  const merged: Variants = {};

  for (const variant of variants) {
    for (const key in variant) {
      // Shallow merge per variant key (e.g. 'animate')
      merged[key] = {
        ...(merged[key] || {}),
        ...(variant[key] || {}),
      };
    }
  }

  return merged;
}
