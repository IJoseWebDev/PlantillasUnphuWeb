/**
 * BIENESTAR ESTUDIANTIL — CAPA DE CONTENIDO DE LA PORTADA (CMS / FIREBASE)
 *
 * Este archivo concentra TODO el contenido editable de la portada del
 * micrositio. La presentación vive en `landing-bienestar-estudiantil.js`
 * (render) y en `bienestar-estudiantil.css`.
 *
 * ARQUITECTURA PARA NEXT.JS / DASHBOARD:
 * - `window.BIENESTAR_CONTENT` → respuesta del CMS (colección `bienestar`).
 * - Cada clave de primer nivel corresponde a un componente de la portada:
 *   hero → <Hero /> + <ReportCard />      about → <About />
 *   whatWeDo → <WhatWeDo />               units → <Units />
 *   authorities → <Authorities />         documents → <Documents />
 *   rights → <Rights />                   groups → <StudentGroups />
 *   faq → <Faq />                         contact → <Contact /> + <ContactCta />
 *
 * Las páginas de unidades y servicios tienen su propio archivo:
 * `bienestar-servicios-content.js`. El protocolo de emergencia, compartido por
 * todas las páginas, vive en `micrositio-bienestar-estudiantil.js`.
 *
 * REGLA DE CONTENIDO:
 * Solo se incluye información suministrada por la universidad. Todo dato aún no
 * proporcionado usa `null` + una etiqueta de placeholder visible. NO sustituir
 * placeholders por contenido inventado: conectar el dashboard.
 */
