# Security Audit Report
**Date:** 2025-11-11
**Project:** SimplePAES - Math Preparation Platform
**Auditor:** Claude (Automated Security Analysis)

---

## Executive Summary

This security audit identified **11 security vulnerabilities** ranging from **CRITICAL** to **LOW** severity. The most critical issues involve payment webhook security, JWT secret management, and sensitive data exposure through logging. Immediate action is required on critical and high-severity issues to prevent potential security breaches.

### Severity Breakdown
- **CRITICAL**: 2 issues
- **HIGH**: 4 issues
- **MEDIUM**: 3 issues
- **LOW**: 2 issues

---

## Critical Vulnerabilities

### 🔴 CRITICAL-1: Missing Payment Webhook Signature Verification
**Location:** `backend/src/controllers/paymentController.ts:72-94`, `backend/src/services/paymentService.ts:129-173`

**Description:**
The MercadoPago webhook handler accepts and processes payment notifications without verifying the webhook signature. This allows attackers to send forged webhook requests to activate subscriptions without actual payment.

**Impact:**
- Attackers can activate premium subscriptions without payment
- Financial loss through unauthorized access
- Compromise of payment integrity

**Code Reference:**
```typescript
// backend/src/controllers/paymentController.ts:72-94
export const handleWebhook = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Received webhook:', JSON.stringify(req.body, null, 2));
    console.log('Webhook query params:', req.query);

    const webhookData = req.body;

    // Respond immediately to acknowledge receipt
    res.status(200).json({ success: true });

    // ❌ NO SIGNATURE VERIFICATION!
    // Process webhook asynchronously
    PaymentService.processWebhook(webhookData).catch((error) => {
      console.error('Error processing webhook asynchronously:', error);
    });
  }
}
```

**Recommendation:**
```typescript
// Add MercadoPago webhook signature verification
import crypto from 'crypto';

export const handleWebhook = async (req: Request, res: Response): Promise<void> => {
  try {
    // Verify webhook signature
    const xSignature = req.headers['x-signature'] as string;
    const xRequestId = req.headers['x-request-id'] as string;

    if (!verifyMercadoPagoSignature(req.body, xSignature, xRequestId)) {
      console.error('❌ Invalid webhook signature');
      res.status(401).json({ error: 'Invalid signature' });
      return;
    }

    // ... rest of webhook processing
  }
}

function verifyMercadoPagoSignature(
  body: any,
  signature: string,
  requestId: string
): boolean {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
  if (!secret) return false;

  // Implement MercadoPago signature verification
  // https://www.mercadopago.com/developers/en/docs/your-integrations/notifications/webhooks#editor_3
  const dataID = body.data?.id;
  const manifest = `id:${dataID};request-id:${requestId};`;
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(manifest);
  const expectedSignature = hmac.digest('hex');

  return expectedSignature === signature;
}
```

**References:**
- MercadoPago Webhook Security: https://www.mercadopago.com/developers/en/docs/your-integrations/notifications/webhooks

---

### 🔴 CRITICAL-2: Weak JWT Secret Fallback Values
**Location:** `backend/src/auth/services/tokenService.ts:16-17`

**Description:**
The JWT token service uses hardcoded fallback secrets when environment variables are not set. This creates a severe security risk in production if environment variables are misconfigured.

**Impact:**
- Attackers can forge authentication tokens if fallback secrets are used
- Complete authentication bypass
- Unauthorized access to all user accounts including admin

**Code Reference:**
```typescript
// backend/src/auth/services/tokenService.ts:16-17
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret-key';
```

**Recommendation:**
```typescript
// REQUIRED: Fail-fast if secrets are not configured
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error(
    'FATAL: JWT_SECRET environment variable must be set and at least 32 characters. ' +
    'Application cannot start without secure JWT configuration.'
  );
}

if (!JWT_REFRESH_SECRET || JWT_REFRESH_SECRET.length < 32) {
  throw new Error(
    'FATAL: JWT_REFRESH_SECRET environment variable must be set and at least 32 characters. ' +
    'Application cannot start without secure JWT configuration.'
  );
}

// Warn if secrets appear to be default/weak values
if (JWT_SECRET.includes('change-this') || JWT_SECRET === 'your-super-secret-jwt-key-change-this-in-production') {
  throw new Error('FATAL: JWT_SECRET appears to be a default/example value. Use a cryptographically random secret.');
}
```

