# Anti-Patterns: What NOT to Do

Before completing any lesson implementation, verify NONE of these anti-patterns exist in your code.

---

## Anti-Pattern 1: Standalone Tips Section

**This is the MOST COMMON mistake.** Tips must be INSIDE a tab, not as a standalone section.

### WRONG (from `productos-notables-cubos/Step3Explain.tsx`)

```typescript
// Tips as a standalone amber section OUTSIDE tabs - THIS IS WRONG
</div>  {/* End of tabbed content */}

{/* This should be INSIDE a tab, not here! */}
<div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-6">
  <h4>Tips para recordar:</h4>
  <ul>
    <li>Tip 1...</li>
  </ul>
</div>

<button onClick={onComplete}>Continuar</button>
```

### CORRECT (from `factor-comun/Step3Explain.tsx`)

```typescript
// 1. Include 'tips' in TabId
type TabId = 'numeric' | 'variable' | 'combined' | 'polynomial' | 'tips';

// 2. Add amber to colorClasses
const colorClasses = {
  // ... other colors
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-700',
    tab: 'bg-amber-500 text-white',
  },
};

// 3. Add Tips tab button
<button
  onClick={() => handleTabChange('tips')}
  className={cn(
    'px-4 py-2 rounded-lg font-medium transition-all text-sm',
    activeTab === 'tips'
      ? colorClasses.amber.tab
      : visitedTabs.includes('tips')
      ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
      : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
  )}
>
  <span>Tips</span>
  {visitedTabs.includes('tips') && activeTab !== 'tips' && (
    <span className="ml-1 text-green-500">✓</span>
  )}
</button>

// 4. Conditional rendering - Tips INSIDE tabbed structure
{activeTab === 'tips' ? (
  <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
    <div className="flex items-center gap-3 mb-4">
      <AlertTriangle className={cn('w-6 h-6', colors.text)} />
      <h3 className={cn('text-xl font-bold', colors.text)}>
        Tips y errores comunes
      </h3>
    </div>
    {/* Tips content */}
  </div>
) : (
  /* Formula content */
  <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
    {/* Formula tab content */}
  </div>
)}
```

### Detection Method
1. Search for "Tips" or "errores comunes"
2. Verify it appears INSIDE `{activeTab === 'tips' ? ...}`
3. If it's a standalone `<div>` after the tabs, it's WRONG

---

## Anti-Pattern 2: Missing isActive Check

Every step component MUST check `isActive` before rendering.

### WRONG

```typescript
export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('scenario');

  // MISSING: if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Content renders even when step is not active! */}
    </div>
  );
}
```

### CORRECT

```typescript
export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('scenario');

  if (!isActive) return null;  // REQUIRED - must be here

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Content only renders when active */}
    </div>
  );
}
```

### Detection Method
1. Open each Step*.tsx file
2. Search for `if (!isActive) return null;`
3. It MUST exist in every step component
4. It should appear AFTER useState hooks but BEFORE the return JSX

---

## Anti-Pattern 3: Custom Step6 Verify Implementation

Step6Verify should ALWAYS use the shared CheckpointQuiz component.

### WRONG (implementing custom quiz logic)

```typescript
export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // ... 150+ lines of custom quiz logic

  return (
    <div>
      {/* Custom quiz UI */}
    </div>
  );
}
```

### CORRECT (using shared component)

```typescript
import { LessonStepProps } from '@/lib/lessons/types';
import { CheckpointQuiz, CheckpointQuestion } from '@/components/lessons/shared';

const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es el factor común de 6x + 9?',
    options: ['2', '3', '6', '9'],
    correctAnswer: 1,
    explanation: 'El MCD de 6 y 9 es 3, por lo que el factor común es 3.',
  },
  {
    id: 'q2',
    question: '¿Cuál es la factorización correcta de 4x² + 8x?',
    options: ['4(x² + 2x)', '4x(x + 2)', '2x(2x + 4)', '8x(x + 1)'],
    correctAnswer: 1,
    explanation: 'El factor común es 4x. Dividiendo: 4x² ÷ 4x = x y 8x ÷ 4x = 2.',
  },
  // ... more questions
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  return (
    <CheckpointQuiz
      onComplete={onComplete}
      isActive={isActive}
      questions={QUESTIONS}
      requiredCorrect={3}
      successMessage="¡Excelente! Dominas la factorización por factor común."
    />
  );
}
```

