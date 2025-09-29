'use client';

import { ReactNode } from 'react';
import { useTheme } from 'Themes/ThemeProvider';
import NavbarCmp from '@/Themes/Default/Components/Navbar/Navbar';

import { data } from '@/data/projects/VulkanDeferredRenderer/data'
import { MediaItem } from '@/Themes/Default/Components/Media/Media';
import MediaGalleryCmp from '@/Themes/Default/Components/MediaGallery/MediaGallery';

export function PageWrapper({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  const media: MediaItem[] = [
    { type: 'image', src: data.thumbnailImage, alt: 'Hero image' },
    { type: 'image', src: data.thumbnailImage, alt: 'Hero image' },
    { type: 'image', src: data.thumbnailImage, alt: 'Hero image' },
    { type: 'image', src: data.thumbnailImage, alt: 'Hero image' },
    { type: 'embeddedVideo', src: "https://www.youtube.com/watch?v=rWRZj4jY_gk"},
  ];

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
        style={{ paddingTop: theme.components?.Navbar?.defaultProps?.height }}
      />
      <MediaGalleryCmp media={media} />
      {children}
    </div>
  );
}
