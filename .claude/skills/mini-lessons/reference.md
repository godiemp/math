# Mini-Lessons Quick Reference

Quick lookup for thematic units, shared components, styling, and exemplar lessons.

---

## Thematic Units

### M1 - Algebra (M1-ALG-001 to M1-ALG-014)

| Code | Topic | Existing Lessons |
|------|-------|------------------|
| M1-ALG-001 | Productos notables, factorizaciones y desarrollo | factor-comun, productos-notables-* |
| M1-ALG-002 | Operatoria con expresiones algebraicas | terminos-semejantes, operaciones-algebraicas |
| M1-ALG-003 | Problemas algebraicos en distintos contextos | |
| M1-ALG-006 | Resolución de ecuaciones e inecuaciones lineales | ecuaciones-lineales |
| M1-ALG-011 | Resolución de ecuaciones de segundo grado | ecuacion-cuadratica-* |

### M1 - Numbers (M1-NUM-001 to M1-NUM-008)

| Code | Topic | Existing Lessons |
|------|-------|------------------|
| M1-NUM-001 | Operaciones y orden en números enteros | orden-enteros, operaciones-enteros |
| M1-NUM-002 | Operaciones y comparación entre racionales | fracciones-*, racionales-* |
| M1-NUM-003 | Potencias de base racional y exponente entero | potencias-* |
| M1-NUM-007 | Raíces enésimas | raices-enesimas |

### M1 - Geometry (M1-GEO-001 to M1-GEO-005)

| Code | Topic | Existing Lessons |
|------|-------|------------------|
| M1-GEO-001 | Teorema de Pitágoras y aplicaciones | pitagoras-* |
| M1-GEO-002 | Perímetros y áreas de figuras compuestas | figuras-compuestas |
| M1-GEO-003 | Teorema de Thales y semejanza | thales-*, semejanza-* |

### M1 - Probability (M1-PROB-001 to M1-PROB-005)

| Code | Topic | Existing Lessons |
|------|-------|------------------|
| M1-PROB-001 | Tablas y gráficos estadísticos | graficos-*, tablas-* |
| M1-PROB-002 | Medidas de tendencia central | media-*, mediana-*, moda-* |
| M1-PROB-004 | Reglas de probabilidades | probabilidad-* |
| M1-PROB-005 | Principio multiplicativo de conteo | principio-multiplicativo |

---

## Complete Lesson Inventory (48 Lessons)

### Algebra Lessons (17)
| Slug | Title | Pattern | Notes |
|------|-------|---------|-------|
| `terminos-semejantes` | Términos Semejantes | Tab-based | ⭐ Best hook |
| `factor-comun` | Factor Común | Tab-based | ⭐ Canonical example |
| `productos-notables` | Productos Notables | Tab-based | |
| `productos-notables-cubos` | Productos Notables (Cubos) | Tab-based | ⚠️ Tips outside tabs |
| `ecuaciones-lineales` | Ecuaciones Lineales | Phase-based | ⭐ Great hook |
| `propiedad-distributiva` | Propiedad Distributiva | Tab-based | ⭐ Great hook |

### Numbers Lessons (15)
| Slug | Title | Pattern | Notes |
|------|-------|---------|-------|
| `fracciones-concepto` | Fracciones (Concepto) | Tab-based | ⭐ Great hook |
| `minimo-comun-multiplo` | MCM | Phase-based | |
| `maximo-comun-divisor` | MCD | Phase-based | |
| `porcentaje-concepto` | Porcentajes (Concepto) | Tab-based | ⭐ Great hook |
| `raices-enesimas` | Raíces Enésimas | Tab-based | ⭐ Great hook |

### Geometry Lessons (8)
| Slug | Title | Pattern | Notes |
|------|-------|---------|-------|
| `figuras-compuestas` | Figuras Compuestas | Tab-based | ⭐ Best visual |
| `teorema-pitagoras` | Teorema de Pitágoras | Phase-based | ⭐ Great hook |
| `area-paralelogramos-trapecios` | Áreas | 5-step | Shortened pipeline |