### Detection Method
1. Step6Verify.tsx should be ~30-50 lines maximum
2. It should import `CheckpointQuiz` from shared
3. It should NOT have useState for quiz state
4. If you see `const [currentQuestion, setCurrentQuestion]`, it's WRONG

---

## Anti-Pattern 4: Missing Dark Mode Classes

Every color class must have a corresponding dark mode variant.

### WRONG

```typescript
// Missing dark: variants - will look bad in dark mode
<div className="bg-blue-100 text-blue-700 border-blue-200">
  <p className="text-gray-600">Content here</p>
</div>

<div className="bg-white rounded-xl p-6">
  <h3 className="text-gray-800">Title</h3>
</div>
```

### CORRECT

```typescript
// All colors have dark: variants
<div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700">
  <p className="text-gray-600 dark:text-gray-400">Content here</p>
</div>

<div className="bg-white dark:bg-gray-800 rounded-xl p-6">
  <h3 className="text-gray-800 dark:text-gray-200">Title</h3>
</div>
```

### Common Pairs

| Light | Dark |
|-------|------|
| `bg-white` | `dark:bg-gray-800` |
| `bg-gray-50` | `dark:bg-gray-900` |
| `bg-blue-50` | `dark:bg-blue-900/30` |
| `bg-blue-100` | `dark:bg-blue-900/50` |
| `text-gray-600` | `dark:text-gray-400` |
| `text-gray-700` | `dark:text-gray-300` |
| `text-gray-800` | `dark:text-gray-200` |
| `text-gray-900` | `dark:text-white` |
| `border-gray-200` | `dark:border-gray-700` |
| `border-blue-200` | `dark:border-blue-700` |

### Detection Method
1. Search for `bg-` in your component
2. Check that `dark:` appears on the same className
3. Pay special attention to `bg-white` - always needs `dark:bg-gray-800`

---

## Anti-Pattern 5: Abstract/Boring Hook

The hook should feel like a real problem, not a math problem in disguise.

### WRONG

```typescript
// Too abstract - feels like math from the start
<div className="bg-gradient-to-br from-purple-50 to-pink-50 ...">
  <p className="text-gray-700 text-lg mb-6">
    Imagina que tienes la expresión algebraica 3x + 2x + 5x.
    ¿Cuál es la forma más simple de escribirla?
  </p>
</div>

// Meta/boring - about math instead of using math
<div>
  <h2>Aprendiendo sobre Factorización</h2>
  <p>Un estudiante necesita resolver un problema de álgebra...</p>
</div>

// Forced context - thin disguise over math problem
<p>Juan tiene 3x manzanas y María tiene 2x manzanas. ¿Cuántas manzanas tienen en total?</p>
```

### CORRECT

```typescript
// Genuine puzzle that's interesting BEFORE you know it's math
<div className="bg-gradient-to-br from-green-50 to-emerald-50 ...">
  <p className="text-gray-700 text-lg mb-6">
    Don Pedro tiene una frutería y necesita contar su inventario del día:
  </p>

  {/* Visual representation with actual fruit icons */}
  <div className="flex flex-wrap justify-center gap-6 mb-6">
    <div className="flex flex-col items-center bg-white rounded-xl p-4 shadow-md">
      <div className="flex gap-1 mb-2">
        <Apple className="w-8 h-8 text-red-500" />
        <Apple className="w-8 h-8 text-red-500" />
        <Apple className="w-8 h-8 text-red-500" />
      </div>
      <span className="text-sm font-medium">3 manzanas</span>
    </div>
    {/* More fruit groups */}
  </div>

  <p className="text-center text-lg font-medium">= ???</p>
</div>
```

