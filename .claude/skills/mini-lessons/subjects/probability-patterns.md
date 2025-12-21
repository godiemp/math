# Probability & Statistics Lessons Pattern Guide

This guide provides specific patterns for creating probability and statistics (probabilidad y estadística) lessons. Read this AFTER the main SKILL.md and pedagogical-design.md.

---

## Probability Lesson Characteristics

Probability lessons focus on **enumeration, fairness, and ratio reasoning**. Students need to see ALL possibilities before calculating ratios.

### Key Pedagogical Insight

> Probability lessons work best with **games and fairness questions**. Students naturally care whether games are fair, and this curiosity drives engagement. The key is making ALL outcomes visible and countable before introducing formulas.

---

## Hook Patterns for Probability

### The "Is This Fair?" Pattern

Probability hooks should present a **game or betting scenario** where fairness is in question.

#### Pattern 1: The Dice/Cards Game Hook
**Best for:** Basic probability, sample spaces

```
┌─────────────────────────────────────────────────┐
│ SCENARIO: A game with clear rules               │
│ ↓                                               │
│ PUZZLE: One player seems to have an advantage   │
│ ↓                                               │
│ INSIGHT: We need to count all possibilities     │
│ ↓                                               │
│ BRIDGE: Probability = favorable / total         │
└─────────────────────────────────────────────────┘
```

**Exemplar:** `probabilidad-eventos/Step1Hook.tsx` - "El Juego de Dados"
- Two players: one wins on even, one wins on odd
- Visual: All 6 dice faces displayed
- Question: Is this game fair?
- Discovery: 3 even, 3 odd - yes, it's fair!

**Why it works:**
- Everyone has played dice games
- The fairness question creates genuine curiosity
- Visual dice make enumeration concrete

#### Pattern 2: The "Which Would You Choose?" Hook
**Best for:** Comparing probabilities, expected value

```
┌─────────────────────────────────────────────────┐
│ SCENARIO: Two options with different odds       │
│ ↓                                               │
│ PUZZLE: Which option is better?                 │
│ ↓                                               │
│ INSIGHT: We need to calculate probabilities     │
│ ↓                                               │
│ BRIDGE: Higher probability = better chance      │
└─────────────────────────────────────────────────┘
```

**Example:** "La Ruleta del Premio"
- Wheel A: 1 in 10 chance to win $100
- Wheel B: 5 in 20 chance to win $50
- Question: Which wheel would you spin?
- Discovery: Requires calculating and comparing

#### Pattern 3: The Counting Challenge Hook
**Best for:** Combinatorics, counting principles

```
┌─────────────────────────────────────────────────┐
│ SCENARIO: Many combinations to count            │
│ ↓                                               │
│ PUZZLE: How many total options exist?           │
│ ↓                                               │
│ INSIGHT: There's a pattern/shortcut             │
│ ↓                                               │
│ BRIDGE: Multiply choices at each stage          │
└─────────────────────────────────────────────────┘
```

**Exemplar:** `principio-multiplicativo/Step1Hook.tsx` - "El Armario de Combinaciones"
- 4 shirts, 3 pants - how many outfits?
- Visual: Grid showing all combinations
- Discovery: 4 × 3 = 12 (multiplication is the pattern)

### Probability Hook Visual Patterns

```typescript
// Dice faces display
const DICE_FACES = [
  { value: 1, dots: [[50, 50]] },
  { value: 2, dots: [[25, 25], [75, 75]] },
  { value: 3, dots: [[25, 25], [50, 50], [75, 75]] },
  { value: 4, dots: [[25, 25], [75, 25], [25, 75], [75, 75]] },
  { value: 5, dots: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]] },
  { value: 6, dots: [[25, 25], [75, 25], [25, 50], [75, 50], [25, 75], [75, 75]] },
];

const DiceFace = ({ value, highlighted = false }: Props) => (
  <div className={cn(
    'w-16 h-16 bg-white rounded-lg border-2 relative',
    highlighted ? 'border-green-500 scale-110 shadow-lg' : 'border-gray-300'
  )}>
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {DICE_FACES[value - 1].dots.map((dot, i) => (
        <circle key={i} cx={dot[0]} cy={dot[1]} r="10" fill="#1f2937" />
      ))}
    </svg>
  </div>
);

// All dice faces with highlighting
<div className="grid grid-cols-6 gap-4">
  {[1, 2, 3, 4, 5, 6].map(value => (
    <DiceFace
      key={value}
      value={value}
      highlighted={favorableOutcomes.includes(value)}
    />
  ))}
</div>
```

