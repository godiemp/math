# Skills Array Implementation Guide

## Executive Summary

The PAES Math curriculum application has a well-structured foundation for creating a comprehensive skills array:

- **80+ skills** already defined in `/lib/skillTaxonomy.ts`
- **Questions linked to skills** via `skills: string[]` arrays
- **Curriculum content** organized with topics and cognitive levels
- **Recent changes** separated practice (quizzes) from temario (curriculum)

This document provides everything needed to implement a skills array system.

---

## Core Files Reference

### 1. Skill Taxonomy (Master Reference)
**File**: `/home/user/math/lib/skillTaxonomy.ts` (617 lines)

**What it contains**:
- 80+ skill definitions organized by topic
- Skill interface with id, name, description, topic, and optional parent skill
- Helper functions: `getSkillsByTopic()`, `getSkillById()`, `getAllSkillIds()`, `getSkillNames()`

**Example**:
```typescript
interface Skill {
  id: string;
  name: string;
  description: string;
  topic: 'números' | 'álgebra' | 'geometría' | 'probabilidad';
  parentSkill?: string;
}
```

**Skills Breakdown**:
- **Números**: 20 skills (fractions, decimals, percentages, powers, ratios)
- **Álgebra**: 20 skills (expressions, equations, functions, factoring)
- **Geometría**: 18 skills (shapes, area, volume, angles, trigonometry)
- **Probabilidad y Estadística**: 22 skills (probability, statistics, combinatorics)

---

### 2. Curriculum Content Structure
**File**: `/home/user/math/components/Curriculum.tsx` (647 lines)

**M1 Content** (lines 43-236):
- 4 subjects with multiple topics each
- Each topic includes:
  - `text`: Topic description
  - `difficulty`: 1-3 scale
  - `cognitiveLevel`: 'Básico', 'Medio', or 'Avanzado'
  - `skills`: String array of skill names (NOT IDs - these are loose connections)
  - `realWorldContext`: Real-world application
  - `example`: Sample problem
  - `keyPoints`: Key concepts

**M2 Additional Content** (lines 238-364):
- Advanced topics for each of the 4 subjects
- Same structure as M1 topics

**Topics Summary**:
```
Números (37% of exam, ~24 questions)
├── Enteros y racionales
├── Porcentaje
└── Potencias y raíces

Álgebra y Funciones (28% of exam, ~18 questions)
├── Expresiones algebraicas
├── Ecuaciones e inecuaciones
├── Sistemas de ecuaciones
└── Funciones lineales y cuadráticas

Geometría (12% of exam, ~8 questions)
├── Teorema de Pitágoras
├── Perímetro y área
├── Transformaciones isométricas
└── (M2 additions: Trigonometry, Homotecia)

Probabilidad y Estadística (23% of exam, ~15 questions)
├── Tablas y gráficos
├── Medidas de tendencia central
├── Medidas de posición
└── Reglas de probabilidad
```

---

### 3. Question Data Structure
**File**: `/home/user/math/lib/types.ts` (104 lines)

**Question Interface**:
```typescript
interface Question {
  id: string;                              // 'm1-1'
  level: 'M1' | 'M2';
  topic: string;                           // 'Números y Proporcionalidad'
  subject: 'números' | 'álgebra' | 'geometría' | 'probabilidad';
  question: string;                        // Plain text
  questionLatex?: string;                  // LaTeX version
  options: string[];                       // 4 choices
  optionsLatex?: string[];
  correctAnswer: number;                   // 0-3 index
  explanation: string;
  explanationLatex?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  skills: string[];                        // LINKS TO skillTaxonomy IDs
  visualData?: {
    type: 'graph' | 'geometry' | 'table' | 'diagram';
    data: any;
  };
}
```

**Question Files**:
- `/lib/questions/m1-numeros.ts` (1,378 lines)
- `/lib/questions/m1-algebra.ts`
- `/lib/questions/m1-geometria.ts`
- `/lib/questions/m1-probabilidad.ts`
- `/lib/questions/m2-numeros.ts`
- `/lib/questions/m2-algebra.ts`
- `/lib/questions/m2-geometria.ts`
- `/lib/questions/m2-probabilidad.ts`

