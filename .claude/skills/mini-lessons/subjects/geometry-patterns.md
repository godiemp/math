# Geometry Lessons Pattern Guide

This guide provides specific patterns for creating geometry (geometría) lessons. Read this AFTER the main SKILL.md and pedagogical-design.md.

---

## Geometry Lesson Characteristics

Geometry lessons focus on **spatial relationships, visual reasoning, and practical measurement**. Students need to SEE and MANIPULATE shapes to understand properties and formulas.

### Key Pedagogical Insight

> Geometry lessons thrive on **practical, real-world applications**. Unlike algebra (which needs metaphors) or numbers (which needs visual representation), geometry IS already visual. The key is connecting that visual to practical use cases students care about.

---

## Hook Patterns for Geometry

### The "Real Construction" Pattern

Geometry hooks should present **practical construction, design, or measurement problems**.

#### Pattern 1: The Home Improvement Hook
**Best for:** Area, perimeter, measurement

```
┌─────────────────────────────────────────────────┐
│ SCENARIO: Someone needs to build/paint/tile    │
│ ↓                                               │
│ PUZZLE: How much material is needed?            │
│ ↓                                               │
│ INSIGHT: We need to calculate area or perimeter │
│ ↓                                               │
│ BRIDGE: Formulas help us plan real projects     │
└─────────────────────────────────────────────────┘
```

**Exemplar:** `area-rectangulos-triangulos/Step1Hook.tsx` - "El Proyecto de Pintura"
- A neighbor needs to paint a wall with a window
- Visual: SVG of wall with rectangular window cutout
- Question: How much paint is needed?

**Why it works:**
- Everyone has seen painting/construction
- The need for measurement is obvious
- Visual is immediately understandable

#### Pattern 2: The Safety/Rescue Hook
**Best for:** Pythagorean theorem, distances, heights

```
┌─────────────────────────────────────────────────┐
│ SCENARIO: Emergency situation requiring distance│
│ ↓                                               │
│ PUZZLE: We can't measure directly               │
│ ↓                                               │
│ INSIGHT: We can calculate using what we know    │
│ ↓                                               │
│ BRIDGE: The theorem gives us indirect measurement│
└─────────────────────────────────────────────────┘
```

**Exemplar:** `teorema-pitagoras/Step1Hook.tsx` - "La Escalera del Bombero"
- A firefighter needs to reach a window 4m high
- The ladder can only be placed 3m from the wall
- Question: How long must the ladder be?

#### Pattern 3: The Design Challenge Hook
**Best for:** Composite shapes, transformations, symmetry

```
┌─────────────────────────────────────────────────┐
│ SCENARIO: Designing or modifying a space/object │
│ ↓                                               │
│ PUZZLE: Unusual shape requires strategy         │
│ ↓                                               │
│ INSIGHT: Break complex into simple or combine   │
│ ↓                                               │
│ BRIDGE: Decomposition/composition strategies    │
└─────────────────────────────────────────────────┘
```

**Exemplar:** `figuras-compuestas/Step1Hook.tsx` - "La Habitación en Forma de L"
- Calculate floor area for an L-shaped room
- Two possible strategies emerge
- Bridge: Decompose into rectangles OR subtract from larger rectangle

### Geometry Hook Visual Patterns

```typescript
// SVG wall with window (rectangular cutout)
<svg viewBox="0 0 200 150" className="w-full max-w-md">
  {/* Wall background */}
  <rect x="10" y="10" width="180" height="130"
        fill="#fbbf24" stroke="#92400e" strokeWidth="2"/>
  {/* Window cutout */}
  <rect x="70" y="40" width="60" height="50"
        fill="#93c5fd" stroke="#1e40af" strokeWidth="2"/>
  {/* Dimension labels */}
  <text x="100" y="155" textAnchor="middle" className="text-sm">4m</text>
  <text x="5" y="80" textAnchor="middle" className="text-sm"
        transform="rotate(-90, 5, 80)">3m</text>
</svg>

// L-shaped room
<svg viewBox="0 0 200 150" className="w-full max-w-md">
  <path d="M 20 20 L 180 20 L 180 100 L 100 100 L 100 140 L 20 140 Z"
        fill="#fef3c7" stroke="#92400e" strokeWidth="2"/>
  {/* Dimension annotations */}
</svg>
```

---

## Explore Patterns for Geometry

### The "Visual Discovery Through Manipulation" Pattern

Geometry explore steps should let students **manipulate shapes and discover relationships**.