---

## Explore Patterns for Probability

### The "Enumerate and Count" Pattern

Probability explore steps should make **all possibilities visible and countable**.

#### Structure: Visual Enumeration

```typescript
interface Outcome {
  id: string;
  label: string;
  isFavorable: boolean;
}

const ALL_OUTCOMES: Outcome[] = [
  { id: '1', label: '1', isFavorable: false },  // odd
  { id: '2', label: '2', isFavorable: true },   // even - favorable for our event
  { id: '3', label: '3', isFavorable: false },
  { id: '4', label: '4', isFavorable: true },
  { id: '5', label: '5', isFavorable: false },
  { id: '6', label: '6', isFavorable: true },
];

// Visual grid with click-to-reveal or automatic highlighting
<div className="grid grid-cols-3 gap-4">
  {ALL_OUTCOMES.map(outcome => (
    <div
      key={outcome.id}
      className={cn(
        'p-4 rounded-xl text-center font-bold text-xl transition-all',
        outcome.isFavorable
          ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 ring-2 ring-green-500'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
      )}
    >
      {outcome.label}
    </div>
  ))}
</div>

// Summary counter
<div className="mt-6 text-center">
  <p className="text-lg">
    Favorables: <span className="font-bold text-green-600">{favorableCount}</span>
    {' / '}
    Total: <span className="font-bold text-gray-800">{totalCount}</span>
  </p>
</div>
```

#### Combination Grid Pattern

For multiplicative counting:

```typescript
// Grid showing all combinations (shirts × pants)
const SHIRTS = ['👕 Azul', '👕 Rojo', '👕 Verde', '👕 Blanco'];
const PANTS = ['👖 Negro', '👖 Azul', '👖 Gris'];

<div className="overflow-x-auto">
  <table className="w-full border-collapse">
    <thead>
      <tr>
        <th className="p-2"></th>
        {PANTS.map(pant => (
          <th key={pant} className="p-2 text-center">{pant}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {SHIRTS.map(shirt => (
        <tr key={shirt}>
          <td className="p-2 font-medium">{shirt}</td>
          {PANTS.map(pant => (
            <td
              key={`${shirt}-${pant}`}
              className={cn(
                'p-2 text-center border border-gray-200 dark:border-gray-700',
                revealed.includes(`${shirt}-${pant}`)
                  ? 'bg-blue-100 dark:bg-blue-900/50'
                  : 'bg-gray-50 dark:bg-gray-800'
              )}
            >
              {revealed.includes(`${shirt}-${pant}`) ? '✓' : '?'}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

#### Progressive Reveal Pattern

```typescript
const [revealedCount, setRevealedCount] = useState(0);

// Reveal one at a time with animation
const handleRevealNext = () => {
  if (revealedCount < ALL_OUTCOMES.length) {
    setRevealedCount(prev => prev + 1);
  }
};

// Or reveal all at once for "aha" moment
const handleRevealAll = () => {
  setRevealedCount(ALL_OUTCOMES.length);
};
```

### Tree Diagram Pattern

For sequential events:

```typescript
// Tree diagram for two coin flips
<svg viewBox="0 0 400 300" className="w-full max-w-lg">
  {/* First flip */}
  <circle cx="200" cy="30" r="20" fill="#3b82f6" />
  <text x="200" y="35" textAnchor="middle" fill="white">Inicio</text>

  {/* Branches to H and T */}
  <line x1="200" y1="50" x2="100" y2="100" stroke="#6b7280" />
  <line x1="200" y1="50" x2="300" y2="100" stroke="#6b7280" />

  {/* Second level */}
  <circle cx="100" cy="120" r="20" fill="#22c55e" />
  <text x="100" y="125" textAnchor="middle" fill="white">C</text>

  <circle cx="300" cy="120" r="20" fill="#ef4444" />
  <text x="300" y="125" textAnchor="middle" fill="white">S</text>

  {/* Continue branches... */}
