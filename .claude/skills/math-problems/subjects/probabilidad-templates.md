# Probability & Statistics Question Templates

## Subject Configuration
```typescript
subject: 'probabilidad',
topic: 'Probabilidad y Estadistica',
```

---

## Template 1: Basic Probability

**Difficulty:** easy (0.20-0.32)

```typescript
{
  id: 'm1-prob-XXX-001',
  level: 'M1',
  topic: 'Probabilidad y Estadistica',
  subject: 'probabilidad',
  operacionBase: 'P = \\frac{\\text{favorables}}{\\text{posibles}}',
  questionLatex: '\\text{[CONTEXT]. [CONTAINER] contiene [TOTAL] [ITEMS]: [N1] [TYPE1], [N2] [TYPE2] y [N3] [TYPE3]. Si se elige un [ITEM] al azar, cual es la probabilidad de obtener un [TARGET]?}',
  options: ['\\frac{[CORRECT_NUM]}{[CORRECT_DEN]}', '\\frac{[D1_N]}{[D1_D]}', '\\frac{[D2_N]}{[D2_D]}', '\\frac{[D3_N]}{[D3_D]}'],
  correctAnswer: 0,
  explanation: 'P([TARGET]) = \\frac{\\text{[TARGET]}}{\\text{total}} = \\frac{[FAVORABLE]}{[TOTAL]} = \\frac{[RESULT_NUM]}{[RESULT_DEN]}',
  difficulty: 'easy',
  difficultyScore: 0.25,
  skills: ['probabilidad-basica', 'probabilidad-casos-favorables']
}
```

**Contexts:**
- Bag with colored balls
- Deck of cards
- Dice rolls
- Spinner sections

---

## Template 2: Bar Chart Interpretation

**Difficulty:** easy (0.22-0.35)

```typescript
{
  id: 'm1-prob-XXX-002',
  level: 'M1',
  topic: 'Probabilidad y Estadistica',
  subject: 'probabilidad',
  operacionBase: '\\text{Leer grafico de barras}',
  questionLatex: '\\text{El grafico muestra [DATA_DESCRIPTION]. Segun los datos, cual es [QUESTION]?}',
  options: ['[CORRECT]', '[D1]', '[D2]', '[D3]'],
  correctAnswer: 0,
  explanation: '\\text{Del grafico: } [EXPLANATION]',
  difficulty: 'easy',
  difficultyScore: 0.28,
  skills: ['estadistica-graficos', 'estadistica-interpretacion'],
  visualData: {
    type: 'graph',
    data: {
      chartType: 'bar',
      items: [
        { category: '[CAT1]', value: [V1] },
        { category: '[CAT2]', value: [V2] },
        { category: '[CAT3]', value: [V3] },
        { category: '[CAT4]', value: [V4] }
      ],
      showValues: true,
      showLabels: true
    }
  }
}
```

---

## Template 3: Mean Calculation

**Difficulty:** easy-medium (0.28-0.42)

```typescript
{
  id: 'm1-prob-XXX-003',
  level: 'M1',
  topic: 'Probabilidad y Estadistica',
  subject: 'probabilidad',
  operacionBase: '\\bar{x} = \\frac{\\sum x_i}{n}',
  questionLatex: '\\text{[CONTEXT]. Los [N] [DATA_TYPE] son: [V1], [V2], [V3], [V4], [V5]. Cual es el promedio?}',
  options: ['[CORRECT]', '[D1]', '[D2]', '[D3]'],
  correctAnswer: 0,
  explanation: '\\bar{x} = \\frac{[V1] + [V2] + [V3] + [V4] + [V5]}{[N]} = \\frac{[SUM]}{[N]} = [RESULT]',
  difficulty: 'easy',
  difficultyScore: 0.30,
  skills: ['estadistica-media']
}
```

---

## Template 4: Median

**Difficulty:** easy-medium (0.28-0.42)

```typescript
{
  id: 'm1-prob-XXX-004',
  level: 'M1',
  topic: 'Probabilidad y Estadistica',
  subject: 'probabilidad',
  operacionBase: '\\text{Mediana}',
  questionLatex: '\\text{[CONTEXT]. Los datos ordenados son: [V1], [V2], [V3], [V4], [V5], [V6]. Cual es la mediana?}',
  options: ['[CORRECT]', '[D1]', '[D2]', '[D3]'],
  correctAnswer: 0,
  explanation: '\\text{Con 6 datos, la mediana es el promedio de los valores 3° y 4°: } \\frac{[V3] + [V4]}{2} = [RESULT]',
  difficulty: 'easy',
  difficultyScore: 0.32,
  skills: ['estadistica-mediana']
}
```

---

## Template 5: Frequency Table

**Difficulty:** medium (0.35-0.48)

```typescript
{
  id: 'm1-prob-XXX-005',
  level: 'M1',
  topic: 'Probabilidad y Estadistica',
  subject: 'probabilidad',
  operacionBase: 'f_r = \\frac{f_i}{n}',
  questionLatex: '\\text{La tabla muestra [DATA_DESCRIPTION]. Cual es la frecuencia relativa de [CATEGORY]?}',
  options: ['[CORRECT]', '[D1]', '[D2]', '[D3]'],
  correctAnswer: 0,
  explanation: 'f_r([CATEGORY]) = \\frac{f_i}{n} = \\frac{[FREQ]}{[TOTAL]} = [RESULT]',
  difficulty: 'medium',
  difficultyScore: 0.40,
  skills: ['estadistica-frecuencia', 'estadistica-tablas'],
  visualData: {
    type: 'table',
    data: {
      items: [
        { category: '[CAT1]', frequency: [F1] },
        { category: '[CAT2]', frequency: [F2] },
        { category: '[CAT3]', frequency: [F3] },
        { category: '[CAT4]', frequency: [F4] }
      ],
      showTally: true,
      showRelative: false,
      showPercentage: false
    }
  }
}
```

