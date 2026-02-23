//mui
import { Theme, ThemeOptions } from '@mui/material/styles';

//custom
import { RegisteredTheme } from '@/Themes';

export const defaultDarkBase: ThemeOptions = {
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
      primary: '#e0e0e0',
      secondary: '#b0b0b0',
    },
    divider: 'rgba(255,255,255,0.12)',

    gradients: {
      primary: (dir = "135deg") => `linear-gradient(${dir}, #3fa0ff 0%, #7b72f0 50%, #ec38bc 100%)`,
      background: (dir = "to bottom") => `linear-gradient(${dir}, #151a2c, #221730)`,
      subtle: (dir = "135deg") => `linear-gradient(${dir}, rgba(255,255,255,0.05), rgba(0,0,0,0.05))`,
      h1: (dir = '135deg') => `linear-gradient(${dir}, #3fa0ff 0%, #7b72f0 50%, #ec38bc 100%)`,
    },
  },

  components: {
    IconCmp: {
      defaultProps: {
        convertToGrayScale: true,
        grayScaleIconColor: '#FF0000',
      },
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
          height: 30,
        },
      },
    },
    NavbarCmp: {
      styleOverrides: {
        root: {
          backgroundColor: '#141418',
          borderBottom: '1px solid #3fa0ff',
        },
        // brand styleOverride using palette.gradients is in defaultDarkEnhanced
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
    },
    ProjectsOverviewCmp: {
      // styleOverrides using palette.gradients are in defaultDarkEnhanced
    },
  },
};

export const defaultDarkEnhanced: RegisteredTheme["enhance"] = (base: Theme): ThemeOptions => ({
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
