"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Attorney extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.Creditor)
        }
    }
    Attorney.init(
        {
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
            phone: DataTypes.STRING,
            idCardCopy: DataTypes.BOOLEAN,
        },
        {
            hooks: {
                beforeCreate: (instance) => {
                    if (!instance.idCardCopy) instance.idCardCopy = false
                }
            },
            sequelize,
            modelName: "Attorney",
        }
    )
    return Attorney
}
