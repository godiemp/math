# Codebase Exploration Summary - PAES Chile Math Platform

## Quick Overview

**PAES Chile** is a comprehensive mathematics learning platform for Chilean students preparing for the PAES university entrance exam. Built with Next.js, React, and Express.js, featuring an AI-powered tutor, interactive quizzes, live sessions, and complete analytics.

### In One Sentence
A full-featured ed-tech platform combining interactive practice quizzes, AI tutoring (Claude Sonnet 4.5), real-time competitions, and comprehensive progress tracking with subscription-based monetization.

---

## The 5-Minute Understanding

### What Users Can Do

**Students:**
1. Login/signup and access dashboard
2. Practice math in 2 modes: Zen (untimed) or Rapid Fire (timed)
3. Choose from M1 (basic) or M2 (advanced) competency levels
4. Chat with AI tutor for help understanding problems
5. Join live competitive practice sessions (ensayos) with others
6. Track progress via detailed analytics
7. Maintain daily practice streaks for gamification
8. Access complete curriculum documentation with examples

**Admins:**
1. Create and manage live practice sessions
2. View comprehensive analytics and usage metrics
3. Manage user subscriptions and feature access
4. Upload and extract problems from PDFs using AI
5. Manage question bank and generate dynamic questions
6. Monitor AI tutor interactions and costs
7. Access debug tools for testing

---

## Technology Stack (TL;DR)

```
Frontend:        Next.js 15 + React 19 + TypeScript
Backend:         Express.js + Node.js + TypeScript
Database:        PostgreSQL
AI:              Anthropic Claude Sonnet 4.5
Styling:         Tailwind CSS + Custom Design System
Math Rendering:  KaTeX (LaTeX formulas)
Testing:         Playwright E2E
Auth:            JWT + bcryptjs
Deployment:      Vercel-ready
```

---

## Current E2E Test Coverage

### 39 Tests Across 4 Files

```
✅ auth.spec.ts                 2 tests   (Login/page display)
✅ practice.spec.ts            11 tests  (M1 Zen + Rapid Fire)
✅ live-practice.spec.ts        6 tests  (Session registration)
✅ progress.spec.ts            20 tests  (Analytics & progress)
```

### Coverage by Feature

```
WELL TESTED (80%+)
  ✅ M1 Practice Mode (Zen)              - 5 tests
  ✅ M1 Practice Mode (Rapid Fire)       - 4 tests
  ✅ Progress Overview Tab               - 8 tests

PARTIALLY TESTED (30-60%)
  ⚠️ Live Session Registration           - 6 tests
  ⚠️ Quiz History/Details                - 6 tests
  ⚠️ Login/Authentication                - 2 tests
  ⚠️ Skills Tab Navigation               - 2 tests

NOT TESTED (0%)
  ❌ Admin Dashboard (all features)
  ❌ AI Tutor Chat
  ❌ M2 Practice
  ❌ Curriculum/Documentation
  ❌ Subscriptions/Paywall
  ❌ Streak System
  ❌ Study Buddy
  ❌ User Registration
  ❌ Subject-Specific Practice
```

---

## Application Routes Map

```
PUBLIC ROUTES
├─ /                      → Login/Signup landing
└─ /legal/*               → Legal pages (4 pages)

STUDENT ROUTES (Protected)
├─ /dashboard             → Main dashboard with streaks & sessions
├─ /practice/m1           → M1 practice (Zen + Rapid Fire modes) ✅ Tested
├─ /practice/m2           → M2 practice (untested)
├─ /live-practice         → Session registration interface ✅ Tested
├─ /progress              → Analytics multi-tab page ✅ Tested
│  ├─ Overview tab        → M1/M2 progress, recent questions
│  ├─ My Quizzes tab      → Quiz history with modal review
│  ├─ Skills M1 tab       → Skill mastery visualization
│  └─ Skills M2 tab       → Advanced skill tracking
└─ /curriculum/*          → Complete curriculum with LaTeX docs (untested)

ADMIN ROUTES (Protected, requires admin role)
├─ /admin/live-sessions   → Create/manage practice sessions (untested)
├─ /admin/users           → User management & subscriptions (untested)
├─ /admin/analytics       → General analytics dashboard (untested)
├─ /admin/ai-analytics    → AI tutor analytics & costs (untested)
├─ /admin/problems        → Question bank viewer (untested)
├─ /admin/upload          → PDF upload & AI extraction (untested)
├─ /admin/qgen            → Dynamic question generator management (untested)
├─ /admin/abstract-problems → Abstract problem generation (untested)
└─ /admin/*-debug         → Debug pages for testing (untested)
```

