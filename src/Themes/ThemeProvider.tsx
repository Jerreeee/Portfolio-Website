'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createTheme, Theme, ThemeOptions } from '@mui/material/styles';
import { ThemeProvider as MuiThemeProvider, CssBaseline as MuiCssBaseline } from '@mui/material';
import { themeRegistry, ThemeName, VariationName, RegisteredTheme } from './index';
import { globalBase } from './globalBase';
import { defaultComponentRegistry, ComponentRegistry } from './componentRegistry';

interface ThemeID {
  name: ThemeName;
  variation: VariationName<ThemeName>;
}

const DEFAULT_THEME: ThemeID = { name: 'Default', variation: 'Dark' };

interface ThemeContextValue {
  themeID: ThemeID;
  theme: Theme;
  components: ComponentRegistry;
  setTheme: (themeID: ThemeID) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeID, setTheme] = useState<ThemeID>(DEFAULT_THEME);

  // Restore persisted theme after mount (localStorage is not available during SSR)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved) {
        const parsed = JSON.parse(saved) as ThemeID;
        if (themeRegistry[parsed.name]?.variations[parsed.variation]) {
          setTheme(parsed);
        }
      }
    } catch {
      // Ignore parse errors or unavailable localStorage
    }
  }, []);

  // Persist theme selection
  useEffect(() => {
    try {
      localStorage.setItem('theme', JSON.stringify(themeID));
    } catch {
      // Ignore unavailable localStorage
    }
  }, [themeID]);

  // 4-layer merge: globalBase → family.shared → variation.base → variation.enhance(base)
  const family = themeRegistry[themeID.name];
  const themeEntry: RegisteredTheme = family.variations[themeID.variation];

  const t1 = createTheme(globalBase);
  const t2 = family.shared ? createTheme(t1, family.shared) : t1;
  const t3 = createTheme(t2, themeEntry.base);
  const theme = themeEntry.enhance ? createTheme(t3, themeEntry.enhance(t3)) : t3;

  // Merge theme-specific component overrides over the defaults
  const components: ComponentRegistry = {
    ...defaultComponentRegistry,
    ...(themeEntry.components ?? {}),
  };

  return (
    <ThemeContext.Provider value={{ themeID, theme, components, setTheme }}>
      <MuiThemeProvider theme={theme}>
        <MuiCssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useAppTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useAppTheme must be inside ThemeProvider');
  return ctx;
};

/** Convenience hook — returns the resolved component implementations for the active theme. */
export const useComponents = () => useAppTheme().components;
