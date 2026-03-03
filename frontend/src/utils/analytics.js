// Google Analytics & Facebook Pixel Integration

// Initialize Google Analytics
export const initGA = () => {
  const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
  
  if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    // Load gtag.js
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);

    console.log('✅ Google Analytics initialized:', GA_MEASUREMENT_ID);
  } else {
    console.log('⚠️ Google Analytics not configured. Add REACT_APP_GA_MEASUREMENT_ID to .env');
  }
};

// Initialize Facebook Pixel
export const initFBPixel = () => {
  const FB_PIXEL_ID = process.env.REACT_APP_FB_PIXEL_ID || 'YOUR_PIXEL_ID';
  
  if (FB_PIXEL_ID && FB_PIXEL_ID !== 'YOUR_PIXEL_ID') {
    // Load Facebook Pixel
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', FB_PIXEL_ID);
    window.fbq('track', 'PageView');

    console.log('✅ Facebook Pixel initialized:', FB_PIXEL_ID);
  } else {
    console.log('⚠️ Facebook Pixel not configured. Add REACT_APP_FB_PIXEL_ID to .env');
  }
};

// Track custom events
export const trackEvent = (eventName, params = {}) => {
  // Google Analytics
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }

  // Facebook Pixel
  if (window.fbq) {
    window.fbq('trackCustom', eventName, params);
  }

  console.log('📊 Event tracked:', eventName, params);
};

// Track CTA clicks
export const trackCTAClick = (ctaName, ctaLocation) => {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: ctaLocation,
    event_category: 'engagement',
    event_label: ctaName
  });
};

// Track scroll depth
export const initScrollTracking = () => {
  const scrollDepths = [25, 50, 75, 100];
  const tracked = new Set();

  const handleScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    scrollDepths.forEach((depth) => {
      if (scrollPercent >= depth && !tracked.has(depth)) {
        tracked.add(depth);
        trackEvent('scroll_depth', {
          scroll_depth: depth,
          event_category: 'engagement'
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => window.removeEventListener('scroll', handleScroll);
};

// Track time on page
export const trackTimeOnPage = () => {
  const startTime = Date.now();

  const trackTime = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000); // in seconds
    
    trackEvent('time_on_page', {
      time_spent: timeSpent,
      event_category: 'engagement'
    });
  };

  // Track when leaving page
  window.addEventListener('beforeunload', trackTime);

  return () => window.removeEventListener('beforeunload', trackTime);
};
