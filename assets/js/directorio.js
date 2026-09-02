/**
 * Directorio de landings — búsqueda en vivo y orden
 */
(function () {
    'use strict';

    var LANDINGS = [
        {
            title: 'Talento UNPHU 2026',
            tag: 'Talento UNPHU',
            description: 'Feria de empleo y vinculación para empresas, estudiantes y egresados de la Facultad de Ciencias y Tecnología.',
            href: 'landings/talentoUNPHU.html',
            added: '2026-09-02',
            badge: 'blue',
            cta: 'Abrir landing'
        },
        {
            title: 'Centro MIPYMES y UNPHU Emprende',
            tag: 'MIPYMES',
            description: 'Asesoría, capacitación y acompañamiento para emprendedores y MIPYMES de la República Dominicana.',
            href: 'landings/MiPYMES.html',
            added: '2026-08-25',
            badge: 'green',
            cta: 'Abrir landing'
        },
        {
            title: 'Inclusión y Atención a la Diversidad',
            tag: 'Inclusión',
            description: 'Dirección de Inclusión Universitaria: accesibilidad, equidad, formación y apoyo a la comunidad universitaria.',
            href: 'landings/inclusion.html',
            added: '2026-08-18',
            badge: 'green',
            cta: 'Abrir landing'
        },
        {
            title: 'Acreditación institucional',
            tag: 'Acreditaciones',
            description: 'Contenido de calidad académica, organismos acreditadores y beneficios institucionales.',
            href: 'landings/acreditacion.html',
            added: '2026-08-03',
            badge: 'green',
            cta: 'Abrir landing'
        },
        {
            title: 'Documentación',
            tag: 'Documentación',
            description: 'Sección para guías, formularios y recursos documentales institucionales.',
            href: 'landings/documentacion.html',
            added: '2026-07-22',
            badge: 'amber',
            cta: 'Abrir landing'
        },
        {
            title: 'Bolsa de empleo',
            tag: 'Bolsa de empleo',
            description: 'Portal para oportunidades laborales, vacantes y perfiles destacados de la comunidad.',
            href: 'landings/bolsa-de-empleo.html',
            added: '2026-07-09',
            badge: 'blue',
            cta: 'Abrir landing'
        },
        {
            title: 'Internacionalización',
            tag: 'Internacionalización',
            description: 'Experiencia global, movilidad y alianzas internacionales para la comunidad universitaria.',
            href: 'landings/internacionalizacion.html',
            added: '2026-07-09',
            badge: 'blue',
            cta: 'Abrir landing'
        },
        {
            title: 'Doble titulación',
            tag: 'Doble titulación',
            description: 'Presentación de programas y beneficios para estudios binacionales o dobles titulaciones.',
            href: 'landings/dobleTitulacion.html',
            added: '2026-07-02',
            badge: 'purple',
            cta: 'Abrir landing'
        },
        {
            title: 'Catálogo de componentes',
            tag: 'Plantilla',
            description: 'Todos los bloques usados en los landings, listos para copiar y personalizar en una página nueva.',
            href: 'landings/template.html',
            added: '2026-07-02',
            badge: 'gray',
            cta: 'Abrir catálogo'
        }
    ];

    var BADGE_CLASS = {
        green: 'dir-card__badge dir-card__badge--green',
        blue: 'dir-card__badge dir-card__badge--blue',
        purple: 'dir-card__badge dir-card__badge--purple',
        amber: 'dir-card__badge dir-card__badge--amber',
        gray: 'dir-card__badge dir-card__badge--gray'
    };

    var query = '';
    var sort = 'recent';

    function escapeHtml(text) {
        return String(text || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function normalizeText(text) {
        return String(text || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();
    }

    function getFiltered() {
        var needle = normalizeText(query);
        var items = LANDINGS.filter(function (item) {
            if (!needle) return true;
            return normalizeText(item.title).indexOf(needle) !== -1 ||
                normalizeText(item.tag).indexOf(needle) !== -1;
        });

        items.sort(function (a, b) {
            if (sort === 'oldest') return a.added.localeCompare(b.added);
            if (sort === 'alpha-asc') return a.title.localeCompare(b.title, 'es', { sensitivity: 'base' });
            if (sort === 'alpha-desc') return b.title.localeCompare(a.title, 'es', { sensitivity: 'base' });
            return b.added.localeCompare(a.added);
        });

        return items;
    }

    function renderCard(item) {
        return (
            '<article class="dir-card">' +
                '<div class="' + (BADGE_CLASS[item.badge] || BADGE_CLASS.gray) + '">' + escapeHtml(item.tag) + '</div>' +
                '<h3 class="dir-card__title">' + escapeHtml(item.title) + '</h3>' +
                '<p class="dir-card__desc">' + escapeHtml(item.description) + '</p>' +
                '<a href="' + escapeHtml(item.href) + '" class="dir-card__link">' +
                    escapeHtml(item.cta) +
                    '<span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span>' +
                '</a>' +
            '</article>'
        );
    }

    function render() {
        var grid = document.getElementById('dir-grid');
        var empty = document.getElementById('dir-empty');
        var count = document.getElementById('dir-count');
        if (!grid) return;

        var items = getFiltered();
        grid.innerHTML = items.map(renderCard).join('');

        if (empty) {
            empty.hidden = items.length > 0;
        }

        if (count) {
            if (!query) {
                count.textContent = items.length + ' landings';
            } else if (items.length === 0) {
                count.textContent = 'Sin coincidencias';
            } else if (items.length === 1) {
                count.textContent = '1 landing';
            } else {
                count.textContent = items.length + ' landings';
            }
        }
    }

    function init() {
        var search = document.getElementById('dir-search');
        var sortSelect = document.getElementById('dir-sort');

        if (search) {
            search.addEventListener('input', function (event) {
                query = event.target.value;
                render();
            });
        }

        if (sortSelect) {
            sortSelect.addEventListener('change', function (event) {
                sort = event.target.value;
                render();
            });
        }

        render();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
