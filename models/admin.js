"use strict"
const { Model } = require("sequelize")
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    class Admin extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Admin.init(
        {
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
        },
        {
            hooks : {
                beforeCreate: (instance) => {
                    const salt = bcrypt.genSaltSync(8)
                    const hashedPassword = bcrypt.hashSync(instance.password, salt)
                    instance.password = hashedPassword
                }
            },
            sequelize,
            modelName: "Admin",
        }
    )
    return Admin
}
