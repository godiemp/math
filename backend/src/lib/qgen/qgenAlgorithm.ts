/**
 * QGen Algorithm - Question Generation Algorithm
 *
 * Implements the progressive question generation algorithm based on:
 * - Atomic skills
 * - Real-world contexts
 * - Question templates
 * - Progressive complexity (n₁, n₂, n₃, ...)
 */

import {
  Context,
  Template,
  Goal,
  Problem,
  Situation,
  ProgressiveQuestion,
  QGenInput,
  QGenOutput,
  Level,
  Subject,
  DifficultyLevel,
} from '../types/core';
import { ValueGenerator } from './valueGenerator';
import { getCompatibleGoals } from './goalSkillMappings';
import { getContextsSupportingAllSkills } from './contextLibrary';
import { getCompatibleTemplates } from './templateLibrary';

/**
 * QGen Algorithm Implementation
 */
export class QGenAlgorithm {
  private valueGenerator: ValueGenerator;

  constructor(seed?: number) {
    this.valueGenerator = new ValueGenerator({ seed });
  }

  /**
   * Main QGen algorithm
   * Generates a progressive sequence of questions based on input parameters
   */
  generate(input: QGenInput): QGenOutput {
    // Step 1: Choose a context that supports all target skills
    const context = this.chooseContext(input.targetSkills, input.contextLibrary);

    if (!context) {
      throw new Error(
        `No context found that supports all skills: ${input.targetSkills.join(', ')}`
      );
    }

    // Step 2: Start with the simplest skills
    const skillProgression = this.createSkillProgression(input.targetSkills);

    // Step 3: Generate progressive questions
    const questions = this.generateProgressiveQuestions(
      skillProgression,
      context,
      input.templateLibrary,
      input.goalMap,
      input.numberOfQuestions
    );

    // Step 4: Create the problem and situation structures
    const problem = this.createProblem(input.targetSkills, context, input.level, input.subject);
    const situation = this.createSituation(problem, context, questions);

    return {
      problem,
      situation,
      questions,
    };
  }

  /**
   * Step 1: Choose a context that supports all target skills
   */
  private chooseContext(targetSkills: string[], contextLibrary: Context[]): Context | null {
    const compatibleContexts = contextLibrary.filter((ctx) =>
      targetSkills.every((skill) => ctx.compatibleSkills.includes(skill))
    );

    if (compatibleContexts.length === 0) {
      // Try to find a context that supports at least some skills
      const partialContexts = contextLibrary.filter((ctx) =>
        targetSkills.some((skill) => ctx.compatibleSkills.includes(skill))
      );

      if (partialContexts.length > 0) {
        return partialContexts[0];
      }

      return null;
    }

    // Return the first compatible context (can be randomized)
    return compatibleContexts[0];
  }

  /**
   * Step 2: Create a progression of skills from simplest to most complex
   * Start with minimal skills and gradually add more
   */
  private createSkillProgression(targetSkills: string[]): string[][] {
    const progression: string[][] = [];

    // Start with 1 skill, then 2, then 3, etc.
    for (let i = 1; i <= targetSkills.length; i++) {
      progression.push(targetSkills.slice(0, i));
    }

    return progression;
  }

