/**
 * Probability and Statistics Templates
 *
 * Templates for probability, combinations, permutations, statistics
 */

import {
  ProblemTemplate,
  randomInt,
  randomChoice,
  shuffle,
} from '../problemTemplates';

// ============================================================================
// BASIC PROBABILITY TEMPLATES
// ============================================================================

export const coinFlipProbability: ProblemTemplate = {
  id: 'prob-coin-flip',
  name: 'Coin Flip Probability',
  subject: 'probabilidad',
  level: 'M1',
  difficulty: 'easy',
  topic: 'Probabilidad y Estadística',
  tags: ['probability', 'coin', 'basic'],

  variables: {
    flips: () => randomChoice([1, 2, 3]),
    outcome: () => randomChoice(['todas caras', 'todas sellos', 'al menos una cara']),
  },

  questionGenerator: (vars) => ({
    question: `Si lanzas ${vars.flips === 1 ? 'una moneda' : `${vars.flips} monedas`}, ¿cuál es la probabilidad de obtener ${vars.outcome}?`,
  }),

  answerCalculator: (vars) => {
    const totalOutcomes = Math.pow(2, vars.flips);

    if (vars.outcome === 'todas caras' || vars.outcome === 'todas sellos') {
      return { numerator: 1, denominator: totalOutcomes };
    } else if (vars.outcome === 'al menos una cara') {
      // All outcomes except all tails
      return { numerator: totalOutcomes - 1, denominator: totalOutcomes };
    }
    return { numerator: 1, denominator: totalOutcomes };
  },

  optionGenerator: (vars, correctAnswer) => {
    const { numerator, denominator } = correctAnswer;

    const wrong = [
      { num: 1, den: 2 }, // Wrong: single coin probability
      { num: numerator, den: denominator * 2 }, // Wrong: doubled denominator
      { num: vars.flips, den: denominator }, // Wrong: used flips as numerator
    ];

    const allOptions = [
      { num: numerator, den: denominator },
      ...wrong.slice(0, 3),
    ];

    const shuffled = shuffle(allOptions);
    const correctIndex = shuffled.findIndex(opt => opt.num === numerator && opt.den === denominator);

    return {
      options: shuffled.map(opt => `${opt.num}/${opt.den}`),
      correctIndex,
    };
  },

  explanationGenerator: (vars, answer) => {
    const { numerator, denominator } = answer;
    const totalOutcomes = Math.pow(2, vars.flips);

    return {
      explanation: `Con ${vars.flips === 1 ? 'una moneda' : `${vars.flips} monedas`}, hay ${totalOutcomes} resultados posibles. ` +
        `Para ${vars.outcome}, hay ${numerator} resultado(s) favorable(s). La probabilidad es ${numerator}/${denominator}.`,
    };
  },
};

export const diceProbability: ProblemTemplate = {
  id: 'prob-dice-single',
  name: 'Single Die Probability',
  subject: 'probabilidad',
  level: 'M1',
  difficulty: 'easy',
  topic: 'Probabilidad y Estadística',
  tags: ['probability', 'dice'],

  variables: {
    target: () => randomChoice([
      { desc: 'un número par', count: 3 },
      { desc: 'un número impar', count: 3 },
      { desc: 'un número mayor que 4', count: 2 },
      { desc: 'un número menor que 3', count: 2 },
      { desc: 'el número 5', count: 1 },
    ]),
  },

  questionGenerator: (vars) => ({
    question: `Si lanzas un dado de 6 caras, ¿cuál es la probabilidad de obtener ${vars.target.desc}?`,
  }),

  answerCalculator: (vars) => {
    return { numerator: vars.target.count, denominator: 6 };
  },

  optionGenerator: (vars, correctAnswer) => {
    const { numerator, denominator } = correctAnswer;

    // Simplify if possible
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(numerator, denominator);
    const simplifiedNum = numerator / divisor;
    const simplifiedDen = denominator / divisor;

    const wrong = [
      { num: 1, den: 6 }, // Generic probability
      { num: 6 - numerator, den: 6 }, // Complement
      { num: numerator, den: 12 }, // Wrong: doubled denominator
    ];

    const allOptions = [
      { num: simplifiedNum, den: simplifiedDen },
      ...wrong.filter(w => !(w.num === simplifiedNum && w.den === simplifiedDen)).slice(0, 3),
    ];

    const shuffled = shuffle(allOptions);
    const correctIndex = shuffled.findIndex(opt => opt.num === simplifiedNum && opt.den === simplifiedDen);

    return {
      options: shuffled.map(opt => `${opt.num}/${opt.den}`),
      correctIndex,
    };
  },

  explanationGenerator: (vars, answer) => {
    const { numerator, denominator } = answer;
    return {
      explanation: `Un dado tiene 6 caras. Para obtener ${vars.target.desc}, hay ${vars.target.count} resultado(s) favorable(s). La probabilidad es ${vars.target.count}/6${numerator !== vars.target.count ? ` = ${numerator}/${denominator}` : ''}.`,
    };
  },
};

