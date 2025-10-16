  'use client';

  import { ReactNode } from 'react';
  import { useTheme } from '@/themes/ThemeProvider';
  import NavbarCmp from '@/themes/Default/Components/Navbar/NavbarCmp';

  export function PageWrapper({ children }: { children: ReactNode }) {
    const { theme } = useTheme();

    return (
      <div>
        <NavbarCmp navItems={ [
          { href: '/projects', label: 'Projects' },
          { href: '/about', label: 'About' },
          { href: '/contact', label: 'Contact' },
          { href: '/resume', label: 'Resume' },
        ]}
        />
        <div
          style={{ paddingTop: theme.components?.NavbarCmp?.defaultProps?.height }}
        />
        {children}
      </div>
    );
  }
