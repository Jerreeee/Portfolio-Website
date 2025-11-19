import { ProjectRequiredInfo } from '@/Data/Projects/project';

export const data: ProjectRequiredInfo = {
  slug: 'PythonHoudiniTrackTool',
  title: 'Python Houdini Racetrack Tool',
  thumbnailImage: 'TrailerImage',
  heroImage: 'TrailerImage',
  overviewMedia: ['TrailerV2'],

  shortDescription:
    'A fully procedural racetrack tool integrated in Unreal Engine and built in Houdini using JSON-driven parameters, custom viewer states, and Python UI logic.',

  mediumDescription: `
This was my graduation work project for the Game Graphics Production Bachelor at Digital Art and Entertainment Howest (end 2021).
The project showcases a procedural **Houdini racetrack creation tool** powered by a custom JSON handle system,  
Python viewer states, real-time UI updating, and interactive curve-based controls.
Furthermore, it is integrated into Unreal Engine using the Houdin Engine for Unreal Plugin.
Using Houdini Session Sync, artists can create and edit racetracks directly within Unreal Engine and Houdini.

The tool allows artists to add, remove, reorder, and adjust racetrack control handles  
with full synchronization between the node UI, the viewport, and the internal JSON  
data structure managing all handle dictionaries.

It includes:
- A custom viewer state for selecting & moving handles
- A JSON-driven parameter system
- Active handle UI and automatic parameter synchronization
- Curve-position–based handle ordering
- Interactive add/delete operations
- Geometry-driven context preview
`,

  technologies: {
    Core: [
      {
        name: 'Houdini',
        version: '19+',
        usage:
          'Used to build the digital asset, curve system, viewer states, and procedural workflows.',
      },
      {
        name: 'Python',
        usage:
          'Used for viewer states, UI callbacks, JSON management, and HDA logic.',
      },
      {
        name: 'Unreal',
        usage: 'Used to test itegrating the tool into a game engine',
      },
      {
        name: 'VEX',
        usage:
          'Used for geometry/data manipulation and racetrack generation logic.',
      },
    ],
  },

  githubURL: undefined, // No GitHub link was provided for the original project
};
