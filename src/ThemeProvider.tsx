'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// Theme registry: just an array of theme names (should match folder names in public/Themes)
export const themeNames = ['Dark', 'Light'];
export type Theme = typeof themeNames[number];

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getStoredTheme = (): Theme | null => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('theme');
  if (stored && themeNames.includes(stored as Theme)) return stored as Theme;
  return null;
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(themeNames[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = getStoredTheme();
    if (storedTheme) setThemeState(storedTheme);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const link = document.getElementById('theme-link') as HTMLLinkElement;
    if (link) {
      link.href = `/Themes/${theme}/theme.css`;
    }
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    if (themeNames.includes(newTheme)) {
      setThemeState(newTheme);
    }
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: themeNames }}>
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
