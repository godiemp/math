# Difficulty Scoring Guide

## Difficulty Levels and Score Ranges

| Level | Score Range | Description |
|-------|-------------|-------------|
| easy | 0.15-0.35 | Single-step, direct application |
| medium | 0.36-0.55 | 2-3 steps, moderate complexity |
| hard | 0.56-0.75 | Multi-step, requires synthesis |
| extreme | 0.76-1.0 | Complex, multiple concepts combined |

---

## Scoring Formula

Start with a base score and add modifiers:

```
Base Score (by steps):
- 1 step: 0.18
- 2 steps: 0.30
- 3 steps: 0.45
- 4+ steps: 0.55

Add Modifiers:
+0.05 for each complexity factor
+0.10 for each advanced factor
```

---

## Complexity Factors (+0.05 each)

### Cognitive Load
- [ ] Requires formula recall
- [ ] Involves negative numbers
- [ ] Involves fractions/decimals
- [ ] Requires unit conversion
- [ ] Multi-sentence word problem
- [ ] Contains extraneous information

### Presentation
- [ ] Requires graph/diagram interpretation
- [ ] Information spread across visual and text
- [ ] Multiple variables to track

---

## Advanced Factors (+0.10 each)

### Mathematical Depth
- [ ] Combines 2+ concepts
- [ ] Requires algebraic manipulation
- [ ] Requires proof/reasoning
- [ ] Non-standard problem type

### Abstraction
- [ ] Abstract context (not concrete)
- [ ] Multiple solution paths possible
- [ ] Requires optimization thinking

---

## Examples by Level

### Easy (0.15-0.35)

**Single operation, direct calculation:**
```typescript
{
  operacionBase: '3x + 5x - 2x',
  questionLatex: '\\text{...combine like terms...}',
  difficulty: 'easy',
  difficultyScore: 0.18,  // 1 step, no modifiers
}
```

**Two operations, straightforward:**
```typescript
{
  operacionBase: '(2x^3)^2',
  questionLatex: '\\text{...power of a power...}',
  difficulty: 'easy',
  difficultyScore: 0.30,  // 2 steps (distribute, multiply)
}
```

### Medium (0.36-0.55)

**Formula application with substitution:**
```typescript
{
  operacionBase: 'x^2 - 2xy + y^2',
  questionLatex: '\\text{...evaluate for x=5, y=3...}',
  difficulty: 'medium',
  difficultyScore: 0.45,  // 3 steps + formula recall
  // Base 0.35 + 0.05 (formula) + 0.05 (substitution)
}
```

**Word problem with equation setup:**
```typescript
{
  operacionBase: '2(x + 3) - 3(x - 1)',
  questionLatex: '\\text{...restaurant profits...}',
  difficulty: 'medium',
  difficultyScore: 0.48,  // Distributive property + word problem
}
```

### Hard (0.56-0.75)

**Nested operations with sign handling:**
```typescript
{
  operacionBase: '5x - [2x - (3x - 4)]',
  questionLatex: '\\text{...nested brackets...}',
  difficulty: 'hard',
  difficultyScore: 0.62,  // Multiple steps + sign changes
}
```

**Concept synthesis:**
```typescript
{
  operacionBase: 'Probability + Percentages',
  questionLatex: '\\text{...conditional probability...}',
  difficulty: 'hard',
  difficultyScore: 0.68,  // Combines two concepts
}
```

### Extreme (0.76-1.0)

**Advanced reasoning:**
```typescript
{
  operacionBase: 'Quadratic discriminant analysis',
  questionLatex: '\\text{...nature of roots...}',
  difficulty: 'extreme',
  difficultyScore: 0.82,  // Abstract + multiple concepts
}
```

**Competition-level:**
```typescript
{
  operacionBase: 'Optimization with constraints',
  questionLatex: '\\text{...maximize area given perimeter...}',
  difficulty: 'extreme',
  difficultyScore: 0.92,  // Multiple steps + reasoning + abstraction
}
```

---

## Quick Reference Table

| Question Type | Level | Score Range |
|---------------|-------|-------------|
| Single operation | easy | 0.18-0.25 |
| Two operations | easy | 0.25-0.35 |
| Word problem + formula | medium | 0.38-0.48 |
| Multi-step algebra | medium | 0.45-0.55 |
| Complex word problem | hard | 0.58-0.68 |
| Proof/reasoning | hard | 0.65-0.75 |
| Advanced synthesis | extreme | 0.78-0.90 |
| Competition-level | extreme | 0.90-1.0 |

---

## Subject-Specific Guidelines

### Algebra
- Like terms only: 0.18-0.25
- Power rules: 0.25-0.35
- Distributive property: 0.35-0.48
- Factoring: 0.45-0.65
- Systems of equations: 0.55-0.75

### Numeros
- Basic operations: 0.15-0.25
- Fractions: 0.25-0.45
- Percentages: 0.30-0.50
- Ratios/proportions: 0.35-0.55
- Combined operations: 0.50-0.70

### Geometria
- Direct formula application: 0.20-0.35
- Pythagorean theorem: 0.28-0.45
- Area/perimeter combinations: 0.40-0.55
- Coordinate geometry: 0.45-0.65
- Proofs: 0.60-0.80

### Probabilidad
- Basic probability: 0.20-0.35
- Frequency tables: 0.25-0.40
- Mean/median/mode: 0.30-0.45
- Combined statistics: 0.45-0.60
- Conditional probability: 0.55-0.75

---

## Validation Checklist

Before finalizing difficulty:

1. [ ] Count the steps required to solve
2. [ ] Identify complexity factors present
3. [ ] Check score is in correct range for level
4. [ ] Compare with similar existing questions
5. [ ] Ensure score reflects actual cognitive load
