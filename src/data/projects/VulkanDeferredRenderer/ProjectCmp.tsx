'use client';

import React from 'react';
// import Image from 'next/image';
import { useTheme } from '@/Themes/ThemeProvider';
import { ProjectInfo } from '@/data/projects/project'
import { data } from './data'
import { MediaItem } from '@/Themes/Default/Components/Generic/Media';
import { ImageCompareCmp } from '@/Themes/Default/Components/Generic/ImageCompare'

export default function ProjectCmp() {
  const { theme: activeTheme } = useTheme();

  const H1 = activeTheme.components.h1.cmp;
  const P = activeTheme.components.p.cmp;
  const Image = activeTheme.components.image.cmp;
  const ImageCompare = activeTheme.components.imageCompare.cmp;
  const MediaGallery = activeTheme.components.mediaGallery.cmp;

  const media: MediaItem[] = [
    { type: 'image', src: data.thumbnailImage, alt: 'Hero image' },
    { type: 'image', src: data.thumbnailImage, alt: 'Hero image' },
    { type: 'image', src: data.thumbnailImage, alt: 'Hero image' },
    { type: 'image', src: data.thumbnailImage, alt: 'Hero image' },
    { type: 'embeddedVideo', src: "https://www.youtube.com/watch?v=rWRZj4jY_gk"},
  ];

  return (
    <div className="space-y-6">
      {/* Project title */}
      <H1 style={{className:'text-center'}}>{data.title}</H1>

      {/* Hero image */}
      <div className="relative w-full max-w-3xl mx-auto h-96">
        <Image
          src={data.heroImage} 
          alt={`${data.title} hero image`}
          styleOverride={{className:"object-cover"}}
        />
      </div>

      {/* Description paragraph */}
      <P>
        {data.shortDescription}
      </P>

      <div>
        <MediaGallery media={media}/>
      </div>

      <div className="w-full aspect-video">
        <ImageCompare
          images={[
            { src: '/projects/VulkanDeferredRenderer/depth.webp', alt: 'Render V1' },
            { src: '/projects/VulkanDeferredRenderer/GBuffer_Albedo.webp', alt: 'Render V2' },
            { src: '/projects/VulkanDeferredRenderer/GBuffer_MetallicRoughness.webp', alt: 'Render V2' },
            { src: '/projects/VulkanDeferredRenderer/GBuffer_WorldNormal.webp', alt: 'Render V2' },
            // { src: '/projects/VulkanDeferredRenderer/PostProcess_Final_Outdoor.webp', alt: 'Render V3' }
          ]}
        />
      </div>
    </div>
  );
}
