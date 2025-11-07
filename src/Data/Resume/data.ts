import React, { FC, ReactNode } from "react";
import {
  Box,
  Typography,
  Divider,
  Link as MuiLink,
  CssBaseline,
  GlobalStyles,
} from "@mui/material";
import { IconCmp } from "@/Themes/Default/Components/Icon";

/* =========================================================
 * 1) TYPES
 * =======================================================*/

type LinkSet = {
  github?: string;
  linkedin?: string;
  artstation?: string;
  [key: string]: string | undefined;
};

type SkillGroups = {
  programming: string[];
  api: string[];
  engines: string[];
  tools: string[];
  languages: { name: string; level?: string }[];
};

type EntryItem = {
  title: string;
  right?: string;
  sub?: string;
  body: string;
  link?: string;
};

type Experience = {
  work: EntryItem[];
  projects: EntryItem[];
};

type NameBlock = {
  first: string;
  last: string;
  tagline: string; // "C++ Programmer & Technical Artist"
};

type Contact = {
  email: string;
  links: LinkSet;
  qrSrc?: string;
};

type ResumeData = {
  name: NameBlock;
  contact: Contact;
  skills: SkillGroups;
  summary: string;
  experience: Experience;
  education: EntryItem[];
};

export const resumeData: ResumeData = {
  name: {
    first: "Jeroen",
    last: "Denayer",
    tagline: "C++ Programmer & Technical Artist",
  },
  contact: {
    email: "jeroen@denayer.com",
    links: {
      github: "https://github.com/Jerreeee",
      linkedin: "https://www.linkedin.com/in/jeroen-denayer/",
      artstation: "https://www.artstation.com/jeroendenayer",
    },
    qrSrc: "/files/resume/qr_code.png",
  },
  skills: {
    programming: ["C++", "C#", "Lua", 'Python'],
    api: ["Vulkan", "DirectX 11"],
    engines: ["Unreal", "Unity"],
    tools: ["Houdini", "Blender", "CMake", "Perforce", "GitHub"],
    languages: [
      { name: "Dutch", level: "Native" },
      { name: "English", level: "Fluent" },
    ],
  },
  summary:
    "I’m Jeroen Denayer, a C++ programmer and technical artist who became fascinated by how much of both creative and technical work can be automated and improved. During my Game Graphics Production studies at DAE, I discovered procedural workflows through Houdini and grew passionate about optimizing processes through smart tools. This curiosity led me to pursue a second bachelor in Game Development, where I focused on C++ and low-level GPU programming. Now, I’m driven to build efficient tools and pipelines that make complex artistic and technical work simpler, faster, and far less repetitive.",
  experience: {
    work: [
      {
        title: "Technical Artist — Neopica",
        right: "22–23",
        body:
          "Building and maintaining a set of Houdini-based procedural tools for Unreal Engine, each handling a specific part of the level pipeline—terrain, road, cliff, vegetation generation/placement—linked together through PCG so large worlds could be generated efficiently in chunks. Responsible for extending functionality, solving pipeline issues, and keeping the tools flexible and performant for environment artists.",
      },
    ],
    projects: [
      {
        title: "ISS Docking Simulator — Team Project",
        right: "Sept – Dec 21",
        body:
        "Responsible for modelling and texturing high-quality ISS modules and components for the “Space – The Human Quest” exhibition in Antwerp. Working in a team and sharing assets through a common workflow and version control, improving communication, teamwork, and problem-solving skills while creating real-time assets for the exhibit."
      },
    ],
  },
  education: [
    {
      title: "Digital Arts & Entertainment — Game Development",
      right: "23–25",
      sub: "Graduated magna cum laude",
      body:
        "C++ gameplay and engine programming, shader and tool development, with work spanning graphics, AI, UI and core engine systems, including real-time rendering with Vulkan and custom WPF tools in C#, all aimed at building efficient, performance-focused games and development pipelines.",
    },
    {
      title: "Digital Arts & Entertainment — Game Graphics Production",
      right: "19– Feb 22",
      sub: "Graduated cum laude",
      body:
        "Creation of optimized 2D and 3D PBR assets from blockout to engine, focused on procedural workflows in Houdini, scripting tools to accelerate production, and handling modelling, texturing, lighting and shading in a real-time pipeline while balancing visual quality with performance targets.",
    },
  ],
};
