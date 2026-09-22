/**
 * MOVILIDAD — CAPA DE CONTENIDO (PREPARADA PARA CMS / FIREBASE)
 *
 * Este archivo concentra TODO el contenido editable del landing de Movilidad.
 * La presentación vive en `landing-movilidad.js` (render) y en `movilidad.css`.
 *
 * ARQUITECTURA PARA NEXT.JS / DASHBOARD:
 * - `window.MOVILIDAD_CONTENT` → respuesta del CMS (colección `movilidad`).
 * - Cada clave de primer nivel corresponde a un componente del landing:
 *   hero → <Hero />            whyMobility → <WhyMobility />
 *   benefits → <Benefits />    testimonials → <Testimonials />
 *   about → <About />          mobility → <MobilityTypes />
 *   moveni → <Moveni />        modalities → <Modalities /> + <MobilityKinds />
 *   students → <Students />    faculty → <Faculty />
 *   destinations → <Destinations />
 *   partnerUniversities → <PartnerUniversities />
 *   kpis → <KPIs />            apply → <Apply />
 *   documents → <Documents />  contact → <Contact />
 *
 * REGLA DE CONTENIDO:
 * Solo se incluye información suministrada por la universidad. Todo dato aún no
 * proporcionado usa `null` + una etiqueta de placeholder visible e identificable.
 * NO sustituir placeholders por contenido inventado: conectar el dashboard.
 */
