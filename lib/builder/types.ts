/**
 * ============================================================================
 * DYNAMIC LESSON TYPES
 * ============================================================================
 *
 * Types for the data-driven lesson builder system.
 * These schemas allow lessons to be defined as JSON and rendered dynamically.
 */

import { Level, Subject } from '@/lib/types/core';

// =============================================================================
// PRIMITIVE CONTENT TYPES
// =============================================================================

/**
 * Visual element that can be rendered (emoji, SVG, image, or component)
 */
export interface VisualElement {
  type: 'emoji' | 'svg' | 'image' | 'icon';
  /** For emoji: the emoji string. For svg: SVG markup. For image: URL. For icon: lucide icon name */
  content: string;
  /** Optional size class (e.g., 'text-4xl', 'w-8 h-8') */
  size?: string;
}

/**
 * Rich content block that can contain text, LaTeX, highlights, etc.
 */
export interface ContentBlock {
  type: 'text' | 'latex' | 'highlight' | 'bold' | 'mono';
  content: string;
  /** Optional color for highlights (e.g., 'amber', 'blue', 'green') */
  color?: string;
}

/**
 * Color options for themed elements
 */
export type ThemeColor = 'blue' | 'purple' | 'teal' | 'pink' | 'green' | 'amber' | 'orange' | 'red';

// =============================================================================
// STEP-SPECIFIC CONTENT TYPES
// =============================================================================

/**
 * Hook step content - 3-phase engagement pattern
 * Based on: components/lessons/m1/factor-comun/Step1Hook.tsx
 */
export interface HookStepContent {
  /** Subtitle shown below the title */
  subtitle: string;

  /** Phase 1: Scenario presentation */
  scenario: {
    /** Main narrative text (can include HTML for bold/color) */
    text: string;
    /** Visual element for the scenario */
    visual: VisualElement;
    /** Question posed to the user */
    question: string;
  };

  /** Phase 2: Quiz question */
  quiz: {
    /** Reminder text shown above options */
    reminder: string;
    /** Additional context (shown as secondary text) */
    context?: string;
    /** Answer options */
    options: string[];
    /** Index of correct answer (0-based) */
    correctIndex: number;
  };

  /** Phase 3: Result/explanation */
  result: {
    /** Title for the result section */
    title: string;
    /** Step-by-step breakdown (array of content lines) */
    breakdown: string[];
    /** Visual representation of the result */
    visual?: VisualElement;
    /** Bridge to the mathematical concept */
    bridge: {
      title: string;
      /** Main concept explanation */
      concept: string;
      /** Formula or key insight */
      formula?: string;
      /** Additional note/tip */
      note?: string;
    };
  };

  /** Optional custom button text */
  continueButtonText?: string;
}

/**
 * Explore step content - interactive discovery pattern
 */
export interface ExploreStepContent {
  /** Subtitle shown below the title */
  subtitle: string;

  /** Introduction section */
  intro: {
    text: string;
    /** Optional category cards to show */
    categories?: Array<{
      id: string;
      label: string;
      color: ThemeColor;
      examples?: string[];
    }>;
  };

  /** Interactive examples to discover */
  examples: Array<{
    id: string;
    /** The expression or item to explore */
    expression: string;
    /** The result/answer */
    result: string;
    /** Hint shown on hover/click */
    hint: string;
  }>;

  /** Summary after exploration */
  summary: {
    title: string;
    /** Key steps or takeaways */
    steps?: string[];
  };
}

/**
 * Formula tab for explain step
 * Based on: components/lessons/m1/factor-comun/Step3Explain.tsx
 */
export interface FormulaTab {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  /** The formula in displayable format */
  formula: string;
  /** Worked example */
  example: {
    input: string;
    steps: string[];
    result: string;
  };
  color: ThemeColor;
}

/**
 * Explain step content - tabbed theory/concept explanation
 * Based on: components/lessons/m1/factor-comun/Step3Explain.tsx
 */
export interface ExplainStepContent {
  /** Subtitle shown below the title */
  subtitle: string;

  /** Tabs with different concepts/formulas */
  tabs: FormulaTab[];

  /** Tips section (shown as a dedicated tab) */
  tips: {
    /** Things to do correctly */
    correct: string[];
    /** Common errors to avoid */
    errors: string[];
    /** Optional insight/verification tip */
    insight?: {
      title: string;
      text: string;
      /** Optional example showing the insight */
      example?: string;
    };
  };

  /** Whether to show summary cards at the bottom */
  showSummaryCards?: boolean;
}

/**
 * Practice problem definition
 * Based on: components/lessons/m1/factor-comun/Step5Practice.tsx
 */
