"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.addColumn("Blogs", "TrusteeId", {
            type: Sequelize.INTEGER,
            references: {
              model: 'Trustees',
              key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          })
    },

    down(queryInterface, Sequelize) {
        return queryInterface.removeColumn('Blogs', 'TrusteeId')
    },
}
