'use client';

import React from 'react';
import { Box, Typography, Container, Grid, Divider,
  Accordion,
AccordionSummary,
AccordionDetails,
} from '@mui/material';
import { getMediaItemsFromManifest } from '@/Utils/projectManifest';
import { ImageCompareItem } from '@/Themes/Default/Components/ImageCompare/ImageCompareCmp';
import type { ProjectManifest } from "@/Types/projectManifest";
import type { ProjectCmpProps } from '../project';
import { data } from './data';
import PATHS from '@/Config/paths';
import { makeDefaultRangeProvider } from '@/Utils/RangeProvider';
import { useAppTheme, useComponents } from '@/Themes/ThemeProvider';
import { gradientH1Styles } from '@/Themes/Default/themeUtils';

export default function ProjectCmp({ project }: ProjectCmpProps) {
  const { MediaCmp, ParentSizeObserverCmp: ParentSizeObserver, ImageMultiCompareCmp, CodeBlockCmp, ProjectOverviewCmp, IconCmp, TimelineCmp: Timeline } = useComponents();
  const { theme } = useAppTheme();
  const manifest: ProjectManifest = project.manifest;

  return (
    <Box>
      {/* ==================== HERO SECTION ==================== */}
      <Container maxWidth="md" sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h1" sx={gradientH1Styles}>
          {data.title}
        </Typography>
      </Container>

      {/* ==================== OVERVIEW ==================== */}
      <ProjectOverviewCmp project={project} />

      <Divider sx={{ my: 3, opacity: 0.2 }} />

      {/* ==================== MAIN FEATURES ==================== */}
      <Container maxWidth="md">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ mb: 2 }}
        >
          Main Features
        </Typography>

        <Grid container spacing={1.5}>
          {[
            'Dual Backend',
            'Normal Mapping',
            'Cull Mode Toggle',
            'Depth, Normal & Bounding Box Visualizations (CPU)',
            'Sampler State Toggle (GPU)',
          ].map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={index}>
              <Box
                sx={{
                  p: 1,
                  bgcolor: theme.palette.action.hover,
                  borderRadius: `${theme.shape.borderRadius}px`,
                  textAlign: 'center',
                  border: `1px solid ${theme.palette.divider}`,
                  transition: 'background 0.2s ease',
                  '&:hover': { bgcolor: theme.palette.action.selected },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                  }}
                >
                  {feature}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Divider sx={{ my: 3, opacity: 0.2 }} />

      {/* ==================== CPU Frame Breakdown BREAKDOWN ==================== */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Typography variant="h3" align="center" gutterBottom>
          CPU Frame Breakdown
        </Typography>
        
        <ImageMultiCompareCmp
          images={getMediaItemsFromManifest(manifest, [
            'CPU_BoundingRects',
            'CPU_Depth',
            'CPU_Diffuse',
            'CPU_ObservedArea',
            'CPU_Specular_NoNormalMap',
            'CPU_Specular',
            'CPU_Final_NoNormalMap',
            'CPU_Final',
          ])}
        />

      <Grid container spacing={6}>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h3" align="center" gutterBottom>
            CPU vs GPU Comparison
          </Typography>

          <ImageMultiCompareCmp
            images={getMediaItemsFromManifest(manifest, [
              "CPU_Final",
              "GPU_Final",
            ])}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h3" align="center" gutterBottom>
            GPU Samplers Comparison
          </Typography>

          <ImageMultiCompareCmp
            images={getMediaItemsFromManifest(manifest, [
              "GPU_PointSampling",
              "GPU_LinearSampling",
              "GPU_AnisotropicSampling",
            ])}
          />
        </Grid>

      </Grid>
      </Container>
    </Box>
  );
}
