# Email System Documentation

## Overview

The email system provides comprehensive email functionality for user authentication, verification, and transactional notifications.

## Features Implemented

### 1. Email Verification ✅
- Automatic email verification on user registration
- Secure token-based verification (24-hour expiry)
- Resend verification email functionality
- Database tracking of verification status

**Endpoints:**
- `POST /api/auth/send-verification` (Authenticated) - Send verification email
- `GET /api/auth/verify-email/:token` (Public) - Verify email with token
- `POST /api/auth/resend-verification` (Public) - Resend verification email

### 2. Password Reset ✅
- Secure password reset flow
- Token-based reset links (1-hour expiry)
- Automatic token revocation on password change
- Email enumeration protection

**Endpoints:**
- `POST /api/auth/forgot-password` (Public) - Request password reset
- `POST /api/auth/reset-password` (Public) - Reset password with token

### 3. Welcome Emails ✅
- Automatic welcome email on registration
- Personalized greeting with user's display name
- Platform feature highlights
- Getting started information

### 4. Payment Confirmation Emails ✅
- Automatic confirmation on successful payment
- Plan details and expiration date
- Invoice-style summary
- Call-to-action to access dashboard

## Email Templates

All email templates feature:
- Responsive HTML design
- Plain text fallback
- Professional gradient styling
- Mobile-friendly layout
- Spanish language (Chile locale)

## Configuration

### Environment Variables

Add to `.env`:

```bash
# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@paes.cl

# App Configuration
APP_NAME=PAES Platform
```

### Supported Email Providers

#### Gmail
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password  # Use App Password, not regular password
```

**Setup:**
1. Enable 2-Factor Authentication on your Google Account
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use the 16-character app password in `.env`

#### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
```

**Setup:**
1. Sign up at https://sendgrid.com
2. Create API Key with Mail Send permissions
3. Use "apikey" as username and API key as password

#### AWS SES
```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-aws-smtp-username
SMTP_PASSWORD=your-aws-smtp-password
```

**Setup:**
1. Enable SES in AWS Console
2. Verify your domain or email
3. Create SMTP credentials
4. Use region-specific SMTP endpoint

## Database Schema

### Users Table Updates

New columns added:
```sql
email_verified BOOLEAN DEFAULT FALSE NOT NULL
email_verified_at BIGINT
verification_token VARCHAR(255)
verification_token_expires_at BIGINT
password_reset_token VARCHAR(255)
password_reset_token_expires_at BIGINT
```

Indexes added:
```sql
CREATE INDEX idx_users_verification_token ON users(verification_token);
CREATE INDEX idx_users_password_reset_token ON users(password_reset_token);
```

## API Usage Examples

### Register User (Auto-sends Welcome + Verification Emails)
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "student1",
    "email": "student1@example.com",
    "password": "password123",
    "displayName": "Juan Pérez"
  }'
```

### Request Password Reset
```bash
curl -X POST http://localhost:3001/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student1@example.com"
  }'
```

### Reset Password
```bash
curl -X POST http://localhost:3001/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your-reset-token-from-email",
    "password": "newPassword123"
  }'
```

### Verify Email
```bash
curl http://localhost:3001/api/auth/verify-email/your-verification-token
```

### Resend Verification Email
```bash
curl -X POST http://localhost:3001/api/auth/resend-verification \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student1@example.com"
  }'
```

### Send Verification Email (Authenticated)
```bash
curl -X POST http://localhost:3001/api/auth/send-verification \
  -H "Authorization: Bearer your-access-token"
```

## Development Mode

In development/test environments without SMTP configured:
- Emails are logged to console instead of being sent
- All email functionality continues to work
- Useful for local development without email provider setup

## Security Features

### Email Verification
- 24-hour token expiration
- Secure random token generation (32 bytes hex)
- Token invalidation after verification
- Database-backed token storage

### Password Reset
- 1-hour token expiration (security best practice)
- Email enumeration protection (always returns success)
- Automatic token revocation on password change
- All refresh tokens revoked after password reset

### Rate Limiting
- Auth endpoints protected by rate limiting (5 requests per 15 minutes)
- Prevents brute force attacks on password reset

## File Structure

```
backend/src/
├── services/
│   ├── emailService.ts           # Core email service with nodemailer
│   └── subscriptionService.ts    # Updated with payment emails
├── auth/
│   ├── services/
│   │   ├── authService.ts        # Updated with welcome/verification emails
│   │   └── emailVerificationService.ts  # Email verification logic
│   ├── controllers/
│   │   └── emailController.ts    # Email endpoints
│   └── routes/
│       └── authRoutes.ts         # Updated with email routes
└── config/
    └── database.ts               # Updated schema with email fields
```

## Email Templates

### Verification Email
- Subject: "Verifica tu correo electrónico - PAES Platform"
- Includes: Verification link with 24-hour expiry warning
- Design: Purple gradient header, clear CTA button

### Password Reset Email
- Subject: "Restablece tu contraseña - PAES Platform"
- Includes: Reset link with 1-hour expiry warning
- Security notice: Informs user if they didn't request reset

### Welcome Email
- Subject: "¡Bienvenido a PAES Platform! 🎉"
- Includes: Platform features, user credentials, dashboard link
- Motivational tone for students

### Payment Confirmation Email
- Subject: "Pago confirmado - [Plan Name] - PAES Platform"
- Includes: Invoice details, plan expiry, benefits list
- Professional design with green success theme

## Testing

### Manual Testing

1. Register a new user and check console logs for email output
2. Request password reset and verify token generation
3. Test email verification flow
4. Create a subscription and verify payment email

### Integration Testing

With SMTP configured:
1. Complete registration flow and receive emails
2. Click verification link and confirm email verified
3. Test password reset end-to-end
4. Verify payment confirmation sends after subscription creation

## Troubleshooting

### Emails Not Sending

1. **Check SMTP credentials**: Verify `.env` configuration
2. **Check firewall**: Ensure port 587 is open
3. **Check logs**: Look for error messages in console
4. **Verify connection**: Email service logs connection status on startup

### Gmail "Less Secure Apps" Error

- Don't use regular password
- Enable 2FA and create App Password
- Use the 16-character App Password in `.env`

### Token Expired Errors

- Verification tokens: 24 hours (adjust in `emailVerificationService.ts`)
- Reset tokens: 1 hour (adjust in `emailVerificationService.ts`)

## Future Enhancements

Potential improvements:
- [ ] Email templates with template engine (Handlebars/EJS)
- [ ] Email queue for better performance (Bull/Redis)
- [ ] Email sending retries with exponential backoff
- [ ] Email analytics and tracking
- [ ] Multi-language support
- [ ] HTML email previews in development
- [ ] Subscription renewal reminder emails
- [ ] Trial expiration reminder emails

## Production Checklist

Before deploying:
- [ ] Configure production SMTP credentials
- [ ] Set `SMTP_FROM` to verified domain email
- [ ] Update `FRONTEND_URL` to production URL
- [ ] Test email delivery in production
- [ ] Monitor email sending errors
- [ ] Set up email provider quotas and alerts
- [ ] Consider email delivery service (SendGrid/AWS SES) for scale
- [ ] Add email unsubscribe functionality (if required by law)
