'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  async up(queryInterface, Sequelize) {
    const sql = fs.readFileSync(
      path.join(__dirname, '008_skill_tree.sql'),
      'utf8'
    );
    await queryInterface.sequelize.query(sql);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      -- Drop indexes first
      DROP INDEX IF EXISTS idx_skill_tree_progress_verified;
      DROP INDEX IF EXISTS idx_skill_tree_progress_user_id;

      -- Drop table
      DROP TABLE IF EXISTS skill_tree_progress;
    `);
  }
};
