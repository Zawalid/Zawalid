import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url)); const out = path.join(here, '..', 'assets'); mkdirSync(out, { recursive: true });
const mode = process.argv[2] || 'all';
if (mode === 'all' || mode === 'static') {
  const s = await import('./static.mjs');
  writeFileSync(path.join(out, 'masthead.svg'), s.masthead); writeFileSync(path.join(out, 'stack.svg'), s.stack); writeFileSync(path.join(out, 'pipeline.svg'), s.pipeline); writeFileSync(path.join(out, 'path.svg'), s.journey);
  for (const [name, content] of s.work) writeFileSync(path.join(out, `work-${name}.svg`), content);
}
if (mode === 'all' || mode === 'live') {
  const l = await import('./live.mjs'); const data = await l.collect();
  writeFileSync(path.join(out, 'numbers.svg'), l.numbers(data)); writeFileSync(path.join(out, 'heatmap.svg'), l.heatmap(data)); writeFileSync(path.join(out, 'languages.svg'), l.languages(data));
}
console.log('built', mode);
