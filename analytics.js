// Analytics Event Tracking
// Handles data-event attributes for conversion tracking

(function() {
  'use strict';

  // Analytics tracking function
  function trackEvent(eventName, eventData) {
    console.log('Analytics Event:', eventName, eventData);
    
    // Google Analytics 4 (gtag) tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, eventData);
    }
    
    // Google Universal Analytics (ga) fallback
    if (typeof ga !== 'undefined') {
      ga('send', 'event', eventData.event_category || 'Engagement', eventName, eventData.event_label);
    }
    
    // Facebook Pixel tracking
    if (typeof fbq !== 'undefined') {
      fbq('track', 'CustomEvent', { 
        event_name: eventName,
        ...eventData 
      });
    }
    
    // Generic dataLayer push for other tracking systems
    if (typeof dataLayer !== 'undefined') {
      dataLayer.push({
        event: 'custom_event',
        event_name: eventName,
        ...eventData
      });
    }
  }

  // Initialize event listeners when DOM is ready
  function initializeAnalytics() {
    // Track all elements with data-event attributes
    document.addEventListener('click', function(e) {
      const element = e.target.closest('[data-event]');
      if (!element) return;

      const eventName = element.dataset.event;
      const eventData = {
        event_category: 'CTA',
        page_location: window.location.href,
        page_title: document.title
      };

      // Add additional data attributes to event
      Object.keys(element.dataset).forEach(key => {
        if (key !== 'event') {
          eventData[key] = element.dataset[key];
        }
      });

      // Add element context
      eventData.element_text = element.textContent.trim();
      eventData.element_href = element.href || null;
      eventData.element_id = element.id || null;
      eventData.element_class = element.className || null;

      // Track the event
      trackEvent(eventName, eventData);
    });

    // Track form submissions
    document.addEventListener('submit', function(e) {
      const form = e.target;
      if (form.dataset.event) {
        const eventName = form.dataset.event;
        const eventData = {
          event_category: 'Form',
          form_id: form.id || null,
          page_location: window.location.href,
          page_title: document.title
        };

        trackEvent(eventName, eventData);
      }
    });

    // Track page views
    trackEvent('page_view', {
      event_category: 'Page View',
      page_location: window.location.href,
      page_title: document.title,
      page_referrer: document.referrer
    });

    console.log('Analytics tracking initialized');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAnalytics);
  } else {
    initializeAnalytics();
  }
})();