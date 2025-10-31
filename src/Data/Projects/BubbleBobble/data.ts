import { ProjectRequiredInfo } from '@/Data/Projects/project';

export const data: ProjectRequiredInfo = {
  slug: 'BubbleBobble',
  title: 'Bubble Bobble',
  thumbnailImage: 'MainMenu.png',
  heroImage: 'MainMenu.png',
  overviewMedia: [
    "Gameplay.mkv",
    "Level01_001.png",
    "Level01_002.png",
    "Level02_001.png",
    "Level03_001.png",
    "LoadingScreen.png",
    "MainMenu.png",
  ],
  shortDescription: 'A Bubble Bobble clone build to make a real project with my custom JREngine',
  mediumDescription: 'A Bubble Bobble clone build to make a real project with my custom JREngine',
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

  githubURL: 'https://github.com/Jerreeee/DAE_GD_S4_GP2',
};
