'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trustee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Trustee.belongsTo(models.Admin)
      this.hasMany(models.Creditor)
      this.belongsTo(models.Admin)
      this.belongsTo(models.Profile)
    }
  }
  Trustee.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    AdminId: DataTypes.INTEGER,
    ProfileId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Trustee',
  });
  return Trustee;
};