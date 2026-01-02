# VisualData Templates

Complete templates for all supported visualization types in questions.

---

## 1. Geometry (type: 'geometry')

Rendered by `GeometryCanvas`. SVG-based with labels and dimensions.

### Triangle
```typescript
visualData: {
  type: 'geometry',
  data: [
    {
      type: 'triangle',
      points: [
        { x: 50, y: 200, label: 'A' },   // bottom-left
        { x: 200, y: 200, label: 'B' },  // bottom-right
        { x: 125, y: 50, label: 'C' }    // top
      ],
      labels: {
        sides: ['a', 'b', 'c'],          // labels for each side
        angles: ['alpha', 'beta', 'gamma']  // optional angle labels
      },
      dimensions: {
        showSides: true,
        showAngles: false
      }
    }
  ]
}
```

### Right Triangle (Pythagorean)
```typescript
visualData: {
  type: 'geometry',
  data: [
    {
      type: 'triangle',
      points: [
        { x: 50, y: 200, label: 'A' },   // right angle vertex
        { x: 200, y: 200, label: 'B' },  // base end
        { x: 50, y: 80, label: 'C' }     // height end
      ],
      labels: {
        sides: ['8 m', '10 m', '6 m']    // height, hypotenuse, base
      },
      dimensions: { showSides: true }
    }
  ]
}
```

### Rectangle
```typescript
visualData: {
  type: 'geometry',
  data: [
    {
      type: 'rectangle',
      points: [
        { x: 50, y: 50, label: 'A' },    // top-left
        { x: 200, y: 150, label: 'C' }   // bottom-right (diagonal)
      ],
      labels: {
        sides: ['150 cm', '100 cm']      // width, height
      },
      dimensions: { showSides: true }
    }
  ]
}
```

### Circle
```typescript
visualData: {
  type: 'geometry',
  data: [
    {
      type: 'circle',
      center: { x: 150, y: 150, label: 'O' },
      radius: 80,
      labels: {
        sides: ['r = 5 cm']              // radius label
      },
      dimensions: { showSides: true }    // shows radius line
    }
  ]
}
```

### Angle
```typescript
visualData: {
  type: 'geometry',
  data: [
    {
      type: 'angle',
      points: [
        { x: 150, y: 150 },              // vertex
        { x: 250, y: 150 },              // ray 1 end
        { x: 200, y: 80 }                // ray 2 end
      ],
      labels: {
        angles: ['45°']
      }
    }
  ]
}
```

### Polygon (Generic)
```typescript
visualData: {
  type: 'geometry',
  data: [
    {
      type: 'polygon',
      points: [
        { x: 100, y: 50, label: 'A' },
        { x: 200, y: 50, label: 'B' },
        { x: 220, y: 150, label: 'C' },
        { x: 80, y: 150, label: 'D' }
      ]
    }
  ]
}
```

### Multiple Figures
```typescript
visualData: {
  type: 'geometry',
  data: [
    {
      type: 'rectangle',
      points: [{ x: 50, y: 50 }, { x: 150, y: 120 }],
      labels: { sides: ['10 m', '7 m'] },
      dimensions: { showSides: true }
    },
    {
      type: 'triangle',
      points: [
        { x: 150, y: 50 },
        { x: 220, y: 120 },
        { x: 150, y: 120 }
      ],
      labels: { sides: ['', '8 m', '7 m'] },
      dimensions: { showSides: true }
    }
  ]
}
```

---

## 2. Bar Chart (type: 'graph', chartType: 'bar')

Rendered by `BarChart` component. Good for comparing categories.

### Basic Bar Chart
```typescript
visualData: {
  type: 'graph',
  data: {
    chartType: 'bar',
    items: [
      { category: 'Lunes', value: 30 },
      { category: 'Martes', value: 45 },
      { category: 'Miercoles', value: 35 },
      { category: 'Jueves', value: 50 },
      { category: 'Viernes', value: 40 }
    ],
    showValues: true,
    showLabels: true
  }
}
```

### Bar Chart with Colors
```typescript
visualData: {
  type: 'graph',
  data: {
    chartType: 'bar',
    items: [
      { category: 'Matematica', value: 85, color: '#3B82F6' },
      { category: 'Lenguaje', value: 72, color: '#10B981' },
      { category: 'Ciencias', value: 68, color: '#F59E0B' },
      { category: 'Historia', value: 78, color: '#8B5CF6' }
    ],
    showValues: true,
    showLabels: true
  }
}
```

### Optional Properties
```typescript
{
  chartType: 'bar',
  items: [...],
  showValues: true,        // Show numbers above bars (default: true)
  showLabels: true,        // Show category names (default: true)
  // Note: height is controlled by QuestionRenderer (compact ? 'sm' : 'md')
}
```

---

## 3. Pie Chart (type: 'graph', chartType: 'pie')

