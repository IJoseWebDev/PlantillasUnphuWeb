/**
 * ÚNETE A UNPHU — RENDER DE VACANTES
 * Portada, listado y ficha. Lee `window.UNETE_CONTENT`.
 */
(function () {
    'use strict';

    var content = window.UNETE_CONTENT;
    var shell = window.MicrositioUnete || {};
    var escapeHtml = shell.escapeHtml || function (text) { return String(text || ''); };

    if (!content) return;

    function pending() {
        return '<span class="une-pending">' + escapeHtml(content.pending) + '</span>';
    }

    function areaLabel(value) {
        return shell.labelFor ? shell.labelFor(content.areas, value) : '';
    }

    function normalize(text) {
        return String(text || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
    }

    function vacanteById(id) {
        return content.vacantes.filter(function (item) { return item.id === id; })[0] || null;
    }

    function indexLabel(index) {
        var number = index + 1;
        return number < 10 ? '0' + number : String(number);
    }

    function openingHtml(vacante, index) {
        var area = areaLabel(vacante.area);
        return (
            '<a class="une-opening" href="vacante.html?id=' + encodeURIComponent(vacante.id) + '">' +
                '<span class="une-opening__index">' + indexLabel(index) + '</span>' +
                '<span>' +
                    '<span class="une-pill">' + escapeHtml(vacante.estado || 'Activa') + '</span>' +
                    '<h3>' + escapeHtml(vacante.titulo) + '</h3>' +
                    '<p>' + (area ? escapeHtml(area) : 'Ficha en preparación') + '</p>' +
                '</span>' +
                '<span class="une-btn une-btn--line">Ver puesto <span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span></span>' +
            '</a>'
        );
    }

    function renderHome() {
        var mount = document.querySelector('[data-une-home-vacancies]');
        var count = document.querySelector('[data-une-count]');
        if (count) count.textContent = String(content.vacantes.length);
        if (!mount) return;
        mount.innerHTML = content.vacantes.map(openingHtml).join('');
    }

    function renderList() {
        var mount = document.querySelector('[data-une-vacantes-list]');
        var search = document.querySelector('[data-une-search]');
        var filter = document.querySelector('[data-une-filter-area]');
        var summary = document.querySelector('[data-une-results]');
        if (!mount) return;

        if (filter) {
            var options = '<option value="">Todas las áreas</option>' +
                content.areas.map(function (area) {
                    return '<option value="' + escapeHtml(area.value) + '">' + escapeHtml(area.label) + '</option>';
                }).join('');
            filter.innerHTML = options;
        }

        function apply() {
            var query = search ? search.value.trim().toLowerCase() : '';
            var area = filter ? filter.value : '';
            var items = content.vacantes.filter(function (vacante) {
                var matchesQuery = !query || normalize(vacante.titulo).indexOf(normalize(query)) !== -1;
                var matchesArea = !area || vacante.area === area;
                return matchesQuery && matchesArea;
            });

            if (!items.length) {
                mount.innerHTML = '<p class="une-empty">Ninguna vacante coincide con esa búsqueda.</p>';
            } else {
                mount.innerHTML = '<div class="une-openings">' + items.map(function (vacante) {
                    return openingHtml(vacante, content.vacantes.indexOf(vacante));
                }).join('') + '</div>';
            }

            if (summary) {
                summary.textContent = items.length === 1 ? '1 vacante' : items.length + ' vacantes';
            }
        }

        if (search) search.addEventListener('input', apply);
        if (filter) filter.addEventListener('change', apply);
        apply();
    }

    function listOrPending(items) {
        if (!items || !items.length) return pending();
        return '<ul>' + items.map(function (item) {
            return '<li>' + escapeHtml(item) + '</li>';
        }).join('') + '</ul>';
    }

    function row(label, html) {
        return '<div><dt>' + escapeHtml(label) + '</dt><dd>' + html + '</dd></div>';
    }

    function renderDetail() {
        var mount = document.querySelector('[data-une-vacante-detail]');
        if (!mount) return;

        var params = new URLSearchParams(window.location.search);
        var vacante = vacanteById(params.get('id'));

        if (!vacante) {
            mount.innerHTML =
                '<div class="une-empty">' +
                    '<p>No encontramos esa vacante.</p>' +
                    '<a class="une-btn une-btn--primary" href="vacantes.html">Volver al listado</a>' +
                '</div>';
            return;
        }

        document.title = vacante.titulo + ' | Únete a UNPHU';
        var heading = document.querySelector('[data-une-vacante-title]');
        if (heading) heading.textContent = vacante.titulo;

        var area = areaLabel(vacante.area);
        var perfil = vacante.perfil
            ? escapeHtml(vacante.perfil)
            : pending();

        mount.innerHTML =
            '<div class="une-dossier">' +
                '<dl>' +
                    row('Estado', '<span class="une-pill">' + escapeHtml(vacante.estado || 'Activa') + '</span>') +
                    row('Área o departamento', area ? escapeHtml(area) : pending()) +
                    row('Tipo de contratación', vacante.tipoContratacion ? escapeHtml(vacante.tipoContratacion) : pending()) +
                    row('Modalidad', vacante.modalidad ? escapeHtml(vacante.modalidad) : pending()) +
                    row('Responsabilidades principales', listOrPending(vacante.responsabilidades)) +
                    row('Requisitos', listOrPending(vacante.requisitos)) +
                    row('Perfil requerido', perfil) +
                '</dl>' +
            '</div>' +
            '<aside class="une-apply-card">' +
                '<h2>Postular a este puesto</h2>' +
                '<p>La postulación es distinta del Banco de Talento: aquí aplicas a ' + escapeHtml(vacante.titulo) + '.</p>' +
                '<a class="une-btn une-btn--light" href="postular.html?id=' + encodeURIComponent(vacante.id) + '">Completar postulación</a>' +
            '</aside>';
    }

    function init() {
        renderHome();
        renderList();
        renderDetail();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
