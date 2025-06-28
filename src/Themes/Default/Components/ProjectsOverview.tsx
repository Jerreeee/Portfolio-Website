'use client';

import { ProjectCardCmp } from '@/Themes/Default/Components/ProjectCard';
import { projects } from '@/data/projects';
import { FaArrowDown } from 'react-icons/fa';
import { useTheme } from '@/Themes/ThemeProvider';

export type ProjectsOverviewTheme = {
  background: string;
  foreground: string;
  highlight: string;
};


export function ProjectsOverviewCmp() {
  const { theme } = useTheme();
  const projectsOverviewTheme = theme.components.projectsOverview.theme;

  return (
    <>
      <main className="w-full sm:w-[70%] mx-auto p-4">
        <h1 className="text-3xl text-center font-bold"
        style={{ color: projectsOverviewTheme.foreground }}
        >
          Featured
        </h1>

        <div className="grid gap-6 mt-4 grid-cols-2">
          {projects.map((project) => (
            <ProjectCardCmp key={project.slug} project={project} />
          ))}
        </div>
      </main>

      <a
        href="#all-projects"
        className="fixed left-4 bottom-4 flex items-center space-x-2 rounded-full px-4 py-2 hover:opacity-80 transition-opacity"
        style={{
          backgroundColor: projectsOverviewTheme.foreground,
          color: projectsOverviewTheme.background,
        }}
      >
        <span>All Projects</span>
        <FaArrowDown />
      </a>

      <section id="all-projects" className="mt-16">
        {/* All Projects Section goes here */}
      </section>
    </>
  );
}
