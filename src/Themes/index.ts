//mui
import { ThemeOptions } from '@mui/material/styles';

//custom
import { defaultDarkOptions } from './Default/Variations/Dark';

export const themeRegistry: Record<string, Record<string, ThemeOptions>> = {
  Default: {
    Dark: defaultDarkOptions,
  },
};
