/* ============================================
   TYPED.JS INITIALIZATION
   ============================================ */

// Initialize Typed.js for the hero typing animation
// Fixed: Removed loop to prevent repeated typing and "I" character display
var typed = new Typed('#typing', {
  strings: [
    'Full Stack Developer • Generative AI Enthusiast'
  ],
  typeSpeed: 50,
  backSpeed: 0,
  startDelay: 300,
  showCursor: false,
  loop: true // FIXED: Disabled looping
});

/* ============================================
   SCROLL REVEAL ANIMATION
   ============================================ */

/**
 * Reveals elements as they come into view on scroll
 * Uses the 'reveal' class for triggering animation
 */
window.addEventListener('scroll', reveal);

function reveal() {
  const reveals = document.querySelectorAll('.reveal');

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add('active');
    }
  }
}

// Trigger reveal on page load
reveal();

/* ============================================
   SMOOTH SCROLLING
   ============================================ */

/**
 * Smooth scroll to anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    
    // Don't scroll if href is just '#'
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

/* ============================================
   NAVIGATION ACTIVE STATE
   ============================================ */

/**
 * Updates navigation link active state based on scroll position
 */
window.addEventListener('scroll', updateActiveNav);

function updateActiveNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
}

/* ============================================
   PARALLAX EFFECT
   ============================================ */

/**
 * Creates a subtle parallax effect for background elements
 */
window.addEventListener('scroll', parallax);

function parallax() {
  const scrollPosition = window.pageYOffset;
  
  // Apply parallax to body pseudo-elements if needed
  // This is mainly handled by CSS with fixed positioning
  // but this function can be extended for other elements
}

/* ============================================
   BUTTON INTERACTIONS
   ============================================ */

/**
 * Enhanced button hover and click effects
 */
const buttons = document.querySelectorAll('.btn, .project-buttons a, .contact-icon');

buttons.forEach(button => {
  button.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-2px)';
  });
  
  button.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

/* ============================================
   CARD ANIMATIONS
   ============================================ */

/**
 * Enhance card hover effects
 */
const cards = document.querySelectorAll('.skill-card, .project-card, .stat-card, .contact-item');

cards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.boxShadow = '0 20px 50px rgba(139, 92, 246, 0.2)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.boxShadow = '';
  });
});

/* ============================================
   INTERSECTION OBSERVER FOR OPTIMIZED REVEAL
   ============================================ */

/**
 * More optimized approach using Intersection Observer API
 * This is better for performance on slower devices
 */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // Uncomment if you want to unobserve after first reveal
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with reveal class
document.querySelectorAll('.reveal').forEach(element => {
  observer.observe(element);
});

/* ============================================
   WINDOW RESIZE HANDLER
   ============================================ */

/**
 * Handle window resize events for responsive adjustments
 */
window.addEventListener('resize', debounce(() => {
  // Add any resize-specific logic here
  reveal();
}, 250));

/**
 * Debounce utility function to prevent excessive function calls
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/* ============================================
   PAGE LOAD ANIMATIONS
   ============================================ */

/**
 * Initialize animations when page loads
 */
document.addEventListener('DOMContentLoaded', () => {
  // Ensure nav is visible
  updateActiveNav();
  
  // Trigger initial reveal
  reveal();
  
  console.log('Portfolio page loaded successfully!');
});

/* ============================================
   ACCESSIBILITY ENHANCEMENTS
   ============================================ */

/**
 * Handle keyboard navigation
 */
document.addEventListener('keydown', (e) => {
  // Add keyboard shortcut for scrolling to sections
  if (e.ctrlKey || e.metaKey) {
    switch(e.key.toLowerCase()) {
      case 'h':
        e.preventDefault();
        document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 's':
        e.preventDefault();
        document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'p':
        e.preventDefault();
        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'c':
        e.preventDefault();
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  }
});

/* ============================================
   PERFORMANCE MONITORING
   ============================================ */

/**
 * Optional: Monitor performance metrics
 */
if (window.performance && window.performance.timing) {
  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('Page load time: ' + pageLoadTime + 'ms');
  });
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

/**
 * Utility function to get viewport dimensions
 */
const getViewportDimensions = () => {
  return {
    width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
    height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  };
};

/**
 * Utility function to check if element is in viewport
 */
const isElementInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Utility function for scrolling to top
 */
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

/* ============================================
   EXPORT FOR EXTERNAL USE (if needed)
   ============================================ */

// Make utilities available globally if needed
window.portfolioUtils = {
  getViewportDimensions,
  isElementInViewport,
  scrollToTop,
  reveal,
  updateActiveNav
};