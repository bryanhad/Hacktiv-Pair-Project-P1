"use strict"
const seedToTable = require('../helper/seedToTable')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return seedToTable(queryInterface, "blogs.json", "Blogs")
    },

    down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("Blogs", null, {})
    },
}
