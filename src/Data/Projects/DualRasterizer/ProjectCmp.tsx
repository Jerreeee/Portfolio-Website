'use client';

import React from 'react';
import { Box, Typography, Container, Grid, Divider,
  Accordion,
AccordionSummary,
AccordionDetails,
} from '@mui/material';
import MediaCmp from '@/Themes/Default/Components/Media/MediaCmp';
import { getMediaItemsFromManifest } from '@/Utils/projectManifest';
import ParentSizeObserver from '@/Themes/Default/Components/ParentSizeObserver/ParentSizeObserverCmp';
import ImageMultiCompareCmp from '@/Themes/Default/Components/ImageCompare/ImageMultiCompareCmp';
import { ImageCompareItem } from '@/Themes/Default/Components/ImageCompare/ImageCompareCmp';
import CodeBlockCmp from '@/Themes/Default/Components/Code/CodeBlockCmp';
import type { ProjectManifest } from "@/Types/projectManifest";
import type { ProjectCmpProps } from '../project';
import { data } from './data';
import { ProjectOverviewCmp } from '@/Themes/Default/Components/ProjectOverview';
import { IconCmp } from '@/Themes/Default/Components/Icon';
import Timeline from '@/Themes/Default/Components/Timeline/Timeline';
import PATHS from '@/Config/paths';
import { makeDefaultRangeProvider } from '@/Utils/RangeProvider';

export default function ProjectCmp({ project }: ProjectCmpProps) {
  const manifest: ProjectManifest = project.manifest;

  return (
    <Box sx={{ background: 'linear-gradient(to bottom, #151a2c, #221730)' }}>
      {/* ==================== HERO SECTION ==================== */}
      <Container maxWidth="md" sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="gradientH1">
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
          sx={{ mb: 2, fontSize: '1.75rem' }}
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
                  bgcolor: 'rgba(255,255,255,0.04)',
                  borderRadius: 1.5,
                  textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.06)',
                  transition: 'background 0.2s ease',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.9rem',
                    lineHeight: 1.4,
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
            'CPU_ObservedView',
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
              "GPU_AnisotropicSampling",
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
              "GPU_AnisotropicSampling_NoFire",
            ])}
          />
        </Grid>

      </Grid>
      </Container>
    </Box>
  );
}
