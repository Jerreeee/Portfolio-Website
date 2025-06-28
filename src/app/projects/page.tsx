'use client';

import { useTheme } from '@/Themes/ThemeProvider';

export default function ProjectsPage() {
  const { theme } = useTheme();
  const ProjectsOverviewCmp = theme.components.projectsOverview.cmp;

  return <ProjectsOverviewCmp />;
}
