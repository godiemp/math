/**
 * ============================================================================
 * LESSON TEMPLATES
 * ============================================================================
 *
 * Pre-built lesson templates for the builder.
 * Teachers can start from these templates and customize them via chat.
 */

import type { DynamicLesson, LessonTemplate } from './types';

/**
 * Complete example: Algebra - Factor Común
 * Based on the existing factor-comun lesson
 */
export const ALGEBRA_FACTOR_COMUN: DynamicLesson = {
  id: 'builder-alg-001',
  slug: 'factor-comun-ejemplo',
  title: 'Factor Común',
  description: 'Aprende a factorizar expresiones algebraicas usando el factor común',
  level: 'M1',
  subject: 'álgebra',
  thematicUnit: 'M1-ALG-002',
  skills: ['factorizacion', 'factor-comun'],
  estimatedMinutes: 15,
  steps: [
    {
      id: 'hook',
      type: 'hook',
      title: 'El Organizador de Cajas',
      content: {
        subtitle: 'Ana necesita organizar productos en cajas de forma eficiente...',
        scenario: {
          text: 'Ana trabaja en una tienda y debe organizar <strong class="text-amber-600">productos</strong> en cajas. Tiene <strong class="text-blue-600">5x manzanas</strong> y <strong class="text-green-600">15 naranjas</strong>.',
          visual: { type: 'emoji', content: '🍎🍊', size: 'text-4xl' },
          question: '¿Cuántas cajas necesita y qué hay en cada una?',
        },
        quiz: {
          reminder: 'Productos: $5x$ manzanas + $15$ naranjas',
          context: 'La expresión algebraica es: $5x + 15$. ¿Cómo podemos escribir esto usando cajas (paréntesis)?',
          options: ['5x + 15', 'x(5 + 15)', '5(x + 3)', '15(x + 1)'],
          correctIndex: 2,
        },
        result: {
          title: '¡Ana encontró el Factor Común!',
          breakdown: [
            '$5x$ + $15$',
            '↓ ambos son divisibles por 5',
            '= $5 \\cdot x$ + $5 \\cdot 3$',
            '↓ extraemos el 5',
            '$5(x + 3)$',
          ],
          bridge: {
            title: '¡Esto es Factorización por Factor Común!',
            concept: 'Cuando todos los términos comparten un factor, podemos "sacarlo" y dejarlo afuera del paréntesis.',
            formula: '$ax + ay = a(x + y)$',
            note: 'El factor común es el número o variable que se repite en TODOS los términos.',
          },
        },
      },
    },
    {
      id: 'explore',
      type: 'explore',
      title: 'Descubre el Patrón',
      content: {
        subtitle: 'Explora diferentes expresiones y encuentra su factor común',
        intro: {
          text: 'Haz clic en cada expresión para ver cómo se factoriza. Busca qué tienen en común los términos.',
        },
        examples: [
          { id: 'ex1', expression: '10x + 15', result: '5(2x + 3)', hint: 'MCD(10, 15) = 5' },
          { id: 'ex2', expression: 'x² + 5x', result: 'x(x + 5)', hint: 'Ambos tienen x' },
          { id: 'ex3', expression: '6a² + 9a', result: '3a(2a + 3)', hint: 'MCD = 3, variable común = a' },
          { id: 'ex4', expression: '4x³ + 8x² + 12x', result: '4x(x² + 2x + 3)', hint: 'Factor común: 4x' },
        ],
        summary: {
          title: '¡Patrón descubierto!',
          steps: [
            'Encuentra el MCD de los coeficientes',
            'Identifica las variables comunes (menor potencia)',
            'Divide cada término por el factor común',
            'Escribe: factor común × (términos divididos)',
          ],
        },
      },
    },
    {
      id: 'explain',
      type: 'explain',
      title: 'Tipos de Factor Común',
      content: {
        subtitle: 'Diferentes situaciones de factorización',
        tabs: [
          {
            id: 'numeric',
            title: 'Factor Numérico',
            shortTitle: 'Números',
            description: 'Cuando el factor común es solo un número (el MCD de los coeficientes)',
            formula: 'ax + ay = a(x + y)',
            example: {
              input: '15x + 25',
              steps: ['MCD(15, 25) = 5', '15x = 5 · 3x', '25 = 5 · 5', '5(3x + 5)'],
              result: '5(3x + 5)',
            },
            color: 'blue',
          },
          {
            id: 'variable',
            title: 'Factor Variable',
            shortTitle: 'Variables',
            description: 'Cuando el factor común es una variable (la menor potencia presente en todos)',
            formula: 'xⁿ + xᵐ = xᵐⁱⁿ(xⁿ⁻ᵐⁱⁿ + xᵐ⁻ᵐⁱⁿ)',
            example: {
              input: 'x³ + x² + x',
              steps: ['Variable común: x (menor potencia)', 'x³ = x · x²', 'x² = x · x', 'x = x · 1', 'x(x² + x + 1)'],
              result: 'x(x² + x + 1)',
            },
            color: 'purple',
          },
          {
            id: 'combined',
            title: 'Factor Combinado',
            shortTitle: 'Número + Variable',
            description: 'Cuando el factor común tiene número Y variable',
            formula: 'abx + acy = a(bx + cy)',
            example: {
              input: '12x² + 18x',
              steps: ['MCD(12, 18) = 6', 'Variable común: x (menor potencia)', 'Factor común: 6x', '12x² = 6x · 2x', '18x = 6x · 3', '6x(2x + 3)'],
              result: '6x(2x + 3)',
            },
            color: 'teal',
          },
          {
            id: 'polynomial',
            title: 'Factor Polinómico',
            shortTitle: 'Polinomios',
            description: 'Cuando el factor común es una expresión algebraica completa',
            formula: 'a(x+y) + b(x+y) = (x+y)(a+b)',
            example: {
              input: '3(x + 2) + x(x + 2)',
              steps: ['Factor común: (x + 2)', '3(x + 2) tiene factor (x + 2)', 'x(x + 2) tiene factor (x + 2)', '(x + 2)(3 + x)'],
              result: '(x + 2)(3 + x)',
            },
            color: 'pink',
          },
        ],
        tips: {
          correct: [
            'Siempre verifica dividiendo',
            'El MCD debe dividir a TODOS los términos',
            'Usa la menor potencia de variables',
            'Puedes verificar multiplicando de vuelta',
          ],
          errors: [
            'Olvidar un término al factorizar',
            'No extraer el factor completo',
            'Confundir suma con producto',
            'No verificar el resultado',
          ],
          insight: {
            title: 'Verificación rápida:',
            text: 'Para verificar tu factorización, multiplica el resultado. Si obtienes la expresión original, ¡está correcto!',
            example: '6x(2x + 3) = 6x · 2x + 6x · 3 = 12x² + 18x ✓',
          },
        },
      },
    },
    {
      id: 'practice',
      type: 'practice',
      title: 'Práctica Guiada',
      content: {
        subtitle: 'Factoriza las siguientes expresiones',
        badge: 'Factor Común',
        problems: [
          {
            id: 'p1',
            question: 'Factoriza: $10x + 15$',
            hint: 'El MCD de 10 y 15 es 5. Divide cada término entre 5.',
            options: ['5(x + 3)', '5(2x + 3)', '10(x + 1.5)', '5(2x + 15)'],
            correctAnswer: 1,
            explanation: '$10x + 15 = 5(2x) + 5(3) = 5(2x + 3)$. Verificación: $5 \\cdot 2x + 5 \\cdot 3 = 10x + 15$ ✓',
          },
          {
            id: 'p2',
            question: 'Factoriza: $x² + 5x$',
            hint: 'Ambos términos tienen la variable x. ¿Cuál es la menor potencia?',
            options: ['x(x + 5)', 'x²(1 + 5)', '5x(x + 1)', 'x(x² + 5)'],
            correctAnswer: 0,
            explanation: '$x² + 5x = x(x) + x(5) = x(x + 5)$. La menor potencia de x es x¹.',
          },
          {
            id: 'p3',
            question: 'Factoriza: $6a² + 9a$',
            hint: 'MCD de 6 y 9 es 3. Ambos términos tienen "a". Menor potencia de a es a¹.',
            options: ['3a(2a + 3)', '3(2a² + 3a)', 'a(6a + 9)', '6a(a + 1.5)'],
            correctAnswer: 0,
            explanation: '$6a² + 9a = 3a(2a) + 3a(3) = 3a(2a + 3)$. Factor común: 3a.',
          },
          {
            id: 'p4',
            question: 'Factoriza: $4x³ + 8x² + 12x$',
            hint: 'MCD(4,8,12) = 4. Todos tienen x, menor potencia es x¹.',
            options: ['4x(x² + 2x + 3)', '4(x³ + 2x² + 3x)', 'x(4x² + 8x + 12)', '2x(2x² + 4x + 6)'],
            correctAnswer: 0,
            explanation: '$4x³ + 8x² + 12x = 4x(x²) + 4x(2x) + 4x(3) = 4x(x² + 2x + 3)$.',
          },
        ],
        requiredCorrect: 3,
        resultMessages: {
          perfect: '¡Perfecto! Dominas la factorización',
          good: '¡Muy bien! Sigue así',
          needsPractice: '¡Sigue practicando!',
        },
      },
    },
    {
      id: 'verify',
      type: 'verify',
      title: 'Checkpoint Final',
      content: {
        questions: [
          {
            id: 'q1',
            question: '¿Cuál es el factor común de $12x + 18$?',
            options: ['2', '3', '6', '12'],
            correctAnswer: 2,
            explanation: 'El MCD de 12 y 18 es 6. Verificación: $12x + 18 = 6(2x + 3)$.',
          },
          {
            id: 'q2',
            question: 'Factoriza: $x³ + x²$',
            options: ['x(x² + x)', 'x²(x + 1)', 'x³(1 + x)', 'x(x³ + x²)'],
            correctAnswer: 1,
            explanation: '$x³ + x² = x²(x) + x²(1) = x²(x + 1)$. La menor potencia es x².',
          },
          {
            id: 'q3',
            question: 'Factoriza: $15a²b + 20ab²$',
            options: ['5ab(3a + 4b)', '5a(3ab + 4b²)', '5b(3a² + 4ab)', 'ab(15a + 20b)'],
            correctAnswer: 0,
            explanation: 'MCD = 5, variables comunes: a y b. Factor común: 5ab. Resultado: $5ab(3a + 4b)$.',
          },
          {
            id: 'q4',
            question: '¿Cuál es la factorización correcta de $2(x + 1) + y(x + 1)$?',
            options: ['(x + 1)(2 + y)', '2y(x + 1)', '(2 + y)(x + 1)', 'A y C son correctas'],
            correctAnswer: 3,
            explanation: 'El factor común es $(x + 1)$. Resultado: $(x + 1)(2 + y)$ o $(2 + y)(x + 1)$ - ambas son correctas.',
          },
        ],
        requiredCorrect: 3,
        successMessage: '¡Excelente! Dominas la factorización por factor común.',
        failureMessage: 'Repasa los conceptos y vuelve a intentar.',
      },
    },
  ],
};

