'use client';

import { useState } from 'react';
import { ArrowLeft, Sparkles, Eye, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { DynamicLesson } from '@/lib/builder/types';
import { LESSON_TEMPLATES, getTemplateById } from '@/lib/builder/templates';
import { DynamicLessonRenderer } from '@/components/builder';
import BuilderChat from '@/components/builder/BuilderChat';

type View = 'split' | 'chat' | 'preview';

export default function BuildPage() {
  const [lesson, setLesson] = useState<DynamicLesson | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [view, setView] = useState<View>('split');
  const [previewStep, setPreviewStep] = useState(0);

  const handleTemplateSelect = (templateId: string) => {
    const template = getTemplateById(templateId);
    if (template?.lesson) {
      setLesson(template.lesson as DynamicLesson);
      setSelectedTemplateId(templateId);
      setPreviewStep(0);
    }
  };

  const handleLessonUpdate = (updatedLesson: DynamicLesson) => {
    setLesson(updatedLesson);
  };

  // Mobile view toggle buttons
  const ViewToggle = () => (
    <div className="flex gap-1 md:hidden">
      <button
        onClick={() => setView('chat')}
        className={cn(
          'p-2 rounded-lg transition-colors',
          view === 'chat' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
        )}
      >
        <MessageSquare size={20} />
      </button>
      <button
        onClick={() => setView('preview')}
        className={cn(
          'p-2 rounded-lg transition-colors',
          view === 'preview' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
        )}
      >
        <Eye size={20} />
      </button>
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="flex-shrink-0 h-14 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <h1 className="font-semibold text-gray-900 dark:text-white">
              Lesson Builder
            </h1>
          </div>
          {lesson && (
            <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">
              — {lesson.title}
            </span>
          )}
        </div>
        <ViewToggle />
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Panel */}
        <div
          className={cn(
            'flex flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800',
            view === 'preview' ? 'hidden' : 'flex',
            view === 'split' ? 'w-1/2' : 'w-full',
            'md:flex md:w-1/2'
          )}
        >
          {!lesson ? (
            // Template selector
            <TemplateSelector onSelect={handleTemplateSelect} />
          ) : (
            // Chat interface
            <BuilderChat
              lesson={lesson}
              onLessonUpdate={handleLessonUpdate}
              activeStep={previewStep}
            />
          )}
        </div>

        {/* Preview Panel */}
        <div
          className={cn(
            'flex-1 overflow-hidden bg-gray-100 dark:bg-gray-900',
            view === 'chat' ? 'hidden' : 'flex flex-col',
            'md:flex md:flex-col'
          )}
        >
          {lesson ? (
            <LessonPreview
              lesson={lesson}
              activeStep={previewStep}
              onStepChange={setPreviewStep}
            />
          ) : (
            <EmptyPreview />
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Template selector component
 */
function TemplateSelector({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Crea tu Lección
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Elige una plantilla para empezar o describe qué quieres enseñar
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
            Plantillas
          </h3>
          <div className="grid gap-3">
            {LESSON_TEMPLATES.map((template) => (
              <button
                key={template.id}
                onClick={() => onSelect(template.id)}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
                    {template.name}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 capitalize">
                    {template.subject}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {template.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Lesson preview component
 */
function LessonPreview({
  lesson,
  activeStep,
  onStepChange,
}: {
  lesson: DynamicLesson;
  activeStep: number;
  onStepChange: (step: number) => void;
}) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Preview header with step navigation */}
      <div className="flex-shrink-0 bg-yellow-100 dark:bg-yellow-900/30 border-b border-yellow-200 dark:border-yellow-800 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              MODO PREVIEW
            </span>
          </div>
          <div className="flex gap-1">
            {lesson.steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => onStepChange(index)}
                className={cn(
                  'px-3 py-1 text-xs rounded-full transition-colors',
                  index === activeStep
                    ? 'bg-yellow-500 text-white'
                    : 'bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 hover:bg-yellow-300 dark:hover:bg-yellow-700'
                )}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preview content */}
      <div className="flex-1 overflow-auto">
        <DynamicLessonRenderer
          lesson={lesson}
          previewMode
          onComplete={() => {}}
          onExit={() => {}}
        />
      </div>
    </div>
  );
}

/**
 * Empty preview state
 */
function EmptyPreview() {
  return (
    <div className="flex-1 flex items-center justify-center text-center p-8">
      <div>
        <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Eye className="w-10 h-10 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
          Vista previa
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Elige una plantilla para ver la lección aquí
        </p>
      </div>
    </div>
  );
}
