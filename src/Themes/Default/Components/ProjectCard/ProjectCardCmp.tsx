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
import PATHS from '@/Config/paths';
import { height } from '@mui/system';
import { MediaCmp } from '../Media';
import { getMediaItemsFromManifest } from '@/Utils/projectManifest';
import { MediaItem } from '@/Types/media';

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
  height: 20,
}));

const ProjectCardTechIcon = makeSlot(motion.div, 'techIcon')(({ theme }) => ({
  display: 'flex',
  height: '100%',
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

  const item: MediaItem = getMediaItemsFromManifest(project.manifest, [project.thumbnailImage])[0];

  return (
    <ProjectCardRoot
      viewport={{ once: true, amount: 0.3 }}
    >
      <Link href={PATHS.PROJECT_PAGE({slug: project.slug}).url().value} style={{ textDecoration: 'none', color: 'inherit' }}>
        <ProjectCardImage>
          <MediaCmp
            item={item}
            fit='cover'
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
