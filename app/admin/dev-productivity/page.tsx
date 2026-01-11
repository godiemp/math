'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { Card, Button, Heading, Text, Badge } from '@/components/ui';
import { api } from '@/lib/api-client';
import AdminLayout from '@/components/layout/AdminLayout';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { Flame, GitPullRequest, TrendingUp, Calendar, Trophy } from 'lucide-react';

interface DailyMetric {
  date: string;
  count: number;
}

interface WeeklyMetric {
  week: string;
  count: number;
}

interface StreakInfo {
  current: number;
  longest: number;
}

interface ProductivityMetrics {
  daily: DailyMetric[];
  weekly: WeeklyMetric[];
  streaks: Record<number, StreakInfo>;
  totalMerged: number;
  todayCount: number;
  thisWeekCount: number;
  fetchedAt: string;
}

function DevProductivityContent() {
  const [metrics, setMetrics] = useState<ProductivityMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await api.get<ProductivityMetrics>('/api/admin/dev-productivity');

      if (response.error) {
        setError(response.error.error || 'Failed to load metrics');
        return;
      }

      if (response.data) {
        setMetrics(response.data);
      }
    } catch (err) {
      console.error('Error fetching dev productivity metrics:', err);
      setError('Failed to load metrics. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStreakColor = (current: number) => {
    if (current >= 7) return 'text-orange-500';
    if (current >= 3) return 'text-yellow-500';
    if (current >= 1) return 'text-blue-500';
    return 'text-gray-400';
  };

  const getFlameIntensity = (current: number) => {
    if (current >= 7) return 'text-orange-500 animate-pulse';
    if (current >= 3) return 'text-yellow-500';
    if (current >= 1) return 'text-blue-400';
    return 'text-gray-300';
  };

  const formatDateShort = (dateStr: string) => {
    // Parse YYYY-MM-DD without timezone conversion issues
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('es-CL', { month: 'short', day: 'numeric' });
  };

  const formatWeekShort = (weekStr: string) => {
    // weekStr is like "2025-W02"
    return weekStr.replace('-W', ' S');
  };

  const formatFetchedAt = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('es-CL', {
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'short',
      timeZone: 'America/Santiago',
    });
  };

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
          <Button variant="primary" onClick={fetchMetrics}>
            Retry
          </Button>
        </Card>
      </AdminLayout>
    );
  }

  if (!metrics) {
    return null;
  }

  // Prepare chart data - reverse for chronological order
  const dailyChartData = [...metrics.daily].reverse().map((d) => ({
    name: formatDateShort(d.date),
    PRs: d.count,
  }));

  const weeklyChartData = [...metrics.weekly].reverse().map((w) => ({
    name: formatWeekShort(w.week),
    PRs: w.count,
  }));

  // Get streak levels to display (filter out zeros in longest)
  const streakLevels = Object.entries(metrics.streaks)
    .filter(([_, info]) => info.longest > 0)
    .map(([level, info]) => ({ level: parseInt(level), ...info }))
    .sort((a, b) => a.level - b.level);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Heading level={1} size="md" className="mb-1">
              Dev Productivity
            </Heading>
            <Text variant="secondary">
              Track your PR merging consistency
              {metrics.fetchedAt && (
                <span className="ml-2 text-xs">
                  · Actualizado: {formatFetchedAt(metrics.fetchedAt)}
                </span>
              )}
            </Text>
          </div>
          <Button variant="primary" onClick={fetchMetrics}>
            Refresh
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card padding="md" className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <div className="flex items-center gap-2 mb-2">
              <GitPullRequest className="w-5 h-5 text-blue-600" />
              <Text size="xs" variant="secondary">Today</Text>
            </div>
            <Heading level={3} size="lg" className="text-blue-600 dark:text-blue-400">
              {metrics.todayCount}
            </Heading>
            <Text size="xs" variant="secondary">PRs merged</Text>
          </Card>

          <Card padding="md" className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <Text size="xs" variant="secondary">This Week</Text>
            </div>
            <Heading level={3} size="lg" className="text-purple-600 dark:text-purple-400">
              {metrics.thisWeekCount}
            </Heading>
            <Text size="xs" variant="secondary">PRs merged</Text>
          </Card>

          <Card padding="md" className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <Text size="xs" variant="secondary">All Time</Text>
            </div>
            <Heading level={3} size="lg" className="text-green-600 dark:text-green-400">
              {metrics.totalMerged}
            </Heading>
            <Text size="xs" variant="secondary">PRs merged</Text>
          </Card>

          <Card padding="md" className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
            <div className="flex items-center gap-2 mb-2">
              <Flame className={`w-5 h-5 ${getFlameIntensity(metrics.streaks[1]?.current || 0)}`} />
              <Text size="xs" variant="secondary">Current Streak</Text>
            </div>
            <Heading level={3} size="lg" className={getStreakColor(metrics.streaks[1]?.current || 0)}>
              {metrics.streaks[1]?.current || 0}
            </Heading>
            <Text size="xs" variant="secondary">days with PRs</Text>
          </Card>
        </div>

        {/* Streaks Section */}
        <Card padding="lg">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-5 h-5 text-orange-500" />
            <Heading level={2} size="sm">
              Streaks by Intensity
            </Heading>
          </div>
          <Text size="sm" variant="secondary" className="mb-4">
            Consecutive days with at least N PRs merged
          </Text>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {streakLevels.map(({ level, current, longest }) => (
              <Card
                key={level}
                padding="md"
                className={`border-2 ${
                  current > 0
                    ? 'border-orange-200 dark:border-orange-800 bg-orange-50/50 dark:bg-orange-900/10'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: Math.min(level, 5) }).map((_, i) => (
                        <Flame
                          key={i}
                          className={`w-4 h-4 -ml-1 first:ml-0 ${
                            current > 0 ? 'text-orange-500' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      {level > 5 && (
                        <Text size="xs" className="ml-1 text-orange-500">+{level - 5}</Text>
                      )}
                    </div>
                    <Badge variant={current > 0 ? 'warning' : 'neutral'} size="sm">
                      {level}+ PR{level > 1 ? 's' : ''}/day
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Text size="xs" variant="secondary">Current</Text>
                    <Heading level={3} size="md" className={getStreakColor(current)}>
                      {current}
                    </Heading>
                    <Text size="xs" variant="secondary">days</Text>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <Trophy className="w-3 h-3 text-yellow-500" />
                      <Text size="xs" variant="secondary">Record</Text>
                    </div>
                    <Heading level={3} size="md" className="text-yellow-600">
                      {longest}
                    </Heading>
                    <Text size="xs" variant="secondary">days</Text>
                  </div>
                </div>

                {current > 0 && current === longest && (
                  <Badge variant="success" size="sm" className="mt-2">
                    Personal Best!
                  </Badge>
                )}
              </Card>
            ))}
          </div>

          {streakLevels.length === 0 && (
            <Text variant="secondary" className="text-center py-8">
              No streaks yet. Start merging PRs to build your streak!
            </Text>
          )}
        </Card>

        {/* Daily Chart */}
        <Card padding="lg">
          <Heading level={2} size="sm" className="mb-4">
            PRs Merged by Day (Last 30 days)
          </Heading>
          {dailyChartData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                    }}
                  />
                  <Bar dataKey="PRs" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <Text variant="secondary" className="text-center py-8">
              No data available
            </Text>
          )}
        </Card>

        {/* Weekly Chart */}
        <Card padding="lg">
          <Heading level={2} size="sm" className="mb-4">
            PRs Merged by Week (Last 12 weeks)
          </Heading>
          {weeklyChartData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="PRs"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <Text variant="secondary" className="text-center py-8">
              No data available
            </Text>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
}

export default function DevProductivityPage() {
  return (
    <ProtectedRoute requireAdmin>
      <DevProductivityContent />
    </ProtectedRoute>
  );
}