export const twoDiceSumProbability: ProblemTemplate = {
  id: 'prob-two-dice-sum',
  name: 'Two Dice Sum Probability',
  subject: 'probabilidad',
  level: 'M1',
  difficulty: 'medium',
  topic: 'Probabilidad y Estadística',
  tags: ['probability', 'dice', 'compound'],

  variables: {
    targetSum: () => randomChoice([2, 3, 7, 11, 12]),
  },

  questionGenerator: (vars) => ({
    question: `Si lanzas dos dados, ¿cuál es la probabilidad de que la suma sea ${vars.targetSum}?`,
  }),

  answerCalculator: (vars) => {
    // Count ways to get target sum
    let count = 0;
    for (let i = 1; i <= 6; i++) {
      for (let j = 1; j <= 6; j++) {
        if (i + j === vars.targetSum) count++;
      }
    }
    return { numerator: count, denominator: 36 };
  },

  optionGenerator: (vars, correctAnswer) => {
    const { numerator, denominator } = correctAnswer;

    const wrong = [
      { num: 1, den: 6 }, // Wrong: single die probability
      { num: 1, den: 11 }, // Wrong: 11 possible sums (2-12)
      { num: 2, den: 36 }, // Generic wrong answer
    ];

    const allOptions = [
      { num: numerator, den: denominator },
      ...wrong.filter(w => !(w.num === numerator && w.den === denominator)).slice(0, 3),
    ];

    const shuffled = shuffle(allOptions);
    const correctIndex = shuffled.findIndex(opt => opt.num === numerator && opt.den === denominator);

    return {
      options: shuffled.map(opt => `${opt.num}/${opt.den}`),
      correctIndex,
    };
  },

  explanationGenerator: (vars, answer) => {
    const { numerator } = answer;

    const ways: { [key: number]: string } = {
      2: '(1,1)',
      3: '(1,2), (2,1)',
      7: '(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)',
      11: '(5,6), (6,5)',
      12: '(6,6)',
    };

    return {
      explanation: `Hay 36 resultados posibles al lanzar dos dados (6×6). Para obtener suma ${vars.targetSum}, las combinaciones son: ${ways[vars.targetSum]}. Eso da ${numerator} forma(s). La probabilidad es ${numerator}/36.`,
    };
  },
};

export const drawingFromBag: ProblemTemplate = {
  id: 'prob-drawing-bag',
  name: 'Drawing from a Bag',
  subject: 'probabilidad',
  level: 'M1',
  difficulty: 'medium',
  topic: 'Probabilidad y Estadística',
  tags: ['probability', 'drawing', 'selection'],

  variables: {
    redBalls: () => randomInt(2, 8),
    blueBalls: () => randomInt(2, 8),
    color: () => randomChoice(['roja', 'azul']),
  },

  questionGenerator: (vars) => ({
    question: `En una bolsa hay ${vars.redBalls} pelotas rojas y ${vars.blueBalls} pelotas azules. Si sacas una pelota al azar, ¿cuál es la probabilidad de que sea ${vars.color}?`,
  }),

  answerCalculator: (vars) => {
    const favorable = vars.color === 'roja' ? vars.redBalls : vars.blueBalls;
    const total = vars.redBalls + vars.blueBalls;

    // Simplify fraction
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(favorable, total);

    return {
      numerator: favorable / divisor,
      denominator: total / divisor,
    };
  },

  optionGenerator: (vars, correctAnswer) => {
    const { numerator, denominator } = correctAnswer;
    const total = vars.redBalls + vars.blueBalls;
    const unfavorable = vars.color === 'roja' ? vars.blueBalls : vars.redBalls;

    const wrong = [
      { num: unfavorable, den: total }, // Wrong: other color
      { num: numerator, den: total * 2 }, // Wrong: doubled denominator
      { num: 1, den: 2 }, // Wrong: assumed equal
    ];

    const allOptions = [
      { num: numerator, den: denominator },
      ...wrong.filter(w => !(w.num === numerator && w.den === denominator)).slice(0, 3),
    ];

    const shuffled = shuffle(allOptions);
    const correctIndex = shuffled.findIndex(opt => opt.num === numerator && opt.den === denominator);

    return {
      options: shuffled.map(opt => `${opt.num}/${opt.den}`),
      correctIndex,
    };
  },

  explanationGenerator: (vars, answer) => {
    const { numerator, denominator } = answer;
    const favorable = vars.color === 'roja' ? vars.redBalls : vars.blueBalls;
    const total = vars.redBalls + vars.blueBalls;

    return {
      explanation: `Hay ${total} pelotas en total (${vars.redBalls} rojas + ${vars.blueBalls} azules). ` +
        `Pelotas ${vars.color}s: ${favorable}. La probabilidad es ${favorable}/${total}${favorable !== numerator ? ` = ${numerator}/${denominator}` : ''}.`,
    };
  },
};

