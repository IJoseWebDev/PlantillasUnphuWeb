/**
 * Landing Template — Scaffold de página
 *
 * AL CLONAR:
 * 1. Copiar a assets/js/landing-[nombre].js
 * 2. Renombrar el export window.templateLanding → window.[nombre]Landing
 * 3. Reemplazar MOCK_ITEMS / selectores por los de tu landing
 *
 * ARQUITECTURA PARA NEXT.JS:
 * - MOCK_ITEMS → fetch / CMS / API
 * - renderCard() → <ResourceCard />
 * - renderGrid() + INITIAL_VISIBLE → listado + "Cargar más"
 * - initSearch() → controlled search + utils.debounce
 * - data-action / data-cta → handlers de interacción
 *
 * Reutiliza siempre (no dupliques):
 * - utils.js → debounce, storage, validateEmail…
 * - animations.js → data-animate, data-stagger, data-timeline-item
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
        init: init
    };
})();
