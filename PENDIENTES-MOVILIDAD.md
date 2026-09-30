# Pendientes de la landing de Movilidad

Documento de control para completar la landing de Movilidad de la UNPHU. Los pendientes se identificaron a partir de los placeholders y campos sin datos de `assets/js/movilidad-content.js`, además de los comentarios de la plantilla HTML.

## 1. Recursos audiovisuales y gráficos

Estos recursos son necesarios para sustituir los placeholders visibles de la página.

| Prioridad | Sección | Qué debe proporcionarse | Uso esperado |
| --- | --- | --- | --- |
| Alta | Hero | Video institucional de fondo en formato MP4 o WebM. | Se carga en `hero.video.src` y se reproduce en loop, sin audio. |
| Alta | Hero | Imagen de respaldo del video, preferiblemente en JPG, PNG o WebP. | Se carga en `hero.video.poster` para navegadores que no reproduzcan el video o mientras carga. |
| Alta | ¿Por qué realizar movilidad? | Imagen editorial oficial de estudiantes participando en movilidad. | Se carga en `whyMobility.image.src`; actualmente aparece el placeholder `[IMAGEN - ASSET PENDIENTE]`. |
| Alta | Testimonios | Tres videos de testimonios de estudiantes, uno por cada tarjeta preparada. | Se cargan en `testimonials.items[].video.src`. |
| Media | Testimonios | Imagen de portada para cada video, si aplica. | Se carga en `testimonials.items[].video.poster`. |
| Media | Testimonios | Nombre del estudiante, carrera o programa y universidad/país de destino para cada video. | Completa `studentName`, `program` y `destination` en cada testimonio. |

### Especificaciones recomendadas para la entrega

- Confirmar que la UNPHU cuenta con autorización para publicar las imágenes, videos, nombres y datos académicos.
- Entregar los videos optimizados para web, con una versión horizontal y, si existe, una versión vertical para futuras adaptaciones.
- Incluir nombre de archivo, formato, dimensiones, duración y texto alternativo o descripción de cada recurso.
- Indicar si algún video necesita subtítulos, transcripción o una advertencia de accesibilidad.

## 2. Información del programa que falta completar

| Prioridad | Sección | Información pendiente | Campo o bloque relacionado |
| --- | --- | --- | --- |
| Alta | MOVENI | Instituciones participantes, fechas de convocatoria o aplicación y requisitos específicos. | Nota de `moveni`; actualmente indica `[Contenido pendiente de proporcionar]`. |
| Alta | Modalidades | Descripción y enlace de las modalidades **Extracurricular** y **Curricular**. | `modalities` tiene `summary: null` y `link: null` para ambas. |
| Alta | Docentes | Descripción específica del bloque de docentes: requisitos, procedimiento, documentación, duración y responsables, si aplica. | `faculty.teachers.description` está en `null`. |
| Alta | Destinos | Listado actualizado de países, universidades, tipo de convenio y públicos habilitados. | `destinations.items` está vacío. |
| Alta | Destinos | Confirmar las coordenadas relativas de cada destino para el mapa interactivo. | Propiedad `map: { x, y }` de cada destino. |
| Media | Destinos | Enlace oficial de cada universidad o convenio, cuando corresponda. | Propiedad `url` de cada destino. |
| Media | KPIs | Validar los indicadores publicados: `+25` estudiantes en movilidad y `30` países de destino. | Arreglo `kpis`. Confirmar fuente y fecha de corte. |

### Datos mínimos para cada destino

Para cada registro se necesita:

- País y código ISO de dos letras.
- Nombre de la universidad.
- Tipo de convenio.
- Público habilitado: estudiantes, docentes e investigadores.
- Enlace oficial, si existe.
- Posición del marcador en el mapa (`x` y `y`, de 0 a 100).

## 3. Enlaces y documentos oficiales

| Prioridad | Elemento | Qué debe proporcionarse | Estado actual |
| --- | --- | --- | --- |
| Alta | Botón **Aplica** | URL oficial del formulario de Admisiones/Movilidad. | `apply.url` está en `null`; el botón aparece deshabilitado. |
| Alta | Reglamento estudiantil | Archivo o URL oficial, descripción, formato y tamaño. | `url`, `description` y `fileType` están en `null`. |
| Alta | Reglamento de movilidad | Archivo o URL oficial, descripción, formato y tamaño. | `url`, `description` y `fileType` están en `null`. |
| Alta | Documentos requeridos | Archivo o página oficial con el listado vigente. | `url`, `description` y `fileType` están en `null`. |
| Media | Guías | Guías oficiales para estudiantes, docentes o universidades de origen/destino. | Recurso definido, pero sin archivo ni enlace. |
| Media | Formularios | Formularios VCAC y cualquier formulario digital utilizado en el proceso. | Recurso definido, pero sin archivo ni enlace. |
| Media | Otros documentos | Cualquier documento adicional aprobado para publicación. | Recurso definido, pero sin archivo ni enlace. |

Para cada documento se debe confirmar el nombre público, versión o fecha de actualización, formato (`PDF`, enlace externo, etc.), tamaño aproximado y URL o archivo final.

## 4. Validaciones institucionales requeridas

- Validar el contenido de **Movilidad estudiantil entrante nacional** antes de publicarlo. El código marca esta pista con `validationRequired: true`.
- Confirmar que los requisitos de movilidad saliente e internacional siguen vigentes, especialmente índice académico, seguros, solvencia económica, visas y documentos sujetos a las exigencias de la universidad de destino.
- Confirmar la redacción y vigencia de los requisitos de estudiantes entrantes internacionales, incluida la visa y el seguro médico.
- Revisar que las cifras de KPIs tengan una fecha de corte y una fuente institucional.
- Confirmar que los cuatro logos de universidades socias actualmente configurados siguen siendo los autorizados y representan convenios vigentes.
- Confirmar si deben agregarse más universidades socias, países o tipos de convenio al listado.

## 5. Información actualmente disponible

No debe solicitarse nuevamente, salvo que necesite actualización:

- Textos principales de **¿Por qué realizar movilidad?**, beneficios, **¿Quiénes somos?**, movilidad nacional e internacional y oportunidades para docentes.
- Requisitos generales y documentación base de las cuatro pistas de estudiantes.
- Datos de contacto: extensión `2325 / 2323` y los tres correos institucionales configurados.
- Logos y enlaces de UNIBE, INTEC, PUCMM y UNAPEC.
- Logo de MOVENI, que ya existe en `assets/images/logo-moveni.jpg`.
- Estructura visual, navegación, mapa, filtros, tarjetas de testimonios y componentes de documentos.

## 6. Orden recomendado de entrega

1. Video del hero, imagen de respaldo e imagen de **¿Por qué realizar movilidad?**.
2. Tres videos de testimonios con sus nombres, carreras, destinos y portadas.
3. URL del formulario de aplicación y archivos o enlaces de documentos oficiales.
4. Datos completos de destinos, convenios y coordenadas del mapa.
5. Información específica de MOVENI y de las modalidades curricular y extracurricular.
6. Contenido de docentes y validación institucional de requisitos y cifras.

## Archivos donde se conectan los pendientes

- Contenido editable: `assets/js/movilidad-content.js`.
- Renderizado de video, imágenes y placeholders: `assets/js/landing-movilidad.js`.
- Estructura de secciones: `landings/internacionalizacion/movilidad.html`.
- Estilos de la landing: `assets/css/movilidad.css`.