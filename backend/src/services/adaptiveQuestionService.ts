import { pool } from '../config/database';
import { questions } from '../../../lib/questions';
import { Question } from '../../../lib/types';

/**
 * Skill mastery information
 */
interface SkillMastery {
  skillId: string;
  attempts: number;
  correct: number;
  accuracy: number;
  lastAttempted: number;
  masteryLevel: 'not-started' | 'learning' | 'mastered';
}

/**
 * Question with priority score for adaptive selection
 */
interface ScoredQuestion {
  question: Question;
  score: number;
}

/**
 * Calculate skill mastery from user's quiz attempts
 */
async function calculateSkillMastery(userId: string, level?: 'M1' | 'M2'): Promise<Map<string, SkillMastery>> {
  let query = `
    SELECT skills, is_correct, attempted_at
    FROM quiz_attempts
    WHERE user_id = $1
  `;

  const queryParams: any[] = [userId];

  if (level) {
    query += ` AND level = $2`;
    queryParams.push(level);
  }

  query += ` ORDER BY attempted_at DESC`;

  const result = await pool.query(query, queryParams);

  // Map of skillId -> stats
  const skillStats = new Map<string, {
    attempts: number;
    correct: number;
    lastAttempted: number;
  }>();

  // Process each attempt
  result.rows.forEach(row => {
    const skills = Array.isArray(row.skills) ? row.skills : [];
    const isCorrect = row.is_correct;
    const attemptedAt = parseInt(row.attempted_at, 10);

    skills.forEach((skillId: string) => {
      const existing = skillStats.get(skillId) || {
        attempts: 0,
        correct: 0,
        lastAttempted: 0
      };

      existing.attempts++;
      if (isCorrect) {
        existing.correct++;
      }
      existing.lastAttempted = Math.max(existing.lastAttempted, attemptedAt);

      skillStats.set(skillId, existing);
    });
  });

  // Build SkillMastery objects
  const masteryMap = new Map<string, SkillMastery>();

  skillStats.forEach((stats, skillId) => {
    const accuracy = stats.attempts > 0 ? (stats.correct / stats.attempts) * 100 : 0;
    let masteryLevel: 'not-started' | 'learning' | 'mastered';

    if (accuracy >= 80 && stats.attempts >= 3) {
      masteryLevel = 'mastered';
    } else if (stats.attempts > 0) {
      masteryLevel = 'learning';
    } else {
      masteryLevel = 'not-started';
    }

    masteryMap.set(skillId, {
      skillId,
      attempts: stats.attempts,
      correct: stats.correct,
      accuracy: Math.round(accuracy),
      lastAttempted: stats.lastAttempted,
      masteryLevel
    });
  });

  return masteryMap;
}

/**
 * Get recently attempted question IDs (last 7 days)
 */
async function getRecentQuestionIds(userId: string, level?: 'M1' | 'M2'): Promise<Set<string>> {
  const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);

  let query = `
    SELECT DISTINCT question_id
    FROM quiz_attempts
    WHERE user_id = $1 AND attempted_at > $2
  `;

  const queryParams: any[] = [userId, sevenDaysAgo];

  if (level) {
    query += ` AND level = $3`;
    queryParams.push(level);
  }

  const result = await pool.query(query, queryParams);

  return new Set(result.rows.map(row => row.question_id));
}

/**
 * Calculate priority score for a question based on user's skill mastery
 * Higher score = higher priority
 */
function calculateQuestionScore(
  question: Question,
  skillMastery: Map<string, SkillMastery>,
  recentQuestionIds: Set<string>
): number {
  let score = 0;

  // Heavily penalize recently seen questions
  if (recentQuestionIds.has(question.id)) {
    return 0.01; // Nearly zero priority
  }

  // Calculate skill-based priority
  const questionSkills = question.skills || [];

  if (questionSkills.length === 0) {
    // Questions without skills get medium priority
    return 50;
  }

  // For each skill the question tests, add priority based on mastery level
  questionSkills.forEach(skillId => {
    const mastery = skillMastery.get(skillId);

    if (!mastery) {
      // Not started - high priority (learning new skills)
      score += 70;
    } else if (mastery.masteryLevel === 'learning') {
      // Currently learning - prioritize based on accuracy
      if (mastery.accuracy < 40) {
        // Very low accuracy - very high priority (struggling)
        score += 100;
      } else if (mastery.accuracy < 60) {
        // Low accuracy - high priority (needs improvement)
        score += 85;
      } else if (mastery.accuracy < 80) {
        // Medium accuracy - medium-high priority (almost mastered)
        score += 70;
      } else {
        // High accuracy but not mastered - medium priority
        score += 50;
      }
    } else if (mastery.masteryLevel === 'mastered') {
      // Mastered - low priority (occasional review)
      score += 20;
    }
  });

  // Average the score across all skills
  score = score / questionSkills.length;

  return score;
}

