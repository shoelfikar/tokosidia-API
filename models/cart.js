'use strict';
module.exports = (sequelize, DataTypes) => {
  const cart = sequelize.define('cart', {
    user_id: DataTypes.STRING,
    product_id: DataTypes.STRING,
    quantity: DataTypes.STRING
  }, {});
  cart.associate = function(models) {
    // associations can be defined here
  };
  return cart;
};