// Hero Section Animations and Effects
class HeroAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.createParticleBackground();
    this.initTextAnimations();
    this.initScrollAnimations();
    this.createCustomCursor();
    this.initInteractiveChart();
  }

  // Animated Particle Background
  createParticleBackground() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.8 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#CDDC39';
        ctx.fill();
      }
    }

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        
        // Connect nearby particles
        for (let j = index + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.globalAlpha = 0.2 * (1 - distance / 100);
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = '#CDDC39';
            ctx.stroke();
          }
        }
      });
      
      animationId = requestAnimationFrame(animate);
    };

    animate();
  }

  // Animated Text Reveal
  initTextAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (!heroTitle || !heroSubtitle) return;

    // Split text into spans for animation
    const splitText = (element) => {
      const text = element.textContent;
      element.innerHTML = '';
      text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${index * 0.1}s`;
        span.classList.add('char-animate');
        element.appendChild(span);
      });
    };

    splitText(heroTitle);
    
    // Trigger animations on load
    setTimeout(() => {
      heroTitle.classList.add('text-reveal');
      setTimeout(() => {
        heroSubtitle.classList.add('fade-in-up');
      }, 800);
    }, 500);
  }

  // Scroll-triggered Animations
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
      observer.observe(section);
    });
  }

  // Custom Cursor
  createCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
      
      requestAnimationFrame(animateCursor);
    };

    animateCursor();

    // Hover effects
    document.querySelectorAll('a, button, .btn').forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
      });
      element.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
      });
    });
  }

  // Interactive Revenue Chart
  initInteractiveChart() {
    const chartContainer = document.querySelector('.revenue-chart');
    if (!chartContainer) return;

    const metrics = [
      { label: 'Pipeline', value: 25, unit: 'M+', color: '#CDDC39' },
      { label: 'Win Rate', value: 81, unit: '%', color: '#CDDC39' },
      { label: 'Partner Growth', value: 4, unit: 'x', color: '#CDDC39' },
      { label: 'Time Savings', value: 87, unit: '%', color: '#CDDC39' }
    ];

    chartContainer.innerHTML = metrics.map((metric, index) => `
      <div class="chart-bar" style="animation-delay: ${index * 0.2}s">
        <div class="bar-fill" data-value="${metric.value}"></div>
        <div class="bar-label">${metric.label}</div>
        <div class="bar-value">${metric.value}${metric.unit}</div>
      </div>
    `).join('');

    // Animate bars on scroll
    const chartObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll('.bar-fill');
          bars.forEach(bar => {
            const value = bar.dataset.value;
            bar.style.height = `${Math.min(value, 100)}%`;
          });
        }
      });
    });

    chartObserver.observe(chartContainer);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new HeroAnimations();
});