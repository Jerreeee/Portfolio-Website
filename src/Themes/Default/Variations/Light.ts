//mui
import { Theme, ThemeOptions } from '@mui/material/styles';

//custom
import { RegisteredTheme } from '@/Themes';

export const defaultLightBase: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#3949ab',
      light: '#7986cb',
      dark: '#283593',
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
      primary: (dir = "135deg") => `linear-gradient(${dir}, #3949ab 0%, #7b72f0 50%, #c2185b 100%)`,
      background: (dir = "to bottom") => `linear-gradient(${dir}, #e8eaf6, #fce4ec)`,
      subtle: (dir = "135deg") => `linear-gradient(${dir}, rgba(0,0,0,0.03), rgba(0,0,0,0.06))`,
      h1: (dir = '135deg') => `linear-gradient(${dir}, #3949ab 0%, #7b72f0 50%, #c2185b 100%)`,
      column: () => 'rgba(255,255,255,0.45)',
    },
    tone: 'light' as const,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(160deg, #e8eaf6 0%, #fce8f3 100%)',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        },
      },
    },

    ProjectCardCmp: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: 'linear-gradient(145deg, #ffffff 0%, #eeefff 100%)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          position: 'relative',
          '&:hover': {
            background: 'linear-gradient(145deg, #e8eaf6 0%, #e8e4ff 100%)',
            outline: `4px solid ${theme.palette.secondary.main}`,
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              boxShadow: 'inset 0 0 30px rgba(194,24,91,0.30)',
              borderRadius: 'inherit',
              pointerEvents: 'none',
              zIndex: 1,
            },
          },
        }),
        header: ({ theme }) => ({
          color: theme.palette.text.primary,
        }),
        techList: {
          height: 30,
        },
      },
    },

    NavbarCmp: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: 'linear-gradient(to right, #ffffff 0%, #f5f0ff 100%)',
          borderBottom: `1px solid ${theme.palette.primary.main}`,
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        }),
        // brand styleOverride using palette.gradients is in defaultLightEnhanced
        list: {},
        item: {},
        link: ({ theme }) => ({
          color: theme.palette.text.secondary,
          '&:hover': { color: theme.palette.text.primary },
          '&[data-active="true"]': { color: theme.palette.primary.main },
        }),
        underline: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
        }),
      },
    },

    ProjectsOverviewCmp: {
      // styleOverrides using palette.gradients are in defaultLightEnhanced
    },

    ScrollBarCmp: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0,0,0,0.10)',
        },
        thumb: {
          backgroundColor: 'rgba(0,0,0,0.30)',
        },
      },
    },

    CardTabsCmp: {
      styleOverrides: {
        header: {
          background: 'linear-gradient(to right, #e8eaf6, #f3e5f5)',
        },
        content: {
          background: 'linear-gradient(to bottom, #f8faff, #ffffff)',
        },
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

    ProjectOverviewCmp: {
      styleOverrides: {
        textBox: {
          background: 'linear-gradient(135deg, #f8faff 0%, #fdf4fb 100%)',
          boxShadow: '0 1px 8px rgba(0,0,0,0.07)',
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
