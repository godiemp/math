# SimplePAES - Plataforma de Preparación Matemática

Una aplicación web completa diseñada para ayudar a estudiantes chilenos a prepararse para el examen de matemáticas PAES (Prueba de Acceso a la Educación Superior).

## Descripción General

SimplePAES es una plataforma de práctica completa que incluye:

- **Quizzes de Práctica Interactivos** - Estudia a tu ritmo o desafíate con pruebas cronometradas
- **Sesiones de Práctica en Vivo (Ensayos)** - Únete a simulaciones PAES programadas con otros estudiantes
- **Tutor con IA** - Asistente personalizado con metodología Socrática que te ayuda a entender cada problema
- **Seguimiento de Progreso** - Monitorea tu desempeño por temas y niveles de dificultad con tracking en base de datos
- **Sistema de Rachas** - Mantén tu motivación con streaks diarios
- **Dos Niveles de Competencia** - M1 (básico) y M2 (avanzado) alineados con estándares PAES
- **Generador Dinámico de Preguntas (QGen)** - Sistema inteligente para generar preguntas personalizadas
- **Sistema de Suscripciones** - Planes de acceso con gestión completa de usuarios
- **Integración de Pagos** - Procesamiento de pagos con MercadoPago para Chile
- **Analytics Completo** - Métricas de uso, desempeño y análisis de interacciones con IA
- **Panel de Administración** - Gestiona sesiones en vivo, usuarios, planes, y el banco de preguntas
- **Sistema de Documentación** - Accede a material de estudio completo con LaTeX

## Características Principales

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
- **M2 (Competencia Matemática 2)** - 26 problemas avanzados para carreras de ciencia e ingeniería

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
- **Framework**: Next.js 15.0.0 con React 19
- **Lenguaje**: TypeScript 5.9.3
- **Estilos**: Tailwind CSS con sistema de diseño personalizado (inspirado en Apple)
- **Renderizado Matemático**: KaTeX para expresiones LaTeX
- **Gestión de Estado**: React Context API
- **IA**: Anthropic SDK (Claude Sonnet 4.5)
- **UI Components**: Radix UI + Lucide Icons

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
- `sonner` - Toast notifications
- `@sentry/nextjs` - Error tracking y performance monitoring (frontend)
- `@sentry/node` - Error tracking y APM (backend)
- `swr` - Data fetching y cache
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
│   ├── practice/                 # Páginas de práctica (M1/M2)
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
│   │   └── useSessions.ts        # Hook para sesiones en vivo
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

**Total: 432 Problemas**

| Nivel | Cantidad | Cobertura |
|-------|----------|-----------|
| M1 | 406 | Números (91), Álgebra (109), Geometría (106), Probabilidad (100) |
| M2 | 26 | Números (6), Álgebra (6), Geometría (7), Probabilidad (7) |

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
  options: ['8 días', '9 días', '10 días', '16 días'],
  correctAnswer: 1,
  explanation: 'Es una proporción inversa. Si aumentan los obreros, disminuyen los días necesarios.',
  explanationLatex: '3 \\times 12 = 4 \\times x \\implies x = \\frac{36}{4} = 9',
  difficulty: 'easy',
  skills: ['numeros-proporcionalidad-inversa', 'numeros-razonamiento-proporcional']
}
```

## Esquema de Base de Datos

### Tablas Principales

**Usuarios y Autenticación:**
- `users` - Información de usuarios con roles (student/admin)
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
11. **Debug Tools** - Herramientas de debug en `/admin/zen-debug` y `/admin/rapidfire-debug`
12. **Backup & Restore** - Ejecuta comandos de backup desde el backend (ver sección de Operaciones)

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
- 432 preguntas en el banco (406 M1 + 26 M2)
- Tutor IA con metodología Socrática (Claude Sonnet 4.5)
- Sistema de rachas diarias con persistencia en base de datos
- Sesiones de práctica en vivo con sistema de lobby
- Tracking de progreso con análisis de habilidades (500+ skills)
- Sistema completo de documentación con markdown y LaTeX
- Herramienta de upload y extracción de PDFs con IA
- Autenticación JWT con roles de usuario
- Panel de administración completo
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

- **Cobertura M2**: Solo 26 problemas (necesita expansión a 200+)
- **Sin Aprendizaje Adaptativo**: Generación de quiz es aleatoria, no ajustada por dificultad del usuario
- **Tests Unitarios**: No hay tests unitarios (solo E2E con Playwright)
- **QGen en Desarrollo**: Sistema de generación dinámica necesita más contextos, objetivos y templates
- **Analytics en Tiempo Real**: Dashboard de analytics sin actualización en tiempo real
- **Notificaciones Email**: Sistema de email configurado pero necesita más templates

## Mejoras Futuras

### Alta Prioridad
- [ ] Expandir banco de preguntas M2 a 200+ problemas
- [ ] Implementar algoritmo de aprendizaje adaptativo basado en desempeño
- [ ] Agregar tests unitarios (vitest/jest) para componentes y servicios
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

### Sistema de Problemas Abstractos (NUEVO ⭐ Noviembre 2024)
- ✅ Sistema completo de generación masiva de problemas
- ✅ 46 unidades temáticas (33 M1 + 13 M2)
- ✅ Integración con OpenAI GPT-4
- ✅ Scripts helper con dry-run mode
- ✅ Control granular de generación (--limit, --units)
- ✅ Almacenamiento automático en PostgreSQL
- ✅ Documentación completa en QUICK-START-ABSTRACT-PROBLEMS.md

### Sistema de Operaciones y Monitoreo (NUEVO ⭐ Noviembre 2024)
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

**Última actualización**: Noviembre 12, 2024

**Estado del Proyecto**: En desarrollo activo con features principales implementadas, sistema de suscripciones completo con **integración de pagos MercadoPago**, quiz tracking en base de datos, generador dinámico de preguntas (QGen), **sistema de problemas abstractos** para generación masiva de contenido, analytics completo, **monitoreo de salud del sistema**, **backup y restore automático**, testing E2E, y herramientas de desarrollo mejoradas con Claude Code skills.

## Tech Stack Summary

| Categoría | Tecnologías |
|-----------|------------|
| **Frontend** | Next.js 15, React 19, TypeScript 5.9, Tailwind CSS, KaTeX |
| **Backend** | Express.js, Node.js, TypeScript, PostgreSQL |
| **Autenticación** | JWT, bcryptjs |
| **Pagos** | MercadoPago SDK (Chile) |
| **Email** | Resend, Nodemailer |
| **Validación** | Zod |
| **Seguridad** | Helmet, express-rate-limit |
| **IA** | Anthropic Claude Sonnet 4.5, OpenAI |
| **Testing** | Playwright (E2E), Docker Compose |
| **Developer Tools** | Claude Code Skills, ESLint, Prettier |
| **UI/UX** | Radix UI, Lucide Icons, Sonner (toasts) |
| **Data Fetching** | SWR, Centralized API Client |

## Quick Links

- 🚀 [Getting Started](#empezando)
- 📚 [Documentation](#documentación)
- 🧪 [Testing](#testing)
- 🛠️ [Claude Code Skills](#claude-code-skills)
- 📖 [API Endpoints](#api-endpoints)
- 🎯 [Features](#características-principales)
