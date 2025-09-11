document.getElementById('year').textContent = new Date().getFullYear();

// Progressive Disclosure Functionality
document.addEventListener('DOMContentLoaded', function() {
  const expandables = document.querySelectorAll('.pillar-expandable');
  
  expandables.forEach(pillar => {
    const surface = pillar.querySelector('.pillar-surface');
    const depth = pillar.querySelector('.pillar-depth');
    const indicator = pillar.querySelector('.expand-indicator');
    
    // Initially hide all depth content
    if (depth) {
      depth.style.display = 'none';
    }
    
    surface.addEventListener('click', function() {
      const isExpanded = pillar.classList.contains('expanded');
      
      // Close all other pillars first
      expandables.forEach(otherPillar => {
        if (otherPillar !== pillar) {
          otherPillar.classList.remove('expanded');
          const otherDepth = otherPillar.querySelector('.pillar-depth');
          const otherIndicator = otherPillar.querySelector('.expand-indicator');
          if (otherDepth) otherDepth.style.display = 'none';
          if (otherIndicator) otherIndicator.textContent = '+';
        }
      });
      
      // Toggle current pillar
      if (isExpanded) {
        pillar.classList.remove('expanded');
        if (depth) depth.style.display = 'none';
        if (indicator) indicator.textContent = '+';
      } else {
        pillar.classList.add('expanded');
        if (depth) depth.style.display = 'block';
        if (indicator) indicator.textContent = '−';
        
        // Smooth scroll to pillar after expansion
        setTimeout(() => {
          pillar.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    });
  });
});

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
