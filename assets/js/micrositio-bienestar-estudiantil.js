/**
 * MICROSITIO BIENESTAR ESTUDIANTIL — SHELL COMPARTIDO
 *
 * Provee a todas las páginas del micrositio:
 * - helpers comunes (escapeHtml, prefersReducedMotion, icon, placeholder)
 * - acordeón accesible de preguntas     → <Faq />
 * - modal y protocolo de emergencia     → <EmergencyDialog />
 *
 * Los landings NO llevan header ni footer: el sitio principal los añade al
 * incrustar la página (ver ARCHITECTURE.md → Estándares).
 *
 * ARQUITECTURA PARA NEXT.JS:
 * `EMERGENCY` es la única fuente del protocolo que se repite en todas las
 * páginas, así no se duplica markup entre archivos. El contenido propio de la
 * portada vive en `bienestar-estudiantil-content.js`.
 *
 * REGLA DE CONTENIDO:
 * Solo información suministrada por la universidad. Lo que falte se marca con
 * un placeholder visible (`.bie-placeholder`), nunca con contenido inventado.
 */
(function () {
    'use strict';

    /* Página de entrada del micrositio: desde el resto de páginas los enlaces
       de ancla deben apuntar a ella. */
    var HOME_PAGE = 'index.html';
    var HOME_ID = 'inicio';

    /* Protocolo de emergencia: se muestra en el modal (todas las páginas) y en
       la página dedicada `emergencia-psicologica.html`. */
    var EMERGENCY = {
        title: 'Emergencia psicológica',
        lead: 'No se requiere cita previa ni formulario. Las emergencias se atienden de inmediato.',
        /* Situaciones que cubre el protocolo institucional. */
        scope: 'Se consideran emergencias psicológicas las crisis de ansiedad aguda, los episodios de descompensación, el riesgo de daño a sí mismo o a terceros y el impacto emocional derivado de un evento crítico en la comunidad universitaria.',
        steps: [
            {
                icon: 'location_on',
                text: 'Acude al Decanato de Bienestar Estudiantil, Edificio 8, primera planta, contiguo a Registro. Lunes a viernes, 8:00 a. m. a 5:00 p. m.'
            },
            {
                icon: 'call',
                text: 'Si no puedes trasladarte, llama al 809-562-6601, ext. 1119.',
                action: { label: 'Llamar al decanato', href: 'tel:+18095626601' }
            },
            {
                icon: 'emergency_home',
                text: 'Fuera del horario de atención o fuera del campus, comunícate con el 9-1-1, sistema nacional de atención a emergencias.',
                urgent: true,
                action: { label: 'Llamar al 9-1-1', href: 'tel:911' }
            },
            {
                icon: 'local_police',
                text: 'Contacto de seguridad universitaria para emergencias dentro del campus fuera de horario.',
                /* Dato señalado como pendiente en la solicitud de información. */
                pending: '[DATO PENDIENTE DE CONFIRMAR]'
            }
        ],
        note: 'Si la persona en riesgo es un compañero, no lo dejes solo y solicita ayuda de inmediato.',
        followUp: 'Concluida la atención inmediata, la Unidad de Orientación y Vida Estudiantil da seguimiento al caso, coordina el referimiento a la atención especializada que corresponda y acompaña la reincorporación académica del estudiante.',
        pageHref: 'emergencia-psicologica.html',
        pageLabel: 'Ver el protocolo completo'
    };

    /* ===================
       HELPERS
       =================== */
    function escapeHtml(text) {
        return String(text === null || typeof text === 'undefined' ? '' : text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function prefersReducedMotion() {
        return typeof window.matchMedia === 'function' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function icon(name, extraClass) {
        return '<span class="material-symbols-outlined' + (extraClass ? ' ' + extraClass : '') +
            '" aria-hidden="true">' + escapeHtml(name) + '</span>';
    }

    function placeholder(text, variant) {
        return '<span class="bie-placeholder' + (variant ? ' bie-placeholder--' + variant : '') + '">' +
            icon('pending') + escapeHtml(text) + '</span>';
    }

    /** Identificador de la página actual, declarado en `<body data-page="...">`. */
    function currentPage() {
        return (document.body && document.body.getAttribute('data-page')) || '';
    }

    /** En las páginas internas los anclajes deben volver a la portada. */
    function anchorHref(id) {
        return (currentPage() === HOME_ID ? '' : HOME_PAGE) + '#' + id;
    }

    /* ===================
       ACORDEÓN DE PREGUNTAS FRECUENTES
       =================== */

    /**
     * Markup del acordeón. La respuesta se etiqueta con el texto de la
     * pregunta, no con el botón completo, para que el nombre accesible no
     * incluya el icono. Sin `answer` se muestra el placeholder.
     */
    function faqMarkup(items, pendingAnswer) {
        return items.map(function (item) {
            var panelId = item.id + '-panel';
            var labelId = item.id + '-label';
            var answer = item.answer
                ? escapeHtml(item.answer)
                : placeholder(pendingAnswer || '[Respuesta pendiente de proporcionar]');

            return '<div class="bst-faq__item">' +
                '<h3>' +
                    '<button type="button" class="bst-faq__question"' +
                        ' aria-expanded="false" aria-controls="' + escapeHtml(panelId) + '">' +
                        '<span id="' + escapeHtml(labelId) + '">' + escapeHtml(item.question) + '</span>' +
                        icon('expand_more', 'bst-faq__chevron') +
                    '</button>' +
                '</h3>' +
                '<div class="bst-faq__answer" id="' + escapeHtml(panelId) + '"' +
                    ' role="region" aria-labelledby="' + escapeHtml(labelId) + '" hidden>' +
                    answer +
                '</div>' +
            '</div>';
        }).join('');
    }

    /** Una sola respuesta abierta a la vez dentro de cada acordeón. */
    function initFaqAccordion(host) {
        if (!host) return;

        host.addEventListener('click', function (event) {
            var button = event.target.closest('.bst-faq__question');
            if (!button) return;

            var panel = document.getElementById(button.getAttribute('aria-controls'));
            if (!panel) return;

            var willOpen = button.getAttribute('aria-expanded') !== 'true';

            host.querySelectorAll('.bst-faq__question[aria-expanded="true"]').forEach(function (other) {
                if (other === button) return;
                other.setAttribute('aria-expanded', 'false');
                var otherPanel = document.getElementById(other.getAttribute('aria-controls'));
                if (otherPanel) {
                    otherPanel.hidden = true;
                }
                var otherItem = other.closest('.bst-faq__item');
                if (otherItem) {
                    otherItem.classList.remove('is-open');
                }
            });

            button.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
            panel.hidden = !willOpen;

            var item = button.closest('.bst-faq__item');
            if (item) {
                item.classList.toggle('is-open', willOpen);
            }
        });
    }

    /* ===================
       EMERGENCIA PSICOLÓGICA
       =================== */
    function emergencySteps() {
        return EMERGENCY.steps.map(function (step) {
            var extra = '';

            if (step.action) {
                extra = '<a class="bie-step__action" href="' + escapeHtml(step.action.href) + '">' +
                    icon('call') + escapeHtml(step.action.label) + '</a>';
            } else if (step.pending) {
                extra = placeholder(step.pending);
            }

            return '<li class="bie-step' + (step.urgent ? ' bie-step--urgent' : '') + '">' +
                '<span class="bie-step__icon">' + icon(step.icon) + '</span>' +
                '<div><p>' + escapeHtml(step.text) + '</p>' + extra + '</div>' +
            '</li>';
        }).join('');
    }

    /** Protocolo completo para la página dedicada. */
    function renderEmergencyPanel() {
        var mount = document.querySelector('[data-bie-emergency-panel]');
        if (!mount) return;

        mount.innerHTML =
            '<p class="bie-modal__lead">' + escapeHtml(EMERGENCY.lead) + '</p>' +
            '<p class="bie-modal__note">' + escapeHtml(EMERGENCY.scope) + '</p>' +
            '<ul class="bie-steps">' + emergencySteps() + '</ul>' +
            '<p class="bie-modal__note">' + escapeHtml(EMERGENCY.note) + '</p>' +
            '<p class="bie-modal__note">' + escapeHtml(EMERGENCY.followUp) + '</p>';
    }

    /**
     * Modal accesible: se crea la primera vez que se abre y queda disponible
     * para el resto de la página.
     */
    function buildEmergencyModal() {
        var modal = document.createElement('div');
        modal.className = 'bie-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'bie-emergency-title');
        modal.hidden = true;
        modal.innerHTML =
            '<div class="bie-modal__panel">' +
                '<div class="bie-modal__head">' +
                    '<h2 class="bie-modal__title" id="bie-emergency-title">' + escapeHtml(EMERGENCY.title) + '</h2>' +
                    '<button type="button" class="bie-modal__close" data-bie-modal-close aria-label="Cerrar">' +
                        icon('close') +
                    '</button>' +
                '</div>' +
                '<p class="bie-modal__lead">' + escapeHtml(EMERGENCY.lead) + '</p>' +
                '<ul class="bie-steps">' + emergencySteps() + '</ul>' +
                '<p class="bie-modal__note">' + escapeHtml(EMERGENCY.note) + '</p>' +
                '<div class="bie-modal__footer">' +
                    '<a class="bie-btn bie-btn--sm bie-btn--outline" href="' + escapeHtml(EMERGENCY.pageHref) + '">' +
                        escapeHtml(EMERGENCY.pageLabel) + icon('arrow_forward') +
                    '</a>' +
                '</div>' +
            '</div>';

        document.body.appendChild(modal);

        var panel = modal.querySelector('.bie-modal__panel');
        var closeBtn = modal.querySelector('[data-bie-modal-close]');
        var lastFocused = null;

        var focusable = function () {
            return Array.prototype.slice.call(
                panel.querySelectorAll('a[href], button:not([disabled])')
            );
        };

        var close = function () {
            modal.hidden = true;
            document.body.style.removeProperty('overflow');
            if (lastFocused && typeof lastFocused.focus === 'function') {
                lastFocused.focus();
            }
        };

        var open = function () {
            lastFocused = document.activeElement;
            modal.hidden = false;
            document.body.style.overflow = 'hidden';
            closeBtn.focus();
        };

        closeBtn.addEventListener('click', close);

        /* Clic en el fondo: cierra sin afectar a los clics dentro del panel. */
        modal.addEventListener('click', function (event) {
            if (event.target === modal) {
                close();
            }
        });

        modal.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                event.preventDefault();
                close();
                return;
            }

            if (event.key !== 'Tab') return;

            /* Retiene el foco dentro del modal mientras está abierto. */
            var items = focusable();
            if (!items.length) return;

            var first = items[0];
            var last = items[items.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        });

        window.bienestarEmergency = { open: open, close: close };
        return window.bienestarEmergency;
    }

    /**
     * Los disparadores se delegan en el documento porque varios se pintan
     * después (botón del hero): así no importa el orden de render.
     */
    function initEmergencyModal() {
        document.addEventListener('click', function (event) {
            var trigger = event.target.closest('[data-bie-emergency-open]');
            if (!trigger) return;

            /* El `href` sigue siendo la alternativa cuando no hay JS. */
            event.preventDefault();
            (window.bienestarEmergency || buildEmergencyModal()).open();
        });
    }

    /* ===================
       ARRANQUE
       =================== */
    function init() {
        renderEmergencyPanel();
        initEmergencyModal();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.MicrositioBienestarEstudiantil = {
        EMERGENCY: EMERGENCY,
        escapeHtml: escapeHtml,
        prefersReducedMotion: prefersReducedMotion,
        icon: icon,
        placeholder: placeholder,
        currentPage: currentPage,
        anchorHref: anchorHref,
        faqMarkup: faqMarkup,
        initFaqAccordion: initFaqAccordion,
        renderEmergencyPanel: renderEmergencyPanel,
        init: init
    };
})();
