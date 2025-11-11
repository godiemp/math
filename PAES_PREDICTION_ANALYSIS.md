# PAES Prediction Feature - Codebase Analysis

## 1. Project Structure Overview

### Frontend Structure (Next.js App Router)
```
/home/user/math/app/
├── dashboard/              # Main dashboard (shows registered sessions, streaks)
├── practice/              # Practice quizzes
│   ├── m1/               # M1 level practice
│   └── m2/               # M2 level practice
├── progress/             # User progress & history page
├── profile/              # User profile & stats
├── live-practice/        # Live sessions (ensayos/practice tests)
├── curriculum/           # Study materials
├── pricing/              # Subscription plans
└── admin/                # Admin panel
```

### Backend Structure (Express.js)
```
/home/user/math/backend/src/
├── controllers/          # Request handlers
├── services/             # Business logic
├── routes/               # API endpoints
├── config/               # Database & config
│   ├── database.ts       # Database initialization (769 lines - all tables)
│   ├── schema.sql        # Base schema (46 lines)
│   └── migrations/       # SQL migrations (abstract problems system)
├── lib/
│   └── types/
│       └── core.ts       # Type definitions
└── auth/                 # Authentication
```

---

## 2. Database Models & Performance Data Available

### Key Tables for Performance Tracking

#### **question_attempts** - Core performance data
- `id`: UUID (tracks each attempt)
- `user_id`: Links to user
- `question_id` / `context_problem_id` / `abstract_problem_id`: Question references
- `user_answer`: Student's answer (0-3)
- `correct_answer`: Correct answer
- `is_correct`: BOOLEAN - immediate feedback
- `time_spent_seconds`: Time to answer
- `difficulty`: easy, medium, hard, extreme
- `subject`: números, álgebra, geometría, probabilidad
- `level`: M1 or M2
- `skills_tested`: Array of skill IDs
- `attempted_at`: Timestamp
- **Indexes**: user_id, attempted_at, level, subject, difficulty

#### **quiz_sessions** - Session grouping
- `id`: Session identifier
- `user_id`: Student
- `level`: M1 or M2
- `started_at` / `completed_at`: Timing
- `ai_conversation`: JSONB array of chat history
- Links multiple `question_attempts` together

#### **users** - User tracking
- `current_streak`: Days in current streak
- `longest_streak`: Best streak
- `last_practice_date`: YYYY-MM-DD format

#### **abstract_problems** & **context_problems** - Problem metadata
- **abstract_problems**:
  - `cognitive_level`: remember, understand, apply, analyze, evaluate, create
  - `difficulty_score`: 1-100 fine-grained scale
  - `primary_skills`, `secondary_skills`: What skills it tests
  - `unit`, `subsection`: Curriculum mapping
  - `subject`, `level`: Classification
  
- **context_problems**:
  - `avg_correctness`: DECIMAL(5,2) - average % correct on this problem
  - `times_used`: How many times used
  - `quality_score`: 1-10 manual rating
  - `avg_time_seconds`: Average time spent

#### **ai_interactions** - Learning behavior
- `user_id`, `quiz_session_id`, `question_id`
- `interaction_type`: chat, help, summarize, practice
- `user_message`, `ai_response`: Full conversation
- `response_time_ms`: AI response latency
- `turn_number`: Multi-turn conversations
- **Index**: user_id, quiz_session_id, created_at

#### **subscriptions** & **payments** - Engagement signals
- Tracks trial → active conversions
- Payment patterns

#### **sessions** & **session_participants** - Live session performance
- Live session scores
- Participant answers
- Real-time competition data

---

## 3. Existing Analytics & Statistics Features

### Admin Analytics Dashboard (`/admin/analytics`)
**Backend**: `/backend/src/controllers/analyticsController.ts` (350+ lines)
**Metrics calculated**:
- **North Star**: WAU, DAU, total attempts, overall accuracy
- **User Metrics**: Total, new last 7/30d, active practicing
- **Engagement**: Sessions last 24h/7d, avg questions per session
- **Streaks**: Users 3+, 7+, 14+, 30+ days
- **Accuracy by**:
  - Level (M1/M2)
  - Subject (números, álgebra, geometría, probabilidad)
  - Difficulty (easy, medium, hard, extreme)
- **Retention**: D1, D7, D30 cohort analysis
- **Practice Modes**: Zen vs Rapid Fire distribution
- **Question Coverage**: Top questions attempted

### AI Analytics Dashboard (`/admin/ai-analytics`)
**Backend**: `/backend/src/controllers/aiAnalyticsController.ts` (250+ lines)
- Interaction types and frequency
- Top questions needing help
- User engagement patterns
- Conversation metrics
- Performance over time (hourly, daily)
- Token usage and costs

