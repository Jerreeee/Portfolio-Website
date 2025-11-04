import { ProjectRequiredInfo } from '@/Data/Projects/project';

export const data: ProjectRequiredInfo = {
  slug: 'JREngine',
  title: 'JREngine',
  thumbnailImage: 'MainMenu',
  heroImage: 'MainMenu',
  overviewMedia: [
    "Gameplay",
    "Level01_001",
    "Level01_002",
    "Level02_001",
    "Level03_001",
    "LoadingScreen",
    "MainMenu",
  ],
  shortDescription: 'A small custom 2D Game-Engine made from scratch in c++',
  mediumDescription: `**JREngine** is a 2D game engine I wrote in **C++** from the ground up.

I’d used Unity and Unreal before, but I wanted to see how an engine works behind the scenes—how systems are organized and how common problems are solved. Building my own was the simplest way to learn that.

JREngine includes a component-based setup, input handling, asset loading, a basic AABB collision system and more. The goal is to keep it simple, fast, and easy to work with.

To make sure everything holds up, I built a game with it: a remake of **Bubble Bobble** made entirely in JREngine.`,
  technologies: {
    Core: [
      { name: 'cplusplus', version: 'C++20', usage: 'Core language used for the renderer implementation.' },
    ],
    Libraries: [
      { name: 'SDL' },
      { name: 'GLM', version: '0.9.9', usage: 'Mathematics library for vectors, matrices, and transformations.' },
      { name: 'XInput', usage: 'Controller Input' },
    ],
    Tools: [
      { name: 'CMake' },
    ],
  },

  githubURL: 'https://github.com/Jerreeee/DAE_GD_S4_PROG4_ExamProject',
};
