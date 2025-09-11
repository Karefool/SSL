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

    // Create enhanced interactive network diagram
    chartContainer.innerHTML = `
      <div class="network-diagram">
        <svg class="network-svg" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
          <!-- Pulsing connection lines with gradient -->
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:rgba(205, 220, 57, 0.3);stop-opacity:1" />
              <stop offset="50%" style="stop-color:rgba(205, 220, 57, 0.8);stop-opacity:1" />
              <stop offset="100%" style="stop-color:rgba(0, 212, 170, 0.6);stop-opacity:1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <line class="connection-line line-1" x1="80" y1="100" x2="160" y2="60" stroke="url(#flowGradient)" stroke-width="2"/>
          <line class="connection-line line-2" x1="80" y1="100" x2="160" y2="140" stroke="url(#flowGradient)" stroke-width="2"/>
          <line class="connection-line line-3" x1="160" y1="60" x2="240" y2="80" stroke="url(#flowGradient)" stroke-width="2"/>
          <line class="connection-line line-4" x1="160" y1="140" x2="240" y2="120" stroke="url(#flowGradient)" stroke-width="2"/>
          <line class="connection-line line-5" x1="240" y1="80" x2="320" y2="100" stroke="url(#flowGradient)" stroke-width="2"/>
          <line class="connection-line line-6" x1="240" y1="120" x2="320" y2="100" stroke="url(#flowGradient)" stroke-width="2"/>
          
          <!-- Interactive network nodes with hover keywords -->
          <g class="node-group" data-keyword="Growth">
            <circle class="network-node node-1" cx="80" cy="100" r="25" fill="rgba(205, 220, 57, 0.2)" stroke="#CDDC39" stroke-width="2"/>
            <text x="80" y="106" text-anchor="middle" fill="white" font-size="10" font-weight="600" class="node-label">LEAD</text>
            <text x="80" y="130" text-anchor="middle" fill="#CDDC39" font-size="8" font-weight="700" class="hover-keyword" opacity="0">GROWTH</text>
          </g>
          
          <g class="node-group" data-keyword="Strategy">
            <circle class="network-node node-2" cx="160" cy="60" r="20" fill="rgba(205, 220, 57, 0.2)" stroke="#CDDC39" stroke-width="2"/>
            <text x="160" y="65" text-anchor="middle" fill="white" font-size="9" font-weight="600" class="node-label">QUALIFY</text>
            <text x="160" y="85" text-anchor="middle" fill="#CDDC39" font-size="7" font-weight="700" class="hover-keyword" opacity="0">STRATEGY</text>
          </g>
          
          <g class="node-group" data-keyword="Efficiency">
            <circle class="network-node node-3" cx="160" cy="140" r="20" fill="rgba(205, 220, 57, 0.2)" stroke="#CDDC39" stroke-width="2"/>
            <text x="160" y="145" text-anchor="middle" fill="white" font-size="9" font-weight="600" class="node-label">NURTURE</text>
            <text x="160" y="165" text-anchor="middle" fill="#CDDC39" font-size="7" font-weight="700" class="hover-keyword" opacity="0">EFFICIENCY</text>
          </g>
          
          <g class="node-group" data-keyword="Results">
            <circle class="network-node node-4" cx="240" cy="80" r="18" fill="rgba(205, 220, 57, 0.2)" stroke="#CDDC39" stroke-width="2"/>
            <text x="240" y="85" text-anchor="middle" fill="white" font-size="8" font-weight="600" class="node-label">DEMO</text>
            <text x="240" y="105" text-anchor="middle" fill="#CDDC39" font-size="7" font-weight="700" class="hover-keyword" opacity="0">RESULTS</text>
          </g>
          
          <g class="node-group" data-keyword="Scale">
            <circle class="network-node node-5" cx="240" cy="120" r="18" fill="rgba(205, 220, 57, 0.2)" stroke="#CDDC39" stroke-width="2"/>
            <text x="240" y="125" text-anchor="middle" fill="white" font-size="8" font-weight="600" class="node-label">PARTNER</text>
            <text x="240" y="145" text-anchor="middle" fill="#CDDC39" font-size="7" font-weight="700" class="hover-keyword" opacity="0">SCALE</text>
          </g>
          
          <g class="node-group" data-keyword="Success">
            <circle class="network-node node-6" cx="320" cy="100" r="22" fill="rgba(205, 220, 57, 0.2)" stroke="#CDDC39" stroke-width="2"/>
            <text x="320" y="106" text-anchor="middle" fill="white" font-size="9" font-weight="600" class="node-label">CLOSE</text>
            <text x="320" y="130" text-anchor="middle" fill="#CDDC39" font-size="8" font-weight="700" class="hover-keyword" opacity="0">SUCCESS</text>
          </g>
          
          <!-- Enhanced flowing data particles -->
          <circle class="data-particle particle-1" cx="80" cy="100" r="3" fill="#00D4AA" filter="url(#glow)"/>
          <circle class="data-particle particle-2" cx="80" cy="100" r="2" fill="#CDDC39" filter="url(#glow)"/>
          <circle class="data-particle particle-3" cx="80" cy="100" r="2.5" fill="#00D4AA" filter="url(#glow)"/>
          <circle class="data-particle particle-4" cx="80" cy="100" r="2" fill="#CDDC39" filter="url(#glow)"/>
        </svg>
        
        <div class="transformation-status">
          <div class="chaos-indicator">Transforming...</div>
        </div>
      </div>
    `;

    // Add interactive hover effects to nodes
    const nodeGroups = chartContainer.querySelectorAll('.node-group');
    nodeGroups.forEach(group => {
      const node = group.querySelector('.network-node');
      const keyword = group.querySelector('.hover-keyword');
      
      group.addEventListener('mouseenter', () => {
        node.style.filter = 'url(#glow)';
        node.style.transform = 'scale(1.2)';
        node.style.fill = 'rgba(205, 220, 57, 0.6)';
        keyword.style.opacity = '1';
        keyword.style.transform = 'translateY(-5px)';
      });
      
      group.addEventListener('mouseleave', () => {
        node.style.filter = 'none';
        node.style.transform = 'scale(1)';
        node.style.fill = 'rgba(205, 220, 57, 0.2)';
        keyword.style.opacity = '0';
        keyword.style.transform = 'translateY(0)';
      });
    });

    // Chaos-to-order transformation animation on scroll
    const networkObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateChaosToOrder(entry.target);
        }
      });
    });

    networkObserver.observe(chartContainer);
  }

  // Chaos-to-order transformation animation
  animateChaosToOrder(container) {
    const nodes = container.querySelectorAll('.network-node');
    const lines = container.querySelectorAll('.connection-line');
    const particles = container.querySelectorAll('.data-particle');
    const labels = container.querySelectorAll('.node-label, .hover-keyword');
    const statusIndicator = container.querySelector('.chaos-indicator');
    
    // Phase 1: Show chaos - nodes scattered randomly
    nodes.forEach((node, index) => {
      const randomX = Math.random() * 300 + 50;
      const randomY = Math.random() * 150 + 25;
      node.style.opacity = '0.3';
      node.style.transform = `translate(${randomX - parseFloat(node.getAttribute('cx'))}px, ${randomY - parseFloat(node.getAttribute('cy'))}px) scale(0.5) rotate(${Math.random() * 360}deg)`;
      node.style.fill = 'rgba(255, 107, 53, 0.4)'; // Chaotic red
    });
    
    // Hide connections and labels initially
    lines.forEach(line => {
      line.style.opacity = '0';
      line.style.strokeDasharray = '200';
      line.style.strokeDashoffset = '200';
    });
    
    labels.forEach(label => label.style.opacity = '0');
    particles.forEach(particle => particle.style.opacity = '0');
    
    // Phase 2: Begin transformation (after 1 second)
    setTimeout(() => {
      statusIndicator.textContent = 'Organizing System...';
      
      // Nodes move to correct positions and become organized
      nodes.forEach((node, index) => {
        setTimeout(() => {
          node.style.opacity = '1';
          node.style.transform = 'translate(0px, 0px) scale(1) rotate(0deg)';
          node.style.fill = 'rgba(205, 220, 57, 0.2)'; // Organized green
          node.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        }, index * 150);
      });
    }, 1000);
    
    // Phase 3: Connect the system (after 2.2 seconds)
    setTimeout(() => {
      statusIndicator.textContent = 'Building Connections...';
      
      lines.forEach((line, index) => {
        setTimeout(() => {
          line.style.opacity = '1';
          line.style.strokeDashoffset = '0';
          line.style.transition = 'all 0.6s ease-out';
        }, index * 100);
      });
    }, 2200);
    
    // Phase 4: Add labels and activate data flow (after 3 seconds)
    setTimeout(() => {
      statusIndicator.textContent = 'System Optimized';
      
      // Show labels
      labels.forEach((label, index) => {
        setTimeout(() => {
          label.style.opacity = '1';
          label.style.transition = 'all 0.4s ease-out';
        }, index * 80);
      });
      
      // Activate flowing particles
      particles.forEach((particle, index) => {
        setTimeout(() => {
          particle.style.opacity = '1';
          particle.style.animationPlayState = 'running';
        }, index * 200);
      });
    }, 3000);
    
    // Phase 5: Hide status indicator (after 4 seconds)
    setTimeout(() => {
      statusIndicator.style.opacity = '0';
      statusIndicator.style.transform = 'translateY(-20px)';
    }, 4000);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new HeroAnimations();
});