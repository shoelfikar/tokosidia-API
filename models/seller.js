'use strict';
module.exports = (sequelize, DataTypes) => {
  const seller = sequelize.define('seller', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    desc: DataTypes.STRING,
    user_id: DataTypes.STRING
  }, {});
  seller.associate = function(models) {
    // associations can be defined here
    seller.belongsTo(models.product, {
      foreignKey: "id",
      as: "seller",
      sourceKey: "id"
    }),
    seller.belongsTo(models.user_id, {
      foreignKey: "id",
      as: "store",
      sourceKey: "id"
    })
  };
  return seller;
};