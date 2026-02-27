'use client';

import React from 'react';
import EmailIcon from '@mui/icons-material/Email';
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useAppTheme, useComponents } from '@/Themes/ThemeProvider';
import { aboutInfo } from '@/Data/about';
import { gradientH1Styles } from '@/Themes/Default/themeUtils';

export default function About() {
  const { theme } = useAppTheme();
  const { IconCmp } = useComponents();
  const { bio, contact, skills } = aboutInfo;

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        py: { xs: 6, md: 12 },
        background: theme.palette.gradients.background(),
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
                  <IconCmp libraryIcon={<EmailIcon />} />
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
                          <IconCmp techName={link.icon} />
                        </Box>
                      </IconButton>
                    </Tooltip>
                  )
              )}
            </Box>
          </Grid>

          {/* Bio */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography variant="h1" sx={[gradientH1Styles, { mb: 2 }]}>
              About Me
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
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
                background: theme.palette.gradients.primary(),
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
              background: theme.palette.gradients.primary('90deg'),
              borderRadius: `${theme.shape.borderRadius}px`,
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
                    backgroundColor: theme.palette.action.hover,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: `${theme.shape.borderRadius}px`,
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
