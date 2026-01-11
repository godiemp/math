---
name: vector
description: Create 2D vector visualizations with Cartesian plane, points, and vector operations. Use when rendering vectors in mini-lessons or geometry questions.
---

# Vector Figure Skill

This skill guides you through creating 2D vector visualizations using the `VectorFigure` component. Based on Chilean curriculum MA07-OA-14: "Identificar puntos en el plano cartesiano, usando pares ordenados y vectores de forma concreta y pictórica."

## When to Use This Skill

Invoke this skill when:
- Creating geometry mini-lessons involving vectors or Cartesian planes
- Rendering points on a coordinate system (ordered pairs)
- Visualizing vectors and their components
- Demonstrating vector addition (head-to-tail or parallelogram method)
- Building interactive vector explorations

## Quick Start

### Puntos en el plano cartesiano

```tsx
import { VectorFigure } from '@/components/figures/VectorFigure';

// Un punto en el plano
<VectorFigure
  points={[{ x: 3, y: 2, label: 'P(3, 2)' }]}
  xRange={[-1, 5]}
  yRange={[-1, 4]}
/>

// Puntos en los 4 cuadrantes
<VectorFigure
  points={[
    { x: 3, y: 2, label: 'A(3, 2)' },
    { x: -2, y: 3, label: 'B(-2, 3)' },
    { x: -3, y: -2, label: 'C(-3, -2)' },
    { x: 2, y: -3, label: 'D(2, -3)' },
  ]}
  xRange={[-5, 5]}
  yRange={[-5, 5]}
/>
```

### Vector desde el origen

```tsx
// Vector simple desde el origen
<VectorFigure
  vectors={[{ to: { x: 3, y: 2 }, label: 'v' }]}
/>

// Vector con componentes visibles
<VectorFigure
  vectors={[{ to: { x: 4, y: 3 }, label: 'v' }]}
  components={[{
    vectorIndex: 0,
    showX: true,
    showY: true,
    xLabel: 'vₓ',
    yLabel: 'vᵧ',
  }]}
/>
```

### Vector como desplazamiento

```tsx
// Vector de un punto a otro
<VectorFigure
  vectors={[{
    from: { x: 1, y: 1 },
    to: { x: 4, y: 3 },
    label: 'v',
  }]}
  points={[
    { x: 1, y: 1, label: 'A' },
    { x: 4, y: 3, label: 'B' },
  ]}
/>
```

### Suma de vectores

```tsx
// Método cola-cabeza (head-to-tail)
<VectorFigure
  vectors={[
    { to: { x: 3, y: 1 }, label: 'v', color: 'rgb(59, 130, 246)' },
    { to: { x: 1, y: 3 }, label: 'u', color: 'rgb(16, 185, 129)' },
  ]}
  addition={{
    method: 'head-to-tail',
    vectorIndices: [0, 1],
    showResultant: true,
    resultantLabel: 'v + u',
    showConstruction: true,
  }}
/>

// Método del paralelogramo
<VectorFigure
  vectors={[
    { to: { x: 3, y: 1 }, label: 'v' },
    { to: { x: 1, y: 3 }, label: 'u' },
  ]}
  addition={{
    method: 'parallelogram',
    vectorIndices: [0, 1],
    showResultant: true,
    resultantLabel: 'v + u',
    showConstruction: true,
  }}
/>
```

### Con interacción (arrastrable)

```tsx
<VectorFigure
  vectors={[{ to: { x: 3, y: 2 }, label: 'v' }]}
  draggable
  onVectorsChange={(newVectors) => console.log(newVectors)}
/>
```

---

## Props Reference

### Vector Configuration

```typescript
interface VectorConfig {
  from?: LabeledPoint;        // Punto de inicio (default: origen)
  to: LabeledPoint;           // Punto final (obligatorio)
  label?: string;             // Etiqueta del vector (ej: 'v', 'u')
  labelPosition?: 'middle' | 'tip';  // Posición del label
  color?: string;             // Color del vector
  strokeWidth?: number;       // Ancho de línea
  showMagnitude?: boolean;    // Mostrar magnitud
  showAngle?: boolean;        // Mostrar ángulo con eje x
  arrowSize?: number;         // Tamaño de la punta de flecha
  strokeStyle?: 'solid' | 'dashed' | 'dotted';
}
```

### Point Configuration

```typescript
interface LabeledPoint {
  x: number;          // Coordenada X
  y: number;          // Coordenada Y
  label?: string;     // Etiqueta del punto (ej: 'P(3, 2)')
  labelOffset?: { x: number; y: number };  // Ajuste de posición
}
```

### Component Configuration (Proyecciones)

