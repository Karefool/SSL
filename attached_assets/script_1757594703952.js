document.getElementById('year').textContent = new Date().getFullYear();

fetch('portfolio.json')
  .then(r => r.json())
  .then(items => {
    const wrap = document.getElementById('portfolio-cards');
    items.forEach(it => {
      const el = document.createElement('article');
      el.className = 'card';
      el.innerHTML = `
        <h3>${it.title}</h3>
        <p>${it.summary}</p>
        ${it.link ? `<p><a class="btn ghost" href="${it.link}" target="_blank" rel="noopener">Details</a></p>` : ''}
      `;
      wrap.appendChild(el);
    });
  })
  .catch(() => {});
