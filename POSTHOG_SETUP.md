# PostHog Analytics Setup Guide

## Overview

SimplePAES now uses PostHog for product analytics, feature flags, and session replay. This guide will help you set up PostHog for development and production environments.

---

## Quick Start (5 Minutes)

### 1. Create PostHog Account

1. Go to [https://posthog.com/signup](https://posthog.com/signup)
2. Sign up with your email (free tier includes 1M events/month)
3. Choose **EU Cloud** for GDPR compliance (recommended for Chilean market)
4. Create a new project for SimplePAES

### 2. Get Your API Keys

After creating your project:

1. Go to **Project Settings** → **Project API Key**
2. Copy your **Project API Key** (starts with `phc_...`)
3. Note your **API Host** (usually `https://eu.posthog.com` for EU region)

### 3. Configure Environment Variables

Add these variables to your `.env.local` file:

```bash
# PostHog Analytics Configuration
NEXT_PUBLIC_POSTHOG_KEY=phc_your_project_api_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://eu.posthog.com
```

**Important:** Use the EU host (`https://eu.posthog.com`) for better privacy compliance.

### 4. Verify Installation

1. Start your development server: `npm run dev`
2. Open your app in the browser
3. Check browser console for:
   - `PostHog initialized successfully` (in dev mode)
   - `PostHog proxy enabled: events will be sent to /api/ingest/*`
4. Open Network tab and verify requests go to `/api/ingest/*` (not blocked by ad-blockers)
5. Go to PostHog dashboard → **Activity** to see events flowing in

**Note:** PostHog events are sent through a reverse proxy at `/api/ingest/*` to bypass ad-blockers. This ensures reliable tracking even when users have ad-blocking extensions enabled.

---

## What's Already Instrumented

The following events are automatically tracked:

### Authentication Events
- `user_signed_up` - When a new user registers
- `user_logged_in` - When a user logs in

**Properties tracked:**
- `email`, `username`, `displayName`, `role`, `subscriptionStatus`, `currentStreak`

### Quiz Events
- `quiz_started` - When a quiz begins (after intro animation)
- `quiz_completed` - When a quiz is submitted

**Properties tracked:**
- `level` (M1/M2), `mode` (zen/rapid-fire), `difficulty`, `subject`
- `questionsAnswered`, `correctAnswers`, `accuracy`, `timeSpent`

### AI Tutor Events
- `ai_tutor_opened` - When AI chat modal is opened
- `ai_message_sent` - When user sends a message to AI

**Properties tracked:**
- `questionId`, `context` (correct_answer/wrong_answer), `quizMode`
- `messageLength`, `turnNumber`

### Payment Events
- `pricing_viewed` - When user visits pricing page
- `checkout_started` - When user clicks subscribe
- `payment_completed` - When payment is successful

**Properties tracked:**
- `plan`, `planId`, `amount`, `currency`, `paymentMethod`

---

## PostHog Dashboard Overview

### Key Dashboards to Create

#### 1. Activation Funnel
Track how users progress from signup to first quiz:

```
Step 1: user_signed_up
Step 2: quiz_started (within 24 hours)
Step 3: quiz_completed (within 24 hours)
```

**Target Metric:** 40%+ activation rate

#### 2. Subscription Funnel
Track conversion from free to paid:

```
Step 1: pricing_viewed
Step 2: checkout_started
Step 3: payment_completed
```

**Target Metric:** 15%+ conversion rate

#### 3. Engagement Dashboard
Key metrics to monitor:

- **DAU/WAU:** Daily/Weekly Active Users
- **Quiz completion rate:** % of started quizzes that are completed
- **AI tutor adoption:** % of users who use AI tutor
- **Average accuracy:** Overall performance metric

---

## Feature Flags Setup

### Creating Your First Feature Flag

1. Go to PostHog → **Feature Flags**
2. Click **New Feature Flag**
3. Name: `paes-prediction-enabled`
4. Set rollout to `100%` (or start with `10%` for gradual rollout)
5. Click **Save**

### Using Feature Flags in Code

The feature flag wrapper is already implemented. Example usage:

```typescript
import { analytics } from '@/lib/analytics'

export function MyComponent() {
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    setIsEnabled(analytics.getFeatureFlag('paes-prediction-enabled'))
  }, [])

  if (!isEnabled) return null

  return <div>New feature!</div>
}
```

**Or use the React hook:**

```typescript
import { useFeatureFlag } from '@/lib/analytics'

export function MyComponent() {
  const isEnabled = useFeatureFlag('new-feature')

  if (!isEnabled) return null

  return <div>New feature!</div>
}
```

### Recommended Feature Flags to Create

1. **`paes-prediction-enabled`** - Control PAES score prediction feature
2. **`new-ai-tutor-ui`** - Test new AI tutor interface
3. **`live-sessions-v2`** - Gradual rollout of new live session features
4. **`premium-analytics`** - Show/hide premium analytics features
5. **`social-features`** - Enable social features (friend system, etc.)

---

## Session Replay

### What's Configured

Session replay is **enabled** by default with these settings:

- **Sampling:** 10% of sessions (to stay in free tier longer)
- **Mask inputs:** Yes (passwords, emails are automatically masked)
- **Mask text:** Yes (for data with `data-mask` attribute)

### Watching Session Replays

1. Go to PostHog → **Session Replay**
2. Filter by:
   - Users who churned
   - Users who had errors
   - Users who completed specific funnels
3. Click on a session to watch the recording

### Disabling Sensitive Data Recording

Add `data-mask` attribute to any element you want to mask:

```html
<div data-mask>Sensitive information here</div>
```

---

## Advanced: User Identification

### When Users Log In

The `analytics.identify()` function is called automatically after login/registration in `components/Auth.tsx`.

### Updating User Properties

To enrich user profiles with additional data:

```typescript
import { analytics } from '@/lib/analytics'

// After user completes milestone
analytics.setUserProperties({
  totalQuizzes: user.totalQuizzes,
  skillLevel: 'advanced',
  lifetimeValue: user.totalSpent,
})
```

---

## Troubleshooting

### Events Not Showing Up

1. **Check environment variables:**
   ```bash
   echo $NEXT_PUBLIC_POSTHOG_KEY
   ```
   Should print your API key (starts with `phc_`)

2. **Check browser console:**
   - Look for `PostHog initialized successfully` message
   - Look for any PostHog errors

3. **Verify PostHog is loading:**
   ```javascript
   // In browser console
   console.log(window.posthog)
   ```
   Should print PostHog object (not undefined)

4. **Check network tab:**
   - Look for requests to `eu.posthog.com/batch/`
   - Events are batched and sent every few seconds

### Session Replay Not Working

1. **Verify sampling rate:**
   Check `lib/analytics.ts` → `session_recording.sampling`

2. **Force recording for testing:**
   ```typescript
   analytics.startRecording()
   ```

3. **Check recording console:**
   PostHog → Session Replay → Check if recordings appear after a few minutes

### Feature Flags Not Working

1. **Verify flag exists in PostHog dashboard**
2. **Check flag key matches exactly** (case-sensitive)
3. **Wait for flag to load:**
   ```typescript
   useEffect(() => {
     setTimeout(() => {
       setFlag(analytics.getFeatureFlag('my-flag'))
     }, 1000) // Give PostHog time to load
   }, [])
   ```

---

## Cost Management

### Staying in Free Tier

**Free tier limits:**
- 1,000,000 events/month
- 5,000 session recordings/month
- Unlimited feature flags
- Unlimited team members

**Tips to stay under limits:**

1. **Reduce sampling for session replay:**
   - Edit `lib/analytics.ts`
   - Change `sampling: 0.1` to `sampling: 0.05` (5%)

2. **Track only important events:**
   - Don't track every page view
   - Don't track every click
   - Focus on conversion and engagement events

3. **Monitor usage:**
   - PostHog → **Billing** → See current usage
   - You'll get warnings before hitting paid tier

### When You'll Need to Pay

You'll hit paid tier at approximately:
- **10,000-15,000 monthly active users** (with typical event tracking)
- **Cost at that scale:** ~$155-500/month

**Good news:** By then, you can afford it! 🎉

---

## Privacy & Compliance

### GDPR Compliance

PostHog EU region is GDPR compliant:
- ✅ Data stored in EU
- ✅ GDPR-compliant data processing agreement
- ✅ Right to deletion (via PostHog API)
- ✅ Data anonymization options

### Chilean Data Privacy Law (Ley 19.628)

PostHog setup complies with Chilean privacy law:
- ✅ No sensitive personal data tracked
- ✅ Users can request data deletion
- ✅ Clear privacy policy disclosure required

**Action item:** Update your privacy policy to mention PostHog analytics.

### Opt-Out Support

To allow users to opt out of tracking:

```typescript
// Add to your privacy settings page
import { posthog } from '@/lib/analytics'

function PrivacySettings() {
  const handleOptOut = () => {
    posthog.opt_out_capturing()
    toast.success('Analytics disabled')
  }

  return (
    <button onClick={handleOptOut}>
      Disable Analytics
    </button>
  )
}
```

---

## Next Steps

### Week 1: Get Familiar
1. ✅ Set up PostHog account
2. ✅ Configure environment variables
3. ✅ Verify events are flowing
4. Create your first funnel (activation or subscription)

### Week 2: Build Dashboards
1. Create activation funnel
2. Create subscription funnel
3. Set up engagement dashboard
4. Share dashboards with team

### Week 3: Feature Flags
1. Create first feature flag
2. Test gradual rollout (10% → 50% → 100%)
3. Run A/B test on pricing page CTA

### Week 4: Optimize
1. Review session replays
2. Identify UX friction points
3. Fix top 3 issues
4. Measure impact

---

## Useful Resources

- **PostHog Docs:** https://posthog.com/docs
- **Event Tracking Best Practices:** https://posthog.com/docs/product-analytics/best-practices
- **Feature Flags Guide:** https://posthog.com/docs/feature-flags
- **Session Replay Guide:** https://posthog.com/docs/session-replay

---

## Support

- **PostHog Community:** https://posthog.com/questions
- **PostHog Slack:** https://posthog.com/slack
- **Documentation:** https://posthog.com/docs

---

## Summary

You now have a complete product analytics setup with:

✅ **Event tracking** - 8+ critical events instrumented
✅ **User identification** - Automatic on login/registration
✅ **Feature flags** - Ready for A/B testing and gradual rollouts
✅ **Session replay** - 10% of sessions recorded
✅ **Privacy compliance** - GDPR and Chilean law compliant

**Start tracking, start learning, start optimizing!** 🚀
