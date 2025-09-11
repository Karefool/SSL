// Mobile Excellence JavaScript - Superior Mobile Experience
class MobileExcellence {
  constructor() {
    this.isMobile = window.innerWidth <= 768;
    this.init();
  }

  init() {
    if (this.isMobile) {
      this.initTouchNavigation();
      this.initSwipeableCards();
      this.initCollapsibleSections();
      this.initFixedBottomCTA();
      this.initClickToCall();
      this.initNativeShare();
      this.initTouchFeedback();
      this.initMobileOptimizations();
    }
    
    // Listen for orientation changes
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.handleOrientationChange();
      }, 100);
    });
  }

  // Thumb-Friendly Navigation
  initTouchNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    
    if (navToggle && navMenu) {
      navToggle.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.toggleMobileMenu();
      });
      
      navToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleMobileMenu();
      });
    }
    
    // Handle dropdown toggles
    dropdownTriggers.forEach(trigger => {
      trigger.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.toggleDropdown(trigger.closest('.nav-dropdown'));
      });
    });
    
    // Close menu when clicking links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      if (!link.classList.contains('dropdown-trigger')) {
        link.addEventListener('touchstart', () => {
          setTimeout(() => {
            this.closeMobileMenu();
          }, 200);
        });
      }
    });
  }
  
  toggleMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  }
  
  closeMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  toggleDropdown(dropdown) {
    dropdown.classList.toggle('active');
  }

  // Swipeable Case Study Cards
  initSwipeableCards() {
    const caseGallery = document.querySelector('.case-gallery');
    if (!caseGallery) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;
    
    caseGallery.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - caseGallery.offsetLeft;
      scrollLeft = caseGallery.scrollLeft;
    });
    
    caseGallery.addEventListener('touchend', () => {
      isDown = false;
      this.updateSwipeIndicators();
    });
    
    caseGallery.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.touches[0].pageX - caseGallery.offsetLeft;
      const walk = (x - startX) * 2;
      caseGallery.scrollLeft = scrollLeft - walk;
    });
    
    // Add scroll indicators
    this.addSwipeIndicators();
    
    // Update indicators on scroll
    caseGallery.addEventListener('scroll', () => {
      this.updateSwipeIndicators();
    });
  }
  
  addSwipeIndicators() {
    const caseGallery = document.querySelector('.case-gallery');
    const caseCards = document.querySelectorAll('.case-card');
    
    if (!caseGallery || caseCards.length === 0) return;
    
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'swipe-indicator';
    
    caseCards.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.className = 'swipe-dot';
      if (index === 0) dot.classList.add('active');
      indicatorsContainer.appendChild(dot);
    });
    
    caseGallery.parentNode.insertBefore(indicatorsContainer, caseGallery.nextSibling);
  }
  
  updateSwipeIndicators() {
    const caseGallery = document.querySelector('.case-gallery');
    const dots = document.querySelectorAll('.swipe-dot');
    const caseCards = document.querySelectorAll('.case-card');
    
    if (!caseGallery || dots.length === 0) return;
    
    const scrollLeft = caseGallery.scrollLeft;
    const cardWidth = caseCards[0]?.offsetWidth + 16; // Include gap
    const activeIndex = Math.round(scrollLeft / cardWidth);
    
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeIndex);
    });
  }

  // Collapsible Sections
  initCollapsibleSections() {
    // Convert regular sections to collapsible on mobile
    this.convertToCollapsible('.process-step', 'step-title', 'step-details');
    
    // Handle collapsible interactions
    const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
    collapsibleHeaders.forEach(header => {
      header.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.toggleCollapsible(header.closest('.mobile-collapsible'));
      });
      
      header.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleCollapsible(header.closest('.mobile-collapsible'));
      });
    });
  }
  
  convertToCollapsible(selector, titleSelector, contentSelector) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
      if (element.classList.contains('mobile-collapsible')) return;
      
      const title = element.querySelector(`.${titleSelector}`)?.textContent;
      const content = element.querySelector(`.${contentSelector}`);
      
      if (!title || !content) return;
      
      // Wrap in collapsible structure
      element.classList.add('mobile-collapsible');
      
      const header = document.createElement('div');
      header.className = 'collapsible-header';
      header.innerHTML = `
        <h3 class="collapsible-title">${title}</h3>
        <div class="collapsible-arrow"></div>
      `;
      
      const contentWrapper = document.createElement('div');
      contentWrapper.className = 'collapsible-content';
      
      const innerWrapper = document.createElement('div');
      innerWrapper.className = 'collapsible-inner';
      innerWrapper.appendChild(content.cloneNode(true));
      
      contentWrapper.appendChild(innerWrapper);
      
      element.innerHTML = '';
      element.appendChild(header);
      element.appendChild(contentWrapper);
    });
  }
  
  toggleCollapsible(collapsible) {
    collapsible.classList.toggle('active');
  }

  // Fixed Bottom CTA Bar
  initFixedBottomCTA() {
    // Create bottom CTA if it doesn't exist
    if (!document.querySelector('.mobile-bottom-cta')) {
      this.createBottomCTA();
    }
    
    const bottomCTA = document.querySelector('.mobile-bottom-cta');
    if (!bottomCTA) return;
    
    let lastScrollTop = 0;
    let isVisible = false;
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show when scrolled past hero
      const shouldShow = scrollTop > windowHeight * 0.5 && 
                        scrollTop < documentHeight - windowHeight - 100;
      
      if (shouldShow && !isVisible) {
        bottomCTA.classList.add('visible');
        isVisible = true;
      } else if (!shouldShow && isVisible) {
        bottomCTA.classList.remove('visible');
        isVisible = false;
      }
      
      lastScrollTop = scrollTop;
    });
  }
  
  createBottomCTA() {
    const bottomCTA = document.createElement('div');
    bottomCTA.className = 'mobile-bottom-cta';
    bottomCTA.innerHTML = `
      <div class="bottom-cta-content">
        <div class="bottom-cta-text">
          <div class="bottom-cta-title">Ready to Scale?</div>
          <div class="bottom-cta-subtitle">Get your revenue audit</div>
        </div>
        <a href="contact.html#strategy-call" class="bottom-cta-button touch-feedback">
          Let's Talk
        </a>
      </div>
    `;
    
    document.body.appendChild(bottomCTA);
  }

  // Click-to-Call Functionality
  initClickToCall() {
    // Add click-to-call buttons where appropriate
    const contactSection = document.querySelector('.cta-homepage');
    if (contactSection && !document.querySelector('.mobile-phone-cta')) {
      const phoneButton = document.createElement('a');
      phoneButton.href = 'tel:+1-555-REVENUE';
      phoneButton.className = 'mobile-phone-cta touch-feedback mobile-only';
      phoneButton.innerHTML = `
        <span class="phone-icon">📞</span>
        Call Now: (555) REVENUE
      `;
      
      const ctaButtons = contactSection.querySelector('.cta-buttons');
      if (ctaButtons) {
        ctaButtons.appendChild(phoneButton);
      }
    }
  }

  // Native Share Functionality
  initNativeShare() {
    if (!navigator.share) return;
    
    // Add share buttons to case studies and key pages
    const shareData = {
      title: document.title,
      text: document.querySelector('meta[name="description"]')?.content || '',
      url: window.location.href
    };
    
    const caseCards = document.querySelectorAll('.case-card');
    caseCards.forEach(card => {
      if (card.querySelector('.mobile-share-btn')) return;
      
      const shareButton = document.createElement('button');
      shareButton.className = 'mobile-share-btn touch-feedback';
      shareButton.innerHTML = `
        <span class="share-icon">📤</span>
        Share
      `;
      
      shareButton.addEventListener('click', async () => {
        try {
          await navigator.share(shareData);
        } catch (err) {
          console.log('Error sharing:', err);
        }
      });
      
      const cardContent = card.querySelector('.case-content');
      if (cardContent) {
        cardContent.appendChild(shareButton);
      }
    });
  }

  // Touch Feedback
  initTouchFeedback() {
    const touchElements = document.querySelectorAll('.touch-feedback');
    
    touchElements.forEach(element => {
      element.addEventListener('touchstart', (e) => {
        this.createRipple(e, element);
      });
    });
  }
  
  createRipple(event, element) {
    const circle = element.querySelector('.ripple');
    const diameter = Math.max(element.clientHeight, element.clientWidth);
    const radius = diameter / 2;
    
    if (circle) {
      circle.remove();
    }
    
    const ripple = document.createElement('span');
    ripple.style.width = ripple.style.height = diameter + 'px';
    ripple.style.left = (event.touches[0].clientX - element.offsetLeft - radius) + 'px';
    ripple.style.top = (event.touches[0].clientY - element.offsetTop - radius) + 'px';
    ripple.className = 'ripple';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Mobile-Specific Optimizations
  initMobileOptimizations() {
    // Lazy load images on mobile
    this.initLazyLoading();
    
    // Optimize scroll performance
    this.optimizeScrolling();
    
    // Handle viewport changes
    this.handleViewportChanges();
    
    // Preload critical resources
    this.preloadCriticalResources();
  }
  
  initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      images.forEach(img => {
        img.src = img.dataset.src;
      });
    }
  }
  
  optimizeScrolling() {
    let ticking = false;
    
    const updateScrollElements = () => {
      // Update scroll-dependent elements efficiently
      this.updateParallaxElements();
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollElements);
        ticking = true;
      }
    });
  }
  
  updateParallaxElements() {
    // Simplified parallax for mobile performance
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    const scrollTop = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.parallax || 0.5;
      const yPos = -(scrollTop * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }
  
  handleViewportChanges() {
    // Handle iOS viewport unit issues
    const setViewportHeight = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', () => {
      setTimeout(setViewportHeight, 100);
    });
  }
  
  preloadCriticalResources() {
    // Preload critical resources for better performance
    const criticalImages = [
      '/assets/hero-bg-mobile.jpg',
      '/assets/logo.png'
    ];
    
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }
  
  handleOrientationChange() {
    // Recalculate dimensions and update UI
    this.isMobile = window.innerWidth <= 768;
    
    // Close mobile menu if orientation changes
    this.closeMobileMenu();
    
    // Update swipe indicators
    setTimeout(() => {
      this.updateSwipeIndicators();
    }, 200);
    
    // Recalculate viewport
    this.handleViewportChanges();
  }
}

