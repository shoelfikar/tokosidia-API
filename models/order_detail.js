'use strict';
module.exports = (sequelize, DataTypes) => {
  const order_detail = sequelize.define('order_detail', {
    user_id: DataTypes.STRING,
    product_id: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  order_detail.associate = function(models) {
    // associations can be defined here
  };
  return order_detail;
};