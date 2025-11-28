'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { Card, Button, Heading, Text, Badge } from '@/components/ui';
import { api } from '@/lib/api-client';
import AdminLayout from '@/components/layout/AdminLayout';

interface UserData {
  id: string;
  username: string;
  email: string;
  displayName: string;
  role: string;
  createdAt: number;
  currentStreak: number;
  longestStreak: number;
  daysActive7d: number;
  daysActive30d: number;
  questions7d: number;
  questions30d: number;
  timeSpent7d: number;
  timeSpent30d: number;
  lastActiveAt: number | null;
  accuracy7d: number;
  accuracy30d: number;
  segment: 'power' | 'regular' | 'casual' | 'dormant' | 'new';
  engagementScore: number;
}

interface CohortData {
  cohortWeek: string;
  cohortSize: number;
  week1Retained: number;
  week2Retained: number;
  week3Retained: number;
  week4Retained: number;
  week1Rate: number;
  week2Rate: number;
  week3Rate: number;
  week4Rate: number;
}

interface TrendData {
  date: string;
  activeUsers: number;
  questionsAnswered: number;
}

interface PMFData {
  includeAdmins: boolean;
  pmfScore: number;
  summary: {
    totalUsers: number;
    activeThisWeek: number;
    powerUsers: number;
    regularUsers: number;
    casualUsers: number;
    dormantUsers: number;
    newUsers: number;
    powerUserPercentage: number;
    activePercentage: number;
    totalTimeSpent7d: number;
    totalTimeSpent30d: number;
    avgTimePerUser7d: number;
    avgQuestionsPerActiveUser: number;
  };
  users: UserData[];
  weeklyTrend: TrendData[];
  cohortRetention: CohortData[];
  featureAdoption: {
    totalUsers: number;
    zenUsers: number;
    rapidfireUsers: number;
    liveSessionUsers: number;
    zenAdoptionRate: number;
    rapidfireAdoptionRate: number;
    liveSessionAdoptionRate: number;
  };
}

