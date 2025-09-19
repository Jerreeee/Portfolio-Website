'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
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
  const theme = themeRegistry[currentThemeName];

  const setThemeByName = (name: ThemeName) => {
    if (themeRegistry[name]) {
      setCurrentThemeName(name);
    } else {
      console.warn(`Theme "${name}" is not registered.`);
    }
  };

   useEffect(() => {
    const href = `/themes/${currentThemeName.toLowerCase()}.css`;

    let linkEl = document.getElementById('theme-style') as HTMLLinkElement | null;
    if (!linkEl) {
      linkEl = document.createElement('link');
      linkEl.id = 'theme-style';
      linkEl.rel = 'stylesheet';
      document.head.appendChild(linkEl);
    }
    linkEl.href = href;
  }, [currentThemeName]);

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
