/* ========================================
   UTILS.JS - FUNCIONES UTILITARIAS
   ======================================== */

/**
 * Valida email
 */
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Formatea número con separador de miles
 */
function formatNumber(num) {
    return new Intl.NumberFormat('es-DO').format(num);
}

/**
 * Obtiene parámetro de URL
 */
function getUrlParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

/**
 * Guarda dato en localStorage
 */
function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

/**
 * Obtiene dato de localStorage
 */
function getFromStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

/**
 * Elimina dato de localStorage
 */
function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing from localStorage:', error);
        return false;
    }
}

/**
 * Debounce - evita ejecución múltiple de función
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle - limita ejecución de función
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Clona profundamente un objeto
 */
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Verifica si elemento está visible en viewport
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Obtiene altura de elemento
 */
function getElementHeight(el) {
    return el.offsetHeight;
}

/**
 * Obtiene posición de elemento relativo al documento
 */
function getElementOffset(el) {
    let top = 0, left = 0;
    let element = el;
    while (element) {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    }
    return { top, left };
}

/**
 * Añade clase temporalmente
 */
function addClassTemporarily(el, className, duration = 1000) {
    el.classList.add(className);
    setTimeout(() => {
        el.classList.remove(className);
    }, duration);
}

/**
 * Obtiene contraste de color (útil para accesibilidad)
 */
function getContrastYIQ(hexcolor) {
    const r = parseInt(hexcolor.substr(1, 2), 16);
    const g = parseInt(hexcolor.substr(3, 2), 16);
    const b = parseInt(hexcolor.substr(5, 2), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return (yiq >= 128) ? 'dark' : 'light';
}

/**
 * Delay promise (await)
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Log con timestamp
 */
function logWithTime(message) {
    const now = new Date().toLocaleTimeString('es-DO');
    console.log(`[${now}] ${message}`);
}

/**
 * Copia texto al portapapeles
 */
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Texto copiado al portapapeles');
        });
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

/**
 * Obtiene información del navegador
 */
function getBrowserInfo() {
    return {
        userAgent: navigator.userAgent,
        language: navigator.language,
        onLine: navigator.onLine,
        cookieEnabled: navigator.cookieEnabled,
        deviceMemory: navigator.deviceMemory,
        hardwareConcurrency: navigator.hardwareConcurrency
    };
}

/**
 * Genera ID único
 */
function generateUniqueId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Exportar utilidades
window.utils = {
    validateEmail,
    formatNumber,
    getUrlParameter,
    saveToStorage,
    getFromStorage,
    removeFromStorage,
    debounce,
    throttle,
    deepClone,
    isElementInViewport,
    getElementHeight,
    getElementOffset,
    addClassTemporarily,
    getContrastYIQ,
    delay,
    logWithTime,
    copyToClipboard,
    getBrowserInfo,
    generateUniqueId
};
