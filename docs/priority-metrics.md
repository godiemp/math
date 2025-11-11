# Priority Metrics for SimplePAES Platform

## Overview
This document defines the key metrics to track the success of the SimplePAES math practice platform. These metrics are organized by priority and category to help focus analytics implementation and dashboard development.

---

## 🎯 North Star Metrics (Highest Priority)

### 1. **Weekly Active Users (WAU)**
- **Definition**: Unique users who complete at least one practice session in a 7-day period
- **Why it matters**: Core indicator of platform engagement and value
- **Target**: Track growth week-over-week; aim for >50% retention rate
- **Calculation**: `COUNT(DISTINCT user_id) WHERE last_activity >= NOW() - 7 days`

### 2. **Student Performance Improvement Rate**
- **Definition**: Percentage of students showing accuracy improvement over time (comparing first 10 questions to most recent 10 questions)
- **Why it matters**: Direct measure of learning effectiveness - the core value proposition
- **Target**: >70% of active users should show improvement after 2+ weeks
- **Calculation**: `(Current 10-question accuracy - Initial 10-question accuracy) / Initial accuracy * 100`

### 3. **Practice Sessions Completion Rate**
- **Definition**: Percentage of started practice sessions that are completed (all questions answered)
- **Why it matters**: Indicates content quality, difficulty balance, and user engagement
- **Target**: >75% completion rate
- **Calculation**: `(Completed sessions / Started sessions) * 100`

---

## 📊 Core Engagement Metrics

### 4. **Daily Active Users (DAU)**
- **Definition**: Unique users who practice each day
- **Why it matters**: Measures daily engagement and habit formation
- **Target**: DAU/MAU ratio >20% (indicates sticky product)

### 5. **Average Questions Per Session**
- **Definition**: Mean number of questions answered per practice session
- **Why it matters**: Indicates session depth and user commitment
- **Target**: >8 questions per session (given 10 questions/quiz)
- **Segmentation**: Track by mode (Zen vs Rapid Fire)

### 6. **Study Streak Distribution**
- **Definition**: Number of users with current streaks of 3+, 7+, 14+, 30+ days
- **Why it matters**: Measures habit formation and long-term retention
- **Target**:
  - 30% of active users with 3+ day streaks
  - 15% with 7+ day streaks
  - 5% with 30+ day streaks

### 7. **Time Spent Per Session**
- **Definition**: Average session duration in minutes
- **Why it matters**: Indicates engagement depth
- **Target**:
  - Zen mode: 15-30 minutes
  - Rapid Fire: 10-25 minutes (based on difficulty)

---

## 🎓 Learning Effectiveness Metrics

### 8. **Overall Accuracy Rate**
- **Definition**: Percentage of questions answered correctly across all users
- **Why it matters**: Indicates if question difficulty is appropriate and if students are learning
- **Target**: 60-70% (too high = too easy, too low = too hard)
- **Segmentation**: By level (M1/M2), subject, difficulty, and student cohort

### 9. **Accuracy by Subject Area**
- **Definition**: Correct answer percentage for each of the 4 subjects:
  - Números
  - Álgebra y Funciones
  - Geometría
  - Probabilidad y Estadística
- **Why it matters**: Identifies content gaps and strengths
- **Target**: All subjects within 55-75% range (balanced coverage)

### 10. **Skill Mastery Progression**
- **Definition**:
  - % of skills in "mastered" state (≥80% accuracy, ≥3 attempts)
  - % of skills in "learning" state
  - % of skills "not-started"
- **Why it matters**: Tracks comprehensive curriculum coverage and student growth
- **Target**: After 30 days of use, average student should have:
  - 20% skills mastered
  - 40% skills in learning
  - 40% not started

### 11. **M1 to M2 Progression Rate**
- **Definition**: Percentage of users who start with M1 and progress to attempting M2 questions
- **Why it matters**: Indicates confidence building and advanced skill development
- **Target**: >30% of M1 users attempt M2 within 60 days

---

## 🚀 Feature Adoption Metrics

### 12. **Ensayo (Live Session) Participation Rate**
- **Definition**:
  - % of registered users who actually join the lobby
  - % of lobby users who complete the full ensayo
- **Why it matters**: Live sessions are a key differentiator - validates the feature's value
- **Target**:
  - 80% registration → lobby conversion
  - 90% lobby → completion rate

### 13. **Ensayo Registration Growth**
- **Definition**: Number of registrations per ensayo over time
- **Why it matters**: Indicates if the live feature is gaining traction
- **Target**: Week-over-week growth in registrations

### 14. **Practice Mode Distribution**
- **Definition**: Percentage split between Zen mode and Rapid Fire mode usage
- **Why it matters**: Shows which learning styles resonate with users
- **Target**: Both modes should see >30% usage (validates dual-mode approach)

### 15. **Rapid Fire Difficulty Selection**
- **Definition**: Distribution of users across Easy/Medium/Hard/Extreme difficulty levels
- **Why it matters**: Indicates user confidence and challenge-seeking behavior
- **Target**: Normal distribution curve showing growth toward harder difficulties over time

---

## 📈 Retention & Growth Metrics

### 16. **User Retention Rates**
- **Definition**:
  - D1 Retention: % of users who return 1 day after signup
  - D7 Retention: % who return after 7 days
  - D30 Retention: % who return after 30 days
