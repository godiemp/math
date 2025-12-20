---
name: mini-lessons
description: Create interactive mini-lessons for the PAES math curriculum. Use when the user wants to add a new lesson, create lesson content, or implement lesson steps.
---

# Mini-Lessons Creation Skill

This skill guides you through creating world-class interactive mini-lessons for the PAES mathematics curriculum. Each lesson follows a 6-step pedagogical structure designed to maximize learning.

## When to Use This Skill

Invoke this skill when:
- User asks to "create a new lesson" or "add a mini-lesson"
- User wants to implement a specific topic from the curriculum
- User needs help with lesson step components
- User asks about lesson structure or patterns

---

# TWO-PHASE WORKFLOW

Creating a mini-lesson requires TWO mandatory phases:

```
┌─────────────────────────────────────────────────────────────┐
│  PHASE 1: DEEP THINKING (Pedagogical Design)                │
│  ─────────────────────────────────────────────────────────  │
│  Use extended thinking to complete pedagogical design       │
│  BEFORE writing any code.                                   │
│                                                             │
│  Read: .claude/skills/mini-lessons/pedagogical-design.md    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  PHASE 2: IMPLEMENTATION (Error-Free Execution)             │
│  ─────────────────────────────────────────────────────────  │
│  Follow the 5 Critical Rules and create all files.          │
│                                                             │
│  Read: .claude/skills/mini-lessons/anti-patterns.md         │
│  Read: .claude/skills/mini-lessons/step-templates.md        │
└─────────────────────────────────────────────────────────────┘
```

---

# PHASE 1: DEEP THINKING (Summary)

**MANDATORY**: Before writing ANY code, use extended thinking to complete:

1. **Learning Objective Analysis** - What concept, prerequisites, misconceptions?
2. **ZPD Analysis** - Scaffolding strategy from current ability to learning edge
3. **Lesson Narrative Arc** - Cognitive AND emotional journey for all 6 steps
4. **Real-World Hook Design** - Culturally relevant, genuinely puzzling scenario
5. **Multiple Representations** - Visual, symbolic, verbal, kinesthetic, numeric

**For detailed frameworks and templates, read:**
→ `.claude/skills/mini-lessons/pedagogical-design.md`

---

# PHASE 2: IMPLEMENTATION

## The 6-Step Structure

| Step | Type | Purpose | Required |
|------|------|---------|----------|
| 1 | `hook` | Engage with real-world scenario | Yes |
| 2 | `explore` | Interactive discovery of patterns | Yes |
| 3 | `explain` | Theory with tabbed interface | Optional |
| 4 | `explore` | Classification exercises | Yes |
| 5 | `practice` | Guided problem-solving | Yes |
| 6 | `verify` | Checkpoint quiz (3/4 to pass) | Yes |

### Acceptable Variations

While the patterns above are preferred, these variations are also acceptable:

1. **Phase-based Step3Explain**: For linear content, back/forward navigation is valid
   - See `anti-patterns.md` → "Valid Alternative Patterns"

2. **Custom Step6Verify**: When questions need embedded charts/diagrams
   - Must document why CheckpointQuiz isn't sufficient

3. **5-Step Pipeline**: Some geometry lessons skip Step3Explain
   - Only for lessons where theory is integrated into exploration

## File Organization

```
app/lessons/m1/{lesson-slug}/
  └─ page.tsx                    # Main lesson page

components/lessons/m1/{lesson-slug}/
  ├─ Step1Hook.tsx
  ├─ Step2Explore.tsx
  ├─ Step3Explain.tsx
  ├─ Step4Classify.tsx
  ├─ Step5Practice.tsx
  ├─ Step6Verify.tsx
  └─ index.ts                    # Barrel exports

lib/lessons/lessons/{subject}.ts  # Lesson registry
```

---

## 5 CRITICAL IMPLEMENTATION RULES

These rules are NON-NEGOTIABLE. Violating them creates broken lessons.

### RULE 1: isActive Check (MANDATORY)

```typescript
export default function StepN({ onComplete, isActive }: LessonStepProps) {
  const [state, setState] = useState(...);

  if (!isActive) return null;  // THIS LINE IS MANDATORY

  return <div>...</div>;
}
```

### RULE 2: onComplete Call (MANDATORY)

```typescript
<button onClick={onComplete}>Continuar</button>
```

Every step MUST call `onComplete` when finished.

### RULE 3: Tips INSIDE Tabs (Step3Explain)

Tips MUST be inside a dedicated "Tips" tab, NOT as a standalone section.

```typescript
// 1. Include 'tips' in TabId type
type TabId = 'formula1' | 'formula2' | 'tips';

// 2. Conditional rendering
{activeTab === 'tips' ? (
  <TipsContent />
) : (
  <FormulaContent />
)}
```

**CANONICAL EXAMPLE**: `components/lessons/m1/factor-comun/Step3Explain.tsx`

### RULE 4: CheckpointQuiz for Step6 (MANDATORY)

```typescript
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Pregunta?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'Explicación.',
  },
  // 3-4 questions total
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Excelente!"
    />
  );
}
```

### RULE 5: Dark Mode Classes (MANDATORY)

```typescript
// CORRECT
<div className="bg-blue-50 dark:bg-blue-900/30 text-gray-700 dark:text-gray-300">

// WRONG - missing dark: variants
<div className="bg-blue-50 text-gray-700">
```

---

## Anti-Pattern Detection

Before completing, verify NO anti-patterns exist.

**Read the full anti-pattern guide:**
→ `.claude/skills/mini-lessons/anti-patterns.md`

**Quick Checks:**
- [ ] Search for "Tips" - must be inside `{activeTab === 'tips' ? ...}`
- [ ] Search for `if (!isActive) return null;` - must exist in ALL steps
- [ ] Step6Verify should be ~30-40 lines (using CheckpointQuiz)
- [ ] Search for `bg-` - must have `dark:` variant

