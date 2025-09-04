import { Variants } from "framer-motion";
import { mergeVariants } from '@/Utils/MergeObjects'

export const anims = {
  staggerChildren: (duration: number = 0.1, delayChildren = 0): Variants => ({
    initial: {},
    animate: {
      transition: {
        when: 'beforeChildren',
        staggerChildren: duration,
        delayChildren: delayChildren,
      },
    },
  }),

  fadeIn: (duration: number = 0.5): Variants => ({
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration },
    },
  }),

  move: (offsetX: number = 10, offsetY: number = 10, duration: number = 0.5): Variants => ({
    initial: { x: offsetX, y: offsetY },
    animate: {
      x: 0, y: 0,
      transition: { duration },
    },
  }),

  fadeInDown: (offsetY: number = 10, duration: number = 0.5): Variants => {
      return mergeVariants(anims.fadeIn(duration), anims.move(0, -offsetY, duration)
    );
  },

  fadeInUp: (offsetY: number = 10, duration: number = 0.5): Variants => {
      return mergeVariants(anims.fadeIn(duration), anims.move(0, offsetY, duration)
    );
  },

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
