'use client';

import { useState, useMemo } from 'react';
import { MarkdownViewer } from '@/components/content/MarkdownViewer';
import { ReadingModeControl, ReadingMode } from '@/components/shared/ReadingModeControl';
import { CollapsibleSection, CollapseControl } from '@/components/shared/CollapsibleSection';
import { CollapseControls } from '@/components/shared/CollapseControls';
import { parseMarkdownSections, filterSectionsByMode, stripFirstHeading } from '@/lib/markdown-parser';

interface AdaptiveMarkdownViewerProps {
  content: string;
  hideReadingModeControl?: boolean;
}

export function AdaptiveMarkdownViewer({ content, hideReadingModeControl = false }: AdaptiveMarkdownViewerProps) {
  const [mode, setMode] = useState<ReadingMode>('full');
  const [collapseControl, setCollapseControl] = useState<CollapseControl>(null);

  // Parse sections from markdown
  const parsed = useMemo(() => parseMarkdownSections(content), [content]);

  // Filter sections based on current mode
  const visibleSections = useMemo(
    () => filterSectionsByMode(parsed.sections, mode),
    [parsed.sections, mode]
  );

  // Check if content has any sections with metadata
  const hasSections = parsed.sections.length > 0;

  // Check if there are any collapsible sections
  const hasCollapsibleSections = parsed.sections.some(s => s.type === 'section');

  // If no sections found, render as regular markdown
  if (!hasSections) {
    return (
      <div>
        {!hideReadingModeControl && <ReadingModeControl onChange={setMode} className="mb-6" />}
        <MarkdownViewer content={content} />
      </div>
    );
  }

  return (
    <div>
      {!hideReadingModeControl && <ReadingModeControl onChange={setMode} className="mb-6" />}

      {/* Collapse controls - shown when there are collapsible sections */}
      {hasCollapsibleSections && mode !== 'formulas' && (
        <CollapseControls onControlChange={setCollapseControl} className="mb-4" />
      )}

      {/* Render content based on mode */}
      {mode === 'formulas' ? (
        // Formulas-only mode: just show formulas
        <div className="space-y-6">
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-indigo-500 dark:border-indigo-600 rounded-r-lg p-4 mb-8">
            <p className="text-sm text-indigo-800 dark:text-indigo-200 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span><strong>Modo Solo Fórmulas:</strong> Mostrando únicamente las fórmulas y definiciones clave.</span>
            </p>
          </div>
          <div className="grid gap-4">
            {visibleSections.map((section) => (
              <div key={section.id} className="bg-white dark:bg-slate-900/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <MarkdownViewer content={section.content} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Full or summary mode: render sections with collapsible support
        <div>
          {mode === 'summary' && (
            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-400 dark:border-amber-600 rounded-r-lg p-4 mb-6">
              <p className="text-sm text-amber-800 dark:text-amber-200 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>Modo Síntesis:</strong> Mostrando contenido esencial. Las secciones avanzadas están ocultas.</span>
              </p>
            </div>
          )}

          {/* Main content container - modern and clean */}
          <div className="space-y-1">
            {visibleSections.map((section) => {
            // Formula sections are always shown directly
            if (section.type === 'formula') {
              return (
                <div key={section.id} className="my-4">
                  <MarkdownViewer content={section.content} />
                </div>
              );
            }

            // All sections are now collapsible - determine level from title
            if (section.type === 'section') {
              // Extract heading level from content (## -> 2, ### -> 3, etc.)
              const headingMatch = section.content.match(/^#{1,6}\s/);
              const level = headingMatch ? headingMatch[0].trim().length : 2;

              return (
                <CollapsibleSection
                  key={section.id}
                  id={section.id}
                  title={section.title}
                  importance={section.importance}
                  mode={mode}
                  defaultOpen={section.defaultOpen}
                  level={level}
                  collapseControl={collapseControl}
                >
                  <MarkdownViewer content={stripFirstHeading(section.content)} />
                </CollapsibleSection>
              );
            }

            // Fallback for non-section types
            return (
              <div key={section.id} className="my-6">
                <MarkdownViewer content={stripFirstHeading(section.content)} />
              </div>
            );
            })}
          </div>

          {/* Render any content outside of sections */}
          {parsed.sections.length > 0 && (
            <div className="mt-6">
              {/* This would contain any markdown not wrapped in section tags */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
