// ----------------------------------------------------
// Generates data/projects/${projectName}/manifest.ts per project
// ----------------------------------------------------

const fs = require("fs");
const path = require("path");
const { imageSize } = require("image-size");

const projectsDir = path.join(process.cwd(), "public", "projects");
const dataProjectsDir = path.join(process.cwd(), "src", "data", "projects");

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
      const aspectRatio = width / height;

      media[file] = {
        type: "image",
        src: `/projects/${projectName}/Images/${file}`,
        width,
        height,
        aspectRatio,
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

  // Generate manifest.ts under src/data/projects/${projectName}/
  const projectDataDir = path.join(dataProjectsDir, projectName);
  if (!fs.existsSync(projectDataDir)) {
    fs.mkdirSync(projectDataDir, { recursive: true });
  }

  const manifestFile = path.join(projectDataDir, "manifest.ts");

  const fileContent = `import type { ProjectManifest } from "@/types/projectManifest";

export const projectManifest: ProjectManifest = {
  media: ${JSON.stringify(media, null, 2)}
};
`;

  fs.writeFileSync(manifestFile, fileContent);
  console.log(`✅ ${projectName}: wrote manifest.ts with ${Object.keys(media).length} items`);
});
