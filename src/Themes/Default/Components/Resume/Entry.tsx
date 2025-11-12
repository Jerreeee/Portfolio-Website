import { Box, Typography, Link as MuiLink } from "@mui/material";

export interface EntryProps {
  title: string;
  right?: string;
  sub?: string;
  body: string;
  link?: string;
}

export function Entry({ title, right, sub, body, link }: EntryProps) {
  return (
    <Box
      sx={{
        mt: "2mm",
        breakInside: "avoid",
        pageBreakInside: "avoid",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          gap: "1.6mm",
          mb: "1mm",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "3.4mm",
            flex: 1,
            lineHeight: 1.05,
          }}
        >
          {title}
        </Typography>

        {right && (
          <Typography
            sx={{
              fontSize: "3.1mm",
              lineHeight: 1,
            }}
          >
            {right}
          </Typography>
        )}
      </Box>

      {sub && (
        <Typography
          sx={{
            fontSize: "2.9mm",
            fontStyle: "italic",
            color: "#444",
            mt: "-3mm",
            mb: "0.5mm",
            lineHeight: 1,
          }}
        >
          {sub}
        </Typography>
      )}

      <Typography
        sx={{
          fontSize: "3.1mm",
          lineHeight: 1.45,
        }}
      >
        {body}
      </Typography>

      {link && (
        <MuiLink
          href={link}
          sx={{
            fontSize: "3.1mm",
            color: "#0a84ff",
          }}
          underline="hover"
        >
          {link}
        </MuiLink>
      )}
    </Box>
  );
}
