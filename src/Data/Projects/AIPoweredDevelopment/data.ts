import { ProjectRequiredInfo } from '@/Data/Projects/project';

export const data: ProjectRequiredInfo = {
  slug: 'AIPoweredDevelopment',
  title: 'AI-Powered Development',
  thumbnailImage: 'ai-workflow',
  heroImage: 'ai-workflow',
  overviewMedia: ['ai-workflow'],
  shortDescription:
    'How AI transformed my development workflow - from skeptic to daily user.',
  mediumDescription: `I'm excited about the future of **AI in software development** and actively integrate AI tools into my workflow. Understanding systems deeply lets me guide AI tools more effectively and catch where they fall short.

This page covers my journey from skepticism to daily use, the workflow I've developed around **Claude Code**, and what I've learned about the evolving role of the developer.`,
  technologies: {
    Core: [
      {
        name: 'Claude',
        usage:
          'Primary AI assistant for code generation, debugging, and architectural planning.',
      },
    ],
    Tools: [
      {
        name: 'Visual_Studio_Code',
        usage:
          'Editor of choice, integrated with Claude Code for AI-assisted development.',
      },
      {
        name: 'GitHub',
        usage: 'Version control and collaboration platform.',
      },
    ],
  },
};
