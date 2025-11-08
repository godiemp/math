# PAES Math Curriculum Application - Structure Analysis

## 1. OVERALL CODEBASE STRUCTURE

### Technology Stack
- **Framework**: Next.js 15.0.0 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Math Rendering**: KaTeX for LaTeX expressions
- **Architecture**: Modular with component-based design

### Directory Organization
```
/home/user/math/
├── app/                       # Next.js 13+ app directory
│   ├── curriculum/            # Temario/Curriculum pages
│   │   ├── m1/page.tsx
│   │   └── m2/page.tsx
│   ├── practice/              # Practice quiz pages
│   │   ├── m1/page.tsx
│   │   └── m2/page.tsx
│   ├── dashboard/page.tsx     # Main user dashboard
│   ├── live-practice/         # Live exam sessions (Ensayos PAES)
│   └── admin/                 # Admin panels
├── components/                # React components
│   ├── Curriculum.tsx         # Main curriculum display
│   ├── CurriculumSidebar.tsx  # Navigation sidebar
│   ├── Quiz.tsx               # Quiz interface
│   ├── ui/                    # UI component library
│   └── [other components]
├── lib/                       # Utility libraries & data
│   ├── skillTaxonomy.ts       # Skills taxonomy & definitions
│   ├── types.ts               # TypeScript interfaces
│   ├── questions/             # Question banks organized by topic
│   │   ├── index.ts
│   │   ├── m1-numeros.ts
│   │   ├── m1-algebra.ts
│   │   ├── m1-geometria.ts
│   │   ├── m1-probabilidad.ts
│   │   ├── m2-numeros.ts
│   │   ├── m2-algebra.ts
│   │   ├── m2-geometria.ts
│   │   └── m2-probabilidad.ts
│   ├── auth.ts                # Authentication logic
│   ├── liveSessions.ts        # Live session management
│   └── utils.ts               # Helper functions
└── docs/                      # Documentation

```

---

## 2. WHERE CURRICULUM/TEMARIO CONTENT IS DEFINED

### Primary Location: `/home/user/math/components/Curriculum.tsx`

The curriculum content is defined **inline as two data structures**:

#### A. M1 Content (`paesM1Content`)
Located at lines 43-236, this array contains four main subject areas:
- **Números** (37% of exam, ~24 questions)
- **Álgebra y Funciones** (28% of exam, ~18 questions)
- **Geometría** (12% of exam, ~8 questions)
- **Probabilidad y Estadística** (23% of exam, ~15 questions)

Each subject contains **topics** with the following structure:
```typescript
{
  text: string;                    // Topic description
  difficulty: number;              // 1-3 (Básico/Medio/Avanzado)
  cognitiveLevel: string;          // Cognitive level label
  skills: string[];               // Array of skill names
  realWorldContext?: string;       // Real-world application context
  example: string;                // Example problem
  keyPoints: string;              // Important concepts
}
```

#### B. M2 Additional Content (`paesM2AdditionalContent`)
Located at lines 238-364, this array defines **additional topics** tested at M2 level:
- Advanced Numbers (Real numbers, Financial mathematics, Logarithms)
- Advanced Algebra (Systems analysis, Power functions)
- Advanced Geometry (Homotecia, Trigonometry)
- Advanced Probability (Dispersion measures, Conditional probability, Combinatorics)

### Secondary Location: Recent Changes in Dashboard
The dashboard (`/home/user/math/app/dashboard/page.tsx`) shows the separation of:
- **Practice Card**: Direct access to quizzes (M1/M2)
- **Temario Card**: Access to curriculum/content review

---

## 3. DATA STRUCTURES FOR CURRICULUM CONTENT

### Question Interface (from `/home/user/math/lib/types.ts`)

```typescript
interface Question {
  id: string;                           // Unique ID (e.g., 'm1-1')
  level: 'M1' | 'M2';                  // Competency level
  topic: string;                        // Topic name
  subject: 'números' | 'álgebra' | 'geometría' | 'probabilidad';
  question: string;                     // Plain text question
  questionLatex?: string;               // LaTeX version (optional)
  options: string[];                    // 4 answer choices
  optionsLatex?: string[];              // LaTeX versions (optional)
  correctAnswer: number;                // Index of correct answer (0-3)
  explanation: string;                  // Plain text explanation
  explanationLatex?: string;            // LaTeX version (optional)
  difficulty: 'easy' | 'medium' | 'hard';
  skills: string[];                     // Array of skill IDs from skillTaxonomy
  visualData?: {                        // For geometry problems
    type: 'graph' | 'geometry' | 'table' | 'diagram';
    data: any;                          // Figure data (points, dimensions, labels)
  };
}
```

### Curriculum Topic Interface (Curriculum.tsx)

