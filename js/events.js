/* ====================================
   AAHVAAN'26 - EVENTS CAROUSEL
   War-themed Sports Battles
   ==================================== */

(function () {
    'use strict';

    // DOM Elements
    const eventsContainer = document.getElementById('events-cont');
    const arrowLeft = document.getElementById('evt-arrow-left');
    const arrowRight = document.getElementById('evt-arrow-right');
    const dotsContainer = document.getElementById('event-dots-cont');

    let currentIndex = 0;
    let evtCards = [];
    let autoScrollInterval = null;

    // Initialize
    function init() {
        if (!eventsContainer) return;

        evtCards = Array.from(eventsContainer.querySelectorAll('.evt'));

        if (evtCards.length === 0) return;

        // Create pagination dots
        createDots();

        // Set initial active state
        setActiveCard(0);

        // Arrow click handlers
        if (arrowLeft) {
            arrowLeft.addEventListener('click', () => navigate(-1));
        }

        if (arrowRight) {
            arrowRight.addEventListener('click', () => navigate(1));
        }

        // Touch/swipe support
        initTouchSupport();

        // Keyboard navigation
        initKeyboardNav();

        // Auto-scroll (optional)
        // startAutoScroll();

        // Pause auto-scroll on hover
        eventsContainer.addEventListener('mouseenter', stopAutoScroll);
        eventsContainer.addEventListener('mouseleave', startAutoScroll);
    }

    // Create pagination dots
    function createDots() {
        if (!dotsContainer) return;

        dotsContainer.innerHTML = '';

        evtCards.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'event-dot' + (index === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Go to event ${index + 1}`);
            dot.addEventListener('click', () => goToCard(index));
            dotsContainer.appendChild(dot);
        });
    }

    // Navigate carousel
    function navigate(direction) {
        const newIndex = currentIndex + direction;

        if (newIndex < 0) {
            goToCard(evtCards.length - 1);
        } else if (newIndex >= evtCards.length) {
            goToCard(0);
        } else {
            goToCard(newIndex);
        }
    }

    // Go to specific card
    function goToCard(index) {
        currentIndex = index;
        setActiveCard(index);

        // Scroll to card
        const card = evtCards[index];
        if (card) {
            const containerRect = eventsContainer.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();
            const scrollLeft = card.offsetLeft - (containerRect.width / 2) + (cardRect.width / 2);

            eventsContainer.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }

        // Update dots
        updateDots(index);
    }

    // Set active card styling
    function setActiveCard(index) {
        evtCards.forEach((card, i) => {
            if (i === index) {
                card.classList.add('evt-active');
            } else {
                card.classList.remove('evt-active');
            }
        });
    }

    // Update pagination dots
    function updateDots(activeIndex) {
        if (!dotsContainer) return;

        const dots = dotsContainer.querySelectorAll('.event-dot');
        dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Touch/swipe support
    function initTouchSupport() {
        let startX = 0;
        let endX = 0;

        eventsContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        eventsContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const diff = startX - endX;
            const threshold = 50;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    navigate(1); // Swipe left = next
                } else {
                    navigate(-1); // Swipe right = previous
                }
            }
        }
    }

    // Keyboard navigation
    function initKeyboardNav() {
        const eventsSection = document.getElementById('events');

        if (eventsSection) {
            eventsSection.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    navigate(-1);
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    navigate(1);
                }
            });
        }
    }

    // Auto-scroll functionality
    function startAutoScroll() {
        if (autoScrollInterval) return;

        autoScrollInterval = setInterval(() => {
            navigate(1);
        }, 5000);
    }

    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    }

    // Card click handler - could navigate to event details
    evtCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (!card.classList.contains('evt-active')) {
                goToCard(index);
            } else {
                // Already active - could open event details
                console.log('Event clicked:', card.querySelector('.evt-label')?.textContent);
            }
        });
    });

    // Scroll-based active state detection
    function handleScroll() {
        const containerRect = eventsContainer.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        evtCards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const distance = Math.abs(containerCenter - cardCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        if (closestIndex !== currentIndex) {
            currentIndex = closestIndex;
            setActiveCard(closestIndex);
            updateDots(closestIndex);
        }
    }

    eventsContainer?.addEventListener('scroll', debounce(handleScroll, 100), { passive: true });

    // Debounce utility
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

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();