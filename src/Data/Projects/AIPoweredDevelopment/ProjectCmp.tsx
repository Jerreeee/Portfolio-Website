'use client';

import React from 'react';
import { Box, Typography, Container, Divider } from '@mui/material';
import type { ProjectManifest } from '@/Types/projectManifest';
import type { ProjectCmpProps } from '../project';
import { data } from './data';
import { getMediaItemsFromManifest } from '@/Utils/projectManifest';
import { CardTabsCmp } from '@/Themes/Default/Components/CardTabs';
import { useComponents } from '@/Themes/ThemeProvider';
import { gradientH1Styles } from '@/Themes/Default/themeUtils';

export default function ProjectCmp({ project }: ProjectCmpProps) {
  const {
    ProjectOverviewCmp,
    MarkdownRendererCmp,
    MediaCmp,
    ParentSizeObserverCmp: ParentSizeObserver,
  } = useComponents();
  const manifest: ProjectManifest = project.manifest;

  return (
    <Box>
      {/* ==================== HERO SECTION ==================== */}
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h1" sx={gradientH1Styles}>
          {data.title}
        </Typography>
      </Container>

      {/* ==================== OVERVIEW ==================== */}
      <ProjectOverviewCmp project={project} />

      <Divider sx={{ my: 3, opacity: 0.2 }} />

      {/* ==================== MY JOURNEY WITH AI ==================== */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ mb: 2 }}
        >
          My Journey with AI
        </Typography>

        <CardTabsCmp variant="timeline">
          <CardTabsCmp.Item label="Skeptic">
            <MarkdownRendererCmp
              markdown={`
#### The Initial Resistance

When AI coding tools first started gaining traction, I was skeptical. My concerns were straightforward:

- **People will become dumber.** If you let AI write your code, you stop learning how things actually work.
- **Over-reliance is dangerous.** What happens when the AI gets it wrong and you don't have the skills to notice?
- **Real skills will erode.** Debugging, system design, understanding low-level behavior - these take years to build. AI shortcuts felt like they'd undermine that.

I'd spent years learning C++, Vulkan, and systems programming the hard way. The idea that someone could skip all of that with a prompt felt wrong.
`}
            />
          </CardTabsCmp.Item>

          <CardTabsCmp.Item label="Curious">
            <MarkdownRendererCmp
              markdown={`
#### First Experiments

Eventually, curiosity won. I started experimenting. Small things at first. Generating boilerplate, asking questions about unfamiliar APIs, getting a second opinion on design decisions.

What I noticed:

- AI was surprisingly good at **repetitive, mechanical tasks** - the kind of work that eats time but doesn't require deep thought.
- It was **not good** at understanding larger system context or making architectural decisions on its own.
- The quality of the output depended almost entirely on **how well I could describe what I wanted**.

That last point stuck with me. AI wasn't replacing thinking - it was exposing how clearly (or unclearly) I was thinking.
`}
            />
          </CardTabsCmp.Item>

          <CardTabsCmp.Item label="Convert">
            <MarkdownRendererCmp
              markdown={`
#### The Turning Point

The real shift happened when I started using **Claude Code** on this portfolio website. I was building a complex component system with MUI theming, code generation scripts, and a static export pipeline.

The speed difference was dramatic:

- Features that would have taken a full day were done in **hours**.
- Debugging complex CSS/theming issues became a conversation instead of a solo struggle.
- I could iterate on ideas much faster - try an approach, evaluate it, pivot if needed.

But here's what mattered most: **I was still the one making every architectural decision.** AI accelerated the execution, but the direction was mine. That changed how I thought about the tool entirely.
`}
            />
          </CardTabsCmp.Item>

          <CardTabsCmp.Item label="Daily User">
            <MarkdownRendererCmp
              markdown={`
#### An Integral Part of the Workflow

Today, AI is part of how I build software. Not as a crutch, but as a force multiplier.

What's changed in my thinking:

- **Developers become orchestrators.** You still need to understand the system deeply, but now you're directing AI to help implement your vision rather than typing every line yourself.
- **Strong fundamentals matter more, not less.** The better you understand code, the better you can evaluate AI output, catch mistakes, and guide it toward correct solutions.
- **Speed unlocks ambition.** When implementation is faster, you can attempt more ambitious projects and iterate more aggressively.

The skeptic in me wasn't entirely wrong - AI *can* make developers lazy if they let it. But used well, it makes good developers significantly more effective.
`}
            />
          </CardTabsCmp.Item>
        </CardTabsCmp>
      </Container>

      <Divider sx={{ my: 3, opacity: 0.2 }} />

      {/* ==================== AI DEVELOPMENT WORKFLOW ==================== */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ mb: 2 }}
        >
          AI Development Workflow
        </Typography>

        <MarkdownRendererCmp
          markdown={`
The diagram below shows how AI integrates into my development cycle. Each phase - planning, implementation, review, and iteration - benefits from AI in a different way.

*Diagram coming soon - this section will contain an interactive DrawIO workflow diagram.*
`}
        />
      </Container>

      <Divider sx={{ my: 3, opacity: 0.2 }} />

      {/* ==================== CASE STUDY: THIS PORTFOLIO ==================== */}
      <Container maxWidth="md" sx={{ mb: 6 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ mb: 2 }}
        >
          Case Study: This Portfolio
        </Typography>

        <MarkdownRendererCmp
          markdown={`
This portfolio website is itself a case study in AI-assisted development. I started building it entirely by hand - setting up the Next.js project, designing the component system, creating the theme architecture.

As the project grew more complex, I started integrating **Claude Code** into the workflow:

- **LinkedIn banner iterations** - The banner went through multiple design passes. AI helped generate SVG layouts, refine positioning, and iterate on visual ideas rapidly.
- **Resume dynamic sizing** - The resume page needed to scale its content dynamically to fit the page. AI helped work through the math and CSS for responsive PDF generation.
- **Component system** - The slot-based component architecture, with auto-generated class names and theme integration, was designed collaboratively between me and AI.
- **Code generation scripts** - The build scripts that auto-generate manifests, component indexes, and theme types were developed with AI assistance, dramatically speeding up what would have been tedious metaprogramming.

The key insight: **I designed the architecture, AI helped build it.** Every major decision - the slot system, the path abstraction, the static export approach - was mine. AI made implementing those decisions faster and let me be more ambitious with the scope.
`}
        />

        <Box sx={{ mt: 4 }}>
          <MediaCmp
            item={
              getMediaItemsFromManifest(manifest, [
                'linkedin-banner-dark',
              ])[0]
            }
          />
        </Box>
      </Container>

      <Divider sx={{ my: 3, opacity: 0.2 }} />

      {/* ==================== THE DEVELOPER AS ORCHESTRATOR ==================== */}
      <Container maxWidth="md" sx={{ mb: 6 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ mb: 2 }}
        >
          The Developer as Orchestrator
        </Typography>

        <MarkdownRendererCmp
          markdown={`
AI doesn't replace fundamentals - it **amplifies** them.

Understanding systems deeply lets you guide AI more effectively and catch where it falls short. A developer who understands memory management, rendering pipelines, or distributed systems can direct AI toward correct solutions. A developer who doesn't will accept whatever the AI produces - bugs and all.

The future belongs to developers who can **collaborate with AI**, not those who resist it:

- **Know your system.** AI is most useful when you can verify its output against your understanding of how things should work.
- **Stay in the driver's seat.** Use AI for execution speed, but own the architecture and the decisions.
- **Keep learning.** The better your fundamentals, the more effectively you can leverage AI. It's a positive feedback loop.

It's changing how I build software, and I want to be at the forefront of that shift.
`}
        />
      </Container>
    </Box>
  );
}
