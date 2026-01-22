/* ====================================
   AAHVAAN'26 - HAMBURGER MENU
   Mobile Navigation
   ==================================== */

(function () {
    'use strict';

    const hamToggle = document.getElementById('ham-toggle');
    const hamGrid = document.getElementById('ham-grid');
    const nav = document.getElementById('nav');

    let isOpen = false;

    function toggleMenu() {
        isOpen = !isOpen;

        if (isOpen) {
            hamToggle?.classList.add('active');
            hamGrid?.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            hamToggle?.classList.remove('active');
            hamGrid?.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    function closeMenu() {
        if (isOpen) {
            isOpen = false;
            hamToggle?.classList.remove('active');
            hamGrid?.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Toggle button click
    hamToggle?.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close when clicking a link
    hamGrid?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) {
            closeMenu();
        }
    });

    // Close when clicking outside (on overlay)
    hamGrid?.addEventListener('click', (e) => {
        if (e.target === hamGrid) {
            closeMenu();
        }
    });

    // Close on resize if menu is open and screen becomes large
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && isOpen) {
            closeMenu();
        }
    });

})();