</svg>
```

---

## Explain Patterns for Probability

### Formula Card + Visual Pattern

Probability Explain steps should show the **formula with visual confirmation**.

```typescript
<div className="space-y-6">
  {/* The formula */}
  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
    <h3 className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-4 text-center">
      Probabilidad de un Evento
    </h3>
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <p className="text-center font-mono text-2xl">
        P(A) = <span className="text-green-600">casos favorables</span> / <span className="text-blue-600">casos totales</span>
      </p>
    </div>
  </div>

  {/* Visual example with the formula applied */}
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
    <h4 className="font-semibold mb-4">Ejemplo: Lanzar un dado y obtener par</h4>

    <div className="flex items-center justify-center gap-2 mb-4">
      {[1, 2, 3, 4, 5, 6].map(n => (
        <DiceFace key={n} value={n} highlighted={n % 2 === 0} />
      ))}
    </div>

    <div className="text-center space-y-2">
      <p>Casos favorables (pares): <span className="text-green-600 font-bold">3</span> {'{2, 4, 6}'}</p>
      <p>Casos totales: <span className="text-blue-600 font-bold">6</span></p>
      <p className="text-xl font-bold mt-4">
        P(par) = 3/6 = <span className="text-purple-600">1/2</span> = <span className="text-purple-600">50%</span>
      </p>
    </div>
  </div>
</div>
```

### Probability Types Reference

For lessons covering multiple probability concepts:

```typescript
type TabId = 'simple' | 'complement' | 'addition' | 'multiplication' | 'tips';

const PROBABILITY_TYPES = [
  {
    id: 'simple',
    title: 'Probabilidad Simple',
    formula: 'P(A) = n(A) / n(S)',
    description: 'La razón entre casos favorables y casos totales',
  },
  {
    id: 'complement',
    title: 'Complemento',
    formula: "P(A') = 1 - P(A)",
    description: 'La probabilidad de que NO ocurra el evento',
  },
  {
    id: 'addition',
    title: 'Regla de la Suma',
    formula: 'P(A ∪ B) = P(A) + P(B) - P(A ∩ B)',
    description: 'Para eventos que pueden ocurrir juntos',
  },
  {
    id: 'multiplication',
    title: 'Regla del Producto',
    formula: 'P(A ∩ B) = P(A) × P(B|A)',
    description: 'Para eventos secuenciales',
  },
];
```

---

## Verify Questions for Probability

### Question Type Mix

Probability checkpoint questions should include:

1. **Calculation** (2 questions)
   - "¿Cuál es la probabilidad de obtener cara al lanzar una moneda?"
   - Tests formula application

2. **Enumeration** (1 question)
   - "Al lanzar dos dados, ¿cuántos resultados posibles hay?"
   - Tests ability to count sample space

3. **Reasoning** (1 question)
   - "¿Por qué P(A) + P(A') = 1?"
   - Tests understanding of probability concepts

### Question Patterns

```typescript
const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: 'Al lanzar un dado, ¿cuál es la probabilidad de obtener un número mayor que 4?',
    options: ['1/6', '2/6', '3/6', '4/6'],
    correctAnswer: 1,
    explanation: 'Los números mayores que 4 son: 5 y 6. P = 2/6 = 1/3',
  },
  {
    id: 'q2',
    question: 'Si tienes 3 camisas y 4 pantalones, ¿cuántos atuendos diferentes puedes formar?',
    options: ['7', '12', '24', '81'],
    correctAnswer: 1,
    explanation: 'Por el principio multiplicativo: 3 × 4 = 12 atuendos',
  },
  {
    id: 'q3',
    question: 'Si P(lluvia) = 0.3, ¿cuál es P(no lluvia)?',
    options: ['0.3', '0.7', '1.3', '0'],
    correctAnswer: 1,
    explanation: 'P(no lluvia) = 1 - P(lluvia) = 1 - 0.3 = 0.7',
  },
  {
    id: 'q4',
    question: 'Un evento tiene probabilidad 0. Esto significa que:',
    options: [
      'Es muy poco probable',
      'Es imposible',
      'Ocurrirá eventualmente',
      'Necesitamos más datos'
    ],
    correctAnswer: 1,
    explanation: 'Probabilidad 0 significa que el evento es imposible (nunca ocurrirá)',
  },
];
```

### Questions with Visuals

Probability often needs questions with **embedded pie charts or diagrams**:

```typescript
// Custom Step6Verify when needed for pie chart questions
export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  // Justified because we need to show pie charts within questions

  return (
    <div>
      <p className="text-lg mb-4">
        Observa la ruleta. ¿Cuál es la probabilidad de caer en azul?
      </p>
      <div className="flex justify-center mb-4">
        <PieChart
          data={[
            { label: 'Azul', value: 2, color: '#3b82f6' },
            { label: 'Rojo', value: 3, color: '#ef4444' },
            { label: 'Verde', value: 1, color: '#22c55e' },
          ]}
          size={150}
        />
      </div>
      {/* Multiple choice options */}
    </div>
  );
}
```

---

## Shared Components for Probability

### Heavily Used Components

```typescript
import { CheckpointQuiz } from '@/components/lessons/shared';
// For Step6Verify when possible

