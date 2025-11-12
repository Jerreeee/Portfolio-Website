import { ReactNode } from "react";
import { Box, Typography, Divider } from "@mui/material";

export interface TallSectionProps {
  title: string;
  children: ReactNode;
}

export function TallSection({ title, children }: TallSectionProps) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "4mm",
        breakInside: "avoid",
        pageBreakInside: "avoid",
        flexShrink: 1,
      }}
    >
      <Box
        sx={{
          width: "1.2mm",
          bgcolor: "#00d474",
          borderRadius: "1mm",
          flexShrink: 0,
        }}
      />

      <Box sx={{ flex: 1, minHeight: 0 }}>
        <Typography
          sx={{
            fontSize: "5mm",
            fontWeight: 800,
            letterSpacing: "0.5mm",
            lineHeight: 1,
            display: "inline-flex",
            alignItems: "flex-end",
            margin: 0,
            padding: 0,
          }}
        >
          {title}
        </Typography>

        <Divider
          sx={{
            mt: "0.3mm",
            mb: "1.2mm",
            borderColor: "#000",
          }}
        />

        <Typography
          component="div"
          sx={{
            fontSize: "3.3mm",
            lineHeight: 1.5,
          }}
        >
          {children}
        </Typography>
      </Box>
    </Box>
  );
}
