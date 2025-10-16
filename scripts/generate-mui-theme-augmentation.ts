import fs from "fs";
import path from "path";
import PATHS from '../src/Config/paths';

const COMPONENTS_DIR = path.join(process.cwd(), PATHS.COMPONENTS());
const AUGMENTATION_FILE = path.join(process.cwd(), PATHS.MUI_THEME_AUGMENTATION());

// Regex matchers for auto-generated blocks
const blockRegex = (name: string) =>
  new RegExp(
    `(// AUTO-GENERATED ${name} START)([\\s\\S]*?)(// AUTO-GENERATED ${name} END)`,
    "m"
  );

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

/**
 * Extract component "Names" from:
 *   export type { FooCmpProps, FooCmpSettings } from './FooCmp';
 * We only need the ones ending in "Props" to infer the component base name "FooCmp".
 */
function extractComponentNamesViaProps(content: string): string[] {
  const out: string[] = [];
  const exportBlockRegex = /export\s+type\s+\{([^}]+)\}\s+from\s+['"][^'"]+['"]/g;
  let m: RegExpExecArray | null;

  while ((m = exportBlockRegex.exec(content)) !== null) {
    const names = m[1]
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean);

    for (const n of names) {
      const propsMatch = /^([A-Za-z0-9_]+)Props$/.exec(n);
      if (propsMatch) out.push(propsMatch[1]); // component base name (e.g. FooCmp)
    }
  }

  // de-dupe
  return [...new Set(out)];
}

// Generate all block contents
function generateBlocks(components: { name: string; importPath: string }[]) {
  // --- IMPORTS ---
  // We import both Props and ClassKey from the folder's index (it re-exports *Classes.ts)
  const importLines = components
    .map(
      ({ name, importPath }) =>
        `import type { ${name}Props, ${name}ClassKey } from '${importPath}';`
    )
    .join("\n");

  // --- ComponentsProps ---
  const propsLines = components
    .map(({ name }) => `    ${name}?: ${name}Props;`)
    .join("\n");

  // --- ComponentNameToClassKey ---
  const classKeyLines = components
    .map(({ name }) => `    ${name}: ${name}ClassKey;`)
    .join("\n");

  // --- Components (theme.components augmentation) ---
  const themedLines = components
    .map(({ name }) => `    ${name}?: ThemedComponent<'${name}'>;`)
    .join("\n");

  return {
    imports: importLines,
    props: propsLines,
    classKeys: classKeyLines,
    components: themedLines,
  };
}

// Replace a block between START and END
function replaceBlock(content: string, name: string, replacement: string): string {
  const regex = blockRegex(name);
  if (!regex.test(content)) {
    console.warn(`⚠️ Could not find AUTO-GENERATED block named "${name}" in augmentation file.`);
    return content;
  }
  return content.replace(regex, `$1\n${replacement}\n$3`);
}

// Main generator
function run(): void {
  console.log("🔍 Scanning component index files in:", COMPONENTS_DIR);

  const indexFiles = getAllIndexFiles(COMPONENTS_DIR);
  const components: { name: string; importPath: string }[] = [];
  const seenKey = new Set<string>();

  for (const file of indexFiles) {
    const content = fs.readFileSync(file, "utf8");

    // Derive component names purely from exported *Props* types
    const names = extractComponentNamesViaProps(content);
    if (names.length === 0) continue;

    const relativeFolder = path
      .relative(path.join(process.cwd(), "src"), path.dirname(file))
      .replace(/\\/g, "/");

    const importPath = `@/${relativeFolder}`;

    for (const name of names) {
      const key = `${importPath}::${name}`;
      if (seenKey.has(key)) continue;
      seenKey.add(key);

      components.push({ name, importPath });
    }
  }

  if (!fs.existsSync(AUGMENTATION_FILE)) {
    console.error(`❌ File not found: ${AUGMENTATION_FILE}`);
    return;
  }

  if (components.length === 0) {
    console.warn("⚠️ No components with exported *Props types found in index.ts files.");
  }

  const original = fs.readFileSync(AUGMENTATION_FILE, "utf8");
  const blocks = generateBlocks(components);

  let updated = original;
  updated = replaceBlock(updated, "Component IMPORTS", blocks.imports);
  updated = replaceBlock(updated, "ComponentsProps", blocks.props);
  updated = replaceBlock(updated, "ComponentNameToClassKey", blocks.classKeys);
  updated = replaceBlock(updated, "Components", blocks.components);

  fs.writeFileSync(AUGMENTATION_FILE, updated, "utf8");

  console.log(`✅ Updated ${AUGMENTATION_FILE} with ${components.length} components.`);
}

run();
