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
import PATHS from '@/Config/paths';

export default function ProjectCmp({ project }: ProjectCmpProps) {
  const manifest: ProjectManifest = project.manifest;

  return (
    <Box sx={{ background: 'linear-gradient(to bottom, #151a2c, #221730)' }}>
      {/* ==================== HERO SECTION ==================== */}
      <Container maxWidth="md" sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="gradientH1">
          {data.title}
        </Typography>
      </Container>

      {/* ==================== OVERVIEW ==================== */}
      <ProjectOverviewCmp project={project} />

      <Divider sx={{ my: 3, opacity: 0.2 }} />

    </Box>
  );
}