---

## High Severity Vulnerabilities

### 🟠 HIGH-1: Excessive Logging of Sensitive Information
**Location:** Multiple files in `backend/src/auth/`

**Description:**
Authentication middleware and services log sensitive information including full request headers, authorization tokens, and user credentials to console logs.

**Impact:**
- Exposure of JWT tokens in log files
- Potential credential leakage in centralized logging systems
- Compliance violations (GDPR, PCI-DSS)

**Code References:**
```typescript
// backend/src/auth/middleware/authenticate.ts:47-48
console.log('🔐 Auth middleware - Authorization header:', authHeader ? 'present' : 'missing');
console.log('🔐 Auth middleware - Full headers:', JSON.stringify(req.headers, null, 2));

// backend/src/auth/services/tokenService.ts:49
console.error('   JWT_SECRET configured:', JWT_SECRET ? 'Yes (length: ' + JWT_SECRET.length + ')' : 'No');
```

**Recommendation:**
```typescript
// Remove or redact sensitive logging in production
if (process.env.NODE_ENV === 'development') {
  console.log('🔐 Auth middleware - Headers:', {
    ...req.headers,
    authorization: req.headers.authorization ? '[REDACTED]' : undefined,
    cookie: req.headers.cookie ? '[REDACTED]' : undefined,
  });
}

// Never log secret lengths or configurations in production
if (process.env.NODE_ENV === 'development') {
  console.error('JWT_SECRET configured:', !!JWT_SECRET);
}
```

---

### 🟠 HIGH-2: Predictable User ID Generation
**Location:** `backend/src/auth/services/authService.ts:79`

**Description:**
User IDs are generated using `Date.now()` and `Math.random()`, which are predictable and can be enumerated by attackers.

**Impact:**
- User enumeration attacks
- Potential IDOR (Insecure Direct Object Reference) vulnerabilities
- Predictable account creation patterns

**Code Reference:**
```typescript
// backend/src/auth/services/authService.ts:79
const userId = `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
```

**Recommendation:**
```typescript
import crypto from 'crypto';

// Use cryptographically secure random UUIDs
import { randomUUID } from 'crypto';
const userId = randomUUID(); // RFC 4122 compliant UUID

// OR use a more secure random generation
function generateSecureUserId(): string {
  const randomBytes = crypto.randomBytes(16);
  return `user-${randomBytes.toString('hex')}`;
}
const userId = generateSecureUserId();
```

---

### 🟠 HIGH-3: No Rate Limiting on Payment Endpoints
**Location:** `backend/src/routes/paymentRoutes.ts`, `backend/src/index.ts:161`

**Description:**
Payment endpoints have general API rate limiting (100 req/15min) but no stricter limits specific to payment operations. This allows potential abuse and brute force attacks on payment flows.

**Impact:**
- Payment enumeration attacks
- Potential credit card testing
- Resource exhaustion through payment preference creation

**Recommendation:**
```typescript
// Add stricter rate limiting for payment endpoints
const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 payment requests per window
  message: {
    error: 'Demasiadas solicitudes de pago. Por favor intenta más tarde.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply to payment routes
app.use('/api/payments/create-preference', paymentLimiter);
app.use('/api/payments', apiLimiter); // General limit for other payment endpoints
```

---

### 🟠 HIGH-4: Missing CSRF Protection
**Location:** `backend/src/index.ts`

**Description:**
The application does not implement CSRF (Cross-Site Request Forgery) protection for state-changing operations. While the API uses JWT authentication, it accepts credentials in requests which makes it vulnerable to CSRF if tokens are stored in cookies.

**Impact:**
- Potential CSRF attacks on authenticated endpoints
- Unauthorized actions performed on behalf of authenticated users
- Payment manipulation if attacker can trigger payment creation

**Recommendation:**
```typescript
import csurf from 'csurf';

// Add CSRF protection for state-changing operations
const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  }
});

// Apply to routes that change state
app.use('/api/payments/create-preference', csrfProtection);
app.use('/api/auth/register', csrfProtection);
app.use('/api/auth/login', csrfProtection);

