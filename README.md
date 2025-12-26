# SimplePAES

## Tu compañero inteligente para dominar la PAES de Matemáticas

Una aplicación web completa diseñada para ayudar a estudiantes chilenos a prepararse para el examen de matemáticas PAES (Prueba de Acceso a la Educación Superior).

## Descripción General

SimplePAES es una plataforma de práctica completa que incluye:

- **Mini-Lecciones Interactivas (50+)** - Lecciones estructuradas con metodología pedagógica de 6 pasos alineada al currículum MINEDUC
- **Quizzes de Práctica Interactivos** - Estudia a tu ritmo o desafíate con pruebas cronometradas
- **Sesiones de Práctica en Vivo (Ensayos)** - Únete a simulaciones PAES programadas con otros estudiantes
- **Tutor con IA** - Asistente personalizado con metodología Socrática que te ayuda a entender cada problema
- **Seguimiento de Progreso** - Monitorea tu desempeño por temas y niveles de dificultad con tracking en base de datos
- **Sistema de Rachas** - Mantén tu motivación con streaks diarios
- **Dos Niveles de Competencia** - M1 (básico) y M2 (avanzado) alineados con estándares PAES
- **Generador Dinámico de Preguntas (QGen)** - Sistema inteligente para generar preguntas personalizadas
- **Sistema para Colegios** - Dashboard para profesores con asignación de estudiantes por nivel
- **Sistema de Suscripciones** - Planes de acceso con gestión completa de usuarios
- **Integración de Pagos** - Procesamiento de pagos con MercadoPago para Chile
- **Analytics Completo** - Métricas de uso, desempeño y análisis de interacciones con IA
- **Panel de Administración** - Gestiona sesiones en vivo, usuarios, planes, colegios y el banco de preguntas
- **Sistema de Documentación** - Accede a material de estudio completo con LaTeX
- **Módulo de Aprendizaje Interactivo** - Aprende con metodología Socrática proactiva

## Características Principales

### 📚 Mini-Lecciones Interactivas (50+ Lecciones)

**Sistema de Aprendizaje Estructurado** - Lecciones con metodología pedagógica de 6 pasos

Cada mini-lección sigue un pipeline pedagógico probado:

| Paso | Nombre | Descripción |
|------|--------|-------------|
| 1 | **Hook** | Escenario del mundo real que engancha al estudiante |
| 2 | **Explore** | Descubrimiento interactivo de patrones |
| 3 | **Explain** | Explicación teórica con pestañas organizadas |
| 4 | **Classify** | Ejercicios de clasificación y aplicación |
| 5 | **Practice** | Resolución guiada con hints |
| 6 | **Verify** | Quiz checkpoint (3/4 correctas para aprobar) |

**Cobertura por Materia (M1):**
- **Números**: 17 lecciones (enteros, fracciones, porcentajes, potencias)
- **Álgebra**: 21 lecciones (términos semejantes, factorización, productos notables, ecuaciones)
- **Geometría**: 7 lecciones (áreas, perímetros, volúmenes, coordenadas)
- **Probabilidad**: 8 lecciones (frecuencia, histogramas, estadística)

**Características Técnicas:**
- **Alineación MINEDUC**: Cada lección vinculada a Objetivos de Aprendizaje oficiales (OA)
- **Componentes Reutilizables**: Toolbox con hooks y primitivas para desarrollo rápido
- **Constructor de Lecciones**: Interfaz de chat con IA para crear nuevas lecciones
- **Tiempo Estimado**: 10-15 minutos por lección

### 📖 Módulo de Aprendizaje Interactivo (Learn)

**Experiencia de Aprendizaje Socrática** - Tutor IA que te guía paso a paso

- **Selección de Tema**: Elige nivel (M1/M2) y materia (números, álgebra, geometría, probabilidad)
- **Preguntas Diversas**: Sistema presenta 5 preguntas variadas para elegir
- **Metodología Socrática Proactiva**: El tutor inicia preguntando sobre tu razonamiento
- **Conversación Interactiva**: Chat en tiempo real con el tutor IA
- **Retroalimentación Inmediata**: Respuestas adaptadas a tu nivel de comprensión
- **SmartLatexRenderer**: Renderizado inteligente de fórmulas matemáticas
- **Reintentos Automáticos**: Sistema de retry con backoff exponencial para robustez
- **Seguimiento de Sesión**: Contador de preguntas completadas por sesión
- **Manejo de Errores**: Mensajes claros y opciones de reintento

### 🎯 Modos de Práctica

**Modo Zen** - Estudia sin presión de tiempo
- Tómate el tiempo que necesites por pregunta
- Revisa explicaciones inmediatamente
- Consulta al tutor IA cuando necesites ayuda adicional
- Enfócate en aprender y entender
- Animación de respiración al inicio para concentrarte

**Modo Rapid Fire** - Desafíos de práctica cronometrados
- Elige tu dificultad: Fácil (25 min), Medio (20 min), Difícil (15 min), Extremo (10 min)
- 10 preguntas por sesión
- Simula la presión del examen
- Panel de navegación rápida para saltar entre preguntas

### 🤖 Tutor con Inteligencia Artificial

**Sistema de Tutoría Socrática** - Implementado con Claude Sonnet 4.5

- **Metodología Socrática**: El tutor investiga tu razonamiento antes de explicar
- **Conversaciones interactivas**: Chat multi-turno sobre cada pregunta
- **Contexto completo**: El tutor conoce la pregunta, opciones y explicaciones
- **Tono empático**: Comunicación amigable y motivacional
- **Disponible en Modo Zen**: Botón de chat en cada pregunta
- **Ayuda instantánea**: Explicaciones personalizadas cuando respondes incorrectamente

### 📝 Sesiones de Práctica en Vivo (Ensayos PAES)

- **Programar & Registrarse** - Inscríbete en ensayos próximos
- **Sistema de Lobby** - Únete antes de que comience la sesión
- **Práctica en Tiempo Real** - Compite con otros estudiantes
- **Resultados Instantáneos** - Ve tu puntaje y compara con tus compañeros
- **Auto-actualización** - El sistema actualiza estados cada 30 segundos

### 📊 Cobertura Completa de Contenido

La plataforma cubre las cuatro áreas de matemáticas PAES:

1. **Números** - Fracciones, porcentajes, potencias, raíces, proporciones, divisibilidad
2. **Álgebra y Funciones** - Ecuaciones, funciones, sistemas, factorización, cuadráticas
3. **Geometría** - Área, perímetro, volumen, geometría de coordenadas, teorema de Pitágoras
4. **Probabilidad y Estadística** - Media, mediana, moda, probabilidad, combinaciones

### 🎓 Dos Niveles de Competencia

- **M1 (Competencia Matemática 1)** - 406 problemas cubriendo conceptos matemáticos básicos para todos los programas universitarios
- **M2 (Competencia Matemática 2)** - 210 problemas avanzados para carreras de ciencia e ingeniería (expandido masivamente)

### 📚 Sistema de Documentación Completo

- **Documentación M1 y M2**: Material de estudio completo con ejemplos
- **Renderizado LaTeX**: Fórmulas matemáticas profesionales
- **Navegación por temas**: Sidebar interactivo
- **Modo de lectura**: Enfoque sin distracciones
- **Markdown adaptativo**: Contenido estructurado y fácil de leer

### 🎮 Sistema de Gamificación

**Rachas Diarias** - Mantén tu motivación
- Contador de días consecutivos de práctica
- Tracking de racha más larga
- Emojis indicadores (🎯 🔥 ⚡ 🏆) según longitud de racha
- Almacenado en base de datos PostgreSQL
- Actualización automática al completar práctica

**Seguimiento de Habilidades** - 500+ skills definidos
- Taxonomía completa de habilidades PAES
- Niveles de maestría: No Iniciado / Aprendiendo / Dominado
- Indicadores visuales de progreso
- Filtrado por nivel de maestría
- Vinculado a documentación del currículum

**Quiz Tracking Completo** - Historial persistente
- Todas las sesiones de quiz guardadas en PostgreSQL
- Cada intento registrado con detalles completos
- Conversaciones con el tutor IA almacenadas por sesión
- Estadísticas de desempeño por tema y dificultad
- Configuración de quiz persistente entre sesiones

### 🤖 Sistema QGen - Generador Dinámico de Preguntas

**Generación Inteligente** - Crea preguntas personalizadas al instante

- **Biblioteca de Contextos**: Situaciones de la vida real (economía, deportes, tecnología, etc.)
- **Biblioteca de Objetivos**: Tipos de razonamiento (aplicar, analizar, sintetizar, evaluar)
- **Sistema de Templates**: Plantillas parametrizadas para cada tipo de pregunta
- **Generador de Valores**: Crea valores numéricos coherentes y realistas
- **Algoritmo de Combinación**: Mezcla contextos, objetivos y templates inteligentemente
- **Validación Automática**: Verifica que las preguntas generadas tengan sentido
- **Admin Interface**: Panel para gestionar bibliotecas y generar preguntas

**Beneficios del QGen:**
- Práctica ilimitada sin agotar el banco de preguntas
- Preguntas contextualizadas y relevantes
- Variedad infinita manteniendo calidad
- Adaptable a diferentes niveles y temas

### 📚 Sistema de Problemas Abstractos - Generación Masiva

**Generación Automatizada a Escala** - Sistema para crear ~1000 problemas organizados por taxonomía PAES

- **46 Unidades Temáticas**: 33 unidades M1 + 13 unidades M2
- **Taxonomía Completa**: Organizadas por Números, Álgebra, Geometría, Probabilidad
- **Generación Batch**: Capacidad de generar hasta 1000 problemas de una vez
- **Integración OpenAI**: Utiliza GPT-4 para generación de problemas de alta calidad
- **Control Granular**: Scripts con opciones --dry-run, --limit, --units para testing
- **Scripts Helper**: Herramientas para visualizar taxonomía y planificar generación
- **Distribución por Dificultad**: Generación balanceada de problemas fáciles, medios y difíciles
- **Almacenamiento BD**: Problemas generados se guardan automáticamente en PostgreSQL

**Comandos Disponibles:**
```bash
# Ver taxonomía de unidades sin generar
npm run helpers:abstract-problems taxonomy

# Test sin generar problemas reales
npm run seed:abstract-problems -- --dry-run

# Generar muestra de 3 unidades (~45 problemas)
npm run seed:abstract-problems -- --limit=3

# Generar todos los problemas (~1000)
npm run seed:abstract-problems
```

**Guía Completa**: Ver [QUICK-START-ABSTRACT-PROBLEMS.md](./QUICK-START-ABSTRACT-PROBLEMS.md)

### 💳 Sistema de Suscripciones

**Gestión Completa de Acceso** - Monetización y control de usuarios

- **Planes de Suscripción**: Define múltiples planes con diferentes características
- **Estados de Usuario**: Trial, Active, Expired, Cancelled
- **Auto-renovación**: Gestión de renovaciones automáticas
- **Features por Plan**: Control granular de acceso a características
- **Admin Dashboard**: Interface completa para gestionar usuarios y suscripciones
- **Métricas de Conversión**: Tracking de trials, conversiones y cancelaciones

