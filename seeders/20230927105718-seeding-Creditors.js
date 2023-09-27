'use strict';
const seedToTable = require('../helper/seedToTable')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return seedToTable(queryInterface, "creditors.json", "Creditors")
    
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Creditors", null, {})
  }
};
