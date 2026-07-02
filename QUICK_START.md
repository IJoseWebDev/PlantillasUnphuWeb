# 📋 GUÍA RÁPIDA - Estructura Lista para Usar

## ✅ Estructura Creada

```
PlantillasUnphuWeb/
│
├── 📂 landings/                      ⭐ AQUÍ VAN LOS LANDINGS
│   ├── dobleTitulacion.html         ✅ Landing completado y listo
│   └── template.html                🔖 Plantilla para nuevos landings
│
├── 📂 assets/
│   ├── 📂 css/
│   │   └── global.css               📝 Estilos, variables, animaciones
│   │
│   ├── 📂 js/                        ⚙️ MÓDULOS DE JAVASCRIPT
│   │   ├── common.js                Scroll suave, CTAs, efectos scroll
│   │   ├── animations.js            Fade-in, stagger, parallax, timeline
│   │   ├── utils.js                 Validaciones, localStorage, helpers
│   │   └── forms.js                 Validación y gestión de formularios
│   │
│   ├── 📂 images/                   📸 Imágenes (vacía, lista para usar)
│   │
│   └── 📂 fonts/                    🔤 Fuentes locales (si se usan)
│
├── 📄 config.js                     🔧 Configuración global
├── 📄 README.md                     📖 Documentación principal
├── 📄 ARCHITECTURE.md               📚 Guía de desarrollo detallada
└── 📄 package.json                  📦 Metadata del proyecto
```

## 🚀 Comenzar Ahora

### Para ver el landing completado:
```bash
# 1. Opción: Abre directamente en el navegador
open landings/dobleTitulacion.html

# 2. Opción: Usa servidor local
cd PlantillasUnphuWeb
python -m http.server 8000
# Accede a: http://localhost:8000/landings/dobleTitulacion.html
```

### Para crear un nuevo landing:
```bash
# 1. Copia el template
cp landings/template.html landings/mi-nuevo-landing.html

# 2. Edita el archivo en tu editor favorito
# 3. Cambiar:
#    - <title>
#    - Contenido de secciones
#    - Colores (si es necesario)
#    - Íconos y textos
```

## 📦 Archivos JavaScript Disponibles

| Archivo | Función | Elementos `data-*` |
|---------|---------|-------------------|
| **common.js** | Scroll suave, CTAs globales | `data-cta="..."` |
| **animations.js** | Animaciones e IntersectionObserver | `data-animate="fade"`, `data-stagger`, `data-timeline-item` |
| **utils.js** | Validaciones, helpers | Usable vía `utils.*` |
| **forms.js** | Validación de formularios | Usable vía `formFunctions.*` |

## 🎨 Atributos `data-*` para Usar

```html
<!-- Fade-in automático al scrollear -->
<section data-animate="fade">Contenido</section>

<!-- Efecto stagger (cascada) -->
<div data-stagger-container>
    <div data-stagger>Item 1</div>
    <div data-stagger>Item 2</div>
</div>

<!-- Timeline (pasos) -->
<div data-timeline-item>Paso 1</div>
<div data-timeline-item>Paso 2</div>

<!-- Buttons CTA -->
<button data-cta="contact">Contactar</button>

<!-- Parallax -->
<img src="img.jpg" data-parallax="0.5">

<!-- Contador animado -->
<span data-animate-number data-target="1000">0</span>
```

## 🎛️ Usando Configuración

```javascript
// En console o en scripts:
console.log(CONFIG);                           // Ver todo
CONFIG.site.name;                              // "UNPHU"
configFunctions.getConfig('colors.primary');   // "#156b1d"
configFunctions.logInfo('Mi mensaje');         // Log personalizado
```

## 📝 Checklist: Nuevo Landing

- [ ] Copiar `template.html`
- [ ] Cambiar título y meta tags
- [ ] Reemplazar contenido de secciones
- [ ] Añadir `data-animate`, `data-stagger`, etc.
- [ ] Probar scroll suave (links #)
- [ ] Probar animaciones (scroll)
- [ ] Probar responsivo (móvil)
- [ ] Revisar console (F12) para errores
- [ ] Si tiene formulario: probar validación

## 🔗 Rutas Relativas (desde landings/)

```
../config.js              ✅ Config global
../assets/css/global.css  ✅ Estilos
../assets/js/utils.js     ✅ Utilidades
../assets/js/animations.js ✅ Animaciones
../assets/js/forms.js     ✅ Formularios
../assets/js/common.js    ✅ Comunes
../assets/images/         ✅ Imágenes
```

## 🎯 Próximos Pasos

1. **Editar landing de Doble Titulación** (si es necesario)
2. **Crear nuevos landings** usando template.html
3. **Añadir más módulos** en `assets/js/` si lo necesitas
4. **Integrar al sitio principal** cuando esté listo

## 📞 Ayuda Rápida

| Problema | Solución |
|----------|----------|
| "Las animaciones no funcionan" | Abre F12, verifica console, ve que `animations.js` esté cargado |
| "Los estilos se ven raros" | Limpia caché (Ctrl+Shift+Supr), abre en incógnito |
| "Rutas rotas" | Verifica que estés en `/landings/`, rutas deben ser `../` |
| "Formulario no valida" | Verifica que `forms.js` esté cargado, usa atributo `name=` |

## 📚 Documentación Completa

- 📖 **README.md** - Guía general
- 📚 **ARCHITECTURE.md** - Guía técnica detallada
- 🔧 **config.js** - Comentarios de configuración
- 📝 **Comentarios en HTML** - Estructura de secciones

---

**¡Todo listo! A trabajar en los landings! 🚀**