#### Structure: Toggle/Reveal Discovery

```typescript
interface DiscoveryPhase {
  id: string;
  instruction: string;
  visualState: 'initial' | 'revealed' | 'compared';
  insight: string;
}

const DISCOVERY_PHASES: DiscoveryPhase[] = [
  {
    id: 'rectangle',
    instruction: 'Observa el rectángulo y cuenta los cuadros',
    visualState: 'initial',
    insight: 'El área es base × altura',
  },
  {
    id: 'triangle',
    instruction: 'Ahora observa el triángulo dentro del rectángulo',
    visualState: 'revealed',
    insight: '¿Qué fracción del rectángulo ocupa el triángulo?',
  },
  {
    id: 'comparison',
    instruction: 'Compara las áreas',
    visualState: 'compared',
    insight: 'El triángulo es exactamente la mitad del rectángulo',
  },
];
```

**Exemplar:** `area-rectangulos-triangulos/Step2Explore.tsx`
- Phase 1: Show rectangle on grid, count squares (5 × 4 = 20)
- Phase 2: Show triangle inside, toggle button reveals "ghost" rectangle outline
- Phase 3: Discovery - triangle is exactly half the rectangle
- Bridge: Triangle area = (base × altura) / 2

#### Grid-Based Visualization

```typescript
// Grid with shape overlay
<div className="relative">
  <svg viewBox="0 0 200 200" className="w-full">
    {/* Grid lines */}
    {Array.from({ length: 11 }).map((_, i) => (
      <g key={i}>
        <line x1={i * 20} y1="0" x2={i * 20} y2="200"
              stroke="#e5e7eb" strokeWidth="1"/>
        <line x1="0" y1={i * 20} x2="200" y2={i * 20}
              stroke="#e5e7eb" strokeWidth="1"/>
      </g>
    ))}

    {/* Shape - rectangle */}
    <rect x="20" y="20" width="100" height="80"
          fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2"/>

    {/* Optional: Triangle overlay */}
    {showTriangle && (
      <polygon points="20,100 120,100 70,20"
               fill="#bbf7d0" stroke="#16a34a" strokeWidth="2"/>
    )}
  </svg>

  {/* Toggle button */}
  <button
    onClick={() => setShowTriangle(!showTriangle)}
    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
  >
    {showTriangle ? 'Ocultar triángulo' : 'Mostrar triángulo'}
  </button>
</div>
```

### Two-Strategy Comparison Pattern

For composite shapes, show **two valid approaches side by side**:

```typescript
const STRATEGIES = [
  {
    id: 'addition',
    name: 'Sumar rectángulos',
    description: 'Dividir en partes y sumar las áreas',
    steps: ['Divide en 2 rectángulos', 'Calcula cada área', 'Suma los resultados'],
    visual: <AdditionStrategyVisual />,
  },
  {
    id: 'subtraction',
    name: 'Restar del rectángulo grande',
    description: 'Imagina el rectángulo completo y resta lo que falta',
    steps: ['Imagina rectángulo completo', 'Calcula área total', 'Resta la esquina'],
    visual: <SubtractionStrategyVisual />,
  },
];

// Students can toggle between strategies
<div className="grid md:grid-cols-2 gap-6">
  {STRATEGIES.map(strategy => (
    <div
      key={strategy.id}
      className={cn(
        'p-4 rounded-xl border-2 cursor-pointer transition-all',
        activeStrategy === strategy.id
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
          : 'border-gray-200 dark:border-gray-700'
      )}
      onClick={() => setActiveStrategy(strategy.id)}
    >
      <h3 className="font-bold text-lg mb-2">{strategy.name}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
        {strategy.description}
      </p>
      {strategy.visual}
    </div>
  ))}
</div>
```

**Exemplar:** `figuras-compuestas/Step2Explore.tsx`

---

## Explain Patterns for Geometry

### Embedded in Exploration Pattern

Geometry often **merges Explore and Explain** because the visual discovery IS the explanation.

#### When to Skip Separate Step3Explain

1. The formula derivation was shown visually in Step2
2. There aren't multiple parallel cases to compare
3. The relationship is visually obvious once revealed

#### When to Keep Step3Explain

1. Multiple formulas need to be referenced (area vs perimeter)
2. Different shape types have parallel formulas
3. Common errors need explicit addressing

### If Using Step3Explain: Summary Reference Pattern

