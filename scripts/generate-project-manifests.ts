// ----------------------------------------------------
// Generates Data/Projects/${projectName}/manifest.ts per project
// ----------------------------------------------------

import fs from "fs";
import path from "path";
import { imageSize } from "image-size";
import PATHS from '../src/Config/paths';
import { ProjectManifest, Media } from "@/Types/projectManifest";
import { getVideoDimensions } from "./ffprobe";

// ---------------- Helpers ----------------
function loadExistingManifest(manifestFile: string): Media {
  if (!fs.existsSync(manifestFile)) return {};
  const content = fs.readFileSync(manifestFile, "utf8");

  // Match the object literal inside `media: { ... }`
  const match = content.match(/media:\s*({[\s\S]*?})\s*};/);
  if (!match) return {};

  try {
    // Convert TS object literal to valid JSON
    const jsonString = match[1]
      .replace(/(\w+):/g, '"$1":')
      .replace(/'/g, '"');
    return JSON.parse(jsonString);
  } catch (err) {
    console.warn(`⚠️ Failed to parse existing manifest at ${manifestFile}:`, err);
    return {};
  }
}

// ---------------- Main ----------------
const projectsDir = path.join(process.cwd(), PATHS.PUBLIC_PROJECTS().value);
const dataProjectsDir = path.join(process.cwd(), PATHS.SRC_PROJECTS().value);

const projectFolders = fs
  .readdirSync(projectsDir)
  .filter((f) => fs.statSync(path.join(projectsDir, f)).isDirectory());

projectFolders.forEach(async (projectName) => {
  const projectPath = path.join(projectsDir, projectName);
  const imagesPath = path.join(projectPath, "Images");
  const videosPath = path.join(projectPath, "Videos");

  const media: Media = {};

  // Path to existing manifest file
  const projectDataDir = path.join(dataProjectsDir, projectName);
  const manifestFile = path.join(projectDataDir, "manifest.ts");
  const existingMedia = loadExistingManifest(manifestFile);

  // ---------------- IMAGES ----------------
  if (fs.existsSync(imagesPath)) {
    const files = fs
      .readdirSync(imagesPath)
      .filter((file) => /\.(jpe?g|png|webp|gif|avif)$/i.test(file));

    files.forEach((file) => {
      const filepath = path.join(imagesPath, file);
      const buffer = fs.readFileSync(filepath);
      const { width, height } = imageSize(buffer);

      if (width && height) {
        const key = file.replace(/\.[^/.]+$/, ""); // remove extension
        const fileType = file.split(".").pop() ?? "";

        const previousAlt =
          existingMedia[key]?.type === "image" ? existingMedia[key].alt : undefined;

        media[key] = {
          name: key,
          type: "image",
          fileType,
          src: `${PATHS.PROJECT_IMAGE({
            projectName,
            fileName: file,
          }).url().value}`,
          width,
          height,
          aspectRatio: width / height,
          alt: previousAlt ?? key.replace(/[_-]/g, " "),
        };
      } else {
        console.warn(`⚠️ Could not read dimensions for ${filepath}`);
      }
    });
  }

  // ---------------- VIDEOS ----------------
  if (fs.existsSync(videosPath)) {
    const videoFiles = fs
      .readdirSync(videosPath)
      .filter((file) => /\.(mp4|webm|mov|m4v|avi|mkv)$/i.test(file));

    for (const file of videoFiles) {
      const filepath = path.join(videosPath, file);
      const key = file.replace(/\.[^/.]+$/, ""); // remove extension
      const fileType = file.split(".").pop() ?? "";

      let width = 0;
      let height = 0;

      try {
        const dims = await getVideoDimensions(filepath);
        width = dims.width;
        height = dims.height;
      } catch {
        console.warn(`⚠️ Failed to read video metadata: ${filepath}`);
      }

      const previousAlt =
        existingMedia[key]?.type === "fileVideo" ? existingMedia[key].alt : undefined;

      media[key] = {
        name: key,
        type: "fileVideo",
        fileType,
        src: `${PATHS.PROJECT_VIDEO({
          projectName,
          fileName: file,
        }).url().value}`,
        width,
        height,
        alt: previousAlt ?? key.replace(/[_-]/g, " "),
      };
    }
  }

  // ---------------- MERGE extra.json ----------------
  const extraFile = path.join(projectPath, "extraMedia.json");
  if (fs.existsSync(extraFile)) {
    try {
      const extraData = JSON.parse(fs.readFileSync(extraFile, "utf-8")) as {
        media?: Media;
      };

      if (extraData.media && typeof extraData.media === "object") {
        Object.entries(extraData.media).forEach(([key, value]) => {
          if (!media[key]) media[key] = value;
        });
      }
    } catch (err) {
      console.error(`⚠️ Failed to parse extra.json for ${projectName}:`, err);
    }
  }

  // Ensure output folder exists
  if (!fs.existsSync(projectDataDir)) {
    fs.mkdirSync(projectDataDir, { recursive: true });
  }

  // ---------------- WRITE manifest.ts ----------------
  const fileContent = `import type { ProjectManifest } from "@/Types/projectManifest";

/**
 * ---------------------------------------------------------------------
 * ⚙️ AUTO-GENERATED FILE — DO NOT EDIT MANUALLY (except "alt")
 * ---------------------------------------------------------------------
 * This file was generated by scripts/generate-project-manifests.ts
 * You may safely modify the "alt" fields below; they will be
 * preserved when the manifest is regenerated.
 * ---------------------------------------------------------------------
 */
export const projectManifest: ProjectManifest = {
  media: ${JSON.stringify(media, null, 2)}
};
`;

  fs.writeFileSync(manifestFile, fileContent, "utf8");

  console.log(
    `✅ ${projectName}: wrote manifest.ts with ${Object.keys(media).length} items (alt preserved)`
  );
});
