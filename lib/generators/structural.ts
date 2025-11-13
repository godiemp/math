/**
 * Structural problem generators
 * Handles: sequences, sets, functions
 */

import { ProblemData, GeneratorContext, getRandomInt } from './types';

export function generateSequences(context: GeneratorContext): ProblemData {
  const { config } = context;
  const length = config.sequenceLength || 4;
  const min = config.minValue || 1;
  const max = config.maxValue || 20;

  // Use sequenceType from config if specified, otherwise pick randomly
  const allTypes: Array<'+n' | '-n' | '*n' | 'squares' | 'fibonacci'> = ['+n', '-n', '*n', 'squares', 'fibonacci'];
  const type = config.sequenceType || allTypes[Math.floor(Math.random() * allTypes.length)];

  let correctAnswer: number;
  let expression: string;
  let expressionLatex: string;
  let problemKey: string;

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

  return { expression, expressionLatex, correctAnswer, problemKey };
}

export function generateSets(context: GeneratorContext): ProblemData {
  const { config } = context;
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

  let correctAnswer: string;
  let expression: string;
  let expressionLatex: string;
  let problemKey: string;

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

  return { expression, expressionLatex, correctAnswer, problemKey };
}

export function generateFunctions(context: GeneratorContext): ProblemData {
  const { config } = context;
  const min = config.minValue || 1;
  const max = config.maxValue || 10;
  const variables = config.variables || ['x'];

  if (variables.length === 1) {
    const x = getRandomInt(min, max);

    // Use functionType from config if specified, otherwise pick randomly
    const allTypes: Array<'x+a' | 'ax' | 'ax+b' | 'x²' | 'x²+ax'> = ['x+a', 'ax', 'ax+b', 'x²', 'x²+ax'];
    const type = config.functionType || allTypes[Math.floor(Math.random() * allTypes.length)];

    let correctAnswer: number;
    let expression: string;
    let expressionLatex: string;
    let problemKey: string;

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

    return { expression, expressionLatex, correctAnswer, problemKey };
  } else { // two variables
    const x = getRandomInt(min, max);
    const y = getRandomInt(min, max);

    // Use functionType from config if specified, otherwise pick randomly
    const allTypes: Array<'x+y' | 'xy' | 'x²+y²'> = ['x+y', 'xy', 'x²+y²'];
    const type = config.functionType || allTypes[Math.floor(Math.random() * allTypes.length)];

    let correctAnswer: number;
    let expression: string;
    let expressionLatex: string;
    let problemKey: string;

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

    return { expression, expressionLatex, correctAnswer, problemKey };
  }
}
