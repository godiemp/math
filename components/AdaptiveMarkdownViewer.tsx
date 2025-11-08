'use client';

import { useState, useMemo } from 'react';
import { MarkdownViewer } from './MarkdownViewer';
import { ReadingModeControl, ReadingMode } from './ReadingModeControl';
import { CollapsibleSection, CollapseControl } from './CollapsibleSection';
import { CollapseControls } from './CollapseControls';
import { parseMarkdownSections, filterSectionsByMode, stripSectionMetadata } from '@/lib/markdown-parser';

interface AdaptiveMarkdownViewerProps {
  content: string;
}

export function AdaptiveMarkdownViewer({ content }: AdaptiveMarkdownViewerProps) {
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
        <ReadingModeControl onChange={setMode} className="mb-6" />
        <MarkdownViewer content={content} />
      </div>
    );
  }

  return (
    <div>
      <ReadingModeControl onChange={setMode} className="mb-6" />

      {/* Collapse controls - shown when there are collapsible sections */}
      {hasCollapsibleSections && mode !== 'formulas' && (
        <CollapseControls onControlChange={setCollapseControl} className="mb-4" />
      )}

      {/* Render content based on mode */}
      {mode === 'formulas' ? (
        // Formulas-only mode: just show formulas
        <div className="space-y-4">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 mb-6">
            <p className="text-sm text-indigo-700 dark:text-indigo-300">
              📐 <strong>Modo Solo Fórmulas:</strong> Mostrando únicamente las fórmulas y definiciones clave.
            </p>
          </div>
          {visibleSections.map((section) => (
            <div key={section.id} className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <MarkdownViewer content={section.content} />
            </div>
          ))}
        </div>
      ) : (
        // Full or summary mode: render sections with collapsible support
        <div>
          {mode === 'summary' && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                📄 <strong>Modo Síntesis:</strong> Mostrando contenido esencial. Las secciones avanzadas están ocultas.
              </p>
            </div>
          )}

          {/* Main content container - one clean box */}
          <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
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
                  <MarkdownViewer content={stripSectionMetadata(section.content)} />
                </CollapsibleSection>
              );
            }

            // Fallback for non-section types
            return (
              <div key={section.id} className="my-6">
                <MarkdownViewer content={stripSectionMetadata(section.content)} />
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
