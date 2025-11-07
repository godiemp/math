/**
 * Algebra and Functions Templates
 *
 * Templates for equations, functions, polynomials, and algebraic expressions
 */

import {
  ProblemTemplate,
  randomInt,
  randomChoice,
  randomIntNonZero,
  generateWrongAnswers,
  shuffle,
} from '../problemTemplates';

// ============================================================================
// LINEAR EQUATION TEMPLATES
// ============================================================================

export const simpleLinearEquation: ProblemTemplate = {
  id: 'linear-eq-simple',
  name: 'Simple Linear Equation: ax + b = c',
  subject: 'álgebra',
  level: 'M1',
  difficulty: 'easy',
  topic: 'Álgebra y Funciones',
  tags: ['equation', 'linear', 'one-variable'],

  variables: {
    a: () => randomIntNonZero(-10, 10),
    b: () => randomInt(-20, 20),
    c: () => randomInt(-20, 20),
  },

  validator: (vars) => {
    // Ensure solution is an integer
    return (vars.c - vars.b) % vars.a === 0;
  },

  questionGenerator: (vars) => {
    const bSign = vars.b >= 0 ? '+' : '';
    return {
      question: `Resuelve la ecuación: ${vars.a}x ${bSign} ${vars.b} = ${vars.c}`,
      questionLatex: `Resuelve la ecuación: $${vars.a}x ${bSign} ${vars.b} = ${vars.c}$`,
    };
  },

  answerCalculator: (vars) => {
    return (vars.c - vars.b) / vars.a;
  },

  optionGenerator: (vars, correctAnswer) => {
    const wrong = [
      (vars.c + vars.b) / vars.a, // Wrong: added instead of subtracted
      (vars.c - vars.b), // Wrong: forgot to divide by a
      vars.c / vars.a - vars.b, // Wrong: incorrect order of operations
    ];

    const allOptions = [correctAnswer, ...wrong];
    const shuffled = shuffle(allOptions);
    const correctIndex = shuffled.indexOf(correctAnswer);

    return {
      options: shuffled.map(n => `x = ${n}`),
      optionsLatex: shuffled.map(n => `$x = ${n}$`),
      correctIndex,
    };
  },

  explanationGenerator: (vars, answer) => {
    const step1 = vars.c - vars.b;
    const bSign = vars.b >= 0 ? '+' : '';
    return {
      explanation: `Para resolver ${vars.a}x ${bSign} ${vars.b} = ${vars.c}:\n` +
        `1. Restamos ${vars.b} de ambos lados: ${vars.a}x = ${step1}\n` +
        `2. Dividimos por ${vars.a}: x = ${step1}/${vars.a} = ${answer}`,
      explanationLatex: `Para resolver $${vars.a}x ${bSign} ${vars.b} = ${vars.c}$:\n\n` +
        `1. Restamos $${vars.b}$ de ambos lados: $${vars.a}x = ${step1}$\n\n` +
        `2. Dividimos por $${vars.a}$: $x = \\frac{${step1}}{${vars.a}} = ${answer}$`,
    };
  },
};

