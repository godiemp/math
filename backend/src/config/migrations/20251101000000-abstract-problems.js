'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  async up(queryInterface, Sequelize) {
    const sql = fs.readFileSync(
      path.join(__dirname, '001_abstract_problems.sql'),
      'utf8'
    );
    await queryInterface.sequelize.query(sql);
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order to handle foreign keys
    await queryInterface.sequelize.query('DROP TABLE IF EXISTS context_problems CASCADE');
    await queryInterface.sequelize.query('DROP TABLE IF EXISTS abstract_problems CASCADE');
    await queryInterface.sequelize.query('DROP VIEW IF EXISTS active_problems_view CASCADE');
    await queryInterface.sequelize.query('DROP VIEW IF EXISTS problem_stats_by_unit CASCADE');
  }
};
