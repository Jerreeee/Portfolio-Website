import { AboutInfo } from "@/Types/about.types";

export const aboutInfo: AboutInfo = {
  bio: {
    firstName: "Jeroen",
    lastName: "Denayer",
    tagline: "C++ Programmer & Technical Artist",
    description:
      "I’m Jeroen Denayer, a C++ programmer and technical artist who became fascinated by how much creative and technical work can be automated and improved. During my Game Graphics Production studies at Digital Arts and Entertainment, I discovered procedural workflows through Houdini and started exploring how to make production faster and more efficient. While working at Neopica, I developed this interest further by building procedural tools that improved entire pipelines, which motivated me to start a second bachelor in Game Development. There, I focused on C++ and low-level GPU programming, learning how to create tools and systems that make complex artistic and technical work easier, faster, and less repetitive.",
    profileImage: "/Images/profilepic.jpg",
  },

  contact: {
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
        icon: "Brush",
        href: "https://www.artstation.com/jeroendenayer",
        tooltip: "View ArtStation",
      },
    },
  },

  skills: {
    groups: [
      {
        title: "Programming",
        items: ["C++", "C#", "Lua", "Python"],
      },
      {
        title: "API",
        items: ["Vulkan", "DirectX 11"],
      },
      {
        title: "Engines",
        items: ["Unreal", "Unity"],
      },
      {
        title: "Tools",
        items: ["Houdini", "Blender", "CMake", "Perforce", "GitHub"],
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
          "I built and maintained a suite of Houdini-based procedural tools for Unreal Engine used in the production of Overpass 2. Each tool handled a specific part of the level pipeline—terrain, road, cliff, and vegetation generation and placement—connected through PCG to efficiently generate large open worlds in chunks. My responsibilities included extending functionality, resolving pipeline issues, and ensuring the tools remained flexible and performant for the environment art team.",
      },
    ],
    projects: [
      {
        title: "ISS Docking Simulator — Team Project",
        right: "Sep–Dec 2021",
        body:
          "I was responsible for modeling and texturing high-quality ISS modules and components for the “Space – The Human Quest” exhibition in Antwerp. I worked as part of a team, sharing assets through a common workflow and version control system, which strengthened my communication, teamwork, and problem-solving skills while creating real-time assets for the exhibit.",
      },
    ],
  },

  education: [
    {
      title: "Digital Arts & Entertainment — Game Development",
      right: "2023–25",
      sub: "Graduated magna cum laude",
      body:
        "I focused on C++ gameplay and engine programming, combining shader, rendering, and tool development across graphics, AI, UI, and core engine systems. I worked with Vulkan for real-time rendering and built tools—including custom WPF utilities in C#—to improve workflows and performance. Through this, I learned the real power of automation in development and how modern CPUs and GPUs have an incredible amount of untapped potential—it’s all about learning to use that power efficiently.",
    },
    {
      title: "Digital Arts & Entertainment — Game Graphics Production",
      right: "2019–22",
      sub: "Graduated cum laude",
      body:
        "I created optimized 2D and 3D PBR assets from blockout to engine, handling modeling, texturing, lighting, and shading in a real-time pipeline while balancing visual quality with performance targets. Through this, I gained a solid understanding of artists’ workflows and how repetitive and time-consuming they can be, which led me to discover Houdini and develop a real appreciation for proceduralism and its potential to make production more efficient and flexible.",
    },
  ],
};
