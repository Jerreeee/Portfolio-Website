'use client';

import { useTheme } from '@/Themes/ThemeProvider';
import ProjectsOverviewCmp from '@/Themes/Default/Components/ProjectsOverview/ProjectsOverview';

export default function ProjectsPage() {
  const { theme } = useTheme();

  return <ProjectsOverviewCmp />;
}
