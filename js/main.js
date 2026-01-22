/* ====================================
   AAHVAAN'26 - MAIN SCRIPT
   Core Functionality & Animations
   ==================================== */

(function () {
  'use strict';

  // ========================================
  // NAVIGATION SCROLL EFFECT
  // ========================================
  const nav = document.getElementById('nav');

  function handleNavScroll() {
    if (window.scrollY > 50) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();

        // Close hamburger menu if open
        const hamGrid = document.getElementById('ham-grid');
        const hamToggle = document.getElementById('ham-toggle');
        if (hamGrid?.classList.contains('active')) {
          hamGrid.classList.remove('active');
          hamToggle?.classList.remove('active');
        }

        // Smooth scroll to target
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ========================================
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // ========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');

        // Stagger child animations
        const children = entry.target.querySelectorAll('.animate-child');
        children.forEach((child, index) => {
          child.style.transitionDelay = `${index * 100}ms`;
          child.classList.add('animate-in');
        });
      }
    });
  }, observerOptions);

  // Observe sections
  document.querySelectorAll('.sec-head').forEach(section => {
    section.classList.add('animate-section');
    animateOnScroll.observe(section);
  });

  // ========================================
  // PARALLAX EFFECT FOR HERO
  // ========================================
  function handleParallax() {
    const scrollY = window.scrollY;
    const hero = document.querySelector('.home-page');

    if (hero && scrollY < window.innerHeight) {
      const bgMain = document.getElementById('bgMain');
      const text = document.querySelector('.text');
      const time = document.querySelector('.time');

      // Parallax layers at different speeds
      if (bgMain) {
        bgMain.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
      if (text) {
        text.style.transform = `translateY(${scrollY * 0.5}px)`;
        text.style.opacity = 1 - (scrollY / window.innerHeight) * 1.5;
      }
      if (time) {
        time.style.transform = `translateY(${scrollY * 0.4}px)`;
        time.style.opacity = 1 - (scrollY / window.innerHeight) * 1.5;
      }
    }
  }

  window.addEventListener('scroll', handleParallax, { passive: true });

  // ========================================
  // CURSOR GLOW EFFECT (Desktop Only)
  // ========================================
  if (window.matchMedia('(min-width: 1024px)').matches) {
    const heroPage = document.querySelector('.home-page');

    if (heroPage) {
      heroPage.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        heroPage.style.setProperty('--cursor-x', `${x}px`);
        heroPage.style.setProperty('--cursor-y', `${y}px`);
      });
    }
  }

  // ========================================
  // STATS COUNTER ANIMATION
  // ========================================
  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      // Format number
      if (target >= 1000) {
        element.textContent = Math.floor(current).toLocaleString() + '+';
      } else {
        element.textContent = Math.floor(current) + (target > 1 ? '+' : '');
      }
    }, 16);
  }

  // Observe stat elements
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector('.about-stat-number');
        if (statNumber && !statNumber.dataset.animated) {
          const text = statNumber.textContent;
          const target = parseInt(text.replace(/\D/g, ''));

          if (!isNaN(target)) {
            statNumber.dataset.animated = 'true';
            animateCounter(statNumber, target);
          }
        }
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.about-stat').forEach(stat => {
    statsObserver.observe(stat);
  });

  // ========================================
  // GOLDEN GLOW ON HOVER (Cards)
  // ========================================
  document.querySelectorAll('.war-card, .contDiv, .evt').forEach(card => {
    card.addEventListener('mouseenter', function (e) {
      this.style.setProperty('--hover-x', `${e.offsetX}px`);
      this.style.setProperty('--hover-y', `${e.offsetY}px`);
    });

    card.addEventListener('mousemove', function (e) {
      this.style.setProperty('--hover-x', `${e.offsetX}px`);
      this.style.setProperty('--hover-y', `${e.offsetY}px`);
    });
  });

  // ========================================
  // PRELOAD CRITICAL IMAGES
  // ========================================
  function preloadImages() {
    const images = [
      // Add critical image paths here
    ];

    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  // ========================================
  // INITIALIZE
  // ========================================
  document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    handleNavScroll();

    // Add loaded class to body
    document.body.classList.add('loaded');
  });

  // ========================================
  // ACCESSIBILITY: Reduce motion
  // ========================================
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-epic', '0ms');
    document.documentElement.style.setProperty('--transition-slow', '0ms');

    // Disable particle animations
    const emberOverlay = document.getElementById('ember-overlay');
    if (emberOverlay) {
      emberOverlay.style.display = 'none';
    }

    const arrowRain = document.getElementById('arrow-rain');
    if (arrowRain) {
      arrowRain.style.display = 'none';
    }
  }

})();