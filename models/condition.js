'use strict';
module.exports = (sequelize, DataTypes) => {
  const condition = sequelize.define('condition', {
    product_id: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  condition.associate = function(models) {
    // associations can be defined here
  };
  return condition;
};