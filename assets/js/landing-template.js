/**
 * Landing Template — Scaffold de página + demos del catálogo
 *
 * AL CLONAR:
 * 1. Copiar a assets/js/landing-[nombre].js
 * 2. Renombrar el export window.templateLanding → window.[nombre]Landing
 * 3. Reemplazar MOCK_ITEMS / selectores por los de tu landing
 * 4. Borrar los bloques de demo que no uses (filtros, modal, toast, copiar,
 *    carrusel, paginación, etiquetas del catálogo)
 *
 * ARQUITECTURA PARA NEXT.JS:
 * - MOCK_ITEMS → fetch / CMS / API
 * - renderCard() → <ResourceCard />
 * - renderGrid() + INITIAL_VISIBLE → listado + "Cargar más"
 * - initSearch() → controlled search + utils.debounce
 * - data-action / data-cta → handlers de interacción
 *
 * Reutiliza siempre (no dupliques):
 * - utils.js → debounce, storage, copyToClipboard, validateEmail…
 * - animations.js → data-animate, data-stagger, data-timeline-item, data-animate-number
 * - common.js → scroll suave (#), data-cta
 * - forms.js → solo si hay formularios reales
 */
(function () {
    'use strict';

    var INITIAL_VISIBLE = 4;

    var SELECTORS = {
        searchInput: '#tpl-search-input',
        searchResult: '#tpl-search-result',
        grid: '#tpl-grid',
        empty: '#tpl-empty',
        loadMore: '#tpl-load-more',
        actionButtons: '[data-action]'
    };

    /* Datos de ejemplo — reemplazar en landings reales */
    var MOCK_ITEMS = [
        { id: 'item-01', title: 'Recurso de ejemplo 1', meta: 'PDF · 1.2 MB', keywords: 'recurso ejemplo uno' },
        { id: 'item-02', title: 'Recurso de ejemplo 2', meta: 'PDF · 0.8 MB', keywords: 'recurso ejemplo dos' },
        { id: 'item-03', title: 'Recurso de ejemplo 3', meta: 'PDF · 2.1 MB', keywords: 'recurso ejemplo tres' },
        { id: 'item-04', title: 'Recurso de ejemplo 4', meta: 'PDF · 1.5 MB', keywords: 'recurso ejemplo cuatro' },
        { id: 'item-05', title: 'Recurso de ejemplo 5', meta: 'PDF · 3.0 MB', keywords: 'recurso ejemplo cinco' },
        { id: 'item-06', title: 'Recurso de ejemplo 6', meta: 'PDF · 0.4 MB', keywords: 'recurso ejemplo seis' }
    ];

    var visibleCount = INITIAL_VISIBLE;
    var currentQuery = '';

    function escapeHtml(text) {
        return String(text || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function normalizeText(text) {
        return String(text || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();
    }

    /* ========================================
       LISTADO: búsqueda + render + "Cargar más"
       ======================================== */

    function getFilteredItems() {
        var query = normalizeText(currentQuery);
        if (!query) return MOCK_ITEMS.slice();

        return MOCK_ITEMS.filter(function (item) {
            return normalizeText(item.keywords).indexOf(query) !== -1 ||
                normalizeText(item.title).indexOf(query) !== -1;
        });
    }

    function renderCard(item) {
        return (
            '<article class="tpl-card" data-component="ResourceCard" data-stagger data-title="' + escapeHtml(item.keywords) + '">' +
                '<div>' +
                    '<h3 class="tpl-card__title">' + escapeHtml(item.title) + '</h3>' +
                    '<p class="tpl-card__meta">' + escapeHtml(item.meta) + '</p>' +
                '</div>' +
            '</article>'
        );
    }

    function renderGrid() {
        var grid = document.querySelector(SELECTORS.grid);
        var empty = document.querySelector(SELECTORS.empty);
        var loadMoreBtn = document.querySelector(SELECTORS.loadMore);
        var resultMsg = document.querySelector(SELECTORS.searchResult);

        if (!grid) return;

        var filtered = getFilteredItems();
        var isSearching = normalizeText(currentQuery) !== '';
        var limit = isSearching ? filtered.length : visibleCount;
        var visibleItems = filtered.slice(0, limit);
        var hasMore = !isSearching && filtered.length > limit;

        grid.innerHTML = visibleItems.map(renderCard).join('');

        if (empty) {
            empty.hidden = visibleItems.length > 0;
        }

        if (loadMoreBtn) {
            loadMoreBtn.hidden = !hasMore;
            var remaining = filtered.length - limit;
            loadMoreBtn.textContent = remaining > 0
                ? 'Cargar más (' + remaining + ')'
                : 'Cargar más';
        }

        if (resultMsg) {
            if (!isSearching) {
                resultMsg.hidden = true;
                resultMsg.textContent = '';
            } else if (filtered.length === 0) {
                resultMsg.textContent = 'Sin resultados.';
                resultMsg.hidden = false;
            } else {
                resultMsg.textContent = filtered.length +
                    (filtered.length === 1 ? ' resultado.' : ' resultados.');
                resultMsg.hidden = false;
            }
        }
    }

    function initSearch() {
        var input = document.querySelector(SELECTORS.searchInput);
        if (!input) return;

        var applyQuery = function (value) {
            currentQuery = value;
            visibleCount = INITIAL_VISIBLE;
            renderGrid();
        };

        var onInput = typeof window.utils !== 'undefined' && window.utils.debounce
            ? window.utils.debounce(function (event) {
                applyQuery(event.target.value);
            }, 180)
            : function (event) {
                applyQuery(event.target.value);
            };

        input.addEventListener('input', onInput);
    }

    /* ========================================
       FILTROS: pills (job-*) y chips (acr-*)
       Un solo activo por grupo [data-filter-group].
       ======================================== */

    function initFilters() {
        document.addEventListener('click', function (event) {
            var button = event.target.closest('[data-filter-pill], [data-filter]');
            if (!button) return;

            var group = button.closest('[data-filter-group]');
            if (!group) return;

            var activeClass = button.hasAttribute('data-filter-pill')
                ? 'job-filter-pill--active'
                : 'acr-filter--active';

            group.querySelectorAll('[data-filter-pill], [data-filter]').forEach(function (sibling) {
                sibling.classList.remove(activeClass);
                sibling.setAttribute('aria-pressed', 'false');
            });

            button.classList.add(activeClass);
            button.setAttribute('aria-pressed', 'true');
        });
    }

    /* ========================================
       PAGINACIÓN (demo visual)
       ======================================== */

    function initPagination() {
        document.addEventListener('click', function (event) {
            var button = event.target.closest('.job-pagination__btn[data-page]');
            if (!button || button.disabled) return;

            var page = button.getAttribute('data-page');
            if (page === 'prev' || page === 'next') return;

            var nav = button.closest('.job-pagination');
            if (!nav) return;

            nav.querySelectorAll('.job-pagination__btn').forEach(function (sibling) {
                sibling.classList.remove('job-pagination__btn--active');
            });
            button.classList.add('job-pagination__btn--active');
        });
    }

    /* ========================================
       MODALES: data-modal-open="id" / data-modal-close
       ======================================== */

    var lastFocused = null;

    function openModal(id) {
        var modal = document.getElementById(id);
        if (!modal) return;

        lastFocused = document.activeElement;
        modal.hidden = false;
        document.body.style.overflow = 'hidden';

        var focusTarget = modal.querySelector('[data-modal-close]');
        if (focusTarget) focusTarget.focus();
    }

    function closeModal(modal) {
        if (!modal) return;

        modal.hidden = true;
        document.body.style.overflow = '';

        if (lastFocused && typeof lastFocused.focus === 'function') {
            lastFocused.focus();
        }
    }

    function initModals() {
        document.addEventListener('click', function (event) {
            var opener = event.target.closest('[data-modal-open]');
            if (opener) {
                openModal(opener.getAttribute('data-modal-open'));
                return;
            }

            if (event.target.closest('[data-modal-close]')) {
                closeModal(event.target.closest('.acr-modal-overlay, .tpl-modal'));
                return;
            }

            /* Clic en el fondo del overlay */
            if (event.target.classList.contains('acr-modal-overlay') ||
                event.target.classList.contains('tpl-modal')) {
                closeModal(event.target);
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key !== 'Enter' && event.key !== ' ' && event.key !== 'Escape') return;

            if (event.key === 'Escape') {
                document.querySelectorAll('.acr-modal-overlay:not([hidden]), .tpl-modal:not([hidden])')
                    .forEach(closeModal);
                return;
            }

            /* Tarjetas con role="button" abren el modal con teclado */
            var card = event.target.closest('[data-modal-open][tabindex]');
            if (card) {
                event.preventDefault();
                openModal(card.getAttribute('data-modal-open'));
            }
        });
    }

    /* ========================================
       TOAST (origen: documentacion.js)
       ======================================== */

    function showToast(message, variant) {
        variant = variant || 'bottom';

        /* Solo retira toasts flotantes; los ejemplos estáticos viven dentro de .tpl-demo-static */
        var existing = document.querySelector('body > .doc-toast');
        if (existing) {
            existing.remove();
        }

        var toast = document.createElement('div');
        toast.className = 'doc-toast doc-toast--' + variant;
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        toast.innerHTML =
            '<span class="material-symbols-outlined" aria-hidden="true">check_circle</span>' +
            '<span></span>';
        toast.lastElementChild.textContent = message;

        document.body.appendChild(toast);

        setTimeout(function () {
            toast.classList.add('is-leaving');
            setTimeout(function () {
                toast.remove();
            }, 320);
        }, 2400);
    }

    /* ========================================
       COPIAR AL PORTAPAPELES
       ======================================== */

    function copyText(text) {
        if (typeof window.utils !== 'undefined' && window.utils.copyToClipboard) {
            window.utils.copyToClipboard(text);
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
        }
    }

    /* ========================================
       CARRUSEL (global.css → .requisitos-carousel)
       ======================================== */

    function initCarousel() {
        document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
            var track = carousel.querySelector('[data-carousel-track]');
            var prev = carousel.querySelector('[data-carousel-prev]');
            var next = carousel.querySelector('[data-carousel-next]');
            if (!track) return;

            var index = 0;

            var move = function (direction) {
                var slides = track.children;
                if (!slides.length) return;

                var step = slides[0].getBoundingClientRect().width + 16; /* gap: 1rem */
                var perView = Math.max(1, Math.round(carousel.querySelector('.requisitos-carousel__viewport').clientWidth / step));
                var maxIndex = Math.max(0, slides.length - perView);

                index = Math.min(maxIndex, Math.max(0, index + direction));
                track.style.transform = 'translateX(' + (-index * step) + 'px)';
            };

            if (prev) prev.addEventListener('click', function () { move(-1); });
            if (next) next.addEventListener('click', function () { move(1); });
        });
    }

    /* ========================================
       ACCIONES [data-action]
       ======================================== */

    function initActions() {
        document.addEventListener('click', function (event) {
            var button = event.target.closest(SELECTORS.actionButtons);
            if (!button) return;

            var action = button.getAttribute('data-action');

            if (action === 'load-more') {
                visibleCount = MOCK_ITEMS.length;
                renderGrid();
                return;
            }

            if (action === 'toggle-docs') {
                var hidden = document.body.classList.toggle('tpl-docs-off');
                var label = button.querySelector('[data-toggle-label]');
                if (label) {
                    label.textContent = hidden ? 'Mostrar etiquetas' : 'Ocultar etiquetas';
                }
                return;
            }

            if (action === 'toast') {
                showToast('Mensaje de confirmación', button.getAttribute('data-toast-variant') || 'bottom');
                return;
            }

            if (action === 'copy') {
                copyText(button.getAttribute('data-copy-target') || '');
                showToast('Copiado al portapapeles', 'top');
                return;
            }

            if (action === 'view' || action === 'download') {
                showToast(action === 'view' ? 'Abriendo documento…' : 'Descarga iniciada', 'bottom');
                return;
            }

            if (action === 'demo-load-more') {
                showToast('Aquí se cargarían más elementos', 'bottom');
                return;
            }

            if (action === 'contact') {
                if (typeof window.configFunctions !== 'undefined' && window.configFunctions.logInfo) {
                    window.configFunctions.logInfo('CTA contact desde template');
                } else {
                    console.log('CTA contact');
                }
            }
        });
    }

    function init() {
        renderGrid();
        initSearch();
        initFilters();
        initPagination();
        initModals();
        initCarousel();
        initActions();
        console.log('Landing template cargado correctamente');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.templateLanding = {
        renderGrid: renderGrid,
        showToast: showToast,
        openModal: openModal,
        init: init
    };
})();
