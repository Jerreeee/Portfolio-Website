'use client';

import { ProjectCardCmp } from '@/Themes/Default/Components/ProjectCard';
import { projects } from '@/data/projects';
import { FaArrowDown } from 'react-icons/fa';
import { useTheme } from '@/Themes/ThemeProvider';
import { motion } from 'motion/react';
import { anims } from '@/Themes/Default/animations';

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
        <motion.h1 className="text-3xl text-center font-bold"
        style={{ color: projectsOverviewTheme.foreground }}
        variants={anims.fadeInUp()}
        initial="initial" animate="animate"
        >
          Featured
        </motion.h1>

        <motion.div className="grid gap-6 mt-4 grid-cols-2"
        variants={anims.staggerChildren(0.15)}
        initial="initial" animate="animate"
        >
          {projects.map((project) => (
            <motion.div key={project.slug} variants={anims.fadeInUp()}>
              <ProjectCardCmp project={project} />
            </motion.div>
          ))}
        </motion.div>
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
