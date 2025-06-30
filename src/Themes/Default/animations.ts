import { Variants } from "framer-motion";

export const anims = {
  staggerChildren: (duration: number = 0.1): Variants => ({
    animate: {
      transition: {
        when: 'beforeChildren',
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

  fadeInRight: (offset: number = 10, duration: number = 0.5): Variants => ({
    initial: { opacity: 0, x: -offset },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration },
    },
  }),

  hoverScale: (scale: number = 1.25, duration: number = 0.2): Variants => ({
    whileHover: {
      scale,
      transition: { duration },
    },
  }),

  tapScale: (scale: number = 1.25, duration: number = 0.2): Variants => ({
    whileTap: {
      scale,
      transition: { duration },
    },
  }),
};
