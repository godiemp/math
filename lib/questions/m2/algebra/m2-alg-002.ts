import { Question } from '../../../types';

/**
 * M2-ALG-002: Función potencia: representación gráfica
 *
 * Subsections:
 * A. Funciones potencia con exponente entero
 *    Habilidades: funcion-potencia-entero
 * B. Funciones potencia con exponente fraccionario
 *    Habilidades: funcion-potencia-fraccionario
 * C. Gráficos de funciones potencia
 *    Habilidades: funcion-potencia-grafica
 * D. Análisis de dominio y recorrido
 *    Habilidades: funcion-potencia-dominio-recorrido
 */

export const m2Alg002Questions: Question[] = [
  {
    id: 'm2-alg-pot-1',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{¿Cuál es el valor de } f(4) \\text{ si } f(x) = x^3?',
    options: ['$12$', '$16$', '$64$', '$81$'],
    optionsLatex: ['12', '16', '64', '81'],
    correctAnswer: 2,
    explanation: 'Sustituimos x = 4 en la función: f(4) = 4³ = 64',
    explanationLatex: 'f(4) = 4^3 = 64',
    difficulty: 'easy',
    skills: ['funcion-potencia-exponente-entero', 'algebra-funcion-potencia', 'algebra-evaluacion-funciones', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-pot-2',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{Si } f(x) = x^{-2}, \\text{ ¿cuál es el valor de } f(2)?',
    options: ['$-4$', '$\\frac{1}{4}$', '$4$', '$-\\frac{1}{4}$'],
    optionsLatex: ['-4', '\\frac{1}{4}', '4', '-\\frac{1}{4}'],
    correctAnswer: 1,
    explanation: 'Un exponente negativo indica el recíproco: f(2) = 2⁻² = 1/(2²) = 1/4',
    explanationLatex: 'f(2) = 2^{-2} = \\frac{1}{2^2} = \\frac{1}{4}',
    difficulty: 'medium',
    skills: ['funcion-potencia-exponente-entero', 'algebra-funcion-potencia', 'algebra-evaluacion-funciones', 'numeros-exponentes-negativos', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-pot-3',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{¿Cuál es el dominio de la función } f(x) = x^{1/2}?',
    options: ['Todos los números reales', 'Solo números positivos', 'Números no negativos $(x \\geq 0)$', 'Números negativos'],
    optionsLatex: ['\\text{Todos los números reales}', '\\text{Solo números positivos}', 'x \\geq 0', '\\text{Números negativos}'],
    correctAnswer: 2,
    explanation: 'La función raíz cuadrada (exponente 1/2) solo está definida para números no negativos',
    explanationLatex: 'f(x) = x^{1/2} = \\sqrt{x} \\text{ requiere } x \\geq 0',
    difficulty: 'medium',
    skills: ['funcion-potencia-dominio-recorrido', 'funcion-potencia-exponente-fraccionario', 'algebra-funcion-potencia', 'algebra-dominio-funciones', 'numeros-raices', 'numeros-reales']
  },
  {
    id: 'm2-alg-pot-4',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{Si } f(x) = x^{2/3}, \\text{ ¿cuál es el valor de } f(8)?',
    options: ['$2$', '$4$', '$8$', '$16$'],
    optionsLatex: ['2', '4', '8', '16'],
    correctAnswer: 1,
    explanation: 'f(8) = 8^(2/3) = (∛8)² = 2² = 4',
    explanationLatex: 'f(8) = 8^{2/3} = (\\sqrt[3]{8})^2 = 2^2 = 4',
    difficulty: 'hard',
    skills: ['funcion-potencia-exponente-fraccionario', 'algebra-funcion-potencia', 'algebra-evaluacion-funciones', 'numeros-exponentes-fraccionarios', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-alg-pot-5',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{¿Cuál función tiene gráfica que decrece en todo su dominio?}',
    options: ['$f(x) = x^2$', '$f(x) = x^{-1}$ para $x > 0$', '$f(x) = x^3$', '$f(x) = x^{1/2}$'],
    optionsLatex: ['f(x) = x^2', 'f(x) = x^{-1} \\text{ para } x > 0', 'f(x) = x^3', 'f(x) = x^{1/2}'],
    correctAnswer: 1,
    explanation: 'Las funciones con exponente negativo decrecen. Para x > 0, f(x) = x⁻¹ = 1/x decrece',
    explanationLatex: 'f(x) = x^{-1} = \\frac{1}{x} \\text{ decrece para } x > 0',
    difficulty: 'hard',
    skills: ['funcion-potencia-graficos', 'algebra-funcion-potencia', 'algebra-grafica-funciones', 'algebra-crecimiento-decrecimiento', 'algebra-analisis-funciones']
  },
  {
    id: 'm2-alg-pot-6',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{El recorrido de } f(x) = x^4 \\text{ para } x \\in \\mathbb{R} \\text{ es:}',
    options: ['Todos los números reales', 'Números positivos', 'Números no negativos', 'Números negativos'],
    optionsLatex: ['\\mathbb{R}', 'x > 0', 'x \\geq 0', 'x < 0'],
    correctAnswer: 2,
    explanation: 'Cualquier número elevado a una potencia par es no negativo. x⁴ ≥ 0 para todo x',
    explanationLatex: 'x^4 \\geq 0 \\text{ para todo } x \\in \\mathbb{R}',
    difficulty: 'medium',
    skills: ['funcion-potencia-dominio-recorrido', 'funcion-potencia-exponente-entero', 'algebra-funcion-potencia', 'algebra-recorrido-funciones', 'numeros-potencias', 'algebra-analisis-funciones']
  },
  {
    id: 'm2-alg-pot-7',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    questionLatex: '\\text{Si } f(x) = x^{-3} \\text{ y } f(a) = \\frac{1}{27}, \\text{ ¿cuál es } a?',
    options: ['$3$', '$-3$', '$9$', '$\\frac{1}{3}$'],
    optionsLatex: ['3', '-3', '9', '\\frac{1}{3}'],
    correctAnswer: 0,
    explanation: 'a⁻³ = 1/27 = 1/3³. Por lo tanto, a³ = 27, entonces a = 3',
    explanationLatex: 'a^{-3} = \\frac{1}{27} \\rightarrow a^3 = 27 \\rightarrow a = 3',
    difficulty: 'hard',
    skills: ['funcion-potencia-exponente-entero', 'algebra-funcion-potencia', 'algebra-ecuaciones', 'algebra-despeje', 'numeros-exponentes-negativos', 'numeros-raices', 'numeros-operaciones-basicas']
  }
];
