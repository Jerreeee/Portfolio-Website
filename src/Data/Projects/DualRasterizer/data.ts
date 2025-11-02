import { ProjectRequiredInfo } from '@/Data/Projects/project';

export const data: ProjectRequiredInfo = {
  slug: 'DualRasterizer',
  title: 'Dual Rasterizer ',
  thumbnailImage: 'GPU_AnisotropicSampling',
  heroImage: 'GPU_AnisotropicSampling_NoFire',
  overviewMedia: [
    "GPU_AnisotropicSampling",
    "GPU_AnisotropicSampling_NoFire",
  ],
  shortDescription: 'A Dual Rasterizer build with c++ and DirectX 11',
  mediumDescription: 'A Dual Rasterizer built in C++ and DirectX 11, created to learn low-level 3D rendering by first implementing a full software rasterizer on the CPU (handling transformations, projection, rasterization, depth buffering, and basic lighting) and then adding a DirectX 11 GPU version to compare how the same pipeline behaves on graphics hardware, with a button to switch between CPU and GPU modes in real time to see both performance and implementation differences, focusing on understanding the graphics pipeline and underlying math rather than using a game engine.',
  technologies: {
    Core: [
      { name: 'cplusplus', version: 'C++20', usage: 'Core language used for the renderer implementation.' },
      { name: 'D3D11', usage: 'Used for GPU rendering and running the graphics pipeline.' },
      { name: 'DXGI', usage: 'Creates the swap chain and presents rendered frames to the window.' },
    ],
    Libraries: [
      { name: 'SDL', version: '2', usage: 'Window creation + keyboard/mouse input.' },
    ],
  },

  githubURL: 'https://github.com/Jerreeee/DAE_GD_S3_GP1_DualRasterizer',
};
