//mui
import { ThemeOptions } from '@mui/material/styles';

//custom
import { mergeVariants, mergeAnims } from '@/utils/MergeObjects';
import { anims } from '@/Themes/Default/animations';

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
    h1: { fontWeight: 500, fontSize: '2.5rem' },
    h2: { fontWeight: 500, fontSize: '2rem' },
    h3: { fontWeight: 500, fontSize: '1.75rem' },
    h6: { fontWeight: 900, fontSize: '1rem' },
    body1: { fontSize: '1rem' },
    body2: { fontSize: '0.875rem' },
  },

  shape: {
    borderRadius: 8,
  },

  components: {
    //Global MUI overrides
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    Icon: {
      defaultProps: {
        techName: '',
        convertToGrayScale: true,
        grayScaleIconColor: '#FF0000',
      }
    },
    ProjectCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
          '&:hover': {
            backgroundColor: '#2c2c2c',
          },
        },
        header: {
          color: '#fff',
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
  },
};  
