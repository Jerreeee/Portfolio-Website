import { Variants } from "framer-motion";

// Container animation with staggered children
export const containerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      when: 'beforeChildren',
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0 },
};
