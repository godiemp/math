# Mini-Lesson Toolbox

Composable hooks and primitives to build lesson step components faster while keeping full control.

---

## Hooks

Import from `@/hooks/lessons`:

### useMultipleChoice

Manages state for a sequence of multiple-choice items (Step4Classify, Step5Practice).

```typescript
import { useMultipleChoice } from '@/hooks/lessons';

const mc = useMultipleChoice({
  items: PROBLEMS,
  getCorrectAnswer: (item) => item.correctAnswer,
  passThreshold: 4,  // Number of correct answers to pass (default: 70% of items)
});
```

**State:**
| Property | Type | Description |
|----------|------|-------------|
| `currentIndex` | `number` | Current item index |
| `currentItem` | `T` | Current item object |
| `selectedAnswer` | `string \| number \| null` | User's selection |
| `showFeedback` | `boolean` | Whether to show correct/incorrect |
| `correctCount` | `number` | Number of correct answers |
| `answers` | `(string \| number \| null)[]` | All answers given |
| `isCorrect` | `boolean` | Whether selected answer is correct |
| `isComplete` | `boolean` | Whether all items answered |
| `passed` | `boolean` | Whether user passed the threshold |

**Actions:**
| Method | Description |
|--------|-------------|
| `select(answer)` | Select an answer |
| `check()` | Check the answer and show feedback |
| `next()` | Move to next item |
| `reset()` | Reset all state |

### useHintToggle

Manages hint visibility for practice problems.

```typescript
import { useHintToggle } from '@/hooks/lessons';

const hint = useHintToggle();

// When moving to next problem, hide hint
const handleNext = () => {
  hint.hideHint();
  mc.next();
};
```

**State:**
| Property | Type | Description |
|----------|------|-------------|
| `showHint` | `boolean` | Whether hint is visible |

**Actions:**
| Method | Description |
|--------|-------------|
| `toggleHint()` | Toggle visibility |
| `hideHint()` | Hide the hint |

---

## UI Primitives

Import from `@/components/lessons/primitives`:

### ProgressDots

Progress indicator showing current position and status of all items.

```typescript
import { ProgressDots } from '@/components/lessons/primitives';

<ProgressDots
  items={PROBLEMS}
  currentIndex={mc.currentIndex}
  getStatus={(item, index) =>
    mc.answers[index] !== null
      ? mc.answers[index] === item.correctAnswer
        ? 'correct'
        : 'incorrect'
      : index === mc.currentIndex
        ? 'current'
        : 'pending'
  }
  size="md"  // 'sm' | 'md' | 'lg'
/>
```

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `items` | `T[]` | Yes | Array of items |
| `currentIndex` | `number` | Yes | Current item index |
| `getStatus` | `(item, index) => ProgressDotStatus` | Yes | Returns status for each item |
| `renderLabel` | `(item, index, status) => ReactNode` | No | Custom label renderer |
| `size` | `'sm' \| 'md' \| 'lg'` | No | Dot size (default: 'md') |

---

### FeedbackPanel

Shows correct/incorrect feedback with explanation.

```typescript
import { FeedbackPanel } from '@/components/lessons/primitives';

{mc.showFeedback && (
  <FeedbackPanel
    isCorrect={mc.isCorrect}
    explanation={mc.currentItem.explanation}
    title="¡Muy bien!"  // Optional custom title
  />
)}
```

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isCorrect` | `boolean` | Yes | Whether answer was correct |
| `explanation` | `string` | Yes | Explanation text |
| `title` | `string` | No | Custom title (default: "¡Correcto!" / "Incorrecto") |

---

### OptionButton

Answer option button with selection and feedback states.

```typescript
import { OptionButton } from '@/components/lessons/primitives';

{options.map((option, index) => (
  <OptionButton
    key={index}
    label={option}
    index={index}
    isSelected={mc.selectedAnswer === index}
    isCorrect={index === correctAnswer}
    showFeedback={mc.showFeedback}
    onClick={() => mc.select(index)}
    variant="list"  // 'list' | 'grid'
    isMono         // Use monospace font for math
  />
))}
```

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | `string` | Yes | Option text |
| `index` | `number` | Yes | Option index (for letter A, B, C...) |
| `isSelected` | `boolean` | Yes | Whether this option is selected |
| `isCorrect` | `boolean` | Yes | Whether this is the correct answer |
| `showFeedback` | `boolean` | Yes | Whether to show correct/incorrect states |
| `onClick` | `() => void` | Yes | Click handler |
| `variant` | `'list' \| 'grid'` | No | Layout variant (default: 'list') |
| `isMono` | `boolean` | No | Use monospace font |
| `disabled` | `boolean` | No | Disable the button |

---

### HintPanel

Collapsible hint with toggle button.

```typescript
import { HintPanel } from '@/components/lessons/primitives';

