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
import TimelineCmp from '@/Themes/Default/Components/Timeline/TimelineCmp';
import PATHS from '@/Config/paths';
import { makeDefaultRangeProvider } from '@/Utils/RangeProvider';

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

      <Divider sx={{ my: 3, opacity: 0.2 }} />

      {/* ==================== MAIN FEATURES ==================== */}
      <Container maxWidth="md" sx={{ mb: 6 }}>
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
          'Deferred Rendering',
          'Physically-based materials (PBR)',
          'Directional/Point Lights',
          'Skybox',
          'IBL (diffuse irradiance)',
          'Physical Camera Settings',
          'Tone Mapping',
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

      {/* ==================== RENDER PASS BREAKDOWN ==================== */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Frame Breakdown
        </Typography>

        <ParentSizeObserver mode="width" aspectRatio={16 / 9}>
          {size => (
            <ImageMultiCompareCmp
              size={size}
              images={getMediaItemsFromManifest(manifest, [
                'depth.webp',
                'GBuffer_Albedo.webp',
                'GBuffer_MetallicRoughness.webp',
                'LightingPass_InWorldNormal.webp',
                'GBuffer_WorldNormal.webp',
                'LightingPass_Ambient_Albedo.webp',
                'LightingPass_DirLight_Albedo.webp',
                'LightingPass_DirLight_AlbedoNormal.webp',
                'LightingPass_DirLight_PBR.webp',
                'LightingPass_DirAndPointLight_PBR.webp',
                'LightingPass_DirAndPointLight_PBR_Skybox.webp',
                'LightingPass_DirAndPointLight_PBR_Skybox_IBL.webp',
              ]).filter((item): item is ImageCompareItem => item.type === 'image')}
            />
          )}
        </ParentSizeObserver>
      </Container>

      <Divider sx={{ my: 3, opacity: 0.2 }} />

      {/* ==================== CODE SNIPPETS ==================== */}
      <Container maxWidth="md" sx={{ mb: 12 }}>
      <Typography variant="h3" align="center">
        Code Snippets
      </Typography>

        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
          Here some code snippets demonstrating key part of my Deferred Renderer.
        </Typography>

      {[
          {
            title: 'Depth Prepass',
            description:
              'This function handles my Depth Pre-Pass stage. I first transition the depth image into the proper layout for depth writes, then begin a depth-only rendering pass using Vulkan’s dynamic rendering. I bind the depth pre-pass pipeline, set the viewport and scissor, and draw all meshes to fill the depth buffer. This ensures early depth testing works efficiently in later passes like the G-buffer and lighting stages.',
            file: 'DepthPrepass.cpp',
          },
          {
            title: 'Lighting Pass — Fragment Shader',
            description:
              'This is my deferred lighting fragment shader. It reconstructs the world position from the depth buffer, samples the G-buffer textures (albedo, normal, metallic, roughness), and applies physically-based lighting (PBR). It supports both directional and point lights, using GGX microfacet BRDF for specular reflection, Schlick’s Fresnel approximation, and Smith’s geometry term. When no geometry is present (depth ≥ 1), it renders the skybox. It also includes image-based lighting (IBL) using a diffuse irradiance cubemap for ambient contribution. The final output is the combined diffuse + specular lighting written to outColor.',
            file: 'LightingFrag.glsl',
          },
          {
            title: 'Creating Descriptor Set Layouts',
            description:
              'This function creates all the descriptor set layouts used in my renderer. To make this process easier and less error-prone, I used a builder pattern for the Vulkan descriptor bindings and layouts. Instead of manually filling in big Vulkan structs every time, I can call methods like .SetDescriptorType(...).SetStageFlags(...).Build(). This makes it a lot cleaner and faster to set up all my descriptor sets — for the camera, materials, G-buffer, lights, and post-processing — without repeating tons of Vulkan boilerplate.',
            file: 'CreateDescriptorSetLayouts.cpp',
          },
        ].map((snippet, index) => (
          <Box
            key={index}
            sx={{
              mb: 2,
              backgroundColor: 'rgba(255,255,255,0.03)',
              borderRadius: 2,
              border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}
          >
            <Accordion
              disableGutters
              sx={{
                backgroundColor: 'transparent',
                '&:before': { display: 'none' },
              }}
            >
              <AccordionSummary
                expandIcon={<span style={{ color: '#7b72f0', fontSize: '1.2rem' }}>▸</span>}
                sx={{
                  '& .MuiAccordionSummary-content': { margin: 0 },
                  '&.Mui-expanded': { backgroundColor: 'rgba(255,255,255,0.04)' },
                  transition: 'background 0.2s',
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: 'text.primary',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                  }}
                >
                  {snippet.title}
                </Typography>
              </AccordionSummary>

              <AccordionDetails sx={{ p: 0 }}>
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
          </Box>
        ))}
      </Container>

      <Divider sx={{ my: 3, opacity: 0.2 }} />

      {/* ==================== TECHNICAL CHALLENGES ==================== */}
      <Container maxWidth="md" sx={{ mb: 10 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Technical Challenges & Learnings
        </Typography>

        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
One of the main challenges I faced was properly managing synchronization between Vulkan’s different subpasses and stages. Making sure each resource was in the right state at the right moment required quite a bit of experimentation and debugging. Another challenge was handling the lifetime of resources, especially separating those that need to exist per frame from those that persist across frames. Setting up a clean deletion queue system helped a lot with that. I also had to carefully design the descriptor set layout, deciding how often each set should update and how to organize them to keep things efficient and maintainable.
        </Typography>
      </Container>
    </Box>
  );
}
