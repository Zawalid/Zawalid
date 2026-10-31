import { C, svg } from './lib.mjs';
const L = [['01 UI', 'React / Next.js', '#ffe3a1', '#ffb86b', '#e09a52', '#f2a35c'], ['02 API', 'Node / Django', '#9a8cff', '#6f5cf0', '#5845d8', '#6a57e8'], ['03 AI', 'LLM / RAG / MCP', '#7ef3c9', '#3fd2a8', '#2fb08c', '#38c49c'], ['04 DATA', 'Postgres / Redis', '#6f98ff', '#3d6ff0', '#2a52c9', '#3562e0'], ['05 INFRA', 'Docker / CI/CD', '#4a4590', '#2b2766', '#1d1a4a', '#262260']];
const cx = 646, w = 80, h = 39, t = 10, sp = 31, cy0 = 70;
let defs = '<radialGradient id="g1" cx="78%" cy="40%" r="50%"><stop offset="0" stop-color="#3a2d8f" stop-opacity=".9"/><stop offset="1" stop-color="#3a2d8f" stop-opacity="0"/></radialGradient><radialGradient id="g2" cx="15%" cy="115%" r="45%"><stop offset="0" stop-color="#0d6b6f" stop-opacity=".5"/><stop offset="1" stop-color="#0d6b6f" stop-opacity="0"/></radialGradient><linearGradient id="tx" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7ef3c9"/><stop offset="1" stop-color="#8fb4ff"/></linearGradient>';
L.forEach((l, i) => { defs += `<linearGradient id="l${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${l[2]}"/><stop offset="1" stop-color="${l[3]}"/></linearGradient>`; });
let layers = '';
for (let i = L.length - 1; i >= 0; i--) {
  const l = L[i], cy = cy0 + i * sp;
  layers += `<g class="lay" style="animation-delay:${(i * 0.28).toFixed(2)}s"><polygon points="${cx - w},${cy} ${cx},${cy + h} ${cx},${cy + h + t} ${cx - w},${cy + t}" fill="${l[4]}"/><polygon points="${cx},${cy + h} ${cx + w},${cy} ${cx + w},${cy + t} ${cx},${cy + h + t}" fill="${l[5]}"/><polygon points="${cx},${cy - h} ${cx + w},${cy} ${cx},${cy + h} ${cx - w},${cy}" fill="url(#l${i})" stroke="#ffffff66" stroke-width="1"/></g>`;
  layers += `<path d="M${cx + w + 4} ${cy + 4}H${cx + w + 24}" stroke="#ffffff55"/><text x="${cx + w + 30}" y="${cy + 3}" class="m lb">${l[0]}</text><text x="${cx + w + 30}" y="${cy + 15}" class="m ls">${l[1]}</text>`;
}
const chips = ['TYPESCRIPT', 'NEXT.JS', 'PYTHON', 'LLM · RAG', 'DOCKER'];
let x = 40, chipSvg = '';
for (const c of chips) { const wd = c.length * 7.4 + 22; chipSvg += `<rect x="${x}" y="226" width="${wd}" height="26" rx="13" stroke="#ffffff33"/><text x="${x + 11}" y="243" class="m chip">${c}</text>`; x += wd + 7; }
const phrases = ['building web platforms', 'shipping AI features', 'running them in production'];
const cyc = phrases.map((p, i) => `<text x="64" y="204" class="m ph p${i}">${p}</text>`).join('');
const css = `
.lb{font-size:10px;letter-spacing:.2em;font-weight:500}.ls{font-size:9.5px;fill:${C.dim}}.chip{font-size:10.5px;letter-spacing:.12em;font-weight:500}
.k{font-size:11px;letter-spacing:.3em;fill:${C.mint};font-weight:500}.h{font-size:44px;font-weight:700;letter-spacing:-1px}
.ph{font-size:14px;fill:${C.mint};opacity:0;font-weight:500}.p0{animation:ph 9s infinite 0s}.p1{animation:ph 9s infinite 3s}.p2{animation:ph 9s infinite 6s}
@keyframes ph{0%{opacity:0;transform:translateY(5px)}6%{opacity:1;transform:none}30%{opacity:1;transform:none}36%{opacity:0;transform:translateY(-5px)}100%{opacity:0}}
.p0{opacity:1}.lay{animation:lift 5s ease-in-out infinite}
@keyframes lift{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
.glow{animation:pulse 6s ease-in-out infinite}@keyframes pulse{0%,100%{opacity:.75}50%{opacity:1}}
.cur{animation:blink 1s steps(1) infinite}@keyframes blink{50%{opacity:0}}`;
const body = `<defs>${defs}<clipPath id="cp"><rect width="888" height="300" rx="16"/></clipPath></defs>
<g clip-path="url(#cp)"><rect width="888" height="300" fill="${C.bg}"/><rect class="glow" width="888" height="300" fill="url(#g1)"/><rect width="888" height="300" fill="url(#g2)"/>
<text x="40" y="52" class="k m">WALID ZAKAN · RABAT, MOROCCO</text>
<text x="38" y="112" class="h">Full stack &amp; DevOps</text><text x="38" y="160" class="h" fill="url(#tx)" style="fill:url(#tx)">developer.</text>
<text x="40" y="204" class="m" style="font-size:14px;fill:${C.mint}">&gt;</text>${cyc}
${chipSvg}${layers}</g><rect x=".5" y=".5" width="887" height="299" rx="15.5" stroke="#ffffff1a"/>`;
export default svg(888, 300, body, css);
