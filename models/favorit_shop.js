'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorit_shop = sequelize.define('favorit_shop', {
    user_id: DataTypes.STRING,
    seller_id: DataTypes.STRING
  }, {});
  favorit_shop.associate = function(models) {
    // associations can be defined here
  };
  return favorit_shop;
};