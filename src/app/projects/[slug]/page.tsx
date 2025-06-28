import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/data/projects';
import { ProjectLayout } from '@/Themes/Default/Components/ProjectLayout';
import { projects } from '@/data/projects';

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
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
