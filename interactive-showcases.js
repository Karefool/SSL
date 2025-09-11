// Interactive Showcases - Show Don't Tell
class InteractiveShowcases {
  constructor() {
    this.init();
  }

  init() {
    this.initScrollRevealTimeline();
    this.initProcessDiagram();
    this.initCountUpStats();
    this.initCaseStudyGallery();
    this.initTestimonialCarousel();
    this.initInfiniteLogoScroll();
    this.initImpactCounter();
  }

  // Scroll-Revealing Timeline
  initScrollRevealTimeline() {
    const timeline = document.querySelector('.work-timeline');
    if (!timeline) return;

    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('timeline-reveal');
          }, index * 200);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -10% 0px'
    });

    timelineItems.forEach(item => {
      observer.observe(item);
    });
  }

  // Clickable Process Diagram
  initProcessDiagram() {
    const processSteps = document.querySelectorAll('.process-step');
    
    processSteps.forEach(step => {
      step.addEventListener('click', () => {
        // Close all other steps
        processSteps.forEach(otherStep => {
          if (otherStep !== step) {
            otherStep.classList.remove('step-expanded');
          }
        });
        
        // Toggle current step
        step.classList.toggle('step-expanded');
        
        // Smooth scroll to expanded content
        if (step.classList.contains('step-expanded')) {
          setTimeout(() => {
            const expandedContent = step.querySelector('.step-details');
            if (expandedContent) {
              expandedContent.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
              });
            }
          }, 300);
        }
      });
    });
  }

  // Animated Count-Up Statistics
  initCountUpStats() {
    const statNumbers = document.querySelectorAll('.stat-counter');
    
    const animateCountUp = (element) => {
      const target = parseInt(element.dataset.target);
      const duration = 2000;
      const startTime = performance.now();
      const isPercentage = element.dataset.type === 'percentage';
      const isTime = element.dataset.type === 'time';
      const suffix = element.dataset.suffix || '';
      
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(target * easeOutQuart);
        
        if (isPercentage) {
          element.textContent = current + '%';
        } else if (isTime) {
          element.textContent = current + ' Days';
        } else if (target >= 1000000) {
          element.textContent = '$' + (current / 1000000).toFixed(1) + 'M' + suffix;
        } else if (target >= 1000) {
          element.textContent = (current / 1000).toFixed(0) + 'k' + suffix;
        } else {
          element.textContent = current + suffix;
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          animateCountUp(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
      observer.observe(stat);
    });
  }

  // Dynamic Case Study Gallery with Filters
  initCaseStudyGallery() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const caseCards = document.querySelectorAll('.case-card');
    
    // Filter functionality
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        
        // Update active filter button
        filterButtons.forEach(btn => btn.classList.remove('filter-active'));
        button.classList.add('filter-active');
        
        // Filter and animate cards
        caseCards.forEach((card, index) => {
          const cardCategory = card.dataset.category;
          
          if (filter === 'all' || cardCategory === filter) {
            setTimeout(() => {
              card.style.display = 'block';
              card.classList.add('card-fade-in');
            }, index * 100);
          } else {
            card.classList.remove('card-fade-in');
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });

    // Card hover effects with stats overlay
    caseCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const statsOverlay = card.querySelector('.stats-overlay');
        if (statsOverlay) {
          statsOverlay.classList.add('overlay-visible');
        }
      });
      
      card.addEventListener('mouseleave', () => {
        const statsOverlay = card.querySelector('.stats-overlay');
        if (statsOverlay) {
          statsOverlay.classList.remove('overlay-visible');
        }
      });
    });
  }

  // Testimonial Carousel
  initTestimonialCarousel() {
    const carousel = document.querySelector('.testimonial-carousel');
    const testimonials = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (!carousel || testimonials.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = testimonials.length;
    
    const updateCarousel = () => {
      const translateX = -currentSlide * 100;
      carousel.style.transform = `translateX(${translateX}%)`;
      
      // Update active indicators
      document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
        indicator.classList.toggle('indicator-active', index === currentSlide);
      });
    };
    
    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    };
    
    const prevSlide = () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarousel();
    };
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Auto-advance carousel
    setInterval(nextSlide, 6000);
    
    // Initialize
    updateCarousel();
  }

  // Infinite Logo Scroll
  initInfiniteLogoScroll() {
    const logoTrack = document.querySelector('.logo-track');
    if (!logoTrack) return;
    
    // Clone logo items for seamless loop
    const logos = logoTrack.innerHTML;
    logoTrack.innerHTML += logos;
    
    // Pause on hover
    logoTrack.addEventListener('mouseenter', () => {
      logoTrack.style.animationPlayState = 'paused';
    });
    
    logoTrack.addEventListener('mouseleave', () => {
      logoTrack.style.animationPlayState = 'running';
    });
  }

  // Live Impact Counter
  initImpactCounter() {
    const impactElements = document.querySelectorAll('.impact-metric');
    
    const updateImpactCounters = () => {
      impactElements.forEach(element => {
        const baseValue = parseInt(element.dataset.base);
        const increment = parseInt(element.dataset.increment);
        const currentValue = baseValue + Math.floor(Math.random() * increment);
        
        if (element.dataset.type === 'revenue') {
          element.textContent = '$' + (currentValue / 1000000).toFixed(1) + 'M+';
        } else if (element.dataset.type === 'percentage') {
          element.textContent = currentValue + '%';
        } else {
          element.textContent = currentValue.toLocaleString();
        }
      });
    };
    
    // Update counters periodically
    updateImpactCounters();
    setInterval(updateImpactCounters, 30000); // Update every 30 seconds
  }
}

// Before/After Slider Component
class BeforeAfterSlider {
  constructor(container) {
    this.container = container;
    this.slider = container.querySelector('.ba-slider');
    this.beforeImg = container.querySelector('.ba-before');
    this.afterImg = container.querySelector('.ba-after');
    this.handle = container.querySelector('.ba-handle');
    
    this.init();
  }

  init() {
    if (!this.slider || !this.handle) return;
    
    let isDragging = false;
    
    const updateSlider = (clientX) => {
      const rect = this.container.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      
      this.slider.style.left = percentage + '%';
      this.handle.style.left = percentage + '%';
      this.afterImg.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    };
    
    // Mouse events
    this.handle.addEventListener('mousedown', () => isDragging = true);
    document.addEventListener('mousemove', (e) => {
      if (isDragging) updateSlider(e.clientX);
    });
    document.addEventListener('mouseup', () => isDragging = false);
    
    // Touch events
    this.handle.addEventListener('touchstart', (e) => {
      isDragging = true;
      e.preventDefault();
    });
    document.addEventListener('touchmove', (e) => {
      if (isDragging) updateSlider(e.touches[0].clientX);
    });
    document.addEventListener('touchend', () => isDragging = false);
    
    // Initialize at center
    updateSlider(this.container.getBoundingClientRect().width / 2);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new InteractiveShowcases();
  
  // Initialize all before/after sliders
  document.querySelectorAll('.before-after-container').forEach(container => {
    new BeforeAfterSlider(container);
  });
});