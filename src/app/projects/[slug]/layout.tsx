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
        maxWidth: (t) => t.breakpoints.values.lg,
        mx: "auto",
        width: "100%",
        px: 2,
        py: 2,
        mt: navbarHeight, // push below navbar
        minWidth: 0,
      }}
    >
      {children}
    </Box>
  );
}
