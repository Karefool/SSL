// Sophisticated Navigation JavaScript
class NavigationController {
  constructor() {
    this.nav = document.getElementById('mainNav');
    this.navToggle = document.getElementById('navToggle');
    this.navMenu = document.getElementById('navMenu');
    this.init();
  }

  init() {
    this.setActiveLink();
    this.handleScroll();
    this.handleMobileToggle();
    this.handleDropdowns();
  }

  setActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && (currentPath.endsWith(href) || (currentPath === '/' && href === 'index.html'))) {
        link.classList.add('active');
      }
    });
  }

  handleScroll() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      // Add scrolled class for blur effect
      if (currentScrollY > 50) {
        this.nav.classList.add('scrolled');
      } else {
        this.nav.classList.remove('scrolled');
      }
      
      lastScrollY = currentScrollY;
    });
  }

  handleMobileToggle() {
    this.navToggle.addEventListener('click', () => {
      this.navToggle.classList.toggle('active');
      this.navMenu.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (this.navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.nav.contains(e.target) && this.navMenu.classList.contains('active')) {
        this.navToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Close menu on window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        this.navToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  handleDropdowns() {
    // Close dropdowns when clicking outside (desktop)
    document.addEventListener('click', (e) => {
      const dropdowns = document.querySelectorAll('.nav-dropdown');
      dropdowns.forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove('active');
        }
      });
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new NavigationController();
});