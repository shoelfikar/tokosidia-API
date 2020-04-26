'use strict';
module.exports = (sequelize, DataTypes) => {
  const seller = sequelize.define('seller', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    desc: DataTypes.STRING,
    user_id: DataTypes.STRING,
    link_seller: DataTypes.STRING,
  }, {});
  seller.associate = function(models) {
    // associations can be defined here
    seller.hasMany(models.product, {
      foreignKey: "seller_id",
      as: "myProduct",
      sourceKey: "id"
    }),
    seller.hasMany(models.user_id, {
      foreignKey: "id",
      as: "store",
      sourceKey: "user_id"
    }),
    seller.belongsTo(models.favorit_shop, {
      foreignKey: "id",
      as: "seller_fav",
      sourceKey: "id"
    })
    // seller.hasOne(models.user_id, {
    //   foreignKey: "id",
    //   as: "pemilik",
      // sourceKey: "user_id"
    // })
  };
  return seller;
};