import fs from "fs";
import path from "path";

const COMPONENTS_DIR = path.join(process.cwd(), "src", "Themes", "Default", "Components");
const AUGMENTATION_FILE = path.join(process.cwd(), "src", "types", "overrides", "mui-theme-augmentation.d.ts");

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

// Extract component exports
function extractComponentData(fileContent: string): { props: string[]; classKeys: string[] } {
  const props: string[] = [];
  const classKeys: string[] = [];

  // --- Match any "export type { ... } from '...'" block ---
  const exportBlockRegex = /export\s+type\s+\{([^}]+)\}\s+from\s+['"].*?['"]/g;
  let match: RegExpExecArray | null;

  while ((match = exportBlockRegex.exec(fileContent)) !== null) {
    const names = match[1]
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean);

    for (const n of names) {
      if (n.endsWith("Props")) props.push(n);
    }
  }

  // --- Match any "export type SomethingClassKey" declared in the file ---
  const classKeyDeclRegex = /export\s+type\s+([A-Za-z0-9_]+ClassKey)\b/g;
  while ((match = classKeyDeclRegex.exec(fileContent)) !== null) {
    classKeys.push(match[1]);
  }

  return { props, classKeys };
}

// Generate all block contents
function generateBlocks(components: { name: string; importPath: string }[]) {
  // --- IMPORTS ---
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

  // --- Components ---
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
  return content.replace(regex, `$1\n${replacement}\n$3`);
}

// Main generator
function run(): void {
  console.log("🔍 Scanning component index files in:", COMPONENTS_DIR);

  const indexFiles = getAllIndexFiles(COMPONENTS_DIR);
  const components: { name: string; importPath: string }[] = [];

  for (const file of indexFiles) {
    const content = fs.readFileSync(file, "utf8");
    const { props, classKeys } = extractComponentData(content);

    if (props.length === 0 || classKeys.length === 0) continue;

    for (const propName of props) {
      const componentName = propName.replace(/Props$/, "");
      const relativeFolder = path
        .relative(path.join(process.cwd(), "src"), path.dirname(file))
        .replace(/\\/g, "/");

      const importPath = `@/${relativeFolder}`;
      components.push({ name: componentName, importPath });
    }
  }

  if (!fs.existsSync(AUGMENTATION_FILE)) {
    console.error(`❌ File not found: ${AUGMENTATION_FILE}`);
    return;
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
