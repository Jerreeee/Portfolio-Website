'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/Themes/ThemeProvider';
import { motion } from 'motion/react';
import { anims } from '@/Themes/Default/animations';
import { TypeAsCSSVars } from '@/Utils/Utils';
import { MergeVariants } from '@/Utils/MergeObjects';

export type NavbarTheme = {
  containerBackground: string;
  containerBorderColor: string;

  // Brand text gradient
  brandGradientStart: string;
  brandGradientMid: string;
  brandGradientEnd: string;

  // Fallback color (optional, e.g., for non-gradient contexts)
  brandTextColor: string;

  // Link text states
  linkTextColor: string;
  linkTextHoverColor: string;
  linkTextActiveColor: string;
};


export function NavbarCmp() {
  const pathname = usePathname();
  const { theme: activeTheme } = useTheme();
  const theme = activeTheme.components.navbar.theme;

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
        backgroundColor: theme.containerBackground,
        borderBottom: `1px solid ${theme.containerBorderColor}`,
      }}
      variants={anims.fadeInDown()}
      initial="initial"
      animate="animate"
    >
      <motion.div variants={MergeVariants(anims.fadeInDown(), anims.hoverScale(1.035), anims.tapScale(0.9))}
      whileHover="whileHover" whileTap="whileTap"
      >
        <Link href="/" className="font-bold text-xl transition-opacity opacity-80 hover:opacity-100">
          <span
            style={{
              background: `linear-gradient(135deg, ${theme.brandGradientStart}, ${theme.brandGradientMid}, ${theme.brandGradientEnd})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent', // fallback
            }}
          >
            Jeroen Denayer
          </span>
        </Link>
      </motion.div>

      <motion.ol className="hidden md:flex md:space-x-4"
      variants={anims.staggerChildren(0.25)}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <motion.li key={item.href} variants={MergeVariants(anims.fadeInDown(), anims.hoverScale(1.035), anims.tapScale(0.9))}
            whileHover="whileHover" whileTap="whileTap"
            >
              <Link
                href={item.href}
                className={`
                  relative rounded-md px-3 py-2 transition-colors
                  text-[var(--link-color)]
                  hover:text-[var(--link-hover-color)]
                  ${isActive ? 'font-medium text-[var(--link-active-color)]' : ''}
                `}
                style={TypeAsCSSVars({
                  '--link-color': theme.linkTextColor,
                  '--link-hover-color': theme.linkTextHoverColor,
                  '--link-active-color': theme.linkTextActiveColor,
                })}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 w-full h-[2px]"
                    style={{
                      background: theme.linkTextActiveColor,
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
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
