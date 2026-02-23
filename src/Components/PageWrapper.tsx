'use client';

import { ReactNode } from 'react';
import { useAppTheme, useComponents } from '../Themes/ThemeProvider';
import PATHS from '@/Config/paths';

export function PageWrapper({ children }: { children: ReactNode }) {
  const { theme } = useAppTheme();
  const { NavbarCmp } = useComponents();

  return (
    <>
      <NavbarCmp navItems={ [
        { href: PATHS.PAGE({page: 'projects'}).url().value, label: 'Projects' },
        { href: PATHS.PAGE({page: 'about'}).url().value, label: 'About' },
        { href: PATHS.PAGE({page: 'resume'}).url().value, label: 'Resume' },
      ]}
      />
      <div
        style={{ paddingTop: theme.components?.NavbarCmp?.defaultProps?.height }}
      />
      {children}
    </>
  );
}
