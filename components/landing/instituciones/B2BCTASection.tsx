'use client';

const openIntercomDemo = () => {
  if (typeof window !== 'undefined' && window.Intercom) {
    window.Intercom('showNewMessage', 'Hola, quiero solicitar una demo para mi colegio');
  }
};

export function B2BCTASection() {
  return (
    <section
      className="py-16 px-4"
      style={{
        background: 'linear-gradient(135deg, var(--color-tint) 0%, #5E5CE6 100%)',
      }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2
          className="mb-4"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: 600,
            color: 'white',
          }}
        >
          Transforma la enseñanza de matemáticas en tu colegio
        </h2>
        <p
          className="mb-8"
          style={{
            fontSize: '17px',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          Agenda una demo de 15 minutos. Te mostramos cómo funciona.
        </p>
        <button
          onClick={openIntercomDemo}
          className="spring-emphasized"
          style={{
            padding: '16px 40px',
            background: 'white',
            color: 'var(--color-tint)',
            borderRadius: 'var(--radius-md)',
            fontSize: '17px',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Solicitar Demo
        </button>
      </div>
    </section>
  );
}
