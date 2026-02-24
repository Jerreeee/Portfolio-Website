'use client';
// @generate-component-classes

import React from 'react';
import { motion } from 'framer-motion';
import { Box, Button, Container, Grid, styled, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useAppTheme } from '@/Themes/ThemeProvider';
import IconCmp from '@/Themes/Default/Components/Icon/IconCmp';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import type { ProjectInfo } from '@/Data/Projects/project';
import { projectOverviewCmp } from './ProjectOverviewCmpClasses';
import { MediaCmp } from '../Media';
import { getMediaItemsFromManifest } from '@/Utils/projectManifest';
import { MediaGalleryCmp } from '../MediaGallery';
import { MarkdownRendererCmp } from '../Markdown';
import PATHS from '@/Config/paths';

const makeSlot = makeSlotFactory('ProjectOverviewCmp', projectOverviewCmp);

const OverviewRoot = makeSlot(motion.div, 'root')(({ theme }) => ({
  width: '100%',
  background: theme.palette.action.hover,
  boxShadow: theme.shadows[4],
  borderRadius: `${theme.shape.borderRadius}px`,
}));

const OverviewTextBox = makeSlot(motion.div, 'textBox')(({ theme }) => ({
  padding: 3,
  background: theme.palette.action.hover,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: `${theme.shape.borderRadius}px`,
  boxShadow: theme.shadows[4],
}));

const TechCategoryBox = makeSlot(motion.div, 'techCategory')(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: `${theme.shape.borderRadius}px`,
  backgroundColor: theme.palette.action.hover,
  boxShadow: theme.shadows[4],
  display: 'flex',
  flexDirection: 'column',
}));

const TechCategory = makeSlot(motion.div, 'techCategoryItem')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

const InfoWrapper = makeSlot('div', 'infoWrapper')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
  gap: theme.spacing(1),
  borderRadius: `${theme.shape.borderRadius}px`,
  padding: theme.spacing(1),
}));

const TechIconList = makeSlot(motion.div, 'techIconList')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  alignItems: 'center',
}));

export interface ProjectOverviewCmpSettings {}

export interface ProjectOverviewCmpProps {
  project: ProjectInfo;
}

export default function ProjectOverviewCmp({ project }: ProjectOverviewCmpProps) {
  const { theme } = useAppTheme();

  const heroFile = project.heroImage || Object.keys(project.manifest.media)[0];

  const mediaItemStrings: string[] =
    project.overviewMedia && project.overviewMedia.length > 0
      ? project.overviewMedia
      : [project.heroImage];

  const mediaItems = getMediaItemsFromManifest(project.manifest, mediaItemStrings);

  return (
    <OverviewRoot>
      <Grid container spacing={1}>
        {/* ===================== ROW 1: MEDIA ===================== */}
        <Grid size={{ xs: 12 }}>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
            }}
          >
            <MediaGalleryCmp
              media={mediaItems}
            />
          </Box>
        </Grid>

        {/* ===================== WRAPPER FOR DESCRIPTION + LOGOS ===================== */}
        <Grid size={{ xs: 12 }}>
          <InfoWrapper>
            {/* DESCRIPTION (60%) */}
            <Box
              sx={{
                flexBasis: { md: '60%' },
                flexGrow: 1,
              }}
            >
              <OverviewTextBox
                sx={{padding: 3}}
              >
                <MarkdownRendererCmp markdown={project.mediumDescription} />

                {/* --- Project links --- */}
                <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                  {project.githubURL && (
                    <Button
                      component="a"
                      href={project.githubURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outlined"
                      size="small"
                      startIcon={<IconCmp techName="GitHub" height={18} showDisplayName={false} />}
                    >
                      View on GitHub
                    </Button>
                  )}

                  {project.steamURL && (
                    <Button
                      component="a"
                      href={project.steamURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outlined"
                      size="small"
                      startIcon={<IconCmp techName="Steam" height={18} showDisplayName={false} />}
                    >
                      View on Steam
                    </Button>
                  )}

                  {project.downloads &&
                    project.downloads.map((file, i) => (
                      <Button
                        key={`download-${i}`}
                        variant="contained"
                        size="small"
                        startIcon={<DownloadIcon />}
                        sx={{ fontWeight: 600, borderRadius: `${theme.shape.borderRadius}px` }}
                        href={PATHS.PROJECT_DOWNLOAD({ projectName: project.slug, fileName: file }).url().value}
                        download
                      >
                        Download {file}
                      </Button>
                    ))}
                  </Box>
              </OverviewTextBox>
            </Box>

            {/* LOGOS (40%) */}
            <Box
              sx={{
                flexBasis: { md: '40%' },
                flexGrow: 1,
              }}
            >
              {project.technologies && (
                <TechCategoryBox>
                  {Object.entries(project.technologies).map(([category, items]) =>
                    items && items.length > 0 ? (
                      <TechCategory key={category}>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600 }}
                          gutterBottom
                        >
                          {category}
                        </Typography>
                        <TechIconList>
                          {items.map((item, i) => (
                            <Box
                              key={`${category}-${item.name}-${i}`}
                              sx={{
                                height: 24,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                              }}
                            >
                              <IconCmp techName={item.name} showDisplayName={true} />
                            </Box>
                          ))}
                        </TechIconList>
                      </TechCategory>
                    ) : null
                  )}
                </TechCategoryBox>
              )}
            </Box>
          </InfoWrapper>
        </Grid>
      </Grid>
    </OverviewRoot>
  );
}
