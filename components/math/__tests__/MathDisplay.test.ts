import { describe, it, expect } from 'vitest';

/**
 * Tests for the LaTeX detection regex used in UnifiedLatexRenderer.
 *
 * Design principle: Only detect EXPLICIT LaTeX markers.
 * We don't try to guess if something like "x + 1" is math or text.
 * This avoids false positives like "De -1 a 1" being detected as LaTeX.
 *
 * If you want math rendering, use explicit markers:
 * - Backslash commands: \frac{}, \sqrt{}, \text{}
 * - Superscripts: x^2
 * - Subscripts: a_1
 * - Braces: {a}
 * - Dollar delimiters: $x + 1$ (handled separately)
 */
const looksLikeLaTeX = (content: string) => /[\\^_{}]/.test(content);

describe('LaTeX detection regex', () => {
  describe('should detect as LaTeX (explicit markers)', () => {
    it('backslash commands', () => {
      expect(looksLikeLaTeX('\\frac{1}{2}')).toBe(true);
      expect(looksLikeLaTeX('\\text{hello}')).toBe(true);
      expect(looksLikeLaTeX('\\sqrt{4}')).toBe(true);
      expect(looksLikeLaTeX('\\pi')).toBe(true);
      expect(looksLikeLaTeX('\\leq')).toBe(true);
    });

    it('superscripts', () => {
      expect(looksLikeLaTeX('x^2')).toBe(true);
      expect(looksLikeLaTeX('a^{10}')).toBe(true);
      expect(looksLikeLaTeX('2^n')).toBe(true);
    });

    it('subscripts', () => {
      expect(looksLikeLaTeX('a_1')).toBe(true);
      expect(looksLikeLaTeX('x_{ij}')).toBe(true);
    });

    it('braces', () => {
      expect(looksLikeLaTeX('{a}')).toBe(true);
      expect(looksLikeLaTeX('a{b}c')).toBe(true);
    });
  });

  describe('should NOT detect as LaTeX (plain text)', () => {
    it('Spanish text with negative numbers', () => {
      expect(looksLikeLaTeX('De -1 a 1')).toBe(false);
      expect(looksLikeLaTeX('De 0 a 1')).toBe(false);
      expect(looksLikeLaTeX('De 0 a 100')).toBe(false);
      expect(looksLikeLaTeX('Cualquier numero positivo')).toBe(false);
    });

    it('simple expressions without explicit markers', () => {
      // These look like math but don't have explicit LaTeX markers
      // They render fine as plain text: "x = 2" looks the same
      expect(looksLikeLaTeX('x = 2')).toBe(false);
      expect(looksLikeLaTeX('y + 3')).toBe(false);
      expect(looksLikeLaTeX('a - b')).toBe(false);
      expect(looksLikeLaTeX('f(x)')).toBe(false);
    });

    it('simple numbers', () => {
      expect(looksLikeLaTeX('15')).toBe(false);
      expect(looksLikeLaTeX('-5')).toBe(false);
      expect(looksLikeLaTeX('0.5')).toBe(false);
    });

    it('coordinates', () => {
      expect(looksLikeLaTeX('(2, 3)')).toBe(false);
      expect(looksLikeLaTeX('(0, -5)')).toBe(false);
    });

    it('plain text', () => {
      expect(looksLikeLaTeX('Imposible')).toBe(false);
      expect(looksLikeLaTeX('Muy probable')).toBe(false);
      expect(looksLikeLaTeX('Seguro')).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('empty string', () => {
      expect(looksLikeLaTeX('')).toBe(false);
    });

    it('single characters', () => {
      expect(looksLikeLaTeX('x')).toBe(false);
      expect(looksLikeLaTeX('5')).toBe(false);
      expect(looksLikeLaTeX('\\')).toBe(true);
      expect(looksLikeLaTeX('^')).toBe(true);
      expect(looksLikeLaTeX('_')).toBe(true);
      expect(looksLikeLaTeX('{')).toBe(true);
    });
  });
});