/**
 * Starter template: Algebra (empty structure to fill)
 */
export const ALGEBRA_STARTER: DynamicLesson = {
  id: 'builder-starter-alg',
  slug: 'algebra-nueva',
  title: 'Nueva Lección de Álgebra',
  description: 'Describe tu lección aquí',
  level: 'M1',
  subject: 'álgebra',
  steps: [
    {
      id: 'hook',
      type: 'hook',
      title: 'Gancho',
      content: {
        subtitle: 'Una situación interesante para empezar...',
        scenario: {
          text: 'Describe un escenario de la vida real aquí.',
          visual: { type: 'emoji', content: '🔢', size: 'text-4xl' },
          question: '¿Cuál es la pregunta que plantea el escenario?',
        },
        quiz: {
          reminder: 'Recuerda el contexto...',
          options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
          correctIndex: 0,
        },
        result: {
          title: '¡El concepto revelado!',
          breakdown: ['Paso 1', 'Paso 2', 'Resultado'],
          bridge: {
            title: 'Conexión con el concepto',
            concept: 'Explica cómo esto se conecta con el tema matemático.',
          },
        },
      },
    },
    {
      id: 'explain',
      type: 'explain',
      title: 'Teoría',
      content: {
        subtitle: 'Los conceptos clave',
        tabs: [
          {
            id: 'concept1',
            title: 'Concepto 1',
            shortTitle: 'C1',
            description: 'Descripción del primer concepto',
            formula: 'fórmula aquí',
            example: {
              input: 'Entrada',
              steps: ['Paso 1', 'Paso 2'],
              result: 'Resultado',
            },
            color: 'blue',
          },
        ],
        tips: {
          correct: ['Buena práctica 1', 'Buena práctica 2'],
          errors: ['Error común 1', 'Error común 2'],
        },
      },
    },
    {
      id: 'practice',
      type: 'practice',
      title: 'Práctica',
      content: {
        problems: [
          {
            id: 'p1',
            question: 'Pregunta de práctica',
            hint: 'Pista para ayudar',
            options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
            correctAnswer: 0,
            explanation: 'Explicación de la respuesta.',
          },
        ],
      },
    },
    {
      id: 'verify',
      type: 'verify',
      title: 'Checkpoint',
      content: {
        questions: [
          {
            id: 'q1',
            question: 'Pregunta de verificación',
            options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
            correctAnswer: 0,
            explanation: 'Explicación.',
          },
        ],
        requiredCorrect: 1,
      },
    },
  ],
};

