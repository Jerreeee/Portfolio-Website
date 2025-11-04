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
            title: 'snake_game.lua',
            description:
              'This is the main lua file that initializes the game, sets up the window, and contains the main game loop. The game loop handles input, updates the game state, and renders the game each frame.',
            file: 'snake_game.lua',
          },
          {
            title: 'Lua C++ Bindings',
            description: 'In this part of the code, I set up all Lua bindings for my engine using Sol2. It exposes key C++ classes like ColorRGB, Bitmap, and GameEngine to Lua, allowing scripts to create objects, call engine functions, and interact with the rendering and game logic directly. To keep it organized, I grouped everything inside Game::CreateLuaBindings(), which handles all the registrations in one place.',
            file: 'CreateLuaBindings.cpp',
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
    </Box>
  );
}
