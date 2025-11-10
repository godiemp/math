'use client';

import { useRouter } from 'next/navigation';

export default function TerminosPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)', padding: '40px 20px' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 spring-motion"
          style={{
            fontSize: '15px',
            color: 'var(--color-tint)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            zIndex: 10,
            pointerEvents: 'auto',
          }}
        >
          ← Volver
        </button>

        <div className="translucent" style={{
          padding: 'var(--spacing-16)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-raised)',
        }}>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '36px',
              fontWeight: 600,
              color: 'var(--color-label-primary)',
              marginBottom: '8px',
            }}
          >
            Términos y Condiciones
          </h1>
          <p style={{
            fontSize: '14px',
            color: 'var(--color-label-secondary)',
            marginBottom: '32px',
          }}>
            Última actualización: {new Date().toLocaleDateString('es-CL')}
          </p>

          <div className="space-y-8" style={{ fontSize: '15px', lineHeight: '1.7', color: 'var(--color-label-secondary)' }}>

            {/* 1. Aceptación de los Términos */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                1. Aceptación de los Términos
              </h2>
              <p>
                Al acceder y utilizar la plataforma PAES Chile (en adelante, "la Plataforma"), usted acepta estar sujeto a estos Términos y Condiciones,
                todas las leyes y regulaciones aplicables en Chile, y acepta que es responsable del cumplimiento de todas las leyes locales aplicables.
                Si no está de acuerdo con alguno de estos términos, no debe usar la Plataforma.
              </p>
            </section>

            {/* 2. Descripción del Servicio */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                2. Descripción del Servicio
              </h2>
              <p>
                PAES Chile es una plataforma educativa digital que proporciona herramientas de preparación para la Prueba de Acceso a la Educación Superior (PAES)
                en el área de Matemática. El servicio incluye:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li>Ejercicios de práctica alineados con el temario oficial PAES</li>
                <li>Explicaciones y retroalimentación para respuestas incorrectas</li>
                <li>Seguimiento de progreso y análisis de habilidades</li>
                <li>Sesiones de práctica en vivo</li>
                <li>Documentación del currículum PAES</li>
              </ul>
            </section>

            {/* 3. Registro y Cuenta de Usuario */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                3. Registro y Cuenta de Usuario
              </h2>
              <p>
                Para utilizar la Plataforma, debe crear una cuenta proporcionando información precisa y completa. Usted es responsable de:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li>Mantener la confidencialidad de su contraseña</li>
                <li>Todas las actividades que ocurran bajo su cuenta</li>
                <li>Notificarnos inmediatamente de cualquier uso no autorizado de su cuenta</li>
              </ul>
              <p style={{ marginTop: '12px' }}>
                Debe ser mayor de 14 años para registrarse. Los menores de 18 años requieren el consentimiento de un padre o tutor legal.
              </p>
            </section>

            {/* 4. Planes y Precios */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                4. Planes y Precios
              </h2>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                4.1 Planes Disponibles
              </h3>
              <p>
                La Plataforma ofrece los siguientes planes:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li><strong>Plan Gratuito:</strong> Acceso limitado a funcionalidades básicas de la plataforma</li>
                <li><strong>Plan Premium:</strong> $8.000 CLP mensuales - Acceso completo a todas las funcionalidades, incluyendo sesiones en vivo,
                  AI tutor ilimitado, y análisis avanzado de progreso</li>
              </ul>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                4.2 Pago y Facturación
              </h3>
              <p>
                Los pagos se procesan mensualmente de forma anticipada. Al suscribirse al Plan Premium, usted autoriza el cargo recurrente mensual a su método de pago.
                Los precios están expresados en pesos chilenos (CLP) e incluyen todos los impuestos aplicables.
              </p>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                4.3 Cambios de Precio
              </h3>
              <p>
                Nos reservamos el derecho de modificar nuestros precios. Los cambios serán comunicados con al menos 30 días de anticipación y se aplicarán
                en su próximo ciclo de facturación. Si no está de acuerdo con el cambio de precio, puede cancelar su suscripción antes de que entre en vigor.
              </p>
            </section>

            {/* 5. Cancelación y Reembolsos */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                5. Cancelación y Reembolsos
              </h2>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                5.1 Derecho a Retracto
              </h3>
              <p>
                De acuerdo con la Ley N° 19.496 sobre Protección de los Derechos de los Consumidores, usted tiene derecho a retractarse de su compra
                dentro de los <strong>10 días corridos</strong> siguientes a la contratación del servicio. Si ejerce este derecho dentro del plazo,
                se reembolsará el 100% del monto pagado.
              </p>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                5.2 Cancelación de Suscripción
              </h3>
              <p>
                Puede cancelar su suscripción en cualquier momento sin penalización. La cancelación será efectiva al final de su período de facturación actual.
                No se realizan reembolsos prorrateados por períodos parciales después del período de retracto de 10 días.
              </p>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                5.3 Sin Permanencia
              </h3>
              <p>
                Nuestras suscripciones no tienen período mínimo de permanencia. Puede cancelar en cualquier momento sin cargos adicionales.
              </p>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                5.4 Proceso de Reembolso
              </h3>
              <p>
                Para solicitar un reembolso bajo el derecho a retracto, debe contactarnos a través de nuestros canales oficiales.
                Los reembolsos se procesarán dentro de 10 días hábiles y se acreditarán al método de pago original.
              </p>
            </section>

            {/* 6. Uso Aceptable */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                6. Uso Aceptable
              </h2>
              <p>
                Al utilizar la Plataforma, usted se compromete a NO:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li>Compartir su cuenta con terceros</li>
                <li>Copiar, distribuir o modificar el contenido de la Plataforma sin autorización</li>
                <li>Utilizar herramientas automatizadas (bots, scrapers) para acceder al contenido</li>
                <li>Intentar vulnerar la seguridad de la Plataforma</li>
                <li>Revender o comercializar el acceso a la Plataforma</li>
                <li>Utilizar el servicio para fines ilegales o no autorizados</li>
              </ul>
              <p style={{ marginTop: '12px' }}>
                El incumplimiento de estas normas puede resultar en la suspensión o terminación de su cuenta sin reembolso.
              </p>
            </section>

            {/* 7. Propiedad Intelectual */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                7. Propiedad Intelectual
              </h2>
              <p>
                Todo el contenido de la Plataforma, incluyendo pero no limitado a textos, ejercicios, gráficos, logotipos, software y diseño,
                es propiedad exclusiva de PAES Chile o de sus licenciantes y está protegido por las leyes de propiedad intelectual de Chile.
              </p>
              <p style={{ marginTop: '12px' }}>
                La suscripción le otorga una licencia limitada, no exclusiva, no transferible y revocable para acceder y usar el contenido
                únicamente para su uso personal y educativo.
              </p>
            </section>

            {/* 8. Limitación de Responsabilidad */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                8. Limitación de Responsabilidad
              </h2>
              <p>
                PAES Chile proporciona la Plataforma "tal cual" y no garantiza:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li>Que el uso de la Plataforma mejorará su puntaje en la PAES</li>
                <li>La disponibilidad ininterrumpida del servicio</li>
                <li>La ausencia de errores en el contenido</li>
              </ul>
              <p style={{ marginTop: '12px' }}>
                No seremos responsables por daños indirectos, incidentales o consecuentes derivados del uso o imposibilidad de uso de la Plataforma.
              </p>
            </section>

            {/* 9. Modificaciones del Servicio */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                9. Modificaciones del Servicio
              </h2>
              <p>
                Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto de la Plataforma en cualquier momento,
                con o sin previo aviso. No seremos responsables ante usted ni ante terceros por cualquier modificación, suspensión o discontinuación del servicio.
              </p>
            </section>

            {/* 10. Modificaciones a los Términos */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                10. Modificaciones a los Términos
              </h2>
              <p>
                Podemos actualizar estos Términos y Condiciones periódicamente. Los cambios significativos serán notificados con al menos 15 días de anticipación
                a través de la Plataforma o por correo electrónico. El uso continuado de la Plataforma después de los cambios constituye su aceptación de los nuevos términos.
              </p>
            </section>

            {/* 11. Ley Aplicable y Jurisdicción */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                11. Ley Aplicable y Jurisdicción
              </h2>
              <p>
                Estos Términos y Condiciones se rigen por las leyes de la República de Chile. Cualquier controversia derivada de estos términos
                será sometida a la jurisdicción de los tribunales ordinarios de justicia de Chile.
              </p>
            </section>

            {/* 12. Protección al Consumidor (SERNAC) */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                12. Información de Protección al Consumidor
              </h2>
              <p>
                Como consumidor en Chile, usted cuenta con la protección de la Ley N° 19.496 sobre Protección de los Derechos de los Consumidores.
              </p>
              <p style={{ marginTop: '12px' }}>
                Para consultas o reclamos sobre protección al consumidor, puede contactar al SERNAC:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li><strong>Sitio web:</strong> <a href="https://www.sernac.cl" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-tint)' }}>www.sernac.cl</a></li>
                <li><strong>Teléfono:</strong> 800 700 100 (gratuito)</li>
                <li><strong>WhatsApp:</strong> +56 9 9471 7777</li>
              </ul>
            </section>

            {/* 13. Contacto */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                13. Contacto
              </h2>
              <p>
                Para cualquier consulta sobre estos Términos y Condiciones, puede contactarnos a través de nuestra página de <a href="/contacto" style={{ color: 'var(--color-tint)' }}>contacto</a>.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
