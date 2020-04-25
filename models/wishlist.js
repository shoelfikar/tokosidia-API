'use strict';
module.exports = (sequelize, DataTypes) => {
  const wishlist = sequelize.define('wishlist', {
    produk_id: DataTypes.STRING,
    user_id: DataTypes.STRING
  }, {});
  wishlist.associate = function(models) {
    // associations can be defined here
    wishlist.belongsTo(models.user_id, {
      foreignKey: "id",
      as: "userWish",
      sourceKey: "user_id"
    }),
    wishlist.hasMany(models.product, {
      foreignKey: "id",
      as: "Produk-name",
      sourceKey: "produk_id"
    })
  };
  return wishlist;
};