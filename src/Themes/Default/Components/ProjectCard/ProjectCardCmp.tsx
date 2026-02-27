'use client';
// @generate-component-classes

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { ProjectInfo } from '@/Data/Projects/project';
import IconCmp from '@/Themes/Default/Components/Icon/IconCmp';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import { projectCardCmp } from './ProjectCardCmpClasses';
import PATHS from '@/Config/paths';
import { MediaCmp } from '../Media';
import { getMediaItemsFromManifest } from '@/Utils/projectManifest';
import { MediaItem } from '@/Types/media';

// =====================================================================
// ========================= Slot Definitions ==========================

const makeSlot = makeSlotFactory('ProjectCardCmp', projectCardCmp);

const ProjectCardRoot = makeSlot(motion.create(Card), 'root')(({ theme }) => ({
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'row',
  height: 240,
  position: 'relative',
  boxShadow: theme.shadows[3],
  cursor: 'pointer',
  clipPath: 'polygon(36px 0%, 100% 0%, calc(100% - 36px) 100%, 0% 100%)',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    height: 'auto',
    clipPath: 'none',
  },
}));

const ProjectCardHeader = makeSlot(motion.div, 'header')(({ theme }) => ({
  textAlign: 'left',
  color: theme.palette.text.primary,
}));

const ProjectCardImage = makeSlot(motion.div, 'image')(({ theme }) => ({
  position: 'relative',
  flex: '0 0 calc(60% + 36px)',
  height: '100%',
  overflow: 'hidden',
  clipPath: 'polygon(0% 0%, 100% 0%, calc(100% - 36px) 100%, 0% 100%)',
  '& img, & video': {
    transition: 'transform 0.4s ease',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    aspectRatio: '16 / 9',
    flex: 'none',
    height: 'auto',
    clipPath: 'none',
  },
}));

const ProjectCardTechList = makeSlot(motion.div, 'techList')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  gap: theme.spacing(1),
  height: 24,
}));

const ProjectCardTechIcon = makeSlot(motion.div, 'techIcon')(({ theme }) => ({
  display: 'flex',
  height: '100%',
}));

const ProjectCardContentBox = makeSlot(motion(CardContent), 'content')(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  overflow: 'hidden',
  padding: theme.spacing(2),
  '&:last-child': {
    paddingBottom: theme.spacing(2),
  },
}));

const ProjectCardLinks = makeSlot(motion.div, 'links')({
  position: 'absolute',
  top: 10,
  right: 12,
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  zIndex: 2,
});

const ProjectCardDescription = makeSlot(motion.div, 'description')({
  flex: 1,
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
});

const ProjectCardWrapper = makeSlot('div', 'wrapper')({});

// =====================================================================
// ============================= Component =============================

export interface ProjectCardCmpSettings {}

export interface ProjectCardCmpProps {
  project: ProjectInfo;
}

export default function ProjectCardCmp({ project }: ProjectCardCmpProps) {
  const item: MediaItem = getMediaItemsFromManifest(project.manifest, [
    project.thumbnailImage,
  ])[0];

  const hasLinks =
    project.githubURL ||
    project.steamURL ||
    (project.downloads && project.downloads.length > 0);

  return (
    <ProjectCardWrapper>
    <ProjectCardRoot viewport={{ once: true, amount: 0.3 }}>
      <Link
        href={PATHS.PROJECT_PAGE({ slug: project.slug }).url().value}
        style={{
          textDecoration: 'none',
          color: 'inherit',
          display: 'flex',
          flex: 1,
          minWidth: 0,
        }}
      >
        <ProjectCardImage>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MediaCmp item={item} fit="cover" />
          </div>
        </ProjectCardImage>

        <ProjectCardContentBox>
          <ProjectCardHeader>
            <Typography variant="h6" sx={{ m: 0 }}>
              {project.title}
            </Typography>
          </ProjectCardHeader>

          <ProjectCardDescription>
            <Typography variant="body2">{project.shortDescription}</Typography>
          </ProjectCardDescription>

          {project.technologies?.Core && (
            <Box>
              <Typography variant="caption" sx={{ opacity: 0.6 }}>
                Core
              </Typography>
              <ProjectCardTechList>
                {project.technologies.Core.map((tech, i) => (
                  <ProjectCardTechIcon key={i}>
                    <IconCmp techName={tech.name} showDisplayName={false} />
                  </ProjectCardTechIcon>
                ))}
              </ProjectCardTechList>
            </Box>
          )}
        </ProjectCardContentBox>
      </Link>

      {hasLinks && (
        <ProjectCardLinks>
          {project.githubURL && (
            <IconButton
              size="small"
              component="a"
              href={project.githubURL}
              target="_blank"
            >
              <IconCmp techName="GitHub" height={16} showDisplayName={false} />
            </IconButton>
          )}
          {project.steamURL && (
            <IconButton
              size="small"
              component="a"
              href={project.steamURL}
              target="_blank"
            >
              <IconCmp techName="Steam" height={16} showDisplayName={false} />
            </IconButton>
          )}
          {project.downloads?.map((file, i) => (
            <IconButton
              key={i}
              size="small"
              component="a"
              href={PATHS.PROJECT_DOWNLOAD({
                projectName: project.slug,
                fileName: file,
              })
                .url()
                .value}
              download
              sx={{ color: 'text.primary' }}
            >
              <DownloadIcon sx={{ fontSize: 16 }} />
            </IconButton>
          ))}
        </ProjectCardLinks>
      )}
    </ProjectCardRoot>
    </ProjectCardWrapper>
  );
}
