/**
 * QGen - Question Generation Algorithm
 *
 * Main export file for the QGen system
 */

// Core algorithm
export { QGenAlgorithm, generateQuestions, generateMultipleQuestionSets } from './qgenAlgorithm';

// Libraries
export {
  contextLibrary,
  getContextsByCategory,
  getContextsBySkills,
  getContextById,
  getContextsSupportingAllSkills,
} from './contextLibrary';

export {
  goalLibrary,
  getGoalsByType,
  getGoalsByCognitiveLevel,
  getGoalById,
  getGoalsByComplexity,
} from './goalLibrary';

export {
  templateLibrary,
  getTemplatesByGoal,
  getTemplatesByDifficulty,
  getTemplatesByContext,
  getTemplatesBySkills,
  getTemplatesByAllSkills,
  getTemplateById,
  getCompatibleTemplates,
} from './templateLibrary';

export {
  goalSkillMappings,
  getMappingsByGoal,
  getMappingsBySkills,
  getMappingsBySkillCombination,
  getCompatibleGoals,
  isValidSkillCombination,
} from './goalSkillMappings';

// Value generator
export { ValueGenerator, createValueGenerator, generateTemplateValues } from './valueGenerator';

// Examples
export { examples, runAllExamples } from './examples';

// Re-export types for convenience
export type {
  Context,
  Template,
  Goal,
  GoalSkillMapping,
  Problem,
  Situation,
  ProgressiveQuestion,
  QGenInput,
  QGenOutput,
  VariableDefinition,
  TemplateConstraint,
  ValueGeneratorConfig,
  QuestionGoalType,
  CognitiveLevel,
  ContextCategory,
  VariableType,
} from '../types/core';
