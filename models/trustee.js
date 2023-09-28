"use strict"
const { Model } = require("sequelize")
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    class Trustee extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Trustee.init(
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        msg: "Please fill username input",
                    },
                    notEmpty: {
                        args: true,
                        msg: "Please fill username input",
                    },
                    isCorrectLength(value) {
                        const MINIMUM_LENGTH = 5

                        if (value.length < MINIMUM_LENGTH) {
                            throw new Error(
                                "Username has to be 5 characters long"
                            )
                        }
                    },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        msg: "Please fill email input",
                    },
                    notEmpty: {
                        args: true,
                        msg: "Please fill email input",
                    },
                    isEmail: {
                        msg: "Please use a correct email format",
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        msg: "Please fill password input",
                    },
                    notEmpty: {
                        args: true,
                        msg: "Please fill password input",
                    },
                },
            },
            AdminId: DataTypes.INTEGER,
            ProfileId: DataTypes.INTEGER,
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
            modelName: "Trustee",
        }
    )
    return Trustee
}
