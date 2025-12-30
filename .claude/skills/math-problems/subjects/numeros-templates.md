# Numbers Question Templates

## Subject Configuration
```typescript
subject: 'numeros',
topic: 'Numeros',
```

---

## Template 1: Percentage Calculation

**Difficulty:** easy (0.20-0.30)

```typescript
{
  id: 'm1-num-XXX-001',
  level: 'M1',
  topic: 'Numeros',
  subject: 'numeros',
  operacionBase: '[P]% de [N]',
  questionLatex: '\\text{[CONTEXT_STORY]. El [ITEM] original cuesta } \\$[PRICE] \\text{ pesos. Si hay un [P]% de descuento, cuanto se ahorra [PERSON]?}',
  options: ['$[CORRECT]', '$[D1]', '$[D2]', '$[D3]'],
  correctAnswer: 0,
  explanation: '[P]\\% \\text{ de } [PRICE] = \\frac{[P]}{100} \\times [PRICE] = [RESULT]',
  difficulty: 'easy',
  difficultyScore: 0.25,
  skills: ['numeros-porcentajes', 'numeros-porcentajes-descuentos']
}
```

**Contexts:**
- Store discounts
- Tax calculations
- Tip calculations
- Savings interest

---

## Template 2: Fraction Operations

**Difficulty:** easy-medium (0.25-0.45)

```typescript
{
  id: 'm1-num-XXX-002',
  level: 'M1',
  topic: 'Numeros',
  subject: 'numeros',
  operacionBase: '\\frac{a}{b} + \\frac{c}{d}',
  questionLatex: '\\text{[CONTEXT]. [PERSON] usa } \\frac{[A]}{[B]} \\text{ de [ITEM1] y } \\frac{[C]}{[D]} \\text{ de [ITEM2]. Que fraccion del total ha usado?}',
  options: ['\\frac{[CORRECT_NUM]}{[CORRECT_DEN]}', '\\frac{[D1_N]}{[D1_D]}', '\\frac{[D2_N]}{[D2_D]}', '\\frac{[D3_N]}{[D3_D]}'],
  correctAnswer: 0,
  explanation: '\\frac{[A]}{[B]} + \\frac{[C]}{[D]} = \\frac{[A*D]}{[B*D]} + \\frac{[C*B]}{[D*B]} = \\frac{[AD+CB]}{[BD]} = \\frac{[RESULT_NUM]}{[RESULT_DEN]}',
  difficulty: 'medium',
  difficultyScore: 0.38,
  skills: ['numeros-fracciones-sumar-restar-distinto-denominador', 'numeros-simplificar-fracciones']
}
```

**Contexts:**
- Cooking (recipes, portions)
- Time (hours, fractions of day)
- Construction (materials)
- Travel (distance fractions)

---

## Template 3: Proportionality

**Difficulty:** medium (0.35-0.48)

```typescript
{
  id: 'm1-num-XXX-003',
  level: 'M1',
  topic: 'Numeros',
  subject: 'numeros',
  operacionBase: '\\frac{a}{b} = \\frac{c}{x}',
  questionLatex: '\\text{[CONTEXT]. Si [N1] [ITEMS1] cuestan } \\$[PRICE1]\\text{, cuanto cuestan [N2] [ITEMS1]?}',
  options: ['$[CORRECT]', '$[D1]', '$[D2]', '$[D3]'],
  correctAnswer: 0,
  explanation: '\\frac{[N1]}{[PRICE1]} = \\frac{[N2]}{x} \\Rightarrow x = \\frac{[N2] \\times [PRICE1]}{[N1]} = [RESULT]',
  difficulty: 'medium',
  difficultyScore: 0.42,
  skills: ['numeros-proporcionalidad', 'numeros-proporcionalidad-directa']
}
```

---

## Template 4: Decimal Operations

**Difficulty:** easy-medium (0.22-0.40)