### Probability Lessons (6)
| Slug | Title | Pattern | Notes |
|------|-------|---------|-------|
| `principio-multiplicativo` | Principio Multiplicativo | Tab-based | ⭐ Great hook |
| `tablas-frecuencia-graficos` | Tablas de Frecuencia | Tab-based | Custom verify |

**Legend:**
- ⭐ = Exemplar (study this)
- ⚠️ = Has known issue
- Phase-based = Uses back/forward navigation
- Custom verify = Justified custom Step6Verify

---

## Shared Components

Import from `@/components/lessons/shared`:

| Component | Use For | Subjects |
|-----------|---------|----------|
| `LessonShell` | Lesson page wrapper | All |
| `CheckpointQuiz` | Step 6 verify (ALWAYS use) | All |
| `Celebration` | Success animations | All (internal) |
| `NumberLine` | Visualizing number concepts | Números |
| `BarChart` | Data visualization | Probabilidad |
| `PieChart` | Probability/statistics | Probabilidad |
| `FrequencyTable` | Frequency tables with tally marks | Probabilidad |
| `FactorGrid` | Visualizing divisors/factors | Números |
| `VennDiagram` | Set theory, probability | Probabilidad |

---

## Component Props Reference

### CheckpointQuiz

```typescript
interface CheckpointQuizProps extends LessonStepProps {
  // From LessonStepProps:
  onComplete: () => void;           // Called when quiz passed
  isActive: boolean;                // Controls visibility

  // Quiz-specific:
  questions: CheckpointQuestion[];  // Required: 3-4 questions
  requiredCorrect?: number;         // Pass threshold (default: 75% of questions)
  title?: string;                   // Header (default: "Checkpoint Final")
  subtitle?: string;                // Instruction text below title
  successMessage?: string;          // Shown on pass (default: "¡Excelente!")
  failureMessage?: string;          // Shown on fail (default: "Sigue practicando")
}

interface CheckpointQuestion {
  id: string;                       // Unique identifier (e.g., 'q1')
  question: string;                 // The question text
  options: string[];                // Array of 4 options
  correctAnswer: number;            // 0-indexed correct option
  explanation: string;              // Shown after answer
}
```

**Example with custom messages:**
```typescript
<CheckpointQuiz
  onComplete={onComplete}
  isActive={isActive}
  questions={QUESTIONS}
  title="¡Demuestra lo que sabes!"
  subtitle="Responde correctamente 3 de 4 preguntas"
  requiredCorrect={3}
  successMessage="¡Dominaste la factorización!"
  failureMessage="Repasa los conceptos y vuelve a intentar"
/>
```

### FrequencyTable

For statistics lessons showing frequency distributions with optional tally marks.

```typescript
interface FrequencyTableProps {
  data: FrequencyTableData[];       // Required: rows of data
  showTally?: boolean;              // Show tally marks column (||||)
  showRelative?: boolean;           // Show relative frequency (hᵢ)
  showPercentage?: boolean;         // Show percentage column
  total?: number;                   // Override auto-calculated total
  highlightRow?: number;            // Index of row to highlight
  onRowClick?: (index: number) => void;  // Interactive row clicks
  animated?: boolean;               // Animate number changes (default: true)
  className?: string;               // Additional CSS classes
}

interface FrequencyTableData {
  category: string;                 // Row label (e.g., "Manzanas")
  frequency: number;                // Count (fᵢ)
  color?: string;                   // Optional color indicator
}
```

**Example usage:**
```typescript
import { FrequencyTable } from '@/components/lessons/shared';

const data = [
  { category: 'Manzanas', frequency: 5, color: '#ef4444' },
  { category: 'Naranjas', frequency: 8, color: '#f97316' },
  { category: 'Plátanos', frequency: 3, color: '#eab308' },
];

<FrequencyTable
  data={data}
  showTally={true}
  showPercentage={true}
  highlightRow={1}
/>
```

### FactorGrid

For visualizing divisors of a number in a grid format.

