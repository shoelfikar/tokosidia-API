'use strict';
module.exports = (sequelize, DataTypes) => {
  const payment = sequelize.define('payment', {
    name: DataTypes.STRING
  }, {});
  payment.associate = function(models) {
    // associations can be defined here
  };
  return payment;
};