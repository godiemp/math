# Geometry Question Templates

## Subject Configuration
```typescript
subject: 'geometria',
topic: 'Geometria',
```

---

## Template 1: Pythagorean Theorem (Basic)

**Difficulty:** easy (0.25-0.35)

```typescript
{
  id: 'm1-geo-XXX-001',
  level: 'M1',
  topic: 'Geometria',
  subject: 'geometria',
  operacionBase: 'c^2 = a^2 + b^2',
  questionLatex: '\\text{[PROFESSIONAL] esta [ACTION] para [GOAL]. [MEASUREMENT_CONTEXT]. El equipo midio que [HORIZONTAL_DESC] es de [A] metros, y [VERTICAL_DESC] es de [B] metros. Para [PURPOSE], necesita determinar [TARGET]. Cuantos metros mide [TARGET]?}',
  options: ['[D1] m', '[CORRECT] m', '[D3] m', '[D4] m'],
  correctAnswer: 1,
  explanation: 'c^2 = [A]^2 + [B]^2 = [A^2] + [B^2] = [C^2] \\quad \\Rightarrow \\quad c = \\sqrt{[C^2]} = [C] \\text{ m}',
  difficulty: 'easy',
  difficultyScore: 0.28,
  skills: ['geometria-triangulos', 'geometria-pitagoras', 'numeros-raices', 'numeros-potencias'],
  visualData: {
    type: 'geometry',
    data: [
      {
        type: 'triangle',
        points: [
          { x: 50, y: 200, label: 'A' },
          { x: 200, y: 200, label: 'B' },
          { x: 50, y: 80, label: 'C' }
        ],
        labels: { sides: ['[B] m', '[C] m', '[A] m'] },
        dimensions: { showSides: true }
      }
    ]
  }
}
```

**Use Pythagorean triples for clean answers:**
- 3-4-5, 5-12-13, 6-8-10, 8-15-17

---

## Template 2: Circle Area/Perimeter

**Difficulty:** easy (0.22-0.32)

```typescript
{
  id: 'm1-geo-XXX-002',
  level: 'M1',
  topic: 'Geometria',
  subject: 'geometria',
  operacionBase: 'A = \\pi r^2',
  questionLatex: '\\text{[CONTEXT]. [SHAPE_DESC] tiene un radio de [R] [UNITS]. [PERSON] necesita calcular [GOAL]. Cual es el area en [UNITS]^2? (Usa } \\pi \\approx 3.14\\text{)}',
  options: ['[CORRECT] [UNITS]^2', '[D1] [UNITS]^2', '[D2] [UNITS]^2', '[D3] [UNITS]^2'],
  correctAnswer: 0,
  explanation: 'A = \\pi r^2 = 3.14 \\times [R]^2 = 3.14 \\times [R^2] = [RESULT] \\text{ [UNITS]}^2',
  difficulty: 'easy',
  difficultyScore: 0.25,
  skills: ['geometria-circulos', 'geometria-area-circulo', 'numeros-potencias'],
  visualData: {
    type: 'geometry',
    data: [
      {
        type: 'circle',
        center: { x: 150, y: 150, label: 'O' },
        radius: 80,
        labels: { sides: ['r = [R] [UNITS]'] },
        dimensions: { showSides: true }
      }
    ]
  }
}
```

---

## Template 3: Rectangle Area/Perimeter

**Difficulty:** easy (0.18-0.28)

```typescript
{
  id: 'm1-geo-XXX-003',
  level: 'M1',
  topic: 'Geometria',
  subject: 'geometria',
  operacionBase: 'A = b \\times h',
  questionLatex: '\\text{[CONTEXT]. [SHAPE_DESC] tiene base de [B] [UNITS] y altura de [H] [UNITS]. [PERSON] necesita calcular [GOAL]. Cual es el area?}',
  options: ['[CORRECT] [UNITS]^2', '[D1] [UNITS]^2', '[D2] [UNITS]^2', '[D3] [UNITS]^2'],
  correctAnswer: 0,
  explanation: 'A = b \\times h = [B] \\times [H] = [RESULT] \\text{ [UNITS]}^2',
  difficulty: 'easy',
  difficultyScore: 0.20,
  skills: ['geometria-area', 'geometria-rectangulos'],
  visualData: {
    type: 'geometry',
    data: [
      {
        type: 'rectangle',
        points: [{ x: 50, y: 50 }, { x: 200, y: 150 }],
        labels: { sides: ['[B] [UNITS]', '[H] [UNITS]'] },
        dimensions: { showSides: true }
      }
    ]
  }
}
```

---

## Template 4: Distance Between Points

**Difficulty:** medium (0.42-0.52)

