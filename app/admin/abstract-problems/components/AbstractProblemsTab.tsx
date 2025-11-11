'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import GenerateAbstractModal from './GenerateAbstractModal';
import AbstractProblemRow from './AbstractProblemRow';

interface AbstractProblem {
  id: string;
  essence: string;
  level: string;
  subject: string;
  unit: string;
  subsection?: string;
  difficulty: string;
  status: string;
  cognitive_level: string;
  primary_skills: string[];
}

interface Subsection {
  subsection: string;
  problem_count: number;
  problems: AbstractProblem[];
}

interface UnitGroup {
  unit: string;
  level: string;
  subject: string;
  total_problems: number;
  subsections: Subsection[];
  problems_without_subsection: AbstractProblem[];
}

interface GroupedResponse {
  success: boolean;
  total_units: number;
  total_problems: number;
  units: UnitGroup[];
}

export default function AbstractProblemsTab() {
  const [groupedData, setGroupedData] = useState<UnitGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());
  const [expandedSubsections, setExpandedSubsections] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState({
    level: 'all',
    subject: 'all',
    status: 'all',
  });

  useEffect(() => {
    fetchProblems();
  }, [filters]);

  const fetchProblems = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (filters.level !== 'all') params.append('level', filters.level);
      if (filters.subject !== 'all') params.append('subject', filters.subject);
      if (filters.status !== 'all') params.append('status', filters.status);

      const res = await api.get(`/api/abstract-problems/grouped?${params}`);

      if (res.data) {
        const data = res.data as GroupedResponse;
        setGroupedData(data.units || []);
      }
    } catch (error) {
      console.error('Error fetching problems:', error);
      toast.error('Failed to fetch problems');
    } finally {
      setLoading(false);
    }
  };

  const handleActivate = async (id: string) => {
    try {
      const res = await api.post(`/api/abstract-problems/${id}/activate`);

      if (res.data && (res.data as any).success) {
        toast.success('Problem activated');
        fetchProblems();
      } else {
        toast.error(res.error?.error || 'Failed to activate');
      }
    } catch (error) {
      console.error('Error activating:', error);
      toast.error('Failed to activate problem');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this problem?')) return;

    try {
      const res = await api.delete(`/api/abstract-problems/${id}`);

      if (res.data && (res.data as any).success) {
        toast.success('Problem deleted');
        fetchProblems();
      } else {
        toast.error(res.error?.error || 'Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      toast.error('Failed to delete problem');
    }
  };

  const toggleUnit = (unitKey: string) => {
    const newExpanded = new Set(expandedUnits);
    if (newExpanded.has(unitKey)) {
      newExpanded.delete(unitKey);
    } else {
      newExpanded.add(unitKey);
    }
    setExpandedUnits(newExpanded);
  };

  const toggleSubsection = (subsectionKey: string) => {
    const newExpanded = new Set(expandedSubsections);
    if (newExpanded.has(subsectionKey)) {
      newExpanded.delete(subsectionKey);
    } else {
      newExpanded.add(subsectionKey);
    }
    setExpandedSubsections(newExpanded);
  };

  const expandAll = () => {
    const allUnits = new Set(groupedData.map((_, i) => `unit-${i}`));
    const allSubsections = new Set<string>();
    groupedData.forEach((unit, unitIdx) => {
      unit.subsections.forEach((_, subIdx) => {
        allSubsections.add(`${unitIdx}-${subIdx}`);
      });
    });
    setExpandedUnits(allUnits);
    setExpandedSubsections(allSubsections);
  };

  const collapseAll = () => {
    setExpandedUnits(new Set());
    setExpandedSubsections(new Set());
  };

  const totalProblems = groupedData.reduce((sum, unit) => sum + unit.total_problems, 0);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <select
          value={filters.level}
          onChange={(e) => setFilters({ ...filters, level: e.target.value })}
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="all">All Levels</option>
          <option value="M1">M1</option>
          <option value="M2">M2</option>
        </select>

        <select
          value={filters.subject}
          onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="all">All Subjects</option>
          <option value="números">números</option>
          <option value="álgebra">álgebra</option>
          <option value="geometría">geometría</option>
          <option value="probabilidad">probabilidad</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="deprecated">Deprecated</option>
        </select>

        <button
          onClick={expandAll}
          className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
        >
          Expand All
        </button>

        <button
          onClick={collapseAll}
          className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
        >
          Collapse All
        </button>

        <div className="flex-1"></div>

        <button
          onClick={() => setShowGenerateModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          + Generate New
        </button>
      </div>

      {/* Stats */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {totalProblems} problems across {groupedData.length} thematic units
      </div>

      {/* Grouped View */}
      <div className="space-y-3">
        {loading ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center text-gray-500">
            Loading...
          </div>
        ) : groupedData.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center text-gray-500">
            No problems found. Click "Generate New" to create some!
          </div>
        ) : (
          groupedData.map((unit, unitIdx) => {
            const unitKey = `unit-${unitIdx}`;
            const isUnitExpanded = expandedUnits.has(unitKey);

            return (
              <div
                key={unitKey}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                {/* Unit Header */}
                <button
                  onClick={() => toggleUnit(unitKey)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">
                      {isUnitExpanded ? '▼' : '▶'}
                    </span>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {unit.unit}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {unit.level} • {unit.subject} • {unit.total_problems} problems
                      </div>
                    </div>
                  </div>
                </button>

                {/* Unit Content */}
                {isUnitExpanded && (
                  <div className="border-t border-gray-200 dark:border-gray-700">
                    {/* Subsections */}
                    {unit.subsections.map((subsection, subIdx) => {
                      const subsectionKey = `${unitIdx}-${subIdx}`;
                      const isSubsectionExpanded = expandedSubsections.has(subsectionKey);

                      return (
                        <div key={subsectionKey} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                          {/* Subsection Header */}
                          <button
                            onClick={() => toggleSubsection(subsectionKey)}
                            className="w-full px-8 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors bg-gray-50/50 dark:bg-gray-900/30"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-sm">
                                {isSubsectionExpanded ? '▼' : '▶'}
                              </span>
                              <div className="text-left">
                                <div className="font-medium text-gray-800 dark:text-gray-200">
                                  {subsection.subsection}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  {subsection.problem_count} problems
                                </div>
                              </div>
                            </div>
                          </button>

                          {/* Subsection Problems */}
                          {isSubsectionExpanded && (
                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                                  <tr>
                                    <th className="px-10 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                      Essence
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                      Diff
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                      Status
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                      Actions
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                  {subsection.problems.map((problem) => (
                                    <AbstractProblemRow
                                      key={problem.id}
                                      problem={problem}
                                      onActivate={handleActivate}
                                      onDelete={handleDelete}
                                      onRefresh={fetchProblems}
                                      compact={true}
                                    />
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Problems without subsection */}
                    {unit.problems_without_subsection.length > 0 && (
                      <div className="border-t border-gray-200 dark:border-gray-700">
                        <div className="px-8 py-3 bg-gray-50/50 dark:bg-gray-900/30">
                          <div className="font-medium text-gray-800 dark:text-gray-200">
                            Other Problems
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {unit.problems_without_subsection.length} problems
                          </div>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                              <tr>
                                <th className="px-10 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  Essence
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  Diff
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  Status
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                              {unit.problems_without_subsection.map((problem) => (
                                <AbstractProblemRow
                                  key={problem.id}
                                  problem={problem}
                                  onActivate={handleActivate}
                                  onDelete={handleDelete}
                                  onRefresh={fetchProblems}
                                  compact={true}
                                />
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Generate Modal */}
      {showGenerateModal && (
        <GenerateAbstractModal
          onClose={() => setShowGenerateModal(false)}
          onSuccess={() => {
            setShowGenerateModal(false);
            fetchProblems();
          }}
        />
      )}
    </div>
  );
}
