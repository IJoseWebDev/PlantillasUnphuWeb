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
    var visual = window.BienestarVisual;
    var pages = window.BIENESTAR_SERVICIOS;
    var pageKey = '';
    var cardSeq = 0;

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
            var photo = visual ? visual.photoFor(pageKey) : null;
            var description = item.description || '';
            var long = description.length > 170;
            var detailId = 'bst-card-' + pageKey + '-' + (cardSeq++);
            var text = '';
            var more = '';

            if (visual && long) {
                visual.registerDetail(detailId, item.name, '<p>' + escapeHtml(description) + '</p>', photo);
                text = '<p class="bst-service__text">' + escapeHtml(visual.excerpt(description, 120)) + '</p>';
                more = visual.moreButton(detailId, 'Leer más');
            } else if (description) {
                text = '<p class="bst-service__text">' + escapeHtml(description) + '</p>';
            }

            var link = item.href
                ? '<a class="bst-service__link" href="' + escapeHtml(item.href) + '">' +
                    escapeHtml(item.linkLabel || 'Ver más') + icon('arrow_forward') + '</a>'
                : '';

            if (!photo) {
                return '<article class="bst-service" data-stagger>' +
                    '<div class="bst-service__head">' +
                        '<span class="bst-service__icon">' + icon(item.icon) + '</span>' +
                        '<h3 class="bst-service__name">' + escapeHtml(item.name) + '</h3>' +
                    '</div>' +
                    text +
                    link +
                '</article>';
            }

            return '<article class="bst-service bst-service--media" data-stagger>' +
                visual.figure(photo, 'bst-service__media') +
                '<div class="bst-service__body">' +
                    '<div class="bst-service__head">' +
                        '<span class="bst-service__icon">' + icon(item.icon) + '</span>' +
                        '<h3 class="bst-service__name">' + escapeHtml(item.name) + '</h3>' +
                    '</div>' +
                    text +
                    '<div class="bst-service__actions">' + more + link + '</div>' +
                '</div>' +
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
        if (!visual) {
            var markup = shell.faqMarkup ? shell.faqMarkup(block.items) : '';
            return '<div class="bst-faq" data-faq>' + markup + '</div>';
        }

        return '<div class="bst-faq-picks">' + block.items.map(function (item) {
            var detailId = 'bst-faq-' + item.id;
            var answer = item.answer
                ? '<p>' + escapeHtml(item.answer) + '</p>'
                : '<p>' + escapeHtml(PENDING_LABEL) + '</p>';

            visual.registerDetail(detailId, item.question, answer);

            return '<button type="button" class="bst-faq-pick" data-bst-detail="' + escapeHtml(detailId) + '" aria-haspopup="dialog">' +
                icon('quiz') +
                '<span class="bst-faq-pick__label">' + escapeHtml(item.question) + '</span>' +
                icon('arrow_forward') +
            '</button>';
        }).join('') + '</div>';
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
        return '<div class="bst-grid bst-grid--3">' + block.items.map(function (person, index) {
            var contacts = person.contacts.map(function (item) {
                return '<li><a href="' + escapeHtml(item.href) + '">' +
                    icon(item.icon) + escapeHtml(item.label) + '</a></li>';
            }).join('');

            var detailId = 'bst-person-' + pageKey + '-' + index;
            if (visual) {
                visual.registerDetail(
                    detailId,
                    person.name,
                    '<p class="bst-lead-card__role">' + escapeHtml(person.role) + '</p>' +
                    '<p>' + escapeHtml(person.bio) + '</p>'
                );
            }

            return '<article class="bst-lead-card" data-stagger>' +
                /* Monograma: las fotos del campus no son retratos del equipo. */
                '<span class="bst-lead-card__avatar" aria-hidden="true">' + escapeHtml(person.initials) + '</span>' +
                '<div>' +
                    '<h3 class="bst-lead-card__name">' + escapeHtml(person.name) + '</h3>' +
                    '<p class="bst-lead-card__role">' + escapeHtml(person.role) + '</p>' +
                    (visual
                        ? visual.moreButton(detailId, 'Ver trayectoria')
                        : '<p class="bst-lead-card__bio">' + escapeHtml(person.bio) + '</p>') +
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
       El texto largo pasa a un modal. Contacto, avisos, pendientes
       y botones de acción permanecen en la página.
       =========================================================== */

    var STAY_KIND = { contact: true, actions: true, pending: true, note: true };

    function blockPlain(block) {
        if (block.kind === 'prose') {
            return (block.paragraphs || []).join(' ');
        }
        if (block.kind === 'subtitle') {
            return block.text || '';
        }
        if (block.kind === 'list') {
            return (block.items || []).map(function (item) {
                return typeof item === 'string' ? item : ((item.title || '') + ' ' + (item.text || ''));
            }).join(' ');
        }
        if (block.kind === 'steps') {
            return (block.items || []).map(function (item) {
                return (item.title || '') + ' ' + (item.text || '');
            }).join(' ');
        }
        if (block.kind === 'table') {
            return (block.rows || []).map(function (row) { return row.join(' '); }).join(' ');
        }
        return '';
    }

    function isLongBlock(block) {
        if (block.kind === 'table') {
            return (block.rows || []).length > 6;
        }
        if (block.kind === 'steps') {
            return blockPlain(block).length > 260;
        }
        if (block.kind === 'prose') {
            return blockPlain(block).length > 220;
        }
        if (block.kind === 'list') {
            var longItem = (block.items || []).some(function (item) {
                var text = typeof item === 'string' ? item : (item.text || '');
                return text.length > 150;
            });
            return longItem || blockPlain(block).length > 340;
        }
        return false;
    }

    function firstExcerpt(blocks) {
        var index;
        for (index = 0; index < blocks.length; index += 1) {
            var block = blocks[index];
            if (block.kind === 'prose' && block.paragraphs && block.paragraphs[0]) {
                return block.paragraphs[0];
            }
            if (block.kind === 'list' && block.items && block.items[0]) {
                var item = block.items[0];
                return typeof item === 'string'
                    ? item
                    : ((item.title ? item.title + '. ' : '') + (item.text || ''));
            }
            if (block.kind === 'steps' && block.items && block.items[0]) {
                return block.items[0].title + (block.items[0].text ? '. ' + block.items[0].text : '');
            }
        }
        return '';
    }

    function spotlightMarkup(photo, blocks, detailId) {
        var steps = null;
        var checks = null;

        blocks.forEach(function (block) {
            if (!steps && block.kind === 'steps') steps = block;
            if (!checks && block.kind === 'list' && block.variant === 'check') checks = block;
        });

        var trail = '';
        if (steps) {
            trail = '<ol class="bst-trail">' + steps.items.map(function (item, index) {
                return '<li class="bst-trail__item"><span>' + (index + 1) + '</span>' + escapeHtml(item.title) + '</li>';
            }).join('') + '</ol>';
        }

        var chips = '';
        var chipLabels = blocks.filter(function (block) {
            return block.kind === 'subtitle' && block.text && block.text.length <= 90;
        }).map(function (block) {
            return block.text;
        });

        if (!steps && checks) {
            checks.items.forEach(function (item) {
                var label = typeof item === 'string' ? item : (item.title || '');
                if (label && label.length <= 90) {
                    chipLabels.push(label);
                }
            });
        }

        if (!steps && chipLabels.length) {
            chips = '<ul class="bst-chips">' + chipLabels.map(function (label) {
                return '<li>' + escapeHtml(label) + '</li>';
            }).join('') + '</ul>';
        }

        var raw = firstExcerpt(blocks);
        var excerpt = raw
            ? '<p class="bst-spotlight__excerpt">' + escapeHtml(visual.excerpt(raw, 170)) + '</p>'
            : '';

        return '<article class="bst-spotlight">' +
            visual.figure(photo, 'bst-spotlight__media') +
            '<div class="bst-spotlight__body">' +
                excerpt + trail + chips +
                visual.moreButton(detailId, 'Leer completo') +
            '</div>' +
        '</article>';
    }

    function renderHero(page) {
        var mount = document.querySelector('[data-render="page-hero"]');
        if (!mount) return;

        var hero = page.hero;
        var photo = visual ? visual.heroFor(pageKey) : null;

        if (photo) {
            mount.classList.add('bst-page-hero--photo');
        }

        var back = hero.back
            ? '<a class="bst-back" href="' + escapeHtml(hero.back.href) + '">' +
                icon('arrow_back') + escapeHtml(hero.back.label) + '</a>'
            : '<a class="bst-back" href="index.html">' + icon('arrow_back') + 'Bienestar Estudiantil</a>';

        var actions = hero.actions
            ? actionsBlock({ items: hero.actions })
            : '';

        mount.innerHTML =
            (photo
                ? '<div class="bst-page-hero__bg">' + visual.imgTag(photo, false) + '</div>' +
                  '<div class="bst-page-hero__scrim" aria-hidden="true"></div>'
                : '') +
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

        if (visual) {
            visual.reset(pageKey);
        }
        cardSeq = 0;

        mount.innerHTML = page.sections.map(function (section, index) {
            var narrative = [];
            var stay = [];

            section.blocks.forEach(function (block) {
                if (block.kind === 'cards' || block.kind === 'faq' || block.kind === 'people' || STAY_KIND[block.kind]) {
                    stay.push(block);
                } else {
                    narrative.push(block);
                }
            });

            var total = narrative.reduce(function (sum, block) {
                return sum + blockPlain(block).length;
            }, 0);
            var long = narrative.some(isLongBlock) || total > 460;
            var body = '';
            var hasTable = narrative.some(function (block) { return block.kind === 'table'; });

            if (visual && long && narrative.length) {
                var detailId = 'bst-sec-' + pageKey + '-' + section.id;
                var photo = visual.photoFor(pageKey);
                visual.registerDetail(detailId, section.title, narrative.map(renderBlock).join(''), photo);
                body += spotlightMarkup(photo, narrative, detailId);
            } else if (visual && narrative.length && hasTable) {
                body += visual.figure(visual.photoFor(pageKey), 'bst-banner') + narrative.map(renderBlock).join('');
            } else if (visual && narrative.length) {
                var flip = index % 2 === 1 ? ' bst-split--flip' : '';
                body += '<div class="bst-split' + flip + '">' +
                    visual.figure(visual.photoFor(pageKey), 'bst-frame') +
                    '<div class="bst-split__copy">' + narrative.map(renderBlock).join('') + '</div>' +
                '</div>';
            } else {
                body += narrative.map(renderBlock).join('');
            }

            var faqOnly = stay.length === 1 && stay[0].kind === 'faq';
            if (visual && faqOnly) {
                var flipFaq = index % 2 === 1 ? ' bst-split--flip' : '';
                body += '<div class="bst-split' + flipFaq + '">' +
                    visual.figure(visual.photoFor(pageKey), 'bst-frame') +
                    '<div class="bst-split__copy">' + renderBlock(stay[0]) + '</div>' +
                '</div>';
            } else {
                body += stay.map(renderBlock).join('');
            }

            var head =
                '<div class="bst-section__head">' +
                    (section.eyebrow ? '<p class="bie-eyebrow">' + escapeHtml(section.eyebrow) + '</p>' : '') +
                    '<h2 class="bie-section-title">' + escapeHtml(section.title) + '</h2>' +
                    (section.lead ? '<p class="bie-section-lead">' + escapeHtml(section.lead) + '</p>' : '') +
                '</div>';

            return '<section class="bst-section' + (section.tone === 'soft' ? ' bst-section--soft' : '') + '"' +
                ' id="' + escapeHtml(section.id) + '" data-animate="fade" data-stagger-container>' +
                '<div class="bie-wrap">' + head + body + '</div>' +
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
        pageKey = key || '';
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
