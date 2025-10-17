'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent, Typography } from '@mui/material';
import { useTheme } from '@/Themes/ThemeProvider'
import { ProjectInfo } from '@/Data/Projects/project';
import IconCmp from '@/Themes/Default/Components/Icon/IconCmp'
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { projectCardCmp } from './ProjectCardCmpClasses';
import PATHS, { urlPath } from '@/Config/paths';

// =====================================================================
// ========================= Slot Definitions ==========================

const makeSlot = makeSlotFactory('ProjectCardCmp', projectCardCmp);

const ProjectCardRoot = makeSlot(motion.create(Card), 'root')(({ theme }) => ({
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: theme.shadows[3],
  cursor: 'pointer',
  borderRadius: typeof theme.shape.borderRadius === 'number'
    ? `${theme.shape.borderRadius}px`
    : theme.shape.borderRadius,
}));

const ProjectCardHeader = makeSlot(motion.div, 'header')(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

const ProjectCardImage = makeSlot(motion.div, 'image')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  aspectRatio: '16 / 9',
}));

const ProjectCardTechList = makeSlot(motion.div, 'techList')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(1),
}));

const ProjectCardTechIcon = makeSlot(motion.div, 'techIcon')(({ theme }) => ({
}));

const ProjectCardContentBox = makeSlot(motion(CardContent), 'content')(({ theme }) => ({
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
    <ProjectCardRoot
      viewport={{ once: true, amount: 0.3 }}
    >
      <Link href={`/projects/${project.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <ProjectCardImage>
          <Image
            src={PATHS.PROJECT_IMAGE({ projectName: project.slug, fileName: project.thumbnailImage }).url().value}
            alt={project.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </ProjectCardImage>

        <ProjectCardContentBox>
          <ProjectCardHeader>
            <Typography variant="h5" sx={{ m: 0 }}>
              {project.title}
            </Typography>
          </ProjectCardHeader>

          <ProjectCardTechList>
            {project.technologies?.Core?.map((tech) => (
              <ProjectCardTechIcon key={tech.name}>
                <IconCmp techName={tech.name} />
              </ProjectCardTechIcon>
            ))}
          </ProjectCardTechList>
        </ProjectCardContentBox>
      </Link>
    </ProjectCardRoot>
  );
}
