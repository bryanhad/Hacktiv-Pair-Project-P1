"use strict"
const { Model } = require("sequelize")
const numberToIDR = require("../helper/numberToIDR")
module.exports = (sequelize, DataTypes) => {
    class Creditor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Attorney)
        }

        get fullName() {
            const fullName = `${this.firstName} ${this.lastName}`
            return fullName
        }

        get attorneyFullName() {
            const { firstName, lastName } = this.Attorney
            return `${firstName} ${lastName}`
        }

        get claimAmountIDR() {
            return numberToIDR(this.claimAmount)
        }
    }
    Creditor.init(
        {
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        msg: "Please fill first name input",
                    },
                    notEmpty: {
                        args: true,
                        msg: "Please fill first name input",
                    },
                },
            },
            lastName: DataTypes.STRING,
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
            domicile: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        msg: "Please fill domicile input",
                    },
                    notEmpty: {
                        args: true,
                        msg: "Please fill domicile input",
                    },
                },
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        msg: "Please fill phone number input",
                    },
                    notEmpty: {
                        args: true,
                        msg: "Please fill phone number input",
                    },
                },
            },
            AttorneyId: DataTypes.INTEGER,
            claimType: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        msg: "Please fill Creditor Type input",
                    },
                    notEmpty: {
                        args: true,
                        msg: "Please fill Creditor Type input",
                    },
                },
            },
            spt: DataTypes.BOOLEAN,
            idCardCopy: DataTypes.BOOLEAN,
            powerOfAttorney: DataTypes.BOOLEAN,
            TrusteeId: DataTypes.INTEGER,
            claimAmount: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        msg: "Please fill claim amount input",
                    },
                    notEmpty: {
                        args: true,
                        msg: "Please fill claim amount input",
                    },
                },
            },
        },
        {
            hooks: {
                beforeCreate: (instance) => {
                    instance.phone = instance.phone ? instance.phone : 0
                    instance.spt = instance.spt ? true : false
                    instance.idCardCopy = instance.idCardCopy ? true : false
                    instance.powerOfAttorney = instance.powerOfAttorney ? true : false
                }
            },
            sequelize,
            modelName: "Creditor",
        }
    )
    return Creditor
}
