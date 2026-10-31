import { svg, t, line, W, fmt } from './lib.mjs';
const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
const login = process.env.GH_LOGIN || 'Zawalid';
async function gql(query) { const r = await fetch('https://api.github.com/graphql', { method: 'POST', headers: { Authorization: `bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ query }) }); const j = await r.json(); if (j.errors) throw new Error(JSON.stringify(j.errors)); return j.data; }
async function rest(p) { const r = await fetch('https://api.github.com' + p, { headers: { Authorization: `bearer ${token}`, Accept: 'application/vnd.github+json' } }); return r.json(); }
export async function collect() {
  const d = (await gql(`query{user(login:"${login}"){createdAt repositories(ownerAffiliations:OWNER,isFork:false,privacy:PUBLIC){totalCount} contributionsCollection{totalCommitContributions contributionCalendar{totalContributions weeks{contributionDays{contributionCount date}}}}}}`)).user;
  const repos = (await rest(`/users/${login}/repos?per_page=100&type=owner`)).filter(r => !r.fork);
  const bytes = {}; for (const r of repos) { const l = await rest(`/repos/${login}/${r.name}/languages`); for (const [k, v] of Object.entries(l)) bytes[k] = (bytes[k] || 0) + v; }
  return { d, bytes };
}
function block(y, label, sub, items) {
  let s = `<circle cx="3.5" cy="${y - 4}" r="3.5" class="acc"/>${t(14, y, label, 'jb ink', 10.5, 'letter-spacing:.14em')}${t(14 + label.length * 7.9 + 18, y, sub, 'jb faint', 10.5, 'letter-spacing:.06em')}${line(0, y + 12, W, y + 12)}`;
  items.forEach((it, i) => { const x = i * 222; if (i) s += `<line x1="${x}" y1="${y + 30}" x2="${x}" y2="${y + 116}" class="rl"/>`; const px = i ? x + 22 : x; s += t(px, y + 86, it[0], 'is ink', 64, 'letter-spacing:-1.5px') + t(px, y + 112, it[1], 'in mute', 13); });
  return s;
}
export function numbers({ d }) {
  const years = new Date().getFullYear() - new Date(d.createdAt).getFullYear();
  const cc = d.contributionsCollection;
  const live = [[fmt(cc.contributionCalendar.totalContributions), 'contributions, last year'], [fmt(cc.totalCommitContributions), 'public commits'], [String(d.repositories.totalCount), 'public repositories'], [String(years), 'years on GitHub']];
  const prod = [['5', 'products in production'], ['1,200+', 'FormaTeX users'], ['400+', 'TekCircle API routes'], ['200+', 'Finareo audit rules']];
  return svg(300, 'GitHub activity numbers, updated daily, and production numbers', block(14, 'ON GITHUB', 'UPDATED DAILY', live) + block(158, 'IN PRODUCTION', 'AS OF OCTOBER 2026', prod));
}
export function heatmap({ d }) {
  const weeks = d.contributionsCollection.contributionCalendar.weeks, total = d.contributionsCollection.contributionCalendar.totalContributions;
  const max = Math.max(...weeks.flatMap(w => w.contributionDays.map(x => x.contributionCount)));
  const lv = n => n === 0 ? 'c0' : n < max * .15 ? 'c1' : n < max * .4 ? 'c2' : n < max * .7 ? 'c3' : 'c4';
  const px = (W - 34) / weeks.length;
  let cells = '', months = '', last = -1;
  weeks.forEach((w, i) => {
    w.contributionDays.forEach((x, j) => { cells += `<rect x="${(34 + i * px).toFixed(1)}" y="${24 + j * 15}" width="${(px - 3).toFixed(1)}" height="12" rx="2.5" class="${lv(x.contributionCount)}"/>`; });
    const m = new Date(w.contributionDays[0].date).getMonth();
    if (m !== last && i >= 2 && i < weeks.length - 2) { months += t((34 + i * px).toFixed(1), 12, ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][m], 'jb faint', 9.5); }
    last = m;
  });
  const days = [['Mon', 1], ['Wed', 3], ['Fri', 5]].map(([n, j]) => t(0, 24 + j * 15 + 10, n, 'jb faint', 9.5)).join('');
  const leg = ['c0', 'c1', 'c2', 'c3', 'c4'].map((c, i) => `<rect x="${W - 136 + i * 17}" y="156" width="12" height="12" rx="2.5" class="${c}"/>`).join('');
  return svg(176, 'Contribution heatmap for the last year', `${months}${days}${cells}${t(34, 166, `${fmt(total)} contributions in the last year`, 'is ink', 22)}${t(W - 144, 166, 'less', 'jb faint', 9.5, 'text-anchor:end')}${leg}${t(W - 46, 166, 'more', 'jb faint', 9.5, 'text-anchor:start')}`, '', ['IS', 'JB']);
}
export function languages({ bytes }) {
  const tot = Object.values(bytes).reduce((a, b) => a + b, 0);
  const list = Object.entries(bytes).sort((a, b) => b[1] - a[1]); const top = list.slice(0, 6); const other = list.slice(6).reduce((a, b) => a + b[1], 0);
  const items = [...top, ...(other ? [['Other', other]] : [])]; const op = [1, .78, .6, .46, .34, .24, .16];
  let x = 0, bar = '', leg = '';
  items.forEach(([n, v], i) => { const w = Math.max(5, v / tot * W); bar += `<rect x="${x.toFixed(1)}" y="2" width="${(w - 2).toFixed(1)}" height="10" rx="3" class="${i ? 'ink' : 'acc'}" style="${i ? 'opacity:' + op[i] : ''}"/>`; x += w; const cx = (i % 4) * 222, cy = 44 + Math.floor(i / 4) * 26; leg += `<circle cx="${cx + 4}" cy="${cy - 4}" r="4" class="${i ? 'ink' : 'acc'}" style="${i ? 'opacity:' + op[i] : ''}"/>${t(cx + 16, cy, n, 'in ink', 13.5)}${t(cx + 198, cy, (v / tot * 100).toFixed(1) + '%', 'jb mute', 11, 'text-anchor:end')}`; });
  return svg(100, 'Languages by code written', bar + leg, '', ['IN', 'JB']);
}
