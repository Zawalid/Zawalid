import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { svg, t, ic, line, W } from './lib.mjs';
const here = path.dirname(fileURLToPath(import.meta.url));
const b64 = f => readFileSync(path.join(here, f)).toString('base64');
// ---------- masthead
export const masthead = svg(290, 'Walid Zakan, full stack and DevOps developer, Rabat, Morocco', `
${t(0, 28, 'RABAT, MOROCCO &#183; 34.02&#176;N 6.84&#176;W', 'jb faint', 11, 'letter-spacing:.1em')}
${line(0, 44, W, 44)}
<text x="-4" y="140" class="is ink" style="font-size:104px;letter-spacing:-2.5px">Walid <tspan class="isi">Zakan</tspan></text>
${t(0, 186, 'Full stack and DevOps developer.', 'in ink', 24, 'font-weight:500;letter-spacing:-.3px')}
${t(0, 214, 'Web platforms, AI features, and the infrastructure under them.', 'in mute', 16)}<rect class="acc cur" x="480" y="201" width="8" height="16"/>
${line(0, 236, W, 236)}
${[['FOCUS', 'Web platforms, AI, infrastructure'], ['STACK', 'TypeScript, Python, Docker'], ['NOW', 'Rimline, Lopper and Apropos'], ['SITE', 'zawalid.com']].map((c, i) => t(i * 222, 256, c[0], 'jb faint', 10, 'letter-spacing:.12em') + t(i * 222, 276, c[1], 'in ink', 13.5)).join('')}
`, '.cur{animation:blink 1.1s steps(1) infinite}@keyframes blink{50%{opacity:0}}', ['IS', 'ISI', 'IN', 'JB']);
// ---------- work rows
const rows = [
  { n: '01', name: 'Rimline', tag: 'Trackpad edges as controls for the Mac', d: ['Slide the edges for volume and brightness, tap the corners,', 'snap windows. Native, local-only, no account.'], ics: ['swift', 'apple'], meta: 'V1.0 &#183; WAITLIST OPEN', img: 'rimline.jpg' },
  { n: '02', name: 'Apropos', tag: 'A command palette for the Mac', d: ['Every menu command of the app in front, one hotkey away.', 'Native, local-first and keyboard first.'], ics: ['swift', 'apple'], meta: 'OPEN SOURCE &#183; EARLY', img: 'apropos.jpg' },
  { n: '03', name: 'Lopper', tag: 'Git cleanup for the Mac', d: ['Finds merged branches and leftover agent worktrees,', 'shows why each is safe, and undoes for 30 days.'], ics: ['swift', 'git', 'apple'], meta: 'OPEN SOURCE', img: 'lopper.jpg' },
  { n: '04', name: 'FormaTeX', tag: 'LaTeX to PDF, as an editor and an API', d: ['Browser editor, REST API and MCP server. Smart Compile', 'repairs the LaTeX errors that language models write.'], ics: ['nextdotjs', 'postgresql', 'redis', 'docker', 'modelcontextprotocol'], meta: '1,200+ USERS', img: 'formatex.jpg' },
  { n: '05', name: 'TekCircle', tag: 'B2B IT talent marketplace', d: ['Offer to invoice for freelancers, firms and clients: contracts,', 'activity reports, AI matching and natural-language search.'], ics: ['reactrouter', 'express', 'mysql', 'socketdotio', 'typescript'], meta: 'PRIVATE WORK &#183; 400+ ROUTES', wire: true },
  { n: '06', name: 'Finareo', tag: 'AI-assisted financial audit', d: ['AI anomaly detection (200+ rules), the Nexo CFO copilot,', 'ERP integrations, and market benchmarking with alerts.'], ics: ['django', 'postgresql', 'redis', 'temporal', 'qdrant'], meta: 'PRIVATE WORK &#183; 200+ RULES', wire: true },
];
function wire(x, y, w, h) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" class="tint"/><rect x="${x + .5}" y="${y + .5}" width="${w - 1}" height="${h - 1}" rx="6.5" class="rs"/>
<line x1="${x}" y1="${y + 20}" x2="${x + w}" y2="${y + 20}" class="rl"/><circle cx="${x + 11}" cy="${y + 10}" r="2.5" class="faint"/><circle cx="${x + 20}" cy="${y + 10}" r="2.5" class="faint"/><circle cx="${x + 29}" cy="${y + 10}" r="2.5" class="faint"/>
<line x1="${x + 52}" y1="${y + 20}" x2="${x + 52}" y2="${y + h}" class="rl"/>
${[0, 1, 2, 3].map(i => `<rect x="${x + 10}" y="${y + 32 + i * 16}" width="${i === 0 ? 30 : 24}" height="5" rx="2.5" class="${i === 0 ? 'acc' : 'faint'}"/>`).join('')}
${[0, 1, 2, 3, 4].map(i => `<rect x="${x + 64}" y="${y + 32 + i * 15}" width="${w - 80 - (i % 3) * 22}" height="7" rx="3" class="faint" style="opacity:.55"/>`).join('')}`;
}
export const work = rows.map(r => {
  const id = 'cl' + r.n, ix = 690, iy = 18, iw = 198, ih = 116;
  const thumb = r.wire ? wire(ix, iy, iw, ih) : `<clipPath id="${id}"><rect x="${ix}" y="${iy}" width="${iw}" height="${ih}" rx="7"/></clipPath><image href="data:image/jpeg;base64,${b64(r.img)}" x="${ix}" y="${iy}" width="${iw}" height="${ih}" preserveAspectRatio="xMidYMin slice" clip-path="url(#${id})"/><rect x="${ix + .5}" y="${iy + .5}" width="${iw - 1}" height="${ih - 1}" rx="6.5" class="rs"/>`;
  const icons = r.ics.map((s, i) => ic(s, 44 + i * 26, 118, 15)).join('');
  return [r.name.toLowerCase(), svg(152, `${r.name}: ${r.tag}`, `${r.n === '01' ? '' : line(0, 0.5, W, 0.5)}
