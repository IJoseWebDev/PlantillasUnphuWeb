/* ========================================
   COMMON.JS - FUNCIONALIDADES COMUNES
   ======================================== */

/**
 * Inicializa scroll suave para enlaces ancla
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

/**
 * Añade listeners a todos los botones CTA
 */
function initCTAButtons() {
    const buttons = document.querySelectorAll('button[data-cta]');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.dataset.cta;
            handleCTA(action);
        });
    });
}

/**
 * Maneja acciones CTA (a completar según lógica del sitio)
 */
function handleCTA(action) {
    console.log(`CTA triggered: ${action}`);
    // Aquí irá la lógica específica del sitio
    // Por ejemplo: abrir modal, redirigir, etc.
}

/**
 * Detecta el scroll y aplica efectos
 */
function initScrollEffects() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                applyScrollEffects();
                ticking = false;
            });
            ticking = true;
        }
    });
}

/**
 * Aplica efectos basados en el scroll
 */
function applyScrollEffects() {
    const scrollY = window.scrollY;
    
    // Aquí irán efectos globales de scroll si es necesario
    // Por ejemplo: parallax, sticky headers, etc.
}

/**
 * Inicializa todas las funcionalidades comunes
 */
function initCommon() {
    document.addEventListener('DOMContentLoaded', function() {
        initSmoothScroll();
        initCTAButtons();
        initScrollEffects();
    });
}

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCommon);
} else {
    initCommon();
}

// Exportar para uso en otros módulos
window.commonFunctions = {
    initSmoothScroll,
    initCTAButtons,
    handleCTA,
    initScrollEffects,
    applyScrollEffects
};
