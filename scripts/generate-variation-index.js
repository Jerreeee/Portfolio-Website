import { readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const basePath = 'src/Themes/Default/Variations';
for (const variation of readdirSync(basePath)) {
  const dir = join(basePath, variation);
  const files = readdirSync(dir).filter(f => f.endsWith('.css') && f !== 'index.css');
  const imports = files.map(f => `@import './${f}';`).join('\n');
  writeFileSync(join(dir, 'index.css'), imports);
}
