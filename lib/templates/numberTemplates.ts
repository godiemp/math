/**
 * Number and Proportionality Templates
 *
 * Templates for arithmetic, fractions, percentages, ratios, and number operations
 */

import {
  ProblemTemplate,
  randomInt,
  randomChoice,
  randomIntNonZero,
  generateWrongAnswers,
  shuffle,
  gcd,
  simplifyFraction,
  formatFraction,
} from '../problemTemplates';

// ============================================================================
// FRACTION ADDITION TEMPLATES
// ============================================================================

export const fractionAdditionSameDenominator: ProblemTemplate = {
  id: 'frac-add-same-den',
  name: 'Fraction Addition - Same Denominator',
  subject: 'números',
  level: 'M1',
  difficulty: 'easy',
  topic: 'Números y Proporcionalidad',
  tags: ['fractions', 'addition', 'basic'],

  variables: {
    num1: () => randomInt(1, 10),
    num2: () => randomInt(1, 10),
    den: () => randomInt(2, 12),
  },

  questionGenerator: (vars) => ({
    question: `¿Cuánto es ${vars.num1}/${vars.den} + ${vars.num2}/${vars.den}?`,
    questionLatex: `¿Cuánto es $${formatFraction(vars.num1, vars.den, true)} + ${formatFraction(vars.num2, vars.den, true)}$?`,
  }),

  answerCalculator: (vars) => {
    const num = vars.num1 + vars.num2;
    const simplified = simplifyFraction(num, vars.den);
    return simplified;
  },

  optionGenerator: (vars, correctAnswer) => {
    const { num, den } = correctAnswer;

    // Generate wrong answers
    const wrong = [
      { num: vars.num1 + vars.num2, den: vars.den * 2 }, // Wrong: added denominators
      { num: vars.num1 + vars.num2, den: vars.den }, // Wrong: didn't simplify
      { num: vars.num1 * vars.num2, den: vars.den }, // Wrong: multiplied numerators
    ];

    // Create options
    const allOptions = [
      { num, den },
      ...wrong.slice(0, 3),
    ];

    const shuffled = shuffle(allOptions);
    const correctIndex = shuffled.findIndex(opt => opt.num === num && opt.den === den);

    return {
      options: shuffled.map(opt => formatFraction(opt.num, opt.den, false)),
      optionsLatex: shuffled.map(opt => formatFraction(opt.num, opt.den, true)),
      correctIndex,
    };
  },

  explanationGenerator: (vars, answer) => {
    const { num, den } = answer;
    const sum = vars.num1 + vars.num2;

    let explanation = `Para sumar fracciones con el mismo denominador, sumamos los numeradores: ${vars.num1} + ${vars.num2} = ${sum}. `;

    if (sum !== num || vars.den !== den) {
      explanation += `Simplificando ${sum}/${vars.den} = ${formatFraction(num, den)}.`;
    } else {
      explanation += `La respuesta es ${formatFraction(num, den)}.`;
    }

    return {
      explanation,
      explanationLatex: explanation,
    };
  },
};

