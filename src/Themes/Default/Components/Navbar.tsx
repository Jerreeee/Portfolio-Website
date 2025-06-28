'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/Themes/ThemeProvider';

export type NavbarTheme = {
  background: string;
  foreground: string;
  highlight: string;
};

export function Navbar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const navbar = theme.components.navbar;

  const navItems = [
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/resume', label: 'Resume' },
  ];

  return (
    <nav
      className="w-full py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50"
      style={{
        backgroundColor: navbar.background,
        color: navbar.foreground,
        borderBottom: `1px solid ${navbar.highlight ?? navbar.foreground}`,
      }}
    >
      <div className="font-bold text-xl">
        <Link
          href="/"
          className="transition-opacity hover:opacity-80"
          style={{ color: navbar.highlight }}
        >
          Jeroen Denayer
        </Link>
      </div>

      <ul className="flex space-x-1 md:space-x-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className="relative rounded-md px-3 py-2 transition-colors"
                style={{
                  fontWeight: isActive ? '500' : undefined,
                  color: isActive ? navbar.highlight : navbar.foreground,
                }}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 w-full h-[2px]"
                    style={{ backgroundColor: navbar.highlight }}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
