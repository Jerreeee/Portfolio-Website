'use client';

import { ReactNode } from 'react';
import { useTheme } from 'Themes/ThemeProvider';
import { projects } from '@/data/projects';
import ProjectCardCmp from '@/Themes/Default/Components/ProjectCard/ProjectCard'

export function PageWrapper({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  // const NavbarCmp = theme.components.navbar.cmp;

  return (
    <div
      // style={{
      //   backgroundColor: theme.colors.background,
      //   color: theme.colors.foreground,
      //   minHeight: '100vh',
      // }}
    >
      {/* <div className="fixed top-0 left-0 w-full z-50">
        <NavbarCmp />
      </div> */}
      {/* <div className="pt-[60px]">
        {children}
      </div> */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px',
          padding: '24px',
        }}
      >
        {projects.map((project) => (
          <ProjectCardCmp key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
