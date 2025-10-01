'use client';

import React from 'react';
import { useEffect, useState } from 'react';

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import MediaGalleryCmp from '@/Themes/Default/Components/MediaGallery/MediaGallery';
import ImageMultiCompareCmp from '@/Themes/Default/Components/ImageMultiCompare/ImageMultiCompare';
import MediaCmp, { MediaItem } from '@/Themes/Default/Components/Media/Media';
import Markdown from '@/Themes/Default/Components/Markdown/Markdown';
import type { ProjectManifest } from "@/types/projectManifest";
import { ProjectInfo } from '../project';
import { getMediaItemsFromManifest } from '@/utils/projectManifest';

import { data } from './data';


export default function ProjectCmp({ project }: { project: ProjectInfo }) {
  const manifest: ProjectManifest = project.manifest;
  
  const mediaItems: MediaItem[] = getMediaItemsFromManifest(manifest, [
    "PostProcess_Final_Outdoor.webp",
    "Chain_Final.webp",
    "intro_video",
    "GPU_Trace_Profiler_Timeline.webp",
    "GPU_Trace_Profiler_Timeline_2.webp",
    "GPU_Trace_Profiler_timeline_3.webp",
    "OutDoor_Env_Cross.webp", 
  ]);
  
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
      <Typography variant="h1" align="center" gutterBottom>
        {data.title}
      </Typography>

<Box display="flex" flexDirection="column" gap={4}>
  <Typography variant="h4" align="center" paragraph>
    {data.shortDescription}
  </Typography>
  <MediaGalleryCmp media={mediaItems} />
</Box>

      {/* Multi-image comparison */}
      <div style={{height: '400px'}}>
        <ImageMultiCompareCmp
          images={[
            { src: '/projects/VulkanDeferredRenderer/Images/depth.webp', alt: 'Render V1' },
            { src: '/projects/VulkanDeferredRenderer/Images/GBuffer_Albedo.webp', alt: 'Render V2' },
            { src: '/projects/VulkanDeferredRenderer/Images/GBuffer_MetallicRoughness.webp', alt: 'Render V3' },
            { src: '/projects/VulkanDeferredRenderer/Images/GBuffer_WorldNormal.webp', alt: 'Render V4' },
          ]}
        />
      </div>
      <Markdown markdown={md} ></Markdown>
    </div>
  );
}
