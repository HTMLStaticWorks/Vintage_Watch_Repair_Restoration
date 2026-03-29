/**
 * Restore — Vintage Watch Repair & Restoration
 * Global Javascript
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRTL();
    initNavigation();
    initBackToTop();
    initScrollReveal();
    setActiveLink();
});

// 1. Theme Toggle
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.theme-toggle');
        if (btn) {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        }
    });
}

function updateThemeIcon(theme) {
    document.querySelectorAll('.theme-toggle i').forEach(icon => {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });
}

// 2. RTL Toggle
function initRTL() {
    const savedDir = localStorage.getItem('direction') || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);
    
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.rtl-toggle');
        if (btn) {
            const currentDir = document.documentElement.getAttribute('dir');
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
            document.documentElement.setAttribute('dir', newDir);
            localStorage.setItem('direction', newDir);
        }
    });
}

// 3. Navigation
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Hamburger animation
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -7px)';
                document.body.style.overflow = 'hidden'; // Prevent scroll when menu is open
            } else {
                resetHamburger(spans);
            }
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                resetHamburger(hamburger.querySelectorAll('span'));
            });
        });
    }

    function resetHamburger(spans) {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        document.body.style.overflow = 'auto';
    }

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// 4. Back to Top
function initBackToTop() {
    const btt = document.querySelector('.back-to-top');
    if (!btt) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btt.classList.add('visible');
        } else {
            btt.classList.remove('visible');
        }
    });
    
    btt.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 5. Scroll Reveal
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// 6. Set Active Link
function setActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            // Check if on a home sub-variant
            if (currentPath === 'story.html' && linkPath === 'story.html') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

// 7. Comparison Slider helper
function initComparisonSlider(container) {
    const slider = container.querySelector('.slider-handle');
    const beforeImage = container.querySelector('.before-image');
    if (!slider || !beforeImage) return;

    let isResizing = false;

    const startResize = () => isResizing = true;
    const endResize = () => isResizing = false;
    
    const onMove = (e) => {
        if (!isResizing) return;
        let rect = container.getBoundingClientRect();
        let x = (e.pageX || e.touches[0].pageX) - rect.left - window.scrollX;
        let position = (x / rect.width) * 100;
        
        if (position < 0) position = 0;
        if (position > 100) position = 100;
        
        beforeImage.style.width = position + '%';
        slider.style.left = position + '%';
    };

    slider.addEventListener('mousedown', startResize);
    window.addEventListener('mouseup', endResize);
    window.addEventListener('mousemove', onMove);
    
    slider.addEventListener('touchstart', startResize);
    window.addEventListener('touchend', endResize);
    window.addEventListener('touchmove', onMove);
}

