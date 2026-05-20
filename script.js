// ── Smooth scroll for nav links ──────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // account for sticky nav + stripe bar
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
        // Close mobile menu if open
        const navCollapse = document.querySelector('#navbarNav');
        if (navCollapse && navCollapse.classList.contains('show')) {
            navCollapse.classList.remove('show');
        }
    });
});

// ── Active nav link on scroll ─────────────────────────────────────────────────
function updateActiveNav() {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ── Parallax hero ─────────────────────────────────────────────────────────────
function parallaxHero() {
    const heroContent = document.querySelector('.hero .container');
    const heroCrest   = document.querySelector('.hero-crest');
    if (!heroContent) return;

    const scrolled = window.scrollY;
    const maxScroll = window.innerHeight * 0.8;
    const ratio = Math.min(scrolled / maxScroll, 1);

    heroContent.style.transform = `translateY(${scrolled * 0.28}px)`;
    heroContent.style.opacity   = 1 - ratio * 0.85;

    if (heroCrest) {
        heroCrest.style.transform = `translateY(calc(-50% + ${scrolled * 0.12}px))`;
    }
}

// ── Scroll reveal ─────────────────────────────────────────────────────────────
function setupReveal() {
    const revealEls = document.querySelectorAll(
        '.work-card, .media-item, .bio-text, .bio-image, .resume-container > *'
    );

    revealEls.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${(i % 4) * 80}ms`;
    });

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(el => observer.observe(el));
}

// ── Navbar shadow on scroll ───────────────────────────────────────────────────
function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    if (window.scrollY > 30) {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.35)';
    } else {
        navbar.style.boxShadow = 'none';
    }
}

// ── Wrap social link text in spans for hover effect ───────────────────────────
function wrapSocialLinks() {
    document.querySelectorAll('.social-link').forEach(link => {
        if (!link.querySelector('span')) {
            link.innerHTML = `<span>${link.innerHTML}</span>`;
        }
    });
}

// ── Throttle helper ───────────────────────────────────────────────────────────
function throttle(fn, ms) {
    let last = 0;
    return function (...args) {
        const now = Date.now();
        if (now - last >= ms) { last = now; fn.apply(this, args); }
    };
}

// ── Event listeners ───────────────────────────────────────────────────────────
const onScroll = throttle(() => {
    updateActiveNav();
    parallaxHero();
    updateNavbar();
}, 16);

window.addEventListener('scroll', onScroll, { passive: true });

// ── Init on DOM ready ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    setupReveal();
    wrapSocialLinks();
    updateActiveNav();
    updateNavbar();
});