```typescript
// For geometry, Explain is often a formula reference card
<div className="grid md:grid-cols-2 gap-6">
  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
    <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-4">
      Área del Rectángulo
    </h3>
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
      <p className="font-mono text-2xl">A = b × h</p>
    </div>
    <div className="mt-4 flex justify-center">
      {/* Mini visual */}
      <RectangleIcon />
    </div>
  </div>

  <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
    <h3 className="font-bold text-green-800 dark:text-green-200 mb-4">
      Área del Triángulo
    </h3>
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
      <p className="font-mono text-2xl">A = (b × h) / 2</p>
    </div>
    <div className="mt-4 flex justify-center">
      {/* Mini visual */}
      <TriangleIcon />
    </div>
  </div>
</div>
```

---

## Verify Questions for Geometry

### Question Type Mix

Geometry checkpoint questions should include:

1. **Direct Calculation** (2 questions)
   - "Calcula el área de un rectángulo de 5m × 3m"
   - Tests formula application

2. **Visual Recognition** (1 question)
   - Show a diagram, ask for the area
   - Tests ability to extract dimensions from visuals

3. **Strategy/Reasoning** (1 question)
   - "Para calcular el área de esta figura en L, ¿qué estrategia usarías?"
   - Tests understanding of decomposition strategies

### Question Patterns

```typescript
const QUESTIONS: CheckpointQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es el área de un rectángulo de base 6m y altura 4m?',
    options: ['10 m²', '20 m²', '24 m²', '48 m²'],
    correctAnswer: 2,
    explanation: 'Área = base × altura = 6 × 4 = 24 m²',
  },
  {
    id: 'q2',
    question: '¿Cuál es el área de un triángulo de base 8m y altura 6m?',
    options: ['14 m²', '24 m²', '48 m²', '96 m²'],
    correctAnswer: 1,
    explanation: 'Área = (base × altura) / 2 = (8 × 6) / 2 = 24 m²',
  },
  {
    id: 'q3',
    question: '[Con diagrama de L] ¿Cuál es el área de esta figura?',
    options: ['35 m²', '40 m²', '45 m²', '50 m²'],
    correctAnswer: 0,
    explanation: 'Usando la estrategia de suma: 5×5 + 2×5 = 25 + 10 = 35 m²',
    // Note: This question should include an SVG diagram in the question text
  },
  {
    id: 'q4',
    question: 'Si un triángulo tiene la misma base y altura que un rectángulo, ¿qué relación tienen sus áreas?',
    options: [
      'Son iguales',
      'El triángulo es la mitad',
      'El triángulo es el doble',
      'No tienen relación'
    ],
    correctAnswer: 1,
    explanation: 'El triángulo siempre es exactamente la mitad del rectángulo con misma base y altura.',
  },
];
```

### Questions with Embedded Diagrams

For geometry, you may need **custom Step6Verify** when questions require diagrams:

```typescript
// When CheckpointQuiz isn't sufficient, custom implementation is justified
export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  // Custom implementation with embedded SVG diagrams
  // Document WHY CheckpointQuiz doesn't work

  return (
    <div>
      <p className="text-lg mb-4">
        ¿Cuál es el área de esta figura?
      </p>
      {/* Embedded SVG diagram */}
      <svg viewBox="0 0 200 150">
        {/* L-shaped figure with dimensions */}
      </svg>
      {/* Multiple choice options */}
    </div>
  );
}
```

**Note:** Only use custom Step6Verify when absolutely necessary. Document the justification.

---

## Shared Components for Geometry

### Rarely Used Shared Components

Geometry lessons typically create **custom SVG visualizations** rather than using shared components.

```typescript
// Most geometry lessons DON'T import shared visual components
// Instead, they define custom SVG inline

// Example: Custom shape with grid
const ShapeWithGrid = ({ showGrid = true }) => (
  <svg viewBox="0 0 200 200" className="w-full max-w-md">
    {showGrid && (
      <g className="grid-lines">
        {/* Grid implementation */}
      </g>
    )}
    <g className="shape">
      {/* Shape implementation */}
    </g>
  </svg>
);
```

### Only Standard Component Used

```typescript
import { CheckpointQuiz } from '@/components/lessons/shared';
// For Step6Verify when possible
```

---

## Geometry SVG Patterns

### Standard Grid Pattern

