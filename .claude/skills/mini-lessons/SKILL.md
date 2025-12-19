---
name: mini-lessons
description: Create interactive mini-lessons for the PAES math curriculum. Use when the user wants to add a new lesson, create lesson content, or implement lesson steps.
---

# Mini-Lessons Creation Skill

This skill guides you through creating interactive mini-lessons for the PAES mathematics curriculum. Each lesson follows a 6-step pedagogical structure with engaging hooks, interactive exploration, clear explanations, classification exercises, guided practice, and checkpoint assessments.

## When to Use This Skill

Invoke this skill when:
- User asks to "create a new lesson" or "add a mini-lesson"
- User wants to implement a specific topic from the curriculum
- User needs help with lesson step components
- User asks about lesson structure or patterns
- User wants to add content to an existing thematic unit

## Lesson Architecture Overview

### The 6-Step Structure

Every mini-lesson follows this pedagogical flow:

| Step | Type | Purpose | Required |
|------|------|---------|----------|
| 1 | `hook` | Engage with real-world scenario or puzzle | ✅ |
| 2 | `explore` | Interactive discovery of patterns | ✅ |
| 3 | `explain` | Theory and concept explanation | ❌ |
| 4 | `explore` | Classification or identification exercises | ✅ |
| 5 | `practice` | Guided problem-solving practice | ✅ |
| 6 | `verify` | Checkpoint quiz (3/4 to pass) | ✅ |

### File Organization

```
app/lessons/m1/{lesson-slug}/
  └─ page.tsx                    # Main lesson page

components/lessons/m1/{lesson-slug}/
  ├─ Step1Hook.tsx               # Engaging scenario
  ├─ Step2Explore.tsx            # Pattern discovery
  ├─ Step3Explain.tsx            # Theory explanation
  ├─ Step4Classify.tsx           # Classification exercise
  ├─ Step5Practice.tsx           # Guided practice
  ├─ Step6Verify.tsx             # Checkpoint quiz
  └─ index.ts                    # Barrel exports

lib/lessons/types.ts             # Lesson registry (add definition here)
```

## Step-by-Step Creation Process

### Phase 1: Gather Requirements

Before creating a lesson, determine:

1. **Topic**: What mathematical concept will this teach?
2. **Thematic Unit**: Which PAES curriculum unit does this belong to? (e.g., M1-ALG-001)
3. **MINEDUC OA** (REQUIRED): Which learning objectives does this cover? (e.g., MA1M-OA-03)
4. **Lesson ID**: What's the next letter in the sequence? (a, b, c, d, e...)
5. **Skills**: What skills from the taxonomy will this develop?
6. **Duration**: Estimated completion time (typically 12-17 minutes)

### Dual Classification System

Every lesson must be classified in TWO ways:

| Classification | Purpose | Example |
|----------------|---------|---------|
| **Thematic Unit** | PAES exam topic organization | `M1-ALG-001` |
| **MINEDUC OA** | School curriculum & grade level | `MA1M-OA-03` |

**The MINEDUC OA code determines the school grade level:**

| OA Prefix | Grade Level |
|-----------|-------------|
| `MA1M-OA-XX` | 1° Medio |
| `MA2M-OA-XX` | 2° Medio |
| `MA3M-OA-XX` | 3° Medio |
| `MA4M-OA-XX` | 4° Medio |

**Check existing lessons in the thematic unit:**
```bash
grep -A5 "thematicUnit: 'M1-ALG-001'" lib/lessons/lessons/algebra.ts
```

**Check MINEDUC OA definitions:**
```bash
grep -A10 "code: 'MA1M-OA-03'" lib/curriculum/mineduc.ts
```

### Phase 2: Create Directory Structure

```bash
mkdir -p components/lessons/m1/{lesson-slug}
mkdir -p app/lessons/m1/{lesson-slug}
```

### Phase 3: Create Step Components

Create each step following the templates in `step-templates.md`.

**Critical patterns for ALL steps:**

```typescript
'use client';

import { LessonStepProps } from '@/lib/lessons/types';

export default function StepN({ onComplete, isActive }: LessonStepProps) {
  // MUST check isActive - return null if not active
  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Step content */}

      {/* MUST call onComplete when step is done */}
      <button onClick={onComplete}>Continue</button>
    </div>
  );
}
```

### Phase 4: Create Index Exports

```typescript
// components/lessons/m1/{lesson-slug}/index.ts
export { default as Step1Hook } from './Step1Hook';
export { default as Step2Explore } from './Step2Explore';
export { default as Step3Explain } from './Step3Explain';
export { default as Step4Classify } from './Step4Classify';
export { default as Step5Practice } from './Step5Practice';
export { default as Step6Verify } from './Step6Verify';
```

### Phase 5: Create Page Component

