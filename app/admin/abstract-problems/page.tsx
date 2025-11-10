'use client';

import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import OverviewTab from './components/OverviewTab';
import AbstractProblemsTab from './components/AbstractProblemsTab';
import ContextProblemsTab from './components/ContextProblemsTab';

type Tab = 'overview' | 'abstract' | 'context';

function AbstractProblemsPageContent() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Abstract Problems System
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage abstract problems and their contextualized variations
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`
                pb-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }
              `}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('abstract')}
              className={`
                pb-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  activeTab === 'abstract'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }
              `}
            >
              Abstract Problems
            </button>
            <button
              onClick={() => setActiveTab('context')}
              className={`
                pb-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  activeTab === 'context'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }
              `}
            >
              Context Problems
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'abstract' && <AbstractProblemsTab />}
          {activeTab === 'context' && <ContextProblemsTab />}
        </div>
      </div>
    </AdminLayout>
  );
}

export default function AbstractProblemsPage() {
  return (
    <ProtectedRoute requireAdmin>
      <AbstractProblemsPageContent />
    </ProtectedRoute>
  );
}