export const linearEquationTwoSteps: ProblemTemplate = {
  id: 'linear-eq-two-steps',
  name: 'Two-Step Linear Equation with Variables on Both Sides',
  subject: 'álgebra',
  level: 'M1',
  difficulty: 'medium',
  topic: 'Álgebra y Funciones',
  tags: ['equation', 'linear', 'two-steps'],

  variables: {
    a: () => randomIntNonZero(2, 8),
    b: () => randomInt(-15, 15),
    c: () => randomIntNonZero(1, 6),
    d: () => randomInt(-15, 15),
  },

  validator: (vars) => {
    // Ensure a ≠ c (so we can solve)
    const diff = vars.a - vars.c;
    if (diff === 0) return false;
    // Ensure solution is an integer
    return (vars.d - vars.b) % diff === 0;
  },

  questionGenerator: (vars) => {
    const bSign = vars.b >= 0 ? '+' : '';
    const dSign = vars.d >= 0 ? '+' : '';
    return {
      question: `Resuelve la ecuación: ${vars.a}x ${bSign} ${vars.b} = ${vars.c}x ${dSign} ${vars.d}`,
      questionLatex: `Resuelve la ecuación: $${vars.a}x ${bSign} ${vars.b} = ${vars.c}x ${dSign} ${vars.d}$`,
    };
  },

  answerCalculator: (vars) => {
    return (vars.d - vars.b) / (vars.a - vars.c);
  },

  optionGenerator: (vars, correctAnswer) => {
    const wrong = generateWrongAnswers(correctAnswer, 3, 'arithmetic');

    const allOptions = [correctAnswer, ...wrong];
    const shuffled = shuffle(allOptions);
    const correctIndex = shuffled.indexOf(correctAnswer);

    return {
      options: shuffled.map(n => `x = ${n}`),
      optionsLatex: shuffled.map(n => `$x = ${n}$`),
      correctIndex,
    };
  },

  explanationGenerator: (vars, answer) => {
    const diff = vars.a - vars.c;
    const constDiff = vars.d - vars.b;
    return {
      explanation: `1. Agrupamos las x: ${vars.a}x - ${vars.c}x = ${vars.d} - ${vars.b}\n` +
        `2. Simplificamos: ${diff}x = ${constDiff}\n` +
        `3. Dividimos: x = ${constDiff}/${diff} = ${answer}`,
    };
  },
};

// ============================================================================
// QUADRATIC EQUATION TEMPLATES
// ============================================================================

export const quadraticFactorable: ProblemTemplate = {
  id: 'quadratic-factorable',
  name: 'Factorable Quadratic Equation',
  subject: 'álgebra',
  level: 'M2',
  difficulty: 'medium',
  topic: 'Álgebra y Funciones',
  tags: ['equation', 'quadratic', 'factoring'],

  variables: {
    root1: () => randomInt(-8, 8),
    root2: () => randomInt(-8, 8),
  },

  validator: (vars) => {
    // Ensure roots are different
    return vars.root1 !== vars.root2;
  },

  questionGenerator: (vars) => {
    // Expand (x - root1)(x - root2) = x² - (root1 + root2)x + root1*root2
    const b = -(vars.root1 + vars.root2);
    const c = vars.root1 * vars.root2;

    const bSign = b >= 0 ? '+' : '';
    const cSign = c >= 0 ? '+' : '';

    return {
      question: `¿Cuáles son las soluciones de x² ${bSign} ${b}x ${cSign} ${c} = 0?`,
      questionLatex: `¿Cuáles son las soluciones de $x^2 ${bSign} ${b}x ${cSign} ${c} = 0$?`,
    };
  },

  answerCalculator: (vars) => {
    return { root1: vars.root1, root2: vars.root2 };
  },

  optionGenerator: (vars, correctAnswer) => {
    const { root1, root2 } = correctAnswer;
    const sorted = [root1, root2].sort((a, b) => a - b);

    const wrong = [
      { r1: -root1, r2: -root2 }, // Wrong: negated roots
      { r1: root1 + 1, r2: root2 + 1 }, // Wrong: off by one
      { r1: root1, r2: -root2 }, // Wrong: one negated
    ];

    const formatRoots = (r1: number, r2: number) => {
      const s = [r1, r2].sort((a, b) => a - b);
      return `x = ${s[0]}, x = ${s[1]}`;
    };

    const allOptions = [
      formatRoots(root1, root2),
      ...wrong.map(w => formatRoots(w.r1, w.r2)),
    ];

    const shuffled = shuffle(allOptions);
    const correctIndex = shuffled.indexOf(formatRoots(root1, root2));

    return {
      options: shuffled,
      correctIndex,
    };
  },

  explanationGenerator: (vars, answer) => {
    const { root1, root2 } = answer;
    const b = -(root1 + root2);
    const c = root1 * root2;

    return {
      explanation: `Factorizamos: x² ${b >= 0 ? '+' : ''} ${b}x ${c >= 0 ? '+' : ''} ${c} = (x - ${root1})(x - ${root2}) = 0\n` +
        `Las soluciones son: x = ${root1} y x = ${root2}`,
    };
  },
};

