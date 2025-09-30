// scripts/generate-project-manifests.js

const fs = require("fs");
const path = require("path");
const { imageSize } = require("image-size");

const projectsDir = path.join(process.cwd(), "public", "projects");
const dataProjectsDir = path.join(process.cwd(), "src", "data", "projects");
const indexFile = path.join(dataProjectsDir, "index.ts");

// Get list of subfolders (each project)
const projectFolders = fs
  .readdirSync(projectsDir)
  .filter((f) => fs.statSync(path.join(projectsDir, f)).isDirectory());

projectFolders.forEach((projectName) => {
  const projectPath = path.join(projectsDir, projectName);
  const imagesPath = path.join(projectPath, "Images");

  const media = {};

  // Collect images inside this project's Images folder (if it exists)
  if (fs.existsSync(imagesPath)) {
    const files = fs
      .readdirSync(imagesPath)
      .filter((file) => /\.(jpe?g|png|webp|gif|avif)$/i.test(file));

    files.forEach((file) => {
      const filepath = path.join(imagesPath, file);
      const buffer = fs.readFileSync(filepath);
      const { width, height } = imageSize(buffer);

      media[file] = {
        type: "image",
        src: `/projects/${projectName}/Images/${file}`,
        width,
        height,
      };
    });
  }

  // Merge in extra.json if present
  const extraFile = path.join(projectPath, "extra.json");
  if (fs.existsSync(extraFile)) {
    try {
      const extra = JSON.parse(fs.readFileSync(extraFile, "utf-8"));
      if (extra.media && typeof extra.media === "object") {
        Object.entries(extra.media).forEach(([key, value]) => {
          if (!media[key]) {
            media[key] = value; // preserve generated entries if conflict
          }
        });
      }
    } catch (err) {
      console.error(`⚠️ Failed to parse extra.json for ${projectName}:`, err);
    }
  }

  // Generate media.ts under src/data/projects/${projectName}/
  const projectDataDir = path.join(dataProjectsDir, projectName);
  if (!fs.existsSync(projectDataDir)) {
    fs.mkdirSync(projectDataDir, { recursive: true });
  }

  const mediaFile = path.join(projectDataDir, "manifest.ts");

  const fileContent = `import type { ProjectManifest } from "@/types/projectManifest";

export const projectManifest: ProjectManifest = {
  media: ${JSON.stringify(media, null, 2)}
};
`;

  fs.writeFileSync(mediaFile, fileContent);
  console.log(`✅ ${projectName}: wrote media.ts with ${Object.keys(media).length} items`);
});

// ----------------------------------------------------
// Update src/data/projects/index.ts
// ----------------------------------------------------
const validProjects = projectFolders.filter((name) => {
  const dataFile = path.join(dataProjectsDir, name, "data.ts");
  const cmpFile = path.join(dataProjectsDir, name, "ProjectCmp.tsx");

  if (!fs.existsSync(dataFile)) {
    console.warn(`⚠️ Skipping ${name}: missing data.ts`);
    return false;
  }
  if (!fs.existsSync(cmpFile)) {
    console.warn(`⚠️ Skipping ${name}: missing ProjectCmp.tsx`);
    return false;
  }
  return true;
});

const imports = validProjects
  .map(
    (name) => `import { data as ${name}Data } from '@/data/projects/${name}/data';
import ${name}Cmp from '@/data/projects/${name}/ProjectCmp';`
  )
  .join("\n\n");

const projectInfos = validProjects
  .map(
    (name) => `const ${name}ProjectInfo: ProjectInfo = {
  ...${name}Data,
  Component: ${name}Cmp,
};`
  )
  .join("\n\n");

const arrayEntries = validProjects.map((name) => `${name}ProjectInfo`).join(",\n  ");

const generatedBlock = `// AUTO-GENERATED PROJECT IMPORTS START
${imports}

${projectInfos}

export const projects: ProjectInfo[] = [
  ${arrayEntries},
];
// AUTO-GENERATED PROJECT IMPORTS END`;

let existing = "";
if (fs.existsSync(indexFile)) {
  existing = fs.readFileSync(indexFile, "utf-8");
}

// Replace or insert generated block
const pattern =
  /\/\/ AUTO-GENERATED PROJECT IMPORTS START[\s\S]*?\/\/ AUTO-GENERATED PROJECT IMPORTS END/;
if (pattern.test(existing)) {
  existing = existing.replace(pattern, generatedBlock);
} else {
  existing = existing.trimEnd() + "\n\n" + generatedBlock;
}

fs.writeFileSync(indexFile, existing + "\n");
console.log(`✅ Updated project index with ${validProjects.length} valid projects`);

