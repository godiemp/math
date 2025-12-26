'use client';

import { useEffect, useRef } from 'react';
import katex from 'katex';

interface HtmlWithLatexProps {
  content: string;
  className?: string;
}

/**
 * HtmlWithLatex - Renders HTML content that may contain LaTeX expressions
 *
 * Uses dangerouslySetInnerHTML for HTML, then post-processes to render LaTeX.
 * LaTeX expressions should use $...$ for inline math.
 */
export default function HtmlWithLatex({ content, className = '' }: HtmlWithLatexProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Find all text nodes that contain LaTeX patterns
    const walker = document.createTreeWalker(
      containerRef.current,
      NodeFilter.SHOW_TEXT,
      null
    );

    const textNodes: Text[] = [];
    let node: Node | null;
    while ((node = walker.nextNode())) {
      if (node.nodeValue && node.nodeValue.includes('$')) {
        textNodes.push(node as Text);
      }
    }

    // Process each text node
    textNodes.forEach(textNode => {
      const text = textNode.nodeValue || '';
      const parts: (string | { latex: string; display: boolean })[] = [];
      let remaining = text;
      let lastIndex = 0;

      // Match $$...$$ (display) or $...$ (inline)
      const mathRegex = /(\$\$[\s\S]+?\$\$|\$[^\$]+?\$)/g;
      let match;

      while ((match = mathRegex.exec(text)) !== null) {
        // Add text before the math
        if (match.index > lastIndex) {
          parts.push(text.slice(lastIndex, match.index));
        }

        // Add the math part
        const mathContent = match[0];
        if (mathContent.startsWith('$$')) {
          parts.push({ latex: mathContent.slice(2, -2), display: true });
        } else {
          parts.push({ latex: mathContent.slice(1, -1), display: false });
        }

        lastIndex = match.index + mathContent.length;
      }

      // Add remaining text
      if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
      }

      // If we found any LaTeX, replace the text node with rendered content
      if (parts.some(p => typeof p !== 'string')) {
        const container = document.createElement('span');

        parts.forEach(part => {
          if (typeof part === 'string') {
            container.appendChild(document.createTextNode(part));
          } else {
            const mathSpan = document.createElement('span');
            mathSpan.className = part.display ? 'math-display' : 'math-inline';
            try {
              katex.render(part.latex, mathSpan, {
                displayMode: part.display,
                throwOnError: false,
                errorColor: '#cc0000',
                strict: false,
              });
            } catch (e) {
              mathSpan.textContent = `$${part.latex}$`;
            }
            container.appendChild(mathSpan);
          }
        });

        textNode.parentNode?.replaceChild(container, textNode);
      }
    });
  }, [content]);

  return (
    <div
      ref={containerRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
