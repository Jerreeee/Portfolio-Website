'use client';

import { useTheme } from '@/ThemeProvider';
import { ReactNode } from 'react';

interface ThemeAwareProps {
  children: ReactNode;
  className?: string;
  darkClassName?: string;
  lightClassName?: string;
}

export function ThemeAware({ 
  children, 
  className = '', 
  darkClassName = '', 
  lightClassName = '' 
}: ThemeAwareProps) {
  const { resolvedTheme } = useTheme();
  
  const themeClass = resolvedTheme === 'dark' ? darkClassName : lightClassName;
  const combinedClassName = `${className} ${themeClass}`.trim();
  
  return (
    <div className={combinedClassName}>
      {children}
    </div>
  );
} 