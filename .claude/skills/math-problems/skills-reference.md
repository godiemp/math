# Skills Taxonomy Reference

All skills are defined in `lib/skillTaxonomy.ts`. Every question MUST reference valid skills from this file.

---

## Quick Lookup by Subject

### NUMEROS (Numbers)

#### Legacy Skills (Most Common)
```
numeros-porcentajes              # Percentages
numeros-porcentajes-descuentos   # Discount calculations
numeros-proporcionalidad         # Proportionality
numeros-proporcionalidad-directa # Direct proportion
numeros-proporcionalidad-inversa # Inverse proportion
numeros-potencias                # Powers
numeros-potencias-propiedades    # Power properties
numeros-raices                   # Square roots
numeros-mcd-mcm                  # GCD and LCM
```

#### Comprehension Skills
```
numeros-enteros-comprender-significado        # Understanding integers
numeros-racionales-comprender-significado     # Understanding rationals
numeros-identificar-contextos                 # Numbers in context
numeros-representar-recta-numerica            # Number line representation
numeros-valor-absoluto                        # Absolute value
numeros-equivalencia-fracciones               # Equivalent fractions
numeros-relacionar-fraccion-decimal-porcentaje # Fraction/decimal/percent
numeros-signo-direccion                       # Sign as direction
numeros-fracciones-periodicas                 # Repeating decimals
numeros-fracciones-impropias-mixtos           # Improper fractions/mixed
```

#### Basic Operations
```
numeros-enteros-sumar-restar                     # Add/subtract integers
numeros-enteros-multiplicar-dividir              # Multiply/divide integers
numeros-fracciones-sumar-restar-mismo-denominador      # Same denominator
numeros-fracciones-sumar-restar-distinto-denominador   # Different denominator
numeros-fracciones-multiplicar-dividir           # Multiply/divide fractions
numeros-decimales-sumar-restar                   # Add/subtract decimals
numeros-decimales-multiplicar-dividir            # Multiply/divide decimals
numeros-jerarquia-operaciones                    # Order of operations
numeros-simplificar-fracciones                   # Simplify fractions
```

#### Comparison & Order
```
numeros-enteros-ordenar-recta                   # Order on number line
numeros-fracciones-comparar-mismo-denominador   # Compare same denominator
numeros-fracciones-comparar-distinto-denominador # Compare diff denominator
numeros-decimales-comparar                      # Compare decimals
numeros-convertir-para-comparar                 # Convert to compare
```

---

### ALGEBRA

#### Core Skills
```
algebra-expresiones             # Algebraic expressions
algebra-terminos-semejantes     # Like terms
algebra-ecuaciones-lineales     # Linear equations
algebra-despeje                 # Variable isolation
algebra-funciones               # Functions
algebra-evaluacion-funciones    # Function evaluation
algebra-funciones-lineales      # Linear functions
algebra-pendiente               # Slope
algebra-factorizacion           # Factoring
algebra-diferencia-cuadrados    # Difference of squares
algebra-expansion               # Expansion
algebra-propiedad-distributiva  # Distributive property
algebra-desigualdades           # Inequalities
```

#### M2 Advanced
```
algebra-sistemas-ecuaciones     # Systems of equations
algebra-metodo-sustitucion      # Substitution method
algebra-metodo-eliminacion      # Elimination method
algebra-ecuaciones-cuadraticas  # Quadratic equations
algebra-factorizacion-cuadratica # Quadratic factoring
algebra-discriminante           # Discriminant
algebra-formula-cuadratica      # Quadratic formula
```

---

### GEOMETRIA

#### Core Skills
```
geometria-perimetro             # Perimeter
geometria-area                  # Area
geometria-volumen               # Volume
geometria-triangulos            # Triangles
geometria-pitagoras             # Pythagorean theorem
geometria-area-triangulo        # Triangle area
geometria-circulos              # Circles
geometria-area-circulo          # Circle area
geometria-rectangulos           # Rectangles
geometria-cuadrados             # Squares
geometria-trapecio              # Trapezoid
geometria-angulos               # Angles
geometria-angulos-complementarios  # Complementary (sum 90°)
geometria-angulos-suplementarios   # Supplementary (sum 180°)
geometria-angulos-adyacentes    # Adjacent angles
geometria-plano-cartesiano      # Cartesian plane
geometria-distancia             # Distance between points
geometria-volumen-cubo          # Cube volume
```

