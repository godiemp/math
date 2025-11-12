/**
 * Algebraic problem generators
 * Handles: simple-equation, expression-evaluation, simplification
 */

import { create, all } from 'mathjs';
import { ProblemData, GeneratorContext, getRandomInt } from './types';

const math = create(all);

export function generateSimpleEquation(context: GeneratorContext): ProblemData {
  const { config } = context;
  const min = config.minValue || 1;
  const max = config.maxValue || 10;
  const equationTypes = ['x+a=b', 'x-a=b', 'a-x=b', 'ax=b', 'x/a=b', 'ax+b=c', 'ax-b=c', 'a(x+b)=c', '2x+a=x+b'];
  const type = equationTypes[Math.floor(Math.random() * equationTypes.length)];

  let correctAnswer: number;
  let expression: string;
  let expressionLatex: string;
  let problemKey: string;

  if (type === 'x+a=b') {
    const a = getRandomInt(min, max);
    const x = getRandomInt(min, max);
    const b = x + a;
    correctAnswer = x;
    expression = `x + ${a} = ${b}`;
    expressionLatex = `x + ${a} = ${b}`;
    problemKey = `eq:x+${a}=${b}`;
  } else if (type === 'x-a=b') {
    const a = getRandomInt(min, max);
    const x = getRandomInt(a, max + 5);
    const b = x - a;
    correctAnswer = x;
    expression = `x - ${a} = ${b}`;
    expressionLatex = `x - ${a} = ${b}`;
    problemKey = `eq:x-${a}=${b}`;
  } else if (type === 'a-x=b') {
    const a = getRandomInt(min + 5, max + 5);
    const x = getRandomInt(min, a);
    const b = a - x;
    correctAnswer = x;
    expression = `${a} - x = ${b}`;
    expressionLatex = `${a} - x = ${b}`;
    problemKey = `eq:${a}-x=${b}`;
  } else if (type === 'ax=b') {
    const a = getRandomInt(2, 5);
    const x = getRandomInt(min, max);
    const b = a * x;
    correctAnswer = x;
    expression = `${a}x = ${b}`;
    expressionLatex = `${a}x = ${b}`;
    problemKey = `eq:${a}x=${b}`;
  } else if (type === 'x/a=b') {
    const a = getRandomInt(2, 5);
    const b = getRandomInt(min, max);
    const x = a * b;
    correctAnswer = x;
    expression = `x/${a} = ${b}`;
    expressionLatex = `\\frac{x}{${a}} = ${b}`;
    problemKey = `eq:x/${a}=${b}`;
  } else if (type === 'ax+b=c') {
    const a = getRandomInt(2, 5);
    const b = getRandomInt(1, 5);
    const x = getRandomInt(1, 5);
    const c = a * x + b;
    correctAnswer = x;
    expression = `${a}x + ${b} = ${c}`;
    expressionLatex = `${a}x + ${b} = ${c}`;
    problemKey = `eq:${a}x+${b}=${c}`;
  } else if (type === 'ax-b=c') {
    const a = getRandomInt(2, 5);
    const b = getRandomInt(1, 5);
    const x = getRandomInt(2, 5);
    const c = a * x - b;
    correctAnswer = x;
    expression = `${a}x - ${b} = ${c}`;
    expressionLatex = `${a}x - ${b} = ${c}`;
    problemKey = `eq:${a}x-${b}=${c}`;
  } else if (type === 'a(x+b)=c') {
    const a = getRandomInt(2, 4);
    const b = getRandomInt(1, 4);
    const x = getRandomInt(1, 5);
    const c = a * (x + b);
    correctAnswer = x;
    expression = `${a}(x + ${b}) = ${c}`;
    expressionLatex = `${a}(x + ${b}) = ${c}`;
    problemKey = `eq:${a}(x+${b})=${c}`;
  } else { // '2x+a=x+b'
    const a = getRandomInt(1, 5);
    const x = getRandomInt(1, 10);
    const b = x + a;
    correctAnswer = x;
    expression = `2x + ${a} = x + ${b}`;
    expressionLatex = `2x + ${a} = x + ${b}`;
    problemKey = `eq:2x+${a}=x+${b}`;
  }

  return { expression, expressionLatex, correctAnswer, problemKey };
}