import { PieChart } from '@/components/lessons/shared';
// For showing probability distributions, sectors

import { BarChart } from '@/components/lessons/shared';
// For frequency distributions, comparisons

import { VennDiagram } from '@/components/lessons/shared';
// For overlapping events, A ∪ B, A ∩ B
```

### PieChart Usage

```typescript
<PieChart
  data={[
    { label: 'Evento A', value: 30, color: '#3b82f6' },
    { label: 'Evento B', value: 50, color: '#22c55e' },
    { label: 'Otros', value: 20, color: '#9ca3af' },
  ]}
  size={200}
  showLabels={true}
  showPercentages={true}
  interactive={true}
  highlightIndex={hoveredIndex}
/>
```

### Custom Dice Component

```typescript
// Often created per-lesson
const DiceFace = ({ value, size = 'md', highlighted = false }: DiceProps) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  };

  return (
    <div className={cn(
      sizeClasses[size],
      'bg-white rounded-lg border-2 relative transition-all',
      highlighted
        ? 'border-green-500 ring-2 ring-green-300 scale-110'
        : 'border-gray-300'
    )}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {getDotPositions(value).map((pos, i) => (
          <circle key={i} cx={pos.x} cy={pos.y} r="12" fill="#1f2937" />
        ))}
      </svg>
    </div>
  );
};
```

---

## Probability Color Palette

| Element | Light | Dark |
|---------|-------|------|
| Favorable outcome | `bg-green-100` | `bg-green-900/50` |
| Unfavorable outcome | `bg-gray-100` | `bg-gray-800` |
| Event A | `bg-blue-500` | `bg-blue-600` |
| Event B | `bg-purple-500` | `bg-purple-600` |
| Intersection | `bg-green-500` | `bg-green-600` |
| Complement | `bg-red-100` | `bg-red-900/50` |
| Probability text | `text-purple-600` | `text-purple-400` |

---

## Exemplar Probability Lessons

Study these for best practices:

| Lesson | Best For | Quality |
|--------|----------|---------|
| `probabilidad-eventos` | Dice visualization, Probability scale (0→1), Interactive dice selection | ★★★★★ |
| `probabilidad-condicional` | Venn diagram filtering, Weather/umbrella scenario | ★★★★★ |
| `reglas-probabilidad` | Gift cards scenario, Addition rules with VennDiagram | ★★★★☆ |
| `principio-multiplicativo` | Wardrobe dilemma, Combination grid, Tab-based formulas | ★★★★★ |
| `tablas-frecuencia-graficos` | Kiosk orders, Animated receipt tape, Concept cards | ★★★★★ |
| `histogramas-datos-agrupados` | Coach's confusion, Chaos → Organization flow | ★★★★☆ |
| `tendencia-central` | Class trip budget, Interactive slider for guessing | ★★★★★ |
| `cuartiles-percentiles` | Extends central tendency themes | ★★★★☆ |

---

## Complete Hook Inventory

All probability lessons use games/fairness or data scenarios:

| Lesson | Scenario | Engagement Method |
|--------|----------|-------------------|
| `probabilidad-eventos` | Dice game bet | "Is this fair?" |
| `probabilidad-condicional` | Weather forecast | "Should I bring umbrella?" |
| `reglas-probabilidad` | Gift cards selection | "What's the chance?" |
| `principio-multiplicativo` | Wardrobe combinations | "How many outfits?" |
| `tablas-frecuencia-graficos` | School kiosk orders | Animated chaos → need for organization |
| `histogramas-datos-agrupados` | Race times | Confused coach, too many numbers |
| `tendencia-central` | Class trip budget | Interactive slider guess |
| `cuartiles-percentiles` | Distribution position | Percentile rankings |

---

## Chaos → Guess → Reveal Pattern

Unique to statistics lessons:

```typescript
// Phase 1: Show overwhelming/chaotic data
<div className="animate-pulse">
  {rawData.map((item, i) => (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: i * 0.1 }}
    >
      {item}
    </motion.span>
  ))}
