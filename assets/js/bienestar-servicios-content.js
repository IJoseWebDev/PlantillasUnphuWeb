/**
 * BIENESTAR ESTUDIANTIL — CONTENIDO DE UNIDADES Y SERVICIOS (CMS / FIREBASE)
 *
 * Una entrada por página; la clave coincide con `<body data-page="...">`.
 * `landing-bienestar-servicios.js` recorre `sections[].blocks[]` y pinta cada
 * bloque, de modo que todas estas páginas comparten un mismo render.
 *
 * ARQUITECTURA PARA NEXT.JS:
 * Cada página equivale a `<ServicePage content={...} />`: el array de bloques
 * es el modelo de datos que consumirá el dashboard, y los tipos de bloque son
 * el catálogo cerrado de componentes disponibles para el editor.
 *
 * TIPOS DE BLOQUE DISPONIBLES:
 *   prose        { paragraphs: [] }
 *   subtitle     { text }
 *   list         { items: [string | { title, text }], variant: 'check'|'bullet' }
 *   steps        { items: [{ title, text }] }
 *   cards        { items: [{ icon, name, description, href, linkLabel }] }
 *   table        { columns: [], rows: [[]] }
 *   note         { variant: 'info'|'urgent', title, paragraphs, items, action }
 *   faq          { items: [{ id, question, answer }] }
 *   contact      { items: [{ icon, label, value, href }] }
 *   actions      { items: [{ label, href, variant, icon, opensEmergency }] }
 *   pending      { label }   → placeholder visible de dato por confirmar
 *
 * REGLA DE CONTENIDO:
 * Solo información suministrada por la universidad. Los datos señalados como
 * pendientes en la solicitud de información se publican como bloque `pending`
 * para que se vean mientras no se confirmen. NO inventar contenido.
 */
