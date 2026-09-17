/**
 * LANDING MOVILIDAD — RENDER E INTERACCIONES
 *
 * Toma el contenido de `window.MOVILIDAD_CONTENT` (movilidad-content.js) y lo
 * pinta en los puntos de montaje `[data-render="..."]` del HTML.
 *
 * ARQUITECTURA PARA NEXT.JS:
 * Cada función `render*` equivale a un componente de presentación y recibe su
 * contenido desde la capa de datos. Al conectar el dashboard/Firebase basta con
 * sustituir la carga de `MOVILIDAD_CONTENT` por la respuesta del CMS: ningún
 * texto institucional vive dentro de estas funciones.
 *
 * Los datos aún no proporcionados se muestran como placeholders visibles
 * (`.intl-placeholder`) para que el equipo identifique qué falta por cargar.
 */
(function () {
    'use strict';

    var shell = window.MicrositioInternacionalizacion || {};
    var content = window.MOVILIDAD_CONTENT;

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
        return '<span class="intl-placeholder' + (variant ? ' intl-placeholder--' + variant : '') + '">' +
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

    /* ===========================================================
       NAVEGACIÓN  → <MicrositeNav />
       =========================================================== */
    function renderNav() {
        paint('nav', content.nav.map(function (item) {
            return '<li><a class="intl-nav__link" href="#' + escapeHtml(item.id) + '">' +
                escapeHtml(item.label) + '</a></li>';
        }).join(''));
    }

    /* ===========================================================
       1. HERO  → <Hero />
       =========================================================== */
    function renderHero() {
        var hero = content.hero;

        paint('hero-eyebrow', escapeHtml(hero.eyebrow));
        paint('hero-title', escapeHtml(hero.title));
        paint('hero-lead', escapeHtml(content.whyMobility.lead));

        paint('hero-actions', hero.ctas.map(function (cta) {
            return '<a class="intl-btn intl-btn--' + escapeHtml(cta.variant) + '" href="' + escapeHtml(cta.href) + '">' +
                escapeHtml(cta.label) + icon('arrow_forward') + '</a>';
        }).join(''));

        initHeroVideo();
    }

    /**
     * El video es decorativo: se reproduce en loop, sin audio, y solo cuando
     * existe una URL. Si no hay video (o el usuario prefiere menos movimiento)
     * permanece visible el fondo de respaldo con su placeholder.
     */
    function initHeroVideo() {
        var config = content.hero.video;
        var stage = mount('hero-video');
        var note = mount('hero-video-note');
        var toggle = document.querySelector('[data-hero-video-toggle]');

        if (note) {
            note.innerHTML = config.src
                ? '<span class="intl-placeholder intl-placeholder--light">' + icon('movie') + escapeHtml(config.description) + '</span>'
                : placeholder(config.placeholder, 'light');
        }

        if (!stage || !config.src) return;

        var video = document.createElement('video');
        video.className = 'mov-hero__video';
        video.src = config.src;
        video.muted = true;
        video.defaultMuted = true;
        video.loop = true;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        video.setAttribute('aria-hidden', 'true');
        video.setAttribute('tabindex', '-1');
        video.preload = 'metadata';
        if (config.poster) {
            video.poster = config.poster;
        }

        /* Si el video falla, se retira y queda el fondo de respaldo. */
        video.addEventListener('error', function () {
            if (video.parentNode) {
                video.parentNode.removeChild(video);
            }
            if (toggle) {
                toggle.classList.remove('is-visible');
            }
            if (note) {
                note.innerHTML = placeholder(config.placeholder, 'light');
            }
        });

        stage.appendChild(video);

        var shouldAutoplay = !prefersReducedMotion();
        if (shouldAutoplay) {
            var playPromise = video.play();
            if (playPromise && typeof playPromise.catch === 'function') {
                playPromise.catch(function () {
                    /* Autoplay bloqueado por el navegador: se controla manualmente. */
                });
            }
        }

        if (toggle) {
            toggle.classList.add('is-visible');
            var syncToggle = function () {
                var playing = !video.paused;
                toggle.setAttribute('aria-pressed', playing ? 'true' : 'false');
                toggle.innerHTML = icon(playing ? 'pause' : 'play_arrow') +
                    '<span>' + (playing ? 'Pausar video de fondo' : 'Reproducir video de fondo') + '</span>';
            };

            toggle.addEventListener('click', function () {
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
                syncToggle();
            });

            video.addEventListener('play', syncToggle);
            video.addEventListener('pause', syncToggle);
            syncToggle();
        }
    }

    /* ===========================================================
       2. ¿POR QUÉ REALIZAR MOVILIDAD?  → <WhyMobility />
       =========================================================== */
    function renderWhyMobility() {
        var why = content.whyMobility;

        /* El hero ya muestra `why.lead`: aquí se continúa el mismo contenido sin
           repetirlo, destacando el primer párrafo restante. */
        paint('why-lead', why.leadUsedInHero ? '' : '<p class="mov-about__lead">' + escapeHtml(why.lead) + '</p>');

        paint('why-paragraphs', why.paragraphs.map(function (text, index) {
            var isLead = why.leadUsedInHero && index === 0;
            return '<p class="' + (isLead ? 'mov-about__lead' : 'mov-about__text') + '">' + escapeHtml(text) + '</p>';
        }).join(''));

        paint('why-markers', why.markers.map(function (marker) {
            return '<div class="mov-why__marker">' + icon(marker.icon) + '<span>' + escapeHtml(marker.label) + '</span></div>';
        }).join(''));

        paint('why-media', why.image.src
            ? '<img src="' + escapeHtml(why.image.src) + '" alt="' + escapeHtml(why.image.alt) + '" loading="lazy" />'
            : '<div class="mov-why__media-pattern" aria-hidden="true"></div>' +
              '<div class="relative px-6 text-center">' + placeholder(why.image.placeholder, 'light') + '</div>');
    }

    /* ===========================================================
       3. BENEFICIOS  → <Benefits />
       =========================================================== */
    function renderBenefits() {
        paint('benefits', content.benefits.map(function (benefit, index) {
            return '<article class="mov-benefit" data-stagger>' +
                '<span class="mov-benefit__index">0' + (index + 1) + '</span>' +
                '<span class="mov-benefit__icon">' + icon(benefit.icon) + '</span>' +
                '<p class="mov-benefit__text">' + escapeHtml(benefit.text) + '</p>' +
            '</article>';
        }).join(''));
    }

    /* ===========================================================
       4. TESTIMONIOS  → <Testimonials />
       =========================================================== */
    function renderTestimonials() {
        var testimonials = content.testimonials;

        paint('testimonials', testimonials.items.map(function (item, index) {
            var media = item.video.src
                ? '<video controls preload="metadata"' +
                    (item.video.poster ? ' poster="' + escapeHtml(item.video.poster) + '"' : '') +
                    '><source src="' + escapeHtml(item.video.src) + '" type="' + escapeHtml(item.video.type) + '" />' +
                    'Tu navegador no puede reproducir este video.</video>'
                : placeholder(item.video.placeholder, 'light');

            var name = item.studentName
                ? escapeHtml(item.studentName)
                : '<span class="intl-placeholder intl-placeholder--light">' + icon('person') + 'Nombre pendiente</span>';

            var meta = [item.program, item.destination].filter(Boolean).map(escapeHtml).join(' · ');

            return '<article class="mov-testimonial" data-stagger aria-label="Testimonio ' + (index + 1) + '">' +
                '<div class="mov-testimonial__media">' + media + '</div>' +
                '<div class="mov-testimonial__body">' +
                    '<h3 class="mov-testimonial__name">' + name + '</h3>' +
                    '<p class="mov-testimonial__meta">' + (meta || 'Carrera y universidad de destino pendientes') + '</p>' +
                '</div>' +
            '</article>';
        }).join(''));

        paint('testimonials-note', escapeHtml(testimonials.note));
    }

    /* ===========================================================
       5. ¿QUIÉNES SOMOS?  → <About />
       =========================================================== */
    function renderAbout() {
        var paragraphs = content.about.paragraphs;

        paint('about-lead', paragraphs.filter(function (item) {
            return item.role === 'lead';
        }).map(function (item) {
            return '<p class="mov-about__lead">' + escapeHtml(item.text) + '</p>';
        }).join(''));

        paint('about-body', paragraphs.filter(function (item) {
            return item.role === 'body';
        }).map(function (item) {
            return '<p class="mov-about__text">' + escapeHtml(item.text) + '</p>';
        }).join(''));

        paint('about-quote', paragraphs.filter(function (item) {
            return item.role === 'quote';
        }).map(function (item) {
            return '<blockquote class="mov-about__quote">' + escapeHtml(item.text) + '</blockquote>';
        }).join(''));
    }

    /* ===========================================================
       6. MOVILIDAD NACIONAL E INTERNACIONAL  → <MobilityTypes />
       =========================================================== */
    function renderMobility() {
        var national = content.mobility.national;
        var international = content.mobility.international;

        paint('mobility-national',
            '<span class="mov-panel__badge">' + icon(national.icon) + 'Nacional</span>' +
            '<h3 class="mov-panel__title">' + escapeHtml(national.title) + '</h3>' +
            national.paragraphs.map(function (text) {
                return '<p class="mov-panel__text">' + escapeHtml(text) + '</p>';
            }).join('') +
            '<h4 class="mov-panel__subtitle">' + escapeHtml(national.benefitsTitle) + '</h4>' +
            '<ul class="mov-panel__list">' +
                national.benefits.map(function (text) {
                    return '<li>' + icon('check_circle') + '<span>' + escapeHtml(text) + '</span></li>';
                }).join('') +
            '</ul>');

        paint('mobility-international',
            '<span class="mov-panel__badge">' + icon(international.icon) + 'Internacional</span>' +
            '<h3 class="mov-panel__title">' + escapeHtml(international.title) + '</h3>' +
            international.paragraphs.map(function (text) {
                return '<p class="mov-panel__text">' + escapeHtml(text) + '</p>';
            }).join('') +
            '<div class="mov-panel__highlight mt-8">' +
                '<p class="mov-panel__highlight-title">' + escapeHtml(international.highlightTitle) + '</p>' +
                '<p class="mov-panel__text">' + escapeHtml(international.highlight) + '</p>' +
            '</div>');
    }

    /* ===========================================================
       7. MOVENI  → <Moveni />
       =========================================================== */
    function renderMoveni() {
        var moveni = content.moveni;

        paint('moveni-card',
            '<p class="mov-moveni__acronym">' + escapeHtml(moveni.acronym) + '</p>' +
            '<p class="mov-moveni__fullname">' + escapeHtml(moveni.fullName) + '</p>');

        paint('moveni-highlights', moveni.highlights.map(function (item) {
            return '<li class="mov-moveni__item" data-stagger>' + icon(item.icon) + '<span>' + escapeHtml(item.text) + '</span></li>';
        }).join(''));

        paint('moveni-note', '<span class="intl-placeholder">' + icon('pending') + escapeHtml(moveni.note) + '</span>');
    }

    /* ===========================================================
       8 y 9. MODALIDADES Y TIPOS  → <Modalities /> · <MobilityKinds />
       =========================================================== */
    function renderModalityCard(modality) {
        var summary = modality.summary
            ? '<p class="mov-modality__summary">' + escapeHtml(modality.summary) + '</p>'
            : '<p class="mov-modality__summary">' + placeholder(content.pending.content) + '</p>';

        var link = modality.link
            ? '<a class="mov-modality__link" href="' + escapeHtml(modality.link.href) + '">' +
                escapeHtml(modality.link.label) + icon('arrow_forward') + '</a>'
            : '';

        return '<article class="mov-modality' + (modality.summary ? '' : ' mov-modality--pending') + '" data-stagger>' +
            '<span class="mov-modality__icon">' + icon(modality.icon) + '</span>' +
            '<h3 class="mov-modality__label">' + escapeHtml(modality.label) + '</h3>' +
            summary +
            link +
        '</article>';
    }

    function renderModalities() {
        paint('modalities', content.modalities.map(renderModalityCard).join(''));

        paint('mobility-kinds', content.modalities.filter(function (modality) {
            return modality.group === 'tipo';
        }).map(renderModalityCard).join(''));
    }

    /* ===========================================================
       10. ESTUDIANTES  → <Students />
       =========================================================== */
    function renderStudents() {
        var students = content.students;
        var requirements = students.generalRequirements;

        paint('students-requirements-title', escapeHtml(requirements.title));
        paint('students-requirements-intro', escapeHtml(requirements.intro));
        paint('students-requirements', requirements.items.map(function (item) {
            return '<li class="mov-requirement" data-stagger>' +
                '<span class="mov-requirement__key">' + escapeHtml(item.key) + '</span>' +
                '<span>' + escapeHtml(item.text) + '</span>' +
            '</li>';
        }).join(''));

        paint('students-tabs', students.tracks.map(function (track, index) {
            return '<button type="button" role="tab" class="mov-tab" id="tab-' + escapeHtml(track.id) + '" ' +
                'aria-selected="' + (index === 0 ? 'true' : 'false') + '" ' +
                'aria-controls="panel-' + escapeHtml(track.id) + '" ' +
                'tabindex="' + (index === 0 ? '0' : '-1') + '" ' +
                'data-track="' + escapeHtml(track.id) + '">' +
                icon(track.icon) + escapeHtml(track.label) +
            '</button>';
        }).join(''));

        paint('students-panels', students.tracks.map(function (track, index) {
            var items = track.items.map(function (item) {
                return '<li class="mov-doclist__item">' +
                    (item.key
                        ? '<span class="mov-doclist__key">' + escapeHtml(item.key) + '</span>'
                        : icon('chevron_right', 'mov-doclist__bullet')) +
                    '<span>' + escapeHtml(item.text) + '</span>' +
                '</li>';
            }).join('');

            var footnote = track.footnote
                ? '<p class="mov-panel-doc__intro">' + escapeHtml(track.footnote) + '</p>'
                : '';

            /* data-validation-required marca internamente el contenido que el
               documento original señala como pendiente de validación. */
            return '<div class="mov-panel-doc" role="tabpanel" id="panel-' + escapeHtml(track.id) + '" ' +
                'aria-labelledby="tab-' + escapeHtml(track.id) + '" tabindex="0" ' +
                'data-track-panel="' + escapeHtml(track.id) + '"' +
                (track.validationRequired ? ' data-validation-required="true"' : '') +
                (index === 0 ? '' : ' hidden') + '>' +
                '<h4 class="mov-panel-doc__title">' + escapeHtml(track.title) + '</h4>' +
                '<p class="mov-panel-doc__intro">' + escapeHtml(track.intro) + '</p>' +
                '<ul class="mov-doclist">' + items + '</ul>' +
                footnote +
            '</div>';
        }).join(''));

        initStudentTabs();
    }

    function initStudentTabs() {
        var tablist = mount('students-tabs');
        var panelsHost = mount('students-panels');
        if (!tablist || !panelsHost) return;

        var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[data-track]'));

        var activate = function (trackId, focusTab) {
            tabs.forEach(function (tab) {
                var isActive = tab.getAttribute('data-track') === trackId;
                tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
                tab.setAttribute('tabindex', isActive ? '0' : '-1');
                if (isActive && focusTab) {
                    tab.focus();
                }
            });

            panelsHost.querySelectorAll('[data-track-panel]').forEach(function (panel) {
                panel.hidden = panel.getAttribute('data-track-panel') !== trackId;
            });
        };

        tablist.addEventListener('click', function (event) {
            var tab = event.target.closest('[data-track]');
            if (tab) {
                activate(tab.getAttribute('data-track'), false);
            }
        });

        tablist.addEventListener('keydown', function (event) {
            var currentIndex = tabs.indexOf(document.activeElement);
            if (currentIndex === -1) return;

            var nextIndex = null;
            if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                nextIndex = (currentIndex + 1) % tabs.length;
            } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
            } else if (event.key === 'Home') {
                nextIndex = 0;
            } else if (event.key === 'End') {
                nextIndex = tabs.length - 1;
            }

            if (nextIndex !== null) {
                event.preventDefault();
                activate(tabs[nextIndex].getAttribute('data-track'), true);
            }
        });
    }

    /* ===========================================================
       DOCENTES  → <Faculty />
       =========================================================== */
    /**
     * Tarjeta de público (docentes).
     * El título de la sección ya identifica al público, por eso la tarjeta solo
     * rotula el bloque de contenido ampliable.
     */
    function renderAudienceCard(audience, note) {
        return '<span class="mov-audience__icon">' + icon(audience.icon) + '</span>' +
            '<p class="mov-audience__kicker">Contenido específico · ' + escapeHtml(audience.title) + '</p>' +
            (audience.description
                ? '<p class="mov-about__text">' + escapeHtml(audience.description) + '</p>'
                : '<div class="intl-placeholder-block">' + placeholder(content.pending.content) +
                  (note ? '<p class="mt-3 text-sm">' + escapeHtml(note) + '</p>' : '') + '</div>');
    }

    function renderFaculty() {
        var faculty = content.faculty;

        paint('faculty-paragraphs', faculty.paragraphs.map(function (text, index) {
            return index === 0
                ? '<p class="mov-about__lead">' + escapeHtml(text) + '</p>'
                : '<p class="mov-about__text">' + escapeHtml(text) + '</p>';
        }).join(''));

        paint('faculty-opportunities', faculty.opportunities.map(function (item) {
            return '<div class="mov-chip" data-stagger>' + icon(item.icon) + '<span>' + escapeHtml(item.text) + '</span></div>';
        }).join(''));

        paint('faculty-teachers', renderAudienceCard(faculty.teachers));
    }

    /* ===========================================================
       14. DESTINOS / PAÍSES  → <Destinations />
       =========================================================== */
    var destinationFilters = { audience: 'todos', country: 'todos', agreement: 'todos' };

    function getDestinations() {
        return content.destinations.items.filter(function (item) {
            var byAudience = destinationFilters.audience === 'todos' ||
                (item.audiences || []).indexOf(destinationFilters.audience) !== -1;
            var byCountry = destinationFilters.country === 'todos' || item.country === destinationFilters.country;
            var byAgreement = destinationFilters.agreement === 'todos' || item.agreementType === destinationFilters.agreement;
            return byAudience && byCountry && byAgreement;
        });
    }

    function uniqueValues(key) {
        var seen = [];
        content.destinations.items.forEach(function (item) {
            if (item[key] && seen.indexOf(item[key]) === -1) {
                seen.push(item[key]);
            }
        });
        return seen.sort(function (a, b) {
            return a.localeCompare(b, 'es');
        });
    }

    function renderDestinationsList() {
        var items = getDestinations();
        var host = mount('destinations-list');
        if (!host) return;

        if (!items.length) {
            host.innerHTML = '<div class="mov-empty">' + icon('travel_explore') +
                '<p>' + escapeHtml(content.destinations.emptyMessage) + '</p>' +
                placeholder(content.pending.data) +
            '</div>';
            return;
        }

        host.innerHTML = '<div class="mov-table-scroll"><table class="mov-destination-table">' +
            '<caption class="sr-only">Destinos de movilidad por país, universidad y tipo de convenio</caption>' +
            '<thead><tr><th scope="col">País</th><th scope="col">Universidad</th><th scope="col">Tipo de convenio</th></tr></thead>' +
            '<tbody>' +
                items.map(function (item) {
                    var university = item.url
                        ? '<a class="mov-modality__link" href="' + escapeHtml(item.url) + '" target="_blank" rel="noreferrer">' + escapeHtml(item.university) + icon('open_in_new') + '</a>'
                        : escapeHtml(item.university);
                    return '<tr>' +
                        '<td>' + escapeHtml(item.country) + '</td>' +
                        '<td>' + university + '</td>' +
                        '<td><span class="mov-tag">' + escapeHtml(item.agreementType) + '</span></td>' +
                    '</tr>';
                }).join('') +
            '</tbody></table></div>';
    }

    function renderDestinationsMap() {
        var host = mount('destinations-map');
        if (!host || !content.destinations.map.enabled) return;

        var items = getDestinations().filter(function (item) {
            return item.map && typeof item.map.x === 'number' && typeof item.map.y === 'number';
        });

        var markers = items.map(function (item) {
            return '<button type="button" class="mov-map__marker" style="left:' + item.map.x + '%; top:' + item.map.y + '%" ' +
                'title="' + escapeHtml(item.country + ' — ' + item.university) + '">' +
                '<span class="sr-only">' + escapeHtml(item.country + ': ' + item.university) + '</span>' +
            '</button>';
        }).join('');

        host.innerHTML = '<div class="mov-map__grid" aria-hidden="true"></div>' + markers +
            (items.length ? '' : '<div class="mov-map__empty">' + icon('map') +
                '<p class="mt-2">' + escapeHtml(content.destinations.map.emptyMessage) + '</p>' +
                '<div class="mt-3">' + placeholder(content.pending.data) + '</div>' +
            '</div>');
    }

    function renderDestinations() {
        var audiences = content.destinations.audiences;

        paint('destinations-audiences', '<button type="button" class="mov-tab" aria-pressed="true" data-audience="todos">' +
            icon('groups') + 'Todos</button>' +
            audiences.map(function (audience) {
                return '<button type="button" class="mov-tab" aria-pressed="false" data-audience="' + escapeHtml(audience.id) + '">' +
                    icon(audience.icon) + escapeHtml(audience.label) + '</button>';
            }).join(''));

        var countryOptions = ['<option value="todos">Todos los países</option>'].concat(
            uniqueValues('country').map(function (country) {
                return '<option value="' + escapeHtml(country) + '">' + escapeHtml(country) + '</option>';
            })
        ).join('');

        var agreementOptions = ['<option value="todos">Todos los convenios</option>'].concat(
            uniqueValues('agreementType').map(function (type) {
                return '<option value="' + escapeHtml(type) + '">' + escapeHtml(type) + '</option>';
            })
        ).join('');

        var countrySelect = document.getElementById('mov-filter-country');
        var agreementSelect = document.getElementById('mov-filter-agreement');
        if (countrySelect) countrySelect.innerHTML = countryOptions;
        if (agreementSelect) agreementSelect.innerHTML = agreementOptions;

        renderDestinationsList();
        renderDestinationsMap();
        initDestinationFilters();
    }

    function initDestinationFilters() {
        var audienceHost = mount('destinations-audiences');
        var countrySelect = document.getElementById('mov-filter-country');
        var agreementSelect = document.getElementById('mov-filter-agreement');

        if (audienceHost) {
            audienceHost.addEventListener('click', function (event) {
                var button = event.target.closest('[data-audience]');
                if (!button) return;

                destinationFilters.audience = button.getAttribute('data-audience');
                audienceHost.querySelectorAll('[data-audience]').forEach(function (item) {
                    var isActive = item === button;
                    item.setAttribute('aria-pressed', isActive ? 'true' : 'false');
                    item.setAttribute('aria-selected', isActive ? 'true' : 'false');
                });

                renderDestinationsList();
                renderDestinationsMap();
            });
        }

        if (countrySelect) {
            countrySelect.addEventListener('change', function (event) {
                destinationFilters.country = event.target.value;
                renderDestinationsList();
                renderDestinationsMap();
            });
        }

        if (agreementSelect) {
            agreementSelect.addEventListener('change', function (event) {
                destinationFilters.agreement = event.target.value;
                renderDestinationsList();
                renderDestinationsMap();
            });
        }
    }

    /* ===========================================================
       15. UNIVERSIDADES SOCIAS  → <PartnerUniversities />
       =========================================================== */
    function renderPartners() {
        var partners = content.partnerUniversities;
        var host = mount('partners');
        if (!host) return;

        if (!partners.items.length) {
            var cards = [];
            for (var i = 0; i < partners.placeholderCount; i += 1) {
                cards.push(
                    '<article class="mov-partner mov-partner--placeholder" data-stagger>' +
                        '<div class="mov-partner__logo">' + icon('account_balance') + '</div>' +
                        '<h3 class="mov-partner__name">' + placeholder('Universidad socia pendiente') + '</h3>' +
                        '<div class="mov-partner__meta">' +
                            partners.fields.map(function (field) {
                                return '<span class="mov-tag mov-tag--blue">' + escapeHtml(field) + '</span>';
                            }).join('') +
                        '</div>' +
                    '</article>'
                );
            }
            host.innerHTML = cards.join('');
            paint('partners-note', '<span class="intl-placeholder">' + icon('pending') + escapeHtml(partners.emptyMessage) + '</span>');
            return;
        }

        host.innerHTML = partners.items.map(function (partner) {
            var logo = partner.logo
                ? '<img src="' + escapeHtml(partner.logo) + '" alt="Logo de ' + escapeHtml(partner.name) + '" loading="lazy" />'
                : icon('account_balance');

            var link = partner.url
                ? '<a class="mov-modality__link" href="' + escapeHtml(partner.url) + '" target="_blank" rel="noreferrer">Visitar sitio' + icon('open_in_new') + '</a>'
                : '';

            return '<article class="mov-partner" data-stagger>' +
                '<div class="mov-partner__logo">' + logo + '</div>' +
                '<h3 class="mov-partner__name">' + escapeHtml(partner.name) + '</h3>' +
                '<div class="mov-partner__meta">' +
                    (partner.country ? '<span class="mov-tag mov-tag--blue">' + escapeHtml(partner.country) + '</span>' : '') +
                    (partner.agreementType ? '<span class="mov-tag">' + escapeHtml(partner.agreementType) + '</span>' : '') +
                '</div>' +
                link +
            '</article>';
        }).join('');

        paint('partners-note', '');
    }

    /* ===========================================================
       16. KPIs  → <KPIs />
       =========================================================== */
    function renderKpis() {
        var reduced = prefersReducedMotion();

        paint('kpis', content.kpis.map(function (kpi) {
            /* Sin animación de conteo cuando el usuario pide menos movimiento. */
            var number = reduced
                ? '<span>' + kpi.value + '</span>'
                : '<span data-animate-number data-target="' + kpi.value + '">0</span>';

            return '<article class="mov-kpi" data-stagger>' +
                '<span class="mov-kpi__icon">' + icon(kpi.icon) + '</span>' +
                '<p class="mov-kpi__value">' +
                    (kpi.prefix ? '<span>' + escapeHtml(kpi.prefix) + '</span>' : '') +
                    number +
                    (kpi.suffix ? '<span>' + escapeHtml(kpi.suffix) + '</span>' : '') +
                '</p>' +
                '<p class="mov-kpi__label">' + escapeHtml(kpi.label) + '</p>' +
            '</article>';
        }).join(''));
    }

    /* ===========================================================
       17. APLICA  → <Apply />
       =========================================================== */
    function renderApply() {
        var apply = content.apply;

        /* Mientras `apply.url` sea null el botón queda deshabilitado y el
           placeholder del enlace se muestra de forma explícita. */
        paint('apply-cta', apply.url
            ? '<a class="intl-btn intl-btn--light" href="' + escapeHtml(apply.url) + '">' +
                escapeHtml(apply.label) + icon('arrow_forward') + '</a>'
            : '<button type="button" class="intl-btn intl-btn--light" aria-disabled="true" disabled>' +
                escapeHtml(apply.label) + icon('arrow_forward') + '</button>');

        paint('apply-note', apply.url
            ? ''
            : placeholder(apply.urlPlaceholder + ' · ' + apply.note, 'light'));
    }

    /* ===========================================================
       18. DOCUMENTOS  → <Documents />
       =========================================================== */
    function renderDocuments() {
        paint('documents', content.documents.map(function (doc) {
            var isPending = !doc.url;

            var action = doc.url
                ? '<a class="mov-doc-card__btn" href="' + escapeHtml(doc.url) + '" download>' + icon('download') + 'Descargar</a>'
                : '<button type="button" class="mov-doc-card__btn" aria-disabled="true" disabled>' + icon('download') + 'Descargar</button>';

            return '<article class="mov-doc-card' + (isPending ? ' mov-doc-card--pending' : '') + '" data-stagger>' +
                '<span class="mov-doc-card__icon">' + icon(doc.icon) + '</span>' +
                '<h3 class="mov-doc-card__name">' + escapeHtml(doc.name) + '</h3>' +
                '<p class="mov-doc-card__desc">' +
                    (doc.description ? escapeHtml(doc.description) : placeholder(content.pending.content)) +
                '</p>' +
                '<div class="mov-doc-card__footer">' +
                    '<span class="mov-doc-card__type">' + (doc.fileType ? escapeHtml(doc.fileType) : 'Tipo pendiente') + '</span>' +
                    action +
                '</div>' +
            '</article>';
        }).join(''));
    }

    /* ===========================================================
       19. CONTACTO  → <Contact />
       =========================================================== */
    function renderContact() {
        var contact = content.contact;

        paint('contact-extension', escapeHtml(contact.extension));

        paint('contact-emails', contact.emails.map(function (email) {
            return '<li><a class="mov-mail" href="mailto:' + escapeHtml(email) + '">' +
                icon('mail') + '<span>' + escapeHtml(email) + '</span></a></li>';
        }).join(''));
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
                window.configFunctions.logError('MOVILIDAD_CONTENT no está disponible.');
            }
            return;
        }

        applyMeta();
        renderNav();
        renderHero();
        renderWhyMobility();
        renderBenefits();
        renderTestimonials();
        renderAbout();
        renderMobility();
        renderMoveni();
        renderModalities();
        renderStudents();
        renderFaculty();
        renderDestinations();
        renderPartners();
        renderKpis();
        renderApply();
        renderDocuments();
        renderContact();

        /* Los elementos se crean después de que animations.js se inicializó:
           se vuelven a observar para que reciban la animación de entrada. */
        if (window.animationFunctions) {
            window.animationFunctions.initStaggerAnimations();
            if (!prefersReducedMotion()) {
                window.animationFunctions.initNumberAnimations();
            }
        }

        if (shell.initScrollSpy) {
            shell.initScrollSpy();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.movilidadLanding = {
        init: init,
        renderDestinations: renderDestinations,
        content: content
    };
})();
