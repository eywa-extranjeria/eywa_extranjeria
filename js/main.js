// ============================================
// EYWA EXTRANJERÍA - JAVASCRIPT PRINCIPAL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // MENÚ MÓVIL
    // ============================================
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeMenuBtn = document.getElementById('close-menu');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);
    }
    
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMenu);
    }
    
    function toggleMenu() {
        if (!mobileMenu.classList.contains('active')) {
            mobileMenu.classList.add('active');
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
            document.body.style.overflow = 'hidden';
        } else {
            closeMenu();
        }
    }
    
    function closeMenu() {
        mobileMenu.classList.remove('active');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
        document.body.style.overflow = '';
    }
    
    // Cerrar al redimensionar a desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) closeMenu();
    });
    
    // ============================================
    // SCROLL REVEAL (Animaciones al hacer scroll)
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        revealObserver.observe(el);
    });
    
    // ============================================
    // NAVEGACIÓN FIJA Y BOTÓN VOLVER ARRIBA
    // ============================================
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        // Sombra en navbar
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-md');
        } else {
            navbar.classList.remove('shadow-md');
        }
        
        // Botón volver arriba
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // ============================================
    // FAQ ACORDEÓN
    // ============================================
    window.toggleFaq = function(element) {
        const faqItem = element.closest('.faq-item');
        const isActive = faqItem.classList.contains('active');
        
        // Cerrar todos
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Abrir el clicado si no estaba activo
        if (!isActive) {
            faqItem.classList.add('active');
        }
    };
    
    // ============================================
    // CONTADOR DE ESTADÍSTICAS
    // ============================================
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.counter');
                    counters.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-target'));
                        const duration = 2000;
                        const increment = target / (duration / 16);
                        let current = 0;
                        
                        const updateCounter = () => {
                            current += increment;
                            if (current < target) {
                                counter.textContent = Math.floor(current) + '+';
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.textContent = target + '+';
                            }
                        };
                        
                        updateCounter();
                    });
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterObserver.observe(statsSection);
    }
    
    // ============================================
    // PREVENIR ZOOM EN DOBLE TAP (MÓVIL)
    // ============================================
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
});