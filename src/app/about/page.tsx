'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material';
import { GitHub, LinkedIn, Email, Brush } from '@mui/icons-material';
import IconCmp from '@/Themes/Default/Components/Icon/IconCmp';

export default function About() {
  const theme = useTheme();

  const renderDenseIcons = (items: string[]) => (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
        gap: 1.5,
        justifyItems: 'center',
        alignItems: 'center',
      }}
    >
      {items.map((item) => (
        <Box
          key={item}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 0.5,
          }}
        >
          <Box sx={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconCmp techName={item} />
          </Box>
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.75rem' }}>
            {item}
          </Typography>
        </Box>
      ))}
    </Box>
  );

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        py: { xs: 6, md: 12 },
        background: 'linear-gradient(to bottom, #151a2c, #221730)',
      }}
    >
      <Container maxWidth="lg">
        {/* ================= ABOUT HEADER ================= */}
        <Grid container spacing={8} alignItems="center" sx={{ mb: 10 }}>
          {/* Profile + Contact */}
          <Grid
            size={{ xs: 12, md: 5 }}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}
          >
            <Box
              component="img"
              src="/profile.jpg"
              alt="Profile"
              sx={{
                width: { xs: 200, md: 240 },
                height: { xs: 200, md: 240 },
                borderRadius: '50%',
                border: `3px solid ${theme.palette.primary.main}`,
                boxShadow: `0 0 25px ${theme.palette.primary.main}40`,
                objectFit: 'cover',
              }}
            />

            {/* Contact Icons */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Tooltip title="Email">
                <IconButton
                  component="a"
                  href="mailto:jeroen.denayer@outlook.com"
                  color="primary"
                  size="large"
                >
                  <Email />
                </IconButton>
              </Tooltip>

              <Tooltip title="GitHub">
                <IconButton
                  component="a"
                  href="https://github.com/JeroenDenayer"
                  target="_blank"
                  color="primary"
                  size="large"
                >
                  <GitHub />
                </IconButton>
              </Tooltip>

              <Tooltip title="LinkedIn">
                <IconButton
                  component="a"
                  href="https://www.linkedin.com/in/jeroendenayer/"
                  target="_blank"
                  color="primary"
                  size="large"
                >
                  <LinkedIn />
                </IconButton>
              </Tooltip>

              <Tooltip title="ArtStation">
                <IconButton
                  component="a"
                  href="https://www.artstation.com/jeroendenayer"
                  target="_blank"
                  color="primary"
                  size="large"
                >
                  <Brush />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>

          {/* Bio */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography variant="gradientH1" sx={{ mb: 2 }}>
              About Me
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: '1.05rem',
                lineHeight: 1.7,
                maxWidth: 700,
              }}
            >
              I’m Jeroen Denayer, a C++ programmer and technical artist turned toolmaker who became fascinated by how
              much of creative work can be automated and improved. During my Game Graphics Production studies at DAE, I
              discovered procedural workflows through Houdini and quickly grew interested in how smart tools can remove
              repetitive tasks and streamline production. This eventually pushed me to dive deep into C++ and low-level
              GPU programming. Now, I’m driven to build tools and pipelines that make complex work simpler, faster, and
              far less repetitive.
            </Typography>
          </Grid>
        </Grid>

{/* ================= SKILLS SECTION ================= */}
<Box sx={{ mb: 6 }}>
  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
    <Typography
      variant="h4"
      sx={{
        fontWeight: 600,
        background: 'linear-gradient(135deg, #3fa0ff 0%, #7b72f0 50%, #ec38bc 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        display: 'inline-block',
      }}
    >
      Skills & Technologies
    </Typography>
  </Box>

  {/* Divider */}
  <Box
    sx={{
      height: 2,
      width: '60%',
      mx: 'auto',
      mb: 3,
      background: 'linear-gradient(90deg, #3fa0ff, #7b72f0, #ec38bc)',
      borderRadius: 1,
      opacity: 0.5,
    }}
  />

  {/* ===== Languages (Centered, Compact) ===== */}
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      mb: 2,
    }}
  >
    <Typography
      variant="subtitle1"
      sx={{
        color: theme.palette.text.primary,
        fontSize: '0.9rem',
        mb: 0.5,
      }}
    >
      Languages
    </Typography>

    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25, alignItems: 'center' }}>
      <Typography
        variant="caption"
        sx={{
          color: theme.palette.text.secondary,
          fontSize: '0.75rem',
        }}
      >
        Dutch — Native
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: theme.palette.text.secondary,
          fontSize: '0.75rem',
        }}
      >
        English — Fluent
      </Typography>
    </Box>
  </Box>


  {/* ===== Two Columns of Skill Groups ===== */}
  <Grid
    container
    spacing={2}
    justifyContent="center"
    sx={{
      px: { xs: 1, md: 2 },
    }}
  >
    {/* Left Column */}
    <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {[ 
        { title: 'Programming Languages', items: ['C++', 'Python', 'HLSL/GLSL', 'C#', 'TypeScript', 'Lua'] },
        { title: 'APIs & Libraries', items: ['Vulkan', 'OpenGL', 'ImGui', 'SDL', 'GLM', 'Assimp'] },
        { title: 'Game Engines', items: ['Unreal Engine', 'Unity'] },
      ].map((section) => (
        <Box
          key={section.title}
          sx={{
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: `1px solid rgba(255,255,255,0.06)`,
            borderRadius: 2,
            p: 1.25,
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: theme.palette.text.primary,
              fontSize: '0.85rem',
              mb: 0.25,
            }}
          >
            {section.title}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              alignItems: 'center',
            }}
          >
            {section.items.map((item) => (
              <Box
                key={item}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  minWidth: 'fit-content',
                }}
              >
                <Box
                  sx={{
                    width: 22,
                    height: 22,
                    opacity: 0.9,
                    transition: 'transform 0.15s ease',
                    '&:hover': { transform: 'scale(1.1)' },
                  }}
                >
                  <IconCmp techName={item} />
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: '0.7rem',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Grid>

    {/* Right Column */}
    <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {[
        { title: 'Tools & Pipeline', items: ['Houdini', 'Visual Studio', 'Visual Studio Code', 'RenderDoc', 'CMake', 'Substance Designer', 'Substance Painter', 'Blender', '3DS Max', 'Maya'] },
        { title: 'Art & Design', items: ['Photoshop', 'Premiere Pro', 'Marmoset Toolbag'] },
      ].map((section) => (
        <Box
          key={section.title}
          sx={{
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: `1px solid rgba(255,255,255,0.06)`,
            borderRadius: 2,
            p: 1.25,
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: theme.palette.text.primary,
              fontSize: '0.85rem',
              mb: 0.25,
            }}
          >
            {section.title}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              alignItems: 'center',
            }}
          >
            {section.items.map((item) => (
              <Box
                key={item}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  minWidth: 'fit-content',
                }}
              >
                <Box
                  sx={{
                    width: 22,
                    height: 22,
                    opacity: 0.9,
                    transition: 'transform 0.15s ease',
                    '&:hover': { transform: 'scale(1.1)' },
                  }}
                >
                  <IconCmp techName={item} />
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: '0.7rem',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Grid>
  </Grid>
</Box>

      </Container>
    </Box>
  );
}
