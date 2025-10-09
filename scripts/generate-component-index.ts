// ----------------------------------------------------
// Generates index.ts files for folders containing *Cmp.tsx components
// AND validates that every styled({ name }) matches the component filename
// ----------------------------------------------------

import fs from "fs";
import path from "path";

const BASE_DIR = path.join(process.cwd(), "src", "Themes", "Default", "Components");

// Helpers
const firstLetterToLower = (str: string): string =>
  str.charAt(0).toLowerCase() + str.slice(1);

// Recursively collect all .tsx files
function getAllTsxFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllTsxFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
      files.push(fullPath);
    }
  }

  return files;
}

// Extract slots from styled() definitions
function extractSlots(content: string): string[] {
  const regex =
    /styled\s*\([\s\S]*?\{\s*[\s\S]*?slot\s*:\s*['"]([^'"]+)['"][\s\S]*?\}\)/g;
  const slots: string[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    slots.push(match[1]);
  }
  return [...new Set(slots)];
}

// NEW: Extract all `name` values from styled() option objects
function extractStyledNames(content: string): string[] {
  // Matches: styled( something, { ... name: 'Foo', ... } )
  const regex =
    /styled\s*\([\s\S]*?\{\s*[\s\S]*?name\s*:\s*['"]([^'"]+)['"][\s\S]*?\}\)/g;
  const names: string[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    names.push(match[1]);
  }
  return [...new Set(names)];
}

// Detect Props and Settings exports
function findExportedTypes(
  content: string,
  componentName: string
): { hasProps: boolean; hasSettings: boolean } {
  const propsRegex = new RegExp(
    `export\\s+(?:interface|type)\\s+${componentName}Props\\b`
  );
  const settingsRegex = new RegExp(
    `export\\s+(?:interface|type)\\s+${componentName}Settings\\b`
  );
  return {
    hasProps: propsRegex.test(content),
    hasSettings: settingsRegex.test(content),
  };
}

// Component metadata type
interface ComponentMeta {
  name: string;
  slots: string[];
  hasProps: boolean;
  hasSettings: boolean;
  styledNames: string[];
}

// Generate index.ts for a folder with one or more *Cmp files
function generateIndex(folderPath: string, componentsData: ComponentMeta[]): void {
  const outputPath = path.join(folderPath, "index.ts");
  const lines: string[] = ["// ⚙️ Auto-generated file — do not edit manually\n"];

  // Always import utility generator
  lines.push(`import { createUtilityClasses } from '@/utils/createUtilityClasses';\n`);

  for (const { name, slots, hasProps, hasSettings } of componentsData) {
    const camelName = firstLetterToLower(name);

    // --- Combine component + type re-exports ---
    lines.push(`export { default as ${name} } from './${name}';`);

    const typeExports: string[] = [];
    if (hasProps) typeExports.push(`${name}Props`);
    if (hasSettings) typeExports.push(`${name}Settings`);

    if (typeExports.length > 0) {
      lines.push(`export type { ${typeExports.join(", ")} } from './${name}';`);
    }

    // --- Always add slots + class types (even if empty) ---
    const slotList = slots.length
      ? slots.map((s) => `'${firstLetterToLower(s)}'`).join(",\n  ")
      : "";

    lines.push(`
export const ${camelName} = createUtilityClasses('${name}', [
  ${slotList}
] as const);

export type ${name}ClassKey = typeof ${camelName}.slots[number];
export type ${name}Classes = typeof ${camelName}.classes;
`);

    lines.push(""); // spacing between components
  }

  fs.writeFileSync(outputPath, lines.join("\n"), "utf8");
}

// Main
function run(): void {
  console.log("🔍 Scanning components in:", BASE_DIR);
  const allFiles = getAllTsxFiles(BASE_DIR);
  const cmpFiles = allFiles.filter((f) => path.basename(f).endsWith("Cmp.tsx"));

  if (cmpFiles.length === 0) {
    console.log("⚠️ No *Cmp.tsx files found.");
    return;
  }

  // Group by folder
  const folders: Record<string, string[]> = {};
  for (const file of cmpFiles) {
    const folder = path.dirname(file);
    if (!folders[folder]) folders[folder] = [];
    folders[folder].push(file);
  }

  let total = 0;
  const mismatches: Array<{
    file: string;
    expected: string;
    found: string[];
  }> = [];

  for (const [folderPath, files] of Object.entries(folders)) {
    const folderName = path.relative(BASE_DIR, folderPath);
    console.log(`\n📁 Folder: ${folderName}`);

    const componentsData: ComponentMeta[] = [];
    for (const file of files) {
      const componentName = path.basename(file, ".tsx"); // e.g. MediaGalleryCmp
      const content = fs.readFileSync(file, "utf8");

      const slots = extractSlots(content);
      const styledNames = extractStyledNames(content);   // e.g. ['MediaGallery', 'MediaGallery']
      const { hasProps, hasSettings } = findExportedTypes(content, componentName);

      // Validate: every styled({ name }) must equal the filename/base component name
      const invalid = styledNames.filter((n) => n !== componentName);
      if (styledNames.length > 0 && invalid.length > 0) {
        mismatches.push({
          file: path.relative(process.cwd(), file),
          expected: componentName,
          found: [...new Set(styledNames)],
        });
      } else if (styledNames.length === 0) {
        // Optional: warn when no `name` was found at all
        console.log(`    ⚠️  No styled({ name: ... }) found in "${componentName}"`);
      }

      componentsData.push({ name: componentName, slots, hasProps, hasSettings, styledNames });

      // Log details
      console.log(`    ✅ Processed "${componentName}"`);
      console.log(
        `       ${slots.length ? "✅" : "⚠️"} slots: ${
          slots.length ? slots.map(firstLetterToLower).join(", ") : "none"
        }`
      );
      console.log(
        `       ${hasProps ? "✅" : "⚠️"} props type: ${
          hasProps ? `${componentName}Props` : "not found"
        }`
      );
      console.log(
        `       ${hasSettings ? "✅" : "⚠️"} settings type: ${
          hasSettings ? `${componentName}Settings` : "not found"
        }`
      );
      if (styledNames.length) {
        console.log(`       🔎 styled({ name }): ${styledNames.join(", ")}`);
      }
    }

    // If any mismatches for this folder, do NOT generate index for it
    generateIndex(folderPath, componentsData);
    total += files.length;
  }

  // After scanning everything, fail fast if mismatches found
  if (mismatches.length > 0) {
    console.error("\n❌ MUI `styled({ name })` mismatches detected:");
    for (const m of mismatches) {
      console.error(
        `   • ${m.file}\n` +
        `     expected name: "${m.expected}"\n` +
        `     found name(s): ${m.found.map((x) => `"${x}"`).join(", ")}\n` +
        `     ➜ Fix: update styled(..., { name: '${m.expected}', slot: '...' })`
      );
    }
    console.error("\n💡 Tip: The styled `name` must EXACTLY match the component filename (e.g. MediaGalleryCmp.tsx → name: 'MediaGalleryCmp').");
    process.exit(1);
  }

  console.log("\n✨ Done!");
  console.log(`📦 Total components processed: ${total}`);
}

run();
