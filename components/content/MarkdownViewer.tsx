'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface MarkdownViewerProps {
  content: string;
}

export function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none
      prose-headings:font-semibold prose-headings:tracking-tight
      prose-h1:text-5xl prose-h1:mb-6 prose-h1:mt-0 prose-h1:text-slate-900 dark:prose-h1:text-slate-50 prose-h1:leading-tight
      prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:text-slate-900 dark:prose-h2:text-slate-50 prose-h2:border-b prose-h2:border-slate-200 dark:prose-h2:border-slate-800 prose-h2:pb-3
      prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-slate-800 dark:prose-h3:text-slate-200
      prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-6 prose-h4:text-slate-700 dark:prose-h4:text-slate-300
      prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed prose-p:mb-4
      prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline hover:prose-a:text-indigo-700 dark:hover:prose-a:text-indigo-300 prose-a:transition-colors
      prose-strong:text-slate-900 dark:prose-strong:text-slate-100 prose-strong:font-semibold
      prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-sm prose-code:font-mono prose-code:text-indigo-600 dark:prose-code:text-indigo-400 prose-code:before:content-none prose-code:after:content-none prose-code:font-medium
      prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950 prose-pre:text-slate-100 prose-pre:p-5 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:shadow-lg prose-pre:border prose-pre:border-slate-800 dark:prose-pre:border-slate-700
      prose-blockquote:border-l-4 prose-blockquote:border-slate-300 dark:prose-blockquote:border-slate-700 prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-900/30 prose-blockquote:pl-5 prose-blockquote:pr-4 prose-blockquote:py-3 prose-blockquote:italic prose-blockquote:rounded-r-lg prose-blockquote:text-slate-600 dark:prose-blockquote:text-slate-400
      prose-ul:list-disc prose-ul:ml-6 prose-ul:space-y-2
      prose-ol:list-decimal prose-ol:ml-6 prose-ol:space-y-2
      prose-li:text-slate-600 dark:prose-li:text-slate-400 prose-li:leading-relaxed
      prose-table:border-collapse prose-table:w-full prose-table:my-8 prose-table:rounded-lg prose-table:overflow-hidden prose-table:shadow-sm
      prose-thead:bg-slate-50 dark:prose-thead:bg-slate-800/50
      prose-th:bg-transparent prose-th:px-4 prose-th:py-3 prose-th:border-b-2 prose-th:border-slate-200 dark:prose-th:border-slate-700 prose-th:font-semibold prose-th:text-slate-700 dark:prose-th:text-slate-300 prose-th:text-left prose-th:text-sm
      prose-td:px-4 prose-td:py-3 prose-td:border-b prose-td:border-slate-200 dark:prose-td:border-slate-800 prose-td:text-slate-600 dark:prose-td:text-slate-400
      prose-tr:hover:bg-slate-50 dark:prose-tr:hover:bg-slate-800/30 prose-tr:transition-colors
      prose-hr:border-slate-200 dark:prose-hr:border-slate-800 prose-hr:my-12
    ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={{
          // Customize checkbox rendering
          input: ({ node, ...props }) => {
            if (props.type === 'checkbox') {
              return (
                <input
                  {...props}
                  className="mr-2 h-4 w-4 rounded border-slate-300 dark:border-slate-700"
                  disabled={props.disabled}
                />
              );
            }
            return <input {...props} />;
          },
          // Modern table rendering
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-8">
              <table className="min-w-full rounded-lg overflow-hidden shadow-sm" {...props} />
            </div>
          ),
          // Add subtle styling to headings with icons
          h4: ({ node, children, ...props }) => {
            const text = String(children);
            // Detect icon patterns like 🎓, ⚡, 🌍, etc.
            if (text.match(/^[🎓⚡🌍🎯🔍🔬⚠️❌✓✅💰🍽️💳📊🏪📈]/)) {
              return (
                <h4 className="flex items-center gap-2 text-slate-800 dark:text-slate-200" {...props}>
                  {children}
                </h4>
              );
            }
            return <h4 {...props}>{children}</h4>;
          },
        }}
      >
        {content.trim()}
      </ReactMarkdown>
    </div>
  );
}
