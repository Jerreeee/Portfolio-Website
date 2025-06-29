import { Variants } from "framer-motion";

export const anims = {
  staggerChildren: (duration: number = 0.1): Variants => ({
    animate: {
      transition: {
        staggerChildren: duration,
      },
    },
  }),

  fadeInDown: (offset: number = 10, duration: number = 0.5): Variants => ({
    initial: { opacity: 0, y: -offset },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration },
    },
  }),

  fadeInUp: (offset: number = 10, duration: number = 0.5): Variants => ({
    initial: { opacity: 0, y: offset },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration },
    },
  }),

  hoverScale: (scale: number = 1.25, duration: number = 0.2): Variants => ({
    whileHover: {
      scale,
      transition: { duration },
    },
  }),
};
