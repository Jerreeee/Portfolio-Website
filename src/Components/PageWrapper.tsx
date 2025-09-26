'use client';

import { ReactNode } from 'react';
import { useTheme } from 'Themes/ThemeProvider';
import { projects } from '@/data/projects';
import ProjectCardCmp from '@/Themes/Default/Components/ProjectCard/ProjectCard'
import NavbarCmp from '@/Themes/Default/Components/Navbar/Navbar';

export function PageWrapper({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  return (
    <>
      <NavbarCmp />
      {children}
    </>
  );
}
