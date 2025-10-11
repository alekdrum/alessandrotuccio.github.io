AOS.init({ once: true, duration: 600, easing: 'ease-out' });
document.getElementById('year').textContent = new Date().getFullYear();

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

fetch('content.json')
  .then(r => r.json())
  .then(data => {
    const s = data.site;
    document.getElementById('siteName').textContent = s.name;
    document.getElementById('siteTitle').textContent = s.title;
    document.getElementById('siteBio').textContent = s.bio;
    document.getElementById('footerName').textContent = s.name;
    const emailEl = document.getElementById('siteEmail');
    emailEl.href = 'mailto:' + s.email;
    emailEl.textContent = s.email;
    const li = document.getElementById('siteLinkedin');
    li.href = s.linkedin || '#';

    // Projects
    const grid = document.getElementById('projectsGrid');
    data.projects.forEach(p => {
      const el = document.createElement('article');
      el.className = 'project';
      el.setAttribute('data-aos','fade-up');
      el.innerHTML = `
        <h3>${p.title}</h3>
        <p class="meta">${p.role} — ${p.summary}</p>
        <p><strong>Problema</strong> — ${p.problem}</p>
        <p><strong>Soluzione</strong> — ${p.solution}</p>
        <p><strong>Risultato</strong> — ${p.result}</p>
        <div class="stack">${p.stack.map(s=>`<span class="badge">${withIcon(s)}</span>`).join('')}</div>
      `;
      grid.appendChild(el);
    });

    // Timeline
    const tl = document.getElementById('timelineList');
    data.timeline.forEach(t => {
      const el = document.createElement('div');
      el.className = 'tl-item';
      el.setAttribute('data-aos','fade-up');
      el.innerHTML = `
        <div class="tl-period">${t.period}</div>
        <div class="tl-role">${t.role}</div>
        <div class="tl-org">${t.org}</div>
        ${t.highlights && t.highlights.length ? `<ul class="tl-hi">` + t.highlights.map(h=>`<li>${h}</li>`).join('') + `</ul>` : ''}
      `;
      tl.appendChild(el);
    });

    // Skills Radar
    const ctx = document.getElementById('skillsChart');
    if (ctx && data.skills_radar){
      new Chart(ctx, {
        type: 'radar',
        data: {
          labels: data.skills_radar.labels,
          datasets: [{
            label: 'Livello',
            data: data.skills_radar.values,
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

    // Skills badges with icons
    const sb = document.getElementById('skillsBadges');
    Object.entries(data.skills).forEach(([cat, items]) => {
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

    // Interests bubbles
    const bubbles = document.getElementById('bubbles');
    data.interests.forEach((t, i) => {
      const b = document.createElement('div');
      b.className = 'bubble';
      b.textContent = t;
      b.style.animation = `float ${6 + i}s ease-in-out ${i * 0.2}s infinite alternate`;
      bubbles.appendChild(b);
    });
  })
  .catch(err => { console.error('Errore caricamento contenuti', err); });

// keyframes
const style = document.createElement('style');
style.textContent = `@keyframes float { from { transform: translateY(0px) } to { transform: translateY(-10px) } }`;
document.head.appendChild(style);
