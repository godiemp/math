'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface MarkdownViewerProps {
  content: string;
}

export function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none
      prose-headings:font-bold
      prose-h1:text-4xl prose-h1:mb-4 prose-h1:mt-8 prose-h1:text-indigo-600 dark:prose-h1:text-indigo-400
      prose-h2:text-3xl prose-h2:mb-3 prose-h2:mt-6 prose-h2:border-b prose-h2:border-gray-300 dark:prose-h2:border-gray-700 prose-h2:pb-2
      prose-h3:text-2xl prose-h3:mb-2 prose-h3:mt-4
      prose-h4:text-xl prose-h4:mb-2 prose-h4:mt-3
      prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
      prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
      prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-strong:font-semibold
      prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:text-indigo-600 dark:prose-code:text-indigo-400 prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
      prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-50 dark:prose-blockquote:bg-indigo-900/20 prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:italic
      prose-ul:list-disc prose-ul:ml-6
      prose-ol:list-decimal prose-ol:ml-6
      prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:my-1
      prose-table:border-collapse prose-table:w-full
      prose-th:bg-gray-100 dark:prose-th:bg-gray-800 prose-th:p-2 prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-700 prose-th:font-semibold
      prose-td:p-2 prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-700
      prose-hr:border-gray-300 dark:prose-hr:border-gray-700 prose-hr:my-8
    ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        components={{
          // Customize checkbox rendering
          input: ({ node, ...props }) => {
            if (props.type === 'checkbox') {
              return (
                <input
                  {...props}
                  className="mr-2 h-4 w-4 rounded border-gray-300 dark:border-gray-700"
                  disabled={props.disabled}
                />
              );
            }
            return <input {...props} />;
          },
          // Add copy button to code blocks in the future if needed
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