```typescript
const GRID_SIZE = 20;
const GRID_COUNT = 10;

const GridBackground = () => (
  <g className="grid">
    {Array.from({ length: GRID_COUNT + 1 }).map((_, i) => (
      <g key={i}>
        <line
          x1={i * GRID_SIZE}
          y1="0"
          x2={i * GRID_SIZE}
          y2={GRID_COUNT * GRID_SIZE}
          stroke="#e5e7eb"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1={i * GRID_SIZE}
          x2={GRID_COUNT * GRID_SIZE}
          y2={i * GRID_SIZE}
          stroke="#e5e7eb"
          strokeWidth="1"
        />
      </g>
    ))}
  </g>
);
```

### Dimension Label Pattern

```typescript
const DimensionLabel = ({
  x1, y1, x2, y2,
  label,
  offset = 15
}: DimensionLabelProps) => {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const isVertical = x1 === x2;

  return (
    <g className="dimension-label">
      {/* Dimension line with arrows */}
      <line x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#6b7280" strokeWidth="1" strokeDasharray="4"/>
      {/* Label */}
      <text
        x={isVertical ? midX - offset : midX}
        y={isVertical ? midY : midY - offset}
        textAnchor="middle"
        className="text-sm fill-gray-600"
      >
        {label}
      </text>
    </g>
  );
};
```

### Shape Fill with Transparency

```typescript
// Use opacity for overlapping shapes
<rect fill="#3b82f6" fillOpacity="0.3" stroke="#1d4ed8" strokeWidth="2" />
<polygon fill="#22c55e" fillOpacity="0.3" stroke="#16a34a" strokeWidth="2" />

// Dark mode variants
<rect
  className="fill-blue-500/30 stroke-blue-600 dark:fill-blue-400/30 dark:stroke-blue-500"
  strokeWidth="2"
/>
```

---

## Geometry Color Palette

| Element | Light | Dark |
|---------|-------|------|
| Rectangle fill | `fill-blue-200` or `#bfdbfe` | `fill-blue-800/50` |
| Rectangle stroke | `stroke-blue-600` | `stroke-blue-400` |
| Triangle fill | `fill-green-200` or `#bbf7d0` | `fill-green-800/50` |
| Triangle stroke | `stroke-green-600` | `stroke-green-400` |
| Grid lines | `stroke-gray-200` | `stroke-gray-700` |
| Dimension text | `fill-gray-600` | `fill-gray-400` |
| Highlight/Selected | `fill-amber-200` | `fill-amber-800/50` |

---

## Exemplar Geometry Lessons

Study these for best practices:

| Lesson | Best For | Quality |
|--------|----------|---------|
| `area-rectangulos-triangulos` | Painting wall hook, Grid counting, Toggle reveal | ★★★★★ |
| `area-paralelogramos-trapecios` | Garden decoration, Shape transformation animation | ★★★★★ |
| `circulo-perimetro-area` | Ferris wheel, Circle unroll + pizza slice animation | ★★★★★ |
| `figuras-compuestas` | L-shaped flooring, Two-strategy comparison | ★★★★★ |
| `teorema-pitagoras` | Firefighter ladder, 15-phase visual proof | ★★★★☆ |

---

## Complete Hook Inventory

All geometry lessons use practical construction/design scenarios:

| Lesson | Scenario | Visual |
|--------|----------|--------|
| `area-rectangulos-triangulos` | Painting a wall with window | SVG wall with rectangular cutout |
| `area-paralelogramos-trapecios` | Decorating garden paths | Parallelogram/trapezoid shapes |
| `circulo-perimetro-area` | Decorating Ferris wheel | Circle with animated unroll |
| `figuras-compuestas` | Flooring L-shaped room | L-shape with dashed guides |
| `teorema-pitagoras` | Firefighter reaching window | Right triangle with ladder |

---

## Three-Phase Hook Pattern

All geometry hooks follow:

```typescript
type Phase = 'intro' | 'question' | 'result';

// intro: Sets up real-world scenario with SVG
// question: Student makes prediction with visual hints
// result: Reveals answer + calculation + introduces concept
```

---

## Circle Unrolling Animation

Unique pattern from `circulo-perimetro-area/Step2Explore.tsx`:

```typescript
// Uses Framer Motion to show:
// 1. Circle "rolls" along ground
// 2. Circumference "unwinds" as a straight line
// 3. Shows π segments that fit into the line
// 4. Interactive: adjustable slice count (6-36)

<motion.g animate={{ rotate: rollAngle }}>
  <circle cx="50" cy="50" r="40" />
</motion.g>
<motion.line
  x1="100"
  y1="100"
  x2={100 + circumference}
  y2="100"
  animate={{ pathLength: rollProgress }}
/>
```

---

## Pizza Slice Visualization

For area of circles, show convergence:

