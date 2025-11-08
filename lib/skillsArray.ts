/**
 * Enhanced Skills Array for PAES Math Curriculum
 *
 * This file provides a comprehensive skills array with metadata including:
 * - Question counts per skill
 * - Difficulty levels
 * - Level distribution (M1/M2)
 * - Competencies mapping
 * - Learning paths and prerequisites
 */

import { SKILLS, Skill, getSkillsByTopic } from './skillTaxonomy';
import { questions } from './questions';

// Define the four core PAES competencies
export type Competency = 'Resolver' | 'Modelar' | 'Representar' | 'Argumentar';

// Enhanced skill interface with additional metadata
export interface EnhancedSkill extends Skill {
  // Statistics from question analysis
  questionCount: number;
  m1QuestionCount: number;
  m2QuestionCount: number;

  // Difficulty distribution
  easyCount: number;
  mediumCount: number;
  hardCount: number;
  averageDifficulty: number; // 1 = easy, 2 = medium, 3 = hard

  // Competencies this skill supports
  competencies: Competency[];

  // Learning metadata
  prerequisites: string[]; // Skills that should be learned first
  relatedSkills: string[]; // Skills commonly used together

  // Curriculum integration
  isCore: boolean; // Is this a fundamental skill?
  level: 'M1' | 'M2' | 'Both'; // Which level primarily uses this skill
}

/**
 * Analyzes all questions to build skill statistics
 */
function analyzeSkillUsage(): Map<string, {
  total: number;
  m1: number;
  m2: number;
  easy: number;
  medium: number;
  hard: number;
}> {
  const stats = new Map<string, {
    total: number;
    m1: number;
    m2: number;
    easy: number;
    medium: number;
    hard: number;
  }>();

  // Initialize all skills with zero counts
  Object.keys(SKILLS).forEach(skillId => {
    stats.set(skillId, {
      total: 0,
      m1: 0,
      m2: 0,
      easy: 0,
      medium: 0,
      hard: 0
    });
  });

  // Analyze each question
  questions.forEach(question => {
    question.skills.forEach(skillId => {
      const stat = stats.get(skillId);
      if (stat) {
        stat.total++;

        // Track by level
        if (question.level === 'M1') {
          stat.m1++;
        } else {
          stat.m2++;
        }

        // Track by difficulty
        if (question.difficulty === 'easy') {
          stat.easy++;
        } else if (question.difficulty === 'medium') {
          stat.medium++;
        } else {
          stat.hard++;
        }
      }
    });
  });

  return stats;
}

/**
 * Maps skills to the PAES competencies they support
 */
function getSkillCompetencies(skillId: string): Competency[] {
  // Map skills to competencies based on their nature
  const competencyMap: Record<string, Competency[]> = {
    // Resolver: Problem-solving and calculation skills
    'numeros-operaciones-basicas': ['Resolver'],
    'numeros-fracciones': ['Resolver'],
    'numeros-decimales': ['Resolver'],
    'numeros-potencias': ['Resolver'],
    'numeros-raices': ['Resolver'],
    'algebra-ecuaciones-lineales': ['Resolver', 'Argumentar'],
    'algebra-sistemas-ecuaciones': ['Resolver', 'Argumentar'],
    'algebra-ecuaciones-cuadraticas': ['Resolver', 'Argumentar'],
    'geometria-area': ['Resolver'],
    'geometria-volumen': ['Resolver'],
    'geometria-perimetro': ['Resolver'],
    'estadistica-media': ['Resolver'],
    'estadistica-mediana': ['Resolver'],
    'probabilidad-basica': ['Resolver'],

    // Modelar: Translating real-world situations to math
    'numeros-proporcionalidad': ['Modelar', 'Resolver'],
    'numeros-porcentajes': ['Modelar', 'Resolver'],
    'algebra-funciones': ['Modelar', 'Representar'],
    'algebra-funciones-lineales': ['Modelar', 'Representar'],
    'geometria-pitagoras': ['Modelar', 'Resolver'],
    'probabilidad-eventos-compuestos': ['Modelar', 'Resolver'],

    // Representar: Working with different representations
    'algebra-expresiones': ['Representar'],
    'geometria-plano-cartesiano': ['Representar'],
    'algebra-pendiente': ['Representar', 'Argumentar'],
    'estadistica-cuartiles': ['Representar', 'Argumentar'],

    // Argumentar: Justifying and explaining
    'algebra-despeje': ['Argumentar', 'Resolver'],
    'geometria-angulos': ['Argumentar'],
    'algebra-discriminante': ['Argumentar', 'Resolver'],
  };

  // Return specific competencies or default to Resolver
  return competencyMap[skillId] || ['Resolver'];
}

