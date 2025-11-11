# Sentry Error Tracking Setup Guide

This application uses [Sentry](https://sentry.io) for error tracking and performance monitoring in both the frontend (Next.js) and backend (Express).

## ✅ Projects Already Created

Your Sentry projects are already set up:
- **Organization:** `paes-math`
- **Frontend Project:** `paes-math-frontend` (Next.js)
- **Backend Project:** `paes-math-backend` (Node.js)

### Quick Start - Add to Your Local Environment

**Frontend (.env.local):**
```bash
NEXT_PUBLIC_SENTRY_DSN=https://a324bdfc921b5d48d16847bd9dc86037@o4510346124132352.ingest.us.sentry.io/4510346125115392
```

**Backend (.env):**
```bash
SENTRY_DSN=https://29dadd3000275242ede01c8d3d52bf7c@o4510346124132352.ingest.us.sentry.io/4510346128654336
```

That's it! Restart your dev servers and Sentry will start tracking errors.

---

## What is Sentry?

Sentry is an error tracking and performance monitoring platform that helps you:
- Track and debug errors in production
- Monitor application performance
- Get alerts when things break
- View detailed error context (stack traces, user info, breadcrumbs)
- Analyze error trends over time

## Setup Instructions

### 1. Create a Sentry Account

1. Go to [sentry.io](https://sentry.io) and sign up for a free account
2. Create a new organization (e.g., "paes-math-platform")

### 2. Create Sentry Projects

You'll need **two separate projects**:

#### Frontend Project (Next.js)
1. Click "Projects" → "Create Project"
2. Select platform: **Next.js**
3. Set alert frequency: Choose your preference
4. Name it: `paes-math-frontend` (or your preferred name)
5. Copy the **DSN** (Data Source Name) - you'll need this later

#### Backend Project (Node/Express)
1. Click "Projects" → "Create Project"
2. Select platform: **Node.js**
3. Set alert frequency: Choose your preference
4. Name it: `paes-math-backend` (or your preferred name)
5. Copy the **DSN** - you'll need this later

### 3. Configure Environment Variables

#### Frontend (.env.local)

```bash
# Required - Frontend Sentry DSN
NEXT_PUBLIC_SENTRY_DSN=https://YOUR_FRONTEND_KEY@o123456.ingest.sentry.io/123456

# Optional - For source maps upload (recommended for production)
SENTRY_ORG=your-sentry-org-slug
SENTRY_PROJECT=paes-math-frontend
SENTRY_AUTH_TOKEN=your-auth-token
```

#### Backend (.env)

```bash
# Required - Backend Sentry DSN
SENTRY_DSN=https://YOUR_BACKEND_KEY@o123456.ingest.sentry.io/789012
```

### 4. Get Sentry Auth Token (Optional, for Source Maps)

Source maps help you see the actual code in error stack traces instead of minified code.

1. Go to Settings → Account → API → Auth Tokens
2. Click "Create New Token"
3. Name: `Source Maps Upload`
4. Scopes: Select `project:releases` and `project:write`
5. Copy the token and add to your `.env.local` as `SENTRY_AUTH_TOKEN`

### 5. Deploy Configuration

#### Vercel (Frontend)

Add these environment variables in your Vercel project settings:

```
NEXT_PUBLIC_SENTRY_DSN=your-frontend-dsn
SENTRY_ORG=your-org (optional)
SENTRY_PROJECT=paes-math-frontend (optional)
SENTRY_AUTH_TOKEN=your-token (optional)
```

#### Railway (Backend)

Add this environment variable in your Railway project:

```
SENTRY_DSN=your-backend-dsn
```

## Features Enabled

### Frontend (Next.js)

✅ **Client-side error tracking**
- Catches React component errors
- Tracks unhandled promise rejections
- Captures console errors

✅ **Session Replay** (10% sample rate)
- Records user sessions when errors occur
- Privacy-focused (masks text and blocks media)
- Helps reproduce bugs

✅ **Performance Monitoring**
- Tracks page load times
- Monitors API calls
- Identifies slow components

✅ **Smart Filtering**
- Ignores browser extension errors
- Filters out common non-actionable errors
- Reduces noise

### Backend (Express)

✅ **Server-side error tracking**
- Automatic Express error handler integration
- Captures all unhandled errors
- Includes request context

✅ **Performance Monitoring**
- Tracks API endpoint performance
- Identifies slow database queries
- Monitors response times

✅ **Request Context**
- Includes request headers, body, URL
- User information (if authenticated)
- Environment details

## Testing Sentry Integration

### Frontend Test

Add a test button to trigger an error:

```tsx
<button onClick={() => { throw new Error("Frontend Sentry test error!") }}>
  Test Sentry (Frontend)
</button>
```

Or use the console:
```javascript
Sentry.captureException(new Error("Test error"));
```

### Backend Test

Create a test endpoint or throw an error in an existing route:

```typescript
app.get('/api/test-sentry', (req, res) => {
  throw new Error("Backend Sentry test error!");
});
```

Then visit: `http://localhost:3001/api/test-sentry`

## Viewing Errors in Sentry

1. Go to your Sentry dashboard
2. Select the appropriate project (frontend or backend)
3. Click "Issues" to see all errors
4. Click on any issue to see:
   - Stack trace
   - Request details
   - User information
   - Breadcrumbs (actions leading up to error)
   - Environment info

## Monitoring & Alerts

### Set Up Alerts

1. Go to **Alerts** in Sentry
2. Click "Create Alert"
3. Choose trigger:
   - "Issues" - alert on new or regression errors
   - "Metric Alert" - alert on error rate/volume
4. Configure notifications (email, Slack, etc.)

### Recommended Alerts

- **New Issue Alert**: Get notified of new error types
- **High Error Rate**: Alert if >10 errors per minute
- **Performance Degradation**: Alert if response time >2s

## Performance Monitoring

### View Performance Data

1. Go to **Performance** in Sentry
2. See transaction lists (API endpoints, page loads)
3. Click any transaction to see:
   - Average duration
   - P50, P75, P95 percentiles
   - Slowest examples
   - Database query performance

### Adjusting Sample Rates

In production, you may want to reduce sample rates to control costs:

**Frontend** (`sentry.client.config.ts`):
```typescript
tracesSampleRate: 0.1, // 10% of transactions
replaysSessionSampleRate: 0.01, // 1% of sessions
```

**Backend** (`backend/src/index.ts`):
```typescript
tracesSampleRate: 0.1, // 10% of transactions
```

## Best Practices

### 1. Use Environments

Set appropriate environment tags:
- `development` - local dev
- `preview` - Vercel preview deployments
- `production` - live production

This is already configured via `NODE_ENV`.

### 2. Add Context to Errors

```typescript
// Frontend
Sentry.setUser({ id: user.id, email: user.email });
Sentry.setContext("subscription", { plan: user.subscriptionPlan });

// Backend
Sentry.setUser({ id: req.user.id });
Sentry.setTag("endpoint", req.path);
```

### 3. Handle Sensitive Data

Sentry automatically scrubs:
- Passwords
- Credit card numbers
- API keys

But you can add custom scrubbing in `beforeSend`:

```typescript
beforeSend(event, hint) {
  // Remove sensitive data
  if (event.request?.headers) {
    delete event.request.headers['Authorization'];
  }
  return event;
}
```

### 4. Release Tracking

Tag errors with release versions to track which deployments introduced bugs:

```bash
# Set in Vercel
SENTRY_RELEASE=$VERCEL_GIT_COMMIT_SHA

# Or manually
SENTRY_RELEASE=v1.2.3
```

## Troubleshooting

### No errors appearing in Sentry?

1. **Check DSN is set**: `console.log(process.env.NEXT_PUBLIC_SENTRY_DSN)`
2. **Verify initialization**: Look for Sentry init logs on startup
3. **Test with manual error**: Use test code above
4. **Check Sentry project is active**: Visit your Sentry dashboard
5. **Review network tab**: Look for requests to `sentry.io`

### Too many errors?

1. **Add filters** in `ignoreErrors` array (already configured)
2. **Use sampling**: Reduce `tracesSampleRate`
3. **Set up issue grouping**: Merge similar errors
4. **Mark as resolved**: Clear old errors

### Source maps not working?

1. **Check auth token**: Verify `SENTRY_AUTH_TOKEN` is set
2. **Enable in production**: Ensure not disabled in config
3. **Check build logs**: Look for "Sentry source maps uploaded"
4. **Verify release**: Check if release ID matches

## Cost Management

Sentry free tier includes:
- 5,000 errors/month
- 10,000 performance units/month
- 50 session replays/month

To stay within limits:
- Use appropriate sample rates
- Filter out non-actionable errors
- Set up issue grouping
- Review and resolve old issues

## Additional Resources

- [Sentry Next.js Docs](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Sentry Node.js Docs](https://docs.sentry.io/platforms/javascript/guides/node/)
- [Sentry Express Docs](https://docs.sentry.io/platforms/javascript/guides/express/)
- [Best Practices](https://docs.sentry.io/product/best-practices/)

## Support

For issues with Sentry integration:
1. Check Sentry documentation
2. Review error logs in both apps
3. Verify environment variables are set correctly
4. Test in development first before deploying to production
