# Math Renderer Module

## Overview
The Math Renderer module handles all mathematical notation display, from simple expressions to complex equations. It's designed to be completely independent and can be developed/tested in isolation.

---

## Responsibilities

- Render LaTeX/MathML mathematical expressions
- Display mathematical formulas in web and mobile
- Handle interactive math elements (graphs, diagrams)
- Support equation editing and input
- Provide accessible math notation (screen readers)

---

## Module Independence

This module can work **completely standalone** by:
- Taking string input (LaTeX, MathML, or custom format)
- Rendering to DOM or canvas
- No dependencies on other app modules
- Exportable as separate npm package

---

## Technical Architecture

```
┌─────────────────────────────────────────┐
│         Math Renderer Module            │
│                                         │
│  ┌────────────────────────────────┐   │
│  │    Parser Layer                │   │
│  │  • LaTeX Parser                │   │
│  │  • MathML Parser               │   │
│  │  • AST Generator               │   │
│  └────────────────────────────────┘   │
│              │                         │
│              ▼                         │
│  ┌────────────────────────────────┐   │
│  │    Renderer Engine             │   │
│  │  • KaTeX/MathJax Integration   │   │
│  │  • SVG Generator               │   │
│  │  • Canvas Renderer             │   │
│  └────────────────────────────────┘   │
│              │                         │
│              ▼                         │
│  ┌────────────────────────────────┐   │
│  │    Interactive Components      │   │
│  │  • Graph Plotter               │   │
│  │  • Geometry Visualizer         │   │
│  │  • Step-by-step Animator       │   │
│  └────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

---

## Public API

### Core Rendering Functions

```typescript
// Render LaTeX to HTML
interface RenderOptions {
  displayMode?: boolean;
  throwOnError?: boolean;
  theme?: 'light' | 'dark';
  fontSize?: number;
}

function renderLatex(
  latex: string,
  element: HTMLElement,
  options?: RenderOptions
): void;

// Render inline expression
function renderInline(expression: string): string;

// Render block expression
function renderBlock(expression: string): string;
```

### Graph/Visualization

```typescript
interface GraphConfig {
  xRange: [number, number];
  yRange: [number, number];
  gridLines?: boolean;
  axes?: boolean;
}

function plotFunction(
  expression: string,
  element: HTMLElement,
  config: GraphConfig
): void;

function plotGeometry(
  shape: GeometryObject,
  element: HTMLElement
): void;
```

### Interactive Math Input

```typescript
interface MathInputConfig {
  initialValue?: string;
  onChange?: (latex: string) => void;
  toolbar?: boolean;
  symbols?: string[];
}

function createMathInput(
  element: HTMLElement,
  config: MathInputConfig
): MathInputInstance;
```

---

## Technology Options

### Rendering Libraries (Choose one or hybrid)

1. **KaTeX** (Recommended for speed)
   - Fast, no dependencies
   - Subset of LaTeX
   - Great for production

2. **MathJax**
   - Full LaTeX support
   - Larger bundle size
   - Better accessibility

3. **Custom Renderer**
   - Full control
   - More development time
   - Lightweight

### Graphing Libraries

1. **Desmos API**
2. **Function Plot**
3. **Recharts** (for data viz)
4. **D3.js** (custom visualizations)

### Interactive Input

1. **MathQuill**
2. **MathLive**
3. **Custom input component**

---

## Development Phases

### Phase 1: Basic Rendering (Week 1)
- [ ] Set up development environment
- [ ] Integrate KaTeX or MathJax
- [ ] Create basic render function
- [ ] Handle common PAES expressions
- [ ] Build demo page

### Phase 2: Interactive Components (Week 2)
- [ ] Function graphing
- [ ] Geometry visualizations
- [ ] Coordinate plane renderer
- [ ] Interactive sliders/parameters

### Phase 3: Math Input (Week 3)
- [ ] Equation editor
- [ ] Symbol toolbar
- [ ] Mobile touch support
- [ ] Copy/paste handling

### Phase 4: Advanced Features (Week 4+)
- [ ] Step-by-step animations
- [ ] Accessibility (ARIA, screen readers)
- [ ] Export to image/PDF
- [ ] Theming system
- [ ] Performance optimization

---

## Testing Strategy

### Unit Tests
```javascript
describe('Math Renderer', () => {
  test('renders simple quadratic equation', () => {
    const latex = 'x^2 + 2x + 1 = 0';
    const result = renderLatex(latex);
    expect(result).toContain('katex');
  });

  test('plots linear function', () => {
    const expr = 'y = 2x + 3';
    const canvas = plotFunction(expr, config);
    expect(canvas).toBeDefined();
  });
});
```

### Integration Tests
- Test with sample PAES problems
- Verify mobile rendering
- Check performance with complex expressions

### Visual Regression Tests
- Screenshot comparison for equations
- Graph rendering consistency

---

## Example Usage

```typescript
import { renderLatex, plotFunction } from '@paes-math/renderer';

// Render a quadratic formula
const formulaElement = document.getElementById('formula');
renderLatex('x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}', formulaElement, {
  displayMode: true,
  theme: 'light'
});

// Plot a parabola
const graphElement = document.getElementById('graph');
plotFunction('y = x^2 - 4x + 3', graphElement, {
  xRange: [-2, 6],
  yRange: [-2, 8],
  gridLines: true
});
```

---

## Performance Considerations

- **Lazy Loading**: Only load rendering engine when needed
- **Caching**: Cache rendered SVG/images
- **Code Splitting**: Separate graph renderer from text renderer
- **SSR Support**: Pre-render on server for faster initial load

---

## Accessibility

- Proper ARIA labels for math expressions
- Keyboard navigation for interactive graphs
- Screen reader compatible (MathML fallback)
- High contrast mode support
- Zoom support without breaking layout

---

## Dependencies

```json
{
  "katex": "^0.16.0",
  "function-plot": "^1.23.0",
  "mathlive": "^0.95.0"
}
```

---

## Deliverables

1. **Standalone Package**: `@paes-math/renderer`
2. **React Components**: Wrapper components for React
3. **Demo Site**: Showcase all rendering capabilities
4. **API Documentation**: Full TypeScript definitions
5. **Test Suite**: 80%+ coverage

---

## Integration with Other Modules

### With Calculator Module
```typescript
// Calculator provides expression, renderer displays it
const result = calculator.solve('2x + 3 = 7');
renderLatex(result.steps[0].expression, element);
```

### With AI Module
```typescript
// AI generates hint, renderer displays math notation
const hint = ai.getHint(problemId);
renderLatex(hint.mathExpression, hintElement);
```

### With Content Module
```typescript
// Content provides problem, renderer displays question
const problem = content.getProblem(id);
renderLatex(problem.question, questionElement);
plotFunction(problem.graphData, graphElement);
```

---

## File Structure

```
math-renderer/
├── src/
│   ├── core/
│   │   ├── parser.ts
│   │   ├── renderer.ts
│   │   └── config.ts
│   ├── components/
│   │   ├── LatexDisplay.tsx
│   │   ├── GraphPlot.tsx
│   │   ├── MathInput.tsx
│   │   └── GeometryCanvas.tsx
│   ├── utils/
│   │   ├── latex-helpers.ts
│   │   └── graph-utils.ts
│   └── index.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── visual/
├── demo/
│   └── index.html
├── package.json
└── README.md
```

---

## Next Steps for This Module

1. Choose rendering library (KaTeX vs MathJax)
2. Set up development environment
3. Create basic rendering examples
4. Build React component wrappers
5. Test with PAES math problems
