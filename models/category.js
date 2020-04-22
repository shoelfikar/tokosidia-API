'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    product_id: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  category.associate = function(models) {
    // associations can be defined here
  };
  return category;
};