import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const here = path.dirname(fileURLToPath(import.meta.url));
const fonts = JSON.parse(readFileSync(path.join(here, 'fonts.json'), 'utf8'));
const icons = JSON.parse(readFileSync(path.join(here, 'icons.json'), 'utf8'));
export const W = 888;
// one palette, two themes, switched by the viewer's colour scheme
const light = { ink: '#1c1a16', mute: '#6d685c', faint: '#a29c8d', rule: '#d9d3c4', acc: '#b5420f', l0: '#e9e4d7', l1: '#f1c9b0', l2: '#e69a6e', l3: '#d1642f', l4: '#b5420f', tint: '#1c1a160a' };
const dark = { ink: '#ebe6d8', mute: '#9b9686', faint: '#67635a', rule: '#2d2b24', acc: '#ff7a45', l0: '#1b1a16', l1: '#4a2616', l2: '#86401f', l3: '#c85a2b', l4: '#ff7a45', tint: '#ebe6d80b' };
const vars = t => Object.entries(t).map(([k, v]) => `--${k}:${v}`).join(';');
const FONT = { IS: ['Instrument Serif|normal', 'IS', 'normal'], ISI: ['Instrument Serif|italic', 'IS', 'italic'], IN: ['Inter|normal', 'IN', 'normal'], JB: ['JetBrains Mono|normal', 'JB', 'normal'] };
function fontCss(need) {
  return need.map(n => { const [key, fam, style] = FONT[n]; const f = fonts[key]; const w = f.w.includes(' ') ? f.w : f.w; return `@font-face{font-family:'${fam}';font-style:${style};font-weight:${w};src:url(data:font/woff2;base64,${f.b64}) format('woff2')}`; }).join('');
}
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const fmt = n => n.toLocaleString('en-US');
const BASE = `svg{${vars(light)}}@media (prefers-color-scheme:dark){svg{${vars(dark)}}}
.ink{fill:var(--ink)}.mute{fill:var(--mute)}.faint{fill:var(--faint)}.acc{fill:var(--acc)}.tint{fill:var(--tint)}
.rl{stroke:var(--rule);stroke-width:1}.rs{stroke:var(--rule);stroke-width:1;fill:none}.ms{stroke:var(--mute);stroke-width:1.25;fill:none}
.is{font-family:'IS',Georgia,serif}.isi{font-family:'IS',Georgia,serif;font-style:italic}.in{font-family:'IN',system-ui,sans-serif}.jb{font-family:'JB',ui-monospace,monospace}
.c0{fill:var(--l0)}.c1{fill:var(--l1)}.c2{fill:var(--l2)}.c3{fill:var(--l3)}.c4{fill:var(--l4)}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}`;
export function svg(h, title, body, css = '', need = ['IS', 'IN', 'JB']) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${h}" viewBox="0 0 ${W} ${h}" fill="none" role="img" aria-label="${esc(title)}"><title>${esc(title)}</title><style>${fontCss(need)}${BASE}${css}</style>${body}</svg>`;
}
export const t = (x, y, s, cls, size, extra = '') => `<text x="${x}" y="${y}" class="${cls}" style="font-size:${size}px;${extra}">${s}</text>`;
export const ic = (slug, x, y, size, cls = 'mute') => icons[slug] ? `<path class="${cls}" transform="translate(${x} ${y}) scale(${size / 24})" d="${icons[slug]}"/>` : '';
export const line = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="rl"/>`;
