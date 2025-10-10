AOS.init({ once: true, duration: 600, easing: 'ease-out' });
document.getElementById('year').textContent = new Date().getFullYear();

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
    const gh = document.getElementById('siteGithub');
    gh.href = s.github || '#';

    const grid = document.getElementById('projectsGrid');
    data.projects.forEach(p => {
      const el = document.createElement('article');
      el.className = 'project';
      el.setAttribute('data-aos','fade-up');
      el.innerHTML = `
        <div class="tag">${p.role}</div>
        <h3>${p.title}</h3>
        <p class="meta">${p.summary}</p>
        <p><strong>Problema</strong> — ${p.problem}</p>
        <p><strong>Soluzione</strong> — ${p.solution}</p>
        <p><strong>Risultato</strong> — ${p.result}</p>
        <div class="stack">${p.stack.map(s=>`<span class="badge">${s}</span>`).join('')}</div>
      `;
      grid.appendChild(el);
    });

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
        const b = document.createElement('span');
        b.className = 'badge';
        b.textContent = (typeof i === 'string') ? i : i.name;
        row.appendChild(b);
      });
      group.appendChild(row);
      sb.appendChild(group);
    });
  })
  .catch(err => { console.error('Errore caricamento contenuti', err); });