```typescript
interface VectorComponentConfig {
  vectorIndex: number;   // Índice del vector en el array
  showX?: boolean;       // Mostrar componente X
  showY?: boolean;       // Mostrar componente Y
  color?: string;        // Color de las líneas
  xLabel?: string;       // Etiqueta componente X (ej: 'vₓ')
  yLabel?: string;       // Etiqueta componente Y (ej: 'vᵧ')
}
```

### Addition Configuration

```typescript
interface VectorAdditionConfig {
  method: 'parallelogram' | 'head-to-tail';  // Método de suma
  vectorIndices: [number, number];           // Índices de vectores
  showResultant?: boolean;     // Mostrar vector resultante
  resultantLabel?: string;     // Etiqueta del resultante
  resultantColor?: string;     // Color del resultante
  showConstruction?: boolean;  // Mostrar líneas de construcción
  constructionStyle?: 'dashed' | 'dotted';
}
```

### Main Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `vectors` | `VectorConfig[]` | `[]` | Array de vectores |
| `points` | `LabeledPoint[]` | `[]` | Array de puntos |
| `components` | `VectorComponentConfig[]` | - | Proyecciones a mostrar |
| `addition` | `VectorAdditionConfig` | - | Config de suma de vectores |
| `xRange` | `[number, number]` | `[-5, 5]` | Rango del eje X |
| `yRange` | `[number, number]` | `[-5, 5]` | Rango del eje Y |
| `showGrid` | `boolean` | `true` | Mostrar cuadrícula |
| `showAxes` | `boolean` | `true` | Mostrar ejes |
| `showTicks` | `boolean` | `true` | Mostrar marcas en ejes |
| `showAxisLabels` | `boolean` | `true` | Mostrar números en ejes |
| `showOrigin` | `boolean` | `true` | Mostrar marcador de origen |
| `draggable` | `boolean` | `false` | Permitir arrastrar vectores/puntos |
| `onVectorsChange` | `(vectors) => void` | - | Callback al cambiar vectores |
| `onPointsChange` | `(points) => void` | - | Callback al cambiar puntos |
| `width` | `number` | `400` | Ancho del SVG |
| `height` | `number` | `300` | Alto del SVG |
| `padding` | `number` | `40` | Padding interno |
| `standalone` | `boolean` | `true` | Si es false, renderiza como `<g>` |

---

## Common Patterns

### Identificar puntos en el plano (7° básico)

```tsx
// Actividad: Ubicar puntos dados
<VectorFigure
  points={[
    { x: 2, y: 3, label: 'A(2, 3)' },
    { x: -1, y: 4, label: 'B(-1, 4)' },
    { x: -3, y: -2, label: 'C(-3, -2)' },
    { x: 4, y: -1, label: 'D(4, -1)' },
  ]}
  xRange={[-5, 5]}
  yRange={[-5, 5]}
/>
```

### Vectores como desplazamiento

```tsx
// Mostrar el desplazamiento de A a B
<VectorFigure
  vectors={[{
    from: { x: 1, y: 1 },
    to: { x: 4, y: 3 },
    label: 'AB',
  }]}
  points={[
    { x: 1, y: 1, label: 'A(1, 1)' },
    { x: 4, y: 3, label: 'B(4, 3)' },
  ]}
  xRange={[-1, 6]}
  yRange={[-1, 5]}
/>
```

### Componentes de un vector

```tsx
// Mostrar proyecciones x e y
<VectorFigure
  vectors={[{ to: { x: 4, y: 3 }, label: 'v' }]}
  components={[{
    vectorIndex: 0,
    showX: true,
    showY: true,
    xLabel: 'vₓ = 4',
    yLabel: 'vᵧ = 3',
  }]}
/>
```

### Figuras geométricas con coordenadas

```tsx
// Rectángulo definido por 4 vértices
<VectorFigure
  points={[
    { x: 1, y: 1, label: 'A(1, 1)' },
    { x: 4, y: 1, label: 'B(4, 1)' },
    { x: 4, y: 3, label: 'C(4, 3)' },
    { x: 1, y: 3, label: 'D(1, 3)' },
  ]}
  xRange={[-1, 6]}
  yRange={[-1, 5]}
/>
```

---

## Color Palette

| Elemento | Color |
|----------|-------|
| Vector primario | `rgb(59, 130, 246)` blue-500 |
| Vector secundario | `rgb(16, 185, 129)` emerald-500 |
| Resultante | `rgb(168, 85, 247)` purple-500 |
| Componentes | `rgb(156, 163, 175)` gray-400 |
| Construcción | `rgb(245, 158, 11)` amber-500 |
| Ejes | `rgb(17, 24, 39)` gray-900 |
| Grid | `rgb(229, 231, 235)` gray-200 |
| Origen | `rgb(239, 68, 68)` red-500 |
| Puntos | `rgb(59, 130, 246)` blue-500 |

