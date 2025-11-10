'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { API_BASE_URL } from '@/lib/config';
import GenerateAbstractModal from './GenerateAbstractModal';
import AbstractProblemRow from './AbstractProblemRow';

interface AbstractProblem {
  id: string;
  essence: string;
  level: string;
  subject: string;
  unit: string;
  difficulty: string;
  status: string;
  cognitive_level: string;
  primary_skills: string[];
}

export default function AbstractProblemsTab() {
  const [problems, setProblems] = useState<AbstractProblem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [filters, setFilters] = useState({
    level: 'all',
    subject: 'all',
    status: 'all',
    difficulty: 'all',
  });
  const [page, setPage] = useState(1);
  const itemsPerPage = 25;

  useEffect(() => {
    fetchProblems();
  }, [filters]);

  const fetchProblems = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();

      if (filters.level !== 'all') params.append('level', filters.level);
      if (filters.subject !== 'all') params.append('subject', filters.subject);
      if (filters.status !== 'all') params.append('status', filters.status);
      if (filters.difficulty !== 'all') params.append('difficulty', filters.difficulty);

      const res = await fetch(`${API_BASE_URL}/abstract-problems?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (data.success) {
        setProblems(data.problems || []);
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
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/abstract-problems/${id}/activate`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (data.success) {
        toast.success('Problem activated');
        fetchProblems();
      } else {
        toast.error(data.error || 'Failed to activate');
      }
    } catch (error) {
      console.error('Error activating:', error);
      toast.error('Failed to activate problem');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this problem?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/abstract-problems/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (data.success) {
        toast.success('Problem deleted');
        fetchProblems();
      } else {
        toast.error(data.error || 'Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      toast.error('Failed to delete problem');
    }
  };

  const paginatedProblems = problems.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(problems.length / itemsPerPage);

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

        <select
          value={filters.difficulty}
          onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="all">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="extreme">Extreme</option>
        </select>

        <div className="flex-1"></div>

        <button
          onClick={() => setShowGenerateModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          + Generate New
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Essence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  L
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Diff
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : paginatedProblems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No problems found. Click "Generate New" to create some!
                  </td>
                </tr>
              ) : (
                paginatedProblems.map((problem) => (
                  <AbstractProblemRow
                    key={problem.id}
                    problem={problem}
                    onActivate={handleActivate}
                    onDelete={handleDelete}
                    onRefresh={fetchProblems}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {(page - 1) * itemsPerPage + 1} to{' '}
            {Math.min(page * itemsPerPage, problems.length)} of {problems.length} problems
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              ← Previous
            </button>
            <span className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      )}

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
