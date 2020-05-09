'use strict';
module.exports = (sequelize, DataTypes) => {
  const bank_account = sequelize.define('bank_account', {
    user_id: DataTypes.STRING,
    bank_id: DataTypes.STRING,
    account_number: DataTypes.STRING,
    account_name: DataTypes.STRING
  }, {});
  bank_account.associate = function(models) {
    // associations can be defined here
    bank_account.belongsTo(models.bank, {
      foreignKey: "bank_id",
      as:'bankName',
      sourceKey: "id"
    }),
    bank_account.hasMany(models.user_id, {
      foreignKey: "id",
      as:'account',
      sourceKey: "user_id"
    })
  };
  return bank_account;
};