```typescript
// Dynamic slicing with adjustable count (6-36)
// Transforms between circular and rectangular arrangement
// Shows that as slices increase → approaches rectangle

const PizzaSlices = ({ sliceCount }: { sliceCount: number }) => {
  const slices = Array.from({ length: sliceCount });

  return (
    <div className="flex">
      {slices.map((_, i) => (
        <motion.div
          key={i}
          className="origin-bottom"
          style={{
            rotate: arrangement === 'circle' ? (i * 360) / sliceCount : 0,
            x: arrangement === 'rectangle' ? i * sliceWidth : 0,
          }}
        >
          <PieSlice angle={360 / sliceCount} />
        </motion.div>
      ))}
    </div>
  );
};
```

---

## Shape Transformation Animation

From `area-paralelogramos-trapecios/Step2Explore.tsx`:

```typescript
// Cuts triangle from parallelogram and slides it across
// Uses Framer Motion with 700ms ease timing

<motion.g
  animate={{
    x: showTransformation ? parallelogramWidth : 0,
    opacity: showTransformation ? 1 : 0.5,
  }}
  transition={{ duration: 0.7, ease: 'easeInOut' }}
>
  {/* Triangle that gets moved */}
</motion.g>
```

---

## Pythagorean Proof Visualization

From `teorema-pitagoras/Step3Proof.tsx` (708 lines):

```typescript
// 15-phase visual proof with ghost triangles and highlights
// Shows two equivalent square arrangements:
// Arrangement 1: c² in center
// Arrangement 2: a² + b² separated

const PROOF_PHASES = [
  'intro',
  'show-large-square',
  'divide-into-regions',
  'highlight-center-square',
  'label-c-squared',
  'show-triangles',
  'rearrange-preview',
  'rearrange-animated',
  // ... 7 more phases
];
```

**Note:** This is too large - should be split into subcomponents.

---

## Tilted Inset Square Pattern

For Pythagorean proof:

```typescript
// Creates rotated square inside outer square
const c2Vertices = [
  { x: 0, y: size - a },      // left
  { x: b, y: size },          // bottom
  { x: size, y: size - b },   // right
  { x: size - b, y: 0 },      // top
];

<polygon
  points={c2Vertices.map(v => `${v.x},${v.y}`).join(' ')}
  fill="#8b5cf6"
  fillOpacity={0.5}
/>
```

---

## Step Naming Variations

⚠️ **Inconsistency Warning:**

| Lesson | Step Structure |
|--------|----------------|
| `area-rectangulos-triangulos` | Step1Hook, Step2Explore, Step3Explain, Step4Practice, **Step5Verify** |
| `area-paralelogramos-trapecios` | Step1Hook, Step2Explore, Step3Explain, Step4Practice, **Step5Verify** |
| `circulo-perimetro-area` | Step1Hook, Step2Explore, Step3Explain, Step4Practice, **Step5Verify** |
| `figuras-compuestas` | Step1Hook, Step2Explore, Step3Explain, Step4Classify, Step5Practice, **Step6Verify** |
| `teorema-pitagoras` | Step1Hook, Step2Discover, **Step3Proof**, **Step4Explain**, Step5Practice, **Step6Verify** |

**Recommendation:** Standardize to 6-step model.

---

## Geometry-Specific Anti-Patterns

1. **No grid/scale reference** - Always show grid or dimensions for scale
2. **Static-only visuals** - Add toggles, reveals, or animations
3. **Formula before visual** - Show the shape relationship FIRST
4. **Ignoring real-world context** - Always frame as practical problem
5. **Too complex shapes initially** - Start simple, build to composite
6. **No strategy comparison** - For composite shapes, show multiple approaches
7. **Overcomplex Step3** - Don't exceed 400 lines; split larger components
8. **Missing ARIA labels** - Add `<title>` elements to all SVG graphics
9. **Magic numbers in SVG** - Use constants instead of hardcoded values
10. **Custom Step6Verify** - Use CheckpointQuiz unless LaTeX is needed

---

## Animation Best Practices

Geometry lessons heavily use Framer Motion for revealing concepts. Follow these guidelines:

### Import and Setup

```typescript
import { motion } from 'framer-motion';

// Standard timing constants
const STEP_DELAY = 1800;       // Delay between animation steps
const TRANSITION_DURATION = 0.7; // Duration for transforms
```

### Animation Patterns

#### Pattern 1: Step-Based Animation Playback

Use for multi-step reveals (unrolling, transformations):

