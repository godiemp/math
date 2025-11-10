'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';

interface GenerateContextModalProps {
  abstractProblemId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const CONTEXT_TYPES = [
  { value: 'shopping', label: 'Shopping', icon: '🛍' },
  { value: 'cooking', label: 'Cooking', icon: '🍳' },
  { value: 'geometry', label: 'Geometry', icon: '📐' },
  { value: 'sports', label: 'Sports', icon: '⚽' },
  { value: 'finance', label: 'Finance', icon: '💰' },
  { value: 'travel', label: 'Travel', icon: '✈️' },
  { value: 'construction', label: 'Construction', icon: '🏗️' },
  { value: 'science', label: 'Science', icon: '🌡️' },
  { value: 'abstract', label: 'Abstract', icon: '📊' },
  { value: 'other', label: 'Other', icon: '📝' },
];

export default function GenerateContextModal({
  abstractProblemId,
  onClose,
  onSuccess,
}: GenerateContextModalProps) {
  const [generating, setGenerating] = useState(false);
  const [contextType, setContextType] = useState('shopping');
  const [count, setCount] = useState(2);
  const [suggestedTypes, setSuggestedTypes] = useState<string[]>([]);

  useEffect(() => {
    fetchSuggestions();
  }, [abstractProblemId]);

  const fetchSuggestions = async () => {
    try {
      const res = await api.get(
        `/api/context-problems/suggest-contexts/${abstractProblemId}`
      );

      if (res.data && (res.data as any).success && (res.data as any).suggestions) {
        setSuggestedTypes((res.data as any).suggestions);
        // Set first suggestion as default
        if ((res.data as any).suggestions.length > 0) {
          setContextType((res.data as any).suggestions[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const res = await api.post('/api/context-problems/generate', {
        abstract_problem_id: abstractProblemId,
        context_type: contextType,
        count,
        save_to_db: true,
      });

      if (res.data && (res.data as any).success) {
        toast.success(`Generated ${(res.data as any).count} context problem(s)!`);
        onSuccess();
      } else {
        toast.error(res.error?.error || 'Failed to generate context problems');
      }
    } catch (error) {
      console.error('Error generating:', error);
      toast.error('Failed to generate context problems');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-xl w-full">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Generate Context Problems
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Context Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Context Type
            </label>
            <select
              value={contextType}
              onChange={(e) => setContextType(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              {CONTEXT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.icon} {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Suggested Types */}
          {suggestedTypes.length > 0 && (
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Suggested types for this problem:
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedTypes.map((type) => {
                  const typeInfo = CONTEXT_TYPES.find((t) => t.value === type);
                  return (
                    <button
                      key={type}
                      onClick={() => setContextType(type)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        contextType === type
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-700'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {typeInfo?.icon} {typeInfo?.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Count */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              How many variations?
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 2)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>

          {/* Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <div className="text-sm text-blue-900 dark:text-blue-300">
              This will generate {count} context variation{count !== 1 ? 's' : ''} of the abstract
              problem using the <strong>{contextType}</strong> scenario.
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            disabled={generating}
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            {generating ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </div>
    </div>
  );
}
