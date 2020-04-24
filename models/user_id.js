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
    });
  };
  return user_id;
};