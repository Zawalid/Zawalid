import { C, svg } from './lib.mjs';
// ---- pipeline
const steps = [['01', 'MODEL', 'Schemas first', 'PostgreSQL, MySQL', C.amber], ['02', 'BUILD', 'API and interface', 'TypeScript, Python', C.violet], ['03', 'TEST', 'Gate every change', 'Vitest, Jest, pytest', C.mint], ['04', 'SHIP', 'Pipelines, images', 'GitHub Actions, Docker', C.blue], ['05', 'RUN', 'Watch it live', 'Prometheus, Grafana', '#c3bde6']];
let p = '';
steps.forEach((s, i) => {
  const x = 30 + i * 168;
  p += `<rect x="${x}" y="56" width="150" height="116" rx="14" fill="${C.panel}" stroke="#ffffff1f"/><circle cx="${x + 28}" cy="86" r="14" fill="${s[4]}"/><text x="${x + 28}" y="90.5" text-anchor="middle" class="m n">${s[0]}</text>
<text x="${x + 52}" y="91" class="t">${s[1]}</text><text x="${x + 16}" y="124" class="d">${s[2]}</text><text x="${x + 16}" y="148" class="m s">${s[3]}</text>`;
  if (i < 4) p += `<path d="M${x + 152} 114H${x + 166}" stroke="${C.dim}" stroke-width="2" stroke-dasharray="4 4" class="flow"/><path d="M${x + 162} 109l6 5-6 5" stroke="${C.dim}" stroke-width="2"/>`;
});
export const pipeline = svg(888, 200, `<rect width="888" height="200" rx="16" fill="${C.bg}"/><text x="30" y="34" class="m k">HOW A FEATURE SHIPS</text>${p}`, `.k{font-size:11px;letter-spacing:.3em;fill:${C.mint}}.t{font-size:15px;font-weight:700;letter-spacing:.06em}.d{font-size:13px;font-weight:500;fill:${C.ink}}.s{font-size:9.5px;fill:${C.dim}}.n{font-size:10px;font-weight:500;fill:#12102b}.flow{animation:fl 1.2s linear infinite}@keyframes fl{to{stroke-dashoffset:-16}}`);
// ---- timeline
const ev = [['SEP 2022', 'ISTA Hay Salam', 'Digital Development, OFPPT', C.amber], ['APR 2024', 'Ministry of Education', 'GestHub interface, internship', C.violet], ['SEP 2024', 'EST Fès', 'Licence in Software Engineering', C.blue], ['JUL 2025', 'TekCircle', 'Full stack, AI and DevOps', C.mint], ['SEP 2025', 'Mohammed V University', 'Master, AI and Digital Innovation', C.violet], ['FEB 2026', 'FormaTeX and Finareo', 'Co-founder, plus audit platform', C.amber], ['OCT 2026', 'Lopper and Apropos', 'Two macOS apps, open source', C.mint]];
let t = `<path d="M40 120H848" stroke="#ffffff33" stroke-width="2"/>`;
const step = 808 / (ev.length - 1);
ev.forEach((e, i) => {
  const x = 40 + i * step, up = i % 2 === 0; const an = i === 0 ? 'start' : i === ev.length - 1 ? 'end' : 'middle'; const tx = i === 0 ? 24 : i === ev.length - 1 ? 864 : x;
  t += `<line x1="${x}" y1="120" x2="${x}" y2="${up ? 96 : 144}" stroke="${e[3]}" stroke-width="1.5"/><circle cx="${x}" cy="120" r="7" fill="${e[3]}"/><circle cx="${x}" cy="120" r="12" stroke="${e[3]}" stroke-opacity=".35"/>
<text x="${tx}" y="${up ? 38 : 176}" text-anchor="${an}" class="m dt" style="fill:${e[3]}">${e[0]}</text>
<text x="${tx}" y="${up ? 58 : 196}" text-anchor="${an}" class="nm">${e[1]}</text><text x="${tx}" y="${up ? 74 : 212}" text-anchor="${an}" class="m ds">${e[2]}</text>`;
});
export const timeline = svg(888, 240, `<rect width="888" height="240" rx="16" fill="${C.bg}"/>${t.replace(/y="(\d+)"( text-anchor)/g, 'y="$1"$2')}`, `.dt{font-size:10px;letter-spacing:.2em;font-weight:500}.nm{font-size:13px;font-weight:700}.ds{font-size:9px;fill:${C.dim}}`);
// ---- stack board
const cols = [['FRONT', C.amber, ['TypeScript', 'React / Next.js', 'Tailwind CSS', 'React Native']], ['BACK', C.violet, ['Node / Express', 'Python / Django', 'REST APIs', 'Auth: JWT, OAuth']], ['AI', C.mint, ['LLM APIs', 'RAG, embeddings', 'MCP servers', 'Evals, guardrails']], ['DATA', C.blue, ['PostgreSQL', 'MySQL, Redis', 'Qdrant', 'Prisma, Drizzle']], ['OPS', '#c3bde6', ['Docker', 'GitHub Actions', 'Linux servers', 'Prometheus, Grafana']]];
let sb = '';
cols.forEach((c, i) => { const x = 30 + i * 170; sb += `<text x="${x}" y="52" class="m hd" style="fill:${c[1]}">${c[0]}</text>`; c[2].forEach((it, j) => { sb += `<circle cx="${x + 4}" cy="${82 + j * 30 - 4}" r="3.5" fill="${c[1]}"/><text x="${x + 16}" y="${82 + j * 30}" class="it">${it}</text>`; }); });
export const stack = svg(888, 190, `<defs><radialGradient id="gg" cx="75%" cy="40%" r="55%"><stop offset="0" stop-color="#3a2d8f" stop-opacity=".8"/><stop offset="1" stop-color="#3a2d8f" stop-opacity="0"/></radialGradient></defs><rect width="888" height="190" rx="16" fill="${C.bg}"/><rect width="888" height="190" rx="16" fill="url(#gg)"/>${sb}`, `.hd{font-size:11px;letter-spacing:.3em;font-weight:500}.it{font-size:14px;font-weight:500}`);
