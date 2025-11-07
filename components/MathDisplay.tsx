'use client';

import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathDisplayProps {
  latex: string;
  displayMode?: boolean;
  className?: string;
}

/**
 * MathDisplay component - Renders LaTeX mathematical expressions using KaTeX
 *
 * @param latex - The LaTeX string to render
 * @param displayMode - If true, renders in display mode (centered, larger). If false, renders inline
 * @param className - Optional CSS classes to apply
 */
export default function MathDisplay({ latex, displayMode = false, className = '' }: MathDisplayProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current && latex) {
      try {
        katex.render(latex, containerRef.current, {
          displayMode,
          throwOnError: false,
          errorColor: '#cc0000',
          strict: false,
          trust: false,
          output: 'html',
        });
      } catch (error) {
        console.error('KaTeX rendering error:', error);
        if (containerRef.current) {
          containerRef.current.textContent = latex;
        }
      }
    }
  }, [latex, displayMode]);

  return (
    <span
      ref={containerRef}
      className={`math-display ${displayMode ? 'block my-2 text-left' : 'inline-block align-middle'} ${className}`}
      style={{ maxWidth: '100%', overflowWrap: 'break-word' }}
    />
  );
}

/**
 * Utility component for inline math expressions
 */
export function InlineMath({ latex, className = '' }: { latex: string; className?: string }) {
  return <MathDisplay latex={latex} displayMode={false} className={className} />;
}

/**
 * Utility component for display (block) math expressions
 */
export function BlockMath({ latex, className = '' }: { latex: string; className?: string }) {
  return <MathDisplay latex={latex} displayMode={true} className={className} />;
}

/**
 * Component to render mixed text and math content
 * Parses text with inline LaTeX delimiters $...$ and display delimiters $$...$$
 */
interface MathTextProps {
  content: string;
  className?: string;
}

export function MathText({ content, className = '' }: MathTextProps) {
  const parts: { type: 'text' | 'inline' | 'display'; content: string }[] = [];

  // Parse the content for math delimiters
  let remaining = content;
  let match;

  // Regex to match $$...$$ (display) or $...$ (inline)
  const mathRegex = /(\$\$[\s\S]+?\$\$|\$[^\$]+?\$)/g;
  let lastIndex = 0;

  while ((match = mathRegex.exec(remaining)) !== null) {
    // Add text before the math
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: remaining.slice(lastIndex, match.index)
      });
    }

    // Add the math part
    const mathContent = match[0];
    if (mathContent.startsWith('$$')) {
      // Display math
      parts.push({
        type: 'display',
        content: mathContent.slice(2, -2)
      });
    } else {
      // Inline math
      parts.push({
        type: 'inline',
        content: mathContent.slice(1, -1)
      });
    }

    lastIndex = match.index + mathContent.length;
  }

  // Add remaining text
  if (lastIndex < remaining.length) {
    parts.push({
      type: 'text',
      content: remaining.slice(lastIndex)
    });
  }

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.type === 'text') {
          return <span key={index}>{part.content}</span>;
        } else if (part.type === 'inline') {
          return <InlineMath key={index} latex={part.content} />;
        } else {
          return <BlockMath key={index} latex={part.content} />;
        }
      })}
    </span>
  );
}
