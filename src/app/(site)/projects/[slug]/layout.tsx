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
    <Box
      component="div"
      sx={{ background: theme.palette.gradients.background(), minHeight: '100vh' }}
    >
      <Box
        component="main"
        sx={{
          maxWidth: theme.breakpoints.values.lg,
          mx: "auto",
          width: "100%",
        }}
      >
        <Container>
          {children}
        </Container>
      </Box>
    </Box>
  );
}
