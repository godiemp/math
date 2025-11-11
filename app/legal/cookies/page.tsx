'use client';

import { useRouter } from 'next/navigation';

export default function CookiesPage() {
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
            Política de Cookies
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
                Esta Política de Cookies explica qué son las cookies, cómo las utilizamos en la plataforma PAES Chile, y cómo puede controlarlas.
              </p>
            </section>

            {/* 1. ¿Qué son las Cookies? */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                1. ¿Qué son las Cookies?
              </h2>
              <p>
                Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (computador, tablet o teléfono móvil) cuando visita un sitio web.
                Las cookies permiten que el sitio web recuerde sus acciones y preferencias durante un período de tiempo.
              </p>
            </section>

            {/* 2. ¿Qué Cookies Utilizamos? */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                2. ¿Qué Cookies Utilizamos?
              </h2>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                2.1 Cookies Esenciales (Necesarias)
              </h3>
              <p>
                Estas cookies son imprescindibles para el funcionamiento de la Plataforma y no pueden desactivarse. Incluyen:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li><strong>Autenticación:</strong> Tokens JWT almacenados en localStorage para mantener su sesión activa</li>
                <li><strong>Seguridad:</strong> Cookies para prevenir ataques CSRF y proteger su cuenta</li>
                <li><strong>Preferencias de sesión:</strong> Mantener su nivel seleccionado (M1 o M2)</li>
              </ul>
              <p style={{ marginTop: '12px', fontSize: '14px', fontStyle: 'italic' }}>
                <strong>Duración:</strong> Las cookies de autenticación expiran después de 7 días o cuando cierra sesión.
              </p>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                2.2 Cookies de Funcionalidad
              </h3>
              <p>
                Estas cookies permiten recordar sus preferencias y personalizar su experiencia:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li><strong>Progreso local:</strong> Almacenamiento de progreso y estadísticas en su dispositivo</li>
                <li><strong>Rachas de estudio:</strong> Seguimiento de días consecutivos de práctica</li>
                <li><strong>Modo de lectura:</strong> Preferencias de visualización del currículum</li>
              </ul>
              <p style={{ marginTop: '12px', fontSize: '14px', fontStyle: 'italic' }}>
                <strong>Duración:</strong> Persistentes, hasta que limpie el caché de su navegador.
              </p>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                2.3 Cookies de Rendimiento y Análisis
              </h3>
              <p>
                Utilizamos cookies para entender cómo los usuarios interactúan con la Plataforma y mejorar su funcionamiento:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li><strong>Análisis de uso:</strong> Páginas visitadas, tiempo de permanencia, funcionalidades utilizadas</li>
                <li><strong>Detección de errores:</strong> Logs de errores para mejorar la estabilidad (via Sentry si está habilitado)</li>
              </ul>
              <p style={{ marginTop: '12px' }}>
                Estos datos son anónimos y agregados. No se utilizan para identificarlo personalmente.
              </p>
              <p style={{ marginTop: '12px', fontSize: '14px', fontStyle: 'italic' }}>
                <strong>Duración:</strong> Hasta 2 años.
              </p>
            </section>

            {/* 3. Almacenamiento Local (localStorage) */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                3. Almacenamiento Local (localStorage)
              </h2>
              <p>
                Además de cookies, utilizamos el almacenamiento local del navegador (localStorage) para:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li>Guardar tokens de autenticación</li>
                <li>Almacenar progreso de ejercicios sin conexión</li>
                <li>Mantener preferencias de usuario entre sesiones</li>
              </ul>
              <p style={{ marginTop: '12px' }}>
                El localStorage funciona de manera similar a las cookies, pero permite almacenar más datos y no se envía automáticamente al servidor.
              </p>
            </section>

            {/* 4. Cookies de Terceros */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                4. Cookies de Terceros
              </h2>
              <p>
                Utilizamos servicios de terceros que pueden establecer sus propias cookies:
              </p>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                4.1 Servicios de Hosting
              </h3>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li><strong>Vercel:</strong> Hosting del frontend (puede establecer cookies de rendimiento)</li>
                <li><strong>Railway:</strong> Hosting del backend</li>
              </ul>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                4.2 Procesamiento de Pagos
              </h3>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li><strong>Webpay Plus (Transbank):</strong> Cuando realiza un pago, Transbank puede establecer sus propias cookies
                  para procesar la transacción de forma segura</li>
              </ul>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                4.3 Monitoreo de Errores
              </h3>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li><strong>Sentry:</strong> Detección y registro de errores (si está habilitado)</li>
              </ul>
              <p style={{ marginTop: '12px' }}>
                Estos servicios tienen sus propias políticas de privacidad que rigen el uso de cookies.
              </p>
            </section>

            {/* 5. Cómo Controlar las Cookies */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                5. Cómo Controlar las Cookies
              </h2>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                5.1 Configuración del Navegador
              </h3>
              <p>
                Puede configurar su navegador para rechazar todas las cookies o para indicar cuándo se envía una cookie. Sin embargo, si rechaza
                las cookies esenciales, algunas funcionalidades de la Plataforma pueden no funcionar correctamente.
              </p>
              <p style={{ marginTop: '12px' }}>
                Instrucciones para los navegadores más comunes:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
                <li><strong>Firefox:</strong> Preferencias → Privacidad y seguridad → Cookies</li>
                <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies</li>
                <li><strong>Edge:</strong> Configuración → Privacidad → Cookies</li>
              </ul>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-label-primary)', marginTop: '16px', marginBottom: '8px' }}>
                5.2 Limpiar Caché y Cookies
              </h3>
              <p>
                Puede eliminar las cookies existentes en cualquier momento a través de la configuración de su navegador. Tenga en cuenta que esto
                cerrará su sesión y eliminará sus preferencias guardadas localmente.
              </p>
            </section>

            {/* 6. Consentimiento */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                6. Consentimiento
              </h2>
              <p>
                Al utilizar la Plataforma, usted acepta el uso de cookies de acuerdo con esta Política de Cookies. Si no está de acuerdo,
                puede configurar su navegador para rechazar cookies, aunque esto puede afectar la funcionalidad de la Plataforma.
              </p>
            </section>

            {/* 7. Actualizaciones */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                7. Actualizaciones de esta Política
              </h2>
              <p>
                Podemos actualizar esta Política de Cookies periódicamente para reflejar cambios en nuestras prácticas o por otras razones operativas,
                legales o regulatorias. Le recomendamos revisar esta página regularmente.
              </p>
            </section>

            {/* 8. Contacto */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '12px',
              }}>
                8. Contacto
              </h2>
              <p>
                Si tiene preguntas sobre esta Política de Cookies, puede contactarnos a través de nuestra{' '}
                <a href="/contacto" style={{ color: 'var(--color-tint)' }}>página de contacto</a>.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
