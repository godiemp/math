/**
 * ============================================================================
 * DYNAMIC LESSON VALIDATION
 * ============================================================================
 *
 * Runtime validation for dynamic lesson JSON.
 * Ensures AI-generated lessons are valid before rendering.
 */

import type {
  DynamicLesson,
  DynamicStep,
  HookStep,
  ExploreStep,
  ExplainStep,
  PracticeStep,
  VerifyStep,
  HookStepContent,
  ExploreStepContent,
  ExplainStepContent,
  PracticeStepContent,
  VerifyStepContent,
  CheckpointQuestion,
  PracticeProblem,
  FormulaTab,
  VisualElement,
  ThemeColor,
} from './types';

// =============================================================================
// VALIDATION RESULT TYPES
// =============================================================================

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

// =============================================================================
// PRIMITIVE VALIDATORS
// =============================================================================

const VALID_COLORS: ThemeColor[] = ['blue', 'purple', 'teal', 'pink', 'green', 'amber', 'orange', 'red'];
const VALID_SUBJECTS = ['números', 'álgebra', 'geometría', 'probabilidad'];
const VALID_LEVELS = ['M1', 'M2'];
const VALID_STEP_TYPES = ['hook', 'explore', 'explain', 'practice', 'verify'];

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// =============================================================================
// CONTENT VALIDATORS
// =============================================================================

function validateVisualElement(visual: unknown, path: string): string[] {
  const errors: string[] = [];

  if (!isObject(visual)) {
    errors.push(`${path}: debe ser un objeto`);
    return errors;
  }

  if (!['emoji', 'svg', 'image', 'icon'].includes(visual.type as string)) {
    errors.push(`${path}.type: debe ser 'emoji', 'svg', 'image', o 'icon'`);
  }

  if (!isString(visual.content)) {
    errors.push(`${path}.content: debe ser un string`);
  }

  return errors;
}

function validateCheckpointQuestion(q: unknown, path: string): string[] {
  const errors: string[] = [];

  if (!isObject(q)) {
    errors.push(`${path}: debe ser un objeto`);
    return errors;
  }

  if (!isString(q.id)) errors.push(`${path}.id: requerido`);
  if (!isString(q.question)) errors.push(`${path}.question: requerido`);
  if (!isArray(q.options) || q.options.length < 2) {
    errors.push(`${path}.options: debe tener al menos 2 opciones`);
  }
  if (!isNumber(q.correctAnswer) || q.correctAnswer < 0) {
    errors.push(`${path}.correctAnswer: debe ser un número >= 0`);
  }
  if (!isString(q.explanation)) errors.push(`${path}.explanation: requerido`);

  return errors;
}

function validatePracticeProblem(p: unknown, path: string): string[] {
  const errors: string[] = [];

  if (!isObject(p)) {
    errors.push(`${path}: debe ser un objeto`);
    return errors;
  }

  if (!isString(p.id)) errors.push(`${path}.id: requerido`);
  if (!isString(p.question)) errors.push(`${path}.question: requerido`);
  if (!isString(p.hint)) errors.push(`${path}.hint: requerido`);
  if (!isArray(p.options) || p.options.length < 2) {
    errors.push(`${path}.options: debe tener al menos 2 opciones`);
  }
  if (!isNumber(p.correctAnswer) || p.correctAnswer < 0) {
    errors.push(`${path}.correctAnswer: debe ser un número >= 0`);
  }
  if (!isString(p.explanation)) errors.push(`${path}.explanation: requerido`);

  return errors;
}

function validateFormulaTab(tab: unknown, path: string): string[] {
  const errors: string[] = [];

  if (!isObject(tab)) {
    errors.push(`${path}: debe ser un objeto`);
    return errors;
  }

  if (!isString(tab.id)) errors.push(`${path}.id: requerido`);
  if (!isString(tab.title)) errors.push(`${path}.title: requerido`);
  if (!isString(tab.shortTitle)) errors.push(`${path}.shortTitle: requerido`);
  if (!isString(tab.description)) errors.push(`${path}.description: requerido`);
  if (!isString(tab.formula)) errors.push(`${path}.formula: requerido`);

  if (!VALID_COLORS.includes(tab.color as ThemeColor)) {
    errors.push(`${path}.color: debe ser uno de ${VALID_COLORS.join(', ')}`);
  }

  if (!isObject(tab.example)) {
    errors.push(`${path}.example: requerido`);
  } else {
    if (!isString(tab.example.input)) errors.push(`${path}.example.input: requerido`);
    if (!isArray(tab.example.steps)) errors.push(`${path}.example.steps: debe ser un array`);
    if (!isString(tab.example.result)) errors.push(`${path}.example.result: requerido`);
  }

  return errors;
}

// =============================================================================
// STEP CONTENT VALIDATORS
// =============================================================================

