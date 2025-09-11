// Revenue Pipeline Calculator

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

function calculateRevenue() {
  // Safely get input values with existence checks
  const monthlyLeadsInput = document.getElementById('monthlyLeads');
  const conversionRateInput = document.getElementById('conversionRate');
  const dealSizeInput = document.getElementById('dealSize');
  
  if (!monthlyLeadsInput || !conversionRateInput || !dealSizeInput) {
    console.log('Revenue calculator inputs not found on this page');
    return;
  }
  
  const monthlyLeads = parseInt(monthlyLeadsInput.value) || 0;
  const conversionRate = parseFloat(conversionRateInput.value) || 0;
  const dealSize = parseInt(dealSizeInput.value) || 0;
  
  // Calculate current monthly revenue
  const currentConversions = (monthlyLeads * conversionRate) / 100;
  const currentRevenue = currentConversions * dealSize;
  
  // Calculate optimized revenue (assuming 2.5x improvement based on industry averages)
  const optimizationMultiplier = 2.5;
  const optimizedRevenue = currentRevenue * optimizationMultiplier;
  
  // Calculate annual impact
  const annualImpact = (optimizedRevenue - currentRevenue) * 12;
  
  // Safely update display with existence checks
  const currentRevenueElement = document.getElementById('currentRevenue');
  const optimizedRevenueElement = document.getElementById('optimizedRevenue');
  const annualImpactElement = document.getElementById('annualImpact');
  
  if (currentRevenueElement) {
    currentRevenueElement.textContent = formatCurrency(currentRevenue);
  }
  if (optimizedRevenueElement) {
    optimizedRevenueElement.textContent = formatCurrency(optimizedRevenue);
  }
  if (annualImpactElement) {
    annualImpactElement.textContent = formatCurrency(annualImpact);
  }
}

// Note: Main initialization is handled in the consolidated DOMContentLoaded handler at the bottom

// Partnership Readiness Quiz (for Strategic Partnerships page)
function calculatePartnershipReadiness() {
  const questions = [
    'partnerValue',
    'resourceCommitment', 
    'partnerProgram',
    'revenueTracking',
    'teamBandwidth'
  ];
  
  let totalScore = 0;
  let answeredQuestions = 0;
  
  questions.forEach(questionId => {
    const answer = document.querySelector(`input[name="${questionId}"]:checked`);
    if (answer) {
      totalScore += parseInt(answer.value) || 0;
      answeredQuestions++;
    }
  });
  
  if (answeredQuestions === questions.length) {
    const score = Math.round((totalScore / (questions.length * 3)) * 100);
    const resultElement = document.getElementById('partnershipScore');
    const recommendationElement = document.getElementById('partnershipRecommendation');
    const quizResults = document.querySelector('.quiz-results');
    
    if (resultElement) {
      resultElement.textContent = score + '%';
    }
    
    if (recommendationElement) {
      let recommendation = '';
      if (score >= 80) {
        recommendation = 'Excellent! You\'re ready to launch a strategic partnership program. Let\'s build your partner ecosystem.';
      } else if (score >= 60) {
        recommendation = 'Good foundation. With some optimization, you can build a successful partnership program.';
      } else {
        recommendation = 'Focus on strengthening your core business first. We can help you prepare for partnerships.';
      }
      recommendationElement.textContent = recommendation;
    }
    
    // Show results section
    if (quizResults) {
      quizResults.style.display = 'block';
    }
  }
}

// AI Maturity Assessment (for AI Implementation page)
function calculateAIMaturity() {
  const questions = [
    'dataQuality',
    'processDocumentation', 
    'teamSkills',
    'technologyStack',
    'changeManagement'
  ];
  
  let totalScore = 0;
  let answeredQuestions = 0;
  
  questions.forEach(questionId => {
    const answer = document.querySelector(`input[name="${questionId}"]:checked`);
    if (answer) {
      totalScore += parseInt(answer.value);
      answeredQuestions++;
    }
  });
  
  if (answeredQuestions === questions.length) {
    const score = Math.round((totalScore / (questions.length * 3)) * 100);
    const resultElement = document.getElementById('aiMaturityScore');
    const recommendationElement = document.getElementById('aiRecommendation');
    
    if (resultElement) {
      resultElement.textContent = score + '%';
    }
    
    if (recommendationElement) {
      let recommendation = '';
      if (score >= 80) {
        recommendation = 'Excellent AI readiness! You\'re prepared for advanced AI implementation across multiple use cases.';
      } else if (score >= 60) {
        recommendation = 'Good foundation. Start with targeted AI pilots in your strongest areas.';
      } else {
        recommendation = 'Focus on data infrastructure and process documentation before AI implementation.';
      }
      recommendationElement.textContent = recommendation;
    }
  }
}

