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
    
    // Theme toggle buttons (could be multiple if inside mobile menu)
    document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
        updateThemeIcon(savedTheme);
    });
}

function updateThemeIcon(theme) {
    document.querySelectorAll('.theme-toggle i').forEach(icon => {
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    });
}

// 2. RTL Toggle
function initRTL() {
    const savedDir = localStorage.getItem('direction') || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);
    
    document.querySelectorAll('.rtl-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir');
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
            document.documentElement.setAttribute('dir', newDir);
            localStorage.setItem('direction', newDir);
        });
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
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 12, 8, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.height = '70px';
        } else {
            navbar.style.background = 'var(--bg-dark)';
            navbar.style.backdropFilter = 'none';
            navbar.style.height = '80px';
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
            link.classList.remove('active');
        }
    });
}

// 7. Comparison Slider helper (to be used in index.html, portfolio.html)
function initComparisonSlider(container) {
    const slider = container.querySelector('.slider-handle');
    const beforeImage = container.querySelector('.before-image');
    let isResizing = false;

    slider.addEventListener('mousedown', () => isResizing = true);
    window.addEventListener('mouseup', () => isResizing = false);
    window.addEventListener('mousemove', (e) => {
        if (!isResizing) return;
        let rect = container.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let position = (x / rect.width) * 100;
        
        if (position < 0) position = 0;
        if (position > 100) position = 100;
        
        beforeImage.style.width = position + '%';
        slider.style.left = position + '%';
    });
    
    // Touch support
    slider.addEventListener('touchstart', () => isResizing = true);
    window.addEventListener('touchend', () => isResizing = false);
    window.addEventListener('touchmove', (e) => {
        if (!isResizing) return;
        let rect = container.getBoundingClientRect();
        let x = e.touches[0].clientX - rect.left;
        let position = (x / rect.width) * 100;
        
        if (position < 0) position = 0;
        if (position > 100) position = 100;
        
        beforeImage.style.width = position + '%';
        slider.style.left = position + '%';
    });
}
