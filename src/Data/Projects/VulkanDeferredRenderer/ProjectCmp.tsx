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
        
        <ImageMultiCompareCmp
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
          bars={[
              {
                bars: [
                  { start: 0, end: 4, label: 'G-Buffer', color: '#8e24aa' },
                  { start: 4, end: 11, label: 'Lighting & Postprocess Buildup', color: '#43a047' },
                ],
              },
          ]}
        />

        <div style={{display: 'flex', width: '100%', height: '200px'}}>
          <Timeline
            rangeProvider={makeDefaultRangeProvider([0, 100])}
            leftColumnWidth={200}
            showLabels
            showTopBar
            scaleToFit
          >
            {/* Root Group */}
            <Timeline.Group name="Render Pipeline">
              <Timeline.BarLayer
                name="Main Build"
                bars={[
                  { start: 0, end: 15, label: 'Setup', color: '#2196f3' },
                  { start: 15, end: 45, label: 'Core Build', color: '#43a047' },
                  { start: 45, end: 55, label: 'Integration', color: '#fbc02d' },
                  { start: 55, end: 70, label: 'Polish', color: '#9c27b0' },
                ]}
              >
                {/* Nested visual layers */}
                <Timeline.BarLayer
                  name="GBuffer Stage"
                  bars={[
                    { start: 0, end: 20, label: 'Geometry', color: '#42a5f5' },
                    { start: 20, end: 30, label: 'Normals', color: '#26a69a' },
                  ]}
                />

                <Timeline.BarLayer
                  name="Lighting Stage"
                  bars={[
                    { start: 10, end: 40, label: 'Lighting', color: '#ff7043' },
                    { start: 40, end: 60, label: 'Shadows', color: '#26c6da' },
                    { start: 60, end: 90, label: 'Reflections', color: '#8bc34a' },
                  ]}
                >
                  <Timeline.BarLayer
                    name="Shadow Subsystem"
                    bars={[
                      { start: 15, end: 35, label: 'Cascades', color: '#ef5350' },
                      { start: 40, end: 65, label: 'Softening', color: '#ab47bc' },
                    ]}
                  />
                  <Timeline.BarLayer
                    name="Reflections Subsystem"
                    bars={[
                      { start: 55, end: 75, label: 'SSR', color: '#26c6da' },
                      { start: 75, end: 90, label: 'Cubemaps', color: '#7e57c2' },
                    ]}
                  />
                </Timeline.BarLayer>

                <Timeline.BarLayer
                  name="Postprocess"
                  bars={[
                    { start: 30, end: 50, label: 'Bloom', color: '#f06292' },
                    { start: 50, end: 70, label: 'Tone Mapping', color: '#64b5f6' },
                    { start: 70, end: 85, label: 'FXAA', color: '#ffd54f' },
                    { start: 85, end: 95, label: 'Final Output', color: '#81c784' },
                  ]}
                >
                  <Timeline.GraphLayer
                    name="Performance Graph"
                    data={Array.from({ length: 50 }).map((_, i) => ({
                      x: i * 2,
                      y: Math.abs(Math.sin(i / 6)) * 0.8 + 0.1,
                    }))}
                    height={60}
                  />

                  <Timeline.GraphLayer
                    name="CPU Usage Graph"
                    data={Array.from({ length: 30 }).map((_, i) => ({
                      x: i * 3,
                      y: Math.abs(Math.sin(i / 5)) * 0.6 + 0.2,
                    }))}
                    height={60}
                  />
                </Timeline.BarLayer>
              </Timeline.BarLayer>
            </Timeline.Group>

            {/* Additional root groups */}
            <Timeline.Group name="Async Compute">
              <Timeline.BarLayer
                bars={[
                  { start: 0, end: 50, label: 'Particle Simulation', color: '#66bb6a' },
                  { start: 60, end: 90, label: 'AI Occlusion', color: '#ffb74d' },
                ]}
              />
            </Timeline.Group>

            <Timeline.Group name="UI Rendering" collapsed>
              <Timeline.BarLayer
                name="Yeet"
                bars={[
                  { start: 10, end: 80, label: 'UI Layout Pass', color: '#8d6e63' },
                ]}
              >
                <Timeline.BarLayer
                  name="Widgets"
                  bars={[
                    { start: 15, end: 35, label: 'Minimap', color: '#26a69a' },
                    { start: 35, end: 70, label: 'HUD', color: '#7cb342' },
                  ]}
                />
              </Timeline.BarLayer>
            </Timeline.Group>
          </Timeline>
        </div>


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
