/**
 * ÚNETE A UNPHU — FORMULARIOS
 *
 * Postulación a una vacante y Banco de Talento son flujos distintos.
 * El envío es una simulación: clasifica el asunto y no llama a ningún
 * correo, API ni almacenamiento. El aviso permanece visible para que
 * nadie crea que Gestión Humana recibió la postulación.
 */
(function () {
    'use strict';

    var content = window.UNETE_CONTENT;
    var forms = window.formFunctions;
    var shell = window.MicrositioUnete || {};
    var escapeHtml = shell.escapeHtml || function (text) { return String(text || ''); };

    var CEDULA = /^\d{3}-\d{7}-\d{1}$/;
    var MAX_CV = 10 * 1024 * 1024;

    function ready(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }

    function fillSelect(select, items) {
        if (!select || select.getAttribute('data-une-filled') === 'true') return;
        var current = select.value;
        var placeholder = select.querySelector('option[value=""]');
        var html = placeholder ? placeholder.outerHTML : '<option value="">Selecciona una opción</option>';
        html += items.map(function (item) {
            return '<option value="' + escapeHtml(item.value) + '">' + escapeHtml(item.label) + '</option>';
        }).join('');
        select.innerHTML = html;
        if (current) select.value = current;
        select.setAttribute('data-une-filled', 'true');
    }

    function fillOptions(form) {
        if (!content) return;
        form.querySelectorAll('[data-une-options]').forEach(function (select) {
            var key = select.getAttribute('data-une-options');
            if (content[key]) fillSelect(select, content[key]);
        });

        var puesto = form.querySelector('[data-une-puestos]');
        if (puesto) {
            fillSelect(puesto, content.vacantes.map(function (vacante) {
                return { value: vacante.id, label: vacante.titulo };
            }));
            var params = new URLSearchParams(window.location.search);
            var id = params.get('id');
            if (id && content.vacantes.some(function (vacante) { return vacante.id === id; })) {
                puesto.value = id;
            }
        }
    }

    function formatCedula(value) {
        var digits = String(value || '').replace(/\D/g, '').slice(0, 11);
        var parts = [];
        if (digits.length) parts.push(digits.slice(0, 3));
        if (digits.length > 3) parts.push(digits.slice(3, 10));
        if (digits.length > 10) parts.push(digits.slice(10));
        return parts.join('-');
    }

    function groupError(group, message) {
        if (!group) return;
        var error = group.querySelector('[data-une-error]');
        if (!error) return;
        if (!message) {
            error.textContent = '';
            error.classList.remove('is-visible');
            return;
        }
        error.textContent = message;
        error.classList.add('is-visible');
    }

    function selectedRadio(form, name) {
        var chosen = form.querySelector('input[name="' + name + '"]:checked');
        return chosen ? chosen.value : '';
    }

    function setBlock(block, visible) {
        if (!block) return;
        block.hidden = !visible;
        block.querySelectorAll('input, select, textarea').forEach(function (field) {
            if (visible) {
                if (field.getAttribute('data-une-require') === 'true') field.required = true;
                field.disabled = false;
            } else {
                field.required = false;
                field.disabled = true;
                if (field.type !== 'checkbox' && field.type !== 'radio') field.value = '';
            }
        });
    }

    function bindConditionals(form) {
        function sync() {
            var family = selectedRadio(form, 'familiares');
            setBlock(form.querySelector('[data-une-family]'), family === 'si');

            var experience = selectedRadio(form, 'tieneExperiencia');
            var time = form.querySelector('[name="tiempoExperiencia"]');
            var story = form.querySelector('[name="experiencia"]');
            if (time && story) {
                var withExperience = experience === 'si';
                time.required = withExperience;
                story.required = withExperience;
                if (experience === 'no') {
                    time.value = 'sin-experiencia';
                    story.required = false;
                }
            }

            setBlock(form.querySelector('[data-une-area-otra]'), form.area && form.area.value === 'otra');
            setBlock(form.querySelector('[data-une-tipo-otra]'), form.tipoVacante && form.tipoVacante.value === 'otra');
            updateSubject(form);
        }

        if (form.getAttribute('data-une-bound') !== 'true') {
            form.addEventListener('change', sync);
            form.addEventListener('input', function (event) {
                if (event.target && event.target.name === 'cedula') {
                    var next = formatCedula(event.target.value);
                    if (event.target.value !== next) event.target.value = next;
                }
                updateSubject(form);
            });
            form.setAttribute('data-une-bound', 'true');
        }
        sync();
    }

    function vacanteTitulo(id) {
        if (!content) return '';
        var found = content.vacantes.filter(function (item) { return item.id === id; })[0];
        return found ? found.titulo : '';
    }

    function optionText(select) {
        if (!select || !select.value) return '';
        var option = select.options[select.selectedIndex];
        return option ? option.text : '';
    }

    function updateSubject(form) {
        var mount = document.querySelector('[data-une-subject]');
        if (!mount) return;
        var nombre = (form.nombre && form.nombre.value.trim()) || 'Nombre';
        var kind = form.getAttribute('data-une-form');
        var subject;

        if (kind === 'vacante') {
            var titulo = vacanteTitulo(form.vacanteId && form.vacanteId.value) || 'Puesto';
            subject = '[Vacante] ' + titulo + ' — ' + nombre;
        } else {
            var area = optionText(form.area) || 'Área';
            if (form.area && form.area.value === 'otra' && form.areaOtra && form.areaOtra.value.trim()) {
                area = form.areaOtra.value.trim();
            }
            subject = '[Banco de talento] ' + area + ' — ' + nombre;
        }

        mount.textContent = subject;
    }

    function validateExtra(form) {
        var valid = true;

        function fail(field, message) {
            valid = false;
            if (field && forms) forms.showFieldError(field, message);
        }

        function ok(field) {
            if (field && forms) forms.clearFieldError(field);
        }

        var cedula = form.querySelector('[name="cedula"]');
        if (cedula && cedula.value && !CEDULA.test(cedula.value)) {
            fail(cedula, 'Usa el formato 000-0000000-0.');
        } else if (cedula && cedula.value) {
            ok(cedula);
        }

        var phone = form.querySelector('[name="telefono"]');
        if (phone && phone.value) {
            var digits = phone.value.replace(/\D/g, '');
            if (digits.length < 10) fail(phone, 'Ingresa un teléfono de al menos 10 dígitos.');
            else ok(phone);
        }

        var link = form.querySelector('[name="linkedin"]');
        if (link && link.value.trim()) {
            try {
                var url = new URL(link.value.trim());
                if (url.protocol !== 'http:' && url.protocol !== 'https:') throw new Error('protocol');
                ok(link);
            } catch (error) {
                fail(link, 'Ingresa un enlace válido, con https://.');
            }
        } else if (link) {
            ok(link);
        }

        ['familiares', 'tieneExperiencia', 'disponibilidad'].forEach(function (name) {
            var group = form.querySelector('[data-une-group="' + name + '"]');
            if (!group) return;
            if (!selectedRadio(form, name)) {
                valid = false;
                groupError(group, 'Elige una opción.');
            } else {
                groupError(group, '');
            }
        });

        var consent = form.querySelector('[name="consentimiento"]');
        var consentGroup = form.querySelector('[data-une-group="consentimiento"]');
        if (consent && !consent.checked) {
            valid = false;
            groupError(consentGroup, 'Debes aceptar la política para continuar.');
        } else {
            groupError(consentGroup, '');
        }

        var file = form.querySelector('[name="cv"]');
        if (file) {
            var selected = file.files && file.files[0];
            if (!selected) {
                fail(file, 'Adjunta tu currículum en PDF.');
            } else {
                var pdf = selected.type === 'application/pdf' || /\.pdf$/i.test(selected.name);
                if (!pdf) fail(file, 'El archivo debe ser PDF.');
                else if (selected.size > MAX_CV) fail(file, 'El PDF no puede pasar de 10 MB.');
                else ok(file);
            }
        }

        var experience = selectedRadio(form, 'tieneExperiencia');
        var time = form.querySelector('[name="tiempoExperiencia"]');
        if (experience === 'si' && time && (!time.value || time.value === 'sin-experiencia')) {
            fail(time, 'Indica el tiempo de experiencia.');
        }
        if (experience === 'no' && time && time.value && time.value !== 'sin-experiencia') {
            fail(time, 'Si no tienes experiencia, elige «Sin experiencia».');
        }

        return valid;
    }

    function showStatus(form, html) {
        var host = form.querySelector('[data-une-status]');
        if (!host) return;
        host.className = 'une-status une-status--success is-visible';
        host.innerHTML = html;
        host.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function simulate(form) {
        var kind = form.getAttribute('data-une-form');
        var nombre = form.nombre.value.trim();
        var subject = document.querySelector('[data-une-subject]');
        var subjectText = subject ? subject.textContent : '';
        var detail = kind === 'vacante'
            ? 'Postulación a una vacante.'
            : 'Registro en el Banco de Talento.';

        if (window.configFunctions && window.configFunctions.logInfo) {
            window.configFunctions.logInfo('Simulación Únete a UNPHU (sin envío)', {
                clasificacion: subjectText,
                campos: ['nombre', 'cedula', 'telefono', 'correo', 'cv']
            });
        }

        showStatus(
            form,
            '<span class="material-symbols-outlined" aria-hidden="true">science</span>' +
            '<span><strong>Simulación registrada, sin envío.</strong> ' +
            escapeHtml(detail) + ' El asunto quedaría así: ' + escapeHtml(subjectText) +
            '. Nada se envió a un correo, a un servidor ni quedó guardado. ' +
            escapeHtml(nombre) + ', esta pantalla solo demuestra el recorrido.</span>'
        );

        if (forms) forms.clearForm(form);
        var params = new URLSearchParams(window.location.search);
        if (form.vacanteId && params.get('id')) {
            form.vacanteId.value = params.get('id');
        }
        bindConditionals(form);
    }

    function handleSubmit(form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            var base = forms ? forms.validateForm(form) : { isValid: true };
            var extra = validateExtra(form);
            if (!base.isValid || !extra) {
                var first = form.querySelector('[aria-invalid="true"], .une-group-error.is-visible');
                var focusTarget = form.querySelector('[aria-invalid="true"]');
                if (focusTarget && typeof focusTarget.focus === 'function') focusTarget.focus();
                else if (first && typeof first.scrollIntoView === 'function') {
                    first.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }
            simulate(form);
        });
    }

    function init() {
        var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-une-form]'));
        nodes.forEach(function (form) {
            fillOptions(form);
            bindConditionals(form);
            if (forms) forms.enableRealtimeValidation(form);
            handleSubmit(form);
        });
    }

    ready(init);
})();
