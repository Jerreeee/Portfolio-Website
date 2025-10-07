// ----------------------------------------------------
// Generates index.ts files for folders containing *Cmp.tsx components
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
    /styled\s*\([^,]+,\s*\{\s*[^}]*slot\s*:\s*['"]([^'"]+)['"][^}]*\}\)/g;
  const slots: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    slots.push(match[1]);
  }
  return [...new Set(slots)];
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
}

// Generate index.ts for a folder with multiple *Cmp files
function generateIndex(folderPath: string, componentsData: ComponentMeta[]): void {
  const outputPath = path.join(folderPath, "index.ts");
  const lines: string[] = ["// ⚙️ Auto-generated file — do not edit manually\n"];

  const anyWithSlots = componentsData.some((c) => c.slots.length > 0);
  if (anyWithSlots) {
    lines.push(`import { createUtilityClasses } from '@/utils/createUtilityClasses';\n`);
  }

  for (const { name, slots, hasProps, hasSettings } of componentsData) {
    const camelName = firstLetterToLower(name);

    lines.push(`export { default as ${name} } from './${name}';`);
    if (hasProps) lines.push(`export type { ${name}Props } from './${name}';`);
    if (hasSettings) lines.push(`export type { ${name}Settings } from './${name}';`);

    if (slots.length > 0) {
      const slotList = slots.map((s) => `'${firstLetterToLower(s)}'`).join(",\n  ");
      lines.push(`
export const ${camelName} = createUtilityClasses('${name}', [
  ${slotList},
] as const);

export type ${name}ClassKey = typeof ${camelName}.slots[number];
export type ${name}Classes = typeof ${camelName}.classes;
`);
    }

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
  for (const [folderPath, files] of Object.entries(folders)) {
    const folderName = path.relative(BASE_DIR, folderPath);
    console.log(`\n📁 Folder: ${folderName}`);

    const componentsData: ComponentMeta[] = [];
    for (const file of files) {
      const componentName = path.basename(file, ".tsx");
      const content = fs.readFileSync(file, "utf8");
      const slots = extractSlots(content);
      const { hasProps, hasSettings } = findExportedTypes(content, componentName);
      componentsData.push({ name: componentName, slots, hasProps, hasSettings });

      // Log nicely
      console.log(`    ✅ Processed "${componentName}"`);
      console.log(
        `       ${slots.length ? "✅" : "⚠️"} slots: ${
          slots.length ? slots.map(firstLetterToLower).join(", ") : "not found"
        }`
      );
      console.log(
        `       ${hasProps ? "✅" : "⚠️"} props type: ${
          hasProps
            ? `${componentName}Props`
            : `${componentName}Props (expected but not found)`
        }`
      );
      console.log(
        `       ${hasSettings ? "✅" : "⚠️"} settings type: ${
          hasSettings
            ? `${componentName}Settings`
            : `${componentName}Settings (expected but not found)`
        }`
      );
    }

    generateIndex(folderPath, componentsData);
    total += files.length;
  }

  console.log("\n✨ Done!");
  console.log(`📦 Total components processed: ${total}`);
}

run();