```typescript
type AnimStep = 0 | 1 | 2 | 3;

const [step, setStep] = useState<AnimStep>(0);
const [isPlaying, setIsPlaying] = useState(false);

// Auto-advance with cleanup
useEffect(() => {
  if (!isPlaying) return;

  const timer = setInterval(() => {
    setStep(prev => {
      if (prev >= maxStep) {
        setIsPlaying(false);
        return maxStep as AnimStep;
      }
      return (prev + 1) as AnimStep;
    });
  }, STEP_DELAY);

  return () => clearInterval(timer);
}, [isPlaying]);
```

#### Pattern 2: Toggle Transformation

Use for showing before/after states:

```typescript
const [showTransformation, setShowTransformation] = useState(false);

<motion.g
  animate={{
    x: showTransformation ? targetX : 0,
    opacity: showTransformation ? 1 : 0.5,
  }}
  transition={{ duration: 0.7, ease: 'easeInOut' }}
>
  {/* Movable element */}
</motion.g>
```

#### Pattern 3: Interactive Slider Animation

Use for showing convergence (e.g., pizza slices → rectangle):

```typescript
const [numSlices, setNumSlices] = useState(8);

<input
  type="range"
  min="6"
  max="36"
  step="2"
  value={numSlices}
  onChange={(e) => setNumSlices(Number(e.target.value))}
  className="w-full accent-teal-500"
/>
```

### Timing Guidelines

| Animation Type | Duration | Ease |
|----------------|----------|------|
| Shape transform | 700ms | `easeInOut` |
| Reveal/fade | 300ms | `easeOut` |
| Step auto-advance | 1800ms delay | - |
| Number count-up | 500ms | `easeOut` |

### Controls UI

Always provide play/pause and reset controls:

```typescript
<div className="flex justify-center gap-3">
  <button
    onClick={() => setIsPlaying(!isPlaying)}
    className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg"
  >
    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
    <span>{isPlaying ? 'Pausar' : 'Ver animación'}</span>
  </button>

  <button
    onClick={() => { setStep(0); setIsPlaying(false); }}
    className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
  >
    <RotateCcw size={16} />
  </button>
</div>
```

### Performance Tips

1. **Avoid inline styles for animations** - Use motion.div with animate prop
2. **Use layout animations sparingly** - They can cause reflows
3. **Prefer transform over position** - `x`, `y`, `rotate`, `scale` are GPU-accelerated
4. **Clean up intervals/timers** - Return cleanup function from useEffect
5. **Use willChange for heavy animations** - Add `style={{ willChange: 'transform' }}`

### Dark Mode for Animations

Ensure animated elements have dark mode colors:

```typescript
<motion.circle
  className="fill-teal-500 dark:fill-teal-400"
  animate={{ r: [40, 45, 40] }}
  transition={{ repeat: Infinity, duration: 2 }}
/>
```

---

## 3D Rendering with Three.js

For complex 3D visualizations (e.g., cube decomposition, prism cross-sections), use React Three Fiber.

### When to Use 3D

- Demonstrating volume formulas through decomposition
- Showing how 2D cross-sections relate to 3D solids
- Interactive rotation to view from multiple angles
- Visualizing algebraic identities in 3D (e.g., (a+b)³)

### Setup

```typescript
'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, useState } from 'react';

// Separate scene component
function CubeScene({ exploded }: { exploded: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#3b82f6" />
    </mesh>
  );
}

// Main component
export default function Step2Explore3D({ onComplete, isActive }) {
  const [exploded, setExploded] = useState(false);

  if (!isActive) return null;

  return (
    <div className="h-[400px] w-full">
      <Canvas camera={{ position: [3, 3, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <CubeScene exploded={exploded} />
        <OrbitControls enableZoom={false} />
      </Canvas>

      <button onClick={() => setExploded(!exploded)}>
        {exploded ? 'Reunir' : 'Descomponer'}
      </button>
    </div>
  );
}
```

### Example: Productos Notables Cubos

The lesson `productos-notables-cubos` uses 3D to visualize (a+b)³ decomposition:

**File:** `components/lessons/m1/productos-notables-cubos/CubeScene3D.tsx`

**Key patterns:**
- Separate `CubeScene3D` component for 3D scene
- `useFrame` for continuous rotation
- `lerp` for smooth explosion animation
- `OrbitControls` for interactive viewing
- Hover states with `onPointerOver`/`onPointerOut`

### Performance Considerations

