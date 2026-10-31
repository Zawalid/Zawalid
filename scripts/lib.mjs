import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const here = path.dirname(fileURLToPath(import.meta.url));
const fonts = JSON.parse(readFileSync(path.join(here, 'fonts.json'), 'utf8'));
export const C = { bg: '#12102b', panel: '#181540', line: '#ffffff1f', ink: '#f4f1ff', dim: '#b9b3dd', mint: '#7ef3c9', blue: '#8fb4ff', violet: '#9a8cff', amber: '#ffb86b' };
export function fontCss(need = ['Space Grotesk:500', 'Space Grotesk:700', 'DM Mono:400', 'DM Mono:500']) {
  return fonts.filter(f => need.includes(`${f.family}:${f.weight}`))
    .map(f => `@font-face{font-family:'${f.family === 'Space Grotesk' ? 'SG' : 'DM'}';font-weight:${f.weight};src:url(data:font/woff2;base64,${f.b64}) format('woff2')}`).join('');
}
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const fmt = n => n.toLocaleString('en-US');
export function svg(w, h, body, extraCss = '', fontNeed) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">
<style>${fontCss(fontNeed)}
text{font-family:'SG',system-ui,sans-serif;fill:${C.ink}}
.m{font-family:'DM',ui-monospace,monospace}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}
${extraCss}</style>${body}</svg>`;
}