```typescript
interface FactorGridProps {
  number: number;                   // Required: the number to factor
  maxDisplay?: number;              // Max grid size (defaults to number)
  highlightedFactors?: number[];    // Factors to highlight with scale
  commonFactors?: number[];         // Common factors (yellow ring)
  interactive?: boolean;            // Enable click interactions
  onFactorClick?: (factor: number, isDivisor: boolean) => void;
  size?: 'sm' | 'md' | 'lg';        // Cell size (default: 'md')
  colorScheme?: 'blue' | 'green' | 'purple' | 'orange';
  showLabel?: boolean;              // Show "Divisores de X" label
  label?: string;                   // Custom label override
  showFactorList?: boolean;         // Show badges below grid
}
```

**Example usage:**
```typescript
import { FactorGrid } from '@/components/lessons/shared';

// For MCD lesson - comparing two numbers
<div className="grid grid-cols-2 gap-8">
  <FactorGrid
    number={12}
    colorScheme="blue"
    commonFactors={[1, 2, 3, 4]}
  />
  <FactorGrid
    number={18}
    colorScheme="green"
    commonFactors={[1, 2, 3, 6]}
  />
</div>
```

### VennDiagram

For probability and set theory visualizations with two circles (A and B).

```typescript
interface VennDiagramProps {
  mode: 'exclusive' | 'overlapping' | 'interactive';  // Required: display mode
  showLabels?: boolean;             // Show set labels (default: true)
  labelA?: string;                  // Label for circle A (default: 'A')
  labelB?: string;                  // Label for circle B (default: 'B')
  countA?: number;                  // Count in A only (not B)
  countB?: number;                  // Count in B only (not A)
  countBoth?: number;               // Count in intersection (A ∩ B)
  highlightRegion?: 'A' | 'B' | 'intersection' | 'union' | 'none';
  onRegionClick?: (region: 'A' | 'B' | 'intersection') => void;
  animated?: boolean;               // Enable transitions (default: true)
  size?: 'sm' | 'md' | 'lg';        // Diagram size (default: 'md')
  showCounts?: boolean;             // Show count numbers (default: false)
  className?: string;               // Custom styling
}
```

**Mode descriptions:**
- `'exclusive'` - Circles apart (mutually exclusive events)
- `'overlapping'` - Circles overlap (shows intersection)
- `'interactive'` - Circles overlap + clickable regions

**Example usage:**
```typescript
import { VennDiagram } from '@/components/lessons/shared';

// Basic overlapping diagram with counts
<VennDiagram
  mode="overlapping"
  labelA="Múltiplos de 2"
  labelB="Múltiplos de 3"
  countA={4}          // Only in A: 2, 4, 8, 10
  countB={3}          // Only in B: 3, 9, 12
  countBoth={1}       // In both: 6
  highlightRegion="intersection"
  showCounts={true}
/>

// Interactive diagram for exercises
<VennDiagram
  mode="interactive"
  labelA="Evento A"
  labelB="Evento B"
  onRegionClick={(region) => handleAnswer(region)}
  highlightRegion="none"
/>

// Mutually exclusive events
<VennDiagram
  mode="exclusive"
  labelA="Par"
  labelB="Impar"
  showLabels={true}
/>
```

### NumberLine

Interactive number line for placement exercises and visualization. Supports drag-and-drop number placement with correctness feedback.

```typescript
interface NumberLineProps {
  min?: number;                     // Left bound (default: -5)
  max?: number;                     // Right bound (default: 5)
  showTicks?: boolean;              // Show tick marks (default: true)
  showLabels?: boolean;             // Show number labels (default: true)
  markers?: number[];               // Fixed markers shown on line
  draggableNumbers?: number[];      // Numbers in pool to drag onto line
  onPlacement?: (number: number, position: number) => void;
  onAllCorrect?: () => void;        // Called when all correctly placed
  highlightZero?: boolean;          // Red tick at zero (default: true)
  showDistanceFor?: number | null;  // Show |n| visualization
  readOnly?: boolean;               // Disable dragging (default: false)
  className?: string;
}
```

