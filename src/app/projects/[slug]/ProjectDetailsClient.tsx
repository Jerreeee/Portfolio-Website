  'use client';

  import { useTheme } from '@/Themes/ThemeProvider';

export default function ProjectDetailsClient({ project }: { project: any }) {
  // Each project provides its own component
  const ProjectComponent = project.Component;

  if (!ProjectComponent)
    return <p>No project details available.</p>;

  return <ProjectComponent />;
}
