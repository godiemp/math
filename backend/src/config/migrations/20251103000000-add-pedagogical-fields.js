'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  async up(queryInterface, Sequelize) {
    const sql = fs.readFileSync(
      path.join(__dirname, '003_add_pedagogical_fields.sql'),
      'utf8'
    );
    await queryInterface.sequelize.query(sql);
  },

  async down(queryInterface, Sequelize) {
    // Recreate views without new pedagogical fields
    await queryInterface.sequelize.query('DROP VIEW IF EXISTS active_problems_view CASCADE');
    await queryInterface.sequelize.query('DROP VIEW IF EXISTS problem_stats_by_unit CASCADE');

    await queryInterface.sequelize.query(`
      CREATE VIEW active_problems_view AS
      SELECT
        ap.id as abstract_id,
        ap.essence,
        ap.level,
        ap.subject,
        ap.unit,
        ap.subsection,
        ap.difficulty,
        ap.difficulty_score,
        ap.primary_skills,
        ap.cognitive_level,
        cp.id as context_id,
        cp.context_type,
        cp.question,
        cp.options,
        cp.correct_answer,
        cp.quality_score,
        cp.avg_correctness,
        cp.times_used
      FROM abstract_problems ap
      LEFT JOIN context_problems cp ON ap.id = cp.abstract_problem_id
      WHERE ap.status = 'active' AND (cp.status = 'active' OR cp.status IS NULL)
    `);

    await queryInterface.sequelize.query(`
      CREATE VIEW problem_stats_by_unit AS
      SELECT
        level,
        subject,
        unit,
        subsection,
        difficulty,
        COUNT(DISTINCT ap.id) as abstract_count,
        COUNT(cp.id) as context_count,
        AVG(cp.avg_correctness) as avg_correctness,
        AVG(cp.quality_score) as avg_quality
      FROM abstract_problems ap
      LEFT JOIN context_problems cp ON ap.id = cp.abstract_problem_id
      WHERE ap.status = 'active'
      GROUP BY level, subject, unit, subsection, difficulty
      ORDER BY level, subject, unit, subsection, difficulty
    `);

    // Drop the pedagogical columns
    await queryInterface.sequelize.query('DROP INDEX IF EXISTS idx_abstract_problems_sequence');
    await queryInterface.removeColumn('abstract_problems', 'sequence_order');
    await queryInterface.removeColumn('abstract_problems', 'pedagogy_notes');
    await queryInterface.removeColumn('abstract_problems', 'prerequisite_sequence');
    await queryInterface.removeColumn('abstract_problems', 'generation_rules');
  }
};
