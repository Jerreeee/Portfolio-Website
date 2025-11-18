'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { createTheme, Theme, ThemeOptions } from '@mui/material/styles';
import { StyledEngineProvider as MuiStyledEngineProvider, ThemeProvider as MuiThemeProvider, CssBaseline as MuiCssBaseline } from '@mui/material';
import { themeRegistry } from './index';

interface ThemeID {
  name: string;
  variation: string;
}

interface ThemeContextValue {
  themeID: ThemeID;
  theme: Theme;
  setTheme: (themeID: ThemeID) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [themeID, setThemeID] = useState({
      name: 'Default',
      variation: 'Dark',
    });

  const setTheme = (themeID: ThemeID) => setThemeID(themeID);

  const themeEntry = themeRegistry[themeID.name][themeID.variation];
  const baseTheme = createTheme(themeEntry.base);
  const theme = themeEntry.enhance
    ? createTheme(baseTheme, themeEntry.enhance(baseTheme))
    : baseTheme;

  return (
    <ThemeContext.Provider value={{ themeID, theme, setTheme }}>
      <MuiStyledEngineProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <MuiCssBaseline />
          {children}
        </MuiThemeProvider>
      </MuiStyledEngineProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider');
  return ctx;
};
