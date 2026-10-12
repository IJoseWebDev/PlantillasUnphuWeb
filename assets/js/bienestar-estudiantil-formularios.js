/**
 * BIENESTAR ESTUDIANTIL — FORMULARIOS DEL MICROSITIO
 *
 * Da comportamiento a los formularios de `solicitar-cita.html` y
 * `referir-estudiante.html`. El markup de los campos vive en el HTML para que
 * las páginas funcionen y sean navegables sin JavaScript.
 *
 * Responsabilidades:
 * - validación en tiempo real y al enviar (delega en `forms.js`)
 * - validación de las casillas obligatorias, que `forms.js` no cubre
 * - mensaje de estado del envío
 *
 * ARQUITECTURA PARA NEXT.JS / DASHBOARD:
 * `submitRequest` es el único punto que debe cambiar al conectar el backend
 * (Firebase, API del decanato o servicio de correo). Mientras no exista
 * endpoint, el formulario NO simula un envío correcto: muestra un placeholder
 * visible con la vía de contacto alternativa.
 */
(function () {
    'use strict';

    var shell = window.MicrositioBienestarEstudiantil || {};
    var forms = window.formFunctions;

    var escapeHtml = shell.escapeHtml || function (text) {
        return String(text === null || typeof text === 'undefined' ? '' : text);
    };

    var icon = shell.icon || function (name) {
        return '<span class="material-symbols-outlined" aria-hidden="true">' + escapeHtml(name) + '</span>';
    };

    /* Endpoint pendiente: sustituir por la ruta real del dashboard. */
    var ENDPOINT = null;

    var MESSAGES = {
        pendingEndpoint: '[ENVÍO PENDIENTE DE CONEXIÓN]',
        pendingDetail: 'El formulario está listo, pero aún no hay sistema receptor conectado. Escribe a orientacion@unphu.edu.do o llama al 809-562-6601, ext. 1119. También puedes escribir al decanato: bienestarestudiantil@unphu.edu.do, ext. 1122 y 1123.',
        success: 'Recibimos tu solicitud. El decanato te contactará por tu correo institucional.',
        consentRequired: 'Debes marcar esta casilla para continuar.'
    };

    function statusMount(form) {
        return form.querySelector('[data-form-status]');
    }

    function showStatus(form, variant, html) {
        var host = statusMount(form);
        if (!host) return;

        host.classList.remove('bst-form__status--info', 'bst-form__status--success');
        host.classList.add('bst-form__status--' + variant, 'is-visible');
        host.innerHTML = html;
        host.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /* ===================
       CASILLAS OBLIGATORIAS
       =================== */
    function consentError(field, message) {
        var error = field.querySelector('.field-error');

        if (!message) {
            if (error) {
                error.style.display = 'none';
            }
            return;
        }

        if (!error) {
            error = document.createElement('span');
            error.className = 'field-error';
            field.appendChild(error);
        }

        error.textContent = message;
        error.style.display = 'block';
    }

    function validateChecks(form) {
        var checks = Array.prototype.slice.call(form.querySelectorAll('input[type="checkbox"][required]'));
        var valid = true;

        checks.forEach(function (check) {
            var field = check.closest('.bst-field') || check.parentNode;

            if (check.checked) {
                check.setAttribute('aria-invalid', 'false');
                consentError(field, null);
            } else {
                valid = false;
                check.setAttribute('aria-invalid', 'true');
                consentError(field, MESSAGES.consentRequired);
            }
        });

        return valid;
    }

    /* ===================
       ENVÍO
       =================== */
    /**
     * Punto de integración con el backend. Devuelve `false` mientras no haya
     * endpoint para que la interfaz no afirme un envío que no ocurrió.
     */
    function submitRequest(form, data) {
        if (!ENDPOINT) {
            if (window.configFunctions && window.configFunctions.logInfo) {
                window.configFunctions.logInfo('Solicitud lista para enviar (endpoint pendiente)', {
                    form: form.getAttribute('data-bie-form'),
                    fields: Object.keys(data)
                });
            }
            return false;
        }

        /* Conexión real pendiente de implementar junto al dashboard. */
        return false;
    }

    function handleSubmit(form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            var validation = forms ? forms.validateForm(form) : { isValid: true };
            var checksValid = validateChecks(form);

            if (!validation.isValid || !checksValid) {
                var firstError = form.querySelector('[aria-invalid="true"]');
                if (firstError && typeof firstError.focus === 'function') {
                    firstError.focus();
                }
                return;
            }

            var data = forms ? forms.getFormData(form) : {};
            var sent = submitRequest(form, data);

            if (sent) {
                showStatus(form, 'success', icon('check_circle') + '<span>' + escapeHtml(MESSAGES.success) + '</span>');
                if (forms) {
                    forms.clearForm(form);
                }
                return;
            }

            showStatus(form, 'info',
                icon('pending') +
                '<span><strong>' + escapeHtml(MESSAGES.pendingEndpoint) + '</strong> ' +
                escapeHtml(MESSAGES.pendingDetail) + '</span>');
        });
    }

    function init() {
        var elements = Array.prototype.slice.call(document.querySelectorAll('[data-bie-form]'));
        if (!elements.length) return;

        elements.forEach(function (form) {
            if (forms) {
                forms.enableRealtimeValidation(form);
            }

            form.querySelectorAll('input[type="checkbox"][required]').forEach(function (check) {
                check.addEventListener('change', function () {
                    if (check.checked) {
                        consentError(check.closest('.bst-field') || check.parentNode, null);
                    }
                });
            });

            handleSubmit(form);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.bienestarForms = {
        init: init,
        submitRequest: submitRequest,
        MESSAGES: MESSAGES
    };
})();