```typescript
// app/lessons/m1/{lesson-slug}/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { LessonShell } from '@/components/lessons/shared';
import { getLessonBySlug } from '@/lib/lessons/types';
import {
  Step1Hook,
  Step2Explore,
  Step3Explain,
  Step4Classify,
  Step5Practice,
  Step6Verify,
} from '@/components/lessons/m1/{lesson-slug}';

const LESSON_SLUG = '{lesson-slug}';

export default function LessonPage() {
  const router = useRouter();
  const lesson = getLessonBySlug(LESSON_SLUG);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Lección no encontrada</p>
      </div>
    );
  }

  const handleComplete = () => router.push('/mini-lessons');
  const handleExit = () => router.push('/mini-lessons');

  return (
    <LessonShell lesson={lesson} onComplete={handleComplete} onExit={handleExit}>
      {({ currentStep, completeStep }) => {
        const stepComponents = [
          <Step1Hook key="step1" onComplete={completeStep} isActive={currentStep === 0} />,
          <Step2Explore key="step2" onComplete={completeStep} isActive={currentStep === 1} />,
          <Step3Explain key="step3" onComplete={completeStep} isActive={currentStep === 2} />,
          <Step4Classify key="step4" onComplete={completeStep} isActive={currentStep === 3} />,
          <Step5Practice key="step5" onComplete={completeStep} isActive={currentStep === 4} />,
          <Step6Verify key="step6" onComplete={completeStep} isActive={currentStep === 5} />,
        ];
        return stepComponents[currentStep] || null;
      }}
    </LessonShell>
  );
}
```

### Phase 6: Register in Lesson Types

Add to the appropriate subject file in `lib/lessons/lessons/` (e.g., `algebra.ts`, `numeros.ts`, `geometria.ts`, `probabilidad.ts`):

```typescript
{
  id: 'm1-xxx-001-x',           // Format: m{level}-{subject}-{unit}-{letter}
  slug: 'lesson-slug',          // URL-friendly, kebab-case
  title: 'Lesson Title',        // Spanish, descriptive
  description: 'Brief description of what the lesson teaches.',
  level: 'M1',                  // M1 or M2 (PAES level)
  subject: 'álgebra',           // 'números' | 'álgebra' | 'geometría' | 'probabilidad'
  thematicUnit: 'M1-XXX-001',   // PAES thematic unit
  skills: ['skill-1', 'skill-2'],  // From skill taxonomy
  estimatedMinutes: 14,         // Typical: 12-17 minutes
  minEducOA: ['MA1M-OA-03'],    // REQUIRED: MINEDUC OA (determines grade level)
  steps: [
    { id: 'hook', type: 'hook', title: 'Step Title' },
    { id: 'explore', type: 'explore', title: 'Step Title' },
    { id: 'explain', type: 'explain', title: 'Step Title' },
    { id: 'classify', type: 'explore', title: 'Step Title' },
    { id: 'practice', type: 'practice', title: 'Step Title' },
    { id: 'verify', type: 'verify', title: 'Checkpoint' },
  ],
},
```

**Important**: The `minEducOA` field is REQUIRED and determines the school grade level:
- `MA1M-OA-XX` → Lesson is for 1° Medio
- `MA2M-OA-XX` → Lesson is for 2° Medio
- `MA3M-OA-XX` → Lesson is for 3° Medio
- `MA4M-OA-XX` → Lesson is for 4° Medio

## Step Component Patterns

### Step 1: Hook (Engagement)

**Purpose**: Capture attention with a relatable scenario or puzzle.

**Pattern**:
- Present a real-world problem or intriguing question
- Use visual elements (SVG, emoji, illustrations)
- Ask a multiple-choice prediction question
- Reveal the connection to the math concept

**Example scenarios by subject**:
- **Algebra**: Carpenter calculating dimensions, organizing items
- **Numbers**: Sharing pizza, temperature changes, elevator movements
- **Geometry**: Architect designing, measuring real objects
- **Probability**: Games, weather prediction, sports statistics

### Step 2: Explore (Discovery)

**Purpose**: Guide students to discover patterns through interaction.

**Pattern**:
- Show 3-4 examples of increasing complexity
- Use interactive elements (clickable, draggable)
- Reveal patterns progressively
- Summarize discovered rules at the end

### Step 3: Explain (Theory)

**Purpose**: Formalize the concept with clear explanations.

**Pattern**:
- Use tabbed interface for multiple related formulas/concepts
- Include worked examples for each concept
- Add "Tips" and "Common Errors" sections
- Keep theoretical but accessible

### Step 4: Classify (Identification)

**Purpose**: Practice identifying/categorizing the concept.

**Pattern**:
- 5 classification exercises
- Clear category options (2-4 choices)
- Immediate feedback with explanations
- Progress tracking with visual indicators
- Retry option if score < 4/5

### Step 5: Practice (Application)

**Purpose**: Apply knowledge through guided problem-solving.

