import { notFound } from 'next/navigation';
import { projects, getProjectBySlug } from '@/data/projects';
import ProjectDetailsClient from './ProjectDetailsClient';

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const project = getProjectBySlug(slug);
  if (!project)
    return notFound();

  return (
    <main className="w-full sm:w-[70%] mx-auto p-4">
      {/* Wrapping everything in a client side component. Otherwise generateStaticParams
      wouldnt work because it needs to run on the server. */}
      <ProjectDetailsClient project={project} />
    </main>
  );
}