/**
 * Weighted random sampling
 * Selects items based on their scores (higher score = higher probability)
 */
function weightedRandomSelect<T>(items: T[], weights: number[], count: number): T[] {
  if (items.length === 0) return [];
  if (items.length <= count) return [...items];

  const selected: T[] = [];
  const remaining = [...items];
  const remainingWeights = [...weights];

  for (let i = 0; i < count && remaining.length > 0; i++) {
    // Calculate total weight
    const totalWeight = remainingWeights.reduce((sum, w) => sum + w, 0);

    if (totalWeight === 0) {
      // If all weights are 0, select randomly
      const randomIndex = Math.floor(Math.random() * remaining.length);
      selected.push(remaining[randomIndex]);
      remaining.splice(randomIndex, 1);
      remainingWeights.splice(randomIndex, 1);
      continue;
    }

    // Select based on weight
    let random = Math.random() * totalWeight;
    let selectedIndex = 0;

    for (let j = 0; j < remainingWeights.length; j++) {
      random -= remainingWeights[j];
      if (random <= 0) {
        selectedIndex = j;
        break;
      }
    }

    selected.push(remaining[selectedIndex]);
    remaining.splice(selectedIndex, 1);
    remainingWeights.splice(selectedIndex, 1);
  }

  return selected;
}

/**
 * Difficulty order for sorting (easy → hard)
 */
const DIFFICULTY_ORDER: Record<string, number> = {
  'easy': 1,
  'medium': 2,
  'hard': 3,
  'extreme': 4
};

/**
 * Get adaptive question selection for a user
 * Questions are selected based on skill mastery and learning needs
 */
export async function getAdaptiveQuestions(
  userId: string,
  level: 'M1' | 'M2',
  count: number = 10,
  subject?: 'números' | 'álgebra' | 'geometría' | 'probabilidad'
): Promise<Question[]> {
  // Get user's skill mastery
  const skillMastery = await calculateSkillMastery(userId, level);

  // Get recently attempted questions
  const recentQuestionIds = await getRecentQuestionIds(userId, level);

  // Filter questions by level and subject
  let availableQuestions = questions.filter(q => q.level === level);

  if (subject) {
    availableQuestions = availableQuestions.filter(q => q.subject === subject);
  }

  // If not enough questions, return all available
  if (availableQuestions.length <= count) {
    return availableQuestions.sort((a, b) =>
      (DIFFICULTY_ORDER[a.difficulty] || 0) - (DIFFICULTY_ORDER[b.difficulty] || 0)
    );
  }

  // Calculate scores for each question
  const scoredQuestions: ScoredQuestion[] = availableQuestions.map(q => ({
    question: q,
    score: calculateQuestionScore(q, skillMastery, recentQuestionIds)
  }));

  // Extract questions and scores
  const questionsArray = scoredQuestions.map(sq => sq.question);
  const scoresArray = scoredQuestions.map(sq => sq.score);

  // Select questions using weighted random sampling
  const selectedQuestions = weightedRandomSelect(questionsArray, scoresArray, count);

  // Sort by difficulty (easy → hard) for progressive learning
  selectedQuestions.sort((a, b) =>
    (DIFFICULTY_ORDER[a.difficulty] || 0) - (DIFFICULTY_ORDER[b.difficulty] || 0)
  );

  return selectedQuestions;
}

/**
 * Fallback to random selection if adaptive selection fails
 */
export function getRandomQuestionsFallback(
  level: 'M1' | 'M2',
  count: number = 10,
  subject?: 'números' | 'álgebra' | 'geometría' | 'probabilidad'
): Question[] {
  let levelQuestions = questions.filter(q => q.level === level);

  if (subject) {
    levelQuestions = levelQuestions.filter(q => q.subject === subject);
  }

  if (levelQuestions.length <= count) {
    return [...levelQuestions].sort(() => Math.random() - 0.5);
  }

  // Fisher-Yates shuffle
  const shuffled = [...levelQuestions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}
