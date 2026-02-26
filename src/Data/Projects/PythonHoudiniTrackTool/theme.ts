import type { Theme, ThemeOptions } from '@mui/material/styles';

const HOUDINI_ORANGE = '#FF6B35';
const HOUDINI_ORANGE_DARK = '#CC4A15';

export const themeExtension = (base: Theme): ThemeOptions => {
  const isDark = base.palette.mode === 'dark';
  const headingBg = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)';

  return {
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          [data-project="PythonHoudiniTrackTool"] .doc-content h4,
          [data-project="PythonHoudiniTrackTool"] .doc-content h5,
          [data-project="PythonHoudiniTrackTool"] .doc-content h6 {
            background-color: ${headingBg};
            border-radius: ${base.shape.borderRadius}px;
          }
          [data-project="PythonHoudiniTrackTool"] .MuiAccordionSummary-root {
            background-color: ${HOUDINI_ORANGE};
          }
          [data-project="PythonHoudiniTrackTool"] .MuiAccordionSummary-root.Mui-expanded {
            background-color: ${HOUDINI_ORANGE_DARK};
          }
          [data-project="PythonHoudiniTrackTool"] .MuiAccordionSummary-root .MuiTypography-root {
            color: ${base.palette.common.white};
          }
          [data-project="PythonHoudiniTrackTool"] .MuiAccordionSummary-expandIconWrapper {
            color: ${base.palette.common.white};
          }
        `,
      },
    },
  };
};
