# Algebra Question Templates

## Subject Configuration
```typescript
subject: 'algebra',
topic: 'Algebra y Funciones',
```

## Required Fields
- `operacionBase` is **REQUIRED** for all algebra questions

---

## Template 1: Combining Like Terms

**Difficulty:** easy (0.18-0.28)

```typescript
{
  id: 'm1-alg-XXX-001',
  level: 'M1',
  topic: 'Algebra y Funciones',
  subject: 'algebra',
  operacionBase: '3x + 5x - 2x',
  questionLatex: '\\text{[PERSON] esta organizando [CONTEXT] y debe contar [ITEMS] que vienen en [CONTAINERS]. Cada [CONTAINER] contiene la misma cantidad de [ITEMS], representada por x. En [LOCATION1] encuentra [N1] [CONTAINERS], en [LOCATION2] hay [N2] [CONTAINERS], pero debe retirar [N3] [CONTAINERS] porque [REASON]. [PERSON] necesita calcular una expresion que represente el total de [CONTAINERS] utiles. Cual es la expresion simplificada?}',
  options: ['[N1+N2-N3]x', '[N1+N2]x', '[N1-N2+N3]x', '[N1]x'],
  correctAnswer: 0,
  explanation: '[N1]x + [N2]x - [N3]x = ([N1] + [N2] - [N3])x = [RESULT]x',
  difficulty: 'easy',
  difficultyScore: 0.18,
  skills: ['algebra-expresiones', 'algebra-terminos-semejantes', 'numeros-enteros-sumar-restar']
}
```

**Contexts:**
- Library organizing books in boxes
- Store counting inventory in crates
- Warehouse managing supplies in pallets

---

## Template 2: Power Multiplication

**Difficulty:** easy-medium (0.25-0.42)

```typescript
{
  id: 'm1-alg-XXX-002',
  level: 'M1',
  topic: 'Algebra y Funciones',
  subject: 'algebra',
  operacionBase: '(ax^m)(bx^n)',
  questionLatex: '\\text{[CONTEXT_INTRO]. El primer [ELEMENT] tiene [DESCRIPTION] representada por } [a]x^{[m]} \\text{ [UNITS]. El segundo [ELEMENT] tiene [DESCRIPTION] } [b]x^{[n]} \\text{ [UNITS]. Para [GOAL], debe multiplicar estas expresiones. Cual es el resultado?}',
  options: ['[a*b]x^{[m+n]}', '[a+b]x^{[m*n]}', '[a*b]x^{[m*n]}', '[a+b]x^{[m+n]}'],
  correctAnswer: 0,
  explanation: '([a]x^{[m]})([b]x^{[n]}) = [a] \\times [b] \\times x^{[m]+[n]} = [a*b]x^{[m+n]}',
  difficulty: 'easy',
  difficultyScore: 0.28,
  skills: ['algebra-expresiones', 'numeros-potencias-propiedades']
}
```

**Contexts:**
- Digital storage (file sizes, servers)
- Chemical concentrations
- Population growth models

---

## Template 3: Distributive Property

**Difficulty:** medium (0.42-0.52)

```typescript
{
  id: 'm1-alg-XXX-003',
  level: 'M1',
  topic: 'Algebra y Funciones',
  subject: 'algebra',
  operacionBase: 'a(x + b) - c(x - d)',
  questionLatex: '\\text{[CONTEXT] calcula [OUTCOME] usando la expresion } [a](x + [b]) - [c](x - [d]), \\text{ donde x representa [VARIABLE_MEANING]. El primer termino representa [MEANING1], y el segundo termino representa [MEANING2]. Necesita simplificar esta expresion para [PURPOSE]. Cual es la expresion simplificada?}',
  options: ['[a-c]x + [a*b+c*d]', '[a+c]x + [a*b-c*d]', '[a-c]x - [a*b+c*d]', '[a*c]x + [b*d]'],
  correctAnswer: 0,
  explanation: '[a](x + [b]) - [c](x - [d]) = [a]x + [a*b] - [c]x + [c*d] = ([a]-[c])x + ([a*b]+[c*d])',
  difficulty: 'medium',
  difficultyScore: 0.48,
  skills: ['algebra-expresiones', 'algebra-propiedad-distributiva', 'algebra-terminos-semejantes']
}
```

