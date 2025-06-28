// Scroll animations for smooth scrolling and scroll-triggered effects

// Smooth scroll behavior for the entire page
export const smoothScrollVariants = {
  initial: { 
    scrollBehavior: "smooth" 
  }
};

// Scroll-triggered fade-in animation
export const scrollFadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (custom = 0) => ({ 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut",
      delay: custom
    }
  })
};

// Scroll-triggered fade-in animation with scale
export const scrollFadeInScaleVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: (custom = 0) => ({ 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.6,
      ease: "easeOut",
      delay: custom
    }
  })
};

// Scroll-triggered slide-in from left animation
export const scrollSlideInLeftVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: (custom = 0) => ({ 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut",
      delay: custom
    }
  })
};

// Scroll-triggered slide-in from right animation
export const scrollSlideInRightVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: (custom = 0) => ({ 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut",
      delay: custom
    }
  })
};

// Staggered scroll animation for lists or grids
export const scrollStaggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: (custom = 0) => ({ 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: custom || 0.1
    }
  })
};

// Scroll progress animation for progress bars or indicators
export const scrollProgressVariants = (scrollYProgress) => ({
  width: scrollYProgress ? `${scrollYProgress * 100}%` : "0%",
  transition: { duration: 0.1 }
});
