'use client';

export function StatsSection() {
  const stats = [
    { number: '1150+', label: 'ejercicios PAES' },
    { number: '60+', label: 'mini-lecciones' },
    { number: 'Tutor AI', label: 'disponible 24/7' },
    { number: '500+', label: 'habilidades medidas' },
  ];

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-5 text-center spring-motion"
              style={{
                background: 'var(--color-fill)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-separator)',
              }}
            >
              <div
                style={{
                  fontSize: '26px',
                  fontWeight: 700,
                  color: 'var(--color-tint)',
                  marginBottom: '4px',
                }}
              >
                {stat.number}
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
