'use client';

import { AdaptiveMarkdownViewer } from '@/components/AdaptiveMarkdownViewer';
import { DocsExportButton } from '@/components/DocsExportButton';

interface DocsContentWrapperProps {
  content: string;
  title?: string;
}

export function DocsContentWrapper({ content, title }: DocsContentWrapperProps) {
  return (
    <div className="flex-1 p-8 lg:p-12">
      <div>
        {/* Export Button */}
        <div className="flex justify-end mb-6 print:hidden">
          <DocsExportButton title={title} />
        </div>

        {/* Content to be exported */}
        <div className="bg-white dark:bg-[#121212] p-8 rounded-lg shadow-sm print:shadow-none print:p-0 print:bg-white">
          <AdaptiveMarkdownViewer content={content} />
        </div>
      </div>
    </div>
  );
}
