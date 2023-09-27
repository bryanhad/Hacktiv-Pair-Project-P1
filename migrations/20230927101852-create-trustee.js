"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable("Trustees", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            username: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            AdminId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Admins',
                    key: 'id'
                }      
            },
            ProfileId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Profiles',
                    key: 'id'
                }           
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
    },
    down(queryInterface, Sequelize) {
        return queryInterface.dropTable("Trustees")
    },
}