---

## Step Templates

For complete code templates with placeholders, read:
→ `.claude/skills/mini-lessons/step-templates.md`

---

## Lesson Registration

Add to `lib/lessons/lessons/{subject}.ts`:

```typescript
{
  id: 'm1-xxx-001-x',
  slug: 'lesson-slug',
  title: 'Título de la Lección',
  description: 'Descripción breve.',
  level: 'M1',
  subject: 'álgebra',  // 'números' | 'álgebra' | 'geometría' | 'probabilidad'
  thematicUnit: 'M1-XXX-001',
  skills: ['skill-1', 'skill-2'],
  estimatedMinutes: 14,
  minEducOA: ['MA1M-OA-XX'],
  steps: [
    { id: 'hook', type: 'hook', title: 'Título del Hook' },
    { id: 'explore', type: 'explore', title: 'Descubre el Patrón' },
    { id: 'explain', type: 'explain', title: 'La Teoría' },
    { id: 'classify', type: 'explore', title: 'Clasifica' },
    { id: 'practice', type: 'practice', title: 'Practica' },
    { id: 'verify', type: 'verify', title: 'Checkpoint' },
  ],
},
```

---

## Page Component Template

```typescript
'use client';

import { useRouter } from 'next/navigation';
import { LessonShell } from '@/components/lessons/shared';
import { getLessonBySlug } from '@/lib/lessons/types';
import {
  Step1Hook, Step2Explore, Step3Explain,
  Step4Classify, Step5Practice, Step6Verify,
} from '@/components/lessons/m1/{lesson-slug}';

const LESSON_SLUG = '{lesson-slug}';

export default function LessonPage() {
  const router = useRouter();
  const lesson = getLessonBySlug(LESSON_SLUG);

  if (!lesson) {
    return <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Lección no encontrada</p>
    </div>;
  }

  return (
    <LessonShell
      lesson={lesson}
      onComplete={() => router.push('/mini-lessons')}
      onExit={() => router.push('/mini-lessons')}
    >
      {({ currentStep, completeStep }) => {
        const steps = [
          <Step1Hook key="1" onComplete={completeStep} isActive={currentStep === 0} />,
          <Step2Explore key="2" onComplete={completeStep} isActive={currentStep === 1} />,
          <Step3Explain key="3" onComplete={completeStep} isActive={currentStep === 2} />,
          <Step4Classify key="4" onComplete={completeStep} isActive={currentStep === 3} />,
          <Step5Practice key="5" onComplete={completeStep} isActive={currentStep === 4} />,
          <Step6Verify key="6" onComplete={completeStep} isActive={currentStep === 5} />,
        ];
        return steps[currentStep] || null;
      }}
    </LessonShell>
  );
}
```

---

## Index Exports

```typescript
// components/lessons/m1/{lesson-slug}/index.ts
export { default as Step1Hook } from './Step1Hook';
export { default as Step2Explore } from './Step2Explore';
export { default as Step3Explain } from './Step3Explain';
export { default as Step4Classify } from './Step4Classify';
export { default as Step5Practice } from './Step5Practice';
export { default as Step6Verify } from './Step6Verify';
```

---

## Quality Gates

All gates must pass before completion.

### Gate 1: Pedagogical Quality
- [ ] Hook uses real-world scenario (not abstract math)
- [ ] Explore has discovery BEFORE explanation
- [ ] Explain has Tips INSIDE tabs
- [ ] Progressive difficulty curve
- [ ] All text in Spanish
- [ ] Growth mindset language ("¡Casi!" not "Incorrecto")

### Gate 2: Technical Compliance
- [ ] All 6 step components created
- [ ] index.ts exports all steps
- [ ] page.tsx uses LessonShell
- [ ] Lesson registered in lib/lessons/lessons/{subject}.ts
- [ ] No TypeScript errors
- [ ] No lint errors

### Gate 3: Implementation Rules
- [ ] **RULE 1**: isActive check in ALL steps
- [ ] **RULE 2**: onComplete called in ALL steps
- [ ] **RULE 3**: Tips inside tabs (Step3)
- [ ] **RULE 4**: CheckpointQuiz used (Step6)
- [ ] **RULE 5**: Dark mode classes on ALL colors

### Gate 4: Content Quality
- [ ] Checkpoint questions test ALL steps
- [ ] Explanations are clear and step-by-step
- [ ] Hints are genuinely helpful
- [ ] Duration is 12-17 minutes

---

## Quick Reference

**For detailed reference materials, read:**
→ `.claude/skills/mini-lessons/reference.md`

### Exemplar Lessons (Study These)
- `components/lessons/m1/factor-comun/` - Best Tips-in-tabs pattern
- `components/lessons/m1/terminos-semejantes/` - Best hook design
- `components/lessons/m1/figuras-compuestas/` - Best visual exploration

### DO NOT Copy
- `components/lessons/m1/productos-notables-cubos/Step3Explain.tsx` - Tips outside tabs

### Shared Components
Import from `@/components/lessons/shared`:
- `LessonShell` - Lesson page wrapper
- `CheckpointQuiz` - Step 6 verify (ALWAYS use)
- `Celebration`, `NumberLine`, `BarChart`, `PieChart`, `VennDiagram`

---

## Final Checklist

- [ ] Phase 1 thinking completed
- [ ] All 6 step components created
- [ ] index.ts exports all steps
- [ ] page.tsx with LessonShell
- [ ] Lesson registered in types
- [ ] All 5 rules verified
- [ ] No anti-patterns
- [ ] All quality gates passed
- [ ] Spanish throughout
- [ ] No errors
