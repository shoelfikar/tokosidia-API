'use strict';
module.exports = (sequelize, DataTypes) => {
  const image = sequelize.define('imageDetail', {
    product_id: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  image.associate = function(models) {
    // associations can be defined here
  };
  return image;
};