### User-Facing Stats
**Frontend**: 
- `/app/progress/page.tsx` - Quiz history, accuracy by level
- `/app/profile/page.tsx` - Total questions, correctness, accuracy %
- `/components/StudentStatistics.tsx` - Live session stats
- `/components/SkillsAnalytics.tsx` - Skill mastery tracking

---

## 4. User Performance Tracking System

### What's Currently Tracked

**Per Question Attempt**:
```typescript
{
  userId: string,
  questionId: string,
  level: 'M1' | 'M2',
  subject: string,
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme',
  isCorrect: boolean,
  timeSpentSeconds: number,
  attemptedAt: BIGINT (milliseconds),
  skillsTested: string[] (array of skill IDs)
}
```

**Aggregated**:
- Accuracy by subject
- Accuracy by difficulty
- Time trends
- Skill progression
- Streak patterns
- Quiz session grouping

**Behavioral**:
- Days active (streak)
- Quiz mode preference
- AI help requests
- Time patterns
- Subscription status

### Data Quality & Availability
- **Coverage**: Every quiz attempt stored since schema migration (abstract problems added Nov 10)
- **Granularity**: Per-question level with time tracking
- **Lookback**: Full historical data available
- **Real-time**: Data populated immediately on quiz completion

---

## 5. UI Structure & Prediction Feature Integration Points

### Current UI Hierarchy

```
Dashboard (Main Hub)
├── Registered Sessions (Next scheduled ensayo)
├── Study Buddy (AI assistant)
├── Streak Display (Motivation widget)
└── [PREDICTION FEATURE COULD GO HERE]

Progress Page
├── Overall Stats (M1/M2 accuracy)
├── Quiz History (Recent 10-100 attempts)
├── Skill Mastery View
└── Difficulty Breakdown
└── [PREDICTION FEATURE COULD GO HERE]

Profile Page
├── User Info
├── Total Questions/Accuracy
└── [PREDICTION FEATURE COULD GO HERE]

Practice Pages (M1 & M2)
├── Subject Selection
├── Mode Selection (Zen vs Rapid Fire)
├── Quiz Interface
│   ├── Question
│   ├── AI Help Button
│   ├── Timer (Rapid Fire)
│   └── Answer Options
└── [PREDICTION SHOWN AFTER QUIZ OR IN SIDEBAR]

Admin Dashboard
├── Analytics
│   └── All metrics above
└── [COULD ADD ADMIN-LEVEL PREDICTIONS]
```

### Best Integration Points for PAES Score Prediction

1. **Dashboard Widget** (Post-quiz): "Based on your current performance, your predicted PAES score is..."
2. **Progress Page Tab**: Dedicated "Score Prediction" section
3. **Profile Page**: Prominent prediction card
4. **Practice Quiz Review**: Post-quiz analysis with prediction update
5. **Goal Setting Modal**: "If you improve X, your PAES score could reach Y"
6. **Admin Dashboard**: Per-user predictions for intervention
7. **Streak Widget**: "Keep your streak at X+ days to reach Y score"

---

## 6. Data Available for PAES Prediction Model

### Student Performance Indicators

