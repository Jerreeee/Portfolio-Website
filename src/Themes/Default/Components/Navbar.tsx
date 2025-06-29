'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/Themes/ThemeProvider';
import type { Variants } from 'motion/react';
import { motion } from 'motion/react';
import { anims } from '@/Themes/Default/animations';
import { MergeVariants } from '@/Utils/MergeObjects';

export type NavbarTheme = {
  background: string;
  foreground: string;
  highlight: string;
  border: string;
  foregroundMuted: string;
  gradientStart: string;
  gradientEnd: string;
};

export function NavbarCmp() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const navbarTheme = theme.components.navbar.theme;

  const navItems = [
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/resume', label: 'Resume' },
  ];

  return (
    <motion.div
      className="w-full py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50"
      style={{
        backgroundColor: navbarTheme.background,
        color: navbarTheme.foreground,
        borderBottom: `1px solid ${navbarTheme.border ?? navbarTheme.highlight}`,
      }}
      variants={anims.fadeInDown()}
      initial="initial"
      animate="animate"
    >
      <motion.div variants={anims.fadeInDown()}>
        <Link
          href="/"
          className="font-bold text-xl transition-opacity hover:opacity-80"
          style={{ color: navbarTheme.highlight }}
        >
          Jeroen Denayer
        </Link>
      </motion.div>

      <motion.ol className="hidden md:flex md:space-x-4"
      variants={anims.staggerChildren(0.25)}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <motion.li key={item.href} variants={anims.fadeInDown()}>
              <Link
                href={item.href}
                className="relative rounded-md px-3 py-2 transition-colors"
                style={{
                  fontWeight: isActive ? '500' : undefined,
                  color: isActive ? navbarTheme.highlight : navbarTheme.foreground,
                }}
              >
                {item.label}
                {isActive && (
                  <span
                  className="absolute bottom-0 left-0 w-full h-[2px]"
                  style={{
                    background: `linear-gradient(to right, ${navbarTheme.gradientStart}, ${navbarTheme.gradientEnd})`,
                  }}
                  />
                )}
              </Link>
            </motion.li>
          );
        })}
      </motion.ol>
    </motion.div>
  );
}
