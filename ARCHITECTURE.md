# 📁 Estructura del Proyecto - UNPHU Landings

Proyecto escalable para crear múltiples landings que serán integrados a un sitio más grande.

## 📂 Estructura de Carpetas

```
PlantillasUnphuWeb/
│
├── landings/                          # Todos los HTML de landings
│   ├── dobleTitulacion.html          # Landing Doble Titulación
│   ├── otro-programa.html            # Otros landings (por crear)
│   └── ...
│
├── assets/                            # Recursos globales
│   ├── css/
│   │   └── global.css                # Estilos globales y config Tailwind
│   │
│   ├── js/
│   │   ├── common.js                 # Funcionalidades comunes
│   │   ├── animations.js             # Animaciones e Intersection Observer
│   │   ├── utils.js                  # Funciones utilitarias
│   │   ├── forms.js                  # Gestión de formularios
│   │   └── [modulos-especificos].js  # Por crear según necesidad
│   │
│   ├── images/                        # Imágenes (ej: íconos, backgrounds)
│   │   └── [imágenes del proyecto]
│   │
│   └── fonts/                         # Fuentes locales (si se usan)
│       ├── lato/
│       └── montserrat/
│
├── config.js                          # Configuración global
├── README.md                          # Este archivo
└── package.json                       # Metadata del proyecto
```

## 🎯 Características por Archivo

### CSS
- **global.css**: Variables CSS, utilidades, animaciones base, Tailwind config

### JavaScript
- **common.js**: Scroll suave, inicialización de CTAs, efectos de scroll
- **animations.js**: Fade-in, stagger, parallax, contadores, hover effects
- **utils.js**: Validación, localStorage, debounce, throttle, helpers
- **forms.js**: Validación de formularios, manejo de inputs, errores

## 🚀 Cómo Usar

### 1. Crear un nuevo Landing

