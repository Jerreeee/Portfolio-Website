'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Component } from '@/Themes/BaseTheme';
import { useTheme } from '@/Themes/ThemeProvider';
import { motion } from 'motion/react';
import { anims } from '@/Themes/Default/animations';
import { mergeAnims } from '@/Utils/MergeObjects';

export type NavbarSettings = {};

export interface NavbarProps {}

export const NavbarCmp = NavbarCmpInternal as Component<
  NavbarSettings,
  NavbarProps
>;

function NavbarCmpInternal(_: NavbarProps) {
  const { theme: activeTheme } = useTheme();
  const settings: NavbarSettings =
    activeTheme.components.navbar?.settings;
  if (!settings) return null;

  const pathname = usePathname();

  const navItems = [
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/resume', label: 'Resume' },
  ];

  return (
    <motion.nav
      className="navbar w-full py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50"
      {...mergeAnims(true, anims.fadeInDown())}
    >
      {/* Brand */}
      <motion.div
        className="navbar__brand font-bold text-xl transition-opacity opacity-80 hover:opacity-100"
        {...mergeAnims(true, anims.fadeInDown(), anims.hoverScale(1.035), anims.tapScale(0.9))}
      >
        <Link href="/" className="navbar__brand-link">
          <span className="navbar__brand-text">Jeroen Denayer</span>
        </Link>
      </motion.div>

      {/* Links */}
      <motion.ol
        className="navbar__links hidden md:flex md:space-x-4"
        {...mergeAnims(true, anims.staggerChildren(0.2))}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <motion.li
              key={item.href}
              className="navbar__link-item"
              {...mergeAnims(false, anims.fadeInDown())}
            >
              <motion.div {...mergeAnims(true, anims.hoverScale(1.035), anims.tapScale(0.9))}>
                <Link
                  href={item.href}
                  className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="navbar__link-underline"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            </motion.li>
          );
        })}
      </motion.ol>
    </motion.nav>
  );
}
