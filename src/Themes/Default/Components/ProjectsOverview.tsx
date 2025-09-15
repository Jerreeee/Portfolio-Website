'use client';

import { projects } from '@/data/projects';
import { FaArrowDown } from 'react-icons/fa';
import { useTheme } from '@/Themes/ThemeProvider';
import { motion } from 'motion/react';
import { anims } from '@/Themes/Default/animations';
import { mergeVariants, mergeAnims } from '@/Utils/MergeObjects';
import { constructCSSVarsFromTheme } from '@/Utils/ConstructCSSVarsFromTheme';

export type ProjectsOverviewTheme = {
  // Background styling for the entire projects overview section
  sectionBgColor: string;
  sectionBgGradientStart: string;
  sectionBgGradientEnd: string;

  // Gradient used for the "Featured" title
  titleGradientStart: string;
  titleGradientMid: string;
  titleGradientEnd: string;

  // Styling for the "All Projects" fixed button
  ctaButtonBgColor: string;
  ctaButtonTextColor: string;
};

export function ProjectsOverviewCmp() {
  const { theme: activeTheme } = useTheme();
  const theme = activeTheme.components.projectsOverview.theme;

  const gradientText = {
    background: `linear-gradient(135deg, ${theme.titleGradientStart} 0%, ${theme.titleGradientMid} 50%, ${theme.titleGradientEnd} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };
  
  const backgroundGradient = {
    background: `linear-gradient(to bottom, ${theme.sectionBgGradientStart}, ${theme.sectionBgGradientEnd})`,
  };

  const ProjectCardCmp = activeTheme.components.projectCard.cmp;

  return (
    <main
      className="w-full pt-5 min-h-screen"
      style={backgroundGradient}
    >
      <motion.div className="w-full sm:w-[70%] mx-auto">
        <motion.h1
          className="text-4xl text-center font-bold"
          {...mergeAnims(true, anims.fadeInUp())}
        >
          <span style={gradientText}>Featured</span>
        </motion.h1>

        <motion.div
          className="grid gap-6 mt-4 grid-cols-1 md:grid-cols-2"
          {...mergeAnims(true, anims.staggerChildren(0.2))}
        >
          {projects.map((project) => (
            <motion.div key={project.slug} {...mergeAnims(false, anims.fadeInUp())}>
              <ProjectCardCmp project={project} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </main>
  );
}
