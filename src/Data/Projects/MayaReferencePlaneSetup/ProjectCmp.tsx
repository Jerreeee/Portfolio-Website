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
import { useComponents } from '@/Themes/ThemeProvider';

export default function ProjectCmp({ project }: ProjectCmpProps) {
  const { MediaCmp, ParentSizeObserverCmp: ParentSizeObserver, ImageMultiCompareCmp, CodeBlockCmp, ProjectOverviewCmp, IconCmp } = useComponents();
  const manifest: ProjectManifest = project.manifest;

  return (
    <Box>
      {/* ==================== HERO SECTION ==================== */}
      <Container maxWidth="md" sx={{ textAlign: 'center'}}>
        <Typography variant="gradientH1">
          {data.title}
        </Typography>
      </Container>

      {/* ==================== OVERVIEW ==================== */}
      <ProjectOverviewCmp project={project} />

      <Divider sx={{ my: 3, opacity: 0.2 }} />

      {/* ==================== CODE SNIPPETS ==================== */}
      <Container maxWidth="md" sx={{ mb: 12 }}>
      <Typography variant="h3" align="center">
        Code Snippets
      </Typography>

      {[
          {
            title: 'Script',
            description:
              '',
            file: 'Script.py',
          },
        ].map((snippet, index) => (
          <Accordion key={index}>
            <AccordionSummary>
              <Typography variant="subtitle1">
                {snippet.title}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              {/* --- Description Text --- */}
              <Box sx={{ px: 2, pt: 1, pb: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', lineHeight: 1.5, mb: 1 }}
                >
                  {snippet.description}
                </Typography>
              </Box>

              {/* --- Code Block --- */}
              <ParentSizeObserver mode="width" aspectRatio={16 / 9}>
                <CodeBlockCmp file={PATHS.PROJECT_CODE({ projectName: project.slug, fileName: snippet.file }).url().value} />
              </ParentSizeObserver>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}
