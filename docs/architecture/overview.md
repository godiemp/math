# PAES Math Learning App - Architecture Overview

> **Quick Navigation:**
> - [PAES Curriculum Scope](../content/paes-curriculum-scope.md) - What content we need to cover
> - [Math Renderer Module](../modules/math-renderer/README.md) - Display & visualization
> - [Calculator Module](../modules/calculator/README.md) - Computation engine
> - [AI Module](../modules/ai-module/README.md) - Intelligent tutoring
> - [Main README](../../README.md) - Project overview

## Vision
A modular, scalable platform for students preparing for the PAES mathematics exam, featuring adaptive learning, comprehensive content coverage, and progress tracking.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Presentation Layer                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Web App    │  │  Mobile App  │  │  Admin Panel │      │
│  │  (React/Vue) │  │ (React Native)│  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Gateway Layer                       │
│              (REST/GraphQL - Authentication)                 │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────────┐    ┌──────────────┐
│   Content    │    │     Learning     │    │     User     │
│   Service    │    │     Engine       │    │   Service    │
│              │    │                  │    │              │
│ • Topics     │    │ • Exercises      │    │ • Profiles   │
│ • Lessons    │    │ • Assessments    │    │ • Progress   │
│ • Resources  │    │ • Adaptive Logic │    │ • Analytics  │
└──────────────┘    └──────────────────┘    └──────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       Data Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   PostgreSQL │  │     Redis    │  │  S3/Storage  │      │
│  │ (Main Data)  │  │   (Cache)    │  │   (Media)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## Three Core Technical Modules

The application is built around **three independent, reusable modules**:

### 1. Math Renderer Module 🎨
**Handles all mathematical display and visualization**

📖 **[Full Documentation](../modules/math-renderer/README.md)**

- LaTeX/MathML rendering (KaTeX or MathJax)
- Interactive graphs and function plots
- Geometry visualizations
- Math input components

**Key Responsibility**: Transform mathematical expressions into visual representations

---

### 2. Calculator Module 🧮
**The computational engine for all math operations**

📖 **[Full Documentation](../modules/calculator/README.md)**
📚 **[PAES Content Scope](../content/paes-curriculum-scope.md)** - Defines what this module needs to support

- Solve equations (linear, quadratic, systems)
- Algebraic operations (simplify, expand, factor)
- Geometry calculations (area, perimeter, volume, coordinate geometry)
- Statistics & probability (mean, median, combinations, etc.)
- Step-by-step solution generation
- Answer validation and equivalence checking

**Key Responsibility**: All mathematical computation and problem-solving

**Note**: Scoped to PAES (high school level) - NO calculus, advanced trig, or matrices

---

### 3. AI Module 🤖
**Intelligent tutoring that orchestrates the Calculator**

📖 **[Full Documentation](../modules/ai-module/README.md)**

- Chat-based tutoring interface
- **Calls Calculator module as tools** (function calling with GPT-4/Claude)
- Generates pedagogical hints and explanations
- Adaptive difficulty adjustment
- Misconception detection
- Learning path optimization

**Key Responsibility**: Provide personalized, intelligent tutoring by using the Calculator

**Key Design Pattern**: AI doesn't do math itself - it calls Calculator functions and explains the results

---

## High-Level Service Modules

These are the application-level services that use the three core modules:

### 1. Content Module
**Purpose**: Manage all mathematical content aligned with PAES curriculum

**Components**:
- **Topic Manager**: Organizes content by PAES topics
  - Álgebra y Funciones
  - Geometría
  - Probabilidad y Estadística
  - Números

- **Lesson Builder**: Creates structured learning paths
- **Resource Library**: Stores formulas, examples, and references

**Interfaces**:
- `ContentAPI`: CRUD operations for content
- `TopicHierarchy`: Navigate topic relationships
- `ResourceProvider`: Serve media and documents

**Data Flow**:
```
Admin Panel → Content Service → Database → Cache → Student App
```

---

### 2. Learning Engine Module
**Purpose**: Deliver personalized learning experiences

**Components**:
- **Exercise Generator**: Creates practice problems
- **Assessment Engine**: Evaluates student responses
- **Adaptive Algorithm**: Adjusts difficulty based on performance
- **Hint System**: Provides graduated assistance

**Interfaces**:
- `ExerciseAPI`: Fetch problems by topic/difficulty
- `SubmissionHandler`: Process and grade answers
- `AdaptiveEngine`: Determine next content

**Data Flow**:
```
Student Request → Learning Engine → User Progress →
Adaptive Logic → Next Exercise → Student
```

---

### 3. User Module
**Purpose**: Manage user accounts and track progress

