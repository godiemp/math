'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  async up(queryInterface, Sequelize) {
    const sql = fs.readFileSync(
      path.join(__dirname, '005_user_level_system.sql'),
      'utf8'
    );
    await queryInterface.sequelize.query(sql);
  },

  async down(queryInterface, Sequelize) {
    // Revert the changes
    await queryInterface.sequelize.query(`
      -- Remove new columns
      ALTER TABLE paes_predictions DROP COLUMN IF EXISTS current_level;
      ALTER TABLE paes_predictions DROP COLUMN IF EXISTS score_min;
      ALTER TABLE paes_predictions DROP COLUMN IF EXISTS score_max;

      -- Restore original column name
      ALTER TABLE paes_predictions RENAME COLUMN user_initial_estimate TO user_prediction;

      -- Remove constraints
      ALTER TABLE paes_predictions DROP CONSTRAINT IF EXISTS check_score_min_range;
      ALTER TABLE paes_predictions DROP CONSTRAINT IF EXISTS check_score_max_range;
      ALTER TABLE paes_predictions DROP CONSTRAINT IF EXISTS check_score_interval_valid;
      ALTER TABLE paes_predictions DROP CONSTRAINT IF EXISTS check_current_level_valid;
      ALTER TABLE paes_predictions DROP CONSTRAINT IF EXISTS check_user_initial_estimate;

      -- Drop indexes
      DROP INDEX IF EXISTS idx_paes_predictions_current_level;
    `);
  }
};
