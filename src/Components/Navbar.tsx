'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export function Navbar() {
  const pathname = usePathname();

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
  
  return (
    <motion.nav
      className="
        w-full py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50
        bg-[var(--background)] text-[var(--foreground)] border-b border-[var(--highlight)]
      "
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <motion.div
        className="font-bold text-xl"
        variants={navItemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="/"
          className="text-[var(--highlight)] transition-opacity hover:opacity-80"
        >
          Jeroen Denayer
        </Link>
      </motion.div>

      <ul className="flex space-x-1 md:space-x-4">
        {navItems.map((item) => (
          <motion.li key={item.href} variants={navItemVariants}>
            <Link
              href={item.href}
              className={`
                relative rounded-md px-3 py-2 transition-colors
                ${pathname === item.href
                  ? 'font-medium text-[var(--highlight)]'
                  : 'text-[var(--foreground)] hover:text-[var(--highlight)]'
                }
              `}
            >
              {item.label}
              {pathname === item.href && (
                <motion.span
                  layoutId="underline"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--highlight)]"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
}
