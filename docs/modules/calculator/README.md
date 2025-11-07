# Calculator Module

## Overview
The Calculator module is the computational engine of the PAES math app. It handles symbolic math, numerical calculations, equation solving, and step-by-step problem solving. This module is completely independent and can be developed as a standalone library.

---

## Responsibilities

- Parse and evaluate mathematical expressions
- Solve equations (linear, quadratic, systems, etc.)
- Perform algebraic manipulations
- Calculate derivatives and integrals
- Evaluate trigonometric and logarithmic functions
- Generate step-by-step solutions
- Validate student answers

---

## Module Independence

This module works **completely standalone**:
- Pure computational logic (no UI dependencies)
- Input: Mathematical expressions as strings
- Output: Results, solutions, and step-by-step explanations
- Can be tested via unit tests without any UI
- Exportable as npm package or Python library

---

## Technical Architecture

```
┌──────────────────────────────────────────────────┐
│             Calculator Module                     │
│                                                   │
│  ┌────────────────────────────────────────┐     │
│  │      Expression Parser                 │     │
│  │  • Tokenizer                           │     │
│  │  • Syntax Analyzer                     │     │
│  │  • AST Builder                         │     │
│  └────────────────────────────────────────┘     │
│                     │                            │
│                     ▼                            │
│  ┌────────────────────────────────────────┐     │
│  │      Computer Algebra System (CAS)     │     │
│  │  • Simplification Engine               │     │
│  │  • Equation Solver                     │     │
│  │  • Symbolic Math                       │     │
│  │  • Calculus Operations                 │     │
│  └────────────────────────────────────────┘     │
│                     │                            │
│                     ▼                            │
│  ┌────────────────────────────────────────┐     │
│  │      Solution Generator                │     │
│  │  • Step-by-step Explainer              │     │
│  │  • Multiple Solution Paths             │     │
│  │  • Verification Engine                 │     │
│  └────────────────────────────────────────┘     │
│                     │                            │
│                     ▼                            │
│  ┌────────────────────────────────────────┐     │
│  │      Answer Validation                 │     │
│  │  • Equivalence Checker                 │     │
│  │  • Partial Credit Logic                │     │
│  │  • Error Analysis                      │     │
│  └────────────────────────────────────────┘     │
└──────────────────────────────────────────────────┘
```

---

## Public API

### Basic Evaluation

```typescript
interface EvaluationResult {
  result: number | string;
  latex: string;
  steps?: Step[];
  error?: string;
}

// Evaluate a mathematical expression
function evaluate(expression: string): EvaluationResult;

// Examples:
evaluate('2 + 2');              // => { result: 4 }
evaluate('sqrt(16)');           // => { result: 4 }
evaluate('sin(pi/2)');          // => { result: 1 }
```

### Equation Solving

```typescript
interface Solution {
  variable: string;
  value: number | string;
  steps: Step[];
  verification?: boolean;
}

// Solve equations
function solveEquation(
  equation: string,
  variable?: string
): Solution[];

// Examples:
solveEquation('2x + 3 = 7', 'x');
// => [{ variable: 'x', value: 2, steps: [...] }]

solveEquation('x^2 - 5x + 6 = 0', 'x');
// => [{ variable: 'x', value: 2 }, { variable: 'x', value: 3 }]
```

### Algebraic Operations

```typescript
// Simplify expressions
function simplify(expression: string): SimplifyResult;

// Factor polynomials
function factor(expression: string): string;

// Expand expressions
function expand(expression: string): string;

// Examples:
simplify('2x + 3x + 5');        // => '5x + 5'
factor('x^2 - 4');              // => '(x-2)(x+2)'
expand('(x+2)(x-3)');           // => 'x^2 - x - 6'
```

### Calculus

```typescript
// Derivatives
function derivative(
  expression: string,
  variable: string
): CalculusResult;

// Integrals
function integrate(
  expression: string,
  variable: string,
  bounds?: [number, number]
): CalculusResult;

// Examples:
derivative('x^2 + 2x', 'x');    // => '2x + 2'
integrate('2x', 'x');           // => 'x^2 + C'
integrate('2x', 'x', [0, 5]);   // => 25
```

### Step-by-Step Solutions

