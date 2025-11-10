'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { API_BASE_URL } from '@/lib/config';
import GenerateContextModal from './GenerateContextModal';
import ContextProblemCard from './ContextProblemCard';

interface ContextProblem {
  id: string;
  abstract_problem_id: string;
  context_type: string;
  question: string;
  quality_score?: number;
  times_used: number;
  avg_correctness?: number;
  verified: boolean;
  options?: string[];
  correct_answer?: number;
  explanation: string;
}

interface AbstractProblem {
  id: string;
  essence: string;
  level: string;
  subject: string;
  difficulty: string;
}

interface GroupedContext {
  abstract: AbstractProblem;
  contexts: ContextProblem[];
}

export default function ContextProblemsTab() {
  const [grouped, setGrouped] = useState<GroupedContext[]>([]);
  const [loading, setLoading] = useState(true);
  const [generateModalAbstractId, setGenerateModalAbstractId] = useState<string | null>(null);

  useEffect(() => {
    fetchContexts();
  }, []);

  const fetchContexts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      // Fetch all abstract problems
      const abstractRes = await fetch(`${API_BASE_URL}/abstract-problems?status=active`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const abstractData = await abstractRes.json();

      // Fetch all context problems
      const contextRes = await fetch(`${API_BASE_URL}/context-problems`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const contextData = await contextRes.json();

      // Group contexts by abstract problem
      const abstractProblems = abstractData.problems || [];
      const contextProblems = contextData.problems || [];

      const groupedData: GroupedContext[] = abstractProblems.map((abstract: AbstractProblem) => ({
        abstract,
        contexts: contextProblems.filter(
          (ctx: ContextProblem) => ctx.abstract_problem_id === abstract.id
        ),
      }));

      setGrouped(groupedData);
    } catch (error) {
      console.error('Error fetching contexts:', error);
      toast.error('Failed to fetch context problems');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this context problem?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/context-problems/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (data.success) {
        toast.success('Context problem deleted');
        fetchContexts();
      } else {
        toast.error(data.error || 'Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      toast.error('Failed to delete context problem');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {grouped.reduce((sum, g) => sum + g.contexts.length, 0)} context problems across{' '}
        {grouped.length} abstract problems
      </div>

      <div className="space-y-6">
        {grouped.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No context problems yet. Generate some abstract problems first, then create contexts for
            them.
          </div>
        ) : (
          grouped.map((item) => (
            <ContextGroup
              key={item.abstract.id}
              item={item}
              onGenerateClick={(id) => setGenerateModalAbstractId(id)}
              onDelete={handleDelete}
              onRefresh={fetchContexts}
            />
          ))
        )}
      </div>

      {/* Generate Modal */}
      {generateModalAbstractId && (
        <GenerateContextModal
          abstractProblemId={generateModalAbstractId}
          onClose={() => setGenerateModalAbstractId(null)}
          onSuccess={() => {
            setGenerateModalAbstractId(null);
            fetchContexts();
          }}
        />
      )}
    </div>
  );
}

function ContextGroup({
  item,
  onGenerateClick,
  onDelete,
  onRefresh,
}: {
  item: GroupedContext;
  onGenerateClick: (id: string) => void;
  onDelete: (id: string) => void;
  onRefresh: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">{expanded ? '▼' : '▶'}</span>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              {item.abstract.essence}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {item.abstract.level} • {item.abstract.subject} • {item.abstract.difficulty} •{' '}
              {item.contexts.length} context{item.contexts.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onGenerateClick(item.abstract.id);
          }}
          className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors"
        >
          + Generate
        </button>
      </div>

      {/* Contexts */}
      {expanded && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-4">
          {item.contexts.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No contexts yet. Click "Generate" to create some!
            </div>
          ) : (
            item.contexts.map((context) => (
              <ContextProblemCard
                key={context.id}
                context={context}
                onDelete={onDelete}
                onRefresh={onRefresh}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
