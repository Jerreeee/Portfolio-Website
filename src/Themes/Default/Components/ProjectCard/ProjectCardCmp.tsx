'use client';
// @generate-component-classes

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
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
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const ProjectCardLinks = makeSlot(motion.div, 'links')(({ theme }) => ({
  position: 'absolute',
  top: 10,
  right: 12,
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  zIndex: 2,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '6px',
  },
}));

const ProjectCardDescription = makeSlot(motion.div, 'description')({
  flex: 1,
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
});

const ProjectCardWrapper = makeSlot('div', 'wrapper')({});

// Mobile-only: bottom gradient overlay with title, sits inside ProjectCardImage
const ProjectCardMobileTitle = makeSlot('div', 'mobileTitle')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
    background: `linear-gradient(to top, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0)} 100%)`,
    alignItems: 'flex-end',
    padding: theme.spacing(0.5, 1),
    zIndex: 2,
    pointerEvents: 'none',
  },
}));

// Mobile-only: reveal panel below the image (description + tech), animates height on scroll
const ProjectCardRevealPanel = makeSlot(motion.div, 'revealPanel')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'block',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1.5, 2),
  },
}));

// =====================================================================
// ============================= Component =============================

export interface ProjectCardCmpSettings {}

export interface ProjectCardCmpProps {
  project: ProjectInfo;
}

export default function ProjectCardCmp({ project }: ProjectCardCmpProps) {
  const [isPressed, setIsPressed] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // True once the finger has been held still for 300 ms — after this point
  // neither pointerup nor pointercancel clears the pressed state.
  const committed = useRef(false);

  // Dismiss when tapping outside this card
  useEffect(() => {
    if (!isPressed) return;
    const handleGlobalPointerDown = (e: PointerEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsPressed(false);
      }
    };
    document.addEventListener('pointerdown', handleGlobalPointerDown);
    return () => document.removeEventListener('pointerdown', handleGlobalPointerDown);
  }, [isPressed]);

  const handlePointerDown = () => {
    committed.current = false;
    holdTimer.current = setTimeout(() => {
      committed.current = true;
      holdTimer.current = null;
      setIsPressed(true); // nothing shows until threshold is crossed
    }, 200);
  };

  const clearPress = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
    if (!committed.current) {
      setIsPressed(false);
    }
    // Don't reset committed here — on mobile both pointercancel and pointerup
    // fire for a drag gesture. If we reset after the first event, the second
    // call would see committed=false and incorrectly clear isPressed.
    // handlePointerDown resets committed at the start of each new press.
  };

  const item: MediaItem = getMediaItemsFromManifest(project.manifest, [
    project.thumbnailImage,
  ])[0];

  const hasLinks =
    project.githubURL ||
    project.steamURL ||
    (project.downloads && project.downloads.length > 0);

  const iconButtons = hasLinks && (
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
  );

  return (
    <ProjectCardWrapper
      ref={wrapperRef}
      data-pressed={isPressed ? 'true' : undefined}
      onPointerDown={handlePointerDown}
      onPointerUp={clearPress}
      onPointerCancel={clearPress}
    >
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

            {/* Mobile-only: bottom gradient overlay with title */}
            <ProjectCardMobileTitle>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.primary',
                  lineHeight: 1.3,
                }}
              >
                {project.title}
              </Typography>
            </ProjectCardMobileTitle>
          </ProjectCardImage>

          {/* Desktop-only: title + description + tech in right panel */}
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

        {iconButtons}

        <ProjectCardRevealPanel>
          <motion.div
            initial={false}
            animate={{ height: isPressed ? 'auto' : 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1.0] }}
            style={{ overflow: 'hidden' }}
          >
            <Typography
              variant="body2"
              sx={{
                pb: 1,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {project.shortDescription}
            </Typography>
          </motion.div>

          {project.technologies?.Core && (
            <Box sx={{ position: 'relative', overflow: 'hidden' }}>
              <ProjectCardTechList>
                {project.technologies.Core.map((tech, i) => (
                  <ProjectCardTechIcon key={i}>
                    <IconCmp techName={tech.name} showDisplayName={false} />
                  </ProjectCardTechIcon>
                ))}
              </ProjectCardTechList>
              {/* Gradient fade for overflowing tech icons */}
              <Box
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: 32,
                  background: (theme) =>
                    `linear-gradient(to right, transparent, ${theme.palette.background.paper})`,
                  pointerEvents: 'none',
                }}
              />
            </Box>
          )}
        </ProjectCardRevealPanel>

      </ProjectCardRoot>
    </ProjectCardWrapper>
  );
}
