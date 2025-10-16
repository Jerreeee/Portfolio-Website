//mui
import { ThemeOptions } from '@mui/material/styles';

//custom
import { mergeVariants, mergeAnims } from '@/Utils/MergeObjects';
import { anims } from '@/Themes/animations';

const h1Base = {
  fontWeight: 600,
  fontSize: '2.5rem',
  lineHeight: 1.2,
  padding: '2rem 0 1rem 0',
};

export const defaultDarkOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',    // light blue
      light: '#e3f2fd',
      dark: '#42a5f5',
    },
    secondary: {
      main: '#f48fb1',    // pink
      light: '#f8bbd0',
      dark: '#f06292',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
    divider: 'rgba(255,255,255,0.12)',
  },

  typography: {
    fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
    h1: h1Base,
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
    gradientH1: {
      ...h1Base,
      background: 'linear-gradient(135deg, #3fa0ff 0%, #7b72f0 50%, #ec38bc 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      display: 'inline-block',
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
    //Global MUI overrides
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    IconCmp: {
      defaultProps: {
        convertToGrayScale: true,
        grayScaleIconColor: '#FF0000',
      }
    },
    ProjectCardCmp: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
          '&:hover': {
            backgroundColor: '#2c2c2c',
          },
        },
        header: {
          color: '#F0F0F0',
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
      styleOverrides: {
        root: {
          background: 'linear-gradient(to bottom, #151a2c, #221730)',
        },
        header: {
          // marginTop: 30,
          // marginBottom: 30,
          // paddingTop: 30,
          textAlign: 'center',
          '& .MuiTypography-root': {
            display: 'inline-block',
            background: 'linear-gradient(135deg, #3fa0ff 0%, #7b72f0 50%, #ec38bc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          },
        },
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
      }
    },
    NavbarCmp: {
      defaultProps: {
        height: '60px'
      },
      styleOverrides: {
        root: {
          backgroundColor: '#141418',
          borderBottom: '1px solid #3fa0ff',
        },
        brand: {
          '& .MuiTypography-root': {
            display: 'inline-block',
            background: 'linear-gradient(135deg, #3fa0ff 0%, #7b72f0 50%, #ec38bc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          },
        },
        list: {},
        item: {},
        link: {
          color: '#888888',
          '&:hover': { color: '#d0d0d0' },
          '&[data-active="true"]': { color: '#7b72f0' },
        },
        underline: {
          backgroundColor: '#3fa0ff',
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
    CodeBlockCmp: {
      styleOverrides: {
        root: {
          '& .ScrollableCmp-container': {
            border: '2px solid green',
          }
        }
      }
    }
  },
};  
