'use client';

import { useTheme } from '@/Themes/ThemeProvider';

export default function ProjectsPage() {
  const { theme } = useTheme();
  const ThemedProjectPage = theme.pages.ProjectPage;

  return <ThemedProjectPage />;
}