Rendered by `PieChart` component. Good for proportions/percentages.

### Basic Pie Chart
```typescript
visualData: {
  type: 'graph',
  data: {
    chartType: 'pie',
    items: [
      { category: 'Futbol', value: 40, color: '#3B82F6' },
      { category: 'Basquet', value: 25, color: '#10B981' },
      { category: 'Tenis', value: 20, color: '#F59E0B' },
      { category: 'Natacion', value: 15, color: '#EF4444' }
    ],
    showLegend: true,
    showPercentages: true
  }
}
```

### Pie Chart with 3 Slices
```typescript
visualData: {
  type: 'graph',
  data: {
    chartType: 'pie',
    items: [
      { category: 'Aprobados', value: 75, color: '#10B981' },
      { category: 'Reprobados', value: 15, color: '#EF4444' },
      { category: 'Pendientes', value: 10, color: '#6B7280' }
    ],
    showLegend: true,
    showPercentages: true
  }
}
```

### Optional Properties
```typescript
{
  chartType: 'pie',
  items: [...],
  showLegend: true,        // Show legend below (default: true)
  showValues: false,       // Show absolute values in legend, e.g., "Futbol (40)" (default: false)
  showPercentages: true,   // Show % in legend, e.g., "Futbol (40%)" (default: true)
  // Note: size is controlled by QuestionRenderer (compact ? 'sm' : 'md')
}
```

### Recommended Colors
```
Blue:   #3B82F6
Green:  #10B981
Amber:  #F59E0B
Red:    #EF4444
Purple: #8B5CF6
Pink:   #EC4899
Teal:   #14B8A6
Orange: #F97316
Gray:   #6B7280
```

---

## 4. Frequency Table (type: 'table')

Rendered by `FrequencyTable` component. Shows tally marks and frequencies.

### Basic Frequency Table
```typescript
visualData: {
  type: 'table',
  data: {
    items: [
      { category: 'Rojo', frequency: 8 },
      { category: 'Azul', frequency: 12 },
      { category: 'Verde', frequency: 5 },
      { category: 'Amarillo', frequency: 7 }
    ],
    showTally: true,
    showRelative: false,
    showPercentage: false
  }
}
```

### Frequency Table with All Columns
```typescript
visualData: {
  type: 'table',
  data: {
    items: [
      { category: '1-10', frequency: 5 },
      { category: '11-20', frequency: 8 },
      { category: '21-30', frequency: 12 },
      { category: '31-40', frequency: 7 },
      { category: '41-50', frequency: 3 }
    ],
    showTally: true,        // Show tally marks (||||)
    showRelative: true,     // Show relative frequency (0.00-1.00)
    showPercentage: true    // Show percentage column
  }
}
```

### Frequency Table with Colors
```typescript
visualData: {
  type: 'table',
  data: {
    items: [
      { category: 'Excelente', frequency: 15, color: '#10B981' },
      { category: 'Bueno', frequency: 22, color: '#3B82F6' },
      { category: 'Regular', frequency: 8, color: '#F59E0B' },
      { category: 'Deficiente', frequency: 5, color: '#EF4444' }
    ],
    showTally: true,
    showRelative: true,
    showPercentage: false
  }
}
```

---

## 5. Venn Diagram (type: 'diagram', diagramType: 'venn')

Rendered by `VennDiagram` component. Shows set relationships.

### Overlapping Sets
```typescript
visualData: {
  type: 'diagram',
  data: {
    diagramType: 'venn',
    mode: 'overlapping',
    labelA: 'Futbol',
    labelB: 'Basquet',
    countA: 15,             // Only in A (not in B)
    countB: 10,             // Only in B (not in A)
    countBoth: 5,           // In both A and B (intersection)
    showCounts: true
  }
}
```

### Exclusive Sets (No Overlap)
```typescript
visualData: {
  type: 'diagram',
  data: {
    diagramType: 'venn',
    mode: 'exclusive',
    labelA: 'Pares',
    labelB: 'Impares',
    countA: 5,
    countB: 5,
    showCounts: true
  }
}
```

### Survey Example
```typescript
visualData: {
  type: 'diagram',
  data: {
    diagramType: 'venn',
    mode: 'overlapping',
    labelA: 'Ingles',
    labelB: 'Frances',
    countA: 25,             // Only English
    countB: 15,             // Only French
    countBoth: 8,           // Both languages
    showCounts: true
  }
}
// Total surveyed = 25 + 15 + 8 = 48
// Note: countA and countB are EXCLUSIVE counts (not including intersection)
```

---

## 6. Histogram (type: 'graph', chartType: 'histogram')

Rendered by `Histogram` component. Used for continuous data grouped in intervals/bins.
Key difference from bar chart: bars are contiguous (no gaps).

