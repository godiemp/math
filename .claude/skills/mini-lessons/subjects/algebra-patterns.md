# Algebra Lessons Pattern Guide

This guide provides specific patterns for creating algebra (álgebra) lessons. Read this AFTER the main SKILL.md and pedagogical-design.md.

---

## Algebra Lesson Characteristics

Algebra lessons focus on **structure recognition, symbolic manipulation, and pattern generalization**. Students need to see the underlying structure before working with abstract symbols.

### Key Pedagogical Insight

> Algebra lessons require strong **metaphors** to make abstract concepts concrete. Students struggle when we jump directly to symbols without first establishing meaning through familiar contexts.

---

## Hook Patterns for Algebra

### The "Concrete to Abstract" Pattern

Algebra hooks should present a **concrete situation** that naturally reveals an algebraic pattern.

#### Pattern 1: The Counting/Grouping Hook
**Best for:** Like terms, combining expressions, factoring

```
┌─────────────────────────────────────────────────┐
│ SCENARIO: Real-world counting/grouping problem  │
│ ↓                                               │
│ PUZZLE: Something can't be combined directly    │
│ ↓                                               │
│ INSIGHT: We can only combine "like" things      │
│ ↓                                               │
│ BRIDGE: Variables are like categories           │
└─────────────────────────────────────────────────┘
```

