'use client';

import { motion } from 'motion/react';
import React from 'react';
import type {
  MotionStyle,
  TargetAndTransition,
  Transition,
  Variants,
} from 'motion/react';

type MotionStageKey =
  | 'initial'
  | 'animate'
  | 'exit'
  | 'whileHover'
  | 'whileTap'
  | 'whileFocus'
  | 'whileDrag'
  | 'whileInView';

type MotionPreset = Partial<Record<MotionStageKey, string>>;

export const motionPresets = {
  default: {
    initial: 'initial',
    animate: 'animate',
  },
  defaultInv: {
    initial: 'animate',
    animate: 'initial',
  },
  hoverable: {
    whileHover: 'hover',
    whileTap: 'tap',
  },
};


type MotionWrapperProps = {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  presets?: MotionPreset[];

  variants?: Variants;
  transition?: Transition;

  // Manual overrides (same keys as MotionPreset)
  initial?: false | string | TargetAndTransition;
  animate?: string | TargetAndTransition;
  exit?: string | TargetAndTransition;
  whileHover?: string | MotionStyle;
  whileTap?: string | MotionStyle;
  whileFocus?: string | MotionStyle;
  whileDrag?: string | MotionStyle;
  whileInView?: string | MotionStyle;

  layout?: boolean | 'position' | 'size' | 'preserve-aspect';
  layoutId?: string;
  layoutDependency?: unknown;

  drag?: boolean | 'x' | 'y';
  dragConstraints?: object;
  dragElastic?: number | boolean;
  dragSnapToOrigin?: boolean;
  dragTransition?: Transition;

  layoutScroll?: boolean;
  onLayoutAnimationComplete?: () => void;
};

export function MotionWrapper({
  children,
  as = 'div',
  presets = [],
  ...motionOverrides
}: MotionWrapperProps) {
  const MotionComponent = motion(as);

  // Merge presets in order
  const presetProps = Object.assign({}, ...presets);

  // Apply overrides — props passed in directly win over presets
  const finalProps = { ...presetProps, ...motionOverrides };

  return (
    <MotionComponent {...(finalProps as Record<string, unknown>)}>
      {children}
    </MotionComponent>
  );
}