**Example usage:**
```typescript
// Placement exercise
<NumberLine
  min={-10}
  max={10}
  draggableNumbers={[-3, 5, -7, 2]}
  onAllCorrect={() => setComplete(true)}
/>

// Absolute value visualization
<NumberLine
  min={-5}
  max={5}
  markers={[-3]}
  showDistanceFor={-3}  // Shows |-3| = 3
  readOnly={true}
/>
```

### BarChart

For statistics and data visualization.

```typescript
interface BarChartData {
  category: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarChartData[];             // Chart data
  showValues?: boolean;             // Display values on bars
  showLabels?: boolean;             // Show category labels
  animated?: boolean;               // Animate on render (default: true)
  height?: 'sm' | 'md' | 'lg';      // Chart height
  valueType?: 'absolute' | 'percentage';
  onBarClick?: (index: number) => void;
  highlightIndex?: number;          // Highlight specific bar
  maxValue?: number;                // Override max for scaling
  className?: string;
}
```

### PieChart

For probability and data distribution.

```typescript
interface PieChartData {
  category: string;
  value: number;
  color?: string;
}

interface PieChartProps {
  data: PieChartData[];             // Chart data
  showLegend?: boolean;             // Show legend (default: true)
  showPercentages?: boolean;        // Show % on slices
  size?: 'sm' | 'md' | 'lg';        // Chart size
  interactive?: boolean;            // Enable slice clicks
  highlightIndex?: number;          // Highlight specific slice
  onSliceClick?: (index: number) => void;
  donut?: boolean;                  // Render as donut chart
  className?: string;
}
```

**Example chart usage:**
```typescript
import { BarChart, PieChart } from '@/components/lessons/shared';

const data = [
  { category: 'Manzanas', value: 5, color: '#ef4444' },
  { category: 'Naranjas', value: 8, color: '#f97316' },
];

<BarChart data={data} showValues height="md" />
<PieChart data={data} showPercentages donut />
```

### Celebration

For success animations after lesson/quiz completion. Used internally by CheckpointQuiz but can be used standalone.

```typescript
interface CelebrationProps {
  title?: string;           // Default: '¡Lección Completada!'
  message?: string;         // Default: 'Has demostrado que entiendes el tema.'
  onContinue?: () => void;  // Callback when continue button clicked
  continueLabel?: string;   // Default: 'Continuar'
}
```

**Features:**
- Confetti animation with stars, sparkles, and circles (3 seconds)
- Modal overlay with gradient background
- Bouncing Award icon
- Dark mode support

**Example usage:**
```typescript
import { Celebration } from '@/components/lessons/shared';

// After quiz completion
{showCelebration && (
  <Celebration
    title="¡Excelente!"
    message="Has completado el quiz con éxito."
    onContinue={() => router.push('/lessons')}
    continueLabel="Ver más lecciones"
  />
)}
```

**Note:** CheckpointQuiz uses Celebration internally, so you typically don't need to import it directly unless building custom completion flows.

---

## Styling Conventions

### Colors by Step Type

```
Step 1 (Hook):     amber/orange gradients
Step 2 (Explore):  blue/purple gradients
Step 3 (Explain):  purple/pink gradients
Step 4 (Classify): blue/teal gradients
Step 5 (Practice): purple/blue gradients
Step 6 (Verify):   green (handled by CheckpointQuiz)
```

### Feedback Colors

```
Correct:    green (bg-green-100, text-green-700)
Incorrect:  red or amber (bg-red-100 or bg-amber-100)
Hints:      amber/yellow with Lightbulb icon
Neutral:    gray or blue
```

### Common Gradient Patterns

```typescript
// Hook - warm, inviting
className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30"

// Explore - discovery, exploration
className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30"

// Explain - formal, structured
className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30"

// Success
className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30"
```

### Button Patterns

```typescript
// Primary action (continue, submit)
className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"

// Secondary action (hint, retry)
className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"

// Disabled
className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-400 rounded-xl cursor-not-allowed"
```

---

## Icons (from lucide-react)