1. **Separate 3D into its own component file**
2. **Use `Canvas` only when visible** - Don't render when step is inactive
3. **Limit polygon count** - Use simple geometries (box, sphere)
4. **Disable zoom if not needed** - Reduces confusion
5. **Add fallback for older devices** - Canvas can be heavy on mobile

---

## Circular Geometry Patterns (Sectors, Arcs, Angles)

Circular geometry requires precise coordinate math and consistent visual conventions.

### Coordinate Convention

**CRITICAL:** All circular geometry uses this convention:
- **0° = 12 o'clock** (top of circle)
- **Angles increase clockwise** (90° = 3 o'clock)
- **Center is typically (cx, cy)**

This matches mathematical convention where we subtract 90° from the angle to convert from "standard position" (0° = right) to "clock position" (0° = top).

### Standard Helper Functions

**ALWAYS** use these exact helper functions for circular geometry. Copy them verbatim:

```typescript
/**
 * Creates a filled sector (pie slice) path
 * @param cx - Center X coordinate
 * @param cy - Center Y coordinate
 * @param r - Radius
 * @param startAngle - Start angle in degrees (0° = 12 o'clock, clockwise)
 * @param endAngle - End angle in degrees
 */
function sectorPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  const startRad = (startAngle - 90) * (Math.PI / 180);
  const endRad = (endAngle - 90) * (Math.PI / 180);

  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);

  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
}

/**
 * Creates an arc (curved line) path - no fill, just the curve
 * @param cx - Center X coordinate
 * @param cy - Center Y coordinate
 * @param r - Radius
 * @param startAngle - Start angle in degrees (0° = 12 o'clock, clockwise)
 * @param endAngle - End angle in degrees
 */
function arcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  const startRad = (startAngle - 90) * (Math.PI / 180);
  const endRad = (endAngle - 90) * (Math.PI / 180);

  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);

  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
}

/**
 * Calculate a point on a circle at a given angle
 * @param cx - Center X coordinate
 * @param cy - Center Y coordinate
 * @param r - Radius
 * @param angle - Angle in degrees (0° = 12 o'clock, clockwise)
 */
function pointOnCircle(cx: number, cy: number, r: number, angle: number): { x: number; y: number } {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}
```

### Visual Alignment Best Practices

**Problem:** Thick strokes with rounded caps can appear misaligned with thin radius lines.

**Solution:** Use these techniques for precise visual alignment:

```typescript
// 1. Use strokeLinecap="butt" for arcs (not "round")
<path
  d={arcPath(cx, cy, r, 0, 90)}
  stroke="#7c3aed"
  strokeWidth="4"
  strokeLinecap="butt"  // Precise endpoints
/>

// 2. Add endpoint markers to show exact connection points
<circle cx={pointOnCircle(cx, cy, r, 0).x} cy={pointOnCircle(cx, cy, r, 0).y} r="3" fill="#7c3aed" />
<circle cx={pointOnCircle(cx, cy, r, 90).x} cy={pointOnCircle(cx, cy, r, 90).y} r="3" fill="#7c3aed" />

// 3. Draw radius lines AFTER arcs so they appear on top
<line x1={cx} y1={cy} x2={cx} y2={cy - r} stroke="#dc2626" strokeWidth="2" />
```

### Complete Circular Diagram Template

```typescript
const cx = 70, cy = 70, r = 55;
const angle = 90; // 90° sector

<svg viewBox="0 0 140 140" className="w-36 h-36">
  {/* 1. Background circle (optional) */}
  <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth="2" />

  {/* 2. Highlighted arc */}
  <path
    d={arcPath(cx, cy, r, 0, angle)}
    fill="none"
    stroke="#7c3aed"
    strokeWidth="4"
    strokeLinecap="butt"
  />

  {/* 3. Radius lines (from center to circle edge) */}
  <line x1={cx} y1={cy} x2={cx} y2={cy - r} stroke="#dc2626" strokeWidth="2" strokeDasharray="4,2" />
  <line
    x1={cx}
    y1={cy}
    x2={cx + r * Math.cos((angle - 90) * Math.PI / 180)}
    y2={cy + r * Math.sin((angle - 90) * Math.PI / 180)}
    stroke="#dc2626"
    strokeWidth="2"
    strokeDasharray="4,2"
  />

  {/* 4. Endpoint markers */}
  <circle cx={cx} cy={cy - r} r="3" fill="#7c3aed" />
  <circle
    cx={cx + r * Math.cos((angle - 90) * Math.PI / 180)}
    cy={cy + r * Math.sin((angle - 90) * Math.PI / 180)}
    r="3"
    fill="#7c3aed"
  />

  {/* 5. Center point */}
  <circle cx={cx} cy={cy} r="3" fill="#7c3aed" />

  {/* 6. Angle arc indicator (small arc near center) */}
  <path d={arcPath(cx, cy, 18, 0, angle)} fill="none" stroke="#f59e0b" strokeWidth="2" />

  {/* 7. Labels - positioned using pointOnCircle */}
  <text
    x={cx + 28 * Math.cos(((angle / 2) - 90) * Math.PI / 180)}
    y={cy + 28 * Math.sin(((angle / 2) - 90) * Math.PI / 180)}
    textAnchor="middle"
    fontSize="11"
    fontWeight="bold"
    fill="#f59e0b"
  >
    θ
  </text>
  <text x={cx + 12} y={cy - r/2} fontSize="12" fontWeight="bold" fill="#dc2626">r</text>
</svg>
```

### Label Positioning for Circular Diagrams

**θ (angle) label:** Position at the middle of the angle, near the angle arc indicator:

```typescript
// Position θ at half the angle, slightly outside the angle arc
const thetaAngle = startAngle + (endAngle - startAngle) / 2;
const thetaRadius = angleArcRadius + 10; // Slightly outside the small arc
<text
  x={cx + thetaRadius * Math.cos((thetaAngle - 90) * Math.PI / 180)}
  y={cy + thetaRadius * Math.sin((thetaAngle - 90) * Math.PI / 180)}
  textAnchor="middle"
>θ</text>
```

**r (radius) label:** Position along the first radius line:

```typescript
// Position r at midpoint of first radius, offset slightly
<text x={cx + 10} y={cy - r/2} textAnchor="start">r</text>
```

**L (arc length) label:** Position near the arc, outside the circle:

```typescript
// Position L near the middle of the arc, outside
const arcMidAngle = startAngle + (endAngle - startAngle) / 2;
const labelRadius = r + 10; // Outside the circle
<text
  x={cx + labelRadius * Math.cos((arcMidAngle - 90) * Math.PI / 180)}
  y={cy + labelRadius * Math.sin((arcMidAngle - 90) * Math.PI / 180)}
>L</text>
```

### Common Angle Reference

| Angle | Position | Math Radians |
|-------|----------|--------------|
| 0° | 12 o'clock (top) | -π/2 |
| 30° | 1 o'clock | -π/3 |
| 45° | 1:30 position | -π/4 |
| 60° | 2 o'clock | -π/6 |
| 90° | 3 o'clock (right) | 0 |
| 180° | 6 o'clock (bottom) | π/2 |
| 270° | 9 o'clock (left) | π |
| 360° | 12 o'clock (full circle) | 3π/2 |

### Circular Geometry Color Palette

| Element | Color (Hex) | Tailwind |
|---------|-------------|----------|
| Arc highlight | `#7c3aed` | purple-600 |
| Radius lines | `#dc2626` | red-600 |
| Angle indicator | `#f59e0b` | amber-500 |
| Sector fill | `#5eead4` | teal-300 |
| Center point | `#0d9488` | teal-600 |
| Circle outline | `#e5e7eb` | gray-200 |

### Anti-Patterns for Circular Geometry

1. **Using `strokeLinecap="round"`** on arcs - causes visual misalignment at endpoints
2. **Forgetting the -90° offset** - angles will be rotated 90° from expected position
3. **Hardcoding endpoints** instead of using `pointOnCircle()` - prone to errors
4. **Missing angle arc indicator** - makes it unclear what angle is being measured
5. **Labels outside viewBox** - always verify labels are visible
6. **Different radii for arc and radius lines** - they won't connect properly

### Exemplar Circular Lessons

| Lesson | Key Patterns |
|--------|--------------|
| `circulo-perimetro-area` | Circle unrolling animation, pizza slice convergence |
| `sectores-circulares` | Sector/arc formulas, angle slider interaction |

---

## Missing Patterns to Consider

1. **Interactive Measurement Tool** - Drag dimensions and see formulas update
2. **Reverse Problem Solving** - Given area, find missing dimension
3. **Unit Conversion** - Handle mixed units (meters + centimeters)
4. **3D Volume Formulas** - Extend 2D area concepts to volume
5. **Historical Context** - Pythagoras discovery, ancient measurement
6. **Non-Standard Orientations** - Upside-down triangles, tilted bases
7. **Accessibility** - Text descriptions for animated sequences
