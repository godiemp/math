/**
 * Skill Progress Utilities
 *
 * Functions to calculate user progress on individual skills based on question attempts
 */

import { QuestionAttempt, MasteryLevel, SkillProgress, SkillProgressSummary, EnhancedSkill } from './types';
import { questions } from './questions';
import { SKILLS } from './skillTaxonomy';
import { skillsArray } from './skillsArray';

// Re-export types for convenience
export type { SkillProgress, SkillProgressSummary };

/**
 * Maps question IDs to their skills
 */
function buildQuestionSkillMap(): Map<string, string[]> {
  const map = new Map<string, string[]>();
  questions.forEach(q => {
    map.set(q.id, q.skills);
  });
  return map;
}

/**
 * Calculates progress for all skills based on question attempts
 */
export function calculateSkillProgress(
  attempts: QuestionAttempt[],
  level?: 'M1' | 'M2'
): Map<string, SkillProgress> {
  const questionSkillMap = buildQuestionSkillMap();
  const skillStats = new Map<string, {
    attempts: number;
    correct: number;
    incorrect: number;
    lastAttempted: number;
  }>();

  // Process each attempt
  attempts.forEach(attempt => {
    // Filter by level if specified
    if (level && attempt.level !== level) {
      return;
    }

    // Get skills for this question
    const skills = questionSkillMap.get(attempt.questionId);
    if (!skills) return;

    // Update stats for each skill
    skills.forEach(skillId => {
      const existing = skillStats.get(skillId) || {
        attempts: 0,
        correct: 0,
        incorrect: 0,
        lastAttempted: 0
      };

      existing.attempts++;
      if (attempt.isCorrect) {
        existing.correct++;
      } else {
        existing.incorrect++;
      }
      existing.lastAttempted = Math.max(existing.lastAttempted, attempt.timestamp);

      skillStats.set(skillId, existing);
    });
  });

  // Build SkillProgress objects
  const progressMap = new Map<string, SkillProgress>();

  skillsArray.forEach(skill => {
    // Filter by level if specified
    if (level && skill.level !== 'Both' && skill.level !== level) {
      return;
    }

    const stats = skillStats.get(skill.id);

    if (!stats) {
      // Skill not attempted yet
      progressMap.set(skill.id, {
        skillId: skill.id,
        skill,
        attemptsCount: 0,
        correctCount: 0,
        incorrectCount: 0,
        accuracy: 0,
        masteryLevel: 'not-started'
      });
    } else {
      // Calculate accuracy and mastery level
      const accuracy = (stats.correct / stats.attempts) * 100;
      let masteryLevel: MasteryLevel;

      if (accuracy >= 80 && stats.attempts >= 3) {
        masteryLevel = 'mastered';
      } else if (stats.attempts > 0) {
        masteryLevel = 'learning';
      } else {
        masteryLevel = 'not-started';
      }

      progressMap.set(skill.id, {
        skillId: skill.id,
        skill,
        attemptsCount: stats.attempts,
        correctCount: stats.correct,
        incorrectCount: stats.incorrect,
        accuracy: Math.round(accuracy),
        lastAttempted: stats.lastAttempted,
        masteryLevel
      });
    }
  });

  return progressMap;
}

/**
 * Summarizes skill progress by mastery level
 */
