// Parallax Scrolling Effects
class ParallaxController {
  constructor() {
    this.elements = [];
    this.ticking = false;
    this.init();
  }

  init() {
    this.setupParallaxElements();
    this.addScrollListener();
    this.setupIntersectionObserver();
  }

  setupParallaxElements() {
    // Define parallax elements with different speeds
    const parallaxConfigs = [
      { selector: '.service-card', speed: 0.1, direction: 'up' },
      // Removed .proof-stat parallax to make social proof numbers static
      { selector: '.hero-content', speed: 0.05, direction: 'down' },
      { selector: '#hero-canvas', speed: 0.02, direction: 'down' }
    ];

    parallaxConfigs.forEach(config => {
      const elements = document.querySelectorAll(config.selector);
      elements.forEach(element => {
        this.elements.push({
          element,
          speed: config.speed,
          direction: config.direction,
          offset: 0
        });
        element.classList.add('parallax-element');
      });
    });
  }

  addScrollListener() {
    window.addEventListener('scroll', () => {
      if (!this.ticking) {
        requestAnimationFrame(() => {
          this.updateParallax();
          this.ticking = false;
        });
        this.ticking = true;
      }
    });
  }

  updateParallax() {
    const scrollTop = window.pageYOffset;
    
    this.elements.forEach(item => {
      const { element, speed, direction } = item;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollTop;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Only animate if element is in viewport
      if (rect.bottom >= 0 && rect.top <= windowHeight) {
        const yPos = scrollTop * speed;
        const transform = direction === 'up' ? -yPos : yPos;
        element.style.transform = `translateY(${transform}px)`;
      }
    });
  }

  setupIntersectionObserver() {
    const options = {
      threshold: [0.1, 0.5, 0.9],
      rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const ratio = entry.intersectionRatio;
          const element = entry.target;
          
          // Add stagger effect to children
          const children = element.querySelectorAll('.service-card, .proof-stat');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('animate-in');
            }, index * 100);
          });
        }
      });
    }, options);

    // Observe sections for staggered animations
    document.querySelectorAll('.services-preview, .social-proof').forEach(section => {
      observer.observe(section);
    });
  }
}

// Smooth scroll for anchor links
class SmoothScroller {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

// Advanced Hover Effects
class HoverEffects {
  constructor() {
    this.init();
  }

  init() {
    this.setupCardTilt();
    this.setupButtonEffects();
    this.setupServiceCardEffects();
  }

  setupCardTilt() {
    const cards = document.querySelectorAll('.glass-card, .service-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      });
    });
  }

  setupButtonEffects() {
    const buttons = document.querySelectorAll('.cta-primary, .cta-secondary, .btn');
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px) scale(1.02)';
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  setupServiceCardEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        // Add glow effect
        card.style.boxShadow = '0 20px 60px rgba(205, 220, 57, 0.3)';
        card.style.borderColor = '#CDDC39';
        
        // Animate icon
        const icon = card.querySelector('.service-icon');
        if (icon) {
          icon.style.transform = 'scale(1.2) rotate(5deg)';
        }
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';
        card.style.borderColor = '';
        
        const icon = card.querySelector('.service-icon');
        if (icon) {
          icon.style.transform = 'scale(1) rotate(0deg)';
        }
      });
    });
  }
}

// Initialize all effects when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ParallaxController();
  new SmoothScroller();
  new HoverEffects();
});