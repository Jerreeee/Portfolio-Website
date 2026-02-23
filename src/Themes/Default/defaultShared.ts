import { ThemeOptions } from '@mui/material/styles';
import { mergeAnims } from '@/Utils/MergeObjects';
import { anims } from '@/Themes/animations';

/**
 * Shared theme options for all Default-family variations (Dark, Light, etc.).
 * Typography, shape, animations — anything identical across all Default variations.
 */
export const defaultSharedBase: ThemeOptions = {
  typography: {
    fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
    h1: {
      fontWeight: 600,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      padding: '2rem 0 1rem 0',
    },
    h2: {
      fontWeight: 500,
      fontSize: '2rem',
      lineHeight: 1.3,
      padding: '1.75rem 0 0.75rem 0',
    },
    h3: {
      fontWeight: 400,
      fontSize: '1.75rem',
      lineHeight: 1.4,
      padding: '1.5rem 0 0.5rem 0',
    },
    h4: {
      fontWeight: 400,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      padding: '1rem 0 0.5rem 0',
    },
    h5: {
      fontWeight: 400,
      fontSize: '1.25rem',
      lineHeight: 1.4,
      padding: '0.75rem 0 0.25rem 0',
    },
    h6: {
      fontWeight: 400,
      fontSize: '1.125rem',
      lineHeight: 1.5,
      padding: '0.5rem 0 0.25rem 0',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      padding: '0.5rem 0',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      padding: '0.25rem 0',
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    ScrollBarCmp: {
      settings: {
        thickness: 10,
      },
    },

    ProjectCardCmp: {
      slotAnimations: {
        root:     mergeAnims(true, anims.hoverScale(1.025)),
        content:  mergeAnims(true, anims.staggerChildren(0.2)),
        header:   mergeAnims(false, anims.fadeInUp()),
        techList: mergeAnims(false, anims.staggerChildren(0.05, 0.5)),
        techIcon: mergeAnims(false, anims.fadeInUp(20, 0.2), anims.hoverScale()),
      },
    },

    ProjectsOverviewCmp: {
      slotAnimations: {
        root:        mergeAnims(true, anims.staggerChildren(0.25)),
        header:      mergeAnims(false, anims.fadeInUp()),
        grid:        mergeAnims(false, anims.staggerChildren(0.2)),
        cardWrapper: {
          variants: {
            initial: { opacity: 0, y: 20 },
            animate: (i: number) => ({
              opacity: 1,
              y: 0,
              transition: { duration: 0.3, delay: i * 0.2 },
            }),
          },
        },
      },
    },

    NavbarCmp: {
      defaultProps: {
        height: '60px',
      },
      slotAnimations: {
        root:     mergeAnims(true, anims.fadeInDown()),
        brand:    mergeAnims(true, anims.fadeInDown(), anims.hoverScale(1.035), anims.tapScale(0.9)),
        list:     mergeAnims(true, anims.staggerChildren(0.2)),
        item:     mergeAnims(false, anims.fadeInDown()),
        underline: mergeAnims(false, { transition: { type: 'spring', stiffness: 500, damping: 30 } }),
      },
    },
  },
};
