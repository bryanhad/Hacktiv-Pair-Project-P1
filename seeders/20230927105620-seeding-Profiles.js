"use strict"
const seedToTable = require('../helper/seedToTable')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return seedToTable(queryInterface, "profiles.json", "Profiles")
    },

    down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("Profiles", null, {})
    },
}