```typescript
{
  id: 'm1-geo-XXX-004',
  level: 'M1',
  topic: 'Geometria',
  subject: 'geometria',
  operacionBase: 'd = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}',
  questionLatex: '\\text{[CONTEXT] esta creando [SYSTEM] y necesita calcular distancias. En su sistema de coordenadas, [POINT1_DESC] se encuentra en el punto } A([X1], [Y1]) \\text{ y [POINT2_DESC] esta en el punto } B([X2], [Y2])\\text{. Cual es la distancia en linea recta entre estos dos puntos?}',
  options: ['[D1]', '[D2]', '[CORRECT]', '[D4]'],
  correctAnswer: 2,
  explanation: 'd = \\sqrt{([X2]-[X1])^2 + ([Y2]-[Y1])^2} = \\sqrt{[DX]^2 + [DY]^2} = \\sqrt{[SUM]} = [RESULT]',
  difficulty: 'medium',
  difficultyScore: 0.45,
  skills: ['geometria-plano-cartesiano', 'geometria-distancia', 'geometria-pitagoras', 'numeros-raices']
}
```

---

## Template 5: Angle Relationships

**Difficulty:** easy-medium (0.25-0.42)

```typescript
{
  id: 'm1-geo-XXX-005',
  level: 'M1',
  topic: 'Geometria',
  subject: 'geometria',
  operacionBase: '\\alpha + \\beta = 180°',
  questionLatex: '\\text{[CONTEXT]. Dos angulos son suplementarios. Si uno de ellos mide [ANGLE1]°, cuanto mide el otro angulo?}',
  options: ['[CORRECT]°', '[D1]°', '[D2]°', '[D3]°'],
  correctAnswer: 0,
  explanation: '\\text{Angulos suplementarios suman } 180°. \\quad 180° - [ANGLE1]° = [RESULT]°',
  difficulty: 'easy',
  difficultyScore: 0.28,
  skills: ['geometria-angulos', 'geometria-angulos-suplementarios'],
  visualData: {
    type: 'geometry',
    data: [
      {
        type: 'angle',
        points: [
          { x: 150, y: 150 },
          { x: 250, y: 150 },
          { x: 50, y: 150 }
        ],
        labels: { angles: ['[ANGLE1]°', '?'] }
      }
    ]
  }
}
```

---

## Template 6: Composite Figures

**Difficulty:** medium-hard (0.48-0.62)

```typescript
{
  id: 'm1-geo-XXX-006',
  level: 'M1',
  topic: 'Geometria',
  subject: 'geometria',
  operacionBase: 'A_{total} = A_1 + A_2',
  questionLatex: '\\text{[CONTEXT]. [SHAPE_DESC] esta compuesta por un rectangulo de [B1] x [H1] [UNITS] y un triangulo de base [B2] y altura [H2] [UNITS]. Cual es el area total?}',
  options: ['[CORRECT] [UNITS]^2', '[D1] [UNITS]^2', '[D2] [UNITS]^2', '[D3] [UNITS]^2'],
  correctAnswer: 0,
  explanation: 'A_{rect} = [B1] \\times [H1] = [A1]. \\quad A_{tri} = \\frac{[B2] \\times [H2]}{2} = [A2]. \\quad A_{total} = [A1] + [A2] = [RESULT]',
  difficulty: 'medium',
  difficultyScore: 0.52,
  skills: ['geometria-area', 'geometria-rectangulos', 'geometria-area-triangulo']
}
```

---

## Pythagorean Triples Reference

| a | b | c | Use Case |
|---|---|---|----------|
| 3 | 4 | 5 | Basic introduction |
| 5 | 12 | 13 | Common application |
| 6 | 8 | 10 | Scaled 3-4-5 |
| 8 | 15 | 17 | Engineering contexts |
| 7 | 24 | 25 | Advanced |
| 9 | 12 | 15 | Scaled 3-4-5 |
| 9 | 40 | 41 | Very advanced |

---

## Common Contexts

| Context | Examples |
|---------|----------|
| Construction | Building dimensions, cables, ramps |
| Navigation | Maps, coordinates, distances |
| Design | Logos, patterns, gardens |
| Sports | Field dimensions, court layouts |
| Engineering | Bridges, structures, support cables |
| Architecture | Room dimensions, roof angles |

---

## Formula Reference

| Shape | Area | Perimeter |
|-------|------|-----------|
| Rectangle | A = b × h | P = 2(b + h) |
| Square | A = l² | P = 4l |
| Triangle | A = (b × h)/2 | P = a + b + c |
| Circle | A = πr² | C = 2πr |
| Trapezoid | A = (B + b) × h / 2 | P = a + b + c + d |
| Parallelogram | A = b × h | P = 2(a + b) |
