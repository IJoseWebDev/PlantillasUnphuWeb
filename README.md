# 🎓 UNPHU Landings - Plantillas de Páginas de Destino

Sistema modular y escalable para crear landings individuales que serán integrados a un sitio principal.

## 📁 Estructura del Proyecto

```
PlantillasUnphuWeb/
├── 📂 landings/                          # Todos los HTML de landings
│   ├── internacionalizacion/            # 🌐 Micrositio (varios landings)
│   │   ├── index.html                   # ✅ Página de entrada del micrositio
│   │   └── movilidad.html               # ✅ Movilidad nacional e internacional
│   ├── bienestarEstudiantil/            # 💚 Micrositio (12 páginas)
│   │   ├── index.html                   # ✅ Portada del decanato
│   │   ├── unidad-orientacion-vida-estudiantil.html # ✅ UOVE
│   │   ├── orientacion-vocacional.html  # ✅ Servicio de la UOVE
│   │   ├── cambio-de-carrera.html       # ✅ Servicio de la UOVE
│   │   ├── reingreso.html               # ✅ Servicio de la UOVE
│   │   ├── apoyo-emocional.html         # ✅ Servicio de la UOVE
│   │   ├── vida-integral.html           # ✅ Programa de formación
│   │   ├── unidad-progreso-academico.html # ✅ UPA
│   │   ├── solicitar-cita.html          # ✅ Formulario de cita
│   │   ├── referir-estudiante.html      # ✅ Formulario de referimiento
│   │   ├── emergencia-psicologica.html  # ✅ Protocolo de emergencia
│   │   └── acceso-personal.html         # ✅ Acceso del personal
│   ├── template.html                     # 🔖 Catálogo de componentes (punto de partida)
│   ├── acreditacion.html                # ✅ Acreditaciones
│   ├── bolsa-de-empleo.html             # ✅ Listado de vacantes
│   ├── bolsa-de-empleo-detalle.html     # ✅ Detalle de vacante
│   ├── documentacion.html               # ✅ Documentos y reglamentos
│   ├── dobleTitulacion.html             # ✅ Doble titulación
│   ├── internacionalizacion.html        # ✅ Campus / relaciones internacionales
│   └── 404Unphu.html                    # ✅ Página de error
│
├── 📂 assets/
│   ├── css/
│   │   ├── global.css                   # Estilos, variables, animaciones
│   │   ├── template.css                 # Componentes base tpl-* + chrome del catálogo
│   │   ├── micrositio-internacionalizacion.css # Shell intl-* (nav + footer del micrositio)
│   │   ├── micrositio-bienestar-estudiantil.css # Shell bie-* (botones + modal de emergencia)
│   │   ├── bienestar-estudiantil.css    # Componentes bst-* del micrositio Bienestar
│   │   └── [nombre].css                 # Un archivo por landing (prefijo BEM propio)
│   ├── js/
│   │   ├── common.js                    # Scroll suave, CTAs globales
│   │   ├── animations.js                # Fade-in, stagger, parallax, etc
│   │   ├── utils.js                     # Validaciones, localStorage, helpers
│   │   ├── forms.js                     # Gestión completa de formularios
│   │   ├── tailwind-config.js           # Tokens de color, spacing y tipografía
│   │   ├── landing-template.js          # Scaffold + demos del catálogo
│   │   ├── micrositio-internacionalizacion.js # Shell del micrositio (nav + footer)
│   │   ├── movilidad-content.js         # Contenido de Movilidad (preparado para CMS)
│   │   ├── micrositio-bienestar-estudiantil.js # Shell Bienestar (modal de emergencia)
│   │   ├── bienestar-estudiantil-content.js # Contenido de la portada (preparado para CMS)
│   │   ├── bienestar-servicios-content.js # Contenido de las 7 páginas de unidad/servicio
│   │   ├── landing-bienestar-servicios.js # Renderizador genérico por bloques
│   │   ├── bienestar-estudiantil-formularios.js # Validación y envío de sus formularios
│   │   └── landing-[nombre].js          # Lógica de cada landing
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

`landings/template.html` es el **catálogo de componentes**: contiene todos los bloques
usados en los landings publicados (48 componentes agrupados de la A a la I), cada uno
con una etiqueta que indica su archivo CSS y su clase de origen.

```bash
cp landings/template.html landings/mi-nuevo-landing.html
cp assets/css/template.css assets/css/mi-nuevo-landing.css
cp assets/js/landing-template.js assets/js/landing-mi-nuevo-landing.js
```

Luego:
1. Abre el catálogo en el navegador y elige los componentes que necesitas
   (el botón «Ocultar etiquetas» permite previsualizar sin la documentación)
2. Borra del HTML la portada `.tpl-catalog-header`, el índice `.tpl-index`,
   todos los elementos `[data-doc]` y los componentes que no uses
3. Por cada componente conservado, copia su bloque CSS al CSS de tu página
   (la etiqueta indica el archivo y la clase, ej. `bolsa-de-empleo.css · .job-card`)
4. Renombra el prefijo BEM (`tpl-` / `doc-` / `job-` / `acr-`) por el de tu página
5. Actualiza `<title>`, meta tags y los `href`/`src` de CSS y JS
6. Reemplaza textos e imágenes

### Grupos del catálogo

| Grupo | Contenido |
|-------|-----------|
| A | Heroes (centrado, inferior, compacto, con buscador, con imagen, degradado) |
| B | Navegación (quick nav sticky, breadcrumb, pestaña lateral, back link) |
| C | Contenido (feature grid, glass cards, beneficios, checklist, split panel, cifras, timeline, panel informativo, banner, carrusel) |
| D | Búsqueda y filtros (buscador simple, multicampo, pills, chips) |
| E | Listados y tarjetas (resource, documento, vacante, paginación, estado vacío, acreditación) |
| F | Página de detalle (header, quick info, secciones, sidebar, compensación, aplicación) |
| G | Contacto y CTA (tarjetas, panel glass, panel blanco, banner, franja, newsletter) |
| H | Overlays y feedback (modal completo, modal simple, toast, estado 404) |
| I | Tokens (escala tipográfica y variantes de botón) |

## 🌐 Micrositios

Un micrositio es una carpeta dentro de `landings/` que agrupa varias páginas y comparte
estilos y comportamiento. Hay dos: **Internacionalización** y **Bienestar Estudiantil**.

### Internacionalización

```
landings/internacionalizacion/
├── index.html      # Página de entrada → enlaza a los landings del micrositio
└── movilidad.html  # Landing de Movilidad
```

Archivos compartidos por el micrositio:

| Archivo | Rol |
|---------|-----|
| `assets/css/micrositio-internacionalizacion.css` | Shell `intl-*`: nav, botones, footer, `prefers-reduced-motion` |
| `assets/js/micrositio-internacionalizacion.js` | Footer institucional, menú móvil y scroll spy |
| `assets/css/movilidad.css` | Componentes `mov-*` del landing de Movilidad |
| `assets/js/movilidad-content.js` | **Todo el contenido editable** de Movilidad (preparado para CMS/Firebase) |
| `assets/js/landing-movilidad.js` | Render de cada componente + interacciones |

El contenido vive separado de la presentación: `movilidad-content.js` es la única fuente de
textos, listados, KPIs, documentos y enlaces. Cuando el dashboard esté conectado, basta con
sustituir ese objeto por la respuesta del CMS. Los datos aún no suministrados usan
placeholders visibles (`[Contenido pendiente de proporcionar]`), nunca contenido inventado.

### Bienestar Estudiantil

```
landings/bienestarEstudiantil/
├── index.html                  # Portada: quiénes somos, qué hacemos, servicios, autoridades,
│                               #          normativas, derechos, agrupaciones, FAQ, contacto
├── unidad-orientacion-vida-estudiantil.html # UOVE: sus 5 servicios, referimiento y principios
├── orientacion-vocacional.html # Servicio de la UOVE
├── cambio-de-carrera.html      # Servicio de la UOVE
├── reingreso.html              # Servicio de la UOVE
├── apoyo-emocional.html        # Servicio de la UOVE (incluye la emergencia psicológica)
├── vida-integral.html          # Programa de Formación Estudiantil Vida Integral
├── unidad-progreso-academico.html # UPA: alertas, intervención psicoeducativa y tutorías
├── solicitar-cita.html         # Formulario de cita (estudiantes)
├── referir-estudiante.html     # Formulario de referimiento (docentes, personal, familiares, compañeros)
├── emergencia-psicologica.html # Protocolo de emergencia (versión de página del modal)
└── acceso-personal.html        # Destino del enlace "Acceso del personal" de la sección de contacto
```

Archivos compartidos por el micrositio:

| Archivo | Rol |
|---------|-----|
| `assets/css/micrositio-bienestar-estudiantil.css` | Shell `bie-*`: botones, encabezados, modal, `prefers-reduced-motion` |
| `assets/js/micrositio-bienestar-estudiantil.js` | `EMERGENCY`: protocolo y modal de emergencia de todas las páginas |
| `assets/css/bienestar-estudiantil.css` | Componentes `bst-*` de las páginas (hero, tarjetas, acordeón, formularios) |
| `assets/js/bienestar-estudiantil-content.js` | **Todo el contenido editable** de la portada (preparado para CMS/Firebase) |
| `assets/js/landing-bienestar-estudiantil.js` | Render de la portada |
| `assets/js/bienestar-servicios-content.js` | **Contenido** de las 7 páginas de unidad y servicio, por bloques |
| `assets/js/landing-bienestar-servicios.js` | Renderizador genérico: pinta cualquiera de esas 7 páginas |
| `assets/js/bienestar-estudiantil-formularios.js` | Validación y estado de envío de los dos formularios |

Particularidades:

- Las páginas no llevan header ni footer: al no haber navegación propia, el hero de la
  portada concentra las acciones (cita, referimiento, contacto y emergencia) y cada página
  interna vuelve con su enlace `.bst-back`.
- Cada página declara su identidad en `<body data-page="...">`. Además de resolver los
  anclajes (`#servicios` en la portada, `index.html#servicios` en el resto), ese valor es la
  clave con la que las 7 páginas de unidad y servicio localizan su contenido en
  `window.BIENESTAR_SERVICIOS`.
