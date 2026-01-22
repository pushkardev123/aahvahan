/* ====================================
   AAHVAAN'26 - LOADER SCRIPT
   Epic Kurukshetra Battlefield Entrance
   ==================================== */

(function() {
    'use strict';

    const loader = document.getElementById('loader');
    const loaderProgress = document.getElementById('loader-progress');
    const loaderClick = document.getElementById('loader-click');
    
    let progress = 0;
    let isReady = false;
    
    // Simulate loading progress
    function updateProgress() {
        if (progress < 100) {
            // Accelerating progress curve
            const increment = Math.random() * 15 + 5;
            progress = Math.min(progress + increment, 100);
            
            if (loaderProgress) {
                loaderProgress.style.width = progress + '%';
            }
            
            if (progress < 100) {
                setTimeout(updateProgress, 200 + Math.random() * 300);
            } else {
                isReady = true;
                if (loaderClick) {
                    loaderClick.style.animation = 'pulseAppear 0.5s ease-out forwards, goldenPulse 2s ease-in-out 0.5s infinite';
                }
            }
        }
    }
    
    // Start loading animation
    setTimeout(updateProgress, 500);
    
    // Handle click to enter
    function enterBattlefield() {
        if (!isReady) return;
        
        // Add exit animation class
        loader.classList.add('exiting');
        
        // Remove loader after animation
        setTimeout(() => {
            loader.classList.add('hidden');
            loader.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Trigger hero animations
            triggerHeroAnimations();
        }, 1500);
    }
    
    // Click handler
    if (loader) {
        loader.addEventListener('click', enterBattlefield);
    }
    
    // Keyboard handler (Enter or Space)
    document.addEventListener('keydown', function(e) {
        if ((e.key === 'Enter' || e.key === ' ') && isReady && !loader.classList.contains('exiting')) {
            e.preventDefault();
            enterBattlefield();
        }
    });
    
    // Trigger hero section animations after loader exits
    function triggerHeroAnimations() {
        // Fade in hero elements with staggered timing
        const heroElements = [
            { selector: '.hero-title, #aahvahan-main', delay: 0 },
            { selector: '.hero-year', delay: 200 },
            { selector: '.hero-tagline', delay: 400 },
            { selector: '.time', delay: 600 },
            { selector: '.regist', delay: 800 },
            { selector: '.socials', delay: 1000 },
            { selector: '.scroll-indicator', delay: 1200 }
        ];
        
        heroElements.forEach(({ selector, delay }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, delay);
            });
        });
        
        // Initialize particles after loader exits
        if (typeof initParticles === 'function') {
            initParticles();
        }
    }
    
    // Prevent scrolling while loader is active
    document.body.style.overflow = 'hidden';
    
})();