- **Why it matters**: Critical for long-term success and word-of-mouth growth
- **Target**:
  - D1: >40%
  - D7: >30%
  - D30: >15%

### 17. **New User Activation Rate**
- **Definition**: % of new signups who complete their first full practice session within 24 hours
- **Why it matters**: Early engagement predicts long-term retention
- **Target**: >60% activation rate

### 18. **Week-over-Week Growth Rate**
- **Definition**: % increase in new signups compared to previous week
- **Why it matters**: Indicates organic growth and product-market fit
- **Target**: Sustained 5-10% weekly growth

---

## 🎯 Content & Quality Metrics

### 19. **Question Bank Coverage**
- **Definition**: Distribution of practice attempts across all 59 questions
- **Why it matters**: Ensures no "dead" questions and balanced exposure
- **Target**: All questions attempted at least 10 times per month (for statistical significance)

### 20. **Question Difficulty Calibration**
- **Definition**: Actual accuracy vs expected accuracy for each difficulty level
- **Why it matters**: Validates question tagging and ensures appropriate challenge
- **Target**:
  - Easy: 75-85% accuracy
  - Medium: 60-70% accuracy
  - Hard: 45-60% accuracy
  - Extreme: 30-50% accuracy

### 21. **Explanation View Rate**
- **Definition**: % of answered questions where students view the explanation
- **Why it matters**: Indicates learning behavior vs just answer-seeking
- **Target**: >70% of incorrect answers should trigger explanation views

---

## 🔧 Technical & Operational Metrics

### 22. **Session Error Rate**
- **Definition**: % of practice sessions that encounter technical errors
- **Why it matters**: Technical issues directly impact learning and retention
- **Target**: <1% error rate

### 23. **API Response Time**
- **Definition**: Average response time for critical endpoints (auth, questions, session data)
- **Why it matters**: Speed affects user experience and engagement
- **Target**:
  - p50: <200ms
  - p95: <500ms
  - p99: <1000ms

### 24. **Mobile vs Desktop Usage**
- **Definition**: Breakdown of sessions by device type
- **Why it matters**: Informs where to invest in UX improvements
- **Target**: Track trend; optimize for dominant platform

---

## 📋 Implementation Priority

### Phase 1 (Immediate - Essential for launch)
1. Weekly Active Users (WAU)
2. Practice Sessions Completion Rate
3. Overall Accuracy Rate
4. User Retention Rates (D1, D7, D30)
5. New User Activation Rate

### Phase 2 (Week 2-4 - Core analytics)
6. Student Performance Improvement Rate
7. Daily Active Users (DAU)
8. Study Streak Distribution
9. Accuracy by Subject Area
10. Ensayo Participation Rate
11. Practice Mode Distribution

### Phase 3 (Month 2+ - Advanced insights)
12. Skill Mastery Progression
13. M1 to M2 Progression Rate
14. Question Bank Coverage
15. Question Difficulty Calibration
16. Explanation View Rate
17. Time Spent Per Session

### Phase 4 (Ongoing - Optimization)
18. All remaining metrics for fine-tuning and optimization

---

## 🎯 Dashboard Requirements

### Student-Facing Dashboard
- Personal accuracy trends over time
- Skills mastery breakdown
- Current streak and longest streak
- Questions completed by subject
- M1/M2 progress comparison
- Upcoming ensayos and past performance

### Admin-Facing Dashboard
- All North Star Metrics (WAU, improvement rate, completion rate)
- User growth and retention curves
- Ensayo participation analytics
- Question performance matrix
- Subject area heatmap
- System health metrics

---

## 📊 Data Storage Requirements

To track these metrics, you'll need to store:

### Event Tracking
- User sessions (start, end, mode, level)
- Question attempts (question_id, user_id, answer, correct, timestamp)
- Ensayo participation (registration, join, completion)
- Page views and feature usage
- Error events

### Aggregated Data
- Daily/weekly/monthly user statistics
- Skill progress snapshots
- Streak calculations
- Performance trends per user

### Database Tables Needed
1. `analytics_events` - Raw event stream
2. `user_daily_stats` - Aggregated daily user metrics
3. `question_performance` - Question-level statistics
4. `skill_tracking` - User skill progress over time
5. `session_analytics` - Practice session metadata

---

## 🎓 Success Criteria

The platform is successful when:

1. ✅ **Engagement**: >1,000 WAU with >30% D7 retention
2. ✅ **Learning**: >70% of active users show improvement over time
3. ✅ **Completion**: >75% session completion rate
4. ✅ **Growth**: Sustained 5%+ week-over-week user growth
5. ✅ **Feature Adoption**: >50% of users try both Zen and Rapid Fire modes
6. ✅ **Live Feature**: Average 20+ participants per ensayo

---

## Next Steps

1. **Implement event tracking infrastructure** (use analytics service like Mixpanel, Amplitude, or build custom with PostgreSQL)
2. **Add tracking calls** to key user actions (login, start session, answer question, etc.)
3. **Build admin analytics dashboard** with Phase 1 metrics
4. **Set up automated reporting** (weekly email with key metrics)
5. **A/B testing framework** for optimizing conversion and engagement
