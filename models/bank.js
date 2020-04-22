'use strict';
module.exports = (sequelize, DataTypes) => {
  const bank = sequelize.define('bank', {
    bank_name: DataTypes.STRING
  }, {});
  bank.associate = function(models) {
    // associations can be defined here
  };
  return bank;
};