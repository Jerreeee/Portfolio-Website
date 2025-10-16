// ----------------------------------------------------
// Generates src/Types/componentSettings.d.ts
// by scanning component index.ts files for exported *CmpSettings types
// Groups components by folder and uses single-line or multi-line imports
// ----------------------------------------------------

import fs from "fs";
import path from "path";

const COMPONENTS_DIR = path.join(process.cwd(), "src", "Themes", "Default", "Components");
const OUTPUT_FILE = path.join(process.cwd(), "src", "types", "componentSettings.d.ts");

// Recursively find all index.ts files
function getAllIndexFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllIndexFiles(full));
    } else if (entry.isFile() && entry.name === "index.ts") {
      files.push(full);
    }
  }
  return files;
}

// Extract all exported *CmpSettings types
function extractSettingsTypes(fileContent: string): string[] {
  const matches: string[] = [];

  // Match any `export type { ... } from '...'` block
  const exportBlockRegex = /export\s+type\s+\{([^}]+)\}\s+from\s+['"].*?['"]/g;
  let match;

  while ((match = exportBlockRegex.exec(fileContent)) !== null) {
    const names = match[1]
      .split(",")
      .map((n) => n.trim())
      .filter((n) => n.endsWith("Settings"))
      .map((n) => n.replace(/Settings$/, "")); // keep only the prefix

    matches.push(...names);
  }

  return matches;
}

// Generate imports + interface entries
function generateImportsAndInterface(componentsByFolder: Record<string, string[]>): string {
  const sortedFolders = Object.keys(componentsByFolder).sort();

  const importLines = sortedFolders
    .map((folder) => {
      const components = componentsByFolder[folder].sort();
      if (components.length === 1) {
        // single-line import
        return `import type { ${components[0]}Settings } from '${folder}';`;
      } else {
        const imports = components.map((c) => `${c}Settings`).join(",\n  ");
        return `import type {\n  ${imports},\n} from '${folder}';`;
      }
    })
    .join("\n");

  const interfaceEntries = sortedFolders
    .flatMap((folder) =>
      componentsByFolder[folder].map(
        (component) => `  ${component}: ${component}Settings;`
      )
    )
    .join("\n");

  return `// AUTO-GENERATED START
${importLines}

export interface ComponentNameToSettings {
${interfaceEntries}
}

/**
 * Main helper: ComponentsSettings
 * Gives you { ProjectCardCmp?: ProjectCardCmpSettings; ... }
 */
export type ComponentsSettings<Theme = unknown> = {
  [Name in keyof ComponentNameToSettings]?: ComponentNameToSettings[Name];
};
// AUTO-GENERATED END`;
}

// Main runner
function run(): void {
  console.log("🔍 Scanning component index files in:", COMPONENTS_DIR);

  const indexFiles = getAllIndexFiles(COMPONENTS_DIR);
  const componentsByFolder: Record<string, string[]> = {};

  for (const file of indexFiles) {
    const content = fs.readFileSync(file, "utf8");
    const settingsComponents = extractSettingsTypes(content);
    if (settingsComponents.length === 0) continue;

    const folder = path.dirname(file);
    const relativeFolder = path
      .relative(path.join(process.cwd(), "src"), folder)
      .replace(/\\/g, "/");

    const importPath = `@/${relativeFolder}`;
    if (!componentsByFolder[importPath]) componentsByFolder[importPath] = [];

    componentsByFolder[importPath].push(...settingsComponents);
  }

  if (Object.keys(componentsByFolder).length === 0) {
    console.warn("⚠️ No exported *CmpSettings types found in index.ts files.");
    return;
  }

  const generated = generateImportsAndInterface(componentsByFolder);
  const content = `// src/Types/componentSettings.d.ts
/**
 * Auto-generated mapping between component names and their Settings types.
 * Used to power theme configuration and typing.
 */

${generated}
`;

  fs.writeFileSync(OUTPUT_FILE, content, "utf8");

  const total = Object.values(componentsByFolder).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  console.log(
    `✅ Generated ${OUTPUT_FILE} with ${total} components across ${Object.keys(componentsByFolder).length} folders.`
  );
}

run();