(function () {
    'use strict';

    /* Etiquetas de placeholder reutilizables (no usar lorem ipsum) */
    var PENDING = {
        content: '[Contenido pendiente de proporcionar]',
        answer: '[Respuesta pendiente de proporcionar]',
        image: '[IMAGEN — ASSET PENDIENTE]',
        url: '[ENLACE PENDIENTE DE PROPORCIONAR]',
        data: '[DATO PENDIENTE DE CONFIRMAR]'
    };

    var EMAIL = 'bienestarestudiantil@unphu.edu.do';
    var PHONE = '809-562-6601';
    var PHONE_HREF = 'tel:+18095626601';

    window.BIENESTAR_CONTENT = {

        pending: PENDING,

        /* ---------- SEO / metadatos ---------- */
        meta: {
            title: 'Bienestar Estudiantil | UNPHU',
            description: 'Decanato de Bienestar Estudiantil de la UNPHU: orientación, apoyo emocional, progreso académico, participación estudiantil, citas, referimientos y emergencias psicológicas.'
        },

        /* ---------- 1. Hero y tarjeta de reporte ---------- */
        hero: {
            eyebrow: 'Decanato de Bienestar Estudiantil',
            title: 'Tu aliado en cada paso del camino universitario',
            /* El texto de «¿Quiénes somos?» se reserva para esa sección, para
               no repetirlo en el hero. */
            lead: 'Orientación académica y vocacional, apoyo emocional, progreso académico y participación estudiantil. Todos los servicios son confidenciales y no tienen costo.',
            /* Al no haber navegación propia (el sitio principal aporta el
               header), el hero concentra todas las acciones del micrositio. */
            ctas: [
                { id: 'cita', label: 'Solicitar una cita', href: 'solicitar-cita.html', variant: 'light' },
                { id: 'referir', label: 'Referir a un estudiante', href: 'referir-estudiante.html', variant: 'ghost' },
                { id: 'contacto', label: 'Contacto', href: '#contacto', variant: 'ghost', icon: 'alternate_email' },
                {
                    id: 'emergencia',
                    label: 'Emergencia psicológica',
                    href: 'emergencia-psicologica.html',
                    variant: 'urgent',
                    icon: 'emergency_home',
                    /* Abre el modal cuando hay JS; sin JS navega a la página. */
                    opensEmergency: true
                }
            ],
            /* Fotografía institucional del decanato: mientras no exista el asset
               el hero mantiene el degradado UNPHU con su patrón. */
            image: {
                src: null,
                alt: null,
                placeholder: PENDING.image
            }
        },

        report: {
            title: 'Cómo hacer un reporte',
            /* `link` se pinta como enlace al final del texto del paso. */
            steps: [
                {
                    text: 'Escribe a ' + EMAIL + ' o comunícate al ' + PHONE + ', ext. 1122 y 1123.',
                    link: { label: 'Escribir al decanato', href: 'mailto:' + EMAIL }
                },
                {
                    text: 'Puedes asistir libremente para ser escuchado o solicitar una cita.',
                    link: { label: 'Solicitar una cita', href: 'solicitar-cita.html' }
                },
                {
                    text: 'Acude al Decanato de Bienestar Estudiantil, Edificio 8, primera planta, contiguo a Registro.'
                },
                {
                    text: 'El procedimiento es el mismo para todos los servicios de atención individual: la solicitud la realiza el propio estudiante y no requiere autorización de su escuela ni de ninguna otra instancia.'
                }
            ]
        },

        /* ---------- 2. ¿Quiénes somos? ---------- */
        about: {
            eyebrow: 'Quiénes somos',
            title: 'Decanato de Bienestar Estudiantil',
            paragraphs: [
                'Somos mucho más que un sistema de apoyo: somos tu aliado estratégico para transformar tu experiencia universitaria en un viaje de crecimiento integral.',
                'Nuestro compromiso es velar para que cada estudiante parte de la UNPHU avance en su formación y se desarrolle personal y profesionalmente, egresando como un profesional competente, humanista y con espíritu emprendedor.'
            ]
        },

        /* ---------- 3. ¿Qué hacemos? ---------- */
        whatWeDo: {
            eyebrow: 'Nuestro trabajo',
            title: '¿Qué hacemos?',
            lead: 'A través de un enfoque holístico e innovador, diseñamos y ejecutamos programas y servicios que acompañan tu trayectoria desde el primer día hasta tu graduación y más allá. Nuestro trabajo se centra en:',
            items: [
                {
                    id: 'escuchamos',
                    icon: 'hearing',
                    title: 'Escuchamos tu voz',
                    text: 'Un espacio seguro y empático donde puedes expresarte libremente, sentirte comprendido y que se atiendan tus necesidades.'
                },
                {
                    id: 'acompanamiento',
                    icon: 'explore',
                    title: 'Acompañamiento y orientación',
                    text: 'Orientación en procesos académicos, vocacional, apoyo emocional y psicopedagógico a través de las unidades del decanato, con atención inmediata y especializada ante situaciones que afectan tu bienestar.'
                },
                {
                    id: 'formacion-integral',
                    icon: 'self_improvement',
                    title: 'Apoyo a la formación integral',
                    text: 'Actividades en bienestar emocional, prevención de riesgos psicosociales, salud integral y ética, para que cultives un equilibrio entre tu vida personal y académica.'
                },
                {
                    id: 'participacion',
                    icon: 'groups',
                    title: 'Participación y liderazgo',
                    text: 'Te acompañamos para que te involucres en la vida universitaria y seas agente de cambio mediante agrupaciones estudiantiles, clubes, voluntariado o el rol de embajador.'
                },
                {
                    id: 'merito',
                    icon: 'emoji_events',
                    title: 'Reconocimiento al mérito',
                    text: 'Reconocemos el esfuerzo, el logro y los más altos valores institucionales que hacen meritorios a nuestros estudiantes.'
                }
            ]
        },

        /* ---------- 4. Unidades, servicios y programas ---------- */
        /* `href` apunta a la página propia de la unidad o programa; cuando es
           `null` el contenido todavía vive solo en esta tarjeta. */
        units: {
            eyebrow: 'Unidades y programas',
            title: 'Servicios',
            lead: 'El decanato atiende tu vida académica, emocional y de participación a través de sus unidades y de sus programas institucionales.',
            items: [
                {
                    id: 'uove',
                    icon: 'support_agent',
                    name: 'Unidad de Orientación y Vida Estudiantil',
                    description: 'Acompañamiento profesional en las decisiones académicas y en las situaciones personales que inciden en tu trayectoria: orientación vocacional, cambio de carrera, reingreso, apoyo emocional y Vida Integral.',
                    tags: ['Orientación vocacional', 'Cambio de carrera', 'Reingreso', 'Apoyo emocional', 'Vida Integral'],
                    href: 'unidad-orientacion-vida-estudiantil.html',
                    linkLabel: 'Conocer la unidad'
                },
                {
                    id: 'upa',
                    icon: 'school',
                    name: 'Unidad de Progreso Académico (UPA)',
                    description: 'Seguimiento al progreso académico: sistema de alertas, acompañamiento e intervención psicopedagógica y coordinación de tutorías con las escuelas.',
                    tags: ['Alertas académicas', 'Intervención psicoeducativa', 'Tutorías'],
                    href: 'unidad-progreso-academico.html',
                    linkLabel: 'Conocer la unidad'
                },
                {
                    id: 'acogida',
                    icon: 'waving_hand',
                    name: 'Programa de Acogida',
                    description: 'Favorece la integración y adaptación del estudiante de nuevo ingreso a la vida universitaria, al proveerle orientación sobre la institución, sus procesos y servicios.',
                    tags: ['Nuevo ingreso', 'Integración'],
                    href: null
                },
                {
                    id: 'vida-integral',
                    icon: 'volunteer_activism',
                    name: 'Programa de Formación Estudiantil Vida Integral',
                    description: 'Charlas, talleres y conferencias sobre bienestar emocional, prevención de riesgos psicosociales, ética y vida saludable, abiertos a estudiantes de todas las carreras.',
                    tags: ['Bienestar emocional', 'Prevención', 'Valores', 'Vida saludable'],
                    href: 'vida-integral.html',
                    linkLabel: 'Conocer el programa'
                },
                {
                    id: 'merito',
                    icon: 'military_tech',
                    name: 'Programa de Reconocimiento al Mérito Estudiantil',
                    description: 'Premia la excelencia académica y la contribución a la sociedad de los valores institucionales.',
                    tags: ['Excelencia académica'],
                    href: null
                },
                {
                    id: 'incluyo',
                    icon: 'accessibility_new',
                    name: 'Programa Incluyo',
                    description: 'Plan de acción y de atención a la diversidad de la UNPHU, por el que se garantiza la igualdad de oportunidades y se favorecen al máximo los accesos para el ingreso, la permanencia y el egreso del estudiante.',
                    tags: ['Igualdad de oportunidades', 'Atención a la diversidad'],
                    href: null
                }
            ]
        },

        /* ---------- 5. Equipo del decanato ---------- */
        /* `items` es una lista para que el dashboard pueda sumar o retirar
           personas sin tocar la presentación. */
        authorities: {
            eyebrow: 'Nuestro equipo',
            title: 'Autoridades',
            lead: 'Las fotografías institucionales del equipo están pendientes de entrega; mientras tanto se muestra un monograma.',
            items: [
                {
                    id: 'decana',
                    initials: 'AD',
                    name: 'Lic. Adrian Teonilda De Oleo Montero',
                    role: 'Decana de Bienestar Estudiantil',
                    bio: 'Psicóloga clínica con una profunda vocación de servicio y un firme compromiso con la transformación social. Cuenta con formación internacional en evaluación e intervención psicoeducativa (Universidade da Coruña) y dificultades de aprendizaje (ISEP y Universitat de Vic, Barcelona). Como decana, diseñó un sistema pionero de alertas académicas y apoyo psicoeducativo con enfoque preventivo, fortaleciendo la atención y prevención en salud mental de la comunidad estudiantil.',
                    contacts: [
                        { icon: 'call', label: PHONE + ', ext. 1123', href: PHONE_HREF },
                        { icon: 'mail', label: 'adeoleo@unphu.edu.do', href: 'mailto:adeoleo@unphu.edu.do' }
                    ]
                },
                {
                    id: 'atencion-estudiantes',
                    initials: 'CM',
                    name: 'Camila Mañón',
                    role: 'Analista de Atención a Estudiantes',
                    bio: 'Psicóloga clínica con experiencia en servicio y buen trato a la comunidad. Ofrece atención a las situaciones presentadas por los estudiantes, realizando las consultas pertinentes y el seguimiento necesario para la resolución de los casos.',
                    contacts: [
                        { icon: 'call', label: PHONE + ', ext. 1122', href: PHONE_HREF }
                    ]
                },
                {
                    id: 'fidelizacion',
                    initials: 'OO',
                    name: 'Lic. Oliva Alt. Ortiz',
                    role: 'Analista de Fidelización',
                    bio: 'Psicóloga clínica. Ofrece asistencia y orientación en los procesos académico-administrativos de la universidad, con la finalidad de orientar al estudiante y asegurar la calidad del servicio y la mejora continua. Apoya la gestión de las actividades del Programa de Formación Vida Integral, el reconocimiento al mérito estudiantil y el seguimiento a las agrupaciones estudiantiles.',
                    contacts: [
                        { icon: 'call', label: PHONE + ', ext. 2116', href: PHONE_HREF },
                        { icon: 'mail', label: 'oortiz@unphu.edu.do', href: 'mailto:oortiz@unphu.edu.do' }
                    ]
                }
            ]
        },

        /* ---------- 6. Procedimientos, programas y normativas ---------- */
        /* Ningún documento tiene enlace publicado todavía: cuando existan los
           PDF basta con rellenar `href` para que la ficha se vuelva enlace. */
        documents: {
            eyebrow: 'Marco normativo',
            title: 'Procedimientos y programas',
            lead: 'Las acciones del decanato se rigen por los siguientes documentos institucionales.',
            items: [
                {
                    code: 'VCAC-201-POL-001',
                    name: 'Política del Decanato de Bienestar Estudiantil',
                    description: 'Plantea las acciones relacionadas con la escucha de la voz estudiantil, la colaboración en la gestión frente a otras instancias académico-administrativas y la orientación institucional, académica, vocacional, de apoyo emocional y psicopedagógico.',
                    note: 'Actualmente en revisión. El enlace se publicará cuando se apruebe la nueva versión.',
                    href: null
                },
                {
                    code: 'VCAC-201-PRO-001',
                    name: 'Procedimiento de atención de casos de estudiantes',
                    description: 'Describe los pasos que debe realizar un estudiante para ser escuchado y para que sus situaciones a lo interno de la universidad sean atendidas debidamente.',
                    href: null
                },
                {
                    code: 'VCAC-201-PRO-002',
                    name: 'Procedimiento de orientación estudiantil',
                    description: 'Detalla los procesos involucrados y los programas y acciones pertinentes a las labores de prevención y atención.',
                    href: null
                },
                {
                    code: 'VCAC-201-PRO-004',
                    name: 'Seguimiento a estudiantes',
                    description: 'Regula el seguimiento del progreso y el rendimiento académico.',
                    href: null
                },
                {
                    code: 'VCAC-201-ODC-001',
                    name: 'Programa de Reconocimiento al Mérito Estudiantil',
                    description: 'Premia la excelencia académica y la contribución a la sociedad de los valores institucionales.',
                    href: null
                },
                {
                    code: 'VCAC-201-ODC-002',
                    name: 'Programa de Acogida',
                    description: 'Favorece la integración y adaptación del estudiante de nuevo ingreso a la vida universitaria, al proveerle orientación sobre la institución, sus procesos y servicios.',
                    href: null
                },
                {
                    code: 'VCAC-201-ODC-003',
                    name: 'Programa de Apoyo Emocional',
                    description: 'Establece los lineamientos básicos para el abordaje, seguimiento y referimiento de los casos que lo requieran.',
                    href: null
                },
                {
                    code: 'VCAC-201-ODC-004',
                    name: 'Programa de Formación Estudiantil Vida Integral',
                    description: 'De carácter preventivo, su naturaleza formativa se centra en la sensibilización y la capacitación.',
                    href: null
                },
                {
                    code: 'VCAC-201-ODC-005',
                    name: 'Programa de Orientación Vocacional',
                    description: 'Aplica pruebas y realiza entrevistas de exploración y orientación.',
                    href: null
                },
                {
                    code: 'VCAC-201-ODC-006',
                    name: 'Programa Incluyo',
                    description: 'Plan de acción y de atención a la diversidad en la UNPHU, por el que se garantiza la igualdad de oportunidades y se favorecen al máximo los accesos para el ingreso, la permanencia y el egreso del estudiante.',
                    href: null
                },
                {
                    code: 'VAC-201-ODC-007',
                    name: 'Tiempos de respuesta de los servicios ofertados en Bienestar',
                    description: 'Indica los tiempos de los diferentes servicios que se ofrecen en las unidades y áreas de Bienestar Estudiantil.',
                    href: null
                },
                {
                    code: 'VCAC-201-ODC-008',
                    name: 'Plan de Acción Tutorial',
                    description: 'Conjunto de acciones de información, orientación y soporte al estudiante a lo largo de sus estudios, que robustece su formación en diferentes momentos de su vida académica.',
                    href: null
                },
                {
                    code: 'VCAC-201-ODC-009',
                    name: 'Protocolo de Primeros Auxilios Psicológicos',
                    description: 'Lineamientos para atender situaciones en las que un estudiante presente una emergencia en materia de salud mental.',
                    href: null
                }
            ]
        },

        /* ---------- 7. Derechos y deberes de los estudiantes ---------- */
        rights: {
            eyebrow: 'Derechos y deberes',
            title: 'Normativas que te amparan',
            paragraphs: [
                'Como parte del acompañamiento, orientación y respaldo al desarrollo holístico del estudiantado, colaboramos estrechamente con las normativas institucionales pertinentes. Dichas disposiciones definen los derechos y deberes que corresponden a cada alumno, y fijan los criterios de conducta, los trámites aplicables y las exigencias requeridas para asegurar un rendimiento óptimo y una graduación efectiva.',
                'Promovemos la divulgación y consulta de la siguiente documentación institucional:'
            ],
            items: [
                {
                    code: 'VAC-200-REG-002',
                    name: 'Reglamento del Régimen Estudiantil',
                    href: null
                },
                {
                    code: 'VAC-200-REG-005',
                    name: 'Reglamento de Evaluación de los Aprendizajes',
                    href: null
                }
            ]
        },

        /* ---------- 8. Agrupaciones estudiantiles ---------- */
        groups: {
            eyebrow: 'Participación',
            title: 'Agrupaciones estudiantiles',
            paragraphs: [
                'El decanato apoya la participación de los estudiantes en la vida universitaria a través de su integración en las diferentes modalidades de agrupaciones estudiantiles de las que forman parte los estudiantes de la Universidad Nacional Pedro Henríquez Ureña.',
                'Estas agrupaciones poseen distinta naturaleza, lo que amplía el abanico de opciones de participación que pueden alcanzar los estudiantes en el transcurso de su vida académica en la institución.'
            ],
            /* El listado de agrupaciones activas no fue suministrado. */
            list: null,
            contact: { label: 'Escribir al decanato', href: 'mailto:' + EMAIL }
        },

        /* ---------- 9. Preguntas frecuentes ---------- */
        faq: {
            eyebrow: 'Dudas frecuentes',
            title: 'Preguntas frecuentes',
            items: [
                {
                    id: 'faq-01',
                    question: '¿Me van a sacar de la universidad?',
                    answer: 'No. Te acompañaremos para que juntos podamos realizar un plan con el que superes tu condición académica, de manera que puedas dar respuesta a los reglamentos y estatutos y alcanzar tu meta académica.'
                },
                {
                    id: 'faq-02',
                    question: '¿Puedo inscribir la cantidad de materias que yo quiera?',
                    answer: 'No. Lo ideal es que curses una carga académica que dé respuesta satisfactoria a tu condición.'
                },
                {
                    id: 'faq-03',
                    question: '¿Para subir el índice debo repetir las asignaturas?',
                    answer: 'Sí. Reemplazar una calificación en literal C por una nota alta, A o B, es la forma más rápida y efectiva de elevar tu índice académico acumulado. Deben ser asignaturas de carrera: mientras más alto es el valor en créditos, mayor es el efecto sobre el índice.'
                }
            ],
            note: {
                text: 'Si tu pregunta no aparece aquí, escríbenos o acércate al decanato.',
                link: { label: EMAIL, href: 'mailto:' + EMAIL }
            }
        },

        /* ---------- 10. Contacto ---------- */
        contact: {
            eyebrow: 'Contacto',
            title: 'Decanato de Bienestar Estudiantil',
            items: [
                {
                    id: 'ubicacion',
                    icon: 'location_on',
                    label: 'Ubicación',
                    value: 'Edificio 8, primera planta, contiguo a Registro',
                    href: null
                },
                {
                    id: 'horario',
                    icon: 'schedule',
                    label: 'Horario',
                    value: 'Lunes a viernes, 8:00 a. m. a 5:00 p. m.',
                    href: null
                },
                {
                    id: 'telefono',
                    icon: 'call',
                    label: 'Teléfono',
                    value: PHONE + ', ext. 1122 y 1123',
                    href: PHONE_HREF
                },
                {
                    id: 'correo',
                    icon: 'mail',
                    label: 'Correo',
                    value: EMAIL,
                    href: 'mailto:' + EMAIL
                },
                {
                    id: 'orientacion',
                    icon: 'psychology',
                    label: 'Unidad de Orientación y Vida Estudiantil',
                    value: 'orientacion@unphu.edu.do · ext. 1119',
                    href: 'mailto:orientacion@unphu.edu.do'
                },
                {
                    id: 'upa',
                    icon: 'school',
                    label: 'Unidad de Progreso Académico',
                    value: 'upa@unphu.edu.do · ext. 2820',
                    href: 'mailto:upa@unphu.edu.do'
                },
                {
                    id: 'direccion',
                    icon: 'map',
                    label: 'Dirección',
                    value: 'Av. John F. Kennedy Km 7 ½, Santo Domingo, República Dominicana',
                    href: null
                }
            ],
            cta: {
                title: 'Da el primer paso',
                text: 'La solicitud la haces tú; no requiere autorización de tu escuela ni de ninguna otra instancia.',
                actions: [
                    { id: 'cita', label: 'Solicitar una cita', href: 'solicitar-cita.html', variant: 'light' },
                    { id: 'referir', label: 'Referir a un estudiante', href: 'referir-estudiante.html', variant: 'ghost' }
                ]
            },
            /* Única entrada al panel interno desde la parte pública. */
            staffLink: { label: 'Acceso del personal', href: 'acceso-personal.html' }
        }
    };
})();
