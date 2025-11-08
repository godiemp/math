/**
 * Example Usage of the Enhanced Skills Array
 *
 * This file demonstrates how to use the skillsArray and its utility functions
 * in your curriculum and teaching applications.
 */

import {
  skillsArray,
  getEnhancedSkillsByTopic,
  getEnhancedSkillsByLevel,
  getCoreSkills,
  getSkillsByCompetency,
  getSkillLearningPath,
  getSkillsByTopicSorted,
  getSkillsSummary,
  type EnhancedSkill,
  type Competency
} from './skillsArray';

// ============================================================================
// EXAMPLE 1: Get all skills and display their metadata
// ============================================================================
console.log('📚 Total Skills Available:', skillsArray.length);
console.log('\nFirst 3 skills:');
skillsArray.slice(0, 3).forEach(skill => {
  console.log(`
  ${skill.name} (${skill.id})
  - Topic: ${skill.topic}
  - Level: ${skill.level}
  - Questions: ${skill.questionCount} total (M1: ${skill.m1QuestionCount}, M2: ${skill.m2QuestionCount})
  - Difficulty: ${skill.averageDifficulty.toFixed(2)} (Easy: ${skill.easyCount}, Med: ${skill.mediumCount}, Hard: ${skill.hardCount})
  - Competencies: ${skill.competencies.join(', ')}
  - Is Core: ${skill.isCore ? 'Yes' : 'No'}
  `);
});

// ============================================================================
// EXAMPLE 2: Get skills by topic
// ============================================================================
const algebraSkills = getEnhancedSkillsByTopic('álgebra');
console.log(`\n📐 Algebra Skills: ${algebraSkills.length}`);
algebraSkills.slice(0, 5).forEach(skill => {
  console.log(`  - ${skill.name}: ${skill.questionCount} questions`);
});

// ============================================================================
// EXAMPLE 3: Get core/fundamental skills
// ============================================================================
const coreSkills = getCoreSkills();
console.log(`\n⭐ Core Skills (${coreSkills.length}):`);
coreSkills.forEach(skill => {
  console.log(`  - ${skill.name} (${skill.questionCount} questions)`);
});

// ============================================================================
// EXAMPLE 4: Get skills by competency
// ============================================================================
const modelarSkills = getSkillsByCompetency('Modelar');
console.log(`\n🎯 Skills for "Modelar" competency: ${modelarSkills.length}`);
modelarSkills.slice(0, 5).forEach(skill => {
  console.log(`  - ${skill.name}`);
});

// ============================================================================
// EXAMPLE 5: Get learning path for a skill
// ============================================================================
const learningPath = getSkillLearningPath('algebra-ecuaciones-cuadraticas');
console.log('\n📖 Learning path for "Ecuaciones cuadráticas":');
learningPath.forEach((skill, index) => {
  console.log(`  ${index + 1}. ${skill.name}`);
});

// ============================================================================
// EXAMPLE 6: Get skills grouped by topic and sorted
// ============================================================================
const skillsByTopic = getSkillsByTopicSorted();
console.log('\n📊 Skills by Topic (sorted by difficulty):');
Object.entries(skillsByTopic).forEach(([topic, skills]) => {
  console.log(`\n${topic.toUpperCase()}:`);
  skills.slice(0, 3).forEach(skill => {
    console.log(`  - ${skill.name} (difficulty: ${skill.averageDifficulty.toFixed(2)})`);
  });
});

// ============================================================================
// EXAMPLE 7: Get summary statistics
// ============================================================================
const summary = getSkillsSummary();
console.log('\n📈 Summary Statistics:');
console.log(JSON.stringify(summary, null, 2));

// ============================================================================
// EXAMPLE 8: Find skills with prerequisites
// ============================================================================
console.log('\n🔗 Skills with prerequisites:');
skillsArray
  .filter(skill => skill.prerequisites.length > 0)
  .slice(0, 5)
  .forEach(skill => {
    console.log(`  ${skill.name}:`);
    skill.prerequisites.forEach(prereqId => {
      const prereq = skillsArray.find(s => s.id === prereqId);
      console.log(`    - Requires: ${prereq?.name || prereqId}`);
    });
  });

// ============================================================================
// EXAMPLE 9: Find skills with related skills
// ============================================================================
console.log('\n🤝 Skills commonly used together:');
skillsArray
  .filter(skill => skill.relatedSkills.length > 0)
  .slice(0, 3)
  .forEach(skill => {
    console.log(`  ${skill.name}:`);
    skill.relatedSkills.forEach(relatedId => {
      const related = skillsArray.find(s => s.id === relatedId);
      console.log(`    - Often with: ${related?.name || relatedId}`);
    });
  });

// ============================================================================
// EXAMPLE 10: Filter skills for M1 students with low difficulty
// ============================================================================
const easyM1Skills = skillsArray.filter(skill =>
  (skill.level === 'M1' || skill.level === 'Both') &&
  skill.averageDifficulty <= 1.5
);
console.log(`\n🎓 Easy M1 Skills (${easyM1Skills.length}):`);
easyM1Skills.slice(0, 5).forEach(skill => {
  console.log(`  - ${skill.name} (difficulty: ${skill.averageDifficulty.toFixed(2)})`);
});

// ============================================================================
// PRACTICAL USE CASE: Build a personalized curriculum
// ============================================================================
export function buildPersonalizedCurriculum(
  level: 'M1' | 'M2',
  topics: ('números' | 'álgebra' | 'geometría' | 'probabilidad')[],
  focusCompetencies?: Competency[]
): EnhancedSkill[] {
  let skills = skillsArray.filter(skill =>
    skill.level === level || skill.level === 'Both'
  );

  // Filter by topics
  if (topics.length > 0) {
    skills = skills.filter(skill => topics.includes(skill.topic));
  }

  // Filter by competencies if specified
  if (focusCompetencies && focusCompetencies.length > 0) {
    skills = skills.filter(skill =>
      skill.competencies.some(comp => focusCompetencies.includes(comp))
    );
  }

  // Sort by difficulty (easiest first)
  return skills.sort((a, b) => a.averageDifficulty - b.averageDifficulty);
}

// Example: Build curriculum for M1 student focusing on Números and Resolver
const m1NumerosCurriculum = buildPersonalizedCurriculum(
  'M1',
  ['números'],
  ['Resolver']
);
console.log(`\n🎯 Personalized M1 Números Curriculum (${m1NumerosCurriculum.length} skills):`);
m1NumerosCurriculum.slice(0, 5).forEach((skill, index) => {
  console.log(`  ${index + 1}. ${skill.name} - ${skill.questionCount} questions`);
});

// ============================================================================
// PRACTICAL USE CASE: Find skills that need more practice questions
// ============================================================================
export function findSkillsNeedingQuestions(minQuestions: number = 3): EnhancedSkill[] {
  return skillsArray
    .filter(skill => skill.questionCount < minQuestions)
    .sort((a, b) => a.questionCount - b.questionCount);
}

const needsQuestions = findSkillsNeedingQuestions();
console.log(`\n⚠️  Skills needing more questions (${needsQuestions.length}):`);
needsQuestions.slice(0, 5).forEach(skill => {
  console.log(`  - ${skill.name}: only ${skill.questionCount} questions`);
});
