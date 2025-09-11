// Rolling Industry Text Animation for SMB Positioning
class RollingTextAnimation {
  constructor(element, options = {}) {
    this.element = element;
    this.words = options.words || [];
    this.duration = options.duration || 2000;
    this.currentIndex = 0;
    this.isAnimating = false;
    
    if (this.words.length > 0) {
      this.init();
    }
  }
  
  init() {
    // Set initial word
    this.element.textContent = this.words[0];
    
    // Start the animation cycle
    setTimeout(() => {
      this.startCycle();
    }, this.duration);
  }
  
  startCycle() {
    if (this.isAnimating) return;
    
    setInterval(() => {
      this.animateToNext();
    }, this.duration);
  }
  
  animateToNext() {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    
    // Get next word
    this.currentIndex = (this.currentIndex + 1) % this.words.length;
    const nextWord = this.words[this.currentIndex];
    
    // Fade out current word
    this.element.style.transition = 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    this.element.style.opacity = '0';
    this.element.style.transform = 'translateY(-10px)';
    
    // Change text and fade in
    setTimeout(() => {
      this.element.textContent = nextWord;
      this.element.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        this.element.style.opacity = '1';
        this.element.style.transform = 'translateY(0)';
        
        setTimeout(() => {
          this.isAnimating = false;
        }, 300);
      }, 50);
    }, 300);
  }
}

// Initialize rolling text animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Hero industry animation
  const heroIndustry = document.getElementById('rolling-industry');
  if (heroIndustry) {
    new RollingTextAnimation(heroIndustry, {
      words: ['SaaS', 'Healthcare', 'FinTech', 'HR Tech', 'Insurance', 'Logistics', 'E-commerce', 'Professional Services', 'Manufacturing'],
      duration: 2500
    });
  }
  
  // Hero growth stage animation  
  const heroGrowthStage = document.getElementById('rolling-growth-stage');
  if (heroGrowthStage) {
    new RollingTextAnimation(heroGrowthStage, {
      words: ['venture-backed', 'bootstrapped', 'PE-backed', 'family-owned', 'Series A', 'Series B', 'profitable'],
      duration: 3000
    });
  }
  
  // Service area animation
  const serviceArea = document.getElementById('rolling-service');
  if (serviceArea) {
    new RollingTextAnimation(serviceArea, {
      words: ['Revenue Architecture', 'Strategic Partnerships', 'AI Implementation', 'Design & UX', 'Talent Solutions'],
      duration: 2800
    });
  }
});