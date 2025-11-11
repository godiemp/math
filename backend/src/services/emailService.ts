import nodemailer, { Transporter } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface EmailConfig {
  host?: string;
  port?: number;
  secure?: boolean;
  auth?: {
    user: string;
    pass: string;
  };
}

class EmailService {
  private transporter: Transporter | null = null;
  private fromEmail: string;
  private appName: string;
  private frontendUrl: string;

  constructor() {
    this.fromEmail = process.env.SMTP_FROM || 'noreply@paes.cl';
    this.appName = process.env.APP_NAME || 'PAES Platform';
    this.frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

    this.initializeTransporter();
  }

  private initializeTransporter() {
    // Skip email initialization in test environment or if SMTP is not configured
    if (process.env.NODE_ENV === 'test' || !process.env.SMTP_HOST) {
      console.log('⚠️  Email service not configured - emails will be logged to console');
      return;
    }

    const config: EmailConfig = {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    };

    // Add authentication if credentials are provided
    if (process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
      config.auth = {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      };
    }

    try {
      this.transporter = nodemailer.createTransport(config);
      console.log('✅ Email service initialized');
    } catch (error) {
      console.error('❌ Failed to initialize email service:', error);
    }
  }

  async send(options: EmailOptions): Promise<boolean> {
    try {
      // If transporter is not configured, log to console in development
      if (!this.transporter) {
        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
          console.log('\n📧 Email would be sent:');
          console.log(`To: ${options.to}`);
          console.log(`Subject: ${options.subject}`);
          console.log(`Content:\n${options.text || 'See HTML version'}\n`);
          return true;
        }
        throw new Error('Email service not configured');
      }

      const mailOptions = {
        from: `"${this.appName}" <${this.fromEmail}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text || this.stripHtml(options.html),
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Email sent:', info.messageId);
      return true;
    } catch (error) {
      console.error('❌ Failed to send email:', error);
      return false;
    }
  }

  async sendVerificationEmail(email: string, username: string, token: string): Promise<boolean> {
    const verificationUrl = `${this.frontendUrl}/verify-email?token=${token}`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
          .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>¡Bienvenido a ${this.appName}!</h1>
          </div>
          <div class="content">
            <h2>Hola ${username},</h2>
            <p>Gracias por registrarte en ${this.appName}. Para completar tu registro y comenzar a usar la plataforma, necesitas verificar tu dirección de correo electrónico.</p>

            <p style="text-align: center;">
              <a href="${verificationUrl}" class="button">Verificar correo electrónico</a>
            </p>

            <p>O copia y pega este enlace en tu navegador:</p>
            <p style="word-break: break-all; background: #f5f5f5; padding: 10px; border-radius: 4px; font-size: 14px;">
              ${verificationUrl}
            </p>

            <div class="warning">
              <strong>⚠️ Importante:</strong> Este enlace expirará en 24 horas por seguridad.
            </div>

            <p>Si no creaste una cuenta en ${this.appName}, puedes ignorar este correo de forma segura.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ${this.appName}. Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
Hola ${username},

Gracias por registrarte en ${this.appName}. Para completar tu registro, verifica tu correo electrónico haciendo clic en el siguiente enlace:

${verificationUrl}

Este enlace expirará en 24 horas.

Si no creaste una cuenta en ${this.appName}, puedes ignorar este correo.

${this.appName}
    `.trim();

    return this.send({
      to: email,
      subject: `Verifica tu correo electrónico - ${this.appName}`,
      html,
      text,
    });
  }

  async sendPasswordResetEmail(email: string, username: string, token: string): Promise<boolean> {
    const resetUrl = `${this.frontendUrl}/reset-password?token=${token}`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
          .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
          .security { background: #f8d7da; border-left: 4px solid #dc3545; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Recuperación de contraseña</h1>
          </div>
          <div class="content">
            <h2>Hola ${username},</h2>
            <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta en ${this.appName}.</p>

            <p style="text-align: center;">
              <a href="${resetUrl}" class="button">Restablecer contraseña</a>
            </p>

            <p>O copia y pega este enlace en tu navegador:</p>
            <p style="word-break: break-all; background: #f5f5f5; padding: 10px; border-radius: 4px; font-size: 14px;">
              ${resetUrl}
            </p>

            <div class="warning">
              <strong>⚠️ Importante:</strong> Este enlace expirará en 1 hora por seguridad.
            </div>

            <div class="security">
              <strong>🔒 Seguridad:</strong> Si no solicitaste restablecer tu contraseña, ignora este correo. Tu cuenta está segura y nadie puede acceder a ella sin tu contraseña actual.
            </div>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ${this.appName}. Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
Hola ${username},

Recibimos una solicitud para restablecer la contraseña de tu cuenta en ${this.appName}.

Para restablecer tu contraseña, haz clic en el siguiente enlace:

${resetUrl}

Este enlace expirará en 1 hora.

Si no solicitaste restablecer tu contraseña, ignora este correo. Tu cuenta está segura.

${this.appName}
    `.trim();

    return this.send({
      to: email,
      subject: `Restablece tu contraseña - ${this.appName}`,
      html,
      text,
    });
  }

  async sendWelcomeEmail(email: string, username: string, displayName: string): Promise<boolean> {
    const loginUrl = `${this.frontendUrl}/login`;
    const dashboardUrl = `${this.frontendUrl}/dashboard`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
          .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          .features { background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0; }
          .feature-item { margin: 10px 0; padding-left: 30px; position: relative; }
          .feature-item:before { content: "✓"; position: absolute; left: 0; color: #28a745; font-weight: bold; font-size: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 ¡Bienvenido a ${this.appName}!</h1>
          </div>
          <div class="content">
            <h2>Hola ${displayName},</h2>
            <p>¡Estamos emocionados de tenerte con nosotros! Tu cuenta ha sido creada exitosamente y ya puedes comenzar a prepararte para la PAES.</p>

            <div class="features">
              <h3>¿Qué puedes hacer en ${this.appName}?</h3>
              <div class="feature-item">Practica con preguntas de Matemática M1 y M2</div>
              <div class="feature-item">Participa en sesiones en vivo con otros estudiantes</div>
              <div class="feature-item">Obtén explicaciones detalladas con IA</div>
              <div class="feature-item">Sigue tu progreso y estadísticas</div>
              <div class="feature-item">Mantén tu racha de estudio diario</div>
            </div>

            <p style="text-align: center;">
              <a href="${dashboardUrl}" class="button">Ir al Dashboard</a>
            </p>

            <p><strong>Tus credenciales:</strong></p>
            <ul>
              <li>Usuario: <code>${username}</code></li>
              <li>Correo: <code>${email}</code></li>
            </ul>

            <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>

            <p>¡Mucho éxito en tu preparación! 🚀</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ${this.appName}. Todos los derechos reservados.</p>
            <p><a href="${loginUrl}" style="color: #667eea;">Iniciar sesión</a></p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
¡Bienvenido a ${this.appName}!

Hola ${displayName},

¡Estamos emocionados de tenerte con nosotros! Tu cuenta ha sido creada exitosamente.

¿Qué puedes hacer en ${this.appName}?
✓ Practica con preguntas de Matemática M1 y M2
✓ Participa en sesiones en vivo con otros estudiantes
✓ Obtén explicaciones detalladas con IA
✓ Sigue tu progreso y estadísticas
✓ Mantén tu racha de estudio diario

Tus credenciales:
- Usuario: ${username}
- Correo: ${email}

Accede a tu cuenta: ${loginUrl}

¡Mucho éxito en tu preparación!

${this.appName}
    `.trim();

    return this.send({
      to: email,
      subject: `¡Bienvenido a ${this.appName}! 🎉`,
      html,
      text,
    });
  }

  async sendPaymentConfirmationEmail(
    email: string,
    username: string,
    planName: string,
    amount: number,
    currency: string,
    expiresAt: number
  ): Promise<boolean> {
    const expiryDate = new Date(expiresAt).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const dashboardUrl = `${this.frontendUrl}/dashboard`;
    const subscriptionsUrl = `${this.frontendUrl}/subscriptions`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
          .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          .invoice { background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0; }
          .invoice-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #dee2e6; }
          .invoice-row.total { font-weight: bold; font-size: 18px; border-bottom: none; color: #28a745; }
          .success { background: #d4edda; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Pago confirmado</h1>
          </div>
          <div class="content">
            <h2>Hola ${username},</h2>

            <div class="success">
              <strong>¡Pago exitoso!</strong> Tu suscripción al plan <strong>${planName}</strong> ha sido confirmada.
            </div>

            <div class="invoice">
              <h3>Detalles de la transacción</h3>
              <div class="invoice-row">
                <span>Plan:</span>
                <span><strong>${planName}</strong></span>
              </div>
              <div class="invoice-row">
                <span>Válido hasta:</span>
                <span>${expiryDate}</span>
              </div>
              <div class="invoice-row total">
                <span>Total pagado:</span>
                <span>${currency} ${amount.toLocaleString('es-CL')}</span>
              </div>
            </div>

            <p>Ya puedes disfrutar de todos los beneficios de tu plan:</p>
            <ul>
              <li>Acceso ilimitado a todas las preguntas</li>
              <li>Sesiones en vivo sin restricciones</li>
              <li>Asistencia con IA avanzada</li>
              <li>Estadísticas y análisis detallados</li>
            </ul>

            <p style="text-align: center;">
              <a href="${dashboardUrl}" class="button">Ir al Dashboard</a>
            </p>

            <p>Puedes revisar tus suscripciones en cualquier momento desde <a href="${subscriptionsUrl}">tu perfil</a>.</p>

            <p>¡Gracias por confiar en ${this.appName}! 🎉</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ${this.appName}. Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
Pago confirmado - ${this.appName}

Hola ${username},

¡Pago exitoso! Tu suscripción al plan ${planName} ha sido confirmada.

Detalles de la transacción:
- Plan: ${planName}
- Válido hasta: ${expiryDate}
- Total pagado: ${currency} ${amount.toLocaleString('es-CL')}

Ya puedes disfrutar de todos los beneficios de tu plan.

Accede a tu dashboard: ${dashboardUrl}

¡Gracias por confiar en ${this.appName}!
    `.trim();

    return this.send({
      to: email,
      subject: `Pago confirmado - ${planName} - ${this.appName}`,
      html,
      text,
    });
  }

  private stripHtml(html: string): string {
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Test email configuration
  async verifyConnection(): Promise<boolean> {
    if (!this.transporter) {
      console.log('⚠️  Email service not configured');
      return false;
    }

    try {
      await this.transporter.verify();
      console.log('✅ Email service is ready to send emails');
      return true;
    } catch (error) {
      console.error('❌ Email service verification failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const emailService = new EmailService();
