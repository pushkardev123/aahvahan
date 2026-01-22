/* ====================================
   AAHVAAN'26 - COUNTDOWN TIMER
   Epic War Timer with Effects
   ==================================== */

(function () {
    'use strict';

    // Set the event date - AAHVAAN'26
    // Adjust this date as needed
    const eventDate = new Date('2026-03-15T09:00:00').getTime();

    // DOM Elements
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minEl = document.getElementById('min');
    const secEl = document.getElementById('sec');
    const lightningEl = document.querySelector('.timer-lightning');

    // Previous second for animation trigger
    let prevSec = -1;

    // Add leading zero
    function pad(num) {
        return num < 10 ? '0' + num : num;
    }

    // Trigger lightning effect
    function triggerLightning() {
        if (lightningEl) {
            lightningEl.style.animation = 'none';
            lightningEl.offsetHeight; // Force reflow
            lightningEl.style.animation = 'lightningFlash 0.5s ease';
        }
    }

    // Update timer
    function updateTimer() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            // Event has started!
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minEl) minEl.textContent = '00';
            if (secEl) secEl.textContent = '00';
            return;
        }

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update DOM
        if (daysEl) daysEl.textContent = pad(days);
        if (hoursEl) hoursEl.textContent = pad(hours);
        if (minEl) minEl.textContent = pad(minutes);
        if (secEl) secEl.textContent = pad(seconds);

        // Trigger effects on second change
        if (seconds !== prevSec) {
            prevSec = seconds;

            // Lightning flash every 10 seconds
            if (seconds % 10 === 0) {
                triggerLightning();
            }

            // Add pulse animation to seconds
            if (secEl) {
                secEl.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    secEl.style.transform = 'scale(1)';
                }, 100);
            }
        }
    }

    // Start timer
    function initTimer() {
        updateTimer();
        setInterval(updateTimer, 1000);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTimer);
    } else {
        initTimer();
    }

})();