function validateHookContent(content: unknown, path: string): string[] {
  const errors: string[] = [];

  if (!isObject(content)) {
    errors.push(`${path}: debe ser un objeto`);
    return errors;
  }

  if (!isString(content.subtitle)) errors.push(`${path}.subtitle: requerido`);

  // Validate scenario
  if (!isObject(content.scenario)) {
    errors.push(`${path}.scenario: requerido`);
  } else {
    if (!isString(content.scenario.text)) errors.push(`${path}.scenario.text: requerido`);
    if (!isString(content.scenario.question)) errors.push(`${path}.scenario.question: requerido`);
    if (content.scenario.visual) {
      errors.push(...validateVisualElement(content.scenario.visual, `${path}.scenario.visual`));
    }
  }

  // Validate quiz
  if (!isObject(content.quiz)) {
    errors.push(`${path}.quiz: requerido`);
  } else {
    if (!isString(content.quiz.reminder)) errors.push(`${path}.quiz.reminder: requerido`);
    if (!isArray(content.quiz.options) || content.quiz.options.length < 2) {
      errors.push(`${path}.quiz.options: debe tener al menos 2 opciones`);
    }
    if (!isNumber(content.quiz.correctIndex) || content.quiz.correctIndex < 0) {
      errors.push(`${path}.quiz.correctIndex: debe ser un número >= 0`);
    }
  }

  // Validate result
  if (!isObject(content.result)) {
    errors.push(`${path}.result: requerido`);
  } else {
    if (!isString(content.result.title)) errors.push(`${path}.result.title: requerido`);
    if (!isArray(content.result.breakdown)) errors.push(`${path}.result.breakdown: debe ser un array`);
    if (!isObject(content.result.bridge)) {
      errors.push(`${path}.result.bridge: requerido`);
    } else {
      if (!isString(content.result.bridge.title)) errors.push(`${path}.result.bridge.title: requerido`);
      if (!isString(content.result.bridge.concept)) errors.push(`${path}.result.bridge.concept: requerido`);
    }
  }

  return errors;
}

function validateExploreContent(content: unknown, path: string): string[] {
  const errors: string[] = [];

  if (!isObject(content)) {
    errors.push(`${path}: debe ser un objeto`);
    return errors;
  }

  if (!isString(content.subtitle)) errors.push(`${path}.subtitle: requerido`);

  // Validate intro
  if (!isObject(content.intro)) {
    errors.push(`${path}.intro: requerido`);
  } else {
    if (!isString(content.intro.text)) errors.push(`${path}.intro.text: requerido`);
  }

  // Validate examples
  if (!isArray(content.examples) || content.examples.length === 0) {
    errors.push(`${path}.examples: debe tener al menos 1 ejemplo`);
  } else {
    content.examples.forEach((ex, i) => {
      if (!isObject(ex)) {
        errors.push(`${path}.examples[${i}]: debe ser un objeto`);
      } else {
        if (!isString(ex.id)) errors.push(`${path}.examples[${i}].id: requerido`);
        if (!isString(ex.expression)) errors.push(`${path}.examples[${i}].expression: requerido`);
        if (!isString(ex.result)) errors.push(`${path}.examples[${i}].result: requerido`);
        if (!isString(ex.hint)) errors.push(`${path}.examples[${i}].hint: requerido`);
      }
    });
  }

  // Validate summary
  if (!isObject(content.summary)) {
    errors.push(`${path}.summary: requerido`);
  } else {
    if (!isString(content.summary.title)) errors.push(`${path}.summary.title: requerido`);
  }

  return errors;
}

function validateExplainContent(content: unknown, path: string): string[] {
  const errors: string[] = [];

  if (!isObject(content)) {
    errors.push(`${path}: debe ser un objeto`);
    return errors;
  }

  if (!isString(content.subtitle)) errors.push(`${path}.subtitle: requerido`);

  // Validate tabs
  if (!isArray(content.tabs) || content.tabs.length === 0) {
    errors.push(`${path}.tabs: debe tener al menos 1 tab`);
  } else {
    content.tabs.forEach((tab, i) => {
      errors.push(...validateFormulaTab(tab, `${path}.tabs[${i}]`));
    });
  }

  // Validate tips
  if (!isObject(content.tips)) {
    errors.push(`${path}.tips: requerido`);
  } else {
    if (!isArray(content.tips.correct)) errors.push(`${path}.tips.correct: debe ser un array`);
    if (!isArray(content.tips.errors)) errors.push(`${path}.tips.errors: debe ser un array`);
  }

  return errors;
}

