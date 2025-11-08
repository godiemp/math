# PAES Chile - Plataforma de Preparación Matemática

Una aplicación web completa diseñada para ayudar a estudiantes chilenos a prepararse para el examen de matemáticas PAES (Prueba de Acceso a la Educación Superior).

## Descripción General

PAES Chile es una plataforma de práctica completa que incluye:

- **Quizzes de Práctica Interactivos** - Estudia a tu ritmo o desafíate con pruebas cronometradas
- **Sesiones de Práctica en Vivo (Ensayos)** - Únete a simulaciones PAES programadas con otros estudiantes
- **Tutor con IA** - Asistente personalizado con metodología Socrática que te ayuda a entender cada problema
- **Seguimiento de Progreso** - Monitorea tu desempeño por temas y niveles de dificultad
- **Sistema de Rachas** - Mantén tu motivación con streaks diarios
- **Dos Niveles de Competencia** - M1 (básico) y M2 (avanzado) alineados con estándares PAES
- **Panel de Administración** - Gestiona sesiones en vivo y el banco de preguntas
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

### 👨‍💼 Características de Administración

- **Crear y programar** sesiones de práctica en vivo
- **Ver todos los problemas** en el banco de preguntas
- **Filtrar** por nivel, tema y dificultad
- **Monitorear** usuarios registrados y participación en sesiones
- **Upload de PDFs** - Extrae preguntas automáticamente con IA
- **Gestión de sesiones** - Editar, cancelar, eliminar ensayos
- **Plantillas rápidas** - Templates para sesiones M1/M2

## Stack Tecnológico

### Frontend
- **Framework**: Next.js 15.0.0 con React 19
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS con sistema de diseño personalizado (inspirado en Apple)
- **Renderizado Matemático**: KaTeX para expresiones LaTeX
- **Gestión de Estado**: React Context API
- **IA**: Anthropic SDK (Claude Sonnet 4.5)

### Backend
- **Runtime**: Node.js con Express
- **Base de Datos**: PostgreSQL con connection pooling
- **Autenticación**: JWT (JSON Web Tokens) con bcrypt
- **API**: Endpoints RESTful
- **CORS**: Configurado para deployments en Vercel
- **Sistema de Auto-actualización**: Actualiza estados de sesiones cada 30 segundos

### Bibliotecas Clave
- `react-katex` - Renderizado de expresiones matemáticas
- `clsx` & `tailwind-merge` - Estilos utility-first
- `jsonwebtoken` - Autenticación segura
- `pg` - Cliente PostgreSQL
- `@anthropic-ai/sdk` - Integración con Claude AI
- `bcrypt` - Hashing de contraseñas

## Estructura del Proyecto

```
/home/user/math/
├── app/                          # Páginas Next.js App Router
│   ├── page.tsx                  # Landing page con autenticación
│   ├── dashboard/                # Dashboard principal del estudiante
│   ├── practice/                 # Páginas de práctica (M1/M2)
│   ├── curriculum/               # Páginas de curriculum overview
│   │   ├── m1/                   # Curriculum M1
│   │   │   └── docs/[[...slug]]  # Sistema de documentación M1
│   │   └── m2/                   # Curriculum M2
│   │       └── docs/[[...slug]]  # Sistema de documentación M2
│   ├── live-practice/            # Interfaz de sesiones en vivo
│   ├── progress/                 # Página de seguimiento de progreso
│   ├── admin/                    # Dashboard y herramientas de admin
│   │   ├── problems/             # Navegador de banco de preguntas
│   │   └── upload/               # Upload y extracción de PDFs
│   └── api/                      # Next.js Route Handlers
│       ├── ai-chat/              # API del tutor IA
│       ├── ai-help/              # API de ayuda IA
│       └── config/               # Configuración
├── backend/                      # Backend Express.js
│   ├── src/
│   │   ├── index.ts              # Entry point del servidor
│   │   ├── auth/                 # Autenticación y controladores
│   │   ├── config/               # Configuración de base de datos
│   │   ├── middleware/           # Auth middleware
│   │   ├── routes/               # Rutas de API
│   │   │   ├── authRoutes.ts     # Autenticación
│   │   │   ├── sessionRoutes.ts  # Sesiones en vivo
│   │   │   ├── streakRoutes.ts   # Sistema de rachas
│   │   │   ├── adminRoutes.ts    # Admin endpoints
│   │   │   └── aiRoutes.ts       # Servicios de IA
│   │   ├── scripts/              # Scripts de utilidad
│   │   └── services/             # Servicios de negocio
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
│   ├── questions.ts              # Utilidades de preguntas
│   ├── types.ts                  # Interfaces TypeScript
│   ├── auth.ts                   # Lógica de auth del cliente
│   ├── liveSessions.ts           # Gestión de sesiones en vivo
│   ├── skillTaxonomy.ts          # Definiciones de skills (500+)
│   ├── skillsArray.ts            # Array de skills
│   └── utils.ts                  # Utilidades generales
├── docs/                         # Documentación
│   ├── curriculum/               # Docs de currículum completo
│   │   ├── m1/                   # Material de estudio M1
│   │   └── m2/                   # Material de estudio M2
│   └── architecture/             # Documentación de arquitectura
└── CODEBASE_OVERVIEW.md          # Documentación técnica detallada
```

