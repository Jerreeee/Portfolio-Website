'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

import {
  themeRegistry,
  type Theme,
  type ThemeName,
} from '@/Themes';

type ThemeContextType = {
  theme: Theme;
  setThemeByName: (name: ThemeName) => void;
  currentThemeName: ThemeName;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentThemeName, setCurrentThemeName] = useState<ThemeName>('Dark');

  const setThemeByName = (name: ThemeName) => {
    if (themeRegistry[name]) {
      setCurrentThemeName(name);
    } else {
      console.warn(`Theme "${name}" is not registered.`);
    }
  };

  const theme = themeRegistry[currentThemeName];

  return (
    <ThemeContext.Provider value={{ theme, setThemeByName, currentThemeName }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
