# PAES Prediction Feature - Quick Reference Guide

## What You Have Available

### Raw Data
- **100,000+ question attempts** with full history
- **Per-question tracking**: answer, time, difficulty, subject, correctness
- **Timestamps**: Every attempt dated for trend analysis
- **Metadata**: Skills tested, cognitive levels, unit mapping

### Database Tables (Key for Prediction)
1. **question_attempts** - Core data (100K+ rows)
2. **quiz_sessions** - Group attempts into sessions
3. **abstract_problems** - Problem metadata (skills, difficulty scores)
4. **users** - Engagement (streaks, dates)
5. **ai_interactions** - Help-seeking behavior
6. **subscriptions** - Engagement signals

### Analytics Already Built
- **Admin Dashboard** - 350+ lines of analytics code
- **Accuracy by**: subject, difficulty, level, cognitive level
- **Engagement metrics**: streaks, retention, daily/weekly activity
- **Mode distribution**: Zen vs Rapid Fire usage patterns

### Integration Points
1. Dashboard widget
2. Progress page
3. Profile page
4. Post-quiz modal
5. Admin analytics section

---

## Implementation Checklist

### Phase 1: Backend Foundation
- [ ] Create `/backend/src/services/predictionService.ts`
- [ ] Add `paes_predictions` table to database
- [ ] Create prediction calculation logic
- [ ] Add API endpoints: `/api/prediction/*`
- [ ] Test with sample user data

### Phase 2: Data Model Design
- [ ] Define weighting factors
- [ ] Implement normalization (0-100 scale)
- [ ] Create temporal weighting (recent bias)
- [ ] Design confidence interval calculation
- [ ] Map cognitive levels to PAES scale

### Phase 3: Frontend Components
- [ ] Create `PaesScorePredictionWidget.tsx`
- [ ] Create `PredictionPage.tsx` or tab
- [ ] Add components to dashboard
- [ ] Add components to progress page
- [ ] Add post-quiz notification

### Phase 4: Admin Features
- [ ] Add prediction distribution chart
- [ ] Add user risk/opportunity identification
- [ ] Create improvement path suggestions
- [ ] Add prediction trends over time

---

## Key File Locations

| Purpose | Location |
|---------|----------|
| Database Schema | `/backend/src/config/database.ts` |
| Quiz Data Access | `/backend/src/controllers/quizController.ts` |
| Analytics Model | `/backend/src/controllers/analyticsController.ts` |
| User Stats UI | `/app/progress/page.tsx`, `/app/profile/page.tsx` |
| Dashboard | `/app/dashboard/page.tsx` |
| Components | `/components/` |

---

## Database Query Patterns

### Get User's Recent Accuracy
```sql
SELECT 
  difficulty,
  COUNT(*) as total,
  SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct,
  ROUND((SUM(CASE WHEN is_correct THEN 1 ELSE 0 END)::decimal / COUNT(*)) * 100, 2) as accuracy
FROM question_attempts
WHERE user_id = $1 AND attempted_at >= NOW() - INTERVAL '7 days'
GROUP BY difficulty;
```

### Get User's Subject Breakdown
```sql
SELECT 
  subject,
  COUNT(*) as total,
  SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct,
  AVG(time_spent_seconds) as avg_time
FROM question_attempts
WHERE user_id = $1
GROUP BY subject;
```

### Get Improvement Trend (Last 50 Attempts)
```sql
SELECT 
  is_correct,
  COUNT(*) as count,
  ROW_NUMBER() OVER (ORDER BY attempted_at DESC) as recency
FROM question_attempts
WHERE user_id = $1
ORDER BY attempted_at DESC
LIMIT 50;
```

---

## API Endpoint Design

### POST /api/prediction/calculate
```typescript
Request: { userId: string, level?: 'M1'|'M2' }

Response: {
  predictedScore: number,        // 500-850
  confidenceLow: number,
  confidenceHigh: number,
  scoreBySubject: {
    números: number,
    álgebra: number,
    geometría: number,
    probabilidad: number
  },
  improvementPotential: number,
  factors: {
    accuracyByDifficulty: {...},
    trendFactor: number,
    consistencyFactor: number,
    engagementFactor: number
  }
}
```

---

## Testing Approach

1. **Data Validation**: Ensure predictions are within 500-850 range
2. **Trend Testing**: Verify predictions increase with better performance
3. **Edge Cases**: Handle users with <5 attempts, single subject focus
4. **Backtesting**: Compare predictions against actual PAES score data (if available)
5. **Sanity Checks**: Predictions should improve after quiz session

---

## Performance Tips

- Cache predictions for 24 hours or until 10+ new attempts
- Use indexed columns (user_id, attempted_at)
- Batch calculate predictions during off-peak
- Limit historical data lookback to last 90 days for trending
- Consider Redis cache for frequently accessed predictions

---

## Documentation Files Created

1. **PAES_PREDICTION_ANALYSIS.md** - Comprehensive 11-section analysis
2. **PREDICTION_DATA_FLOW.md** - Data pipeline architecture
3. **QUICK_REFERENCE.md** - This file

All files saved in `/home/user/math/` directory.
