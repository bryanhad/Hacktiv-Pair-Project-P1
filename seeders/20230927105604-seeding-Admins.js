"use strict"
const seedToTable = require('../helper/seedToTable')
const fs = require("fs")
const path = require("path")
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {

        const rawData = fs.readFileSync(path.join(process.cwd(), "data", "admins.json"))
        const parsedData = JSON.parse(rawData)


        const processedData = parsedData.map(({password, ...data}) => {
            const salt = bcrypt.genSaltSync(8)
            const hashedPassword = bcrypt.hashSync(password, salt)
            return {
                password: hashedPassword,
                ...data,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
    })

    return queryInterface.bulkInsert('Admins', processedData);
    },

    down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Admins', null, {});
    },
}
