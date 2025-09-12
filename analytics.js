// Analytics Event Tracking
// Handles data-event attributes for conversion tracking
//
// PRODUCTION SETUP INSTRUCTIONS:
// 1. In index.html, replace "G-XXXXXXXXXX" with your actual GA4 Measurement ID
// 2. Set enableConsoleLogging to false for production
// 3. Your actual GA4 Measurement ID can be found in Google Analytics:
//    Analytics → Admin → Data Streams → Web → Measurement ID
//
// EXAMPLE PRODUCTION CONFIG:
// Replace both instances of "G-XXXXXXXXXX" in index.html with something like "G-1A2B3C4D5E"

(function() {
  'use strict';

  // Production analytics configuration
  const ANALYTICS_CONFIG = {
    enableConsoleLogging: false, // PRODUCTION: Set to false in production to disable console logs
    enableDataLayer: true,
    maxRetries: 3,
    retryDelay: 1000
  };

  // Analytics tracking function with error handling
  function trackEvent(eventName, eventData) {
    if (!eventName || typeof eventName !== 'string') {
      console.warn('Analytics: Invalid event name:', eventName);
      return;
    }

    // Always log for debugging (disable in production by setting enableConsoleLogging to false)
    if (ANALYTICS_CONFIG.enableConsoleLogging) {
      console.log('Analytics Event:', eventName, eventData);
    }
    
    // Safe event data preparation
    const safeEventData = {
      event_category: 'Engagement',
      ...eventData,
      timestamp: Date.now(),
      page_url: window.location.href,
      page_title: document.title
    };

    // Google Analytics 4 (gtag) tracking with error handling
    try {
      if (typeof gtag !== 'undefined' && gtag) {
        // Convert our event structure to GA4 format
        const ga4EventData = {
          'event_category': safeEventData.event_category || 'Engagement',
          'event_label': safeEventData.event_label || null,
          'value': safeEventData.value || null,
          'cta_location': safeEventData.ctaLocation || safeEventData.cta_location || null,
          'page_location': safeEventData.page_url,
          'page_title': safeEventData.page_title,
          'custom_parameter_1': safeEventData.event_category,
          'custom_parameter_2': safeEventData.ctaLocation || safeEventData.cta_location
        };
        
        // Remove null values for cleaner GA4 data
        Object.keys(ga4EventData).forEach(key => {
          if (ga4EventData[key] === null || ga4EventData[key] === undefined) {
            delete ga4EventData[key];
          }
        });
        
        gtag('event', eventName, ga4EventData);
        
        if (ANALYTICS_CONFIG.enableConsoleLogging) {
          console.log('Analytics: GA4 event sent:', eventName, ga4EventData);
        }
      } else if (ANALYTICS_CONFIG.enableConsoleLogging) {
        console.log('Analytics: GA4 not loaded, event not sent:', eventName);
      }
    } catch (error) {
      console.warn('Analytics: GA4 error:', error);
    }
    
    // Google Universal Analytics (ga) fallback with error handling
    try {
      if (typeof ga !== 'undefined' && ga) {
        ga('send', 'event', safeEventData.event_category, eventName, safeEventData.event_label);
      }
    } catch (error) {
      console.warn('Analytics: GA error:', error);
    }
    
    // Facebook Pixel tracking with error handling
    try {
      if (typeof fbq !== 'undefined' && fbq) {
        fbq('track', 'CustomEvent', { 
          event_name: eventName,
          ...safeEventData 
        });
      }
    } catch (error) {
      console.warn('Analytics: Facebook Pixel error:', error);
    }
    
    // Generic dataLayer push for other tracking systems with error handling
    try {
      if (ANALYTICS_CONFIG.enableDataLayer && typeof dataLayer !== 'undefined' && dataLayer) {
        dataLayer.push({
          event: 'custom_event',
          event_name: eventName,
          ...safeEventData
        });
      }
    } catch (error) {
      console.warn('Analytics: DataLayer error:', error);
    }
  }

  // Initialize event listeners when DOM is ready
  function initializeAnalytics() {
    try {
      // Track all elements with data-event attributes
      document.addEventListener('click', function(e) {
        try {
          const element = e.target.closest('[data-event]');
          if (!element) return;

          const eventName = element.dataset.event;
          if (!eventName) return;

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

          // Add element context safely
          try {
            eventData.element_text = element.textContent ? element.textContent.trim() : '';
            eventData.element_href = element.href || null;
            eventData.element_id = element.id || null;
            eventData.element_class = element.className || null;
          } catch (error) {
            console.warn('Analytics: Error getting element context:', error);
          }

          // Track the event
          trackEvent(eventName, eventData);
        } catch (error) {
          console.warn('Analytics: Click tracking error:', error);
        }
      });

      // Track form submissions
      document.addEventListener('submit', function(e) {
        try {
          const form = e.target;
          if (form && form.dataset && form.dataset.event) {
            const eventName = form.dataset.event;
            const eventData = {
              event_category: 'Form',
              form_id: form.id || null,
              page_location: window.location.href,
              page_title: document.title
            };

            trackEvent(eventName, eventData);
          }
        } catch (error) {
          console.warn('Analytics: Form tracking error:', error);
        }
      });

      // Track page views
      trackEvent('page_view', {
        event_category: 'Page View',
        page_location: window.location.href,
        page_title: document.title,
        page_referrer: document.referrer || '',
        user_agent: navigator.userAgent || '',
        screen_resolution: screen.width + 'x' + screen.height,
        viewport_size: window.innerWidth + 'x' + window.innerHeight
      });

      console.log('Analytics tracking initialized');
    } catch (error) {
      console.error('Analytics: Initialization error:', error);
    }
  }

  // Safe initialization when DOM is ready
  try {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeAnalytics);
    } else {
      initializeAnalytics();
    }
  } catch (error) {
    console.error('Analytics: Failed to initialize:', error);
  }
})();