---

## Key Features Breakdown

### 1. Practice Modes
- **Zen**: Untimed, instant feedback, AI tutor available, review allowed
- **Rapid Fire**: Timed (4 difficulty levels), auto-advance, competitive scoring

### 2. Question Bank
- **M1**: 406 problems (Números 91, Álgebra 109, Geometría 106, Probabilidad 100)
- **M2**: 26 advanced problems
- **Subjects**: Numbers, Algebra, Geometry, Probability & Statistics
- **Features**: LaTeX rendering, difficulty ratings, explanations, skill tags

### 3. Quiz Tracking
- Database-backed (PostgreSQL)
- Quiz sessions group multiple attempts
- AI conversation persistence per quiz
- Detailed statistics (accuracy, time, topics)
- History with modal review

### 4. AI Tutor (Claude Sonnet 4.5)
- Socratic methodology
- Context-aware (knows question/options/explanation)
- Multi-turn conversations
- Integrated into Zen mode
- Persisted in database

### 5. Live Sessions
- Real-time competitive practice
- Status flow: Scheduled → Lobby → Active → Completed
- Registration with auto-update every 30s
- Participant leaderboards
- Multiple concurrent sessions

### 6. Gamification
- Daily streaks with persistent counter
- Badge display (🎯 🔥 ⚡ 🏆)
- Longest streak tracking
- Auto-update after practice

### 7. Skill System
- 500+ skills taxonomy
- Mastery levels: Not Started / Learning / Mastered
- Linked to curriculum
- Per-skill analytics

### 8. Subscription System
- Multiple plan tiers (Free, Basic, Premium)
- User states: Trial, Active, Expired, Cancelled
- Feature gating per plan
- Full admin management

### 9. Admin Features
- Session CRUD + monitoring
- User CRUD + subscriptions
- Analytics dashboard
- AI interaction tracking
- PDF upload with AI extraction
- QGen (Dynamic Question Generator) management
- Debug tools

### 10. Documentation System
- Full curriculum with examples
- LaTeX formula rendering
- Sidebar topic navigation
- Reading mode toggle
- Export functionality

---

## What's Missing Test Coverage

### Critical (Should Test ASAP)

1. **Admin Session Management** - 0% tested
   - Create, edit, delete sessions
   - Monitor participants
   - Estimated effort: 5-7 tests

2. **M2 Practice** - 0% tested
   - Verify M2 difficulty distinction
   - Same flows as M1
   - Estimated effort: 4-5 tests

3. **AI Tutor Chat** - 0% tested
   - Open modal, ask question, get response
   - Multi-turn conversation
   - Estimated effort: 3-4 tests

4. **Registration Flow** - 0% tested
   - Sign up new account
   - Email validation
   - Estimated effort: 2-3 tests

### Important (Should Add Soon)

5. **Subscriptions/Paywall** - 0% tested
6. **Curriculum Navigation** - 0% tested
7. **Streak System** - 0% tested
8. **Admin User Management** - 0% tested

### Nice to Have

9. **Accessibility** (keyboard, screen reader)
10. **Edge Cases** (errors, timeouts, offline)
11. **Performance** (load times, rendering)

---

## How to Run Tests

### Setup (One-time)
```bash
# 1. Install dependencies
npm install

# 2. Install Docker (required for tests)
# Download from https://www.docker.com/products/docker-desktop

# 3. Start test database
docker-compose -f docker-compose.test.yml up -d
```

### Run Tests (Each time)
```bash
# Terminal 1: Start backend server (port 3002)
cd backend
DATABASE_URL=postgresql://testuser:testpassword@localhost:5433/paes_test \
JWT_SECRET=test-jwt-secret \
PORT=3002 \
npm run dev

# Terminal 2: Start frontend (port 3000)
NEXT_PUBLIC_API_URL=http://localhost:3002 npm run dev

# Terminal 3: Run tests
npm run test:e2e              # Headless
npm run test:e2e:headed       # See browser
npm run test:e2e:ui           # Interactive mode
npm run test:e2e:report       # View report
```

### Test Credentials
- **Student**: student@test.com / student123
- **Admin**: admin@test.com / admin123

---

## File Locations

### Test Files
```
/e2e/auth.spec.ts            - Login tests (2)
/e2e/practice.spec.ts        - M1 quiz tests (11)
/e2e/live-practice.spec.ts   - Session tests (6)
/e2e/progress.spec.ts        - Progress tests (20)
/e2e/global-setup.ts         - Database seeding
/e2e/helpers/auth.ts         - Authentication helper
/e2e/helpers/db-setup.ts     - Database helper
```

