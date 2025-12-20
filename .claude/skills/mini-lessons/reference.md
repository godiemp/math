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

## Complete Lesson Inventory (47 Lessons)

### Algebra Lessons (18)
| Slug | Title | Pattern | Notes |
|------|-------|---------|-------|
| `terminos-semejantes` | Términos Semejantes | Tab-based | ⭐ Best hook |
| `factor-comun` | Factor Común | Tab-based | ⭐ Canonical example |
| `productos-notables-cuadrados` | Productos Notables (Cuadrados) | Tab-based | |
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

| Component | Use For | Props |
|-----------|---------|-------|
| `LessonShell` | Lesson page wrapper | `lesson`, `onComplete`, `onExit` |
| `CheckpointQuiz` | Step 6 verify (ALWAYS use) | `questions`, `requiredCorrect`, `successMessage`, `onComplete`, `isActive` |
| `Celebration` | Success animations | (used internally by CheckpointQuiz) |
| `NumberLine` | Visualizing number concepts | `min`, `max`, `value`, `showLabels` |
| `BarChart` | Data visualization | `data`, `labels`, `colors` |
| `PieChart` | Probability/statistics | `data`, `labels`, `colors` |
| `FrequencyTable` | Statistics lessons | `data`, `headers` |
| `FactorGrid` | Factorization concepts | `number`, `factors` |
| `VennDiagram` | Set theory, probability | `sets`, `labels`, `intersection` |

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
