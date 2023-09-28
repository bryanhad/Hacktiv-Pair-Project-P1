"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable("Creditors", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            firstName: {
                type: Sequelize.STRING,
            },
            lastName: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            domicile: {
                type: Sequelize.STRING,
            },
            phone: {
                type: Sequelize.STRING,
            },
            AttorneyId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Attorneys",
                    key: "id",
                },
            },
            claimType: {
                type: Sequelize.STRING,
            },
            spt: {
                type: Sequelize.BOOLEAN,
            },
            idCardCopy: {
                type: Sequelize.BOOLEAN,
            },
            powerOfAttorney: {
                type: Sequelize.BOOLEAN,
            },
            claimAmount: {
                type: Sequelize.INTEGER,
            },
            TrusteeId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Trustees",
                    key: "id",
                },
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
        return queryInterface.dropTable("Creditors")
    },
}