#### M2 Advanced
```
geometria-volumen-cilindro       # Cylinder volume
geometria-rectas-perpendiculares # Perpendicular lines
geometria-pendiente-perpendicular # Perpendicular slopes
geometria-ley-cosenos           # Law of cosines
```

---

### PROBABILIDAD (Probability & Statistics)

#### Probability
```
probabilidad-basica             # Basic probability
probabilidad-casos-favorables   # Favorable/possible cases
probabilidad-eventos-compuestos # Compound events
```

#### Statistics
```
estadistica-media               # Mean/average
estadistica-mediana             # Median
estadistica-moda                # Mode
estadistica-rango               # Range
estadistica-porcentajes         # Percentages in data
```

#### M2 Advanced
```
estadistica-cuartiles           # Quartiles Q1, Q2, Q3
estadistica-rango-intercuartilico # Interquartile range (IQR)
probabilidad-combinatoria       # Combinatorics
probabilidad-combinaciones      # Combinations C(n,r)
probabilidad-factorial          # Factorial
```

---

## Skill Selection Guidelines

### 1. Primary Skill First
The main concept being tested should be listed first.

### 2. Include Supporting Skills
List 1-4 additional skills used in solving the problem.

### 3. Common Combinations

#### Algebra + Numbers
```typescript
skills: ['algebra-expresiones', 'algebra-terminos-semejantes', 'numeros-enteros-sumar-restar']
```

#### Geometry + Numbers
```typescript
skills: ['geometria-pitagoras', 'geometria-triangulos', 'numeros-raices', 'numeros-potencias']
```

#### Statistics + Probability
```typescript
skills: ['estadistica-media', 'probabilidad-basica', 'numeros-fracciones-sumar-restar-mismo-denominador']
```

---

## Example Skill Assignments

### Pythagorean Theorem Question
```typescript
skills: [
  'geometria-pitagoras',      // Primary: main concept
  'geometria-triangulos',     // Related geometry
  'numeros-raices',           // Need square root
  'numeros-potencias'         // Need squares
]
```

### Linear Equation Word Problem
```typescript
skills: [
  'algebra-ecuaciones-lineales', // Primary: solving equation
  'algebra-despeje',             // Variable isolation
  'numeros-enteros-sumar-restar' // Basic operations
]
```

### Probability with Fractions
```typescript
skills: [
  'probabilidad-basica',        // Primary: probability
  'probabilidad-casos-favorables', // Counting cases
  'numeros-fracciones-simplificar' // Simplify result
]
```

### Percentage Discount
```typescript
skills: [
  'numeros-porcentajes',          // Primary: percentages
  'numeros-porcentajes-descuentos', // Discount application
  'numeros-decimales-multiplicar-dividir' // Calculations
]
```

---

## Validation

To verify a skill exists:

```bash
# Search in skillTaxonomy.ts
grep "algebra-expresiones" lib/skillTaxonomy.ts
```

Or check the exported `SKILLS` object in `lib/skillTaxonomy.ts`.

---

## Parent-Child Relationships

Some skills have parent skills (indicated by `parentSkill` in the taxonomy):

| Child Skill | Parent Skill |
|-------------|--------------|
| `algebra-terminos-semejantes` | `algebra-expresiones` |
| `algebra-despeje` | `algebra-ecuaciones-lineales` |
| `geometria-pitagoras` | `geometria-triangulos` |
| `geometria-area-circulo` | `geometria-circulos` |
| `probabilidad-casos-favorables` | `probabilidad-basica` |

When using a child skill, you generally don't need to also list the parent (it's implied).
