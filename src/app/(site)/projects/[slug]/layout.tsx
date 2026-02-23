"use client";

import { Box, Container } from "@mui/material";
import { useAppTheme } from "@/Themes/ThemeProvider";

export default function ProjectSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useAppTheme();
  const navbarHeight =
    theme.components?.NavbarCmp?.defaultProps?.height ?? 64;

  return (
    <div
      style={{
        background: 'linear-gradient(to bottom, #151a2c, #221730)',
      }}
    >
      <Box
        component="main"
        sx={{
          maxWidth: theme.breakpoints.values.lg,
          mx: "auto",
          width: "100%",
          background: 'rgba(255, 255, 255 0.1)',
          backdropFilter: 'saturate(150%) brightness(125%)',
        }}
      >
        <Container>
          {children}
        </Container>
      </Box>
    </div>
  );
}
