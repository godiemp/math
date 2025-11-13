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

  // Use equationType from config if specified, otherwise pick randomly
  const allTypes: Array<'x+a=b' | 'x-a=b' | 'a-x=b' | 'ax=b' | 'x/a=b' | 'ax+b=c' | 'ax-b=c' | 'a(x+b)=c' | '2x+a=x+b'> =
    ['x+a=b', 'x-a=b', 'a-x=b', 'ax=b', 'x/a=b', 'ax+b=c', 'ax-b=c', 'a(x+b)=c', '2x+a=x+b'];
  const type = config.equationType || allTypes[Math.floor(Math.random() * allTypes.length)];

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

    // Use expressionType from config if specified
    let chosen: { expr: string; latex: string };

    if (config.expressionType) {
      // Generate based on specific type
      switch (config.expressionType) {
        case 'x+a':
          chosen = { expr: `x+${getRandomInt(min, max)}`, latex: 'x+a' };
          break;
        case 'ax':
          chosen = { expr: `${getRandomInt(2, 5)}*x`, latex: 'ax' };
          break;
        case 'ax+b':
          chosen = { expr: `${getRandomInt(2, 5)}*x+${getRandomInt(1, 5)}`, latex: 'ax+b' };
          break;
        case 'x²':
          chosen = { expr: 'x^2', latex: 'x²' };
          break;
        case 'ax²+b':
          chosen = { expr: `${getRandomInt(1, 3)}*x^2+${getRandomInt(1, 5)}`, latex: 'ax²+b' };
          break;
        default:
          chosen = { expr: `x+${getRandomInt(min, max)}`, latex: 'x+a' };
      }
    } else {
      // Random selection for backward compatibility
      const evalExpressions = [
        { expr: `x+${getRandomInt(min, max)}`, latex: 'x+a' },
        { expr: `${getRandomInt(2, 5)}*x`, latex: 'ax' },
        { expr: `${getRandomInt(2, 5)}*x+${getRandomInt(1, 5)}`, latex: 'ax+b' },
        { expr: 'x^2', latex: 'x²' },
        { expr: `${getRandomInt(1, 3)}*x^2+${getRandomInt(1, 5)}`, latex: 'ax²+b' }
      ];
      chosen = evalExpressions[Math.floor(Math.random() * evalExpressions.length)];
    }

    const correctAnswer = math.evaluate(chosen.expr, { x });
    const expression = `Si x=${x}, ¿${chosen.expr.replace(/\*/g, '').replace(/\^2/g, '²')}?`;
    const expressionLatex = `x=${x}, \\; ${chosen.expr.replace(/\*/g, '').replace(/\^/g, '^')}=?`;
    const problemKey = `eval:x=${x},${chosen.expr}`;

    return { expression, expressionLatex, correctAnswer, problemKey };
  } else { // two variables
    const x = getRandomInt(min, max);
    const y = getRandomInt(min, max);

    // Use expressionType from config if specified
    let chosen: { expr: string; latex: string };

    if (config.expressionType) {
      switch (config.expressionType) {
        case 'x+y':
          chosen = { expr: 'x+y', latex: 'x+y' };
          break;
        case 'xy':
          chosen = { expr: 'x*y', latex: 'xy' };
          break;
        case 'ax+by':
          chosen = { expr: `${getRandomInt(2, 4)}*x+${getRandomInt(2, 4)}*y`, latex: 'ax+by' };
          break;
        case 'x²+y²':
          chosen = { expr: 'x^2+y^2', latex: 'x²+y²' };
          break;
        case '(x+y)²':
          chosen = { expr: '(x+y)^2', latex: '(x+y)²' };
          break;
        default:
          chosen = { expr: 'x+y', latex: 'x+y' };
      }
    } else {
      // Random selection for backward compatibility
      const evalExpressions = [
        { expr: 'x+y', latex: 'x+y' },
        { expr: 'x*y', latex: 'xy' },
        { expr: `${getRandomInt(2, 4)}*x+${getRandomInt(2, 4)}*y`, latex: 'ax+by' },
        { expr: 'x^2+y^2', latex: 'x²+y²' },
        { expr: '(x+y)^2', latex: '(x+y)²' }
      ];
      chosen = evalExpressions[Math.floor(Math.random() * evalExpressions.length)];
    }

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
    let expr: string;

    if (config.simplificationType) {
      // Generate based on specific type
      switch (config.simplificationType) {
        case 'x+x':
          expr = 'x+x';
          break;
        case 'ax+bx':
          expr = `${getRandomInt(2, 5)}*x+${getRandomInt(2, 5)}*x`;
          break;
        case 'ax-bx':
          expr = `${getRandomInt(3, 7)}*x-${getRandomInt(1, 3)}*x`;
          break;
        case 'x+x+x':
          expr = 'x+x+x';
          break;
        case 'ax+x-x':
          expr = `${getRandomInt(2, 5)}*x+x-x`;
          break;
        case 'a(x+b)+x':
          expr = `${getRandomInt(2, 4)}*(x+${getRandomInt(1, 5)})+x`;
          break;
        default:
          expr = 'x+x';
      }
    } else {
      // Random selection for backward compatibility
      const expressions = [
        'x+x',
        `${getRandomInt(2, 5)}*x+${getRandomInt(2, 5)}*x`,
        `${getRandomInt(3, 7)}*x-${getRandomInt(1, 3)}*x`,
        'x+x+x',
        `${getRandomInt(2, 5)}*x+x-x`,
        `${getRandomInt(2, 4)}*(x+${getRandomInt(1, 5)})+x`
      ];
      expr = expressions[Math.floor(Math.random() * expressions.length)];
    }

    const simplified = math.simplify(expr);
    const correctAnswer = simplified.toString().replace(/\*/g, '').replace(/\s+/g, '');
    const expression = expr.replace(/\*/g, '');
    const expressionLatex = expr.replace(/\*/g, '');
    const problemKey = `simp:${expr}`;

    return { expression, expressionLatex, correctAnswer, problemKey };
  } else { // two variables
    let expr: string;

    if (config.simplificationType) {
      switch (config.simplificationType) {
        case 'ax+by+x':
          expr = `${getRandomInt(2, 4)}*x+${getRandomInt(2, 4)}*y+x`;
          break;
        case 'ax+by-x':
          expr = `${getRandomInt(2, 5)}*x+${getRandomInt(2, 4)}*y-x`;
          break;
        case 'ax+by+cx-dy':
          expr = `${getRandomInt(2, 5)}*x+${getRandomInt(2, 5)}*y+${getRandomInt(1, 3)}*x-${getRandomInt(1, 2)}*y`;
          break;
        case 'a(x+b)+x':
          expr = `${getRandomInt(2, 4)}*(x+${getRandomInt(1, 4)})+y`;
          break;
        case 'a(bx+y)-c(dx-y)':
          expr = `${getRandomInt(2, 4)}*(${getRandomInt(2, 3)}*x+y)-${getRandomInt(1, 3)}*(x-y)`;
          break;
        default:
          expr = `${getRandomInt(2, 4)}*x+${getRandomInt(2, 4)}*y+x`;
      }
    } else {
      // Random selection for backward compatibility
      const expressions = [
        `${getRandomInt(2, 4)}*x+${getRandomInt(2, 4)}*y+x`,
        `${getRandomInt(2, 5)}*x+${getRandomInt(2, 4)}*y-x`,
        `${getRandomInt(2, 5)}*x+${getRandomInt(2, 5)}*y+${getRandomInt(1, 3)}*x-${getRandomInt(1, 2)}*y`,
        `${getRandomInt(2, 4)}*(x+${getRandomInt(1, 4)})+y`
      ];
      expr = expressions[Math.floor(Math.random() * expressions.length)];
    }

    const simplified = math.simplify(expr);
    const correctAnswer = simplified.toString().replace(/\*/g, '').replace(/\s+/g, '');
    const expression = expr.replace(/\*/g, '');
    const expressionLatex = expr.replace(/\*/g, '');
    const problemKey = `simp:${expr}`;

    return { expression, expressionLatex, correctAnswer, problemKey };
  }
}
