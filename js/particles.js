/* ====================================
   AAHVAAN'26 - PARTICLE SYSTEM
   Ember & Arrow Animations
   ==================================== */

(function () {
  'use strict';

  // Configuration
  const config = {
    embers: {
      count: 30,
      minSize: 2,
      maxSize: 5,
      colors: ['#FF4500', '#FF6B35', '#D4AF37', '#FFD700'],
      minDuration: 6,
      maxDuration: 12
    },
    arrows: {
      enabled: false, // Arrows are handled in CSS
      count: 15
    }
  };

  // Ember container
  const emberOverlay = document.getElementById('ember-overlay');

  // Create ember particle
  function createEmber(container) {
    const ember = document.createElement('div');
    ember.className = 'ember';

    // Random properties
    const size = Math.random() * (config.embers.maxSize - config.embers.minSize) + config.embers.minSize;
    const left = Math.random() * 100;
    const duration = Math.random() * (config.embers.maxDuration - config.embers.minDuration) + config.embers.minDuration;
    const delay = Math.random() * 5;
    const color = config.embers.colors[Math.floor(Math.random() * config.embers.colors.length)];

    ember.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            bottom: -10px;
            background: ${color};
            border-radius: 50%;
            box-shadow: 0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}50;
            animation: emberFloat ${duration}s linear ${delay}s infinite;
            pointer-events: none;
            opacity: 0;
        `;

    container.appendChild(ember);
    return ember;
  }

  // Initialize ember particles
  function initEmbers() {
    if (!emberOverlay) return;

    // Clear existing embers
    emberOverlay.innerHTML = '';

    // Create new embers
    for (let i = 0; i < config.embers.count; i++) {
      createEmber(emberOverlay);
    }
  }

  // Performance optimization - reduce particles on mobile
  function adjustForPerformance() {
    if (window.innerWidth < 768) {
      config.embers.count = 15;
    } else if (window.innerWidth < 1024) {
      config.embers.count = 20;
    } else {
      config.embers.count = 30;
    }
  }

  // Scroll-based parallax for particles
  function handleScroll() {
    const scrollY = window.scrollY;
    const heroHeight = document.querySelector('.home-page')?.offsetHeight || window.innerHeight;

    // Fade out particles as user scrolls past hero
    if (emberOverlay) {
      const opacity = Math.max(0, 1 - (scrollY / heroHeight) * 1.5);
      emberOverlay.style.opacity = opacity;
    }
  }

  // Visibility-based optimization
  function handleVisibility() {
    if (document.hidden) {
      // Pause animations when tab is not visible
      if (emberOverlay) {
        emberOverlay.style.animationPlayState = 'paused';
      }
    } else {
      if (emberOverlay) {
        emberOverlay.style.animationPlayState = 'running';
      }
    }
  }

  // Initialize
  function init() {
    adjustForPerformance();
    initEmbers();

    // Event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => {
      adjustForPerformance();
      initEmbers();
    });
    document.addEventListener('visibilitychange', handleVisibility);
  }

  // Expose init function globally
  window.initParticles = init;

  // Auto-initialize after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();