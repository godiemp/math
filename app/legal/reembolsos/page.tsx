'use client';

import { useRouter } from 'next/navigation';

export default function ReembolsosPage() {
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
            Política de Reembolsos
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
                En PAES Chile queremos que esté completamente satisfecho con nuestro servicio. Esta Política de Reembolsos establece las condiciones
                bajo las cuales puede solicitar un reembolso de su suscripción al Plan Premium.
              </p>
            </section>

            {/* 1. Derecho a Retracto (10 Días) */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                1. Derecho a Retracto (10 Días)
              </h2>
              <p>
                De acuerdo con la <strong>Ley N° 19.496 sobre Protección de los Derechos de los Consumidores</strong> de Chile, usted tiene derecho
                a retractarse de su compra dentro de los <strong>10 días corridos</strong> siguientes a la contratación del servicio.
              </p>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                1.1 Condiciones del Derecho a Retracto
              </h3>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li>Aplica solo para la primera suscripción o compra</li>
                <li>Debe ejercerse dentro de los 10 días corridos desde el pago</li>
                <li>Tiene derecho a un reembolso del <strong>100% del monto pagado</strong></li>
                <li>No se requiere justificación para ejercer este derecho</li>
              </ul>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                1.2 Cómo Ejercer el Derecho a Retracto
              </h3>
              <p>
                Para retractarse de su compra, debe:
              </p>
              <ol style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li>Contactarnos a través de nuestra <a href="/contacto" style={{ color: 'var(--color-tint)' }}>página de contacto</a></li>
                <li>Indicar claramente su intención de retractarse</li>
                <li>Proporcionar su número de orden o información de la transacción</li>
              </ol>
              <p style={{ marginTop: '12px' }}>
                Una vez recibida su solicitud, procesaremos el reembolso dentro de <strong>10 días hábiles</strong>.
              </p>
            </section>

            {/* 2. Reembolsos Fuera del Período de Retracto */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                2. Reembolsos Fuera del Período de Retracto
              </h2>
              <p>
                Después del período de 10 días, no ofrecemos reembolsos para suscripciones del Plan Premium, excepto en las siguientes circunstancias:
              </p>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                2.1 Cargos Duplicados
              </h3>
              <p>
                Si se realizó un cargo duplicado por error, reembolsaremos el monto duplicado de inmediato.
              </p>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                2.2 Cargos No Autorizados
              </h3>
              <p>
                Si detecta un cargo que no autorizó, contacte inmediatamente a nuestro equipo de soporte. Investigaremos y, de confirmarse,
                procederemos con el reembolso completo.
              </p>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                2.3 Problemas Técnicos Graves
              </h3>
              <p>
                Si experimenta problemas técnicos graves que le impiden utilizar la Plataforma durante un período prolongado (más de 5 días consecutivos)
                y nuestro equipo no puede resolverlos, puede solicitar un reembolso prorrateado por el tiempo no utilizado.
              </p>
            </section>

            {/* 3. Cancelación de Suscripción */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                3. Cancelación de Suscripción
              </h2>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                3.1 Sin Permanencia
              </h3>
              <p>
                Nuestras suscripciones <strong>no tienen período mínimo de permanencia</strong>. Puede cancelar en cualquier momento sin penalización.
              </p>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                3.2 Efectividad de la Cancelación
              </h3>
              <p>
                Cuando cancela su suscripción:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li>La cancelación será efectiva al final de su período de facturación actual</li>
                <li>Seguirá teniendo acceso al Plan Premium hasta que finalice el período pagado</li>
                <li>No se realizarán más cargos automáticos</li>
                <li><strong>No se realizan reembolsos prorrateados</strong> por el tiempo restante del período actual</li>
              </ul>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                3.3 Cómo Cancelar
              </h3>
              <p>
                Para cancelar su suscripción:
              </p>
              <ol style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li>Inicie sesión en su cuenta</li>
                <li>Vaya a Configuración de Suscripción (próximamente)</li>
                <li>Seleccione "Cancelar Suscripción"</li>
              </ol>
              <p style={{ marginTop: '12px' }}>
                Alternativamente, puede contactarnos directamente a través de nuestra <a href="/contacto" style={{ color: 'var(--color-tint)' }}>página de contacto</a>.
              </p>
            </section>

            {/* 4. Reactivación de Suscripción */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                4. Reactivación de Suscripción
              </h2>
              <p>
                Si cancela su suscripción y posteriormente desea reactivarla:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li>Puede reactivarla en cualquier momento</li>
                <li>Su progreso y datos históricos se mantendrán guardados</li>
                <li>Se aplicará el precio vigente al momento de la reactivación</li>
              </ul>
            </section>

            {/* 5. Proceso y Plazos de Reembolso */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                5. Proceso y Plazos de Reembolso
              </h2>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                5.1 Tiempo de Procesamiento
              </h3>
              <p>
                Los reembolsos aprobados se procesarán dentro de <strong>10 días hábiles</strong> desde la aprobación de la solicitud.
              </p>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                5.2 Método de Reembolso
              </h3>
              <p>
                Los reembolsos se acreditarán al método de pago original utilizado para la compra:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li>Tarjeta de crédito: 5-10 días hábiles</li>
                <li>Tarjeta de débito: 3-7 días hábiles</li>
                <li>Otros métodos: según los plazos del proveedor de pagos</li>
              </ul>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                5.3 Confirmación
              </h3>
              <p>
                Le notificaremos por correo electrónico cuando su reembolso haya sido procesado.
              </p>
            </section>

            {/* 6. Excepciones */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                6. Excepciones
              </h2>
              <p>
                No se otorgarán reembolsos en los siguientes casos:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li>Suspensión de cuenta por violación de nuestros Términos y Condiciones</li>
                <li>Falta de uso del servicio por decisión personal (fuera del período de retracto)</li>
                <li>Cambio de opinión después del período de 10 días de retracto</li>
                <li>Expectativas no cumplidas respecto a resultados en la PAES (no garantizamos mejoras de puntaje)</li>
              </ul>
            </section>

            {/* 7. Cambios de Precio */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                7. Cambios de Precio
              </h2>
              <p>
                Si aumentamos el precio de la suscripción:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li>Se le notificará con al menos 30 días de anticipación</li>
                <li>El nuevo precio se aplicará en su próximo ciclo de facturación</li>
                <li>Puede cancelar antes de que entre en vigor el nuevo precio sin penalización</li>
                <li>No se realizan reembolsos por diferencias de precio si decide cancelar</li>
              </ul>
            </section>

            {/* 8. Contacto para Reembolsos */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                8. Contacto para Solicitar Reembolsos
              </h2>
              <p>
                Para solicitar un reembolso o si tiene preguntas sobre esta Política de Reembolsos, contáctenos a través de nuestra{' '}
                <a href="/contacto" style={{ color: 'var(--color-tint)' }}>página de contacto</a>.
              </p>
              <p style={{ marginTop: '12px' }}>
                Incluya en su mensaje:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li>Su nombre y correo electrónico asociado a la cuenta</li>
                <li>Número de orden o fecha de la transacción</li>
                <li>Motivo de la solicitud de reembolso</li>
              </ul>
              <p style={{ marginTop: '12px' }}>
                Responderemos a todas las solicitudes dentro de <strong>2 días hábiles</strong>.
              </p>
            </section>

            {/* 9. Protección al Consumidor */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                9. Protección al Consumidor
              </h2>
              <p>
                Si no está satisfecho con nuestra respuesta a su solicitud de reembolso, puede presentar un reclamo ante el SERNAC
                (Servicio Nacional del Consumidor):
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li><strong>Sitio web:</strong> <a href="https://www.sernac.cl" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-tint)' }}>www.sernac.cl</a></li>
                <li><strong>Teléfono:</strong> 800 700 100 (gratuito)</li>
                <li><strong>WhatsApp:</strong> +56 9 9471 7777</li>
              </ul>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
