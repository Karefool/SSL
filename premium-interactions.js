// INSTRUCTION SET 3: PREMIUM VISUAL INTERACTIONS

document.addEventListener('DOMContentLoaded', function() {
  
  // Scroll Progress Bar
  createScrollProgress();
  
  // Navigation Hide/Show on Scroll
  handleNavigation();
  
  // Fade-in Sections on Scroll
  handleSectionFadeIn();
  
  // Counter Animations
  handleCounterAnimations();
  
  // Enhanced Page Interactions
  initPremiumInteractions();
  
});

// Scroll Progress Bar
function createScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.id = 'scrollProgress';
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', updateScrollProgress);
}

function updateScrollProgress() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById('scrollProgress').style.width = scrolled + '%';
}

// Navigation Hide/Show on Scroll
function handleNavigation() {
  let lastScrollTop = 0;
  const nav = document.querySelector('.main-navigation');
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down & past hero
      nav.classList.add('nav-hidden');
    } else {
      // Scrolling up
      nav.classList.remove('nav-hidden');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }, { passive: true });
}

// Fade-in Sections on Scroll
function handleSectionFadeIn() {
  const sections = document.querySelectorAll('.section-white, .section-gray');
  
  // Add fade-in-section class to all sections
  sections.forEach(section => {
    section.classList.add('fade-in-section');
  });
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  sections.forEach(section => observer.observe(section));
}

// Counter Animations - disabled for proof-number to make static
function handleCounterAnimations() {
  const counters = document.querySelectorAll('.stat-counter, .impact-metric');
  
  const animateCounter = (element) => {
    const target = parseInt(element.dataset.target) || parseInt(element.textContent.replace(/[^\d]/g, ''));
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current) + (element.dataset.suffix || '');
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + (element.dataset.suffix || '');
      }
    };
    
    element.classList.add('counter');
    updateCounter();
  };
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        setTimeout(() => animateCounter(entry.target), 200);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => counterObserver.observe(counter));
}

// Enhanced Premium Interactions
function initPremiumInteractions() {
  
  // Add stagger animation to grids
  const grids = document.querySelectorAll('.services-grid, .problems-grid, .case-gallery');
  grids.forEach(grid => {
    grid.classList.add('stagger-animation');
  });
  
  // Enhanced button interactions
  const buttons = document.querySelectorAll('.btn, .cta-primary, .cta-secondary');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.classList.add('premium-glow');
    });
    
    button.addEventListener('mouseleave', function() {
      this.classList.remove('premium-glow');
    });
  });
  
  // Enhanced text interactions
  const headings = document.querySelectorAll('h1, h2, h3');
  headings.forEach(heading => {
    heading.addEventListener('mouseenter', function() {
      this.classList.add('text-glow');
    });
    
    heading.addEventListener('mouseleave', function() {
      this.classList.remove('text-glow');
    });
  });
  
  // Floating elements
  const floatingElements = document.querySelectorAll('.service-icon, .problem-icon');
  floatingElements.forEach(element => {
    element.classList.add('floating-element');
  });
  
  // Enhanced image interactions
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
      this.style.zIndex = '5';
    });
    
    img.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.zIndex = '1';
    });
  });
  
}

// Add visual separators between sections
function addVisualSeparators() {
  const sections = document.querySelectorAll('.section-white, .section-gray');
  
  sections.forEach((section, index) => {
    if (index < sections.length - 1) {
      const separator = document.createElement('div');
      separator.className = 'section-separator';
      
      // Alternate between different separator types
      const separatorType = index % 3;
      
      if (separatorType === 0) {
        // Wave divider
        separator.innerHTML = `
          <div class="wave-divider">
            <svg viewBox="0 0 1200 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,50 Q300,10 600,50 T1200,50 L1200,100 L0,100 Z" 
                    fill="url(#waveGradient)" opacity="0.7"/>
              <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#00D9FF;stop-opacity:0.3" />
                  <stop offset="50%" style="stop-color:#FFD700;stop-opacity:0.3" />
                  <stop offset="100%" style="stop-color:#00D9FF;stop-opacity:0.3" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        `;
      } else if (separatorType === 1) {
        // Gradient separator
        separator.innerHTML = '<div class="gradient-separator"></div>';
      } else {
        // Geometric separator
        separator.innerHTML = '<div class="geometric-separator"></div>';
      }
      
      section.parentNode.insertBefore(separator, section.nextSibling);
    }
  });
}

// Initialize separators after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(addVisualSeparators, 100);
});