/**
 * Logical problem generators
 * Handles: comparison, logical-operators, compound-conditions
 */

import { ProblemData, GeneratorContext, getRandomInt } from './types';

export function generateComparison(context: GeneratorContext): ProblemData {
  const { config } = context;
  const min = config.minValue || 1;
  const max = config.maxValue || 10;
  const operators = config.operators || ['>', '<', '='];
  const op = operators[Math.floor(Math.random() * operators.length)];

  const a = getRandomInt(min, max);
  const b = getRandomInt(min, max);

  let result = false;
  if (op === '>') result = a > b;
  else if (op === '<') result = a < b;
  else if (op === '=') result = a === b;
  else if (op === '≥') result = a >= b;
  else if (op === '≤') result = a <= b;

  const correctAnswer = result ? 'Verdadero' : 'Falso';
  const expression = `¿${a} ${op} ${b}?`;
  const expressionLatex = `${a} ${op} ${b}`;
  const problemKey = `comp:${a}${op}${b}`;

  return { expression, expressionLatex, correctAnswer, problemKey };
}

export function generateLogicalOperators(context: GeneratorContext): ProblemData {
  const { config } = context;
  const operators = config.operators || ['AND', 'OR'];
  const op = operators[Math.floor(Math.random() * operators.length)];

  if (op === 'NOT') {
    const val = Math.random() > 0.5;
    const correctAnswer = val ? 'Falso' : 'Verdadero';
    const expression = `¿NOT ${val ? 'Verdadero' : 'Falso'}?`;
    const expressionLatex = `\\neg ${val ? 'V' : 'F'}`;
    const problemKey = `log:NOT ${val}`;

    return { expression, expressionLatex, correctAnswer, problemKey };
  } else {
    const a = Math.random() > 0.5;
    const b = Math.random() > 0.5;
    let result = false;

    if (op === 'AND') result = a && b;
    else if (op === 'OR') result = a || b;

    const correctAnswer = result ? 'Verdadero' : 'Falso';
    const aStr = a ? 'Verdadero' : 'Falso';
    const bStr = b ? 'Verdadero' : 'Falso';
    const expression = `¿${aStr} ${op} ${bStr}?`;
    const expressionLatex = `${a ? 'V' : 'F'} ${op === 'AND' ? '\\land' : '\\lor'} ${b ? 'V' : 'F'}`;
    const problemKey = `log:${a}${op}${b}`;

    return { expression, expressionLatex, correctAnswer, problemKey };
  }
}

export function generateCompoundConditions(context: GeneratorContext): ProblemData {
  const { config } = context;
  const min = config.minValue || 1;
  const max = config.maxValue || 10;
  const x = getRandomInt(min, max);

  const types = ['x>a', 'x>a AND x<b', 'x<a OR x>b', 'range'];
  const type = types[Math.floor(Math.random() * types.length)];

  let result: boolean;
  let correctAnswer: string;
  let expression: string;
  let expressionLatex: string;
  let problemKey: string;

  if (type === 'x>a') {
    const a = getRandomInt(min, max);
    result = x > a;
    correctAnswer = result ? 'Verdadero' : 'Falso';
    expression = `Si x=${x}, ¿x>${a}?`;
    expressionLatex = `x=${x}, \\; x>${a}`;
    problemKey = `cond:x=${x},x>${a}`;
  } else if (type === 'x>a AND x<b') {
    const a = getRandomInt(min, max - 2);
    const b = getRandomInt(a + 2, max);
    result = x > a && x < b;
    correctAnswer = result ? 'Verdadero' : 'Falso';
    expression = `Si x=${x}, ¿x>${a} AND x<${b}?`;
    expressionLatex = `x=${x}, \\; ${a}<x<${b}`;
    problemKey = `cond:x=${x},${a}<x<${b}`;
  } else if (type === 'x<a OR x>b') {
    const a = getRandomInt(min + 1, max - 1);
    const b = getRandomInt(a + 1, max);
    result = x < a || x > b;
    correctAnswer = result ? 'Verdadero' : 'Falso';
    expression = `Si x=${x}, ¿x<${a} OR x>${b}?`;
    expressionLatex = `x=${x}, \\; x<${a} \\lor x>${b}`;
    problemKey = `cond:x=${x},x<${a}ORx>${b}`;
  } else { // range
    const a = getRandomInt(min, max - 2);
    const b = getRandomInt(a + 2, max);
    result = x >= a && x <= b;
    correctAnswer = result ? 'Verdadero' : 'Falso';
    expression = `Si x=${x}, ¿x∈[${a},${b}]?`;
    expressionLatex = `x=${x}, \\; x \\in [${a},${b}]`;
    problemKey = `cond:x=${x},x∈[${a},${b}]`;
  }

  return { expression, expressionLatex, correctAnswer, problemKey };
}
