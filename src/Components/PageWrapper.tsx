'use client';

import { ReactNode } from 'react';
import { useTheme } from '../Themes/ThemeProvider';
import NavbarCmp from '@/Themes/Default/Components/Navbar/NavbarCmp';
import PATHS from '@/Config/paths';

export function PageWrapper({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  return (
    <div>
      <NavbarCmp navItems={ [
        { href: PATHS.PAGE({page: 'projects'}).url().value, label: 'Projects' },
        { href: PATHS.PAGE({page: 'about'}).url().value, label: 'About' },
        { href: PATHS.PAGE({page: 'contact'}).url().value, label: 'Contact' },
        { href: PATHS.PAGE({page: 'resume'}).url().value, label: 'Resume' },
      ]}
      />
      <div
        style={{ paddingTop: theme.components?.NavbarCmp?.defaultProps?.height }}
      />
      {children}
    </div>
  );
}
