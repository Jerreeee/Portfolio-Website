import { ProjectCard } from '@/Components/ProjectCard';
import { projects } from '@/data/projects';
import { FaArrowDown } from 'react-icons/fa';

export default function ProjectsPage() {
  return (
    <>
      <main className="w-full sm:w-[70%] mx-auto p-4">
        <h1 className="text-3xl text-center font-bold text-[var(--foreground)]">Featured</h1>
        <div className="grid gap-6 mt-4 grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </main>

      {/* Fixed Button at the Left-Bottom */}
      <a
        href="#all-projects"
        className="
          fixed left-4 bottom-4 flex items-center space-x-2
          rounded-full px-4 py-2
          bg-[var(--foreground)] text-[var(--background)]
          hover:opacity-80 transition-opacity
        "
      >
        <span>All Projects</span>
        <FaArrowDown />
      </a>

      {/* The target section somewhere in your page */}
      <section id="all-projects" className="mt-16">
        {/* All Projects Section goes here */}
      </section>
    </>
  );
}
