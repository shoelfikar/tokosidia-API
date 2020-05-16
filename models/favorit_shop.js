'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorit_shop = sequelize.define('favorit_shop', {
    user_id: DataTypes.STRING,
    seller_id: DataTypes.STRING
  }, {});
  favorit_shop.associate = function(models) {
    // associations can be defined here
    favorit_shop.hasMany(models.user_id, {
      foreignKey: "id",
      as: "favorit",
      sourceKey: "user_id"
    }),
    favorit_shop.belongsTo(models.seller, {
      foreignKey: "id",
      as: "seller_fav",
      sourceKey: "seller_id"
    });
  };
  return favorit_shop;
};