**Components**:
- **Profile Manager**: User accounts and settings
- **Progress Tracker**: Monitor learning journey
- **Analytics Engine**: Generate insights and reports
- **Achievement System**: Gamification elements

**Interfaces**:
- `UserAPI`: Authentication and profile management
- `ProgressAPI`: Record and retrieve progress data
- `AnalyticsAPI`: Generate reports and insights

**Data Flow**:
```
User Action → Progress Tracker → Analytics →
Database → Dashboard/Reports
```

---

### 4. Practice Test Module
**Purpose**: Simulate PAES exam experience

**Components**:
- **Test Builder**: Create timed, full-length practice tests
- **Scoring Engine**: Calculate scores and percentiles
- **Review System**: Detailed answer explanations

**Interfaces**:
- `TestAPI`: Start/submit practice tests
- `ReviewAPI`: Access test results and explanations

---

## Technology Stack (Proposed)

### Frontend
- **Framework**: React/Next.js or Vue/Nuxt
- **State Management**: Redux/Zustand or Pinia
- **UI Library**: Tailwind CSS + shadcn/ui
- **Math Rendering**: KaTeX or MathJax

### Backend
- **Runtime**: Node.js (Express) or Python (FastAPI)
- **Database**: PostgreSQL (primary), Redis (cache)
- **Storage**: S3-compatible object storage
- **Authentication**: JWT with refresh tokens

### Mobile (Optional)
- **Framework**: React Native or Flutter
- **Shared API**: Same backend services

---

## Module Independence & Parallel Development

### How Modules Can Work Independently:

1. **Content Module** can be developed separately:
   - Define content schema
   - Build admin interface
   - Import PAES curriculum
   - **Interface Contract**: REST endpoints for content retrieval

2. **Learning Engine** can work in parallel:
   - Use mock content data initially
   - Develop algorithm logic
   - Build exercise rendering
   - **Interface Contract**: Exercise and submission schemas

3. **User Module** operates independently:
   - User auth and profiles work standalone
   - Progress tracking uses defined event schema
   - **Interface Contract**: User session and progress events

4. **Frontend** can develop with mocks:
   - Use mock API responses
   - Build UI components
   - Integrate later via defined contracts

### Development Workflow:
```
Week 1-2: Define all interface contracts
Week 2-4: Parallel development of modules
Week 4-5: Integration testing
Week 5+: Feature additions and refinement
```

---

## Data Models (Core Entities)

### User
```
- id
- email
- profile (name, grade, target_score)
- created_at
- preferences
```

### Topic
```
- id
- name
- paes_category (algebra, geometry, etc.)
- parent_topic_id
- order
- description
```

### Exercise
```
- id
- topic_id
- difficulty (1-5)
- question_text
- question_latex
- answer_options
- correct_answer
- explanation
- tags
```

### UserProgress
```
- user_id
- topic_id
- mastery_level (0-100)
- exercises_completed
- last_practiced
- performance_trend
```

### PracticeTest
```
- id
- user_id
- questions (array of exercise_ids)
- started_at
- completed_at
- score
- time_taken
```

---

## Integration Points

### Module Communication:
1. **Content ↔ Learning Engine**: Exercise delivery
2. **Learning Engine ↔ User**: Progress updates
3. **User ↔ Frontend**: Display and interaction
4. **All Modules ↔ API Gateway**: Centralized routing

### Event System:
```
Events to track:
- exercise_started
- exercise_completed
- topic_mastered
- test_submitted
- login/logout
```

---

## Security Considerations

- **Authentication**: JWT tokens, secure session management
- **Authorization**: Role-based access (student, teacher, admin)
- **Data Privacy**: Encrypt sensitive user data
- **Input Validation**: Sanitize all user inputs
- **Rate Limiting**: Prevent abuse of API endpoints

---

## Scalability Strategy

1. **Horizontal Scaling**: Containerize services (Docker/Kubernetes)
2. **Caching**: Redis for frequently accessed content
3. **CDN**: Static assets and media files
4. **Database**: Read replicas for analytics queries
5. **Async Processing**: Queue system for heavy computations

---

## Next Steps

1. Review and refine this architecture
2. Define detailed API contracts (see `/docs/api/`)
3. Set up development environment (see `/docs/development/`)
4. Begin parallel module development
5. Create content import pipeline

---

## Related Documentation

- [Frontend Architecture](./frontend.md)
- [Backend Architecture](./backend.md)
- [Data Model Details](./data-model.md)
- [API Documentation](../api/endpoints.md)
- [PAES Content Alignment](../content/paes-alignment.md)