**Aggregation**: `/lib/questions/index.ts` combines all 8 files and provides utility functions:
```typescript
getQuestionsByLevel(level: 'M1' | 'M2'): Question[]
getQuestionsByTopic(topic: string): Question[]
getQuestionsBySubject(subject, level?): Question[]
getRandomQuestions(level, count = 10, subject?): Question[]
```

---

### 4. Dashboard & UI Structure
**File**: `/home/user/math/app/dashboard/page.tsx`

**Recent Changes**:
- Separated Practice and Temario into distinct cards (commits e981ceb, ab50068)
- Practice Card: Links to `/practice/m1` and `/practice/m2`
- Temario Card: Links to `/curriculum/m1` and `/curriculum/m2`

**Related Pages**:
- `/app/practice/m1/page.tsx` - M1 quiz interface
- `/app/practice/m2/page.tsx` - M2 quiz interface
- `/app/curriculum/m1/page.tsx` - M1 curriculum view
- `/app/curriculum/m2/page.tsx` - M2 curriculum view

---

## How Skills Connect to Everything

```
Curriculum Topics (Curriculum.tsx)
        ↓ soft links (text names)
Topic "Números y Proporcionalidad"
        ↓ contains skills: ['Resolver', 'Modelar', 'Argumentar']
        
Questions (lib/questions/m1-numeros.ts)
        ↓
Question m1-1: {
  topic: 'Números y Proporcionalidad',
  skills: ['numeros-proporcionalidad', 'numeros-proporcionalidad-inversa']
}
        ↓ hard links (IDs)
Skill Taxonomy (skillTaxonomy.ts)
        ↓
Skill {
  id: 'numeros-proporcionalidad',
  name: 'Proporcionalidad',
  description: 'Proporciones directas e inversas'
}
```

---

## Creating the Skills Array

### Current State
- Skills defined in object notation: `SKILLS: Record<string, Skill>`
- Questions reference skills by ID
- No user progress tracking by skill
- No question counts per skill

### Proposed Enhanced Skills Array

**Create**: `/home/user/math/lib/skillsArray.ts`

```typescript
interface SkillWithProgress extends Skill {
  // Metadata from analysis
  questionsCount: number;              // e.g., 3 questions test this skill
  relatedTopics: string[];             // e.g., ['Números y Proporcionalidad']
  level: 'M1' | 'M2';                 // Which competency level
  cognitiveLevel?: 'Básico' | 'Medio' | 'Avanzado';
  
  // User progress (populated at runtime)
  questionsAttempted: number;
  questionsCorrect: number;
  proficiency: number;                 // 0-100 percentage
  lastAttemptDate?: number;            // timestamp
}

export const SKILLS_ARRAY: SkillWithProgress[] = [
  {
    id: 'numeros-proporcionalidad',
    name: 'Proporcionalidad',
    description: 'Proporciones directas e inversas',
    topic: 'números',
    level: 'M1',
    cognitiveLevel: 'Básico',
    questionsCount: 3,
    relatedTopics: ['Números y Proporcionalidad'],
    questionsAttempted: 0,
    questionsCorrect: 0,
    proficiency: 0,
  },
  // ... 80+ more skills
];
```

### Implementation Steps

**Phase 1: Analyze & Count** (Current)
1. Parse all 8 question files
2. Count questions per skill
3. Identify related curriculum topics
4. Determine difficulty/cognitive level

**Phase 2: Build Skills Array**
1. Create `skillsArray.ts`
2. Convert existing skills to enhanced format
3. Add metadata: question counts, topics, levels
4. Export array and utility functions

**Phase 3: Integrate with UI**
1. Update Quiz component to track skill progress
2. Create skill progress dashboard
3. Add filters to question selection by skill
4. Display skill recommendations

**Phase 4: User Tracking**
1. Extend user profile to store skill proficiency
2. Calculate proficiency from question attempts
3. Implement spaced repetition by skill
4. Show skill-based learning recommendations

---

## Key Relationships

