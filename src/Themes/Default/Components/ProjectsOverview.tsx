'use client';

import { projects } from '@/data/projects';
import { Component } from '@/Themes/BaseTheme';
import { useTheme } from '@/Themes/ThemeProvider';
import { motion } from 'motion/react';
import { anims } from '@/Themes/Default/animations';
import { mergeAnims } from '@/Utils/MergeObjects';
import { ProjectCardCmp } from './ProjectCard';
import { H1 } from './Generic/Text';

export type ProjectsOverviewSettings = {};

export interface ProjectsOverviewProps {}

export const ProjectsOverviewCmp = ProjectsOverviewCmpInternal as Component<
  ProjectsOverviewSettings,
  ProjectsOverviewProps
>;

function ProjectsOverviewCmpInternal(_: ProjectsOverviewProps) {
  const { theme: activeTheme } = useTheme();
  const settings: ProjectsOverviewSettings =
    activeTheme.components.projectsOverview?.settings;
  if (!settings) return null;

  return (
    <motion.div
      className="projects-overview w-full sm:w-[70%] mx-auto min-h-screen"
      {...mergeAnims(true, anims.fadeInUp())}
    >
      {/* Section Title */}
      <div className="projects-overview__header text-center">
        <H1 style={{className: "projects-overview__title"}}>Featured</H1>
      </div>

      {/* Project Grid */}
      <motion.div
        className="projects-overview__grid grid gap-6 grid-cols-1 md:grid-cols-2"
        {...mergeAnims(true, anims.staggerChildren(0.2))}
      >
        {projects.map((project) => (
          <motion.div
            key={project.slug}
            {...mergeAnims(false, anims.fadeInUp())}
          >
            <ProjectCardCmp project={project} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
