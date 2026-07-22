/**
 * Documentación y Reglamentos — Datos, renderizado e interacciones
 *
 * ARQUITECTURA PARA NEXT.JS:
 * - MOCK_DOCUMENTS → fetch / CMS / API
 * - renderDocCard() → <DocCard />
 * - renderCategory() → <DocCategorySection />
 * - visibleByCategory + INITIAL_VISIBLE → useState / "Cargar más"
 * - filterDocuments() → DocSearch controlled filter
 */
(function () {
    'use strict';

    var INITIAL_VISIBLE = 4;

    var SELECTORS = {
        searchInput: '#doc-search-input',
        searchResult: '#doc-search-result',
        categories: '.category-section',
        grid: '.document-grid',
        emptyMsg: '.no-results-msg',
        loadMore: '.doc-load-more',
        quickNavLinks: '.doc-quick-nav__link',
        actionButtons: '[data-action]'
    };

    /* ===================
       DATOS DE EJEMPLO
       =================== */
    var MOCK_DOCUMENTS = {
        bienestar: [
            { id: 'bie-01', title: 'Formulario Beca Socioeconómica', size: '1.2 MB', keywords: 'formulario beca socioeconomica' },
            { id: 'bie-02', title: 'Guía Servicios Salud Mental', size: '3.5 MB', keywords: 'guia servicios salud mental' },
            { id: 'bie-03', title: 'Reglamento Instalaciones Deportivas', size: '0.8 MB', keywords: 'reglamento instalaciones deportivas' },
            { id: 'bie-04', title: 'Solicitud Seguro Estudiantil', size: '1.1 MB', keywords: 'solicitud seguro estudiantil' },
            { id: 'bie-05', title: 'Protocolo Atención Psicológica', size: '2.4 MB', keywords: 'protocolo atencion psicologica' },
            { id: 'bie-06', title: 'Manual de Bienestar Campus', size: '1.8 MB', keywords: 'manual bienestar campus' }
        ],
        externos: [
            { id: 'ext-01', title: 'Convenio Prácticas Empresariales', size: '2.1 MB', keywords: 'convenio practicas empresariales' },
            { id: 'ext-02', title: 'Solicitud Movilidad Internacional', size: '1.5 MB', keywords: 'solicitud movilidad internacional' },
            { id: 'ext-03', title: 'Acuerdo Interinstitucional MESCyT', size: '2.8 MB', keywords: 'acuerdo interinstitucional mescyt' },
            { id: 'ext-04', title: 'Formato Carta de Presentación', size: '0.6 MB', keywords: 'formato carta presentacion' },
            { id: 'ext-05', title: 'Convenio Doble Titulación', size: '3.2 MB', keywords: 'convenio doble titulacion' },
            { id: 'ext-06', title: 'Guía Pasantías Externas', size: '1.4 MB', keywords: 'guia pasantias externas' }
        ],
        institucionales: [
            { id: 'ins-01', title: 'Estatuto Orgánico', size: '5.2 MB', keywords: 'estatuto organico' },
            { id: 'ins-02', title: 'Reglamento Disciplinario', size: '1.9 MB', keywords: 'reglamento disciplinario estudiantil' },
            { id: 'ins-03', title: 'Calendario Académico', size: '0.4 MB', keywords: 'calendario academico' },
            { id: 'ins-04', title: 'Política de Calidad Institucional', size: '2.6 MB', keywords: 'politica calidad institucional' },
            { id: 'ins-05', title: 'Reglamento Académico General', size: '4.1 MB', keywords: 'reglamento academico general' },
            { id: 'ins-06', title: 'Código de Ética UNPHU', size: '1.3 MB', keywords: 'codigo etica unphu' }
        ]
    };

    var visibleByCategory = {
        bienestar: INITIAL_VISIBLE,
        externos: INITIAL_VISIBLE,
        institucionales: INITIAL_VISIBLE
    };

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

    function showToast(message, variant) {
        variant = variant || 'bottom';

        var existing = document.querySelector('.doc-toast');
        if (existing) {
            existing.remove();
        }

        var toast = document.createElement('div');
        toast.className = 'doc-toast doc-toast--' + variant;
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');

        var icon = document.createElement('span');
        icon.className = 'material-symbols-outlined';
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = variant === 'top' ? 'info' : 'check_circle';

        var text = document.createElement('span');
        text.textContent = message;

        toast.appendChild(icon);
        toast.appendChild(text);
        document.body.appendChild(toast);

        window.setTimeout(function () {
            toast.classList.add('is-leaving');
            window.setTimeout(function () {
                toast.remove();
            }, 300);
        }, 2500);
    }

    function getFilteredDocs(categoryId) {
        var docs = MOCK_DOCUMENTS[categoryId] || [];
        var query = normalizeText(currentQuery);

        if (!query) {
            return docs.slice();
        }

        return docs.filter(function (doc) {
            return normalizeText(doc.keywords).indexOf(query) !== -1 ||
                normalizeText(doc.title).indexOf(query) !== -1;
        });
    }

    function renderDocCard(doc) {
        var title = escapeHtml(doc.title);
        var size = escapeHtml(doc.size);
        var keywords = escapeHtml(doc.keywords);

        return (
            '<article class="doc-card document-card" data-component="DocCard" data-title="' + keywords + '" data-stagger>' +
                '<div class="doc-card__body">' +
                    '<div class="doc-card__icon" aria-hidden="true">' +
                        '<span class="doc-card__badge">PDF</span>' +
                    '</div>' +
                    '<h3 class="doc-card__title">' + title + '</h3>' +
                    '<p class="doc-card__meta">' + size + '</p>' +
                '</div>' +
                '<div class="doc-card__actions">' +
                    '<button type="button" class="doc-card__btn doc-card__btn--ghost" data-action="view" data-doc="' + title + '">' +
                        '<span class="material-symbols-outlined" aria-hidden="true">visibility</span>' +
                        'Ver' +
                    '</button>' +
                    '<button type="button" class="doc-card__btn doc-card__btn--primary" data-action="download" data-doc="' + title + '">' +
                        '<span class="material-symbols-outlined" aria-hidden="true">download</span>' +
                        'Descargar' +
                    '</button>' +
                '</div>' +
            '</article>'
        );
    }

    function renderCategory(categoryId) {
        var section = document.querySelector('[data-category="' + categoryId + '"]');
        if (!section) return;

        var grid = section.querySelector(SELECTORS.grid);
        var emptyMsg = section.querySelector(SELECTORS.emptyMsg);
        var loadMoreBtn = section.querySelector(SELECTORS.loadMore);
        var filtered = getFilteredDocs(categoryId);
        var isSearching = normalizeText(currentQuery) !== '';
        var limit = isSearching ? filtered.length : (visibleByCategory[categoryId] || INITIAL_VISIBLE);
        var visibleDocs = filtered.slice(0, limit);
        var hasMore = !isSearching && filtered.length > limit;

        if (grid) {
            grid.innerHTML = visibleDocs.map(renderDocCard).join('');
            grid.hidden = visibleDocs.length === 0;
        }

        if (emptyMsg) {
            emptyMsg.hidden = visibleDocs.length > 0;
        }

        if (loadMoreBtn) {
            loadMoreBtn.hidden = !hasMore;
            var remaining = filtered.length - limit;
            loadMoreBtn.textContent = remaining > 0
                ? 'Cargar más (' + remaining + ')'
                : 'Cargar más';
        }

        section.hidden = false;
    }

    function renderAllCategories() {
        Object.keys(MOCK_DOCUMENTS).forEach(renderCategory);
        updateSearchResultMessage();
    }

    function updateSearchResultMessage() {
        var resultMsg = document.querySelector(SELECTORS.searchResult);
        if (!resultMsg) return;

        if (!normalizeText(currentQuery)) {
            resultMsg.hidden = true;
            resultMsg.textContent = '';
            return;
        }

        var totalMatches = 0;
        Object.keys(MOCK_DOCUMENTS).forEach(function (categoryId) {
            totalMatches += getFilteredDocs(categoryId).length;
        });

        if (totalMatches === 0) {
            resultMsg.textContent = 'Sin resultados.';
        } else {
            resultMsg.textContent = totalMatches +
                (totalMatches === 1 ? ' documento encontrado.' : ' documentos encontrados.');
        }
        resultMsg.hidden = false;
    }

    function loadMore(categoryId) {
        var total = (MOCK_DOCUMENTS[categoryId] || []).length;
        visibleByCategory[categoryId] = total;
        renderCategory(categoryId);
    }

    function initDocSearch() {
        var input = document.querySelector(SELECTORS.searchInput);
        if (!input) return;

        var applyQuery = function (value) {
            currentQuery = value;
            renderAllCategories();
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

    function initDocActions() {
        document.addEventListener('click', function (event) {
            var button = event.target.closest(SELECTORS.actionButtons);
            if (!button) return;

            var action = button.getAttribute('data-action');
            var docName = button.getAttribute('data-doc') || 'documento';
            var categoryId = button.getAttribute('data-category');

            if (action === 'load-more' && categoryId) {
                loadMore(categoryId);
                return;
            }

            if (action === 'view') {
                showToast('Abriendo ' + docName + '...', 'bottom');
                return;
            }

            if (action === 'download') {
                showToast('Descargando ' + docName + '...', 'bottom');
                return;
            }

            if (action === 'contact') {
                showToast('Abriendo formulario de contacto...', 'top');
            }
        });
    }

    function initQuickNavHighlight() {
        var links = document.querySelectorAll(SELECTORS.quickNavLinks);
        var sections = document.querySelectorAll(SELECTORS.categories);

        if (!links.length || !sections.length || typeof IntersectionObserver === 'undefined') {
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;

                var id = entry.target.id;
                links.forEach(function (link) {
                    var href = link.getAttribute('href') || '';
                    var isActive = href === '#' + id;
                    link.classList.toggle('is-active', isActive);
                    if (isActive) {
                        link.setAttribute('aria-current', 'true');
                    } else {
                        link.removeAttribute('aria-current');
                    }
                });
            });
        }, {
            rootMargin: '-30% 0px -55% 0px',
            threshold: 0
        });

        sections.forEach(function (section) {
            observer.observe(section);
        });
    }

    function init() {
        renderAllCategories();
        initDocSearch();
        initDocActions();
        initQuickNavHighlight();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.documentacionLanding = {
        renderAllCategories: renderAllCategories,
        loadMore: loadMore,
        showToast: showToast,
        init: init
    };
})();
