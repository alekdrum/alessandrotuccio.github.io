AOS.init({ once: true, duration: 600, easing: 'ease-out' });
document.getElementById('year').textContent = new Date().getFullYear();

const DATA = window.PORTFOLIO_DATA || {};

const iconMap = [
  {k:'Python', e:'🐍'},
  {k:'Power BI', e:'📊'},
  {k:'SAP', e:'🏭'},
  {k:'Salesforce', e:'☁️'},
  {k:'MS Dynamics', e:'🧩'},
  {k:'BPMN', e:'🧠'},
  {k:'UML', e:'📐'},
  {k:'AutoCAD', e:'📏'},
  {k:'Visio', e:'🗺️'},
  {k:'Canva', e:'🎨'},
  {k:'Primavera', e:'🗓️'},
  {k:'MS Project', e:'📆'},
  {k:'Trello', e:'🗂️'},
  {k:'APIs', e:'🔌'},
  {k:'Docker', e:'🐳'},
  {k:'ETL', e:'🧪'},
  {k:'Automation', e:'🤖'},
  {k:'Timeseries', e:'⏱️'}
];
function withIcon(label){
  for (const m of iconMap){
    if (label.toLowerCase().includes(m.k.toLowerCase())) return `${m.e} ${label}`;
  }
  return label;
}

// Hero
(function(){
  const s = DATA.site || {};
  document.getElementById('siteName').textContent = s.name || '';
  document.getElementById('siteTitle').textContent = s.title || '';
  document.getElementById('siteBio').textContent = s.bio || '';
  document.getElementById('footerName').textContent = s.name || '';
  const emailEl = document.getElementById('siteEmail');
  if (s.email) { emailEl.href = 'mailto:' + s.email; emailEl.textContent = s.email; }
  const li = document.getElementById('siteLinkedin');
  if (s.linkedin) li.href = s.linkedin;
})();

// Projects
(function(){
  const grid = document.getElementById('projectsGrid');
  (DATA.projects || []).forEach(p => {
    const el = document.createElement('article');
    el.className = 'project';
    el.setAttribute('data-aos','fade-up');
    el.innerHTML = `
      <h3>${p.title}</h3>
      <p class="meta">${p.role} — ${p.summary}</p>
      <p><strong>Problema</strong> — ${p.problem}</p>
      <p><strong>Soluzione</strong> — ${p.solution}</p>
      <p><strong>Risultato</strong> — ${p.result}</p>
      <div class="stack">${(p.stack||[]).map(s=>`<span class="badge">${withIcon(s)}</span>`).join('')}</div>
    `;
    grid.appendChild(el);
  });
})();

// Experiences
(function(){
  const list = document.getElementById('expList');
  (DATA.experiences || []).forEach(xp => {
    const card = document.createElement('article');
    card.className = 'exp-card';
    card.setAttribute('data-aos','fade-up');
    card.innerHTML = `
      <div class="exp-side">
        <div class="exp-period">${xp.period}</div>
        <div class="exp-org">${xp.org}</div>
      </div>
      <div>
        <div class="exp-role">${xp.role}</div>
        <div class="exp-desc">${xp.desc}</div>
      </div>
    `;
    list.appendChild(card);
  });
})();

// Skills radar + badges
(function(){
  const radar = DATA.skills_radar || null;
  const ctx = document.getElementById('skillsChart');
  if (ctx && radar){
    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: radar.labels,
        datasets: [{
          label: 'Livello',
          data: radar.values,
          fill: true,
          backgroundColor: 'rgba(11,98,246,0.12)',
          borderColor: 'rgba(14,15,18,0.9)',
          pointBackgroundColor: 'rgba(14,15,18,0.9)'
        }]
      },
      options: {
        responsive: true,
        scales: { r: { beginAtZero: true, max: 100 } },
        plugins: { legend: { display: false } }
      }
    });
  }
  const sb = document.getElementById('skillsBadges');
  const groups = DATA.skills || {};
  Object.entries(groups).forEach(([cat, items]) => {
    const group = document.createElement('div');
    group.style.marginTop = '8px';
    const title = document.createElement('h3');
    title.textContent = cat;
    group.appendChild(title);
    const row = document.createElement('div');
    row.className = 'badges';
    items.forEach(i => {
      const label = (typeof i === 'string') ? i : i.name;
      const b = document.createElement('span');
      b.className = 'badge';
      b.textContent = withIcon(label);
      row.appendChild(b);
    });
    group.appendChild(row);
    sb.appendChild(group);
  });
})();

// Interests bubbles + float
(function(){
  const bubbles = document.getElementById('bubbles');
  (DATA.interests || []).forEach((t, i) => {
    const b = document.createElement('div');
    b.className = 'bubble';
    b.textContent = t;
    b.style.animation = `float ${6 + i}s ease-in-out ${i * 0.2}s infinite alternate`;
    bubbles.appendChild(b);
  });
  const style = document.createElement('style');
  style.textContent = `@keyframes float { from { transform: translateY(0px) } to { transform: translateY(-10px) } }`;
  document.head.appendChild(style);
})();
