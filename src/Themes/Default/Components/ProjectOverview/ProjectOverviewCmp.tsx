'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@/Themes/ThemeProvider';
import IconCmp from '@/Themes/Default/Components/Icon/IconCmp';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import type { ProjectInfo } from '@/Data/Projects/project';
import { projectOverviewCmp } from './ProjectOverviewCmpClasses';
import { MediaCmp } from '../Media';
import { getMediaItemsFromManifest } from '@/Utils/projectManifest';

const makeSlot = makeSlotFactory('ProjectOverviewCmp', projectOverviewCmp);

const OverviewRoot = makeSlot(motion.div, 'root')(({ theme }) => ({
  background: 'linear-gradient(to bottom, #151a2c, #221730)',
  padding: theme.spacing(6, 0),
}));

const OverviewTextBox = makeSlot(motion.div, 'textBox')(({ theme }) => ({
  color: theme.palette.text.secondary,
  lineHeight: 1.7,
}));

const TechCategoryBox = makeSlot(motion.div, 'techCategory')(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(255,255,255,0.05)',
  display: 'flex',
  flexDirection: 'column',
}));

const TechCategory = makeSlot(motion.div, 'techCategoryItem')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

const TechIconList = makeSlot(motion.div, 'techIconList')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  alignItems: 'center',
}));

export default function ProjectOverviewCmp({ project }: { project: ProjectInfo }) {
  const { theme } = useTheme();

  const heroFile = project.heroImage || Object.keys(project.manifest.media)[0];

  return (
    <OverviewRoot>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* ===================== ROW 1: MEDIA ===================== */}
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                width: '100%',
                aspectRatio: '16/9',
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <MediaCmp
                item={getMediaItemsFromManifest(project.manifest, [
                  heroFile
                ])[0]}
              />
            </Box>
          </Grid>

          {/* ===================== WRAPPER FOR DESCRIPTION + LOGOS ===================== */}
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 3,
                background: 'rgba(255,255,255,0.03)',
                borderRadius: 2,
                padding: 3,
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {/* DESCRIPTION (60%) */}
              <Box
                sx={{
                  flexBasis: { md: '60%' },
                  flexGrow: 1,
                }}
              >
                <OverviewTextBox
                  sx={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: 2,
                    padding: 3,
                    height: '100%',
                  }}
                >
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {project.mediumDescription}
                  </Typography>
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
                                  transition: 'transform 0.15s ease',
                                  '&:hover': { transform: 'scale(1.1)' },
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
            </Box>
          </Grid>
        </Grid>
      </Container>
    </OverviewRoot>
  );
}
