'use strict';
module.exports = (sequelize, DataTypes) => {
  const bank_account = sequelize.define('bank_account', {
    user_id: DataTypes.STRING,
    bank_id: DataTypes.STRING,
    account_number: DataTypes.STRING
  }, {});
  bank_account.associate = function(models) {
    // associations can be defined here
    bank_account.belongsTo(models.bank, {
      foreignKey: "id",
      as: 'bankName'
    })
  };
  return bank_account;
};