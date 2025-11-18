//mui
import { ThemeOptions, Theme } from '@mui/material/styles';

//custom
import { defaultDarkBase, defaultDarkEnhanced } from './Default/Variations/Dark';

export interface RegisteredTheme {
  base: ThemeOptions;
  enhance?: (base: Theme) => ThemeOptions;
}

export const themeRegistry: Record<string, Record<string, RegisteredTheme>> = {
  Default: {
    Dark: {
      base: defaultDarkBase,
      enhance: defaultDarkEnhanced
    },
  },
};

export type ThemeName = keyof typeof themeRegistry;