// ============================================================================
// FUNCTION EVALUATION TEMPLATES
// ============================================================================

export const linearFunctionEvaluation: ProblemTemplate = {
  id: 'func-linear-eval',
  name: 'Evaluate Linear Function',
  subject: 'álgebra',
  level: 'M1',
  difficulty: 'easy',
  topic: 'Álgebra y Funciones',
  tags: ['function', 'evaluation', 'linear'],

  variables: {
    m: () => randomIntNonZero(-8, 8),
    b: () => randomInt(-10, 10),
    x: () => randomInt(-5, 5),
  },

  questionGenerator: (vars) => {
    const bSign = vars.b >= 0 ? '+' : '';
    return {
      question: `Si f(x) = ${vars.m}x ${bSign} ${vars.b}, ¿cuál es el valor de f(${vars.x})?`,
      questionLatex: `Si $f(x) = ${vars.m}x ${bSign} ${vars.b}$, ¿cuál es el valor de $f(${vars.x})$?`,
    };
  },

  answerCalculator: (vars) => {
    return vars.m * vars.x + vars.b;
  },

  optionGenerator: (vars, correctAnswer) => {
    const wrong = [
      vars.m + vars.x + vars.b, // Wrong: added instead of multiplied
      vars.m * vars.x - vars.b, // Wrong: subtracted b
      vars.m * vars.b + vars.x, // Wrong: mixed up variables
    ];

    const allOptions = [correctAnswer, ...wrong];
    const shuffled = shuffle(allOptions);
    const correctIndex = shuffled.indexOf(correctAnswer);

    return {
      options: shuffled.map(n => n.toString()),
      correctIndex,
    };
  },

  explanationGenerator: (vars, answer) => {
    return {
      explanation: `Sustituimos x = ${vars.x} en la función: f(${vars.x}) = ${vars.m}(${vars.x}) ${vars.b >= 0 ? '+' : ''} ${vars.b} = ${vars.m * vars.x} ${vars.b >= 0 ? '+' : ''} ${vars.b} = ${answer}`,
    };
  },
};

export const quadraticFunctionEvaluation: ProblemTemplate = {
  id: 'func-quadratic-eval',
  name: 'Evaluate Quadratic Function',
  subject: 'álgebra',
  level: 'M1',
  difficulty: 'medium',
  topic: 'Álgebra y Funciones',
  tags: ['function', 'evaluation', 'quadratic'],

  variables: {
    a: () => randomIntNonZero(-5, 5),
    b: () => randomInt(-8, 8),
    c: () => randomInt(-10, 10),
    x: () => randomInt(-4, 4),
  },

  questionGenerator: (vars) => {
    const bSign = vars.b >= 0 ? '+' : '';
    const cSign = vars.c >= 0 ? '+' : '';
    return {
      question: `Si f(x) = ${vars.a}x² ${bSign} ${vars.b}x ${cSign} ${vars.c}, ¿cuál es el valor de f(${vars.x})?`,
      questionLatex: `Si $f(x) = ${vars.a}x^2 ${bSign} ${vars.b}x ${cSign} ${vars.c}$, ¿cuál es el valor de $f(${vars.x})$?`,
    };
  },

  answerCalculator: (vars) => {
    return vars.a * vars.x * vars.x + vars.b * vars.x + vars.c;
  },

  optionGenerator: (vars, correctAnswer) => {
    const wrong = generateWrongAnswers(correctAnswer, 3, 'nearby');

    const allOptions = [correctAnswer, ...wrong];
    const shuffled = shuffle(allOptions);
    const correctIndex = shuffled.indexOf(correctAnswer);

    return {
      options: shuffled.map(n => n.toString()),
      correctIndex,
    };
  },

  explanationGenerator: (vars, answer) => {
    const x2 = vars.x * vars.x;
    const ax2 = vars.a * x2;
    const bx = vars.b * vars.x;
    return {
      explanation: `Sustituimos x = ${vars.x}: f(${vars.x}) = ${vars.a}(${vars.x})² ${vars.b >= 0 ? '+' : ''} ${vars.b}(${vars.x}) ${vars.c >= 0 ? '+' : ''} ${vars.c} = ${vars.a}(${x2}) ${vars.b >= 0 ? '+' : ''} ${bx} ${vars.c >= 0 ? '+' : ''} ${vars.c} = ${ax2} ${bx >= 0 ? '+' : ''} ${bx} ${vars.c >= 0 ? '+' : ''} ${vars.c} = ${answer}`,
    };
  },
};

