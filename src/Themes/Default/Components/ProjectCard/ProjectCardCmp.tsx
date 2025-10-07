'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Card, CardContent, Typography } from '@mui/material';
import { useTheme } from '@/Themes/ThemeProvider'
import { ProjectInfo } from '@/data/projects/project';
import IconCmp from '@/Themes/Default/Components/Icon/IconCmp'

// =====================================================================
// ========================= Slot Definitions ==========================

const ProjectCardRoot = styled(motion(Card), { name: 'ProjectCard', slot: 'Root' })(({ theme }) => ({
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: theme.shadows[3],
  cursor: 'pointer',
  borderRadius: typeof theme.shape.borderRadius === 'number'
    ? `${theme.shape.borderRadius}px`
    : theme.shape.borderRadius,
}));

const ProjectCardHeader = styled(motion.div, { name: 'ProjectCard', slot: 'Header' })(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

const ProjectCardImage = styled(motion.div, {name: 'ProjectCard', slot: 'Image'})(({ theme }) => ({
  position: 'relative',
  width: '100%',
  aspectRatio: '16 / 9',
}));

const ProjectCardTechList = styled(motion.div, {name: 'ProjectCard', slot: 'TechList'})(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(1),
}));

const ProjectCardTechIcon = styled(motion.div, {name: 'ProjectCard', slot: 'TechIcon'})(({ theme }) => ({
}));

const ProjectCardContentBox = styled(motion(CardContent), { name: 'ProjectCard', slot: 'Content' })(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
}));

// =====================================================================
// ============================= Component =============================

export interface ProjectCardCmpSettings {}

export interface ProjectCardCmpProps {
  project: ProjectInfo;
}

export default function ProjectCardCmp({ project }: ProjectCardCmpProps) {
  const { theme } = useTheme();
  const anim = theme.components?.ProjectCardCmp?.slotAnimations ?? {};

  return (
    <ProjectCardRoot {...(anim.root || {})}
    viewport={{ once: true, amount: 0.3 }}
    >
      <Link href={`/projects/${project.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <ProjectCardImage {...(anim.image || {})}>
          <Image
            src={project.thumbnailImage}
            alt={project.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </ProjectCardImage>

        <ProjectCardContentBox {...(anim.content || {})}>
          <ProjectCardHeader {...(anim.header || {})}>
            <Typography variant="h5" sx={{ m: 0 }}>
              {project.title}
            </Typography>
          </ProjectCardHeader>

          <ProjectCardTechList {...(anim.techList || {})}>
            {project.technologies?.map((tech) => (
              <ProjectCardTechIcon key={tech} {...(anim.techIcon || {})}>
                <IconCmp techName={tech} />
              </ProjectCardTechIcon>
            ))}
          </ProjectCardTechList>
        </ProjectCardContentBox>
      </Link>
    </ProjectCardRoot>
  );
}
