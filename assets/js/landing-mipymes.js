/**
 * Centro MIPYMES + UNPHU Emprende
 *
 * Reutiliza:
 * - common.js → scroll suave (#)
 * - animations.js → data-animate, data-stagger, data-animate-number
 */
(function () {
    'use strict';

    function initServiceTabs() {
        var root = document.querySelector('[data-services]');
        if (!root) return;

        var tabs = root.querySelectorAll('[data-service-tab]');
        var panels = root.querySelectorAll('[data-service-panel]');
        if (!tabs.length || !panels.length) return;

        function activate(name) {
            tabs.forEach(function (tab) {
                var isActive = tab.getAttribute('data-service-tab') === name;
                tab.classList.toggle('is-active', isActive);
                tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
                tab.tabIndex = isActive ? 0 : -1;
            });

            panels.forEach(function (panel) {
                var show = panel.getAttribute('data-service-panel') === name;
                panel.hidden = !show;
            });

            root.classList.toggle('mpy-services--mipymes', name === 'mipymes');
            root.classList.toggle('mpy-services--emprende', name === 'emprende');
        }

        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                activate(tab.getAttribute('data-service-tab'));
            });

            tab.addEventListener('keydown', function (event) {
                var keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
                if (keys.indexOf(event.key) === -1) return;

                event.preventDefault();
                var list = Array.prototype.slice.call(tabs);
                var index = list.indexOf(tab);
                var nextIndex = index;

                if (event.key === 'ArrowRight') nextIndex = (index + 1) % list.length;
                if (event.key === 'ArrowLeft') nextIndex = (index - 1 + list.length) % list.length;
                if (event.key === 'Home') nextIndex = 0;
                if (event.key === 'End') nextIndex = list.length - 1;

                list[nextIndex].focus();
                activate(list[nextIndex].getAttribute('data-service-tab'));
            });
        });
    }

    function init() {
        initServiceTabs();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.mipymesLanding = {
        init: init
    };
})();
