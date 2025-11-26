'use client';

import React from 'react';
import { Box, Typography, Container, Grid, Divider,
  Accordion,
AccordionSummary,
AccordionDetails,
} from '@mui/material';
import MediaCmp from '@/Themes/Default/Components/Media/MediaCmp';
import { getMediaItemsFromManifest } from '@/Utils/projectManifest';
import ParentSizeObserver from '@/Themes/Default/Components/ParentSizeObserver/ParentSizeObserverCmp';
import ImageMultiCompareCmp from '@/Themes/Default/Components/ImageCompare/ImageMultiCompareCmp';
import { ImageCompareItem } from '@/Themes/Default/Components/ImageCompare/ImageCompareCmp';
import CodeBlockCmp from '@/Themes/Default/Components/Code/CodeBlockCmp';
import type { ProjectManifest } from "@/Types/projectManifest";
import type { ProjectCmpProps } from '../project';
import { data } from './data';
import { ProjectOverviewCmp } from '@/Themes/Default/Components/ProjectOverview';
import { IconCmp } from '@/Themes/Default/Components/Icon';
import Timeline from '@/Themes/Default/Components/Timeline/Timeline';
import PATHS from '@/Config/paths';
import { makeDefaultRangeProvider } from '@/Utils/RangeProvider';
import { MarkdownRendererCmp } from '@/Themes/Default/Components/Markdown';

export default function ProjectCmp({ project }: ProjectCmpProps) {
  const manifest: ProjectManifest = project.manifest;

  return (
    <Box>
      {/* ==================== HERO SECTION ==================== */}
      <Container maxWidth="md" sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="gradientH1">
          {data.title}
        </Typography>
      </Container>

      {/* ==================== OVERVIEW ==================== */}
      <ProjectOverviewCmp project={project} />

      {/* ==================== LEARNINGS ==================== */}
<Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
  <Typography variant="h3" align="center" gutterBottom>
    Learnings
  </Typography>

<MarkdownRendererCmp
  markdown={`
While working with **Houdini**, I found that for more complex operations and data manipulation, I preferred using **VEX** over node-based **VOP** networks for its clarity and precision. That preference for expressing logic through code rather than nodes made me increasingly interested in the technical side of tool development.  
As I maintained and expanded our toolset, I began encountering the **limitations of the Houdini Engine plugin** — I often needed functionality that required deeper **C++ integration with Unreal**.  

At the time, I didn’t yet have that knowledge, which made me realize the importance of learning **C++ and low-level programming**. This became the main reason I pursued a **second bachelor’s in Game Development**.  

That experience also taught me how important iteration speed is for artists. While **Houdini excels at offline procedural generation** and its **live bridge to Unreal** works well, there’s still a noticeable delay in the round-trip process. In contrast, **real-time, in-engine tools** give artists immediate feedback and allow for much faster iteration. Unreal’s **Procedural Content Generation (PCG)** system reflects this shift — moving more procedural logic from Houdini into Unreal itself.  

Working on *Overpass 2* ultimately sparked my passion for **C++ programming**, so I could create my own tools without such limitations.
  `}
 />
</Container>
    </Box>
  );
}
