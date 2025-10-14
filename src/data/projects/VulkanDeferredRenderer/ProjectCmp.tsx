  'use client';

  import React from 'react';
  import { Box, Typography, Container, Grid, Divider } from '@mui/material';
  import MediaCmp from '@/Themes/Default/Components/Media/MediaCmp';
  import { getMediaItemsFromManifest } from '@/utils/projectManifest';
  import { ParentSizeObserver } from '@/Themes/Default/Components/ParentSizeObserver/ParentSizeObserverCmp';
  import ImageMultiCompareCmp from '@/Themes/Default/Components/ImageCompare/ImageMultiCompareCmp';
  import { ImageCompareItem } from '@/Themes/Default/Components/ImageCompare/ImageCompareCmp';
  import CodeBlockCmp from '@/Themes/Default/Components/Code/CodeBlockCmp';
  import type { ProjectManifest } from "@/types/projectManifest";
  import type { ProjectCmpProps } from '../project';
  import { data } from './data';
  import { ProjectOverviewCmp } from '@/Themes/Default/Components/ProjectOverview';
  import { IconCmp } from '@/Themes/Default/Components/Icon';

  export default function ProjectCmp({ project }: ProjectCmpProps) {
    const manifest: ProjectManifest = project.manifest;

    return (
      <Box sx={{ background: 'linear-gradient(to bottom, #151a2c, #221730)' }}>
        {/* ==================== HERO SECTION ==================== */}
        <Container maxWidth="md" sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="gradientH1">
            {data.title}
          </Typography>

          <MediaCmp
            item={getMediaItemsFromManifest(manifest, ['PostProcess_Final_Outdoor.webp'])[0]}
          />
        </Container>

        {/* ==================== OVERVIEW ==================== */}
        <Typography variant="h3" align="center">
          Overview
        </Typography>
        <ProjectOverviewCmp project={project} />


        <Divider sx={{ my: 6, opacity: 0.2 }} />

        {/* ==================== ARCHITECTURE SECTION ==================== */}
        <Container maxWidth="md" sx={{ mb: 10 }}>
          <Typography variant="h3" align="center" gutterBottom>
            Architecture
          </Typography>

          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
            The renderer is built around a modular frame graph system that defines each render pass
            explicitly, controlling synchronization and resource transitions between stages.
          </Typography>

          {/* You could later replace this placeholder with a pipeline diagram image */}
          <Box
            sx={{
              width: '100%',
              height: 400,
              bgcolor: 'rgba(255,255,255,0.05)',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'text.disabled',
              fontStyle: 'italic',
            }}
          >
            [ Pipeline Diagram Placeholder ]
          </Box>
        </Container>

        <Divider sx={{ my: 6, opacity: 0.2 }} />

        {/* ==================== RENDER PASS BREAKDOWN ==================== */}
        <Container maxWidth="lg" sx={{ mb: 10 }}>
          <Typography variant="h3" align="center" gutterBottom>
            Render Pass Breakdown
          </Typography>

          <ParentSizeObserver mode="width" aspectRatio={16 / 9}>
            {size => (
              <ImageMultiCompareCmp
                size={size}
                images={getMediaItemsFromManifest(manifest, [
                  'depth.webp',
                  'GBuffer_Albedo.webp',
                  'GBuffer_MetallicRoughness.webp',
                  'GBuffer_WorldNormal.webp',
                ]).filter((item): item is ImageCompareItem => item.type === 'image')}
              />
            )}
          </ParentSizeObserver>

          <Typography variant="body1" align="center" sx={{ mt: 3, color: 'text.secondary' }}>
            Multiple G-buffer render targets capture position, normal, albedo, and material properties,
            which are later combined in the lighting pass.
          </Typography>
        </Container>

        <Divider sx={{ my: 6, opacity: 0.2 }} />

        {/* ==================== MAIN FEATURES ==================== */}
        <Container maxWidth="md" sx={{ mb: 10 }}>
          <Typography variant="h3" align="center" gutterBottom>
            Main Features
          </Typography>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            {[
              'Deferred shading pipeline with HDR lighting',
              'Physically-based materials (PBR)',
              'SSAO and Bloom post-processing',
              'Dynamic GPU descriptor management',
              'Frame graph and synchronization system',
            ].map((feature, index) => (
              <Grid size={{ xs: 12, sm: 6 }} key={index}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: 'rgba(255,255,255,0.05)',
                    borderRadius: 2,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="body1">{feature}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 6 }}>
            <ParentSizeObserver mode="width" aspectRatio={16 / 9}>
              <CodeBlockCmp file="/projects/VulkanDeferredRenderer/Code/Render.cpp" />
            </ParentSizeObserver>
          </Box>
        </Container>

        <Divider sx={{ my: 6, opacity: 0.2 }} />

        {/* ==================== TECHNICAL CHALLENGES ==================== */}
        <Container maxWidth="md" sx={{ mb: 10 }}>
          <Typography variant="h3" align="center" gutterBottom>
            Technical Challenges & Learnings
          </Typography>

          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
            One of the key challenges was efficiently managing synchronization across Vulkan’s multiple
            subpasses. I implemented a lightweight dependency graph that tracks read/write hazards
            between attachments, reducing unnecessary barriers.
          </Typography>

          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            I also designed a descriptor set allocator to handle thousands of dynamic bindings per frame,
            significantly improving performance when rendering large scenes.
          </Typography>
        </Container>

        <Divider sx={{ my: 6, opacity: 0.2 }} />

        {/* ==================== CLOSING / FUTURE WORK ==================== */}
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Future Work
          </Typography>

          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Next steps include clustered deferred lighting, GPU-driven culling, and temporal
            anti-aliasing to further improve performance and image quality.
          </Typography>
        </Container>
      </Box>
    );
  }
