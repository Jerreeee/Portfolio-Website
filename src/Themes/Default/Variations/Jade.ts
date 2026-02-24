//mui
import { Theme, ThemeOptions } from '@mui/material/styles';

//custom
import { RegisteredTheme } from '@/Themes';

export const defaultJadeBase: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#10b981',    // vivid emerald
      light: '#34d399',
      dark: '#059669',
    },
    secondary: {
      main: '#fbbf24',    // bright amber-gold
      light: '#fcd34d',
      dark: '#d97706',
    },
    background: {
      default: '#0a2014',
      paper: '#0f2d1c',
    },
    text: {
      primary: '#d9f2e6',
      secondary: '#86c4a0',
    },
    divider: 'rgba(16,185,129,0.18)',

    gradients: {
      primary: (dir = "135deg") => `linear-gradient(${dir}, #10b981 0%, #0891b2 50%, #fbbf24 100%)`,
      background: (dir = "to bottom") => `linear-gradient(${dir}, #0a2014, #081810)`,
      subtle: (dir = "135deg") => `linear-gradient(${dir}, rgba(16,185,129,0.07), rgba(0,0,0,0.07))`,
      h1: (dir = '135deg') => `linear-gradient(${dir}, #10b981 0%, #0891b2 50%, #fbbf24 100%)`,
      column: () => 'rgba(16,185,129,0.12)',
    },
    tone: 'dark' as const,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(160deg, #0a2014 0%, #0c1f10 100%)',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        },
      },
    },

    ProjectCardCmp: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: 'linear-gradient(145deg, #0f2d1c 0%, #112818 100%)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.35)',
          position: 'relative',
          '&:hover': {
            background: 'linear-gradient(145deg, #163d26 0%, #143322 100%)',
            outline: `4px solid ${theme.palette.secondary.main}`,
            boxShadow: '0 8px 32px rgba(0,0,0,0.60)',
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              boxShadow: 'inset 0 0 30px rgba(251,191,36,0.85)',
              borderRadius: 'inherit',
              pointerEvents: 'none',
              zIndex: 1,
            },
          },
        }),
        header: {
          color: '#d9f2e6',
        },
        techList: {
          height: 30,
        },
      },
    },

    NavbarCmp: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(to right, #0f2d1c 0%, #0c2418 100%)',
          borderBottom: '1px solid #10b981',
          boxShadow: '0 1px 6px rgba(16,185,129,0.15)',
        },
        // brand styleOverride using palette.gradients is in defaultJadeEnhanced
        list: {},
        item: {},
        link: {
          color: '#86c4a0',
          '&:hover': { color: '#d9f2e6' },
          '&[data-active="true"]': { color: '#10b981' },
        },
        underline: {
          backgroundColor: '#10b981',
        },
      },
    },

    ProjectsOverviewCmp: {
      // styleOverrides using palette.gradients are in defaultJadeEnhanced
    },

    ScrollBarCmp: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255,255,255,0.10)',
        },
        thumb: {
          backgroundColor: 'rgba(16,185,129,0.40)',
        },
      },
    },

    CardTabsCmp: {
      styleOverrides: {
        header: {
          background: 'linear-gradient(to right, #0f2d1c, #112418)',
        },
content: {
          background: 'linear-gradient(to bottom, #0f2d1c, #0a2014)',
        },
      },
    },
  },
};

export const defaultJadeEnhanced: RegisteredTheme["enhance"] = (base: Theme): ThemeOptions => ({
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
          background: 'linear-gradient(135deg, #0f2d1c 0%, #112418 100%)',
          boxShadow: '0 1px 8px rgba(0,0,0,0.25)',
        },
      },
    },
  },
});
