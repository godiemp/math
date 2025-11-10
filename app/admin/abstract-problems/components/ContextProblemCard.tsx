'use client';

import { useState } from 'react';

interface ContextProblemCardProps {
  context: any;
  onDelete: (id: string) => void;
  onRefresh: () => void;
}

const CONTEXT_ICONS: Record<string, string> = {
  shopping: '🛍',
  cooking: '🍳',
  geometry: '📐',
  sports: '⚽',
  finance: '💰',
  travel: '✈️',
  construction: '🏗️',
  science: '🌡️',
  abstract: '📊',
  other: '📝',
};

export default function ContextProblemCard({ context, onDelete, onRefresh }: ContextProblemCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{CONTEXT_ICONS[context.context_type]}</span>
              <span className="font-medium text-gray-900 dark:text-white uppercase text-sm">
                {context.context_type}
              </span>
              {context.quality_score && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  • Q: {context.quality_score}/10
                </span>
              )}
              {context.verified && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  ✓ Verified
                </span>
              )}
            </div>

            {/* Question Preview */}
            <div className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-2">
              {context.question}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <span>Used: {context.times_used}</span>
              {context.avg_correctness && (
                <span>• {context.avg_correctness.toFixed(0)}% correct</span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1"
            >
              ⚙
            </button>

            {showMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)}></div>
                <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-20">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setShowPreview(true);
                        setShowMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      👁 Preview
                    </button>
                    <button
                      onClick={() => {
                        onDelete(context.id);
                        setShowMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Student View Preview
                </h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                  Question
                </div>
                <div className="text-gray-900 dark:text-white mb-6">{context.question}</div>

                <div className="space-y-3">
                  {context.options?.map((option: string, idx: number) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border ${
                        idx === context.correct_answer
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs ${
                            idx === context.correct_answer
                              ? 'border-green-500 bg-green-500 text-white'
                              : 'border-gray-400'
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span className="text-gray-900 dark:text-white">{option}</span>
                        {idx === context.correct_answer && (
                          <span className="ml-auto text-green-600 dark:text-green-400 font-medium">
                            ✓ Correct
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Explanation */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <div className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">
                  Explanation
                </div>
                <div className="text-gray-900 dark:text-white whitespace-pre-line">
                  {context.explanation}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowPreview(false)}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
