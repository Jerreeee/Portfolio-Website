'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { styled, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';
import { anims } from '@/Themes/animations';
import { mergeAnims } from '@/utils/MergeObjects';

// =====================================================================
// ========================= Slot Definitions ==========================

const NavbarRoot = styled(motion.nav, { name: 'Navbar', slot: 'Root' })(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 50,
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2, 3),
}));

const NavbarBrand = styled(motion.div, { name: 'Navbar', slot: 'Brand' })(({ theme }) => ({}));

const NavbarList = styled(motion.ol, { name: 'Navbar', slot: 'List' })(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    gap: theme.spacing(4),
  },
}));

const NavbarItem = styled(motion.li, { name: 'Navbar', slot: 'Item' })({});

const NavbarLink = styled(Link, { name: 'Navbar', slot: 'Link' })<{ active?: boolean }>(
  ({ theme, active }) => ({
    position: 'relative',
    padding: theme.spacing(1, 1.5),
    borderRadius: theme.shape.borderRadius,
    textDecoration: 'none',
    ...(active && { fontWeight: 500 }),
  })
);

const NavbarUnderline = styled(motion.span, { name: 'Navbar', slot: 'Underline' })(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: 2,
}));

// =====================================================================
// ============================= Component =============================

export interface NavbarProps {}

export default function NavbarCmp(props: NavbarProps) {
  const theme = useTheme();
  const anim = theme.components?.Navbar?.slotAnimations ?? {};
  const pathname = usePathname();

  const navItems = [
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/resume', label: 'Resume' },
  ];

  return (
    <NavbarRoot {...(anim.root || {})}>
      {/* Brand */}
      <NavbarBrand {...(anim.brand || {})}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Typography variant="h6">Jeroen Denayer</Typography>
        </Link>
      </NavbarBrand>

      {/* Nav links */}
      <NavbarList {...(anim.list || {})}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <NavbarItem key={item.href} {...(anim.item || {})}>
              <motion.div {...mergeAnims(true, anims.hoverScale(1.035), anims.tapScale(0.9))}>
                <NavbarLink href={item.href} active={isActive}>
                  {item.label}
                  {isActive && (
                    <NavbarUnderline layoutId="nav-underline" {...(anim.underline || {})} />
                  )}
                </NavbarLink>
              </motion.div>
            </NavbarItem>
          );
        })}
      </NavbarList>
    </NavbarRoot>
  );
}
