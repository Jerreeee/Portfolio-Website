'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTheme } from '@/Themes/ThemeProvider';

export function Navbar() {
  const pathname = usePathname();
  const { theme } = useTheme();

  const navItems = [
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/resume', label: 'Resume' },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const colors = theme.colors;

  return (
    <motion.nav
      className="
        w-full py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50
      "
      initial="hidden"
      animate="visible"
      variants={navVariants}
      style={{
        backgroundColor: colors.background,
        color: colors.foreground,
        borderBottom: `1px solid ${colors.highlight ?? colors.foreground}`,
      }}
    >
      <motion.div
        className="font-bold text-xl"
        variants={navItemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="/"
          className="transition-opacity hover:opacity-80"
          style={{ color: colors.highlight }}
        >
          Jeroen Denayer
        </Link>
      </motion.div>

      <ul className="flex space-x-1 md:space-x-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <motion.li key={item.href} variants={navItemVariants}>
              <Link
                href={item.href}
                className="relative rounded-md px-3 py-2 transition-colors"
                style={{
                  fontWeight: isActive ? '500' : undefined,
                  color: isActive ? colors.highlight : colors.foreground,
                }}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="underline"
                    className="absolute bottom-0 left-0 w-full h-[2px]"
                    style={{ backgroundColor: colors.highlight }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
