# Quick Reference - Skills Array & Curriculum Structure

## Absolute File Paths

### MASTER SKILL DEFINITIONS
```
/home/user/math/lib/skillTaxonomy.ts
  - 80+ skill definitions
  - Skill interface
  - Helper functions: getSkillsByTopic(), getSkillById(), getAllSkillIds()
  - ~617 lines
```

### CURRICULUM CONTENT
```
/home/user/math/components/Curriculum.tsx
  - paesM1Content (4 subjects, ~20 topics total)
  - paesM2AdditionalContent (advanced topics)
  - skillTopicMatrix (evaluated competencies)
  - ~647 lines
```

### QUESTION DATA FILES
```
/home/user/math/lib/questions/index.ts
  - Aggregates all questions
  - Export utility functions
  
Organized by Subject & Level:
  /home/user/math/lib/questions/m1-numeros.ts       (1,378 lines)
  /home/user/math/lib/questions/m1-algebra.ts
  /home/user/math/lib/questions/m1-geometria.ts
  /home/user/math/lib/questions/m1-probabilidad.ts
  /home/user/math/lib/questions/m2-numeros.ts
  /home/user/math/lib/questions/m2-algebra.ts
  /home/user/math/lib/questions/m2-geometria.ts
  /home/user/math/lib/questions/m2-probabilidad.ts
```

### TYPE DEFINITIONS
```
/home/user/math/lib/types.ts
  - Question interface (with skills: string[])
  - UserProgress interface
  - QuestionAttempt interface
  - LiveSession & related types
  - ~104 lines
```

### UI COMPONENTS
```
Dashboard:
  /home/user/math/app/dashboard/page.tsx
    - Practice Card → /practice/m1, /practice/m2
    - Temario Card → /curriculum/m1, /curriculum/m2

Practice Pages:
  /home/user/math/app/practice/m1/page.tsx
  /home/user/math/app/practice/m2/page.tsx

Curriculum Pages:
  /home/user/math/app/curriculum/m1/page.tsx
  /home/user/math/app/curriculum/m2/page.tsx

Components:
  /home/user/math/components/Curriculum.tsx
  /home/user/math/components/CurriculumSidebar.tsx
  /home/user/math/components/Quiz.tsx
  /home/user/math/components/MathDisplay.tsx
```

---

## Key Data At A Glance

### Skill Distribution
| Topic | Count | M1 | M2 |
|-------|-------|----|----|
| Números | 20 | 12 | 8 |
| Álgebra | 20 | 10 | 10 |
| Geometría | 18 | 12 | 6 |
| Probabilidad & Estadística | 22 | 14 | 8 |
| **TOTAL** | **80+** | **48+** | **32+** |

### Exam Content Distribution
**M1 (65 questions, 60 for score)**:
- Números: 37% (24 questions)
- Álgebra y Funciones: 28% (18 questions)
- Geometría: 12% (8 questions)
- Probabilidad y Estadística: 23% (15 questions)

**M2 (55 questions, 50 for score)**:
- Números: 36% (20 questions)
- Álgebra y Funciones: 29% (16 questions)
- Geometría: 15% (8 questions)
- Probabilidad y Estadística: 20% (11 questions)

### Question Distribution
- **M1 Questions**: ~46-50 questions across 4 subject files
- **M2 Questions**: ~13-15 questions across 4 subject files
- **Total**: ~59-65 questions

---

## Essential Code Snippets

### Access Skill Taxonomy
```typescript
import { SKILLS, getSkillsByTopic, getSkillById } from '@/lib/skillTaxonomy';

// Get all skills
const allSkills = Object.values(SKILLS);

// Get skills for a topic
const numeroSkills = getSkillsByTopic('números');

// Get specific skill
const skill = getSkillById('numeros-proporcionalidad');
```

### Access Questions
```typescript
import { 
  questions, 
  getQuestionsByLevel,
  getQuestionsBySubject,
  getRandomQuestions 
} from '@/lib/questions';

// Get M1 questions
const m1Questions = getQuestionsByLevel('M1');

// Get Números questions for M1
const numeroM1 = getQuestionsBySubject('números', 'M1');

// Get 10 random M1 questions
const quiz = getRandomQuestions('M1', 10);

// Get 5 random Álgebra questions for M2
const algebraQuiz = getRandomQuestions('M2', 5, 'álgebra');
```

