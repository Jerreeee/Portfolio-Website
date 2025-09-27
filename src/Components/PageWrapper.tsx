'use client';

import { ReactNode } from 'react';
import { useTheme } from 'Themes/ThemeProvider';
import NavbarCmp from '@/Themes/Default/Components/Navbar/Navbar';

export function PageWrapper({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  console.log("Navbar height: ", theme.components?.Navbar?.defaultProps?.height);
  return (
    <div>
      <NavbarCmp navItems={ [
        { href: '/projects', label: 'Projects' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
        { href: '/resume', label: 'Resume' },
      ]}
      />
      <div
        style={{ paddingTop: theme.components?.Navbar?.defaultProps?.height }}
      />
      {children}
    </div>
  );
}
