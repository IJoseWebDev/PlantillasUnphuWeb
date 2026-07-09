/**
 * Bolsa de Empleo — Módulo de datos y renderizado
 *
 * ARQUITECTURA PARA NEXT.JS:
 * - Cada función render*() → componente React equivalente
 * - MOCK_VACANTES → reemplazar por fetch de Firebase
 * - initListPage() / initDetailPage() → page components con useEffect
 * - Campos alineados 1:1 con el Dashboard (sin propiedades inventadas)
 */
(function () {
    'use strict';

    /* ================================================================
       SCHEMA — Campos del Dashboard (referencia para integración)
       ================================================================ */
    var VACANCY_FIELDS = {
        identificacion: 'string',
        titulo: 'string',
        empresa: 'string',
        configuracion: 'object|string',
        estado: 'string',
        modalidad: 'string',
        tipoEmpleo: 'string',
        etiquetas: 'string[]',
        descripcion: 'string',
        objetivo: 'string',
        responsabilidades: 'string[]',
        perfilCandidato: 'string',
        estadoAcademico: 'string',
        carrerasElegibles: 'string[]',
        institucionElegible: 'string',
        ubicacion: {
            ciudad: 'string',
            sector: 'string',
            provincia: 'string',
            pais: 'string',
            ubicacionLibre: 'string'
        },
        aplicacion: {
            correo: 'string',
            asunto: 'string',
            instrucciones: 'string'
        },
        requisitos: {
            experienciaMinima: 'number',
            experienciaMaxima: 'number',
            descripcionExperiencia: 'string',
            habilidades: 'string[]',
            herramientas: 'string',
            licencias: 'string',
            requisitosAdicionales: 'string',
            idiomas: 'Array<{ nombre: string, nivel: string }>'
        },
        compensacion: {
            moneda: 'string',
            periodo: 'string',
            salarioMinimo: 'number',
            salarioMaximo: 'number',
            salarioDescriptivo: 'string'
        }
    };

    /* ===================
       DATOS DE EJEMPLO 
       =================== */
    var MOCK_VACANTES = [
        {
            identificacion: 'VAC-2024-CYBER-01',
            titulo: 'Analista Senior de Ciberseguridad',
            empresa: 'Banco Popular Dominicano',
            configuracion: {},
            estado: 'Activa',
            modalidad: 'Híbrido',
            tipoEmpleo: 'Tiempo completo',
            etiquetas: ['Ciberseguridad', 'Finanzas', 'Senior'],
            descripcion: 'Oportunidad para profesionales apasionados por la protección de activos digitales en el sector financiero dominicano.',
            objetivo: 'Fortalecer la postura de seguridad informática de la institución mediante la identificación proactiva de vulnerabilidades, la implementación de controles de seguridad y la respuesta efectiva ante incidentes cibernéticos.',
            responsabilidades: [
                'Diseñar e implementar políticas y procedimientos de seguridad de la información alineados con estándares internacionales (ISO 27001, NIST).',
                'Realizar evaluaciones de vulnerabilidades y pruebas de penetración en infraestructura crítica.',
                'Monitorear y analizar eventos de seguridad en el SOC (Security Operations Center).',
                'Coordinar la respuesta a incidentes de seguridad y elaborar reportes ejecutivos.',
                'Capacitar al personal en buenas prácticas de ciberseguridad y concienciación digital.',
                'Evaluar y recomendar soluciones de seguridad (SIEM, EDR, WAF, IAM).',
                'Gestionar relaciones con proveedores de servicios de ciberseguridad y auditorías externas.'
            ],
            perfilCandidato: 'Profesional con sólida formación en seguridad informática, experiencia demostrable en entornos corporativos de alta criticidad y capacidad de liderazgo técnico.',
            estadoAcademico: 'Graduado o en Término',
            carrerasElegibles: ['Ingeniería de Sistemas', 'Ingeniería Informática', 'Ciberseguridad', 'Redes y Telecomunicaciones'],
            institucionElegible: 'Egresados UNPHU Priorizados',
            ubicacion: {
                ciudad: 'Santo Domingo',
                sector: 'Ensanche Paraíso',
                provincia: 'Distrito Nacional',
                pais: 'República Dominicana',
                ubicacionLibre: ''
            },
            aplicacion: {
                correo: 'bolsadetrabajo@unphu.edu.do',
                asunto: 'Aplicación — Analista Senior de Ciberseguridad [VAC-2024-CYBER-01]',
                instrucciones: 'Envía tu CV actualizado, certificaciones vigentes (CISSP, CEH, CompTIA Security+ o equivalentes) y una carta de motivación a nuestro departamento de gestión humana.'
            },
            requisitos: {
                experienciaMinima: 5,
                experienciaMaxima: 8,
                descripcionExperiencia: 'Experiencia comprobable en roles de ciberseguridad en sector bancario o financiero, con manejo de frameworks de compliance.',
                habilidades: ['Análisis de Vulnerabilidades', 'SIEM/SOC', 'Pentesting', 'ISO 27001', 'Respuesta a Incidentes', 'Cloud Security'],
                herramientas: 'Dominio de herramientas como Splunk, Nessus, Wireshark, Metasploit y plataformas cloud (AWS/Azure security).',
                licencias: 'Certificaciones CISSP, CEH o CompTIA Security+ preferidas.',
                requisitosAdicionales: 'Disponibilidad para guardias rotativas en el SOC y viajes ocasionales a sucursales regionales.',
                idiomas: [
                    { nombre: 'Español', nivel: 'Nativo' },
                    { nombre: 'Inglés', nivel: 'Avanzado (B2+)' }
                ]
            },
            compensacion: {
                moneda: 'Pesos Dominicanos',
                periodo: 'Mensual',
                salarioMinimo: 85000,
                salarioMaximo: 120000,
                salarioDescriptivo: 'RD$ 85,000+'
            }
        },
        {
            identificacion: 'VAC-2024-DATA-02',
            titulo: 'Analista Senior de Datos',
            empresa: 'Banco de Reservas de la R.D.',
            configuracion: {},
            estado: 'Activa',
            modalidad: 'Híbrido',
            tipoEmpleo: 'Tiempo completo',
            etiquetas: ['Data Analytics', 'Finanzas', 'Senior', 'Machine Learning'],
            descripcion: 'Únete al equipo de transformación digital del banco líder en innovación financiera de la República Dominicana.',
            objetivo: 'Impulsar la toma de decisiones basada en datos mediante el diseño, desarrollo y mantenimiento de pipelines de datos, modelos analíticos y dashboards ejecutivos que optimicen la operación del banco.',
            responsabilidades: [
                'Diseñar y mantener pipelines ETL/ELT para la ingesta y transformación de datos de múltiples fuentes.',
                'Desarrollar modelos predictivos y de machine learning para scoring crediticio y detección de fraude.',
                'Crear dashboards interactivos en Power BI y Tableau para equipos directivos.',
                'Colaborar con equipos de TI en la arquitectura de data lake y data warehouse.',
                'Documentar procesos analíticos y garantizar la calidad e integridad de los datos.',
                'Presentar insights y recomendaciones a stakeholders de negocio de forma clara y accionable.'
            ],
            perfilCandidato: 'Analista de datos con mentalidad analítica, capacidad de traducir datos complejos en insights de negocio y experiencia en entornos regulados.',
            estadoAcademico: 'Graduado o en Término',
            carrerasElegibles: ['Ingeniería de Sistemas', 'Matemáticas', 'Economía', 'Estadística', 'Ingeniería Industrial'],
            institucionElegible: 'Egresados UNPHU Priorizados',
            ubicacion: {
                ciudad: 'Santo Domingo',
                sector: '',
                provincia: 'Distrito Nacional',
                pais: 'República Dominicana',
                ubicacionLibre: 'Santo Domingo, D.N. (Híbrido)'
            },
            aplicacion: {
                correo: 'bolsadetrabajo@unphu.edu.do',
                asunto: 'Aplicación — Analista Senior de Datos [VAC-2024-DATA-02]',
                instrucciones: 'Envía tu CV actualizado y portafolio de proyectos (si aplica) a nuestro departamento de gestión humana.'
            },
            requisitos: {
                experienciaMinima: 3,
                experienciaMaxima: 5,
                descripcionExperiencia: 'Experiencia en análisis de datos en sector financiero o consultoría, con proyectos de ML implementados en producción.',
                habilidades: ['Python / R', 'SQL Avanzado', 'ETL Tools', 'Machine Learning', 'Pandas / NumPy', 'Power BI', 'Tableau'],
                herramientas: 'Dominio experto de Microsoft Excel (VBA), Azure Data Factory y herramientas de control de versiones como Git.',
                licencias: '',
                requisitosAdicionales: 'Experiencia con regulaciones financieras locales (SB) es un plus.',
                idiomas: [
                    { nombre: 'Español', nivel: 'Nativo' },
                    { nombre: 'Inglés', nivel: 'Avanzado (B2+)' }
                ]
            },
            compensacion: {
                moneda: 'Pesos Dominicanos',
                periodo: 'Mensual',
                salarioMinimo: 85000,
                salarioMaximo: 110000,
                salarioDescriptivo: 'RD$ 85,000 - 110,000'
            }
        },
        {
            identificacion: 'VAC-2024-ARCH-03',
            titulo: 'Arquitecto Junior de Software',
            empresa: 'Grupo SID',
            configuracion: {},
            estado: 'Activa',
            modalidad: 'Presencial',
            tipoEmpleo: 'Tiempo completo',
            etiquetas: ['Desarrollo', 'Junior', 'Microservicios'],
            descripcion: '',
            objetivo: 'Contribuir al diseño e implementación de soluciones de software escalables para el ecosistema digital del grupo.',
            responsabilidades: [
                'Participar en el diseño de arquitecturas de microservicios.',
                'Desarrollar APIs RESTful y GraphQL siguiendo estándares del equipo.',
                'Colaborar en code reviews y documentación técnica.'
            ],
            perfilCandidato: 'Desarrollador junior con interés en arquitectura de software y buenas prácticas.',
            estadoAcademico: 'Graduado reciente o en último cuatrimestre',
            carrerasElegibles: ['Ingeniería de Sistemas', 'Ingeniería de Software'],
            institucionElegible: 'Cualquier universidad acreditada',
            ubicacion: {
                ciudad: 'Santo Domingo',
                sector: 'Piantini',
                provincia: 'Distrito Nacional',
                pais: 'República Dominicana',
                ubicacionLibre: ''
            },
            aplicacion: {
                correo: 'bolsadetrabajo@unphu.edu.do',
                asunto: 'Aplicación — Arquitecto Junior [VAC-2024-ARCH-03]',
                instrucciones: 'Incluye enlace a tu repositorio de GitHub o portafolio.'
            },
            requisitos: {
                experienciaMinima: 1,
                experienciaMaxima: 2,
                descripcionExperiencia: 'Experiencia en desarrollo web con al menos un proyecto desplegado en producción.',
                habilidades: ['Node.js', 'TypeScript', 'Docker', 'PostgreSQL'],
                herramientas: 'Git, VS Code, Postman.',
                licencias: '',
                requisitosAdicionales: '',
                idiomas: [
                    { nombre: 'Español', nivel: 'Nativo' },
                    { nombre: 'Inglés', nivel: 'Intermedio (B1)' }
                ]
            },
            compensacion: {
                moneda: 'Pesos Dominicanos',
                periodo: 'Mensual',
                salarioMinimo: 45000,
                salarioMaximo: 60000,
                salarioDescriptivo: ''
            }
        },
        {
            identificacion: 'VAC-2024-MKT-04',
            titulo: 'Especialista en Marketing Digital y Contenido Estratégico para Redes Sociales',
            empresa: 'Agencia Creativa RD',
            configuracion: {},
            estado: 'Activa',
            modalidad: 'Remoto',
            tipoEmpleo: 'Tiempo completo',
            etiquetas: ['Marketing', 'Redes Sociales', 'Contenido', 'Remoto'],
            descripcion: 'Buscamos un creativo estratégico para liderar la presencia digital de marcas líderes en el mercado dominicano e internacional.',
            objetivo: 'Desarrollar e implementar estrategias de marketing digital integradas que incrementen el engagement, la conversión y el posicionamiento de marca de nuestros clientes.',
            responsabilidades: [
                'Planificar calendarios editoriales multicanal (Instagram, LinkedIn, TikTok, YouTube).',
                'Crear y supervisar contenido visual y escrito alineado con la identidad de cada marca.',
                'Analizar métricas de rendimiento y optimizar campañas en Meta Ads y Google Ads.',
                'Coordinar con diseñadores, videógrafos y copywriters externos.',
                'Presentar reportes mensuales de KPIs a clientes con recomendaciones accionables.'
            ],
            perfilCandidato: 'Profesional creativo con experiencia demostrable en gestión de redes sociales para marcas de mediano y gran tamaño.',
            estadoAcademico: 'Graduado',
            carrerasElegibles: ['Mercadeo', 'Comunicación Social', 'Publicidad', 'Administración de Empresas'],
            institucionElegible: 'Cualquier universidad acreditada',
            ubicacion: {
                ciudad: '',
                sector: '',
                provincia: '',
                pais: 'República Dominicana',
                ubicacionLibre: '100% Remoto — Disponible en todo el territorio nacional'
            },
            aplicacion: {
                correo: 'bolsadetrabajo@unphu.edu.do',
                asunto: 'Aplicación — Marketing Digital [VAC-2024-MKT-04]',
                instrucciones: 'Adjunta portfolio con casos de éxito y métricas alcanzadas.'
            },
            requisitos: {
                experienciaMinima: 2,
                experienciaMaxima: 4,
                descripcionExperiencia: 'Experiencia gestionando cuentas con más de 50K seguidores.',
                habilidades: ['Meta Ads', 'Google Analytics', 'Copywriting', 'Canva', 'Community Management', 'SEO Básico'],
                herramientas: 'Hootsuite, Buffer, Google Ads, Meta Business Suite.',
                licencias: '',
                requisitosAdicionales: 'Disponibilidad para reuniones con clientes en horario flexible.',
                idiomas: [
                    { nombre: 'Español', nivel: 'Nativo' },
                    { nombre: 'Inglés', nivel: 'Intermedio (B1)' }
                ]
            },
            compensacion: {
                moneda: 'Pesos Dominicanos',
                periodo: 'Mensual',
                salarioMinimo: 55000,
                salarioMaximo: 75000,
                salarioDescriptivo: 'RD$ 55,000 - 75,000'
            }
        },
        {
            identificacion: 'VAC-2024-ENF-05',
            titulo: 'Enfermera/o Clínica',
            empresa: 'Centro Médico UNPHU',
            configuracion: {},
            estado: 'Activa',
            modalidad: 'Presencial',
            tipoEmpleo: 'Tiempo completo',
            etiquetas: ['Salud', 'Enfermería', 'Clínica'],
            descripcion: '',
            objetivo: 'Brindar atención de enfermería de excelencia en el centro médico universitario.',
            responsabilidades: [
                'Administrar medicamentos y tratamientos según prescripción médica.',
                'Monitorear signos vitales y registrar evolución del paciente.',
                'Colaborar con el equipo multidisciplinario de salud.'
            ],
            perfilCandidato: 'Profesional de enfermería con vocación de servicio y experiencia clínica.',
            estadoAcademico: 'Graduado',
            carrerasElegibles: ['Enfermería'],
            institucionElegible: 'Egresados UNPHU Priorizados',
            ubicacion: {
                ciudad: 'Santo Domingo',
                sector: 'Los Prados',
                provincia: 'Distrito Nacional',
                pais: 'República Dominicana',
                ubicacionLibre: ''
            },
            aplicacion: {
                correo: 'bolsadetrabajo@unphu.edu.do',
                asunto: 'Aplicación — Enfermera/o Clínica [VAC-2024-ENF-05]',
                instrucciones: 'Incluir copia de título, exequátur y certificaciones vigentes.'
            },
            requisitos: {
                experienciaMinima: 1,
                experienciaMaxima: 3,
                descripcionExperiencia: 'Experiencia en hospitalización o urgencias.',
                habilidades: ['Atención al Paciente', 'Administración de Medicamentos', 'RCP'],
                herramientas: '',
                licencias: 'Exequátur vigente obligatorio.',
                requisitosAdicionales: 'Disponibilidad para turnos rotativos.',
                idiomas: [
                    { nombre: 'Español', nivel: 'Nativo' }
                ]
            },
            compensacion: {
                moneda: 'Pesos Dominicanos',
                periodo: 'Mensual',
                salarioMinimo: 40000,
                salarioMaximo: 55000,
                salarioDescriptivo: ''
            }
        },
        {
            identificacion: 'VAC-2024-PAS-06',
            titulo: 'Pasante de Recursos Humanos',
            empresa: 'Grupo Corripio',
            configuracion: {},
            estado: 'Activa',
            modalidad: 'Híbrido',
            tipoEmpleo: 'Pasantía',
            etiquetas: ['RRHH', 'Pasantía', 'Administración'],
            descripcion: 'Programa de pasantía para estudiantes que deseen desarrollarse en gestión de talento humano.',
            objetivo: 'Apoyar al departamento de RRHH en procesos de reclutamiento, selección, onboarding y gestión documental.',
            responsabilidades: [
                'Apoyar en la publicación y seguimiento de vacantes.',
                'Participar en entrevistas de preselección.',
                'Actualizar bases de datos de candidatos.',
                'Colaborar en actividades de onboarding y clima organizacional.'
            ],
            perfilCandidato: 'Estudiante universitario motivado con interés en gestión de personas.',
            estadoAcademico: 'Estudiante activo — mínimo 70% de la carrera completada',
            carrerasElegibles: ['Psicología', 'Administración de Empresas', 'Recursos Humanos', 'Mercadeo'],
            institucionElegible: 'Estudiantes UNPHU',
            ubicacion: {
                ciudad: 'Santo Domingo',
                sector: 'Naco',
                provincia: 'Distrito Nacional',
                pais: 'República Dominicana',
                ubicacionLibre: ''
            },
            aplicacion: {
                correo: 'bolsadetrabajo@unphu.edu.do',
                asunto: 'Aplicación — Pasante RRHH [VAC-2024-PAS-06]',
                instrucciones: 'Incluir constancia de estudios y carta de la universidad.'
            },
            requisitos: {
                experienciaMinima: 0,
                experienciaMaxima: 0,
                descripcionExperiencia: 'No se requiere experiencia previa. Se valorará participación en actividades extracurriculares.',
                habilidades: ['Comunicación', 'Organización', 'Microsoft Office'],
                herramientas: 'Excel, Word, PowerPoint.',
                licencias: '',
                requisitosAdicionales: 'Disponibilidad mínima de 20 horas semanales.',
                idiomas: [
                    { nombre: 'Español', nivel: 'Nativo' },
                    { nombre: 'Inglés', nivel: 'Básico (A2)' }
                ]
            },
            compensacion: {
                moneda: 'Pesos Dominicanos',
                periodo: 'Mensual',
                salarioMinimo: 15000,
                salarioMaximo: 20000,
                salarioDescriptivo: 'RD$ 15,000 - 20,000 (subsidio de pasantía)'
            }
        },
        {
            identificacion: 'VAC-2024-CONT-07',
            titulo: 'Contador Público Autorizado',
            empresa: 'Pérez y Asociados SRL',
            configuracion: {},
            estado: 'Activa',
            modalidad: 'Presencial',
            tipoEmpleo: 'Tiempo completo',
            etiquetas: ['Contabilidad', 'Auditoría', 'CPA'],
            descripcion: '',
            objetivo: 'Liderar procesos contables y de auditoría para cartera de clientes corporativos.',
            responsabilidades: [
                'Preparar estados financieros bajo NIIF.',
                'Realizar auditorías internas y externas.',
                'Asesorar a clientes en cumplimiento fiscal (DGII).'
            ],
            perfilCandidato: 'CPA con experiencia en firma de auditoría o departamento contable corporativo.',
            estadoAcademico: 'Graduado',
            carrerasElegibles: ['Contabilidad', 'Administración de Empresas'],
            institucionElegible: 'Cualquier universidad acreditada',
            ubicacion: {
                ciudad: 'Santiago',
                sector: 'Centro',
                provincia: 'Santiago',
                pais: 'República Dominicana',
                ubicacionLibre: ''
            },
            aplicacion: {
                correo: 'bolsadetrabajo@unphu.edu.do',
                asunto: 'Aplicación — CPA [VAC-2024-CONT-07]',
                instrucciones: 'Incluir número de colegiatura y referencias profesionales.'
            },
            requisitos: {
                experienciaMinima: 3,
                experienciaMaxima: 7,
                descripcionExperiencia: 'Experiencia en auditoría externa o contabilidad corporativa.',
                habilidades: ['NIIF', 'Auditoría', 'Impuestos DGII', 'SAP FI'],
                herramientas: 'SAP, Excel avanzado, software contable local.',
                licencias: 'CPA colegiado activo.',
                requisitosAdicionales: '',
                idiomas: [
                    { nombre: 'Español', nivel: 'Nativo' },
                    { nombre: 'Inglés', nivel: 'Intermedio (B1)' }
                ]
            },
            compensacion: {
                moneda: 'Pesos Dominicanos',
                periodo: 'Mensual',
                salarioMinimo: 70000,
                salarioMaximo: 95000,
                salarioDescriptivo: 'RD$ 70,000 - 95,000'
            }
        },
        {
            identificacion: 'VAC-2024-DEV-08',
            titulo: 'Desarrollador Full Stack',
            empresa: 'TechStart RD',
            configuracion: {},
            estado: 'Activa',
            modalidad: 'Remoto',
            tipoEmpleo: 'Tiempo completo',
            etiquetas: ['Desarrollo', 'Full Stack', 'React', 'Node.js'],
            descripcion: 'Startup en crecimiento busca desarrollador versátil para producto SaaS B2B.',
            objetivo: 'Desarrollar y mantener features del producto principal usando React y Node.js.',
            responsabilidades: [
                'Implementar interfaces de usuario responsivas con React/Next.js.',
                'Desarrollar APIs y microservicios con Node.js.',
                'Escribir tests unitarios e integración.',
                'Participar en ceremonias ágiles (daily, sprint planning, retrospectiva).'
            ],
            perfilCandidato: 'Desarrollador full stack con experiencia en startups o productos digitales.',
            estadoAcademico: 'Graduado o en Término',
            carrerasElegibles: ['Ingeniería de Sistemas', 'Ingeniería de Software', 'Computación'],
            institucionElegible: 'Cualquier universidad acreditada',
            ubicacion: {
                ciudad: '',
                sector: '',
                provincia: '',
                pais: '',
                ubicacionLibre: 'Remoto — LATAM'
            },
            aplicacion: {
                correo: 'bolsadetrabajo@unphu.edu.do',
                asunto: 'Aplicación — Full Stack [VAC-2024-DEV-08]',
                instrucciones: 'Comparte tu GitHub y un proyecto que consideres representativo.'
            },
            requisitos: {
                experienciaMinima: 2,
                experienciaMaxima: 4,
                descripcionExperiencia: 'Experiencia full stack con al menos 2 proyectos en producción.',
                habilidades: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker'],
                herramientas: 'Git, GitHub Actions, Vercel, AWS básico.',
                licencias: '',
                requisitosAdicionales: 'Horario flexible con overlap de 4h con EST.',
                idiomas: [
                    { nombre: 'Español', nivel: 'Nativo' },
                    { nombre: 'Inglés', nivel: 'Avanzado (B2+)' }
                ]
            },
            compensacion: {
                moneda: 'Pesos Dominicanos',
                periodo: 'Mensual',
                salarioMinimo: 60000,
                salarioMaximo: 90000,
                salarioDescriptivo: 'RD$ 60,000 - 90,000'
            }
        }
    ];

    /* ================================================================
       UTILIDADES — Funciones puras reutilizables
       ================================================================ */

    function escapeHtml(str) {
        if (!str) return '';
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function formatUbicacion(ubicacion) {
        if (!ubicacion) return '';
        if (ubicacion.ubicacionLibre) return ubicacion.ubicacionLibre;
        var parts = [ubicacion.sector, ubicacion.ciudad, ubicacion.provincia, ubicacion.pais]
            .filter(Boolean);
        return parts.join(', ');
    }

    function formatUbicacionConModalidad(ubicacion, modalidad) {
        var loc = formatUbicacion(ubicacion);
        if (!loc) return modalidad || '';
        if (!modalidad || loc.toLowerCase().indexOf(modalidad.toLowerCase()) !== -1) return loc;
        return loc + ' (' + modalidad + ')';
    }

    function formatSalario(compensacion) {
        if (!compensacion) return '';
        if (compensacion.salarioDescriptivo) return compensacion.salarioDescriptivo;
        var min = compensacion.salarioMinimo;
        var max = compensacion.salarioMaximo;
        if (min && max) {
            return 'RD$ ' + min.toLocaleString('es-DO') + ' - ' + max.toLocaleString('es-DO');
        }
        if (min) return 'RD$ ' + min.toLocaleString('es-DO') + '+';
        if (max) return 'Hasta RD$ ' + max.toLocaleString('es-DO');
        return '';
    }

    function formatExperiencia(requisitos) {
        if (!requisitos) return '';
        var min = requisitos.experienciaMinima;
        var max = requisitos.experienciaMaxima;
        if (min === 0 && max === 0) return 'Sin experiencia';
        if (min && max && min !== max) return min + '-' + max + ' años';
        if (min) return min + '+ años';
        if (max) return 'Hasta ' + max + ' años';
        if (requisitos.descripcionExperiencia) return requisitos.descripcionExperiencia;
        return '';
    }

    function getDetailUrl(identificacion) {
        return 'bolsa-de-empleo-detalle.html?id=' + encodeURIComponent(identificacion);
    }

    function getVacanteById(id) {
        return MOCK_VACANTES.find(function (v) {
            return v.identificacion === id;
        });
    }

    /* ================================================================
       COMPONENTES DE RENDERIZADO → React Components
       ================================================================ */

    /** @component JobCard */
    function renderJobCard(vacante) {
        var url = getDetailUrl(vacante.identificacion);
        var tags = (vacante.etiquetas || []).concat([vacante.modalidad, vacante.tipoEmpleo].filter(Boolean));
        var uniqueTags = tags.filter(function (t, i, arr) { return arr.indexOf(t) === i; });

        var tagsHtml = uniqueTags.map(function (tag) {
            return '<span class="job-card__tag">' + escapeHtml(tag) + '</span>';
        }).join('');

        return (
            '<article class="job-card" data-vacante-id="' + escapeHtml(vacante.identificacion) + '">' +
                '<div class="job-card__header">' +
                    '<div class="job-card__logo"><span class="material-symbols-outlined">business</span></div>' +
                    (vacante.estado ? '<span class="job-card__estado">' + escapeHtml(vacante.estado) + '</span>' : '') +
                '</div>' +
                '<h2 class="job-card__title">' + escapeHtml(vacante.titulo) + '</h2>' +
                '<p class="job-card__empresa">' + escapeHtml(vacante.empresa) + '</p>' +
                '<div class="job-card__tags">' + tagsHtml + '</div>' +
                '<div class="job-card__footer">' +
                    '<a href="' + url + '" class="job-card__cta">Ver detalles</a>' +
                '</div>' +
            '</article>'
        );
    }

    /** @component JobListingsGrid */
    function renderJobListingsGrid(vacantes) {
        if (!vacantes.length) {
            return (
                '<div class="job-empty-state">' +
                    '<span class="material-symbols-outlined">work_off</span>' +
                    '<p class="type-body-lg">No se encontraron vacantes con los filtros seleccionados.</p>' +
                '</div>'
            );
        }

        return vacantes.map(function (v) {
            return renderJobCard(v);
        }).join('');
    }

    /** @component Pagination */
    function renderPagination(currentPage, totalPages) {
        if (totalPages <= 1) return '';

        var html = '<nav class="job-pagination" aria-label="Paginación de vacantes">';

        html += '<button class="job-pagination__btn" data-page="prev"' +
            (currentPage <= 1 ? ' disabled' : '') +
            ' aria-label="Página anterior">' +
            '<span class="material-symbols-outlined">chevron_left</span></button>';

        var pages = buildPageNumbers(currentPage, totalPages);
        pages.forEach(function (p) {
            if (p === '...') {
                html += '<span class="job-pagination__ellipsis">…</span>';
            } else {
                html += '<button class="job-pagination__btn' +
                    (p === currentPage ? ' job-pagination__btn--active' : '') +
                    '" data-page="' + p + '">' + p + '</button>';
            }
        });

        html += '<button class="job-pagination__btn" data-page="next"' +
            (currentPage >= totalPages ? ' disabled' : '') +
            ' aria-label="Página siguiente">' +
            '<span class="material-symbols-outlined">chevron_right</span></button>';

        html += '</nav>';
        return html;
    }

    function buildPageNumbers(current, total) {
        if (total <= 7) {
            var all = [];
            for (var i = 1; i <= total; i++) all.push(i);
            return all;
        }
        var pages = [1];
        if (current > 3) pages.push('...');
        for (var j = Math.max(2, current - 1); j <= Math.min(total - 1, current + 1); j++) {
            pages.push(j);
        }
        if (current < total - 2) pages.push('...');
        pages.push(total);
        return pages;
    }

    /** @component JobDetailHeader */
    function renderJobDetailHeader(vacante) {
        var mailto = '';
        if (vacante.aplicacion && vacante.aplicacion.correo) {
            var subject = vacante.aplicacion.asunto || ('Aplicación — ' + vacante.titulo);
            mailto = 'mailto:' + encodeURIComponent(vacante.aplicacion.correo) +
                '?subject=' + encodeURIComponent(subject);
        }

        return (
            '<header class="job-detail-header" data-component="JobDetailHeader">' +
                '<div class="job-detail-header__info">' +
                    '<h1 class="job-detail-header__title">' + escapeHtml(vacante.titulo) + '</h1>' +
                    '<div class="job-detail-header__meta">' +
                        (vacante.empresa ? '<span class="job-detail-header__meta-item"><span class="material-symbols-outlined">business</span>' + escapeHtml(vacante.empresa) + '</span>' : '') +
                        '<span class="job-detail-header__meta-item"><span class="material-symbols-outlined">location_on</span>' +
                            escapeHtml(formatUbicacionConModalidad(vacante.ubicacion, vacante.modalidad)) +
                        '</span>' +
                    '</div>' +
                '</div>' +
                (mailto ? '<a href="' + mailto + '" class="job-detail-header__apply"><span class="material-symbols-outlined">send</span>Aplicar ahora</a>' : '') +
            '</header>'
        );
    }

    /** @component JobQuickInfo */
    function renderJobQuickInfo(vacante) {
        var req = vacante.requisitos || {};
        var comp = vacante.compensacion || {};
        var items = [
            { icon: 'home_work', label: 'Modalidad', value: vacante.modalidad },
            { icon: 'work', label: 'Tipo de empleo', value: vacante.tipoEmpleo },
            { icon: 'trending_up', label: 'Experiencia', value: formatExperiencia(req) },
            { icon: 'payments', label: 'Salario', value: formatSalario(comp) },
            { icon: 'info', label: 'Estado', value: vacante.estado },
            { icon: 'sell', label: 'Identificación', value: vacante.identificacion }
        ].filter(function (item) { return item.value; });

        var html = '<div class="job-quick-info" data-component="JobQuickInfo">';
        items.forEach(function (item) {
            html += '<div class="job-quick-info__item">' +
                '<span class="material-symbols-outlined job-quick-info__icon">' + item.icon + '</span>' +
                '<span class="job-quick-info__label">' + escapeHtml(item.label) + '</span>' +
                '<span class="job-quick-info__value">' + escapeHtml(item.value) + '</span>' +
            '</div>';
        });
        html += '</div>';
        return html;
    }

    /** @component JobDescription */
    function renderJobDescription(vacante) {
        var html = '<section class="job-detail-section" data-component="JobDescription">';

        if (vacante.descripcion) {
            html += '<p class="job-detail-section__text mb-6">' + escapeHtml(vacante.descripcion) + '</p>';
        }

        html += '<h2 class="job-detail-section__heading"><span class="material-symbols-outlined">description</span>Descripción del puesto</h2>';

        if (vacante.objetivo) {
            html += '<h3 class="job-detail-section__subheading">Objetivo</h3>' +
                '<p class="job-detail-section__text">' + escapeHtml(vacante.objetivo) + '</p>';
        }

        if (vacante.responsabilidades && vacante.responsabilidades.length) {
            html += '<h3 class="job-detail-section__subheading">Responsabilidades</h3>' +
                '<ul class="job-responsibilities" data-component="ResponsibilitiesList">';
            vacante.responsabilidades.forEach(function (r) {
                html += '<li class="job-responsibilities__item">' +
                    '<span class="job-responsibilities__check"><span class="material-symbols-outlined">check</span></span>' +
                    '<span>' + escapeHtml(r) + '</span></li>';
            });
            html += '</ul>';
        }

        if (vacante.perfilCandidato) {
            html += '<h3 class="job-detail-section__subheading">Perfil del candidato</h3>' +
                '<p class="job-detail-section__text">' + escapeHtml(vacante.perfilCandidato) + '</p>';
        }

        html += '</section>';
        return html;
    }

    /** @component JobRequirements */
    function renderJobRequirements(vacante) {
        var req = vacante.requisitos;
        if (!req) return '';

        var html = '<section class="job-detail-section" data-component="JobRequirements">' +
            '<h2 class="job-detail-section__heading"><span class="material-symbols-outlined">target</span>Requisitos del candidato</h2>';

        if (req.habilidades && req.habilidades.length) {
            html += '<h3 class="job-detail-section__subheading">Habilidades técnicas</h3>' +
                '<div class="job-skill-tags" data-component="SkillTags">';
            req.habilidades.forEach(function (h) {
                html += '<span class="job-skill-tag">' + escapeHtml(h) + '</span>';
            });
            html += '</div>';
        }

        if (req.idiomas && req.idiomas.length) {
            html += '<h3 class="job-detail-section__subheading">Idiomas</h3>' +
                '<div class="job-languages" data-component="LanguagesList">';
            req.idiomas.forEach(function (lang) {
                html += '<div class="job-languages__item">' +
                    '<span>' + escapeHtml(lang.nombre) + '</span>' +
                    '<span class="job-languages__level">' + escapeHtml(lang.nivel) + '</span></div>';
            });
            html += '</div>';
        }

        if (req.herramientas) {
            html += '<h3 class="job-detail-section__subheading">Herramientas obligatorias</h3>' +
                '<p class="job-detail-section__text">' + escapeHtml(req.herramientas) + '</p>';
        }

        if (req.licencias) {
            html += '<h3 class="job-detail-section__subheading">Licencias</h3>' +
                '<p class="job-detail-section__text">' + escapeHtml(req.licencias) + '</p>';
        }

        if (req.descripcionExperiencia) {
            html += '<h3 class="job-detail-section__subheading">Experiencia requerida</h3>' +
                '<p class="job-detail-section__text">' + escapeHtml(req.descripcionExperiencia) + '</p>';
        }

        if (req.requisitosAdicionales) {
            html += '<h3 class="job-detail-section__subheading">Requisitos adicionales</h3>' +
                '<p class="job-detail-section__text">' + escapeHtml(req.requisitosAdicionales) + '</p>';
        }

        html += '</section>';
        return html;
    }

    /** @component AcademicProfileCard */
    function renderAcademicProfileCard(vacante) {
        var html = '<aside class="job-sidebar-card" data-component="AcademicProfileCard">' +
            '<h3 class="job-sidebar-card__heading"><span class="material-symbols-outlined">school</span>Perfil académico</h3>';

        if (vacante.estadoAcademico) {
            html += '<div class="job-sidebar-card__field">' +
                '<span class="job-sidebar-card__label">Estado académico</span>' +
                '<span class="job-sidebar-card__value">' + escapeHtml(vacante.estadoAcademico) + '</span></div>';
        }

        if (vacante.carrerasElegibles && vacante.carrerasElegibles.length) {
            html += '<div class="job-sidebar-card__field">' +
                '<span class="job-sidebar-card__label">Carreras elegibles</span>' +
                '<div class="job-sidebar-card__tags" data-component="CareerTags">';
            vacante.carrerasElegibles.forEach(function (c) {
                html += '<span class="job-sidebar-card__tag">' + escapeHtml(c) + '</span>';
            });
            html += '</div></div>';
        }

        if (vacante.institucionElegible) {
            html += '<div class="job-sidebar-card__field">' +
                '<span class="job-sidebar-card__label">Institución elegible</span>' +
                '<span class="job-sidebar-card__value">' + escapeHtml(vacante.institucionElegible) + '</span></div>';
        }

        html += '</aside>';
        return html;
    }

    /** @component CompensationCard */
    function renderCompensationCard(vacante) {
        var comp = vacante.compensacion;
        if (!comp) return '';

        var html = '<aside class="job-compensation-card" data-component="CompensationCard">' +
            '<h3 class="job-compensation-card__heading">Compensación</h3>' +
            '<p class="job-compensation-card__salary">' + escapeHtml(formatSalario(comp)) + '</p>';

        if (comp.moneda) {
            html += '<div class="job-compensation-card__row">' +
                '<span class="job-compensation-card__row-label">Moneda</span>' +
                '<span class="job-compensation-card__row-value">' + escapeHtml(comp.moneda) + '</span></div>';
        }
        if (comp.periodo) {
            html += '<div class="job-compensation-card__row">' +
                '<span class="job-compensation-card__row-label">Período</span>' +
                '<span class="job-compensation-card__row-value">' + escapeHtml(comp.periodo) + '</span></div>';
        }

        html += '</aside>';
        return html;
    }

    /** @component ApplicationCard */
    function renderApplicationCard(vacante) {
        var app = vacante.aplicacion;
        if (!app || !app.correo) return '';

        var subject = app.asunto || ('Aplicación — ' + vacante.titulo);
        var mailto = 'mailto:' + encodeURIComponent(app.correo) +
            '?subject=' + encodeURIComponent(subject);

        return (
            '<aside class="job-apply-card" data-component="ApplicationCard">' +
                '<p class="job-apply-card__prompt">¿Te interesa esta posición?</p>' +
                (app.instrucciones ? '<p class="job-apply-card__instructions">' + escapeHtml(app.instrucciones) + '</p>' : '') +
                '<div class="job-apply-card__email-box">' +
                    '<span class="job-apply-card__email" data-copy-email="' + escapeHtml(app.correo) + '">' + escapeHtml(app.correo) + '</span>' +
                    '<button type="button" class="job-apply-card__copy" data-action="copy-email" aria-label="Copiar correo">' +
                        '<span class="material-symbols-outlined">content_copy</span></button>' +
                '</div>' +
                '<a href="' + mailto + '" class="job-apply-card__submit">Enviar aplicación</a>' +
                (vacante.identificacion ? '<span class="job-apply-card__reference">Referencia: ' + escapeHtml(vacante.identificacion) + '</span>' : '') +
            '</aside>'
        );
    }

    /** @component JobDetailPage */
    function renderJobDetailPage(vacante) {
        return (
            renderJobDetailHeader(vacante) +
            renderJobQuickInfo(vacante) +
            '<div class="job-detail-layout">' +
                '<div class="job-detail-layout__main">' +
                    renderJobDescription(vacante) +
                    renderJobRequirements(vacante) +
                '</div>' +
                '<aside class="job-detail-layout__sidebar">' +
                    renderAcademicProfileCard(vacante) +
                    renderCompensationCard(vacante) +
                    renderApplicationCard(vacante) +
                '</aside>' +
            '</div>'
        );
    }

    /* ================================================================
       LÓGICA DE FILTRADO Y PAGINACIÓN
       ================================================================ */

    var ITEMS_PER_PAGE = 6;

    var MODALIDAD_PILLS = ['Presencial', 'Remoto', 'Híbrido'];
    var TIPO_PILLS = ['Tiempo completo', 'Medio tiempo', 'Pasantía', 'Temporal', 'Contrato'];

    function filterVacantes(vacantes, filters) {
        return vacantes.filter(function (v) {
            if (filters.query) {
                var q = filters.query.toLowerCase();
                var matchTitle = (v.titulo || '').toLowerCase().indexOf(q) !== -1;
                var matchEmpresa = (v.empresa || '').toLowerCase().indexOf(q) !== -1;
                var matchTags = (v.etiquetas || []).some(function (t) {
                    return t.toLowerCase().indexOf(q) !== -1;
                });
                if (!matchTitle && !matchEmpresa && !matchTags) return false;
            }
            if (filters.modalidad && v.modalidad !== filters.modalidad) return false;
            if (filters.tipoEmpleo && v.tipoEmpleo !== filters.tipoEmpleo) return false;
            if (filters.ubicacion) {
                var loc = formatUbicacion(v.ubicacion).toLowerCase();
                if (loc.indexOf(filters.ubicacion.toLowerCase()) === -1) return false;
            }

            var pills = filters.pills || [];
            if (!pills.length && filters.pill && filters.pill !== 'todos') {
                pills = [filters.pill];
            }
            if (pills.length) {
                var selectedModalidad = pills.filter(function (p) {
                    return MODALIDAD_PILLS.indexOf(p) !== -1;
                });
                var selectedTipo = pills.filter(function (p) {
                    return TIPO_PILLS.indexOf(p) !== -1;
                });

                if (selectedModalidad.length && selectedModalidad.indexOf(v.modalidad) === -1) return false;
                if (selectedTipo.length && selectedTipo.indexOf(v.tipoEmpleo) === -1) return false;
            }

            if (filters.estado && v.estado !== filters.estado) return false;
            return true;
        });
    }

    function sortVacantes(vacantes, sortBy) {
        var sorted = vacantes.slice();
        if (sortBy === 'empresa') {
            sorted.sort(function (a, b) {
                return (a.empresa || '').localeCompare(b.empresa || '');
            });
        } else if (sortBy === 'titulo') {
            sorted.sort(function (a, b) {
                return (a.titulo || '').localeCompare(b.titulo || '');
            });
        }
        return sorted;
    }

    /* ================================================================
       INICIALIZACIÓN — Páginas
       ================================================================ */

    function initListPage() {
        var grid = document.getElementById('job-listings-grid');
        if (!grid) return;

        var state = {
            filters: { pills: [] },
            sortBy: 'titulo',
            currentPage: 1
        };

        function render() {
            var filtered = filterVacantes(MOCK_VACANTES, state.filters);
            filtered = sortVacantes(filtered, state.sortBy);

            var totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
            if (state.currentPage > totalPages) state.currentPage = totalPages;

            var start = (state.currentPage - 1) * ITEMS_PER_PAGE;
            var pageItems = filtered.slice(start, start + ITEMS_PER_PAGE);

            grid.innerHTML = renderJobListingsGrid(pageItems);

            var paginationEl = document.getElementById('job-pagination');
            if (paginationEl) {
                paginationEl.innerHTML = renderPagination(state.currentPage, totalPages);
            }

            var countEl = document.getElementById('job-results-count');
            if (countEl) {
                countEl.textContent = filtered.length + ' vacante' + (filtered.length !== 1 ? 's' : '') + ' encontrada' + (filtered.length !== 1 ? 's' : '');
            }
        }

        var searchInput = document.getElementById('job-search-query');
        var modalidadSelect = document.getElementById('job-filter-modalidad');
        var tipoSelect = document.getElementById('job-filter-tipo');
        var ubicacionInput = document.getElementById('job-filter-ubicacion');
        var sortSelect = document.getElementById('job-sort');

        function updateFilters() {
            state.filters.query = searchInput ? searchInput.value.trim() : '';
            state.filters.modalidad = modalidadSelect ? modalidadSelect.value : '';
            state.filters.tipoEmpleo = tipoSelect ? tipoSelect.value : '';
            state.filters.ubicacion = ubicacionInput ? ubicacionInput.value.trim() : '';
            state.currentPage = 1;
            render();
        }

        var debouncedSearch = window.utils && window.utils.debounce
            ? window.utils.debounce(updateFilters, 300)
            : updateFilters;

        if (searchInput) searchInput.addEventListener('input', debouncedSearch);
        if (modalidadSelect) modalidadSelect.addEventListener('change', updateFilters);
        if (tipoSelect) tipoSelect.addEventListener('change', updateFilters);
        if (ubicacionInput) ubicacionInput.addEventListener('input', debouncedSearch);

        if (sortSelect) {
            sortSelect.addEventListener('change', function () {
                state.sortBy = sortSelect.value;
                render();
            });
        }

        function syncPillAria() {
            document.querySelectorAll('[data-filter-pill]').forEach(function (p) {
                p.setAttribute('aria-pressed', p.classList.contains('job-filter-pill--active') ? 'true' : 'false');
            });
        }

        document.querySelectorAll('[data-filter-pill]').forEach(function (pill) {
            pill.addEventListener('click', function () {
                var value = pill.getAttribute('data-filter-pill');
                var todosPill = document.querySelector('[data-filter-pill="todos"]');

                if (value === 'todos') {
                    document.querySelectorAll('[data-filter-pill]').forEach(function (p) {
                        p.classList.remove('job-filter-pill--active');
                    });
                    if (todosPill) todosPill.classList.add('job-filter-pill--active');
                    state.filters.pills = [];
                    state.currentPage = 1;
                    syncPillAria();
                    render();
                    return;
                }

                if (todosPill) todosPill.classList.remove('job-filter-pill--active');
                pill.classList.toggle('job-filter-pill--active');

                var activePills = [];
                document.querySelectorAll('[data-filter-pill]').forEach(function (p) {
                    var pillValue = p.getAttribute('data-filter-pill');
                    if (pillValue !== 'todos' && p.classList.contains('job-filter-pill--active')) {
                        activePills.push(pillValue);
                    }
                });

                if (!activePills.length && todosPill) {
                    todosPill.classList.add('job-filter-pill--active');
                    state.filters.pills = [];
                } else {
                    state.filters.pills = activePills;
                }

                state.currentPage = 1;
                syncPillAria();
                render();
            });
        });

        syncPillAria();

        var paginationContainer = document.getElementById('job-pagination');
        if (paginationContainer) {
            paginationContainer.addEventListener('click', function (e) {
                var btn = e.target.closest('[data-page]');
                if (!btn || btn.disabled) return;
                var page = btn.getAttribute('data-page');
                if (page === 'prev') state.currentPage--;
                else if (page === 'next') state.currentPage++;
                else state.currentPage = parseInt(page, 10);
                render();
                grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }

        render();
    }

    function initDetailPage() {
        var container = document.getElementById('job-detail-content');
        if (!container) return;

        var params = new URLSearchParams(window.location.search);
        var id = params.get('id');
        var vacante = id ? getVacanteById(id) : MOCK_VACANTES[1];

        if (!vacante) {
            container.innerHTML =
                '<div class="job-empty-state">' +
                    '<span class="material-symbols-outlined">search_off</span>' +
                    '<p class="type-body-lg">No se encontró la vacante solicitada.</p>' +
                    '<a href="bolsa-de-empleo.html" class="job-btn-primary mt-6">Ver todas las vacantes</a>' +
                '</div>';
            return;
        }

        container.innerHTML = renderJobDetailPage(vacante);

        document.title = vacante.titulo + ' — Bolsa de Empleo UNPHU';

        var breadcrumbCurrent = document.getElementById('job-breadcrumb-current');
        if (breadcrumbCurrent) breadcrumbCurrent.textContent = vacante.titulo;

        container.addEventListener('click', function (e) {
            var copyBtn = e.target.closest('[data-action="copy-email"]');
            if (!copyBtn) return;
            var emailEl = container.querySelector('[data-copy-email]');
            if (!emailEl) return;
            var email = emailEl.getAttribute('data-copy-email');
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(function () {
                    copyBtn.innerHTML = '<span class="material-symbols-outlined">check</span>';
                    setTimeout(function () {
                        copyBtn.innerHTML = '<span class="material-symbols-outlined">content_copy</span>';
                    }, 2000);
                });
            }
        });
    }

    /* ================================================================
       EXPORT — API pública para integración Next.js / Firebase
       ================================================================ */

    window.BolsaEmpleo = {
        FIELDS: VACANCY_FIELDS,
        getVacantes: function () { return MOCK_VACANTES; },
        getVacanteById: getVacanteById,
        filterVacantes: filterVacantes,
        sortVacantes: sortVacantes,
        formatUbicacion: formatUbicacion,
        formatSalario: formatSalario,
        formatExperiencia: formatExperiencia,
        render: {
            JobCard: renderJobCard,
            JobListingsGrid: renderJobListingsGrid,
            Pagination: renderPagination,
            JobDetailHeader: renderJobDetailHeader,
            JobQuickInfo: renderJobQuickInfo,
            JobDescription: renderJobDescription,
            JobRequirements: renderJobRequirements,
            AcademicProfileCard: renderAcademicProfileCard,
            CompensationCard: renderCompensationCard,
            ApplicationCard: renderApplicationCard,
            JobDetailPage: renderJobDetailPage
        },
        initListPage: initListPage,
        initDetailPage: initDetailPage
    };

    document.addEventListener('DOMContentLoaded', function () {
        initListPage();
        initDetailPage();
    });
})();