**Exemplar:** `terminos-semejantes/Step1Hook.tsx` - "La Frutería Matemática"
- Don Pedro counts fruit: 3 manzanas + 2 naranjas + 4 manzanas = ?
- Students realize: 7 manzanas + 2 naranjas (can't combine further)
- Bridge: Variables are like fruit types - only combine same ones

**Why it works:**
- Everyone understands you can't add apples to oranges
- The "aha" moment is genuine, not manufactured
- Visual fruit icons make it concrete

#### Pattern 2: The Efficiency Hook
**Best for:** Factoring, distribution, simplification

```
┌─────────────────────────────────────────────────┐
│ SCENARIO: Someone doing repeated work           │
│ ↓                                               │
│ PUZZLE: There's a faster way to do this         │
│ ↓                                               │
│ INSIGHT: Finding common elements saves time     │
│ ↓                                               │
│ BRIDGE: Factoring extracts common elements      │
└─────────────────────────────────────────────────┘
```

**Exemplar:** `factor-comun/Step1Hook.tsx` - "El Carpintero Eficiente"
- A carpenter needs to cut multiple pieces with shared measurements
- Finding common elements reduces the work
- Bridge: Factorization as extracting what's shared

#### Pattern 3: The Detective Hook
**Best for:** Equations, solving for unknowns

```
┌─────────────────────────────────────────────────┐
│ SCENARIO: Unknown quantity in a familiar context│
│ ↓                                               │
│ PUZZLE: Given relationships, find the unknown   │
│ ↓                                               │
│ INSIGHT: Work backward using inverse operations │
│ ↓                                               │
│ BRIDGE: Equations represent balanced situations │
└─────────────────────────────────────────────────┘
```

**Exemplar:** `ecuaciones-lineales/Step1Hook.tsx` - "La Cuenta del Restaurante"
- Three friends paid $45 total, one paid $5 extra for dessert
- Detective framing: "What did the base meal cost?"
- Bridge: Variables represent unknown quantities

### Algebra Hook Anti-Patterns

```typescript
// ❌ WRONG: Variables in the scenario
<p>Imagina que tienes la expresión 3x + 2x...</p>

// ❌ WRONG: Meta-description of math
<p>Un estudiante está resolviendo un problema de álgebra...</p>

// ❌ WRONG: Thin disguise
<p>Juan tiene 3x manzanas...</p>

// ✅ CORRECT: Genuine scenario that naturally leads to algebra
<p>Don Pedro cuenta su inventario: 3 manzanas, 2 naranjas, 4 manzanas más...</p>
```

---

## Explore Patterns for Algebra

### The "Decomposition & Classification" Pattern

Algebra explore steps should have students **break apart** and **classify** algebraic expressions.

#### Phase 1: Anatomy Discovery
Students click/interact to reveal the parts of an expression.

```typescript
// Example: Breaking down 5x²
const TERM_PARTS = [
  { label: 'Coeficiente', value: '5', color: 'blue' },
  { label: 'Variable', value: 'x', color: 'purple' },
  { label: 'Exponente', value: '²', color: 'teal' },
];

// Students click on each part to reveal its name and role
```

**Exemplar:** `terminos-semejantes/Step2Explore.tsx`
- Phase 1: Click parts of 5x² to reveal coefficient, variable, exponent
- Hidden coefficients (1 in x), constants, negative coefficients revealed through interaction

#### Phase 2: Edge Cases
Reveal special cases that challenge initial understanding.

```typescript
const EDGE_CASES = [
  { expression: 'x', hidden: '1x', explanation: 'El coeficiente 1 está implícito' },
  { expression: '7', hidden: '7x⁰', explanation: 'Las constantes son términos sin variable' },
  { expression: '-ab', hidden: '-1ab', explanation: 'El coeficiente -1 está implícito' },
];
```

#### Phase 3: Sorting/Classification Game
Interactive categorization of expressions.

```typescript
const CATEGORIES: Category[] = [
  { id: 'monomio', label: 'Monomio', examples: ['3x', '5y²'] },
  { id: 'binomio', label: 'Binomio', examples: ['x + 1', '2a - b'] },
  { id: 'trinomio', label: 'Trinomio', examples: ['x² + x + 1'] },
];

// Drag-and-drop or click-to-classify interface
```

### Explore Visual Elements for Algebra

```typescript
// Algebra "tiles" visualization (abstract but helpful)
<div className="flex items-center gap-2">
  <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center text-white font-bold">
    x²
  </div>
  <span className="text-2xl">+</span>
  <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center text-white font-bold">
    x
  </div>
  <span className="text-2xl">+</span>
  <div className="w-4 h-4 bg-teal-500 rounded flex items-center justify-center text-white text-xs">
    1
  </div>
</div>
```

---

## Explain Patterns for Algebra

### Multi-Tab Reference Pattern

Algebra lessons benefit from **non-linear tab navigation** because students often need to reference multiple cases.

#### Required Tabs Structure

```typescript
type TabId = 'case1' | 'case2' | 'case3' | 'case4' | 'tips';

const TABS: TabConfig[] = [
  { id: 'case1', title: 'Factor Numérico', color: 'blue' },
  { id: 'case2', title: 'Factor Variable', color: 'purple' },
  { id: 'case3', title: 'Factor Combinado', color: 'teal' },
  { id: 'case4', title: 'Polinomios', color: 'pink' },
  // Tips tab is ALWAYS last
];
```

#### Tab Content Structure

Each formula tab should follow this structure:

```typescript
<div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
  {/* 1. Header with icon */}
  <div className="flex items-center gap-3 mb-4">
    <BookOpen className={cn('w-6 h-6', colors.text)} />
    <h3 className={cn('text-xl font-bold', colors.text)}>
      {currentTab.title}
    </h3>
  </div>

  {/* 2. Brief description */}
  <p className="text-gray-600 dark:text-gray-400 mb-4">
    {currentTab.description}
  </p>

  {/* 3. Formula in highlighted box */}
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
    <p className="text-center font-mono text-2xl text-gray-800 dark:text-gray-200">
      {currentTab.formula}
    </p>
  </div>

  {/* 4. Worked example with steps */}
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
    <h4 className="font-semibold mb-4 flex items-center gap-2">
      <Lightbulb className="w-5 h-5 text-yellow-500" />
      Ejemplo:
    </h4>
    <div className="space-y-3">
      <p className="font-mono text-lg">{example.input}</p>
      <div className="pl-4 border-l-2 border-gray-300 space-y-2">
        {example.steps.map((step, i) => (
          <p key={i} className="text-gray-600 font-mono text-sm">
            {i === example.steps.length - 1 ? '→ ' : '• '}{step}
          </p>
        ))}
      </div>
      <div className={cn('p-3 rounded-lg mt-4', colors.bg)}>
        <p className={cn('font-mono font-bold text-lg text-center', colors.text)}>
          = {example.result}
        </p>
      </div>
    </div>
  </div>
</div>
```

**Exemplar:** `factor-comun/Step3Explain.tsx`

---

## Verify Questions for Algebra

### Question Type Mix

Algebra checkpoint questions should include:

1. **Definition/Conceptual** (1 question)
   - "¿Qué hace que dos términos sean 'semejantes'?"
   - Tests understanding of the underlying concept

2. **Procedural/Calculation** (2 questions)
   - "Simplifica: 2x² + 5x + 3x² - 2x"
   - Tests ability to apply the procedure

3. **Edge Case/Recognition** (1 question)
   - "¿Cuántos términos semejantes hay en: 4ab, -2ba, 3ab?"
   - Tests recognition of special cases (ab = ba)

### Question Patterns

```typescript
const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Qué característica comparten los términos semejantes?',
    options: [
      'El mismo coeficiente',
      'La misma variable con el mismo exponente',
      'El mismo valor numérico',
      'Cualquier variable'
    ],
    correctAnswer: 1,
    explanation: 'Los términos semejantes tienen la misma parte literal (variable y exponente).',
  },
  {
    id: 'q2',
    question: 'Simplifica: 5x + 3x - 2x',
    options: ['6x', '8x', '10x', '0'],
    correctAnswer: 0,
    explanation: '5 + 3 - 2 = 6, por lo tanto: 6x',
  },
  {
    id: 'q3',
    question: 'Factoriza: 6x² + 9x',
    options: ['3(2x² + 3x)', '3x(2x + 3)', 'x(6x + 9)', '6x(x + 9)'],
    correctAnswer: 1,
    explanation: 'El MCD es 3x. Dividiendo: 6x² ÷ 3x = 2x y 9x ÷ 3x = 3.',
  },
  {
    id: 'q4',
    question: '¿Por qué NO podemos simplificar 3x + 4y?',
    options: [
      'Porque los coeficientes son diferentes',
      'Porque las variables son diferentes',
      'Porque falta un término',
      'Sí se puede simplificar a 7xy'
    ],
    correctAnswer: 1,
    explanation: 'Solo podemos combinar términos con la misma variable.',
  },
];
```

---

## Shared Components for Algebra

### Commonly Used

```typescript
import { CheckpointQuiz } from '@/components/lessons/shared';
// Always for Step6Verify

import { FactorGrid } from '@/components/lessons/shared';
// For factorization lessons - shows factor pairs
```

### Subject-Specific Patterns

Algebra often needs custom "term part" highlighting:

```typescript
// Highlighting coefficient, variable, exponent separately
const TermDisplay = ({ coef, variable, exp }: TermParts) => (
  <span className="font-mono text-2xl">
    <span className="text-blue-600 dark:text-blue-400">{coef}</span>
    <span className="text-purple-600 dark:text-purple-400">{variable}</span>
    <sup className="text-teal-600 dark:text-teal-400">{exp}</sup>
  </span>
);
```

---

## Algebra Color Palette

| Element | Light | Dark |
|---------|-------|------|
| Coefficient | `text-blue-600` | `text-blue-400` |
| Variable | `text-purple-600` | `text-purple-400` |
| Exponent | `text-teal-600` | `text-teal-400` |
| Constant | `text-amber-600` | `text-amber-400` |
| Operator | `text-gray-500` | `text-gray-400` |

---

## Exemplar Algebra Lessons

Study these for best practices:

| Lesson | Best For | Quality |
|--------|----------|---------|
| `terminos-semejantes` | Hook design ("La Frutería"), Explore decomposition, Cards + table explain | ★★★★★ |
| `factor-comun` | Tab-based Explain, Tips pattern, Progressive phases | ★★★★★ |
| `ecuaciones-lineales` | Detective hook ("La Cuenta del Restaurante"), Verification step | ★★★★★ |
| `propiedad-distributiva` | Gift bags metaphor, Distribution visualization | ★★★★★ |
| `suma-resta-polinomios` | Logistics cost calculation, Phase-based exploration | ★★★★★ |
| `productos-notables` | Garden expansion, Area model visualization | ★★★★☆ |
| `diferencia-cuadrados` | Pattern recognition, Robust explore | ★★★★★ |
| `completar-cuadrado` | Garden with unfactorable area, Single context deep dive | ★★★★☆ |

---

## Complete Hook Inventory

All algebra lessons use relatable scenarios:

| Lesson | Scenario | Bridge to Algebra |
|--------|----------|-------------------|
| `terminos-semejantes` | Fruit vendor counting inventory | Variables are like fruit types |
| `suma-resta-polinomios` | Logistics company calculating costs | Polynomial operations |
| `factor-comun` | Store organizer packing boxes | Grouping/extraction |
| `propiedad-distributiva` | Gift shop with identical bags | Multiplication across groups |
| `productos-notables` | Architect expanding square garden | Geometric interpretation |
| `ecuaciones-lineales` | Restaurant bill problem | Solving for unknowns |
| `diferencia-cuadrados` | Pattern recognition examples | Algebraic identity |
| `completar-cuadrado` | Garden with unfactorable area | Perfect square manipulation |

---

## Area Model Pattern (Unique to Algebra)

Found in: `productos-notables` and `completar-cuadrado`

```typescript
// SVG visualization showing (x + 3)² as geometric squares
// ┌─────┬───┐
// │ x²  │3x │
// ├─────┼───┤
// │ 3x  │ 9 │
// └─────┴───┘

<svg viewBox="0 0 200 200">
  {/* Main square: x² */}
  <rect x="0" y="0" width="120" height="120" fill="#3b82f6" />
  {/* Side rectangle: 3x */}
  <rect x="120" y="0" width="60" height="120" fill="#8b5cf6" />
  {/* Bottom rectangle: 3x */}
  <rect x="0" y="120" width="120" height="60" fill="#8b5cf6" />
  {/* Corner square: 9 */}
  <rect x="120" y="120" width="60" height="60" fill="#ec4899" />
</svg>
```

**Why it works:** Bridges visual/geometric understanding with algebraic notation. Shows why (x+3)² ≠ x²+9.

---

## Progressive Phases Pattern

The `intro → discover → pattern` structure works well for algebra:

```typescript
type Phase = 'intro' | 'discover' | 'pattern';

// Phase 1: Explain what the concept is (3 types shown)
// Phase 2: Progressive examples with hints
// Phase 3: Summary of steps + all worked examples
```

**Exemplar:** `factor-comun/Step2Explore.tsx`

---

## Error-First Bridge Pattern

Many algebra lessons preemptively address misconceptions:

```typescript
// In Step1Hook result phase:
<div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
  <p className="text-red-700 dark:text-red-300">
    ⚠️ Error común: (x + 3)² = x² + 9
  </p>
</div>
<div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
  <p className="text-green-700 dark:text-green-300">
    ✓ Correcto: (x + 3)² = x² + 6x + 9
  </p>
</div>
<p className="text-sm text-gray-600">
  ↓ ¡No olvides el término del medio!
</p>
```

---

## Decomposition UI Pattern

For factorization, show colored parts:

```typescript
// Shows term decomposition with colors
// 6x + 12
// = 6·x + 6·2  (highlighted common factor)
// = 6(x + 2)   (factored form)

<div className="space-y-2">
  <p className="font-mono">
    <span className="text-blue-600">6</span>x +
    <span className="text-blue-600">6</span>·2
  </p>
  <p className="font-mono">
    = <span className="text-blue-600">6</span>(x + 2)
  </p>
</div>
```

---

## Algebra-Specific Anti-Patterns

1. **Abstract from the start** - Don't show variables in the hook
2. **Formula before meaning** - Always establish WHY before HOW
3. **Too many cases at once** - Progressive reveal, one case at a time
4. **Skipping edge cases** - Always address x = 1x, constants, negatives
5. **Auto-complete on mount** - Don't use `useEffect` to auto-advance Step3Explain
6. **Input validation issues** - Normalize algebraic input before comparison
7. **Missing verification** - Always show "check your answer" step (like ecuaciones-lineales)

---

## Missing Patterns to Consider

1. **Difficulty Selector** - Allow "simple" vs "challenge" mode
2. **Error-Correction Drills** - "Find the mistake" exercises
3. **Variable Exploration** - "What if x = 2?" substitution checks
4. **Worked Example Gallery** - Random access to review examples
5. **Procedural Checklist** - Interactive step tracking for complex processes
6. **Connection Mapping** - Links between related lessons
