import React from 'react';
import { ThemeOptions, alpha } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
    MuiAccordionSummary: {
      defaultProps: {
        expandIcon: React.createElement(ExpandMoreIcon),
      },
      styleOverrides: {
        expandIconWrapper: ({ theme }) => ({
          color: theme.palette.secondary.main,
        }),
      },
    },

    MediaGalleryCmp: {
      styleOverrides: {
        videoOverlay: {
          backgroundColor: 'rgba(0,0,0,0.4)',
          fontSize: '1.8rem',
        },
        navArrow: ({ theme }) => ({
          '&:hover': {
            color: theme.palette.secondary.main,
            background: alpha(theme.palette.secondary.main, 0.20),
          },
        }),
        dotStrip: ({ theme }) => ({
          borderColor: alpha(theme.palette.secondary.main, 0.20),
        }),
      },
    },

    ProjectOverviewCmp: {
      styleOverrides: {
        techCategory: ({ theme }) => ({
          borderLeft: `3px solid ${theme.palette.secondary.main}`,
          background: `linear-gradient(135deg,
            ${alpha(theme.palette.primary.main,   theme.palette.mode === 'dark' ? 0.10 : 0.06)} 0%,
            ${alpha(theme.palette.secondary.main, theme.palette.mode === 'dark' ? 0.10 : 0.06)} 100%)`,
          boxShadow: theme.palette.mode === 'dark'
            ? '0 1px 8px rgba(0,0,0,0.25)'
            : '0 1px 8px rgba(0,0,0,0.07)',
        }),
      },
    },

    ImageCompareCmp: {
      styleOverrides: {
        altLabel: {
          backgroundColor: 'rgba(0,0,0,0.6)',
        },
      },
    },

    CodeBlockCmp: {
      styleOverrides: {
        styling: {
          fontFamily: `'Fira Code', monospace`,
          fontSize: '0.9rem',
          lineHeight: 1.6,
        },
      },
    },

    CodeInlineCmp: {
      styleOverrides: {
        root: {
          fontFamily: `'Fira Code', monospace`,
          fontSize: '0.875rem',
          lineHeight: 1.4,
        },
      },
    },

    ScrollBarCmp: {
      settings: {
        thickness: 10,
      },
    },

    IconCmp: {
      settings: {
        hoverScale: 1.1,
      },
    },

    ProjectCardCmp: {
      svgFilters: [
        (theme) => ({
          type: 'outline',
          id: 'card-border',
          color: theme.palette.primary.main,
          opacity: theme.palette.mode === 'dark' ? 0.75 : 0.5,
          radius: 1,
        }),
        (theme) => ({
          type: 'combined',
          id: 'card-hover',
          borderColor: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
          borderOpacity: 1,
          borderRadius: 2,
          glowColor: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.main,
          glowOpacity: 1,
          glowStrength: 5,
          glowBlendMode: theme.palette.mode === 'dark' ? 'screen' : 'multiply',
        }),
      ],
      styleOverrides: {
        wrapper: {
          filter: 'url(#card-border)',
          transition: 'filter 0.3s ease',
          '&:hover': { filter: 'url(#card-hover)' },
        },
      },
      slotAnimations: {
        root:     mergeAnims(true, anims.hoverScale(1.025)),
        content:  mergeAnims(true, anims.staggerChildren(0.2)),
        header:   mergeAnims(false, anims.fadeInUp()),
        techList: mergeAnims(false, anims.staggerChildren(0.05, 0.5)),
        techIcon: mergeAnims(false, anims.fadeInUp(20, 0.2)),
      },
    },

    ProjectsOverviewCmp: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: theme.palette.gradients.background(),
        }),
        header: ({ theme }) => ({
          textAlign: 'center',
          '& .MuiTypography-root': {
            display: 'inline-block',
            background: theme.palette.gradients.primary(),
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          },
        }),
      },
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

    CardTabsCmp: {
      styleOverrides: {
        tab: ({ theme }) => ({
          backgroundColor: alpha(theme.palette.common.white, theme.palette.mode === 'dark' ? 0.06 : 0.60),
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.10),
          },
          '&[data-selected="true"]': {
            borderColor: theme.palette.secondary.main,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)}, ${alpha(theme.palette.secondary.main, 0.10)})`,
            color: theme.palette.text.primary,
          },
        }),
      },
    },

    SegmentSliderCmp: {
      styleOverrides: {
        highlight: ({ theme }) => ({
          backgroundColor: theme.palette.secondary.main,
        }),
        handle: ({ theme }) => ({
          backgroundColor: theme.palette.secondary.light,
        }),
      },
    },

    ResumeCmp: {}, // ready for slotAnimations / styleOverrides per variation

    NavbarCmp: {
      defaultProps: {
        height: '60px',
      },
      styleOverrides: {
        brand: ({ theme }) => ({
          '& .MuiTypography-root': {
            display: 'inline-block',
            background: theme.palette.gradients.primary(),
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          },
        }),
        backArrow: ({ theme }) => ({
          '& .MuiButtonBase-root': {
            color: theme.palette.secondary.main,
            borderColor: theme.palette.secondary.main,
            '&:hover': {
              borderColor: theme.palette.secondary.light,
              backgroundColor: alpha(theme.palette.secondary.main, 0.08),
            },
          },
        }),
      },
      slotAnimations: {
        root:      mergeAnims(true, anims.fadeInDown()),
        backArrow: mergeAnims(true, anims.slideInFromLeft(), anims.exitToLeft()),
        brand:     mergeAnims(true, anims.fadeInDown(), anims.hoverScale(1.035), anims.tapScale(0.9), { layout: 'position', transition: { layout: { duration: 0.2, ease: 'easeInOut' } } }),
        list:      mergeAnims(true, anims.staggerChildren(0.2)),
        item:      mergeAnims(false, anims.fadeInDown()),
        underline: mergeAnims(false, { transition: { type: 'spring', stiffness: 500, damping: 30 } }),
      },
    },
  },
};
