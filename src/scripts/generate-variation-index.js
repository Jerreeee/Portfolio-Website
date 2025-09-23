import { readdirSync, writeFileSync, statSync, existsSync } from 'fs';
import { join } from 'path';

const themesRoot = 'src/Themes';

console.log('🔄 Generating index.css for all theme variations...');

for (const baseTheme of readdirSync(themesRoot)) {
  const basePath = join(themesRoot, baseTheme);
  if (!statSync(basePath).isDirectory()) continue;

  const variationsPath = join(basePath, 'Variations');

  if (!existsSync(variationsPath) || !statSync(variationsPath).isDirectory()) {
    console.log(`⚠️  ${baseTheme} has no Variations folder — skipped`);
    continue;
  }

  for (const variation of readdirSync(variationsPath)) {
    const variationDir = join(variationsPath, variation);
    if (!statSync(variationDir).isDirectory()) continue;

    const cssFiles = readdirSync(variationDir)
      .filter(f => f.endsWith('.css') && f !== 'index.css');

    const imports = cssFiles.map(f => `@import './${f}';`).join('\n');
    writeFileSync(join(variationDir, 'index.css'), imports);

    console.log(`✅ ${baseTheme}/${variation} -> ${cssFiles.length} file(s)`);
  }
}

console.log('✨ All variation index.css files generated.');
