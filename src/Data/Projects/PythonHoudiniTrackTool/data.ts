import { ProjectRequiredInfo } from '@/Data/Projects/project';

export const data: ProjectRequiredInfo = {
  slug: 'PythonHoudiniTrackTool',
  title: 'Python Houdini Racetrack Tool',
  thumbnailImage: 'ActiveHandleUI', // use actual thumbnail image name from manifest
  heroImage: 'ActiveHandleUI',
  overviewMedia: [
    'UserInterface',
    'ActiveHandleUI',
    'ToggleParameter',
  ],

  shortDescription:
    'A fully procedural racetrack tool built in Houdini using JSON-driven parameters, custom viewer states, and Python UI logic.',

  mediumDescription: `
A procedural **Houdini racetrack creation tool** powered by a custom JSON handle system,  
Python viewer states, real-time UI updating, and interactive curve-based controls.

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
      { name: 'Python', usage: 'Used for viewer states, UI callbacks, JSON management, and HDA logic.' },
      { name: 'Houdini', version: '19+',
        usage: 'Used to build the digital asset, curve system, viewer states, and procedural workflows.' },
      { name: 'VEX', usage: 'Used for geometry manipulation and racetrack generation logic.' },
    ],
    Tools: [
      { name: 'HDA', usage: 'Digital Asset containing the entire racetrack tool, UI, and interaction logic.' },
    ],
  },

  githubURL: undefined, // No GitHub link was provided for the original project
};
