'use client';

import { motion } from 'framer-motion';
import React from 'react';

type MotionWrapperProps = {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  variants?: Record<string, any>;
  initial?: string | boolean;
  animate?: string | boolean;
  exit?: string | undefined;
  whileHover?: string | MotionStyle;
  whileTap?: string | MotionStyle;
  transition?: string | Transition;
};

export function MotionWrapper({
  children,
  as = 'div',
  className,
  style,
  variants,
  initial = 'initial',
  animate = 'animate',
  exit = 'exit',
  whileHover= 'hover',
  whileTap= 'tap',
  transition= 'transition',
}: MotionWrapperProps) {
  const MotionComponent = motion(as);

  return (
    <MotionComponent
      className={className}
      style={style}
      variants={variants}
      initial={initial}
      animate={animate}
      exit={exit}
      whileHover={whileHover}
      whileTap={whileTap}
      transition={transition}
    >
      {children}
    </MotionComponent>
  );
}
