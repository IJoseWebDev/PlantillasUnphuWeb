/* ========================================
   FORMS.JS - GESTIÓN DE FORMULARIOS
   ======================================== */

/**
 * Valida formulario básico
 */
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input, textarea, select');
    let isValid = true;
    const errors = {};

    inputs.forEach(input => {
        const error = validateInput(input);
        if (error) {
            isValid = false;
            errors[input.name] = error;
            showFieldError(input, error);
        } else {
            clearFieldError(input);
        }
    });

    return { isValid, errors };
}

/**
 * Valida un input individual
 */
function validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    const required = input.required;
    const minLength = input.minLength;
    const pattern = input.pattern;

    // Verificar si es requerido
    if (required && !value) {
        return 'Este campo es requerido';
    }

    // Verificar tipo
    if (value && type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return 'Email inválido';
        }
    }

    // Verificar longitud mínima
    if (minLength && value && value.length < minLength) {
        return `Mínimo ${minLength} caracteres`;
    }

    // Verificar patrón
    if (pattern && value) {
        const regex = new RegExp(pattern);
        if (!regex.test(value)) {
            return 'Formato inválido';
        }
    }

    return null;
}

/**
 * Muestra error en un campo
 */
function showFieldError(input, errorMessage) {
    input.classList.add('error');
    input.setAttribute('aria-invalid', 'true');
    
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('field-error')) {
        errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    
    errorElement.textContent = errorMessage;
    errorElement.style.display = 'block';
}

/**
 * Limpia error en un campo
 */
function clearFieldError(input) {
    input.classList.remove('error');
    input.setAttribute('aria-invalid', 'false');
    
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('field-error')) {
        errorElement.style.display = 'none';
    }
}

/**
 * Obtiene datos del formulario como objeto
 */
function getFormData(formElement) {
    const formData = new FormData(formElement);
    const data = {};
    
    formData.forEach((value, key) => {
        if (data[key]) {
            if (Array.isArray(data[key])) {
                data[key].push(value);
            } else {
                data[key] = [data[key], value];
            }
        } else {
            data[key] = value;
        }
    });
    
    return data;
}

/**
 * Rellena formulario con datos
 */
function populateForm(formElement, data) {
    Object.keys(data).forEach(key => {
        const input = formElement.querySelector(`[name="${key}"]`);
        if (input) {
            if (input.type === 'checkbox' || input.type === 'radio') {
                input.checked = data[key] === true || data[key] === input.value;
            } else {
                input.value = data[key];
            }
        }
    });
}

/**
 * Limpia todos los campos del formulario
 */
function clearForm(formElement) {
    formElement.reset();
    formElement.querySelectorAll('.field-error').forEach(el => {
        el.style.display = 'none';
    });
    formElement.querySelectorAll('input, textarea, select').forEach(input => {
        input.classList.remove('error');
        input.setAttribute('aria-invalid', 'false');
    });
}

/**
 * Deshabilita todos los inputs del formulario
 */
function disableForm(formElement, disable = true) {
    const inputs = formElement.querySelectorAll('input, textarea, select, button');
    inputs.forEach(input => {
        input.disabled = disable;
    });
}

/**
 * Muestra estado de carga en un botón
 */
function setButtonLoading(button, loading = true) {
    if (loading) {
        button.dataset.originalText = button.textContent;
        button.textContent = 'Enviando...';
        button.disabled = true;
        button.classList.add('loading');
    } else {
        button.textContent = button.dataset.originalText || 'Enviar';
        button.disabled = false;
        button.classList.remove('loading');
    }
}

/**
 * Maneja envío de formulario con validación
 */
function handleFormSubmit(formElement, submitCallback) {
    formElement.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const validation = validateForm(this);
        if (!validation.isValid) {
            console.log('Errores de validación:', validation.errors);
            return;
        }

        const submitButton = this.querySelector('button[type="submit"]');
        if (submitButton) {
            setButtonLoading(submitButton, true);
        }

        try {
            const formData = getFormData(this);
            await submitCallback(formData);
        } catch (error) {
            console.error('Error en envío:', error);
            alert('Error al enviar el formulario. Intenta de nuevo.');
        } finally {
            if (submitButton) {
                setButtonLoading(submitButton, false);
            }
        }
    });
}

/**
 * Valida input en tiempo real
 */
function enableRealtimeValidation(formElement) {
    const inputs = formElement.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const error = validateInput(this);
            if (error) {
                showFieldError(this, error);
            } else {
                clearFieldError(this);
            }
        });

        input.addEventListener('input', function() {
            const error = validateInput(this);
            if (!error) {
                clearFieldError(this);
            }
        });
    });
}

/**
 * Valida igualdad de dos campos (ej: contraseña)
 */
function validateFieldMatch(field1, field2, errorMessage = 'Los campos no coinciden') {
    if (field1.value !== field2.value) {
        showFieldError(field2, errorMessage);
        return false;
    } else {
        clearFieldError(field2);
        return true;
    }
}

/**
 * Exporta funciones
 */
window.formFunctions = {
    validateForm,
    validateInput,
    showFieldError,
    clearFieldError,
    getFormData,
    populateForm,
    clearForm,
    disableForm,
    setButtonLoading,
    handleFormSubmit,
    enableRealtimeValidation,
    validateFieldMatch
};