### Skill Hierarchy
- Parent skills group related concepts
- Child skills are specific competencies
- Example:
  ```
  numeros-fracciones (parent)
  ├── numeros-fracciones-suma
  └── numeros-fracciones-comun-denominador
  ```

### Four Core Evaluated Competencies
Appears across all 4 subjects:
1. **Resolver** - Problem solving
2. **Modelar** - Mathematical modeling
3. **Representar** - Different representations
4. **Argumentar** - Mathematical argumentation

### Content Distribution (Exam Percentages)
- **M1** (65 questions, 60 scored):
  - Números: 37% (~24 questions)
  - Álgebra y Funciones: 28% (~18 questions)
  - Geometría: 12% (~8 questions)
  - Probabilidad y Estadística: 23% (~15 questions)

- **M2** (55 questions, 50 scored):
  - Números: 36% (~20 questions)
  - Álgebra y Funciones: 29% (~16 questions)
  - Geometría: 15% (~8 questions)
  - Probabilidad y Estadística: 20% (~11 questions)

---

## Implementation Checklist

### Analysis Phase
- [ ] Review skillTaxonomy.ts (80+ skills)
- [ ] Count questions per skill across 8 question files
- [ ] Map skills to curriculum topics
- [ ] Identify skill hierarchies
- [ ] Document skill difficulty levels

### Development Phase
- [ ] Create `/lib/skillsArray.ts` file
- [ ] Define `SkillWithProgress` interface
- [ ] Build SKILLS_ARRAY with metadata
- [ ] Create utility functions:
  - `getSkillsForTopic(topic: string)`
  - `getSkillsWithQuestionCount()`
  - `calculateUserProficiency(userId, skillId)`
  - `getRecommendedSkills(userId)`

### Integration Phase
- [ ] Update types.ts if needed
- [ ] Modify Quiz component to use skills array
- [ ] Create skill progress hooks
- [ ] Build skill-based filtering in practice
- [ ] Display skill progress dashboard

### Testing Phase
- [ ] Verify skill-question mappings
- [ ] Test proficiency calculations
- [ ] Validate question filtering by skill
- [ ] Test user progress persistence

---

## File Dependencies (After Implementation)

```
skillsArray.ts (new, extends skillTaxonomy)
    ├─→ types.ts (uses Skill interface)
    ├─→ questions/index.ts (links to questions)
    ├─→ components/Quiz.tsx (tracks progress)
    ├─→ app/dashboard/page.tsx (shows progress)
    └─→ skillTaxonomy.ts (extends base skills)
```

---

## Next Steps

1. **Now**: Review this documentation
2. **Next**: Examine the actual files referenced
   - Start with `/lib/skillTaxonomy.ts`
   - Then `/components/Curriculum.tsx`
   - Then a sample question file like `/lib/questions/m1-numeros.ts`
3. **Then**: Create `/lib/skillsArray.ts` with enhanced skill structure
4. **Finally**: Integrate with UI components

---

## Supporting Documentation

Additional documents created:
- `/CURRICULUM_STRUCTURE.md` - Complete codebase structure analysis
- `SKILLS_ARRAY_SUMMARY.md` - This file

---

## Questions & Clarifications

### Q: Where are skills currently used?
**A**: In two places:
1. **Questions**: `skills: string[]` array of skill IDs (hard links)
2. **Curriculum Topics**: `skills: string[]` array of skill names (soft references like 'Resolver')

### Q: Why create a separate skills array?
**A**: To:
1. Add metadata (question counts, difficulty, related topics)
2. Track user progress per skill
3. Enable skill-based filtering and recommendations
4. Support spaced repetition by skill

### Q: How many skills are there?
**A**: 80+ organized as:
- 20 for Números
- 20 for Álgebra
- 18 for Geometría
- 22 for Probabilidad y Estadística

### Q: Can skills have children?
**A**: Yes, via `parentSkill` field. Example:
- Parent: `numeros-potencias`
- Children: `numeros-potencias-propiedades`

### Q: Are questions already linked to skills?
**A**: Yes! Each Question has `skills: string[]` with skill IDs. However, you might find some inconsistencies or incomplete linkages.

