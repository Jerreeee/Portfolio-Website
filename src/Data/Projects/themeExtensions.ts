import type { Theme, ThemeOptions } from '@mui/material/styles';

import { themeExtension as PythonHoudiniTrackToolTheme } from './PythonHoudiniTrackTool/theme';

export const themeExtensions: Record<string, (base: Theme) => ThemeOptions> = {
  PythonHoudiniTrackTool: PythonHoudiniTrackToolTheme,
};
