'use client';

import React from 'react';
// import Image from 'next/image';
import { useTheme } from '@/Themes/ThemeProvider';
import { ProjectInfo } from '@/data/projects/project'
import { data } from './data'
import { MediaItem } from '@/Themes/Default/Components/MediaGallery';

export default function ProjectCmp() {
  const { theme: activeTheme } = useTheme();

  const H1 = activeTheme.components.h1.cmp;
  const P = activeTheme.components.p.cmp;
  const Image = activeTheme.components.image.cmp;
  const MediaGallery = activeTheme.components.mediaGallery.cmp;

  const media: MediaItem[] = [
    { type: 'image', src: data.thumbnailImage, alt: 'Hero image' },
    { type: 'image', src: data.thumbnailImage, alt: 'Screenshot 1' },
    { type: 'youtube', src: "https://www.youtube.com/watch?v=H8O0Z2jIdzo", thumbnail: data.thumbnailImage, alt: 'Trailer' },
  ];


  return (
    <div className="space-y-6">
      {/* Project title */}
      <H1 className='text-center'>{data.title}</H1>

      {/* Hero image */}
      <div className="relative w-full max-w-3xl mx-auto">
        <Image
          src={data.heroImage}
          alt={`${data.title} hero image`}
          width={1200}
          height={600}
          // className="rounded-xl object-cover"
        />
      </div>

      {/* Description paragraph */}
      <P>
        {data.shortDescription}
      </P>

      <div>
        <MediaGallery media={media}/>
      </div>
    </div>
  );
}
