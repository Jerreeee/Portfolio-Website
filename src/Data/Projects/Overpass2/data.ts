import { ProjectRequiredInfo } from '@/Data/Projects/project';

export const data: ProjectRequiredInfo = {
  slug: 'Overpass2',
  title: 'Overpass 2',
  thumbnailImage: 'intro',
  heroImage: 'intro',
  overviewMedia: [
    'intro',
  ],
shortDescription: 'Overpass 2 is a realistic off-road racing game where players tackle extreme terrain using powerful 4×4 vehicles and precise driving techniques.',
mediumDescription: 
`**Overpass 2** challenged me to bridge procedural content generation with large-scale Unreal Engine 5 environments.  

As a **Technical Artist at Neopica**, I built and maintained a suite of **Houdini-based procedural tools** that automated **terrain, road, cliff, and vegetation generation**. These tools integrated with Unreal through the **Houdini Engine plugin**, streamlining the creation of large outdoor environments and enabling quicker iteration for the environment art team.`,
technologies: {
    Core: [
      { name: 'Houdini', usage: 'Core language used for the renderer implementation.' },
      { name: 'Unreal', usage: 'Used for GPU rendering and running the graphics pipeline.' },
    ],
  },

  steamURL: 'https://store.steampowered.com/app/1830630/Overpass_2/',
};
