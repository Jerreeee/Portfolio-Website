//mui
import { Theme, ThemeOptions } from '@mui/material/styles';

//custom
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

  components: {
    IconCmp: {
      defaultProps: {
        convertToGrayScale: false,
      },
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
          height: 30,
        },
      },
    },
    NavbarCmp: {
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
    },
    ProjectsOverviewCmp: {
      // styleOverrides using palette.gradients are in defaultLightEnhanced
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
