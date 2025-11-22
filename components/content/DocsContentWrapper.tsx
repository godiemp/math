'use client';

import { AdaptiveMarkdownViewer } from '@/components/content/AdaptiveMarkdownViewer';
import { DocsExportButton } from '@/components/content/DocsExportButton';

interface DocsContentWrapperProps {
  content: string;
  title?: string;
  isInicio?: boolean;
}

export function DocsContentWrapper({ content, title, isInicio = false }: DocsContentWrapperProps) {
  return (
    <div className="flex-1 min-w-0">
      <div>
        {/* Export Button */}
        <div className="flex justify-end mb-4 sm:mb-6 px-4 sm:px-6 pt-4 sm:pt-6 print:hidden">
          <DocsExportButton title={title} />
        </div>

        {/* Content to be exported */}
        <div className="px-4 sm:px-6 pb-6 print:p-0">
          <AdaptiveMarkdownViewer content={content} hideReadingModeControl={isInicio} />
        </div>
      </div>
    </div>
  );
}
