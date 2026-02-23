//mui
import { Theme, ThemeOptions } from '@mui/material/styles';

//custom
import { mergeAnims } from '@/Utils/MergeObjects';
import { anims } from '@/Themes/animations';
import { RegisteredTheme } from '@/Themes';

export const defaultLightBase: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#c2185b',
      light: '#f06292',
      dark: '#880e4f',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#555555',
    },
    divider: 'rgba(0,0,0,0.12)',

    gradients: {
      primary: (dir = "135deg") => `linear-gradient(${dir}, #1976d2 0%, #7b72f0 50%, #c2185b 100%)`,
      background: (dir = "to bottom") => `linear-gradient(${dir}, #e8eaf6, #fce4ec)`,
      subtle: (dir = "135deg") => `linear-gradient(${dir}, rgba(0,0,0,0.03), rgba(0,0,0,0.06))`,
      h1: (dir = '135deg') => `linear-gradient(${dir}, #1976d2 0%, #7b72f0 50%, #c2185b 100%)`,
    },
  },

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
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          gradientH1: 'h1',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    IconCmp: {
      defaultProps: {
        convertToGrayScale: false,
      }
    },
    ProjectCardCmp: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          '&:hover': {
            backgroundColor: '#f0f4ff',
          },
        },
        header: {
          color: '#1a1a1a',
        },
        techList: {
          height: 30
        }
      },
      slotAnimations: {
        root:     mergeAnims(true, anims.hoverScale(1.025)),
        content:  mergeAnims(true, anims.staggerChildren(0.2)),
        header:   mergeAnims(false, anims.fadeInUp()),
        techList: mergeAnims(false, anims.staggerChildren(0.05, 0.5)),
        techIcon: mergeAnims(false, anims.fadeInUp(20, 0.2), anims.hoverScale())
      }
    },
    ProjectsOverviewCmp: {
      // styleOverrides using palette.gradients are in defaultLightEnhanced
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
      }
    },
    NavbarCmp: {
      defaultProps: {
        height: '60px'
      },
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #1976d2',
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        },
        // brand styleOverride using palette.gradients is in defaultLightEnhanced
        list: {},
        item: {},
        link: {
          color: '#555555',
          '&:hover': { color: '#1a1a1a' },
          '&[data-active="true"]': { color: '#1976d2' },
        },
        underline: {
          backgroundColor: '#1976d2',
        },
      },
      slotAnimations: {
        root: mergeAnims(true, anims.fadeInDown()),
        brand: mergeAnims(true, anims.fadeInDown(), anims.hoverScale(1.035), anims.tapScale(0.9)),
        list: mergeAnims(true, anims.staggerChildren(0.2)),
        item: mergeAnims(false, anims.fadeInDown()),
        underline: mergeAnims(false, { transition: { type: 'spring', stiffness: 500, damping: 30 } }),
      },
    },
    ScrollBarCmp: {
      settings: {
        thickness: 10
      },
    },
  },
};

export const defaultLightEnhanced: RegisteredTheme["enhance"] = (base: Theme): ThemeOptions => ({
  typography: {
    gradientH1: {
      ...base.typography.h1,
      background: base.palette.gradients.h1(),
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      display: "inline-block",
    },
  },
  components: {
    ProjectsOverviewCmp: {
      styleOverrides: {
        root: {
          background: base.palette.gradients.background(),
        },
        header: {
          textAlign: 'center',
          '& .MuiTypography-root': {
            display: 'inline-block',
            background: base.palette.gradients.primary(),
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          },
        },
      },
    },
    NavbarCmp: {
      styleOverrides: {
        brand: {
          '& .MuiTypography-root': {
            display: 'inline-block',
            background: base.palette.gradients.primary(),
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          },
        },
      },
    },
  },
});