```typescript
import {
  // Feedback
  Check,            // Correct answer
  X,                // Incorrect answer

  // Navigation
  ArrowRight,       // Continue, next
  ArrowLeft,        // Back (rare)
  RotateCcw,        // Retry, reset

  // Content indicators
  Lightbulb,        // Hints, tips
  Sparkles,         // Discovery moments
  Trophy,           // Success, completion
  AlertTriangle,    // Warnings, tips
  BookOpen,         // Theory, explain

  // Subject-specific
  Calculator,       // Math operations
  Ruler,            // Geometry
  BarChart3,        // Statistics
  Dice1,            // Probability
} from 'lucide-react';
```

---

## Exemplar Lessons

### Best Overall Structure
**`components/lessons/m1/factor-comun/`**
- Clean 6-step implementation
- Correct Tips-in-tabs pattern
- Good use of CheckpointQuiz
- Well-structured explore phase

### Best Hook Design
**`components/lessons/m1/terminos-semejantes/Step1Hook.tsx`**
- "La Frutería Matemática" concept
- Visual fruit icons create genuine interest
- Natural bridge to algebraic concept
- Phases: scenario → question → result

### Best Visual Exploration
**`components/lessons/m1/figuras-compuestas/Step2Explore.tsx`**
- SVG diagrams showing decomposition
- Two strategies presented side-by-side
- Interactive reveal of solutions
- Clear visual feedback

### Best Tabbed Explanation
**`components/lessons/m1/factor-comun/Step3Explain.tsx`**
- Multiple formula tabs with examples
- Tips properly inside tabs
- Tab visit tracking with checkmarks
- Consistent color scheme

---

## DO NOT Copy These Files

### `productos-notables-cubos/Step3Explain.tsx`
**Problem**: Tips section is OUTSIDE the tabs as a standalone amber section.
**Why it's wrong**: Breaks the tabbed interface pattern, Tips should be a tab.

---

## Lesson ID Format

```
{level}-{subject}-{unit}-{letter}

Examples:
m1-alg-001-a    # First lesson in M1 Algebra unit 001
m1-alg-001-b    # Second lesson in same unit
m1-num-002-c    # Third lesson in M1 Numbers unit 002
m2-geo-003-a    # First lesson in M2 Geometry unit 003
```

### Subject Codes
- `alg` - Álgebra
- `num` - Números
- `geo` - Geometría
- `prob` - Probabilidad y Estadística

---

## MINEDUC Learning Objectives (minEducOA)

Common objectives for PAES M1:

| Code | Description |
|------|-------------|
| MA1M-OA-01 | Operaciones con números enteros y racionales |
| MA1M-OA-02 | Potencias y raíces |
| MA1M-OA-03 | Expresiones algebraicas y factorización |
| MA1M-OA-04 | Ecuaciones e inecuaciones |
| MA1M-OA-05 | Proporcionalidad y porcentajes |
| MA1M-OA-06 | Geometría: perímetros, áreas, volúmenes |
| MA1M-OA-07 | Transformaciones geométricas |
| MA1M-OA-08 | Probabilidad y estadística |

---

## Validation Scripts

Scripts to validate question quality in `lib/questions/`:

### Duplicate Options Validator

Detects questions with equivalent answer options (e.g., `\frac{1}{2}` and `\frac{2}{4}`).

```bash
node scripts/validate-duplicate-options.mjs
```

**What it checks:**
- Normalizes LaTeX fractions to decimals for comparison
- Detects numeric equivalences (e.g., `0.5` = `\frac{1}{2}`)
- Skips algebraic expressions with variables
- Skips numbers with thousands separators (Chilean format)

**Expected output:** Some questions intentionally have duplicate options when asking for "fracción irreducible" (simplified fraction form). These are valid and should not be "fixed."

---

## Duration Guidelines

| Step | Typical Duration |
|------|-----------------|
| Step 1 Hook | 2-3 minutes |
| Step 2 Explore | 3-4 minutes |
| Step 3 Explain | 2-3 minutes |
| Step 4 Classify | 2-3 minutes |
| Step 5 Practice | 3-4 minutes |
| Step 6 Verify | 2-3 minutes |
| **Total** | **12-17 minutes** |

If a lesson is taking longer than 17 minutes, consider:
- Splitting into two lessons
- Reducing practice problems
- Simplifying the explore phase
