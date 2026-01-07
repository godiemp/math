'use client';

const stats = [
  { value: '40+', label: 'lecciones interactivas' },
  { value: '900+', label: 'ejercicios de práctica' },
  { value: '6 niveles', label: '7° Básico a 4° Medio' },
  { value: 'Tutor AI', label: 'disponible 24/7' },
];

export function B2BStatsSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 spring-motion"
              style={{
                background: 'var(--color-fill)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(24px, 4vw, 32px)',
                  fontWeight: 700,
                  color: 'var(--color-tint)',
                  marginBottom: '8px',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: 'var(--color-label-secondary)',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
