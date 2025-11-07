# PAES Chile - Plataforma de Preparación Matemática

A full-stack web application designed to help Chilean students prepare for the PAES (Prueba de Acceso a la Educación Superior) math exam.

## Overview

PAES Chile is a complete practice platform featuring:

- **Interactive Practice Quizzes** - Study at your own pace or challenge yourself with timed tests
- **Live Practice Sessions (Ensayos)** - Join scheduled PAES simulations with other students
- **Progress Tracking** - Monitor your performance across topics and difficulty levels
- **Two Competency Levels** - M1 (basic) and M2 (advanced) aligned with PAES standards
- **Admin Dashboard** - Manage live sessions and view the problem bank

## Features

### 🎯 Practice Modes

**Zen Mode** - Study without time pressure
- Take as long as you need per question
- Review explanations immediately
- Focus on learning and understanding

**Rapid Fire Mode** - Timed practice challenges
- Choose your difficulty: Easy (25 min), Medium (20 min), Hard (15 min), Extreme (10 min)
- 10 questions per session
- Simulates exam pressure

### 📝 Live Practice Sessions (Ensayos PAES)

- **Schedule & Register** - Sign up for upcoming ensayos
- **Lobby System** - Join before the session starts
- **Real-time Practice** - Compete with other students
- **Instant Results** - See your score and compare with peers

### 📊 Comprehensive Content Coverage

The platform covers all four PAES math areas:

1. **Números** - Fractions, percentages, powers, roots, proportions, divisibility
2. **Álgebra y Funciones** - Equations, functions, systems, factoring, quadratics
3. **Geometría** - Area, perimeter, volume, coordinate geometry, Pythagorean theorem
4. **Probabilidad y Estadística** - Mean, median, mode, probability, combinations

### 🎓 Two Competency Levels

- **M1 (Competencia Matemática 1)** - 46 problems covering basic math concepts for all university programs
- **M2 (Competencia Matemática 2)** - 13 advanced problems for science and engineering careers

### 👨‍💼 Admin Features

- Create and schedule live practice sessions
- View all problems in the question bank
- Filter by level, subject, and difficulty
- Monitor registered users and session participation

## Technology Stack

### Frontend
- **Framework**: Next.js 15.0.0 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Math Rendering**: KaTeX for LaTeX expressions
- **State Management**: React Context API

### Backend
- **Runtime**: Node.js with Express
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens) with bcrypt
- **API**: RESTful endpoints

### Key Libraries
- `react-katex` - Math expression rendering
- `clsx` & `tailwind-merge` - Utility-first styling
- `jsonwebtoken` - Secure authentication
- `pg` - PostgreSQL client

## Project Structure

```
/home/user/math/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Landing page with authentication
│   ├── dashboard/                # Main student dashboard
│   ├── practice/                 # Practice quiz pages (M1/M2)
│   ├── curriculum/               # Curriculum overview pages
│   ├── live-practice/            # Live session interface
│   ├── progress/                 # Progress tracking page
│   └── admin/                    # Admin dashboard and tools
├── backend/                      # Express.js backend
│   ├── src/
│   │   ├── index.ts              # Server entry point
│   │   ├── controllers/          # Route controllers
│   │   ├── middleware/           # Auth middleware
│   │   ├── routes/               # API routes
│   │   ├── config/               # Database config
│   │   └── utils/                # JWT utilities
│   └── package.json
├── components/                   # React components
│   ├── Quiz.tsx                  # Main quiz component
│   ├── LiveSession.tsx           # Live practice session
│   ├── Curriculum.tsx            # Curriculum display
│   ├── MathDisplay.tsx           # KaTeX math rendering
│   ├── GeometryCanvas.tsx        # Visual geometry problems
│   ├── Auth.tsx                  # Login/register forms
│   ├── ProtectedRoute.tsx        # Route protection
│   └── ui/                       # Reusable UI components
├── contexts/                     # React Context providers
│   └── AuthContext.tsx           # Authentication state
├── lib/                          # Core logic and data
│   ├── questions/                # Question bank by module
│   │   ├── m1-numeros.ts
│   │   ├── m1-algebra.ts
│   │   ├── m1-geometria.ts
│   │   ├── m1-probabilidad.ts
│   │   ├── m2-numeros.ts
│   │   ├── m2-algebra.ts
│   │   ├── m2-geometria.ts
│   │   └── m2-probabilidad.ts
│   ├── questions.ts              # Question aggregation and utilities
│   ├── types.ts                  # TypeScript interfaces
│   ├── auth.ts                   # Client-side auth logic
│   ├── liveSessions.ts           # Live session management
│   └── skillTaxonomy.ts          # Skill definitions (500+ skills)
└── docs/                         # Original planning documentation
```

