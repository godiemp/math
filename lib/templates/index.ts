/**
 * Template Library - Central Export
 *
 * This file aggregates all problem templates from different subjects
 * and provides convenient access to the template registry.
 */

import { templateRegistry } from '../problemTemplates';
import { numberTemplates } from './numberTemplates';
import { algebraTemplates } from './algebraTemplates';
import { geometryTemplates } from './geometryTemplates';
import { probabilityTemplates } from './probabilityTemplates';

// ============================================================================
// REGISTER ALL TEMPLATES
// ============================================================================

// Register all templates on module load
export function registerAllTemplates() {
  templateRegistry.registerMany([
    ...numberTemplates,
    ...algebraTemplates,
    ...geometryTemplates,
    ...probabilityTemplates,
  ]);
}

// Auto-register on import
registerAllTemplates();

// ============================================================================
// TEMPLATE STATISTICS
// ============================================================================

export function getTemplateStats() {
  const allTemplates = templateRegistry.getAll();

  const bySubject = {
    números: allTemplates.filter(t => t.subject === 'números').length,
    álgebra: allTemplates.filter(t => t.subject === 'álgebra').length,
    geometría: allTemplates.filter(t => t.subject === 'geometría').length,
    probabilidad: allTemplates.filter(t => t.subject === 'probabilidad').length,
  };

  const byLevel = {
    M1: allTemplates.filter(t => t.level === 'M1').length,
    M2: allTemplates.filter(t => t.level === 'M2').length,
  };

  const byDifficulty = {
    easy: allTemplates.filter(t => t.difficulty === 'easy').length,
    medium: allTemplates.filter(t => t.difficulty === 'medium').length,
    hard: allTemplates.filter(t => t.difficulty === 'hard').length,
  };

  return {
    total: allTemplates.length,
    bySubject,
    byLevel,
    byDifficulty,
  };
}

// ============================================================================
// CONVENIENCE EXPORTS
// ============================================================================

export { templateRegistry } from '../problemTemplates';
export {
  generateQuestionFromTemplate,
  generateQuestions,
  generateQuestionsByFilters,
} from '../problemTemplates';

// Export individual template collections
export { numberTemplates } from './numberTemplates';
export { algebraTemplates } from './algebraTemplates';
export { geometryTemplates } from './geometryTemplates';
export { probabilityTemplates } from './probabilityTemplates';

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/*

EXAMPLE 1: Generate a single question from a specific template
-----------------------------------------------------------
import { templateRegistry, generateQuestionFromTemplate } from './templates';

const template = templateRegistry.get('frac-add-same-den');
const question = generateQuestionFromTemplate(template);
console.log(question);


EXAMPLE 2: Generate 10 random M1 questions
-----------------------------------------------------------
import { generateQuestionsByFilters } from './templates';

const questions = generateQuestionsByFilters(10, {
  level: 'M1',
});


EXAMPLE 3: Generate 5 algebra questions (medium difficulty)
-----------------------------------------------------------
import { generateQuestionsByFilters } from './templates';

const questions = generateQuestionsByFilters(5, {
  subject: 'álgebra',
  difficulty: 'medium',
});


EXAMPLE 4: Generate questions from specific templates
-----------------------------------------------------------
import { templateRegistry, generateQuestions } from './templates';

const templates = [
  templateRegistry.get('frac-add-same-den'),
  templateRegistry.get('percent-of-number'),
  templateRegistry.get('rect-area'),
];

const questions = generateQuestions(templates, 20);


EXAMPLE 5: Get all geometry templates and generate 100 questions
-----------------------------------------------------------
import { templateRegistry, generateQuestions } from './templates';

const geometryTemplates = templateRegistry.filter({ subject: 'geometría' });
const questions = generateQuestions(geometryTemplates, 100);


EXAMPLE 6: Mix M1 and M2 questions with custom distribution
-----------------------------------------------------------
import { generateQuestionsByFilters } from './templates';

const m1Questions = generateQuestionsByFilters(40, { level: 'M1' });
const m2Questions = generateQuestionsByFilters(20, { level: 'M2' });
const allQuestions = [...m1Questions, ...m2Questions];


EXAMPLE 7: View template statistics
-----------------------------------------------------------
import { getTemplateStats } from './templates';

const stats = getTemplateStats();
console.log(stats);
// Output:
// {
//   total: 29,
//   bySubject: { números: 5, álgebra: 6, geometría: 11, probabilidad: 7 },
//   byLevel: { M1: 24, M2: 5 },
//   byDifficulty: { easy: 15, medium: 13, hard: 1 }
// }


EXAMPLE 8: Generate exam with specific distribution
-----------------------------------------------------------
import { generateQuestionsByFilters } from './templates';

// PAES M1 exam structure: 60 questions
const examQuestions = [
  ...generateQuestionsByFilters(15, { subject: 'números', level: 'M1' }),
  ...generateQuestionsByFilters(20, { subject: 'álgebra', level: 'M1' }),
  ...generateQuestionsByFilters(15, { subject: 'geometría', level: 'M1' }),
  ...generateQuestionsByFilters(10, { subject: 'probabilidad', level: 'M1' }),
];


EXAMPLE 9: Generate progressively harder quiz
-----------------------------------------------------------
import { generateQuestionsByFilters } from './templates';

const quiz = [
  ...generateQuestionsByFilters(3, { difficulty: 'easy', level: 'M1' }),
  ...generateQuestionsByFilters(4, { difficulty: 'medium', level: 'M1' }),
  ...generateQuestionsByFilters(3, { difficulty: 'hard', level: 'M1' }),
];


EXAMPLE 10: Create practice session focused on weak areas
-----------------------------------------------------------
import { templateRegistry, generateQuestions } from './templates';

// Student needs practice with fractions and percentages
const templates = templateRegistry.filter({
  subject: 'números',
  level: 'M1'
}).filter(t =>
  t.tags?.includes('fractions') || t.tags?.includes('percentage')
);

const practiceQuestions = generateQuestions(templates, 20);

*/