(function () {
    'use strict';

    /* Etiquetas de placeholder reutilizables (no usar lorem ipsum) */
    var PENDING = {
        content: '[Contenido pendiente de proporcionar]',
        heroVideo: '[VIDEO HERO — ASSET PENDIENTE]',
        testimonialVideo: '[VIDEO TESTIMONIO — ASSET PENDIENTE]',
        image: '[IMAGEN — ASSET PENDIENTE]',
        url: '[ENLACE PENDIENTE DE PROPORCIONAR]',
        data: '[Datos pendientes de proporcionar]'
    };

    window.MOVILIDAD_CONTENT = {

        pending: PENDING,

        /* ---------- SEO / metadatos ---------- */
        meta: {
            title: 'Movilidad | UNPHU',
            description: 'Programa de movilidad de la UNPHU: movilidad nacional e internacional para estudiantes, docentes e investigadores, requisitos, documentos y contacto.'
        },

        /* ---------- Navegación del landing ---------- */
        /* `id` debe coincidir con el id de la <section> correspondiente */
        nav: [
            { id: 'inicio', label: 'Inicio' },
            { id: 'quienes-somos', label: '¿Quiénes somos?' },
            { id: 'movilidad', label: 'Movilidad' },
            { id: 'modalidades', label: 'Modalidades' },
            { id: 'estudiantes', label: 'Estudiantes' },
            { id: 'docentes', label: 'Docentes' },
            { id: 'destinos', label: 'Destinos' },
            { id: 'universidades-socias', label: 'Universidades socias' },
            { id: 'kpis', label: 'KPIs' },
            { id: 'aplica', label: 'Aplica' },
            { id: 'documentos', label: 'Documentos' },
            { id: 'contacto', label: 'Contacto' }
        ],

        /* ---------- 1. Banner / Hero ---------- */
        hero: {
            eyebrow: 'Internacionalización UNPHU',
            title: 'Movilidad',
            /* El mensaje reutiliza la primera frase de "¿Por qué realizar movilidad?"
               (ver `whyMobility.lead`) para no introducir frases institucionales nuevas. */
            video: {
                /* Sustituir por la URL del video oficial (mp4/webm). */
                src: null,
                type: 'video/mp4',
                /* Imagen de respaldo mientras el video carga o si no puede reproducirse. */
                poster: null,
                placeholder: PENDING.heroVideo,
                /* Alternativa textual para quien no pueda o no quiera ver el video. */
                description: 'Video ambiental de estudiantes en experiencias de movilidad. No contiene información indispensable.'
            },
            ctas: [
                { id: 'explorar', label: 'Explorar oportunidades de movilidad', href: '#modalidades', variant: 'primary' },
                { id: 'aplica', label: 'Aplica', href: '#aplica', variant: 'ghost' }
            ]
        },

        /* ---------- 2. ¿Por qué realizar movilidad? ---------- */
        whyMobility: {
            lead: 'Realizar movilidad estudiantil en la UNPHU ofrece a los estudiantes una oportunidad invaluable de expandir sus horizontes, tanto académica como culturalmente.',
            /* El hero usa `lead` como mensaje para no introducir frases nuevas.
               Con este flag en `true` la sección no lo repite; ponlo en `false`
               si el hero pasa a mostrar otro mensaje. */
            leadUsedInHero: true,
            paragraphs: [
                'Vivir y estudiar en un nuevo entorno no solo enriquece el currículum, sino que también fomenta el desarrollo personal, mejora habilidades lingüísticas y promueve una mayor adaptabilidad y comprensión intercultural.',
                'Además, la movilidad brinda la posibilidad de crear una red internacional de contactos y abrir puertas a futuras oportunidades laborales y académicas.',
                'En definitiva, es una experiencia transformadora que prepara a los estudiantes para enfrentar con éxito los desafíos del futuro.'
            ],
            /* Indicadores visuales derivados del mismo contenido (sin datos nuevos). */
            markers: [
                { icon: 'school', label: 'Crecimiento académico' },
                { icon: 'diversity_3', label: 'Comprensión intercultural' },
                { icon: 'trending_up', label: 'Desarrollo personal' }
            ],
            image: {
                src: null,
                alt: 'Estudiantes de la UNPHU participando en el programa de movilidad',
                placeholder: PENDING.image
            }
        },

        /* ---------- 3. Beneficios del programa ---------- */
        benefits: [
            { id: 'benefit-01', icon: 'translate', text: 'Ampliación de competencias lingüísticas y comunicativas.' },
            { id: 'benefit-02', icon: 'hub', text: 'Creación de una red internacional de contactos.' },
            { id: 'benefit-03', icon: 'psychology', text: 'Desarrollo de adaptabilidad y resiliencia ante nuevos desafíos.' },
            { id: 'benefit-04', icon: 'work', text: 'Oportunidades laborales por contar con experiencias internacionales.' },
            { id: 'benefit-05', icon: 'public', text: 'Crecimiento personal y mentalidad global.' }
        ],

        /* ---------- 4. Testimonio internacional ---------- */
        /* Estructura lista para múltiples testimonios. Sustituir los placeholders
           por los datos reales; no inventar nombres ni universidades. */
        testimonials: {
            note: 'Los testimonios se publicarán cuando se proporcionen los videos y los datos de cada estudiante.',
            items: [
                {
                    id: 'testimonio-01',
                    studentName: null,
                    program: null,
                    destination: null,
                    video: { src: null, type: 'video/mp4', poster: null, placeholder: PENDING.testimonialVideo }
                },
                {
                    id: 'testimonio-02',
                    studentName: null,
                    program: null,
                    destination: null,
                    video: { src: null, type: 'video/mp4', poster: null, placeholder: PENDING.testimonialVideo }
                },
                {
                    id: 'testimonio-03',
                    studentName: null,
                    program: null,
                    destination: null,
                    video: { src: null, type: 'video/mp4', poster: null, placeholder: PENDING.testimonialVideo }
                }
            ]
        },

        /* ---------- 5. ¿Quiénes somos? ---------- */
        about: {
            paragraphs: [
                {
                    role: 'lead',
                    text: 'Desde su fundación, la UNPHU ha buscado activamente establecer y mantener colaboraciones internacionales que han sido esenciales para el crecimiento de la universidad y han añadido un valor significativo a la educación de sus estudiantes, preparándolos para un mundo cada vez más interconectado.'
                },
                {
                    role: 'body',
                    text: 'En la actualidad, la UNPHU cuenta con una amplia red de asociaciones globales, trabajando en conjunto con casas de altos estudios y asociaciones de diferentes partes del mundo. Estas colaboraciones nos permiten ofrecer programas educativos de calidad, intercambio de conocimientos y experiencias, así como oportunidades de investigación conjunta.'
                },
                {
                    role: 'body',
                    text: 'La UNPHU tiene acuerdos formales establecidos en diversas regiones del Caribe, así como en América del Norte, América Latina y Europa. Estos vínculos no solo enriquecen el entorno académico de nuestros estudiantes, sino que también fortalecen la presencia global de la universidad como una institución de excelencia educativa.'
                },
                {
                    role: 'quote',
                    text: 'Nuestro compromiso con la internacionalización nos lleva a buscar continuamente nuevas oportunidades de colaboración que beneficien a nuestra comunidad universitaria y contribuyan al desarrollo sostenible a nivel mundial. En la UNPHU, creemos que la movilidad estudiantil es una puerta abierta hacia un futuro lleno de posibilidades y crecimiento personal y profesional.'
                }
            ]
        },

        /* ---------- 6. Movilidad nacional e internacional ---------- */
        mobility: {
            national: {
                id: 'movilidad-nacional',
                icon: 'flag',
                title: 'Movilidad Estudiantil Nacional',
                paragraphs: [
                    'El programa de Movilidad Estudiantil Nacional Interuniversitario MOVENI ofrece a los estudiantes de grado y posgrado de las universidades participantes, la oportunidad de cursar un semestre en una de las universidades adscritas al programa y la posibilidad de transferir créditos a su programa académico en la universidad de origen. Durante el semestre de intercambio, los estudiantes mantienen su condición de estudiantes activos en su universidad de procedencia. Asimismo, deben acogerse a los reglamentos académicos y normas disciplinarias de la universidad de destino.'
                ],
                benefitsTitle: 'Beneficios para estudiantes',
                benefits: [
                    'Facilita el desarrollo de habilidades de adaptación y aprendizaje en entornos educativos diversos.',
                    'Permite el acceso a nuevas redes académicas y profesionales dentro del ámbito nacional.',
                    'Complementa la formación integral a través de escenarios académicos diversos y la experiencia en distintas instituciones de educación superior a nivel nacional.',
                    'Fomenta la interacción con diferentes entornos académicos y profesionales dentro del país.',
                    'Amplía la visión sobre la educación y el desarrollo profesional en el contexto nacional.',
                    'Aporta mayor peso al currículum y fortalece la preparación laboral a través de experiencias académicas en distintas universidades.'
                ]
            },
            international: {
                id: 'movilidad-internacional',
                icon: 'public',
                title: 'Movilidad Estudiantil Internacional',
                paragraphs: [
                    'Permite a los estudiantes de la UNPHU, realizar uno o dos periodos académicos de su programa de estudios en una universidad del exterior, a través de los convenios firmados con estas Instituciones de Educación Superior (IES). Los estudios realizados en el exterior, serán validados como parte del plan de estudios correspondiente de su carrera.'
                ],
                highlightTitle: 'Estudiantes internacionales en la UNPHU',
                highlight: 'Un estudiante internacional puede elegir a la UNPHU como destino coordinando con su universidad de origen cumplir todos los requisitos del convenio para participar en la movilidad.'
            }
        },

        /* ---------- 7. MOVENI ---------- */
        /* El párrafo completo del programa vive en `mobility.national.paragraphs`
           para no duplicar contenido: aquí se presentan sus puntos clave. */
        moveni: {
            acronym: 'MOVENI',
            fullName: 'Programa de Movilidad Estudiantil Nacional Interuniversitario',
            logo: {
                src: '../../assets/images/logo-moveni.jpg',
                alt: 'MOVENI — Movilidad Estudiantil Nacional Interuniversitaria'
            },
            highlights: [
                { icon: 'groups', text: 'Dirigido a estudiantes de grado y posgrado de las universidades participantes.' },
                { icon: 'calendar_month', text: 'Permite cursar un semestre en una de las universidades adscritas al programa.' },
                { icon: 'sync_alt', text: 'Posibilita transferir créditos al programa académico de la universidad de origen.' },
                { icon: 'badge', text: 'El estudiante mantiene su condición de estudiante activo en su universidad de procedencia.' },
                { icon: 'gavel', text: 'El participante se acoge a los reglamentos académicos y normas disciplinarias de la universidad de destino.' }
            ],
            note: 'Instituciones participantes, fechas y requisitos específicos del programa: ' + PENDING.content
        },

        /* ---------- 8 y 9. Modalidades y tipos de movilidad ---------- */
        /* `group: 'ambito'` → Nacional / Internacional
           `group: 'tipo'`   → Saliente / Entrante / Extracurricular / Curricular
           La sección "Modalidades" muestra las seis; la sección "Tipos" muestra
           únicamente las del grupo `tipo`. */
        modalities: [
            {
                id: 'modalidad-nacional',
                group: 'ambito',
                label: 'Nacional',
                icon: 'flag',
                summary: 'Un semestre en una universidad nacional adscrita al programa MOVENI, con posibilidad de transferir créditos.',
                link: { label: 'Ver movilidad nacional', href: '#movilidad-nacional' }
            },
            {
                id: 'modalidad-internacional',
                group: 'ambito',
                label: 'Internacional',
                icon: 'public',
                summary: 'Uno o dos periodos académicos en una universidad del exterior, a través de los convenios firmados con otras IES.',
                link: { label: 'Ver movilidad internacional', href: '#movilidad-internacional' }
            },
            {
                id: 'modalidad-saliente',
                group: 'tipo',
                label: 'Saliente',
                icon: 'flight_takeoff',
                summary: 'Estudiantes de la UNPHU que cursan estudios en otra institución, nacional o internacional.',
                link: { label: 'Ver requisitos y documentos', href: '#estudiantes' }
            },
            {
                id: 'modalidad-entrante',
                group: 'tipo',
                label: 'Entrante',
                icon: 'flight_land',
                summary: 'Estudiantes provenientes de otra universidad, nacional o internacional, que eligen la UNPHU como destino.',
                link: { label: 'Ver requisitos y documentos', href: '#estudiantes' }
            },
            {
                id: 'modalidad-extracurricular',
                group: 'tipo',
                label: 'Extracurricular',
                icon: 'extension',
                summary: null,
                link: null
            },
            {
                id: 'modalidad-curricular',
                group: 'tipo',
                label: 'Curricular',
                icon: 'menu_book',
                summary: null,
                link: null
            }
        ],

        /* ---------- 10. Estudiantes ---------- */
        students: {
            generalRequirements: {
                title: 'Requisitos generales de movilidad estudiantil',
                intro: 'Los estudiantes de la UNPHU, que deseen participar en cualquiera de los programas de estudios ofrecidos en otras instituciones, nacionales o internacionales (movilidad saliente), además de cumplir con los requerimientos establecidos por la universidad receptora, deberá cumplir con los siguientes requisitos:',
                items: [
                    { key: 'a', text: 'Ser estudiante regular y activo de grado o postgrado de la UNPHU.' },
                    { key: 'b', text: 'Tener un índice acumulado de 3.00 puntos y estar en condición académica normal.' },
                    { key: 'c', text: 'No estar sometido a procesos disciplinarios o inhabilitantes.' },
                    { key: 'd', text: 'Estar al día con los compromisos de pago con la Institución.' },
                    { key: 'e', text: 'Contar con los medios económicos para cubrir los gastos correspondientes al transporte, dieta, hospedaje y cualquier otro gasto en el que pueda incurrir en el lugar donde se desarrollará la movilidad.' }
                ]
            },
            /* Documentación por tipo de movilidad. `validationRequired: true` marca
               internamente el contenido que el documento original señala como
               pendiente de validación institucional. */
            tracks: [
                {
                    id: 'saliente-nacional',
                    label: 'Saliente nacional',
                    icon: 'flight_takeoff',
                    title: 'Movilidad estudiantil saliente nacional',
                    intro: 'Documentos requeridos:',
                    validationRequired: false,
                    items: [
                        { key: 'a', text: 'Formulario de Solicitud de Movilidad (VCAC-201-FOR-004).' },
                        { key: 'b', text: 'Formulario de solicitud de asignaturas (VCAC-201-FOR-005), con hasta 10 asignaturas de su interés, indicando el programa académico o carrera a la que pertenecen en la universidad de destino, con la finalidad de recibir los programas de asignaturas o sílabos y validar las equivalencias.' },
                        { key: 'c', text: 'Récord de calificaciones académicas validado por el Departamento de Registro y Evaluaciones.' },
                        { key: 'd', text: 'Carta de exposición de motivos, dirigida a la universidad seleccionada.' },
                        { key: 'e', text: 'Carta de autorización de intercambio firmada por el Director de su carrera con las asignaturas que se desean cursar y aquellas que les serán convalidadas.' },
                        { key: 'f', text: 'Una carta de recomendación académica de un profesor del ciclo profesional de su carrera o de su programa de postgrado correspondiente.' },
                        { key: 'g', text: 'Carta de anuencia de padres o tutores, cuando aplique.' },
                        { key: 'h', text: 'Dos fotografías tamaño 3 x 4 cm.' },
                        { key: 'i', text: 'Cualquier otro requisito o documento solicitado por la universidad de destino.' }
                    ]
                },
                {
                    id: 'entrante-nacional',
                    label: 'Entrante nacional',
                    icon: 'flight_land',
                    title: 'Movilidad estudiantil entrante nacional',
                    intro: 'Documentos requeridos:',
                    /* INTERNO: el documento original marca esta sección como contenido
                       que requiere validación institucional antes de publicarse. */
                    validationRequired: true,
                    items: [
                        { key: 'a', text: 'Completar el formulario digital de Admisiones en la página web de la UNPHU.' },
                        { key: 'b', text: 'Carta de Nominación de la Universidad de origen.' },
                        { key: 'c', text: 'Record oficial de calificaciones expedido por el Departamento de Registro de dicha universidad.' },
                        { key: 'd', text: 'Copia de la cédula de identificación o pasaporte del estudiante.' },
                        { key: 'e', text: 'Copia de seguro de salud y accidentes (Cuando se apruebe el período).' },
                        { key: 'f', text: 'Formulario de solicitud de asignaturas (VCAC-201-FOR-013).' }
                    ]
                },
                {
                    id: 'saliente-internacional',
                    label: 'Saliente internacional',
                    icon: 'travel_explore',
                    title: 'Movilidad estudiantil saliente internacional',
                    intro: 'Además de cumplir con los requisitos anteriores de movilidad nacional de a) hasta f), deberá presentar:',
                    validationRequired: false,
                    items: [
                        { key: null, text: 'Seguro médico y de accidentes, nacional o internacional, en caso de que sea requerido por la universidad de destino.' },
                        { key: null, text: 'Examen psicométrico, en caso de que sea requerido por la universidad de destino.' },
                        { key: null, text: 'Prueba de dominio del idioma del país en el cual desea estudiar, en caso de ser distinto al español, y/o según los requerimientos del programa de estudios.' },
                        { key: null, text: 'Comprobante de solvencia económica o carta de garante económico, según las normas del país de destino.' },
                        { key: null, text: 'Cualquier otro requisito o documento solicitado por la universidad de destino.' }
                    ]
                },
                {
                    id: 'entrante-internacional',
                    label: 'Entrante internacional',
                    icon: 'language',
                    title: 'Movilidad estudiantil entrante internacional',
                    intro: 'Para participar en cualquiera de los programas de estudios ofrecidos por la UNPHU, un estudiante proveniente de una universidad internacional (extranjera), deberá presentar la siguiente documentación:',
                    validationRequired: false,
                    items: [
                        { key: 'a', text: 'Carta de presentación de su universidad de origen, que le acredita como estudiante activo de la misma y confirma su selección oficial para participar en el Programa de Movilidad Estudiantil. Dicha carta debe estar firmada por su director o coordinador de carrera y por el responsable de Relaciones Internacionales o de Movilidad e Intercambio Estudiantil.' },
                        { key: 'b', text: 'Completar el Formulario de Admisiones (VCAC-207-FOR-004) requerido para iniciar el proceso de inscripción en la UNPHU.' },
                        { key: 'c', text: 'Récord de calificaciones, validado por la Unidad de Registro o de Auditoría Académica de su universidad de origen.' },
                        { key: 'd', text: 'Certificado oficial de manejo del idioma español en caso de que su idioma de origen sea diferente a este.' },
                        { key: 'e', text: 'Carta de recomendación de dos profesores de su universidad de origen.' },
                        { key: 'f', text: 'Carta de motivación o exposición de motivos, escrita por el alumno solicitante.' },
                        { key: 'g', text: 'Copia del Pasaporte actualizado y documentos de identidad vigentes de su país de origen.' },
                        { key: 'h', text: 'Curriculum Vitae actualizado.' },
                        { key: 'i', text: 'Dos Fotos tamaño 3 X 4 cm.' },
                        { key: 'j', text: 'Seguro médico nacional (intercambio nacional) o internacional y de accidente que sea válido en República Dominicana.' },
                        { key: 'k', text: 'Visa de estudiantes otorgada por el gobierno de la República Dominicana.' }
                    ],
                    footnote: 'Los estudiantes internacionales interesado en realizar Movilidad en la UNPHU, está condicionado a los requerimientos de elegibilidad en su universidad de Origen.'
                }
            ]
        },

        /* ---------- 11 y 12. Docentes e investigadores ---------- */
        faculty: {
            paragraphs: [
                'La movilidad para docentes e investigadores de la UNPHU fomenta el intercambio de conocimientos, la colaboración académica y el desarrollo profesional a nivel internacional. A través de este programa, los docentes e investigadores tienen la oportunidad de trabajar en instituciones de prestigio en el extranjero, participar en proyectos de investigación conjuntos, impartir clases y talleres y asistir a congresos y seminarios internacionales.',
                'Esta no solo permite el enriquecimiento académico y la actualización profesional, sino que también promueve la creación de redes globales de colaboración, amplía las perspectivas interculturales y contribuye al avance del conocimiento en diversas áreas del saber. Los participantes pueden traer de vuelta nuevas metodologías, tecnologías y enfoques innovadores que benefician a la comunidad académica de la UNPHU.',
                'En resumen, la movilidad para docentes e investigadores de la UNPHU es una valiosa iniciativa que apoya el crecimiento académico, fomenta la investigación colaborativa y fortalece la internacionalización de la universidad.'
            ],
            /* Oportunidades mencionadas en el contenido proporcionado. */
            opportunities: [
                { icon: 'apartment', text: 'Trabajar en instituciones de prestigio en el extranjero.' },
                { icon: 'science', text: 'Participar en proyectos de investigación conjuntos.' },
                { icon: 'co_present', text: 'Impartir clases y talleres.' },
                { icon: 'forum', text: 'Asistir a congresos y seminarios internacionales.' }
            ],
            /* Bloques separados visualmente. Ampliar con contenido específico
               cuando la universidad lo proporcione. */
            teachers: {
                id: 'docentes',
                title: 'Docentes',
                icon: 'school',
                description: null
            }
        },

        /* ---------- Destinos / países ---------- */
        /* Estructura: País → Universidad → Tipo de convenio.
           `items` se llenará desde el dashboard; el listado y el mapa se
           generan automáticamente a partir de este arreglo.
           Formato esperado de cada item:
           {
             id: 'do-unphu',
             country: 'Nombre del país',
             countryCode: 'ISO-3166 alpha-2',
             university: 'Nombre de la universidad',
             agreementType: 'Tipo de convenio',
             audiences: ['estudiantes', 'docentes', 'investigadores'],
             url: 'https://...',
             map: { x: 0-100, y: 0-100 }  // posición relativa en el mapa
           } */
        destinations: {
            audiences: [
                { id: 'estudiantes', label: 'Estudiantes', icon: 'school' },
                { id: 'docentes', label: 'Docentes', icon: 'co_present' },
                { id: 'investigadores', label: 'Investigadores', icon: 'biotech' }
            ],
            items: [],
            emptyMessage: PENDING.data + ' El listado de países, universidades y tipos de convenio se mostrará automáticamente al cargarse desde el dashboard.',
            map: {
                enabled: true,
                emptyMessage: 'Mapa interactivo preparado. Los marcadores se generarán a partir de los destinos cargados.'
            }
        },

        /* ---------- Universidades socias ---------- */
        /* Formato: { id, name, url, logo }. País y tipo de convenio se descartaron. */
        partnerUniversities: {
            items: [
                {
                    id: 'unibe',
                    name: 'UNIBE',
                    url: 'https://www.unibe.edu.do/',
                    logo: '../../assets/images/universidades-socias/unibe.svg'
                },
                {
                    id: 'intec',
                    name: 'INTEC',
                    url: 'https://www.intec.edu.do/',
                    logo: '../../assets/images/universidades-socias/intec.png'
                },
                {
                    id: 'pucmm',
                    name: 'PUCMM',
                    url: 'https://www.pucmm.edu.do/',
                    logo: '../../assets/images/universidades-socias/pucmm.png'
                },
                {
                    id: 'unapec',
                    name: 'UNAPEC',
                    url: 'https://www.unapec.edu.do/',
                    logo: '../../assets/images/universidades-socias/unapec.png'
                }
            ]
        },

        /* ---------- 16. KPIs ---------- */
        kpis: [
            { id: 'estudiantes-movilidad', prefix: '+', value: 25, suffix: '', label: 'Estudiantes en movilidad', icon: 'groups' },
            { id: 'paises-destino', prefix: '', value: 30, suffix: '', label: 'Países de destino', icon: 'public', hasMap: true }
        ],

        /* ---------- 17. Aplica ---------- */
        apply: {
            title: 'Aplica',
            label: 'Aplica',
            /* PENDIENTE: sustituir por la URL del formulario de Admisiones / Movilidad.
               Mientras sea `null`, el botón se muestra deshabilitado con aviso. */
            url: null,
            urlPlaceholder: PENDING.url,
            note: 'El botón se enlazará con el formulario oficial de Admisiones / Movilidad cuando se proporcione la URL.'
        },

        /* ---------- 18. Documentos ---------- */
        /* Formato esperado: { id, name, description, fileType, size, url } */
        documents: [
            { id: 'reglamento-estudiantil', name: 'Reglamento estudiantil', description: null, fileType: null, url: null, icon: 'gavel' },
            { id: 'reglamento-movilidad', name: 'Reglamento de movilidad', description: null, fileType: null, url: null, icon: 'policy' },
            { id: 'documentos-requeridos', name: 'Documentos requeridos', description: null, fileType: null, url: null, icon: 'checklist' },
            { id: 'guias', name: 'Guías', description: null, fileType: null, url: null, icon: 'menu_book' },
            { id: 'formularios', name: 'Formularios', description: null, fileType: null, url: null, icon: 'description' },
            { id: 'otros-documentos', name: 'Otros documentos relacionados', description: null, fileType: null, url: null, icon: 'folder_open' }
        ],

        /* ---------- 19. Contacto ---------- */
        contact: {
            extension: '2325 / 2323',
            emails: [
                'internacionalizacion@unphu.edu.do',
                'movilidadinternacional@unphu.edu.do',
                'movilidadnacional@unphu.edu.do'
            ]
        }
    };
})();
