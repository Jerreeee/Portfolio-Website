'use client';

import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import { anims } from '@/Themes/animations';
import ProjectCardCmp from '@/Themes/Default/Components/ProjectCard/ProjectCard';
import { useTheme } from '@/Themes/ThemeProvider'

// =====================================================================
// ========================= Slot Definitions ==========================

const ProjectsOverviewRoot = styled(motion.main, {
  name: 'ProjectsOverview',
  slot: 'Root',
})(({ theme }) => ({
  width: '100%',
}));

const ProjectsOverviewContainer = styled(motion.main, {
  name: 'ProjectsOverview',
  slot: 'Container',
})(({ theme }) => ({
  maxWidth: '70%',
  margin: '0 auto',
}));

const ProjectsOverviewHeader = styled(motion.div, {
  name: 'ProjectsOverview',
  slot: 'Header',
})(({ theme }) => ({
  textAlign: 'center',
//   marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const ProjectsOverviewGrid = styled(motion.div, {
  name: 'ProjectsOverview',
  slot: 'Grid',
})(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '1fr 1fr',
  },
}));

const ProjectsOverviewCardWrapper = styled(motion.div, {
  name: 'ProjectsOverview',
  slot: 'CardWrapper',
})({});

// =====================================================================
// ============================= Component =============================

export interface ProjectsOverviewProps {}

export default function ProjectsOverviewCmp(props: ProjectsOverviewProps) {
  const { theme } = useTheme();
  const anim = theme.components?.ProjectsOverview?.slotAnimations ?? {};

  return (
    <ProjectsOverviewRoot {...(anim.root || {})}>
        <ProjectsOverviewContainer>
            <ProjectsOverviewHeader {...(anim.header || {})}>
            <Typography variant="h1">
                Featured
            </Typography>
            </ProjectsOverviewHeader>

            <ProjectsOverviewGrid {...(anim.grid || {})}>
            {projects.map((project, i) => (
                <ProjectsOverviewCardWrapper
                    key={project.slug}
                    custom={i}
                    {...(anim.cardWrapper || {})}
                >
                <ProjectCardCmp project={project} />
                </ProjectsOverviewCardWrapper>
            ))}
            </ProjectsOverviewGrid>
        </ProjectsOverviewContainer>
    </ProjectsOverviewRoot>
  );
}
