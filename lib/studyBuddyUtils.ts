import { api } from './api-client';

/**
 * Refreshes the Study Buddy greeting by fetching new data based on current progress
 * This should be called after questions are saved to localStorage
 */
export async function refreshStudyBuddyGreeting(): Promise<void> {
  try {
    console.log('🤖 Study Buddy - Refreshing greeting based on updated questions...');

    // Gather progress data from localStorage
    const m1Progress = localStorage.getItem('paes-progress-M1');
    const m1History = localStorage.getItem('paes-history-M1');
    const m2Progress = localStorage.getItem('paes-progress-M2');
    const m2History = localStorage.getItem('paes-history-M2');

    const progressData = {
      m1: m1Progress ? JSON.parse(m1Progress) : null,
      m2: m2Progress ? JSON.parse(m2Progress) : null,
      m1History: m1History ? JSON.parse(m1History) : null,
      m2History: m2History ? JSON.parse(m2History) : null,
    };

    // Combine histories
    const allAttempts = [
      ...(progressData.m1History || []),
      ...(progressData.m2History || [])
    ].sort((a, b) => b.timestamp - a.timestamp);

    // Calculate topic accuracy from individual attempts
    const topicAccuracy: Record<string, { total: number; correct: number; accuracy: number }> = {};
    allAttempts.forEach((attempt: any) => {
      const topic = attempt.topic || 'Unknown';
      if (!topicAccuracy[topic]) {
        topicAccuracy[topic] = { total: 0, correct: 0, accuracy: 0 };
      }
      topicAccuracy[topic].total++;
      if (attempt.isCorrect) {
        topicAccuracy[topic].correct++;
      }
    });

    // Calculate accuracy percentages
    Object.keys(topicAccuracy).forEach(topic => {
      const stats = topicAccuracy[topic];
      stats.accuracy = (stats.correct / stats.total) * 100;
    });

    // Group attempts by session
    const sessionMap = new Map<string, any>();
    allAttempts.forEach((attempt: any) => {
      const sessionKey = attempt.quizSessionId ||
                        new Date(attempt.timestamp).toISOString().split('T')[0];

      if (!sessionMap.has(sessionKey)) {
        sessionMap.set(sessionKey, {
          date: new Date(attempt.timestamp).toISOString().split('T')[0],
          topic: attempt.topic,
          attempts: [],
          timestamp: attempt.timestamp
        });
      }
      sessionMap.get(sessionKey).attempts.push(attempt);
    });

    // Convert sessions map to array and calculate scores
    const recentSessions = Array.from(sessionMap.values())
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 5)
      .map(session => {
        const correct = session.attempts.filter((a: any) => a.isCorrect).length;
        const total = session.attempts.length;
        return {
          date: session.date,
          score: total > 0 ? Math.round((correct / total) * 100) : 0,
          topic: session.topic || 'Mixed',
          questionsAnswered: total,
        };
      });

    const progressDataPayload = {
      recentSessions,
      topicAccuracy,
      totalQuestionsAnswered: allAttempts.length,
      overallAccuracy: allAttempts.length > 0
        ? Math.round((allAttempts.filter((a: any) => a.isCorrect).length / allAttempts.length) * 100)
        : 0,
    };

    // Fetch new greeting from API
    const response = await api.post<{
      greeting: string;
      insights: string[];
      focusAreas: string[];
      encouragement: string;
      conversationStarter: string;
      success: boolean;
    }>('/api/study-buddy/greeting', {
      progressData: progressDataPayload
    });

    if (response.data) {
      // Cache the new greeting in localStorage
      localStorage.setItem('study-buddy-greeting', JSON.stringify({
        greetingData: response.data,
        contextData: progressDataPayload,
        timestamp: Date.now()
      }));
      console.log('🤖 Study Buddy - Greeting refreshed and cached successfully');
    }
  } catch (error) {
    console.error('🤖 Study Buddy - Error refreshing greeting:', error);
  }
}
