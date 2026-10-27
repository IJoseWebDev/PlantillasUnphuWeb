/**
 * ÚNETE A UNPHU — CONTENIDO EDITABLE
 *
 * Única fuente de textos de vacantes, áreas y listas del formulario.
 * Preparado para sustituirse por la respuesta del CMS / Firebase.
 * Los campos de vacante que Gestión Humana aún no envió quedan vacíos:
 * la interfaz muestra «Contenido pendiente de proporcionar» y no inventa
 * requisitos, modalidad ni salario del puesto.
 */
(function () {
    'use strict';

    var PENDING = 'Contenido pendiente de proporcionar';

    window.UNETE_CONTENT = {
        pending: PENDING,

        marca: {
            nombre: 'Únete a UNPHU',
            unidad: 'Dirección de Gestión Humana',
            frase: 'Construye tu futuro. Sé parte de UNPHU.',
            cierre: 'Tu talento. Nuestro propósito. Juntos construimos el futuro.'
        },

        intro: [
            'En la Universidad Nacional Pedro Henríquez Ureña (UNPHU) creemos que nuestro talento humano es uno de los pilares fundamentales para el cumplimiento de nuestra misión y el desarrollo de nuestra comunidad universitaria.',
            'En este espacio encontrarás las oportunidades laborales disponibles en UNPHU, tanto para posiciones administrativas como docentes, así como información sobre las áreas en las que puedes desarrollar tus conocimientos, competencias y experiencia profesional.',
            'Buscamos personas comprometidas, íntegras, innovadoras y orientadas a la excelencia, que deseen aportar sus talentos y crecer junto a una institución comprometida con la educación, la innovación y la formación de profesionales que contribuyan al desarrollo de la sociedad.',
            'Explora nuestras oportunidades y encuentra el espacio donde tu talento puede hacer la diferencia.'
        ],

        /* Palabras tomadas del texto institucional. No describen prestaciones. */
        valores: [
            { palabra: 'Comprometidas', detalle: 'Con la educación y con la comunidad universitaria.' },
            { palabra: 'Íntegras', detalle: 'Personas que cuidan la confianza que la institución les entrega.' },
            { palabra: 'Innovadoras', detalle: 'Dispuestas a aportar ideas y a asumir retos nuevos.' },
            { palabra: 'Excelencia', detalle: 'Orientadas a formar profesionales que contribuyan a la sociedad.' }
        ],

        /*
         * Lista única para la portada y para los dos formularios.
         * Une las áreas del brief con las del banco de talento, sin repetir.
         */
        areas: [
            { value: 'gestion-humana', label: 'Gestión Humana' },
            { value: 'administracion', label: 'Administración y Gestión' },
            { value: 'servicios-generales', label: 'Servicios Generales' },
            { value: 'atencion-usuario', label: 'Atención al usuario y servicio al cliente' },
            { value: 'tecnologia', label: 'Tecnología y Sistemas' },
            { value: 'finanzas', label: 'Finanzas, Contabilidad y Auditoría' },
            { value: 'mercadeo', label: 'Mercadeo y Comunicaciones' },
            { value: 'investigacion', label: 'Investigación' },
            { value: 'vinculacion', label: 'Vinculación e Internacionalización' },
            { value: 'docencia-universitaria', label: 'Académica / Docencia universitaria' },
            { value: 'docencia-colegio', label: 'Docencia Colegio UNPHU' },
            { value: 'otra', label: 'Otra' }
        ],

        tiposVacante: [
            { value: 'administrativa', label: 'Administrativa' },
            { value: 'docente', label: 'Docente' },
            { value: 'academica', label: 'Académica' },
            { value: 'tecnica', label: 'Técnica' },
            { value: 'otra', label: 'Otra' }
        ],

        nivelesPosicion: [
            { value: 'asistencial', label: 'Recepcionista / Asistente / Secretaria / Auxiliar' },
            { value: 'analista', label: 'Analista' },
            { value: 'coordinador', label: 'Coordinador (a)' },
            { value: 'supervisor', label: 'Supervisor' },
            { value: 'director', label: 'Director / Gerente' },
            { value: 'decano', label: 'Decano / Vicerrector' },
            { value: 'docente-unphu', label: 'Docente UNPHU' },
            { value: 'docente-colegio', label: 'Docente Colegio UNPHU' }
        ],

        /*
         * Escala única: cubre al estudiante en curso y los grados del banco
         * de talento. «Universitario graduado» queda cubierto por licenciatura.
         */
        nivelesAcademicos: [
            { value: 'bachiller', label: 'Bachiller' },
            { value: 'tecnico', label: 'Técnico' },
            { value: 'estudiante', label: 'Estudiante universitario' },
            { value: 'licenciatura', label: 'Licenciatura / Ingeniería' },
            { value: 'especialidad', label: 'Especialidad' },
            { value: 'maestria', label: 'Maestría' },
            { value: 'doctorado', label: 'Doctorado' }
        ],

        tiemposExperiencia: [
            { value: 'sin-experiencia', label: 'Sin experiencia' },
            { value: 'menos-1', label: 'Menos de 1 año' },
            { value: '1-2', label: '1–2 años' },
            { value: '3-5', label: '3–5 años' },
            { value: '6-10', label: '6–10 años' },
            { value: 'mas-10', label: 'Más de 10 años' }
        ],

        disponibilidad: [
            { value: 'inmediata', label: 'Inmediata' },
            { value: 'entrevista', label: 'A determinar en entrevista' }
        ],

        /* Rangos mensuales en pesos dominicanos. Propuesta de trabajo, ajustable. */
        salarios: [
            { value: 'menos-25', label: 'Menos de RD$ 25,000' },
            { value: '25-40', label: 'RD$ 25,000 a RD$ 40,000' },
            { value: '40-60', label: 'RD$ 40,000 a RD$ 60,000' },
            { value: '60-90', label: 'RD$ 60,000 a RD$ 90,000' },
            { value: '90-130', label: 'RD$ 90,000 a RD$ 130,000' },
            { value: '130-180', label: 'RD$ 130,000 a RD$ 180,000' },
            { value: 'mas-180', label: 'Más de RD$ 180,000' },
            { value: 'entrevista', label: 'Prefiero indicarlo en la entrevista' }
        ],

        proceso: {
            aplicar: {
                titulo: 'Aplicar a un puesto',
                texto: 'Cuando hay una vacante abierta y quieres ser considerado para esa posición.',
                pasos: [
                    'Revisa las vacantes activas y abre la ficha del puesto.',
                    'Completa la postulación con tus datos, formación, experiencia y disponibilidad.',
                    'Indica si tienes familiares en la UNPHU y tu aspiración salarial por rango.',
                    'Adjunta tu currículum en PDF (máximo 10 MB) y, si quieres, tu LinkedIn o portafolio.',
                    'Acepta la política de privacidad. La postulación queda clasificada con el puesto y tu nombre.'
                ]
            },
            banco: {
                titulo: 'Darte a conocer',
                texto: 'El Banco de Talento guarda tu perfil para oportunidades futuras, sin ligarlo a una vacante.',
                pasos: [
                    'Entra al Banco de Talento UNPHU.',
                    'Elige el área, el tipo de vacante y el nivel de posición que te interesa.',
                    'Cuéntanos tu formación, tu experiencia y tu disponibilidad.',
                    'Adjunta tu currículum en PDF y acepta el tratamiento de tus datos.',
                    'Tu perfil queda clasificado por el área de interés y tu nombre.'
                ]
            }
        },

        /*
         * Piloto. Solo se publica el título recibido.
         * «Coordinador Financiero AID» corrige la errata «Financiarl» del
         * material original; el nombre oficial sigue pendiente de confirmar.
         */
        vacantes: [
            {
                id: 'director-de-vinculacion',
                titulo: 'Director de Vinculación',
                estado: 'Activa',
                area: '',
                tipoContratacion: '',
                modalidad: '',
                responsabilidades: [],
                requisitos: [],
                perfil: ''
            },
            {
                id: 'coordinador-financiero-aid',
                titulo: 'Coordinador Financiero AID',
                estado: 'Activa',
                area: '',
                tipoContratacion: '',
                modalidad: '',
                responsabilidades: [],
                requisitos: [],
                perfil: ''
            },
            {
                id: 'contadora',
                titulo: 'Contadora',
                estado: 'Activa',
                area: '',
                tipoContratacion: '',
                modalidad: '',
                responsabilidades: [],
                requisitos: [],
                perfil: ''
            },
            {
                id: 'analista-de-planeacion-financiera',
                titulo: 'Analista de Planeación Financiera',
                estado: 'Activa',
                area: '',
                tipoContratacion: '',
                modalidad: '',
                responsabilidades: [],
                requisitos: [],
                perfil: ''
            }
        ]
    };
})();
