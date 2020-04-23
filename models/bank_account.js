'use strict';
module.exports = (sequelize, DataTypes) => {
  const bank_account = sequelize.define('bank_account', {
    bank_id: DataTypes.STRING,
    acoount_number: DataTypes.STRING
  }, {});
  bank_account.associate = function(models) {
    // associations can be defined here
    bank_account.belongsTo(models.bank, {
      foreignKey: "id",
    })
  };
  return bank_account;
};