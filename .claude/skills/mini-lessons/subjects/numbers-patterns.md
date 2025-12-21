# Numbers Lessons Pattern Guide

This guide provides specific patterns for creating numbers (números) lessons. Read this AFTER the main SKILL.md and pedagogical-design.md.

---

## Numbers Lesson Characteristics

Numbers lessons focus on **visualization, part-whole relationships, and computational fluency**. Students need to SEE quantities before manipulating them symbolically.

### Key Pedagogical Insight

> Numbers lessons can work with **direct visualization** - students understand fractions, percentages, and decimals better when they can literally see and count the parts. Unlike algebra, we don't need elaborate metaphors; we need clear visual representations.

---

## Hook Patterns for Numbers

### The "Visual Quantity" Pattern

Numbers hooks should present a **visual, countable scenario** that makes abstract quantities concrete.

#### Pattern 1: The Fair Sharing Hook
**Best for:** Fractions, division, ratios

```
┌─────────────────────────────────────────────────┐
│ SCENARIO: Something needs to be shared fairly   │
│ ↓                                               │
│ PUZZLE: How do we divide it equally?            │
│ ↓                                               │
│ INSIGHT: We need to count/compare parts         │
│ ↓                                               │
│ BRIDGE: Fractions represent parts of wholes     │
└─────────────────────────────────────────────────┘
```

**Exemplar:** `fracciones-concepto/Step1Hook.tsx` - "Compartir Chocolate"
- Split a chocolate bar between friends
- Visual SVG of chocolate divided into sections
- Discovery: 1/2 is actually MORE than 1/4

**Why it works:**
- Everyone has shared food
- Visual representation is immediate and intuitive
- Counter-intuitive result (smaller denominator = bigger piece) creates curiosity

#### Pattern 2: The Comparison Shopping Hook
**Best for:** Percentages, decimals, ratios

```
┌─────────────────────────────────────────────────┐
│ SCENARIO: Comparing deals or prices             │
│ ↓                                               │
│ PUZZLE: Which option is better?                 │
│ ↓                                               │
│ INSIGHT: We need a common basis to compare      │
│ ↓                                               │
│ BRIDGE: Percentages give us that common basis   │
└─────────────────────────────────────────────────┘
```

**Exemplar:** `porcentaje-concepto/Step1Hook.tsx` - "El Descuento de la Tienda"
- Which store has better deal: 20% off or $15 off?
- Visual price tags with original and sale prices
- Discovery: It depends on the original price!

#### Pattern 3: The Counting Challenge Hook
**Best for:** LCM, GCD, prime numbers, multiples

```
┌─────────────────────────────────────────────────┐
│ SCENARIO: Timing or pattern that repeats        │
│ ↓                                               │
│ PUZZLE: When do two patterns align?             │
│ ↓                                               │
│ INSIGHT: We need to find common multiples       │
│ ↓                                               │
│ BRIDGE: LCM tells us when patterns sync         │
└─────────────────────────────────────────────────┘
```

**Exemplar:** `minimo-comun-multiplo/Step1Hook.tsx` - "Los Autobuses"
- Bus A arrives every 6 minutes, Bus B every 8 minutes
- They're at the stop together now
- Question: When will they meet again?

### Numbers Hook Visual Patterns

```typescript
// Pizza/Pie visualization for fractions
<div className="relative w-48 h-48">
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {/* Full circle background */}
    <circle cx="50" cy="50" r="45" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
    {/* Colored slices */}
    {slices.map((slice, i) => (
      <path
        key={i}
        d={describeArc(50, 50, 45, slice.start, slice.end)}
        fill={slice.color}
        stroke="white"
        strokeWidth="2"
      />
    ))}
  </svg>
</div>

// Bar/Strip visualization for fractions
<div className="flex h-12 rounded-lg overflow-hidden border-2 border-gray-300">
  {Array.from({ length: denominator }).map((_, i) => (
    <div
      key={i}
      className={cn(
        'flex-1 border-r border-gray-300 last:border-r-0',
        i < numerator ? 'bg-blue-500' : 'bg-gray-100'
      )}
    />
  ))}
</div>
```

---

## Explore Patterns for Numbers

### The "Repeated Practice with Visual Feedback" Pattern

Numbers explore steps emphasize **practice with immediate visual verification**.

#### Structure: Multi-Problem with Visual Guide

```typescript
interface Problem {
  id: string;
  setup: string;           // "1/5 + 2/5"
  numerator: number;       // For visual
  denominator: number;     // For visual
  correctAnswer: string;   // "3/5"
  hint: string;
}

const PROBLEMS: Problem[] = [
  { id: 'p1', setup: '1/5 + 2/5', numerator: 3, denominator: 5, correctAnswer: '3/5', hint: 'Suma los numeradores' },
  { id: 'p2', setup: '2/8 + 3/8', numerator: 5, denominator: 8, correctAnswer: '5/8', hint: 'El denominador se mantiene' },
  { id: 'p3', setup: '4/6 - 1/6', numerator: 3, denominator: 6, correctAnswer: '3/6 = 1/2', hint: '¿Se puede simplificar?' },
];
```

