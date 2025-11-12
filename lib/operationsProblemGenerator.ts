/**
 * Client-side Operations Problem Generator
 * Generates problems locally using mathjs for robust evaluation
 */

import { OperationLevel } from './operationsPath';
import { create, all } from 'mathjs';

// Initialize mathjs
const math = create(all);

export interface GeneratedProblem {
  expression: string;
  expressionLatex: string;
  correctAnswer: number | string;
  title: string;
  description: string;
  level: number;
  difficulty: string;
  problemsToComplete: number;
}

// Track recently generated problems to avoid repeats (per level)
const problemHistory: Map<number, string[]> = new Map();
const MAX_HISTORY_SIZE = 10; // Remember last 10 problems per level

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Check if a problem was recently generated for this level
 */
function isProblemRecent(level: number, problemKey: string): boolean {
  const history = problemHistory.get(level) || [];
  return history.includes(problemKey);
}

/**
 * Add a problem to the history for this level
 */
function addToHistory(level: number, problemKey: string): void {
  const history = problemHistory.get(level) || [];
  history.push(problemKey);

  // Keep only the last MAX_HISTORY_SIZE problems
  if (history.length > MAX_HISTORY_SIZE) {
    history.shift();
  }

  problemHistory.set(level, history);
}

/**
 * Clear history for a level (useful when completing a level)
 */
export function clearProblemHistory(level: number): void {
  problemHistory.delete(level);
}

