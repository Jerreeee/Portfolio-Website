'use client';

import React, { useMemo } from 'react';
import { useTheme, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ProjectInfo } from '@/Data/Projects/project';
import { themeExtensions } from '@/Data/Projects/themeExtensions';

export default function ProjectDetailsClient({ project }: { project: ProjectInfo }) {
  const ProjectComponent = project.component;
  const baseTheme = useTheme();
  const themeExt = themeExtensions[project.slug];

  const projectTheme = useMemo(
    () => (themeExt ? createTheme(baseTheme, themeExt(baseTheme)) : null),
    [baseTheme, themeExt],
  );

  const content = (
    <div data-project={project.slug}>
      <ProjectComponent project={project} />
    </div>
  );

  if (projectTheme) {
    return (
      <ThemeProvider theme={projectTheme}>
        <CssBaseline />
        {content}
      </ThemeProvider>
    );
  }

  return content;
}
