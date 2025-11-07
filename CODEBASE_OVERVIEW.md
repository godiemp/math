# PAES Math Learning App - Codebase Overview

## 1. APPLICATION TYPE

**PAES Chile Math Learning Platform** - A Next.js-based web application designed to help Chilean students prepare for the PAES (Prueba de Acceso a la Educación Superior) entrance exam.

### Key Characteristics:
- **Framework**: Next.js 15.0.0 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Math Rendering**: KaTeX (for LaTeX mathematical expressions)
- **Architecture**: Modular design with three independent components:
  - Math Renderer (display mathematical expressions and visualizations)
  - Calculator Module (solving and step-by-step solutions)
  - AI Module (intelligent tutoring)

### Target Audience:
- Students preparing for PAES exam
- All four PAES math areas covered: Números, Álgebra y Funciones, Geometría, Probabilidad y Estadística
- Two competency levels: M1 (basic) and M2 (advanced)

---

## 2. CURRENT PROBLEM STRUCTURE AND STORAGE

### Storage Location
**Primary File**: `/home/user/math/lib/questions.ts` (1,002 lines)
- **Total Problems**: 59 problems
  - M1 (Basic Level): 46 problems
  - M2 (Advanced Level): 13 problems

### Storage Method
- **Hardcoded in TypeScript**: Problems are defined as a static array of Question objects
- **No Database**: Currently uses in-memory storage (client-side localStorage for progress tracking)
- **Format**: ES6 module exported as `questions` array with utility functions

### Problem Distribution by Subject
Based on the code, problems are distributed across four subjects:
1. **Números** (Numbers) - Integers, fractions, percentages, powers, roots, divisibility
2. **Álgebra y Funciones** (Algebra & Functions) - Equations, functions, systems, factoring
3. **Geometría** (Geometry) - Shapes, area, perimeter, volume, coordinate geometry
4. **Probabilidad y Estadística** (Probability & Statistics) - Mean, median, mode, probability, combinations

---

## 3. PROBLEM-RELATED FILES INVENTORY

### Core Files
```
/home/user/math/lib/
├── questions.ts          (59 hardcoded problems - 1,002 lines)
├── types.ts              (TypeScript interfaces for problems)
├── auth.ts               (Authentication logic)
├── liveSessions.ts       (Live practice session management)

/home/user/math/components/
├── Quiz.tsx              (Main quiz component)
├── Curriculum.tsx        (Curriculum display component)
├── MathDisplay.tsx       (KaTeX rendering component)
├── GeometryCanvas.tsx    (Visual geometry rendering)
└── [Other UI Components]

/home/user/math/app/
├── practice/
│   ├── m1/page.tsx       (M1 practice interface)
│   └── m2/page.tsx       (M2 practice interface)
├── curriculum/
│   ├── m1/page.tsx       (M1 curriculum view)
│   └── m2/page.tsx       (M2 curriculum view)
├── admin/
│   ├── page.tsx          (Admin dashboard for live sessions)
│   └── problems/page.tsx (Problem explorer for admins)
├── dashboard/page.tsx    (Main user dashboard)
└── live-practice/        (Live practice sessions)
```

### Key Component Details

#### Quiz Component (`/home/user/math/components/Quiz.tsx`)
- Displays questions in multiple-choice format
- Supports two quiz modes:
  - **Zen Mode**: No time limit, study at own pace
  - **Rapid Fire Mode**: Timed challenges (25, 20, 15, or 10 minutes for 10 questions)
- Tracks user answers and scores
- Saves progress to localStorage

#### Curriculum Component (`/home/user/math/components/Curriculum.tsx`)
- Displays structured curriculum with skill-topic matrix
- Shows cognitive levels (Básico, Medio, Avanzado)
- Includes example questions and key learning points
- Real-world context examples for practical learning

#### Admin Problem Explorer (`/home/user/math/app/admin/problems/page.tsx`)
- Browse all 59 problems in a searchable table
- Filter by: Level (M1/M2), Subject, Difficulty
- View detailed problem information with explanations
- Admin-only access (requires `requireAdmin={true}`)

