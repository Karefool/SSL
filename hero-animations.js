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

  // Revenue Transformation Visualization - Shows Before/After Impact
  initInteractiveChart() {
    const container = document.querySelector('.transformation-container');
    if (!container) return;

    // Create chaos particles for the "before" state
    this.initChaosParticles();
    
    // Create success particles for the "after" state
    this.initSuccessParticles();
    
    // Initialize transformation animation on scroll
    const transformationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateTransformation();
          transformationObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    transformationObserver.observe(container);
  }

  // Create floating chaos particles for before state
  initChaosParticles() {
    const particlesContainer = document.getElementById('chaosParticles');
    if (!particlesContainer) {
      console.warn('Chaos particles container not found');
      return;
    }

    // Clear any existing particles
    particlesContainer.innerHTML = '';

    // Create chaos particles with proper animation
    for (let i = 0; i < 22; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random positioning
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      particle.style.left = x + '%';
      particle.style.top = y + '%';
      
      // Staggered animation delays
      const delay = Math.random() * 5;
      const duration = 3 + Math.random() * 4;
      particle.style.animationDelay = delay + 's';
      particle.style.animation = `float ${duration}s infinite ease-in-out`;
      
      // Add particle to container
      particlesContainer.appendChild(particle);
      
      // Force reflow to ensure animation starts
      particle.offsetHeight;
    }
    
    console.log('Chaos particles initialized:', particlesContainer.children.length);
  }

  // Create energetic success particles for after state
  initSuccessParticles() {
    const particlesContainer = document.getElementById('successParticles');
    if (!particlesContainer) {
      console.warn('Success particles container not found');
      return;
    }

    // Clear any existing particles
    particlesContainer.innerHTML = '';

    // Create more particles with varied sizes to show excitement
    for (let i = 0; i < 35; i++) {
      const particle = document.createElement('div');
      
      // Vary particle sizes for dynamic effect
      let sizeClass = 'medium';
      if (i < 8) sizeClass = 'large';
      else if (i > 25) sizeClass = 'small';
      
      particle.className = `success-particle ${sizeClass}`;
      
      // Random positioning
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      particle.style.left = x + '%';
      particle.style.top = y + '%';
      
      // Faster, more energetic animations
      const delay = Math.random() * 2;
      const duration = 2 + Math.random() * 1.5;
      particle.style.animationDelay = delay + 's';
      particle.style.animationDuration = duration + 's';
      
      particlesContainer.appendChild(particle);
      
      // Force reflow to ensure animation starts
      particle.offsetHeight;
    }
    
    console.log('Success particles initialized:', particlesContainer.children.length);
  }

  // Animate the transformation sequence
  animateTransformation() {
    console.log('Starting transformation animation');
    
    // Ensure metric items are visible first
    setTimeout(() => {
      const metricItems = document.querySelectorAll('.metric-item');
      metricItems.forEach((item, index) => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      });
    }, 200);

    // Animate before metric bars with staggered timing
    setTimeout(() => {
      const beforeFills = document.querySelectorAll('.before-fill');
      console.log('Found before fills:', beforeFills.length);
      beforeFills.forEach((fill, index) => {
        const width = fill.dataset.width;
        if (width) {
          setTimeout(() => {
            fill.style.width = width + '%';
            console.log(`Animating before fill ${index} to ${width}%`);
          }, index * 150);
        }
      });
    }, 800);

    // Animate after metric bars with staggered timing
    setTimeout(() => {
      const afterFills = document.querySelectorAll('.after-fill');
      console.log('Found after fills:', afterFills.length);
      afterFills.forEach((fill, index) => {
        const width = fill.dataset.width;
        if (width) {
          setTimeout(() => {
            fill.style.width = width + '%';
            console.log(`Animating after fill ${index} to ${width}%`);
          }, index * 150);
        }
      });
    }, 2000);

    // Add number counting animation to big metrics
    setTimeout(() => {
      this.animateMetricNumbers();
    }, 1200);
  }

  // Animate metric numbers counting up
  animateMetricNumbers() {
    const beforeMetric = document.querySelector('[data-before]');
    const afterMetric = document.querySelector('[data-after]');
    
    if (beforeMetric) {
      this.countAnimation(beforeMetric, 0, 22, 1000, '%');
    }
    
    if (afterMetric) {
      setTimeout(() => {
        this.countAnimation(afterMetric, 22, 40, 1500, '%');
      }, 1000);
    }
  }

  // Count up animation for numbers
  countAnimation(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    
    // Find the first text node or create one
    let textElement = null;
    for (let node of element.childNodes) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        textElement = node;
        break;
      }
    }
    
    // If no text node found, create one
    if (!textElement) {
      textElement = document.createTextNode('');
      element.insertBefore(textElement, element.firstChild);
    }
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (end - start) * easeOut);
      
      textElement.textContent = current + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new HeroAnimations();
});