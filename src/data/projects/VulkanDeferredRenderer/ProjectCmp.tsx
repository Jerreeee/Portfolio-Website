'use client';

import React from 'react';
import { useEffect, useState } from 'react';

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import MediaGalleryCmp from '@/Themes/Default/Components/MediaGallery/MediaGalleryCmp';
import ImageMultiCompareCmp from '@/Themes/Default/Components/ImageMultiCompare/ImageMultiCompareCmp';
import MediaCmp, { MediaItem } from '@/Themes/Default/Components/Media/MediaCmp';
import Markdown from '@/Themes/Default/Components/Markdown/MarkdownRendererCmp';
import type { ProjectManifest } from "@/types/projectManifest";
import { ProjectInfo } from '../project';
import { getMediaItemsFromManifest } from '@/utils/projectManifest';
import { ImageCompareItem } from '@/Themes/Default/Components/ImageCompare/ImageCompareCmp';
import { ParentSizeObserver } from '@/Themes/Default/Components/ParentSizeObserver/ParentSizeObserverCmp';
import CodeBlockCmp from '@/Themes/Default/Components/Code/CodeBlockCmp';

import { ProjectCmpProps } from '../project';
import { data } from './data';
import ScrollableCmp from '@/Themes/Default/Components/Scrollable/ScrollableCmp';


export default function ProjectCmp({ project }: ProjectCmpProps) {
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
#include <vector>
#include <algorithm>
#include <iomanip>
#include <map>
#include <string>
using namespace std;

struct Student {
    string name;
    vector<int> grades;
};

double average(const vector<int>& grades) {
    if (grades.empty()) return 0.0;
    int sum = 0;
    for (int g : grades) sum += g;
    return static_cast<double>(sum) / grades.size();
}

int main() {
    vector<Student> students = {
        {"Alice", {90, 85, 88, 92, 95, 87, 91}},
        {"Bob",   {72, 81, 77, 69, 85, 90, 78}},
        {"Carol", {100, 100, 100, 99, 98, 97, 96}},
        {"David", {65, 70, 68, 72, 60, 75, 80}},
        {"Eve",   {88, 91, 85, 87, 90, 86, 89}}
    };

    // Print table header
    cout << left << setw(10) << "Name" 
         << right << setw(15) << "Average Grade" 
         << endl;
    cout << string(30, '-') << endl;

    // Print each student's average grade
    for (const auto& s : students) {
        cout << left << setw(10) << s.name
             << right << setw(15) << fixed << setprecision(2) << average(s.grades)
             << endl;
    }

    // Example of a very long line to test horizontal scrolling:
    cout << "This_is_a_really_long_line_with_no_spaces_just_to_test_how_your_code_block_handles_overflow_and_scrolling_behavior_in_a_static_site_layout." 
         << endl;

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

      <Box display="flex" flexDirection="column" gap={4} >
        <Typography variant="h4" align="center" paragraph>
          {data.shortDescription}
        </Typography>
        <MediaGalleryCmp media={mediaItems} />

        {/* Multi-image comparison */}
        {/* <ParentSizeObserver mode='width' aspectRatio={16 / 9}>
          {size => (
            <ImageMultiCompareCmp size={size}
              images={getMediaItemsFromManifest(manifest, [
                'depth.webp',
                'GBuffer_Albedo.webp',
                'GBuffer_MetallicRoughness.webp',
                'GBuffer_WorldNormal.webp',
              ]).filter((item): item is ImageCompareItem => item.type === 'image')}
            />
          )}
        </ParentSizeObserver> */}

        {/* <div style={{width: '100%', height: '600px'}}> */}
        <ParentSizeObserver mode='width' aspectRatio={16 / 9}>
          <CodeBlockCmp file="/projects/VulkanDeferredRenderer/Code/Render.cpp" />
        </ParentSizeObserver>
        {/* </div> */}

        <CodeBlockCmp language="js">
        {`
function hello() {
  console.log("Hello World!");
}
        `}
        </CodeBlockCmp>

        <Markdown markdown={md} ></Markdown>
      </Box>
    </div>
  );
}
