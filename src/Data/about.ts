import { AboutInfo } from "@/Types/about";

export const aboutInfo: AboutInfo = {
  website: "jeroen.denayer.com",
  bio: {
    firstName: "Jeroen",
    lastName: "Denayer",
    tagline: "C++ Programmer & Technical Artist",
    description:
      "I’m Jeroen Denayer, a C++ programmer and technical artist with a strong interest in building reliable systems and tools that improve workflows and performance. During my studies in Game Graphics Production, I discovered procedural workflows through Houdini and became interested in how technical solutions can make complex production pipelines more efficient. While working at Neopica, I developed procedural tools used in real production environments, which motivated me to pursue a second bachelor focused on C++ and low-level graphics programming. There, I worked on rendering systems, engine features, and custom tools, learning how to analyze problems, optimize performance, and design structured technical solutions.",
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
      title: "Technical Artist — Neopica",
      right: "2022–23",
      body:
        "I developed and maintained Houdini-based procedural tools for Unreal Engine used in the production of Overpass 2. Each tool handled a specific stage of the level pipeline—terrain, roads, cliffs, and vegetation—connected through PCG to generate large open worlds efficiently and predictably. I extended functionality, fixed pipeline issues, and ensured the tools remained stable, performant, and reliable for the environment art team. This work required structured problem-solving, debugging complex systems, and designing tools that behaved consistently under production constraints.",
    },
  ],
  projects: [
    {
      title: "ISS Docking Simulator — Team Project",
      right: "Sep–Dec 2021",
      body:
        "I created detailed 3D models and textures for ISS modules used in the “Space – The Human Quest” exhibition in Antwerp. Working within a shared pipeline and version-controlled environment, I collaborated closely with teammates to integrate assets reliably and efficiently. This project strengthened my ability to work within structured workflows, coordinate with others, and deliver technically correct real-time assets under constraints.",
    },
  ],
},

education: [
  {
    title: "Digital Arts & Entertainment — Game Development",
    right: "2023–25",
    sub: "Graduated magna cum laude",
    body:
      "I focused on C++ programming and engine-level systems, working on graphics, rendering, tools and UI. I implemented real-time rendering features using Vulkan and built supporting tools, including custom C# WPF utilities, to improve workflows and performance. This taught me how to analyze performance bottlenecks, reason about system behavior, and design efficient technical solutions that scale. I gained strong experience working with structured codebases and understanding how low-level systems interact.",
  },
  {
    title: "Digital Arts & Entertainment — Game Graphics Production",
    right: "2019–22",
    sub: "Graduated cum laude",
    body:
      "I created optimized 2D and 3D assets from blockout to engine integration, covering modeling, texturing, lighting, and shading in real-time pipelines while balancing visual quality with performance targets. This gave me a solid understanding of production workflows and their technical constraints, which led me to explore procedural approaches in Houdini and develop an interest in building tools that automate repetitive tasks and improve reliability.",
  },
],
};
