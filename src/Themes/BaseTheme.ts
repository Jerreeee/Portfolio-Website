import React from 'react';
import type { Project } from '@/data/projects/project';

export type BaseTheme = {
  name: string;
  pages: {
    ProjectPage: React.ComponentType;
    Navbar: React.ComponentType;
    ProjectLayout: React.ComponentType<{ project: Project }>;
  }
};