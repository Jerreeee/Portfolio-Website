'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/Themes/ThemeProvider';
import type { Variants } from 'framer-motion';
import { MotionWrapper, motionPresets } from '@/Components/MotionWrapper'; // Adjust path as needed

export type NavbarTheme = {
  background: string;
  foreground: string;
  highlight: string;
  anims: {
    container: Variants;
    item: Variants;
  };
};

export function NavbarCmp() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const navbarTheme = theme.components.navbar.theme;
  const { container: containerAnim, item: itemAnim } = navbarTheme.anims;

  const navItems = [
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/resume', label: 'Resume' },
  ];

  return (
    <MotionWrapper
      as="nav"
      presets={[motionPresets.default]}
      variants={containerAnim}
    >
      <div
        className="w-full py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50"
        style={{
          backgroundColor: navbarTheme.background,
          color: navbarTheme.foreground,
          borderBottom: `1px solid ${navbarTheme.highlight ?? navbarTheme.foreground}`,
        }}
      >
        <MotionWrapper as="div" variants={itemAnim}>
          <Link
            href="/"
            className="font-bold text-xl transition-opacity hover:opacity-80"
            style={{ color: navbarTheme.highlight }}
          >
            Jeroen Denayer
          </Link>
        </MotionWrapper>

        <MotionWrapper as="ul" variants={containerAnim}>
          <div className="flex space-x-1 md:space-x-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <MotionWrapper as="li" key={item.href} variants={itemAnim}>
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
                        style={{ backgroundColor: navbarTheme.highlight }}
                      />
                    )}
                  </Link>
                </MotionWrapper>
              );
            })}
          </div>
        </MotionWrapper>
      </div>
    </MotionWrapper>
  );
}
