'use client';

import { UnifiedLatexRenderer } from '@/components/math/MathDisplay';

interface LatexTextProps {
  /** The content to render (can be plain text, LaTeX, or mixed) */
  content: string;
  /** Whether to render in display mode (block) or inline */
  displayMode?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * LatexText - Wrapper for rendering text that may contain LaTeX
 *
 * Uses UnifiedLatexRenderer which handles:
 * - Plain text
 * - LaTeX with $...$ or $$...$$ delimiters
 * - Pure LaTeX expressions
 * - Mixed content with \text{} blocks
 */
export default function LatexText({ content, displayMode = false, className = '' }: LatexTextProps) {
  return (
    <UnifiedLatexRenderer
      content={content}
      displayMode={displayMode}
      className={className}
    />
  );
}
