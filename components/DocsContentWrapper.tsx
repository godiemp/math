'use client';

import { useRef } from 'react';
import { AdaptiveMarkdownViewer } from '@/components/AdaptiveMarkdownViewer';
import { DocsExportButton } from '@/components/DocsExportButton';

interface DocsContentWrapperProps {
  content: string;
  title?: string;
}

export function DocsContentWrapper({ content, title }: DocsContentWrapperProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex-1 p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Export Button */}
        <div className="flex justify-end mb-6">
          <DocsExportButton contentRef={contentRef} title={title} />
        </div>

        {/* Content to be exported */}
        <div ref={contentRef} className="bg-white dark:bg-[#121212] p-8 rounded-lg shadow-sm">
          <AdaptiveMarkdownViewer content={content} />
        </div>
      </div>
    </div>
  );
}
