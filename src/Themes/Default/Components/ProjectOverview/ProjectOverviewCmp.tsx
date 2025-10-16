'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@/Themes/ThemeProvider';
import IconCmp from '@/Themes/Default/Components/Icon/IconCmp';
import { makeSlotFactory } from '@/Utils/makeSlotFactory';
import type { ProjectInfo } from '@/data/projects/project';
import { projectOverviewCmp } from './ProjectOverviewCmpClasses';

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
        <Grid container spacing={6} alignItems="flex-start">
          {/* --- Left: Overview Text --- */}
          <Grid size={{ xs: 12, md: 7 }}>
            <OverviewTextBox>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                {project.mediumDescription}
              </Typography>
            </OverviewTextBox>
          </Grid>

          {/* --- Right: Technologies --- */}
          {tech && (
            <Grid size={{ xs: 12, md: 5 }}>
              <TechCategoryBox>
                {Object.entries(tech).map(([category, items]) =>
                  items && items.length > 0 ? (
                    <TechCategory key={category}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }} gutterBottom>
                        {category}
                      </Typography>
                      <TechIconList>
                        {items.map((item, i) => (
                          <Box
                            key={`${category}-${item.name}-${i}`}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              flexWrap: 'wrap',
                            }}
                          >
                            <Box sx={{ width: 24, height: 24 }}>
                              <IconCmp techName={item.name} />
                            </Box>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {item.name}
                            </Typography>
                          </Box>
                        ))}
                      </TechIconList>
                    </TechCategory>
                  ) : null
                )}
              </TechCategoryBox>
            </Grid>
          )}
        </Grid>
      </Container>
    </OverviewRoot>
  );
}
