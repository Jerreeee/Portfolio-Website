// ----------------------------------------------------
// Generates src/Types/componentAnimations.d.ts
// by scanning each index.ts for exported components
// (and/or re-exports from *Classes.ts), then importing
// `${Name}ClassKey` from that folder's index.
// Groups components from the same folder into one import.
// Uses single-line import for folders with one component.
// ----------------------------------------------------

import fs from "fs";
import path from "path";
import PATHS from '../src/Config/paths';

const COMPONENTS_DIR = PATHS.COMPONENTS().fs().value;
const OUTPUT_FILE = PATHS.COMPONENT_ANIMATIONS().fs().value;

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

// Extract component names from "export { default as Name } from './Name'"
function extractNamesFromDefaultExports(fileContent: string): string[] {
  const re =
    /export\s*\{\s*default\s+as\s+([A-Za-z0-9_]+)\s*\}\s*from\s*['"][.^'"]+['"];?/g;
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(fileContent)) !== null) {
    out.push(m[1]); // Name
  }
  return [...new Set(out)];
}

// Fallback: extract names from "export * from './NameClasses'"
function extractNamesFromStarClasses(fileContent: string): string[] {
  const re = /export\s*\*\s*from\s*['"]\.\/([A-Za-z0-9_]+)Classes['"];?/g;
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(fileContent)) !== null) {
    const base = m[1]; // e.g. "MediaGalleryCmp"
    out.push(base);
  }
  return [...new Set(out)];
}

// Generate imports + interface entries
function generateImportsAndInterface(
  componentsByFolder: Record<string, string[]>
): string {
  const sortedFolders = Object.keys(componentsByFolder).sort();

  const importLines = sortedFolders
    .map((folder) => {
      const components = [...new Set(componentsByFolder[folder])].sort();
      if (components.length === 1) {
        return `import type { ${components[0]}ClassKey } from '${folder}';`;
      } else {
        const imports = components.map((c) => `${c}ClassKey`).join(",\n  ");
        return `import type {\n  ${imports},\n} from '${folder}';`;
      }
    })
    .join("\n");

  const interfaceEntries = sortedFolders
    .flatMap((folder) =>
      [...new Set(componentsByFolder[folder])]
        .sort()
        .map((component) => `  ${component}: ${component}ClassKey;`)
    )
    .join("\n");

  return `// AUTO-GENERATED START
${importLines}

export interface ComponentNameToAnimationSlot {
${interfaceEntries}
}
// AUTO-GENERATED END`;
}

// Static header
const staticHeader = `// ${PATHS.COMPONENT_ANIMATIONS}
import type { AnimationProps } from 'framer-motion';

/**
 * For each component, we want a record of slot->AnimationProps.
 * This is similar to OverridesStyleRules but specialized for motion.
 */
export type AnimationStyleRules<SlotKey extends string> = {
  [Slot in SlotKey]?: AnimationProps;
};

/**
 * Main helper: ComponentsAnimations<Theme>
 * Gives you { ProjectCardCmp?: Partial<AnimationStyleRules<...>>; ... }
 */
export type ComponentsAnimations<Theme = unknown> = {
  [Name in keyof ComponentNameToAnimationSlot]?: Partial<
    AnimationStyleRules<ComponentNameToAnimationSlot[Name]>
  >;
};
`;

function run(): void {
  console.log("🔍 Scanning component index files in:", COMPONENTS_DIR);

  const indexFiles = getAllIndexFiles(COMPONENTS_DIR);
  const componentsByFolder: Record<string, string[]> = {};

  for (const file of indexFiles) {
    const content = fs.readFileSync(file, "utf8");

    // Prefer explicit default export lines; fallback to star re-exports
    let names = extractNamesFromDefaultExports(content);
    if (names.length === 0) {
      names = extractNamesFromStarClasses(content);
    }

    if (names.length === 0) continue;

    const folder = path.dirname(file);
    const relativeFolder = path
      .relative(path.join(process.cwd(), "src"), folder)
      .replace(/\\/g, "/");

    const importPath = `@/${relativeFolder}`;
    if (!componentsByFolder[importPath]) componentsByFolder[importPath] = [];
    componentsByFolder[importPath].push(...names);
  }

  if (Object.keys(componentsByFolder).length === 0) {
    console.warn("⚠️ No components discovered in index.ts files.");
    return;
  }

  const generated = generateImportsAndInterface(componentsByFolder);
  const content = `${staticHeader}\n${generated}\n`;

  fs.writeFileSync(OUTPUT_FILE, content, "utf8");

  const total = Object.values(componentsByFolder).reduce(
    (sum, arr) => sum + new Set(arr).size,
    0
  );

  console.log(
    `✅ Generated ${OUTPUT_FILE} with ${total} components across ${Object.keys(componentsByFolder).length} folders.`
  );
}

run();
