import { ReactNode } from "react";
import { Typography } from "@mui/material";

export interface SectionLabelProps {
  children: ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <Typography
      sx={{
        fontSize: "4mm",
        fontWeight: 800,
        letterSpacing: "0.6mm",
        lineHeight: 1,
      }}
    >
      {children}
    </Typography>
  );
}
