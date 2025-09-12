// Qualification Form Functionality
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('qualificationForm');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      // Basic validation
      const requiredFields = ['companyName', 'role', 'companyStage', 'primaryChallenge', 'urgency', 'email'];
      const missingFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');
      
      if (missingFields.length > 0) {
        alert('Please fill in all required fields.');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // Simulate form submission
      const submitButton = form.querySelector('.form-submit');
      const originalText = submitButton.textContent;
      
      submitButton.textContent = 'Submitting...';
      submitButton.disabled = true;
      
      // Simulate API call delay
      setTimeout(() => {
        // In a real implementation, you would send this data to your backend
        console.log('Form submission data:', data);
        
        // Show success message
        alert('Thank you! We\'ll be in touch within 2 business hours during ET business days.');
        
        // Reset form
        form.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 1500);
    });
  }
});