export function generateExpressionEvaluation(context: GeneratorContext): ProblemData {
  const { config } = context;
  const min = config.minValue || 1;
  const max = config.maxValue || 10;
  const variables = config.variables || ['x'];

  if (variables.length === 1) {
    const x = getRandomInt(min, max);
    const evalExpressions = [
      { expr: `x+${getRandomInt(min, max)}`, latex: 'x+a' },
      { expr: `${getRandomInt(2, 5)}*x`, latex: 'ax' },
      { expr: `${getRandomInt(2, 5)}*x+${getRandomInt(1, 5)}`, latex: 'ax+b' },
      { expr: 'x^2', latex: 'x²' },
      { expr: `${getRandomInt(1, 3)}*x^2+${getRandomInt(1, 5)}`, latex: 'ax²+b' }
    ];
    const chosen = evalExpressions[Math.floor(Math.random() * evalExpressions.length)];

    const correctAnswer = math.evaluate(chosen.expr, { x });
    const expression = `Si x=${x}, ¿${chosen.expr.replace(/\*/g, '').replace(/\^2/g, '²')}?`;
    const expressionLatex = `x=${x}, \\; ${chosen.expr.replace(/\*/g, '').replace(/\^/g, '^')}=?`;
    const problemKey = `eval:x=${x},${chosen.expr}`;

    return { expression, expressionLatex, correctAnswer, problemKey };
  } else { // two variables
    const x = getRandomInt(min, max);
    const y = getRandomInt(min, max);
    const evalExpressions = [
      { expr: 'x+y', latex: 'x+y' },
      { expr: 'x*y', latex: 'xy' },
      { expr: `${getRandomInt(2, 4)}*x+${getRandomInt(2, 4)}*y`, latex: 'ax+by' },
      { expr: 'x^2+y^2', latex: 'x²+y²' },
      { expr: '(x+y)^2', latex: '(x+y)²' }
    ];
    const chosen = evalExpressions[Math.floor(Math.random() * evalExpressions.length)];

    const correctAnswer = math.evaluate(chosen.expr, { x, y });
    const expression = `Si x=${x}, y=${y}, ¿${chosen.expr.replace(/\*/g, '').replace(/\^2/g, '²')}?`;
    const expressionLatex = `x=${x}, y=${y}, \\; ${chosen.expr.replace(/\*/g, '').replace(/\^/g, '^')}=?`;
    const problemKey = `eval:x=${x},y=${y},${chosen.expr}`;

    return { expression, expressionLatex, correctAnswer, problemKey };
  }
}

export function generateSimplification(context: GeneratorContext): ProblemData {
  const { config } = context;
  const variables = config.variables || ['x'];

  if (variables.length === 1) {
    const expressions = [
      'x+x',
      `${getRandomInt(2, 5)}*x+${getRandomInt(2, 5)}*x`,
      `${getRandomInt(3, 7)}*x-${getRandomInt(1, 3)}*x`,
      'x+x+x',
      `${getRandomInt(2, 5)}*x+x-x`,
      `${getRandomInt(2, 4)}*(x+${getRandomInt(1, 5)})+x`
    ];
    const expr = expressions[Math.floor(Math.random() * expressions.length)];

    const simplified = math.simplify(expr);
    const correctAnswer = simplified.toString().replace(/\*/g, '').replace(/\s+/g, '');
    const expression = `Simplifica: ${expr.replace(/\*/g, '')}`;
    const expressionLatex = expr.replace(/\*/g, '');
    const problemKey = `simp:${expr}`;

    return { expression, expressionLatex, correctAnswer, problemKey };
  } else { // two variables
    const expressions = [
      `${getRandomInt(2, 4)}*x+${getRandomInt(2, 4)}*y+x`,
      `${getRandomInt(2, 5)}*x+${getRandomInt(2, 4)}*y-x`,
      `${getRandomInt(2, 5)}*x+${getRandomInt(2, 5)}*y+${getRandomInt(1, 3)}*x-${getRandomInt(1, 2)}*y`,
      `${getRandomInt(2, 4)}*(x+${getRandomInt(1, 4)})+y`
    ];
    const expr = expressions[Math.floor(Math.random() * expressions.length)];

    const simplified = math.simplify(expr);
    const correctAnswer = simplified.toString().replace(/\*/g, '').replace(/\s+/g, '');
    const expression = `Simplifica: ${expr.replace(/\*/g, '')}`;
    const expressionLatex = expr.replace(/\*/g, '');
    const problemKey = `simp:${expr}`;

    return { expression, expressionLatex, correctAnswer, problemKey };
  }
}