- Esas 7 páginas son HTML mínimo (`[data-render="page-hero"]` y `[data-render="page-sections"]`):
  `landing-bienestar-servicios.js` las pinta a partir de bloques tipados (`prose`, `list`,
  `steps`, `cards`, `table`, `note`, `faq`, `contact`, `people`, `actions`, `pending`). Añadir
  una página nueva es añadir una entrada de contenido y un HTML de 60 líneas; en Next.js
  equivale a un único `<ServicePage content={...} />`.
- El botón **Emergencia psicológica** abre el modal cuando hay JavaScript y navega a
  `emergencia-psicologica.html` cuando no lo hay. Ambos leen los mismos datos de `EMERGENCY`.
- Los formularios tienen el markup en el HTML (usables sin JS) y aún no tienen endpoint:
  al enviar muestran `[ENVÍO PENDIENTE DE CONEXIÓN]` con la vía de contacto alternativa.
  El punto de integración es `submitRequest` en `bienestar-estudiantil-formularios.js`.
- Los datos que el decanato aún no ha confirmado se muestran como `[DATO PENDIENTE DE
  CONFIRMAR]` o `[Contenido pendiente de proporcionar]`, nunca como contenido inventado.
  Pendientes actuales: fotografías del equipo, enlaces vigentes a los formularios de
  solicitud (UOVE y UPA), instancia que formaliza el cambio de carrera y el reingreso,
  contacto de seguridad universitaria, medio de publicación de la programación de Vida
  Integral, plataforma de cocurriculares, listado de agrupaciones estudiantiles activas y
  enlaces a los documentos normativos.

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

- [ ] Copiar `template.html`, `template.css` y `landing-template.js`
- [ ] Elegir componentes en el catálogo y borrar el resto
- [ ] Borrar portada, índice y elementos `[data-doc]` del catálogo
- [ ] Copiar el CSS de cada componente y renombrar el prefijo BEM
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
