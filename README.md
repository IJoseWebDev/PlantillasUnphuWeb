# 🎓 UNPHU Landings - Plantillas de Páginas de Destino

Sistema modular y escalable para crear landings individuales que serán integrados a un sitio principal.

## 📁 Estructura del Proyecto

```
PlantillasUnphuWeb/
├── 📂 landings/                          # Todos los HTML de landings
│   ├── dobleTitulacion.html             # ✅ Landing completado
│   └── template.html                     # 🔖 Plantilla para nuevos landings
│
├── 📂 assets/
│   ├── css/
│   │   └── global.css                   # Estilos, variables, animaciones
│   ├── js/
│   │   ├── common.js                    # Scroll suave, CTAs globales
│   │   ├── animations.js                # Fade-in, stagger, parallax, etc
│   │   ├── utils.js                     # Validaciones, localStorage, helpers
│   │   ├── forms.js                     # Gestión completa de formularios
│   │   └── [modulos-especificos].js     # Módulos personalizados
│   ├── images/                          # Imágenes (iconos, backgrounds, etc)
│   └── fonts/                           # Fuentes locales (si aplica)
│
├── 📄 config.js                         # Configuración global y logging
├── 📄 ARCHITECTURE.md                   # Guía de desarrollo detallada
├── 📄 README.md                         # Este archivo
└── 📄 package.json                      # Metadata

```

## ✨ Características

- ✅ **Landing Completo**: HTML self-contained sin header/footer
- ✅ **Responsive**: Mobile-first design
- ✅ **Modular**: JS y CSS reutilizable
- ✅ **Animaciones**: Fade-in, stagger, parallax, contadores
- ✅ **Validación**: Formularios con validación real-time
- ✅ **Accesible**: WCAG 2.1 AA
- ✅ **Performance**: Optimizado para velocidad
- ✅ **Escalable**: Fácil de expandir

## 🚀 Inicio Rápido

### 1. Abrir un Landing

Abre cualquier archivo en `landings/`:
```bash
# Opción 1: Abre directamente en navegador
open landings/dobleTitulacion.html

# Opción 2: Usa un servidor local
python -m http.server 8000
# Accede a: http://localhost:8000/landings/dobleTitulacion.html
```

### 2. Crear un Nuevo Landing

Copia `landings/template.html` y personaliza:

```bash
cp landings/template.html landings/mi-nuevo-landing.html
```

Edita:
- Cambiar `<title>`
- Reemplazar contenido de secciones
- Ajustar colores si es necesario

## 📊 Estructura de un Landing

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <!-- Meta tags, Tailwind, Fuentes, Config -->
</head>
<body>
    <!-- SECCIÓN 1: Hero/Introducción -->
    <section data-animate="fade">
        <!-- Contenido principal -->
    </section>
    
    <!-- SECCIÓN 2: Características/Beneficios -->
    <section data-stagger-container>
        <div data-stagger>Item 1</div>
        <div data-stagger>Item 2</div>
    </section>
    
    <!-- SECCIÓN 3: Detalles/Timeline -->
    <section>
        <div data-timeline-item>Step 1</div>
        <div data-timeline-item>Step 2</div>
    </section>
    
    <!-- SECCIÓN 4: CTA Final -->
    <section id="contacto">
        <!-- Call-to-action -->
    </section>
    
    <!-- SCRIPTS -->
    <script src="../config.js"></script>
    <script src="../assets/js/utils.js"></script>
    <script src="../assets/js/animations.js"></script>
    <script src="../assets/js/forms.js"></script>
    <script src="../assets/js/common.js"></script>
</body>
</html>
```

## 🎨 Componentes Listos para Usar

### Animaciones

```html
<!-- Fade-in automático -->
<section data-animate="fade">Contenido</section>

<!-- Efecto stagger (cascada) -->
<div data-stagger-container>
    <div data-stagger>Elemento 1</div>
    <div data-stagger>Elemento 2</div>
    <div data-stagger>Elemento 3</div>
</div>

<!-- Timeline (pasos) -->
<div data-timeline-item>Paso 1</div>
<div data-timeline-item>Paso 2</div>

<!-- Parallax -->
<img src="imagen.jpg" data-parallax="0.5">

