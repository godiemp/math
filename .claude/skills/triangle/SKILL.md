---
name: triangle
description: Create triangle geometry figures with vertices, angles, special lines, and labels. Use when rendering triangles in mini-lessons or geometry questions.
---

# Triangle Figure Skill

This skill guides you through creating triangle visualizations using the `TriangleFigure` component.

## When to Use This Skill

Invoke this skill when:
- Creating geometry mini-lessons involving triangles
- Rendering triangles in practice questions
- Visualizing triangle properties (angles, special lines)
- Building interactive triangle explorations
- Demonstrating teorema de Pitágoras, área de triángulos, etc.

## Quick Start

### Basic Triangle with Labels

```tsx
import { TriangleFigure } from '@/components/figures/TriangleFigure';

<TriangleFigure
  vertices={[
    { x: 200, y: 50, label: 'A' },
    { x: 100, y: 220, label: 'B' },
    { x: 300, y: 220, label: 'C' },
  ]}
  showGrid
/>
```

### Right Triangle with Marker

```tsx
<TriangleFigure
  vertices={[
    { x: 100, y: 50, label: 'A' },
    { x: 100, y: 200, label: 'B' },
    { x: 260, y: 200, label: 'C' },
  ]}
  showRightAngleMarker
  rightAngleVertex={1}
  sides={[
    { label: 'c' },  // hipotenusa
    { label: 'a' },  // cateto
    { label: 'b' },  // cateto
  ]}
/>
```

### Triangle with Angles

```tsx
<TriangleFigure
  vertices={[
    { x: 200, y: 50, label: 'A' },
    { x: 100, y: 220, label: 'B' },
    { x: 300, y: 220, label: 'C' },
  ]}
  angles={[
    { showArc: true, showDegrees: true },
    { showArc: true, showDegrees: true },
    { showArc: true, showDegrees: true },
  ]}
/>
```

### Triangle with Altura (Height)

```tsx
<TriangleFigure
  vertices={[
    { x: 200, y: 50, label: 'A' },
    { x: 100, y: 220, label: 'B' },
    { x: 300, y: 220, label: 'C' },
  ]}
  specialLines={[
    {
      type: 'altura',
      fromVertex: 0,
      strokeStyle: 'dashed',
      showLabel: true,
      showRightAngleMarker: true,
    },
  ]}
/>
```

---

## Props Reference

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `vertices` | `[LabeledPoint, LabeledPoint, LabeledPoint]` | Los 3 vértices del triángulo |

### LabeledPoint

```typescript
interface LabeledPoint {
  x: number;          // Coordenada X
  y: number;          // Coordenada Y
  label?: string;     // Etiqueta del vértice (ej: 'A', 'B', 'C')
  labelOffset?: { x: number; y: number };  // Ajuste de posición del label
}
```

### Side Configuration

```typescript
interface SideConfig {
  label?: string;           // Etiqueta del lado (ej: 'a', 'b', 'c')
  measurement?: string;     // Medida con unidades (ej: '5 cm')
  color?: string;           // Color personalizado
  strokeStyle?: 'solid' | 'dashed' | 'dotted';
  showMeasurement?: boolean;
}
```

### Angle Configuration

```typescript
interface AngleConfig {
  label?: string;        // Etiqueta (grados o letra griega)
  showArc?: boolean;     // Mostrar arco del ángulo
  arcRadius?: number;    // Radio del arco (default: 25)
  color?: string;        // Color personalizado
  isExterior?: boolean;  // Si es ángulo exterior
  showDegrees?: boolean; // Mostrar valor en grados
}
```

### Special Lines

```typescript
interface SpecialLineConfig {
  type: 'altura' | 'mediana' | 'bisectriz' | 'mediatriz';
  fromVertex: 0 | 1 | 2;           // Vértice de origen
  color?: string;
  strokeStyle?: 'solid' | 'dashed' | 'dotted';
  showLabel?: boolean;             // Mostrar nombre de la línea
  showRightAngleMarker?: boolean;  // Marcador de ángulo recto
}
```

