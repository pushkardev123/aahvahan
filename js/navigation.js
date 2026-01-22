// ============================================
// Aahvahan 2025 - Navigation & Scroll Effects
// ============================================

const Navigation = {
  header: null,
  navLinks: [],
  isScrolling: false,

  init() {
    // Get or create header
    this.header = document.querySelector('header') || document.createElement('header');
    if (!this.header.parentElement) {
      this.header.id = 'main-header';
      this.header.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        background: rgba(0, 0, 0, 0.8);
        padding: 1rem 2rem;
        transition: all 0.3s ease;
      `;
      document.body.insertBefore(this.header, document.body.firstChild);
    }

    // Get all navigation links
    this.navLinks = document.querySelectorAll('a[href^="#"]');
    this.setupSmoothScroll();
  },

  setupSmoothScroll() {
    this.navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });
  },

  handleScroll() {
    const scrollPosition = window.scrollY;

    // Header background intensity
    if (scrollPosition > 100) {
      this.header.style.background = 'rgba(0, 0, 0, 0.95)';
      this.header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    } else {
      this.header.style.background = 'rgba(0, 0, 0, 0.8)';
      this.header.style.boxShadow = 'none';
    }

    // Update active nav link
    this.navLinks.forEach((link) => {
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          link.style.color = '#64c8ff';
          link.style.borderBottom = '2px solid #64c8ff';
        } else {
          link.style.color = 'white';
          link.style.borderBottom = 'none';
        }
      }
    });

    // Fade sections in/out as you scroll
    document.querySelectorAll('section').forEach((section) => {
      const rect = section.getBoundingClientRect();
      const opacity = Math.max(0, Math.min(1, 1 - Math.abs(rect.top - 300) / 500));
      section.style.opacity = opacity;
    });
  },
};

export default Navigation;