/**
 * Starter template: Números
 */
export const NUMEROS_STARTER: DynamicLesson = {
  ...ALGEBRA_STARTER,
  id: 'builder-starter-num',
  slug: 'numeros-nueva',
  title: 'Nueva Lección de Números',
  subject: 'números',
  // Reuse same steps structure
  steps: ALGEBRA_STARTER.steps,
};

/**
 * Starter template: Geometría
 */
export const GEOMETRIA_STARTER: DynamicLesson = {
  ...ALGEBRA_STARTER,
  id: 'builder-starter-geo',
  slug: 'geometria-nueva',
  title: 'Nueva Lección de Geometría',
  subject: 'geometría',
  // Reuse same steps structure
  steps: ALGEBRA_STARTER.steps,
};

/**
 * Starter template: Probabilidad
 */
export const PROBABILIDAD_STARTER: DynamicLesson = {
  ...ALGEBRA_STARTER,
  id: 'builder-starter-prob',
  slug: 'probabilidad-nueva',
  title: 'Nueva Lección de Probabilidad',
  subject: 'probabilidad',
  // Reuse same steps structure
  steps: ALGEBRA_STARTER.steps,
};

/**
 * All available templates
 */
export const LESSON_TEMPLATES: LessonTemplate[] = [
  {
    id: 'algebra-factor-comun',
    name: 'Factor Común (Completo)',
    description: 'Ejemplo completo de una lección de factorización',
    subject: 'álgebra',
    lesson: ALGEBRA_FACTOR_COMUN,
  },
  {
    id: 'algebra-starter',
    name: 'Álgebra (Vacío)',
    description: 'Plantilla básica para crear una lección de álgebra',
    subject: 'álgebra',
    lesson: ALGEBRA_STARTER,
  },
  {
    id: 'numeros-starter',
    name: 'Números (Vacío)',
    description: 'Plantilla básica para crear una lección de números',
    subject: 'números',
    lesson: NUMEROS_STARTER,
  },
  {
    id: 'geometria-starter',
    name: 'Geometría (Vacío)',
    description: 'Plantilla básica para crear una lección de geometría',
    subject: 'geometría',
    lesson: GEOMETRIA_STARTER,
  },
  {
    id: 'probabilidad-starter',
    name: 'Probabilidad (Vacío)',
    description: 'Plantilla básica para crear una lección de probabilidad',
    subject: 'probabilidad',
    lesson: PROBABILIDAD_STARTER,
  },
];

/**
 * Get template by ID
 */
export function getTemplateById(id: string): LessonTemplate | undefined {
  return LESSON_TEMPLATES.find(t => t.id === id);
}

/**
 * Get templates by subject
 */
export function getTemplatesBySubject(subject: string): LessonTemplate[] {
  return LESSON_TEMPLATES.filter(t => t.subject === subject);
}
