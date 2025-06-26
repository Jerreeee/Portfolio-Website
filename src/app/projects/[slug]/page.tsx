import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/data/projects';
import { ProjectLayout } from '@/Components/ProjectLayout';

export default function ProjectDetailPage({ params }) {
  const { slug } = params;

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
