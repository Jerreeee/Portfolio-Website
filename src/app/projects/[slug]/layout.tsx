"use client";

import Link from "next/link";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@/Themes/ThemeProvider";

export default function ProjectSlugLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const navbarHeight = theme.components?.NavbarCmp?.defaultProps?.height ?? 64;
  console.log("navbarHeight: ", navbarHeight);
  const backBarHeight = theme.spacing(5);

  return (
    <>
      {/* Fixed back bar for *small screens only* */}
      <Box
        sx={{
          position: "fixed",
          top: navbarHeight,
          left: 0,
          width: "100%",
          display: { xs: "block", md: "none" },
          bgcolor: theme.palette.grey[900],
          color: "text.primary",
          borderBottom: `1px solid ${theme.palette.divider}`,
          height: backBarHeight,
          zIndex: 900,
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 2,
          }}
        >
          <Typography
            component={Link}
            href="/projects"
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontSize: "0.9rem",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            ← Back to Projects
          </Typography>
        </Box>
      </Box>

      {/* Responsive layout (Box instead of Grid because we use CSS grid) */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",         // full width
            md: "1fr 70% 1fr"  // sidebar + content + spacer
          },
        }}
      >
        {/* Left spacer column (desktop only) */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <Box
            sx={{
              position: "fixed",
              top: `calc(${navbarHeight}px + ${theme.spacing(2)})`,
              left: theme.spacing(1),
              zIndex: 900,
            }}
          >
            <Button
              component={Link}
              href="/projects"
              variant="outlined"
              size="small"
              sx={{
                textTransform: "none",
                borderRadius: 2,
                fontSize: "0.9rem",
                px: 2,
                py: 0.75,
              }}
            >
              ← Back to Projects
            </Button>
          </Box>
        </Box>

        {/* Main content */}
        <Box component="main" sx={{ py: { xs: 2, md: 0 } }}>
          {children}
        </Box>

        {/* Right spacer column */}
        <Box sx={{ display: { xs: "none", md: "block" } }} />
      </Box>
    </>
  );
}
