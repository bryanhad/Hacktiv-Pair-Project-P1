'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Creditor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Creditor.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    domicile: DataTypes.STRING,
    phone: DataTypes.STRING,
    AttourneyId: DataTypes.INTEGER,
    claimType: DataTypes.STRING,
    spt: DataTypes.BOOLEAN,
    idCardCopy: DataTypes.BOOLEAN,
    powerOfAttorney: DataTypes.BOOLEAN,
    TrusteeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Creditor',
  });
  return Creditor;
};