export interface PracticeProblem {
  id: string;
  /** The question/prompt */
  question: string;
  /** Hint shown when requested */
  hint: string;
  /** Answer options */
  options: string[];
  /** Index of correct answer (0-based) */
  correctAnswer: number;
  /** Explanation shown after answering */
  explanation: string;
}

/**
 * Practice step content - guided exercises with hints
 * Based on: components/lessons/m1/factor-comun/Step5Practice.tsx
 */
export interface PracticeStepContent {
  /** Subtitle shown below the title */
  subtitle?: string;

  /** Badge/tag text (e.g., "Factor Común") */
  badge?: string;

  /** Array of practice problems */
  problems: PracticeProblem[];

  /** Number of correct answers needed to "pass" (default: 80%) */
  requiredCorrect?: number;

  /** Messages for different result levels */
  resultMessages?: {
    perfect?: string;
    good?: string;
    needsPractice?: string;
  };
}

/**
 * Checkpoint question for verify step
 * Based on: components/lessons/shared/CheckpointQuiz.tsx
 */
export interface CheckpointQuestion {
  id: string;
  /** The question text */
  question: string;
  /** Optional LaTeX version of the question */
  questionLatex?: string;
  /** Answer options */
  options: string[];
  /** Index of correct answer (0-based) */
  correctAnswer: number;
  /** Explanation shown after answering */
  explanation: string;
}

/**
 * Verify step content - checkpoint quiz
 * Based on: components/lessons/shared/CheckpointQuiz.tsx
 */
export interface VerifyStepContent {
  /** Optional subtitle override */
  subtitle?: string;

  /** Questions for the checkpoint */
  questions: CheckpointQuestion[];

  /** Number of correct answers required to pass (default: 75% of questions) */
  requiredCorrect?: number;

  /** Message shown when passed */
  successMessage?: string;

  /** Message shown when failed */
  failureMessage?: string;
}

// =============================================================================
// STEP TYPES
// =============================================================================

/** Base properties for all steps */
interface BaseStep {
  id: string;
  title: string;
}

/** Hook step - opening engagement */
export interface HookStep extends BaseStep {
  type: 'hook';
  content: HookStepContent;
}

/** Explore step - interactive discovery */
export interface ExploreStep extends BaseStep {
  type: 'explore';
  content: ExploreStepContent;
}

/** Explain step - theory/concept explanation */
export interface ExplainStep extends BaseStep {
  type: 'explain';
  content: ExplainStepContent;
}

/** Practice step - guided exercises */
export interface PracticeStep extends BaseStep {
  type: 'practice';
  content: PracticeStepContent;
}

/** Verify step - checkpoint quiz */
export interface VerifyStep extends BaseStep {
  type: 'verify';
  content: VerifyStepContent;
}

/** Union of all step types */
export type DynamicStep = HookStep | ExploreStep | ExplainStep | PracticeStep | VerifyStep;

/** Step type string literals */
export type DynamicStepType = DynamicStep['type'];

// =============================================================================
// DYNAMIC LESSON
// =============================================================================

/**
 * Complete dynamic lesson definition
 * Can be rendered by DynamicLessonRenderer
 */
export interface DynamicLesson {
  /** Unique identifier */
  id: string;

  /** URL-friendly slug */
  slug: string;

  /** Display title */
  title: string;

  /** Brief description */
  description: string;

  /** Level (M1 or M2) */
  level: Level;

  /** Subject area */
  subject: Subject;

  /** Thematic unit code (e.g., 'M1-ALG-001') */
  thematicUnit?: string;

  /** Related skills */
  skills?: string[];

  /** Estimated duration in minutes */
  estimatedMinutes?: number;

  /** MINEDUC Learning Objectives */
  minEducOA?: string[];

  /** Ordered array of lesson steps */
  steps: DynamicStep[];

  /** Metadata for builder */
  metadata?: {
    /** When the lesson was created */
    createdAt?: string;
    /** When the lesson was last updated */
    updatedAt?: string;
    /** User who created the lesson */
    authorId?: string;
    /** Whether the lesson is published */
    isPublished?: boolean;
    /** Version number for tracking changes */
    version?: number;
  };
}

// =============================================================================
// HELPER TYPES
// =============================================================================

/**
 * Props for dynamic step components
 */
export interface DynamicStepProps<T extends DynamicStep = DynamicStep> {
  step: T;
  isActive: boolean;
  onComplete: () => void;
  onBack?: () => void;
}

/**
 * Lesson template for builder
 */
export interface LessonTemplate {
  id: string;
  name: string;
  description: string;
  subject: Subject;
  /** Pre-configured lesson structure */
  lesson: Partial<DynamicLesson>;
}
