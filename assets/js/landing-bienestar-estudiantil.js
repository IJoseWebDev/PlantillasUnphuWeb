/**
 * PORTADA BIENESTAR ESTUDIANTIL — RENDER E INTERACCIONES
 *
 * Toma el contenido de `window.BIENESTAR_CONTENT`
 * (bienestar-estudiantil-content.js) y lo pinta en los puntos de montaje
 * `[data-render="..."]` de index.html.
 *
 * ARQUITECTURA PARA NEXT.JS:
 * Cada función `render*` equivale a un componente de presentación y recibe su
 * contenido desde la capa de datos. Al conectar el dashboard/Firebase basta con
 * sustituir la carga de `BIENESTAR_CONTENT` por la respuesta del CMS: ningún
 * texto institucional vive dentro de estas funciones.
 *
 * Los datos aún no proporcionados se muestran como placeholders visibles
 * (`.bie-placeholder`) para que el equipo identifique qué falta por cargar.
 */
(function () {
    'use strict';

    var shell = window.MicrositioBienestarEstudiantil || {};
    var visual = window.BienestarVisual;
    var content = window.BIENESTAR_CONTENT;
    var photos = (visual && visual.photos) || {};

    var escapeHtml = shell.escapeHtml || function (text) {
        return String(text === null || typeof text === 'undefined' ? '' : text);
    };

    var prefersReducedMotion = shell.prefersReducedMotion || function () {
        return false;
    };

    function icon(name, extraClass) {
        return '<span class="material-symbols-outlined' + (extraClass ? ' ' + extraClass : '') +
            '" aria-hidden="true">' + escapeHtml(name) + '</span>';
    }

    function placeholder(text, variant) {
        return '<span class="bie-placeholder' + (variant ? ' bie-placeholder--' + variant : '') + '">' +
            icon('pending') + escapeHtml(text) + '</span>';
    }

    function mount(key) {
        return document.querySelector('[data-render="' + key + '"]');
    }

    function paint(key, html) {
        var target = mount(key);
        if (target) {
            target.innerHTML = html;
        }
        return target;
    }

    function paragraphs(list) {
        return list.map(function (text) {
            return '<p>' + escapeHtml(text) + '</p>';
        }).join('');
    }

    /**
     * Botones de llamada a la acción con las variantes del shell bie-*.
     * Con `icon` el glifo va delante y sustituye a la flecha; con
     * `opensEmergency` el enlace también abre el modal del protocolo.
     * Los que solo abren un modal (`opensReport`) no tienen destino propio:
     * se pintan como <button>.
     */
    function ctaMarkup(cta) {
        var classes = 'bie-btn bie-btn--' + escapeHtml(cta.variant);
        var label = (cta.icon ? icon(cta.icon) : '') +
            escapeHtml(cta.label) +
            (cta.icon ? '' : icon('arrow_forward'));

        if (cta.opensReport) {
            return '<button type="button" class="' + classes + '" data-bst-report-open>' + label + '</button>';
        }

        return '<a class="' + classes + '" href="' + escapeHtml(cta.href) + '"' +
            (cta.opensEmergency ? ' data-bie-emergency-open' : '') + '>' +
            label +
        '</a>';
    }

    /* ===========================================================
       1. HERO  → <Hero />
       =========================================================== */
    function renderHero() {
        var hero = content.hero;

        paint('hero-eyebrow', escapeHtml(hero.eyebrow));
        paint('hero-title', escapeHtml(hero.title));
        paint('hero-lead', escapeHtml(hero.lead));
        paint('hero-actions', hero.ctas.map(ctaMarkup).join(''));

        if (!visual) return;

        /* El collage usa las fotos del campus. Si el CMS carga una imagen
           propia del hero, ocupa el lugar principal. */
        var main = (hero.image && hero.image.src)
            ? { src: hero.image.src, alt: hero.image.alt || 'Decanato de Bienestar Estudiantil', position: 'center center' }
            : photos.grupo;

        paint('hero-media',
            visual.figure(main, 'bst-hero__photo bst-hero__photo--main', false) +
            visual.figure(photos.equipo, 'bst-hero__photo', false) +
            visual.figure(photos.picnic, 'bst-hero__photo', false));
    }

    /* ===========================================================
       Modal "Cómo hacer un reporte"  → <ReportModal />
       =========================================================== */

    /** Se construye en el primer clic y queda disponible para el resto. */
    function buildReportModal() {
        var report = content.report;

        var steps = report.steps.map(function (step, index) {
            var link = step.link
                ? '<a class="bie-step__action" href="' + escapeHtml(step.link.href) + '">' +
                    escapeHtml(step.link.label) + icon('arrow_forward') + '</a>'
                : '';

            return '<li class="bie-step">' +
                '<span class="bie-step__num">' + (index + 1) + '</span>' +
                '<div><p>' + escapeHtml(step.text) + '</p>' + link + '</div>' +
            '</li>';
        }).join('');

        window.bienestarReport = shell.buildModal({
            id: 'bst-report',
            title: report.title,
            body: '<ul class="bie-steps">' + steps + '</ul>'
        });

        return window.bienestarReport;
    }

    /** El disparador se pinta en el hero, así que el clic se delega. */
    function initReportModal() {
        if (!shell.buildModal) return;

        document.addEventListener('click', function (event) {
            if (!event.target.closest('[data-bst-report-open]')) return;
            (window.bienestarReport || buildReportModal()).open();
        });
    }

    /* ===========================================================
       2. ¿QUIÉNES SOMOS?  → <About />
       =========================================================== */
    function renderAbout() {
        var section = content.about;

        paint('about-title', escapeHtml(section.title));

        if (!visual) {
            paint('about-text', paragraphs(section.paragraphs));
            return;
        }

        visual.figure && paint('about-media', visual.imgTag(photos.amigas, true));

        visual.registerDetail(
            'bst-home-about',
            section.title,
            paragraphs(section.paragraphs),
            photos.amigas
        );

        paint('about-text',
            '<p class="bst-spotlight__excerpt">' + escapeHtml(visual.excerpt(section.paragraphs[0], 180)) + '</p>' +
            visual.moreButton('bst-home-about', 'Leer quiénes somos'));
    }

    /* ===========================================================
       3. ¿QUÉ HACEMOS?  → <WhatWeDo />
       =========================================================== */
    function renderWhatWeDo() {
        var section = content.whatWeDo;

        paint('whatwedo-title', escapeHtml(section.title));
        paint('whatwedo-lead', escapeHtml(section.lead));

        var featurePhotos = {
            escuchamos: photos.charla,
            acompanamiento: photos.lectura,
            'formacion-integral': photos.bienestar,
            participacion: photos.equipo,
            merito: photos.sonrisa
        };

        paint('whatwedo-items', section.items.map(function (item) {
            var photo = featurePhotos[item.id] || photos.grupo;
            var detailId = 'bst-home-que-' + item.id;

            if (visual) {
                visual.registerDetail(detailId, item.title, '<p>' + escapeHtml(item.text) + '</p>', photo);
            }

            if (!visual) {
                return '<article class="bst-feature" data-stagger>' +
                    '<span class="bst-feature__icon">' + icon(item.icon) + '</span>' +
                    '<h3 class="bst-feature__title">' + escapeHtml(item.title) + '</h3>' +
                    '<p class="bst-feature__text">' + escapeHtml(item.text) + '</p>' +
                '</article>';
            }

            return '<article class="bst-feature bst-feature--media" data-stagger>' +
                visual.figure(photo, 'bst-feature__media') +
                '<div class="bst-feature__body">' +
                    '<span class="bst-feature__icon">' + icon(item.icon) + '</span>' +
                    '<h3 class="bst-feature__title">' + escapeHtml(item.title) + '</h3>' +
                    visual.moreButton(detailId, 'Leer más') +
                '</div>' +
            '</article>';
        }).join(''));
    }

    /* ===========================================================
       4. UNIDADES Y PROGRAMAS  → <Units />
       =========================================================== */
    function renderUnits() {
        var section = content.units;

        paint('units-eyebrow', escapeHtml(section.eyebrow));
        paint('units-title', escapeHtml(section.title));
        paint('units-lead', escapeHtml(section.lead));

        var unitPhotos = {
            uove: photos.charla,
            upa: photos.tutoria,
            acogida: photos.grupo,
            'vida-integral': photos.bienestar,
            merito: photos.sonrisa,
            incluyo: photos.grupoAire
        };

        paint('units-items', section.items.map(function (unit) {
            var tags = (unit.tags || []).map(function (tag) {
                return '<li class="bst-tag">' + escapeHtml(tag) + '</li>';
            }).join('');

            var photo = unitPhotos[unit.id] || photos.picnic;
            var detailId = 'bst-home-unit-' + unit.id;
            var description = unit.description
                ? '<p>' + escapeHtml(unit.description) + '</p>'
                : '<p>' + placeholder(content.pending.content) + '</p>';

            if (visual) {
                visual.registerDetail(detailId, unit.name, description +
                    (tags ? '<ul class="bst-service__tags">' + tags + '</ul>' : ''), photo);
            }

            /* Sin página propia, la tarjeta ofrece la vía general de contacto. */
            var link = unit.href
                ? '<a class="bst-service__link" href="' + escapeHtml(unit.href) + '">' +
                    escapeHtml(unit.linkLabel || 'Conocer más') + icon('arrow_forward') + '</a>'
                : '<a class="bst-service__link" href="solicitar-cita.html">' +
                    'Solicitar una cita' + icon('arrow_forward') + '</a>';

            if (!visual) {
                return '<article class="bst-service" data-stagger>' +
                    '<div class="bst-service__head">' +
                        '<span class="bst-service__icon">' + icon(unit.icon) + '</span>' +
                        '<h3 class="bst-service__name">' + escapeHtml(unit.name) + '</h3>' +
                    '</div>' +
                    '<p class="bst-service__text">' +
                        (unit.description ? escapeHtml(unit.description) : placeholder(content.pending.content)) +
                    '</p>' +
                    (tags ? '<ul class="bst-service__tags">' + tags + '</ul>' : '') +
                    link +
                '</article>';
            }

            return '<article class="bst-service bst-service--media" data-stagger>' +
                visual.figure(photo, 'bst-service__media') +
                '<div class="bst-service__body">' +
                    '<div class="bst-service__head">' +
                        '<span class="bst-service__icon">' + icon(unit.icon) + '</span>' +
                        '<h3 class="bst-service__name">' + escapeHtml(unit.name) + '</h3>' +
                    '</div>' +
                    (tags ? '<ul class="bst-service__tags">' + tags + '</ul>' : '') +
                    '<div class="bst-service__actions">' +
                        visual.moreButton(detailId, 'Leer descripción') +
                        link +
                    '</div>' +
                '</div>' +
            '</article>';
        }).join(''));
    }

    /* ===========================================================
       5. AUTORIDADES  → <Authorities />
       =========================================================== */
    function renderAuthorities() {
        var section = content.authorities;

        paint('authorities-eyebrow', escapeHtml(section.eyebrow));
        paint('authorities-title', escapeHtml(section.title));
        paint('authorities-lead', escapeHtml(section.lead));

        var host = paint('authorities-items', section.items.map(function (person) {
            var contacts = person.contacts.map(function (item) {
                return '<li><a href="' + escapeHtml(item.href) + '">' +
                    icon(item.icon) + escapeHtml(item.label) +
                '</a></li>';
            }).join('');

            var detailId = 'bst-home-person-' + person.id;
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
        }).join(''));

        if (host) {
            host.classList.add('bst-grid--3');
        }
    }

    /* ===========================================================
       6. PROCEDIMIENTOS Y PROGRAMAS  → <Documents />
       =========================================================== */

    /** Ficha de documento normativo: enlace cuando `href` exista. */
    function documentMarkup(item) {
        var title = item.href
            ? '<a class="bst-doc__name" href="' + escapeHtml(item.href) + '">' +
                escapeHtml(item.name) + icon('open_in_new') + '</a>'
            : '<p class="bst-doc__name">' + escapeHtml(item.name) + '</p>';

        return '<article class="bst-doc" data-stagger>' +
            '<p class="bst-doc__code">' + escapeHtml(item.code) + '</p>' +
            title +
            (item.description ? '<p class="bst-doc__text">' + escapeHtml(item.description) + '</p>' : '') +
            (item.note ? '<p class="bst-doc__note">' + icon('info') + escapeHtml(item.note) + '</p>' : '') +
        '</article>';
    }

    function renderDocuments() {
        var section = content.documents;

        paint('documents-eyebrow', escapeHtml(section.eyebrow));
        paint('documents-title', escapeHtml(section.title));
        paint('documents-lead', escapeHtml(section.lead));
        paint('documents-items', section.items.map(documentMarkup).join(''));
    }

    /* ===========================================================
       7. DERECHOS Y DEBERES  → <Rights />
       =========================================================== */
    function renderRights() {
        var section = content.rights;

        paint('rights-eyebrow', escapeHtml(section.eyebrow));
        paint('rights-title', escapeHtml(section.title));
        paint('rights-text', paragraphs(section.paragraphs));
        paint('rights-items', section.items.map(documentMarkup).join(''));
    }

    /* ===========================================================
       8. AGRUPACIONES ESTUDIANTILES  → <StudentGroups />
       =========================================================== */
    function renderGroups() {
        var section = content.groups;

        paint('groups-eyebrow', escapeHtml(section.eyebrow));
        paint('groups-title', escapeHtml(section.title));
        paint('groups-text', paragraphs(section.paragraphs));

        /* El listado de agrupaciones activas todavía no se ha suministrado. */
        var list = section.list
            ? '<ul class="bst-bullets">' + section.list.map(function (item) {
                return '<li class="bst-bullets__item">' + icon('chevron_right', 'bst-bullets__icon') +
                    '<span>' + escapeHtml(item) + '</span></li>';
            }).join('') + '</ul>'
            : '<p class="bie-placeholder-block">' + placeholder(content.pending.content) +
                ' Listado de agrupaciones estudiantiles activas.</p>';

        var link = section.contact
            ? '<a class="bst-service__link" href="' + escapeHtml(section.contact.href) + '">' +
                icon('mail') + escapeHtml(section.contact.label) + '</a>'
            : '';

        paint('groups-list', list + link);
    }

    /* ===========================================================
       9. PREGUNTAS FRECUENTES  → <Faq />
       =========================================================== */
    function renderFaq() {
        var section = content.faq;

        paint('faq-eyebrow', escapeHtml(section.eyebrow));
        paint('faq-title', escapeHtml(section.title));

        var markup;

        if (!visual) {
            markup = shell.faqMarkup(section.items, content.pending.answer);
        } else {
            markup = '<div class="bst-faq-picks">' + section.items.map(function (item) {
                var detailId = 'bst-home-' + item.id;
                var answer = item.answer
                    ? '<p>' + escapeHtml(item.answer) + '</p>'
                    : '<p>' + placeholder(content.pending.answer) + '</p>';

                visual.registerDetail(detailId, item.question, answer);

                return '<button type="button" class="bst-faq-pick" data-bst-detail="' + escapeHtml(detailId) + '" aria-haspopup="dialog">' +
                    icon('quiz') +
                    '<span class="bst-faq-pick__label">' + escapeHtml(item.question) + '</span>' +
                    icon('arrow_forward') +
                '</button>';
            }).join('') + '</div>';
        }

        var host = paint('faq-items', markup);

        if (section.note) {
            var link = section.note.link
                ? ' <a class="bst-service__link" href="' + escapeHtml(section.note.link.href) + '">' +
                    icon('mail') + escapeHtml(section.note.link.label) + '</a>'
                : '';
            paint('faq-note', escapeHtml(section.note.text) + link);
        }

        if (!visual && shell.initFaqAccordion) {
            shell.initFaqAccordion(host);
        }
    }

    /* ===========================================================
       10. CONTACTO  → <Contact /> + <ContactCta />
       =========================================================== */
    function renderContact() {
        var section = content.contact;

        paint('contact-eyebrow', escapeHtml(section.eyebrow));
        paint('contact-title', escapeHtml(section.title));

        if (visual) {
            paint('contact-gallery', [photos.picnic, photos.equipo, photos.grupo, photos.estudio].map(function (item) {
                return '<figure class="bst-gallery__item">' + visual.imgTag(item, true) + '</figure>';
            }).join(''));
        }

        paint('contact-items', section.cards.map(function (card) {
            var rows = card.rows.map(function (row) {
                var value = row.href
                    ? '<a href="' + escapeHtml(row.href) + '">' + escapeHtml(row.value) + '</a>'
                    : escapeHtml(row.value);

                return '<p class="bst-office__row">' +
                    '<span class="bst-office__label">' + escapeHtml(row.label) + ':</span> ' + value +
                '</p>';
            }).join('');

            return '<article class="bst-office" data-stagger>' +
                '<h3 class="bst-office__title">' + escapeHtml(card.title) + '</h3>' +
                rows +
            '</article>';
        }).join(''));

        var cta = section.cta;
        paint('contact-cta', '' +
            '<h2 class="bie-section-title bie-section-title--light">' + escapeHtml(cta.title) + '</h2>' +
            '<p class="bst-cta__text">' + escapeHtml(cta.text) + '</p>' +
            '<div class="bst-cta__actions">' + cta.actions.map(ctaMarkup).join('') + '</div>');

        if (section.staffLink) {
            paint('contact-staff',
                '<a class="bst-staff-link" href="' + escapeHtml(section.staffLink.href) + '">' +
                    icon('badge') + escapeHtml(section.staffLink.label) +
                '</a>');
        }
    }

    /* ===========================================================
       SEO / METADATOS
       =========================================================== */
    function applyMeta() {
        if (content.meta.title) {
            document.title = content.meta.title;
        }
        var description = document.querySelector('meta[name="description"]');
        if (description && content.meta.description) {
            description.setAttribute('content', content.meta.description);
        }
    }

    /* ===========================================================
       ARRANQUE
       =========================================================== */
    function init() {
        if (!content) {
            if (window.configFunctions && window.configFunctions.logError) {
                window.configFunctions.logError('BIENESTAR_CONTENT no está disponible.');
            }
            return;
        }

        applyMeta();
        renderHero();
        initReportModal();
        renderAbout();
        renderWhatWeDo();
        renderUnits();
        renderAuthorities();
        /* Secciones ocultas hasta nuevo aviso: sus <section> están comentadas en index.html. */
        /* renderDocuments(); */
        /* renderRights(); */
        /* renderGroups(); */
        renderFaq();
        renderContact();

        /* Los elementos se crean después de que animations.js se inicializó:
           se vuelven a observar para que reciban la animación de entrada. */
        if (window.animationFunctions && !prefersReducedMotion()) {
            window.animationFunctions.initStaggerAnimations();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.bienestarLanding = {
        init: init,
        content: content
    };
})();