**Exemplar:** `suma-resta-fracciones-igual-denominador/Step2ExploreAddition.tsx`

#### Visual Components for Numbers

```typescript
// FractionBar - shows fraction as colored portions
<FractionBar
  numerator={3}
  denominator={5}
  color="blue"
  showLabels={true}
/>

// Pizza - shows fraction as pie slices
<Pizza
  numerator={3}
  denominator={8}
  highlightColor="blue"
/>

// NumberGrid - for finding multiples/factors
<NumberGrid
  max={50}
  highlighted={[6, 12, 18, 24, 30]}
  secondHighlighted={[8, 16, 24, 32, 40]}
  commonHighlighted={[24, 48]}
/>
```

#### Progress Tracking Pattern

```typescript
<div className="flex justify-center gap-2 mb-6">
  {PROBLEMS.map((problem, i) => (
    <div
      key={problem.id}
      className={cn(
        'w-10 h-10 rounded-full flex items-center justify-center font-bold',
        completedProblems.includes(problem.id)
          ? 'bg-green-500 text-white'
          : i === currentProblem
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-500'
      )}
    >
      {completedProblems.includes(problem.id) ? '✓' : i + 1}
    </div>
  ))}
</div>
```

### Grid-Based Discovery for Multiples/Factors

```typescript
// Interactive number grid for LCM/GCD discovery
const NumberGrid = ({ max, onNumberClick }: Props) => {
  const [marked, setMarked] = useState<Record<number, 'first' | 'second' | 'both'>>({});

  return (
    <div className="grid grid-cols-10 gap-1">
      {Array.from({ length: max }, (_, i) => i + 1).map(num => (
        <button
          key={num}
          onClick={() => onNumberClick(num)}
          className={cn(
            'w-8 h-8 rounded text-sm font-medium',
            marked[num] === 'first' && 'bg-blue-500 text-white',
            marked[num] === 'second' && 'bg-purple-500 text-white',
            marked[num] === 'both' && 'bg-green-500 text-white',
            !marked[num] && 'bg-gray-100 hover:bg-gray-200'
          )}
        >
          {num}
        </button>
      ))}
    </div>
  );
};
```

**Exemplar:** `minimo-comun-multiplo/Step2ExploreMultiples.tsx`

---

## Explain Patterns for Numbers

### Phase-Based Sequential Pattern

