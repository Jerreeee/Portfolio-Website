import type { Theme, ThemeOptions } from '@mui/material/styles';

const HOUDINI_ORANGE = '#FF6B35';
const HOUDINI_ORANGE_DARK = '#CC4A15';

export const themeExtension = (base: Theme): ThemeOptions => {
  const isDark = base.palette.tone === 'dark';
  const headingBg = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)';

  return {
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          [data-project="PythonHoudiniTrackTool"] h4 {
            background-color: ${headingBg};
            color: ${base.palette.text.primary};
            padding: ${base.spacing(1)};
            border-radius: ${base.shape.borderRadius}px;
          }
          [data-project="PythonHoudiniTrackTool"] h5 {
            background-color: ${headingBg};
            color: ${base.palette.text.primary};
            padding: ${base.spacing(1)};
            margin-top: ${base.spacing(3)};
            margin-bottom: ${base.spacing(1.5)};
            border-radius: ${base.shape.borderRadius}px;
          }
          [data-project="PythonHoudiniTrackTool"] h6 {
            background-color: ${headingBg};
            color: ${base.palette.text.primary};
            padding: ${base.spacing(1)};
            margin-top: ${base.spacing(2)};
            margin-bottom: ${base.spacing(1)};
            border-radius: ${base.shape.borderRadius}px;
          }
          [data-project="PythonHoudiniTrackTool"] .MuiAccordionSummary-root {
            background-color: ${HOUDINI_ORANGE};
          }
          [data-project="PythonHoudiniTrackTool"] .MuiAccordionSummary-root.Mui-expanded {
            background-color: ${HOUDINI_ORANGE_DARK};
          }
          [data-project="PythonHoudiniTrackTool"] .MuiAccordionSummary-root .MuiTypography-root {
            color: #ffffff;
            font-size: ${base.typography.h2.fontSize};
            font-weight: ${base.typography.h2.fontWeight ?? 400};
          }
          [data-project="PythonHoudiniTrackTool"] .MuiAccordionSummary-expandIconWrapper {
            color: #ffffff;
          }
        `,
      },
    },
  };
};
