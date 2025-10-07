'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';
import { useTheme } from '@/Themes/ThemeProvider'
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
  height: theme.components?.Navbar?.defaultProps?.height,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2, 3),
}));

const NavbarBrand = styled(motion.div, { name: 'Navbar', slot: 'Brand' })(({ theme }) => ({}));

const NavbarList = styled(motion.ul, { name: 'Navbar', slot: 'List' })(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    gap: theme.spacing(4),
  },
  listStyle: 'none'
}));

const NavbarItem = styled(motion.li, { name: 'Navbar', slot: 'Item' })({});

const NavbarLink = styled(Link, { name: 'Navbar', slot: 'Link',
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active?: boolean }>(
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
  const anim = theme.components?.Navbar?.slotAnimations ?? {};
  const pathname = usePathname();

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
        {props.navItems?.map((item) => {
          const isActive = pathname === item.href;
          return (
            <NavbarItem key={item.href} {...(anim.item || {})}>
              <motion.div {...mergeAnims(true, anims.hoverScale(1.035), anims.tapScale(0.9))}>
                <NavbarLink href={item.href} active={isActive}>
                  <Typography variant="h6" component="span">{item.label}</Typography>
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