(function () {
    'use strict';

    var EMAIL_DECANATO = 'bienestarestudiantil@unphu.edu.do';
    var EMAIL_ORIENTACION = 'orientacion@unphu.edu.do';
    var EMAIL_UPA = 'upa@unphu.edu.do';
    var PHONE = '809-562-6601';
    var PHONE_HREF = 'tel:+18095626601';

    /* Vía de solicitud común a todos los servicios de atención individual. */
    var VIA_SOLICITUD = 'Escribe a ' + EMAIL_ORIENTACION + ', comunícate al ' + PHONE +
        ', ext. 1119, o acude al Decanato de Bienestar Estudiantil (Edificio 8, primera planta, contiguo a Registro).';

    /* Botonera presente en todo el micrositio. */
    function acciones(primaryLabel) {
        return {
            kind: 'actions',
            items: [
                { label: primaryLabel || 'Solicitar una cita', href: 'solicitar-cita.html', variant: 'primary' },
                { label: 'Referir a un estudiante', href: 'referir-estudiante.html', variant: 'outline' },
                {
                    label: 'Emergencia psicológica',
                    href: 'emergencia-psicologica.html',
                    variant: 'urgent',
                    icon: 'emergency_home',
                    opensEmergency: true
                }
            ]
        };
    }

    var CONTACTO_UNIDAD = {
        kind: 'contact',
        items: [
            { icon: 'location_on', label: 'Ubicación', value: 'Edificio 8, primera planta, contiguo a Registro', href: null },
            { icon: 'mail', label: 'Correo', value: EMAIL_ORIENTACION, href: 'mailto:' + EMAIL_ORIENTACION },
            { icon: 'call', label: 'Teléfono', value: PHONE + ', ext. 1119', href: PHONE_HREF },
            { icon: 'schedule', label: 'Horario', value: 'Lunes a viernes, 8:00 a. m. a 5:00 p. m.', href: null },
            { icon: 'map', label: 'Dirección', value: 'Av. John F. Kennedy Km 7 ½, Santo Domingo, República Dominicana', href: null }
        ]
    };

    window.BIENESTAR_SERVICIOS = {

        /* =========================================================
           UNIDAD DE ORIENTACIÓN Y VIDA ESTUDIANTIL (página principal)
           ========================================================= */
        'orientacion': {
            meta: {
                title: 'Unidad de Orientación y Vida Estudiantil | Bienestar Estudiantil UNPHU',
                description: 'Orientación vocacional, cambio de carrera, reingreso, apoyo emocional y formación integral para estudiantes de la UNPHU. Servicios gratuitos y confidenciales.'
            },
            hero: {
                eyebrow: 'Decanato de Bienestar Estudiantil',
                title: 'Unidad de Orientación y Vida Estudiantil',
                lead: 'Acompañamiento profesional para tus decisiones académicas y tu bienestar durante la vida universitaria.'
            },
            sections: [
                {
                    id: 'quienes-somos',
                    eyebrow: 'Quiénes somos',
                    title: 'Acompañamiento individual y personalizado',
                    blocks: [
                        {
                            kind: 'prose',
                            paragraphs: [
                                'La Unidad de Orientación y Vida Estudiantil forma parte del Decanato de Bienestar Estudiantil de la Universidad Nacional Pedro Henríquez Ureña. Su función es acompañar al estudiante en las decisiones académicas y en las situaciones personales que inciden en su trayectoria universitaria: dudas sobre la carrera elegida, dificultades de adaptación, procesos de cambio de programa, reingreso tras una interrupción de los estudios y situaciones emocionales que afectan el desempeño académico.',
                                'El acompañamiento que ofrecemos tiene un carácter individual y personalizado. Contamos con orientadores y psicólogos que atienden en un espacio confidencial, tanto los aspectos académicos que se entrelazan con lo personal como las situaciones personales que comienzan a incidir en lo académico.',
                                'No es necesario atravesar una situación crítica para solicitar el servicio. Puedes acudir a la Unidad ante cualquier duda o dificultad que estés experimentando en tu proceso formativo.'
                            ]
                        },
                        { kind: 'pending', label: 'Fotografía del equipo de la Unidad, tomada en el espacio real de atención' }
                    ]
                },
                {
                    id: 'servicios',
                    tone: 'soft',
                    eyebrow: 'Nuestros servicios',
                    title: 'Cinco servicios de atención',
                    blocks: [
                        {
                            kind: 'cards',
                            items: [
                                {
                                    icon: 'explore',
                                    name: 'Orientación Vocacional',
                                    description: 'Dirigida a estudiantes que, ya cursando un programa, presentan dudas sobre su elección vocacional o dificultades de adaptación a la vida universitaria.',
                                    href: 'orientacion-vocacional.html',
                                    linkLabel: 'Conocer el servicio'
                                },
                                {
                                    icon: 'swap_horiz',
                                    name: 'Cambio de Carrera',
                                    description: 'Evaluación y orientación para el traslado a otro programa académico de la Universidad.',
                                    href: 'cambio-de-carrera.html',
                                    linkLabel: 'Conocer el servicio'
                                },
                                {
                                    icon: 'restart_alt',
                                    name: 'Reingreso',
                                    description: 'Evaluación y acompañamiento para la reincorporación a los estudios tras una interrupción.',
                                    href: 'reingreso.html',
                                    linkLabel: 'Conocer el servicio'
                                },
                                {
                                    icon: 'favorite',
                                    name: 'Apoyo Emocional',
                                    description: 'Primera ayuda psicológica y terapia breve, en un espacio confidencial. Incluye la atención de emergencias psicológicas.',
                                    href: 'apoyo-emocional.html',
                                    linkLabel: 'Conocer el servicio'
                                },
                                {
                                    icon: 'volunteer_activism',
                                    name: 'Programa de Formación Estudiantil Vida Integral',
                                    description: 'Charlas, talleres y conferencias del Decanato sobre bienestar emocional, prevención de riesgos psicosociales, valores y vida saludable.',
                                    href: 'vida-integral.html',
                                    linkLabel: 'Conocer el programa'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'como-solicitar',
                    eyebrow: 'Cómo solicitar una cita',
                    title: 'El procedimiento es el mismo para todos los servicios',
                    lead: 'La solicitud la realiza el propio estudiante y no requiere autorización de su escuela ni de ninguna otra instancia.',
                    blocks: [
                        {
                            kind: 'steps',
                            items: [
                                { title: 'Solicita la cita', text: VIA_SOLICITUD },
                                { title: 'Completa el formulario de solicitud', text: 'Es un formulario breve en el que se registran tus datos, tu carrera y el motivo de la solicitud. Puedes completarlo al momento de solicitar la cita.' },
                                { title: 'Asiste a la primera entrevista', text: 'Una entrevista con un orientador o psicólogo de la Unidad, en la que se identifica tu necesidad y se define el curso del proceso.' },
                                { title: 'Continúa el proceso según tu caso', text: 'Según el servicio, puede incluir la aplicación de pruebas psicológicas, una cita de entrega de resultados, sesiones de seguimiento u orientación sobre los trámites institucionales correspondientes.' }
                            ]
                        },
                        {
                            kind: 'note',
                            variant: 'info',
                            title: 'Importante',
                            paragraphs: [
                                'Los procesos de Cambio de Carrera y Reingreso están sujetos a las fechas establecidas en el calendario académico. Verifícalas antes de solicitar tu cita, a fin de no quedar fuera del período correspondiente.'
                            ]
                        },
                        { kind: 'pending', label: 'Enlace vigente al formulario de solicitud de servicios' },
                        acciones()
                    ]
                },
                {
                    id: 'referimiento',
                    tone: 'soft',
                    eyebrow: 'Referimiento',
                    title: 'Referir a un estudiante',
                    blocks: [
                        {
                            kind: 'prose',
                            paragraphs: [
                                'Los docentes, el personal de la Universidad, los familiares y los propios compañeros pueden referir a un estudiante cuya situación resulte preocupante. Recibido el referimiento, la Unidad se pone en contacto con el estudiante para ofrecerle los servicios disponibles.',
                                'Cómo realizarlo: escribe a ' + EMAIL_ORIENTACION + ' o comunícate al ' + PHONE + ', ext. 1119, indicando el nombre del estudiante, su matrícula si se conoce, su carrera y una descripción breve de la situación observada.',
                                'El referimiento no obliga al estudiante a iniciar un proceso: la participación en los servicios de la Unidad es siempre voluntaria. La identidad de quien refiere se maneja con discreción.'
                            ]
                        },
                        {
                            kind: 'note',
                            variant: 'urgent',
                            title: 'En situaciones de riesgo inmediato no debe utilizarse esta vía',
                            paragraphs: [
                                'Acude directamente al Decanato o comunícate a la extensión, y permanece con el estudiante hasta que reciba atención.'
                            ],
                            action: { label: 'Ver el protocolo de emergencia', href: 'emergencia-psicologica.html', opensEmergency: true }
                        },
                        {
                            kind: 'actions',
                            items: [
                                { label: 'Referir a un estudiante', href: 'referir-estudiante.html', variant: 'primary' }
                            ]
                        }
                    ]
                },
                {
                    id: 'principios',
                    eyebrow: 'Principios del servicio',
                    title: 'Confidencialidad, voluntariedad y gratuidad',
                    blocks: [
                        { kind: 'subtitle', text: 'Confidencialidad' },
                        {
                            kind: 'prose',
                            paragraphs: [
                                'La información que compartes en la Unidad no se comunica a tus profesores, a tu escuela, a tus compañeros ni a tus familiares. Tu expediente se maneja conforme a los principios éticos de la profesión.',
                                'Como en toda atención psicológica, la confidencialidad tiene límites establecidos. La información puede compartirse —siempre la mínima necesaria y con la instancia que corresponda— en los siguientes supuestos:'
                            ]
                        },
                        {
                            kind: 'list',
                            items: [
                                'Cuando existe riesgo para tu vida o tu integridad, o para la de otra persona.',
                                'Cuando se identifica una situación de violencia, abuso o desprotección cuya notificación resulta obligatoria conforme a la ley, particularmente si involucra a personas menores de edad o en condición de vulnerabilidad.',
                                'Cuando lo requiere formalmente una autoridad judicial competente.',
                                'Cuando autorizas por escrito que se comparta información con una instancia determinada, por ejemplo, para respaldar una solicitud académica.',
                                'Cuando el caso se analiza en supervisión profesional dentro del equipo, con la finalidad de garantizar la calidad de la atención.'
                            ]
                        },
                        {
                            kind: 'prose',
                            paragraphs: [
                                'Estos supuestos se te explican en la primera cita, antes de que decidas continuar con el proceso. De aplicarse alguno de ellos, se te informa oportunamente.'
                            ]
                        },
                        {
                            kind: 'list',
                            variant: 'check',
                            items: [
                                { title: 'Voluntariedad', text: 'La solicitud del servicio, su continuidad y su conclusión dependen de tu decisión.' },
                                { title: 'Gratuidad', text: 'Todos los servicios de la Unidad están incluidos en tu condición de estudiante de la UNPHU y no tienen costo adicional.' }
                            ]
                        }
                    ]
                },
                {
                    id: 'contacto',
                    tone: 'soft',
                    eyebrow: 'Contacto',
                    title: 'Unidad de Orientación y Vida Estudiantil',
                    blocks: [CONTACTO_UNIDAD]
                }
            ]
        },

        /* =========================================================
           ORIENTACIÓN VOCACIONAL
           ========================================================= */
        'orientacion-vocacional': {
            meta: {
                title: 'Orientación Vocacional | Bienestar Estudiantil UNPHU',
                description: 'Orientación para estudiantes UNPHU con dudas vocacionales o dificultades de adaptación a la vida universitaria. Servicio gratuito y confidencial.'
            },
            hero: {
                eyebrow: 'Unidad de Orientación y Vida Estudiantil',
                title: 'Orientación Vocacional',
                lead: 'Un proceso para revisar tu elección de carrera y tu adaptación a la vida universitaria, con acompañamiento profesional.',
                back: { label: 'Unidad de Orientación y Vida Estudiantil', href: 'unidad-orientacion-vida-estudiantil.html' }
            },
            sections: [
                {
                    id: 'de-que-se-trata',
                    eyebrow: 'De qué se trata',
                    title: 'Orientación, no trámite administrativo',
                    blocks: [
                        {
                            kind: 'prose',
                            paragraphs: [
                                'Este servicio está dirigido a estudiantes que ya han ingresado a la Universidad y que, en el transcurso de su programa, presentan dudas respecto de la carrera elegida.',
                                'Se trata de un proceso de orientación y no de un trámite administrativo. Contempla dos dimensiones que se abordan de manera conjunta:'
                            ]
                        },
                        {
                            kind: 'list',
                            variant: 'check',
                            items: [
                                { title: 'La dimensión vocacional', text: 'Se exploran tus intereses, aptitudes y expectativas profesionales, y se contrastan con las exigencias y el perfil del programa que cursas. Se examina asimismo en qué medida tu elección respondió a criterios propios y en qué medida estuvo determinada por expectativas familiares, consideraciones de prestigio profesional o factores externos.' },
                                { title: 'La dimensión adaptativa', text: 'Con frecuencia, la duda vocacional que se manifiesta durante los primeros cuatrimestres no obedece a una discordancia vocacional real, sino al proceso de adaptación a la vida universitaria: un ritmo de estudio distinto al del nivel secundario, mayores exigencias académicas, dificultades de integración al grupo, la distancia del entorno familiar o los primeros resultados académicos adversos. Estas situaciones producen manifestaciones semejantes a las de una elección vocacional equivocada. Diferenciar una de otra constituye una parte sustancial del proceso.' }
                            ]
                        },
                        {
                            kind: 'prose',
                            paragraphs: [
                                'Por esta razón, el servicio no equivale al de cambio de carrera, aunque en determinados casos conduzca a él. La orientación antecede a la decisión; el trámite, cuando corresponde, se inicia después.'
                            ]
                        },
                        {
                            kind: 'note',
                            variant: 'info',
                            title: 'Si aún no eres estudiante de la UNPHU',
                            paragraphs: [
                                'La orientación vocacional dirigida a aspirantes, previa a la elección del programa, se realiza en la unidad de orientación adscrita a Admisiones.'
                            ]
                        },
                        { kind: 'pending', label: 'Nombre de la unidad de orientación adscrita a Admisiones' }
                    ]
                },
                {
                    id: 'a-quien',
                    tone: 'soft',
                    eyebrow: 'A quién está dirigido',
                    title: '¿Es para ti?',
                    blocks: [
                        {
                            kind: 'list',
                            items: [
                                'Estudiantes de nuevo ingreso que presentan dudas sobre la carrera elegida.',
                                'Estudiantes con dificultades de adaptación a la vida universitaria.',
                                'Estudiantes cuyo rendimiento es satisfactorio, pero que no encuentran motivación ni sentido en su formación.',
                                'Estudiantes cuya elección estuvo determinada por presión familiar o por descarte, y desean revisarla.',
                                'Estudiantes que consideran un cambio de programa y desean analizarlo antes de iniciar el trámite.'
                            ]
                        }
                    ]
                },
                {
                    id: 'que-incluye',
                    eyebrow: 'Qué incluye el proceso',
                    title: 'Las etapas del acompañamiento',
                    blocks: [
                        {
                            kind: 'list',
                            variant: 'check',
                            items: [
                                { title: 'Entrevista inicial', text: 'Trayectoria académica, circunstancias de la elección de la carrera, situación actual y factores que inciden en la decisión.' },
                                { title: 'Exploración de la adaptación', text: 'Ritmo de estudio, integración al grupo, relación con los docentes y condiciones del entorno personal.' },
                                { title: 'Aplicación de pruebas psicológicas', text: 'Instrumentos de intereses, aptitudes y rasgos vinculados al desempeño profesional, cuando el caso lo amerita.' },
                                { title: 'Cita de devolución de resultados', text: 'Explicación de los hallazgos del proceso y de sus implicaciones para tu decisión.' },
                                { title: 'Plan de acción', text: 'Puede consistir en la permanencia en el programa con apoyos definidos, el inicio de un proceso de cambio de carrera, o el abordaje previo de la dificultad de adaptación antes de resolver sobre la carrera.' }
                            ]
                        }
                    ]
                },
                {
                    id: 'como-solicitarlo',
                    tone: 'soft',
                    eyebrow: 'Cómo solicitarlo',
                    title: 'Cinco pasos',
                    blocks: [
                        {
                            kind: 'steps',
                            items: [
                                { title: 'Solicita tu cita', text: VIA_SOLICITUD },
                                { title: 'Completa el formulario de solicitud del servicio', text: null },
                                { title: 'Asiste a la entrevista inicial', text: 'En la fecha asignada.' },
                                { title: 'Realiza las pruebas correspondientes', text: 'Si el proceso las requiere.' },
                                { title: 'Acude a la cita de entrega de resultados', text: 'En ella se define el plan de acción.' }
                            ]
                        },
                        {
                            kind: 'note',
                            variant: 'info',
                            title: 'Importante',
                            paragraphs: [
                                'El proceso comprende varias sesiones. Si tu situación puede derivar en un cambio de carrera, verifica con antelación las fechas del calendario académico.'
                            ]
                        },
                        { kind: 'pending', label: 'Duración estimada del proceso de orientación vocacional' },
                        {
                            kind: 'actions',
                            items: [
                                { label: 'Solicitar orientación vocacional', href: 'solicitar-cita.html', variant: 'primary' }
                            ]
                        }
                    ]
                },
                {
                    id: 'preguntas-frecuentes',
                    eyebrow: 'Dudas frecuentes',
                    title: 'Preguntas frecuentes',
                    blocks: [
                        {
                            kind: 'faq',
                            items: [
                                {
                                    id: 'ov-01',
                                    question: '¿Solicitar orientación implica que se me cambiará de carrera?',
                                    answer: 'No. La orientación es un proceso de análisis y valoración. El cambio de carrera constituye un trámite distinto, que se inicia únicamente si el estudiante así lo decide y cumple con los requisitos establecidos.'
                                },
                                {
                                    id: 'ov-02',
                                    question: '¿Las pruebas determinan la decisión?',
                                    answer: 'No. Las pruebas psicológicas describen tendencias e identifican áreas de correspondencia; no prescriben una carrera. La decisión corresponde al estudiante, con los elementos que el proceso aporta.'
                                },
                                {
                                    id: 'ov-03',
                                    question: 'Llevo un solo cuatrimestre. ¿Es prematuro solicitar el servicio?',
                                    answer: 'No. Es, de hecho, el momento más favorable: identificar tempranamente si se trata de una dificultad de adaptación o de una discordancia vocacional reduce el tiempo y las asignaturas comprometidas en la decisión.'
                                }
                            ]
                        }
                    ]
                }
            ]
        },

        /* =========================================================
           CAMBIO DE CARRERA
           ========================================================= */
        'cambio-de-carrera': {
            meta: {
                title: 'Cambio de Carrera | Bienestar Estudiantil UNPHU',
                description: 'Evaluación y orientación para el cambio de carrera en la UNPHU: requisitos, pasos y fechas del proceso.'
            },
            hero: {
                eyebrow: 'Unidad de Orientación y Vida Estudiantil',
                title: 'Cambio de Carrera',
                lead: 'Evaluación y orientación profesional para el traslado a otro programa académico de la Universidad.',
                back: { label: 'Unidad de Orientación y Vida Estudiantil', href: 'unidad-orientacion-vida-estudiantil.html' }
            },
            sections: [
                {
                    id: 'de-que-se-trata',
                    eyebrow: 'De qué se trata',
                    title: 'Orientación y evaluación previas al trámite',
                    blocks: [
                        {
                            kind: 'prose',
                            paragraphs: [
                                'El cambio de carrera es un proceso institucional que permite al estudiante trasladarse a otro programa académico de la Universidad. La Unidad interviene en la fase de orientación y evaluación: se valora que la decisión responda a un análisis sostenido y no a una situación coyuntural, y se examina la correspondencia entre tu perfil y el del programa al que deseas trasladarte.',
                                'Antes de iniciar el trámite conviene precisar si la dificultad se origina en la elección de la carrera o en las circunstancias del período que atraviesas. Si la duda es reciente o te encuentras en tus primeros cuatrimestres, el servicio indicado en primer lugar es el de orientación vocacional.'
                            ]
                        },
                        {
                            kind: 'actions',
                            items: [
                                { label: 'Ver Orientación Vocacional', href: 'orientacion-vocacional.html', variant: 'outline' }
                            ]
                        }
                    ]
                },
                {
                    id: 'a-quien',
                    tone: 'soft',
                    eyebrow: 'A quién está dirigido',
                    title: '¿Es para ti?',
                    blocks: [
                        {
                            kind: 'list',
                            items: [
                                'Estudiantes que han perdido de manera sostenida el interés por su carrera y lo han considerado por más de un período académico.',
                                'Estudiantes que han identificado una vocación distinta durante su formación.',
                                'Estudiantes cuyo rendimiento se ha visto afectado de manera persistente por una falta de correspondencia con las exigencias del programa.',
                                'Estudiantes que deben realizar un cambio por disposición académica institucional.'
                            ]
                        }
                    ]
                },
                {
                    id: 'que-incluye',
                    eyebrow: 'Qué incluye el proceso',
                    title: 'Las etapas de la evaluación',
                    blocks: [
                        {
                            kind: 'list',
                            variant: 'check',
                            items: [
                                'Entrevista de exploración de los motivos del cambio.',
                                'Aplicación de las evaluaciones psicológicas y vocacionales correspondientes.',
                                'Análisis de correspondencia entre tu perfil y el perfil del programa al que deseas trasladarte.',
                                'Cita de entrega de resultados y orientación sobre los pasos administrativos subsiguientes.'
                            ]
                        }
                    ]
                },
                {
                    id: 'como-solicitarlo',
                    tone: 'soft',
                    eyebrow: 'Cómo solicitarlo',
                    title: 'Cinco pasos',
                    blocks: [
                        {
                            kind: 'steps',
                            items: [
                                { title: 'Verifica las fechas', text: 'Consulta el calendario académico disponible en el portal de la Universidad. Las evaluaciones se realizan dentro de períodos definidos; fuera de esas fechas, la solicitud se tramita en el período siguiente.' },
                                { title: 'Solicita tu cita', text: VIA_SOLICITUD },
                                { title: 'Completa el formulario de solicitud', text: null },
                                { title: 'Realiza las evaluaciones correspondientes', text: 'Se aplican en la fecha y el horario que se te asignen.' },
                                { title: 'Acude a la cita de entrega de resultados', text: 'En ella se explica el resultado de la evaluación y se orienta sobre la continuación del trámite.' }
                            ]
                        },
                        {
                            kind: 'note',
                            variant: 'info',
                            title: 'Importante',
                            paragraphs: [
                                'La evaluación en la Unidad constituye un paso del proceso y no su totalidad. La formalización del cambio está sujeta a los requisitos del Reglamento Académico Estudiantil y depende de que el estudiante cuente con el perfil del programa al que aspira ingresar.'
                            ]
                        },
                        { kind: 'pending', label: 'Instancia que formaliza el cambio de carrera y determina las convalidaciones' },
                        {
                            kind: 'actions',
                            items: [
                                { label: 'Iniciar solicitud de cambio de carrera', href: 'solicitar-cita.html', variant: 'primary' }
                            ]
                        }
                    ]
                },
                {
                    id: 'preguntas-frecuentes',
                    eyebrow: 'Dudas frecuentes',
                    title: 'Preguntas frecuentes',
                    blocks: [
                        {
                            kind: 'faq',
                            items: [
                                {
                                    id: 'cc-01',
                                    question: '¿Qué ocurre si, concluida la evaluación, decido permanecer en mi carrera?',
                                    answer: 'Es un desenlace válido y frecuente: el proceso permite tanto confirmar un cambio como confirmar una permanencia. El resultado, no obstante, varía según la situación. Cuando se trata de un cambio obligatorio derivado de una disposición académica, las opciones están definidas institucionalmente y el proceso acompaña al estudiante en la elección entre ellas. Cuando el estudiante permanece en su programa y se identifican necesidades académicas o personales, el proceso puede concluir en un acuerdo de apoyo: medidas de seguimiento dentro de la Universidad, un referimiento a un servicio externo, o ambas, con seguimiento de la Unidad para verificar que el apoyo se concrete.'
                                },
                                {
                                    id: 'cc-02',
                                    question: '¿Se pierden las asignaturas ya aprobadas?',
                                    answer: 'Depende de la correspondencia entre ambos planes de estudio. La convalidación no la determina la Unidad, sino la instancia académica correspondiente.'
                                },
                                {
                                    id: 'cc-03',
                                    question: '¿Es posible cambiar de carrera más de una vez?',
                                    answer: 'El Reglamento Académico Estudiantil establece las condiciones y los límites aplicables. Puedes consultarlo en la Unidad o escribir a orientacion@unphu.edu.do para que te orienten sobre tu caso.'
                                }
                            ]
                        }
                    ]
                }
            ]
        },

        /* =========================================================
           REINGRESO
           ========================================================= */
        'reingreso': {
            meta: {
                title: 'Reingreso | Bienestar Estudiantil UNPHU',
                description: 'Proceso de reingreso a la UNPHU: evaluación, orientación y pasos para reincorporarte a tus estudios.'
            },
            hero: {
                eyebrow: 'Unidad de Orientación y Vida Estudiantil',
                title: 'Reingreso',
                lead: 'Evaluación y acompañamiento para la reincorporación a tus estudios universitarios.',
                back: { label: 'Unidad de Orientación y Vida Estudiantil', href: 'unidad-orientacion-vida-estudiantil.html' }
            },
            sections: [
                {
                    id: 'de-que-se-trata',
                    eyebrow: 'De qué se trata',
                    title: 'Volver a los estudios con condiciones para sostenerlo',
                    blocks: [
                        {
                            kind: 'prose',
                            paragraphs: [
                                'El reingreso es el proceso mediante el cual un estudiante que interrumpió sus estudios se reincorpora a la Universidad. La Unidad realiza la evaluación y la orientación que forman parte de dicho proceso.',
                                'Una interrupción de los estudios suele obedecer a circunstancias específicas: dificultades económicas, condiciones de salud, un duelo, responsabilidades familiares, exigencias laborales o un desgaste sostenido. El proceso contempla el análisis de las circunstancias que motivaron la interrupción y de las condiciones actuales que permitirán sostener el retorno.'
                            ]
                        }
                    ]
                },
                {
                    id: 'a-quien',
                    tone: 'soft',
                    eyebrow: 'A quién está dirigido',
                    title: '¿Es para ti?',
                    blocks: [
                        {
                            kind: 'list',
                            items: [
                                'Estudiantes que interrumpieron sus estudios por uno o más períodos y desean retomarlos.',
                                'Estudiantes que suspendieron su carrera por razones personales, familiares, económicas o de salud.',
                                'Estudiantes que deben completar la evaluación como parte del trámite institucional de reincorporación.'
                            ]
                        }
                    ]
                },
                {
                    id: 'que-incluye',
                    eyebrow: 'Qué incluye el proceso',
                    title: 'Las etapas del acompañamiento',
                    blocks: [
                        {
                            kind: 'list',
                            variant: 'check',
                            items: [
                                'Entrevista sobre las circunstancias de la interrupción y las condiciones actuales para retomar los estudios.',
                                'Aplicación de las evaluaciones correspondientes.',
                                'Orientación sobre la organización del retorno: carga académica, hábitos de estudio y apoyos disponibles en la Universidad.',
                                'Cita de entrega de resultados y orientación sobre los pasos administrativos subsiguientes.'
                            ]
                        }
                    ]
                },
                {
                    id: 'como-solicitarlo',
                    tone: 'soft',
                    eyebrow: 'Cómo solicitarlo',
                    title: 'Cinco pasos',
                    blocks: [
                        {
                            kind: 'steps',
                            items: [
                                { title: 'Verifica las fechas', text: 'Consulta el calendario académico para conocer el período en que se realizan las evaluaciones de reingreso.' },
                                { title: 'Realiza la solicitud de manera presencial', text: 'Acude al Decanato de Bienestar Estudiantil, Edificio 8, primera planta, contiguo a Registro, de lunes a viernes de 8:00 a. m. a 5:00 p. m. Para consultas previas puedes escribir a ' + EMAIL_ORIENTACION + ' o comunicarte al ' + PHONE + ', ext. 1119.' },
                                { title: 'Completa el formulario de solicitud', text: null },
                                { title: 'Realiza las evaluaciones correspondientes', text: null },
                                { title: 'Acude a la cita de entrega de resultados', text: null }
                            ]
                        },
                        {
                            kind: 'note',
                            variant: 'info',
                            title: 'Importante',
                            paragraphs: [
                                'El reingreso comprende además gestiones ante la instancia académica correspondiente y está sujeto a lo establecido en el Reglamento Académico Estudiantil, incluido el plan de estudios vigente al momento de la reincorporación.'
                            ]
                        },
                        { kind: 'pending', label: 'Instancia que formaliza el reingreso y determina las equivalencias' },
                        {
                            kind: 'actions',
                            items: [
                                { label: 'Iniciar solicitud de reingreso', href: 'solicitar-cita.html', variant: 'primary' }
                            ]
                        }
                    ]
                },
                {
                    id: 'preguntas-frecuentes',
                    eyebrow: 'Dudas frecuentes',
                    title: 'Preguntas frecuentes',
                    blocks: [
                        {
                            kind: 'faq',
                            items: [
                                {
                                    id: 'rg-01',
                                    question: '¿Se retoma el mismo plan de estudios?',
                                    answer: 'No necesariamente. Si el plan fue actualizado durante el período de ausencia, la reincorporación se realiza al plan vigente. Las equivalencias las determina la instancia académica correspondiente.'
                                },
                                {
                                    id: 'rg-02',
                                    question: 'Interrumpí mis estudios hace varios años, ¿aún puedo reingresar?',
                                    answer: 'Los plazos y condiciones están definidos en el Reglamento Académico Estudiantil y varían según el tiempo transcurrido y la situación académica previa. Consúltalo directamente con la Unidad.'
                                },
                                {
                                    id: 'rg-03',
                                    question: '¿Debo explicar los motivos de la interrupción?',
                                    answer: 'La entrevista busca comprender tu situación con el fin de orientar adecuadamente el retorno. Compartes la información que consideres pertinente.'
                                }
                            ]
                        }
                    ]
                }
            ]
        },

        /* =========================================================
           APOYO EMOCIONAL
           ========================================================= */
        'apoyo-emocional': {
            meta: {
                title: 'Apoyo Emocional | Bienestar Estudiantil UNPHU',
                description: 'Primera ayuda psicológica gratuita y confidencial para estudiantes de la UNPHU. Terapia breve, evaluación, referimiento y atención de emergencias.'
            },
            hero: {
                eyebrow: 'Unidad de Orientación y Vida Estudiantil',
                title: 'Apoyo Emocional',
                lead: 'Atención psicológica de primera línea para estudiantes, en un espacio confidencial y gratuito.',
                back: { label: 'Unidad de Orientación y Vida Estudiantil', href: 'unidad-orientacion-vida-estudiantil.html' },
                actions: [
                    {
                        label: 'Emergencia psicológica',
                        href: 'emergencia-psicologica.html',
                        variant: 'urgent',
                        icon: 'emergency_home',
                        opensEmergency: true
                    }
                ]
            },
            sections: [
                {
                    id: 'de-que-se-trata',
                    eyebrow: 'De qué se trata',
                    title: 'Primera ayuda psicológica y terapia breve',
                    blocks: [
                        {
                            kind: 'prose',
                            paragraphs: [
                                'El servicio de apoyo emocional ofrece primera ayuda psicológica a los estudiantes de la UNPHU. Consiste en un espacio confidencial en el que un psicólogo de la Unidad realiza una evaluación de tu situación y desarrolla contigo alternativas concretas de manejo.',
                                'Es importante precisar su alcance. No constituye un tratamiento psicoterapéutico prolongado. Se trata de una intervención de terapia breve, ajustada a lo que una unidad universitaria puede sostener con calidad: un número acotado de sesiones, centradas en la situación presente y con objetivos definidos.',
                                'Cuando la situación requiere un tratamiento de mayor alcance —psicoterapia sostenida, atención psiquiátrica o un abordaje especializado—, se realiza la evaluación correspondiente, se te explica el tipo de atención que necesitas y se efectúa un referimiento a un servicio externo, con seguimiento de la Unidad para verificar que la referencia se concrete.'
                            ]
                        }
                    ]
                },
                {
                    id: 'motivos',
                    tone: 'soft',
                    eyebrow: 'Motivos frecuentes de consulta',
                    title: 'No necesitas un diagnóstico para pedir ayuda',
                    lead: 'No se requiere un diagnóstico previo ni una situación crítica para solicitar el servicio. Los siguientes son motivos frecuentes y suficientes:',
                    blocks: [
                        {
                            kind: 'list',
                            items: [
                                { title: 'Ansiedad académica', text: 'Bloqueo ante exámenes, presentaciones o entregas; temor persistente al fracaso.' },
                                { title: 'Estado de ánimo deprimido sostenido', text: 'Desánimo persistente, pérdida de interés en actividades antes gratificantes, sensación de vacío.' },
                                { title: 'Dificultades de adaptación', text: 'Traslado desde otra provincia o país, dificultades de integración, sensación permanente de no pertenecer al entorno.' },
                                { title: 'Estrés y agotamiento', text: 'Cansancio que el descanso no compensa, irritabilidad, percepción de sobrecarga.' },
                                { title: 'Alteraciones del sueño o del apetito', text: 'Asociadas a la carga académica o a una situación personal.' },
                                { title: 'Dificultades de concentración y memoria', text: 'No atribuibles a la falta de estudio.' },
                                { title: 'Duelo', text: 'Fallecimiento de una persona cercana, ruptura afectiva u otra pérdida significativa.' },
                                { title: 'Conflictos familiares o de pareja', text: 'Con incidencia en el rendimiento académico o en el estado emocional.' },
                                { title: 'Dificultades en la autoestima y en la imagen personal', text: null },
                                { title: 'Preocupación por el consumo de alcohol u otras sustancias', text: 'Propio o de una persona cercana.' },
                                { title: 'Pensamientos de hacerte daño, en cualquier grado', text: 'Este motivo recibe atención prioritaria.' }
                            ]
                        }
                    ]
                },
                {
                    id: 'que-incluye',
                    eyebrow: 'Qué incluye',
                    title: 'Alcance del servicio',
                    blocks: [
                        {
                            kind: 'list',
                            variant: 'check',
                            items: [
                                'Primera entrevista de evaluación de la situación presentada.',
                                'Sesiones de terapia breve: un número acotado de encuentros orientados al manejo de la situación actual y al desarrollo de recursos personales.',
                                'Evaluación psicológica, cuando el caso lo requiere.',
                                'Referimiento a servicios externos, con seguimiento, cuando la situación excede el alcance del servicio universitario.',
                                'Orientación a la comunidad universitaria cuando un docente o un compañero identifica a un estudiante en dificultad.'
                            ]
                        }
                    ]
                },
                {
                    id: 'como-solicitarlo',
                    tone: 'soft',
                    eyebrow: 'Cómo solicitarlo',
                    title: 'Cuatro pasos',
                    blocks: [
                        {
                            kind: 'steps',
                            items: [
                                { title: 'Solicita tu cita', text: VIA_SOLICITUD },
                                { title: 'Completa el formulario de solicitud del servicio', text: null },
                                { title: 'Asiste a la primera entrevista', text: 'Con el psicólogo asignado.' },
                                { title: 'Define contigo el plan de atención', text: 'Al concluir la entrevista: seguimiento en la Unidad, referimiento a un servicio especializado, o ambos.' }
                            ]
                        },
                        {
                            kind: 'actions',
                            items: [
                                { label: 'Solicitar apoyo emocional', href: 'solicitar-cita.html', variant: 'primary' },
                                { label: 'Referir a un estudiante', href: 'referir-estudiante.html', variant: 'outline' }
                            ]
                        }
                    ]
                },
                {
                    id: 'confidencialidad',
                    eyebrow: 'Sobre la confidencialidad',
                    title: 'Qué se protege y cuáles son sus límites',
                    blocks: [
                        {
                            kind: 'prose',
                            paragraphs: [
                                'La información que compartes es confidencial y no se comunica a docentes, autoridades académicas ni familiares. Como toda atención psicológica, esa confidencialidad tiene límites establecidos: puede compartirse información —la mínima necesaria y con la instancia que corresponda— cuando existe riesgo para tu vida o la de otra persona; cuando se identifica una situación de violencia o desprotección cuya notificación resulta obligatoria conforme a la ley; cuando lo requiere formalmente una autoridad judicial; cuando el estudiante lo autoriza por escrito; y en la supervisión profesional del equipo.',
                                'Estos supuestos se te explican en la primera cita, antes de que decidas continuar. De aplicarse alguno de ellos, se te informa oportunamente.'
                            ]
                        }
                    ]
                },
                {
                    id: 'emergencias',
                    tone: 'soft',
                    eyebrow: 'Atención en situaciones de emergencia psicológica',
                    title: 'Qué hacer ante una crisis',
                    blocks: [
                        {
                            kind: 'prose',
                            paragraphs: [
                                'La Unidad participa, junto a las instancias competentes de la Universidad, en el protocolo institucional de emergencias psicológicas, que ordena la respuesta ante situaciones de crisis ocurridas en el campus: crisis de ansiedad aguda, episodios de descompensación, riesgo de daño a sí mismo o a terceros, e impacto emocional derivado de un evento crítico en la comunidad universitaria.'
                            ]
                        },
                        {
                            kind: 'note',
                            variant: 'urgent',
                            title: 'Si atraviesas una situación de esta naturaleza, o identificas a un compañero que la atraviesa',
                            items: [
                                'Acude directamente al Decanato de Bienestar Estudiantil, Edificio 8, primera planta, contiguo a Registro. No se requiere cita previa ni formulario. Las emergencias se atienden de inmediato, de lunes a viernes de 8:00 a. m. a 5:00 p. m.',
                                'Comunícate al ' + PHONE + ', ext. 1119, si no puedes trasladarte.',
                                'Fuera del horario de atención o fuera del campus, comunícate con el 9-1-1, sistema nacional de atención a emergencias.',
                                'Si la persona en riesgo es un compañero, no lo dejes solo y solicita ayuda de inmediato.'
                            ],
                            action: { label: 'Ver el protocolo completo', href: 'emergencia-psicologica.html', opensEmergency: true }
                        },
                        { kind: 'pending', label: 'Contacto de seguridad universitaria para emergencias dentro del campus fuera de horario' },
                        {
                            kind: 'prose',
                            paragraphs: [
                                'Concluida la atención inmediata, la Unidad da seguimiento al caso, coordina el referimiento a la atención especializada que corresponda y acompaña la reincorporación académica del estudiante.'
                            ]
                        }
                    ]
                },
                {
                    id: 'preguntas-frecuentes',
                    eyebrow: 'Dudas frecuentes',
                    title: 'Preguntas frecuentes',
                    blocks: [
                        {
                            kind: 'faq',
                            items: [
                                {
                                    id: 'ae-01',
                                    question: '¿Este servicio constituye un tratamiento psicoterapéutico?',
                                    answer: 'Es una primera ayuda psicológica, en modalidad de terapia breve y centrada en la situación actual. Cuando se requiere un proceso prolongado, se realiza la evaluación, se orienta al estudiante y se efectúa el referimiento correspondiente.'
                                },
                                {
                                    id: 'ae-02',
                                    question: '¿Cuántas sesiones comprende?',
                                    answer: 'Un número acotado, que se define en la primera entrevista según la situación presentada.'
                                },
                                {
                                    id: 'ae-03',
                                    question: '¿La Universidad registra que solicité el servicio ante mi escuela o mis profesores?',
                                    answer: 'No, con excepción de los supuestos de límite a la confidencialidad señalados anteriormente.'
                                },
                                {
                                    id: 'ae-04',
                                    question: '¿Tiene costo?',
                                    answer: 'No. Está incluido en tu condición de estudiante de la UNPHU.'
                                },
                                {
                                    id: 'ae-05',
                                    question: '¿Puede solicitarse una cita en nombre de otra persona?',
                                    answer: 'La cita la solicita el propio estudiante. Lo que sí puede hacerse es referir el caso a la Unidad, que se pondrá en contacto con el estudiante para ofrecerle los servicios disponibles. En situaciones de riesgo inmediato debe acudirse directamente al Decanato o comunicarse a la extensión.'
                                }
                            ]
                        }
                    ]
                }
            ]
        },

        /* =========================================================
           PROGRAMA DE FORMACIÓN ESTUDIANTIL VIDA INTEGRAL
           ========================================================= */
        'vida-integral': {
            meta: {
                title: 'Programa de Formación Estudiantil Vida Integral | Bienestar Estudiantil UNPHU',
                description: 'Charlas, talleres y conferencias gratuitas para estudiantes UNPHU sobre bienestar emocional, prevención de riesgos, valores y vida saludable. Otorga horas cocurriculares.'
            },
            hero: {
                eyebrow: 'Decanato de Bienestar Estudiantil',
                title: 'Programa de Formación Estudiantil Vida Integral',
                lead: 'Formación complementaria para el desarrollo personal y humano del estudiantado.',
                back: { label: 'Unidad de Orientación y Vida Estudiantil', href: 'unidad-orientacion-vida-estudiantil.html' }
            },
            sections: [
                {
                    id: 'de-que-se-trata',
                    eyebrow: 'De qué se trata',
                    title: 'Formación que complementa tu carrera',
                    blocks: [
                        {
                            kind: 'prose',
                            paragraphs: [
                                'Vida Integral es una iniciativa del Decanato de Bienestar Estudiantil dirigida a toda la comunidad estudiantil. Complementa la formación académica mediante charlas, talleres y conferencias impartidos por profesionales, que se desarrollan a lo largo del cuatrimestre y están abiertos a estudiantes de todas las carreras.',
                                'El programa responde a una premisa formativa: la competencia profesional no se sustenta únicamente en los contenidos técnicos de la carrera. La gestión de las emociones, el reconocimiento de los riesgos psicosociales, la formación en valores y el cuidado de la salud constituyen competencias que se desarrollan y que sostienen tanto la vida universitaria como el ejercicio profesional posterior.'
                            ]
                        },
                        { kind: 'pending', label: 'Confirmar si en los materiales institucionales el programa se describe como trimestral o por cuatrimestre' }
                    ]
                },
                {
                    id: 'ejes',
                    tone: 'soft',
                    eyebrow: 'Ejes fundamentales',
                    title: 'Cuatro componentes',
                    lead: 'El programa se estructura en cuatro componentes que estimulan las dimensiones ética, espiritual, cognitiva, afectiva, física y estética del ser humano.',
                    blocks: [
                        {
                            kind: 'table',
                            columns: ['Eje', 'Contenido'],
                            rows: [
                                ['Bienestar Emocional', 'Herramientas para la gestión de las emociones y el cuidado de la salud mental.'],
                                ['Prevención de Riesgos Psicosociales', 'Talleres de apoyo y disminución de factores de riesgo en la vida estudiantil.'],
                                ['Ética, Formación en Valores y Sostenibilidad', 'Concientización sobre el rol ciudadano y profesional del estudiante.'],
                                ['Vida Saludable', 'Promoción de hábitos físicos y estilos de vida equilibrados.']
                            ]
                        }
                    ]
                },
                {
                    id: 'actividades',
                    eyebrow: 'Actividades destacadas',
                    title: 'Qué encontrarás en la programación',
                    blocks: [
                        {
                            kind: 'list',
                            items: [
                                'Charlas sobre manejo constructivo del estrés y comunicación efectiva.',
                                'Conferencias magistrales sobre finanzas personales para la vida universitaria.',
                                'Talleres de habilidades para la vida, en colaboración con instituciones especializadas.',
                                'Actividades presenciales y virtuales que otorgan horas cocurriculares a los participantes.'
                            ]
                        }
                    ]
                },
                {
                    id: 'como-participar',
                    tone: 'soft',
                    eyebrow: 'Cómo participar',
                    title: 'Tres pasos',
                    blocks: [
                        {
                            kind: 'steps',
                            items: [
                                { title: 'Consulta la programación del cuatrimestre', text: 'La programación se difunde por los canales del Decanato.' },
                                { title: 'Inscríbete a través de cocurriculares', text: 'La inscripción es requisito para participar y para el registro de la actividad.' },
                                { title: 'Asiste en la fecha, hora y modalidad indicadas', text: null }
                            ]
                        },
                        {
                            kind: 'prose',
                            paragraphs: [
                                'Las actividades son gratuitas y están abiertas a estudiantes de todas las carreras. Los cupos son limitados.'
                            ]
                        },
                        { kind: 'pending', label: 'Medio en que se publica la programación del cuatrimestre' },
                        { kind: 'pending', label: 'Enlace o plataforma de inscripción en cocurriculares' }
                    ]
                },
                {
                    id: 'preguntas-frecuentes',
                    eyebrow: 'Dudas frecuentes',
                    title: 'Preguntas frecuentes',
                    blocks: [
                        {
                            kind: 'faq',
                            items: [
                                {
                                    id: 'vi-01',
                                    question: '¿Se emite certificado de participación?',
                                    answer: 'No se emite certificado. Según la actividad, la asistencia puede registrarse como horas cocurriculares.'
                                },
                                {
                                    id: 'vi-02',
                                    question: '¿Otorga créditos académicos?',
                                    answer: 'No. Vida Integral constituye formación complementaria y no otorga créditos. Según la convocatoria, puede otorgar horas cocurriculares.'
                                },
                                {
                                    id: 'vi-03',
                                    question: '¿Es necesario inscribirse?',
                                    answer: 'Sí. La inscripción se realiza a través de cocurriculares y es lo que garantiza el cupo y el registro de la participación.'
                                },
                                {
                                    id: 'vi-04',
                                    question: '¿Puede asistirse a una sola actividad?',
                                    answer: 'Sí. Cada actividad es independiente y la inscripción se realiza por actividad.'
                                },
                                {
                                    id: 'vi-05',
                                    question: '¿Pueden los estudiantes proponer temas o actividades?',
                                    answer: 'Sí. Las propuestas pueden dirigirse a ' + EMAIL_DECANATO + '. La programación se construye también a partir de los planteamientos del estudiantado.'
                                }
                            ]
                        }
                    ]
                }
            ]
        },

        /* =========================================================
           UNIDAD DE PROGRESO ACADÉMICO (UPA)
           ========================================================= */
        'upa': {
            meta: {
                title: 'Unidad de Progreso Académico | Bienestar Estudiantil UNPHU',
                description: 'Seguimiento al progreso académico en la UNPHU: alertas académicas, orientación académica, intervención psicoeducativa y tutorías.'
            },
            hero: {
                eyebrow: 'Decanato de Bienestar Estudiantil',
                title: 'Unidad de Progreso Académico (UPA)',
                lead: 'Seguimiento al progreso académico, sistema de alertas y coordinación de acciones con las escuelas en apoyo al rendimiento de los estudiantes.'
            },
            sections: [
                {
                    id: 'quienes-somos',
                    eyebrow: 'Quiénes somos',
                    title: 'Apoyo al progreso académico',
                    blocks: [
                        {
                            kind: 'prose',
                            paragraphs: [
                                'Unidad del decanato centrada en el seguimiento al progreso académico. Gestiona el sistema de alertas y coordina acciones con las escuelas en apoyo al rendimiento de los estudiantes.',
                                'Forma parte del sistema de apoyo al progreso académico de los estudiantes, el cual se enmarca en el Modelo Educativo UNPHU, integrando los ejes del modelo y alineado a la Filosofía Institucional y a las dimensiones estratégicas de la institución.'
                            ]
                        }
                    ]
                },
                {
                    id: 'servicios',
                    tone: 'soft',
                    eyebrow: 'Servicio de Acompañamiento e Intervención Psicopedagógica',
                    title: 'Tres modalidades de abordaje',
                    blocks: [
                        {
                            kind: 'cards',
                            items: [
                                {
                                    icon: 'event_note',
                                    name: 'Orientación Académica',
                                    description: 'Planificación de actividades, proyección y planificación de la selección de asignaturas, autocuidado y rendimiento académico, comunicación asertiva y estilos de aprendizaje.'
                                },
                                {
                                    icon: 'psychology',
                                    name: 'Intervención Psicoeducativa',
                                    description: 'Técnicas de estudio, estrategias de aprendizaje, hábitos de trabajo, gestión y manejo del tiempo, motivación académica, preparación de exámenes, manejo del espacio y del medio ambiente como medio intelectual, y estrategias de comprensión, expresión, memorización y atención.'
                                },
                                {
                                    icon: 'groups_2',
                                    name: 'Tutorías',
                                    description: 'Coordinación de las tutorías junto con las escuelas, en las modalidades establecidas en el Plan de Acción Tutorial de la UNPHU: tutoría académica de reforzamiento, tutoría de iguales, tutoría de asesoramiento, mentorías y consejería académica.'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'como-solicitarlo',
                    eyebrow: 'Cómo solicitar el acompañamiento psicopedagógico',
                    title: 'Procedimiento',
                    blocks: [
                        {
                            kind: 'steps',
                            items: [
                                { title: 'Realiza la solicitud', text: 'A través de tu correo institucional o de manera presencial en la unidad.' },
                                { title: 'Mantente pendiente de tu correo', text: 'Por esa vía se te confirma la cita.' },
                                { title: 'Asiste a la cita asignada', text: null }
                            ]
                        },
                        {
                            kind: 'note',
                            variant: 'info',
                            title: 'Tiempo de respuesta',
                            paragraphs: ['De 1 a 3 días.']
                        },
                        { kind: 'pending', label: 'Enlace público a los formularios de atención psicopedagógica y de solicitud de tutorías' },
                        {
                            kind: 'actions',
                            items: [
                                { label: 'Escribir a la UPA', href: 'mailto:' + EMAIL_UPA, variant: 'primary' }
                            ]
                        }
                    ]
                },
                {
                    id: 'documentos',
                    tone: 'soft',
                    eyebrow: 'Documentos',
                    title: 'Normativa que rige la unidad',
                    blocks: [
                        {
                            kind: 'list',
                            variant: 'check',
                            items: [
                                { title: 'Manual de tutorías (VAC-201-MAN-002)', text: 'Describe y regula el funcionamiento de los diferentes tipos de tutorías para favorecer el acompañamiento a los estudiantes en su proceso de formación.' },
                                { title: 'Seguimiento a estudiantes (VCAC-201-PRO-004)', text: 'Regula el seguimiento del progreso y el rendimiento académico.' },
                                { title: 'Plan de Acción Tutorial (VCAC-201-ODC-008)', text: 'Conjunto de acciones de información, orientación y soporte al estudiante a lo largo de sus estudios, que robustece su formación en diferentes momentos de su vida académica.' }
                            ]
                        }
                    ]
                },
                {
                    id: 'equipo',
                    eyebrow: 'Equipo',
                    title: 'Quién te atiende',
                    lead: 'Las fotografías institucionales del equipo están pendientes de entrega.',
                    blocks: [
                        {
                            kind: 'people',
                            items: [
                                {
                                    initials: 'RP',
                                    name: 'Raldania Pérez Rodríguez',
                                    role: 'Coordinadora de la Unidad de Progreso Académico',
                                    bio: 'Psicopedagoga y psicóloga clínica orientada a la intervención estratégica en educación superior. Experta en identificar barreras cognitivas y emocionales que afectan el desempeño académico, logrando una mejora medible en el rendimiento y la autogestión del estudiante. Enfocada en potenciar el bienestar psicológico y el éxito académico de los alumnos para reducir los índices de deserción institucional.',
                                    contacts: [
                                        { icon: 'call', label: 'Ext. 2820', href: PHONE_HREF },
                                        { icon: 'mail', label: 'raperez@unphu.edu.do', href: 'mailto:raperez@unphu.edu.do' }
                                    ]
                                },
                                {
                                    initials: 'LR',
                                    name: 'Lyssave Rodríguez Cordero',
                                    role: 'Asistente de la Unidad de Progreso Académico',
                                    bio: 'Profesional de la psicología educativa con más de cuatro años de experiencia en psicopedagogía y acompañamiento académico universitario. Su labor se centra en brindar orientación, seguimiento e intervención a estudiantes, favoreciendo su adaptación, bienestar y desarrollo durante su trayectoria universitaria. Cuenta con experiencia en evaluación e intervención psicopedagógica, orientación académica, técnicas de estudio, planificación y organización académica, gestión de tutorías de reforzamiento y desarrollo de talleres sobre motivación académica.',
                                    contacts: [
                                        { icon: 'call', label: 'Ext. 2820', href: PHONE_HREF },
                                        { icon: 'mail', label: 'lyrodriguez@unphu.edu.do', href: 'mailto:lyrodriguez@unphu.edu.do' }
                                    ]
                                },
                                {
                                    initials: 'AU',
                                    name: 'Ana Gabriela Ureña Polanco',
                                    role: 'Analista de la Unidad de Progreso Académico de Medicina',
                                    bio: 'Psicóloga clínica, cursando la Maestría en Neuropsicología Clínica. Imparte orientación y acompañamiento psicopedagógico individualizado a estudiantes de los diferentes ciclos de la carrera de Medicina. Proporciona estrategias personalizadas de técnicas y hábitos de estudio, planificación académica, organización y administración del tiempo, creando las condiciones para la adaptación a las exigencias de la formación médica.',
                                    contacts: [
                                        { icon: 'call', label: 'Ext. 1157', href: PHONE_HREF },
                                        { icon: 'mail', label: 'upamedicina@unphu.edu.do', href: 'mailto:upamedicina@unphu.edu.do' },
                                        { icon: 'mail', label: 'agurena@unphu.edu.do', href: 'mailto:agurena@unphu.edu.do' }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'contacto',
                    tone: 'soft',
                    eyebrow: 'Contacto',
                    title: 'Unidad de Progreso Académico',
                    blocks: [
                        {
                            kind: 'contact',
                            items: [
                                { icon: 'location_on', label: 'Ubicación', value: 'Edificio 8, primer nivel, al lado de Registro', href: null },
                                { icon: 'schedule', label: 'Horario', value: 'Lunes a viernes, 8:00 a. m. a 5:00 p. m.', href: null },
                                { icon: 'call', label: 'Extensión', value: PHONE + ', ext. 2820', href: PHONE_HREF },
                                { icon: 'mail', label: 'Correo', value: EMAIL_UPA, href: 'mailto:' + EMAIL_UPA }
                            ]
                        },
                        { kind: 'pending', label: 'WhatsApp y redes sociales de la unidad, si aplican' }
                    ]
                }
            ]
        }
    };
})();
