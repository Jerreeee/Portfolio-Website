'use client';

import React from 'react';
import { ProjectInfo } from '@/data/projects/project'
import { data } from './data'

import MediaCmp, { MediaItem } from '@/Themes/Default/Components/Media/Media';

export default function ProjectCmp() {

const media: MediaItem = {
  type: 'image',
  src: '/projects/VulkanDeferredRenderer/GBuffer_Albedo.webp',
  alt: 'Stretched fill',
};

  return (
    <div>
      {/* <div>s
        <div style={{ border: '2px solid white', marginBottom: '1rem' }}>
          <MediaCmp item={media} />
        </div>

        <div style={{ border: '2px solid white', marginBottom: '1rem' }}>
          <MediaCmp item={media} width="400px" aspectRatio="4 / 3" />
        </div>

        <div style={{ border: '2px solid white', marginBottom: '1rem' }}>
          <MediaCmp item={media} height="250px" aspectRatio="16 / 9" />
        </div>

        <div style={{ border: '2px solid blue', marginBottom: '1rem' }}>
          <MediaCmp item={media} width="300px" height="300px" fit="cover" />
        </div>

        <div style={{ border: '2px solid blue', marginBottom: '1rem' }}>
          <MediaCmp item={media} width="300px" height="300px" fit="contain" />
        </div>

        <div style={{ border: '2px solid blue', marginBottom: '1rem' }}>
          <MediaCmp item={media} width="300px" height="300px" fit="fill" />
        </div>

        <div style={{ border: '2px solid white', marginBottom: '1rem' }}>
          <MediaCmp item={media} aspectRatio="16 / 9" />
        </div>

        <div style={{ border: '2px solid white', marginBottom: '1rem' }}>
          <MediaCmp item={media} fit="fill" />
        </div>
      </div> */}
    </div>
  );
}