export const fractionAdditionDifferentDenominator: ProblemTemplate = {
  id: 'frac-add-diff-den',
  name: 'Fraction Addition - Different Denominators',
  subject: 'números',
  level: 'M1',
  difficulty: 'medium',
  topic: 'Números y Proporcionalidad',
  tags: ['fractions', 'addition', 'lcm'],

  variables: {
    num1: () => randomInt(1, 8),
    den1: () => randomInt(2, 8),
    num2: () => randomInt(1, 8),
    den2: () => randomInt(2, 8),
  },

  validator: (vars) => {
    // Ensure denominators are different and manageable
    return vars.den1 !== vars.den2 && vars.den1 * vars.den2 <= 100;
  },

  questionGenerator: (vars) => ({
    question: `¿Cuánto es ${vars.num1}/${vars.den1} + ${vars.num2}/${vars.den2}?`,
    questionLatex: `¿Cuánto es $${formatFraction(vars.num1, vars.den1, true)} + ${formatFraction(vars.num2, vars.den2, true)}$?`,
  }),

  answerCalculator: (vars) => {
    // Common denominator
    const commonDen = vars.den1 * vars.den2;
    const newNum1 = vars.num1 * vars.den2;
    const newNum2 = vars.num2 * vars.den1;
    const sumNum = newNum1 + newNum2;

    return simplifyFraction(sumNum, commonDen);
  },

  optionGenerator: (vars, correctAnswer) => {
    const { num, den } = correctAnswer;

    const wrong = [
      simplifyFraction(vars.num1 + vars.num2, vars.den1 + vars.den2), // Wrong: added both
      simplifyFraction(vars.num1 + vars.num2, vars.den1), // Wrong: kept first denominator
      simplifyFraction(vars.num1 * vars.den2 + vars.num2, vars.den1 * vars.den2), // Wrong: forgot to multiply num1
    ];

    const allOptions = [{ num, den }, ...wrong];
    const shuffled = shuffle(allOptions);
    const correctIndex = shuffled.findIndex(opt => opt.num === num && opt.den === den);

    return {
      options: shuffled.map(opt => formatFraction(opt.num, opt.den, false)),
      optionsLatex: shuffled.map(opt => formatFraction(opt.num, opt.den, true)),
      correctIndex,
    };
  },

  explanationGenerator: (vars, answer) => {
    const { num, den } = answer;
    const commonDen = vars.den1 * vars.den2;
    const newNum1 = vars.num1 * vars.den2;
    const newNum2 = vars.num2 * vars.den1;

    return {
      explanation: `Para sumar fracciones con diferente denominador, buscamos un denominador común. ` +
        `Multiplicamos: ${vars.num1}/${vars.den1} × ${vars.den2}/${vars.den2} = ${newNum1}/${commonDen} y ` +
        `${vars.num2}/${vars.den2} × ${vars.den1}/${vars.den1} = ${newNum2}/${commonDen}. ` +
        `Sumamos: ${newNum1}/${commonDen} + ${newNum2}/${commonDen} = ${newNum1 + newNum2}/${commonDen} = ${formatFraction(num, den)}.`,
    };
  },
};

// ============================================================================
// PERCENTAGE TEMPLATES
// ============================================================================

export const percentageOfNumber: ProblemTemplate = {
  id: 'percent-of-number',
  name: 'Calculate Percentage of a Number',
  subject: 'números',
  level: 'M1',
  difficulty: 'easy',
  topic: 'Números y Proporcionalidad',
  tags: ['percentage', 'multiplication'],

  variables: {
    percent: () => randomChoice([10, 15, 20, 25, 30, 40, 50, 60, 75, 80]),
    number: () => randomInt(20, 200),
  },

  questionGenerator: (vars) => ({
    question: `¿Cuánto es el ${vars.percent}% de ${vars.number}?`,
  }),

  answerCalculator: (vars) => {
    return (vars.number * vars.percent) / 100;
  },

  optionGenerator: (vars, correctAnswer) => {
    const wrong = generateWrongAnswers(correctAnswer, 3, 'custom', () => {
      const strategies = [
        () => vars.number / vars.percent, // Common mistake
        () => vars.number + vars.percent, // Wrong operation
        () => vars.number * (vars.percent / 10), // Decimal error
      ];
      return randomChoice(strategies)();
    });

    const allOptions = [correctAnswer, ...wrong];
    const shuffled = shuffle(allOptions);
    const correctIndex = shuffled.indexOf(correctAnswer);

    return {
      options: shuffled.map(n => n.toString()),
      correctIndex,
    };
  },

  explanationGenerator: (vars, answer) => ({
    explanation: `Para calcular el ${vars.percent}% de ${vars.number}, multiplicamos: ${vars.number} × ${vars.percent}/100 = ${vars.number} × ${vars.percent / 100} = ${answer}.`,
  }),
};