<HintPanel
  hint={mc.currentItem.hint}
  isVisible={hint.showHint}
  onToggle={hint.toggleHint}
/>
```

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `hint` | `string` | Yes | Hint text |
| `isVisible` | `boolean` | Yes | Whether hint is shown |
| `onToggle` | `() => void` | Yes | Toggle handler |
| `hideToggle` | `boolean` | No | Hide the toggle button (for inline use) |

---

### ActionButton

Primary action button with gradient styles.

```typescript
import { ActionButton } from '@/components/lessons/primitives';

<ActionButton
  onClick={mc.showFeedback ? mc.next : mc.check}
  disabled={!mc.showFeedback && mc.selectedAnswer === null}
  variant="primary"  // 'primary' | 'secondary' | 'success'
>
  {mc.showFeedback ? 'Siguiente' : 'Verificar'}
</ActionButton>
```

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `ReactNode` | Yes | Button content |
| `onClick` | `() => void` | Yes | Click handler |
| `disabled` | `boolean` | No | Disable the button |
| `variant` | `'primary' \| 'secondary' \| 'success'` | No | Color variant (default: 'primary') |
| `icon` | `ReactNode` | No | Icon element |
| `iconPosition` | `'left' \| 'right'` | No | Icon position (default: 'right') |

---

### ResultsSummary

End-of-step results display with pass/fail theming.

```typescript
import { ResultsSummary } from '@/components/lessons/primitives';

<ResultsSummary
  correctCount={mc.correctCount}
  totalCount={PROBLEMS.length}
  passed={mc.passed}
  passThreshold={4}
  successMessage="¡Excelente!"
  failureMessage="¡Buen intento!"
  successSubtext="Dominas este tema"
  failureSubtext="Sigue practicando"
  items={PROBLEMS}
  getIsCorrect={(item, index) => mc.answers[index] === item.correctAnswer}
  renderItem={(item, index, isCorrect) => (
    <>
      {isCorrect ? <Check /> : <X />}
      <span>{item.expression}</span>
    </>
  )}
  onRetry={mc.reset}
  onContinue={onComplete}
  continueLabel="Continuar al Checkpoint"
/>
```

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `correctCount` | `number` | Yes | Number of correct answers |
| `totalCount` | `number` | Yes | Total number of items |
| `passed` | `boolean` | Yes | Whether user passed |
| `passThreshold` | `number` | Yes | Required correct to pass |
| `items` | `T[]` | Yes | Array of items |
| `getIsCorrect` | `(item, index) => boolean` | Yes | Check if item was answered correctly |
| `renderItem` | `(item, index, isCorrect) => ReactNode` | Yes | Render each item in summary |
| `onContinue` | `() => void` | Yes | Continue button handler |
| `onRetry` | `() => void` | No | Retry button handler (only shown if failed) |
| `successMessage` | `string` | No | Title when passed |
| `failureMessage` | `string` | No | Title when failed |
| `successSubtext` | `string` | No | Subtext when passed |
| `failureSubtext` | `string` | No | Subtext when failed |
| `continueLabel` | `string` | No | Continue button label (default: "Continuar") |

---

## Step1 Hook Primitives

Import from `@/components/lessons/primitives`:

### ScenarioCard

Wrapper for the scenario/story presentation with warm or cool gradients.

```typescript
import { ScenarioCard } from '@/components/lessons/primitives';

<ScenarioCard variant="warm">  {/* 'warm' | 'cool' | 'neutral' */}
  <p>Tu familia quiere cambiar de plan...</p>
  {/* Visual content */}
</ScenarioCard>
```

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `ReactNode` | Yes | Content to display |
| `variant` | `'warm' \| 'cool' \| 'neutral'` | No | Color theme (default: 'warm') |
| `className` | `string` | No | Additional CSS classes |

---

### QuestionPrompt

Styled container for the question in the question phase.

```typescript
import { QuestionPrompt } from '@/components/lessons/primitives';

<QuestionPrompt variant="default">  {/* 'default' | 'math' */}
  <p className="text-lg font-semibold text-center">
    ¿Cuál plan es más barato?
  </p>