Numbers lessons often use **sequential phases** (unlike algebra's tabs) because concepts build on each other.

```typescript
type Phase = 'rule1' | 'rule2' | 'simplification' | 'summary';
const [phase, setPhase] = useState<Phase>('rule1');

// Navigation buttons
<div className="flex justify-between">
  <button
    onClick={() => setPhase(prevPhase)}
    disabled={phase === 'rule1'}
    className="flex items-center gap-2"
  >
    <ChevronLeft size={20} />
    Anterior
  </button>
  <button
    onClick={() => setPhase(nextPhase)}
    disabled={phase === 'summary'}
    className="flex items-center gap-2"
  >
    Siguiente
    <ChevronRight size={20} />
  </button>
</div>
```

#### Phase Content Structure

```typescript
{phase === 'rule1' && (
  <div className="space-y-6 animate-fadeIn">
    {/* Rule statement */}
    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
      <h3 className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-4">
        Regla de la Suma
      </h3>
      <p className="font-mono text-xl text-center my-4">
        a/c + b/c = (a + b)/c
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        Cuando los denominadores son iguales, sumamos los numeradores.
      </p>
    </div>

    {/* Visual example */}
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
      <FractionBar numerator={1} denominator={5} color="blue" />
      <span className="mx-4 text-2xl">+</span>
      <FractionBar numerator={2} denominator={5} color="blue" />
      <span className="mx-4 text-2xl">=</span>
      <FractionBar numerator={3} denominator={5} color="green" />
    </div>
  </div>
)}
```

### When to Use Tabs vs Phases

| Use Phases | Use Tabs |
|------------|----------|
| Content builds sequentially | Content is parallel/reference |
| Must see rule 1 before rule 2 | Any section can be accessed first |
| Linear learning path | Non-linear exploration |
| Fractions, operations | Formulas with multiple cases |

---

## Verify Questions for Numbers

### Question Type Mix

Numbers checkpoint questions should include:

1. **Computational** (2-3 questions)
   - "Calcula: 3/8 + 2/8"
   - Tests ability to apply procedures

2. **Conceptual Understanding** (1 question)
   - "¿Por qué el denominador no cambia al sumar fracciones con igual denominador?"
   - Tests understanding of WHY the procedure works

3. **Application** (1 question)
   - "María comió 2/6 de pizza y Juan 3/6. ¿Cuánto comieron juntos?"
   - Tests transfer to real context

### Question Patterns

```typescript
const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: 'Calcula: 2/7 + 3/7',
    options: ['5/14', '5/7', '6/7', '1'],
    correctAnswer: 1,
    explanation: 'Sumamos numeradores: 2 + 3 = 5. El denominador se mantiene: 5/7',
  },
  {
    id: 'q2',
    question: 'Calcula: 5/8 - 2/8',
    options: ['3/0', '3/16', '3/8', '7/8'],
    correctAnswer: 2,
    explanation: 'Restamos numeradores: 5 - 2 = 3. El denominador se mantiene: 3/8',
  },
  {
    id: 'q3',
    question: '¿Por qué sumamos solo los numeradores cuando los denominadores son iguales?',
    options: [
      'Porque los numeradores son más importantes',
      'Porque las partes tienen el mismo tamaño',
      'Porque es más fácil',
      'Porque el resultado es más pequeño'
    ],
    correctAnswer: 1,
    explanation: 'Cuando el denominador es igual, las partes tienen el mismo tamaño, así que solo contamos cuántas partes tenemos.',
  },
  {
    id: 'q4',
    question: 'Ana bebió 1/4 de litro y luego 2/4 de litro. ¿Cuánto bebió en total?',
    options: ['3/8 L', '3/4 L', '1/2 L', '1 L'],
    correctAnswer: 1,
    explanation: '1/4 + 2/4 = 3/4 de litro.',
  },
];
```

---

## Shared Components for Numbers

### Heavily Used Components

```typescript
import { CheckpointQuiz } from '@/components/lessons/shared';
// Always for Step6Verify

import { NumberLine } from '@/components/lessons/shared';
// For integer ordering, ranges, number placement

import { PieChart } from '@/components/lessons/shared';
// For proportions, percentages, ratios

import { BarChart } from '@/components/lessons/shared';
// For frequency, comparison
```

### Subject-Specific Components

Numbers lessons often create custom visual components:

```typescript
// FractionBar - custom component often defined per lesson
const FractionBar = ({ numerator, denominator, color = 'blue' }: Props) => (
  <div className="flex h-8 rounded overflow-hidden border-2 border-gray-300">
    {Array.from({ length: denominator }).map((_, i) => (
      <div
        key={i}
        className={cn(
          'flex-1 border-r border-white last:border-r-0',
          i < numerator
            ? `bg-${color}-500`
            : 'bg-gray-100 dark:bg-gray-700'
        )}
      />
    ))}
  </div>
);

// Pizza component for circular fractions
const Pizza = ({ numerator, denominator }: Props) => (
  <svg viewBox="0 0 100 100" className="w-32 h-32">
    {/* Implementation for pie slices */}
  </svg>
);
```

---

## Numbers Color Palette

| Element | Light | Dark |
|---------|-------|------|
| Numerator highlight | `bg-blue-500` | `bg-blue-600` |
| Filled portion | `bg-green-500` | `bg-green-600` |
| Empty portion | `bg-gray-100` | `bg-gray-700` |
| Common multiple | `bg-amber-500` | `bg-amber-600` |
| First set | `bg-blue-500` | `bg-blue-600` |
| Second set | `bg-purple-500` | `bg-purple-600` |
| Intersection | `bg-green-500` | `bg-green-600` |

---

## Exemplar Numbers Lessons

Study these for best practices:

| Lesson | Best For | Quality |
|--------|----------|---------|
| `numeros-enteros-orden` | Thermometer visualization, Number line with interactive examples | ★★★★★ |
| `suma-resta-enteros` | Piggy bank scenario, Custom Step6 with progress dots | ★★★★☆ |
| `multiplicacion-division-enteros` | Elevator animation with reversal logic | ★★★★★ |
| `fracciones-concepto-comparacion` | Multi-phase progression with benchmark strategy | ★★★★★ |
| `suma-resta-fracciones-igual-denominador` | FractionBar visuals, multi-problem explore | ★★★★★ |
| `minimo-comun-multiplo` | Calendar synchronization pattern | ★★★★★ |
| `maximo-comun-divisor` | Taco/ingredient distribution | ★★★★☆ |
| `potencias-exponente-positivo` | Chess grains legend (doubling) | ★★★★★ |
| `potencias-exponente-cero-negativo` | Cookie factory with halving | ★★★★☆ |
| `raices-enesimas` | Garden square area problem | ★★★★☆ |
| `notacion-cientifica` | Scientific measurement scales | ★★★★☆ |

---

## Complete Hook Inventory

All números lessons use direct visualization with relatable scenarios:

| Lesson | Scenario | Visualization |
|--------|----------|---------------|
| `numeros-enteros-orden` | Temperature reading | Thermometer SVG |
| `suma-resta-enteros` | Money in piggy bank | Coin animations |
| `multiplicacion-division-enteros` | Elevator going up/down | Animated elevator moving through floors |
| `fracciones-concepto-comparacion` | Sharing chocolate | Pizza/chocolate bar SVG |
| `fracciones-mayores-que-1` | Full pizzas plus slices | Multiple pizza SVGs |
| `suma-resta-fracciones-igual-denominador` | Combining slices | FractionBar component |
| `suma-resta-fracciones-distinto-denominador` | Different sized slices | Multiple FractionBars |
| `multiplicacion-division-fracciones` | Sharing portions | Division visualization |
| `minimo-comun-multiplo` | Bus schedules syncing | Calendar with highlighted days |
| `maximo-comun-divisor` | Distributing tacos/ingredients | Equal group visualization |
| `potencias-exponente-positivo` | Chess grains doubling | Chessboard with grain counting |
| `potencias-exponente-cero-negativo` | Cookie factory halving | Cookie reduction animation |
| `raices-enesimas` | Garden square area | Grid square visualization |
| `notacion-cientifica` | Scientific measurements | Scale comparison |

---

## Unique Visual Components

Numbers lessons create many reusable visual components:

### Thermometer Component
```typescript
const Thermometer = ({ value, min = -20, max = 40 }: Props) => (
  <svg viewBox="0 0 60 200" className="w-16">
    {/* Mercury level based on value */}
    <rect
      x="20"
      y={200 - ((value - min) / (max - min)) * 180}
      width="20"
      height={((value - min) / (max - min)) * 180}
      fill={value < 0 ? '#3b82f6' : '#ef4444'}
    />
    {/* Temperature scale markings */}
  </svg>
);
```

### Elevator Animation
```typescript
const Elevator = ({ floor, direction }: Props) => (
  <div className="relative h-64">
    <div
      className="absolute transition-all duration-700 ease-in-out"
      style={{ bottom: `${(floor + 5) * 20}px` }}
    >
      {/* Elevator car with direction indicator */}
    </div>
  </div>
);
```

### Pizza/Chocolate Components
```typescript
const Pizza = ({ slices, filledSlices, fillColor = 'blue' }: Props) => (
  <svg viewBox="0 0 100 100">
    {Array.from({ length: slices }).map((_, i) => (
      <path
        key={i}
        d={describeArc(50, 50, 45, (i * 360) / slices, ((i + 1) * 360) / slices)}
        fill={i < filledSlices ? `var(--${fillColor})` : '#e5e7eb'}
      />
    ))}
  </svg>
);
```

---

## Benchmark Strategy Pattern

Found in fracciones-concepto-comparacion Step3Explain:

```typescript
// "1/2 is your best friend for comparing fractions"
<div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-lg">
  <h4 className="font-bold text-amber-800 dark:text-amber-200">
    Estrategia del Punto de Referencia
  </h4>
  <p>Usa 1/2 como referencia:</p>
  <ul>
    <li>¿Es mayor, menor o igual a 1/2?</li>
    <li>Compara ambas fracciones con 1/2</li>
    <li>Si están en lados opuestos, ya sabes cuál es mayor</li>
  </ul>
</div>
```

---

## Density/Infinity Concept Visualization

Unique pattern from fracciones-concepto-comparacion:

```typescript
// Shows "between any two fractions, there's another fraction"
<div className="relative">
  <NumberLine fractions={visibleFractions} />
  <button onClick={zoomIn}>
    Ver más fracciones entre ellas
  </button>
  {/* Animated reveal of intermediate fractions */}
</div>
```

---

## Numbers-Specific Anti-Patterns

1. **Abstract before visual** - Always show the visual FIRST, then symbols
2. **Skipping the "why"** - Don't just say "add numerators" without showing why
3. **Too many problems at once** - 3-4 problems in explore is enough
4. **Forgetting simplification** - Always remind about simplifying final answers
5. **No visual verification** - Every calculation should have a visual that confirms the result
6. **Auto-complete on mount** - Step3Explain should NOT auto-advance
7. **Inconsistent Step2 naming** - Use `Step2Explore.tsx` or `Step2Explore[Topic].tsx`
8. **Component duplication** - Extract Pizza, ChocolateBar, etc. to shared library

---

## Missing Patterns to Consider

1. **Draggable Elements** - Drag fractions to order them, drag factors to build trees
2. **Spaced Repetition** - Revisit harder concepts across lessons
3. **Hint System** - "Click for hint" in checkpoints
4. **Error-Driven Learning** - Diagnose specific misconceptions from wrong answers
5. **Visual Proof Tools** - Step-by-step visual derivations (e.g., why a⁰ = 1)
