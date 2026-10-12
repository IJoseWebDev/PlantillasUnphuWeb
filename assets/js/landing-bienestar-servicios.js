/**
 * BIENESTAR ESTUDIANTIL — RENDER DE LAS PÁGINAS DE UNIDADES Y SERVICIOS
 *
 * Una sola implementación sirve a las siete páginas: toma de
 * `window.BIENESTAR_SERVICIOS` la entrada que corresponde a
 * `<body data-page="...">` y pinta su hero y sus secciones.
 *
 * ARQUITECTURA PARA NEXT.JS:
 * `renderBlock` es el mapa tipo-de-bloque → componente. Al migrar, cada `case`
 * se convierte en un componente de presentación y el array de bloques pasa a
 * ser la prop que entrega el CMS. Ningún texto institucional vive aquí.
 */
(function () {
    'use strict';

    var shell = window.MicrositioBienestarEstudiantil || {};
    var pages = window.BIENESTAR_SERVICIOS;

    var escapeHtml = shell.escapeHtml || function (text) {
        return String(text === null || typeof text === 'undefined' ? '' : text);
    };

    var prefersReducedMotion = shell.prefersReducedMotion || function () {
        return false;
    };

    var PENDING_LABEL = '[DATO PENDIENTE DE CONFIRMAR]';

    function icon(name, extraClass) {
        return '<span class="material-symbols-outlined' + (extraClass ? ' ' + extraClass : '') +
            '" aria-hidden="true">' + escapeHtml(name) + '</span>';
    }

    /* ===========================================================
       BLOQUES
       =========================================================== */

    function proseBlock(block) {
        return '<div class="bst-prose">' + block.paragraphs.map(function (text) {
            return '<p>' + escapeHtml(text) + '</p>';
        }).join('') + '</div>';
    }

    function subtitleBlock(block) {
        return '<h3 class="bst-subtitle">' + escapeHtml(block.text) + '</h3>';
    }

    /** Items de texto plano o con título destacado. */
    function listBlock(block) {
        var glyph = block.variant === 'check' ? 'check_circle' : 'chevron_right';

        return '<ul class="bst-bullets">' + block.items.map(function (item) {
            var body = typeof item === 'string'
                ? escapeHtml(item)
                : '<strong>' + escapeHtml(item.title) + '</strong>' +
                  (item.text ? ' ' + escapeHtml(item.text) : '');

            return '<li class="bst-bullets__item" data-stagger>' +
                icon(glyph, 'bst-bullets__icon') + '<span>' + body + '</span>' +
            '</li>';
        }).join('') + '</ul>';
    }

    function stepsBlock(block) {
        return '<ol class="bst-steps">' + block.items.map(function (item, index) {
            return '<li class="bst-steps__item" data-stagger>' +
                '<span class="bst-steps__num">' + (index + 1) + '</span>' +
                '<div>' +
                    '<p class="bst-steps__title">' + escapeHtml(item.title) + '</p>' +
                    (item.text ? '<p class="bst-steps__text">' + escapeHtml(item.text) + '</p>' : '') +
                '</div>' +
            '</li>';
        }).join('') + '</ol>';
    }

    function cardsBlock(block) {
        return '<div class="bst-grid bst-grid--2">' + block.items.map(function (item) {
            var link = item.href
                ? '<a class="bst-service__link" href="' + escapeHtml(item.href) + '">' +
                    escapeHtml(item.linkLabel || 'Ver más') + icon('arrow_forward') + '</a>'
                : '';

            return '<article class="bst-service" data-stagger>' +
                '<div class="bst-service__head">' +
                    '<span class="bst-service__icon">' + icon(item.icon) + '</span>' +
                    '<h3 class="bst-service__name">' + escapeHtml(item.name) + '</h3>' +
                '</div>' +
                '<p class="bst-service__text">' + escapeHtml(item.description) + '</p>' +
                link +
            '</article>';
        }).join('') + '</div>';
    }

    function tableBlock(block) {
        var head = block.columns.map(function (column) {
            return '<th scope="col">' + escapeHtml(column) + '</th>';
        }).join('');

        var body = block.rows.map(function (row) {
            return '<tr>' + row.map(function (cell, index) {
                return index === 0
                    ? '<th scope="row">' + escapeHtml(cell) + '</th>'
                    : '<td>' + escapeHtml(cell) + '</td>';
            }).join('') + '</tr>';
        }).join('');

        return '<div class="bst-table-wrap"><table class="bst-table">' +
            '<thead><tr>' + head + '</tr></thead>' +
            '<tbody>' + body + '</tbody>' +
        '</table></div>';
    }

    function noteBlock(block) {
        var items = (block.items || []).map(function (text) {
            return '<li>' + icon('chevron_right') + '<span>' + escapeHtml(text) + '</span></li>';
        }).join('');

        var paragraphs = (block.paragraphs || []).map(function (text) {
            return '<p>' + escapeHtml(text) + '</p>';
        }).join('');

        var action = '';
        if (block.action) {
            var hook = block.action.opensEmergency ? ' data-bie-emergency-open' : '';
            action = '<a class="bie-btn bie-btn--sm bie-btn--outline" href="' +
                escapeHtml(block.action.href) + '"' + hook + '>' +
                escapeHtml(block.action.label) + icon('arrow_forward') + '</a>';
        }

        return '<aside class="bst-note bst-note--' + escapeHtml(block.variant || 'info') + '">' +
            (block.title ? '<h3 class="bst-note__title">' + escapeHtml(block.title) + '</h3>' : '') +
            paragraphs +
            (items ? '<ul class="bst-note__list">' + items + '</ul>' : '') +
            action +
        '</aside>';
    }

    function faqBlock(block) {
        var markup = shell.faqMarkup ? shell.faqMarkup(block.items) : '';
        return '<div class="bst-faq" data-faq>' + markup + '</div>';
    }

    function contactBlock(block) {
        return '<div class="bst-grid bst-grid--2">' + block.items.map(function (item) {
            var value = item.href
                ? '<a class="bst-contact-card__value" href="' + escapeHtml(item.href) + '">' + escapeHtml(item.value) + '</a>'
                : '<p class="bst-contact-card__value">' + escapeHtml(item.value) + '</p>';

            return '<article class="bst-contact-card" data-stagger>' +
                '<span class="bst-contact-card__icon">' + icon(item.icon) + '</span>' +
                '<div>' +
                    '<h3 class="bst-contact-card__label">' + escapeHtml(item.label) + '</h3>' +
                    value +
                '</div>' +
            '</article>';
        }).join('') + '</div>';
    }

    function peopleBlock(block) {
        return '<div class="bst-grid">' + block.items.map(function (person) {
            var contacts = person.contacts.map(function (item) {
                return '<li><a href="' + escapeHtml(item.href) + '">' +
                    icon(item.icon) + escapeHtml(item.label) + '</a></li>';
            }).join('');

            return '<article class="bst-lead-card" data-stagger>' +
                /* Monograma decorativo: se reemplaza por la foto oficial cuando exista. */
                '<span class="bst-lead-card__avatar" aria-hidden="true">' + escapeHtml(person.initials) + '</span>' +
                '<div>' +
                    '<h3 class="bst-lead-card__name">' + escapeHtml(person.name) + '</h3>' +
                    '<p class="bst-lead-card__role">' + escapeHtml(person.role) + '</p>' +
                    '<p class="bst-lead-card__bio">' + escapeHtml(person.bio) + '</p>' +
                    '<ul class="bst-lead-card__contact">' + contacts + '</ul>' +
                '</div>' +
            '</article>';
        }).join('') + '</div>';
    }

    function actionsBlock(block) {
        return '<div class="bst-actions">' + block.items.map(function (action) {
            var hook = action.opensEmergency ? ' data-bie-emergency-open' : '';

            return '<a class="bie-btn bie-btn--' + escapeHtml(action.variant) + '"' +
                ' href="' + escapeHtml(action.href) + '"' + hook + '>' +
                (action.icon ? icon(action.icon) : '') +
                escapeHtml(action.label) +
                (action.icon ? '' : icon('arrow_forward')) +
            '</a>';
        }).join('') + '</div>';
    }

    /** Dato señalado como pendiente en la solicitud de información. */
    function pendingBlock(block) {
        return '<p class="bie-placeholder-block">' +
            '<span class="bie-placeholder">' + icon('pending') + PENDING_LABEL + '</span> ' +
            escapeHtml(block.label) +
        '</p>';
    }

    var BLOCKS = {
        prose: proseBlock,
        subtitle: subtitleBlock,
        list: listBlock,
        steps: stepsBlock,
        cards: cardsBlock,
        table: tableBlock,
        note: noteBlock,
        faq: faqBlock,
        contact: contactBlock,
        people: peopleBlock,
        actions: actionsBlock,
        pending: pendingBlock
    };

    function renderBlock(block) {
        var render = BLOCKS[block.kind];

        if (!render) {
            if (window.configFunctions && window.configFunctions.logError) {
                window.configFunctions.logError('Tipo de bloque desconocido: ' + block.kind);
            }
            return '';
        }

        return render(block);
    }

    /* ===========================================================
       HERO Y SECCIONES
       =========================================================== */
    function renderHero(page) {
        var mount = document.querySelector('[data-render="page-hero"]');
        if (!mount) return;

        var hero = page.hero;

        var back = hero.back
            ? '<a class="bst-back" href="' + escapeHtml(hero.back.href) + '">' +
                icon('arrow_back') + escapeHtml(hero.back.label) + '</a>'
            : '<a class="bst-back" href="index.html">' + icon('arrow_back') + 'Bienestar Estudiantil</a>';

        var actions = hero.actions
            ? actionsBlock({ items: hero.actions })
            : '';

        mount.innerHTML =
            '<div class="bst-page-hero__pattern" aria-hidden="true"></div>' +
            '<div class="bie-wrap bst-page-hero__inner">' +
                back +
                '<p class="bie-eyebrow bie-eyebrow--light">' + escapeHtml(hero.eyebrow) + '</p>' +
                '<h1 class="bst-page-hero__title">' + escapeHtml(hero.title) + '</h1>' +
                '<p class="bst-page-hero__lead">' + escapeHtml(hero.lead) + '</p>' +
                actions +
            '</div>';
    }

    function renderSections(page) {
        var mount = document.querySelector('[data-render="page-sections"]');
        if (!mount) return;

        mount.innerHTML = page.sections.map(function (section) {
            var head =
                '<div class="bst-section__head">' +
                    (section.eyebrow ? '<p class="bie-eyebrow">' + escapeHtml(section.eyebrow) + '</p>' : '') +
                    '<h2 class="bie-section-title">' + escapeHtml(section.title) + '</h2>' +
                    (section.lead ? '<p class="bie-section-lead">' + escapeHtml(section.lead) + '</p>' : '') +
                '</div>';

            var blocks = section.blocks.map(renderBlock).join('');

            return '<section class="bst-section' + (section.tone === 'soft' ? ' bst-section--soft' : '') + '"' +
                ' id="' + escapeHtml(section.id) + '" data-animate="fade" data-stagger-container>' +
                '<div class="bie-wrap">' + head + blocks + '</div>' +
            '</section>';
        }).join('');

        /* Cada acordeón gestiona sus propias preguntas. */
        if (shell.initFaqAccordion) {
            mount.querySelectorAll('[data-faq]').forEach(shell.initFaqAccordion);
        }
    }

    function applyMeta(page) {
        if (page.meta.title) {
            document.title = page.meta.title;
        }
        var description = document.querySelector('meta[name="description"]');
        if (description && page.meta.description) {
            description.setAttribute('content', page.meta.description);
        }
    }

    /* ===========================================================
       ARRANQUE
       =========================================================== */
    function init() {
        var key = document.body && document.body.getAttribute('data-page');
        var page = pages && key ? pages[key] : null;

        if (!page) {
            if (window.configFunctions && window.configFunctions.logError) {
                window.configFunctions.logError('Sin contenido para la página "' + key + '".');
            }
            return;
        }

        applyMeta(page);
        renderHero(page);
        renderSections(page);

        /* Las secciones se crean después de que animations.js se inicializó:
           se vuelven a observar para que reciban la animación de entrada. */
        if (window.animationFunctions && !prefersReducedMotion()) {
            window.animationFunctions.initFadeInAnimations();
            window.animationFunctions.initStaggerAnimations();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.bienestarServicios = {
        init: init,
        pages: pages
    };
})();
