/**
 * ÚNETE A UNPHU — SHELL DEL MICROSITIO
 * Menú móvil y utilidades compartidas por las páginas.
 */
(function () {
    'use strict';

    function escapeHtml(text) {
        return String(text === null || typeof text === 'undefined' ? '' : text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function initNav() {
        var nav = document.querySelector('[data-une-nav]');
        if (!nav) return;

        var toggle = nav.querySelector('[data-une-toggle]');
        var menu = nav.querySelector('#une-menu');
        if (!toggle || !menu) return;

        toggle.addEventListener('click', function () {
            var open = nav.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    function labelFor(list, value) {
        if (!list) return '';
        var found = list.filter(function (item) { return item.value === value; })[0];
        return found ? found.label : '';
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNav);
    } else {
        initNav();
    }

    window.MicrositioUnete = {
        escapeHtml: escapeHtml,
        labelFor: labelFor
    };
})();