</div>

// Phase 2: Ask for guess/prediction
<Slider
  value={guess}
  onChange={setGuess}
  label="¿Cuál crees que es el valor típico?"
/>

// Phase 3: Reveal organized solution
<div className="animate-fadeIn">
  <FrequencyTable data={organizedData} />
  <p>¡Tu respuesta: {guess} vs Respuesta correcta: {answer}!</p>
</div>
```

---

## Probability Scale Visualization

From `probabilidad-eventos/Step3Explain.tsx`:

```typescript
// Visual scale from 0 to 1 with labeled milestones
<div className="relative h-4 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full">
  {/* Milestones */}
  <div className="absolute left-0 -top-6 text-sm">0 (Imposible)</div>
  <div className="absolute left-1/4 -top-6 text-sm">0.25</div>
  <div className="absolute left-1/2 -top-6 text-sm">0.5 (Igual)</div>
  <div className="absolute left-3/4 -top-6 text-sm">0.75</div>
  <div className="absolute right-0 -top-6 text-sm">1 (Seguro)</div>

  {/* Current probability marker */}
  <motion.div
    className="absolute w-4 h-4 bg-blue-500 rounded-full -top-0.5"
    animate={{ left: `${probability * 100}%` }}
  />
</div>
```

---

## Interactive Dice Selection

From `probabilidad-eventos/Step2ExploreDice.tsx`:

```typescript
const DICE_FACES = [1, 2, 3, 4, 5, 6];

// 3 sequential challenges with increasing complexity
const CHALLENGES = [
  { label: 'Mayor que 4', check: (n: number) => n > 4 },
  { label: 'Menor que 3', check: (n: number) => n < 3 },
  { label: 'Múltiplo de 3', check: (n: number) => n % 3 === 0 },
];

// Students click to select favorable outcomes
<div className="grid grid-cols-6 gap-2">
  {DICE_FACES.map(face => (
    <button
      key={face}
      onClick={() => toggleSelection(face)}
      className={cn(
        'p-4 rounded-lg border-2 transition-all',
        selected.includes(face)
          ? 'border-green-500 bg-green-100 ring-2 ring-green-300'
          : 'border-gray-300'
      )}
    >
      <DiceFace value={face} />
    </button>
  ))}
</div>
```

---

## Venn Diagram Filtering

From `probabilidad-condicional/Step2Explore.tsx`:

```typescript
// 20 students as colored circles
// Dynamic filtering shows conditional probability visually

const STUDENTS = [
  { id: 1, sport: true, music: true },
  { id: 2, sport: true, music: false },
  // ...
];

// When filtering for P(music | sport):
// 1. Fade out non-sport students
// 2. Highlight music students among remaining

<div className="grid grid-cols-5 gap-2">
  {STUDENTS.map(student => (
    <motion.div
      key={student.id}
      animate={{
        opacity: filterCondition(student) ? 1 : 0.2,
        scale: isFavorable(student) ? 1.1 : 1,
      }}
      className={cn(
        'w-10 h-10 rounded-full',
        student.sport && student.music && 'bg-green-500',
        student.sport && !student.music && 'bg-blue-500',
        !student.sport && student.music && 'bg-purple-500',
        !student.sport && !student.music && 'bg-gray-300',
      )}
    />
  ))}
</div>
```

---

## Animated Receipt Tape

From `tablas-frecuencia-graficos/Step1Hook.tsx`:

```typescript
// Orders appear one by one, showing data chaos
const [visibleOrders, setVisibleOrders] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setVisibleOrders(prev => Math.min(prev + 1, ORDERS.length));
  }, 150);
  return () => clearInterval(interval);
}, []);

