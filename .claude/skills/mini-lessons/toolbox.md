# Mini-Lesson Toolbox

Composable hooks and primitives to build Step4/Step5 components faster while keeping full control.

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
| `components/lessons/m1/completar-cuadrado/Step4Classify.tsx` | `useMultipleChoice`, `ProgressDots`, `OptionButton`, `FeedbackPanel`, `ActionButton`, `ResultsSummary` |
| `components/lessons/m1/completar-cuadrado/Step5Practice.tsx` | All above + `useHintToggle`, `colors.hint` |

---

## When to Use

### Use Toolbox For:
- Standard multiple-choice Step4/Step5 patterns
- Classification exercises
- Practice with hints
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