export function generateProblem(levelConfig: OperationLevel): GeneratedProblem {
  const { operationType, config, level, title, description, difficulty, problemsToComplete } = levelConfig;

  // Try to generate a unique problem (max 20 attempts to avoid infinite loops)
  let attempts = 0;
  const maxAttempts = 20;

  while (attempts < maxAttempts) {
    attempts++;

    let expression = '';
    let expressionLatex = '';
    let correctAnswer: number | string = 0;
    let problemKey = '';

    switch (operationType) {
      case 'addition': {
        const min = config.minValue || 1;
        const max = config.maxValue || 10;
        const operands = config.numberOfOperands || 2;

        const numbers: number[] = [];
        for (let i = 0; i < operands; i++) {
          numbers.push(getRandomInt(min, max));
        }

        correctAnswer = numbers.reduce((sum, num) => sum + num, 0);
        expression = numbers.join(' + ');
        expressionLatex = numbers.join(' + ');
        problemKey = `add:${numbers.join(',')}`;
        break;
      }

      case 'subtraction': {
        const min = config.minValue || 1;
        const max = config.maxValue || 10;
        const allowNegatives = config.allowNegatives || false;

        const a = getRandomInt(min, max);
        const b = allowNegatives ? getRandomInt(min, max) : getRandomInt(min, a);

        correctAnswer = a - b;
        expression = `${a} - ${b}`;
        expressionLatex = `${a} - ${b}`;
        problemKey = `sub:${a},${b}`;
        break;
      }

      case 'multiplication': {
        const min = config.minValue || 1;
        const max = config.maxValue || 10;
        const tables = config.specificTables || [2, 3, 4, 5];

        const table = tables[Math.floor(Math.random() * tables.length)];
        const multiplier = getRandomInt(min, max);

        correctAnswer = table * multiplier;
        expression = `${table} × ${multiplier}`;
        expressionLatex = `${table} \\times ${multiplier}`;
        problemKey = `mul:${table},${multiplier}`;
        break;
      }

      case 'division': {
        const min = config.minValue || 1;
        const max = config.maxValue || 10;
        const tables = config.specificTables || [2, 3, 4, 5];

        const divisor = tables[Math.floor(Math.random() * tables.length)];
        const quotient = getRandomInt(min, max);
        const dividend = divisor * quotient;

        correctAnswer = quotient;
        expression = `${dividend} ÷ ${divisor}`;
        expressionLatex = `${dividend} \\div ${divisor}`;
        problemKey = `div:${dividend},${divisor}`;
        break;
      }

      case 'mixed-arithmetic': {
        const min = config.minValue || 1;
        const max = config.maxValue || 20;
        const operations = ['+', '-', '×'];
        const op = operations[Math.floor(Math.random() * operations.length)];

        const a = getRandomInt(min, max);
        const b = getRandomInt(min, op === '-' ? a : max);

        if (op === '+') {
          correctAnswer = a + b;
          expression = `${a} + ${b}`;
          expressionLatex = `${a} + ${b}`;
          problemKey = `mix:${a},${b},+`;
        } else if (op === '-') {
          correctAnswer = a - b;
          expression = `${a} - ${b}`;
          expressionLatex = `${a} - ${b}`;
          problemKey = `mix:${a},${b},-`;
        } else {
          correctAnswer = a * b;
          expression = `${a} × ${b}`;
          expressionLatex = `${a} \\times ${b}`;
          problemKey = `mix:${a},${b},×`;
        }
        break;
      }

      case 'simple-equation': {
        const min = config.minValue || 1;
        const max = config.maxValue || 10;
        const equationTypes = ['x+a=b', 'x-a=b', 'a-x=b', 'ax=b', 'x/a=b', 'ax+b=c', 'ax-b=c', 'a(x+b)=c', '2x+a=x+b'];
        const type = equationTypes[Math.floor(Math.random() * equationTypes.length)];

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
        break;
      }

      case 'expression-evaluation': {
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

          // Use mathjs to evaluate the expression
          correctAnswer = math.evaluate(chosen.expr, { x });
          expression = `Si x=${x}, ¿${chosen.expr.replace(/\*/g, '').replace(/\^2/g, '²')}?`;
          expressionLatex = `x=${x}, \\; ${chosen.expr.replace(/\*/g, '').replace(/\^/g, '^')}=?`;
          problemKey = `eval:x=${x},${chosen.expr}`;
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

          // Use mathjs to evaluate the expression
          correctAnswer = math.evaluate(chosen.expr, { x, y });
          expression = `Si x=${x}, y=${y}, ¿${chosen.expr.replace(/\*/g, '').replace(/\^2/g, '²')}?`;
          expressionLatex = `x=${x}, y=${y}, \\; ${chosen.expr.replace(/\*/g, '').replace(/\^/g, '^')}=?`;
          problemKey = `eval:x=${x},y=${y},${chosen.expr}`;
        }
        break;
      }

      case 'simplification': {
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

          // Use mathjs to simplify the expression
          const simplified = math.simplify(expr);
          correctAnswer = simplified.toString().replace(/\*/g, '').replace(/\s+/g, '');
          expression = `Simplifica: ${expr.replace(/\*/g, '')}`;
          expressionLatex = expr.replace(/\*/g, '');
          problemKey = `simp:${expr}`;
        } else { // two variables
          const expressions = [
            `${getRandomInt(2, 4)}*x+${getRandomInt(2, 4)}*y+x`,
            `${getRandomInt(2, 5)}*x+${getRandomInt(2, 4)}*y-x`,
            `${getRandomInt(2, 5)}*x+${getRandomInt(2, 5)}*y+${getRandomInt(1, 3)}*x-${getRandomInt(1, 2)}*y`,
            `${getRandomInt(2, 4)}*(x+${getRandomInt(1, 4)})+y`
          ];
          const expr = expressions[Math.floor(Math.random() * expressions.length)];

          // Use mathjs to simplify the expression
          const simplified = math.simplify(expr);
          correctAnswer = simplified.toString().replace(/\*/g, '').replace(/\s+/g, '');
          expression = `Simplifica: ${expr.replace(/\*/g, '')}`;
          expressionLatex = expr.replace(/\*/g, '');
          problemKey = `simp:${expr}`;
        }
        break;
      }

      case 'comparison': {
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

        correctAnswer = result ? 'Verdadero' : 'Falso';
        expression = `¿${a} ${op} ${b}?`;
        expressionLatex = `${a} ${op} ${b}`;
        problemKey = `comp:${a}${op}${b}`;
        break;
      }

      case 'logical-operators': {
        const operators = config.operators || ['AND', 'OR'];
        const op = operators[Math.floor(Math.random() * operators.length)];

        if (op === 'NOT') {
          const val = Math.random() > 0.5;
          correctAnswer = val ? 'Falso' : 'Verdadero';
          expression = `¿NOT ${val ? 'Verdadero' : 'Falso'}?`;
          expressionLatex = `\\neg ${val ? 'V' : 'F'}`;
          problemKey = `log:NOT ${val}`;
        } else {
          const a = Math.random() > 0.5;
          const b = Math.random() > 0.5;
          let result = false;

          if (op === 'AND') result = a && b;
          else if (op === 'OR') result = a || b;

          correctAnswer = result ? 'Verdadero' : 'Falso';
          const aStr = a ? 'Verdadero' : 'Falso';
          const bStr = b ? 'Verdadero' : 'Falso';
          expression = `¿${aStr} ${op} ${bStr}?`;
          expressionLatex = `${a ? 'V' : 'F'} ${op === 'AND' ? '\\land' : '\\lor'} ${b ? 'V' : 'F'}`;
          problemKey = `log:${a}${op}${b}`;
        }
        break;
      }

      case 'compound-conditions': {
        const min = config.minValue || 1;
        const max = config.maxValue || 10;
        const x = getRandomInt(min, max);

        const types = ['x>a', 'x>a AND x<b', 'x<a OR x>b', 'range'];
        const type = types[Math.floor(Math.random() * types.length)];

        if (type === 'x>a') {
          const a = getRandomInt(min, max);
          const result = x > a;
          correctAnswer = result ? 'Verdadero' : 'Falso';
          expression = `Si x=${x}, ¿x>${a}?`;
          expressionLatex = `x=${x}, \\; x>${a}`;
          problemKey = `cond:x=${x},x>${a}`;
        } else if (type === 'x>a AND x<b') {
          const a = getRandomInt(min, max - 2);
          const b = getRandomInt(a + 2, max);
          const result = x > a && x < b;
          correctAnswer = result ? 'Verdadero' : 'Falso';
          expression = `Si x=${x}, ¿x>${a} AND x<${b}?`;
          expressionLatex = `x=${x}, \\; ${a}<x<${b}`;
          problemKey = `cond:x=${x},${a}<x<${b}`;
        } else if (type === 'x<a OR x>b') {
          const a = getRandomInt(min + 1, max - 1);
          const b = getRandomInt(a + 1, max);
          const result = x < a || x > b;
          correctAnswer = result ? 'Verdadero' : 'Falso';
          expression = `Si x=${x}, ¿x<${a} OR x>${b}?`;
          expressionLatex = `x=${x}, \\; x<${a} \\lor x>${b}`;
          problemKey = `cond:x=${x},x<${a}ORx>${b}`;
        } else { // range
          const a = getRandomInt(min, max - 2);
          const b = getRandomInt(a + 2, max);
          const result = x >= a && x <= b;
          correctAnswer = result ? 'Verdadero' : 'Falso';
          expression = `Si x=${x}, ¿x∈[${a},${b}]?`;
          expressionLatex = `x=${x}, \\; x \\in [${a},${b}]`;
          problemKey = `cond:x=${x},x∈[${a},${b}]`;
        }
        break;
      }

      case 'sequences': {
        const length = config.sequenceLength || 4;
        const min = config.minValue || 1;
        const max = config.maxValue || 20;

        const types = ['+n', '-n', '*n', 'squares', 'fibonacci'];
        const type = types[Math.floor(Math.random() * types.length)];

        if (type === '+n') {
          const step = getRandomInt(1, 5);
          const start = getRandomInt(min, max - step * length);
          const sequence = [];
          for (let i = 0; i < length; i++) {
            sequence.push(start + i * step);
          }
          correctAnswer = start + length * step;
          expression = `Continúa: ${sequence.join(', ')}, __`;
          expressionLatex = `${sequence.join(', ')}, \\; ?`;
          problemKey = `seq:+${step}:${start}`;
        } else if (type === '-n') {
          const step = getRandomInt(1, 3);
          const start = getRandomInt(min + step * length, max);
          const sequence = [];
          for (let i = 0; i < length; i++) {
            sequence.push(start - i * step);
          }
          correctAnswer = start - length * step;
          expression = `Continúa: ${sequence.join(', ')}, __`;
          expressionLatex = `${sequence.join(', ')}, \\; ?`;
          problemKey = `seq:-${step}:${start}`;
        } else if (type === '*n') {
          const mult = 2;
          const start = getRandomInt(1, 3);
          const sequence = [];
          for (let i = 0; i < length; i++) {
            sequence.push(start * Math.pow(mult, i));
          }
          correctAnswer = start * Math.pow(mult, length);
          expression = `Continúa: ${sequence.join(', ')}, __`;
          expressionLatex = `${sequence.join(', ')}, \\; ?`;
          problemKey = `seq:*${mult}:${start}`;
        } else if (type === 'squares') {
          const start = getRandomInt(1, 5);
          const sequence = [];
          for (let i = 0; i < length; i++) {
            const n = start + i;
            sequence.push(n * n);
          }
          const next = start + length;
          correctAnswer = next * next;
          expression = `Continúa: ${sequence.join(', ')}, __`;
          expressionLatex = `${sequence.join(', ')}, \\; ?`;
          problemKey = `seq:squares:${start}`;
        } else { // fibonacci
          const sequence = [1, 1];
          for (let i = 2; i < length; i++) {
            sequence.push(sequence[i - 1] + sequence[i - 2]);
          }
          correctAnswer = sequence[length - 1] + sequence[length - 2];
          expression = `Continúa: ${sequence.join(', ')}, __`;
          expressionLatex = `${sequence.join(', ')}, \\; ?`;
          problemKey = `seq:fib`;
        }
        break;
      }

      case 'sets': {
        const setSize = config.setSize || 3;
        const min = config.minValue || 1;
        const max = config.maxValue || 5;
        const operators = config.operators || ['∪', '∩'];
        const op = operators[Math.floor(Math.random() * operators.length)];

        const setA = new Set<number>();
        const setB = new Set<number>();

        while (setA.size < setSize) setA.add(getRandomInt(min, max));
        while (setB.size < setSize) setB.add(getRandomInt(min, max));

        const arrA = Array.from(setA).sort((a, b) => a - b);
        const arrB = Array.from(setB).sort((a, b) => a - b);

        if (op === '∪') {
          const union = new Set([...arrA, ...arrB]);
          correctAnswer = Array.from(union).sort((a, b) => a - b).join(',');
          expression = `{${arrA.join(',')}} ∪ {${arrB.join(',')}}`;
          expressionLatex = `\\{${arrA.join(',')}\\} \\cup \\{${arrB.join(',')}\\}`;
          problemKey = `set:∪:${arrA.join(',')},${arrB.join(',')}`;
        } else if (op === '∩') {
          const intersection = arrA.filter(x => arrB.includes(x));
          correctAnswer = intersection.sort((a, b) => a - b).join(',') || '∅';
          expression = `{${arrA.join(',')}} ∩ {${arrB.join(',')}}`;
          expressionLatex = `\\{${arrA.join(',')}\\} \\cap \\{${arrB.join(',')}\\}`;
          problemKey = `set:∩:${arrA.join(',')},${arrB.join(',')}`;
        } else if (op === '-') {
          const difference = arrA.filter(x => !arrB.includes(x));
          correctAnswer = difference.sort((a, b) => a - b).join(',') || '∅';
          expression = `{${arrA.join(',')}} - {${arrB.join(',')}}`;
          expressionLatex = `\\{${arrA.join(',')}\\} - \\{${arrB.join(',')}\\}`;
          problemKey = `set:-:${arrA.join(',')},${arrB.join(',')}`;
        } else if (op === '∈') {
          const elem = arrA[0];
          const isIn = arrB.includes(elem);
          correctAnswer = isIn ? 'Verdadero' : 'Falso';
          expression = `¿${elem} ∈ {${arrB.join(',')}}?`;
          expressionLatex = `${elem} \\in \\{${arrB.join(',')}\\}`;
          problemKey = `set:∈:${elem},${arrB.join(',')}`;
        } else { // '|'
          correctAnswer = arrA.length.toString();
          expression = `|{${arrA.join(',')}}|`;
          expressionLatex = `|\\{${arrA.join(',')}\\}|`;
          problemKey = `set:|:${arrA.join(',')}`;
        }
        break;
      }

      case 'functions': {
        const min = config.minValue || 1;
        const max = config.maxValue || 10;
        const variables = config.variables || ['x'];

        if (variables.length === 1) {
          const x = getRandomInt(min, max);
          const types = ['x+a', 'ax', 'ax+b', 'x²', 'x²+ax'];
          const type = types[Math.floor(Math.random() * types.length)];

          if (type === 'x+a') {
            const a = getRandomInt(1, 5);
            correctAnswer = x + a;
            expression = `f(x)=x+${a}, f(${x})=?`;
            expressionLatex = `f(x)=x+${a}, \\; f(${x})=?`;
            problemKey = `func:x+${a},${x}`;
          } else if (type === 'ax') {
            const a = getRandomInt(2, 5);
            correctAnswer = a * x;
            expression = `f(x)=${a}x, f(${x})=?`;
            expressionLatex = `f(x)=${a}x, \\; f(${x})=?`;
            problemKey = `func:${a}x,${x}`;
          } else if (type === 'ax+b') {
            const a = getRandomInt(2, 4);
            const b = getRandomInt(1, 5);
            correctAnswer = a * x + b;
            expression = `f(x)=${a}x+${b}, f(${x})=?`;
            expressionLatex = `f(x)=${a}x+${b}, \\; f(${x})=?`;
            problemKey = `func:${a}x+${b},${x}`;
          } else if (type === 'x²') {
            correctAnswer = x * x;
            expression = `f(x)=x², f(${x})=?`;
            expressionLatex = `f(x)=x^2, \\; f(${x})=?`;
            problemKey = `func:x²,${x}`;
          } else { // 'x²+ax'
            const a = getRandomInt(1, 3);
            correctAnswer = x * x + a * x;
            expression = `f(x)=x²+${a}x, f(${x})=?`;
            expressionLatex = `f(x)=x^2+${a}x, \\; f(${x})=?`;
            problemKey = `func:x²+${a}x,${x}`;
          }
        } else { // two variables
          const x = getRandomInt(min, max);
          const y = getRandomInt(min, max);
          const types = ['x+y', 'xy', 'x²+y²'];
          const type = types[Math.floor(Math.random() * types.length)];

          if (type === 'x+y') {
            correctAnswer = x + y;
            expression = `f(x,y)=x+y, f(${x},${y})=?`;
            expressionLatex = `f(x,y)=x+y, \\; f(${x},${y})=?`;
            problemKey = `func:x+y,${x},${y}`;
          } else if (type === 'xy') {
            correctAnswer = x * y;
            expression = `f(x,y)=xy, f(${x},${y})=?`;
            expressionLatex = `f(x,y)=xy, \\; f(${x},${y})=?`;
            problemKey = `func:xy,${x},${y}`;
          } else { // 'x²+y²'
            correctAnswer = x * x + y * y;
            expression = `f(x,y)=x²+y², f(${x},${y})=?`;
            expressionLatex = `f(x,y)=x^2+y^2, \\; f(${x},${y})=?`;
            problemKey = `func:x²+y²,${x},${y}`;
          }
        }
        break;
      }

      case 'sorting': {
        const length = config.sequenceLength || 4;
        const min = config.minValue || 1;
        const max = config.maxValue || 10;
        const allowNegatives = config.allowNegatives || false;

        const types = ['sort-asc', 'sort-desc', 'min', 'max', 'median'];
        const type = types[Math.floor(Math.random() * types.length)];

        const arr = [];
        for (let i = 0; i < length; i++) {
          arr.push(getRandomInt(allowNegatives ? -max : min, max));
        }

        if (type === 'sort-asc') {
          const sorted = [...arr].sort((a, b) => a - b);
          correctAnswer = sorted.join(',');
          expression = `Ordena: [${arr.join(', ')}]`;
          expressionLatex = `[${arr.join(', ')}]`;
          problemKey = `sort:asc:${arr.join(',')}`;
        } else if (type === 'sort-desc') {
          const sorted = [...arr].sort((a, b) => b - a);
          correctAnswer = sorted.join(',');
          expression = `Ordena (mayor a menor): [${arr.join(', ')}]`;
          expressionLatex = `[${arr.join(', ')}]`;
          problemKey = `sort:desc:${arr.join(',')}`;
        } else if (type === 'min') {
          correctAnswer = math.min(arr);
          expression = `Mínimo de [${arr.join(', ')}]`;
          expressionLatex = `\\min\\{${arr.join(', ')}\\}`;
          problemKey = `sort:min:${arr.join(',')}`;
        } else if (type === 'max') {
          correctAnswer = math.max(arr);
          expression = `Máximo de [${arr.join(', ')}]`;
          expressionLatex = `\\max\\{${arr.join(', ')}\\}`;
          problemKey = `sort:max:${arr.join(',')}`;
        } else { // median
          correctAnswer = math.median(arr);
          expression = `Mediana de [${arr.join(', ')}]`;
          expressionLatex = `\\text{mediana}\\{${arr.join(', ')}\\}`;
          problemKey = `sort:median:${arr.join(',')}`;
        }
        break;
      }

      case 'counting': {
        const length = config.sequenceLength || 5;
        const min = config.minValue || 1;
        const max = config.maxValue || 10;

        const arr = [];
        for (let i = 0; i < length; i++) {
          arr.push(getRandomInt(min, max));
        }

        const types = ['count-all', 'count-even', 'count-odd', 'count-greater', 'count-multiples', 'sum-even'];
        const type = types[Math.floor(Math.random() * types.length)];

        if (type === 'count-all') {
          correctAnswer = arr.length;
          expression = `Cuenta elementos: [${arr.join(', ')}]`;
          expressionLatex = `|[${arr.join(', ')}]|`;
          problemKey = `count:all:${arr.join(',')}`;
        } else if (type === 'count-even') {
          correctAnswer = arr.filter(x => x % 2 === 0).length;
          expression = `¿Cuántos pares?: [${arr.join(', ')}]`;
          expressionLatex = `\\text{pares en } [${arr.join(', ')}]`;
          problemKey = `count:even:${arr.join(',')}`;
        } else if (type === 'count-odd') {
          correctAnswer = arr.filter(x => x % 2 !== 0).length;
          expression = `¿Cuántos impares?: [${arr.join(', ')}]`;
          expressionLatex = `\\text{impares en } [${arr.join(', ')}]`;
          problemKey = `count:odd:${arr.join(',')}`;
        } else if (type === 'count-greater') {
          const threshold = getRandomInt(min, max);
          correctAnswer = arr.filter(x => x > threshold).length;
          expression = `¿Cuántos >${threshold}?: [${arr.join(', ')}]`;
          expressionLatex = `|\\{x > ${threshold}\\}|`;
          problemKey = `count:>${threshold}:${arr.join(',')}`;
        } else if (type === 'count-multiples') {
          const divisor = getRandomInt(2, 4);
          correctAnswer = arr.filter(x => x % divisor === 0).length;
          expression = `¿Cuántos múltiplos de ${divisor}?: [${arr.join(', ')}]`;
          expressionLatex = `|\\{x \\mid ${divisor}|x\\}|`;
          problemKey = `count:mult${divisor}:${arr.join(',')}`;
        } else { // sum-even
          const evens = arr.filter(x => x % 2 === 0);
          correctAnswer = evens.length > 0 ? math.sum(evens) : 0;
          expression = `Suma los pares: [${arr.join(', ')}]`;
          expressionLatex = `\\sum(\\text{pares})`;
          problemKey = `count:sum-even:${arr.join(',')}`;
        }
        break;
      }

      case 'composition': {
        const length = config.sequenceLength || 3;
        const min = config.minValue || 1;
        const max = config.maxValue || 10;

        const arr = [];
        for (let i = 0; i < length; i++) {
          arr.push(getRandomInt(min, max));
        }

        const types = ['map+n', 'map*n', 'map-then-reduce', 'filter-even', 'filter-map'];
        const type = types[Math.floor(Math.random() * types.length)];

        if (type === 'map+n') {
          const n = getRandomInt(1, 5);
          const result = arr.map(x => x + n);
          correctAnswer = result.join(',');
          expression = `Aplica +${n} a: [${arr.join(', ')}]`;
          expressionLatex = `f(x)=x+${n}, \\; [${arr.join(', ')}]`;
          problemKey = `comp:+${n}:${arr.join(',')}`;
        } else if (type === 'map*n') {
          const n = getRandomInt(2, 3);
          const result = arr.map(x => x * n);
          correctAnswer = result.join(',');
          expression = `Aplica ×${n} a: [${arr.join(', ')}]`;
          expressionLatex = `f(x)=${n}x, \\; [${arr.join(', ')}]`;
          problemKey = `comp:*${n}:${arr.join(',')}`;
        } else if (type === 'map-then-reduce') {
          const n = getRandomInt(2, 3);
          const mapped = arr.map(x => x * n);
          correctAnswer = math.sum(mapped);
          expression = `Aplica ×${n} luego suma: [${arr.join(', ')}]`;
          expressionLatex = `\\sum(${n}x)`;
          problemKey = `comp:*${n}+sum:${arr.join(',')}`;
        } else if (type === 'filter-even') {
          const result = arr.filter(x => x % 2 === 0);
          correctAnswer = result.join(',') || '∅';
          expression = `Filtra pares: [${arr.join(', ')}]`;
          expressionLatex = `\\{x \\mid x\\%2=0\\}`;
          problemKey = `comp:filter-even:${arr.join(',')}`;
        } else { // filter-map
          const result = arr.filter(x => x % 2 === 0).map(x => x / 2);
          correctAnswer = result.join(',') || '∅';
          expression = `Toma pares, luego ÷2: [${arr.join(', ')}]`;
          expressionLatex = `f(x)=x/2, \\; x\\%2=0`;
          problemKey = `comp:filter-even-div2:${arr.join(',')}`;
        }
        break;
      }

      default: {
        // For other operation types, generate a simple addition problem as fallback
        const a = getRandomInt(1, 10);
        const b = getRandomInt(1, 10);
        correctAnswer = a + b;
        expression = `${a} + ${b}`;
        expressionLatex = `${a} + ${b}`;
        problemKey = `default:${a},${b}`;
      }
    }

    // Check if this problem was recently generated
    if (!isProblemRecent(level, problemKey)) {
      // This is a new problem, add it to history and return it
      addToHistory(level, problemKey);

      return {
        expression,
        expressionLatex,
        correctAnswer,
        title,
        description,
        level,
        difficulty,
        problemsToComplete
      };
    }

    // Problem was recent, try again
  }

  // If we couldn't find a unique problem after max attempts, just return the last one
  // This shouldn't happen unless the problem space is very small
  console.warn(`Could not generate unique problem after ${maxAttempts} attempts for level ${level}`);

  return generateFallbackProblem(levelConfig);
}

