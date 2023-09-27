"use strict"
const seedToTable = require('../helper/seedToTable')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return seedToTable(queryInterface, "attorneys.json", "Attorneys")
    },

    down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("Attorneys", null, {})
    },
}
