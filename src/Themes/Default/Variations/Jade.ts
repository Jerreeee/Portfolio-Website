//mui
import { Theme, ThemeOptions } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

//custom
import { RegisteredTheme } from '@/Themes';
import { threeStopGrad } from '../themeUtils';

export const defaultJadeBase: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#10b981', // vivid emerald
      light: '#34d399',
      dark: '#059669',
    },
    secondary: {
      main: '#fbbf24', // bright amber-gold
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
  },

  components: {
    ProjectCardCmp: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, #112818 100%)`,
          boxShadow: '0 2px 8px rgba(0,0,0,0.35)',
          position: 'relative',
          '&:hover': {
            background: 'linear-gradient(145deg, #163d26 0%, #143322 100%)',
          },
        }),
        header: ({ theme }) => ({
          color: theme.palette.text.primary,
        }),
      },
    },

    NavbarCmp: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: `linear-gradient(to right, ${theme.palette.background.paper} 0%, #0c2418 100%)`,
          borderBottom: `1px solid ${theme.palette.primary.main}`,
          boxShadow: `0 1px 6px ${alpha(theme.palette.primary.main, 0.15)}`,
        }),
        // brand styleOverride using palette.gradients is in defaultJadeEnhanced
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
      // styleOverrides using palette.gradients are in defaultJadeEnhanced
    },

    ScrollBarCmp: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255,255,255,0.10)',
        },
        thumb: ({ theme }) => ({
          backgroundColor: alpha(theme.palette.primary.main, 0.40),
        }),
      },
    },

    CardTabsCmp: {
      styleOverrides: {
        header: ({ theme }) => ({
          background: `linear-gradient(to right, ${theme.palette.background.paper}, #112418)`,
        }),
        content: ({ theme }) => ({
          background: `linear-gradient(to bottom, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
        }),
      },
    },
  },
};

export const defaultJadeEnhanced: RegisteredTheme["enhance"] = (base: Theme): ThemeOptions => {
  const { primary, secondary, background } = base.palette;
  const primaryGrad = threeStopGrad(primary.main, '#0891b2', secondary.main);
  const bgGrad      = (dir = 'to bottom') => `linear-gradient(${dir}, ${background.default}, #081810)`;

  return {
    palette: {
      divider: alpha(primary.main, 0.18),
      gradients: {
        primary:    primaryGrad,
        background: bgGrad,
      },
    },
    typography: {
      gradientH1: {
        ...base.typography.h1,
        background: primaryGrad(),
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline-block",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background: `linear-gradient(160deg, ${background.default} 0%, #0c1f10 100%)`,
            backgroundAttachment: 'fixed',
            minHeight: '100vh',
          },
        },
      },
      NavbarCmp: {
        styleOverrides: {
          brand: {
            '& .MuiTypography-root': {
              display: 'inline-block',
              background: primaryGrad(),
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            },
          },
        },
      },
      ProjectsOverviewCmp: {
        styleOverrides: {
          root: {
            background: bgGrad(),
          },
          header: {
            textAlign: 'center',
            '& .MuiTypography-root': {
              display: 'inline-block',
              background: primaryGrad(),
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            },
          },
        },
      },
      ProjectOverviewCmp: {
        styleOverrides: {
          textBox: {
            background: `linear-gradient(135deg, ${background.paper} 0%, #112418 100%)`,
            boxShadow: '0 1px 8px rgba(0,0,0,0.25)',
          },
        },
      },
    },
  };
};
