/* ========================================
   ANIMATIONS.JS - ANIMACIONES Y EFECTOS
   ======================================== */

/**
 * Configuración del Intersection Observer para animaciones
 */
const observerConfig = {
    threshold: [0.1, 0.5],
    rootMargin: '0px 0px -100px 0px'
};

/**
 * Inicializa animaciones fade-in para elementos
 */
function initFadeInAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observa todos los elementos con la clase fade-target
    document.querySelectorAll('[data-animate="fade"]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });
}

/**
 * Inicializa animaciones stagger (en cascada)
 */
function initStaggerAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = entry.target.querySelectorAll('[data-stagger]');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('fade-in-up');
                    }, index * 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observa contenedores con stagger
    document.querySelectorAll('[data-stagger-container]').forEach(container => {
        observer.observe(container);
    });
}

/**
 * Paralax effect para imágenes
 */
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
        parallaxElements.forEach(el => {
            const scrollY = window.scrollY;
            const speed = el.dataset.parallax || 0.5;
            el.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

/**
 * Animación de contadores
 */
function animateCounter(element, target, duration = 1000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/**
 * Inicializa animación de números (stats, métricas)
 */
function initNumberAnimations() {
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const value = entry.target.dataset.target;
                if (value) {
                    animateCounter(entry.target, parseInt(value));
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-animate-number]').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Efecto hover para cards
 */
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.card-hover');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.01)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Animación de elementos en timeline
 */
function initTimelineAnimation() {
    const observerOptions = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-timeline-item]').forEach(item => {
        observer.observe(item);
    });
}

/**
 * Inicializa todas las animaciones
 */
function initAllAnimations() {
    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initFadeInAnimations();
            initStaggerAnimations();
            initParallaxEffect();
            initNumberAnimations();
            initCardHoverEffects();
            initTimelineAnimation();
        });
    } else {
        initFadeInAnimations();
        initStaggerAnimations();
        initParallaxEffect();
        initNumberAnimations();
        initCardHoverEffects();
        initTimelineAnimation();
    }
}

// Ejecutar al cargar
initAllAnimations();

// Exportar funciones
window.animationFunctions = {
    initFadeInAnimations,
    initStaggerAnimations,
    initParallaxEffect,
    animateCounter,
    initNumberAnimations,
    initCardHoverEffects,
    initTimelineAnimation,
    initAllAnimations
};
