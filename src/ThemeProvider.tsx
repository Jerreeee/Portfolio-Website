'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'Dark' | 'Light';

interface ThemeContextType {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('Dark');

  useEffect(() => {
    const link = document.getElementById('theme-link') as HTMLLinkElement;
    if (link) {
      link.href = `/Themes/${theme}/theme.css`;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