### Main Application Files
```
/app/page.tsx                - Landing/auth page
/app/dashboard/page.tsx      - Student dashboard
/app/practice/m1/page.tsx    - M1 practice interface
/app/practice/m2/page.tsx    - M2 practice interface
/app/live-practice/page.tsx  - Live sessions page
/app/progress/page.tsx       - Progress tracking page
/app/curriculum/m1/page.tsx  - M1 curriculum page
/app/curriculum/m1/docs/... - Documentation pages
/app/admin/*/page.tsx        - Admin pages (11 pages)

/components/Quiz.tsx         - Main quiz component
/components/AIChatModal.tsx  - AI tutor chat
/components/LiveSession.tsx  - Live session component
/components/SkillsDisplay.tsx - Skills visualization
/components/Streak.tsx       - Streak display
/components/StudyBuddy.tsx   - AI companion
/components/Curriculum.tsx   - Curriculum viewer

/backend/src/routes/*.ts     - All API endpoint routes
/lib/questions/              - 432 math problems organized by level
```

### Configuration
```
/playwright.config.ts        - Playwright configuration
/package.json                - Dependencies & scripts
/backend/package.json        - Backend dependencies
/E2E_TEST_*.md              - Testing documentation
```

---

## Database Schema (PostgreSQL)

### Main Tables
```
users               - User accounts with roles
streaks             - Daily practice streak tracking
plans               - Subscription plan definitions
subscriptions       - User subscription assignments
quiz_sessions       - Grouped quiz attempts with AI chats
quiz_attempts       - Individual question responses
sessions            - Live practice sessions
session_participants - Registration tracking
session_answers     - Participant responses in sessions
problems            - Extracted problem bank
uploads             - PDF upload history
ai_interactions     - All AI tutor conversations
contexts, goals, templates - QGen system tables
```

---

## Dependencies Summary

### Frontend
- next@15.0.0, react@19.0.0, typescript@5.9.3
- tailwindcss for styling
- react-katex for LaTeX math
- @anthropic-ai/sdk for AI integration
- @playwright/test for E2E testing

### Backend
- express, @types/express
- pg (PostgreSQL client)
- jsonwebtoken for JWT auth
- bcryptjs for password hashing
- sharp for image processing
- pdf-parse, pdfjs-dist for PDF handling

---

## Key Metrics

- **Total Lines of Code**: ~50,000+
- **React Components**: 29 main components
- **API Endpoints**: 40+ endpoints
- **Database Tables**: 16+ tables
- **Test Coverage**: 39 tests (40% of critical flows)
- **Question Bank**: 432 problems
- **Skill Taxonomy**: 500+ skills
- **Documentation**: 10+ MD files

---

## Deployment Status

- **Frontend**: Vercel-ready (Next.js)
- **Backend**: Docker-ready (Express.js)
- **Database**: PostgreSQL production-ready
- **CI/CD**: GitHub Actions configured
- **Testing**: Full E2E pipeline ready

---

## Next Steps

### To Improve Test Coverage
1. Add admin session management tests (5-7 tests)
2. Add M2 practice tests (4-5 tests)
3. Add AI tutor tests (3-4 tests)
4. Add registration/subscription tests (5-6 tests)
5. Add curriculum navigation tests (3-4 tests)

### To Add New Features
1. Use Claude Code skills: `code-patterns` and `endpoint`
2. Follow established patterns (MVC for backend, hooks for frontend)
3. Add tests alongside features
4. Update documentation

### Resources
- Full analysis: `/CODEBASE_ANALYSIS_COMPREHENSIVE.md`
- Coverage summary: `/E2E_TEST_COVERAGE_SUMMARY.md`
- Test setup: `/E2E_TEST_SETUP.md`
- Test analysis: `/E2E_TEST_ANALYSIS.md`

---

## Questions Answered

**Q: What does the app do?**
A: It's a complete math learning platform for PAES prep with quizzes, AI tutor, live sessions, and analytics.

**Q: What E2E tests exist?**
A: 39 tests covering M1 practice (11), live sessions (6), progress tracking (20), and basic auth (2).

**Q: What features/routes exist?**
A: 27 routes including student pages (practice, progress, curriculum, dashboard), admin dashboard (11 pages), API endpoints (40+).

**Q: What's not tested?**
A: Admin features, AI chat, M2 level, curriculum, subscriptions, streaks, registration (0% tested = ~15 user flows not covered).

---

**Created**: November 11, 2025
**Status**: Complete codebase exploration with detailed E2E analysis
**Recommendation**: Start with admin session tests, then M2, then AI tutor for critical coverage
