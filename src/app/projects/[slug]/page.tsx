  import { notFound } from 'next/navigation';
  import { projects, getProjectBySlug } from '@/data/projects';
  import ProjectDetailsClient from './ProjectDetailsClient';

  export async function generateStaticParams(): Promise<{ slug: string }[]> {
    return projects.map((p) => ({ slug: p.slug }));
  }

  export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const project = getProjectBySlug(slug);
    if (!project)
      return notFound();

    const mod = await import(`@/data/projects/${slug}/manifest`);
    project.manifest = mod.projectManifest;

    {/* Wrapping everything in a client side component. Otherwise generateStaticParams
    wouldnt work because it needs to run on the server/at build time for SSG (static site generation). */}
    return <ProjectDetailsClient project={project} />;
  }