**Estructura de Planes:**
- Precio configurable (CLP u otra moneda)
- Duración personalizable
- Período de prueba opcional
- Lista de features incluidas
- Estado activo/inactivo

### 💳 Integración de Pagos con MercadoPago

**Procesamiento de Pagos Completo** - Sistema integrado para Chile

- **MercadoPago SDK**: Integración oficial con gateway de pago chileno
- **Webhooks Automáticos**: Actualización en tiempo real del estado de pagos
- **Activación Automática**: Suscripciones se activan al confirmar el pago
- **Tracking de Pagos**: Historial completo de transacciones
- **Páginas de Estado**: Success, pending, y failure pages
- **Modo Sandbox**: Testing completo con tarjetas de prueba
- **Seguridad**: Validación de webhooks y auditoría completa

**Flujo de Pago:**
1. Usuario selecciona plan en frontend
2. Sistema crea preferencia de pago en MercadoPago
3. Usuario completa el pago en checkout de MercadoPago
4. Webhook notifica al backend sobre el estado del pago
5. Sistema activa suscripción automáticamente al aprobar
6. Usuario recibe confirmación y acceso inmediato

**Características de Seguridad:**
- Tokens JWT para autenticación
- Validación de webhooks de MercadoPago
- Registro completo de transacciones para auditoría
- Rate limiting en endpoints de pago
- Helmet para headers de seguridad HTTP

### 👨‍💼 Características de Administración

- **Crear y programar** sesiones de práctica en vivo
- **Ver todos los problemas** en el banco de preguntas
- **Filtrar** por nivel, tema y dificultad
- **Monitorear** usuarios registrados y participación en sesiones
- **Upload de PDFs** - Extrae preguntas automáticamente con IA
- **Gestión de sesiones** - Editar, cancelar, eliminar ensayos
- **Plantillas rápidas** - Templates para sesiones M1/M2
- **Analytics Dashboard** - Métricas de uso, tendencias y desempeño
- **AI Analytics** - Análisis de interacciones con el tutor IA
- **Gestión de Usuarios** - CRUD completo de usuarios y suscripciones
- **Sistema de Planes** - Crear y gestionar planes de suscripción
- **QGen System** - Generador dinámico de preguntas con IA
- **Debug Tools** - Páginas de debug para Zen y Rapid Fire
- **System Health** - Monitoreo en tiempo real del estado del sistema
- **Backup & Restore** - Sistema automatizado de respaldos de base de datos

### 🏫 Sistema para Colegios

**Gestión de Cuentas Demo** - Panel administrativo para instituciones educativas

- **Base de Datos de Colegios**: Búsqueda por nombre o RBD (código identificador chileno)
- **Creación de Cuentas Demo**: Genera credenciales para colegios con período de prueba configurable (1-90 días)
- **Gestión de Trials**: Seguimiento de cuentas demo, días restantes y estados
- **Credenciales Seguras**: Generación con funcionalidad de copiar al portapapeles

**Dashboard de Profesores** - Herramientas para docentes

- **Asignación por Nivel**: Asigna estudiantes a grados específicos (1° a 4° Medio)
- **Filtrado de Estudiantes**: Busca por email, nombre o nivel asignado
- **Vista Colegio**: Dashboard especializado para estudiantes asignados a un nivel
- **Contenido por Grado**: Mini-lecciones apropiadas según el nivel del estudiante

### 📊 Analytics y Monitoring

**Dashboard de Analytics General** - Métricas completas del sistema
- Actividad de usuarios (registros, logins, sesiones activas)
- Tendencias de uso por período
- Métricas de desempeño por nivel y tema
- Conversión de usuarios trial a activos
- Uso de características por segmento

**AI Analytics** - Análisis de interacciones con el tutor IA
- Tracking de todas las conversaciones usuario-IA
- Tipos de interacción: chat, help, summarize, practice
- Métricas de uso de tokens y costos de API
- Tiempo de respuesta del modelo
- Análisis de efectividad del tutor
- Historial completo almacenado en tabla `ai_interactions`

**Monitoring de Sistema:**
- Health checks del servidor
- Métricas de base de datos (queries, conexiones)
- Uso de recursos del servidor
- Logs de errores y warnings

### 🔧 Sistema de Operaciones y Mantenimiento

**System Health Monitoring** - Monitoreo completo del estado del sistema

- **Health Check Endpoints**: Verificación de estado de API, base de datos y servicios externos
- **Dashboard de Salud**: Interfaz visual en `/admin/system-health` para monitoreo en tiempo real
- **Métricas Detalladas**: Uptime, latencia de BD, uso de conexiones, estado de Anthropic API
- **Status Indicators**: Indicadores visuales de salud (healthy, degraded, down)
- **Auto-refresh**: Actualización automática cada 30 segundos
- **Alerts**: Sistema de alertas para degradación de servicios

**Backup & Restore System** - Respaldos automáticos de base de datos

- **Backup Automático**: Sistema de respaldos programables de PostgreSQL
- **Compresión**: Backups comprimidos con gzip para optimizar almacenamiento
- **Upload a Cloud**: Soporte para subir backups a servicios cloud (S3, GCS)
- **Verificación**: Scripts de verificación de integridad de backups
- **Restore Seguro**: Proceso de restauración con confirmación
- **Monitoring**: Monitoreo del estado de backups recientes
- **Retención**: Políticas configurables de retención de backups

**Comandos Disponibles:**
```bash
# Backend - Sistema de Backup/Restore
cd backend

# Crear backup local
npm run backup

# Crear backup y subir a cloud
npm run backup:upload

# Listar backups disponibles
npm run backup:list

# Restaurar desde backup
npm run restore

# Verificar integridad de backup
npm run verify-backup

# Monitorear estado de backups
npm run monitor-backups

# Monitoreo con salida JSON
npm run monitor-backups:json

# Monitoreo con alertas
npm run monitor-backups:alert
```

## Stack Tecnológico

### Frontend
- **Framework**: Next.js 16.0.2 con React 19
- **Lenguaje**: TypeScript 5.9.3
- **Estilos**: Tailwind CSS con sistema de diseño personalizado (inspirado en Apple)
- **Renderizado Matemático**: KaTeX para expresiones LaTeX con SmartLatexRenderer
- **Gestión de Estado**: React Context API + XState para máquinas de estado
- **IA**: Anthropic SDK (Claude Sonnet 4.5)
- **UI Components**: Radix UI + Lucide Icons
- **Analytics**: PostHog para product analytics
- **Soporte al Cliente**: Intercom Messenger SDK
- **Internacionalización**: next-intl para soporte multi-idioma

### Backend
- **Runtime**: Node.js con Express
- **Lenguaje**: TypeScript
- **Base de Datos**: PostgreSQL con connection pooling
- **Autenticación**: JWT (JSON Web Tokens) con bcryptjs
- **API**: Endpoints RESTful
- **CORS**: Configurado para deployments en Vercel
- **Sistema de Auto-actualización**: Actualiza estados de sesiones cada 30 segundos
- **Pagos**: MercadoPago SDK para procesamiento de pagos en Chile
- **Email**: Resend y Nodemailer para notificaciones
- **Validación**: Zod para validación de esquemas
- **Seguridad**: Helmet para headers HTTP, express-rate-limit para protección
- **PDF Processing**: pdf-parse, pdf-lib, pdfjs-dist para extracción de preguntas
- **Image Processing**: Sharp para optimización de imágenes
- **File Upload**: Multer para manejo de archivos

### Testing & Quality
- **E2E Testing**: Playwright con TypeScript
- **Unit Testing**: Vitest con UI interactivo
- **Test Environment**: Docker Compose para PostgreSQL de pruebas
- **Code Standards**: Claude Code skills para patrones consistentes
- **Development Tools**: Claude Code integration con skills personalizados
- **Error Tracking**: Sentry para monitoreo de errores y rendimiento
- **Performance Monitoring**: Sentry APM para frontend y backend

### Bibliotecas Clave
- `react-katex` - Renderizado de expresiones matemáticas
- `react-markdown` - Renderizado de contenido markdown
- `rehype-katex` & `remark-math` - Procesamiento de matemáticas
- `clsx` & `tailwind-merge` - Estilos utility-first
- `jsonwebtoken` - Autenticación segura
- `pg` - Cliente PostgreSQL
- `@anthropic-ai/sdk` - Integración con Claude AI
- `bcryptjs` - Hashing de contraseñas
- `@playwright/test` - Testing E2E
- `vitest` - Testing unitario moderno
- `sonner` - Toast notifications
- `@sentry/nextjs` - Error tracking y performance monitoring (frontend)
- `@sentry/node` - Error tracking y APM (backend)
- `swr` - Data fetching y cache
- `xstate` & `@xstate/react` - Máquinas de estado para lógica compleja
- `posthog-js` - Product analytics y feature flags
- `@intercom/messenger-js-sdk` - Soporte al cliente en tiempo real
- `next-intl` - Internacionalización y soporte multi-idioma
- `pdf-parse`, `pdf-lib`, `pdfjs-dist` - Procesamiento y extracción de PDFs
- `sharp` - Optimización de imágenes
- `multer` - Manejo de file uploads
- `date-fns` - Manipulación de fechas
- `mercadopago` - SDK oficial de MercadoPago para pagos
- `resend` & `nodemailer` - Servicios de email
- `zod` - Validación de esquemas TypeScript
- `helmet` - Seguridad HTTP headers
- `express-rate-limit` - Rate limiting y protección
- `openai` - Integración con OpenAI (opcional)
- `mathjs` - Biblioteca matemática avanzada

## Estructura del Proyecto