### Basic Histogram
```typescript
visualData: {
  type: 'graph',
  data: {
    chartType: 'histogram',
    items: [
      { interval: '[1-3)', frequency: 5 },
      { interval: '[3-5)', frequency: 12 },
      { interval: '[5-7)', frequency: 8 }
    ],
    showFrequencies: true,
    showIntervals: true
  }
}
```

### Histogram with More Intervals
```typescript
visualData: {
  type: 'graph',
  data: {
    chartType: 'histogram',
    items: [
      { interval: '[0-10)', frequency: 3 },
      { interval: '[10-20)', frequency: 7 },
      { interval: '[20-30)', frequency: 15 },
      { interval: '[30-40)', frequency: 10 },
      { interval: '[40-50)', frequency: 5 }
    ],
    showFrequencies: true,
    showIntervals: true
  }
}
```

### Histogram with Colors
```typescript
visualData: {
  type: 'graph',
  data: {
    chartType: 'histogram',
    items: [
      { interval: '[1-3)', frequency: 5, color: '#3B82F6' },
      { interval: '[3-5)', frequency: 12, color: '#10B981' },
      { interval: '[5-7)', frequency: 8, color: '#F59E0B' }
    ],
    showFrequencies: true,
    showIntervals: true
  }
}
```

### Optional Properties
```typescript
{
  chartType: 'histogram',
  items: [...],
  showFrequencies: true,   // Show frequency numbers above bars (default: true)
  showIntervals: true,     // Show interval labels below (default: true)
  // Note: height is controlled by QuestionRenderer (compact ? 'sm' : 'md')
}
```

---

## 7. Line Chart (type: 'graph', chartType: 'line')

Rendered by `LineChart` component. Used for showing trends over time or ordered categories.

### Basic Line Chart
```typescript
visualData: {
  type: 'graph',
  data: {
    chartType: 'line',
    items: [
      { label: 'Dia 1', value: 20 },
      { label: 'Dia 2', value: 22 },
      { label: 'Dia 3', value: 18 },
      { label: 'Dia 4', value: 25 },
      { label: 'Dia 5', value: 21 }
    ],
    showValues: true,
    showLabels: true
  }
}
```

### Temperature Over Days
```typescript
visualData: {
  type: 'graph',
  data: {
    chartType: 'line',
    items: [
      { label: 'Lunes', value: 15 },
      { label: 'Martes', value: 18 },
      { label: 'Miercoles', value: 20 },
      { label: 'Jueves', value: 17 },
      { label: 'Viernes', value: 22 }
    ],
    showValues: true,
    showLabels: true
  }
}
```

### Monthly Sales
```typescript
visualData: {
  type: 'graph',
  data: {
    chartType: 'line',
    items: [
      { label: 'Ene', value: 100 },
      { label: 'Feb', value: 120 },
      { label: 'Mar', value: 115 },
      { label: 'Abr', value: 135 },
      { label: 'May', value: 150 }
    ],
    showValues: true,
    showLabels: true
  }
}
```

### Optional Properties
```typescript
{
  chartType: 'line',
  items: [...],
  showValues: false,   // Show value labels at each point (default: false)
  showLabels: true,    // Show labels on X-axis (default: true)
  showYAxis: true,     // Show Y-axis with value scale (default: true)
  // Note: height is controlled by QuestionRenderer (compact ? 'sm' : 'md')
}
```

---

## When to Use Each Type

| Question Type | Visualization |
|---------------|---------------|
| Shapes, areas, perimeters | geometry |
| Comparing quantities | graph (bar) |
| Proportions, percentages | graph (pie) |
| Continuous data in intervals | graph (histogram) |
| Trends over time | graph (line) |
| Data collection, counting | table |
| Set theory, logic | diagram (venn) |

---

## Complete Example: Statistics Question

```typescript
{
  id: 'm1-prob-stats-1',
  level: 'M1',
  topic: 'Probabilidad y Estadistica',
  subject: 'probabilidad',
  questionLatex: '\\text{En una encuesta sobre deportes favoritos, se registraron las preferencias de 100 estudiantes. El grafico muestra los resultados. Si se elige un estudiante al azar, cual es la probabilidad de que prefiera Futbol?}',
  options: ['0.25', '0.35', '0.40', '0.45'],
  correctAnswer: 2,
  explanation: 'P(Futbol) = \\frac{40}{100} = 0.40',
  difficulty: 'easy',
  difficultyScore: 0.25,
  skills: ['probabilidad-basica', 'estadistica-graficos', 'estadistica-interpretacion'],
  visualData: {
    type: 'graph',
    data: {
      chartType: 'bar',
      items: [
        { category: 'Futbol', value: 40 },
        { category: 'Basquet', value: 25 },
        { category: 'Tenis', value: 20 },
        { category: 'Natacion', value: 15 }
      ],
      showValues: true,
      showLabels: true
    }
  }
}
```
