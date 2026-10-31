import { C, svg, fmt } from './lib.mjs';
const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
const login = process.env.GH_LOGIN || 'Zawalid';
async function gql(query) {
  const r = await fetch('https://api.github.com/graphql', { method: 'POST', headers: { Authorization: `bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ query }) });
  const j = await r.json(); if (j.errors) throw new Error(JSON.stringify(j.errors)); return j.data;
}
async function rest(p) { const r = await fetch('https://api.github.com' + p, { headers: { Authorization: `bearer ${token}`, Accept: 'application/vnd.github+json' } }); return r.json(); }
export async function collect() {
  const d = (await gql(`query{user(login:"${login}"){createdAt repositories(ownerAffiliations:OWNER,isFork:false,privacy:PUBLIC){totalCount} contributionsCollection{totalCommitContributions contributionCalendar{totalContributions weeks{contributionDays{contributionCount date}}}}}}`)).user;
  const repos = (await rest(`/users/${login}/repos?per_page=100&type=owner`)).filter(r => !r.fork);
  const bytes = {};
  for (const r of repos) { const l = await rest(`/repos/${login}/${r.name}/languages`); for (const [k, v] of Object.entries(l)) bytes[k] = (bytes[k] || 0) + v; }
  return { d, bytes };
}
// ---- stats
export function stats({ d }) {
  const years = new Date().getFullYear() - new Date(d.createdAt).getFullYear();
  const row1 = [[fmt(d.contributionsCollection.contributionCalendar.totalContributions), 'contributions, last year'], [fmt(d.contributionsCollection.totalCommitContributions), 'public commits, last year'], [String(d.repositories.totalCount), 'public repositories'], [years + ' years', 'on GitHub']];
  const row2 = [['5', 'products in production'], ['1,200+', 'FormaTeX users'], ['400+', 'TekCircle API routes'], ['200+', 'Finareo audit rules']];
  const tile = (x, y, v, c, accent) => `<rect x="${x}" y="${y}" width="200" height="86" rx="14" fill="${C.panel}" stroke="#ffffff1f"/><rect x="${x}" y="${y}" width="4" height="86" rx="2" fill="${accent}"/><text x="${x + 22}" y="${y + 46}" class="v" style="fill:url(#tx)">${v}</text><text x="${x + 22}" y="${y + 68}" class="m c">${c}</text>`;
  let b = `<defs><linearGradient id="tx" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7ef3c9"/><stop offset="1" stop-color="#8fb4ff"/></linearGradient></defs><text x="4" y="14" class="m k">ON GITHUB, LIVE</text>`;
  row1.forEach((r, i) => { b += tile(4 + i * 228, 26, r[0], r[1], [C.mint, C.blue, C.violet, C.amber][i]); });
  b += `<text x="4" y="148" class="m k">IN PRODUCTION</text>`;
  row2.forEach((r, i) => { b += tile(4 + i * 228, 160, r[0], r[1], [C.amber, C.mint, C.blue, C.violet][i]); });
  return svg(888, 262, b, `.k{font-size:11px;letter-spacing:.3em;fill:${C.mint}}.v{font-size:34px;font-weight:700}.c{font-size:10.5px;fill:${C.dim};letter-spacing:.04em}`);
}
// ---- heatmap
export function heatmap({ d }) {
  const weeks = d.contributionsCollection.contributionCalendar.weeks, total = d.contributionsCollection.contributionCalendar.totalContributions;
  const max = Math.max(...weeks.flatMap(w => w.contributionDays.map(x => x.contributionCount)));
  const col = n => n === 0 ? '#1e1b4b' : n < max * .2 ? '#3730a3' : n < max * .45 ? '#6d5ff0' : n < max * .7 ? '#8fb4ff' : '#7ef3c9';
  let cells = '', months = '', last = -1;
  weeks.forEach((w, i) => {
    w.contributionDays.forEach((x, j) => { cells += `<rect x="${20 + i * 16.1}" y="${58 + j * 16}" width="13" height="13" rx="3" fill="${col(x.contributionCount)}"/>`; });
    const m = new Date(w.contributionDays[0].date).getMonth();
    if (m !== last && i < 50 && i >= 2) { months += `<text x="${20 + i * 16.1}" y="50" class="m mo">${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][m]}</text>`; last = m; }
  });
  const legend = ['#1e1b4b', '#3730a3', '#6d5ff0', '#8fb4ff', '#7ef3c9'].map((c, i) => `<rect x="${742 + i * 18}" y="182" width="13" height="13" rx="3" fill="${c}"/>`).join('');
  return svg(888, 214, `<rect width="888" height="214" rx="16" fill="${C.bg}"/><text x="20" y="30" class="m k">ACTIVITY</text><text x="868" y="30" text-anchor="end" class="t">${fmt(total)} contributions in the last year</text>${months}${cells}<text x="20" y="194" class="m mo">Private work included</text><text x="716" y="193" text-anchor="end" class="m mo">less</text>${legend}<text x="836" y="193" class="m mo">more</text>`, `.k{font-size:11px;letter-spacing:.3em;fill:${C.mint}}.t{font-size:14px;font-weight:700}.mo{font-size:10px;fill:${C.dim}}`);
}
// ---- languages
export function languages({ bytes }) {
  const tot = Object.values(bytes).reduce((a, b) => a + b, 0);
  const list = Object.entries(bytes).sort((a, b) => b[1] - a[1]);
  const top = list.slice(0, 6), other = list.slice(6).reduce((a, b) => a + b[1], 0);
  const items = [...top, ...(other ? [['Other', other]] : [])];
  const cols = [C.amber, C.violet, C.mint, C.blue, '#ff8fb1', '#c3bde6', '#6b6794'];
  let x = 20, bar = '', leg = '';
  items.forEach(([n, v], i) => { const w = Math.max(4, v / tot * 848); bar += `<rect x="${x}" y="52" width="${w - 2}" height="14" rx="4" fill="${cols[i]}"/>`; x += w; const lx = 20 + (i % 4) * 212, ly = 98 + Math.floor(i / 4) * 26; leg += `<circle cx="${lx + 5}" cy="${ly - 4}" r="5" fill="${cols[i]}"/><text x="${lx + 18}" y="${ly}" class="l">${n}</text><text x="${lx + 195}" y="${ly}" text-anchor="end" class="m p">${(v / tot * 100).toFixed(1)}%</text>`; });
  return svg(888, 160, `<rect width="888" height="160" rx="16" fill="${C.bg}"/><text x="20" y="30" class="m k">LANGUAGES, BY CODE WRITTEN</text>${bar}${leg}`, `.k{font-size:11px;letter-spacing:.3em;fill:${C.mint}}.l{font-size:13px;font-weight:500}.p{font-size:11px;fill:${C.dim}}`);
}
