"use client";

import { Box } from "@mui/material";
import { useTheme } from "@/Themes/ThemeProvider";

export default function ProjectSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const navbarHeight =
    theme.components?.NavbarCmp?.defaultProps?.height ?? 64;

  return (
    <Box
      component="main"
      sx={{
        maxWidth: theme.breakpoints.values.lg,
        mx: "auto",
        width: "100%",
      }}
    >
      {children}
    </Box>
  );
}
