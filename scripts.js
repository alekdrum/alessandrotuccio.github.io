AOS.init({ once: true, duration: 600, easing: 'ease-out' });
// Mappa per associare un'emoji a ciascuna skill/tecnologia
const BADGE_ICON_MAP = [
  { k: 'python',     e: '🐍' },
  { k: 'power bi',   e: '📊' },
  { k: 'pandas',     e: '📊' },
  { k: 'sap',        e: '🏭' },
  { k: 'salesforce', e: '☁️' },
  { k: 'dynamics',   e: '🧩' },
  { k: 'etl',        e: '🧪' },
  { k: 'automation', e: '🤖' },
  { k: 'docker',     e: '🐳' },
  { k: 'api',        e: '🔌' },
  { k: 'uml',        e: '📐' },
  { k: 'bpmn',       e: '🧠' },
  { k: 'trello',     e: '🗂️' },
  { k: 'ms project', e: '📆' },
  { k: 'primavera',  e: '🗓️' },
  { k: 'cloud',      e: '☁️' }
];

function emojiForBadge(text){
  const t = (text || '').toLowerCase();
  const hit = BADGE_ICON_MAP.find(m => t.includes(m.k));
  return hit ? hit.e : '🔹'; // fallback
}

// Trasforma ogni .badge in: <span class="badge"><span class="icon">…</span><span class="label">…</span></span>
document.querySelectorAll('.badge').forEach(b => {
  const raw = (b.textContent || '').trim();
  const emj = emojiForBadge(raw);
  // Se non è già stato “upgradato”, wrappo in icon + label
  if (!b.querySelector('.icon')) {
    b.innerHTML = `<span class="icon">${emj}</span><span class="label">${raw.replace(emj,'').trim()}</span>`;
  }
});
document.getElementById('year').textContent = new Date().getFullYear();

const DATA = window.PORTFOLIO_DATA || {};

// Radar chart
const ctx = document.getElementById('skillsChart');
if (ctx && DATA.skills_radar) {
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: DATA.skills_radar.labels,
      datasets: [{
        data: DATA.skills_radar.values,
        fill: true,
        backgroundColor: 'rgba(11,98,246,0.12)',
        borderColor: '#0b62f6',
        pointBackgroundColor: '#0b62f6'
      }]
    },
    options: {
      responsive: true,
      scales: { r: { beginAtZero: true, max: 100 } },
      plugins: { legend: { display: false } }
    }
  });
}

// Hard skill badges
const skills = DATA.skills || {};
const sb = document.getElementById('skillsBadges');
Object.entries(skills).forEach(([cat, list]) => {
  const title = document.createElement('h3');
  title.textContent = cat;
  const wrap = document.createElement('div');
  wrap.className = 'badges';
  list.forEach(skill => {
    const b = document.createElement('span');
    b.className = 'badge';
    b.textContent = skill;
    wrap.appendChild(b);
  });
  sb.appendChild(title);
  sb.appendChild(wrap);
});

// Interests bubbles
const bubbles = document.getElementById('bubbles');
(DATA.interests || []).forEach((i, idx) => {
  const b = document.createElement('div');
  b.className = 'bubble';
  b.textContent = i;
  b.style.animation = `float ${5 + idx}s ease-in-out ${idx * 0.3}s infinite alternate`;
  bubbles.appendChild(b);
});
const style = document.createElement('style');
style.textContent = `@keyframes float { from { transform:translateY(0) } to { transform:translateY(-10px) } }`;
document.head.appendChild(style);
