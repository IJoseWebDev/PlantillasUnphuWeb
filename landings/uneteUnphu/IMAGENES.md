# Imágenes del micrositio Únete a UNPHU

Referencia de rutas y uso en pantalla. Las páginas viven en `landings/uneteUnphu/`; desde el HTML la ruta relativa a assets es `../../assets/images/...`.

Ruta absoluta en el repositorio: `assets/images/...`

---

## Favicon

| Archivo | Ruta desde repo | Dónde se usa |
|---------|-----------------|--------------|
| `favicon.svg` | `assets/images/favicon.svg` | Icono del sitio en `<head>` de las 6 páginas: `index.html`, `vacantes.html`, `vacante.html`, `postular.html`, `banco-de-talento.html`, `privacidad.html` |

---

## Carpeta `assets/images/unete-unphu/`

Fotografías descargadas para este micrositio (origen: Unsplash, uso editorial en plantilla).

| Archivo | Ruta desde repo | Uso en pantalla |
|---------|-----------------|-----------------|
| `equipo.jpg` | `assets/images/unete-unphu/equipo.jpg` | **index.html** — Hero (imagen principal). Sección **Áreas** — tarjeta «Tecnología y Sistemas». |
| `profesional.jpg` | `assets/images/unete-unphu/profesional.jpg` | **index.html** — Hero (foto flotante). **Áreas** — «Gestión Humana». **Cómo postularte** — tarjeta «Aplicar a un puesto». **banco-de-talento.html** — Hero compacto. |
| `conversacion.jpg` | `assets/images/unete-unphu/conversacion.jpg` | **index.html** — **Áreas** — tarjeta ancha «El espacio donde tu talento puede hacer la diferencia.». **postular.html** — Hero compacto. |
| `campus-urbano.jpg` | `assets/images/unete-unphu/campus-urbano.jpg` | **index.html** — **Áreas** — «Administración y Gestión». **vacantes.html** — Hero compacto. |
| `aula-magna.jpg` | `assets/images/unete-unphu/aula-magna.jpg` | **index.html** — **Áreas** — «Académica / Docencia universitaria». |
| `taller.jpg` | `assets/images/unete-unphu/taller.jpg` | **index.html** — **Áreas** — «Mercadeo y Comunicaciones». **Cómo postularte** — «Darte a conocer». **postular.html** — Columna lateral del formulario (decorativa). |

---

## Carpeta `assets/images/bienestar-estudiantil-img/web/`

Fotografías del campus UNPHU ya usadas en el micrositio de Bienestar Estudiantil; reutilizadas aquí.

| Archivo | Ruta desde repo | Uso en pantalla |
|---------|-----------------|-----------------|
| `biblioteca.jpg` | `assets/images/bienestar-estudiantil-img/web/biblioteca.jpg` | **index.html** — Sección **¿Quiénes somos?** (manifiesto, foto + cita). **Áreas** — «Vinculación e Internacionalización». |
| `acompanamiento.jpg` | `assets/images/bienestar-estudiantil-img/web/acompanamiento.jpg` | **index.html** — **Áreas** — «Atención al usuario y servicio al cliente». |
| `campus.jpg` | `assets/images/bienestar-estudiantil-img/web/campus.jpg` | **index.html** — **Áreas** — «Servicios Generales». |
| `aula.jpg` | `assets/images/bienestar-estudiantil-img/web/aula.jpg` | **index.html** — **Áreas** — «Docencia Colegio UNPHU». **vacante.html** — Hero compacto (ficha de vacante). |
| `estudio.jpg` | `assets/images/bienestar-estudiantil-img/web/estudio.jpg` | **index.html** — **Áreas** — «Finanzas, Contabilidad y Auditoría». **privacidad.html** — Hero compacto. |
| `colaboracion.jpg` | `assets/images/bienestar-estudiantil-img/web/colaboracion.jpg` | **index.html** — **Áreas** — «Investigación». **banco-de-talento.html** — Columna lateral del formulario (decorativa). |
| `grupo-aire.jpg` | `assets/images/bienestar-estudiantil-img/web/grupo-aire.jpg` | **index.html** — **Áreas** — «Otra área». |

---

## Resumen por página

| Página | Imágenes |
|--------|----------|
| `index.html` | `equipo.jpg`, `profesional.jpg`, `biblioteca.jpg`, `conversacion.jpg`, `profesional.jpg`, `campus-urbano.jpg`, `acompanamiento.jpg`, `campus.jpg`, `aula-magna.jpg`, `aula.jpg`, `equipo.jpg`, `estudio.jpg`, `taller.jpg`, `colaboracion.jpg`, `biblioteca.jpg`, `grupo-aire.jpg`, `profesional.jpg`, `taller.jpg` (+ `favicon.svg`) |
| `vacantes.html` | `campus-urbano.jpg`, `favicon.svg` |
| `vacante.html` | `aula.jpg`, `favicon.svg` |
| `postular.html` | `conversacion.jpg`, `taller.jpg`, `favicon.svg` |
| `banco-de-talento.html` | `profesional.jpg`, `colaboracion.jpg`, `favicon.svg` |
| `privacidad.html` | `estudio.jpg`, `favicon.svg` |

*(En `index.html` algunas rutas se repiten en distintas secciones; ver tablas anteriores para el detalle por bloque.)*

---

## Notas para sustitución de assets

1. Al cambiar una imagen, conservar el **mismo nombre de archivo** o actualizar la ruta en el HTML indicado arriba.
2. Las tarjetas de **Áreas** usan `<img>` con clase `une-tile--photo`, degradado `.une-tile__shade` y texto en `.une-tile__label`. Proporción recomendada: horizontal, mínimo ~800×600 px.
3. Los **heroes compactos** (`.une-page-hero img`) cubren todo el ancho con `object-fit: cover`; altura mínima ~18 rem.
4. El **hero de portada** usa dos capas: `equipo.jpg` (principal) y `profesional.jpg` (flotante).
5. Las imágenes de `unete-unphu/` pueden sustituirse por fotografía oficial de Gestión Humana sin cambiar la estructura del HTML.

---

## Inventario de archivos físicos en `unete-unphu/`

```
assets/images/unete-unphu/
├── aula-magna.jpg
├── campus-urbano.jpg
├── conversacion.jpg
├── equipo.jpg
├── profesional.jpg
└── taller.jpg
```

Última revisión: alineada con el micrositio en `landings/uneteUnphu/` (sin header propio del micrositio).
