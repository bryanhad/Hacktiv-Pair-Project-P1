"use strict"
const seedToTable = require('../helper/seedToTable')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return seedToTable(queryInterface, 'admins.json', 'Admins')
    },

    down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Admins', null, {});
    },
}