</QuestionPrompt>
```

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `ReactNode` | Yes | Question content |
| `variant` | `'default' \| 'math'` | No | Style variant (default: 'default') |
| `className` | `string` | No | Additional CSS classes |

---

### OptionGrid

Responsive grid layout for answer options.

```typescript
import { OptionGrid } from '@/components/lessons/primitives';

<OptionGrid columns={2}>  {/* 1 | 2 */}
  {options.map((option, index) => (
    <OptionButton key={index} ... />
  ))}
</OptionGrid>
```

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `ReactNode` | Yes | Option buttons |
| `columns` | `1 \| 2` | No | Number of columns (default: 2) |
| `className` | `string` | No | Additional CSS classes |

---

### InsightCard

Highlight card for the concept bridge/reveal at the end of the hook.

```typescript
import { InsightCard } from '@/components/lessons/primitives';

<InsightCard
  title="Esto es una Función Afín"
  icon={<Lightbulb className="w-8 h-8 text-yellow-500" />}
  variant="purple"  {/* 'purple' | 'green' | 'blue' */}
>
  <p className="font-mono text-lg">y = mx + b</p>
  <p className="text-sm">Donde m es la pendiente...</p>
</InsightCard>
```

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | Card title |
| `children` | `ReactNode` | Yes | Card content |
| `icon` | `ReactNode` | No | Icon element (default: Lightbulb + Sparkles) |
| `variant` | `'purple' \| 'green' \| 'blue'` | No | Color variant (default: 'purple') |
| `className` | `string` | No | Additional CSS classes |

---

## Color Utilities

Import from `@/lib/lessons/styles`:

```typescript
import { colors } from '@/lib/lessons/styles';
```

### Available Colors

```typescript
colors.feedback.correct      // Green feedback background
colors.feedback.incorrect    // Amber feedback background

colors.option.default        // Unselected option
colors.option.selected       // Selected (before check)
colors.option.selectedCorrect   // Selected and correct
colors.option.selectedIncorrect // Selected and incorrect
colors.option.revealed       // Correct answer revealed

colors.progressDot.correct   // Green dot
colors.progressDot.incorrect // Red dot
colors.progressDot.current   // Amber dot
colors.progressDot.pending   // Gray dot

colors.badge.correct         // Green badge
colors.badge.incorrect       // Red badge

colors.gradient.primary      // Amber-orange gradient
colors.gradient.secondary    // Purple-pink gradient
colors.gradient.success      // Green-emerald gradient
colors.gradient.disabled     // Gray gradient

colors.result.passed         // Green result card
colors.result.failed         // Amber result card

colors.hint.container        // Amber hint background
colors.hint.icon             // Amber icon color
colors.hint.text             // Amber text color
```

---

## Canonical Examples

Study these refactored files:

| File | Features Used |
|------|---------------|
| `components/lessons/m1/funcion-lineal-afin/Step1Hook.tsx` | `ScenarioCard`, `QuestionPrompt`, `OptionGrid`, `OptionButton`, `ActionButton`, `FeedbackPanel`, `InsightCard` |
| `components/lessons/m1/completar-cuadrado/Step4Classify.tsx` | `useMultipleChoice`, `ProgressDots`, `OptionButton`, `FeedbackPanel`, `ActionButton`, `ResultsSummary` |
| `components/lessons/m1/completar-cuadrado/Step5Practice.tsx` | All above + `useHintToggle`, `colors.hint` |

---

## When to Use

### Use Toolbox For:
- **Step1 Hook**: Scenario cards, question prompts, option grids, insight reveals
- **Step4/Step5**: Multiple-choice patterns, classification exercises, practice with hints
- Any step with progress dots and feedback

### Go Custom For:
- Drag-and-drop interactions
- Canvas/drawing exercises
- Custom visualizations
- Non-multiple-choice exercises

### Mix and Match:
Primitives can be combined with custom UI. Use only what you need:

```typescript
// Use just ProgressDots with custom content
<ProgressDots items={...} currentIndex={...} getStatus={...} />
<MyCustomInteraction />
<ActionButton onClick={...}>Continuar</ActionButton>
```

---

## File Locations

```
hooks/
  lessons/
    index.ts
    useMultipleChoice.ts
    useHintToggle.ts

components/
  lessons/
    primitives/
      index.ts
      # Step1 Hook primitives
      ScenarioCard.tsx
      QuestionPrompt.tsx
      OptionGrid.tsx
      InsightCard.tsx
      # Step4/Step5 primitives
      ProgressDots.tsx
      FeedbackPanel.tsx
      OptionButton.tsx
      HintPanel.tsx
      ActionButton.tsx
      ResultsSummary.tsx

lib/
  lessons/
    styles.ts
```