// ============================================================================
// SYSTEM OF EQUATIONS TEMPLATES
// ============================================================================

export const systemOfLinearEquations2x2: ProblemTemplate = {
  id: 'system-2x2-simple',
  name: 'System of 2 Linear Equations',
  subject: 'álgebra',
  level: 'M2',
  difficulty: 'medium',
  topic: 'Álgebra y Funciones',
  tags: ['system', 'linear', 'two-variables'],

  variables: {
    x: () => randomInt(-5, 5),
    y: () => randomInt(-5, 5),
    a1: () => randomIntNonZero(1, 5),
    b1: () => randomIntNonZero(1, 5),
    a2: () => randomIntNonZero(1, 5),
    b2: () => randomIntNonZero(1, 5),
  },

  validator: (vars) => {
    // Ensure unique solution (not parallel lines)
    return vars.a1 * vars.b2 !== vars.a2 * vars.b1;
  },

  questionGenerator: (vars) => {
    // Calculate c1 and c2 based on solution
    const c1 = vars.a1 * vars.x + vars.b1 * vars.y;
    const c2 = vars.a2 * vars.x + vars.b2 * vars.y;

    return {
      question: `Resuelve el sistema:\n${vars.a1}x + ${vars.b1}y = ${c1}\n${vars.a2}x + ${vars.b2}y = ${c2}`,
      questionLatex: `Resuelve el sistema:\n\n$${vars.a1}x + ${vars.b1}y = ${c1}$\n\n$${vars.a2}x + ${vars.b2}y = ${c2}$`,
    };
  },

  answerCalculator: (vars) => {
    return { x: vars.x, y: vars.y };
  },

  optionGenerator: (vars, correctAnswer) => {
    const wrong = [
      { x: vars.y, y: vars.x }, // Wrong: swapped x and y
      { x: vars.x + 1, y: vars.y }, // Wrong: off by one
      { x: -vars.x, y: vars.y }, // Wrong: negated x
    ];

    const allOptions = [
      correctAnswer,
      ...wrong,
    ];

    const shuffled = shuffle(allOptions);
    const correctIndex = shuffled.findIndex(opt => opt.x === vars.x && opt.y === vars.y);

    return {
      options: shuffled.map(opt => `x = ${opt.x}, y = ${opt.y}`),
      correctIndex,
    };
  },

  explanationGenerator: (vars, answer) => {
    return {
      explanation: `La solución del sistema es x = ${vars.x} y y = ${vars.y}. Puedes verificar sustituyendo estos valores en ambas ecuaciones.`,
    };
  },
};

// ============================================================================
// EXPORT ALL TEMPLATES
// ============================================================================

export const algebraTemplates: ProblemTemplate[] = [
  simpleLinearEquation,
  linearEquationTwoSteps,
  quadraticFactorable,
  linearFunctionEvaluation,
  quadraticFunctionEvaluation,
  systemOfLinearEquations2x2,
];
