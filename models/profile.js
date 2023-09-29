"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Profile extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasOne(models.Trustee)
        }
    }
    Profile.init(
        {
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        msg: 'Please fill first name input'
                    },
                    notEmpty: {
                        args: true, 
                        msg: 'Please fill first name input'
                    }
                }
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        msg: 'Please fill last name input'
                    },
                    notEmpty: {
                        args: true, 
                        msg: 'Please fill last name input'
                    }
                }
            },
            imageUrl: DataTypes.STRING,
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        msg: 'Please fill phone number input'
                    },
                    notEmpty: {
                        args: true, 
                        msg: 'Please fill phone number input'
                    }
                }
            },
            domicile: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        msg: 'Please fill domicile input'
                    },
                    notEmpty: {
                        args: true, 
                        msg: 'Please fill domicile input'
                    }
                }
            },
        },
        {
            hooks: {
                beforeCreate: (instance) => {
                    const DEFAULT_PROFILE_PICTURE = `https://source.boringavatars.com/beam/40/${instance.firstName}`
                    instance.imageUrl = DEFAULT_PROFILE_PICTURE
                }
            },
            sequelize,
            modelName: "Profile",
        }
    )
    return Profile
}