## Question Bank

**Total: 59 Problems**

| Level | Count | Coverage |
|-------|-------|----------|
| M1 | 46 | Números, Álgebra, Geometría, Probabilidad |
| M2 | 13 | Advanced Algebra, Geometry, Statistics |

### Question Format

Each question includes:
- Plain text and LaTeX versions
- 4 multiple-choice options
- Detailed explanations with step-by-step solutions
- Difficulty rating (easy/medium/hard)
- Subject and topic classification
- Skills taxonomy tags
- Optional visual data for geometry problems

### Sample Question Structure

```typescript
{
  id: 'm1-1',
  level: 'M1',
  topic: 'Números y Proporcionalidad',
  subject: 'números',
  question: 'Si 3 obreros construyen un muro en 12 días, ¿cuántos días tardarán 4 obreros?',
  questionLatex: '\\text{Si 3 obreros construyen...}',
  options: ['8 días', '9 días', '10 días', '16 días'],
  correctAnswer: 1,
  explanation: 'Es una proporción inversa. Si aumentan los obreros, disminuyen los días.',
  explanationLatex: '3 \\times 12 = 4 \\times x \\text{, entonces } x = \\frac{36}{4} = 9',
  difficulty: 'easy',
  skills: ['numeros-proporcionalidad-inversa']
}
```

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/godiemp/math.git
cd math
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Set up backend**
```bash
cd backend
npm install
```

4. **Configure environment variables**

Create `.env` in the backend directory:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/paes_chile
JWT_SECRET=your-secret-key
PORT=3001
```

5. **Start the development servers**

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - Backend:
```bash
cd backend
npm run dev
```

6. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Usage

### For Students

1. **Register/Login** - Create an account on the landing page
2. **Choose Your Level** - Select M1 or M2 from the dashboard
3. **Practice** - Start a Zen Mode or Rapid Fire quiz
4. **Join Live Sessions** - Register for upcoming ensayos
5. **Track Progress** - View your statistics and improvement

### For Admins

1. **Access Admin Panel** - Navigate to `/admin` (requires admin role)
2. **Create Sessions** - Schedule new live practice ensayos
3. **Browse Problems** - View and filter the question bank
4. **Monitor Activity** - See registered users and participation

## Current Limitations

- **Question Bank Size**: Only 59 problems (PAES exams have 60-65 questions)
- **M2 Coverage**: Limited to 13 problems (needs expansion)
- **No Database for Problems**: Questions are hardcoded in TypeScript files
- **Progress Persistence**: User progress stored in localStorage (not cloud-synced)
- **No Adaptive Learning**: Quiz generation is random, not difficulty-adjusted
- **Admin Tools**: Read-only problem viewer (no CRUD operations)

## Future Improvements

### High Priority
- [ ] Migrate questions to PostgreSQL database
- [ ] Build admin CRUD interface for problem management
- [ ] Expand problem bank to 200+ questions
- [ ] Add cloud-based progress tracking
- [ ] Implement spaced repetition algorithm

### Medium Priority
- [ ] Add AI tutor module for personalized hints
- [ ] Implement step-by-step solution renderer
- [ ] Create problem difficulty calibration system
- [ ] Add detailed analytics dashboard
- [ ] Support for importing/exporting problems

### Low Priority
- [ ] Mobile app (React Native)
- [ ] Collaborative study rooms
- [ ] Gamification and achievements
- [ ] Video explanations for problems
- [ ] Practice test generator

## Documentation

For more detailed information, see:
- [Codebase Overview](./CODEBASE_OVERVIEW.md) - Detailed technical documentation
- [Backend Setup](./backend/README.md) - Backend-specific instructions
- [Original Architecture Docs](./docs/) - Initial planning documents

## Contributing

Contributions are welcome! Areas that need help:

1. **Content Creation** - Adding more PAES math problems
2. **Feature Development** - Building new features from the roadmap
3. **Testing** - Writing unit and integration tests
4. **Documentation** - Improving guides and tutorials

## License

TBD

## Contact

For questions or support, please open an issue on GitHub.

---

**Note**: This README reflects the current state of the application. The `/docs` folder contains original planning documents for a more ambitious modular architecture (Math Renderer, Calculator, AI Module) which has not yet been implemented. The current version focuses on a solid practice platform foundation.