// Provide CSRF token endpoint
app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
```

**Note:** If the frontend stores JWT tokens in localStorage (not cookies), CSRF risk is lower but still worth implementing for defense in depth.

---

## Medium Severity Vulnerabilities

### 🟡 MEDIUM-1: Missing Input Sanitization for User-Generated Content
**Location:** `backend/src/controllers/quizController.ts`, `backend/src/controllers/sessionController.ts`

**Description:**
User inputs for quiz answers, session names, and other user-generated content are not sanitized before storage and display. While no `dangerouslySetInnerHTML` was found in the frontend, stored XSS is still a risk.

**Impact:**
- Potential stored XSS vulnerabilities
- Database pollution with malicious scripts
- Social engineering attacks through malicious content

**Recommendation:**
```typescript
import DOMPurify from 'isomorphic-dompurify';
// OR
import sanitizeHtml from 'sanitize-html';

// Sanitize user inputs before storing
function sanitizeInput(input: string): string {
  return sanitizeHtml(input, {
    allowedTags: [], // No HTML allowed in user inputs
    allowedAttributes: {},
  });
}

// Apply to all user inputs
const sanitizedName = sanitizeInput(req.body.name);
const sanitizedAnswer = sanitizeInput(req.body.answer);
```

---

### 🟡 MEDIUM-2: Missing Security Headers for API Responses
**Location:** `backend/src/index.ts:81-91`

**Description:**
While Helmet is configured, some security headers could be strengthened for API responses, particularly for preventing clickjacking and MIME sniffing.

**Current Configuration:**
```typescript
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));
```

**Recommendation:**
```typescript
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      frameAncestors: ["'none'"], // Prevent clickjacking
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false,
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },
  noSniff: true, // Prevent MIME sniffing
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xssFilter: true,
}));
```

---

### 🟡 MEDIUM-3: Insufficient Password Requirements
**Location:** `backend/src/auth/services/authService.ts:61-63`, `backend/src/middleware/validation.ts:8`

**Description:**
Password requirements only enforce a minimum of 6 characters with no complexity requirements (uppercase, lowercase, numbers, special characters).

**Impact:**
- Weak passwords susceptible to dictionary attacks
- Increased risk of account compromise
- Does not meet modern password security standards

**Code Reference:**
```typescript
// backend/src/auth/services/authService.ts:61-63
if (password.length < 6) {
  throw new Error('Password must be at least 6 characters');
}

// backend/src/middleware/validation.ts:8
password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
```

**Recommendation:**
```typescript
// Update validation schema
import { z } from 'zod';

const passwordSchema = z.string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .max(128, 'La contraseña es demasiado larga')
  .refine(
    (password) => /[a-z]/.test(password),
    'La contraseña debe contener al menos una letra minúscula'
  )
  .refine(
    (password) => /[A-Z]/.test(password),
    'La contraseña debe contener al menos una letra mayúscula'
  )
  .refine(
    (password) => /[0-9]/.test(password),
    'La contraseña debe contener al menos un número'
  )
  .refine(
    (password) => /[^a-zA-Z0-9]/.test(password),
    'La contraseña debe contener al menos un carácter especial'
  );

// Optional: Check against common passwords
import passwordValidator from 'password-validator';

const schema = new passwordValidator();
schema
  .is().min(8)
  .is().max(128)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().symbols()
  .has().not().spaces();
```

---

## Low Severity Vulnerabilities

### 🟢 LOW-1: Development Mode Allows All CORS Origins
**Location:** `backend/src/index.ts:63-66`

**Description:**
In development mode, all CORS origins are allowed, which could lead to accidental exposure if development mode is mistakenly enabled in production.

**Code Reference:**
```typescript
// backend/src/index.ts:63-66
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 CORS: Allowing in development mode');
  return callback(null, true);
}
```

**Recommendation:**
```typescript
// Add explicit safeguard
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 CORS: Allowing in development mode');
  // Ensure this never happens in production
  if (process.env.RAILWAY_ENVIRONMENT || process.env.VERCEL_ENV === 'production') {
    console.error('❌ FATAL: Development mode detected in production environment!');
    process.exit(1);
  }
  return callback(null, true);
}
```

---

### 🟢 LOW-2: Missing Request Body Size Limits
**Location:** `backend/src/index.ts:124`

**Description:**
No explicit limit on request body size is configured, which could allow DoS attacks through large payloads.

**Current Configuration:**
```typescript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