**Pattern**:
- 4-5 problems with multiple-choice answers
- Optional hints for each problem
- Detailed step-by-step explanations
- Progress tracking
- Retry option if score < 3/5 or 4/5

### Step 6: Verify (Assessment)

**Purpose**: Confirm learning with checkpoint quiz.

**ALWAYS use the shared CheckpointQuiz component:**

```typescript
'use client';

import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: 'Question text here?',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswer: 1,  // 0-indexed
    explanation: 'Explanation of why this answer is correct.',
  },
  // Add 3-4 questions total
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}  // Default: 75% of questions
      successMessage="Custom success message here!"
    />
  );
}
```

## Shared Components

Import from `@/components/lessons/shared`:

| Component | Use For |
|-----------|---------|
| `LessonShell` | Wrapping the entire lesson page |
| `CheckpointQuiz` | Step 6 verify component |
| `Celebration` | Success animations (rarely needed with CheckpointQuiz) |
| `NumberLine` | Visualizing number concepts |
| `BarChart` | Data visualization |
| `PieChart` | Probability/statistics |
| `FrequencyTable` | Statistics lessons |
| `FactorGrid` | Factorization concepts |
| `VennDiagram` | Set theory, probability |

## Styling Conventions

### Colors by Context

```
- Hook/Scenario: amber/orange gradients
- Explore/Discovery: blue/purple gradients
- Explain/Theory: purple/pink gradients
- Correct feedback: green
- Incorrect feedback: red/amber
- Hints: amber/yellow with Lightbulb icon
```

### Common Tailwind Patterns

```typescript
// Container with animation
<div className="space-y-8 animate-fadeIn">

// Gradient card
<div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">

// Button styles
<button className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg">

// Progress indicator
<div className={cn(
  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
  isComplete ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
)}>
```

### Icons (from lucide-react)

```typescript
import {
  Check, X,              // Feedback
  ArrowRight,            // Navigation
  Lightbulb,             // Hints
  Sparkles,              // Discovery moments
  RotateCcw,             // Retry
  Trophy,                // Success
  AlertTriangle,         // Warnings/tips
  BookOpen,              // Theory/explain
} from 'lucide-react';
```

## Thematic Units Reference

### M1 - Algebra (M1-ALG-001 to M1-ALG-014)

| Code | Topic |
|------|-------|
| M1-ALG-001 | Productos notables, factorizaciones y desarrollo |
| M1-ALG-002 | Operatoria con expresiones algebraicas |
| M1-ALG-003 | Problemas algebraicos en distintos contextos |
| M1-ALG-006 | Resolución de ecuaciones e inecuaciones lineales |
| M1-ALG-011 | Resolución de ecuaciones de segundo grado |

### M1 - Numbers (M1-NUM-001 to M1-NUM-008)

| Code | Topic |
|------|-------|
| M1-NUM-001 | Operaciones y orden en números enteros |
| M1-NUM-002 | Operaciones y comparación entre racionales |
| M1-NUM-003 | Potencias de base racional y exponente entero |

### M1 - Geometry (M1-GEO-001 to M1-GEO-005)

| Code | Topic |
|------|-------|
| M1-GEO-001 | Teorema de Pitágoras y aplicaciones |
| M1-GEO-002 | Perímetros y áreas de figuras compuestas |
| M1-GEO-003 | Teorema de Thales y semejanza |

### M1 - Probability (M1-PROB-001 to M1-PROB-005)

| Code | Topic |
|------|-------|
| M1-PROB-001 | Tablas y gráficos estadísticos |
| M1-PROB-002 | Medidas de tendencia central |
| M1-PROB-004 | Reglas de probabilidades |

## Checklist Before Completion

- [ ] All 6 step components created
- [ ] Index.ts exports all steps
- [ ] Page.tsx created with LessonShell
- [ ] Lesson registered in subject file (algebra.ts, numeros.ts, etc.)
- [ ] `thematicUnit` field set with PAES thematic unit code
- [ ] `minEducOA` field set (REQUIRED - determines school grade level)
- [ ] Step6Verify uses CheckpointQuiz component
- [ ] All steps check `isActive` prop
- [ ] All steps call `onComplete` when done
- [ ] Dark mode classes included (`dark:`)
- [ ] Responsive design considered
- [ ] Spanish language used throughout
- [ ] No lint or TypeScript errors

## Quick Start Command

To create a new lesson skeleton:

```bash
# Create directories
mkdir -p components/lessons/m1/{slug} app/lessons/m1/{slug}

# Then create files following the templates above
```

## Example: Complete Lesson Reference

For a complete example of a well-structured lesson, refer to:

- `components/lessons/m1/factor-comun/` - Factorización por Factor Común
- `components/lessons/m1/productos-notables-cubos/` - Productos Notables: Cubos
- `components/lessons/m1/terminos-semejantes/` - Términos Semejantes

These lessons demonstrate all patterns and conventions described in this skill.
