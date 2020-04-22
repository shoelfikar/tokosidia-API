'use strict';
module.exports = (sequelize, DataTypes) => {
  const subCategory = sequelize.define('subCategory', {
    category_id: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  subCategory.associate = function(models) {
    // associations can be defined here
  };
  return subCategory;
};