**Recommendation:**
```typescript
// Add body size limits
app.use(express.json({ limit: '10mb' })); // Adjust based on needs
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Different limits for different routes if needed
const smallBodyLimiter = express.json({ limit: '100kb' });
const largeBodyLimiter = express.json({ limit: '10mb' });

app.use('/api/admin/upload-pdf', largeBodyLimiter); // PDF uploads
app.use('/api/auth', smallBodyLimiter); // Auth endpoints
```

---

## Security Strengths

The following security measures are properly implemented:

✅ **Strong Password Hashing**: bcrypt with 10 salt rounds
✅ **JWT Token Expiration**: Access tokens expire in 1 hour, refresh tokens in 7 days
✅ **Parameterized SQL Queries**: All database queries use parameterized statements (no SQL injection found)
✅ **Role-Based Access Control**: Admin and student roles properly enforced
✅ **Rate Limiting**: General API rate limiting (100/15min) and auth rate limiting (20/15min)
✅ **Token Revocation**: Refresh tokens can be revoked on logout
✅ **Email Verification**: Email verification tokens with 24-hour expiry
✅ **Password Reset Security**: One-time tokens with 1-hour expiry
✅ **No Dependency Vulnerabilities**: npm audit shows 0 vulnerabilities
✅ **HTTPS in Production**: SSL/TLS enforced via Railway platform
✅ **Input Validation**: Zod schema validation on auth endpoints
✅ **Email Enumeration Protection**: Password reset always returns success

---

## Recommendations Summary

### Immediate Actions (Critical/High)
1. ⚠️ **URGENT**: Implement MercadoPago webhook signature verification
2. ⚠️ **URGENT**: Remove JWT secret fallback values and enforce strong secrets
3. Remove or redact sensitive information from logs
4. Implement cryptographically secure user ID generation
5. Add stricter rate limiting for payment endpoints
6. Implement CSRF protection for state-changing operations

### Short-term Actions (Medium)
7. Add input sanitization for user-generated content
8. Strengthen Helmet security headers configuration
9. Enforce stronger password requirements (8+ chars with complexity)

### Long-term Improvements (Low)
10. Add production safeguards for development mode
11. Implement request body size limits

---

## Testing Recommendations

To validate fixes, perform the following security tests:

1. **Payment Webhook Testing**:
   - Send forged webhook requests to `/api/payments/webhook`
   - Verify signature validation rejects invalid requests

2. **Authentication Testing**:
   - Attempt to start server without JWT secrets
   - Verify application fails to start with weak secrets

3. **Rate Limiting Testing**:
   - Perform 20+ payment preference creation requests
   - Verify rate limiting blocks excessive requests

4. **Password Policy Testing**:
   - Attempt registration with weak passwords
   - Verify complexity requirements are enforced

5. **CSRF Testing**:
   - Attempt state-changing operations without CSRF tokens
   - Verify requests are rejected

---

## Compliance Considerations

- **PCI-DSS**: Payment webhook security must be addressed for compliance
- **GDPR**: Excessive logging of personal data should be reduced
- **OWASP Top 10**: Addresses A01 (Broken Access Control), A02 (Cryptographic Failures), A07 (Identification and Authentication Failures)

---

## Conclusion

The application demonstrates good security practices in many areas (parameterized queries, password hashing, token management). However, critical vulnerabilities in payment webhook handling and JWT secret management require immediate attention. Addressing the critical and high-severity issues will significantly improve the security posture of the application.

**Next Steps:**
1. Prioritize fixes for CRITICAL-1 and CRITICAL-2
2. Implement HIGH severity fixes within 1 week
3. Schedule MEDIUM severity fixes for next sprint
4. Review and implement LOW severity improvements as time permits

---

**Report Generated:** 2025-11-11
**Total Issues Found:** 11
**Priority:** 6 Critical/High severity issues require immediate action
