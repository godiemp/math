#!/usr/bin/env tsx
import { questions } from '../lib/questions/index.js';

console.log('✅ Questions loaded:', questions.length, 'questions');
console.log('First question has questionLatex:', !!questions[0]?.questionLatex);
console.log('First question has question field:', 'question' in (questions[0] || {}));
console.log('Sample question ID:', questions[0]?.id);
console.log('Sample questionLatex (first 100 chars):', questions[0]?.questionLatex?.substring(0, 100));