export const discountProblem: ProblemTemplate = {
  id: 'discount-problem',
  name: 'Calculate Price After Discount',
  subject: 'números',
  level: 'M1',
  difficulty: 'medium',
  topic: 'Números y Proporcionalidad',
  tags: ['percentage', 'discount', 'word-problem'],

  variables: {
    originalPrice: () => randomInt(50, 500) * 10, // Multiples of 10
    discountPercent: () => randomChoice([10, 15, 20, 25, 30, 40, 50]),
    item: () => randomChoice([
      'un televisor',
      'una bicicleta',
      'un computador',
      'unos zapatos',
      'un teléfono',
      'una mochila',
    ]),
  },

  questionGenerator: (vars) => ({
    question: `${vars.item.charAt(0).toUpperCase() + vars.item.slice(1)} cuesta $${vars.originalPrice}. Si tiene un descuento del ${vars.discountPercent}%, ¿cuál es el precio final?`,
  }),

  answerCalculator: (vars) => {
    const discount = (vars.originalPrice * vars.discountPercent) / 100;
    return vars.originalPrice - discount;
  },

  optionGenerator: (vars, correctAnswer) => {
    const discount = (vars.originalPrice * vars.discountPercent) / 100;

    const wrong = [
      discount, // Wrong: calculated discount instead of final price
      vars.originalPrice + discount, // Wrong: added instead of subtracted
      vars.originalPrice - (vars.originalPrice / vars.discountPercent), // Wrong formula
    ];

    const allOptions = [correctAnswer, ...wrong];
    const shuffled = shuffle(allOptions);
    const correctIndex = shuffled.indexOf(correctAnswer);

    return {
      options: shuffled.map(n => `$${n}`),
      correctIndex,
    };
  },

  explanationGenerator: (vars, answer) => {
    const discount = (vars.originalPrice * vars.discountPercent) / 100;
    return {
      explanation: `El descuento es: $${vars.originalPrice} × ${vars.discountPercent}% = $${vars.originalPrice} × ${vars.discountPercent / 100} = $${discount}. ` +
        `El precio final es: $${vars.originalPrice} - $${discount} = $${answer}.`,
    };
  },
};

// ============================================================================
// RATIO AND PROPORTION TEMPLATES
// ============================================================================

export const simpleRatio: ProblemTemplate = {
  id: 'simple-ratio',
  name: 'Simple Ratio Problem',
  subject: 'números',
  level: 'M1',
  difficulty: 'medium',
  topic: 'Números y Proporcionalidad',
  tags: ['ratio', 'proportion', 'word-problem'],

  variables: {
    ratio1: () => randomInt(1, 5),
    ratio2: () => randomInt(1, 5),
    total: () => randomInt(20, 100),
    item1: () => randomChoice(['manzanas', 'libros', 'estudiantes', 'lápices']),
    item2: () => randomChoice(['naranjas', 'cuadernos', 'profesores', 'borradores']),
  },

  validator: (vars) => {
    // Ensure total is divisible by sum of ratios
    return vars.total % (vars.ratio1 + vars.ratio2) === 0;
  },

  questionGenerator: (vars) => ({
    question: `En una bolsa hay ${vars.item1} y ${vars.item2} en una razón de ${vars.ratio1}:${vars.ratio2}. Si hay ${vars.total} objetos en total, ¿cuántos ${vars.item1} hay?`,
  }),

  answerCalculator: (vars) => {
    const parts = vars.ratio1 + vars.ratio2;
    return (vars.total / parts) * vars.ratio1;
  },

  optionGenerator: (vars, correctAnswer) => {
    const parts = vars.ratio1 + vars.ratio2;
    const item2Count = (vars.total / parts) * vars.ratio2;

    const wrong = [
      item2Count, // Wrong: calculated item2 instead
      vars.ratio1, // Wrong: just the ratio number
      (vars.total * vars.ratio1) / vars.ratio2, // Wrong formula
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
    const parts = vars.ratio1 + vars.ratio2;
    return {
      explanation: `La razón ${vars.ratio1}:${vars.ratio2} significa que por cada ${parts} objetos, ${vars.ratio1} son ${vars.item1}. ` +
        `Hay ${vars.total}/${parts} = ${vars.total / parts} grupos. Por lo tanto, hay ${vars.total / parts} × ${vars.ratio1} = ${answer} ${vars.item1}.`,
    };
  },
};

// ============================================================================
// EXPORT ALL TEMPLATES
// ============================================================================

export const numberTemplates: ProblemTemplate[] = [
  fractionAdditionSameDenominator,
  fractionAdditionDifferentDenominator,
  percentageOfNumber,
  discountProblem,
  simpleRatio,
];