**Contexts:**
- Restaurant profits/costs
- Business revenue calculations
- Budget planning

---

## Template 4: Evaluating Expressions

**Difficulty:** medium (0.40-0.52)

```typescript
{
  id: 'm1-alg-XXX-004',
  level: 'M1',
  topic: 'Algebra y Funciones',
  subject: 'algebra',
  operacionBase: 'x^2 - 2xy + y^2',
  questionLatex: '\\text{[CONTEXT] tiene [DESCRIPTION] que se relaciona con la expresion } x^2 - 2xy + y^2. \\text{ [PERSON] necesita evaluar esta expresion para calcular [GOAL] cuando } x = [X_VAL] \\text{ y } y = [Y_VAL]\\text{. Cual es el resultado?}',
  options: ['[CORRECT]', '[DISTRACTOR1]', '[DISTRACTOR2]', '[DISTRACTOR3]'],
  correctAnswer: 0,
  explanation: 'x^2 - 2xy + y^2 = [X_VAL]^2 - 2([X_VAL])([Y_VAL]) + [Y_VAL]^2 = [X^2] - [2XY] + [Y^2] = [RESULT]',
  difficulty: 'medium',
  difficultyScore: 0.45,
  skills: ['algebra-expresiones', 'algebra-evaluacion-funciones', 'numeros-potencias']
}
```

---

## Template 5: Linear Equations

**Difficulty:** medium (0.45-0.55)

```typescript
{
  id: 'm1-alg-XXX-005',
  level: 'M1',
  topic: 'Algebra y Funciones',
  subject: 'algebra',
  operacionBase: '3x + 7 = 22',
  questionLatex: '\\text{[CONTEXT_STORY]. Si [CONDITION] se representa como } 3x + 7 = 22\\text{, donde x es [VARIABLE_MEANING], cual es el valor de x?}',
  options: ['5', '7', '15', '29'],
  correctAnswer: 0,
  explanation: '3x + 7 = 22 \\Rightarrow 3x = 22 - 7 \\Rightarrow 3x = 15 \\Rightarrow x = 5',
  difficulty: 'medium',
  difficultyScore: 0.45,
  skills: ['algebra-ecuaciones-lineales', 'algebra-despeje']
}
```

---

## Template 6: Nested Brackets (Hard)

**Difficulty:** hard (0.58-0.68)

```typescript
{
  id: 'm1-alg-XXX-006',
  level: 'M1',
  topic: 'Algebra y Funciones',
  subject: 'algebra',
  operacionBase: '5x - [2x - (3x - 4)]',
  questionLatex: '\\text{[CONTEXT] analiza [SITUATION] usando la expresion } 5x - [2x - (3x - 4)], \\text{ donde x representa [VARIABLE_MEANING]. La expresion incluye [EXPLANATION_OF_BRACKETS]. [PERSON] necesita simplificar completamente esta expresion. Cual es la expresion simplificada?}',
  options: ['6x - 4', '6x + 4', '4x - 4', '4x + 4'],
  correctAnswer: 0,
  explanation: '5x - [2x - (3x - 4)] = 5x - [2x - 3x + 4] = 5x - [-x + 4] = 5x + x - 4 = 6x - 4',
  difficulty: 'hard',
  difficultyScore: 0.62,
  skills: ['algebra-expresiones', 'algebra-terminos-semejantes']
}
```

---

## Common Distractors

For algebra questions, common wrong answers come from:

1. **Sign errors**: Forgetting to distribute negatives
2. **Exponent errors**: Adding instead of multiplying exponents (or vice versa)
3. **Order of operations**: Computing left-to-right without PEMDAS
4. **Partial simplification**: Not combining all like terms
5. **Coefficient errors**: Adding coefficients instead of multiplying

---

## Real-World Context Ideas

| Context | Variable Represents | Example |
|---------|-------------------|---------|
| Library | Books per box | 3x + 5x books |
| Store | Items per crate | 2x^2 inventory |
| Lab | Concentration units | (3a)(5b) molecules |
| Finance | Thousands of dollars | 5x - 2x profit |
| Tech | Megabytes | x^2 storage |
| Construction | Meters of material | 4x + 3 meters |
