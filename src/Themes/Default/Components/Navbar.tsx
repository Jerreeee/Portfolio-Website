'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/Themes/ThemeProvider';
import { motion } from 'motion/react';
import { anims } from '@/Themes/Default/animations';
import { constructCSSVarsFromTheme } from '@/utils/ConstructCSSVarsFromTheme';
import { mergeVariants, mergeAnims } from '@/utils/MergeObjects';

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

export interface NavbarProps {}

export function NavbarCmp(props: NavbarProps) {
  const { theme: activeTheme } = useTheme();
  const theme = activeTheme.components.navbar.theme;
  
  const pathname = usePathname();
  
  const navItems = [
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/resume', label: 'Resume' },
  ];

  return (
    <motion.div className="w-full py-4 px-6 md:px-12 flex
    justify-between items-center sticky top-0 z-50
    bg-[var(--containerBackground)] border-b border-[var(--containerBorderColor)]"
    style={constructCSSVarsFromTheme(theme)}
    {...mergeAnims(true, anims.fadeInDown())}
    >
      <motion.div
      {...mergeAnims(true, anims.fadeInDown(), anims.hoverScale(1.035), anims.tapScale(0.9))}
      >
        <Link href="/" className="font-bold text-xl transition-opacity opacity-80 hover:opacity-100">
          <span className="
          bg-[linear-gradient(135deg,var(--brandGradientStart),var(--brandGradientMid),var(--brandGradientEnd))]
          bg-clip-text text-transparent"
          >
            Jeroen Denayer
          </span>
        </Link>
      </motion.div>
      
      <motion.ol className="hidden md:flex md:space-x-4"
      {...mergeAnims(true, anims.staggerChildren(0.2))}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <motion.li key={item.href}
            {...mergeAnims(false, anims.fadeInDown())}
            >
              <motion.div {...mergeAnims(true, anims.hoverScale(1.035), anims.tapScale(0.9))}> 
                <Link href={item.href}
                  className={`
                    relative rounded-md px-3 py-2 transition-colors
                    text-[var(--linkTextColor)]
                    hover:text-[var(--linkTextHoverColor)]
                    ${isActive ? 'font-medium text-[var(--linkTextActiveColorolor)]' : ''}
                  `}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 w-full h-[2px]
                      bg-[var(--linkTextActiveColor)]"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            </motion.li>
          );
        })}
      </motion.ol>
    </motion.div>
  );
}
