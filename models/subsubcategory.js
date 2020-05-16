'use strict';
module.exports = (sequelize, DataTypes) => {
  const subSubCategory = sequelize.define('subSubCategory', {
    sub_category_id: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  subSubCategory.associate = function(models) {
    // associations can be defined here
  };
  return subSubCategory;
};