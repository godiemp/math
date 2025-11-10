'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AbstractProblemRowProps {
  problem: any;
  onActivate: (id: string) => void;
  onDelete: (id: string) => void;
  onRefresh: () => void;
}

export default function AbstractProblemRow({
  problem,
  onActivate,
  onDelete,
  onRefresh,
}: AbstractProblemRowProps) {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const difficultyColors = {
    easy: 'text-green-600 dark:text-green-400',
    medium: 'text-yellow-600 dark:text-yellow-400',
    hard: 'text-orange-600 dark:text-orange-400',
    extreme: 'text-red-600 dark:text-red-400',
  };

  const statusColors = {
    active: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
    draft: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
    deprecated: 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300',
  };

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900 dark:text-white font-medium line-clamp-2">
          {problem.essence}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm font-mono text-gray-900 dark:text-white">{problem.level}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-700 dark:text-gray-300">{problem.subject}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`text-sm font-medium ${difficultyColors[problem.difficulty as keyof typeof difficultyColors]}`}>
          {problem.difficulty[0].toUpperCase()}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            statusColors[problem.status as keyof typeof statusColors]
          }`}
        >
          {problem.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          ⚙
        </button>

        {showMenu && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)}></div>
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-20">
              <div className="py-1">
                {problem.status === 'draft' && (
                  <button
                    onClick={() => {
                      onActivate(problem.id);
                      setShowMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    ✓ Activate
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowMenu(false);
                    // TODO: Navigate to contexts view
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  🎭 View Contexts
                </button>
                <button
                  onClick={() => {
                    onDelete(problem.id);
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
      </td>
    </tr>
  );
}
