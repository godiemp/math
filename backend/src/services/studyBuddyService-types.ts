/**
 * Study Buddy Service - Types and Analysis
 * Type definitions, interfaces, and progress analysis functions
 */

export interface UserData {
  userId?: string; // Optional for backwards compatibility, required for database tools
  displayName: string;
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string | null;
}

export interface ProgressData {
  recentSessions?: Array<{
    date: string;
    score: number;
    topic: string;
    questionsAnswered: number;
  }>;
  skillProgress?: Record<string, {
    attempts: number;
    correct: number;
    accuracy: number;
  }>;
  topicAccuracy?: Record<string, {
    total: number;
    correct: number;
    accuracy: number;
  }>;
  totalQuestionsAnswered?: number;
  overallAccuracy?: number;
}

export interface GreetingOptions {
  userData: UserData;
  progressData: ProgressData;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
}

export interface GreetingResponse {
  greeting: string;
  insights: string[];
  focusAreas: string[];
  encouragement: string;
  conversationStarter: string;
  success: boolean;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ContinueChatOptions {
  userData: UserData;
  progressData: ProgressData;
  messages: ChatMessage[];
  userMessage: string;
}

export interface ChatResponse {
  response: string;
  success: boolean;
}

/**
 * Analyze user progress and generate insights
 */
export function analyzeProgress(progressData: ProgressData): {
  strengths: string[];
  weaknesses: string[];
  trends: string[];
} {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const trends: string[] = [];

  // Analyze topic accuracy
  if (progressData.topicAccuracy) {
    const topics = Object.entries(progressData.topicAccuracy);
    topics.forEach(([topic, stats]) => {
      if (stats.total >= 5) { // Only consider topics with enough data
        if (stats.accuracy >= 80) {
          strengths.push(`${topic} (${stats.accuracy.toFixed(0)}% de precisión)`);
        } else if (stats.accuracy < 60) {
          weaknesses.push(`${topic} (${stats.accuracy.toFixed(0)}% de precisión)`);
        }
      }
    });
  }

  // Analyze recent session trends
  if (progressData.recentSessions && progressData.recentSessions.length >= 2) {
    const sessions = progressData.recentSessions;
    const recentAvg = sessions.slice(-3).reduce((sum, s) => sum + s.score, 0) / Math.min(3, sessions.length);
    const olderAvg = sessions.slice(0, -3).reduce((sum, s) => sum + s.score, 0) / Math.max(1, sessions.length - 3);

    if (recentAvg > olderAvg + 10) {
      trends.push(`Mejorando (+${(recentAvg - olderAvg).toFixed(0)}% últimas sesiones)`);
    } else if (recentAvg < olderAvg - 10) {
      trends.push(`Necesita repaso (${(olderAvg - recentAvg).toFixed(0)}% menos últimas sesiones)`);
    }
  }

  // Analyze skill progress
  if (progressData.skillProgress) {
    const skills = Object.entries(progressData.skillProgress);
    const strugglingSkills = skills.filter(([_, stats]) =>
      stats.attempts >= 3 && stats.accuracy < 60
    );

    if (strugglingSkills.length > 0) {
      weaknesses.push(...strugglingSkills.slice(0, 2).map(([skill, stats]) =>
        `${skill} (${stats.accuracy.toFixed(0)}%)`
      ));
    }
  }

  return { strengths, weaknesses, trends };
}