```typescript
{
  id: 'm1-num-XXX-004',
  level: 'M1',
  topic: 'Numeros',
  subject: 'numeros',
  operacionBase: '[A] \\times [B]',
  questionLatex: '\\text{[CONTEXT]. [PERSON] compra [QTY] [ITEMS] a } \\$[PRICE] \\text{ cada uno. Cuanto paga en total?}',
  options: ['$[CORRECT]', '$[D1]', '$[D2]', '$[D3]'],
  correctAnswer: 0,
  explanation: '[QTY] \\times [PRICE] = [RESULT]',
  difficulty: 'easy',
  difficultyScore: 0.25,
  skills: ['numeros-decimales-multiplicar-dividir']
}
```

---

## Template 5: Power Properties

**Difficulty:** easy-medium (0.25-0.42)

```typescript
{
  id: 'm1-num-XXX-005',
  level: 'M1',
  topic: 'Numeros',
  subject: 'numeros',
  operacionBase: '2^3 \\times 2^4',
  questionLatex: '\\text{[CONTEXT]. La expresion } 2^3 \\times 2^4 \\text{ representa [MEANING]. Cual es el resultado simplificado?}',
  options: ['2^7', '2^{12}', '4^7', '4^{12}'],
  correctAnswer: 0,
  explanation: '2^3 \\times 2^4 = 2^{3+4} = 2^7 = 128',
  difficulty: 'easy',
  difficultyScore: 0.28,
  skills: ['numeros-potencias', 'numeros-potencias-propiedades']
}
```

---

## Template 6: GCD/LCM Problems

**Difficulty:** medium (0.40-0.55)

```typescript
{
  id: 'm1-num-XXX-006',
  level: 'M1',
  topic: 'Numeros',
  subject: 'numeros',
  operacionBase: 'MCM([A], [B])',
  questionLatex: '\\text{[CONTEXT]. [EVENT1] ocurre cada [A] dias y [EVENT2] ocurre cada [B] dias. Si hoy coinciden, en cuantos dias volveran a coincidir?}',
  options: ['[MCM]', '[MCD]', '[A*B]', '[A+B]'],
  correctAnswer: 0,
  explanation: '\\text{MCM}([A], [B]) = [MCM]',
  difficulty: 'medium',
  difficultyScore: 0.45,
  skills: ['numeros-mcd-mcm']
}
```

**Contexts:**
- Bus schedules
- Rotating shifts
- Recycling collection
- Medication schedules

---

## Template 7: Comparing Numbers

**Difficulty:** easy (0.18-0.30)

```typescript
{
  id: 'm1-num-XXX-007',
  level: 'M1',
  topic: 'Numeros',
  subject: 'numeros',
  operacionBase: 'Comparar \\frac{a}{b}, [c], [d]%',
  questionLatex: '\\text{[CONTEXT]. Cual de los siguientes numeros es el mayor: } \\frac{[A]}{[B]}, [C], [D]\\%\\text{?}',
  options: ['\\frac{[A]}{[B]}', '[C]', '[D]%', '\\text{Son iguales}'],
  correctAnswer: 0,
  explanation: '\\frac{[A]}{[B]} = [DECIMAL1], [C] = [DECIMAL2], [D]\\% = [DECIMAL3]. \\text{ El mayor es } [ANSWER]',
  difficulty: 'easy',
  difficultyScore: 0.28,
  skills: ['numeros-convertir-para-comparar', 'numeros-relacionar-fraccion-decimal-porcentaje']
}
```

---

## Common Contexts by Operation

| Operation | Contexts |
|-----------|----------|
| Percentages | Discounts, tips, taxes, growth rates |
| Fractions | Recipes, time, materials, portions |
| Decimals | Money, measurements, weights |
| Proportions | Prices, maps, mixtures, recipes |
| Powers | Population, technology, science |
| GCD/LCM | Schedules, patterns, grouping |

---

## Pythagorean Triples (for nice calculations)

When creating questions involving square roots:

| a | b | c=√(a²+b²) |
|---|---|------------|
| 3 | 4 | 5 |
| 5 | 12 | 13 |
| 6 | 8 | 10 |
| 8 | 15 | 17 |

---

## Common Fraction Pairs (for adding)

| Fractions | Common Denominator | Sum |
|-----------|-------------------|-----|
| 1/2 + 1/3 | 6 | 5/6 |
| 1/4 + 1/3 | 12 | 7/12 |
| 2/3 + 1/6 | 6 | 5/6 |
| 3/4 + 1/8 | 8 | 7/8 |
