'use strict';
module.exports = (sequelize, DataTypes) => {
  const wishlist = sequelize.define('wishlist', {
    produk_id: DataTypes.STRING,
    user_id: DataTypes.STRING
  }, {});
  wishlist.associate = function(models) {
    // associations can be defined here
  };
  return wishlist;
};