export function summarizeSkillProgress(
  attempts: QuestionAttempt[],
  level?: 'M1' | 'M2'
): SkillProgressSummary {
  const progressMap = calculateSkillProgress(attempts, level);
  const allProgress = Array.from(progressMap.values());

  const mastered = allProgress.filter(p => p.masteryLevel === 'mastered');
  const learning = allProgress.filter(p => p.masteryLevel === 'learning');
  const notStarted = allProgress.filter(p => p.masteryLevel === 'not-started');

  // Sort each category
  mastered.sort((a, b) => b.accuracy - a.accuracy);
  learning.sort((a, b) => {
    // Sort by attempts (more attempts first), then by accuracy
    if (a.attemptsCount !== b.attemptsCount) {
      return b.attemptsCount - a.attemptsCount;
    }
    return b.accuracy - a.accuracy;
  });

  // Sort not started by whether they have prerequisites mastered
  notStarted.sort((a, b) => {
    const aPrereqsMet = a.skill.prerequisites.every(prereq => {
      const prereqProgress = progressMap.get(prereq);
      return prereqProgress?.masteryLevel === 'mastered';
    });
    const bPrereqsMet = b.skill.prerequisites.every(prereq => {
      const prereqProgress = progressMap.get(prereq);
      return prereqProgress?.masteryLevel === 'mastered';
    });

    // Skills with met prerequisites come first
    if (aPrereqsMet !== bPrereqsMet) {
      return aPrereqsMet ? -1 : 1;
    }

    // Then sort by whether they're core skills
    if (a.skill.isCore !== b.skill.isCore) {
      return a.skill.isCore ? -1 : 1;
    }

    return 0;
  });

  const totalAttempts = allProgress.reduce((sum, p) => sum + p.attemptsCount, 0);
  const totalCorrect = allProgress.reduce((sum, p) => sum + p.correctCount, 0);
  const overallAccuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

  return {
    mastered,
    learning,
    notStarted,
    totalSkills: allProgress.length,
    totalAttempts,
    overallAccuracy
  };
}

/**
 * Gets recommended next skills to practice based on current progress
 */
export function getRecommendedSkills(
  attempts: QuestionAttempt[],
  level?: 'M1' | 'M2',
  limit: number = 5
): SkillProgress[] {
  const summary = summarizeSkillProgress(attempts, level);
  const progressMap = calculateSkillProgress(attempts, level);
  const recommended: SkillProgress[] = [];

  // Priority 1: Skills currently learning with low accuracy (need improvement)
  const needsImprovement = summary.learning
    .filter(p => p.accuracy < 60)
    .slice(0, limit);
  recommended.push(...needsImprovement);

  // Priority 2: Not started skills with prerequisites met and are core
  if (recommended.length < limit) {
    const readyToLearn = summary.notStarted.filter(p => {
      const prereqsMet = p.skill.prerequisites.every(prereq => {
        const prereqProgress = progressMap.get(prereq);
        return !prereqProgress || prereqProgress.masteryLevel === 'mastered';
      });
      return prereqsMet && p.skill.isCore;
    }).slice(0, limit - recommended.length);
    recommended.push(...readyToLearn);
  }

  // Priority 3: Any not started skills with prerequisites met
  if (recommended.length < limit) {
    const readyToLearn = summary.notStarted.filter(p => {
      const prereqsMet = p.skill.prerequisites.every(prereq => {
        const prereqProgress = progressMap.get(prereq);
        return !prereqProgress || prereqProgress.masteryLevel === 'mastered';
      });
      return prereqsMet && !p.skill.isCore;
    }).slice(0, limit - recommended.length);
    recommended.push(...readyToLearn);
  }

  return recommended.slice(0, limit);
}

/**
 * Gets skills grouped by topic
 */
export function getSkillProgressByTopic(
  attempts: QuestionAttempt[],
  level?: 'M1' | 'M2'
): Map<string, SkillProgress[]> {
  const progressMap = calculateSkillProgress(attempts, level);
  const byTopic = new Map<string, SkillProgress[]>();

  progressMap.forEach(progress => {
    const topic = progress.skill.topic;
    if (!byTopic.has(topic)) {
      byTopic.set(topic, []);
    }
    byTopic.get(topic)!.push(progress);
  });

  // Sort within each topic by mastery level and accuracy
  byTopic.forEach(skills => {
    skills.sort((a, b) => {
      const masteryOrder = { 'mastered': 0, 'learning': 1, 'not-started': 2 };
      if (a.masteryLevel !== b.masteryLevel) {
        return masteryOrder[a.masteryLevel] - masteryOrder[b.masteryLevel];
      }
      return b.accuracy - a.accuracy;
    });
  });

  return byTopic;
}