// Form Enhancement for Mobile
class MobileFormEnhancer {
  constructor() {
    this.init();
  }
  
  init() {
    this.enhanceContactForm();
    this.addSmartDefaults();
    this.improveInputExperience();
  }
  
  enhanceContactForm() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      if (window.innerWidth <= 768) {
        form.classList.add('mobile-form');
        this.optimizeFormInputs(form);
      }
    });
  }
  
  optimizeFormInputs(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.classList.add('mobile-form-input');
      
      // Add proper input types for mobile
      if (input.name === 'email') {
        input.type = 'email';
        input.autocomplete = 'email';
      } else if (input.name === 'phone') {
        input.type = 'tel';
        input.autocomplete = 'tel';
      } else if (input.name === 'name') {
        input.autocomplete = 'name';
      }
      
      // Add proper keyboard hints
      if (input.type === 'email') {
        input.inputMode = 'email';
      } else if (input.type === 'tel') {
        input.inputMode = 'tel';
      }
    });
    
    const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
    if (submitButton) {
      submitButton.classList.add('mobile-form-submit');
    }
  }
  
  addSmartDefaults() {
    // Add smart defaults based on context
    const companyInput = document.querySelector('input[name="company"]');
    if (companyInput && !companyInput.value) {
      // Could pre-fill based on referrer or other context
    }
    
    const industrySelect = document.querySelector('select[name="industry"]');
    if (industrySelect) {
      // Add most common options at the top
      const commonOptions = ['SaaS', 'Healthcare', 'FinTech', 'HR Tech'];
      commonOptions.forEach(option => {
        const optionElement = Array.from(industrySelect.options).find(o => o.text === option);
        if (optionElement) {
          industrySelect.insertBefore(optionElement, industrySelect.options[1]);
        }
      });
    }
  }
  
  improveInputExperience() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      // Auto-expand textareas
      if (input.tagName === 'TEXTAREA') {
        input.addEventListener('input', () => {
          input.style.height = 'auto';
          input.style.height = input.scrollHeight + 'px';
        });
      }
      
      // Add floating labels
      this.addFloatingLabel(input);
    });
  }
  
  addFloatingLabel(input) {
    if (input.parentNode.classList.contains('floating-label-group')) return;
    
    const wrapper = document.createElement('div');
    wrapper.className = 'floating-label-group';
    
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);
    
    const label = document.createElement('label');
    label.textContent = input.placeholder || input.name;
    label.className = 'floating-label';
    wrapper.appendChild(label);
    
    input.addEventListener('focus', () => {
      wrapper.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        wrapper.classList.remove('focused');
      }
    });
    
    if (input.value) {
      wrapper.classList.add('focused');
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new MobileExcellence();
  new MobileFormEnhancer();
});

// Handle resize events
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Reinitialize if screen size changes significantly
    const isMobileNow = window.innerWidth <= 768;
    if (window.mobileExcellence?.isMobile !== isMobileNow) {
      window.mobileExcellence = new MobileExcellence();
    }
  }, 250);
});