## Exports & API de Biblioteca

### Exportaciones de Preguntas (`lib/questions/index.ts`)

```typescript
// Importar todas las preguntas
import { questions } from '@/lib/questions';

// Importar arrays de preguntas por categoría
import {
  m1NumerosQuestions,
  m1AlgebraQuestions,
  m1GeometriaQuestions,
  m1ProbabilidadQuestions,
  m2NumerosQuestions,
  m2AlgebraQuestions,
  m2GeometriaQuestions,
  m2ProbabilidadQuestions
} from '@/lib/questions';

// Funciones de utilidad
import {
  getQuestionsByLevel,      // Filtrar por nivel (M1/M2)
  getQuestionsByTopic,       // Filtrar por tema
  getQuestionsBySubject,     // Filtrar por asignatura
  getRandomQuestions,        // Obtener preguntas aleatorias
  getOfficialPAESQuestions,  // Obtener preguntas según distribución oficial PAES
  PAES_M1_DISTRIBUTION,      // Distribución oficial M1
  PAES_M2_DISTRIBUTION       // Distribución oficial M2
} from '@/lib/questions';
```

### Exportaciones de Componentes UI (`components/ui/index.ts`)

```typescript
// Componentes de interfaz
import { Button, Card, Badge, Modal, Spinner, LoadingScreen } from '@/components/ui';

// Componentes de navegación
import { Navbar, NavbarLink, CurriculumSidebar } from '@/components/ui';

// Componentes de tipografía
import { Heading, Text } from '@/components/ui';

// Tipos de componentes UI
import type {
  ButtonVariant,
  ButtonSize,
  BadgeVariant,
  BadgeSize,
  HeadingLevel,
  HeadingSize,
  TextSize,
  TextVariant
} from '@/components/ui';
```

### Exportaciones de Tipos (`lib/types.ts`)

```typescript
// Tipos principales
import type {
  Question,
  User,
  UserProgress,
  QuestionAttempt,
  LiveSession,
  SessionParticipant,
  StreakData
} from '@/lib/types';

// Tipos de enumeración
import type {
  Level,              // 'M1' | 'M2'
  DifficultyLevel,    // 'easy' | 'medium' | 'hard' | 'extreme'
  Subject,            // 'números' | 'álgebra' | 'geometría' | 'probabilidad'
  QuizMode,           // 'zen' | 'rapidfire'
  SessionStatus,      // 'scheduled' | 'lobby' | 'active' | 'completed' | 'cancelled'
  MasteryLevel        // 'not-started' | 'learning' | 'mastered'
} from '@/lib/types';

// Tipos de habilidades
import type {
  Skill,
  EnhancedSkill,
  SkillProgress,
  SkillProgressSummary,
  Competency
} from '@/lib/types';

// Tipos de geometría
import type {
  GeometryFigureType,
  Triangle,
  Rectangle,
  Circle,
  Point,
  Line,
  Polygon
} from '@/lib/types';
```

### Ejemplo de Uso

