"use strict"
const seedToTable = require('../helper/seedToTable')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return seedToTable(queryInterface, "trustees.json", "Trustees")
    },

    down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("Trustees", null, {})
    },
}
