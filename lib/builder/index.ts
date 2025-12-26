/**
 * Dynamic Lesson Builder
 *
 * Data-driven lesson system that allows lessons to be defined as JSON
 * and rendered dynamically with full interactivity.
 */

// Types
export * from './types';

// Validation
export {
  validateDynamicLesson,
  isDynamicLesson,
  isHookStep,
  isExploreStep,
  isExplainStep,
  isPracticeStep,
  isVerifyStep,
  parseDynamicLesson,
  type ValidationResult,
} from './schema';

// Templates
export {
  LESSON_TEMPLATES,
  ALGEBRA_FACTOR_COMUN,
  ALGEBRA_STARTER,
  NUMEROS_STARTER,
  GEOMETRIA_STARTER,
  PROBABILIDAD_STARTER,
  getTemplateById,
  getTemplatesBySubject,
} from './templates';
