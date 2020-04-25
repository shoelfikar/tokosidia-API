'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_id = sequelize.define('user_id', {
    email: DataTypes.STRING,
    fullname: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.STRING,
    image: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    address: DataTypes.STRING,
    role: DataTypes.STRING,
    seller_id: DataTypes.STRING,
    wishlist: DataTypes.STRING,
    bank_account: DataTypes.STRING,
    favorite_shop: DataTypes.STRING,
    history: DataTypes.STRING
  }, {});
  user_id.associate = function(models) {
    // associations can be defined here
    user_id.belongsTo(models.product, {
      foreignKey: "id",
      as: "users",
      sourceKey: "id"
    }),
    user_id.belongsTo(models.seller, {
      foreignKey: "seller_id",
      as: "store",
      sourceKey: "id"
    }),
    user_id.hasMany(models.bank_account, {
      foreignKey: "user_id",
      as: "account",
      sourceKey: "id"
    }),
    user_id.belongsTo(models.role_id, {
      foreignKey: "role",
      as: "user_role",
      sourceKey: "id"
    }),
    user_id.hasMany(models.favorit_shop, {
      foreignKey: "user_id",
      as: "favorit",
      sourceKey: "id"
    }),
    user_id.hasMany(models.address, {
      foreignKey: "user_id",
      as: "addresses",
      sourceKey: "id"
    }),
    user_id.hasMany(models.wishlist, {
      foreignKey: "user_id",
      as: "userWish",
      sourceKey: "id"
    })
  };
  return user_id;
};