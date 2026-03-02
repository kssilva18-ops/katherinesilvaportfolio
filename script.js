/**
 * Katherine Silva Portfolio Logic
 * Handles Smooth Scrolling, Navbar Transitions, and Reveal Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Scroll Effect
    // Shrinks the navbar and adds a shadow when user scrolls down
    const nav = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.padding = "0.7rem 0";
            nav.style.backgroundColor = "var(--navy)"; // Ensures solid color on scroll
            nav.style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)";
        } else {
            nav.style.padding = "1.5rem 0";
            nav.style.boxShadow = "none";
        }
    });

    // 2. Sophisticated Fade-In Reveal
    // Elements glide up and fade in as they enter the viewport
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, revealOptions);

    // Target all sections and cards for the reveal
    const elementsToReveal = document.querySelectorAll('section, .work-card, .bio-image');
    
    elementsToReveal.forEach(el => {
        el.classList.add('reveal-element'); // Apply initial hidden state
        revealOnScroll.observe(el);
    });

    // 3. Editorial Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
});