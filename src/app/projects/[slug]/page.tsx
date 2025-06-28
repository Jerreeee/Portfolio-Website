'use client';

import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/data/projects';
import { useTheme } from '@/Themes/ThemeProvider';

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { theme } = useTheme();
  const ProjectLayout = theme.pages.ProjectLayout;

  const project = getProjectBySlug(slug);
  if (!project) {
    return notFound();
  }

  return (
    <main className="w-full sm:w-[70%] mx-auto p-4">
      <ProjectLayout project={project} />
    </main>
  );
}
