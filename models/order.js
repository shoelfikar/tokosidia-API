'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    user_id: DataTypes.STRING,
    order_detail: DataTypes.STRING,
    invoice: DataTypes.STRING,
    shipment: DataTypes.STRING,
    total: DataTypes.STRING,
    payment: DataTypes.STRING
  }, {});
  order.associate = function(models) {
    // associations can be defined here
  };
  return order;
};