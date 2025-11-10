import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="mt-auto py-8 md:py-10 px-5 border-t"
      style={{
        borderColor: 'var(--color-separator)',
        background: 'var(--color-bg)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Company Info */}
          <div>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}
            >
              PAES Chile
            </h3>
            <p
              style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: 'var(--color-label-secondary)',
              }}
            >
              Plataforma de preparación para la Prueba de Acceso a la Educación Superior
            </p>
          </div>

          {/* Legal */}
          <div>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}
            >
              Legal
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              <li style={{ marginBottom: '8px' }}>
                <Link
                  href="/legal/terminos"
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-label-secondary)',
                    textDecoration: 'none',
                  }}
                  className="hover:underline"
                >
                  Términos y Condiciones
                </Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link
                  href="/legal/privacidad"
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-label-secondary)',
                    textDecoration: 'none',
                  }}
                  className="hover:underline"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link
                  href="/legal/cookies"
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-label-secondary)',
                    textDecoration: 'none',
                  }}
                  className="hover:underline"
                >
                  Política de Cookies
                </Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link
                  href="/legal/reembolsos"
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-label-secondary)',
                    textDecoration: 'none',
                  }}
                  className="hover:underline"
                >
                  Política de Reembolsos
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}
            >
              Soporte
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              <li style={{ marginBottom: '8px' }}>
                <Link
                  href="/contacto"
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-label-secondary)',
                    textDecoration: 'none',
                  }}
                  className="hover:underline"
                >
                  Contacto
                </Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a
                  href="mailto:soporte@paeschile.cl"
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-label-secondary)',
                    textDecoration: 'none',
                  }}
                  className="hover:underline"
                >
                  soporte@paeschile.cl
                </a>
              </li>
            </ul>
          </div>

          {/* Consumer Protection */}
          <div>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}
            >
              Protección al Consumidor
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              <li style={{ marginBottom: '8px' }}>
                <a
                  href="https://www.sernac.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-label-secondary)',
                    textDecoration: 'none',
                  }}
                  className="hover:underline"
                >
                  SERNAC
                </a>
              </li>
              <li style={{ marginBottom: '4px', fontSize: '13px', color: 'var(--color-label-tertiary)' }}>
                800 700 100
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-6 md:pt-6 border-t"
          style={{
            borderColor: 'var(--color-separator)',
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <p
              style={{
                fontSize: '13px',
                color: 'var(--color-label-tertiary)',
                margin: 0,
              }}
            >
              © {currentYear} PAES Chile. Todos los derechos reservados.
            </p>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--color-label-tertiary)',
                margin: 0,
              }}
            >
              Hecho con ❤️ en Chile
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
