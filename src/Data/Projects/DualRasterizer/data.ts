import { ProjectRequiredInfo } from '@/Data/Projects/project';

export const data: ProjectRequiredInfo = {
  slug: 'DualRasterizer',
  title: 'Dual Rasterizer',
  thumbnailImage: 'GPU_Final',
  heroImage: 'GPU_Final',
  overviewMedia: [
    "GPU_Final",
    "GPU_AnisotropicSampling",
  ],
  shortDescription: 'A Dual Rasterizer build with c++ and DirectX 11',
  mediumDescription: `**The Dual Rasterizer** was built around three goals.

**1) Understand the fundamentals.**
I started with a CPU software rasterizer: vertex transforms, perspective projection, triangle rasterization, depth testing, and basic shading.

**2) Map the same pipeline to the GPU (DirectX 11).**
With the CPU version as a reference, I rebuilt it using shaders, buffers, and sampler states.

**3) Compare them side-by-side.**
You can switch between CPU and GPU paths at runtime to see differences in performance and behavior.`,  technologies: {
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