Copia [template.html](#template-base) a `landings/tu-landing.html`

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tu Landing - UNPHU</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Fuentes de Google -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Lato:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
    
    <!-- Tailwind Config -->
    <script id="tailwind-config">
        tailwind.config = { /* ... config ... */ }
    </script>
    
    <!-- CSS Global -->
    <link rel="stylesheet" href="../assets/css/global.css">
</head>
<body>
    <!-- Contenido del landing (sin header ni footer) -->
    
    <!-- Scripts globales -->
    <script src="../assets/js/utils.js"></script>
    <script src="../assets/js/animations.js"></script>
    <script src="../assets/js/forms.js"></script>
    <script src="../assets/js/common.js"></script>
</body>
</html>
```

### 2. Usar Animaciones

```html
<!-- Fade-in animado -->
<div data-animate="fade">Contenido</div>

<!-- Stagger (cascada) -->
<div data-stagger-container>
    <div data-stagger>Elemento 1</div>
    <div data-stagger>Elemento 2</div>
</div>

<!-- Parallax -->
<img src="imagen.jpg" data-parallax="0.5">

<!-- Contador animado -->
<span data-animate-number data-target="1000">0</span>

<!-- Timeline -->
<div data-timeline-item>Paso 1</div>
```

### 3. Usar Validación de Formularios

```html
<form id="miFormulario">
    <input type="email" name="email" required data-animate="fade">
    <button type="submit">Enviar</button>
</form>

<script>
    const form = document.getElementById('miFormulario');
    formFunctions.enableRealtimeValidation(form);
    formFunctions.handleFormSubmit(form, async (data) => {
        console.log('Datos:', data);
        // Enviar al servidor
    });
</script>
```

### 4. Usar Utilidades

```javascript
// Validar email
utils.validateEmail('correo@ejemplo.com'); // true/false

// LocalStorage
utils.saveToStorage('miDato', { id: 1, nombre: 'Juan' });
const dato = utils.getFromStorage('miDato');

// Debounce para búsquedas
const buscar = utils.debounce((valor) => {
    console.log('Buscando:', valor);
}, 500);

// Generar ID único
const id = utils.generateUniqueId();
```

## 🎨 Guía de Estilos

### Colores UNPHU
- **Primary (Verde)**: #156b1d
- **Secondary (Azul)**: #3c6185
- **Tertiary (Verde oscuro)**: #056a39
- **UNPHU Green**: #439441
- **UNPHU Blue**: #0A3859

### Tipografía
- **Títulos**: Montserrat
- **Cuerpo**: Lato
- **Iconos**: Material Symbols

### Clases CSS Útiles
```css
.gradient-overlay      /* Degradado UNPHU */
.text-gradient        /* Texto con gradiente */
.card-hover          /* Efecto hover en cards */
.section-padding     /* Padding estándar de secciones */
.container-section   /* Contenedor con máx ancho */
.smooth-transition   /* Transición suave */
```

## 📝 Estándares

- ✅ **Sin header/footer**: Se añadirán en el sitio principal
- ✅ **Landing completo**: HTML self-contained con todo incluido
- ✅ **Responsive**: Mobile-first design
- ✅ **Accesible**: WCAG 2.1 AA
- ✅ **Performance**: Optimizado para velocidad
- ✅ **Modular**: JS y CSS reutilizable

## 🔧 Configuración Personalizada

### Variables CSS
Edita en `assets/css/global.css`:
```css
:root {
    --primary: #156b1d;
    --secondary: #3c6185;
    /* ... más variables */
}
```

### Tailwind Config
Está en el `<script id="tailwind-config">` de cada landing.
Incluye:
- Colores personalizados
- Espaciado UNPHU
- Familias de fuentes
- Tamaños de fuente

## 📚 Ejemplos Prácticos

### Hero Section con Animación
```html
<section class="relative min-h-screen flex items-center" data-animate="fade">
    <img src="hero.jpg" data-parallax="0.5" class="absolute inset-0">
    <div class="relative z-10">
        <h1>Título Principal</h1>
        <p>Descripción</p>
    </div>
</section>
```

### Grid de Cards con Stagger
```html
<div data-stagger-container class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div data-stagger class="card-hover">Card 1</div>
    <div data-stagger class="card-hover">Card 2</div>
    <div data-stagger class="card-hover">Card 3</div>
</div>
```

### Timeline con Animación
```html
<div data-timeline-item>
    <h4>Paso 1</h4>
    <p>Descripción</p>
</div>
<div data-timeline-item>
    <h4>Paso 2</h4>
    <p>Descripción</p>
</div>
```

## 🐛 Troubleshooting

### Las animaciones no funcionan
- Verifica que `animations.js` esté cargado
- Usa los atributos `data-animate`, `data-stagger`, etc.
- Abre consola (F12) para ver errores

### Los estilos no se ven
- Verifica que Tailwind CSS esté cargado desde CDN
- Revisa que `global.css` esté enlazado
- Limpia cache del navegador

### Formularios no validan
- Asegúrate que `forms.js` esté cargado
- Usa `enableRealtimeValidation()` o `handleFormSubmit()`
- Los inputs deben tener atributo `name`

## 🔐 Consideraciones de Seguridad

- No guardes datos sensibles en localStorage
- Valida SIEMPRE en el servidor
- Sanitiza inputs de usuarios
- Usa HTTPS en producción

## 📱 Responsive Design

Los breakpoints son los estándar de Tailwind:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

Ejemplo:
```html
<div class="text-center md:text-left lg:grid lg:grid-cols-2">
    Contenido responsive
</div>
```

## 🚀 Próximos Pasos

1. ✅ Crear landing de Doble Titulación
2. ⬜ Crear otros landings según necesidad
3. ⬜ Integrar con servidor backend
4. ⬜ Añadir header/footer global en sitio principal
5. ⬜ Configurar análitica/tracking
6. ⬜ Optimizar para SEO

---

**Última actualización**: 2024
**Versión**: 1.0.0