// ============================================================================
// STATISTICS TEMPLATES
// ============================================================================

export const meanCalculation: ProblemTemplate = {
  id: 'stats-mean',
  name: 'Calculate Mean (Average)',
  subject: 'probabilidad',
  level: 'M1',
  difficulty: 'easy',
  topic: 'Probabilidad y Estadística',
  tags: ['statistics', 'mean', 'average'],

  variables: {
    numbers: () => {
      const count = randomChoice([4, 5, 6]);
      return Array.from({ length: count }, () => randomInt(5, 50));
    },
  },

  questionGenerator: (vars) => ({
    question: `¿Cuál es la media (promedio) de los siguientes números: ${vars.numbers.join(', ')}?`,
  }),

  answerCalculator: (vars) => {
    const sum = vars.numbers.reduce((a: number, b: number) => a + b, 0);
    return Math.round((sum / vars.numbers.length) * 10) / 10; // Round to 1 decimal
  },

  optionGenerator: (vars, correctAnswer) => {
    const sum = vars.numbers.reduce((a: number, b: number) => a + b, 0);
    const sorted = [...vars.numbers].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];

    const wrong = [
      median, // Wrong: calculated median
      sum, // Wrong: calculated sum
      Math.round((correctAnswer + 5) * 10) / 10, // Off by 5
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
    const sum = vars.numbers.reduce((a: number, b: number) => a + b, 0);
    return {
      explanation: `La media es la suma de todos los números dividida por la cantidad de números:\n` +
        `(${vars.numbers.join(' + ')}) / ${vars.numbers.length} = ${sum} / ${vars.numbers.length} = ${answer}`,
    };
  },
};

export const medianCalculation: ProblemTemplate = {
  id: 'stats-median',
  name: 'Calculate Median',
  subject: 'probabilidad',
  level: 'M1',
  difficulty: 'medium',
  topic: 'Probabilidad y Estadística',
  tags: ['statistics', 'median'],

  variables: {
    numbers: () => {
      const count = randomChoice([5, 7]); // Odd count for simpler median
      return Array.from({ length: count }, () => randomInt(10, 100));
    },
  },

  questionGenerator: (vars) => ({
    question: `¿Cuál es la mediana de los siguientes números: ${vars.numbers.join(', ')}?`,
  }),

  answerCalculator: (vars) => {
    const sorted = [...vars.numbers].sort((a, b) => a - b);
    return sorted[Math.floor(sorted.length / 2)];
  },

  optionGenerator: (vars, correctAnswer) => {
    const sum = vars.numbers.reduce((a: number, b: number) => a + b, 0);
    const mean = Math.round(sum / vars.numbers.length);

    const wrong = [
      mean, // Wrong: calculated mean
      vars.numbers[0], // Wrong: first number
      Math.max(...vars.numbers), // Wrong: maximum
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
    const sorted = [...vars.numbers].sort((a, b) => a - b);
    return {
      explanation: `Para encontrar la mediana, ordenamos los números: ${sorted.join(', ')}.\n` +
        `Como hay ${vars.numbers.length} números (impar), la mediana es el número del medio: ${answer}.`,
    };
  },
};

export const rangeCalculation: ProblemTemplate = {
  id: 'stats-range',
  name: 'Calculate Range',
  subject: 'probabilidad',
  level: 'M1',
  difficulty: 'easy',
  topic: 'Probabilidad y Estadística',
  tags: ['statistics', 'range'],

  variables: {
    numbers: () => {
      const count = randomChoice([5, 6, 7]);
      return Array.from({ length: count }, () => randomInt(10, 80));
    },
  },

  questionGenerator: (vars) => ({
    question: `¿Cuál es el rango de los siguientes datos: ${vars.numbers.join(', ')}?`,
  }),

  answerCalculator: (vars) => {
    return Math.max(...vars.numbers) - Math.min(...vars.numbers);
  },

  optionGenerator: (vars, correctAnswer) => {
    const max = Math.max(...vars.numbers);
    const min = Math.min(...vars.numbers);

    const wrong = [
      max, // Wrong: just the maximum
      min, // Wrong: just the minimum
      max + min, // Wrong: sum instead of difference
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
    const max = Math.max(...vars.numbers);
    const min = Math.min(...vars.numbers);
    return {
      explanation: `El rango es la diferencia entre el valor máximo y el mínimo:\n` +
        `Rango = ${max} - ${min} = ${answer}`,
    };
  },
};

// ============================================================================
// EXPORT ALL TEMPLATES
// ============================================================================

export const probabilityTemplates: ProblemTemplate[] = [
  coinFlipProbability,
  diceProbability,
  twoDiceSumProbability,
  drawingFromBag,
  meanCalculation,
  medianCalculation,
  rangeCalculation,
];