/**
 * Determines prerequisite skills for a given skill
 */
function getPrerequisites(skill: Skill): string[] {
  const prerequisites: string[] = [];

  // If skill has a parent, the parent is a prerequisite
  if (skill.parentSkill) {
    prerequisites.push(skill.parentSkill);
  }

  // Add specific prerequisite relationships
  const prereqMap: Record<string, string[]> = {
    'algebra-ecuaciones-cuadraticas': ['algebra-ecuaciones-lineales', 'algebra-factorizacion'],
    'algebra-sistemas-ecuaciones': ['algebra-ecuaciones-lineales'],
    'geometria-pitagoras': ['numeros-raices', 'geometria-triangulos'],
    'numeros-proporcionalidad-inversa': ['numeros-proporcionalidad-directa'],
    'algebra-funciones-lineales': ['algebra-funciones'],
    'estadistica-rango-intercuartilico': ['estadistica-cuartiles'],
    'probabilidad-combinaciones': ['probabilidad-factorial'],
  };

  if (prereqMap[skill.id]) {
    prerequisites.push(...prereqMap[skill.id]);
  }

  return [...new Set(prerequisites)]; // Remove duplicates
}

/**
 * Finds skills commonly used together
 */
function getRelatedSkills(skillId: string): string[] {
  const relatedCount = new Map<string, number>();

  // Find questions that use this skill
  const questionsWithSkill = questions.filter(q => q.skills.includes(skillId));

  // Count how often other skills appear with this skill
  questionsWithSkill.forEach(question => {
    question.skills.forEach(otherSkillId => {
      if (otherSkillId !== skillId) {
        relatedCount.set(otherSkillId, (relatedCount.get(otherSkillId) || 0) + 1);
      }
    });
  });

  // Return skills that appear with this skill at least 2 times, sorted by frequency
  return Array.from(relatedCount.entries())
    .filter(([_, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .map(([skillId, _]) => skillId)
    .slice(0, 5); // Top 5 related skills
}

/**
 * Determines if a skill is "core" (fundamental/frequently used)
 */
function isCoreSkill(skillId: string, questionCount: number): boolean {
  // Core skills are either:
  // 1. Used in many questions (5+)
  // 2. Explicitly marked as foundational
  const foundationalSkills = [
    'numeros-operaciones-basicas',
    'numeros-fracciones',
    'algebra-ecuaciones-lineales',
    'geometria-area',
    'geometria-perimetro',
    'probabilidad-basica',
    'estadistica-media'
  ];

  return questionCount >= 5 || foundationalSkills.includes(skillId);
}

/**
 * Build the enhanced skills array
 */
function buildEnhancedSkills(): EnhancedSkill[] {
  const usage = analyzeSkillUsage();
  const enhancedSkills: EnhancedSkill[] = [];

  Object.values(SKILLS).forEach(skill => {
    const stats = usage.get(skill.id) || {
      total: 0,
      m1: 0,
      m2: 0,
      easy: 0,
      medium: 0,
      hard: 0
    };

    // Calculate average difficulty (1 = easy, 2 = medium, 3 = hard)
    const totalWeighted = (stats.easy * 1) + (stats.medium * 2) + (stats.hard * 3);
    const averageDifficulty = stats.total > 0
      ? totalWeighted / stats.total
      : 1;

    // Determine primary level
    let level: 'M1' | 'M2' | 'Both' = 'M1';
    if (stats.m1 > 0 && stats.m2 > 0) {
      level = 'Both';
    } else if (stats.m2 > 0) {
      level = 'M2';
    }

    enhancedSkills.push({
      ...skill,
      questionCount: stats.total,
      m1QuestionCount: stats.m1,
      m2QuestionCount: stats.m2,
      easyCount: stats.easy,
      mediumCount: stats.medium,
      hardCount: stats.hard,
      averageDifficulty: Math.round(averageDifficulty * 100) / 100,
      competencies: getSkillCompetencies(skill.id),
      prerequisites: getPrerequisites(skill),
      relatedSkills: getRelatedSkills(skill.id),
      isCore: isCoreSkill(skill.id, stats.total),
      level
    });
  });

  return enhancedSkills;
}

/**
 * Build all enhanced skills
 */
const allEnhancedSkills = buildEnhancedSkills();

/**
 * M1 Skills Array - Skills for Competencia Matemática M1
 * Includes skills marked as 'M1' or 'Both'
 */
export const m1SkillsArray: EnhancedSkill[] = allEnhancedSkills.filter(
  skill => skill.level === 'M1' || skill.level === 'Both'
);

/**
 * M2 Skills Array - Skills for Competencia Matemática M2
 * Includes skills marked as 'M2' or 'Both'
 */
export const m2SkillsArray: EnhancedSkill[] = allEnhancedSkills.filter(
  skill => skill.level === 'M2' || skill.level === 'Both'
);

/**
 * All skills combined (for backward compatibility)
 */
export const skillsArray: EnhancedSkill[] = allEnhancedSkills;

/**
 * Get skills by topic for a specific level
 */
export function getSkillsByTopic(
  topic: 'números' | 'álgebra' | 'geometría' | 'probabilidad',
  level: 'M1' | 'M2'
): EnhancedSkill[] {
  const skills = level === 'M1' ? m1SkillsArray : m2SkillsArray;
  return skills.filter(skill => skill.topic === topic);
}

/**
 * Get core skills for a specific level
 */
export function getCoreSkills(level: 'M1' | 'M2'): EnhancedSkill[] {
  const skills = level === 'M1' ? m1SkillsArray : m2SkillsArray;
  return skills.filter(skill => skill.isCore);
}

/**
 * Get skills by competency for a specific level
 */
export function getSkillsByCompetency(
  competency: Competency,
  level: 'M1' | 'M2'
): EnhancedSkill[] {
  const skills = level === 'M1' ? m1SkillsArray : m2SkillsArray;
  return skills.filter(skill => skill.competencies.includes(competency));
}

/**
 * Get skill learning path
 * Returns skills in order they should be learned (prerequisites first)
 */
export function getSkillLearningPath(skillId: string, level: 'M1' | 'M2'): EnhancedSkill[] {
  const visited = new Set<string>();
  const path: EnhancedSkill[] = [];
  const skills = level === 'M1' ? m1SkillsArray : m2SkillsArray;

  function addSkillAndPrereqs(id: string) {
    if (visited.has(id)) return;
    visited.add(id);

    const skill = skills.find(s => s.id === id);
    if (!skill) return;

    // Add prerequisites first
    skill.prerequisites.forEach(prereqId => {
      addSkillAndPrereqs(prereqId);
    });

    // Then add the skill itself
    path.push(skill);
  }

  addSkillAndPrereqs(skillId);
  return path;
}

/**
 * Get skills grouped by topic and sorted by difficulty for a specific level
 */
export function getSkillsByTopicSorted(level: 'M1' | 'M2'): Record<string, EnhancedSkill[]> {
  const topics: ('números' | 'álgebra' | 'geometría' | 'probabilidad')[] =
    ['números', 'álgebra', 'geometría', 'probabilidad'];

  const grouped: Record<string, EnhancedSkill[]> = {};

  topics.forEach(topic => {
    grouped[topic] = getSkillsByTopic(topic, level)
      .sort((a, b) => a.averageDifficulty - b.averageDifficulty);
  });

  return grouped;
}

/**
 * Get summary statistics for a specific level
 */
export function getSkillsSummary(level: 'M1' | 'M2') {
  const skills = level === 'M1' ? m1SkillsArray : m2SkillsArray;

  const byTopic = {
    números: skills.filter(s => s.topic === 'números').length,
    álgebra: skills.filter(s => s.topic === 'álgebra').length,
    geometría: skills.filter(s => s.topic === 'geometría').length,
    probabilidad: skills.filter(s => s.topic === 'probabilidad').length
  };

  const byCompetency = {
    Resolver: skills.filter(s => s.competencies.includes('Resolver')).length,
    Modelar: skills.filter(s => s.competencies.includes('Modelar')).length,
    Representar: skills.filter(s => s.competencies.includes('Representar')).length,
    Argumentar: skills.filter(s => s.competencies.includes('Argumentar')).length
  };

  return {
    totalSkills: skills.length,
    coreSkills: skills.filter(s => s.isCore).length,
    byTopic,
    byCompetency
  };
}

/**
 * Export for backward compatibility
 */
export { SKILLS } from './skillTaxonomy';