---

## Debug Page

Para experimentar interactivamente con todas las opciones:

**URL:** `/admin/figure-debug`

Selecciona "Vector" en el selector de tipo de figura. La página permite:
- Seleccionar presets educativos (punto en el plano, 4 cuadrantes, vectores, suma)
- Agregar/eliminar vectores y puntos
- Ajustar coordenadas de vectores y puntos
- Configurar rangos del sistema de coordenadas
- Activar/desactivar grid, ejes, marcas, labels
- Mostrar componentes (proyecciones)
- Visualizar suma de vectores (cola-cabeza o paralelogramo)
- Copiar el código generado

---

## Integration with Mini-Lessons

### In Step Components

```tsx
// En Step2Explore.tsx
import { VectorFigure } from '@/components/figures/VectorFigure';
import { useState } from 'react';

export default function Step2Explore({ isActive }: LessonStepProps) {
  const [showComponents, setShowComponents] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <VectorFigure
        vectors={[{ to: { x: 4, y: 3 }, label: 'v' }]}
        components={showComponents ? [{
          vectorIndex: 0,
          showX: true,
          showY: true,
          xLabel: 'vₓ',
          yLabel: 'vᵧ',
        }] : undefined}
      />
      <button onClick={() => setShowComponents(!showComponents)}>
        {showComponents ? 'Ocultar' : 'Mostrar'} componentes
      </button>
    </div>
  );
}
```

### Interactive Exploration

```tsx
import { VectorFigure } from '@/components/figures/VectorFigure';
import { useState } from 'react';
import type { VectorConfig } from '@/lib/types/vector';

export default function InteractiveVectors() {
  const [vectors, setVectors] = useState<VectorConfig[]>([
    { to: { x: 3, y: 2 }, label: 'v' },
  ]);

  return (
    <div>
      <VectorFigure
        vectors={vectors}
        draggable
        onVectorsChange={setVectors}
      />
      <p>
        Vector v = ({vectors[0].to.x}, {vectors[0].to.y})
      </p>
    </div>
  );
}
```

---

## Utility Functions

Las funciones matemáticas están disponibles en `@/lib/geometry/vectorUtils`:

```typescript
import {
  // Operaciones básicas
  vec2Add,          // Sumar dos vectores
  vec2Subtract,     // Restar dos vectores
  vec2Scale,        // Escalar un vector
  vec2Dot,          // Producto punto
  vec2Magnitude,    // Magnitud (largo)
  vec2Normalize,    // Normalizar a vector unitario
  vec2Angle,        // Ángulo con eje x (grados)
  vec2AngleRadians, // Ángulo con eje x (radianes)
  vec2AngleBetween, // Ángulo entre dos vectores
  vec2Project,      // Proyección de a sobre b
  vec2Perpendicular, // Vector perpendicular
  vec2FromPolar,    // Crear vector desde coordenadas polares

  // Utilidades geométricas
  distance,         // Distancia entre puntos
  midpoint,         // Punto medio

  // Transformaciones de coordenadas
  mathToSVG,        // Coordenadas matemáticas a SVG
  svgToMath,        // Coordenadas SVG a matemáticas

  // Validación
  validateVector,   // Validar configuración de vector
  validateRanges,   // Validar rangos del plano
} from '@/lib/geometry/vectorUtils';
```

### Ejemplos de uso

```typescript
import { vec2Magnitude, vec2Angle, vec2Add } from '@/lib/geometry/vectorUtils';

// Calcular magnitud de un vector
const v = { x: 3, y: 4 };
const mag = vec2Magnitude(v); // 5

// Calcular ángulo con eje x
const angle = vec2Angle(v); // ~53.13°

// Sumar dos vectores
const u = { x: 1, y: 2 };
const sum = vec2Add(v, u); // { x: 4, y: 6 }
```

---

## Embedding in CartesianPlane

For advanced use cases, `VectorFigure` can be embedded in a `CartesianPlane`:

```tsx
import { CartesianPlane } from '@/components/figures/CartesianPlane';
import { VectorFigure } from '@/components/figures/VectorFigure';

<CartesianPlane xRange={[-5, 5]} yRange={[-5, 5]}>
  <VectorFigure
    standalone={false}
    vectors={[{ to: { x: 3, y: 2 }, label: 'v' }]}
  />
</CartesianPlane>
```

Note: When `standalone={false}`, the component renders as a `<g>` element and inherits the coordinate system from the parent `CartesianPlane`.
