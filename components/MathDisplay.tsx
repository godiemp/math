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
  const containerRef = useRef<HTMLDivElement>(null);

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

  if (displayMode) {
    return (
      <div
        ref={containerRef}
        className={`math-display my-2 ${className}`}
        style={{
          display: 'block',
          textAlign: 'left',
          width: '100%',
          maxWidth: '100%',
        }}
      />
    );
  }

  return (
    <span
      ref={containerRef as any}
      className={`math-display inline-block align-middle ${className}`}
      style={{
        maxWidth: '100%',
        overflowWrap: 'break-word',
        wordBreak: 'normal',
      }}
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
 * Also extracts text from \text{} blocks and renders them as normal HTML
 */
interface MathTextProps {
  content: string;
  className?: string;
}

/**
 * Parse LaTeX content to separate \text{} blocks from actual math
 * Returns parts with text rendered as HTML and math as LaTeX
 */
function parseLatexContent(latex: string): { type: 'text' | 'math'; content: string }[] {
  const parts: { type: 'text' | 'math'; content: string }[] = [];
  let remaining = latex;
  let lastIndex = 0;

  // Match \text{...} blocks (handling nested braces)
  const textRegex = /\\text\{/g;
  let match;

  while ((match = textRegex.exec(remaining)) !== null) {
    const startIndex = match.index;

    // Add any math before this \text block
    if (startIndex > lastIndex) {
      const mathContent = remaining.slice(lastIndex, startIndex).trim();
      if (mathContent) {
        parts.push({ type: 'math', content: mathContent });
      }
    }

    // Find the matching closing brace
    let braceCount = 1;
    let i = startIndex + match[0].length;
    while (i < remaining.length && braceCount > 0) {
      if (remaining[i] === '{' && remaining[i - 1] !== '\\') {
        braceCount++;
      } else if (remaining[i] === '}' && remaining[i - 1] !== '\\') {
        braceCount--;
      }
      i++;
    }

    if (braceCount === 0) {
      // Extract the text content (without \text{})
      const textContent = remaining.slice(startIndex + 6, i - 1);
      parts.push({ type: 'text', content: textContent });
      lastIndex = i;
    } else {
      // Malformed \text{}, treat as math
      parts.push({ type: 'math', content: remaining.slice(startIndex) });
      lastIndex = remaining.length;
      break;
    }
  }

  // Add any remaining math content
  if (lastIndex < remaining.length) {
    const mathContent = remaining.slice(lastIndex).trim();
    if (mathContent) {
      parts.push({ type: 'math', content: mathContent });
    }
  }

  return parts;
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

/**
 * Component to render LaTeX content that may contain \text{} blocks
 * Extracts \text{} content and renders it as normal HTML with proper word-breaking
 */
export function SmartLatexRenderer({ latex, displayMode = false, className = '' }: { latex: string; displayMode?: boolean; className?: string }) {
  const parts = parseLatexContent(latex);

  // If it's all text, render as plain text
  if (parts.every(p => p.type === 'text')) {
    return <span className={className}>{parts.map(p => p.content).join(' ')}</span>;
  }

  // If it's all math, render as math
  if (parts.every(p => p.type === 'math')) {
    return <MathDisplay latex={latex} displayMode={displayMode} className={className} />;
  }

  // Mixed content: render each part appropriately
  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.type === 'text') {
          return <span key={index} style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}>{part.content}</span>;
        } else {
          return <MathDisplay key={index} latex={part.content} displayMode={false} />;
        }
      })}
    </span>
  );
}
