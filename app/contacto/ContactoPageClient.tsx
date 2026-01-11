'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { PageHeader } from '@/components/layout/PageHeader';

export function ContactoPageClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implement actual contact form submission when backend endpoint is ready
    // For now, show a success message with the information

    setTimeout(() => {
      toast.success('Mensaje enviado', {
        description: 'Nos pondremos en contacto contigo dentro de 2 días hábiles.',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

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
            Contacto y Soporte
          </h1>
          <p style={{
            fontSize: '15px',
            color: 'var(--color-label-secondary)',
            marginBottom: '32px',
            lineHeight: '1.6',
          }}>
            ¿Tienes preguntas, sugerencias o necesitas ayuda? Estamos aquí para ayudarte.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '16px',
              }}>
                Envíanos un Mensaje
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--color-label-primary)',
                      marginBottom: '8px',
                    }}
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '15px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-separator)',
                      background: 'var(--color-bg)',
                      color: 'var(--color-label-primary)',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--color-label-primary)',
                      marginBottom: '8px',
                    }}
                  >
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '15px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-separator)',
                      background: 'var(--color-bg)',
                      color: 'var(--color-label-primary)',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--color-label-primary)',
                      marginBottom: '8px',
                    }}
                  >
                    Asunto
                  </label>
                  <select
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '15px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-separator)',
                      background: 'var(--color-bg)',
                      color: 'var(--color-label-primary)',
                    }}
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="soporte">Soporte Técnico</option>
                    <option value="facturacion">Facturación y Pagos</option>
                    <option value="reembolso">Solicitud de Reembolso</option>
                    <option value="cuenta">Problemas con la Cuenta</option>
                    <option value="contenido">Consulta sobre Contenido</option>
                    <option value="sugerencia">Sugerencia o Feedback</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--color-label-primary)',
                      marginBottom: '8px',
                    }}
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '15px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-separator)',
                      background: 'var(--color-bg)',
                      color: 'var(--color-label-primary)',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="spring-emphasized w-full"
                  style={{
                    height: '44px',
                    padding: '0 var(--spacing-8)',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'white',
                    background: isSubmitting ? 'var(--color-label-tertiary)' : 'var(--color-tint)',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>

              <p style={{
                marginTop: '16px',
                fontSize: '13px',
                color: 'var(--color-label-secondary)',
                lineHeight: '1.5',
              }}>
                Respondemos todas las consultas dentro de <strong>2 días hábiles</strong>.
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: 'var(--color-label-primary)',
                marginBottom: '16px',
              }}>
                Información de Contacto
              </h2>

              <div className="space-y-6">
                {/* WhatsApp */}
                <div
                  className="p-4"
                  style={{
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--color-fill)',
                    border: '1px solid var(--color-separator)',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      style={{ color: 'var(--color-tint)', flexShrink: 0, marginTop: '2px' }}
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <div>
                      <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-label-primary)', marginBottom: '4px' }}>
                        WhatsApp
                      </h3>
                      <a
                        href="https://wa.me/56931338020"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '14px', color: 'var(--color-tint)', textDecoration: 'none' }}
                      >
                        +56 9 3133 8020
                      </a>
                      <p style={{ fontSize: '13px', color: 'var(--color-label-secondary)', marginTop: '4px' }}>
                        Soporte general y consultas
                      </p>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div
                  className="p-4"
                  style={{
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--color-fill)',
                    border: '1px solid var(--color-separator)',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{ color: 'var(--color-tint)', flexShrink: 0, marginTop: '2px' }}
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <div>
                      <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-label-primary)', marginBottom: '4px' }}>
                        Tiempo de Respuesta
                      </h3>
                      <p style={{ fontSize: '14px', color: 'var(--color-label-secondary)', lineHeight: '1.5' }}>
                        Respondemos todas las consultas dentro de <strong>2 días hábiles</strong>.
                        Para consultas urgentes sobre facturación, respondemos el mismo día.
                      </p>
                    </div>
                  </div>
                </div>

                {/* FAQ Link */}
                <div
                  className="p-4"
                  style={{
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--color-fill)',
                    border: '1px solid var(--color-separator)',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{ color: 'var(--color-tint)', flexShrink: 0, marginTop: '2px' }}
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    <div>
                      <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-label-primary)', marginBottom: '4px' }}>
                        Preguntas Frecuentes
                      </h3>
                      <p style={{ fontSize: '14px', color: 'var(--color-label-secondary)', lineHeight: '1.5' }}>
                        Antes de contactarnos, revisa si tu pregunta ya está respondida en nuestra sección de preguntas frecuentes (próximamente).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Legal Info */}
                <div
                  className="p-4"
                  style={{
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--color-fill)',
                    border: '1px solid var(--color-separator)',
                  }}
                >
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-label-primary)', marginBottom: '12px' }}>
                    Información Legal
                  </h3>
                  <ul style={{ fontSize: '14px', color: 'var(--color-label-secondary)', lineHeight: '1.8', paddingLeft: '20px' }}>
                    <li>
                      <a href="/legal/terminos" style={{ color: 'var(--color-tint)', textDecoration: 'none' }}>
                        Términos y Condiciones
                      </a>
                    </li>
                    <li>
                      <a href="/legal/privacidad" style={{ color: 'var(--color-tint)', textDecoration: 'none' }}>
                        Política de Privacidad
                      </a>
                    </li>
                    <li>
                      <a href="/legal/cookies" style={{ color: 'var(--color-tint)', textDecoration: 'none' }}>
                        Política de Cookies
                      </a>
                    </li>
                    <li>
                      <a href="/legal/reembolsos" style={{ color: 'var(--color-tint)', textDecoration: 'none' }}>
                        Política de Reembolsos
                      </a>
                    </li>
                  </ul>
                </div>

                {/* SERNAC Info */}
                <div
                  className="p-4"
                  style={{
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--color-fill)',
                    border: '1px solid var(--color-separator)',
                  }}
                >
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-label-primary)', marginBottom: '8px' }}>
                    Protección al Consumidor
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-label-secondary)', lineHeight: '1.6', marginBottom: '12px' }}>
                    Para consultas o reclamos sobre protección al consumidor, puede contactar al SERNAC:
                  </p>
                  <ul style={{ fontSize: '14px', color: 'var(--color-label-secondary)', lineHeight: '1.8', paddingLeft: '20px' }}>
                    <li>
                      <strong>Web:</strong>{' '}
                      <a href="https://www.sernac.cl" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-tint)' }}>
                        www.sernac.cl
                      </a>
                    </li>
                    <li><strong>Teléfono:</strong> 800 700 100 (gratuito)</li>
                    <li><strong>WhatsApp:</strong> +56 9 9471 7777</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