function validatePracticeContent(content: unknown, path: string): string[] {
  const errors: string[] = [];

  if (!isObject(content)) {
    errors.push(`${path}: debe ser un objeto`);
    return errors;
  }

  // Validate problems
  if (!isArray(content.problems) || content.problems.length === 0) {
    errors.push(`${path}.problems: debe tener al menos 1 problema`);
  } else {
    content.problems.forEach((p, i) => {
      errors.push(...validatePracticeProblem(p, `${path}.problems[${i}]`));
    });
  }

  return errors;
}

function validateVerifyContent(content: unknown, path: string): string[] {
  const errors: string[] = [];

  if (!isObject(content)) {
    errors.push(`${path}: debe ser un objeto`);
    return errors;
  }

  // Validate questions
  if (!isArray(content.questions) || content.questions.length === 0) {
    errors.push(`${path}.questions: debe tener al menos 1 pregunta`);
  } else {
    content.questions.forEach((q, i) => {
      errors.push(...validateCheckpointQuestion(q, `${path}.questions[${i}]`));
    });
  }

  return errors;
}

// =============================================================================
// STEP VALIDATORS
// =============================================================================

function validateStep(step: unknown, index: number): string[] {
  const path = `steps[${index}]`;
  const errors: string[] = [];

  if (!isObject(step)) {
    errors.push(`${path}: debe ser un objeto`);
    return errors;
  }

  if (!isString(step.id)) errors.push(`${path}.id: requerido`);
  if (!isString(step.title)) errors.push(`${path}.title: requerido`);

  if (!VALID_STEP_TYPES.includes(step.type as string)) {
    errors.push(`${path}.type: debe ser uno de ${VALID_STEP_TYPES.join(', ')}`);
    return errors;
  }

  // Validate content based on step type
  switch (step.type) {
    case 'hook':
      errors.push(...validateHookContent(step.content, `${path}.content`));
      break;
    case 'explore':
      errors.push(...validateExploreContent(step.content, `${path}.content`));
      break;
    case 'explain':
      errors.push(...validateExplainContent(step.content, `${path}.content`));
      break;
    case 'practice':
      errors.push(...validatePracticeContent(step.content, `${path}.content`));
      break;
    case 'verify':
      errors.push(...validateVerifyContent(step.content, `${path}.content`));
      break;
  }

  return errors;
}

// =============================================================================
// MAIN VALIDATOR
// =============================================================================

/**
 * Validates a DynamicLesson object
 * @param lesson - The lesson object to validate
 * @returns ValidationResult with valid flag and any errors
 */
export function validateDynamicLesson(lesson: unknown): ValidationResult {
  const errors: string[] = [];

  if (!isObject(lesson)) {
    return { valid: false, errors: ['La lección debe ser un objeto'] };
  }

  // Required string fields
  if (!isString(lesson.id)) errors.push('id: requerido');
  if (!isString(lesson.slug)) errors.push('slug: requerido');
  if (!isString(lesson.title)) errors.push('title: requerido');
  if (!isString(lesson.description)) errors.push('description: requerido');

  // Level validation
  if (!VALID_LEVELS.includes(lesson.level as string)) {
    errors.push(`level: debe ser uno de ${VALID_LEVELS.join(', ')}`);
  }

  // Subject validation
  if (!VALID_SUBJECTS.includes(lesson.subject as string)) {
    errors.push(`subject: debe ser uno de ${VALID_SUBJECTS.join(', ')}`);
  }

  // Steps validation
  if (!isArray(lesson.steps) || lesson.steps.length === 0) {
    errors.push('steps: debe tener al menos 1 paso');
  } else {
    lesson.steps.forEach((step, index) => {
      errors.push(...validateStep(step, index));
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Type guard for DynamicLesson
 */
export function isDynamicLesson(value: unknown): value is DynamicLesson {
  return validateDynamicLesson(value).valid;
}

/**
 * Type guard for individual step types
 */
export function isHookStep(step: DynamicStep): step is HookStep {
  return step.type === 'hook';
}

export function isExploreStep(step: DynamicStep): step is ExploreStep {
  return step.type === 'explore';
}

export function isExplainStep(step: DynamicStep): step is ExplainStep {
  return step.type === 'explain';
}

export function isPracticeStep(step: DynamicStep): step is PracticeStep {
  return step.type === 'practice';
}

export function isVerifyStep(step: DynamicStep): step is VerifyStep {
  return step.type === 'verify';
}

/**
 * Parse and validate a JSON string as DynamicLesson
 */
export function parseDynamicLesson(json: string): { lesson: DynamicLesson | null; errors: string[] } {
  try {
    const parsed = JSON.parse(json);
    const validation = validateDynamicLesson(parsed);

    if (validation.valid) {
      return { lesson: parsed as DynamicLesson, errors: [] };
    }

    return { lesson: null, errors: validation.errors };
  } catch (e) {
    return { lesson: null, errors: [`JSON inválido: ${(e as Error).message}`] };
  }
}
