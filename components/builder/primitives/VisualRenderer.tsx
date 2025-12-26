'use client';

import * as LucideIcons from 'lucide-react';
import type { VisualElement } from '@/lib/builder/types';

interface VisualRendererProps {
  visual: VisualElement;
  className?: string;
}

/**
 * VisualRenderer - Renders visual elements (emoji, svg, image, icon)
 */
export default function VisualRenderer({ visual, className = '' }: VisualRendererProps) {
  const sizeClass = visual.size || 'text-4xl';

  switch (visual.type) {
    case 'emoji':
      return (
        <span className={`${sizeClass} ${className}`} role="img">
          {visual.content}
        </span>
      );

    case 'svg':
      return (
        <div
          className={className}
          dangerouslySetInnerHTML={{ __html: visual.content }}
        />
      );

    case 'image':
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={visual.content}
          alt=""
          className={`${sizeClass} ${className}`}
        />
      );

    case 'icon': {
      // Get icon from lucide-react
      const iconName = visual.content as keyof typeof LucideIcons;
      const IconComponent = LucideIcons[iconName] as React.ComponentType<{ className?: string; size?: number }>;

      if (!IconComponent) {
        console.warn(`Icon "${visual.content}" not found in lucide-react`);
        return null;
      }

      // Parse size from class or use default
      const sizeMatch = sizeClass.match(/w-(\d+)/);
      const iconSize = sizeMatch ? parseInt(sizeMatch[1]) * 4 : 24;

      return <IconComponent className={className} size={iconSize} />;
    }

    default:
      return null;
  }
}