```
/home/user/math/
├── .claude/                      # Claude Code Skills
│   └── skills/                   # Skills personalizados
│       ├── endpoint/             # Generador de endpoints Express.js
│       └── code-patterns/        # Guías de patrones y estándares
├── app/                          # Páginas Next.js App Router
│   ├── page.tsx                  # Landing page con autenticación
│   ├── dashboard/                # Dashboard principal del estudiante
│   ├── mini-lessons/             # Sistema de mini-lecciones
│   │   ├── page.tsx              # Landing de mini-lecciones
│   │   └── [level]/[subject]/    # Navegación por nivel y materia
│   ├── lessons/m1/               # Páginas individuales de lecciones
│   ├── learn/                    # Módulo de aprendizaje interactivo Socrático
│   ├── teacher/                  # Dashboard de profesores
│   │   └── students/             # Gestión de estudiantes por grado
│   ├── practice/                 # Páginas de práctica (M1/M2)
│   ├── pricing/                  # Página de precios (B2C y B2B)
│   ├── curriculum/               # Páginas de curriculum overview
│   │   ├── m1/                   # Curriculum M1
│   │   │   ├── docs/[[...slug]]  # Sistema de documentación M1
│   │   │   └── docs-export-all/  # Exportar toda la documentación
│   │   └── m2/                   # Curriculum M2
│   │       └── docs/[[...slug]]  # Sistema de documentación M2
│   ├── live-practice/            # Interfaz de sesiones en vivo
│   ├── progress/                 # Página de seguimiento de progreso
│   ├── payment/                  # Páginas de estado de pago
│   │   ├── success/              # Pago exitoso
│   │   ├── pending/              # Pago pendiente
│   │   └── failure/              # Pago fallido
│   ├── payments/                 # Interfaz de gestión de pagos
│   ├── admin/                    # Dashboard y herramientas de admin
│   │   ├── page.tsx              # Dashboard principal de admin
│   │   ├── problems/             # Navegador de banco de preguntas
│   │   ├── upload/               # Upload y extracción de PDFs
│   │   ├── analytics/            # Dashboard de analytics general
│   │   ├── ai-analytics/         # Analytics de interacciones IA
│   │   ├── users/                # Gestión de usuarios y suscripciones
│   │   ├── colegios/             # Gestión de cuentas demo para colegios
│   │   ├── qgen/                 # Generador dinámico de preguntas
│   │   ├── live-sessions/        # Gestión de sesiones en vivo
│   │   ├── system-health/        # Monitoreo de salud del sistema
│   │   ├── zen-debug/            # Debug del modo Zen
│   │   └── rapidfire-debug/      # Debug del modo Rapid Fire
│   └── api/                      # Next.js Route Handlers
│       ├── ai-chat/              # API del tutor IA
│       ├── ai-help/              # API de ayuda IA
│       └── config/               # Configuración
├── backend/                      # Backend Express.js
│   ├── src/
│   │   ├── index.ts              # Entry point del servidor
│   │   ├── auth/                 # Sistema de autenticación modular
│   │   │   ├── controllers/      # Controladores de auth
│   │   │   ├── middleware/       # Auth middleware
│   │   │   └── services/         # Servicios de auth
│   │   ├── config/               # Configuración de base de datos
│   │   ├── controllers/          # Controladores de API
│   │   ├── middleware/           # Middleware general
│   │   ├── routes/               # Rutas de API
│   │   │   ├── authRoutes.ts     # Autenticación
│   │   │   ├── sessionRoutes.ts  # Sesiones en vivo
│   │   │   ├── streakRoutes.ts   # Sistema de rachas
│   │   │   ├── adminRoutes.ts    # Admin endpoints
│   │   │   ├── aiRoutes.ts       # Servicios de IA
│   │   │   ├── analyticsRoutes.ts # Analytics general
│   │   │   ├── aiAnalyticsRoutes.ts # Analytics de IA
│   │   │   ├── quizRoutes.ts     # Quiz tracking
│   │   │   ├── qgenRoutes.ts     # Generador de preguntas
│   │   │   ├── paymentRoutes.ts  # Procesamiento de pagos MercadoPago
│   │   │   ├── teacherRoutes.ts  # Dashboard de profesores
│   │   │   ├── demoAccountRoutes.ts # Cuentas demo para colegios
│   │   │   └── userManagementRoutes.ts # Gestión de usuarios
│   │   ├── scripts/              # Scripts de utilidad
│   │   └── services/             # Servicios de negocio
│   │       ├── aiService.ts      # Servicios de IA
│   │       ├── pdfService.ts     # Procesamiento de PDFs
│   │       ├── pdfVisionService.ts # Extracción con visión
│   │       ├── imageStorageService.ts # Almacenamiento de imágenes
│   │       ├── subscriptionService.ts # Gestión de suscripciones
│   │       ├── paymentService.ts # Procesamiento de pagos MercadoPago
│   │       └── emailService.ts   # Servicio de notificaciones email
│   └── package.json
├── components/                   # Componentes React
│   ├── lessons/                  # Sistema de mini-lecciones
│   │   ├── m1/                   # 53 directorios de lecciones M1
│   │   ├── shared/               # Componentes compartidos (CheckpointQuiz, etc.)
│   │   ├── primitives/           # Toolbox primitivas (ProgressDots, FeedbackPanel)
│   │   └── builder/              # Constructor de lecciones con IA
│   ├── Quiz.tsx                  # Componente principal de quiz
│   ├── AIChatModal.tsx           # Interfaz de chat con tutor IA
│   ├── LiveSession.tsx           # Sesión de práctica en vivo
│   ├── Curriculum.tsx            # Display de currículum
│   ├── QuestionRenderer.tsx      # Renderizador de preguntas
│   ├── MathDisplay.tsx           # Renderizado KaTeX
│   ├── GeometryCanvas.tsx        # Problemas visuales de geometría
│   ├── SkillsDisplay.tsx         # Tracking de maestría de skills
│   ├── Streak.tsx                # Display de racha diaria
│   ├── Auth.tsx                  # Formularios login/registro
│   ├── ProtectedRoute.tsx        # Protección de rutas
│   ├── AdaptiveMarkdownViewer.tsx # Renderizador de docs markdown
│   ├── ReadingModeControl.tsx    # Control de modo lectura
│   └── ui/                       # Componentes UI reutilizables
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Badge.tsx
│       ├── Typography.tsx
│       ├── Navbar.tsx
│       ├── Modal.tsx
│       ├── Spinner.tsx
│       └── CurriculumSidebar.tsx
├── contexts/                     # Proveedores de React Context
│   └── AuthContext.tsx           # Estado de autenticación
├── e2e/                          # Tests End-to-End con Playwright
│   ├── auth.spec.ts              # Tests de autenticación
│   ├── practice.spec.ts          # Tests de práctica
│   ├── live-practice.spec.ts     # Tests de sesiones en vivo
│   └── helpers/                  # Utilidades de testing
├── lib/                          # Lógica core y datos
│   ├── lessons/                  # Sistema de mini-lecciones
│   │   ├── lessons/              # Registros por materia (53 lecciones)
│   │   ├── types.ts              # Tipos de lección
│   │   ├── thematicUnits.ts      # Organización curricular
│   │   └── styles.ts             # Sistema de colores
│   ├── builder/                  # Constructor de lecciones
│   │   └── types.ts              # Tipos DynamicLesson
│   ├── schools.ts                # Base de datos de colegios chilenos
│   ├── questions/                # Banco de preguntas por módulo
│   │   ├── m1/                   # 406 preguntas M1
│   │   │   ├── numeros/          # 91 preguntas
│   │   │   ├── algebra/          # 109 preguntas
│   │   │   ├── geometria/        # 106 preguntas
│   │   │   └── probabilidad/     # 100 preguntas
│   │   ├── m2/                   # 26 preguntas M2
│   │   │   ├── numeros/          # 6 preguntas
│   │   │   ├── algebra/          # 6 preguntas
│   │   │   ├── geometria/        # 7 preguntas
│   │   │   └── probabilidad/     # 7 preguntas
│   │   └── index.ts              # Agregación de preguntas
│   ├── qgen/                     # Sistema de generación dinámica
│   │   ├── contextLibrary.ts     # Biblioteca de contextos
│   │   ├── goalLibrary.ts        # Biblioteca de objetivos
│   │   ├── templateLibrary.ts    # Plantillas de preguntas
│   │   ├── valueGenerator.ts     # Generador de valores
│   │   ├── goalSkillMappings.ts  # Mapeo goals-skills
│   │   └── qgenAlgorithm.ts      # Algoritmo principal
│   ├── auth/                     # Sistema de auth del cliente
│   │   ├── authApi.ts            # API calls de autenticación
│   │   ├── tokenService.ts       # Manejo de tokens JWT
│   │   └── userStorage.ts        # Almacenamiento de usuario
│   ├── types/                    # Tipos TypeScript organizados
│   │   ├── auth.ts               # Tipos de autenticación
│   │   ├── core.ts               # Tipos core (Question, etc.)
│   │   ├── sessions.ts           # Tipos de sesiones en vivo
│   │   └── practice.ts           # Tipos de práctica
│   ├── hooks/                    # Custom React hooks
│   │   ├── useSessions.ts        # Hook para sesiones en vivo
│   │   └── lessons/              # Hooks para mini-lecciones
│   │       ├── useMultipleChoice.ts  # Estado para secuencias de opciones
│   │       └── useHintToggle.ts      # Visibilidad de pistas
│   ├── questions.ts              # Utilidades de preguntas
│   ├── api-client.ts             # Cliente HTTP centralizado
│   ├── liveSessions.ts           # Gestión de sesiones en vivo
│   ├── skillTaxonomy.ts          # Definiciones de skills (500+)
│   ├── skillsArray.ts            # Array de skills
│   ├── markdown-parser.ts        # Parser de markdown
│   └── utils.ts                  # Utilidades generales
├── docs/                         # Documentación
│   ├── curriculum/               # Docs de currículum completo
│   │   ├── m1/                   # Material de estudio M1
│   │   └── m2/                   # Material de estudio M2
│   └── architecture/             # Documentación de arquitectura
├── docker-compose.test.yml       # Setup Docker para tests E2E
├── playwright.config.ts          # Configuración de Playwright
├── E2E_TEST_SETUP.md            # Guía de setup de tests E2E
├── E2E_TEST_ANALYSIS.md         # Análisis de tests E2E
└── CODEBASE_OVERVIEW.md         # Documentación técnica detallada
```

## Banco de Preguntas

**Total: 900+ Problemas**

| Nivel | Cantidad | Cobertura |
|-------|----------|-----------|
| M1 | 406 | Números (91), Álgebra (109), Geometría (106), Probabilidad (100) |
| M2 | 210 | Números (88), Álgebra (31), Geometría (37), Probabilidad (54) |

### Formato de Preguntas

Cada pregunta incluye:
- Versiones en texto plano y LaTeX
- 4 opciones de respuesta múltiple
- Explicaciones detalladas con soluciones paso a paso
- Calificación de dificultad (fácil/medio/difícil)
- Clasificación por tema y asignatura
- Tags de taxonomía de habilidades
- Datos visuales opcionales para problemas de geometría

### Estructura de Pregunta de Ejemplo

```typescript
{
  id: 'm1-num-ent-1',
  level: 'M1',
  topic: 'Números y Proporcionalidad',
  subject: 'números',
  subtopic: 'Proporcionalidad inversa',
  question: 'Si 3 obreros construyen un muro en 12 días, ¿cuántos días tardarán 4 obreros?',
  questionLatex: '\\text{Si 3 obreros construyen un muro en 12 días, ¿cuántos días tardarán 4 obreros?}',
  options: ['\\text{8 días}', '\\text{9 días}', '\\text{10 días}', '\\text{16 días}'],
  correctAnswer: 1,
  explanation: '\\text{Es una proporción inversa.} \\quad 3 \\times 12 = 4 \\times x \\implies x = \\frac{36}{4} = 9',
  difficulty: 'easy',
  skills: ['numeros-proporcionalidad-inversa', 'numeros-razonamiento-proporcional']
}
```

## Esquema de Base de Datos

### Tablas Principales

**Usuarios y Autenticación:**
- `users` - Información de usuarios con roles (student/admin/teacher), grade_level y assigned_by_teacher_id
- `streaks` - Rachas diarias de práctica por usuario

**Sistema de Suscripciones:**
- `plans` - Planes de suscripción disponibles
- `subscriptions` - Suscripciones activas por usuario
- `payments` - Historial de pagos y transacciones MercadoPago

**Quiz y Tracking:**
- `quiz_sessions` - Sesiones de quiz agrupadas con conversaciones IA
- `quiz_attempts` - Intentos individuales de preguntas
- `last_quiz_config` - Última configuración de quiz por usuario

