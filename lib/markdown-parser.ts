import { SectionImportance } from '@/components/CollapsibleSection';
import { ReadingMode } from '@/components/ReadingModeControl';

export interface MarkdownSection {
  id: string;
  title: string;
  content: string;
  importance: SectionImportance;
  collapsible: boolean;
  defaultOpen: boolean;
  type: 'section' | 'formula' | 'regular' | 'full-only';
}

export interface ParsedMarkdown {
  sections: MarkdownSection[];
  rawContent: string;
}

/**
 * Parse markdown content and extract sections with metadata
 *
 * Metadata format:
 * <!-- section: id, importance: essential|important|advanced, collapsible: true|false, defaultOpen: true|false -->
 * Content here
 * <!-- /section -->
 *
 * <!-- formula-only -->
 * Formula content
 * <!-- /formula-only -->
 */
export function parseMarkdownSections(content: string): ParsedMarkdown {
  const sections: MarkdownSection[] = [];
  let workingContent = content;

  // Regular expression to match section comments
  const sectionRegex = /<!--\s*section:\s*([^,]+),\s*importance:\s*(essential|important|advanced)(?:,\s*collapsible:\s*(true|false))?(?:,\s*defaultOpen:\s*(true|false))?\s*-->([\s\S]*?)<!--\s*\/section\s*-->/g;

  let match;
  while ((match = sectionRegex.exec(content)) !== null) {
    const [fullMatch, id, importance, collapsible = 'true', defaultOpen = 'auto', sectionContent] = match;

    // Extract title from first heading in section (H2, H3, H4, etc.)
    const titleMatch = sectionContent.match(/^#{2,6}\s+(.+)/m);
    const title = titleMatch ? titleMatch[1] : id;

    sections.push({
      id: id.trim(),
      title: title.trim(),
      content: sectionContent.trim(),
      importance: importance as SectionImportance,
      collapsible: collapsible === 'true',
      defaultOpen: defaultOpen === 'true',
      type: 'section',
    });
  }

  // Match formula-only sections
  const formulaRegex = /<!--\s*formula-only\s*-->([\s\S]*?)<!--\s*\/formula-only\s*-->/g;
  while ((match = formulaRegex.exec(content)) !== null) {
    const [, formulaContent] = match;

    sections.push({
      id: `formula-${sections.length}`,
      title: '',
      content: formulaContent.trim(),
      importance: 'essential',
      collapsible: false,
      defaultOpen: true,
      type: 'formula',
    });
  }

  // Match full-only sections (only shown in full mode)
  const fullOnlyRegex = /<!--\s*full-only\s*-->([\s\S]*?)<!--\s*\/full-only\s*-->/g;
  while ((match = fullOnlyRegex.exec(content)) !== null) {
    const [, fullContent] = match;

    sections.push({
      id: `full-${sections.length}`,
      title: '',
      content: fullContent.trim(),
      importance: 'important',
      collapsible: false,
      defaultOpen: true,
      type: 'full-only',
    });
  }

  return {
    sections,
    rawContent: content,
  };
}

/**
 * Filter sections based on reading mode
 */
export function filterSectionsByMode(
  sections: MarkdownSection[],
  mode: ReadingMode
): MarkdownSection[] {
  if (mode === 'formulas') {
    // Only show formula sections
    return sections.filter(s => s.type === 'formula');
  }

  if (mode === 'summary') {
    // Show essential and important sections, plus formulas (exclude full-only)
    return sections.filter(
      s => (s.type === 'formula' || s.importance === 'essential' || s.importance === 'important') && s.type !== 'full-only'
    );
  }

  // Full mode: show everything
  return sections;
}

/**
 * Remove section metadata comments from markdown for simple rendering
 */
export function stripSectionMetadata(content: string): string {
  return content
    .replace(/<!--\s*section:[^>]*-->/g, '')
    .replace(/<!--\s*\/section\s*-->/g, '')
    .replace(/<!--\s*formula-only\s*-->/g, '')
    .replace(/<!--\s*\/formula-only\s*-->/g, '')
    .replace(/<!--\s*full-only\s*-->/g, '')
    .replace(/<!--\s*\/full-only\s*-->/g, '');
}
