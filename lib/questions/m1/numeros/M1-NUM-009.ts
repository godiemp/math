import { Question } from '../../../types';

/**
 * M1-NUM-009: Notación de conjuntos y clasificación de números
 * Chilean PAES Curriculum - Numbers Subsection 009
 *
 * This subsection covers:
 * - A: Notación de conjuntos (∪, ∩, ', ⊂)
 * - B: Clasificación de números reales (ℕ, ℤ, ℚ, 𝕀, ℝ)
 * - C: Operaciones con conjuntos
 * - D: Diagramas de Venn
 * - E: Racionalizar denominadores
 *
 * Total: 20 questions
 */

export const m1Num009Questions: Question[] = [
  // ========================================
  // CLASIFICACIÓN DE NÚMEROS
  // ========================================
  {
    id: 'm1-num009-1',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    questionLatex: '\\text{¿A qué conjunto pertenece el número } \\sqrt{2}?',
    options: ['\\mathbb{N} \\text{ (Naturales)}', '\\mathbb{Z} \\text{ (Enteros)}', '\\mathbb{Q} \\text{ (Racionales)}', '\\mathbb{I} \\text{ (Irracionales)}'],
    correctAnswer: 3,
    explanation: '\\sqrt{2} \\text{ es irracional porque no puede expresarse como fracción de enteros}',
    difficulty: 'easy',
    skills: ['numeros-clasificacion', 'numeros-irracionales', 'numeros-conjuntos']
  },
  {
    id: 'm1-num009-2',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    questionLatex: '\\text{¿Cuál de los siguientes números es racional?}',
    options: ['\\sqrt{3}', '\\pi', '0.333...', '\\sqrt{5}'],
    correctAnswer: 2,
    explanation: '0.333... = \\frac{1}{3} \\text{ es racional (decimal periódico)}',
    difficulty: 'easy',
    skills: ['numeros-clasificacion', 'numeros-racionales', 'numeros-decimales']
  },
  {
    id: 'm1-num009-3',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    questionLatex: '\\text{La relación correcta entre los conjuntos numéricos es:}',
    options: ['\\mathbb{N} \\supset \\mathbb{Z}', '\\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}', '\\mathbb{Q} \\supset \\mathbb{R}', '\\mathbb{I} \\subset \\mathbb{Q}'],
    correctAnswer: 1,
    explanation: '\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}',
    difficulty: 'medium',
    skills: ['numeros-clasificacion', 'numeros-conjuntos']
  },
  {
    id: 'm1-num009-4',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    questionLatex: '\\text{¿Cuál de los siguientes números NO es un número real?}',
    options: ['-5', '\\sqrt{-4}', '\\frac{22}{7}', '0'],
    correctAnswer: 1,
    explanation: '\\sqrt{-4} \\text{ no es real (es imaginario), ya que no existe raíz cuadrada real de números negativos}',
    difficulty: 'medium',
    skills: ['numeros-clasificacion', 'numeros-reales']
  },
  {
    id: 'm1-num009-5',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    questionLatex: '\\text{El número } -7 \\text{ pertenece a:}',
    options: ['Solo \\mathbb{N}', 'Solo \\mathbb{Z}', '\\mathbb{Z}, \\mathbb{Q} \\text{ y } \\mathbb{R}', '\\mathbb{N}, \\mathbb{Z}, \\mathbb{Q} \\text{ y } \\mathbb{R}'],
    correctAnswer: 2,
    explanation: '-7 \\in \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}, \\text{ pero } -7 \\notin \\mathbb{N}',
    difficulty: 'medium',
    skills: ['numeros-clasificacion', 'numeros-enteros', 'numeros-conjuntos']
  },
  // ========================================
  // NOTACIÓN DE CONJUNTOS
  // ========================================
  {
    id: 'm1-num009-6',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: 'A \\cup B',
    questionLatex: '\\text{Si } A = \\{1, 2, 3\\} \\text{ y } B = \\{3, 4, 5\\}, \\text{ ¿cuál es } A \\cup B?',
    options: ['\\{3\\}', '\\{1, 2, 3, 4, 5\\}', '\\{1, 2, 4, 5\\}', '\\{1, 2, 3, 3, 4, 5\\}'],
    correctAnswer: 1,
    explanation: 'A \\cup B = \\{1, 2, 3, 4, 5\\} \\text{ (todos los elementos de A o B)}',
    difficulty: 'easy',
    skills: ['numeros-conjuntos', 'numeros-union']
  },
  {
    id: 'm1-num009-7',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: 'A \\cap B',
    questionLatex: '\\text{Si } A = \\{1, 2, 3, 4\\} \\text{ y } B = \\{3, 4, 5, 6\\}, \\text{ ¿cuál es } A \\cap B?',
    options: ['\\{1, 2, 5, 6\\}', '\\{3, 4\\}', '\\{1, 2, 3, 4, 5, 6\\}', '\\emptyset'],
    correctAnswer: 1,
    explanation: 'A \\cap B = \\{3, 4\\} \\text{ (elementos que están en A y en B)}',
    difficulty: 'easy',
    skills: ['numeros-conjuntos', 'numeros-interseccion']
  },
  {
    id: 'm1-num009-8',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: 'A\'',
    questionLatex: '\\text{Si el universo es } U = \\{1, 2, 3, 4, 5\\} \\text{ y } A = \\{1, 3, 5\\}, \\text{ ¿cuál es } A\' \\text{ (complemento de A)?}',
    options: ['\\{1, 3, 5\\}', '\\{2, 4\\}', '\\{1, 2, 3, 4, 5\\}', '\\emptyset'],
    correctAnswer: 1,
    explanation: 'A\' = U - A = \\{2, 4\\} \\text{ (elementos de U que no están en A)}',
    difficulty: 'easy',
    skills: ['numeros-conjuntos', 'numeros-complemento']
  },
  {
    id: 'm1-num009-9',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: 'A - B',
    questionLatex: '\\text{Si } A = \\{1, 2, 3, 4\\} \\text{ y } B = \\{3, 4, 5\\}, \\text{ ¿cuál es } A - B \\text{ (diferencia)?}',
    options: ['\\{1, 2\\}', '\\{3, 4\\}', '\\{5\\}', '\\{1, 2, 5\\}'],
    correctAnswer: 0,
    explanation: 'A - B = \\{1, 2\\} \\text{ (elementos de A que no están en B)}',
    difficulty: 'medium',
    skills: ['numeros-conjuntos', 'numeros-diferencia']
  },
  {
    id: 'm1-num009-10',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: 'n(A \\cup B) = n(A) + n(B) - n(A \\cap B)',
    questionLatex: '\\text{Si } n(A) = 15, n(B) = 10 \\text{ y } n(A \\cap B) = 5, \\text{ ¿cuántos elementos tiene } A \\cup B?',
    options: ['15', '20', '25', '30'],
    correctAnswer: 1,
    explanation: 'n(A \\cup B) = 15 + 10 - 5 = 20',
    difficulty: 'medium',
    skills: ['numeros-conjuntos', 'numeros-cardinalidad', 'numeros-operaciones-basicas']
  },
  // ========================================
  // DIAGRAMAS DE VENN
  // ========================================
  {
    id: 'm1-num009-11',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    questionLatex: '\\text{En un diagrama de Venn, la intersección } A \\cap B \\text{ corresponde a:}',
    options: ['La región fuera de ambos círculos', 'La región donde se superponen los círculos', 'Todo el círculo A', 'Todo el círculo B'],
    correctAnswer: 1,
    explanation: '\\text{La intersección es la región común a ambos conjuntos (donde se superponen)}',
    difficulty: 'easy',
    skills: ['numeros-conjuntos', 'numeros-diagramas-venn']
  },
  {
    id: 'm1-num009-12',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    questionLatex: '\\text{En una encuesta, 40 personas hablan inglés, 30 hablan francés y 15 hablan ambos idiomas. ¿Cuántas personas hablan al menos uno de los dos idiomas?}',
    options: ['45', '55', '70', '85'],
    correctAnswer: 1,
    explanation: 'n(I \\cup F) = 40 + 30 - 15 = 55',
    difficulty: 'medium',
    skills: ['numeros-conjuntos', 'numeros-diagramas-venn', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-num009-13',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    questionLatex: '\\text{De 100 estudiantes: 60 estudian matemáticas, 50 estudian física, y 20 estudian ambas. ¿Cuántos no estudian ninguna?}',
    options: ['10', '20', '30', '40'],
    correctAnswer: 0,
    explanation: '\\text{Al menos una} = 60 + 50 - 20 = 90. \\text{ Ninguna} = 100 - 90 = 10',
    difficulty: 'hard',
    skills: ['numeros-conjuntos', 'numeros-diagramas-venn', 'numeros-operaciones-basicas']
  },
  // ========================================
  // SUBCONJUNTOS Y RELACIONES
  // ========================================
  {
    id: 'm1-num009-14',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: 'A \\subset B',
    questionLatex: '\\text{Si } A = \\{2, 4\\} \\text{ y } B = \\{1, 2, 3, 4, 5\\}, \\text{ entonces:}',
    options: ['B \\subset A', 'A \\subset B', 'A = B', 'A \\cap B = \\emptyset'],
    correctAnswer: 1,
    explanation: 'A \\subset B \\text{ porque todos los elementos de A están en B}',
    difficulty: 'easy',
    skills: ['numeros-conjuntos', 'numeros-subconjuntos']
  },
  {
    id: 'm1-num009-15',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    questionLatex: '\\text{¿Cuántos subconjuntos tiene el conjunto } A = \\{a, b, c\\}?',
    options: ['3', '6', '8', '9'],
    correctAnswer: 2,
    explanation: '\\text{Un conjunto con n elementos tiene } 2^n \\text{ subconjuntos. } 2^3 = 8',
    difficulty: 'hard',
    skills: ['numeros-conjuntos', 'numeros-subconjuntos', 'numeros-potencias']
  },
  // ========================================
  // RACIONALIZAR DENOMINADORES
  // ========================================
  {
    id: 'm1-num009-16',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '\\frac{1}{\\sqrt{2}}',
    questionLatex: '\\text{Racionaliza } \\frac{1}{\\sqrt{2}}:',
    options: ['\\frac{1}{2}', '\\frac{\\sqrt{2}}{2}', '\\frac{2}{\\sqrt{2}}', '\\sqrt{2}'],
    correctAnswer: 1,
    explanation: '\\frac{1}{\\sqrt{2}} = \\frac{1}{\\sqrt{2}} \\cdot \\frac{\\sqrt{2}}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}',
    difficulty: 'medium',
    skills: ['numeros-raices', 'numeros-racionalizacion', 'numeros-fracciones']
  },
  {
    id: 'm1-num009-17',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '\\frac{6}{\\sqrt{3}}',
    questionLatex: '\\text{Racionaliza } \\frac{6}{\\sqrt{3}}:',
    options: ['2\\sqrt{3}', '3\\sqrt{2}', '\\frac{6\\sqrt{3}}{3}', '2\\sqrt{3}'],
    correctAnswer: 0,
    explanation: '\\frac{6}{\\sqrt{3}} = \\frac{6\\sqrt{3}}{3} = 2\\sqrt{3}',
    difficulty: 'medium',
    skills: ['numeros-raices', 'numeros-racionalizacion', 'numeros-fracciones']
  },
  {
    id: 'm1-num009-18',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '\\frac{3}{\\sqrt{5} - 2}',
    questionLatex: '\\text{Racionaliza } \\frac{3}{\\sqrt{5} - 2} \\text{ usando el conjugado:}',
    options: ['3(\\sqrt{5} + 2)', '3\\sqrt{5} + 6', '\\frac{3}{\\sqrt{5} + 2}', '3\\sqrt{5} - 6'],
    correctAnswer: 0,
    explanation: '\\frac{3}{\\sqrt{5}-2} \\cdot \\frac{\\sqrt{5}+2}{\\sqrt{5}+2} = \\frac{3(\\sqrt{5}+2)}{5-4} = 3(\\sqrt{5}+2)',
    difficulty: 'hard',
    skills: ['numeros-raices', 'numeros-racionalizacion', 'algebra-productos-notables']
  },
  // ========================================
  // PROPIEDADES DE NÚMEROS REALES
  // ========================================
  {
    id: 'm1-num009-19',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    questionLatex: '\\text{La suma de un número racional y un número irracional es:}',
    options: ['Siempre racional', 'Siempre irracional', 'Puede ser racional o irracional', 'Siempre entero'],
    correctAnswer: 1,
    explanation: '\\text{Racional + Irracional = Irracional (siempre)}',
    difficulty: 'medium',
    skills: ['numeros-clasificacion', 'numeros-racionales', 'numeros-irracionales']
  },
  {
    id: 'm1-num009-20',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    questionLatex: '\\text{El producto de dos números irracionales:}',
    options: ['Siempre es irracional', 'Siempre es racional', 'Puede ser racional o irracional', 'Siempre es entero'],
    correctAnswer: 2,
    explanation: '\\text{Ejemplo: } \\sqrt{2} \\times \\sqrt{2} = 2 \\text{ (racional), pero } \\sqrt{2} \\times \\sqrt{3} = \\sqrt{6} \\text{ (irracional)}',
    difficulty: 'hard',
    skills: ['numeros-clasificacion', 'numeros-irracionales', 'numeros-operaciones']
  }
];
