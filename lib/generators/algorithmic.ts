/**
 * Algorithmic problem generators
 * Handles: sorting, counting, composition
 */

import { create, all } from 'mathjs';
import { ProblemData, GeneratorContext, getRandomInt } from './types';

const math = create(all);

export function generateSorting(context: GeneratorContext): ProblemData {
  const { config } = context;
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

  let correctAnswer: number | string;
  let expression: string;
  let expressionLatex: string;
  let problemKey: string;

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

  return { expression, expressionLatex, correctAnswer, problemKey };
}

export function generateCounting(context: GeneratorContext): ProblemData {
  const { config } = context;
  const length = config.sequenceLength || 5;
  const min = config.minValue || 1;
  const max = config.maxValue || 10;

  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(getRandomInt(min, max));
  }

  const types = ['count-all', 'count-even', 'count-odd', 'count-greater', 'count-multiples', 'sum-even'];
  const type = types[Math.floor(Math.random() * types.length)];

  let correctAnswer: number;
  let expression: string;
  let expressionLatex: string;
  let problemKey: string;

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

  return { expression, expressionLatex, correctAnswer, problemKey };
}

export function generateComposition(context: GeneratorContext): ProblemData {
  const { config } = context;
  const length = config.sequenceLength || 3;
  const min = config.minValue || 1;
  const max = config.maxValue || 10;

  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(getRandomInt(min, max));
  }

  const types = ['map+n', 'map*n', 'map-then-reduce', 'filter-even', 'filter-map'];
  const type = types[Math.floor(Math.random() * types.length)];

  let correctAnswer: number | string;
  let expression: string;
  let expressionLatex: string;
  let problemKey: string;

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

  return { expression, expressionLatex, correctAnswer, problemKey };
}
