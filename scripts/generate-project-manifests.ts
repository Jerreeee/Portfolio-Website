// ----------------------------------------------------
// Generates data/projects/${projectName}/manifest.ts per project
// ----------------------------------------------------

import fs from "fs";
import path from "path";
import { imageSize } from "image-size";

import { ProjectManifest, MediaManifestEntry, Media } from "@/types/projectManifest";

const projectsDir = path.join(process.cwd(), "public", "projects");
const dataProjectsDir = path.join(process.cwd(), "src", "data", "projects");

// Get list of subfolders (each representing a project)
const projectFolders = fs.readdirSync(projectsDir)
  .filter((f) => fs.statSync(path.join(projectsDir, f)).isDirectory());

projectFolders.forEach((projectName) => {
  const projectPath = path.join(projectsDir, projectName);
  const imagesPath = path.join(projectPath, "Images");

  const media: Media = {};

  // Collect images inside this project's Images folder
  if (fs.existsSync(imagesPath)) {
    const files = fs.readdirSync(imagesPath)
      .filter((file) => /\.(jpe?g|png|webp|gif|avif)$/i.test(file));

    files.forEach((file) => {
      const filepath = path.join(imagesPath, file);
      const buffer = fs.readFileSync(filepath);
      const { width, height } = imageSize(buffer);

      if (width && height) {
        const aspectRatio = width / height;
        media[file] = {
          type: "image",
          src: `/projects/${projectName}/Images/${file}`,
          width,
          height,
          aspectRatio,
        };
      } else {
        console.warn(`⚠️ Could not read dimensions for ${filepath}`);
      }
    });
  }

  // Merge in extra.json if present
  const extraFile = path.join(projectPath, "extra.json");
  if (fs.existsSync(extraFile)) {
    try {
      const extraData = JSON.parse(fs.readFileSync(extraFile, "utf-8")) as {
        media?: Media;
      };

      if (extraData.media && typeof extraData.media === "object") {
        Object.entries(extraData.media).forEach(([key, value]) => {
          if (!media[key]) {
            media[key] = value;
          }
        });
      }
    } catch (err) {
      console.error(`⚠️ Failed to parse extra.json for ${projectName}:`, err);
    }
  }

  // Create directory under src/data/projects/${projectName}/ if needed
  const projectDataDir = path.join(dataProjectsDir, projectName);
  if (!fs.existsSync(projectDataDir)) {
    fs.mkdirSync(projectDataDir, { recursive: true });
  }

  // Write manifest.ts
  const manifestFile = path.join(projectDataDir, "manifest.ts");
  const fileContent = `import type { ProjectManifest } from "@/types/projectManifest";

export const projectManifest: ProjectManifest = {
  media: ${JSON.stringify(media, null, 2)}
};
`;

  fs.writeFileSync(manifestFile, fileContent, "utf8");

  console.log(
    `✅ ${projectName}: wrote manifest.ts with ${Object.keys(media).length} items`
  );
});