---

## 4. CURRENT PROBLEM FORMAT/SCHEMA

### Question Interface (TypeScript)
```typescript
interface Question {
  id: string;                           // Unique identifier (e.g., 'm1-1')
  level: 'M1' | 'M2';                  // Competency level
  topic: string;                        // Topic area (e.g., "Números y Proporcionalidad")
  subject: 'números' | 'álgebra' | 'geometría' | 'probabilidad';  // Subject area
  question: string;                     // Plain text question
  questionLatex?: string;               // LaTeX version of question (optional)
  options: string[];                    // Array of 4 answer choices
  optionsLatex?: string[];              // LaTeX versions of options (optional)
  correctAnswer: number;                // Index of correct answer (0-3)
  explanation: string;                  // Plain text explanation
  explanationLatex?: string;            // LaTeX version of explanation (optional)
  difficulty: 'easy' | 'medium' | 'hard';  // Question difficulty
  
  // Optional visual data for geometry problems
  visualData?: {
    type: 'graph' | 'geometry' | 'table' | 'diagram';
    data: any;  // Contains figure data (points, dimensions, labels)
  };
}
```

### Example Problem Structure
```typescript
{
  id: 'm1-1',
  level: 'M1',
  topic: 'Números y Proporcionalidad',
  subject: 'números',
  question: 'Si 3 obreros construyen un muro en 12 días, ¿cuántos días tardarán 4 obreros?',
  questionLatex: '\\text{Si 3 obreros construyen un muro en 12 días, ¿cuántos días tardarán 4 obreros?}',
  options: ['8 días', '9 días', '10 días', '16 días'],
  correctAnswer: 1,
  explanation: 'Es una proporción inversa. Si aumentan los obreros, disminuyen los días.',
  explanationLatex: '3 \\times 12 = 4 \\times x \\text{, entonces } x = \\frac{36}{4} = 9',
  difficulty: 'easy'
}
```

### Visual Data Example (Geometry)
Some geometry problems include visual data:
```typescript
visualData: {
  type: 'geometry',
  data: [
    {
      type: 'triangle',
      points: [
        { x: 50, y: 200, label: 'A' },
        { x: 200, y: 200, label: 'B' },
        { x: 50, y: 80, label: 'C' }
      ],
      labels: {
        sides: ['8 cm', '10 cm', '6 cm']
      },
      dimensions: {
        showSides: true
      }
    }
  ]
}
```

---

## 5. EXISTING ISSUES AND LIMITATIONS

### Critical Limitations

#### 1. **No Database Layer**
- **Issue**: All 59 problems are hardcoded in a single TypeScript file
- **Impact**: 
  - Cannot dynamically add/update/delete problems
  - Admin panel can only view problems, not edit them
  - No persistence of problem data across deployments
  - Scaling is impractical (file would become unmaintainable)
- **Affects**: `/home/user/math/lib/questions.ts` (1,002 lines)

#### 2. **Limited Problem Set**
- **Issue**: Only 59 total problems
  - M1: 46 problems
  - M2: 13 problems (severely underdeveloped)
- **Impact**:
  - Each quiz asks for 10 questions randomly
  - Students can repeat same problems frequently
  - M2 level has minimal coverage
  - PAES exam has 60-65 questions per level

#### 3. **Incomplete Topic Coverage**
- **M1 Coverage** (46 problems):
  - Números: Basic coverage (fractions, percentages, powers)
  - Álgebra: Good coverage (equations, functions, factoring)
  - Geometría: Extensive (with visual problems)
  - Probabilidad: Minimal coverage
- **M2 Coverage** (13 problems):
  - Only advanced algebra, geometry, and statistics
  - No coverage for: Límites y Derivadas, Cálculo Integral (mentioned in dashboard but not implemented)

#### 4. **Visual Representation Issues**
- **Problem**: GeometryCanvas component renders visual data but:
  - Uses raw coordinate-based approach
  - Limited figure types (triangle, rectangle, circle, angle)
  - No actual SVG/canvas rendering visible in code
  - Visual scaling and responsive design unclear
  - Cannot handle complex 3D geometry for M2

