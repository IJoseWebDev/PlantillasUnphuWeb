/* ========================================
   CONFIG.JS - CONFIGURACIÓN GLOBAL
   ======================================== */

/**
 * Configuración centralizada del proyecto
 */

const CONFIG = {
    // Información del sitio
    site: {
        name: 'UNPHU',
        title: 'UNPHU - Universidad Profesional',
        description: 'Portal de Programas Académicos',
        url: window.location.origin,
        email: 'info@unphu.edu.do',
        phone: '+1-809-XXX-XXXX'
    },

    // Colores de la marca
    colors: {
        primary: '#156b1d',
        secondary: '#3c6185',
        tertiary: '#056a39',
        unphuGreen: '#439441',
        unphuBlue: '#0A3859',
        unphuDark: '#006837'
    },

    // URLs y rutas
    paths: {
        assets: '../assets',
        images: '../assets/images',
        css: '../assets/css',
        js: '../assets/js'
    },

    // APIs y endpoints (configurar según entorno)
    api: {
        baseUrl: process.env.API_URL || 'https://api.unphu.edu.do',
        endpoints: {
            contact: '/api/contacto',
            subscribe: '/api/suscribirse',
            inquiry: '/api/solicitud'
        },
        timeout: 10000 // milisegundos
    },

    // Configuración de localStorage
    storage: {
        prefix: 'unphu_',
        ttl: 24 * 60 * 60 * 1000 // 24 horas
    },

    // Configuración de animaciones
    animations: {
        duration: 300,
        easeFunctions: {
            easeOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)'
        }
    },

    // Configuración de validación
    validation: {
        minPasswordLength: 8,
        maxInputLength: 255,
        phoneLengthDO: 10 // República Dominicana
    },

    // Configuración de logs
    logging: {
        enabled: true,
        level: 'info', // 'error', 'warn', 'info', 'debug'
        prefix: '[UNPHU]'
    },

    // Mapeo de modales
    modals: {
        contacto: 'modalContacto',
        suscripcion: 'modalSuscripcion'
    },

    // Configuración de SEO
    seo: {
        ogImage: '/assets/images/og-image.png',
        twitterHandle: '@UNPHU',
        keywords: ['UNPHU', 'educación', 'universidad', 'programas académicos']
    }
};

/**
 * Obtiene valor de configuración
 */
function getConfig(path) {
    return path.split('.').reduce((obj, key) => obj?.[key], CONFIG);
}

/**
 * Establece valor de configuración
 */
function setConfig(path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((obj, key) => obj[key] = obj[key] || {}, CONFIG);
    target[lastKey] = value;
}

/**
 * Obtiene URL de asset
 */
function getAssetUrl(assetPath) {
    return `${CONFIG.paths.assets}/${assetPath}`;
}

/**
 * Log con nivel de severidad
 */
function log(message, level = 'info', data = null) {
    if (!CONFIG.logging.enabled) return;

    const logLevels = { error: 0, warn: 1, info: 2, debug: 3 };
    const currentLevel = logLevels[CONFIG.logging.level] || 2;

    if (logLevels[level] <= currentLevel) {
        const prefix = `${CONFIG.logging.prefix} [${level.toUpperCase()}]`;
        if (data) {
            console.log(`${prefix} ${message}`, data);
        } else {
            console.log(`${prefix} ${message}`);
        }
    }
}

/**
 * Log de error
 */
function logError(message, error = null) {
    log(message, 'error', error);
}

/**
 * Log de advertencia
 */
function logWarn(message, data = null) {
    log(message, 'warn', data);
}

/**
 * Log de información
 */
function logInfo(message, data = null) {
    log(message, 'info', data);
}

/**
 * Log de debug
 */
function logDebug(message, data = null) {
    log(message, 'debug', data);
}

/**
 * Obtiene color de la marca
 */
function getBrandColor(colorName) {
    return CONFIG.colors[colorName] || null;
}

/**
 * Valida configuración en tiempo de ejecución
 */
function validateConfig() {
    const requiredFields = [
        'site.name',
        'colors.primary',
        'api.baseUrl'
    ];

    const missing = requiredFields.filter(field => !getConfig(field));

    if (missing.length > 0) {
        logError('Campos de configuración faltantes:', missing);
        return false;
    }

    return true;
}

// Exportar configuración
window.CONFIG = CONFIG;
window.configFunctions = {
    getConfig,
    setConfig,
    getAssetUrl,
    log,
    logError,
    logWarn,
    logInfo,
    logDebug,
    getBrandColor,
    validateConfig
};

// Validar configuración al cargar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', validateConfig);
} else {
    validateConfig();
}

// Log inicial
logInfo('Configuración cargada correctamente');
