/**
 * MICROSITIO INTERNACIONALIZACIÓN — SHELL COMPARTIDO
 *
 * Provee a las páginas del micrositio (Internacionalización y Movilidad):
 * - helpers comunes (escapeHtml, prefersReducedMotion)
 * - footer institucional reutilizable  → <Footer />
 * - comportamiento de la navegación    → <MicrositeNav />
 *
 * ARQUITECTURA PARA NEXT.JS:
 * `FOOTER` es la única fuente de la información institucional del footer; se
 * comparte entre todas las páginas del micrositio en lugar de duplicar markup.
 * Los datos provienen del ecosistema UNPHU ya presente en el proyecto
 * (ver landings/internacionalizacion.html). No añadir datos no proporcionados.
 */
(function () {
    'use strict';

    var FOOTER = {
        logo: {
            file: 'images/logo-unphu-60-aniversario.png',
            alt: 'Universidad Nacional Pedro Henríquez Ureña'
        },
        university: 'Universidad Nacional Pedro Henríquez Ureña',
        phones: ['809 540 0422', '809 763 0422'],
        email: 'info@unphu.edu.do',
        address: {
            line1: 'Av. John F. Kennedy Km 7 1/2, Edificio #8',
            line2: '3er piso, Santo Domingo, República Dominicana'
        },
        micrositeLinks: [
            { label: 'Internacionalización', href: 'index.html' },
            { label: 'Movilidad', href: 'movilidad.html' }
        ]
    };

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

    function icon(name) {
        return '<span class="material-symbols-outlined" aria-hidden="true">' + escapeHtml(name) + '</span>';
    }

    /* ===================
       FOOTER INSTITUCIONAL
       =================== */
    function renderFooter() {
        var mount = document.querySelector('[data-intl-footer]');
        if (!mount) return;

        var assetsBase = mount.getAttribute('data-assets-base') || '../../assets';
        var year = new Date().getFullYear();

        var phones = FOOTER.phones.map(function (phone) {
            return '<li class="intl-footer__item">' + icon('phone') +
                '<a class="intl-footer__link" href="tel:' + escapeHtml(phone.replace(/\s/g, '')) + '">' +
                escapeHtml(phone) + '</a></li>';
        }).join('');

        var links = FOOTER.micrositeLinks.map(function (link) {
            return '<li class="intl-footer__item">' + icon('chevron_right') +
                '<a class="intl-footer__link" href="' + escapeHtml(link.href) + '">' +
                escapeHtml(link.label) + '</a></li>';
        }).join('');

        mount.innerHTML =
            '<div class="intl-wrap intl-footer__inner">' +
                '<div>' +
                    '<img class="intl-footer__logo" src="' + escapeHtml(assetsBase + '/' + FOOTER.logo.file) + '" alt="' + escapeHtml(FOOTER.logo.alt) + '" width="220" height="72" loading="lazy" />' +
                    '<p class="mt-4 text-sm leading-relaxed">' + escapeHtml(FOOTER.university) + '</p>' +
                '</div>' +
                '<div>' +
                    '<h2 class="intl-footer__title">Contacto UNPHU</h2>' +
                    '<ul class="intl-footer__list">' +
                        phones +
                        '<li class="intl-footer__item">' + icon('mail') +
                            '<a class="intl-footer__link" href="mailto:' + escapeHtml(FOOTER.email) + '">' + escapeHtml(FOOTER.email) + '</a>' +
                        '</li>' +
                        '<li class="intl-footer__item">' + icon('location_on') +
                            '<span>' + escapeHtml(FOOTER.address.line1) + '<br />' + escapeHtml(FOOTER.address.line2) + '</span>' +
                        '</li>' +
                    '</ul>' +
                '</div>' +
                '<div>' +
                    '<h2 class="intl-footer__title">Micrositio</h2>' +
                    '<ul class="intl-footer__list">' + links + '</ul>' +
                '</div>' +
            '</div>' +
            '<div class="intl-wrap intl-footer__bottom">' +
                '<p>© ' + year + ' ' + escapeHtml(FOOTER.university) + '.</p>' +
            '</div>';
    }

    /* ===================
       NAVEGACIÓN
       =================== */
    function initNavToggle() {
        var toggle = document.querySelector('[data-nav-toggle]');
        var menu = document.getElementById('intl-nav-menu');
        if (!toggle || !menu) return;

        var isDesktop = function () {
            return window.matchMedia('(min-width: 1024px)').matches;
        };

        var setOpen = function (open) {
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            menu.hidden = !open;
            var label = toggle.querySelector('[data-nav-toggle-icon]');
            if (label) {
                label.textContent = open ? 'close' : 'menu';
            }
        };

        var syncViewport = function () {
            if (isDesktop()) {
                menu.hidden = false;
                toggle.setAttribute('aria-expanded', 'false');
            } else if (toggle.getAttribute('aria-expanded') !== 'true') {
                menu.hidden = true;
            }
        };

        toggle.addEventListener('click', function () {
            setOpen(toggle.getAttribute('aria-expanded') !== 'true');
        });

        menu.addEventListener('click', function (event) {
            if (!isDesktop() && event.target.closest('a')) {
                setOpen(false);
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && !isDesktop() && toggle.getAttribute('aria-expanded') === 'true') {
                setOpen(false);
                toggle.focus();
            }
        });

        window.addEventListener('resize', syncViewport);
        syncViewport();
    }

    /**
     * Resalta el enlace de la sección visible.
     * Los enlaces deben apuntar a `#id` de secciones existentes.
     */
    function initScrollSpy() {
        var links = Array.prototype.slice.call(document.querySelectorAll('.intl-nav__link[href^="#"]'));
        if (!links.length || typeof IntersectionObserver === 'undefined') return;

        var sections = links.map(function (link) {
            return document.querySelector(link.getAttribute('href'));
        }).filter(Boolean);

        if (!sections.length) return;

        var setActive = function (id) {
            links.forEach(function (link) {
                var isActive = link.getAttribute('href') === '#' + id;
                link.classList.toggle('is-active', isActive);
                if (isActive) {
                    link.setAttribute('aria-current', 'true');
                } else {
                    link.removeAttribute('aria-current');
                }
            });
        };

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    setActive(entry.target.id);
                }
            });
        }, { rootMargin: '-25% 0px -60% 0px', threshold: 0 });

        sections.forEach(function (section) {
            observer.observe(section);
        });
    }

    /**
     * Arranca el shell. `initScrollSpy` se ejecuta también desde el landing,
     * después de que su navegación se haya renderizado.
     */
    function init() {
        renderFooter();
        initNavToggle();
        initScrollSpy();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.MicrositioInternacionalizacion = {
        FOOTER: FOOTER,
        escapeHtml: escapeHtml,
        prefersReducedMotion: prefersReducedMotion,
        icon: icon,
        renderFooter: renderFooter,
        initNavToggle: initNavToggle,
        initScrollSpy: initScrollSpy,
        init: init
    };
})();