// Cost of Bad Hire Calculator (for Talent Solutions page)
function calculateBadHireImpact() {
  const salary = parseInt(document.getElementById('averageSalary')?.value) || 0;
  const turnoverRate = parseFloat(document.getElementById('turnoverRate')?.value) || 0;
  const teamSize = parseInt(document.getElementById('teamSize')?.value) || 0;
  
  // Industry standard: bad hire costs 2.5x annual salary
  const badHireCost = salary * 2.5;
  const badHiresPerYear = Math.round((teamSize * turnoverRate) / 100);
  const annualImpact = badHireCost * badHiresPerYear;
  
  // Update display
  const costPerHireElement = document.getElementById('costPerBadHire');
  const annualImpactElement = document.getElementById('annualBadHireImpact');
  
  if (costPerHireElement) {
    costPerHireElement.textContent = formatCurrency(badHireCost);
  }
  
  if (annualImpactElement) {
    annualImpactElement.textContent = formatCurrency(annualImpact);
  }
}

// Initialize calculators based on page
function initializePageCalculators() {
  // Revenue Calculator
  if (document.getElementById('monthlyLeads')) {
    const inputs = ['monthlyLeads', 'conversionRate', 'dealSize'];
    inputs.forEach(inputId => {
      const input = document.getElementById(inputId);
      if (input) {
        input.addEventListener('input', calculateRevenue);
        input.addEventListener('change', calculateRevenue);
      }
    });
    calculateRevenue();
  }
  
  // Partnership Quiz
  const partnershipInputs = document.querySelectorAll('input[name^="partner"]');
  if (partnershipInputs.length > 0) {
    partnershipInputs.forEach(input => {
      input.addEventListener('change', calculatePartnershipReadiness);
    });
  }
  
  // AI Maturity Assessment
  const aiInputs = document.querySelectorAll('input[name^="ai"], input[name^="data"], input[name^="process"], input[name^="team"], input[name^="technology"], input[name^="change"]');
  if (aiInputs.length > 0) {
    aiInputs.forEach(input => {
      input.addEventListener('change', calculateAIMaturity);
    });
  }
  
  // Bad Hire Calculator
  if (document.getElementById('averageSalary')) {
    const inputs = ['averageSalary', 'turnoverRate', 'teamSize'];
    inputs.forEach(inputId => {
      const input = document.getElementById(inputId);
      if (input) {
        input.addEventListener('input', calculateBadHireImpact);
        input.addEventListener('change', calculateBadHireImpact);
      }
    });
    calculateBadHireImpact();
  }
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Revenue Calculator (only if elements exist)
  if (document.getElementById('monthlyLeads') && document.getElementById('currentRevenue')) {
    const inputs = ['monthlyLeads', 'conversionRate', 'dealSize'];
    inputs.forEach(inputId => {
      const input = document.getElementById(inputId);
      if (input) {
        input.addEventListener('input', calculateRevenue);
        input.addEventListener('change', calculateRevenue);
      }
    });
    calculateRevenue(); // Safe to call since we verified elements exist
  }
  
  // Initialize Partnership Readiness Quiz (only if quiz elements exist)
  if (document.querySelector('input[name="partnerValue"]')) {
    const partnershipInputs = document.querySelectorAll('input[name="partnerValue"], input[name="resourceCommitment"], input[name="partnerProgram"], input[name="revenueTracking"], input[name="teamBandwidth"]');
    partnershipInputs.forEach(input => {
      input.addEventListener('change', calculatePartnershipReadiness);
    });
  }
  
  // Initialize AI Maturity Assessment (only if AI elements exist)
  if (document.querySelector('input[name="dataQuality"]')) {
    const aiInputs = document.querySelectorAll('input[name="dataQuality"], input[name="processDocumentation"], input[name="teamSkills"], input[name="technologyStack"], input[name="changeManagement"]');
    aiInputs.forEach(input => {
      input.addEventListener('change', calculateAIMaturity);
    });
  }
  
  // Initialize Bad Hire Calculator (only if elements exist)
  if (document.getElementById('averageSalary') && document.getElementById('costPerBadHire')) {
    const inputs = ['averageSalary', 'turnoverRate', 'teamSize'];
    inputs.forEach(inputId => {
      const input = document.getElementById(inputId);
      if (input) {
        input.addEventListener('input', calculateBadHireImpact);
        input.addEventListener('change', calculateBadHireImpact);
      }
    });
    calculateBadHireImpact(); // Safe to call since we verified elements exist
  }
  
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 100; // Account for fixed nav
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Initialize FAQ Accordions
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all FAQ items
      document.querySelectorAll('.faq-item').forEach(faqItem => {
        faqItem.classList.remove('active');
      });
      
      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});