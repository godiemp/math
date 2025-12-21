'use client';

import { CheckCircle2 } from 'lucide-react';

interface FeatureSectionProps {
  title: string;
  description: string;
  bullets?: string[];
  demo: React.ReactNode;
  reversed?: boolean;
  bgColor?: string;
}

export function FeatureSection({
  title,
  description,
  bullets,
  demo,
  reversed = false,
  bgColor,
}: FeatureSectionProps) {
  return (
    <section className="py-16 px-4" style={{ background: bgColor }}>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Text side */}
        <div className={reversed ? 'md:order-2' : ''}>
          <h2
            className="mb-4"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(24px, 4vw, 32px)',
              fontWeight: 700,
              lineHeight: 1.2,
              color: 'var(--color-label-primary)',
            }}
          >
            {title}
          </h2>
          <p
            className="mb-6"
            style={{
              fontSize: '17px',
              lineHeight: 1.7,
              color: 'var(--color-label-secondary)',
            }}
          >
            {description}
          </p>
          {bullets && bullets.length > 0 && (
            <ul className="space-y-3">
              {bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3"
                  style={{ fontSize: '15px', color: 'var(--color-label-primary)' }}
                >
                  <CheckCircle2
                    size={20}
                    style={{ color: 'var(--color-tint)', flexShrink: 0, marginTop: '2px' }}
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Demo side */}
        <div className={reversed ? 'md:order-1' : ''}>
          <div
            className="aspect-[4/3] rounded-2xl overflow-hidden"
            style={{
              boxShadow: 'var(--shadow-raised)',
              border: '1px solid var(--color-separator)',
            }}
          >
            {demo}
          </div>
        </div>
      </div>
    </section>
  );
}