/**
 * Generate a fallback problem without history checking
 */
function generateFallbackProblem(levelConfig: OperationLevel): GeneratedProblem {
  const { operationType, config, level, title, description, difficulty, problemsToComplete } = levelConfig;

  // Simple fallback generation without history
  const a = getRandomInt(1, 10);
  const b = getRandomInt(1, 10);

  return {
    expression: `${a} + ${b}`,
    expressionLatex: `${a} + ${b}`,
    correctAnswer: a + b,
    title,
    description,
    level,
    difficulty,
    problemsToComplete
  };
}

export function validateAnswer(userAnswer: string, correctAnswer: number | string): boolean {
  const trimmedAnswer = userAnswer.trim();

  if (typeof correctAnswer === 'number') {
    const numericAnswer = parseFloat(trimmedAnswer);
    return !isNaN(numericAnswer) && Math.abs(numericAnswer - correctAnswer) < 0.001;
  }

  // For string answers, handle special cases
  const correctStr = correctAnswer.toString().toLowerCase();
  const userStr = trimmedAnswer.toLowerCase();

  // Handle boolean answers (Verdadero/Falso, True/False, V/F, Si/No)
  if (correctStr === 'verdadero' || correctStr === 'falso') {
    return (
      userStr === correctStr ||
      (correctStr === 'verdadero' && (userStr === 'true' || userStr === 'v' || userStr === 'si' || userStr === 'sí')) ||
      (correctStr === 'falso' && (userStr === 'false' || userStr === 'f' || userStr === 'no'))
    );
  }

  // Handle set notation - accept both {1,2,3} and 1,2,3
  if (correctStr.includes(',')) {
    // Remove spaces and braces for comparison
    const normalizeSet = (str: string) => str.replace(/[\s\{\}]/g, '').split(',').sort().join(',');
    return normalizeSet(userStr) === normalizeSet(correctStr);
  }

  // Handle empty set notation
  if (correctStr === '∅' || correctStr === 'vacio' || correctStr === 'vacío') {
    return userStr === '∅' || userStr === 'vacio' || userStr === 'vacío' || userStr === '' || userStr === '{}';
  }

  // Handle algebraic expressions - accept with or without spaces
  const normalizeAlgebra = (str: string) => str.replace(/\s+/g, '');
  return normalizeAlgebra(userStr) === normalizeAlgebra(correctStr);
}
