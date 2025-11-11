# MercadoPago Payment Integration

This document explains how to set up and use the MercadoPago payment integration for handling subscription payments in Chile.

## Overview

The payment system is fully integrated with:
- **MercadoPago SDK** - Payment gateway for Chile
- **Webhook handling** - Automatic payment status updates
- **Subscription activation** - Automatic subscription activation on successful payment
- **Payment tracking** - Complete payment history and status tracking

## Setup Instructions

### 1. Get MercadoPago Credentials

1. Go to [MercadoPago Developers Panel](https://www.mercadopago.cl/developers/panel/app)
2. Create an account or log in
3. Create a new application
4. Get your credentials:
   - **TEST credentials** (for testing): Starts with `TEST-`
   - **PRODUCTION credentials** (for live payments): Use these in production

### 2. Configure Environment Variables

Add these variables to your `.env` file in the `backend` directory:

```bash
# MercadoPago Configuration
MERCADOPAGO_ACCESS_TOKEN=TEST-your-access-token-here  # Use TEST token for development
BACKEND_URL=http://localhost:3001                      # Your backend URL
FRONTEND_URL=http://localhost:5173                     # Your frontend URL
```

For production, use:
```bash
MERCADOPAGO_ACCESS_TOKEN=APP_USR-your-production-token
BACKEND_URL=https://your-backend.railway.app
FRONTEND_URL=https://your-app.vercel.app
```

### 3. Database Migration

The payments table is automatically created when you start the server. It includes:
- Payment tracking
- MercadoPago transaction details
- Subscription linking
- Payment history

Run your backend to initialize the database:
```bash
cd backend
npm run dev
```

## How It Works

### Payment Flow

1. **User selects a plan** on the frontend
2. **Frontend calls** `POST /api/payments/create-preference` with `planId`
3. **Backend creates** a MercadoPago preference (checkout page)
4. **User is redirected** to MercadoPago checkout
5. **User completes payment** on MercadoPago
6. **MercadoPago sends webhook** to `POST /api/payments/webhook`
7. **Backend processes webhook** and updates payment status
8. **If approved**, subscription is automatically activated
9. **User is redirected** back to your app with payment status

### Webhook Configuration

For webhooks to work, you need to:

1. **Development**: Use ngrok or similar to expose your local server
   ```bash
   ngrok http 3001
   # Copy the HTTPS URL (e.g., https://abc123.ngrok.io)
   # Update BACKEND_URL in .env to this URL
   ```

2. **Production**: MercadoPago will automatically send webhooks to:
   ```
   https://your-backend-url/api/payments/webhook
   ```

3. **Configure in MercadoPago Dashboard**:
   - Go to your app settings
   - Add webhook URL: `https://your-backend-url/api/payments/webhook`
   - Select events: `payment` events

## API Endpoints

### Create Payment Preference
```http
POST /api/payments/create-preference
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "planId": "premium-monthly"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "preferenceId": "123456789-abc-def",
    "initPoint": "https://www.mercadopago.cl/checkout/v1/redirect?pref_id=123456789-abc-def",
    "sandboxInitPoint": "https://sandbox.mercadopago.cl/checkout/v1/redirect?pref_id=123456789-abc-def",
    "payment": {
      "id": 1,
      "userId": "user-123",
      "planId": "premium-monthly",
      "amount": 9990,
      "currency": "CLP",
      "status": "pending",
      ...
    }
  }
}
```

### Get My Payments
```http
GET /api/payments/my-payments
Authorization: Bearer <jwt-token>
```

### Get Payment by ID
```http
GET /api/payments/:id
Authorization: Bearer <jwt-token>
```

### Webhook (Public)
```http
POST /api/payments/webhook
Content-Type: application/json

{
  "type": "payment",
  "data": {
    "id": "123456789"
  }
}
```

## Frontend Integration

### Example: Create Payment

```typescript
// Create payment preference
const response = await fetch('/api/payments/create-preference', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    planId: 'premium-monthly'
  })
});

const data = await response.json();

// Redirect user to MercadoPago checkout
if (data.success) {
  // Use initPoint for production, sandboxInitPoint for testing
  window.location.href = data.data.initPoint;
}
```

### Payment Status Pages

Create these pages in your frontend:

1. `/payment/success` - Payment approved
2. `/payment/failure` - Payment failed
3. `/payment/pending` - Payment pending (e.g., awaiting bank confirmation)

MercadoPago will redirect users to these pages after payment.

## Testing

### Test Cards for Chile

Use these test cards in sandbox mode:

**Approved Payment:**
- Card: `5031 7557 3453 0604`
- CVV: `123`
- Expiry: Any future date
- Name: Any name

**Rejected Payment:**
- Card: `5031 4332 1540 6351`
- CVV: `123`
- Expiry: Any future date
- Name: Any name

More test cards: [MercadoPago Test Cards](https://www.mercadopago.cl/developers/es/docs/checkout-api/testing)

## Payment Statuses

| Status | Description |
|--------|-------------|
| `pending` | Payment awaiting processing |
| `approved` | Payment successful - subscription activated |
| `rejected` | Payment rejected - subscription not activated |
| `cancelled` | Payment cancelled by user |
| `refunded` | Payment refunded |
| `in_process` | Payment being processed (e.g., bank transfer) |

## Subscription Activation

When a payment is **approved**:
1. Payment record is updated with MercadoPago transaction details
2. User's subscription is activated or extended
3. Email confirmation is sent to user (via existing email service)
4. Subscription expiration date is set based on plan duration

## Security

- Webhook endpoint is public (no authentication required)
- MercadoPago signs webhooks - verify in production if needed
- Payment records store full MercadoPago response for audit trail
- User can only view their own payments (unless admin)

## Monitoring

Check payment logs:
```bash
# Backend logs will show:
✅ Payment routes registered at /api/payments
🔍 Processing webhook: {...}
📧 Payment data from MercadoPago: {...}
✅ Subscription activated for user XXX, plan YYY
```

## Troubleshooting

### Webhook not received
1. Check BACKEND_URL is accessible from internet
2. Verify webhook URL in MercadoPago dashboard
3. Check backend logs for webhook errors
4. Test with ngrok in development

### Payment not activating subscription
1. Check webhook logs in backend
2. Verify payment status is "approved"
3. Check metadata includes userId and planId
4. Verify subscription service is working

### MercadoPago API errors
1. Check MERCADOPAGO_ACCESS_TOKEN is correct
2. Verify using TEST token in development
3. Check API credentials are active
4. Review MercadoPago API status page

## Production Checklist

- [ ] Replace TEST credentials with PRODUCTION credentials
- [ ] Update BACKEND_URL to production URL
- [ ] Update FRONTEND_URL to production URL
- [ ] Configure webhook URL in MercadoPago dashboard
- [ ] Test payment flow end-to-end
- [ ] Monitor webhook logs
- [ ] Set up error alerting
- [ ] Test refund flow (if applicable)

## Support

For MercadoPago support:
- [Documentation](https://www.mercadopago.cl/developers)
- [API Reference](https://www.mercadopago.cl/developers/es/reference)
- [Support](https://www.mercadopago.cl/developers/es/support)
