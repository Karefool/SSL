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

  // Text animations DISABLED for clean header design
  initTextAnimations() {
    // All text animations disabled - header should be clean
    // Only rolling industry text animation is allowed
    return;
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

  // Interactive Network Diagram - Shows Revenue System Transformation
  initInteractiveChart() {
    const chartContainer = document.querySelector('.revenue-chart');
    if (!chartContainer) return;

    // Create network diagram showing interconnected revenue systems
    chartContainer.innerHTML = `
      <div class="network-diagram">
        <svg class="network-svg" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
          <!-- Connection lines -->
          <line class="connection-line" x1="80" y1="100" x2="160" y2="60" stroke="rgba(205, 220, 57, 0.6)" stroke-width="2"/>
          <line class="connection-line" x1="80" y1="100" x2="160" y2="140" stroke="rgba(205, 220, 57, 0.6)" stroke-width="2"/>
          <line class="connection-line" x1="160" y1="60" x2="240" y2="80" stroke="rgba(205, 220, 57, 0.6)" stroke-width="2"/>
          <line class="connection-line" x1="160" y1="140" x2="240" y2="120" stroke="rgba(205, 220, 57, 0.6)" stroke-width="2"/>
          <line class="connection-line" x1="240" y1="80" x2="320" y2="100" stroke="rgba(205, 220, 57, 0.6)" stroke-width="2"/>
          <line class="connection-line" x1="240" y1="120" x2="320" y2="100" stroke="rgba(205, 220, 57, 0.6)" stroke-width="2"/>
          
          <!-- Network nodes -->
          <circle class="network-node node-1" cx="80" cy="100" r="25" fill="rgba(205, 220, 57, 0.2)" stroke="#CDDC39" stroke-width="2"/>
          <circle class="network-node node-2" cx="160" cy="60" r="20" fill="rgba(205, 220, 57, 0.2)" stroke="#CDDC39" stroke-width="2"/>
          <circle class="network-node node-3" cx="160" cy="140" r="20" fill="rgba(205, 220, 57, 0.2)" stroke="#CDDC39" stroke-width="2"/>
          <circle class="network-node node-4" cx="240" cy="80" r="18" fill="rgba(205, 220, 57, 0.2)" stroke="#CDDC39" stroke-width="2"/>
          <circle class="network-node node-5" cx="240" cy="120" r="18" fill="rgba(205, 220, 57, 0.2)" stroke="#CDDC39" stroke-width="2"/>
          <circle class="network-node node-6" cx="320" cy="100" r="22" fill="rgba(205, 220, 57, 0.2)" stroke="#CDDC39" stroke-width="2"/>
          
          <!-- Node labels -->
          <text x="80" y="106" text-anchor="middle" fill="white" font-size="10" font-weight="600">LEAD</text>
          <text x="160" y="65" text-anchor="middle" fill="white" font-size="9" font-weight="600">QUALIFY</text>
          <text x="160" y="145" text-anchor="middle" fill="white" font-size="9" font-weight="600">NURTURE</text>
          <text x="240" y="85" text-anchor="middle" fill="white" font-size="8" font-weight="600">DEMO</text>
          <text x="240" y="125" text-anchor="middle" fill="white" font-size="8" font-weight="600">PARTNER</text>
          <text x="320" y="106" text-anchor="middle" fill="white" font-size="9" font-weight="600">CLOSE</text>
          
          <!-- Data flow particles -->
          <circle class="data-particle particle-1" cx="80" cy="100" r="2" fill="#00D4AA"/>
          <circle class="data-particle particle-2" cx="80" cy="100" r="2" fill="#00D4AA"/>
          <circle class="data-particle particle-3" cx="80" cy="100" r="2" fill="#00D4AA"/>
        </svg>
        
        <div class="network-labels">
          <div class="network-label left">Chaotic Process</div>
          <div class="network-label right">Optimized System</div>
        </div>
      </div>
    `;

    // Animate network on scroll
    const networkObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const nodes = entry.target.querySelectorAll('.network-node');
          const lines = entry.target.querySelectorAll('.connection-line');
          const particles = entry.target.querySelectorAll('.data-particle');
          
          // Animate nodes appearing
          nodes.forEach((node, index) => {
            setTimeout(() => {
              node.style.opacity = '1';
              node.style.transform = 'scale(1)';
            }, index * 200);
          });
          
          // Animate connection lines
          lines.forEach((line, index) => {
            setTimeout(() => {
              line.style.strokeDasharray = 'none';
              line.style.opacity = '1';
            }, 600 + index * 100);
          });
          
          // Animate data particles
          particles.forEach((particle, index) => {
            setTimeout(() => {
              particle.style.animationPlayState = 'running';
            }, 1200 + index * 300);
          });
        }
      });
    });

    networkObserver.observe(chartContainer);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new HeroAnimations();
});