import { useState, Children, isValidElement, ReactNode, ReactElement } from "react";
import { Box } from "@mui/material";
import { Item, ItemProps } from "./Item";
import { useAppTheme } from "@/Themes/ThemeProvider";

export interface CardTabsProps {
  children?: ReactNode;
  defaultIndex?: number;
}

export function CardTabs({ children, defaultIndex = 0 }: CardTabsProps) {
  const { theme } = useAppTheme();
  const items = Children.toArray(children).filter(isValidElement) as ReactElement<ItemProps>[];

  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const activeContent = items[activeIndex]?.props.children;

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: `${theme.shape.borderRadius}px`,
        overflow: "hidden", // ensures header + body look like one card
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
      }}
    >
      {/* === HEADER BAR === */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          justifyContent: "center",
          alignContent: "center",
          px: 2,
          py: 1.25,
          bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        {items.map((item, index) => {
          const selected = index === activeIndex;
          return (
            <Box
              key={item.props.label}
              onClick={() => setActiveIndex(index)}
              sx={{
                px: 2,
                py: 0.9,
                cursor: "pointer",
                borderRadius: `${theme.shape.borderRadius}px`,
                fontSize: "0.9rem",
                whiteSpace: "nowrap",
                transition: "0.2s ease",
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: theme.palette.action.hover,
                color: theme.palette.text.secondary,
                "&:hover": {
                  bgcolor: theme.palette.action.selected,
                },
                ...(selected && {
                  border: `1px solid ${theme.palette.primary.main}`,
                  bgcolor: theme.palette.action.selected,
                  color: theme.palette.text.primary,
                }),
              }}
            >
              {item.props.label}
            </Box>
          );
        })}
      </Box>

      {/* === CONTENT AREA === */}
      <Box
        key={activeIndex}
        sx={{
          p: 2,
          bgcolor: theme.palette.background.paper,
        }}
      >
        {activeContent}
      </Box>
    </Box>
  );
}

CardTabs.Item = Item;
