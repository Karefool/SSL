// Floating CTA Functionality
document.addEventListener("DOMContentLoaded", function() {
  const floatingCta = document.getElementById("floatingCta");
  
  if (!floatingCta) return; // Exit if floating CTA doesn't exist
  
  let hasScrolled30Percent = false;
  
  function updateFloatingCta() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Show after 30% scroll
    if (scrollPercent >= 30 && !hasScrolled30Percent) {
      hasScrolled30Percent = true;
      floatingCta.classList.add("visible");
    }
    
    // Hide near bottom (last 10% of page)
    if (scrollPercent >= 90) {
      floatingCta.classList.remove("visible");
    } else if (hasScrolled30Percent && scrollPercent < 90) {
      floatingCta.classList.add("visible");
    }
  }
  
  // Throttled scroll listener
  let ticking = false;
  window.addEventListener("scroll", function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        updateFloatingCta();
        ticking = false;
      });
      ticking = true;
    }
  });
  
  // Mobile optimization - hide when mobile bottom CTA is visible
  if (window.innerWidth <= 768) {
    const mobileBottomCta = document.querySelector(".mobile-bottom-cta");
    if (mobileBottomCta) {
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.target.classList.contains("visible")) {
            floatingCta.style.display = "none";
          } else {
            floatingCta.style.display = "block";
          }
        });
      });
      observer.observe(mobileBottomCta, { attributes: true, attributeFilter: ["class"] });
    }
  }
});