---

## Template 6: Pie Chart Interpretation

**Difficulty:** easy-medium (0.25-0.40)

```typescript
{
  id: 'm1-prob-XXX-006',
  level: 'M1',
  topic: 'Probabilidad y Estadistica',
  subject: 'probabilidad',
  operacionBase: '\\text{Leer grafico circular}',
  questionLatex: '\\text{El grafico circular muestra [DATA_DESCRIPTION]. Si el total es [TOTAL], cuantos [ITEMS] prefieren [CATEGORY]?}',
  options: ['[CORRECT]', '[D1]', '[D2]', '[D3]'],
  correctAnswer: 0,
  explanation: '[PERCENTAGE]\\% \\text{ de } [TOTAL] = \\frac{[PERCENTAGE]}{100} \\times [TOTAL] = [RESULT]',
  difficulty: 'easy',
  difficultyScore: 0.32,
  skills: ['estadistica-graficos', 'estadistica-porcentajes'],
  visualData: {
    type: 'graph',
    data: {
      chartType: 'pie',
      items: [
        { category: '[CAT1]', value: [V1], color: '#3B82F6' },
        { category: '[CAT2]', value: [V2], color: '#10B981' },
        { category: '[CAT3]', value: [V3], color: '#F59E0B' },
        { category: '[CAT4]', value: [V4], color: '#EF4444' }
      ],
      showLegend: true,
      showPercentages: true
    }
  }
}
```

---

## Template 7: Venn Diagram

**Difficulty:** medium (0.40-0.52)

```typescript
{
  id: 'm1-prob-XXX-007',
  level: 'M1',
  topic: 'Probabilidad y Estadistica',
  subject: 'probabilidad',
  operacionBase: '|A \\cup B| = |A| + |B| - |A \\cap B|',
  questionLatex: '\\text{En una encuesta, [TOTAL] personas fueron consultadas sobre [TOPIC]. [N_A] practican [A], [N_B] practican [B], y [N_BOTH] practican ambos. Cuantas personas practican al menos uno de los dos [ACTIVITY]?}',
  options: ['[CORRECT]', '[D1]', '[D2]', '[D3]'],
  correctAnswer: 0,
  explanation: '|A \\cup B| = |A| + |B| - |A \\cap B| = [N_A] + [N_B] - [N_BOTH] = [RESULT]',
  difficulty: 'medium',
  difficultyScore: 0.45,
  skills: ['probabilidad-eventos-compuestos'],
  visualData: {
    type: 'diagram',
    data: {
      diagramType: 'venn',
      mode: 'overlapping',
      labelA: '[A]',
      labelB: '[B]',
      countA: [ONLY_A],
      countB: [ONLY_B],
      countBoth: [N_BOTH],
      showCounts: true
    }
  }
}
```

**Note:** In Venn diagram visualData:
- `countA` = items ONLY in A (not including intersection)
- `countB` = items ONLY in B (not including intersection)
- `countBoth` = intersection

---

## Template 8: Probability from Chart

**Difficulty:** easy-medium (0.28-0.42)

```typescript
{
  id: 'm1-prob-XXX-008',
  level: 'M1',
  topic: 'Probabilidad y Estadistica',
  subject: 'probabilidad',
  operacionBase: 'P = \\frac{n_{favorable}}{n_{total}}',
  questionLatex: '\\text{El grafico muestra las preferencias de [TOTAL] estudiantes. Si se elige un estudiante al azar, cual es la probabilidad de que prefiera [TARGET]?}',
  options: ['[CORRECT]', '[D1]', '[D2]', '[D3]'],
  correctAnswer: 0,
  explanation: 'P([TARGET]) = \\frac{[FAVORABLE]}{[TOTAL]} = [RESULT]',
  difficulty: 'easy',
  difficultyScore: 0.35,
  skills: ['probabilidad-basica', 'estadistica-graficos'],
  visualData: {
    type: 'graph',
    data: {
      chartType: 'bar',
      items: [
        { category: '[CAT1]', value: [V1] },
        { category: '[CAT2]', value: [V2] },
        { category: '[CAT3]', value: [V3] }
      ],
      showValues: true,
      showLabels: true
    }
  }
}
```

---

## Common Contexts

| Type | Contexts |
|------|----------|
| Probability | Bags of balls, dice, cards, spinners, lotteries |
| Statistics | Surveys, grades, temperatures, sports scores |
| Frequency | Class data, product sales, customer preferences |
| Charts | Survey results, sales data, population data |

---

## Color Palette for Charts

```typescript
const COLORS = {
  blue:   '#3B82F6',
  green:  '#10B981',
  amber:  '#F59E0B',
  red:    '#EF4444',
  purple: '#8B5CF6',
  pink:   '#EC4899',
  teal:   '#14B8A6',
  orange: '#F97316',
  gray:   '#6B7280'
};
```

---

## Statistical Formulas Reference

| Measure | Formula |
|---------|---------|
| Mean | x̄ = Σxᵢ / n |
| Median (odd) | Middle value |
| Median (even) | Average of two middle values |
| Mode | Most frequent value |
| Range | Max - Min |
| Probability | P = favorable / total |
| Relative Frequency | fᵣ = fᵢ / n |
