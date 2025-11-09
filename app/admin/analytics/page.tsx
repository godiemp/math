'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, Button, Heading, Text, Badge } from '@/components/ui';
import { api } from '@/lib/api-client';
import { SkillsAnalytics } from '@/components/SkillsAnalytics';

interface AnalyticsData {
  northStar: {
    wau: number;
    dau: number;
    totalAttempts: number;
    overallAccuracy: number;
  };
  users: {
    total: number;
    newLast7d: number;
    newLast30d: number;
    activePracticing: number;
  };
  engagement: {
    dau: number;
    wau: number;
    sessionsLast24h: number;
    sessionsLast7d: number;
    attemptsLast7d: number;
    avgQuestionsPerSession: string;
    maxQuestionsPerSession: number;
  };
  streaks: {
    users3Plus: number;
    users7Plus: number;
    users14Plus: number;
    users30Plus: number;
    avgCurrentStreak: string;
    maxStreak: number;
  };
  accuracy: {
    overall: number;
    byLevel: Array<{
      level: string;
      attempts: number;
      correct: number;
      percentage: number;
    }>;
    bySubject: Array<{
      subject: string;
      attempts: number;
      correct: number;
      percentage: number;
    }>;
    byDifficulty: Array<{
      difficulty: string;
      attempts: number;
      correct: number;
      percentage: number;
    }>;
  };
  retention: {
    d1Rate: number;
    d7Rate: number;
    d30Rate: number;
    totalCohortUsers: number;
    activationRate: number;
    newUsersLast7d: number;
    activatedUsers: number;
  };
  ensayos: {
    total: number;
    completed: number;
    upcoming: number;
    avgRegistrations: string;
  };
  practiceMode: Array<{
    mode: string;
    count: number;
    percentage: number;
  }>;
  questionCoverage: {
    totalQuestions: number;
    mostAttempted: string | null;
    mostAttemptedCount: number;
    leastAttemptedCount: number;
  };
}

