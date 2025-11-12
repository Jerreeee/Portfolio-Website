'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material';
import IconCmp from '@/Themes/Default/Components/Icon/IconCmp';
import { aboutInfo } from '@/Data/about';

export default function About() {
  const theme = useTheme();
  const { bio, contact, skills } = aboutInfo;

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
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Box
              component="img"
              src={bio.profileImage}
              alt={`${bio.firstName} ${bio.lastName}`}
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
              {/* Email */}
              <Tooltip title="Copy Email">
                <IconButton
                  color="primary"
                  size="large"
                  onClick={() => navigator.clipboard.writeText(contact.email)}
                >
                  <IconCmp techName="Email" />
                </IconButton>
              </Tooltip>

              {/* Social Links */}
              {Object.values(contact.links).map(
                (link) =>
                  link && (
                    <Tooltip key={link.label} title={link.tooltip}>
                      <IconButton
                        component="a"
                        href={link.href}
                        target="_blank"
                        color="primary"
                        size="large"
                        sx={{
                          width: 48,
                          height: 48,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          p: 1.2,
                          borderRadius: '50%',
                          transition: 'transform 0.15s ease',
                          '&:hover': { transform: 'scale(1.1)' },
                        }}
                      >
                        <Box
                          sx={{
                            width: 28,
                            height: 28,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <IconCmp techName={link.icon} grayScaleIconColor='#FFFFFF' />
                        </Box>
                      </IconButton>
                    </Tooltip>
                  )
              )}
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
              {bio.description}
            </Typography>
          </Grid>
        </Grid>

        {/* ================= SKILLS SECTION ================= */}
        <Box sx={{ mb: 6 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                background:
                  'linear-gradient(135deg, #3fa0ff 0%, #7b72f0 50%, #ec38bc 100%)',
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

          {/* Languages */}
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

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0.25,
                alignItems: 'center',
              }}
            >
              {skills.languages.map((lang) => (
                <Typography
                  key={lang.name}
                  variant="caption"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: '0.75rem',
                  }}
                >
                  {lang.name}
                  {lang.level ? ` — ${lang.level}` : ''}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Skill Groups in two columns */}
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ px: { xs: 1, md: 2 } }}
          >
            {skills.groups.map((section, i) => (
              <Grid
                key={section.title}
                size={{ xs: 12, md: 6 }}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.5,
                  // Force odd/even distribution so last "Art & Design" stays left
                  gridColumn: { md: i % 2 === 0 ? '1' : '2' },
                }}
              >
                <Box
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: `1px solid rgba(255,255,255,0.06)`,
                    borderRadius: 2,
                    p: 1.25,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.5,
                    height: '100%',
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
                          justifyContent: 'center',
                          height: 22,
                          minWidth: 22,
                          opacity: 0.9,
                          transition: 'transform 0.15s ease',
                          '&:hover': { transform: 'scale(1.1)' },
                        }}
                      >
                        <IconCmp techName={item} showDisplayName />
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