<div className="font-mono text-sm bg-white p-4 rounded shadow max-h-64 overflow-y-auto">
  {ORDERS.slice(0, visibleOrders).map((order, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      Orden #{i + 1}: {order}
    </motion.div>
  ))}
</div>

// Counter shows running totals
<div className="text-2xl font-bold">
  Total: {visibleOrders} pedidos
</div>
```

---

## Tab-Based Formula Reference

From `principio-multiplicativo/Step3Explain.tsx`:

```typescript
type TabId = 'basic' | 'multiple' | 'repetition' | 'permutation' | 'tips';

const TABS = [
  { id: 'basic', title: '2 Decisiones', formula: 'n₁ × n₂', color: 'blue' },
  { id: 'multiple', title: 'Múltiples', formula: 'n₁ × n₂ × ... × nₖ', color: 'purple' },
  { id: 'repetition', title: 'Con Repetición', formula: 'nᵏ', color: 'teal' },
  { id: 'permutation', title: 'Sin Repetición', formula: 'n!', color: 'pink' },
];

// Tips tab with error prevention
<TabContent tabId="tips">
  <div className="grid grid-cols-2 gap-4">
    <div className="bg-red-50 p-3 rounded">
      <h5>❌ Error común: Sumar en lugar de multiplicar</h5>
      <p>3 + 4 = 7 atuendos (INCORRECTO)</p>
    </div>
    <div className="bg-green-50 p-3 rounded">
      <h5>✓ Correcto: Multiplicar opciones</h5>
      <p>3 × 4 = 12 atuendos</p>
    </div>
  </div>
</TabContent>
```

---

## Outlier Demonstration

From `tendencia-central/Step1Hook.tsx`:

```typescript
// Shows 3 different answers for same data
const DATA = [20, 30, 40, 40, 40, 50, 50, 60, 70, 180]; // 180 is outlier

// Result phase shows all three measures
<div className="grid grid-cols-3 gap-4">
  <ResultCard
    title="Media"
    value="$60"
    subtitle="Solo 4/10 pueden pagarlo"
    color="red"
    icon={<AlertTriangle />}
    explanation="Juan's $180 inflates the mean"
  />
  <ResultCard
    title="Mediana"
    value="$50"
    subtitle="6/10 pueden pagarlo"
    color="green"
    icon={<Check />}
    explanation="Middle value, resistant to outliers"
  />
  <ResultCard
    title="Moda"
    value="$50"
    subtitle="Aparece 3 veces"
    color="blue"
    icon={<TrendingUp />}
    explanation="Most common value"
  />
</div>
```

---

## Step Naming Note

⚠️ **Missing Step2 in one lesson:**

| Lesson | Has Step2? |
|--------|------------|
| `probabilidad-eventos` | Yes (Step2ExploreDice.tsx) |
| `probabilidad-condicional` | Yes |
| `reglas-probabilidad` | **No** |
| `principio-multiplicativo` | Yes |
| `tablas-frecuencia-graficos` | Yes (Step2BuildGraph.tsx) |
| Others | Yes |

**Recommendation:** Add Step2 to reglas-probabilidad.

---

## Probability-Specific Anti-Patterns

1. **Formula before enumeration** - Always show ALL outcomes first
2. **Abstract sample spaces** - Make every outcome visible and countable
3. **Skipping the fairness question** - Games/fairness engage students naturally
4. **No visual confirmation** - Every probability calculation should have visual backup
5. **Complex notation too early** - Use words (favorable/total) before symbols (n(A)/n(S))
6. **Missing tree diagrams** - For sequential events, always show the tree
7. **Missing Step2Explore** - Don't skip the exploration phase
8. **Inconsistent button labels** - Use "Continuar" consistently
9. **Over-reliance on CheckpointQuiz** - Consider scenario-based final assessments

---

## Missing Patterns to Consider

1. **Real-Time Data Manipulation** - Let students add/modify data points
2. **Simulation/Monte Carlo** - Generate random outcomes, show convergence
3. **Comparison Over Time** - Animated transitions as data changes
4. **Branching Explanations** - Customize feedback based on wrong answer chosen
5. **Error Correction Drills** - "Spot the error in this calculation"
6. **Cross-Lesson Connections** - Link to fractions for P(A), multiplication for combinations
