"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconButton, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/Themes/ThemeProvider";
import { anims } from "@/Themes/animations";
import { mergeAnims } from "@/Utils/MergeObjects";
import { makeSlotFactory } from "@/Utils/makeSlotFactory";
import { navbarCmp } from "./NavbarCmpClasses"; // ✅ DO NOT CHANGE
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
  overflow: 'hidden',
}));

const NavbarTopRow = makeSlot("div", "topRow")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
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
  const { theme } = useTheme();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const baseHeight =
    props.height ?? theme.components?.NavbarCmp?.defaultProps?.height ?? 64;

  return (
    <NavbarRoot>
      {/* ─────────────────────────────
          TOP ROW (brand + desktop links + hamburger)
      ───────────────────────────── */}
      <NavbarTopRow>
        <NavbarBrand>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="h6">Jeroen Denayer</Typography>
          </Link>
        </NavbarBrand>

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

        <MobileMenuButton onClick={() => setOpen((v) => !v)} size="large">
          {open ? <CloseIcon /> : <MenuIcon />}
        </MobileMenuButton>
      </NavbarTopRow>

      {/* ─────────────────────────────
          EXPANDING MOBILE MENU
      ───────────────────────────── */}
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