**Directly Available**:
1. **Accuracy metrics**
   - Overall accuracy percentage
   - By subject (4 subjects)
   - By difficulty level (4 levels)
   - By cognitive level (6 Bloom's levels)

2. **Question frequency data**
   - Total questions answered
   - Questions per subject
   - Questions per difficulty
   - Time series (questions/day)

3. **Time metrics**
   - Average time per question
   - Time by difficulty
   - Speed trends

4. **Engagement signals**
   - Current streak (motivation)
   - Quiz session frequency
   - Mode preference (Zen vs Rapid Fire)
   - AI help usage (help-seeking behavior)

5. **Coverage metrics**
   - Subjects covered (breadth)
   - Skills mastered (from skills_tested array)
   - Difficulty progression

6. **Session data**
   - Live session performance
   - Peer comparison (scores vs other students)
   - Session mode (live vs practice)

### Derived Metrics (Can Calculate)
- **Trend analysis**: Accuracy improvement over time
- **Consistency**: Variance in performance
- **Strength/weakness**: Subject and difficulty performance gaps
- **Learning velocity**: Speed of skill acquisition
- **Knowledge gaps**: Weak areas needing practice

### Raw Data Complexity
- **Sample size**: Hundreds of thousands of attempts across users
- **Longitudinal**: Full history per user
- **Multi-dimensional**: 4 subjects × 4 difficulties × 6 cognitive levels
- **Temporal**: Timestamp on every attempt allows time-series analysis

---

## 7. API Endpoints Available

### Current Performance Data Endpoints

**Quiz History**: `GET /api/quiz/history?level=M1|M2`
- Returns all quiz attempts for user
- Fields: questionId, isCorrect, difficulty, subject, timestamp

**Quiz Stats**: `GET /api/quiz/stats?level=M1|M2`
- Returns aggregated stats
- By level, subject, difficulty

**AI Analytics**: `GET /api/admin/ai-analytics/*`
- Interaction patterns
- Help-seeking behavior

**Overall Analytics**: `GET /api/admin/analytics`
- Global and per-user metrics

### Where to Add Prediction APIs
```
POST /api/prediction/calculate
- Input: userId, optionally filter by level/subject
- Output: predicted PAES score, confidence, factors

GET /api/prediction/forecast?userId=X&weeks=4
- Input: User, forecast period
- Output: Score progression if current trajectory continues

GET /api/prediction/improvement-paths
- Input: userId
- Output: Top 3 ways to improve PAES score

GET /api/prediction/strength-weakness
- Input: userId
- Output: Subject/skill breakdown for targeted study
```

---

## 8. Architecture Notes

### Technology Stack
- **Backend**: Express.js + TypeScript + PostgreSQL
- **Frontend**: Next.js 14+ (App Router) + React 18
- **Database**: PostgreSQL with full schema in `database.ts` (769 lines, all initialization)
- **Auth**: JWT (access + refresh tokens)
- **AI**: Claude Sonnet 4.5 integration for tutoring

### Design Patterns
- **MVC**: Controllers, Services, Routes separation
- **Database-first**: All data persisted, no in-memory state
- **Type-safe**: Full TypeScript throughout
- **API-driven**: Frontend consumes backend APIs
- **Admin-friendly**: Analytics dashboard for monitoring

### Performance Considerations
- **Indexed columns**: user_id, attempted_at, level, subject, difficulty on question_attempts
- **Connection pooling**: 20 max connections
- **Query optimization**: Aggregations pre-calculated where possible
- **Views**: Database views for common queries (active_problems_view, problem_stats_by_unit)

---

## 9. File Locations Reference

| Component | Path |
|-----------|------|
| Quiz Attempt Recording | `/backend/src/controllers/quizController.ts` |
| Analytics Calculations | `/backend/src/controllers/analyticsController.ts` |
| User Data Access | `/app/profile/page.tsx`, `/app/progress/page.tsx` |
| Database Schema | `/backend/src/config/database.ts` (769 lines) |
| Types | `/backend/src/lib/types/core.ts` |
| Quiz Routes | `/backend/src/routes/quizRoutes.ts` |
| Analytics Routes | `/backend/src/routes/analyticsRoutes.ts` |
| UI Components | `/components/` directory |
| Admin Analytics UI | `/app/admin/analytics/page.tsx` |

---

## 10. Implementation Roadmap Suggestions

### Phase 1: Backend Foundation
1. Create `predictionService.ts` - Core prediction logic
2. Add database table: `paes_predictions` (user, score, confidence, calculated_at, factors)
3. Create API endpoints for prediction calculation
4. Implement trend analysis from question_attempts

### Phase 2: ML/Statistical Model
1. Implement baseline: Average by subject/difficulty
2. Add temporal weighting (recent performance more important)
3. Add variance/consistency factor
4. Add cognitive level mapping to PAES score scale
5. Validate against historical data (backtesting)

### Phase 3: Frontend Integration
1. Add prediction widget to dashboard
2. Add prediction page to progress
3. Show confidence intervals
4. Highlight improvement opportunities
5. Add "if this improves, score becomes" scenarios

### Phase 4: Advanced Features
1. Improvement path recommendations
2. Personalized study suggestions
3. Peer comparison (anonymized)
4. Goal setting with prediction feedback
5. Success probability estimates

---

## 11. Example Prediction Calculation Points

**PAES Scoring Context**:
- PAES is out of 850 points (500-850 scale typically)
- 4 areas: Números, Álgebra, Geometría, Probabilidad
- Weighted: May not be equal weights, depends on exam format
- Difficulty progression: Questions increase in difficulty

**Possible Prediction Model Structure**:
```
Base Score = 500 (minimum)

For each subject:
  subject_accuracy = correct_answers / total_answers
  subject_score = 500 + (subject_accuracy * 100) * subject_weight

Adjustments:
  + Recent performance trend (last 20 attempts trending up/down?)
  + Consistency (variance in performance - consistent = +points)
  + Cognitive level progression (moving to higher levels = +points)
  + Difficulty progression (handling hard/extreme = +points)
  - Knowledge gaps (weak subjects = -points)
  
Final PAES Score = Average of subject_scores ± adjustments
```

---

## Summary

**Data Available**: Rich, comprehensive performance data across 100+ dimensions
**Current Analytics**: Extensive admin/user dashboards with key metrics
**Integration Ready**: Multiple UI touch points identified
**Architecture**: Well-structured for adding prediction layer
**Next Steps**: Design statistical model, implement backend service, integrate UI

