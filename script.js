// Custom cursor
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
});

function lerp(a, b, t) { return a + (b - a) * t; }
function animateRing() {
    rx = lerp(rx, mx, 0.12);
    ry = lerp(ry, my, 0.12);
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        dot.style.transform = 'translate(-50%,-50%) scale(2)';
        ring.style.width = '56px';
        ring.style.height = '56px';
        ring.style.borderColor = 'rgba(200,169,110,0.8)';
    });
    el.addEventListener('mouseleave', () => {
        dot.style.transform = 'translate(-50%,-50%) scale(1)';
        ring.style.width = '36px';
        ring.style.height = '36px';
        ring.style.borderColor = 'rgba(200,169,110,0.5)';
    });
});

// Navbar scroll
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Reveal on scroll
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-left').forEach(el => observer.observe(el));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
        }
    });
});
