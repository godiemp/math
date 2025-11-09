'use client';

import { AdaptiveMarkdownViewer } from '@/components/AdaptiveMarkdownViewer';
import { DocsExportButton } from '@/components/DocsExportButton';

interface DocsContentWrapperProps {
  content: string;
  title?: string;
}

export function DocsContentWrapper({ content, title }: DocsContentWrapperProps) {
  return (
    <div className="flex-1">
      <div>
        {/* Export Button */}
        <div className="flex justify-end mb-6 px-6 pt-6 print:hidden">
          <DocsExportButton title={title} />
        </div>

        {/* Content to be exported */}
        <div className="px-6 pb-6 print:p-0">
          <AdaptiveMarkdownViewer content={content} />
        </div>
      </div>
    </div>
  );
}
