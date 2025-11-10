'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';

interface Stats {
  abstract: {
    total: number;
    active: number;
    draft: number;
    deprecated: number;
  };
  context: {
    total: number;
    active: number;
    verified: number;
    avgQuality: number;
  };
  byLevelSubject: Array<{
    level: string;
    subject: string;
    abstractCount: number;
    contextCount: number;
  }>;
}

export default function OverviewTab() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch abstract problems
      const abstractRes = await api.get('/api/abstract-problems');
      const abstractData = abstractRes.data;

      // Fetch context problems
      const contextRes = await api.get('/api/context-problems');
      const contextData = contextRes.data;

      // Calculate stats
      const abstractProblems = abstractData?.problems || [];
      const contextProblems = contextData?.problems || [];

      const abstractStats = {
        total: abstractProblems.length,
        active: abstractProblems.filter((p: any) => p.status === 'active').length,
        draft: abstractProblems.filter((p: any) => p.status === 'draft').length,
        deprecated: abstractProblems.filter((p: any) => p.status === 'deprecated').length,
      };

      const contextStats = {
        total: contextProblems.length,
        active: contextProblems.filter((p: any) => p.status === 'active').length,
        verified: contextProblems.filter((p: any) => p.verified).length,
        avgQuality:
          contextProblems.reduce((sum: number, p: any) => sum + (p.quality_score || 0), 0) /
            contextProblems.length || 0,
      };

      // Group by level and subject
      const grouped: Record<string, any> = {};
      abstractProblems.forEach((p: any) => {
        const key = `${p.level}-${p.subject}`;
        if (!grouped[key]) {
          grouped[key] = { level: p.level, subject: p.subject, abstractCount: 0, contextCount: 0 };
        }
        grouped[key].abstractCount++;
      });

      contextProblems.forEach((p: any) => {
        const abstract = abstractProblems.find((a: any) => a.id === p.abstract_problem_id);
        if (abstract) {
          const key = `${abstract.level}-${abstract.subject}`;
          if (grouped[key]) {
            grouped[key].contextCount++;
          }
        }
      });

      setStats({
        abstract: abstractStats,
        context: contextStats,
        byLevelSubject: Object.values(grouped),
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!stats) {
    return <div className="text-center py-12">Failed to load stats</div>;
  }

  return (
    <div className="space-y-6">
      {/* Abstract Problems Stats */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Abstract Problems
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="Total" value={stats.abstract.total} />
          <StatCard label="Active" value={stats.abstract.active} color="green" />
          <StatCard label="Draft" value={stats.abstract.draft} color="yellow" />
          <StatCard label="Deprecated" value={stats.abstract.deprecated} color="gray" />
        </div>
      </div>

      {/* Context Problems Stats */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Context Problems
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="Total" value={stats.context.total} />
          <StatCard label="Active" value={stats.context.active} color="green" />
          <StatCard label="Verified" value={stats.context.verified} color="blue" />
          <StatCard
            label="Avg Quality"
            value={stats.context.avgQuality.toFixed(1) + '/10'}
            color="purple"
          />
        </div>
      </div>

      {/* By Level & Subject */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          By Level & Subject
        </h3>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
          {stats.byLevelSubject.map((item, idx) => (
            <div
              key={idx}
              className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-medium text-gray-900 dark:text-white">
                  {item.level}
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-700 dark:text-gray-300">{item.subject}</span>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  {item.abstractCount} abstract
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600 dark:text-gray-400">
                  {item.contextCount} contexts
                </span>
              </div>
            </div>
          ))}
          {stats.byLevelSubject.length === 0 && (
            <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
              No problems yet. Generate your first batch!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  color = 'blue',
}: {
  label: string;
  value: number | string;
  color?: 'blue' | 'green' | 'yellow' | 'gray' | 'purple';
}) {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    gray: 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
  };

  return (
    <div
      className={`px-6 py-4 rounded-lg border ${colorClasses[color]}`}
    >
      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</div>
      <div className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
    </div>
  );
}