${t(0, 44, r.n, 'jb acc', 11, 'letter-spacing:.1em')}
${t(44, 50, r.name, 'is ink', 36, 'letter-spacing:-.8px')}
${t(44, 76, r.tag, 'in ink', 14.5, 'font-weight:500')}
${t(44, 98, r.d[0], 'in mute', 13)}${t(44, 115, r.d[1], 'in mute', 13)}
${ic('', 0, 0, 0)}${r.ics.map((s, i) => ic(s, 44 + i * 26, 128, 14)).join('')}
${t(662, 36, r.meta, 'jb mute', 10, 'letter-spacing:.1em;text-anchor:end')}${thumb}`)];
});
// ---------- stack
const cols = [['FRONT', [['typescript', 'TypeScript'], ['react', 'React'], ['nextdotjs', 'Next.js'], ['tailwindcss', 'Tailwind CSS']]], ['BACK', [['nodedotjs', 'Node.js'], ['express', 'Express'], ['python', 'Python'], ['django', 'Django']]], ['AI', [['anthropic', 'Claude API'], ['mistralai', 'Mistral'], ['langchain', 'LangChain'], ['modelcontextprotocol', 'MCP servers']]], ['DATA', [['postgresql', 'PostgreSQL'], ['mysql', 'MySQL'], ['redis', 'Redis'], ['qdrant', 'Qdrant']]], ['OPS', [['docker', 'Docker'], ['githubactions', 'GitHub Actions'], ['linux', 'Linux'], ['grafana', 'Grafana'], ['sentry', 'Sentry']]]];
export const stack = svg(206, 'Technology stack: front end, back end, AI, data, operations', cols.map((c, i) => { const x = i * 178; return t(x, 14, c[0], 'jb mute', 10.5, 'letter-spacing:.14em') + line(x, 26, x + 148, 26) + c[1].map((it, j) => ic(it[0], x, 44 + j * 31 - 1, 17, 'ink') + t(x + 28, 58 + j * 31 - 1, it[1], 'in ink', 14)).join(''); }).join(''), '', ['IN', 'JB']);
// ---------- pipeline
const steps = [['01', 'Model', 'Schema first', ['postgresql', 'mysql']], ['02', 'Build', 'API and interface', ['typescript', 'python', 'react']], ['03', 'Test', 'Gate every change', ['vitest', 'jest', 'pytest']], ['04', 'Ship', 'Pipelines and images', ['githubactions', 'docker']], ['05', 'Run', 'Watch it live', ['prometheus', 'grafana', 'sentry']]];
export const pipeline = svg(150, 'How a feature ships: model, build, test, ship, run', steps.map((s, i) => { const x = i * 178; return line(x, 0.5, x + 148, 0.5).replace('class="rl"', 'class="rl" style="stroke:var(--ink)"') + t(x, 32, s[0], 'jb acc', 11, 'letter-spacing:.1em') + t(x, 62, s[1], 'is ink', 30, 'letter-spacing:-.5px') + t(x, 84, s[2], 'in mute', 13) + s[3].map((n, j) => ic(n, x + j * 26, 106, 16, 'ink')).join('') + (i < 4 ? `<path d="M${x + 154} 56h14m-4 -4l4 4l-4 4" class="ms"/>` : ''); }).join(''));
// ---------- path
const path_ = [['2022', 'ISTA Hay Salam, Salé', 'Specialized Technician, Digital Development (OFPPT)'], ['2024', 'Ministry of Education, IT department', 'Frontend intern on the GestHub internship platform'], ['2024', 'EST Fès', 'Professional Bachelor, Software Engineering'], ['2025', 'TekCircle', 'Full stack, AI and DevOps, remote contract'], ['2025', 'Mohammed V University', 'Master, Computer Science, Governance and Digital Transformation'], ['2026', 'FormaTeX and Finareo', 'Co-founder, LaTeX-to-PDF service; audit platform developer'], ['2026', 'Lopper and Apropos', 'Two open-source macOS apps in Swift']];
export const journey = svg(path_.length * 46 + 2, 'Path from 2022 to 2026', path_.map((p, i) => { const y = i * 46; return (i ? line(0, y + .5, W, y + .5) : '') + t(0, y + 33, p[0], 'is ink', 30, 'letter-spacing:-.4px') + t(132, y + 29, p[1], 'in ink', 15, 'font-weight:600') + t(132, y + 29, '', 'in mute', 13) + t(438, y + 29, p[2], 'in mute', 13); }).join('') + line(0, path_.length * 46 + .5, W, path_.length * 46 + .5), '', ['IS', 'IN']);
