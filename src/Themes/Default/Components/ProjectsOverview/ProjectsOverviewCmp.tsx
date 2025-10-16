'use client';

import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { projects } from '@/Data/Projects';
import ProjectCardCmp from '@/Themes/Default/Components/ProjectCard/ProjectCardCmp';
import { useTheme } from '@/Themes/ThemeProvider'
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { projectsOverviewCmp } from './ProjectsOverviewCmpClasses';

// =====================================================================
// ========================= Slot Definitions ==========================

const makeSlot = makeSlotFactory('ProjectsOverviewCmp', projectsOverviewCmp);

const ProjectsOverviewRoot = makeSlot('div', 'root')(({ theme }) => ({
  width: '100%',
}));

const ProjectsOverviewContainer = makeSlot(motion.main, 'container')(({ theme }) => ({
  maxWidth: '70%',
  margin: '0 auto',
}));

const ProjectsOverviewHeader = makeSlot(motion.div, 'header')(({ theme }) => ({
  textAlign: 'center',
  //   marginTop: theme.spacing(4),
  // paddingTop: theme.components?.NavbarCmp?.defaultProps?.height,
  // paddingBottom: 200,
}));

const ProjectsOverviewGrid = makeSlot(motion.div, 'grid')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '1fr 1fr',
  },
}));

const ProjectsOverviewCardWrapper = makeSlot(motion.div, 'cardWrapper')({});

// =====================================================================
// ============================= Component =============================

export interface ProjectsOverviewCmpSettings {}

export interface ProjectsOverviewCmpProps {}

export default function ProjectsOverviewCmp(props: ProjectsOverviewCmpProps) {
  const { theme } = useTheme();

  return (
      <ProjectsOverviewRoot>
        <ProjectsOverviewContainer>
            <ProjectsOverviewHeader>
              <Typography variant="h1">
                  Featured
              </Typography>
            </ProjectsOverviewHeader>

            <ProjectsOverviewGrid>
              {projects.map((project, i) => (
                  <ProjectsOverviewCardWrapper
                    key={project.slug}
                    custom={i}
                  >
                    <ProjectCardCmp project={project} />
                  </ProjectsOverviewCardWrapper>
              ))}
            </ProjectsOverviewGrid>
        </ProjectsOverviewContainer>
    </ProjectsOverviewRoot>
  );
}