```typescript
interface CurriculumTopic {
  text: string;                         // Topic description
  difficulty: number;                   // 1-3 difficulty level
  cognitiveLevel: string;              // 'Básico', 'Medio', 'Avanzado'
  skills: string[];                     // ['Resolver', 'Modelar', 'Representar', 'Argumentar']
  example: string;                      // Sample problem
  keyPoints: string;                    // Key concepts to know
  realWorldContext?: string;            // Real-world application emoji + label
}
```

### Question Organization Files
**File**: `/home/user/math/lib/questions/index.ts`

Exports question arrays by level and subject:
```typescript
export {
  m1NumerosQuestions,
  m1AlgebraQuestions,
  m1GeometriaQuestions,
  m1ProbabilidadQuestions,
  m2NumerosQuestions,
  m2AlgebraQuestions,
  m2GeometriaQuestions,
  m2ProbabilidadQuestions
};

export const questions: Question[] = [
  ...m1NumerosQuestions,
  ...m1AlgebraQuestions,
  ...m1GeometriaQuestions,
  ...m1ProbabilidadQuestions,
  ...m2NumerosQuestions,
  ...m2AlgebraQuestions,
  ...m2GeometriaQuestions,
  ...m2ProbabilidadQuestions
];
```

### Utility Functions
```typescript
// Get questions by various criteria
getQuestionsByLevel(level: 'M1' | 'M2'): Question[]
getQuestionsByTopic(topic: string): Question[]
getQuestionsBySubject(subject: string, level?: string): Question[]
getRandomQuestions(level: 'M1' | 'M2', count?: number, subject?: string): Question[]
```

---

## 4. SKILLS AND COMPETENCIES STRUCTURE

### Location: `/home/user/math/lib/skillTaxonomy.ts`

**Total Skills**: 80+ skills organized hierarchically

### Skill Interface
```typescript
interface Skill {
  id: string;                              // Unique identifier
  name: string;                            // Skill name (Spanish)
  description: string;                     // What the skill entails
  topic: 'números' | 'álgebra' | 'geometría' | 'probabilidad';
  parentSkill?: string;                    // For hierarchical relationships
}
```

### Skill Categories by Topic

#### Números (20 skills)
- numeros-operaciones-basicas
- numeros-fracciones (with sub-skills: suma, comun-denominador)
- numeros-decimales
- numeros-porcentajes (with sub-skill: descuentos)
- numeros-proporcionalidad (directa/inversa)
- numeros-potencias (with sub-skill: propiedades)
- numeros-raices
- numeros-mcd-mcm
- numeros-enteros
- numeros-orden-operaciones
- numeros-racionalizacion (M2)
- numeros-factorizacion-prima (M2)

#### Álgebra (20 skills)
- algebra-expresiones (terminos-semejantes)
- algebra-ecuaciones-lineales (despeje)
- algebra-funciones (evaluacion, lineales, pendiente)
- algebra-factorizacion (diferencia-cuadrados)
- algebra-expansion (propiedad-distributiva)
- algebra-desigualdades
- algebra-sistemas-ecuaciones (M2: sustitucion, eliminacion)
- algebra-ecuaciones-cuadraticas (M2: factorizacion, discriminante, formula)

#### Geometría (18 skills)
- geometria-perimetro
- geometria-area (triangulo, circulo)
- geometria-volumen (cubo, cilindro-M2)
- geometria-triangulos (pitagoras)
- geometria-circulos
- geometria-rectangulos
- geometria-cuadrados
- geometria-trapecio
- geometria-angulos (complementarios, suplementarios, adyacentes)
- geometria-plano-cartesiano (distancia)
- geometria-rectas-perpendiculares (M2)
- geometria-ley-cosenos (M2)

#### Probabilidad y Estadística (22 skills)
- probabilidad-basica (casos-favorables)
- probabilidad-eventos-compuestos
- estadistica-media
- estadistica-mediana
- estadistica-moda
- estadistica-rango
- estadistica-porcentajes
- estadistica-cuartiles (M2: rango-intercuartilico)
- probabilidad-combinatoria (M2: combinaciones, factorial)

### Skill Hierarchy
Skills can have **parent skills** for hierarchical organization:
```
Example hierarchy:
numeros-potencias (parent)
├── numeros-potencias-propiedades (child)

numeros-fracciones (parent)
├── numeros-fracciones-suma (child)
└── numeros-fracciones-comun-denominador (child)
```

### Helper Functions
```typescript
getSkillsByTopic(topic): Skill[]         // Get all skills for a topic
getSkillById(skillId): Skill | undefined // Get skill details
getAllSkillIds(): string[]               // Get all skill IDs
getSkillNames(skillIds): string[]        // Convert IDs to names
```

---

## 5. RECENT CHANGES (Git History)

### Key Recent Commits

#### Commit: `e981ceb` - "Place practice and temario cards in the same row"
- **Date**: Nov 8, 2025
- **Files**: app/dashboard/page.tsx
- **Change**: Changed grid layout from single column to 2-column grid for practice and temario cards

