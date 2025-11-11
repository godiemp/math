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

interface SeedOptions {
  level?: 'M1' | 'M2' | '';
  subject?: string;
  limit?: number;
  dryRun: boolean;
}

export default function OverviewTab() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [seedOptions, setSeedOptions] = useState<SeedOptions>({
    level: '',
    subject: '',
    limit: undefined,
    dryRun: true,
  });
  const [seedResult, setSeedResult] = useState<any>(null);
  const [activating, setActivating] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch abstract problems
      const abstractRes = await api.get('/api/abstract-problems');
      const abstractData = abstractRes.data as any;

      // Fetch context problems
      const contextRes = await api.get('/api/context-problems');
      const contextData = contextRes.data as any;

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

  const handleSeed = async () => {
    setSeeding(true);
    setSeedResult(null);
    try {
      const payload: any = {
        dryRun: seedOptions.dryRun,
      };
      if (seedOptions.level) payload.level = seedOptions.level;
      if (seedOptions.subject) payload.subject = seedOptions.subject;
      if (seedOptions.limit) payload.limit = parseInt(seedOptions.limit.toString());

      const res = await api.post('/api/abstract-problems/seed', payload);
      setSeedResult(res.data);

      // Refresh stats after seeding (if not dry run)
      if (!seedOptions.dryRun) {
        await fetchStats();
      }
    } catch (error: any) {
      console.error('Error seeding:', error);
      setSeedResult({ success: false, error: error.response?.data?.error || error.message });
    } finally {
      setSeeding(false);
    }
  };

  const handleActivateAll = async () => {
    if (!confirm('Are you sure you want to activate all draft problems?')) {
      return;
    }

    setActivating(true);
    try {
      const res = await api.post('/api/abstract-problems/activate-all');
      alert(res.data.message);
      await fetchStats();
    } catch (error: any) {
      console.error('Error activating:', error);
      alert('Failed to activate: ' + (error.response?.data?.error || error.message));
    } finally {
      setActivating(false);
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
      {/* Bulk Seeding Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Bulk Populate Abstract Problems
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Generate abstract problems in bulk using OpenAI. Target ~1000 problems across all units.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Level Filter
            </label>
            <select
              value={seedOptions.level}
              onChange={(e) => setSeedOptions({ ...seedOptions, level: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              disabled={seeding}
            >
              <option value="">All Levels</option>
              <option value="M1">M1 Only</option>
              <option value="M2">M2 Only</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subject Filter
            </label>
            <select
              value={seedOptions.subject}
              onChange={(e) => setSeedOptions({ ...seedOptions, subject: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              disabled={seeding}
            >
              <option value="">All Subjects</option>
              <option value="números">Números</option>
              <option value="álgebra">Álgebra</option>
              <option value="geometría">Geometría</option>
              <option value="probabilidad">Probabilidad</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Limit Units
            </label>
            <input
              type="number"
              value={seedOptions.limit || ''}
              onChange={(e) => setSeedOptions({ ...seedOptions, limit: e.target.value ? parseInt(e.target.value) : undefined })}
              placeholder="All units"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              disabled={seeding}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Mode
            </label>
            <select
              value={seedOptions.dryRun ? 'dry' : 'live'}
              onChange={(e) => setSeedOptions({ ...seedOptions, dryRun: e.target.value === 'dry' })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              disabled={seeding}
            >
              <option value="dry">Dry Run (Preview)</option>
              <option value="live">Live (Generate)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md font-medium transition-colors"
          >
            {seeding ? 'Processing...' : seedOptions.dryRun ? 'Preview Plan' : 'Start Seeding'}
          </button>

          {stats.abstract.draft > 0 && (
            <button
              onClick={handleActivateAll}
              disabled={activating || seeding}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-md font-medium transition-colors"
            >
              {activating ? 'Activating...' : `Activate ${stats.abstract.draft} Drafts`}
            </button>
          )}
        </div>

        {seedResult && (
          <div className={`mt-4 p-4 rounded-md ${seedResult.success ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              {seedResult.success ? (seedResult.dryRun ? 'Plan Preview' : 'Seeding Complete') : 'Error'}
            </h4>
            {seedResult.success && seedResult.dryRun && seedResult.plan && (
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <p>Units to process: {seedResult.plan.units}</p>
                <p>Total problems to generate: {seedResult.plan.totalProblems}</p>
              </div>
            )}
            {seedResult.success && !seedResult.dryRun && seedResult.results && (
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <p>Units processed: {seedResult.results.unitsProcessed}</p>
                <p>Problems created: {seedResult.results.problemsCreated}</p>
                <p>Problems failed: {seedResult.results.problemsFailed}</p>
                <p>Success rate: {seedResult.results.successRate}</p>
                <p>Duration: {seedResult.results.durationMinutes} minutes</p>
              </div>
            )}
            {!seedResult.success && (
              <p className="text-sm text-red-700 dark:text-red-300">{seedResult.error}</p>
            )}
          </div>
        )}
      </div>

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
