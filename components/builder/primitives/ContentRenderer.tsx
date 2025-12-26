'use client';

import type { ContentBlock, ThemeColor } from '@/lib/builder/types';
import LatexText from './LatexText';

interface ContentRendererProps {
  /** Array of content blocks to render */
  blocks: ContentBlock[];
  /** Additional CSS classes for the container */
  className?: string;
}

/**
 * Color classes for highlights
 */
const colorClasses: Record<ThemeColor, string> = {
  blue: 'text-blue-600 dark:text-blue-400',
  purple: 'text-purple-600 dark:text-purple-400',
  teal: 'text-teal-600 dark:text-teal-400',
  pink: 'text-pink-600 dark:text-pink-400',
  green: 'text-green-600 dark:text-green-400',
  amber: 'text-amber-600 dark:text-amber-400',
  orange: 'text-orange-600 dark:text-orange-400',
  red: 'text-red-600 dark:text-red-400',
};

/**
 * ContentRenderer - Renders an array of ContentBlock elements
 *
 * Supports:
 * - text: Plain text
 * - latex: LaTeX mathematical expressions
 * - highlight: Colored highlighted text
 * - bold: Bold text
 * - mono: Monospace/code text
 */
export default function ContentRenderer({ blocks, className = '' }: ContentRendererProps) {
  return (
    <span className={className}>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'text':
            return <span key={index}>{block.content}</span>;

          case 'latex':
            return <LatexText key={index} content={block.content} />;

          case 'highlight': {
            const color = (block.color as ThemeColor) || 'amber';
            return (
              <span key={index} className={`font-semibold ${colorClasses[color]}`}>
                {block.content}
              </span>
            );
          }

          case 'bold':
            return (
              <strong key={index} className="font-bold">
                {block.content}
              </strong>
            );

          case 'mono':
            return (
              <code
                key={index}
                className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded"
              >
                {block.content}
              </code>
            );

          default:
            return <span key={index}>{block.content}</span>;
        }
      })}
    </span>
  );
}

/**
 * Render a single line of text that may contain inline formatting
 * Parses simple markdown-like syntax: **bold**, `code`, and preserves LaTeX $...$
 */
export function RichText({ content, className = '' }: { content: string; className?: string }) {
  // For now, just render through LatexText which handles $...$ and plain text
  // In the future, we could add parsing for **bold** and `code`
  return <LatexText content={content} className={className} />;
}
