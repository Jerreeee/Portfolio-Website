"use client";

import { motion } from "motion/react";
import type { Variants } from "framer-motion";
import { mergeAnims } from "@/Utils/MergeObjects";

type MotionWrapperProps = {
  animations: { addDefaultProps: boolean; variants: Variants[] }[];
  children: React.ReactNode;
};

/**
 * Wraps children in nested motion.divs, one per animation group.
 * Example:
 *   <MotionWrapper
 *     animations={[
 *       { addDefaultProps: false, variants: [anims.fadeInDown()] },
 *       { addDefaultProps: true,  variants: [anims.hoverScale(1.035), anims.tapScale(0.9)] },
 *     ]}
 *   >
 *     <Link href="/">Home</Link>
 *   </MotionWrapper>
 */
export function MotionWrapper({ animations, children }: MotionWrapperProps) {
  // Build nested wrappers inside-out
  return animations.reduceRight<React.ReactNode>((acc, anim) => {
    return (
      <motion.div
        {...mergeAnims(anim.addDefaultProps, ...anim.variants)}
      >
        {acc}
      </motion.div>
    );
  }, children);
}
