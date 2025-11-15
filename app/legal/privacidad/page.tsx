'use client';

import { PageHeader } from '@/components/PageHeader';

export default function PrivacidadPage() {

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      {/* Page Header */}
      <PageHeader showBackButton showUserInfo={false} showLogout={false} showAdmin={false} />
      <div className="max-w-4xl mx-auto" style={{ padding: '40px 20px' }}>

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
            Política de Privacidad
          </h1>
          <p style={{
            fontSize: '14px',
            color: 'var(--color-label-secondary)',
            marginBottom: '32px',
          }}>
            Última actualización: {new Date().toLocaleDateString('es-CL')}
          </p>

          <div className="space-y-8" style={{ fontSize: '15px', lineHeight: '1.7', color: 'var(--color-label-secondary)' }}>

            {/* Introducción */}
            <section>
              <p>
                PAES Chile (en adelante, "nosotros" o "la Plataforma") se compromete a proteger la privacidad de sus usuarios. Esta Política de Privacidad
                describe cómo recopilamos, usamos, almacenamos y protegemos su información personal de acuerdo con la <strong>Ley N° 19.628 sobre Protección
                de la Vida Privada</strong> de Chile.
              </p>
              <p style={{ marginTop: '12px' }}>
                Al utilizar nuestra Plataforma, usted acepta las prácticas descritas en esta Política de Privacidad.
              </p>
            </section>

            {/* 1. Información que Recopilamos */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                1. Información que Recopilamos
              </h2>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                1.1 Información de Registro
              </h3>
              <p>
                Cuando crea una cuenta, recopilamos:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li>Nombre completo</li>
                <li>Dirección de correo electrónico</li>
                <li>Contraseña (almacenada de forma encriptada)</li>
                <li>Nivel de competencia matemática seleccionado (M1 o M2)</li>
              </ul>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                1.2 Información de Uso
              </h3>
              <p>
                Durante el uso de la Plataforma, recopilamos:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li>Respuestas a ejercicios y evaluaciones</li>
                <li>Progreso de aprendizaje y estadísticas de desempeño</li>
                <li>Tiempo dedicado a cada actividad</li>
                <li>Habilidades matemáticas practicadas</li>
                <li>Historial de sesiones de práctica</li>
                <li>Interacciones con el tutor AI</li>
                <li>Rachas de estudio (streaks)</li>
              </ul>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                1.3 Información de Pago
              </h3>
              <p>
                Si se suscribe al Plan Premium, recopilamos:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li>Información de facturación (nombre, dirección)</li>
                <li>Datos de transacción (fecha, monto, estado)</li>
              </ul>
              <p style={{ marginTop: '12px' }}>
                <strong>Nota importante:</strong> No almacenamos información de tarjetas de crédito o débito. Todo el procesamiento de pagos
                se realiza a través de proveedores de pago certificados que cumplen con los estándares PCI DSS.
              </p>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                1.4 Información Técnica
              </h3>
              <p>
                Recopilamos automáticamente:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li>Dirección IP</li>
                <li>Tipo de navegador y dispositivo</li>
                <li>Sistema operativo</li>
                <li>Páginas visitadas y tiempo de navegación</li>
                <li>Logs de errores y rendimiento</li>
              </ul>
            </section>

            {/* 2. Cómo Utilizamos su Información */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                2. Cómo Utilizamos su Información
              </h2>
              <p>
                Utilizamos su información personal para:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li><strong>Proveer el servicio:</strong> Crear y gestionar su cuenta, proporcionar acceso a contenido educativo personalizado</li>
                <li><strong>Personalizar la experiencia:</strong> Adaptar ejercicios según su nivel y progreso</li>
                <li><strong>Seguimiento de progreso:</strong> Generar estadísticas, análisis de habilidades y reportes de desempeño</li>
                <li><strong>Procesamiento de pagos:</strong> Gestionar suscripciones y facturación</li>
                <li><strong>Comunicaciones:</strong> Enviar notificaciones importantes sobre el servicio, actualizaciones y cambios en los términos</li>
                <li><strong>Mejora del servicio:</strong> Analizar patrones de uso para mejorar contenido y funcionalidades</li>
                <li><strong>Seguridad:</strong> Detectar y prevenir fraude, abuso o actividades no autorizadas</li>
                <li><strong>Cumplimiento legal:</strong> Cumplir con obligaciones legales y regulatorias</li>
              </ul>
            </section>

            {/* 3. Base Legal para el Tratamiento de Datos */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                3. Base Legal para el Tratamiento de Datos (Ley N° 19.628)
              </h2>
              <p>
                Conforme a la Ley N° 19.628 sobre Protección de la Vida Privada, el tratamiento de sus datos personales se basa en:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li><strong>Consentimiento:</strong> Al crear una cuenta y aceptar estos términos, usted consiente el tratamiento de sus datos personales</li>
                <li><strong>Ejecución del contrato:</strong> El procesamiento es necesario para proveer el servicio contratado</li>
                <li><strong>Interés legítimo:</strong> Mejorar nuestros servicios y garantizar la seguridad de la plataforma</li>
              </ul>
            </section>

            {/* 4. Compartir Información con Terceros */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                4. Compartir Información con Terceros
              </h2>
              <p>
                No vendemos, alquilamos ni compartimos su información personal con terceros, excepto en los siguientes casos:
              </p>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                4.1 Proveedores de Servicios
              </h3>
              <p>
                Compartimos información con proveedores que nos ayudan a operar la Plataforma:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li><strong>Hosting y almacenamiento:</strong> Vercel, Railway (servidores en EE.UU.)</li>
                <li><strong>Base de datos:</strong> PostgreSQL en servidores seguros</li>
                <li><strong>Procesamiento de pagos:</strong> Webpay Plus (Transbank) u otros procesadores certificados PCI DSS</li>
                <li><strong>Servicios de AI:</strong> Anthropic Claude API para funcionalidad de tutor inteligente</li>
                <li><strong>Monitoreo de errores:</strong> Sentry (si aplica)</li>
              </ul>
              <p style={{ marginTop: '12px' }}>
                Todos estos proveedores están obligados contractualmente a proteger su información y solo pueden usarla para prestar servicios en nuestro nombre.
              </p>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                4.2 Obligaciones Legales
              </h3>
              <p>
                Podemos divulgar información si es requerido por ley, orden judicial, o autoridad gubernamental competente.
              </p>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                4.3 Transferencias Internacionales
              </h3>
              <p>
                Algunos de nuestros proveedores de servicios están ubicados fuera de Chile. Al usar la Plataforma, usted consiente la transferencia
                de sus datos a estos proveedores, quienes están obligados a mantener estándares adecuados de protección de datos.
              </p>
            </section>

            {/* 5. Almacenamiento y Seguridad de Datos */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                5. Almacenamiento y Seguridad de Datos
              </h2>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                5.1 Medidas de Seguridad
              </h3>
              <p>
                Implementamos medidas técnicas y organizativas para proteger su información:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li>Encriptación de contraseñas con algoritmos seguros (bcrypt)</li>
                <li>Comunicaciones seguras mediante HTTPS/TLS</li>
                <li>Autenticación basada en tokens JWT</li>
                <li>Acceso restringido a datos personales</li>
                <li>Monitoreo de seguridad y detección de intrusiones</li>
                <li>Copias de seguridad regulares</li>
              </ul>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                5.2 Período de Retención
              </h3>
              <p>
                Conservamos su información personal mientras su cuenta esté activa o sea necesario para proporcionar el servicio.
                Puede solicitar la eliminación de su cuenta y datos en cualquier momento.
              </p>
            </section>

            {/* 6. Sus Derechos (Ley 19.628) */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                6. Sus Derechos según la Ley N° 19.628
              </h2>
              <p>
                Como titular de datos personales, usted tiene derecho a:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li><strong>Acceso:</strong> Solicitar información sobre qué datos personales tenemos sobre usted</li>
                <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
                <li><strong>Cancelación:</strong> Solicitar la eliminación de sus datos personales</li>
                <li><strong>Oposición:</strong> Oponerse al tratamiento de sus datos para fines específicos</li>
                <li><strong>Información:</strong> Conocer la finalidad del tratamiento y los destinatarios de sus datos</li>
              </ul>
              <p style={{ marginTop: '12px' }}>
                Para ejercer estos derechos, puede contactarnos a través de nuestra <a href="/contacto" style={{ color: 'var(--color-tint)' }}>página de contacto</a>.
                Responderemos a su solicitud dentro de los plazos legales establecidos.
              </p>
            </section>

            {/* 7. Cookies y Tecnologías Similares */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                7. Cookies y Tecnologías Similares
              </h2>
              <p>
                Utilizamos cookies y tecnologías similares para mejorar su experiencia. Para más información, consulte nuestra{' '}
                <a href="/legal/cookies" style={{ color: 'var(--color-tint)' }}>Política de Cookies</a>.
              </p>
            </section>

            {/* 8. Privacidad de Menores */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                8. Privacidad de Menores de Edad
              </h2>
              <p>
                La Plataforma está diseñada principalmente para estudiantes que preparan la PAES, muchos de los cuales son menores de 18 años.
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li>Los usuarios mayores de 14 años pueden registrarse con consentimiento de padres o tutores</li>
                <li>No recopilamos intencionalmente datos de menores de 14 años sin consentimiento parental</li>
                <li>Los padres o tutores pueden solicitar acceso, rectificación o eliminación de los datos de sus hijos menores</li>
              </ul>
            </section>

            {/* 9. Cambios a esta Política */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                9. Cambios a esta Política de Privacidad
              </h2>
              <p>
                Podemos actualizar esta Política de Privacidad periódicamente. Los cambios significativos serán notificados a través de la Plataforma
                o por correo electrónico con al menos 15 días de anticipación.
              </p>
            </section>

            {/* 10. Contacto y Responsable del Tratamiento */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                10. Contacto y Responsable del Tratamiento
              </h2>
              <p>
                Para cualquier consulta sobre esta Política de Privacidad o para ejercer sus derechos, puede contactarnos a través de nuestra{' '}
                <a href="/contacto" style={{ color: 'var(--color-tint)' }}>página de contacto</a>.
              </p>
              <p style={{ marginTop: '12px' }}>
                Nos comprometemos a responder sus consultas dentro de 5 días hábiles.
              </p>
            </section>

            {/* 11. Autoridad de Control */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                11. Autoridad de Control
              </h2>
              <p>
                Si considera que sus derechos de privacidad han sido vulnerados, puede presentar un reclamo ante el SERNAC o ejercer las acciones
                legales contempladas en la Ley N° 19.628.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
