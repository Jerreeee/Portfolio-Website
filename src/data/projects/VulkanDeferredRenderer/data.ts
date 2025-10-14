import { ProjectRequiredInfo } from '@/data/projects/project';

export const data: ProjectRequiredInfo = {
  slug: 'VulkanDeferredRenderer',
  title: 'Vulkan Deferred Renderer',
  thumbnailImage: 'PostProcess_Final_Outdoor.webp',
  heroImage: '/projects/VulkanDeferredRenderer/PostProcess_Final_Outdoor.webp',
  shortDescription: 'A physically-based rendering pipeline built in C++ and Vulkan.',
  mediumDescription: 'A Vulkan-based deferred rendering pipeline written in C++. Built to explore how modern rendering works and to learn Vulkan’s low-level API. It supports PBR materials, multiple light types, HDR tone mapping, and uses newer Vulkan features like Dynamic Rendering, Synchronization2, and Bindless Rendering.',

  technologies: {
    Core: [
      { name: 'C++', version: 'C++20', usage: 'Core language used for the renderer implementation.' },
      { name: 'Vulkan', version: '1.3', usage: 'Low-level graphics API for deferred shading, synchronization, and GPU memory management.' },
    ],
    Libraries: [
      { name: 'GLFW', version: '3.3', usage: 'Handles window creation, input, and Vulkan surface setup.' },
      { name: 'GLM', version: '0.9.9', usage: 'Mathematics library for vectors, matrices, and transformations.' },
      { name: 'stb_image', version: '2.28', usage: 'Header-only image loader used for textures and HDR environment maps.' },
      { name: 'tinyobjloader', version: '2.0', usage: 'Lightweight OBJ loader for importing meshes.' },
    ],
    Tools: [
      { name: 'RenderDoc', version: '1.32', usage: 'Frame capture, GPU debugging, and visualizing G-buffer outputs.' },
      { name: 'NsightGraphics', version: '2025.1', usage: 'Frame capture, GPU debugging, and visualizing G-buffer outputs.' },
    ],
  },
};
