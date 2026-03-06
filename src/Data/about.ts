import { AboutInfo } from "@/Types/about";

export const aboutInfo: AboutInfo = {
  website: "jeroen.denayer.com",
  bio: {
    firstName: "Jeroen",
    lastName: "Denayer",
    tagline: "Software Engineer",
    description:
      "Software engineer with experience in building tools, systems, and automation. Grounded in algorithms and design patterns, I combine strong fundamentals with practical AI tooling to work faster and more effectively.",
    aiDescription:
      "I'm excited about the future of AI in software development and actively integrate AI tools into my own workflow. I've found that working with AI doesn't replace the need for strong fundamentals, it amplifies them. Understanding systems deeply lets me guide AI tools more effectively and catch where they fall short. It's changing how I build software, and I want to be at the forefront of that shift.",
    resumeSkills: {
      languages: ['cplusplus', 'csharp', 'Python', 'Typescript', 'Lua'],
      frameworks: ['React', 'Next.js'],
      tools: ['Git', 'GitHub', 'CMake', 'Perforce'],
      concepts: ['Algorithms', 'Design Patterns', 'Memory Management', 'Debugging', 'Automation', 'API Design'],
    },
    backgroundDescription:
      "I built a foundation in **C++**, **algorithms**, and **software design** during my studies. After graduating, I joined **Neopica** to build tools for a production pipeline in a multidisciplinary team. That combination of strong fundamentals and real-world team experience shapes how I approach software development today.",
    profileImage: "/Images/profilepic.jpg",
  },

  contact: {
    gsm: "+32 478 47 77 42",
    email: "jeroen@denayer.com",
    qrSrc: "/files/resume/qr_code.png",
    links: {
      github: {
        label: "GitHub",
        icon: "GitHub",
        href: "https://github.com/Jerreeee",
        tooltip: "View GitHub",
      },
      linkedin: {
        label: "LinkedIn",
        icon: "LinkedIn",
        href: "https://www.linkedin.com/in/jeroen-denayer/",
        tooltip: "View LinkedIn",
      },
      artstation: {
        label: "ArtStation",
        icon: "ArtStation",
        href: "https://www.artstation.com/jeroendenayer",
        tooltip: "View ArtStation",
      },
    },
  },

  skills: {
    groups: [
      {
        title: "Programming Languages",
        items: ["cplusplus", "csharp", "Python", "Typescript", "Lua"],
      },
      {
        title: "Frameworks",
        items: ["React", "Next.js"],
      },
      {
        title: "APIs & Libraries",
        items: ["Vulkan", "DirectX 11", "OpenGL", "SDL", "GLM"],
      },
      {
        title: "Game Engines",
        items: ["Unreal", "Unity"],
      },
      {
        title: "Tools & Pipeline",
        items: [
          "Git",
          "Claude",
          "Houdini",
          "Visual_Studio",
          "Visual_Studio_Code",
          "RenderDoc",
          "CMake",
          "Perforce",
          "GitHub",
          "Substance_Designer",
          "Substance_Painter",
          "Blender",
          "3DS_Max",
          "Maya",
        ],
      },
      {
        title: "Art & Design",
        items: ["Photoshop", "Premiere_Pro"],
      },
    ],
    languages: [
      { name: "Dutch", level: "Native" },
      { name: "English", level: "Fluent" },
    ],
  },

experience: {
  work: [
    {
      title: "Tool Developer - Neopica",
      right: "2022–23",
      body: [
        "Owned procedural tools end-to-end across multiple stages of a large production pipeline, used daily by the environment team.",
        "Wrote geometry-processing algorithms in a C-like scripting language and Python scripts to automate repetitive workflows.",
        "Gathered feedback from artists and designers daily; iterated on tools to fit their actual needs and drove adoption.",
      ],
    },
  ],
  projects: [
    {
      title: 'ISS Docking Simulator - Team Project',
      right: 'Sep–Dec 2021',
      body: 'I created detailed 3D models and textures for ISS modules used in the \u201cSpace - The Human Quest\u201d exhibition in Antwerp. Working within a shared pipeline and version-controlled environment, I collaborated closely with teammates to integrate assets reliably and efficiently. This project strengthened my ability to work within structured workflows, coordinate with others, and deliver technically correct real-time assets under constraints.',
    },
  ],
},

resumeProjects: [
  {
    title: "Vulkan Deferred Renderer",
    body: "Built a deferred rendering pipeline from scratch in C++20 and Vulkan 1.3, handling GPU memory, synchronization, and render passes directly. Implements PBR materials, multiple light types, and HDR tone mapping.",
    link: "jeroen.denayer.com/projects/VulkanDeferredRenderer",
  },
  {
    title: "Portfolio Website",
    body: "Designed and built a statically exported website with Next.js, React, TypeScript, and MUI. Includes code generation scripts for project manifests and component indexes, plus a custom theming system built on top of MUI.",
    link: "jeroen.denayer.com",
  },
],

education: [
  {
    title: "Digital Arts & Entertainment - game development",
    right: "2023–25",
    sub: "Graduated magna cum laude",
    body:
      "Focused on C++ programming, memory management, and low-level systems thinking. Projects involved real-time systems and GPU programming in larger structured projects, where performance matters and you have to reason about what's happening under the hood. Used Python and Lua for scripting and tooling alongside C++.",
  },
  {
    title: "Digital Arts & Entertainment - game graphics production",
    right: "2019–22",
    sub: "Graduated cum laude",
    body:
      "Covered the full production pipeline from concept to integration, balancing quality with real-time performance constraints. Over time I got more into procedural tooling and automation, writing algorithms in VEX and building procedural systems in Houdini to replace manual work. That's what got me interested in building tools and pushed me toward software development.",
  },
],
};
