# Skills Array Integration Guide

This guide shows you practical ways to integrate the **skills array** into your PAES curriculum application.

## 📋 Table of Contents

1. [Student Progress Tracking](#1-student-progress-tracking)
2. [Skill-Based Practice](#2-skill-based-practice)
3. [Curriculum Dashboard](#3-curriculum-dashboard)
4. [Adaptive Learning Recommendations](#4-adaptive-learning-recommendations)
5. [Skill Progress Visualization](#5-skill-progress-visualization)
6. [Personalized Study Plans](#6-personalized-study-plans)

---

## 1. Student Progress Tracking

### Add Skill Progress to User Profile

Track which skills students have mastered based on their quiz performance.

**Create: `/lib/skillProgress.ts`**

```typescript
import { QuestionAttempt } from './types';
import { skillsArray, EnhancedSkill } from './skillsArray';

export interface SkillProgress {
  skillId: string;
  totalAttempts: number;
  correctAttempts: number;
  proficiency: number; // 0-100 percentage
  lastPracticed: number; // timestamp
  level: 'beginner' | 'intermediate' | 'advanced' | 'mastered';
}

/**
 * Calculate skill progress from question attempts
 */
export function calculateSkillProgress(attempts: QuestionAttempt[]): Map<string, SkillProgress> {
  const skillStats = new Map<string, { correct: number; total: number; lastTime: number }>();

  // Analyze each attempt
  attempts.forEach(attempt => {
    // Get the question to find its skills
    const question = allQuestions.find(q => q.id === attempt.questionId);
    if (!question) return;

    // Update stats for each skill in the question
    question.skills.forEach(skillId => {
      const current = skillStats.get(skillId) || { correct: 0, total: 0, lastTime: 0 };
      current.total++;
      if (attempt.isCorrect) current.correct++;
      current.lastTime = Math.max(current.lastTime, attempt.timestamp);
      skillStats.set(skillId, current);
    });
  });

  // Convert to SkillProgress objects
  const progressMap = new Map<string, SkillProgress>();

  skillStats.forEach((stats, skillId) => {
    const proficiency = Math.round((stats.correct / stats.total) * 100);

    let level: 'beginner' | 'intermediate' | 'advanced' | 'mastered' = 'beginner';
    if (proficiency >= 90) level = 'mastered';
    else if (proficiency >= 70) level = 'advanced';
    else if (proficiency >= 50) level = 'intermediate';

    progressMap.set(skillId, {
      skillId,
      totalAttempts: stats.total,
      correctAttempts: stats.correct,
      proficiency,
      lastPracticed: stats.lastTime,
      level
    });
  });

  return progressMap;
}

/**
 * Get skills that need practice (low proficiency)
 */
export function getSkillsNeedingPractice(progress: Map<string, SkillProgress>): EnhancedSkill[] {
  return skillsArray.filter(skill => {
    const skillProgress = progress.get(skill.id);
    // Include if never practiced or proficiency < 70%
    return !skillProgress || skillProgress.proficiency < 70;
  });
}

/**
 * Get mastered skills
 */
export function getMasteredSkills(progress: Map<string, SkillProgress>): EnhancedSkill[] {
  return skillsArray.filter(skill => {
    const skillProgress = progress.get(skill.id);
    return skillProgress && skillProgress.level === 'mastered';
  });
}
```

### Update Quiz Component to Track Skills

**Modify: `/components/Quiz.tsx`**

```typescript
import { calculateSkillProgress } from '@/lib/skillProgress';

// After submitting quiz in handleSubmitQuiz()
const handleSubmitQuiz = () => {
  // ... existing code ...

  // Save skill progress
  const allAttempts = existingHistory ? JSON.parse(existingHistory).concat(attempts) : attempts;
  const skillProgress = calculateSkillProgress(allAttempts);

  // Save to localStorage
  localStorage.setItem(`skill-progress-${level}`, JSON.stringify(Array.from(skillProgress.entries())));

  setQuizSubmitted(true);
};
```

---

## 2. Skill-Based Practice

### Filter Practice Questions by Skill

Allow students to practice specific skills they're struggling with.

**Create: `/app/practice/skills/page.tsx`**

```tsx
'use client';

import { useState } from 'react';
import { skillsArray, getEnhancedSkillsByTopic, type EnhancedSkill } from '@/lib/skillsArray';
import { questions } from '@/lib/questions';
import Quiz from '@/components/Quiz';

export default function SkillPracticePage() {
  const [selectedSkill, setSelectedSkill] = useState<EnhancedSkill | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string>('números');

  const topicSkills = getEnhancedSkillsByTopic(selectedTopic as any);

  // Get questions for selected skill
  const skillQuestions = selectedSkill
    ? questions.filter(q => q.skills.includes(selectedSkill.id))
    : [];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Práctica por Habilidad</h1>

      {!selectedSkill ? (
        <>
          {/* Topic Selector */}
          <div className="flex gap-4 mb-6">
            {['números', 'álgebra', 'geometría', 'probabilidad'].map(topic => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-4 py-2 rounded ${
                  selectedTopic === topic ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {topic.charAt(0).toUpperCase() + topic.slice(1)}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topicSkills.map(skill => (
              <div
                key={skill.id}
                onClick={() => setSelectedSkill(skill)}
                className="border rounded-lg p-4 cursor-pointer hover:bg-blue-50 transition"
              >
                <h3 className="font-bold text-lg mb-2">{skill.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{skill.description}</p>

                <div className="flex gap-2 flex-wrap mb-2">
                  {skill.competencies.map(comp => (
                    <span key={comp} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                      {comp}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    📝 {skill.questionCount} preguntas
                  </span>
                  <span className={`font-semibold ${
                    skill.averageDifficulty < 1.5 ? 'text-green-600' :
                    skill.averageDifficulty < 2.5 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {skill.averageDifficulty < 1.5 ? 'Fácil' :
                     skill.averageDifficulty < 2.5 ? 'Medio' : 'Difícil'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Skill Practice */}
          <button
            onClick={() => setSelectedSkill(null)}
            className="mb-4 text-blue-500 hover:underline"
          >
            ← Volver a habilidades
          </button>

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{selectedSkill.name}</h2>
            <p className="text-gray-600">{selectedSkill.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              {skillQuestions.length} preguntas disponibles
            </p>
          </div>

          <Quiz
            questions={skillQuestions}
            level={selectedSkill.level === 'M2' ? 'M2' : 'M1'}
          />
        </>
      )}
    </div>
  );
}
```

---

## 3. Curriculum Dashboard

### Show Skill Coverage in Curriculum View

Display which skills are covered in each curriculum topic.

**Update: `/components/Curriculum.tsx`**

```tsx
import { skillsArray, getEnhancedSkillsByTopic } from '@/lib/skillsArray';

// Add to each topic in the curriculum
function CurriculumTopic({ topic, level }: { topic: any; level: 'M1' | 'M2' }) {
  // Get skills for this topic
  const topicSkills = getEnhancedSkillsByTopic(topic.name.toLowerCase())
    .filter(skill => skill.level === level || skill.level === 'Both');

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-bold mb-2">{topic.text}</h3>

      {/* Existing content */}

      {/* Add Skills Section */}
      <div className="mt-4">
        <p className="text-xs font-semibold text-gray-500 mb-2">Habilidades:</p>
        <div className="flex flex-wrap gap-2">
          {topicSkills.slice(0, 5).map(skill => (
            <span
              key={skill.id}
              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
              title={skill.description}
            >
              {skill.name}
            </span>
          ))}
          {topicSkills.length > 5 && (
            <span className="text-xs text-gray-500">
              +{topicSkills.length - 5} más
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

## 4. Adaptive Learning Recommendations

### Recommend Next Skills to Practice

**Create: `/lib/recommendations.ts`**

```typescript
import { EnhancedSkill, skillsArray, getSkillLearningPath } from './skillsArray';
import { SkillProgress } from './skillProgress';

export function getRecommendedSkills(
  progress: Map<string, SkillProgress>,
  level: 'M1' | 'M2',
  limit: number = 5
): EnhancedSkill[] {
  const recommendations: Array<{ skill: EnhancedSkill; priority: number }> = [];

  skillsArray.forEach(skill => {
    // Filter by level
    if (skill.level !== level && skill.level !== 'Both') return;

    const skillProgress = progress.get(skill.id);
    let priority = 0;

    // Priority 1: Never practiced core skills (highest priority)
    if (!skillProgress && skill.isCore) {
      priority = 100;
    }
    // Priority 2: Prerequisites not mastered
    else if (skillProgress && skillProgress.proficiency < 70) {
      priority = 80 - skillProgress.proficiency;
    }
    // Priority 3: Skills with prerequisites mastered
    else if (!skillProgress) {
      const prereqsMastered = skill.prerequisites.every(prereqId => {
        const prereqProgress = progress.get(prereqId);
        return prereqProgress && prereqProgress.proficiency >= 70;
      });

      if (prereqsMastered) {
        priority = 60;
      } else {
        priority = 40;
      }
    }

    if (priority > 0) {
      recommendations.push({ skill, priority });
    }
  });

  // Sort by priority and return top N
  return recommendations
    .sort((a, b) => b.priority - a.priority)
    .slice(0, limit)
    .map(r => r.skill);
}
```

### Add Recommendations to Dashboard

**Update: `/app/dashboard/page.tsx`**

```tsx
import { getRecommendedSkills } from '@/lib/recommendations';
import { calculateSkillProgress } from '@/lib/skillProgress';

function DashboardContent() {
  const [recommendedSkills, setRecommendedSkills] = useState<EnhancedSkill[]>([]);

  useEffect(() => {
    // Load skill progress
    const historyKey = `paes-history-M1`; // or M2
    const history = localStorage.getItem(historyKey);

    if (history) {
      const attempts = JSON.parse(history);
      const progress = calculateSkillProgress(attempts);
      const recommendations = getRecommendedSkills(progress, 'M1', 5);
      setRecommendedSkills(recommendations);
    }
  }, []);

  return (
    <div>
      {/* Existing dashboard content */}

      {/* Recommendations Section */}
      {recommendedSkills.length > 0 && (
        <Card className="p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">📚 Habilidades Recomendadas</h3>
          <p className="text-sm text-gray-600 mb-4">
            Basado en tu progreso, te recomendamos practicar:
          </p>
          <div className="space-y-2">
            {recommendedSkills.map(skill => (
              <Link
                key={skill.id}
                href={`/practice/skills?skill=${skill.id}`}
                className="block p-3 border rounded hover:bg-gray-50 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{skill.name}</p>
                    <p className="text-sm text-gray-500">{skill.description}</p>
                  </div>
                  <span className="text-blue-500">→</span>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
```

---

## 5. Skill Progress Visualization

### Create a Skills Progress Page

**Create: `/app/progress/page.tsx`**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { skillsArray, getEnhancedSkillsByTopic } from '@/lib/skillsArray';
import { calculateSkillProgress, type SkillProgress } from '@/lib/skillProgress';

export default function ProgressPage() {
  const [progress, setProgress] = useState<Map<string, SkillProgress>>(new Map());

  useEffect(() => {
    // Load progress from localStorage
    const history = localStorage.getItem('paes-history-M1');
    if (history) {
      const attempts = JSON.parse(history);
      setProgress(calculateSkillProgress(attempts));
    }
  }, []);

  const topics = ['números', 'álgebra', 'geometría', 'probabilidad'];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tu Progreso por Habilidad</h1>

      {topics.map(topic => {
        const topicSkills = getEnhancedSkillsByTopic(topic as any);
        const practiced = topicSkills.filter(s => progress.has(s.id));
        const mastered = practiced.filter(s => progress.get(s.id)!.level === 'mastered');

        return (
          <div key={topic} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 capitalize">{topic}</h2>

            {/* Topic Stats */}
            <div className="flex gap-4 mb-4 text-sm">
              <span>📊 {topicSkills.length} habilidades totales</span>
              <span>✅ {practiced.length} practicadas</span>
              <span>⭐ {mastered.length} dominadas</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${(mastered.length / topicSkills.length) * 100}%` }}
              />
            </div>

            {/* Skill List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {topicSkills.map(skill => {
                const skillProgress = progress.get(skill.id);

                return (
                  <div key={skill.id} className="border rounded p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">{skill.name}</p>
                        <p className="text-xs text-gray-500">{skill.description}</p>
                      </div>
                      {skillProgress && (
                        <span className={`text-xs px-2 py-1 rounded ${
                          skillProgress.level === 'mastered' ? 'bg-green-100 text-green-700' :
                          skillProgress.level === 'advanced' ? 'bg-blue-100 text-blue-700' :
                          skillProgress.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {skillProgress.proficiency}%
                        </span>
                      )}
                    </div>

                    {skillProgress ? (
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full"
                          style={{ width: `${skillProgress.proficiency}%` }}
                        />
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400">No practicada</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

---

## 6. Personalized Study Plans

### Generate a Study Plan Based on Skill Gaps

**Create: `/lib/studyPlan.ts`**

```typescript
import { EnhancedSkill, skillsArray, getSkillLearningPath } from './skillsArray';
import { SkillProgress } from './skillProgress';

export interface StudySession {
  day: number;
  skills: EnhancedSkill[];
  estimatedMinutes: number;
  focus: string;
}

export function generateStudyPlan(
  progress: Map<string, SkillProgress>,
  level: 'M1' | 'M2',
  daysUntilExam: number
): StudySession[] {
  const plan: StudySession[] = [];

  // Find skills that need work
  const skillsToStudy = skillsArray
    .filter(skill => {
      if (skill.level !== level && skill.level !== 'Both') return false;

      const skillProgress = progress.get(skill.id);
      return !skillProgress || skillProgress.proficiency < 80;
    })
    .sort((a, b) => {
      // Sort by: 1) Core skills first, 2) Prerequisites, 3) Difficulty
      if (a.isCore && !b.isCore) return -1;
      if (!a.isCore && b.isCore) return 1;
      return a.averageDifficulty - b.averageDifficulty;
    });

  // Distribute skills across available days
  const skillsPerDay = Math.ceil(skillsToStudy.length / daysUntilExam);

  for (let day = 0; day < daysUntilExam; day++) {
    const daySkills = skillsToStudy.slice(
      day * skillsPerDay,
      (day + 1) * skillsPerDay
    );

    if (daySkills.length === 0) break;

    plan.push({
      day: day + 1,
      skills: daySkills,
      estimatedMinutes: daySkills.length * 15, // 15 min per skill
      focus: daySkills[0].topic
    });
  }

  return plan;
}
```

---

## Quick Start Checklist

To integrate skills into your curriculum:

- [ ] **Step 1**: Add skill progress tracking to Quiz component
- [ ] **Step 2**: Create a skills practice page (`/app/practice/skills/page.tsx`)
- [ ] **Step 3**: Add skill badges to curriculum topics
- [ ] **Step 4**: Create progress dashboard (`/app/progress/page.tsx`)
- [ ] **Step 5**: Add recommendations to main dashboard
- [ ] **Step 6**: (Optional) Create study plan generator

## Next Steps

1. Start with **skill progress tracking** - this is the foundation
2. Add **skill-based practice** to let students focus on weak areas
3. Build **visualizations** to show progress
4. Implement **adaptive recommendations** for personalized learning

The skills array is now ready to power an intelligent, adaptive learning experience for your PAES students! 🚀