```typescript
// Ejemplo: Obtener 10 preguntas aleatorias de álgebra M1
import { getRandomQuestions } from '@/lib/questions';

const algebraQuestions = getRandomQuestions('M1', 10, 'álgebra');

// Ejemplo: Crear un ensayo PAES oficial
import { getOfficialPAESQuestions } from '@/lib/questions';

const paesM1Exam = getOfficialPAESQuestions('M1');
// Retorna 60 preguntas distribuidas según especificaciones oficiales:
// - 17 de números (28%)
// - 17 de álgebra (28%)
// - 14 de geometría (23%)
// - 12 de probabilidad (21%)

// Ejemplo: Filtrar preguntas por nivel
import { getQuestionsByLevel } from '@/lib/questions';

const m2Questions = getQuestionsByLevel('M2');
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

Crear `.env` en el directorio raíz:
```env
ANTHROPIC_API_KEY=tu-api-key-de-anthropic
```

Crear `.env` en el directorio backend:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/paes_chile
JWT_SECRET=tu-secret-key
PORT=3001
ANTHROPIC_API_KEY=tu-api-key-de-anthropic
```

5. **Configurar base de datos**

Ejecutar el script de seed para crear usuario admin:
```bash
cd backend
npm run seed:admin
```

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
2. **Crear Sesiones** - Programa nuevos ensayos de práctica
3. **Navegar Problemas** - Ve y filtra el banco de preguntas
4. **Upload PDFs** - Sube PDFs y extrae preguntas automáticamente con IA
5. **Monitorear Actividad** - Ve usuarios registrados y participación

## API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/refresh` - Refrescar token JWT
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

### Admin
- `POST /api/admin/upload-pdf` - Upload y extracción de preguntas desde PDF
- `POST /api/admin/save-questions` - Guardar preguntas extraídas
- `GET /api/admin/questions` - Obtener preguntas desde base de datos

### IA
- `POST /api/ai-chat` - Chat con tutor IA (metodología Socrática)
- `POST /api/ai-help` - Obtener ayuda IA para respuestas incorrectas
- `POST /api/ai/summarize` - Resumir contenido educativo
- `POST /api/ai/practice` - Generar problemas de práctica

## Características Actuales

### ✅ Completamente Implementado

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

### 🚧 Limitaciones Actuales

- **Cobertura M2**: Solo 26 problemas (necesita expansión)
- **Progreso de Quiz**: Historial almacenado en localStorage (no sincronizado en la nube)
- **Sin Aprendizaje Adaptativo**: Generación de quiz es aleatoria, no ajustada por dificultad
- **Sin Tests**: No hay tests unitarios o de integración
- **Herramientas Admin**: No hay CRUD completo para preguntas en base de datos

## Mejoras Futuras

### Alta Prioridad
- [ ] Expandir banco de preguntas M2 a 200+ problemas
- [ ] Migrar historial de progreso de quiz a PostgreSQL
- [ ] Implementar algoritmo de repetición espaciada
- [ ] Agregar tests unitarios e integración
- [ ] Construir interfaz CRUD completa para gestión de preguntas

### Prioridad Media
- [ ] Implementar sistema de calibración de dificultad de problemas
- [ ] Agregar dashboard de analytics detallado
- [ ] Renderizador de soluciones paso a paso mejorado
- [ ] Soporte para importar/exportar problemas en batch
- [ ] Sistema de recomendaciones personalizado basado en desempeño

### Prioridad Baja
- [ ] Aplicación móvil (React Native)
- [ ] Salas de estudio colaborativo
- [ ] Gamificación y logros adicionales
- [ ] Explicaciones en video para problemas
- [ ] Generador de tests de práctica personalizados

## Documentación

Para más información detallada, ver:
- [Visión General del Código](./CODEBASE_OVERVIEW.md) - Documentación técnica detallada
- [Setup del Backend](./backend/README.md) - Instrucciones específicas del backend
- [Documentación de Arquitectura Original](./docs/) - Documentos de planificación inicial

## Commits Recientes

Los últimos 20 commits incluyen mejoras significativas:
- Implementación de metodología Socrática en tutor IA
- Optimizaciones de estados de carga
- Modularización del sistema de autenticación
- Upgrade a modelo Claude Sonnet 4.5
- Mejoras en Modo Zen
- Fixes de persistencia de contexto en IA
- Threshold de carga para prevenir flashes
- Mensajes de carga personalizados por ruta

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

**Última actualización**: Noviembre 2024

**Estado del Proyecto**: En desarrollo activo con features principales implementadas y funcionando.
