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

// =====================================================================
// ========================= Slot Definitions ==========================

const makeSlot = makeSlotFactory('ProjectOverviewCmp', projectOverviewCmp);

const OverviewRoot = makeSlot(motion.div, 'root')(({ theme }) => ({
  background: 'linear-gradient(to bottom, #151a2c, #221730)',
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
  // gap: theme.spacing(3),
}));

const TechCategory = makeSlot(motion.div, 'techCategoryItem')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  // gap: theme.spacing(1),
}));

const TechIconList = makeSlot(motion.div, 'techIconList')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  alignItems: 'center',
}));

// =====================================================================
// ============================= Component =============================

export interface ProjectOverviewCmpSettings {}

export interface ProjectOverviewCmpProps {
  project: ProjectInfo;
}

export default function ProjectOverviewCmp({ project }: ProjectOverviewCmpProps) {
  const { theme } = useTheme();
  const tech = project.technologies;

  return (
<OverviewRoot>
  <Container maxWidth="lg">
    <Grid container spacing={2} alignItems="flex-start">
      {/* --- LEFT COLUMN: IMAGE --- */}
      <Grid size={{ xs: 12, md: 7 }}>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MediaCmp
            item={getMediaItemsFromManifest(project.manifest, ['PostProcess_Final_Outdoor.webp'])[0]}
            // style={{
            //   width: '100%',
            //   borderRadius: 2,
            //   overflow: 'hidden',
            // }}
          />
        </Box>
      </Grid>

      {/* --- RIGHT COLUMN: TEXT + ICONS --- */}
      <Grid size={{ xs: 12, md: 5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Description */}
          <OverviewTextBox
            sx={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '10px',
              padding: 2,
            }}
          >
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {project.mediumDescription}
            </Typography>
          </OverviewTextBox>

          {/* Tech Stack */}
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
                            width: 'auto',
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
      </Grid>
    </Grid>
  </Container>
</OverviewRoot>
  );
}
