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

export interface ProjectsOverviewProps {}

export function ProjectsOverviewCmp(props: ProjectsOverviewProps) {
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
  const H1 = activeTheme.components.h1.cmp;

  return (
    <main
      className="w-full min-h-screen"
      style={backgroundGradient}
    >
      <motion.div className="w-full sm:w-[70%] mx-auto">
        <motion.div style={{marginBottom: "0px", marginTop: '0px'}} {...mergeAnims(true, anims.fadeInUp())} >
          <div className="text-center">
            <span style={gradientText}>
              <H1 style={{style: {...gradientText, display: 'inline-block'}}} >
                Featured
              </H1>
            </span>
          </div>
        </motion.div>

        <motion.div
          className="grid gap-6 grid-cols-1 md:grid-cols-2"
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
