'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { themeRegistry, type Theme, type ThemeName } from '@/Themes';

// If you still want base + variation types, keep them
export type ThemeBase = 'Default';
export type ThemeVariation = 'Dark';

interface ThemeIdentifier {
  base: ThemeBase;
  variation: ThemeVariation;
}

// Context exposes full Theme object + base/variation identifiers
interface ThemeContextType {
  theme: Theme & ThemeIdentifier;
  setTheme: (theme: ThemeIdentifier) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeId, setThemeId] = useState<ThemeIdentifier>({
    base: 'Default',
    variation: 'Dark'
  });

  // Build the full theme object expected by components
  const theme: Theme & ThemeIdentifier = {
    ...themeRegistry[themeId.variation], // or adapt if your registry is organized differently
    base: themeId.base,
    variation: themeId.variation
  };

  useEffect(() => {
    const globalHref = `/themes/${themeId.base}/generalStyle.css`;
    ensureLink('theme-global-style', globalHref);

    const variationHref = `/themes/${themeId.base}/Variations/${themeId.variation}/index.css`;
    ensureLink('theme-variation-style', variationHref);

    // Add the theme class to the html element
    const htmlEl = document.documentElement;
    // remove any old theme classes (optional if you plan multiple themes)
    htmlEl.classList.forEach(cls => {
      if (cls.startsWith('theme-')) htmlEl.classList.remove(cls);
    });
    htmlEl.classList.add(`theme-${themeId.variation.toLowerCase()}`);
  }, [themeId]);

  const ensureLink = (id: string, href: string) => {
    let linkEl = document.getElementById(id) as HTMLLinkElement | null;
    if (!linkEl) {
      linkEl = document.createElement('link');
      linkEl.id = id;
      linkEl.rel = 'stylesheet';
      document.head.appendChild(linkEl);
    }
    linkEl.href = href;
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeId }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
};