#### Commit: `ab50068` - "Separate practice and temario into two distinct cards"
- **Date**: Nov 8, 2025
- **Files**: app/dashboard/page.tsx
- **Change**: Split the single dashboard card into:
  1. **Practice Card**: M1 and M2 practice quizzes
  2. **Temario Card**: Curriculum/content review

#### Commit: `13a1497` - "Combine M1, M2 practice and curriculum into single card"
- **Previous structure**: Single combined card for practice and curriculum
- **New structure**: Separate practice and temario (curriculum) cards

#### Commit: Related to Math Competency Content
- **PR #34**: "Add math competency content"
- Added curriculum content structure
- Implemented skill taxonomy
- Added cognitive levels to topics

### Question File Reorganization
Questions have been **reorganized from a single large file** into **8 separate files by subject and level**:
- `/lib/questions/m1-numeros.ts` (1,378 lines)
- `/lib/questions/m1-algebra.ts`
- `/lib/questions/m1-geometria.ts`
- `/lib/questions/m1-probabilidad.ts`
- `/lib/questions/m2-numeros.ts`
- `/lib/questions/m2-algebra.ts`
- `/lib/questions/m2-geometria.ts`
- `/lib/questions/m2-probabilidad.ts`

All aggregated in `/lib/questions/index.ts`

---

## 6. SKILL-TOPIC MATRIX

The Curriculum component defines `skillTopicMatrix` showing which skills are evaluated in each topic area:

```typescript
const skillTopicMatrix = {
  'Números': {
    skills: ['Resolver', 'Modelar', 'Argumentar'],
    description: 'Problemas con porcentajes, potencias, modelos financieros'
  },
  'Álgebra y Funciones': {
    skills: ['Resolver', 'Modelar', 'Representar', 'Argumentar'],
    description: 'Ecuaciones, funciones, tablas y gráficos'
  },
  'Geometría': {
    skills: ['Resolver', 'Modelar', 'Representar'],
    description: 'Figuras, plano cartesiano, vectores'
  },
  'Probabilidad y Estadística': {
    skills: ['Resolver', 'Modelar', 'Representar', 'Argumentar'],
    description: 'Datos, gráficos, inferencias'
  }
};
```

Four core **evaluated skills**:
1. **Resolver** - Problem solving
2. **Modelar** - Mathematical modeling
3. **Representar** - Representation in different forms
4. **Argumentar** - Mathematical argumentation

---

## 7. DISTRIBUTION OF CONTENT

### M1 Level (65 questions, 60 for score)
- Números: ~24 questions (37%)
- Álgebra y Funciones: ~18 questions (28%)
- Geometría: ~8 questions (12%)
- Probabilidad y Estadística: ~15 questions (23%)

### M2 Level (55 questions, 50 for score)
- Números: ~20 questions (36%)
- Álgebra y Funciones: ~16 questions (29%)
- Geometría: ~8 questions (15%)
- Probabilidad y Estadística: ~11 questions (20%)

---

## 8. KEY FILES FOR CREATING SKILLS ARRAY

### Files to Reference
1. **`/home/user/math/lib/skillTaxonomy.ts`** (617 lines)
   - Master skills definition
   - All skills with IDs, names, descriptions, and hierarchies

2. **`/home/user/math/lib/questions/m1-numeros.ts`** (1,378 lines)
   - Example question structure with skills array
   - Shows how questions reference skills

3. **`/home/user/math/components/Curriculum.tsx`** (647 lines)
   - Curriculum content structure
   - Topic-to-skill relationships
   - Cognitive levels and real-world context

4. **`/home/user/math/lib/types.ts`** (104 lines)
   - Question interface with skills field
   - Type definitions for curriculum content

5. **`/home/user/math/app/dashboard/page.tsx`**
   - Recent changes showing practice vs. temario separation

---

## 9. SUMMARY FOR CREATING SKILLS ARRAY

### What You Have
1. **Skill Taxonomy**: 80+ hierarchical skills already defined
2. **Questions Linked to Skills**: Each question has a `skills: string[]` array with skill IDs
3. **Curriculum Topics**: Detailed topics with cognitive levels and real-world context
4. **Topic-Skill Matrix**: Shows which skills are evaluated in each area

### Creating a Skills Array Structure
You can create a skills array that:
1. **Uses existing skillTaxonomy.ts** as the base
2. **Adds array of skills** with the structure:
   ```typescript
   interface SkillInArray {
     id: string;
     name: string;
     description: string;
     topic: string;
     parentSkill?: string;
     difficulty?: 'easy' | 'medium' | 'hard';
     questionsCount?: number;
     proficiency?: number; // User proficiency percentage
   }
   ```
3. **Links to questions** through the skills array in Question interface
4. **Supports user progress tracking** by proficiency per skill
5. **Enables filtering** by topic, difficulty, or parent-child relationships

### Recommended Location
- Create in `/home/user/math/lib/skillsArray.ts` or
- Extend `/home/user/math/lib/skillTaxonomy.ts` with additional methods
- Export from `/home/user/math/lib/index.ts` for centralized access