<!-- Contador animado -->
<span data-animate-number data-target="1000">0</span>
```

### Cards con Hover

```html
<div class="card-hover">
    <!-- Contenido que se eleva al pasar el mouse -->
</div>
```

### Botones CTA

```html
<button data-cta="contact">Contactar</button>
<button data-cta="subscribe">Suscribirse</button>
<button data-cta="download">Descargar</button>
```

## 🎛️ Configuración

Edita `config.js` para:

- **API endpoints**: Base URLs, rutas de APIs
- **Colores de marca**: Paleta UNPHU
- **Logging**: Nivel de logging (error, warn, info, debug)
- **Storage**: Configuración de localStorage
- **Validación**: Reglas de formularios

```javascript
// Ejemplo: Obtener configuración
const primaryColor = configFunctions.getConfig('colors.primary');

// Ejemplo: Loguear
configFunctions.logInfo('Landing cargado');
```

## 📝 Utilitarios Disponibles

### Validación
```javascript
utils.validateEmail('correo@ejemplo.com');
```

### LocalStorage
```javascript
utils.saveToStorage('miDato', { id: 1 });
utils.getFromStorage('miDato');
utils.removeFromStorage('miDato');
```

### Funciones Útiles
```javascript
utils.debounce(function, 500);
utils.throttle(function, 1000);
utils.generateUniqueId();
utils.copyToClipboard('texto');
```

### Formularios
```javascript
formFunctions.validateForm(formElement);
formFunctions.enableRealtimeValidation(formElement);
formFunctions.handleFormSubmit(formElement, async (data) => {
    // Procesar datos
});
```

## 🎨 Colores Disponibles (Tailwind)

### Paleta UNPHU
- `primary`: #156b1d (Verde)
- `secondary`: #3c6185 (Azul)
- `tertiary`: #056a39 (Verde oscuro)
- `unphu-green`: #439441
- `unphu-blue`: #0A3859
- `unphu-dark`: #006837

Úsalos con Tailwind:
```html
<div class="bg-primary text-on-primary">Verde UNPHU</div>
<div class="bg-secondary text-on-secondary">Azul</div>
<div class="text-unphu-blue">Azul específico</div>
```

## 📱 Breakpoints Responsivos

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

```html
<div class="text-sm md:text-base lg:text-lg">
    Texto responsivo
</div>
```

## 🔗 Integración en Sitio Principal

Cuando se integren a un sitio más grande:

1. Se añadirá **header global**
2. Se añadirá **footer global**
3. Se mantendrá el **contenido del landing**
4. Se compartirán **JS y CSS globales**

Estructura final:
```html
<html>
    <head><!-- Estilos globales --></head>
    <body>
        <!-- Header del sitio principal -->
        
        <!-- Contenido del landing (sin cambios) -->
        
        <!-- Footer del sitio principal -->
        
        <!-- Scripts globales -->
    </body>
</html>
```

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| Las animaciones no funcionan | Verifica que `animations.js` esté cargado |
| Los estilos se ven raros | Limpia caché o abre en incógnito |
| Rutas de archivos rotas | Verifica que estés en `landings/` |
| Formularios no validan | Asegúrate que `forms.js` esté cargado |

## 📚 Documentación Completa

Ver [ARCHITECTURE.md](./ARCHITECTURE.md) para:
- Guía de uso detallada
- Ejemplos prácticos
- Configuración avanzada
- Mejores prácticas

## 📊 Checklist para Nuevo Landing

- [ ] Copiar `template.html`
- [ ] Actualizar `<title>` y meta tags
- [ ] Crear contenido en secciones
- [ ] Añadir `data-animate`, `data-stagger`, etc.
- [ ] Ajustar colores (si es necesario)
- [ ] Probar en móvil y desktop
- [ ] Probar formularios (si aplica)
- [ ] Verifica que los scripts se cargan
- [ ] Valida HTML en W3C

## 🤝 Contribución

Para añadir nuevas funcionalidades:

1. Crea módulo en `assets/js/`
2. Exporta a `window.miModulo`
3. Documenta en ARCHITECTURE.md
4. Prueba en landing de ejemplo