```typescript
interface Step {
  expression: string;
  explanation: string;
  rule: string;
  latex: string;
}

interface DetailedSolution {
  problem: string;
  answer: string | number;
  steps: Step[];
  difficulty: number;
}

function solveWithSteps(
  problem: string,
  options?: SolveOptions
): DetailedSolution;

// Example:
solveWithSteps('2x + 3 = 7');
/*
{
  problem: '2x + 3 = 7',
  answer: 2,
  steps: [
    { expression: '2x + 3 = 7', explanation: 'Original equation', ... },
    { expression: '2x = 4', explanation: 'Subtract 3 from both sides', ... },
    { expression: 'x = 2', explanation: 'Divide both sides by 2', ... }
  ]
}
*/
```

### Answer Validation

```typescript
interface ValidationResult {
  isCorrect: boolean;
  equivalence: boolean;
  partialCredit?: number;
  feedback?: string;
  studentAnswer: string;
  correctAnswer: string;
}

function validateAnswer(
  studentAnswer: string,
  correctAnswer: string,
  options?: ValidationOptions
): ValidationResult;

// Examples:
validateAnswer('2', '2');           // exact match
validateAnswer('1/2', '0.5');       // equivalent forms
validateAnswer('x^2 - 4', '(x-2)(x+2)');  // algebraically equivalent
```

---

## Technology Options

### JavaScript/TypeScript

1. **Math.js** (Recommended)
   - Comprehensive math library
   - Expression parser included
   - Good documentation
   - Active community

2. **Algebrite**
   - Computer algebra system
   - Symbolic math
   - Smaller community

3. **Nerdamer**
   - Symbolic computation
   - LaTeX support
   - Lightweight

### Python (Alternative)

1. **SymPy**
   - Most powerful for symbolic math
   - Excellent documentation
   - Step-by-step solving
   - Expose via API

2. **SageMath**
   - Built on SymPy
   - More features
   - Heavier weight

---

## Development Phases

### Phase 1: Core Computation (Week 1)
- [ ] Set up development environment
- [ ] Integrate math library (Math.js)
- [ ] Implement expression parser
- [ ] Basic arithmetic operations
- [ ] Unit tests for core functions

### Phase 2: Equation Solving (Week 2)
- [ ] Linear equations
- [ ] Quadratic equations
- [ ] Systems of equations
- [ ] Inequalities
- [ ] Test with PAES problems

### Phase 3: Advanced Math (Week 3)
- [ ] Trigonometry functions
- [ ] Logarithms and exponentials
- [ ] Basic calculus (if needed for PAES)
- [ ] Statistics calculations
- [ ] Probability functions

### Phase 4: Step-by-Step Engine (Week 4)
- [ ] Build step generator
- [ ] Create explanation templates
- [ ] Multiple solution strategies
- [ ] Integration with renderer

### Phase 5: Validation System (Week 5)
- [ ] Equivalence checking
- [ ] Partial credit logic
- [ ] Common error detection
- [ ] Feedback generation

---

## PAES-Specific Functions

### Números (Numbers)

```typescript
// Fractions, decimals, percentages
function simplifyFraction(num: number, den: number): Fraction;
function toPercentage(decimal: number): string;
function lcm(numbers: number[]): number;
function gcd(numbers: number[]): number;
```

### Álgebra y Funciones (Algebra & Functions)

```typescript
// Function operations
function evaluateFunction(f: string, x: number): number;
function findDomain(f: string): Interval;
function findRange(f: string): Interval;
function composeFunctions(f: string, g: string): string;
```

### Geometría (Geometry)

```typescript
// Geometric calculations
function areaTriangle(base: number, height: number): number;
function volumeSphere(radius: number): number;
function pythagoreanTheorem(a: number, b: number): number;
function distanceBetweenPoints(p1: Point, p2: Point): number;
```

### Probabilidad y Estadística (Probability & Statistics)

```typescript
// Statistics
function mean(data: number[]): number;
function median(data: number[]): number;
function standardDeviation(data: number[]): number;

// Probability
function combination(n: number, r: number): number;
function permutation(n: number, r: number): number;
function probability(favorable: number, total: number): number;
```

---

## Testing Strategy

### Unit Tests