#### 5. **No Problem Metadata**
- **Missing**: 
  - Time estimates per problem
  - Learning objectives/competencies
  - Prerequisites/dependencies
  - Real-world context flags
  - Common misconceptions
  - Taxonomy level (Bloom's taxonomy)
  - Video tutorial links
- **Impact**: Limited adaptive learning and personalization

#### 6. **Static Quiz Generation**
- **Issue**: `getRandomQuestions()` just shuffles the existing problems
  - No algorithm for difficulty progression
  - No adaptive difficulty based on student performance
  - No spaced repetition system
  - No problem deduplication across sessions
- **Code Location**: `/home/user/math/lib/questions.ts` lines 981-1002

#### 7. **Admin Problem Management**
- **Issue**: `/home/user/math/app/admin/problems/page.tsx` is read-only
  - No Edit/Add/Delete buttons for problems
  - Cannot update problem text, options, or explanations
  - Cannot bulk import problems
  - Filter system exists but no management backend

#### 8. **No Validation/Quality Control**
- **Issues**:
  - No schema validation for problem structure
  - No tests for problem correctness
  - No linting for LaTeX syntax
  - No checks for duplicate IDs or malformed data
  - No difficulty calibration

#### 9. **LaTeX Rendering Fragility**
- **Issue**: Both plain text and LaTeX versions of problems/options/explanations exist
  - Duplicate content (prone to sync errors)
  - No validation that LaTeX renders correctly
  - No fallback if LaTeX version is broken
  - Options array doesn't match optionsLatex array length sometimes

#### 10. **Live Practice Sessions Issue**
- **Problem**: `/home/user/math/app/admin/page.tsx` creates sessions but:
  - Selects random questions from hardcoded list
  - Cannot curate specific problem sets
  - No question pool for live sessions separate from practice

#### 11. **Progress Tracking Limitations**
- **Issue**: Progress saved only to localStorage
  - Lost when browser cleared
  - No cloud persistence
  - No backend tracking of student attempts
  - No detailed analytics on problem performance

#### 12. **Data Type Consistency**
- **Issue**: `correctAnswer` is a 0-3 index but:
  - No validation that options array has exactly 4 items
  - Some problems may have different number of options
  - No type safety preventing this issue

---

## 6. SUMMARY TABLE

| Aspect | Current State | Status |
|--------|---------------|--------|
| **Total Problems** | 59 | Insufficient (need 150-200+) |
| **M1 Problems** | 46 | Acceptable but limited |
| **M2 Problems** | 13 | **CRITICAL - Too few** |
| **Storage** | Hardcoded TypeScript | No database |
| **Add/Edit Problems** | **Not possible** | Requires manual code edit |
| **Visual Problems** | 13 with geometry data | Limited rendering capability |
| **Quiz Modes** | 2 (Zen, Rapid Fire) | Good |
| **Admin Interface** | Read-only explorer | Cannot manage problems |
| **Progress Persistence** | localStorage only | Not production-ready |
| **LaTeX Support** | Partial (optional fields) | Prone to sync errors |
| **Adaptive Learning** | None | No difficulty progression |

---

## 7. RECOMMENDED IMPROVEMENTS PRIORITY

### High Priority (Critical)
1. **Add Database Layer** (PostgreSQL + API routes)
2. **Create Problem Management System** (Admin CRUD interface)
3. **Expand Problem Set** (200+ problems minimum)
4. **Implement Problem Validation** (Schema, LaTeX, integrity checks)

### Medium Priority (Important)
5. **Separate LaTeX from Plain Text** (Single source of truth)
6. **Add Problem Metadata** (Learning objectives, cognitive level)
7. **Implement Spaced Repetition** (Adaptive quiz generation)
8. **Improve Visual Rendering** (SVG-based geometry with responsive design)

### Low Priority (Nice to Have)
9. **Add Analytics Dashboard** (Problem performance metrics)
10. **Implement Problem Difficulty Calibration** (Based on student data)
11. **Add Bulk Import/Export** (CSV, JSON support)
12. **Create Problem Versioning** (Track changes over time)

