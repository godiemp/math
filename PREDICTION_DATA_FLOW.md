# PAES Prediction Feature - Data Flow Architecture

## Data Collection Pipeline

```
┌─────────────────────────────────────────────────────────────────────┐
│                         STUDENT INTERACTIONS                         │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
        ┌───────────────────────────────────────────────┐
        │  Practice Quiz / Live Session / Study Buddy  │
        │  (Frontend: /app/practice or /live-practice) │
        └───────────────────────────────────────────────┘
                                    │
                                    ▼
        ┌───────────────────────────────────────────────┐
        │     Submit Answer + Time + Context Data       │
        │     (POST /api/quiz/attempt or /attempts)    │
        └───────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         DATABASE STORAGE                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  question_attempts TABLE:                                           │
│  ├─ id (UUID)                                                       │
│  ├─ user_id (VARCHAR)                   ◄── PRIMARY KEY             │
│  ├─ is_correct (BOOLEAN)                ◄── PREDICTION INPUT        │
│  ├─ difficulty (easy/medium/hard)       ◄── PREDICTION INPUT        │
│  ├─ subject (números/álgebra/...)       ◄── PREDICTION INPUT        │
│  ├─ time_spent_seconds (INTEGER)        ◄── PREDICTION INPUT        │
│  ├─ skills_tested (TEXT[])              ◄── PREDICTION INPUT        │
│  ├─ attempted_at (BIGINT)               ◄── TEMPORAL DATA           │
│  └─ level (M1/M2)                       ◄── PREDICTION INPUT        │
│                                                                       │
│  Indexes on: user_id, attempted_at, level, subject, difficulty      │
│  Sample size: 100,000+ attempts available                            │
│                                                                       │
│  Linked to:                                                          │
│  ├─ abstract_problems (skills, cognitive_level, unit mapping)       │
│  ├─ users (streak data, engagement)                                 │
│  ├─ quiz_sessions (grouping attempts into sessions)                 │
│  └─ ai_interactions (help-seeking behavior)                         │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    ANALYTICS AGGREGATION LAYER                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Existing Calculations (in analyticsController.ts):                │
│  ├─ Overall accuracy by level                                       │
│  ├─ Accuracy by subject (4 categories)                             │
│  ├─ Accuracy by difficulty (4 levels)                              │
│  ├─ Retention metrics (D1, D7, D30)                                 │
│  ├─ Streak distribution                                             │
│  └─ Practice mode preferences                                        │
│                                                                       │
│  Available endpoints:                                                │
│  ├─ GET /api/quiz/history?level=M1   ◄── FETCH RAW DATA             │
│  ├─ GET /api/quiz/stats?level=M1     ◄── AGGREGATED STATS           │
│  ├─ GET /api/admin/analytics         ◄── GLOBAL METRICS             │
│  └─ GET /api/admin/ai-analytics      ◄── HELP-SEEKING PATTERNS      │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│              PREDICTION SERVICE (NEW - TO BE IMPLEMENTED)           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Input Metrics (from aggregation layer):                            │
│  ├─ accuracy_by_subject: {números, álgebra, geometría, ...}        │
│  ├─ accuracy_by_difficulty: {easy, medium, hard, extreme}          │
│  ├─ accuracy_trend: recent vs older (weighted)                      │
│  ├─ consistency_score: variance in performance                      │
│  ├─ cognitive_level_progression: remember→understand→apply→...     │
│  ├─ coverage_score: how many unique topics/skills covered           │
│  ├─ engagement_score: streak, frequency, mode preference            │
│  └─ help_seeking_pattern: self-sufficient vs needs help             │
│                                                                       │
│  Processing:                                                         │
│  ├─ Normalize all metrics (0-100 scale)                             │
│  ├─ Weight metrics (configurable per factor)                        │
│  ├─ Apply temporal decay (recent > older)                           │
│  ├─ Subject-specific scaling (may not be equal PAES weight)        │
│  └─ Add confidence bounds                                            │
│                                                                       │
│  Output:                                                             │
│  ├─ predicted_paes_score (500-850 scale)                           │
│  ├─ confidence_interval (± range)                                   │
│  ├─ score_by_subject (individual subject predictions)               │
│  ├─ improvement_potential (highest upside)                          │
│  ├─ risk_factors (knowledge gaps)                                   │
│  └─ time_to_predict_score (if trend continues)                     │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      STORAGE OF PREDICTIONS                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  New Table: paes_predictions                                         │
│  ├─ id (SERIAL PRIMARY KEY)                                         │
│  ├─ user_id (VARCHAR)                                               │
│  ├─ predicted_score (INTEGER, 500-850)                              │
│  ├─ confidence_low (INTEGER)                                        │
│  ├─ confidence_high (INTEGER)                                       │
│  ├─ score_numbers (INTEGER)                                         │
│  ├─ score_algebra (INTEGER)                                         │
│  ├─ score_geometry (INTEGER)                                        │
│  ├─ score_probability (INTEGER)                                     │
│  ├─ improvement_potential (INTEGER, estimated gain)                 │
│  ├─ calculation_factors (JSONB - breakdown)                         │
│  ├─ calculated_at (BIGINT)                                          │
│  └─ valid_until (BIGINT - recalc after N new attempts)             │
│                                                                       │
│  Updated: After each quiz completion or on-demand                   │
│  Indexed: user_id, calculated_at                                    │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      API ENDPOINTS FOR FRONTEND                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  POST /api/prediction/calculate                                      │
│  ├─ Input: { userId, level?, subject? }                            │
│  └─ Output: { predictedScore, confidence, scoreBreakdown }          │
│                                                                       │
│  GET /api/prediction/current                                         │
│  ├─ Input: userId (from JWT)                                       │
│  └─ Output: latest prediction data                                   │
│                                                                       │
│  GET /api/prediction/forecast?weeks=4                               │
│  ├─ Input: userId, time horizon                                    │
│  └─ Output: score progression if trend continues                    │
│                                                                       │
│  GET /api/prediction/improvement-paths                              │
│  ├─ Input: userId                                                  │
│  └─ Output: top 3 ways to improve (focus areas)                    │
│                                                                       │
│  GET /api/prediction/strength-weakness                              │
│  ├─ Input: userId                                                  │
│  └─ Output: subject breakdown, gaps, opportunities                 │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     FRONTEND PRESENTATION LAYER                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Integration Points:                                                 │
│                                                                       │
│  1. DASHBOARD (/dashboard)                                          │
│     └─ Prediction widget below streak                               │
│        "Your predicted PAES: 720 (±30) | See details →"            │
│                                                                       │
│  2. PROGRESS PAGE (/progress)                                       │
│     └─ New tab: "PAES Prediction"                                   │
│        ├─ Current prediction with confidence                        │
│        ├─ Score by subject breakdown                                │
│        ├─ 4-week forecast chart                                     │
│        ├─ Improvement opportunities                                 │
│        └─ "If you improve [subject], score becomes..."             │
│                                                                       │
│  3. PROFILE PAGE (/profile)                                         │
│     └─ Prediction card above stats                                  │
│        "Based on your performance, PAES: 720"                       │
│                                                                       │
│  4. POST-QUIZ MODAL                                                  │
│     └─ Show updated prediction after each session                   │
│        "Your updated PAES prediction is now 725 (was 720)"         │
│                                                                       │
│  5. ADMIN DASHBOARD (/admin/analytics)                              │
│     └─ New section: "User Predictions"                              │
│        ├─ Prediction distribution chart                             │
│        ├─ Users at risk (declining trend)                           │
│        └─ Users with high potential (improving)                     │
│                                                                       │
│  Frontend Components (New):                                          │
│  ├─ PaesScorePredictionWidget.tsx                                  │
│  ├─ PaesScoreForecastChart.tsx                                     │
│  ├─ ImprovementOpportunitiesCard.tsx                                │
│  └─ ScoreBySubjectBreakdown.tsx                                    │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## Key Data Transformations

```
┌─────────────────────────────────────┐
│  Raw Question Attempts (100,000+)   │
│  ├─ individual answers              │
│  ├─ timestamps                       │
│  └─ metadata (subject, difficulty)   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Aggregations by Dimension          │
│  ├─ by subject (4 groups)           │
│  ├─ by difficulty (4 groups)        │
│  ├─ by cognitive level (6 groups)   │
│  └─ by time window (recent bias)    │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Normalized Metrics (0-100)         │
│  ├─ accuracy metrics                 │
│  ├─ engagement metrics               │
│  ├─ consistency metrics              │
│  └─ trend metrics                    │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Weighted Score Combination         │
│  ├─ factor_1 * weight_1             │
│  ├─ factor_2 * weight_2             │
│  ├─ ...                              │
│  └─ sum with constraints             │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  PAES Score Prediction (500-850)    │
│  ├─ point estimate                   │
│  ├─ confidence interval              │
│  └─ component breakdown              │
└─────────────────────────────────────┘
```

## Real-time Update Flow

```
Question Answered
     │
     ▼
Save to question_attempts
     │
     ▼
After quiz completion:
     ├─ Trigger calculation? (check if significantly different)
     │
     ▼
Calculate new prediction
     │
     ├─ Store in paes_predictions
     │ 
     ├─ Update cache (Redis optional)
     │
     └─ Return to frontend
     
Frontend:
     ├─ Show "Your prediction updated: X → Y"
     │
     └─ Refresh dashboard widget
```

## Performance Considerations

- **Caching**: Store predictions for N hours or until 10 new attempts
- **Batch Calculation**: Recalculate during off-peak if not accessed
- **Indexes**: user_id, attempted_at on question_attempts critical
- **Query Optimization**: Pre-aggregate by time windows
- **Data Retention**: Keep full history, but weight recent data heavily

