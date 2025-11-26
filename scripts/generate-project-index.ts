// ----------------------------------------------------
// Update src/Data/Projects/index.ts
// ----------------------------------------------------

import fs from "fs";
import path from "path";
import PATHS from "../src/Config/paths";

const dataProjectsDir = path.join(process.cwd(), PATHS.SRC_PROJECTS().value);
const indexFile = path.join(dataProjectsDir, "index.ts");

// Get list of subfolders (each project)
const projectFolders = fs
  .readdirSync(dataProjectsDir)
  .filter((f) => fs.statSync(path.join(dataProjectsDir, f)).isDirectory());

// Filter valid projects (must have data.ts, ProjectCmp.tsx, and manifest.ts)
const validProjects: string[] = projectFolders.filter((name) => {
  const dataFile = path.join(dataProjectsDir, name, "data.ts");
  const cmpFile = path.join(dataProjectsDir, name, "ProjectCmp.tsx");
  const manifestFile = path.join(dataProjectsDir, name, "manifest.ts");

  if (!fs.existsSync(dataFile)) {
    console.warn(`⚠️ Skipping ${name}: missing data.ts`);
    return false;
  }
  if (!fs.existsSync(cmpFile)) {
    console.warn(`⚠️ Skipping ${name}: missing ProjectCmp.tsx`);
    return false;
  }
  if (!fs.existsSync(manifestFile)) {
    console.warn(
      `⚠️ Skipping ${name}: missing manifest.ts — run "npm run generate:projects-manifest"`
    );
    return false;
  }
  return true;
});

// ----------------------------------------------------
// Extract existing project order (if present)
// ----------------------------------------------------
let existingOrder: string[] = [];

if (fs.existsSync(indexFile)) {
  const content = fs.readFileSync(indexFile, "utf-8");

  const match = content.match(
    /export const projects: ProjectInfo\[] = \[[\s\S]*?\];/
  );

  if (match) {
    const inside = match[0];
    const itemMatches = inside.match(/(\w+)ProjectInfo/g);

    if (itemMatches) {
      existingOrder = itemMatches.map((item) =>
        item.replace("ProjectInfo", "")
      );
    }
  }
}

// ----------------------------------------------------
// Merge existing order with new validProjects
// ----------------------------------------------------
let finalOrder: string[] = [];

if (existingOrder.length > 0) {
  // Keep projects that still exist
  finalOrder = existingOrder.filter((name) => validProjects.includes(name));

  // Append new projects at the end
  for (const proj of validProjects) {
    if (!finalOrder.includes(proj)) {
      finalOrder.push(proj);
    }
  }
} else {
  // First generation: use validProjects directly
  finalOrder = [...validProjects];
}

// ----------------------------------------------------
// Generate import statements
// ----------------------------------------------------
const imports = finalOrder
  .map(
    (name) => `import { data as ${name}Data } from '${PATHS.PROJECT_DATA({
      projectName: name,
    }).import().value}';
import ${name}Cmp from '${PATHS.PROJECT_COMPONENT({
      projectName: name,
    }).import().value}';
import { projectManifest as ${name}Manifest } from '${PATHS.PROJECT_MANIFEST({
      projectName: name,
    }).import().value}';`
  )
  .join("\n\n");

// Generate ProjectInfo objects
const projectInfos = finalOrder
  .map(
    (name) => `const ${name}ProjectInfo: ProjectInfo = {
  ...${name}Data,
  component: ${name}Cmp,
  manifest: ${name}Manifest,
};`
  )
  .join("\n\n");

// Generate project array
const arrayEntries = finalOrder.map((name) => `${name}ProjectInfo`).join(",\n  ");

const projectArray = `export const projects: ProjectInfo[] = [
  ${arrayEntries},
];`;

// Generate projectSlugs literal
const projectSlugs = `export const projectSlugs = [
  ${finalOrder.map((name) => `"${name}"`).join(",\n  ")}
] as const;`;

// ----------------------------------------------------
// Final generated block
// ----------------------------------------------------
const generatedBlock = `// AUTO-GENERATED PROJECT IMPORTS START

${imports}

${projectInfos}

${projectArray}

${projectSlugs}

// AUTO-GENERATED PROJECT IMPORTS END`;

// ----------------------------------------------------
// Insert/replace into index.ts
// ----------------------------------------------------
let existing = "";
if (fs.existsSync(indexFile)) {
  existing = fs.readFileSync(indexFile, "utf-8");
}

const pattern =
  /\/\/ AUTO-GENERATED PROJECT IMPORTS START[\s\S]*?\/\/ AUTO-GENERATED PROJECT IMPORTS END/;

if (pattern.test(existing)) {
  existing = existing.replace(pattern, generatedBlock);
} else {
  existing = existing.trimEnd() + "\n\n" + generatedBlock;
}

fs.writeFileSync(indexFile, existing + "\n", "utf-8");

console.log(
  `✅ Updated project index with ${finalOrder.length} projects (kept order, appended new)`
);