```typescript
describe('Calculator Module', () => {
  describe('Basic Operations', () => {
    test('evaluates simple addition', () => {
      expect(evaluate('2 + 2').result).toBe(4);
    });

    test('handles order of operations', () => {
      expect(evaluate('2 + 3 * 4').result).toBe(14);
    });
  });

  describe('Equation Solving', () => {
    test('solves linear equation', () => {
      const solution = solveEquation('2x + 3 = 7', 'x');
      expect(solution[0].value).toBe(2);
    });

    test('solves quadratic equation', () => {
      const solutions = solveEquation('x^2 - 5x + 6 = 0', 'x');
      expect(solutions).toHaveLength(2);
      expect(solutions.map(s => s.value)).toContain(2);
      expect(solutions.map(s => s.value)).toContain(3);
    });
  });

  describe('Answer Validation', () => {
    test('recognizes equivalent fractions', () => {
      const result = validateAnswer('1/2', '2/4');
      expect(result.equivalence).toBe(true);
    });

    test('handles decimal vs fraction', () => {
      const result = validateAnswer('0.5', '1/2');
      expect(result.isCorrect).toBe(true);
    });
  });
});
```

### Integration Tests

```typescript
describe('PAES Problem Solving', () => {
  test('solves complete PAES algebra problem', () => {
    const problem = "Si 3(x-2) = 15, entonces x = ?";
    const solution = solveWithSteps(problem);
    expect(solution.answer).toBe(7);
    expect(solution.steps.length).toBeGreaterThan(2);
  });
});
```

---

## Performance Considerations

- **Caching**: Memoize expensive calculations
- **Timeout**: Limit computation time for complex problems
- **Precision**: Handle floating point carefully
- **Memory**: Avoid memory leaks with large expressions

---

## Error Handling

```typescript
try {
  const result = evaluate('2 / 0');
} catch (error) {
  // Handle division by zero
  console.error('Math error:', error.message);
}

// Graceful degradation
function safeEvaluate(expression: string): EvaluationResult {
  try {
    return evaluate(expression);
  } catch (error) {
    return {
      result: null,
      latex: expression,
      error: 'Unable to evaluate expression'
    };
  }
}
```

---

## Dependencies

```json
{
  "mathjs": "^12.0.0",
  "fraction.js": "^4.3.0",
  "decimal.js": "^10.4.0"
}
```

---

## Deliverables

1. **Core Library**: `@paes-math/calculator`
2. **API Documentation**: Full TypeScript definitions
3. **Test Suite**: 90%+ coverage
4. **PAES Problem Set**: Tested against real PAES problems
5. **Performance Benchmarks**: Speed tests for common operations

---

## Integration with Other Modules

### With Math Renderer Module

```typescript
// Calculator solves, renderer displays
const solution = calculator.solveWithSteps('2x + 3 = 7');
solution.steps.forEach(step => {
  renderer.renderLatex(step.latex, element);
});
```

### With AI Module

```typescript
// AI asks calculator to verify student work
const studentWork = '2x + 3 = 7; x = 2';
const validation = calculator.validateAnswer(studentWork, '2');
ai.provideFeedback(validation);
```

### With Content Module

```typescript
// Content provides problem, calculator validates answer
const problem = content.getProblem(123);
const isCorrect = calculator.validateAnswer(
  userInput,
  problem.correctAnswer
);
```

---

## File Structure

```
calculator/
├── src/
│   ├── core/
│   │   ├── parser.ts
│   │   ├── evaluator.ts
│   │   └── simplifier.ts
│   ├── solvers/
│   │   ├── linear.ts
│   │   ├── quadratic.ts
│   │   ├── systems.ts
│   │   └── inequalities.ts
│   ├── advanced/
│   │   ├── calculus.ts
│   │   ├── trigonometry.ts
│   │   └── statistics.ts
│   ├── steps/
│   │   ├── step-generator.ts
│   │   └── explanations.ts
│   ├── validation/
│   │   ├── equivalence.ts
│   │   └── grading.ts
│   └── index.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── paes-problems/
├── package.json
└── README.md
```

---

## Next Steps for This Module

1. Choose math library (Math.js recommended)
2. Set up development environment with TypeScript
3. Implement expression parser and evaluator
4. Build equation solvers for PAES problem types
5. Create comprehensive test suite with PAES problems
6. Develop step-by-step explanation engine