**Sesiones en Vivo:**
- `sessions` - Sesiones de práctica en vivo (ensayos)
- `session_participants` - Participantes registrados en sesiones
- `session_answers` - Respuestas de participantes en sesiones

**Contenido y Preguntas:**
- `problems` - Banco de preguntas extraídas de PDFs
- `uploads` - Historial de uploads de PDFs

**Sistema QGen:**
- `contexts` - Biblioteca de contextos de la vida real
- `goals` - Biblioteca de objetivos de razonamiento
- `templates` - Plantillas parametrizadas de preguntas

**Analytics:**
- `ai_interactions` - Todas las conversaciones usuario-IA con métricas

## Empezando

### Prerrequisitos

- Node.js 20+
- Base de datos PostgreSQL
- npm o yarn
- Cuenta de Anthropic API (para funciones de IA)

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/godiemp/math.git
cd math
```

2. **Instalar dependencias del frontend**
```bash
npm install
```

3. **Configurar backend**
```bash
cd backend
npm install
```

4. **Configurar variables de entorno**

Crear `.env.local` en el directorio raíz:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
ANTHROPIC_API_KEY=tu-api-key-de-anthropic
NEXT_PUBLIC_SENTRY_DSN=tu-sentry-dsn-frontend (opcional)
```

Crear `.env` en el directorio backend:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/paes_chile
JWT_SECRET=tu-secret-key
PORT=3001
ANTHROPIC_API_KEY=tu-api-key-de-anthropic
MERCADOPAGO_ACCESS_TOKEN=TEST-tu-token-de-mercadopago
BACKEND_URL=http://localhost:3001
FRONTEND_URL=http://localhost:3000
SENTRY_DSN=tu-sentry-dsn-backend (opcional)
```

**Nota sobre Sentry**: Para configurar el monitoreo de errores con Sentry, consulta [SENTRY_SETUP.md](./SENTRY_SETUP.md).

5. **Configurar base de datos**

Ejecutar los scripts de seed para crear usuario admin y planes de suscripción:
```bash
cd backend
npm run seed:admin
npm run seed:plans
```

Esto creará:
- Un usuario administrador (admin@paes.cl / admin123)
- Planes de suscripción por defecto (Free, Basic, Premium)

6. **Iniciar los servidores de desarrollo**

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - Backend:
```bash
cd backend
npm run dev
```

7. **Acceder a la aplicación**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Testing

### Tests Unitarios con Vitest

El proyecto ahora incluye tests unitarios modernos con Vitest:

**Ejecutar tests unitarios:**
```bash
# Ejecutar todos los tests unitarios
npm run test

# Ejecutar en modo watch
npm run test:watch

# UI interactivo de Vitest
npm run test:ui
```

### Tests End-to-End con Playwright

El proyecto incluye tests E2E completos para flujos críticos:

**Configurar ambiente de pruebas:**
```bash
# Iniciar base de datos PostgreSQL de pruebas con Docker
docker-compose -f docker-compose.test.yml up -d

# Configurar variables de entorno de prueba
cp .env.test.example .env.test
```

**Ejecutar tests:**
```bash
# Tests en modo headless
npm run test:e2e

# Tests con navegador visible
npm run test:e2e:headed

# UI mode interactivo
npm run test:e2e:ui

