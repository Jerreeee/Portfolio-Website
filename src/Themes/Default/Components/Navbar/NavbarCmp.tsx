"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconButton,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  ListSubheader,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PaletteIcon from "@mui/icons-material/Palette";
import { motion, AnimatePresence } from "framer-motion";
import { useAppTheme } from "@/Themes/ThemeProvider";
import { themeRegistry } from "@/Themes";
import type { ThemeName, VariationName } from "@/Themes";
import { anims } from "@/Themes/animations";
import { mergeAnims } from "@/Utils/MergeObjects";
import { makeSlotFactory } from "@/Utils/makeSlotFactory";
import { navbarCmp } from "./NavbarCmpClasses";
import { useState } from "react";

// =====================================================================
// ========================= Slot Definitions ==========================

const makeSlot = makeSlotFactory("NavbarCmp", navbarCmp);

const NavbarRoot = makeSlot(motion.nav, "root")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1000,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  minHeight: theme.components?.NavbarCmp?.defaultProps?.height ?? 64,
  overflow: "hidden",
}));

const NavbarTopRow = makeSlot("div", "topRow")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: theme.spacing(2, 3),
  height: theme.components?.NavbarCmp?.defaultProps?.height ?? 64,
}));

const NavbarBrand = makeSlot(motion.div, "brand")(() => ({}));

const NavbarList = makeSlot(motion.ul, "list")(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("md")]: {
    display: "flex",
    gap: theme.spacing(4),
  },
  listStyle: "none",
  padding: 0,
  margin: 0,
}));

const NavbarItem = makeSlot(motion.li, "item")({});

const NavbarLink = makeSlot(Link, "link", {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ theme, active }) => ({
  position: "relative",
  padding: theme.spacing(1, 1.5),
  borderRadius: theme.shape.borderRadius,
  textDecoration: "none",
  color: "inherit",
  ...(active && { fontWeight: 500 }),
}));

const NavbarUnderline = makeSlot(motion.span, "underline")(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  height: 2,
  backgroundColor: theme.palette.primary.main,
}));

const MobileMenuButton = makeSlot(IconButton, "mobileButton")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const DividerLine = makeSlot("div", "divider")(({ theme }) => ({
  width: "100%",
  height: 1,
  backgroundColor: theme.palette.divider,
}));

const MobileMenu = makeSlot(motion.div, "mobileMenu")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: theme.spacing(2),
  gap: theme.spacing(2),
  backgroundColor: "inherit",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

// =====================================================================
// ============================= Component =============================

export interface NavItem {
  href: string;
  label: string;
}

export interface NavbarCmpSettings {}

export interface NavbarCmpProps {
  navItems?: NavItem[];
  height?: number | string;
}

export default function NavbarCmp(props: NavbarCmpProps) {
  const { theme, themeID, setTheme } = useAppTheme();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [themeMenuAnchor, setThemeMenuAnchor] = useState<null | HTMLElement>(null);

  const baseHeight =
    props.height ?? theme.components?.NavbarCmp?.defaultProps?.height ?? 64;

  // Only show on /projects/[slug]
  const showBackToProjects = /^\/projects\/[^\/]+\/?$/.test(pathname ?? "");

  // Build grouped list of theme options from the live registry
  const themeGroups = Object.entries(themeRegistry).map(([themeName, family]) => ({
    themeName: themeName as ThemeName,
    variations: Object.keys(family.variations) as VariationName<ThemeName>[],
  }));

  return (
    <NavbarRoot>
      <NavbarTopRow>
        {/* Left side group (Back button + Brand) */}
        <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
          {showBackToProjects && (
            <Button
              component={Link}
              href="/projects"
              variant="outlined"
              onClick={() => setOpen(false)}
              size="small"
              sx={{
                textTransform: "none",
                borderRadius: 2,
                fontSize: "0.85rem",
                mr: 1,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                minWidth: "auto",
                px: 1.2,
              }}
            >
              <ArrowBackIcon fontSize="small" />
            </Button>
          )}

          <NavbarBrand>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography variant="h6">Jeroen Denayer</Typography>
            </Link>
          </NavbarBrand>
        </Box>

        {/* Desktop nav items */}
        <NavbarList>
          {props.navItems?.map((item) => {
            const isActive = pathname === item.href;
            return (
              <NavbarItem key={item.href}>
                <motion.div
                  {...mergeAnims(
                    true,
                    anims.hoverScale(1.035),
                    anims.tapScale(0.9)
                  )}
                >
                  <NavbarLink href={item.href} active={isActive}>
                    <Typography variant="h6" component="span">
                      {item.label}
                    </Typography>
                    {isActive && <NavbarUnderline layoutId="nav-underline" />}
                  </NavbarLink>
                </motion.div>
              </NavbarItem>
            );
          })}
        </NavbarList>

        {/* Right side: theme switcher + mobile hamburger */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flex: 1, justifyContent: "flex-end" }}>
          <Tooltip title="Switch theme">
            <IconButton
              onClick={(e) => setThemeMenuAnchor(e.currentTarget)}
              size="small"
              aria-label="Switch theme"
            >
              <PaletteIcon fontSize="small" sx={{ color: 'text.primary' }} />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={themeMenuAnchor}
            open={Boolean(themeMenuAnchor)}
            onClose={() => setThemeMenuAnchor(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {themeGroups.map(({ themeName, variations }) => [
              themeGroups.length > 1 && (
                <ListSubheader key={`header-${themeName}`} disableSticky>
                  {themeName}
                </ListSubheader>
              ),
              ...variations.map((variation) => {
                const isActive =
                  themeID.name === themeName && themeID.variation === variation;
                return (
                  <MenuItem
                    key={`${themeName}-${variation}`}
                    selected={isActive}
                    onClick={() => {
                      setTheme({ name: themeName, variation });
                      setThemeMenuAnchor(null);
                    }}
                  >
                    {themeGroups.length > 1 ? variation : `${themeName} · ${variation}`}
                  </MenuItem>
                );
              }),
            ])}
          </Menu>

          <MobileMenuButton onClick={() => setOpen((v) => !v)} size="large">
            {open ? <CloseIcon /> : <MenuIcon />}
          </MobileMenuButton>
        </Box>
      </NavbarTopRow>

      {/* Mobile expanding menu */}
      <AnimatePresence initial={false}>
        {open && (
          <>
            <DividerLine />
            <MobileMenu
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              {props.navItems?.map((item) => (
                <Box
                  key={item.href}
                  component={Link}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  sx={{
                    color: "text.primary",
                    textDecoration: "none",
                    fontSize: "1.1rem",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {item.label}
                </Box>
              ))}
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </NavbarRoot>
  );
}
