'use client';

import { ReactNode } from 'react';
import { useTheme } from '@/Themes/ThemeProvider';

export function PageWrapper({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  const NavbarCmp = theme.components.navbar.cmp;

  return (
    <div
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.foreground,
        minHeight: '100vh', // Ensures full background
      }}
    >
            <div className="sticky top-0 z-50">
              <NavbarCmp />
            </div>
            <div className="pt-4">
              {children}
            </div>
    </div>
  );
}