### Detection Method
Ask yourself: "Would a student find this interesting BEFORE knowing it's about math?"
- If the scenario mentions variables (x, y) in the hook → WRONG
- If it starts with "Imagina que tienes una expresión..." → WRONG
- If it uses a genuine real-world scenario with visuals → CORRECT

---

## Anti-Pattern 6: Missing onComplete Call

Every step must call `onComplete` when the step is finished.

### WRONG

```typescript
export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  // ... component logic

  return (
    <div>
      {/* Step content */}

      {/* Button exists but doesn't call onComplete! */}
      <button
        onClick={() => setPhase('next')}
        className="..."
      >
        Continuar
      </button>
    </div>
  );
}
```

### CORRECT

```typescript
export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  // ... component logic

  return (
    <div>
      {/* Step content */}

      {/* Button calls onComplete to advance lesson */}
      <button
        onClick={onComplete}
        className="..."
      >
        Continuar
      </button>
    </div>
  );
}
```

### Detection Method
1. Search for `onComplete` in each step file
2. It must appear in the JSX (typically in a button's onClick)
3. If `onComplete` only appears in the function signature but not in JSX → WRONG

---

## Quick Anti-Pattern Checklist

Run these checks before considering implementation complete:

```bash
# Check 1: Tips inside tabs (Step3Explain only)
# Search for "Tips" and verify it's inside {activeTab === 'tips' ? ...}

# Check 2: isActive in all steps
# Each Step*.tsx must have: if (!isActive) return null;

# Check 3: Step6Verify uses shared component
# Should be ~30-50 lines and import CheckpointQuiz

# Check 4: Dark mode everywhere
# Every bg-X should have dark:bg-X on same element

# Check 5: Real-world hook
# Step1Hook should NOT mention variables in the scenario

# Check 6: onComplete called
# Each step must call onComplete somewhere in JSX

# Check 7: No framer-motion on SVG paths/lines
# Search for motion.path or motion.line - use plain SVG instead
```

---

## Files to Reference

### CORRECT Patterns (Copy These)
- `components/lessons/m1/factor-comun/Step3Explain.tsx` - Tips in tabs
- `components/lessons/m1/terminos-semejantes/Step1Hook.tsx` - Real-world hook
- `components/lessons/m1/factor-comun/Step6Verify.tsx` - CheckpointQuiz usage

### INCORRECT Patterns (DO NOT Copy)
- `components/lessons/m1/productos-notables-cubos/Step3Explain.tsx` - Tips outside tabs

---

## Anti-Pattern 7: Premature Auto-Complete

Auto-completing a step without user interaction is generally an anti-pattern.

### WRONG (auto-complete on timer)

```typescript
// Auto-completing without user action - usually wrong
useEffect(() => {
  const timer = setTimeout(() => {
    onComplete();  // Moves to next step automatically!
  }, 3000);
  return () => clearTimeout(timer);
}, []);
```

### CORRECT (user-initiated completion)

```typescript
// User must click to advance
<button onClick={onComplete}>
  Continuar
</button>
```

### Exception: Guided Phase-Based Explain Steps

Auto-advancing to a final "ready" phase (NOT calling onComplete) is acceptable in phase-based Explain steps where the user has already engaged with all content:

```typescript
// ACCEPTABLE: Auto-advance to final phase after all content viewed
const handleTabChange = (tabId: TabId) => {
  setActiveTab(tabId);
  const newVisited = [...visitedTabs, tabId];
  setVisitedTabs(newVisited);

  // All tabs visited - can show "ready" phase
  if (newVisited.length === ALL_TABS.length) {
    setShowReady(true);  // This is OK - not calling onComplete
  }
};

// User still has to click to advance
{showReady && (
  <button onClick={onComplete}>Continuar</button>
)}
```

### Detection Method
1. Search for `setTimeout` near `onComplete`
2. Search for `useEffect` that calls `onComplete`
3. If found, verify user has explicit control over advancing

---

## Valid Alternative Patterns (NOT Anti-Patterns)

Some lessons use different patterns that are VALID alternatives, not mistakes.

### Phase-Based Step3Explain

**14 lessons use this pattern** - it's a valid alternative to tabs for simpler lessons.

```typescript
// Phase-based navigation (valid for linear content)
type Phase = 'definition' | 'method1' | 'method2' | 'formula' | 'misconceptions';
const [phase, setPhase] = useState<Phase>('definition');

// Uses back/forward arrows instead of tabs
<button onClick={() => setPhase('method1')}>
  <ChevronRight />
</button>
```

**When Phase-based is appropriate:**
- Linear content flow (must see definition before method)
- Simpler lessons with fewer concepts
- Content builds on previous phase

**When Tabs are better:**
- Multiple parallel concepts (Factor Numérico, Factor Variable, etc.)
- Non-linear exploration (user can jump to any section)
- Tips that should be easily accessible from any content

**Files using Phase-based (valid):**
- `minimo-comun-multiplo/Step3Explain.tsx`
- `maximo-comun-divisor/Step3Explain.tsx`
- `ecuaciones-lineales/Step3Explain.tsx`

---

## Anti-Pattern 8: Framer-Motion for SVG Path/Line Elements

Using `motion.path` or `motion.line` for SVG animations causes visual glitches because framer-motion doesn't properly interpolate SVG path `d` attributes.

### WRONG (framer-motion on SVG paths)

```typescript
import { motion } from 'framer-motion';

// Animating SVG path d attribute - CAUSES GLITCHES
<motion.path
  d={sectorPath(cx, cy, r, 0, angle)}
  fill="#5eead4"
  initial={false}
  animate={{ d: sectorPath(cx, cy, r, 0, angle) }}
  transition={{ duration: 0.1 }}
/>

// Animating SVG line coordinates - ALSO GLITCHY
<motion.line
  x1={cx}
  y1={cy}
  x2={endX}
  y2={endY}
  animate={{ x2: endX, y2: endY }}
  transition={{ duration: 0.1 }}
/>
```

### CORRECT (plain SVG elements with React state)

```typescript
// Plain SVG elements - React re-renders instantly on state change
<path
  d={sectorPath(cx, cy, r, 0, angle)}
  fill="#5eead4"
  stroke="#0d9488"
  strokeWidth="3"
/>

<line
  x1={cx}
  y1={cy}
  x2={cx + r * Math.cos((angle - 90) * Math.PI / 180)}
  y2={cy + r * Math.sin((angle - 90) * Math.PI / 180)}
  stroke="#dc2626"
  strokeWidth="2"
/>
```

### When framer-motion IS appropriate

Framer-motion works well for `motion.div` animations (fade-in, scale, translate):

```typescript
// GOOD - div animations work fine
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="bg-white rounded-xl p-4"
>
  Content here
</motion.div>
```

### Why plain SVG works better

- React's state-driven re-rendering updates SVG elements **instantly**
- No animation library needed for slider-controlled SVGs
- Smoother visual result than trying to interpolate paths
- Less code and better performance

### Detection Method

1. Search for `motion.path` or `motion.line` in your component
2. If found animating `d` attribute or coordinates → WRONG
3. Replace with plain `<path>` or `<line>` elements
4. `motion.div` for container animations is fine

---

### Custom Step6Verify for Visual Content

**3 lessons use custom Step6Verify** - justified when questions need embedded visualizations.

**When custom Step6Verify is allowed:**
- Questions require BarChart, PieChart, or FrequencyTable inside the question
- Questions need interactive SVG diagrams
- Standard CheckpointQuiz cannot display the required content

**Files with justified custom Step6Verify:**
- `tablas-frecuencia-graficos/Step6Verify.tsx` - Needs BarChart, PieChart
- `representacion-datos/Step6Verify.tsx` - Needs FrequencyTable
- `teorema-pitagoras/Step6Verify.tsx` - Needs interactive triangle diagram
