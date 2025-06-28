import { notFound } from 'next/navigation';
import { getProjectBySlug, projects } from '@/data/projects';
import ThemedProjectDetailsCmp from '@/Themes/Default/Components/ProjectDetails';

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
      <ThemedProjectDetailsCmp project={project} />
    </main>
  );
}
