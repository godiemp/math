# Resend Email Setup Guide

## Quick Start (5 minutes)

Your Resend API key: `re_FzyeDgDB_3UNsJh7BziGSmT797WP91zEb`

### Step 1: Add to Environment Variables

Create or update your `backend/.env` file:

```bash
# Email Configuration with Resend
RESEND_API_KEY=re_FzyeDgDB_3UNsJh7BziGSmT797WP91zEb
RESEND_FROM=onboarding@resend.dev  # Use this for testing

# App Configuration
APP_NAME=PAES Platform
FRONTEND_URL=http://localhost:3000  # Your frontend URL
```

### Step 2: Restart Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
✅ Email service initialized with Resend API
```

### Step 3: Test It!

Register a new user via API or frontend. The system will automatically:
- Send a welcome email ✉️
- Send an email verification link 🔗

Check your email inbox!

---

## Testing with onboarding@resend.dev

For development/testing, use Resend's test email address:

```bash
RESEND_FROM=onboarding@resend.dev
```

This allows you to send emails **without domain verification**.

**Important:** `onboarding@resend.dev` can only send to:
- Your verified email address on Resend
- Email addresses you've added to your Resend account

To send to any email address, you need to verify your own domain.

---

## Production Setup: Verify Your Domain

### Step 1: Add Your Domain to Resend

1. Go to https://resend.com/domains
2. Click "Add Domain"
3. Enter your domain (e.g., `paes.cl`)

### Step 2: Add DNS Records

Resend will provide DNS records to add to your domain:

**SPF Record (TXT):**
```
Name: @
Value: v=spf1 include:resend.net ~all
```

**DKIM Records (TXT):**
```
Name: resend._domainkey
Value: [provided by Resend]
```

**DMARC Record (TXT):**
```
Name: _dmarc
Value: v=DMARC1; p=none;
```

### Step 3: Wait for Verification

DNS propagation typically takes 15 minutes to 24 hours.

### Step 4: Update .env

```bash
RESEND_FROM=noreply@paes.cl  # Now you can use your domain!
```

---

## API Key Security

⚠️ **IMPORTANT:** Your API key is sensitive!

### ✅ DO:
- Add `.env` to `.gitignore` (already done)
- Use environment variables in production (Railway, Vercel, etc.)
- Rotate API keys if exposed

### ❌ DON'T:
- Commit API keys to Git
- Share API keys publicly
- Use the same API key for dev and production

### Rotating Your API Key

If your key is exposed:
1. Go to https://resend.com/api-keys
2. Delete the old key
3. Create a new key
4. Update your `.env` files

---

## Testing Email Functionality

### 1. Test Welcome Email

Register a new user:

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "your-email@example.com",
    "password": "test123",
    "displayName": "Test User"
  }'
```

You should receive:
- ✉️ Welcome email
- 🔗 Email verification link

### 2. Test Password Reset

```bash
curl -X POST http://localhost:3001/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-email@example.com"
  }'
```

You should receive:
- 🔑 Password reset link (expires in 1 hour)

### 3. Test Payment Confirmation

Create a subscription (requires authentication):

```bash
curl -X POST http://localhost:3001/api/subscriptions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "userId": "user-id",
    "planId": "basic",
    "startTrial": false,
    "paymentMethod": "credit_card"
  }'
```

You should receive:
- 💳 Payment confirmation email

---

## Monitoring Email Delivery

### Resend Dashboard

View all sent emails at: https://resend.com/emails

You can see:
- Delivery status
- Open rates (if enabled)
- Click rates
- Bounce rates
- Failed sends with error details

### Backend Logs

Check your server logs for:

```
✅ Email sent via Resend: <email-id>
```

Or if there's an error:

```
❌ Resend error: <error-message>
```

---

## Rate Limits

### Free Tier
- 100 emails per day
- 3,000 emails per month
- No credit card required

### Paid Plans
If you need more:
- $20/month for 50,000 emails
- $80/month for 100,000 emails

See pricing: https://resend.com/pricing

---

## Troubleshooting

### Email Not Sending

**Check 1: API Key**
```bash
# In backend/.env
echo $RESEND_API_KEY
```

Should show: `re_FzyeDgDB_3UNsJh7BziGSmT797WP91zEb`

**Check 2: Server Logs**
```bash
# Look for this on server start:
✅ Email service initialized with Resend API
```

**Check 3: Rate Limits**
- Check Resend dashboard for quota usage
- Free tier: 100 emails/day

### Email Going to Spam

**Solutions:**
1. Verify your domain (adds SPF/DKIM)
2. Use professional email content
3. Avoid spam trigger words
4. Add unsubscribe link (if doing marketing)

### Domain Verification Failing

**Common Issues:**
1. DNS not propagated (wait 24 hours)
2. Wrong DNS record type (TXT vs CNAME)
3. DNS record in wrong subdomain

**Check DNS:**
```bash
dig TXT resend._domainkey.paes.cl
dig TXT paes.cl
```

---

## Production Deployment

### Railway (Backend)

Add environment variables in Railway dashboard:

```
RESEND_API_KEY=re_FzyeDgDB_3UNsJh7BziGSmT797WP91zEb
RESEND_FROM=noreply@paes.cl
APP_NAME=PAES Platform
FRONTEND_URL=https://your-app.vercel.app
```

### Vercel (Frontend)

If you need to send emails from frontend (not recommended), add:

```
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

Backend should handle all email sending for security.

---

## Alternative: SMTP Fallback

If you prefer SMTP or need a backup, keep these commented in `.env`:

```bash
# SMTP Fallback (if Resend API fails)
# SMTP_HOST=smtp.resend.com
# SMTP_PORT=587
# SMTP_USER=resend
# SMTP_PASSWORD=re_FzyeDgDB_3UNsJh7BziGSmT797WP91zEb
# SMTP_FROM=onboarding@resend.dev
```

The system will use Resend API first, then fall back to SMTP if needed.

---

## Support

- **Resend Documentation:** https://resend.com/docs
- **Resend Support:** support@resend.com
- **Backend Email System Docs:** See `EMAIL_SYSTEM.md`

---

## Summary Checklist

For **Development:**
- [x] Add `RESEND_API_KEY` to `.env`
- [x] Use `RESEND_FROM=onboarding@resend.dev`
- [x] Test registration flow
- [x] Test password reset
- [x] Verify emails arrive

For **Production:**
- [ ] Verify your domain at resend.com
- [ ] Add DNS records (SPF, DKIM, DMARC)
- [ ] Wait for DNS propagation
- [ ] Update `RESEND_FROM=noreply@paes.cl`
- [ ] Add env vars to Railway
- [ ] Test in production
- [ ] Monitor Resend dashboard

---

**Need help?** Check the logs or Resend dashboard for detailed error messages.
