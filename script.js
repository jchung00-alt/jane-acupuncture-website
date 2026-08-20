/* ========================================
   Jane Acupuncture - Interactive Features
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {

    // -----------------------------------------
    // Mobile Navigation Toggle
    // -----------------------------------------
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav__link');
    const body = document.body;

    const FOCUSABLE = 'a[href], button:not([disabled])';

    function setMenuState(open) {
        navToggle.classList.toggle('active', open);
        navMenu.classList.toggle('active', open);
        navToggle.setAttribute('aria-expanded', String(open));
        navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
        body.style.overflow = open ? 'hidden' : '';
    }

    function isMenuOpen() {
        return navMenu.classList.contains('active');
    }

    function openMenu() {
        setMenuState(true);
        const first = navMenu.querySelector(FOCUSABLE);
        if (first) first.focus();
    }

    function closeMenu(returnFocus) {
        const wasOpen = isMenuOpen();
        setMenuState(false);
        if (wasOpen && returnFocus && navToggle) navToggle.focus();
    }

    function toggleMenu() {
        if (isMenuOpen()) closeMenu(true); else openMenu();
    }

    if (navToggle) {
        navToggle.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() { closeMenu(false); });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (!isMenuOpen()) return;

        if (e.key === 'Escape') {
            closeMenu(true);
            return;
        }

        if (e.key === 'Tab') {
            const items = Array.from(navMenu.querySelectorAll(FOCUSABLE));
            if (!items.length) return;
            const first = items[0];
            const last = items[items.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen() &&
            !navMenu.contains(e.target) &&
            !navToggle.contains(e.target)) {
            closeMenu(false);
        }
    });

    // -----------------------------------------
    // Header Scroll Effect
    // -----------------------------------------
    const header = document.getElementById('header');

    // -----------------------------------------
    // Smooth Scroll for Anchor Links
    // -----------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // -----------------------------------------
    // Scroll Reveal Animation
    // -----------------------------------------
    const revealElements = document.querySelectorAll(
        '.section__header, .about__content, .about__images, ' +
        '.service-card, .practitioner__image, .practitioner__content, ' +
        '.testimonial, .contact__centered'
    );

    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // -----------------------------------------
    // Staggered Animation for Service Cards
    // -----------------------------------------
    const serviceCards = document.querySelectorAll('.service-card');

    const staggerObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    serviceCards.forEach(card => {
        staggerObserver.observe(card);
    });

    // -----------------------------------------
    // Active Navigation Highlight
    // -----------------------------------------
    const sections = document.querySelectorAll('section[id]');

    // Geometry is measured once and on resize, never inside the scroll handler —
    // reading offsetTop/offsetHeight mid-scroll forces a synchronous layout.
    let sectionBounds = [];

    function measureSections() {
        sectionBounds = Array.from(sections).map(section => ({
            link: document.querySelector(`.nav__link[href="#${section.getAttribute('id')}"]`),
            top: section.offsetTop - 100,
            bottom: section.offsetTop - 100 + section.offsetHeight
        })).filter(entry => entry.link);
    }

    function highlightNavigation(scrollY) {
        sectionBounds.forEach(entry => {
            entry.link.classList.toggle('active', scrollY > entry.top && scrollY <= entry.bottom);
        });
    }

    // -----------------------------------------
    // Parallax Effect for Hero Background
    // -----------------------------------------
    const heroBg = document.querySelector('.hero__bg');
    const allowParallax = heroBg && window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

    // One listener, one rAF, one write per frame — replaces three independent
    // scroll handlers that interleaved layout reads with style writes.
    let ticking = false;

    function onFrame() {
        const scrollY = window.pageYOffset;

        if (header) header.classList.toggle('scrolled', scrollY > 50);
        highlightNavigation(scrollY);
        if (allowParallax) heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;

        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            ticking = true;
            window.requestAnimationFrame(onFrame);
        }
    }

    measureSections();
    onFrame();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function() {
        measureSections();
        onScroll();
    }, { passive: true });
    window.addEventListener('load', measureSections);

    // -----------------------------------------
    // Lazy Loading Images Enhancement
    // -----------------------------------------
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // -----------------------------------------
    // Condition Tags Interaction
    // -----------------------------------------
    const conditionTags = document.querySelectorAll('.condition-tag');

    conditionTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Scroll to contact section when clicking a condition
            const contactSection = document.getElementById('contact');

            if (contactSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize loaded state for images without data-src
    document.querySelectorAll('img:not([data-src])').forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => img.classList.add('loaded'));
        }
    });

});
