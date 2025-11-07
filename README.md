# PAES Math Learning App

A modular, AI-powered math learning platform for Chilean students preparing for the PAES (Prueba de Acceso a la Educación Superior) exam.

## Overview

This app uses a **modular architecture** with three core independent modules:

1. **Math Renderer** - Displays mathematical expressions, graphs, and diagrams
2. **Calculator** - Solves problems, validates answers, provides step-by-step solutions
3. **AI Module** - Intelligent tutoring that orchestrates the calculator as a tool

Each module can be developed, tested, and deployed independently.

## Architecture

```
┌─────────────────────────────────────────┐
│           Frontend (React/Vue)          │
└────────────┬──────────────┬─────────────┘
             │              │
             ▼              ▼
    ┌──────────────┐  ┌──────────────┐
    │ Math Renderer│  │  AI Module   │
    │              │  │ (Orchestrator)│
    └──────────────┘  │              │
                      │   calls ↓    │
                      │              │
                      │ ┌──────────┐ │
                      └►│Calculator│◄┘
                        └──────────┘
```

**Key Design**: The AI module uses the Calculator as a tool (via function calling), allowing it to solve math problems and explain the solutions in a pedagogical way.

## Documentation

### 📚 Getting Started

- **[Architecture Overview](docs/architecture/overview.md)** - High-level system design
- **[PAES Curriculum Scope](docs/content/paes-curriculum-scope.md)** - Exact topics we need to cover

### 🧩 Module Documentation

Each module has detailed documentation for independent development:

- **[Math Renderer Module](docs/modules/math-renderer/README.md)**
  - Display LaTeX expressions (KaTeX/MathJax)
  - Interactive graphs and visualizations
  - Math input components

- **[Calculator Module](docs/modules/calculator/README.md)**
  - Solve equations (linear, quadratic, systems)
  - Algebraic manipulations (simplify, expand, factor)
  - Geometry calculations
  - Statistics and probability
  - Step-by-step solutions

- **[AI Module](docs/modules/ai-module/README.md)**
  - Chat-based tutoring interface
  - Calls Calculator as a tool (GPT-4/Claude function calling)
  - Hint generation
  - Adaptive learning

## PAES Content Coverage

The app covers all 4 PAES math areas:

1. **Números** (Numbers) - Fractions, percentages, powers, roots, divisibility
2. **Álgebra y Funciones** (Algebra & Functions) - Equations, functions, systems
3. **Geometría** (Geometry) - Plane geometry, 3D solids, coordinate geometry
4. **Probabilidad y Estadística** (Probability & Statistics) - Data analysis, probability, combinatorics

See [PAES Curriculum Scope](docs/content/paes-curriculum-scope.md) for detailed topic breakdown.

## Development Approach

### Modular Development

Work on different modules simultaneously:

```bash
# Developer 1: Math Renderer
cd packages/math-renderer
npm run dev

# Developer 2: Calculator
cd packages/calculator
npm run dev

# Developer 3: AI Module
cd packages/ai-module
npm run dev
```

### Development Priority

**Phase 1 (Weeks 1-2)**: Essential basics
- Basic arithmetic, fractions, percentages
- Linear equations
- Basic geometry (area, perimeter)

**Phase 2 (Weeks 3-4)**: Core PAES topics
- Quadratic equations
- Functions (linear, quadratic)
- Coordinate geometry

**Phase 3 (Weeks 5-6)**: Complete coverage
- 3D geometry
- Statistics and probability

**Phase 4 (Weeks 7+)**: Polish
- Full practice tests
- Advanced features

## Quick Start

```bash
# Clone the repository
git clone https://github.com/godiemp/math.git
cd math

# Install dependencies (once monorepo is set up)
npm install

# Start development
npm run dev
```

## Technology Stack (Proposed)

- **Frontend**: React/Next.js or Vue/Nuxt
- **Math Rendering**: KaTeX or MathJax
- **Calculator**: Math.js or SymPy (via API)
- **AI**: OpenAI GPT-4 or Anthropic Claude (function calling)
- **Backend**: Node.js or Python
- **Database**: PostgreSQL + Redis

## Contributing

Each module can be developed independently. See the module-specific documentation for setup and contribution guidelines.

## License

TBD

## Contact

TBD