  /**
   * Step 3: Generate progressive questions
   */
  private generateProgressiveQuestions(
    skillProgression: string[][],
    context: Context,
    templateLibrary: Template[],
    goalMap: any[],
    numberOfQuestions: number
  ): ProgressiveQuestion[] {
    const questions: ProgressiveQuestion[] = [];
    let previousQuestionId: string | undefined;

    for (let i = 0; i < numberOfQuestions && i < skillProgression.length; i++) {
      const currentSkills = skillProgression[i];

      // Find compatible goals for current skills
      const compatibleGoals = getCompatibleGoals(currentSkills);

      if (compatibleGoals.length === 0) {
        console.warn(`No compatible goals found for skills: ${currentSkills.join(', ')}`);
        continue;
      }

      // Find templates compatible with context and current skills
      const compatibleTemplates = templateLibrary.filter(
        (tmpl) =>
          tmpl.compatibleContexts.includes(context.id) &&
          tmpl.requiredSkills.some((skill) => currentSkills.includes(skill)) &&
          compatibleGoals.includes(tmpl.goalId)
      );

      if (compatibleTemplates.length === 0) {
        console.warn(
          `No compatible templates found for skills: ${currentSkills.join(', ')} and context: ${context.id}`
        );
        continue;
      }

      // Pick a template (first one for now, can be randomized)
      const template = compatibleTemplates[0];

      // Generate values for the template
      const values = this.valueGenerator.generateValuesWithConstraints(
        template.variables,
        template.constraints
      );

      // Fill the template
      const questionText = this.valueGenerator.fillTemplate(template.templateText, values);
      const questionLatex = template.templateLatex
        ? this.valueGenerator.fillTemplate(template.templateLatex, values)
        : undefined;

      // Generate answer options (placeholder - should be context-specific)
      const { options, optionsLatex, correctAnswer, explanation, explanationLatex } =
        this.generateAnswerOptions(template, values, questionText);

      // Create the progressive question
      const question: ProgressiveQuestion = {
        id: `pq-temp-${i + 1}`,
        situationId: 'sit-temp',
        templateId: template.id,
        goalId: template.goalId,
        questionIndex: i + 1,
        question: questionText,
        questionLatex,
        options,
        optionsLatex,
        correctAnswer,
        explanation,
        explanationLatex,
        difficulty: this.determineDifficulty(currentSkills.length, i),
        skillsTested: currentSkills,
        buildsOn: previousQuestionId,
        createdAt: Date.now(),
      };

      questions.push(question);
      previousQuestionId = question.id;
    }

    return questions;
  }

  /**
   * Generate answer options for a question
   * This is a placeholder - real implementation would be context-specific
   */
  private generateAnswerOptions(
    template: Template,
    values: Record<string, any>,
    questionText: string
  ): {
    options: string[];
    optionsLatex?: string[];
    correctAnswer: number;
    explanation: string;
    explanationLatex?: string;
  } {
    // This is a simplified placeholder
    // Real implementation would calculate the correct answer based on the template and values

    return {
      options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
      correctAnswer: 0,
      explanation: 'Explicación de la respuesta correcta.',
    };
  }

  /**
   * Determine difficulty based on number of skills and question index
   */
  private determineDifficulty(numSkills: number, questionIndex: number): DifficultyLevel {
    if (numSkills === 1 && questionIndex === 0) {
      return 'easy';
    } else if (numSkills <= 2 && questionIndex <= 1) {
      return 'medium';
    } else {
      return 'hard';
    }
  }

  /**
   * Create a Problem entity
   */
  private createProblem(
    skillIds: string[],
    context: Context,
    level: Level,
    subject: Subject
  ): Problem {
    return {
      id: `prob-${level.toLowerCase()}-${subject}-${Date.now()}`,
      level,
      subject,
      topic: this.getTopicFromSubject(subject),
      skillIds,
      contextId: context.id,
      generatedBy: 'qgen',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
  }

  /**
   * Create a Situation entity
   */
  private createSituation(
    problem: Problem,
    context: Context,
    questions: ProgressiveQuestion[]
  ): Situation {
    const situationId = `sit-${problem.id}-01`;

    // Update question IDs to reference this situation
    questions.forEach((q, index) => {
      q.id = `${situationId}-n${index + 1}`;
      q.situationId = situationId;
      if (index > 0) {
        q.buildsOn = `${situationId}-n${index}`;
      }
    });

    return {
      id: situationId,
      problemId: problem.id,
      contextId: context.id,
      contextText: context.description,
      situationOrder: 1,
      createdAt: Date.now(),
      questions,
    };
  }

  /**
   * Get topic name from subject
   */
  private getTopicFromSubject(subject: Subject): string {
    const topicMap: Record<Subject, string> = {
      números: 'Números y Proporcionalidad',
      álgebra: 'Álgebra y Funciones',
      geometría: 'Geometría',
      probabilidad: 'Probabilidad y Estadística',
    };

    return topicMap[subject];
  }
}

/**
 * Helper function to generate questions
 */
export function generateQuestions(input: QGenInput): QGenOutput {
  const qgen = new QGenAlgorithm(input.numberOfQuestions);
  return qgen.generate(input);
}

/**
 * Helper function to generate multiple question sets
 */
export function generateMultipleQuestionSets(
  input: QGenInput,
  numSets: number
): QGenOutput[] {
  const results: QGenOutput[] = [];

  for (let i = 0; i < numSets; i++) {
    const qgen = new QGenAlgorithm(Date.now() + i);
    results.push(qgen.generate(input));
  }

  return results;
}