# Ver reporte de tests
npm run test:e2e:report
```

**Cobertura de tests:**
- ✅ Autenticación (registro, login, logout)
- ✅ Práctica M1 y M2 (modo Zen y Rapid Fire)
- ✅ Sesiones de práctica en vivo (registro, participación)
- ✅ Navegación y protección de rutas

## Claude Code Skills

Este proyecto incluye skills personalizados para Claude Code que facilitan el desarrollo:

### 📋 Skill: code-patterns

**Uso:** Mantener consistencia de código en toda la base de código

**Qué hace:**
- Enforza patrones estándar de respuestas de API
- Guía para manejo consistente de errores
- Patrones de autenticación con AuthRequest
- Validación de inputs y type safety
- Estructura de controladores y servicios

**Cuándo usar:**
- Implementando nuevas features
- Revisando código existente
- Refactorizando código inconsistente
- Preguntando sobre "best practices"

### 🔧 Skill: endpoint

**Uso:** Crear endpoints Express.js siguiendo el patrón MVC

**Qué hace:**
- Genera archivos de rutas estructurados
- Crea controladores con manejo de errores
- Opcionalmente crea capa de servicios
- Provee instrucciones de registro en index.ts

**Cuándo usar:**
- Creando nuevos endpoints REST API
- Implementando CRUD operations
- Agregando nuevas features al backend

**Ejemplo de uso en Claude Code:**
```
Crear un endpoint para gestionar notificaciones de usuarios
```

El skill te guiará para crear:
- `/backend/src/routes/notificationRoutes.ts`
- `/backend/src/controllers/notificationController.ts`
- `/backend/src/services/notificationService.ts` (si es necesario)
- Instrucciones de registro

### 📚 Skill: mini-lessons

**Uso:** Crear mini-lecciones siguiendo la metodología pedagógica de 6 pasos

**Qué hace:**
- Guía el diseño pedagógico (objetivos, ZPD, misconceptions)
- Genera componentes Step1-Step6 con patrones correctos
- Enforza reglas críticas (isActive, onComplete, Tips en tabs)
- Provee templates específicos por materia

**Cuándo usar:**
- Creando nuevas mini-lecciones
- Agregando steps a lecciones existentes
- Revisando calidad pedagógica de lecciones

**Documentación incluida:**
- `SKILL.md` - Guía principal
- `pedagogical-design.md` - Framework de diseño
- `step-templates.md` - Templates de código
- `toolbox.md` - Hooks y primitivas reutilizables
- `subjects/*.md` - Patrones por materia

## Uso

### Para Estudiantes

1. **Registrarse/Iniciar Sesión** - Crea una cuenta en la landing page
2. **Elegir Nivel** - Selecciona M1 o M2 desde el dashboard
3. **Practicar** - Inicia un quiz en Modo Zen o Rapid Fire
4. **Usar el Tutor IA** - Haz clic en el botón de chat cuando necesites ayuda
5. **Unirse a Sesiones en Vivo** - Regístrate en ensayos próximos
6. **Seguir Progreso** - Ve tus estadísticas y mejoras
7. **Mantener Racha** - Practica diariamente para aumentar tu streak
8. **Estudiar Documentación** - Accede al material de estudio completo

### Para Administradores

1. **Acceder al Panel Admin** - Navega a `/admin` (requiere rol admin)
2. **System Health** - Monitorea el estado del sistema en `/admin/system-health`
   - Ver estado de servicios (API, base de datos, Anthropic)
   - Métricas de uptime, latencia y conexiones
   - Auto-refresh cada 30 segundos
3. **Dashboard de Analytics** - Ve métricas generales de uso y desempeño en `/admin/analytics`
4. **AI Analytics** - Analiza interacciones con el tutor IA en `/admin/ai-analytics`
5. **Gestión de Usuarios** - CRUD completo de usuarios en `/admin/users`
   - Ver, crear, editar y eliminar usuarios
   - Gestionar suscripciones y planes por usuario
   - Ver actividad y estadísticas de usuarios
6. **Gestión de Planes** - Configurar planes de suscripción en `/admin/users`
7. **Crear Sesiones en Vivo** - Programa nuevos ensayos en `/admin/live-sessions`
8. **Navegar Problemas** - Ve y filtra el banco de preguntas en `/admin/problems`
9. **Upload PDFs** - Sube PDFs y extrae preguntas automáticamente con IA en `/admin/upload`
10. **QGen System** - Gestiona el generador dinámico de preguntas en `/admin/qgen`
    - Administrar contextos, objetivos y templates
    - Generar y validar preguntas dinámicas
11. **Gestión de Colegios** - Crea cuentas demo para instituciones en `/admin/colegios`
    - Buscar colegios por nombre o RBD
    - Crear credenciales con período de prueba configurable
    - Ver y eliminar cuentas demo existentes
12. **Debug Tools** - Herramientas de debug en `/admin/zen-debug` y `/admin/rapidfire-debug`
13. **Backup & Restore** - Ejecuta comandos de backup desde el backend (ver sección de Operaciones)

### Para Profesores

1. **Acceder al Dashboard** - Navega a `/teacher` (requiere rol teacher)
2. **Gestión de Estudiantes** - Asigna estudiantes a grados en `/teacher/students`
   - Filtrar por grado, email o nombre
   - Asignar nivel (1° a 4° Medio)
   - Ver estudiantes asignados por ti

## API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/refresh` - Refrescar token JWT
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/auth/me` - Obtener perfil del usuario actual

### Rachas
- `GET /api/streak` - Obtener datos de racha del usuario
- `POST /api/streak/update` - Actualizar racha después de práctica

### Sesiones en Vivo
- `GET /api/sessions` - Obtener todas las sesiones disponibles
- `POST /api/sessions` - Crear nueva sesión (Admin)
- `GET /api/sessions/:id` - Obtener detalles de sesión
- `POST /api/sessions/:id/register` - Registrarse en sesión
- `POST /api/sessions/:id/join` - Unirse a sesión activa
- `POST /api/sessions/:id/answers` - Enviar respuesta en sesión

### Quiz Tracking
- `POST /api/quiz/attempt` - Guardar intento individual
- `POST /api/quiz/attempts` - Guardar múltiples intentos
- `GET /api/quiz/history` - Obtener historial de intentos del usuario
- `GET /api/quiz/stats` - Obtener estadísticas de quiz del usuario
- `GET /api/quiz/sessions` - Obtener sesiones de quiz del usuario
- `POST /api/quiz/sessions` - Crear nueva sesión de quiz
- `PUT /api/quiz/sessions/:id` - Actualizar sesión de quiz

### Admin - Gestión de Contenido
- `POST /api/admin/upload-pdf` - Upload y extracción de preguntas desde PDF
- `POST /api/admin/save-questions` - Guardar preguntas extraídas
- `GET /api/admin/questions` - Obtener preguntas desde base de datos
- `GET /api/admin/uploads` - Obtener historial de uploads
- `GET /api/images/:filename` - Servir imágenes de preguntas

### Admin - Gestión de Usuarios
- `GET /api/admin/users` - Listar todos los usuarios
- `GET /api/admin/users/:id` - Obtener detalles de usuario
- `POST /api/admin/users` - Crear nuevo usuario
- `PUT /api/admin/users/:id` - Actualizar usuario
- `DELETE /api/admin/users/:id` - Eliminar usuario

### Admin - Planes y Suscripciones
- `GET /api/admin/plans` - Listar todos los planes
- `GET /api/admin/plans/:id` - Obtener detalles de plan
- `POST /api/admin/plans` - Crear nuevo plan
- `PUT /api/admin/plans/:id` - Actualizar plan
- `DELETE /api/admin/plans/:id` - Eliminar plan
- `GET /api/admin/subscriptions` - Listar todas las suscripciones
- `GET /api/admin/subscriptions/:id` - Obtener detalles de suscripción
- `POST /api/admin/subscriptions` - Crear suscripción
- `PUT /api/admin/subscriptions/:id` - Actualizar suscripción
- `DELETE /api/admin/subscriptions/:id` - Cancelar suscripción

### Pagos
- `POST /api/payments/create-preference` - Crear preferencia de pago en MercadoPago
- `GET /api/payments/my-payments` - Obtener historial de pagos del usuario
- `GET /api/payments/:id` - Obtener detalles de un pago específico
- `POST /api/payments/webhook` - Webhook para notificaciones de MercadoPago (público)

### Analytics
- `GET /api/analytics/dashboard` - Dashboard de analytics general (Admin)
- `GET /api/analytics/trends` - Tendencias de uso (Admin)
- `GET /api/analytics/user-activity` - Actividad de usuarios (Admin)
- `GET /api/analytics/performance` - Métricas de desempeño (Admin)

### AI Analytics
- `GET /api/ai-analytics/overview` - Vista general de uso de IA (Admin)
- `GET /api/ai-analytics/interactions` - Historial de interacciones (Admin)
- `GET /api/ai-analytics/costs` - Costos de API de IA (Admin)
- `GET /api/ai-analytics/performance` - Performance del tutor IA (Admin)

### QGen - Generador de Preguntas
- `GET /api/qgen/contexts` - Obtener contextos disponibles
- `GET /api/qgen/goals` - Obtener objetivos de razonamiento
- `GET /api/qgen/templates` - Obtener plantillas de preguntas
- `POST /api/qgen/generate` - Generar pregunta dinámica
- `POST /api/qgen/validate` - Validar pregunta generada

### Teacher - Dashboard de Profesores
- `GET /api/teacher/students` - Listar estudiantes (filtrable por grado)
- `PUT /api/teacher/students/:id/grade` - Asignar grado a estudiante
- `GET /api/teacher/stats` - Estadísticas del profesor

### Admin - Cuentas Demo para Colegios
- `GET /api/admin/demo-accounts` - Listar cuentas demo creadas
- `POST /api/admin/demo-accounts` - Crear cuenta demo para colegio
- `DELETE /api/admin/demo-accounts/:id` - Eliminar cuenta demo
- `GET /api/schools/search` - Buscar colegios por nombre o RBD

### IA
- `POST /api/ai-chat` - Chat con tutor IA (metodología Socrática)
- `POST /api/ai-help` - Obtener ayuda IA para respuestas incorrectas
- `POST /api/ai/summarize` - Resumir contenido educativo
- `POST /api/ai/practice` - Generar problemas de práctica

### System Health & Monitoring
- `GET /health` - Health check básico del servidor
- `GET /api/health` - Health check completo con métricas detalladas
- `GET /api/health/database` - Estado específico de base de datos
- `GET /api/health/anthropic` - Estado de Anthropic API
- `GET /api/health/system` - Métricas del sistema (uptime, memoria, CPU)

## Características Actuales

### ✅ Completamente Implementado

**Core Features:**
- Sistema completo de práctica con dos modos (Zen y Rapid Fire)
- 53 mini-lecciones M1 con metodología pedagógica de 6 pasos
- 900+ preguntas en el banco (406 M1 + 210 M2 + PDFs)
- Tutor IA con metodología Socrática (Claude Sonnet 4.5)
- Sistema de rachas diarias con persistencia en base de datos
- Sesiones de práctica en vivo con sistema de lobby
- Tracking de progreso con análisis de habilidades (500+ skills)
- Sistema completo de documentación con markdown y LaTeX
- Herramienta de upload y extracción de PDFs con IA
- Autenticación JWT con roles de usuario (student/admin/teacher)
- Panel de administración completo
- Sistema para colegios con dashboard de profesores
- Renderizado matemático profesional con KaTeX
- Sistema de diseño personalizado inspirado en Apple
- Modo de lectura para documentación
- Mensajes de carga personalizados por ruta
- Auto-actualización de estados de sesiones

**Sistema de Suscripciones y Pagos:**
- ✅ **Planes de Suscripción** - Sistema completo de planes con precios y características
- ✅ **Gestión de Usuarios** - CRUD completo de usuarios y suscripciones
- ✅ **Estados de Suscripción** - Trial, activa, expirada, cancelada
- ✅ **Auto-renovación** - Gestión de renovaciones automáticas
- ✅ **Admin Interface** - Panel de administración para gestionar usuarios y planes
- ✅ **Integración MercadoPago** - Procesamiento de pagos completo para Chile
- ✅ **Webhooks Automáticos** - Actualización en tiempo real de pagos
- ✅ **Activación Automática** - Suscripciones se activan al confirmar pago
- ✅ **Tracking de Pagos** - Historial completo de transacciones
- ✅ **Páginas de Estado** - Success, pending, failure pages
- ✅ **Seguridad de Pagos** - Rate limiting, validación de webhooks, auditoría

**Quiz Tracking en Base de Datos:**
- ✅ **Quiz Sessions** - Agrupación de intentos con tracking de conversaciones IA
- ✅ **Quiz Attempts** - Persistencia de cada intento con detalles completos
- ✅ **Historial de Quiz** - Acceso a historial completo del usuario
- ✅ **Estadísticas** - Analytics detallado de desempeño por usuario
- ✅ **Last Quiz Config** - Recordar configuración preferida del usuario

**Sistema QGen - Generación Dinámica:**
- ✅ **Biblioteca de Contextos** - Situaciones de la vida real para problemas
- ✅ **Biblioteca de Objetivos** - Tipos de razonamiento y metas de preguntas
- ✅ **Plantillas** - Templates parametrizados para generar preguntas
- ✅ **Generador de Valores** - Creación inteligente de valores numéricos
- ✅ **Algoritmo de Generación** - Combina contextos, objetivos y templates
- ✅ **Admin Interface** - Panel para gestionar el sistema QGen

**Sistema de Mini-Lecciones:**
- ✅ **53 Lecciones M1** - Cobertura completa de Números, Álgebra, Geometría, Probabilidad
- ✅ **Pipeline de 6 Pasos** - Hook → Explore → Explain → Classify → Practice → Verify
- ✅ **Alineación MINEDUC** - Vinculación a Objetivos de Aprendizaje oficiales
- ✅ **Toolbox de Componentes** - Hooks y primitivas reutilizables
- ✅ **Constructor con IA** - Interfaz de chat para crear nuevas lecciones
- ✅ **Componentes Compartidos** - CheckpointQuiz, ProgressDots, FeedbackPanel

**Sistema para Colegios:**
- ✅ **Dashboard de Profesores** - Gestión de estudiantes por nivel de grado
- ✅ **Panel Admin Colegios** - Creación de cuentas demo para instituciones
- ✅ **Base de Datos RBD** - Búsqueda de colegios chilenos por código oficial
- ✅ **Asignación por Grado** - Contenido filtrado automáticamente por nivel

**Sistema de Problemas Abstractos:**
- ✅ **46 Unidades Temáticas** - Taxonomía completa de PAES M1 y M2
- ✅ **Generación Masiva** - Capacidad de generar ~1000 problemas
- ✅ **Integración OpenAI** - Generación de alta calidad con GPT-4
- ✅ **Scripts Helper** - Herramientas de testing y visualización
- ✅ **Dry Run Mode** - Testing sin consumir API o escribir a BD
- ✅ **Control Granular** - Opciones --limit, --units para generación controlada

**Sistema de Operaciones:**
- ✅ **Health Monitoring** - Dashboard de salud del sistema en tiempo real
- ✅ **Health Check API** - Endpoints para verificar estado de servicios
- ✅ **Backup Automático** - Sistema de respaldos de PostgreSQL con compresión
- ✅ **Cloud Upload** - Subida de backups a servicios cloud
- ✅ **Restore System** - Proceso seguro de restauración desde backups
- ✅ **Backup Verification** - Verificación de integridad de respaldos
- ✅ **Backup Monitoring** - Monitoreo del estado de backups recientes

**Analytics y Monitoring:**
- ✅ **Analytics Dashboard** - Métricas de uso, tendencias y desempeño
- ✅ **AI Analytics** - Tracking de todas las interacciones con el tutor IA
- ✅ **User Activity Tracking** - Monitoreo de actividad de usuarios
- ✅ **Performance Metrics** - Métricas de desempeño del sistema
- ✅ **Cost Tracking** - Seguimiento de costos de API de IA
- ✅ **AI Interactions Table** - Almacena todas las conversaciones usuario-IA

**Developer Tools:**
- ✅ **Debug Pages** - Páginas de debug para Zen y Rapid Fire
- ✅ **Tests E2E con Playwright** - Cobertura completa de flujos críticos
- ✅ **Claude Code Skills** - Skills personalizados para desarrollo consistente
  - `code-patterns` - Enforza patrones y estándares
  - `endpoint` - Generador de endpoints Express.js
- ✅ **Docker Compose** - Ambiente de testing aislado
- ✅ **TypeScript** - Type safety en frontend y backend
- ✅ **Sistema de Auth Modular** - Arquitectura mejorada de autenticación
- ✅ **API Client Centralizado** - Manejo consistente de requests

### 🚧 Limitaciones Actuales

- **Sin Aprendizaje Adaptativo**: Generación de quiz es aleatoria, no ajustada por dificultad del usuario
- **QGen en Desarrollo**: Sistema de generación dinámica necesita más contextos, objetivos y templates
- **Analytics en Tiempo Real**: Dashboard de analytics sin actualización en tiempo real
- **Notificaciones Email**: Sistema de email configurado pero necesita más templates
- **Coverage de Tests Unitarios**: Tests unitarios disponibles pero cobertura puede expandirse

## Mejoras Futuras

### Alta Prioridad
- [x] ~~Expandir banco de preguntas M2 a 200+ problemas~~ ✅ (210 preguntas)
- [ ] Implementar algoritmo de aprendizaje adaptativo basado en desempeño
- [x] ~~Agregar tests unitarios (vitest/jest) para componentes y servicios~~ ✅ (Vitest configurado)
- [ ] Expandir biblioteca QGen (más contextos, objetivos y templates)
- [ ] Sistema de recomendaciones personalizado basado en habilidades débiles
- [ ] Templates de email para confirmaciones y notificaciones

### Prioridad Media
- [ ] Implementar sistema de calibración de dificultad de problemas
- [ ] Analytics en tiempo real con WebSockets
- [ ] Renderizador de soluciones paso a paso mejorado
- [ ] Soporte para importar/exportar problemas en batch
- [ ] CI/CD pipeline con tests automáticos en GitHub Actions
- [ ] Agregar validación con Zod para inputs de API
- [ ] Sistema de notificaciones push
- [ ] Interfaz CRUD completa para gestión de preguntas desde admin
- [ ] Búsqueda y filtrado avanzado de preguntas

### Prioridad Baja
- [ ] Aplicación móvil (React Native)
- [ ] Salas de estudio colaborativo en tiempo real
- [ ] Gamificación y logros adicionales (badges, leaderboards)
- [ ] Explicaciones en video para problemas
- [ ] Sistema de tutorías 1-on-1
- [ ] Modo oscuro
- [ ] Internacionalización (i18n) para otros países
- [ ] Integración con sistemas LMS (Moodle, Canvas)

## Documentación

Para más información detallada, ver:

### 🎯 Documentación de Inicio Rápido
- **[START_HERE.md](./START_HERE.md)** - ⭐ **COMIENZA AQUÍ** - Guía de navegación de toda la documentación
- [EXPLORATION_SUMMARY.md](./EXPLORATION_SUMMARY.md) - Resumen rápido del proyecto (5 min)
- [QUICK-START-ABSTRACT-PROBLEMS.md](./QUICK-START-ABSTRACT-PROBLEMS.md) - Inicio rápido para sistema de problemas abstractos

### 📖 Documentación Técnica
- [CODEBASE_OVERVIEW.md](./CODEBASE_OVERVIEW.md) - Visión general del código
- [CODEBASE_ANALYSIS_COMPREHENSIVE.md](./CODEBASE_ANALYSIS_COMPREHENSIVE.md) - Análisis técnico completo (45 min)
- [Setup del Backend](./backend/README.md) - Instrucciones específicas del backend
- [Documentación de Arquitectura](./docs/architecture/) - Documentos de planificación inicial

### 🧪 Testing
- [E2E Test Setup](./E2E_TEST_SETUP.md) - Guía de configuración de tests E2E
- [E2E Test Analysis](./E2E_TEST_ANALYSIS.md) - Análisis de cobertura y estrategia de tests
- [E2E Analysis Summary](./E2E_ANALYSIS_SUMMARY.md) - Resumen de análisis E2E
- [E2E Test Coverage Summary](./E2E_TEST_COVERAGE_SUMMARY.md) - Cobertura visual de tests (10 min)

### 🛠️ Claude Code Skills
- [Code Patterns Skill](./.claude/skills/code-patterns/SKILL.md) - Guía de patrones y estándares
- [Endpoint Generator](./.claude/skills/endpoint/SKILL.md) - Generador de endpoints Express.js
- [Mini-Lessons Skill](./.claude/skills/mini-lessons/SKILL.md) - Guía para crear mini-lecciones pedagógicas

### 💳 Pagos y Suscripciones
- [PAYMENT_INTEGRATION.md](./PAYMENT_INTEGRATION.md) - Guía completa de integración de pagos MercadoPago

### 🔒 Seguridad
- [SECURITY_AUDIT_REPORT.md](./SECURITY_AUDIT_REPORT.md) - Reporte de auditoría de seguridad
- [SECURITY_FIXES_HIGH_SEVERITY.md](./SECURITY_FIXES_HIGH_SEVERITY.md) - Fixes de seguridad de alta severidad

### 🚀 Deployment y Operaciones
- [DEPLOYMENT_GAPS_ANALYSIS.md](./DEPLOYMENT_GAPS_ANALYSIS.md) - Análisis de gaps para deployment a producción
- [SENTRY_SETUP.md](./SENTRY_SETUP.md) - Configuración de Sentry para monitoreo de errores

### 📚 Otras Documentaciones
- [Análisis de Feature Ensayos](./docs/ENSAYOS_FEATURE_ANALYSIS.md) - Análisis de sesiones en vivo
- [AI Setup](./docs/AI_SETUP.md) - Configuración del sistema de IA

## Mejoras Recientes

### Sistema de Mini-Lecciones (NUEVO ⭐ Diciembre 2025)
- ✅ **53 mini-lecciones M1** con metodología pedagógica de 6 pasos
- ✅ Pipeline pedagógico: Hook → Explore → Explain → Classify → Practice → Verify
- ✅ Cobertura por materia: Números (17), Álgebra (21), Geometría (7), Probabilidad (8)
- ✅ **Alineación MINEDUC** - Cada lección vinculada a Objetivos de Aprendizaje oficiales (OA)
- ✅ **Mini-Lesson Toolbox** - Hooks y primitivas reutilizables para desarrollo rápido
- ✅ **Constructor de Lecciones** - Interfaz de chat con IA para crear nuevas lecciones
- ✅ Componentes compartidos: CheckpointQuiz, ProgressDots, FeedbackPanel, HintPanel

### Sistema para Colegios (NUEVO ⭐ Diciembre 2025)
- ✅ **Dashboard de Profesores** - Gestión de estudiantes por nivel de grado
- ✅ **Asignación por Grado** - Estudiantes asignados a 1° a 4° Medio
- ✅ **Vista Colegio** - Dashboard especializado para estudiantes con grado asignado
- ✅ **Panel Admin de Colegios** - Creación de cuentas demo para instituciones
- ✅ **Base de Datos RBD** - Búsqueda de colegios chilenos por código oficial
- ✅ **Credenciales Demo** - Generación con período de prueba configurable (1-90 días)

### Mejoras SEO y Landing (NUEVO ⭐ Diciembre 2025)
- ✅ **Breadcrumb Schema** - JSON-LD para mejor posicionamiento en buscadores
- ✅ **Dynamic OG Images** - Imágenes de preview únicas por post de blog
- ✅ **Google Site Verification** - Verificación para Search Console
- ✅ **Tour Interactivo** - Demos animados en landing page
- ✅ **Pricing Institucional** - Sección B2B con integración Intercom
- ✅ **Audience Toggle** - Landing diferenciada para estudiantes vs colegios

### E2E Tests y Calidad (Diciembre 2025)
- ✅ **Tests Adaptive Practice** - Cobertura E2E completa del tutor IA
- ✅ **Tests Colegio Dashboard** - Validación de flujos para estudiantes asignados
- ✅ **Error Handling Mejorado** - Mensajes más claros en tutor IA
- ✅ **Dark Mode Fixes** - Correcciones de visibilidad en modo oscuro

### Módulo de Aprendizaje Interactivo (NUEVO ⭐ Noviembre 2025)
- ✅ Experiencia de aprendizaje con metodología Socrática proactiva
- ✅ Selección de tema por nivel (M1/M2) y materia
- ✅ Presentación de 5 preguntas diversas para elegir
- ✅ Chat interactivo en tiempo real con tutor IA
- ✅ SmartLatexRenderer para renderizado inteligente de fórmulas
- ✅ Sistema de retry con backoff exponencial
- ✅ Seguimiento de sesión y estadísticas

### Expansión Masiva de M2 (NUEVO ⭐ Noviembre 2025)
- ✅ **210 preguntas M2** (antes 26) - incremento de 700%+
- ✅ Números: 88 preguntas (operaciones, potencias, racionalización, intervalos)
- ✅ Álgebra: 31 preguntas (ecuaciones, funciones, factorización)
- ✅ Geometría: 37 preguntas (transformaciones, coordenadas, volumen)
- ✅ Probabilidad: 54 preguntas (tendencia central, reglas, tablas y gráficos)
- ✅ Cobertura completa del currículum PAES M2

### Nuevas Integraciones (NUEVO ⭐ Noviembre 2025)
- ✅ **PostHog** - Product analytics y feature flags
- ✅ **Intercom** - Soporte al cliente en tiempo real (independiente de cookies)
- ✅ **XState** - Máquinas de estado para lógica compleja
- ✅ **next-intl** - Soporte multi-idioma (internacionalización)
- ✅ **mathjs** - Biblioteca matemática avanzada
- ✅ **Vitest** - Testing unitario moderno con UI interactivo

### Mejoras de Infraestructura (Noviembre 2025)
- ✅ Next.js actualizado a v16.0.2
- ✅ Cookie Consent con gestión de preferencias
- ✅ SmartLatexRenderer para mejor renderizado de fórmulas
- ✅ Sistema de retry con backoff exponencial para robustez
- ✅ Limpieza de archivos legacy en lib/questions (31 archivos de re-export eliminados)
- ✅ Mejoras en el panel de administración para sesiones en vivo

### Sistema de Problemas Abstractos (Noviembre 2024)
- ✅ Sistema completo de generación masiva de problemas
- ✅ 46 unidades temáticas (33 M1 + 13 M2)
- ✅ Integración con OpenAI GPT-4
- ✅ Scripts helper con dry-run mode
- ✅ Control granular de generación (--limit, --units)
- ✅ Almacenamiento automático en PostgreSQL
- ✅ Documentación completa en QUICK-START-ABSTRACT-PROBLEMS.md

### Sistema de Operaciones y Monitoreo (Noviembre 2024)
- ✅ Dashboard de System Health en `/admin/system-health`
- ✅ Endpoints de health check detallados
- ✅ Monitoreo de base de datos, API, y servicios externos
- ✅ Sistema completo de backup/restore de PostgreSQL
- ✅ Backups comprimidos con upload a cloud
- ✅ Scripts de verificación y monitoreo de backups
- ✅ Auto-refresh de métricas cada 30 segundos

### Mejoras de Dashboard (Noviembre 2024)
- ✅ Dashboard mejorado para usuarios M1-only
- ✅ Correcciones de bugs en analytics
- ✅ API client centralizado para mejor manejo de errores
- ✅ Indicadores visuales de estado mejorados

### Integración de Pagos MercadoPago
- ✅ SDK oficial de MercadoPago integrado
- ✅ Procesamiento completo de pagos para Chile
- ✅ Webhooks automáticos para actualización de estados
- ✅ Activación automática de suscripciones al aprobar pago
- ✅ Páginas de estado (success, pending, failure)
- ✅ Tracking completo de transacciones
- ✅ Modo sandbox para testing
- ✅ Seguridad con rate limiting y validación de webhooks

### Sistema de Suscripciones
- ✅ Sistema completo de planes y suscripciones
- ✅ Gestión de usuarios con roles
- ✅ Estados de suscripción (trial, active, expired, cancelled)
- ✅ Admin interface para gestionar usuarios y planes
- ✅ Script de seed para crear planes iniciales

### Quiz Tracking en Base de Datos (NUEVO)
- ✅ Migración de localStorage a PostgreSQL
- ✅ Quiz sessions con tracking de conversaciones IA
- ✅ Quiz attempts con detalles completos
- ✅ Historial y estadísticas de usuario
- ✅ Configuración de quiz persistente

### Sistema QGen - Generación Dinámica (NUEVO)
- ✅ Biblioteca de contextos de la vida real
- ✅ Biblioteca de objetivos de razonamiento
- ✅ Sistema de templates parametrizados
- ✅ Generador inteligente de valores
- ✅ Algoritmo de generación de preguntas
- ✅ Admin interface para gestionar QGen

### Analytics y Monitoring (NUEVO)
- ✅ Dashboard de analytics general
- ✅ AI Analytics con tracking de interacciones
- ✅ Tabla de ai_interactions en base de datos
- ✅ Métricas de desempeño y uso
- ✅ Tracking de costos de API

### Herramientas Admin (NUEVO)
- ✅ Páginas de debug para Zen y Rapid Fire
- ✅ Gestión completa de usuarios
- ✅ Exportador de documentación completa
- ✅ Panel de analytics detallado

### Testing Infrastructure
- ✅ Tests E2E completos con Playwright
- ✅ Docker Compose para ambiente de testing aislado
- ✅ Cobertura de autenticación, práctica y sesiones en vivo

### Developer Tools
- ✅ Claude Code skills para desarrollo consistente
- ✅ Sistema modular de autenticación
- ✅ API client centralizado con manejo de errores
- ✅ Patrones de código estandarizados

### Features Anteriores
- ✅ Implementación de metodología Socrática en tutor IA
- ✅ Upgrade a modelo Claude Sonnet 4.5
- ✅ Mejoras en Modo Zen con tutor IA integrado
- ✅ Sistema de rachas diarias
- ✅ Auto-actualización de estados de sesiones

## Contribuir

¡Las contribuciones son bienvenidas! Áreas que necesitan ayuda:

1. **Creación de Contenido** - Agregar más problemas de matemáticas PAES
2. **Desarrollo de Características** - Construir nuevas features del roadmap
3. **Testing** - Escribir tests unitarios e integración
4. **Documentación** - Mejorar guías y tutoriales
5. **Expansión M2** - Crear más problemas avanzados

## Licencia

TBD

## Contacto

Para preguntas o soporte, por favor abre un issue en GitHub.

---

<div align="center">

**50+ Mini-Lecciones** | **900+ Problemas** | **Tutor IA Socrático** | **Sistema para Colegios**

*La plataforma que combina inteligencia artificial, mini-lecciones estructuradas y metodología pedagógica probada para prepararte con éxito para la PAES.*

</div>

---

## ¿Qué es SimplePAES?

SimplePAES es una **plataforma de preparación matemática** diseñada específicamente para estudiantes chilenos que rinden la Prueba de Acceso a la Educación Superior (PAES). Más que un simple banco de preguntas, es un **ecosistema completo de aprendizaje** que integra:

- **Inteligencia Artificial avanzada** que te enseña como un tutor personal
- **Práctica interactiva** con más de 900 problemas reales
- **Sesiones colaborativas** donde estudias con otros estudiantes
- **Seguimiento detallado** de tu progreso y habilidades

---

## 🎓 Para Estudiantes

### Tu Camino al Éxito en la PAES

SimplePAES no es un sitio más de práctica. Es tu **compañero de estudio inteligente** que se adapta a ti.

---

### 📚 Mini-Lecciones: Tu Ruta de Aprendizaje Estructurada

**50+ lecciones interactivas** diseñadas para que domines cada concepto paso a paso:

1. **Hook** - Comenzamos con un problema del mundo real que te engancha
2. **Explora** - Descubres patrones y relaciones por ti mismo
3. **Aprende** - Teoría clara con ejemplos y fórmulas
4. **Clasifica** - Practicas identificando y aplicando conceptos
5. **Resuelve** - Ejercicios guiados con pistas cuando las necesitas
6. **Verifica** - Quiz final para confirmar que dominaste el tema

*Cada lección toma solo 10-15 minutos y cubre exactamente lo que necesitas para la PAES*

---

### 🤖 Tutor IA que Realmente Enseña

**Metodología Socrática** - No te damos la respuesta, te ayudamos a descubrirla.

Cuando no entiendes algo, nuestro tutor potenciado por **Claude Sonnet 4.5** (la IA más avanzada de Anthropic) no te da la solución directamente. En cambio:

1. **Te pregunta sobre tu razonamiento** - "¿Por qué elegiste esa opción?"
2. **Te guía con preguntas** - "¿Qué pasaría si...?"
3. **Construye tu comprensión** - Paso a paso hasta que lo entiendas
4. **Se adapta a tu nivel** - Explicaciones que tienen sentido para ti

**Ejemplo real:**
```
Estudiante: No entiendo por qué la respuesta es 9 días

Tutor: ¿Qué tipo de relación ves entre el número de obreros
y los días necesarios? Si aumentan los obreros, ¿qué
crees que pasa con el tiempo?

Estudiante: ¿Disminuye?

Tutor: ¡Exacto! Es una proporción inversa. Ahora, si 3 obreros
tardan 12 días, el trabajo total es 3×12 = 36 "días-obrero".
Con 4 obreros, ¿cómo calcularías los días?
```

---

### 📚 Dos Modos de Práctica

#### **Modo Zen** - Aprende sin presión
- ⏱️ Sin límite de tiempo
- 💡 Explicaciones inmediatas después de cada respuesta
- 🤖 Acceso al tutor IA en cada pregunta
- 🧘 Animación de respiración para concentrarte
- 📊 Tu progreso se guarda automáticamente

*Ideal para: Aprender conceptos nuevos, reforzar áreas débiles, estudiar profundamente*

#### **Modo Rapid Fire** - Simula el examen real
- ⚡ 10 preguntas cronometradas
- 🎯 Elige tu dificultad:
  - Fácil: 25 minutos
  - Medio: 20 minutos
  - Difícil: 15 minutos
  - Extremo: 10 minutos
- 🧭 Navega entre preguntas como en la PAES real
- 📈 Evalúa tu desempeño bajo presión

*Ideal para: Practicar gestión del tiempo, simular condiciones reales, medir tu velocidad*

---

### 🎯 Módulo de Aprendizaje Interactivo

**Nuevo método para dominar temas específicos:**

1. **Elige tu nivel** (M1 o M2) y materia
2. **Selecciona de 5 preguntas diversas** la que quieres dominar
3. **Inicia conversación con el tutor** - él te guía desde el inicio
4. **Aprende mediante diálogo** - preguntas y respuestas en tiempo real
5. **Domina el concepto** - hasta que lo entiendas completamente

---

### 📊 900+ Problemas que Cubren Todo

| Área | Nivel M1 (Básico) | Nivel M2 (Avanzado) |
|------|-------------------|---------------------|
| **Números** | 91 problemas | 88 problemas |
| **Álgebra** | 109 problemas | 31 problemas |
| **Geometría** | 106 problemas | 37 problemas |
| **Probabilidad** | 100 problemas | 54 problemas |
| **Total** | **406** | **210** |

**M1**: Para todos los postulantes universitarios
**M2**: Para carreras de ciencia e ingeniería

Cada problema incluye:
- ✅ 4 opciones de respuesta
- ✅ Explicación detallada paso a paso
- ✅ Fórmulas matemáticas renderizadas profesionalmente
- ✅ Clasificación por dificultad (fácil/medio/difícil)
- ✅ Vinculación a habilidades específicas

---

### 🏆 Sesiones de Práctica en Vivo (Ensayos PAES)

**Estudia junto a otros estudiantes en tiempo real:**

1. **Inscríbete** en ensayos programados
2. **Únete al lobby** antes de que comience
3. **Compite** respondiendo las mismas 10 preguntas
4. **Ve resultados instantáneos** y compara tu desempeño
5. **Mejora con la comunidad**

*Simula la experiencia real del examen mientras te motivas con otros*

---

### 🔥 Sistema de Rachas y Motivación

**Mantén tu motivación alta:**

- **Racha diaria** - Cuenta tus días consecutivos de práctica
- **Emojis de logro** - 🎯 🔥 ⚡ 🏆 según tu constancia
- **Tracking de habilidades** - 500+ habilidades específicas
- **Niveles de maestría** - No Iniciado → Aprendiendo → Dominado
- **Progreso visual** - Gráficos claros de tu avance

---

### 📈 Seguimiento Inteligente de Progreso

Tu dashboard personal te muestra:

- **Precisión general** por nivel (M1 vs M2)
- **Rendimiento por materia** con barras de progreso
- **Historial de todas tus sesiones** - revisa preguntas pasadas
- **Áreas fuertes y débiles** identificadas automáticamente
- **Predicción de puntaje PAES** basada en tu desempeño
- **Tiempo promedio por pregunta**
- **Tendencias** - ¿Estás mejorando?

---

### 📖 Documentación Completa de Estudio

**Material de estudio profesional** para cada tema:

- Explicaciones claras con ejemplos
- **Fórmulas LaTeX** renderizadas perfectamente
- Navegación por temas
- Modo lectura sin distracciones
- Contenido alineado al currículum PAES oficial

---

## 👨‍👩‍👧‍👦 Para Padres

### Por Qué SimplePAES es la Mejor Inversión en el Futuro de Tu Hijo

---

### 🎯 Aprendizaje Real, No Memorización

**El problema con métodos tradicionales:**
- Memorizar fórmulas sin entenderlas
- Practicar sin retroalimentación útil
- No saber dónde están las debilidades
- Estudiar solo sin guía

**La solución SimplePAES:**
- **Metodología Socrática** - Tu hijo aprende a PENSAR, no a memorizar
- **Tutor IA personalizado** - Atención individual imposible en una clase
- **Retroalimentación inmediata** - Cada error es una oportunidad de aprendizaje
- **Diagnóstico preciso** - Sabemos exactamente qué necesita reforzar

---

### 📚 Currículum Estructurado y Oficial

**50+ mini-lecciones alineadas al currículum MINEDUC:**

Tu hijo no estudia contenido aleatorio. Cada lección está vinculada a los **Objetivos de Aprendizaje oficiales** del Ministerio de Educación de Chile:

- **Progresión clara** - De conceptos básicos a avanzados en orden lógico
- **6 pasos pedagógicos** - Metodología probada en cada lección
- **Cobertura completa** - Números, Álgebra, Geometría y Probabilidad
- **10-15 minutos por lección** - Sesiones cortas pero efectivas

*Tu hijo estudia exactamente lo que necesita para la PAES, en el orden correcto*

---

### 💡 Tecnología de Punta al Servicio de la Educación

**¿Qué significa "Tutor IA Socrático"?**

Usamos **Claude Sonnet 4.5** de Anthropic, la inteligencia artificial más avanzada del mundo. No es un chatbot simple. Es un sistema que:

- **Entiende el contexto** de cada problema matemático
- **Adapta sus explicaciones** al nivel de comprensión de tu hijo
- **Hace preguntas inteligentes** para guiar el razonamiento
- **Nunca se frustra** ni se cansa
- **Está disponible 24/7** cuando tu hijo necesita ayuda

*Es como tener un tutor particular de matemáticas siempre disponible*

---

### 📊 Transparencia Total del Progreso

**Como padre, puedes ver:**

- **Cuántas sesiones** ha completado tu hijo
- **Qué temas domina** y cuáles necesita reforzar
- **Tiempo dedicado** al estudio
- **Racha de días consecutivos** de práctica
- **Evolución del rendimiento** semana a semana
- **Predicción de puntaje** basada en datos reales

*No más "¿Estudiaste hoy?" - los datos hablan*

---

### 🔒 Seguridad y Privacidad

**Tu tranquilidad es nuestra prioridad:**

- ✅ **Autenticación segura** con JWT (estándar bancario)
- ✅ **Contraseñas encriptadas** con bcryptjs
- ✅ **Datos en Chile** - servidor y pagos locales
- ✅ **Sin publicidad** - experiencia limpia de estudio
- ✅ **HTTPS en todo** - conexiones encriptadas
- ✅ **Pagos seguros** vía MercadoPago (plataforma confiable chilena)

---

### 💰 Valor Incomparable

**Compara:**

| Servicio | Costo Mensual | Disponibilidad | Personalización |
|----------|---------------|----------------|-----------------|
| Preuniversitario tradicional | $150.000+ | Horarios fijos | 1 profesor, 30 alumnos |
| Clases particulares | $200.000+ | Coordinar agendas | Depende del tutor |
| **SimplePAES** | **Fracción del costo** | **24/7** | **IA adapta cada sesión** |

*Más barato que un preuniversitario, más disponible que un tutor particular, más inteligente que ambos*

---

### 🎓 Preparación Integral

SimplePAES no solo enseña a responder preguntas. Desarrolla:

- **Pensamiento crítico** - Analizar problemas desde múltiples ángulos
- **Gestión del tiempo** - Practicar bajo presión controlada
- **Confianza** - Ver progreso real genera motivación
- **Autonomía** - Tu hijo aprende a aprender solo
- **Habilidades matemáticas reales** - No trucos, sino comprensión

---

### 📱 Acceso Multiplataforma

Tu hijo puede estudiar:
- 💻 En computador de escritorio
- 📱 En tablet o celular
- 🏠 Desde casa
- 📚 En la biblioteca
- ☕ En cualquier lugar con internet

*La educación se adapta a la vida de tu hijo, no al revés*

---

## 👩‍🏫 Para Profesores

### Una Herramienta Pedagógica de Nueva Generación

---

### 📚 Fundamento Pedagógico Sólido

**Metodología Socrática + Inteligencia Artificial:**

SimplePAES implementa el **método socrático** (preguntas guiadas para desarrollar pensamiento crítico) potenciado por IA avanzada. Esto significa:

1. **No damos respuestas directas** - El estudiante construye su conocimiento
2. **Preguntas adaptativas** - La IA ajusta su enfoque según respuestas
3. **Metacognición** - Estudiantes reflexionan sobre su propio razonamiento
4. **Transferencia de conocimiento** - Aprenden a aplicar conceptos, no memorizar

**Base teórica:**
- Constructivismo (Piaget, Vygotsky)
- Zona de Desarrollo Próximo
- Aprendizaje significativo (Ausubel)
- Taxonomía de Bloom (aplicar, analizar, evaluar, crear)

---

### 🎯 Alineación Curricular PAES y MINEDUC

**Cobertura completa del programa oficial:**

#### Competencia Matemática 1 (M1)
- **Números**: Enteros, racionales, porcentajes, potencias, raíces, proporcionalidad
- **Álgebra**: Expresiones algebraicas, ecuaciones, funciones lineales, sistemas
- **Geometría**: Perímetro, área, volumen, transformaciones, coordenadas
- **Probabilidad**: Tablas, gráficos, medidas de tendencia central, reglas

#### Competencia Matemática 2 (M2)
- Operaciones avanzadas con números reales
- Funciones cuadráticas y exponenciales
- Geometría analítica y transformaciones complejas
- Probabilidad condicional y distribuciones

**46 unidades temáticas** organizadas según taxonomía PAES oficial

**Alineación MINEDUC (Nuevo):**
- Cada mini-lección vinculada a **Objetivos de Aprendizaje (OA)** oficiales
- Códigos OA del currículum nacional (ej: MA1M-OA-03)
- Fácil mapeo a planificaciones curriculares existentes
- Soporte para reportes de cobertura curricular

---

### 📊 Analytics Educativo Avanzado

**Métricas que importan para la enseñanza:**

#### Para el Estudiante Individual:
- Rendimiento por eje temático
- Habilidades dominadas vs. en desarrollo
- Patrones de error comunes
- Tiempo de respuesta por dificultad
- Evolución temporal del aprendizaje

#### Para el Grupo:
- Distribución de rendimiento del curso
- Temas más desafiantes colectivamente
- Comparativa con otros grupos
- Identificación de estudiantes en riesgo
- Efectividad de intervenciones

**Ejemplo de insight:**
*"El 73% de los estudiantes tiene dificultades con proporcionalidad inversa, pero domina proporcionalidad directa. Recomendación: Sesión de contraste conceptual."*

---

### 🤖 El Tutor IA Como Asistente Docente

**Capacidades del sistema IA:**

- **Responde 24/7** las dudas que surgen fuera de clase
- **No reemplaza** al profesor, lo complementa
- **Identifica patrones** de error que humanos podrían no ver
- **Escala personalmente** a cada estudiante
- **Registra interacciones** para análisis posterior
- **Libera tiempo** del docente para enseñanza de alto valor

**Análisis de IA disponible:**
- Tipos de preguntas más frecuentes
- Conceptos que generan más consultas
- Efectividad de diferentes explicaciones
- Costo y uso de recursos IA

---

### 🛠️ Herramientas para el Profesor

#### Panel de Administración Completo:

**Gestión de Contenido:**
- Ver los 900+ problemas del banco
- Filtrar por nivel, tema y dificultad
- Subir PDFs y extraer preguntas automáticamente
- Sistema QGen para generar preguntas personalizadas

**Sesiones de Práctica:**
- Programar ensayos PAES para el curso
- Monitorear participación en tiempo real
- Ver resultados individuales y grupales
- Templates rápidos para sesiones M1/M2

**Seguimiento de Estudiantes:**
- Dashboard de analytics general
- Actividad y progreso por usuario
- Identificación de patrones de estudio
- Alertas de estudiantes inactivos

**Dashboard de Profesores (Nuevo):**
- Asignar estudiantes a niveles específicos (1° a 4° Medio)
- Filtrar estudiantes por nivel, email o nombre
- Vista especializada para estudiantes de colegio
- Contenido automáticamente filtrado por grado asignado

---

### 🏫 Sistema para Colegios

**Funcionalidades especiales para instituciones educativas:**

- **Cuentas Demo**: Creación rápida de cuentas de prueba para colegios
- **Base de Datos RBD**: Búsqueda de colegios chilenos por código oficial
- **Gestión de Profesores**: Rol docente con permisos especiales
- **Asignación por Grado**: Estudiantes ven contenido apropiado a su nivel
- **Planes Institucionales**: Precios especiales para colegios (contactar vía Intercom)

---

### 🎮 Gamificación con Propósito Pedagógico

**Elementos de juego que refuerzan el aprendizaje:**

- **Rachas diarias** → Fomentan constancia y hábito de estudio
- **Niveles de maestría** → Visualizan progreso concreto
- **Sesiones en vivo** → Competencia sana y aprendizaje colaborativo
- **Badges y logros** → Reconocimiento de esfuerzo, no solo resultado
- **Predicción de puntaje** → Meta tangible y motivadora

*La gamificación bien diseñada aumenta engagement sin trivializar el contenido*

---

### 📝 Integración con Práctica Docente

**Cómo usar SimplePAES en tu clase:**

1. **Diagnóstico inicial** - Asigna práctica para identificar nivel base
2. **Tarea diferenciada** - Modo Zen para aprender, Rapid Fire para evaluar
3. **Flipped Classroom** - Estudiantes estudian en casa, clase para profundizar
4. **Refuerzo específico** - Asigna temas según debilidades identificadas
5. **Ensayos simulados** - Sesiones en vivo como preparación final
6. **Análisis de errores** - Revisa patrones comunes en sesiones grupales

---

### 🔬 Generación Dinámica de Preguntas (QGen)

**Sistema para crear contenido ilimitado:**

- **Biblioteca de contextos**: Situaciones reales (economía, deportes, tecnología)
- **Tipos de razonamiento**: Aplicar, analizar, sintetizar, evaluar
- **Plantillas parametrizadas**: Generación automática con valores coherentes
- **Validación automática**: Asegura calidad y coherencia matemática

*Genera preguntas personalizadas para necesidades específicas de tu curso*

---

### 📈 Evidencia de Efectividad

**Métricas del sistema:**

- **900+ problemas** curados y validados pedagógicamente
- **500+ habilidades** mapeadas a taxonomía PAES
- **Metodología Socrática** implementada con IA estado del arte
- **Tracking completo** de cada interacción estudiante-sistema
- **Analytics en tiempo real** para toma de decisiones informada

---

### 🤝 Soporte Técnico y Pedagógico

- **Documentación completa** del sistema
- **Guías de implementación** para diferentes contextos
- **Actualizaciones regulares** con mejoras y contenido
- **Sistema de health monitoring** para garantizar disponibilidad
- **Backups automáticos** de toda la información

---

## 🚀 Tecnología de Última Generación

### Stack Tecnológico

| Componente | Tecnología | Beneficio |
|------------|-----------|-----------|
| **Frontend** | Next.js 16 + React 19 | Interfaz rápida y moderna |
| **Backend** | Express.js + TypeScript | Sistema robusto y seguro |
| **Base de Datos** | PostgreSQL | Datos seguros y persistentes |
| **IA Principal** | Claude Sonnet 4.5 | Tutor IA más avanzado del mercado |
| **Matemáticas** | KaTeX | Renderizado profesional de fórmulas |
| **Pagos** | MercadoPago | Transacciones seguras en Chile |
| **Analytics** | PostHog | Insights de producto en tiempo real |
| **Monitoreo** | Sentry | Detección proactiva de errores |
| **Soporte** | Intercom | Asistencia cuando la necesites |

---

## 💳 Planes y Suscripción

SimplePAES ofrece diferentes planes adaptados a tus necesidades:

- **Período de prueba** - Explora la plataforma antes de comprometerte
- **Plan Básico** - Acceso a práctica y progreso
- **Plan Premium** - Todas las funciones incluyendo IA ilimitada
- **Planes Institucionales** - Para colegios y preuniversitarios

**Pagos seguros** procesados por MercadoPago, la plataforma de pagos líder en Chile.

---

## 📞 Soporte y Contacto

**¿Necesitas ayuda?**

- 💬 **Chat en vivo** integrado en la plataforma (Intercom)
- 📧 **Email** para consultas detalladas
- 📚 **Centro de ayuda** con guías y tutoriales
- 🐛 **Reporte de problemas** en GitHub

---

## 🎯 Resumen

### SimplePAES en 3 Puntos:

1. **Para Estudiantes**: Tu tutor personal 24/7 que te enseña a PENSAR matemáticamente, con 50+ mini-lecciones estructuradas y 900+ problemas.

2. **Para Padres**: Inversión inteligente en el futuro de tu hijo con tecnología de punta, seguridad total y resultados medibles.

3. **Para Profesores**: Herramienta pedagógica que complementa tu enseñanza con IA, analytics avanzado y contenido alineado al currículum.

---

<div align="center">

## **SimplePAES**

### Domina la PAES con Inteligencia

*Más que práctica. Aprendizaje real.*

---

**50+ Mini-Lecciones** · **900+ Problemas** · **IA Socrática** · **Sistema para Colegios**

</div>

---

## Información Técnica Adicional

Para desarrolladores, administradores de sistema o información técnica detallada, consulta:

- [CODEBASE_OVERVIEW.md](./CODEBASE_OVERVIEW.md) - Arquitectura técnica completa
- [Backend Documentation](./backend/README.md) - Setup del servidor
- [E2E Test Setup](./E2E_TEST_SETUP.md) - Configuración de tests
- [PAYMENT_INTEGRATION.md](./PAYMENT_INTEGRATION.md) - Integración de pagos
- [SECURITY_AUDIT_REPORT.md](./SECURITY_AUDIT_REPORT.md) - Auditoría de seguridad

---

**Última actualización**: Diciembre 2025

**Versión**: 3.0 - Incluye Sistema de Mini-Lecciones (53 lecciones), Sistema para Colegios con Dashboard de Profesores, y mejoras SEO

---

*SimplePAES - Preparando estudiantes chilenos para el éxito universitario*
