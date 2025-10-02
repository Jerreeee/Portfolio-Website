// ----------------------------------------------------
// Update src/data/projects/index.ts
// ----------------------------------------------------

const fs = require("fs");
const path = require("path");

const dataProjectsDir = path.join(process.cwd(), "src", "data", "projects");
const indexFile = path.join(dataProjectsDir, "index.ts");

// Get list of subfolders (each project)
const projectFolders = fs
  .readdirSync(dataProjectsDir)
  .filter((f) => fs.statSync(path.join(dataProjectsDir, f)).isDirectory());

const validProjects = projectFolders.filter((name) => {
  const dataFile = path.join(dataProjectsDir, name, "data.ts");
  const cmpFile = path.join(dataProjectsDir, name, "ProjectCmp.tsx");
  const manifestFile = path.join(dataProjectsDir, name, 'manifest.ts');

  if (!fs.existsSync(dataFile)) {
    console.warn(`⚠️ Skipping ${name}: missing data.ts`);
    return false;
  }
  if (!fs.existsSync(cmpFile)) {
    console.warn(`⚠️ Skipping ${name}: missing ProjectCmp.tsx`);
    return false;
  }
  if (!fs.existsSync(manifestFile)) {
    console.warn(`⚠️ Skipping ${name}: missing manifestFile.ts, run "npm run generate:manifests" to (re)generate them`);
    return false;
  }
  return true;
});

const imports = validProjects
  .map(
    (name) => `import { data as ${name}Data } from '@/data/projects/${name}/data';
import ${name}Cmp from '@/data/projects/${name}/ProjectCmp';
import { projectManifest as ${name}Manifest } from '@/data/projects/${name}/manifest';`
  )
  .join("\n\n");

const projectInfos = validProjects
  .map(
    (name) => `const ${name}ProjectInfo: ProjectInfo = {
  ...${name}Data,
  component: ${name}Cmp,
  manifest: ${name}Manifest,
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
