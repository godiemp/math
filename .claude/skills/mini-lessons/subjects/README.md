# Subject-Specific Lesson Patterns

This directory contains detailed guidance for creating mini-lessons based on the mathematical subject area. Each subject has distinct pedagogical patterns that make lessons more effective.

---

## Quick Subject Selection Guide

```
┌────────────────────────────────────────────────────────────────┐
│                    IDENTIFY YOUR SUBJECT                        │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Does the lesson involve...                                     │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Variables, equations, expressions, factoring?            │   │
│  │ → ÁLGEBRA: ./algebra-patterns.md                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Fractions, percentages, decimals, operations, primes?    │   │
│  │ → NÚMEROS: ./numbers-patterns.md                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Shapes, areas, perimeters, theorems, measurement?        │   │
│  │ → GEOMETRÍA: ./geometry-patterns.md                     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Probability, statistics, counting, data, graphs?         │   │
│  │ → PROBABILIDAD: ./probability-patterns.md               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

## Subject Comparison Matrix

| Aspect | Álgebra | Números | Geometría | Probabilidad |
|--------|---------|---------|-----------|--------------|
| **Hook Style** | Strong metaphor (fruit = variables) | Direct visual (pizza slices) | Practical problem (paint a wall) | Game/fairness (is this fair?) |
| **Hook Complexity** | High - needs conceptual bridge | Low - visual is enough | Medium - real but familiar | Medium - rules need explaining |
| **Explore Type** | Classify/sort game | Repeated practice | Visual discovery | Enumerate outcomes |
| **Explain Format** | Multi-tab reference | Sequential phases | Often merged with Explore | Formula + visual confirmation |
| **Key Visuals** | Term breakdown, color-coded parts | Bars, pies, grids | SVG shapes on grids | Dice, pie charts, trees |
| **Shared Components** | FactorGrid (sometimes) | NumberLine, PieChart, BarChart | Custom SVG (mostly) | PieChart, VennDiagram |

---

## When Subjects Overlap

Some lessons span multiple subjects. Use the **primary concept** to choose:

| Lesson Topic | Could Be... | Primary Subject | Why |
|--------------|-------------|-----------------|-----|
| Porcentajes con álgebra | Números or Álgebra | **Números** | Focus is on the concept of percentage |
| Área de figuras con ecuaciones | Geometría or Álgebra | **Geometría** | Focus is on spatial understanding |
| Probabilidad con fracciones | Probabilidad or Números | **Probabilidad** | Focus is on likelihood/outcomes |
| Funciones y gráficos | Álgebra or Probabilidad | **Álgebra** | Focus is on algebraic relationships |

---

## Files in This Directory

| File | Subject | When to Read |
|------|---------|--------------|
| `algebra-patterns.md` | Álgebra | Variables, equations, factoring, simplification |
| `numbers-patterns.md` | Números | Fractions, decimals, percentages, operations |
| `geometry-patterns.md` | Geometría | Shapes, areas, theorems, measurement |
| `probability-patterns.md` | Probabilidad | Probability, statistics, counting, data |

---

## Reading Order

1. **Always start with:** `../SKILL.md` (main skill file)
2. **Then read:** `../pedagogical-design.md` (Phase 1 thinking)
3. **Then read:** Subject-specific file from this directory
4. **Finally:** `../step-templates.md` and `../anti-patterns.md`

---

## Key Differences Summary

### Hooks

```
ÁLGEBRA:    Needs metaphor to make abstract concrete
            "La Frutería" → variables are like fruit types

NÚMEROS:    Direct visualization works
            "Compartir Pizza" → fractions ARE slices

GEOMETRÍA:  Real construction/design problems
            "Pintar la Pared" → area has practical purpose

PROBABILIDAD: Games and fairness questions
              "¿Es justo este juego?" → curiosity about odds
```

### Explore Steps

```
ÁLGEBRA:    Classification games, drag-and-sort
            Break down terms → categorize → apply

NÚMEROS:    Repeated practice with visual feedback
            See fraction bar → calculate → verify visually

GEOMETRÍA:  Toggle/reveal discovery
            Show rectangle → reveal triangle inside → discover relationship

PROBABILIDAD: Visual enumeration
              Show all outcomes → count favorable → calculate ratio
```

### Explain Steps

```
ÁLGEBRA:    Multi-tab reference (non-linear)
            Students jump between formula types

NÚMEROS:    Sequential phases (linear)
            Rule 1 → Rule 2 → Summary

GEOMETRÍA:  Often merged with Explore
            Discovery IS the explanation

PROBABILIDAD: Formula + visual example
              Show formula → apply to concrete example
```

---

## Common Mistakes by Subject

### Álgebra Mistakes
- Variables in the hook (too abstract too soon)
- Skipping the "why" before the "how"
- Not addressing edge cases (x = 1x, constants)

### Números Mistakes
- Formula before visual
- No visual verification of calculations
- Forgetting to remind about simplification

### Geometría Mistakes
- No grid/scale for reference
- Static-only visuals (need toggles/reveals)
- Not showing multiple decomposition strategies

### Probabilidad Mistakes
- Formula before enumeration
- Abstract sample spaces (make them visible!)
- Skipping the fairness hook
