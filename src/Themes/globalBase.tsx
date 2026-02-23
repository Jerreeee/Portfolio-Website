import React from 'react';
import { ThemeOptions } from '@mui/material/styles';

/**
 * Global base theme options — applied to EVERY theme and variation.
 * Contains structural / behaviour overrides that are not palette-dependent.
 */
export const globalBase: ThemeOptions = {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },

    MuiTypography: {
      defaultProps: {
        variantMapping: {
          gradientH1: 'h1',
        },
      },
    },

    MuiAccordion: {
      defaultProps: {
        disableGutters: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.action.hover,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: `${theme.shape.borderRadius}px !important`,
          overflow: 'hidden',
          marginBottom: theme.spacing(2),
          '&:before': { display: 'none' },
        }),
      },
    },

    MuiAccordionSummary: {
      defaultProps: {
        expandIcon: <span style={{ fontSize: '1.2rem' }}>▸</span>,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiAccordionSummary-content': { margin: 0 },
          '&.Mui-expanded': { backgroundColor: theme.palette.action.hover },
          transition: 'background 0.2s',
          '& .MuiTypography-root': {
            color: theme.palette.text.primary,
            fontWeight: 500,
            fontSize: '0.9rem',
          },
        }),
        expandIconWrapper: ({ theme }) => ({
          color: theme.palette.primary.main,
          '&.Mui-expanded': { transform: 'rotate(90deg)' },
        }),
      },
    },

    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
  },
};