function PMFMetricsContent() {
  const [pmfData, setPmfData] = useState<PMFData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [includeAdmins, setIncludeAdmins] = useState(true);
  const [sortBy, setSortBy] = useState<'engagement' | 'recent' | 'questions'>('engagement');

  const formatDistanceToNow = (timestamp: number): string => {
    const now = Date.now();
    const diffMs = now - timestamp;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  };

  useEffect(() => {
    fetchPMFMetrics();
  }, [includeAdmins]);

  const fetchPMFMetrics = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await api.get<{ data: PMFData; timestamp: number }>(
        `/api/analytics/pmf?includeAdmins=${includeAdmins}`
      );

      if (response.error) {
        setError(response.error.error || 'Failed to load PMF metrics');
        return;
      }

      if (response.data) {
        setPmfData(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching PMF metrics:', err);
      setError('Failed to load PMF metrics. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getSegmentBadge = (segment: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      power: { variant: 'success', label: '🔥 Power User' },
      regular: { variant: 'info', label: '✓ Regular' },
      casual: { variant: 'neutral', label: 'Casual' },
      dormant: { variant: 'warning', label: '💤 Dormant' },
      new: { variant: 'neutral', label: '✨ New' },
    };
    const config = variants[segment] || variants.new;
    return <Badge variant={config.variant} size="sm">{config.label}</Badge>;
  };

  const getPMFScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600 dark:text-green-400';
    if (score >= 50) return 'text-yellow-600 dark:text-yellow-400';
    if (score >= 30) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getPMFScoreLabel = (score: number) => {
    if (score >= 70) return 'Strong PMF';
    if (score >= 50) return 'Good Progress';
    if (score >= 30) return 'Early Signs';
    return 'Building';
  };

  const sortedUsers = pmfData?.users ? [...pmfData.users].sort((a, b) => {
    switch (sortBy) {
      case 'engagement':
        return b.engagementScore - a.engagementScore;
      case 'recent':
        return (b.lastActiveAt || 0) - (a.lastActiveAt || 0);
      case 'questions':
        return b.questions7d - a.questions7d;
      default:
        return 0;
    }
  }) : [];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <Card padding="lg" className="border-red-200 dark:border-red-800">
          <Text className="text-red-600 dark:text-red-400 mb-4">{error}</Text>
          <Button variant="primary" onClick={fetchPMFMetrics}>
            Retry
          </Button>
        </Card>
      </AdminLayout>
    );
  }

  if (!pmfData) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Heading level={1} size="md" className="mb-1">
              Product-Market Fit Metrics
            </Heading>
            <Text variant="secondary">
              Track user engagement and PMF signals
            </Text>
          </div>
          <div className="flex gap-3 items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeAdmins}
                onChange={(e) => setIncludeAdmins(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <Text size="sm">Include Admins</Text>
            </label>
            <Button variant="primary" onClick={fetchPMFMetrics}>
              🔄 Refresh
            </Button>
          </div>
        </div>

        {/* PMF Score Card */}
        <Card padding="lg" className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <div className="text-center">
            <Text size="xs" variant="secondary" className="mb-2">Product-Market Fit Score</Text>
            <Heading level={2} size="xl" className={getPMFScoreColor(pmfData.pmfScore)}>
              {pmfData.pmfScore}/100
            </Heading>
            <Text size="sm" className="mt-2 font-medium">
              {getPMFScoreLabel(pmfData.pmfScore)}
            </Text>
            <Text size="xs" variant="secondary" className="mt-3">
              Based on power user %, active user %, and engagement depth
            </Text>
          </div>
        </Card>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card padding="md" className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20">
            <Text size="xs" variant="secondary" className="mb-1">Active This Week</Text>
            <Heading level={3} size="lg" className="text-indigo-600 dark:text-indigo-400">
              {pmfData.summary.activeThisWeek}
            </Heading>
            <Text size="xs" variant="secondary" className="mt-1">
              {pmfData.summary.activePercentage.toFixed(0)}% of total
            </Text>
          </Card>

          <Card padding="md" className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
            <Text size="xs" variant="secondary" className="mb-1">Power Users</Text>
            <Heading level={3} size="lg" className="text-green-600 dark:text-green-400">
              {pmfData.summary.powerUsers}
            </Heading>
            <Text size="xs" variant="secondary" className="mt-1">
              {pmfData.summary.powerUserPercentage.toFixed(0)}% (5+ days/week)
            </Text>
          </Card>

          <Card padding="md" className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <Text size="xs" variant="secondary" className="mb-1">Avg Time/User</Text>
            <Heading level={3} size="lg" className="text-blue-600 dark:text-blue-400">
              {formatTime(pmfData.summary.avgTimePerUser7d)}
            </Heading>
            <Text size="xs" variant="secondary" className="mt-1">Last 7 days</Text>
          </Card>

          <Card padding="md" className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
            <Text size="xs" variant="secondary" className="mb-1">Avg Questions</Text>
            <Heading level={3} size="lg" className="text-orange-600 dark:text-orange-400">
              {pmfData.summary.avgQuestionsPerActiveUser.toFixed(1)}
            </Heading>
            <Text size="xs" variant="secondary" className="mt-1">Per active user</Text>
          </Card>
        </div>

        {/* User Segmentation */}
        <Card padding="lg">
          <Heading level={2} size="sm" className="mb-4">
            👥 User Segmentation
          </Heading>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <Heading level={3} size="lg" className="text-green-600 dark:text-green-400">
                {pmfData.summary.powerUsers}
              </Heading>
              <Text size="sm" className="mt-1">Power Users</Text>
              <Text size="xs" variant="secondary">5+ days/week</Text>
            </div>
            <div className="text-center">
              <Heading level={3} size="lg" className="text-blue-600 dark:text-blue-400">
                {pmfData.summary.regularUsers}
              </Heading>
              <Text size="sm" className="mt-1">Regular</Text>
              <Text size="xs" variant="secondary">3-4 days/week</Text>
            </div>
            <div className="text-center">
              <Heading level={3} size="lg" className="text-gray-600 dark:text-gray-400">
                {pmfData.summary.casualUsers}
              </Heading>
              <Text size="sm" className="mt-1">Casual</Text>
              <Text size="xs" variant="secondary">1-2 days/week</Text>
            </div>
            <div className="text-center">
              <Heading level={3} size="lg" className="text-yellow-600 dark:text-yellow-400">
                {pmfData.summary.dormantUsers}
              </Heading>
              <Text size="sm" className="mt-1">Dormant</Text>
              <Text size="xs" variant="secondary">Inactive 2+ weeks</Text>
            </div>
            <div className="text-center">
              <Heading level={3} size="lg" className="text-purple-600 dark:text-purple-400">
                {pmfData.summary.newUsers}
              </Heading>
              <Text size="sm" className="mt-1">New</Text>
              <Text size="xs" variant="secondary">No activity yet</Text>
            </div>
          </div>
        </Card>

        {/* Feature Adoption */}
        <Card padding="lg">
          <Heading level={2} size="sm" className="mb-4">
            🎯 Feature Adoption (Last 7 Days)
          </Heading>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
              <div>
                <Text size="sm" className="font-medium">Zen Mode</Text>
                <Text size="xs" variant="secondary">{pmfData.featureAdoption.zenUsers} users</Text>
              </div>
              <Heading level={3} size="lg" className="text-blue-600 dark:text-blue-400">
                {pmfData.featureAdoption.zenAdoptionRate.toFixed(0)}%
              </Heading>
            </div>
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
              <div>
                <Text size="sm" className="font-medium">RapidFire</Text>
                <Text size="xs" variant="secondary">{pmfData.featureAdoption.rapidfireUsers} users</Text>
              </div>
              <Heading level={3} size="lg" className="text-purple-600 dark:text-purple-400">
                {pmfData.featureAdoption.rapidfireAdoptionRate.toFixed(0)}%
              </Heading>
            </div>
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
              <div>
                <Text size="sm" className="font-medium">Live Sessions</Text>
                <Text size="xs" variant="secondary">{pmfData.featureAdoption.liveSessionUsers} users</Text>
              </div>
              <Heading level={3} size="lg" className="text-green-600 dark:text-green-400">
                {pmfData.featureAdoption.liveSessionAdoptionRate.toFixed(0)}%
              </Heading>
            </div>
          </div>
        </Card>

        {/* Active Users List */}
        <Card padding="lg">
          <div className="flex justify-between items-center mb-4">
            <Heading level={2} size="sm">
              🔍 Active Users ({sortedUsers.length})
            </Heading>
            <div className="flex gap-2">
              <Button
                variant={sortBy === 'engagement' ? 'primary' : 'secondary'}
                onClick={() => setSortBy('engagement')}
                className="text-sm"
              >
                Engagement
              </Button>
              <Button
                variant={sortBy === 'recent' ? 'primary' : 'secondary'}
                onClick={() => setSortBy('recent')}
                className="text-sm"
              >
                Recent
              </Button>
              <Button
                variant={sortBy === 'questions' ? 'primary' : 'secondary'}
                onClick={() => setSortBy('questions')}
                className="text-sm"
              >
                Questions
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="text-left py-3 px-4">
                    <Text size="xs" variant="secondary">User</Text>
                  </th>
                  <th className="text-left py-3 px-4">
                    <Text size="xs" variant="secondary">Segment</Text>
                  </th>
                  <th className="text-center py-3 px-4">
                    <Text size="xs" variant="secondary">Days Active (7d)</Text>
                  </th>
                  <th className="text-center py-3 px-4">
                    <Text size="xs" variant="secondary">Questions (7d)</Text>
                  </th>
                  <th className="text-center py-3 px-4">
                    <Text size="xs" variant="secondary">Time (7d)</Text>
                  </th>
                  <th className="text-center py-3 px-4">
                    <Text size="xs" variant="secondary">Streak</Text>
                  </th>
                  <th className="text-center py-3 px-4">
                    <Text size="xs" variant="secondary">Accuracy (7d)</Text>
                  </th>
                  <th className="text-left py-3 px-4">
                    <Text size="xs" variant="secondary">Last Active</Text>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {sortedUsers.slice(0, 50).map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4">
                      <div>
                        <Text size="sm" className="font-medium">{user.displayName || user.username}</Text>
                        <Text size="xs" variant="secondary">{user.email}</Text>
                        {user.role === 'admin' && (
                          <Badge variant="neutral" size="sm" className="mt-1">Admin</Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {getSegmentBadge(user.segment)}
                    </td>
                    <td className="text-center py-3 px-4">
                      <Text size="sm" className="font-medium">{user.daysActive7d}</Text>
                    </td>
                    <td className="text-center py-3 px-4">
                      <Text size="sm">{user.questions7d}</Text>
                    </td>
                    <td className="text-center py-3 px-4">
                      <Text size="sm">{formatTime(user.timeSpent7d)}</Text>
                    </td>
                    <td className="text-center py-3 px-4">
                      <Text size="sm" className={user.currentStreak >= 7 ? 'text-orange-600 dark:text-orange-400' : ''}>
                        {user.currentStreak > 0 ? `🔥 ${user.currentStreak}` : '-'}
                      </Text>
                    </td>
                    <td className="text-center py-3 px-4">
                      <Text size="sm" className={
                        user.accuracy7d >= 70 ? 'text-green-600 dark:text-green-400' :
                        user.accuracy7d >= 60 ? 'text-yellow-600 dark:text-yellow-400' :
                        user.questions7d > 0 ? 'text-red-600 dark:text-red-400' : ''
                      }>
                        {user.questions7d > 0 ? `${user.accuracy7d.toFixed(0)}%` : '-'}
                      </Text>
                    </td>
                    <td className="py-3 px-4">
                      <Text size="xs" variant="secondary">
                        {user.lastActiveAt ? formatDistanceToNow(user.lastActiveAt) : 'Never'}
                      </Text>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {sortedUsers.length > 50 && (
            <div className="mt-4 text-center">
              <Text size="sm" variant="secondary">
                Showing top 50 users. Total: {sortedUsers.length}
              </Text>
            </div>
          )}
        </Card>

        {/* Cohort Retention */}
        {pmfData.cohortRetention.length > 0 && (
          <Card padding="lg">
            <Heading level={2} size="sm" className="mb-4">
              📊 Weekly Cohort Retention
            </Heading>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="text-left py-3 px-4">
                      <Text size="xs" variant="secondary">Cohort Week</Text>
                    </th>
                    <th className="text-center py-3 px-4">
                      <Text size="xs" variant="secondary">Size</Text>
                    </th>
                    <th className="text-center py-3 px-4">
                      <Text size="xs" variant="secondary">Week 1</Text>
                    </th>
                    <th className="text-center py-3 px-4">
                      <Text size="xs" variant="secondary">Week 2</Text>
                    </th>
                    <th className="text-center py-3 px-4">
                      <Text size="xs" variant="secondary">Week 3</Text>
                    </th>
                    <th className="text-center py-3 px-4">
                      <Text size="xs" variant="secondary">Week 4+</Text>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {pmfData.cohortRetention.slice(0, 10).map((cohort) => (
                    <tr key={cohort.cohortWeek}>
                      <td className="py-3 px-4">
                        <Text size="sm">{new Date(cohort.cohortWeek).toLocaleDateString()}</Text>
                      </td>
                      <td className="text-center py-3 px-4">
                        <Text size="sm" className="font-medium">{cohort.cohortSize}</Text>
                      </td>
                      <td className="text-center py-3 px-4">
                        <div>
                          <Text size="sm">{cohort.week1Rate.toFixed(0)}%</Text>
                          <Text size="xs" variant="secondary">({cohort.week1Retained})</Text>
                        </div>
                      </td>
                      <td className="text-center py-3 px-4">
                        <div>
                          <Text size="sm">{cohort.week2Rate.toFixed(0)}%</Text>
                          <Text size="xs" variant="secondary">({cohort.week2Retained})</Text>
                        </div>
                      </td>
                      <td className="text-center py-3 px-4">
                        <div>
                          <Text size="sm">{cohort.week3Rate.toFixed(0)}%</Text>
                          <Text size="xs" variant="secondary">({cohort.week3Retained})</Text>
                        </div>
                      </td>
                      <td className="text-center py-3 px-4">
                        <div>
                          <Text size="sm">{cohort.week4Rate.toFixed(0)}%</Text>
                          <Text size="xs" variant="secondary">({cohort.week4Retained})</Text>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}

export default function PMFMetricsPage() {
  return (
    <ProtectedRoute requireAdmin>
      <PMFMetricsContent />
    </ProtectedRoute>
  );
}