function AnalyticsDashboardContent() {
  const router = useRouter();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await api.get<{ data: AnalyticsData; timestamp: number }>('/api/analytics/dashboard');

      if (response.error) {
        setError(response.error.error || 'Failed to load analytics');
        return;
      }

      if (response.data) {
        setAnalytics(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError('Failed to load analytics. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 70) return 'text-green-600 dark:text-green-400';
    if (accuracy >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getRetentionColor = (rate: number) => {
    if (rate >= 30) return 'text-green-600 dark:text-green-400';
    if (rate >= 20) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <Card padding="lg">
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <Card padding="lg" className="border-red-500">
            <Text className="text-red-600 dark:text-red-400">{error}</Text>
            <Button variant="primary" onClick={fetchAnalytics} className="mt-4">
              Retry
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card padding="lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <Heading level={1} size="md" className="mb-2">
                📊 Analytics Dashboard
              </Heading>
              <Text variant="secondary">
                Platform performance and user metrics
              </Text>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.push('/admin')}>
                ← Back to Admin
              </Button>
              <Button variant="secondary" onClick={fetchAnalytics}>
                🔄 Refresh
              </Button>
            </div>
          </div>
        </Card>

        {/* North Star Metrics */}
        <Card padding="lg">
          <Heading level={2} size="sm" className="mb-4">
            🎯 North Star Metrics
          </Heading>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card padding="md" className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20">
              <Text size="xs" variant="secondary" className="mb-1">Weekly Active Users</Text>
              <Heading level={3} size="lg" className="text-indigo-600 dark:text-indigo-400">
                {analytics.northStar.wau}
              </Heading>
              <Text size="xs" variant="secondary" className="mt-1">WAU</Text>
            </Card>
            <Card padding="md" className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <Text size="xs" variant="secondary" className="mb-1">Daily Active Users</Text>
              <Heading level={3} size="lg" className="text-blue-600 dark:text-blue-400">
                {analytics.northStar.dau}
              </Heading>
              <Text size="xs" variant="secondary" className="mt-1">DAU</Text>
            </Card>
            <Card padding="md" className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
              <Text size="xs" variant="secondary" className="mb-1">Total Questions Answered</Text>
              <Heading level={3} size="lg" className="text-purple-600 dark:text-purple-400">
                {analytics.northStar.totalAttempts.toLocaleString()}
              </Heading>
              <Text size="xs" variant="secondary" className="mt-1">All time</Text>
            </Card>
            <Card padding="md" className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
              <Text size="xs" variant="secondary" className="mb-1">Overall Accuracy</Text>
              <Heading level={3} size="lg" className={getAccuracyColor(analytics.northStar.overallAccuracy)}>
                {analytics.northStar.overallAccuracy.toFixed(1)}%
              </Heading>
              <Text size="xs" variant="secondary" className="mt-1">
                {analytics.northStar.overallAccuracy >= 70 ? '✓ Excellent' :
                 analytics.northStar.overallAccuracy >= 60 ? '⚠ Good' : '⚠ Needs attention'}
              </Text>
            </Card>
          </div>
        </Card>

        {/* Users & Engagement */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* User Metrics */}
          <Card padding="lg">
            <Heading level={2} size="sm" className="mb-4">
              👥 User Metrics
            </Heading>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Text size="sm">Total Users</Text>
                <Heading level={3} size="sm">{analytics.users.total}</Heading>
              </div>
              <div className="flex justify-between items-center">
                <Text size="sm">New (Last 7 days)</Text>
                <Badge variant="success" size="sm">+{analytics.users.newLast7d}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <Text size="sm">New (Last 30 days)</Text>
                <Badge variant="info" size="sm">+{analytics.users.newLast30d}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <Text size="sm">Active Practicing</Text>
                <Badge variant="neutral" size="sm">{analytics.users.activePracticing}</Badge>
              </div>
            </div>
          </Card>

          {/* Engagement Metrics */}
          <Card padding="lg">
            <Heading level={2} size="sm" className="mb-4">
              🔥 Engagement
            </Heading>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Text size="sm">Sessions (Last 24h)</Text>
                <Heading level={3} size="sm">{analytics.engagement.sessionsLast24h}</Heading>
              </div>
              <div className="flex justify-between items-center">
                <Text size="sm">Sessions (Last 7d)</Text>
                <Heading level={3} size="sm">{analytics.engagement.sessionsLast7d}</Heading>
              </div>
              <div className="flex justify-between items-center">
                <Text size="sm">Attempts (Last 7d)</Text>
                <Badge variant="info" size="sm">{analytics.engagement.attemptsLast7d}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <Text size="sm">Avg Questions/Session</Text>
                <Badge variant="neutral" size="sm">{analytics.engagement.avgQuestionsPerSession}</Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Retention Metrics */}
        <Card padding="lg">
          <Heading level={2} size="sm" className="mb-4">
            📈 Retention & Activation
          </Heading>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card padding="md" className="bg-blue-50 dark:bg-blue-900/20">
              <Text size="xs" variant="secondary" className="mb-1">D1 Retention</Text>
              <Heading level={3} size="md" className={getRetentionColor(analytics.retention.d1Rate)}>
                {analytics.retention.d1Rate.toFixed(1)}%
              </Heading>
              <Text size="xs" variant="secondary" className="mt-1">Target: &gt;40%</Text>
            </Card>
            <Card padding="md" className="bg-indigo-50 dark:bg-indigo-900/20">
              <Text size="xs" variant="secondary" className="mb-1">D7 Retention</Text>
              <Heading level={3} size="md" className={getRetentionColor(analytics.retention.d7Rate)}>
                {analytics.retention.d7Rate.toFixed(1)}%
              </Heading>
              <Text size="xs" variant="secondary" className="mt-1">Target: &gt;30%</Text>
            </Card>
            <Card padding="md" className="bg-purple-50 dark:bg-purple-900/20">
              <Text size="xs" variant="secondary" className="mb-1">D30 Retention</Text>
              <Heading level={3} size="md" className={getRetentionColor(analytics.retention.d30Rate)}>
                {analytics.retention.d30Rate.toFixed(1)}%
              </Heading>
              <Text size="xs" variant="secondary" className="mt-1">Target: &gt;15%</Text>
            </Card>
            <Card padding="md" className="bg-green-50 dark:bg-green-900/20">
              <Text size="xs" variant="secondary" className="mb-1">Activation Rate</Text>
              <Heading level={3} size="md" className={getRetentionColor(analytics.retention.activationRate)}>
                {analytics.retention.activationRate.toFixed(1)}%
              </Heading>
              <Text size="xs" variant="secondary" className="mt-1">
                {analytics.retention.activatedUsers}/{analytics.retention.newUsersLast7d} users
              </Text>
            </Card>
          </div>
        </Card>

        {/* Accuracy Breakdown */}
        <Card padding="lg">
          <Heading level={2} size="sm" className="mb-4">
            🎯 Accuracy Analysis
          </Heading>

          {/* By Level */}
          <div className="mb-6">
            <Text size="sm" variant="secondary" className="mb-3 font-medium">By Level</Text>
            <div className="grid grid-cols-2 gap-4">
              {analytics.accuracy.byLevel.map((level) => (
                <Card key={level.level} padding="md" className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="info" size="sm">{level.level}</Badge>
                    <Heading level={3} size="sm" className={getAccuracyColor(level.percentage)}>
                      {level.percentage}%
                    </Heading>
                  </div>
                  <Text size="xs" variant="secondary">
                    {level.correct}/{level.attempts} correct
                  </Text>
                </Card>
              ))}
            </div>
          </div>

          {/* By Subject */}
          <div className="mb-6">
            <Text size="sm" variant="secondary" className="mb-3 font-medium">By Subject</Text>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {analytics.accuracy.bySubject.map((subject) => (
                <Card key={subject.subject} padding="sm" className="bg-gray-50 dark:bg-gray-800/50">
                  <Text size="xs" variant="secondary" className="mb-1 capitalize">{subject.subject}</Text>
                  <Heading level={3} size="xs" className={getAccuracyColor(subject.percentage)}>
                    {subject.percentage}%
                  </Heading>
                  <Text size="xs" variant="secondary" className="mt-1">
                    {subject.attempts} attempts
                  </Text>
                </Card>
              ))}
            </div>
          </div>

          {/* By Difficulty */}
          <div>
            <Text size="sm" variant="secondary" className="mb-3 font-medium">By Difficulty</Text>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {analytics.accuracy.byDifficulty.map((diff) => (
                <Card key={diff.difficulty} padding="sm" className="bg-gray-50 dark:bg-gray-800/50">
                  <Text size="xs" variant="secondary" className="mb-1 capitalize">{diff.difficulty}</Text>
                  <Heading level={3} size="xs" className={getAccuracyColor(diff.percentage)}>
                    {diff.percentage}%
                  </Heading>
                  <Text size="xs" variant="secondary" className="mt-1">
                    {diff.attempts} attempts
                  </Text>
                </Card>
              ))}
            </div>
          </div>
        </Card>

        {/* Streaks & Ensayos */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Streak Distribution */}
          <Card padding="lg">
            <Heading level={2} size="sm" className="mb-4">
              🔥 Study Streaks
            </Heading>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Text size="sm">3+ day streaks</Text>
                <Badge variant="neutral" size="sm">{analytics.streaks.users3Plus} users</Badge>
              </div>
              <div className="flex justify-between items-center">
                <Text size="sm">7+ day streaks</Text>
                <Badge variant="info" size="sm">{analytics.streaks.users7Plus} users</Badge>
              </div>
              <div className="flex justify-between items-center">
                <Text size="sm">14+ day streaks</Text>
                <Badge variant="warning" size="sm">{analytics.streaks.users14Plus} users</Badge>
              </div>
              <div className="flex justify-between items-center">
                <Text size="sm">30+ day streaks</Text>
                <Badge variant="success" size="sm">{analytics.streaks.users30Plus} users</Badge>
              </div>
              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <Text size="sm">Average Streak</Text>
                  <Text size="sm" className="font-medium">{analytics.streaks.avgCurrentStreak} days</Text>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <Text size="sm">Longest Streak</Text>
                  <Text size="sm" className="font-medium text-green-600 dark:text-green-400">
                    {analytics.streaks.maxStreak} days 🏆
                  </Text>
                </div>
              </div>
            </div>
          </Card>

          {/* Ensayo Stats */}
          <Card padding="lg">
            <Heading level={2} size="sm" className="mb-4">
              📝 Ensayo Statistics
            </Heading>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Text size="sm">Total Ensayos</Text>
                <Heading level={3} size="sm">{analytics.ensayos.total}</Heading>
              </div>
              <div className="flex justify-between items-center">
                <Text size="sm">Completed</Text>
                <Badge variant="success" size="sm">{analytics.ensayos.completed}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <Text size="sm">Upcoming</Text>
                <Badge variant="info" size="sm">{analytics.ensayos.upcoming}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <Text size="sm">Avg Registrations</Text>
                <Badge variant="neutral" size="sm">{analytics.ensayos.avgRegistrations} users</Badge>
              </div>
            </div>

            {/* Practice Mode Distribution */}
            {analytics.practiceMode.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Text size="sm" variant="secondary" className="mb-3 font-medium">Practice Mode Distribution</Text>
                {analytics.practiceMode.map((mode) => (
                  <div key={mode.mode} className="flex justify-between items-center mb-2">
                    <Text size="sm" className="capitalize">{mode.mode}</Text>
                    <div className="flex items-center space-x-2">
                      <Text size="xs" variant="secondary">{mode.count} sessions</Text>
                      <Badge variant="neutral" size="sm">{mode.percentage}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Question Coverage */}
        <Card padding="lg">
          <Heading level={2} size="sm" className="mb-4">
            📚 Question Bank Coverage
          </Heading>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Text size="xs" variant="secondary" className="mb-1">Questions with Attempts</Text>
              <Heading level={3} size="md">{analytics.questionCoverage.totalQuestions}</Heading>
            </div>
            <div>
              <Text size="xs" variant="secondary" className="mb-1">Most Attempted</Text>
              <Heading level={3} size="md">{analytics.questionCoverage.mostAttemptedCount}×</Heading>
              <Text size="xs" variant="secondary" className="mt-1 font-mono">
                {analytics.questionCoverage.mostAttempted || 'N/A'}
              </Text>
            </div>
            <div>
              <Text size="xs" variant="secondary" className="mb-1">Least Attempted</Text>
              <Heading level={3} size="md">{analytics.questionCoverage.leastAttemptedCount}×</Heading>
            </div>
            <div>
              <Text size="xs" variant="secondary" className="mb-1">Coverage Health</Text>
              <Heading level={3} size="md" className={
                analytics.questionCoverage.leastAttemptedCount >= 10 ? 'text-green-600 dark:text-green-400' :
                analytics.questionCoverage.leastAttemptedCount >= 5 ? 'text-yellow-600 dark:text-yellow-400' :
                'text-red-600 dark:text-red-400'
              }>
                {analytics.questionCoverage.leastAttemptedCount >= 10 ? '✓ Good' :
                 analytics.questionCoverage.leastAttemptedCount >= 5 ? '⚠ Fair' : '⚠ Low'}
              </Heading>
            </div>
          </div>
        </Card>

        {/* Skills Analytics */}
        <SkillsAnalytics />

        {/* Footer Info */}
        <Card padding="md" className="bg-gray-50 dark:bg-gray-800/50">
          <Text size="xs" variant="secondary" className="text-center">
            💡 Tip: Metrics update in real-time as users practice. Click Refresh to see the latest data.
          </Text>
        </Card>
      </div>
    </div>
  );
}

export default function AnalyticsDashboard() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <AnalyticsDashboardContent />
    </ProtectedRoute>
  );
}