### Question with Skills
```typescript
// From m1-numeros.ts
{
  id: 'm1-1',
  level: 'M1',
  topic: 'Números y Proporcionalidad',
  subject: 'números',
  question: '...',
  options: ['...', '...', '...', '...'],
  correctAnswer: 1,
  explanation: '...',
  difficulty: 'easy',
  skills: [
    'numeros-proporcionalidad',
    'numeros-proporcionalidad-inversa',
    'numeros-operaciones-basicas'
  ]
}
```

### Curriculum Topic Structure
```typescript
// From Curriculum.tsx
{
  text: 'Proporcionalidad directa e inversa',
  difficulty: 1,
  cognitiveLevel: 'Básico',
  skills: ['Resolver', 'Modelar'],
  realWorldContext: '🏗️ Trabajo y producción',
  example: 'Ej: Si 3 obreros tardan 6 días, ¿cuánto tardan 9 obreros?',
  keyPoints: 'Directa: y = kx, Inversa: y = k/x'
}
```

---

## Evaluated Competencies (Habilidades)

These appear across all curriculum topics:

1. **Resolver** - Problem solving
2. **Modelar** - Mathematical modeling with real contexts
3. **Representar** - Representing in tables, graphs, algebraic forms
4. **Argumentar** - Mathematical reasoning and justification

---

## Recent Changes (Git History)

**Latest Commits**:
```
e981ceb - Place practice and temario cards in the same row
ab50068 - Separate practice and temario into two distinct cards
13a1497 - Combine M1, M2 practice and curriculum into single card
```

**Impact**: Dashboard now has 2-column layout with:
- Practice Card (quizzes)
- Temario Card (curriculum review)

---

## Next Action Items

### For Creating Skills Array:

1. **Read**:
   - [ ] `/home/user/math/lib/skillTaxonomy.ts` - master skill definitions
   - [ ] `/home/user/math/components/Curriculum.tsx` - curriculum structure
   - [ ] `/home/user/math/lib/questions/m1-numeros.ts` - question examples

2. **Analyze**:
   - [ ] Count questions per skill across all 8 question files
   - [ ] Map skills to curriculum topics
   - [ ] Identify skill hierarchies
   - [ ] Calculate average difficulty per skill

3. **Create**:
   - [ ] `/home/user/math/lib/skillsArray.ts` - enhanced skills with metadata
   - [ ] Add `questionsCount`, `relatedTopics`, `difficulty` fields
   - [ ] Implement utility functions for skill access

4. **Integrate**:
   - [ ] Update types if needed
   - [ ] Link to Quiz component for progress tracking
   - [ ] Create skill progress dashboard
   - [ ] Add skill-based question filtering

---

## Documentation Generated

Documents created in `/home/user/math/`:

1. **`CURRICULUM_STRUCTURE.md`** - Detailed 9-section analysis
   - Codebase structure
   - Curriculum/temario locations
   - Data structures
   - Skills competencies
   - Recent changes
   - Skill-topic matrix
   - Content distribution

2. **`SKILLS_ARRAY_SUMMARY.md`** - Implementation guide
   - Executive summary
   - Core files reference
   - How skills connect
   - Creating skills array
   - Implementation steps
   - Key relationships
   - Implementation checklist

3. **`QUICK_REFERENCE.md`** - This file
   - Absolute file paths
   - Key data at a glance
   - Essential code snippets
   - Evaluated competencies
   - Recent changes
   - Action items

---

## Questions Answered

**Q: How are skills currently used?**
A: Questions reference skill IDs in `skills: string[]` array. Curriculum topics mention skill names.

**Q: Where is curriculum content stored?**
A: Inline in `/components/Curriculum.tsx` as two data structures.

**Q: How many question files are there?**
A: 8 files (organized by level M1/M2 and subject).

**Q: Can skills be hierarchical?**
A: Yes, via `parentSkill` field.

**Q: What are the four evaluated competencies?**
A: Resolver, Modelar, Representar, Argumentar.

**Q: What's the recent change about practice vs. temario?**
A: Dashboard now has separate cards for quizzes (practice) and curriculum (temario).

---

## Contact & Support

All files are in `/home/user/math/` repository.
Additional analysis documents: `CURRICULUM_STRUCTURE.md`, `SKILLS_ARRAY_SUMMARY.md`

