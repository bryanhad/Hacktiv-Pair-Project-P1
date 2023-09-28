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
            // define association here
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
                    const DEFAULT_PROFILE_PICTURE = 'https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'
                    instance.imageUrl = DEFAULT_PROFILE_PICTURE
                }
            },
            sequelize,
            modelName: "Profile",
        }
    )
    return Profile
}
