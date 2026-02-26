'use client';

import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { projects, getProjectBySlug } from '@/Data/Projects';
import { projectOrderings } from '@/Data/Projects/projectOrdering';
import ProjectCardCmp from '@/Themes/Default/Components/ProjectCard/ProjectCardCmp';
import { useAppTheme } from '@/Themes/ThemeProvider';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { projectsOverviewCmp } from './ProjectsOverviewCmpClasses';
import type { ValidProjectSlug } from '@/Data/Projects';

// =====================================================================
// Slot Definitions
// =====================================================================

const makeSlot = makeSlotFactory('ProjectsOverviewCmp', projectsOverviewCmp);

const ProjectsOverviewRoot = makeSlot('div', 'root')(({ theme }) => ({
  width: '100%',
}));

const ProjectsOverviewContainer = makeSlot(motion.main, 'container')(({ theme }) => ({
  maxWidth: '92%',
  margin: '0 auto',
  [theme.breakpoints.up('md')]: {
    maxWidth: '70%',
  },
}));

const ProjectsOverviewHeader = makeSlot(motion.div, 'header')(({ theme }) => ({
  textAlign: 'center',
}));

const ProjectsOverviewGrid = makeSlot(motion.div, 'grid')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  gridTemplateColumns: '1fr',
}));

const ProjectsOverviewCardWrapper = makeSlot(motion.div, 'cardWrapper')({
  width: '100%',
  minWidth: 0,
});

// =====================================================================
// Component
// =====================================================================

export interface ProjectsOverviewCmpProps {
  order: string;
}

export interface ProjectsOverviewCmpSettings {}

export default function ProjectsOverviewCmp({ order: key }: ProjectsOverviewCmpProps) {
  const { theme } = useAppTheme();

  // -----------------------------------------------------
  // Determine ordering
  // -----------------------------------------------------

  let orderedProjects;

  if (key === 'default') {
    // Use full list as-is
    orderedProjects = projects;

  } else if (key in projectOrderings) {
    const slugs = projectOrderings[key]; // ValidProjectSlug[]

    const orderedFirst = slugs
      .map((slug) => getProjectBySlug(slug))
      .filter((p): p is NonNullable<typeof p> => p !== undefined);

    const orderedSlugsSet = new Set(slugs);

    const remainingProjects = projects.filter(
      (p) => !orderedSlugsSet.has(p.slug as ValidProjectSlug),
    );

    orderedProjects = [...orderedFirst, ...remainingProjects];

  } else {
    // Unknown key → default order
    orderedProjects = projects;
  }

  return (
    <ProjectsOverviewRoot>
      <ProjectsOverviewContainer>
        <ProjectsOverviewHeader>
          <Typography variant="h1">Featured</Typography>
        </ProjectsOverviewHeader>

        <ProjectsOverviewGrid>
          {orderedProjects.map((project, i) => (
            <ProjectsOverviewCardWrapper key={project.slug} custom={i}>
              <ProjectCardCmp project={project} />
            </ProjectsOverviewCardWrapper>
          ))}
        </ProjectsOverviewGrid>
      </ProjectsOverviewContainer>
    </ProjectsOverviewRoot>
  );
}