### Visual Options

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fill` | `string` | `'rgba(59,130,246,0.15)'` | Color de relleno |
| `fillOpacity` | `number` | - | Opacidad del relleno |
| `stroke` | `string` | `'rgb(59,130,246)'` | Color del borde |
| `strokeWidth` | `number` | `2` | Ancho del borde |
| `showGrid` | `boolean` | `false` | Mostrar cuadrícula |
| `gridSize` | `number` | `20` | Tamaño de celda de la cuadrícula |
| `showVertices` | `boolean` | `true` | Mostrar puntos en los vértices |
| `vertexRadius` | `number` | `4` | Radio de los puntos de vértice |
| `showRightAngleMarker` | `boolean` | `false` | Mostrar marcador de ángulo recto |
| `rightAngleVertex` | `0 \| 1 \| 2` | auto | Vértice con ángulo recto |
| `rightAngleSize` | `number` | `12` | Tamaño del marcador |

### SVG Options

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `number` | auto | Ancho del SVG |
| `height` | `number` | auto | Alto del SVG |
| `viewBox` | `string` | auto | ViewBox personalizado |
| `padding` | `number` | `40` | Padding alrededor del triángulo |
| `className` | `string` | - | Clases CSS adicionales |

---

## Common Patterns

### Teorema de Pitágoras

```tsx
<TriangleFigure
  vertices={[
    { x: 50, y: 50, label: 'A' },
    { x: 50, y: 200, label: 'B' },
    { x: 200, y: 200, label: 'C' },
  ]}
  sides={[
    { label: 'c', measurement: '5 cm' },  // hipotenusa
    { label: 'a', measurement: '3 cm' },  // cateto opuesto
    { label: 'b', measurement: '4 cm' },  // cateto adyacente
  ]}
  showRightAngleMarker
  rightAngleVertex={1}
  showGrid
/>
```

### Suma de Ángulos Interiores

```tsx
<TriangleFigure
  vertices={[
    { x: 200, y: 50, label: 'A' },
    { x: 100, y: 220, label: 'B' },
    { x: 300, y: 220, label: 'C' },
  ]}
  angles={[
    { showArc: true, label: 'α' },
    { showArc: true, label: 'β' },
    { showArc: true, label: 'γ' },
  ]}
/>
// Los ángulos se calculan automáticamente: α + β + γ = 180°
```

### Altura y Área

```tsx
<TriangleFigure
  vertices={[
    { x: 200, y: 40, label: 'A' },
    { x: 80, y: 220, label: 'B' },
    { x: 320, y: 220, label: 'C' },
  ]}
  sides={[
    {},
    {},
    { label: 'base' },
  ]}
  specialLines={[
    {
      type: 'altura',
      fromVertex: 0,
      strokeStyle: 'dashed',
      showLabel: true,
      showRightAngleMarker: true,
    },
  ]}
/>
```

### Medianas y Centroide

```tsx
<TriangleFigure
  vertices={[
    { x: 200, y: 50, label: 'A' },
    { x: 100, y: 220, label: 'B' },
    { x: 300, y: 220, label: 'C' },
  ]}
  specialLines={[
    { type: 'mediana', fromVertex: 0, strokeStyle: 'dashed' },
    { type: 'mediana', fromVertex: 1, strokeStyle: 'dashed' },
    { type: 'mediana', fromVertex: 2, strokeStyle: 'dashed' },
  ]}
/>
```

---

## Color Palette

| Elemento | Light Mode | Dark Mode |
|----------|-----------|-----------|
| Triangle fill | `fill-blue-200` | `fill-blue-800/50` |
| Triangle stroke | `stroke-blue-600` | `stroke-blue-400` |
| Angle arc | `stroke-amber-500` | `stroke-amber-400` |
| Special lines | `stroke-purple-500` | `stroke-purple-400` |
| Right angle marker | `stroke-red-500` | `stroke-red-400` |
| Grid | `stroke-gray-200` | `stroke-gray-700` |

---

## Debug Page

Para experimentar interactivamente con todas las opciones:

**URL:** `/admin/triangle-debug`

La página de debug permite:
- Seleccionar presets (equilátero, rectángulo, isósceles, escaleno)
- Ajustar posición de vértices con sliders
- Activar/desactivar opciones visuales
- Agregar líneas especiales (altura, mediana, bisectriz)
- Copiar el código generado

---

## Integration with Mini-Lessons

### In Step Components

```tsx
// En Step2Explore.tsx
import { TriangleFigure } from '@/components/figures/TriangleFigure';

export default function Step2Explore({ isActive }: LessonStepProps) {
  const [showAltura, setShowAltura] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <TriangleFigure
        vertices={[...]}
        specialLines={showAltura ? [{ type: 'altura', fromVertex: 0 }] : []}
      />
      <button onClick={() => setShowAltura(!showAltura)}>
        {showAltura ? 'Ocultar' : 'Mostrar'} altura
      </button>
    </div>
  );
}
```

### With Animation

```tsx
import { motion } from 'framer-motion';

// Wrap TriangleFigure in motion.div for animations
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  <TriangleFigure vertices={[...]} />
</motion.div>
```

---

## Utility Functions

Las funciones matemáticas están disponibles en `@/lib/geometry/triangleUtils`:

```typescript
import {
  distance,           // Distancia entre puntos
  midpoint,           // Punto medio
  centroid,           // Centroide del triángulo
  angleAtVertex,      // Ángulo en un vértice (grados)
  altitudeFootPoint,  // Pie de la altura
  findRightAngleVertex, // Encuentra vértice con ángulo recto
} from '@/lib/geometry/triangleUtils';
```
