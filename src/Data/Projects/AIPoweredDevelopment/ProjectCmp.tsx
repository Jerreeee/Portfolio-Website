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

- **Over-reliance is dangerous.** If you let AI write your code, you stop learning how things actually work. Debugging, system design, understanding low-level behavior, these take years to build. AI shortcuts felt like they'd undermine that.
- **What happens when it's wrong?** Without those deep skills, you won't even notice when the AI gets it wrong, let alone know how to fix it.

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
- The quality of the output depended almost entirely on **how well I could describe what I wanted**, and how much relevant context I could provide. This turned out to be a much deeper challenge than I initially realized.

That last point stuck with me. AI wasn't replacing thinking - it was exposing how clearly (or unclearly) I was thinking.
`}
            />
          </CardTabsCmp.Item>

          <CardTabsCmp.Item label="Convert">
            <MarkdownRendererCmp
              markdown={`
#### The Turning Point

The real shift happened when I started using **Claude Code** on this portfolio website. What used to take a full day was done in hours. Debugging became a conversation instead of a solo struggle. I could try an approach, evaluate it, and pivot - all in a fraction of the time.

The speed was impressive, but what actually changed my mind was realizing I wasn't losing control. I was still steering. AI just made the car faster.
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
- **Strong fundamentals matter more, not less.** When you truly understand the code, you can evaluate whether AI output is correct, catch subtle bugs before they ship, and articulate what you need precisely enough to get the right result. Without that foundation, you're just accepting whatever comes back.
- **Speed unlocks ambition.** When implementation is faster, you can attempt more ambitious projects and iterate more aggressively.

The skeptic in me wasn't wrong about everything - AI without understanding is just autopilot without a pilot. But used well, it makes good developers significantly more effective.
`}
            />
          </CardTabsCmp.Item>
        </CardTabsCmp>
      </Container>

      <Divider sx={{ my: 3, opacity: 0.2 }} />

      {/* ==================== AI DEVELOPMENT WORKFLOW ==================== */}
      <Container maxWidth="md" sx={{ mb: 6 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ mb: 2 }}
        >
          AI Development Workflow
        </Typography>

        <Box sx={{ mb: 4 }}>
          <MediaCmp
            item={
              getMediaItemsFromManifest(manifest, ['ai-workflow'])[0]
            }
          />
        </Box>

        <MarkdownRendererCmp
          markdown={`
With Claude Code at the center, my development workflow is a continuous cycle of four phases:

#### 1. Plan - Architecture & Design
This is where the developer leads. I define the system architecture, choose patterns, and make structural decisions. AI helps explore trade-offs, draft designs, and think through edge cases, but the final call is always mine.

#### 2. Implement - Code Generation
This is where AI shines. Once the plan is clear, AI can generate code fast. Boilerplate, component scaffolding, utility functions, repetitive logic - all of it moves from hours to minutes. The key is giving it clear direction and enough context to work with.

#### 3. Review - Debug & Verify
Every piece of AI-generated code gets reviewed. Does it match the architecture? Are there subtle bugs? Does it follow project conventions? This is where strong fundamentals pay off - you need to read and reason about code you didn't write yourself. Automated tests, linters, and manual review all play a role here.

#### 4. Iterate - Refine & Improve
Rarely is the first pass perfect. Based on the review, I refine the approach - adjust the implementation, rethink part of the design, or optimize for performance. Then the cycle starts again. AI makes each iteration faster, so you can afford to be more ambitious with how many passes you take.

---

The cycle reinforces one idea: the developer who understands the system deeply will always get more out of AI than the one who doesn't. That's how I build software, and I want to be at the forefront of that shift.
`}
        />
      </Container>

      <Divider sx={{ my: 3, opacity: 0.2 }} />

      {/* ==================== AI IN LEARNING VS. PRODUCTION ==================== */}
      <Container maxWidth="md" sx={{ mb: 6 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ mb: 2 }}
        >
          AI in Learning vs. Production
        </Typography>

        <MarkdownRendererCmp
          markdown={`
#### Learning to Code

AI can be a powerful accelerator when learning, but it needs to be kept at arm's length. Think of it as a teacher in the next room, not one sitting right next to you explaining the answer the moment you get stuck.

You still need to **write a lot of code**. Experiment. Make mistakes. Sit with a bug for a while before reaching for help. That struggle is where real understanding forms. AI can speed up learning, but it can also give a false sense of mastery if you skip the hard parts. There needs to be time for your own thinking.

#### Writing Production Code

In a professional setting, the dynamic flips. Here, speed matters - all reins loose on the AI. The faster you can implement, iterate, and ship, the better.

But speed without guardrails is reckless. Production AI usage needs layers of defense:

- **A developer with strong fundamentals** who can read the AI's changes, reason about them, and know whether they're correct, not just whether they compile.
- **Unit testing, more important than ever.** AI will make mistakes. The goal is catching them early, automatically, before they reach production.
- **Automated linters, code analyzers, and reviewers** running on every commit, your first line of defense.
- **Manual code reviews** on top of the automated ones. Humans still catch what machines miss.
- **Context is the bottleneck.** AI can't reason about what it can't see. In large codebases, keeping the AI aware of relevant architecture, conventions, and constraints is a real challenge. Tools like project instructions (e.g., CLAUDE.md files) help bridge the gap, but the developer still needs to be the one who understands the full picture and feeds the right context.

The common thread: whether you're learning or shipping, your ability to understand code deeply is what makes AI useful rather than dangerous.
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

- **Component architecture** - The slot-based component system, with auto-generated class names and theme integration, was designed collaboratively. I set the patterns, AI helped implement and iterate on them.
- **Build tooling** - Code generation scripts for manifests, component indexes, and theme types. Tedious metaprogramming that AI turned into a fast, iterative process.

The pattern was consistent: I'd set the direction, AI would help me get there faster. It let me be more ambitious with the scope than I could have been on my own.
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
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 1, opacity: 0.6 }}
          >
            The LinkedIn banner for this portfolio, designed iteratively
            with AI assistance.
          </Typography>
        </Box>
      </Container>

    </Box>
  );
}
