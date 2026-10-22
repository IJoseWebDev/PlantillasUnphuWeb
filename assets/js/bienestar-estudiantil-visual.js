/**
 * BIENESTAR ESTUDIANTIL — FOTOS Y MODALES DE LECTURA
 *
 * Las fotografías del campus viven en assets/images/bienestar-estudiantil-img.
 * Las de la carpeta web/ son de Unsplash (uso libre) y solo ambientan temas
 * para los que no hay una toma institucional: estudio, acompañamiento,
 * biblioteca y vida saludable. No sustituyen retratos oficiales del equipo.
 *
 * El texto largo de las landings se abre con `registerDetail`: el texto
 * completo queda en el modal; la página muestra la imagen y un avance.
 */
(function () {
    'use strict';

    var shell = window.MicrositioBienestarEstudiantil || {};
    var BASE = '../../assets/images/bienestar-estudiantil-img/';

    function escapeHtml(text) {
        if (shell.escapeHtml) {
            return shell.escapeHtml(text);
        }
        return String(text === null || typeof text === 'undefined' ? '' : text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function photo(file, alt, position) {
        return {
            src: BASE + file,
            alt: alt,
            position: position || 'center 22%'
        };
    }

    var photos = {
        amigas: photo('IMG_1516.JPG.jpeg', 'Dos estudiantes sonriendo en el campus de la UNPHU'),
        picnic: photo('IMG_1517.JPG.jpeg', 'Estudiantes estudiando juntos al aire libre en la UNPHU', 'center 58%'),
        laptop: photo('IMG_1518.JPG.jpeg', 'Estudiante trabajando en su portátil en el campus de la UNPHU'),
        retrato: photo('IMG_1519.JPG.jpeg', 'Estudiante de la UNPHU en el campus'),
        charla: photo('IMG_1520.JPG.jpeg', 'Estudiantes conversando y tomando apuntes en el campus de la UNPHU', 'center 38%'),
        sonrisa: photo('IMG_1521.JPG.jpeg', 'Estudiante de la UNPHU durante una actividad en el campus'),
        lectura: photo('IMG_1522.JPG.jpeg', 'Estudiante revisando sus apuntes en el campus de la UNPHU'),
        equipo: photo('IMG_1529.JPG.jpeg', 'Grupo de estudiantes colaborando con una computadora en la UNPHU', 'center 42%'),
        tutoria: photo('IMG_1530.JPG.jpeg', 'Estudiantes revisando juntos un trabajo en el campus de la UNPHU', 'center 42%'),
        grupo: photo('IMG_1532.JPG.jpeg', 'Estudiantes reunidos frente a un edificio de la UNPHU', 'center 46%'),
        estudio: photo('web/estudio.jpg', 'Grupo de estudiantes estudiando juntos', 'center center'),
        estudio: photo('web/estudio.jpg', 'Grupo de estudiantes estudiando juntos', 'center center'),
        colaboracion: photo('web/colaboracion.jpg', 'Estudiantes colaborando frente a sus computadoras', 'center center'),
        biblioteca: photo('web/biblioteca.jpg', 'Estantería de una biblioteca', 'center center'),
        pasillo: photo('web/campus.jpg', 'Pasillo de una biblioteca universitaria', 'center center'),
        bienestar: photo('web/bienestar.jpg', 'Actividad de bienestar al aire libre', 'center center'),
        aula: photo('web/aula.jpg', 'Estudiante entre los estantes de una biblioteca', 'center center'),
        acompanamiento: photo('web/acompanamiento.jpg', 'Conversación de acompañamiento entre dos personas', 'center center'),
        grupoAire: photo('web/grupo-aire.jpg', 'Grupo de jóvenes compartiendo un momento al aire libre', 'center center')
    };

    var heroes = {
        orientacion: photos.charla,
        'orientacion-vocacional': photos.sonrisa,
        'cambio-de-carrera': photos.lectura,
        reingreso: photos.laptop,
        'apoyo-emocional': photos.acompanamiento,
        'vida-integral': photos.bienestar,
        upa: photos.tutoria
    };

    var pools = {
        orientacion: [photos.amigas, photos.equipo, photos.lectura, photos.retrato, photos.picnic, photos.grupo],
        'orientacion-vocacional': [photos.sonrisa, photos.estudio, photos.charla, photos.lectura, photos.colaboracion],
        'cambio-de-carrera': [photos.lectura, photos.laptop, photos.pasillo, photos.estudio],
        reingreso: [photos.laptop, photos.grupo, photos.aula, photos.picnic],
        'apoyo-emocional': [photos.acompanamiento, photos.retrato, photos.charla, photos.amigas],
        'vida-integral': [photos.bienestar, photos.grupoAire, photos.equipo, photos.amigas, photos.picnic],
        upa: [photos.tutoria, photos.picnic, photos.estudio, photos.biblioteca, photos.colaboracion, photos.lectura]
    };

    var cursors = {};
    var registry = {};
    var opened = {};

    function reset(pageKey) {
        cursors[pageKey] = 0;
    }

    function photoFor(pageKey) {
        var pool = pools[pageKey] || [photos.grupo, photos.picnic, photos.equipo];
        var index = cursors[pageKey] || 0;
        cursors[pageKey] = index + 1;
        return pool[index % pool.length];
    }

    function heroFor(pageKey) {
        return heroes[pageKey] || photos.grupo;
    }

    function excerpt(text, max) {
        var clean = String(text || '').replace(/\s+/g, ' ').trim();
        if (clean.length <= max) {
            return clean;
        }
        var cut = clean.slice(0, max);
        var last = cut.lastIndexOf(' ');
        return (last > 40 ? cut.slice(0, last) : cut).replace(/[.,;:]+$/, '') + '…';
    }

    function imgTag(item, lazy) {
        return '<img class="bst-photo" src="' + escapeHtml(item.src) + '" alt="' + escapeHtml(item.alt) + '"' +
            ' style="object-position:' + escapeHtml(item.position || 'center 22%') + '"' +
            (lazy ? ' loading="lazy"' : '') + ' decoding="async">';
    }

    function figure(item, className, lazy) {
        return '<figure class="' + className + '">' + imgTag(item, lazy !== false) + '</figure>';
    }

    function moreButton(id, label) {
        return '<button type="button" class="bst-more" data-bst-detail="' + escapeHtml(id) + '" aria-haspopup="dialog">' +
            escapeHtml(label) +
            '<span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span>' +
        '</button>';
    }

    function registerDetail(id, title, bodyHtml, image) {
        registry[id] = {
            title: title,
            body: bodyHtml,
            image: image || null
        };
    }

    function openDetail(id) {
        var spec = registry[id];
        if (!spec || !shell.buildModal) {
            return;
        }

        if (!opened[id]) {
            var banner = spec.image ? figure(spec.image, 'bst-modal-banner', false) : '';
            var modal = shell.buildModal({
                id: id,
                title: spec.title,
                body: banner + '<div class="bst-modal-copy">' + spec.body + '</div>'
            });
            var panel = modal.element.querySelector('.bie-modal__panel');
            if (panel) {
                panel.classList.add('bst-modal-panel');
            }
            opened[id] = modal;
        }

        opened[id].open();
    }

    document.addEventListener('click', function (event) {
        var trigger = event.target.closest('[data-bst-detail]');
        if (!trigger) {
            return;
        }
        event.preventDefault();
        openDetail(trigger.getAttribute('data-bst-detail'));
    });

    window.BienestarVisual = {
        photos: photos,
        reset: reset,
        photoFor: photoFor,
        heroFor: heroFor,
        excerpt: excerpt,
        figure: figure,
        imgTag: imgTag,
        moreButton: moreButton,
        registerDetail: registerDetail,
        openDetail: openDetail
    };
})();
