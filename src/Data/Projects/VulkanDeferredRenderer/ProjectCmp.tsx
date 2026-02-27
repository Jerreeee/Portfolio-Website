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
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h1" sx={gradientH1Styles}>
          {data.title}
        </Typography>
      </Container>

      {/* ==================== OVERVIEW ==================== */}
      <ProjectOverviewCmp project={project} />

      <Divider sx={{ my: 3, opacity: 0.2 }} />

      {/* ==================== MAIN FEATURES ==================== */}
      <Container maxWidth="md" sx={{ mb: 6 }}>
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

      {/* ==================== RENDER PASS BREAKDOWN ==================== */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Frame Breakdown
        </Typography>

        <ImageMultiCompareCmp
          images={getMediaItemsFromManifest(manifest, [
            'depth',
            'GBuffer_Albedo',
            'GBuffer_MetallicRoughness',
            'LightingPass_InWorldNormal',
            'GBuffer_WorldNormal',
            'LightingPass_Ambient_Albedo',
            'LightingPass_DirLight_Albedo',
            'LightingPass_DirLight_AlbedoNormal',
            'LightingPass_DirLight_PBR',
            'LightingPass_DirAndPointLight_PBR',
            'LightingPass_DirAndPointLight_PBR_Skybox',
            'LightingPass_DirAndPointLight_PBR_Skybox_IBL',
          ])}
        />
      </Container>

      <Divider sx={{ my: 3, opacity: 0.2 }} />

      {/* ==================== CODE SNIPPETS ==================== */}
      <Container maxWidth="md" sx={{ mb: 12 }}>
      <Typography variant="h3" align="center">
        Code Snippets
      </Typography>

        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
          Here are some code snippets demonstrating key parts of my Deferred Renderer.
        </Typography>

      {[
          {
            title: 'Depth Prepass',
            description:
              'This function handles my Depth Pre-Pass stage. I first transition the depth image into the proper layout for depth writes, then begin a depth-only rendering pass using Vulkan\u2019s dynamic rendering. I bind the depth pre-pass pipeline, set the viewport and scissor, and draw all meshes to fill the depth buffer. This ensures early depth testing works efficiently in later passes like the G-buffer and lighting stages.',
            file: 'DepthPrepass.cpp',
          },
          {
            title: 'Lighting Pass \u2014 Fragment Shader',
            description:
              'This is my deferred lighting fragment shader. It reconstructs the world position from the depth buffer, samples the G-buffer textures (albedo, normal, metallic, roughness), and applies physically-based lighting (PBR). It supports both directional and point lights, using GGX microfacet BRDF for specular reflection, Schlick\u2019s Fresnel approximation, and Smith\u2019s geometry term. When no geometry is present (depth \u2265 1), it renders the skybox. It also includes image-based lighting (IBL) using a diffuse irradiance cubemap for ambient contribution. The final output is the combined diffuse + specular lighting written to outColor.',
            file: 'LightingFrag.glsl',
          },
          {
            title: 'Creating Descriptor Set Layouts',
            description:
              'This function creates all the descriptor set layouts used in my renderer. To make this process easier and less error-prone, I used a builder pattern for the Vulkan descriptor bindings and layouts. Instead of manually filling in big Vulkan structs every time, I can call methods like .SetDescriptorType(...).SetStageFlags(...).Build(). This makes it a lot cleaner and faster to set up all my descriptor sets \u2014 for the camera, materials, G-buffer, lights, and post-processing \u2014 without repeating tons of Vulkan boilerplate.',
            file: 'CreateDescriptorSetLayouts.cpp',
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
                  sx={{ color: 'text.secondary', mb: 1 }}
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

      <Divider sx={{ my: 3, opacity: 0.2 }} />

      {/* ==================== TECHNICAL CHALLENGES ==================== */}
      <Container maxWidth="md" sx={{ mb: 10 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Technical Challenges & Learnings
        </Typography>

        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
One of the main challenges I faced was properly managing synchronization between Vulkan\u2019s different subpasses and stages. Making sure each resource was in the right state at the right moment required quite a bit of experimentation and debugging. Another challenge was handling the lifetime of resources, especially separating those that need to exist per frame from those that persist across frames. Setting up a clean deletion queue system helped a lot with that. I also had to carefully design the descriptor set layout, deciding how often each set should update and how to organize them to keep things efficient and maintainable.
        </Typography>
      </Container>
    </Box>
  );
}
