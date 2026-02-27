//mui
import { Theme, ThemeOptions } from '@mui/material/styles';

//custom
import { RegisteredTheme } from '@/Themes';
import { threeStopGrad } from '../themeUtils';

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
  },
};

export const defaultDarkEnhanced: RegisteredTheme["enhance"] = (base: Theme): ThemeOptions => {
  const { primary, secondary } = base.palette;
  const primaryGrad = threeStopGrad(primary.main, '#c8a8f0', secondary.main);
  const bgGrad      = (dir = 'to bottom') => `linear-gradient(${dir}, #151a2c, #221730)`;

  return {
    palette: {
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
      ProjectCardCmp: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.palette.background.paper,
            position: 'relative',
            '&:hover': {
              backgroundColor: '#2c2c2c',
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
            backgroundColor: '#141418',
            borderBottom: `1px solid ${theme.palette.primary.main}`,
          }),
          link: ({ theme }) => ({
            color: '#888888',
            '&:hover': { color: '#d0d0d0' },
            '&[data-active="true"]': { color: theme.palette.primary.main },
          }),
          underline: ({ theme }) => ({
            backgroundColor: theme.palette.primary.main,
          }),
        },
      },

      ScrollBarCmp: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.palette.divider,
          }),
          thumb: ({ theme }) => ({
            backgroundColor: 'rgba(255,255,255,0.50)',
          }),
        },
      },

      CardTabsCmp: {
        styleOverrides: {
          header: ({ theme }) => ({
            backgroundColor: '#0d0d12',
          }),
          content: ({ theme }) => ({
            backgroundColor: theme.palette.background.paper,
          }),
        },
      },
    },
  };
};
