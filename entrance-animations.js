// ENTRANCE ANIMATIONS ON SCROLL
document.addEventListener('DOMContentLoaded', function() {
  // Intersection Observer for fade-up animations
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-section, .problem-card, .deliverable-card, .case-study-card, .approach-step');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-on-scroll', 'visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach((element) => {
      element.classList.add('animate-on-scroll');
      observer.observe(element);
    });
  };
  
  // Initialize animations if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    animateOnScroll();
  }
});