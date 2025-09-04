'use client';

import { ReactNode } from "react";
import { ProjectInfo } from '@/data/projects/project'

export const BubbleBobbleProjectInfo : ProjectInfo = {
  slug: 'bubblebobble',
  title: 'Bubble Bobble',
  thumbnailImage: '/projects/BubbleBobble/thumbnail.webp',
  heroImage: '/projects/BubbleBobble/hero.png',
  technologies: ['C++', 'Houdini', 'Unreal', 'Unity', 'VSCode'],
  shortDescription: 'A fun and challenging Bubble Bobble clone built with React and Node.',
  longDescription: `
    Bubble Bobble is a nostalgic arcade-style game implemented in React and Node. 
    This project showcases a deep understanding of game mechanics, state management,
    and front-end design.`,
  Component: BubbleBobbleProjectCmp,
};

function BubbleBobbleProjectCmp() {
  return (
    <div className="p-6">
      Test
    </div>
  );
}
