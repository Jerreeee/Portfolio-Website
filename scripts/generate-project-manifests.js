// scripts/generate-project-manifests.js

const fs = require("fs");
const path = require("path");
const { imageSize } = require("image-size");

const projectsDir = path.join(process.cwd(), "public", "projects");

// Get list of subfolders (each project)
const projectFolders = fs
  .readdirSync(projectsDir)
  .filter((f) => fs.statSync(path.join(projectsDir, f)).isDirectory());

projectFolders.forEach((projectName) => {
  const projectPath = path.join(projectsDir, projectName);
  const imagesPath = path.join(projectPath, "Images");
  const outputFile = path.join(projectPath, "manifest.json");

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

  const manifest = { media };

  fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2));
  console.log(
    `✅ ${projectName}: wrote ${Object.keys(media).length} media items to manifest.json`
  );
});
