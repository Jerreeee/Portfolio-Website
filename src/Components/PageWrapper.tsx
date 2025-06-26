'use client';

import { ReactNode } from 'react';
import { useTheme } from '@/Themes/ThemeProvider';

export function PageWrapper({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.foreground,
        minHeight: '100vh', // Ensures full background
      }}
    >
      {children}
    </div>
  );
}
