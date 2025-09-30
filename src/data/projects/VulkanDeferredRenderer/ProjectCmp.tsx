'use client';

import React from 'react';
import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';

import MediaGalleryCmp from '@/Themes/Default/Components/MediaGallery/MediaGallery';
import ImageMultiCompareCmp from '@/Themes/Default/Components/ImageMultiCompare/ImageMultiCompare';
import MediaCmp, { MediaItem } from '@/Themes/Default/Components/Media/Media';
import Markdown from '@/Themes/Default/Components/Markdown/Markdown';
import type { ProjectManifest } from "@/types/projectManifest";
import { getMediaItemsFromManifest } from "@/utils/projectManifest";

import { data } from './data';


export default function ProjectCmp() {
   const [manifest, setManifest] = useState<ProjectManifest | null>(null);

  useEffect(() => {
    async function loadManifest() {
      try {
        const res = await fetch(
          "/projects/VulkanDeferredRenderer/manifest.json"
        );
        if (!res.ok) throw new Error("Failed to load manifest");

        const data: ProjectManifest = await res.json();
        setManifest(data);
      } catch (err) {
        console.error("⚠️ Failed to load project manifest", err);
      }
    }

    loadManifest();
  }, []);

   if (!manifest) {
    return <p>Loading gallery…</p>;
  }

const selectedFiles = [
    "intro_video",
    "PostProcess_Final_Outdoor.webp",
    "Chain_Final.webp",
  ];

  const mediaItems: MediaItem[] = getMediaItemsFromManifest(
    manifest,
    selectedFiles
  );

const md: string = `
# Sample Markdown

## Subheading

Here is some **bold text** and *italic text*.

Here’s an **inline C++ code snippet** like \`int main() { return 0; }\`.

### Code Example (TypeScript)

\`\`\`typescript
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}
\`\`\`

### Code Example (C++)

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, world!" << endl;
    return 0;
}
\`\`\`

### List Example

- Item 1
- Item 2
  - Nested Item

### Table Example

| Feature    | Supported |
|------------|----------:|
| **Bold**   | ✅        |
| *Italic*   | ✅        |
| Code       | ✅        |
| Lists      | ✅        |
| Tables     | ✅        |
`;


  return (
    <div>
      {/* Project title */}
      <Typography variant="h3" align="center" gutterBottom>
        {data.title}
      </Typography>

      {/* Hero image */}
      <MediaCmp item={{
        type: 'image',
        src: data.heroImage,
        alt: `${data.title} hero image`
      }} 
      />

      {/* Description */}
      <Typography variant="body1" paragraph>
        {data.shortDescription}
      </Typography>

      {/* Media gallery */}
      <MediaGalleryCmp media={mediaItems} />

      {/* Multi-image comparison */}
      <div style={{height: '400px'}}>
        <ImageMultiCompareCmp
          images={[
            { src: '/projects/VulkanDeferredRenderer/depth.webp', alt: 'Render V1' },
            { src: '/projects/VulkanDeferredRenderer/GBuffer_Albedo.webp', alt: 'Render V2' },
            { src: '/projects/VulkanDeferredRenderer/GBuffer_MetallicRoughness.webp', alt: 'Render V3' },
            { src: '/projects/VulkanDeferredRenderer/GBuffer_WorldNormal.webp', alt: 'Render V4' },
          ]}
        />
      </div>
      <Markdown markdown={md} ></Markdown>
    </div>
  );
}
