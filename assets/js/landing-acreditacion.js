/**
 * Acreditaciones — filtros, grid, resumen y modal
 */
(function () {
    'use strict';

    var CATEGORY_LABELS = {
        institucional: 'Institucional',
        negocios: 'Negocios',
        arquitectura: 'Arquitectura',
        medicina: 'Medicina',
        ingenieria: 'Ingeniería'
    };

    var ACREDITACIONES = [
        {
            id: 'mescyt',
            shortName: 'MESCyT',
            org: 'Ministerio de Educación Superior, Ciencia y Tecnología (MESCyT)',
            category: 'institucional',
            duration: '5 años',
            scope: 'Nacional',
            area: 'UNPHU — Doctor en Medicina',
            period: '2019–2025 / 2017–2022',
            image: '../assets/images/acreditadoras/Logo_MESCyT_(RD).png',
            imageAlt: 'Logo MESCyT',
            description:
                'Acreditación institucional y de programas otorgada por el MESCyT, que reconoce el cumplimiento de los estándares nacionales de calidad en educación superior, gestión académica e infraestructura.',
            documents: [
                { label: 'Portal MESCyT', href: 'https://mescyt.gob.do/' },
                { label: 'Resolución MESCyT – UNPHU', href: '#' },
                { label: 'Resolución MESCyT – Doctor en Medicina', href: '#' }
            ]
        },
        {
            id: 'acbsp',
            shortName: 'ACBSP',
            org: 'Accreditation Council for Business Schools and Programs',
            category: 'negocios',
            duration: '10 años',
            scope: 'Global / Internacional',
            area: 'Programas de Negocios',
            period: '2020–2030',
            image: '../assets/images/acreditadoras/ACBSP Logo - Full Color.svg',
            imageAlt: 'Logo ACBSP',
            description:
                'Acreditación internacional que valida la calidad de los programas de negocios de la UNPHU, alineados con estándares globales de enseñanza, investigación y vinculación con el sector productivo.',
            documents: [
                { label: 'Portal ACBSP', href: 'https://acbsp.org/' },
                { label: 'Certificado ACBSP – UNPHU', href: '#' }
            ]
        },
        {
            id: 'anpadeh',
            shortName: 'ANPADEH',
            org: 'Acreditadora Nacional de Programas de Arquitectura y Disciplinas del Espacio Habitable',
            category: 'arquitectura',
            duration: '5 años',
            scope: 'Global',
            area: 'Arquitectura',
            period: '2021–2026',
            image: '../assets/images/acreditadoras/anpadeh.png',
            imageAlt: 'Logo ANPADEH',
            description:
                'Reconocimiento de la calidad académica del programa de Arquitectura, con énfasis en formación profesional, diseño, contexto urbano y competencias del espacio habitable.',
            documents: [
                { label: 'Portal ANPADEH', href: '#' },
                { label: 'Dictamen ANPADEH – Arquitectura', href: '#' }
            ]
        },
        {
            id: 'caam-hp',
            shortName: 'CAAM-HP',
            org: 'Caribbean Accreditation Authority for Education in Medicine and other Health Professions',
            category: 'medicina',
            duration: '5 años',
            scope: 'Global / Internacional',
            area: 'Doctor en Medicina',
            period: '2019–2024',
            image: '../assets/images/acreditadoras/caamhp.png',
            imageAlt: 'Logo CAAM-HP',
            description:
                'Acreditación regional del Caribe que certifica la calidad de la formación médica de la UNPHU, facilitando el reconocimiento internacional de egresados y la movilidad profesional.',
            documents: [
                { label: 'Portal CAAM-HP', href: 'https://www.caam-hp.org/' },
                { label: 'Acreditación CAAM-HP – Medicina', href: '#' }
            ]
        },
        {
            id: 'gcreas',
            shortName: 'GCREAS',
            org: 'Gran Caribe para la Acreditación de Programas de Ingeniería',
            category: 'ingenieria',
            duration: '5 años',
            scope: 'Global',
            area: 'Programas de Ingeniería',
            period: '2022–2027',
            image: '../assets/images/acreditadoras/gcreas.png',
            imageAlt: 'Logo GCREAS',
            description:
                'Acreditación que asegura la calidad de los programas de ingeniería bajo criterios regionales e internacionales de formación, laboratorios, resultados de aprendizaje y empleabilidad.',
            documents: [
                { label: 'Portal GCREAS', href: '#' },
                { label: 'Dictamen GCREAS – Ingeniería', href: '#' }
            ]
        }
    ];

    var activeFilter = 'todos';
    var lastFocused = null;

    function catClass(category) {
        return 'acr-cat--' + category;
    }

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function getFiltered() {
        if (activeFilter === 'todos') return ACREDITACIONES.slice();
        return ACREDITACIONES.filter(function (item) {
            return item.category === activeFilter;
        });
    }

    function renderCard(item) {
        return (
            '<article class="acr-card ' + catClass(item.category) + '" data-stagger data-acr-id="' + escapeHtml(item.id) + '" tabindex="0" role="button" aria-label="Ver detalle de ' + escapeHtml(item.shortName) + '">' +
                '<div class="acr-card__top">' +
                    '<span class="acr-card__badge">' + escapeHtml(CATEGORY_LABELS[item.category]) + '</span>' +
                    '<span class="acr-card__duration">' +
                        '<span class="material-symbols-outlined" aria-hidden="true">calendar_month</span>' +
                        escapeHtml(item.duration) +
                    '</span>' +
                '</div>' +
                (item.image ? '<div class="acr-card__image"><img src="' + escapeHtml(item.image) + '" alt="' + escapeHtml(item.imageAlt || item.shortName + ' logo') + '" loading="lazy"/></div>' : '') +
                '<h3 class="acr-card__title">' + escapeHtml(item.shortName) + '</h3>' +
                '<p class="acr-card__org">' + escapeHtml(item.org) + '</p>' +
                '<p class="acr-card__desc">' + escapeHtml(item.description) + '</p>' +
                '<span class="acr-card__scope">' +
                    '<span class="material-symbols-outlined" aria-hidden="true">public</span>' +
                    escapeHtml(item.scope) +
                '</span>' +
            '</article>'
        );
    }

    function renderGrid() {
        var grid = document.getElementById('acr-grid');
        if (!grid) return;

        var items = getFiltered();
        if (!items.length) {
            grid.innerHTML = '<p class="acr-empty type-body-md">No hay acreditaciones en esta categoría.</p>';
            return;
        }

        grid.innerHTML = items.map(renderCard).join('');
        bindOpeners(grid);
    }

    function setFilter(nextFilter) {
        activeFilter = nextFilter || 'todos';
        var buttons = document.querySelectorAll('[data-filter]');
        buttons.forEach(function (btn) {
            var isActive = btn.getAttribute('data-filter') === activeFilter;
            btn.classList.toggle('acr-filter--active', isActive);
            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
        renderGrid();
    }

    function findById(id) {
        for (var i = 0; i < ACREDITACIONES.length; i++) {
            if (ACREDITACIONES[i].id === id) return ACREDITACIONES[i];
        }
        return null;
    }

    function openModal(id, trigger) {
        var item = findById(id);
        var modal = document.getElementById('acr-modal');
        var panel = document.getElementById('acr-modal-panel');
        if (!item || !modal || !panel) return;

        lastFocused = trigger || document.activeElement;

        panel.className = 'acr-modal ' + catClass(item.category);
        document.getElementById('acr-modal-badge').textContent = CATEGORY_LABELS[item.category];
        document.getElementById('acr-modal-title').textContent = item.shortName;
        document.getElementById('acr-modal-org').textContent = item.org;
        document.getElementById('acr-modal-desc').textContent = item.description;
        document.getElementById('acr-modal-area').textContent = item.area;
        document.getElementById('acr-modal-period').textContent = item.period;
        document.getElementById('acr-modal-scope').textContent = item.scope;

        var modalImage = document.getElementById('acr-modal-image');
        if (modalImage) {
            if (item.image) {
                modalImage.innerHTML = '<img src="' + escapeHtml(item.image) + '" alt="' + escapeHtml(item.imageAlt || item.shortName + ' logo') + '" loading="lazy" />';
                modalImage.removeAttribute('hidden');
            } else {
                modalImage.innerHTML = '';
                modalImage.setAttribute('hidden', '');
            }
        }

        var docs = document.getElementById('acr-modal-docs');
        docs.innerHTML = (item.documents || []).map(function (doc) {
            var target = doc.href && doc.href.indexOf('http') === 0 ? ' target="_blank" rel="noopener noreferrer"' : '';
            return (
                '<a class="acr-modal__doc" href="' + escapeHtml(doc.href) + '"' + target + '>' +
                    '<span class="material-symbols-outlined" aria-hidden="true">open_in_new</span>' +
                    escapeHtml(doc.label) +
                '</a>'
            );
        }).join('');

        modal.hidden = false;
        document.body.classList.add('overflow-hidden');

        var closeBtn = modal.querySelector('[data-modal-close]');
        if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
        var modal = document.getElementById('acr-modal');
        if (!modal || modal.hidden) return;
        modal.hidden = true;
        document.body.classList.remove('overflow-hidden');
        if (lastFocused && typeof lastFocused.focus === 'function') {
            lastFocused.focus();
        }
        lastFocused = null;
    }

    function bindFilters() {
        document.querySelectorAll('[data-filter]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                setFilter(btn.getAttribute('data-filter'));
            });
        });
    }

    function bindOpeners(root) {
        var scope = root || document;
        scope.querySelectorAll('[data-acr-id]').forEach(function (el) {
            el.addEventListener('click', function () {
                openModal(el.getAttribute('data-acr-id'), el);
            });
            el.addEventListener('keydown', function (event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openModal(el.getAttribute('data-acr-id'), el);
                }
            });
        });
    }

    function bindModal() {
        var modal = document.getElementById('acr-modal');
        if (!modal) return;

        modal.querySelectorAll('[data-modal-close]').forEach(function (btn) {
            btn.addEventListener('click', function (event) {
                event.preventDefault();
                closeModal();
            });
        });

        modal.addEventListener('click', function (event) {
            if (event.target === modal) closeModal();
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') closeModal();
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        bindFilters();
        bindModal();
        renderGrid();
    });
})();
