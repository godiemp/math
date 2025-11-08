'use client';

import { useState, useMemo } from 'react';
import { MarkdownViewer } from './MarkdownViewer';
import { ReadingModeControl, ReadingMode } from './ReadingModeControl';
import { CollapsibleSection } from './CollapsibleSection';
import { parseMarkdownSections, filterSectionsByMode, stripSectionMetadata } from '@/lib/markdown-parser';

interface AdaptiveMarkdownViewerProps {
  content: string;
}

export function AdaptiveMarkdownViewer({ content }: AdaptiveMarkdownViewerProps) {
  const [mode, setMode] = useState<ReadingMode>('full');

  // Parse sections from markdown
  const parsed = useMemo(() => parseMarkdownSections(content), [content]);

  // Filter sections based on current mode
  const visibleSections = useMemo(
    () => filterSectionsByMode(parsed.sections, mode),
    [parsed.sections, mode]
  );

  // Check if content has any sections with metadata
  const hasSections = parsed.sections.length > 0;

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

          {visibleSections.map((section) => {
            // Formula sections are always shown directly
            if (section.type === 'formula') {
              return (
                <div key={section.id} className="my-4">
                  <MarkdownViewer content={section.content} />
                </div>
              );
            }

            // Regular sections can be collapsible
            if (section.collapsible) {
              return (
                <CollapsibleSection
                  key={section.id}
                  id={section.id}
                  title={section.title}
                  importance={section.importance}
                  mode={mode}
                  defaultOpen={section.defaultOpen}
                >
                  <MarkdownViewer content={stripSectionMetadata(section.content)} />
                </CollapsibleSection>
              );
            }

            // Non-collapsible sections
            return (
              <div key={section.id} className="my-6">
                <MarkdownViewer content={stripSectionMetadata(section.content)} />
              </div>
            );
          })}

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
