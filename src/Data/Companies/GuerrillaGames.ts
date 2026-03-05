import type { ResumeTailoring } from '@/Types/resume-tailoring';

const guerrillaGamesTailoring: ResumeTailoring = {
  bio: {
    description:
      "I'm Jeroen Denayer, a C++ programmer with a strong focus on engine systems, rendering, and tools. During my studies in Game Graphics Production I discovered procedural workflows through Houdini, which sparked an interest in how technical systems can make large-scale production pipelines more reliable and efficient. After working at Neopica developing procedural tools for a shipped title, I pursued a second bachelor focused on C++ and low-level graphics programming, where I built real-time rendering features in Vulkan, engine-level systems, and custom tooling. I'm drawn to technically challenging problems and enjoy working close to the metal - reasoning about system behavior, optimizing performance, and building solutions that hold up under production constraints.",
  },
  experience: {
    work: {
      'Technical Artist - Neopica': {
        body: "I designed and implemented Houdini-based procedural generation tools integrated into Unreal Engine's PCG framework, used in the shipped production of Overpass 2. Each tool automated a distinct stage of the level-building pipeline - terrain, roads, cliffs, vegetation - replacing manual workflows with deterministic, data-driven systems. I owned the full development cycle: architecture, implementation, debugging, and iteration based on artist feedback. This required deep understanding of how the toolchain interacted with the engine at runtime, careful attention to performance and edge cases, and the ability to communicate technical constraints clearly to a non-technical team.",
      },
    },
    projects: {
      'ISS Docking Simulator - Team Project': {
        exclude: true,
      },
    },
  },
  education: {
    'Digital Arts & Entertainment - Game Development': {
      body: "I focused on C++ engine programming and real-time graphics, implementing rendering features - including a deferred shading pipeline - using Vulkan, and building supporting tooling in C# WPF to improve iteration speed. Projects demanded reasoning about GPU/CPU interaction, memory layout, synchronisation, and render state management. I also worked on engine-side systems and UI, gaining experience with structured codebases, cross-system dependencies, and the kind of disciplined engineering required to keep complex systems maintainable. Graduated magna cum laude.",
    },
    'Digital Arts & Entertainment - Game Graphics Production': {
      body: "I built a strong foundation in real-time asset production - modelling, texturing, shading, and engine integration - with a constant focus on balancing visual quality against runtime performance budgets. This grounded understanding of the art pipeline and its constraints is what initially led me to explore procedural and technical solutions, and shaped how I think about the interaction between content, tooling, and engine systems.",
    },
  },
};

export default guerrillaGamesTailoring;
