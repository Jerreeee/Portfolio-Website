import { ProjectRequiredInfo } from '@/Data/Projects/project';

export const data: ProjectRequiredInfo = {
  slug: 'LuaCPPSnake',
  title: 'Lua & C++ Snake',
  thumbnailImage: 'gameplay_01',
  heroImage: 'gameplay_01',
  overviewMedia: [
    'gameplay_01',
  ],
  shortDescription: 'A Snake game written using Lua-C++ bindings with sol2',
  mediumDescription: 'This project is a small C++ framework built around Lua using the Sol2 library. It acts as a lightweight runtime that can automatically load and run Lua-based games. The framework exposes core functionality like rendering, input, and drawing to Lua, letting scripts define their own game logic without touching the C++ side. It was a great exercise in building a bridge between scripting and native code while keeping the setup simple and flexible.',
  technologies: {
    Core: [
      { name: 'cplusplus', version: 'C++20' },
    ],
    Libraries: [
      { name: 'sol' },
    ],
  },

  githubURL: 'https://github.com/Jerreeee/DAE_GD_S3_SE_LuaCPPExam',
};
