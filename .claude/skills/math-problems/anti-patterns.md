# Anti-Patterns: What NOT to Do

## Anti-Pattern 1: Explicit Math in Narrative

The narrative should describe a real-world situation, NOT show the math operation.

### WRONG
```typescript
questionLatex: '\\text{Calcula el resultado de } 3x + 5x - 2x'
```

### CORRECT
```typescript
questionLatex: '\\text{Andres esta organizando la biblioteca de su colegio y debe contar libros que vienen en cajas. Cada caja contiene la misma cantidad de libros, representada por x. En el primer estante encuentra 3 cajas de libros, en el segundo estante hay 5 cajas de libros, pero debe retirar 2 cajas porque los libros estan danados. El director le pide calcular una expresion que represente el total de cajas de libros utiles que quedan. Cual es la expresion simplificada?}'
```

**Why it matters:** PAES questions contextualize math in real situations. Students must translate the context into math, not just compute.

---

## Anti-Pattern 2: Missing or Invalid Skills

Every question must reference valid skills from `lib/skillTaxonomy.ts`.

### WRONG
```typescript
skills: []  // No skills!
// OR
skills: ['algebra-stuff', 'math-things']  // Don't exist!
```

### CORRECT
```typescript
skills: ['algebra-expresiones', 'algebra-terminos-semejantes', 'numeros-operaciones-basicas']
```

**Verification:** Search for each skill ID in `lib/skillTaxonomy.ts` to confirm it exists.

---

## Anti-Pattern 3: Inconsistent Difficulty Scores

The `difficultyScore` must match the `difficulty` level.

### WRONG
```typescript
difficulty: 'easy',
difficultyScore: 0.75  // Score doesn't match level!
```

### CORRECT
```typescript
// Ranges:
// easy: 0.15-0.35
// medium: 0.36-0.55
// hard: 0.56-0.75
// extreme: 0.76-1.0

difficulty: 'easy',
difficultyScore: 0.28
```

---

## Anti-Pattern 4: Duplicate IDs

Question IDs must be unique across ALL question files.

### WRONG
```typescript
// In m1-alg-001.ts
{ id: 'm1-13', ... }

// In m1-geo-001.ts
{ id: 'm1-13', ... }  // Same ID - COLLISION!
```

### CORRECT
```typescript
// Use unique IDs that indicate file context
{ id: 'm1-alg-001-001', ... }
{ id: 'm1-geo-001-001', ... }

// Or use sequential unique IDs
{ id: 'm1-13', ... }   // in alg
{ id: 'm1-150', ... }  // in geo (different number)
```

---

## Anti-Pattern 5: Unequal Option Formats

All 4 options should have consistent formatting.

### WRONG
```typescript
options: [
  '3x',
  'La respuesta es 10x',  // Different format!
  '8x',
  '5x'
]
```

### CORRECT
```typescript
options: ['3x', '10x', '8x', '5x']
// OR all with units
options: ['3 metros', '10 metros', '8 metros', '5 metros']
// OR all with text
options: [
  '\\text{3 metros}',
  '\\text{10 metros}',
  '\\text{8 metros}',
  '\\text{5 metros}'
]
```

---

## Anti-Pattern 6: Missing operacionBase for Algebra

Algebra questions REQUIRE the `operacionBase` field.

### WRONG
```typescript
{
  id: 'm1-123',
  subject: 'algebra',
  questionLatex: '...',
  // operacionBase is missing!
}
```

### CORRECT
```typescript
{
  id: 'm1-123',
  subject: 'algebra',
  questionLatex: '...',
  operacionBase: '(3x^2)(4x^3)'  // Required!
}
```

---

## Anti-Pattern 7: Unrealistic Contexts

Contexts should be believable and mathematically sensible.

### WRONG
```typescript
// Unrealistic quantities
questionLatex: '\\text{Maria tiene 50000 manzanas en su bolso...}'

// Impossible scenarios
questionLatex: '\\text{Un triangulo tiene angulos de 90, 100 y 80 grados...}'
```

### CORRECT
```typescript
// Realistic quantities
questionLatex: '\\text{Maria compra 3 bolsas de manzanas con x manzanas cada una...}'

// Mathematically valid
questionLatex: '\\text{Un triangulo rectangulo tiene catetos de 3 y 4 metros...}'
```

---

## Anti-Pattern 8: Abstract Variables Without Context

Variables must be explained within the narrative.

### WRONG
```typescript
questionLatex: '\\text{Si x representa algo, calcula 2x + 3...}'
```

### CORRECT
```typescript
questionLatex: '\\text{Una tienda vende camisetas a x pesos cada una. Si Juan compra 2 camisetas y paga 3 pesos adicionales por envio, cual es la expresion que representa el costo total?}'
```

---

## Anti-Pattern 9: Lazy Explanations

Explanations should show the actual solution process.

### WRONG
```typescript
explanation: 'La respuesta es A'
// OR
explanation: 'Usando la formula correcta'
```

### CORRECT
```typescript
explanation: '3x + 5x - 2x = (3 + 5 - 2)x = 6x'
// OR for geometry
explanation: 'c^2 = a^2 + b^2 = 6^2 + 8^2 = 36 + 64 = 100 \\Rightarrow c = 10 \\text{ m}'
```

---

## Anti-Pattern 10: Wrong visualData Structure

Each visualization type has a specific data structure.

### WRONG (Bar Chart)
```typescript
visualData: {
  type: 'graph',
  data: [
    { name: 'A', count: 10 }  // Wrong field names!
  ]
}
```

### CORRECT (Bar Chart)
```typescript
visualData: {
  type: 'graph',
  data: {
    chartType: 'bar',  // Must specify chartType!
    items: [
      { category: 'A', value: 10 }  // Correct field names
    ]
  }
}
```

---

## Detection Checklist

Before completing any question batch:

1. **Search for math in \text{}**: Look for operators (+, -, *, /) inside `\text{...}`
2. **Verify difficultyScore**: Check score is in correct range for difficulty level
3. **Validate skills**: Search each skill in `lib/skillTaxonomy.ts`
4. **Check ID uniqueness**: Search for the ID across all question files
5. **Compare options**: Ensure all 4 options have same format
6. **Check operacionBase**: Algebra questions must have this field
7. **Review contexts**: Are quantities and scenarios realistic?
8. **Verify explanations**: Do they show actual math steps?
