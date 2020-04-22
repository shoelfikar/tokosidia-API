'use strict';
module.exports = (sequelize, DataTypes) => {
  const address = sequelize.define('address', {
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING,
    user_id: DataTypes.STRING
  }, {});
  address.associate = function(models) {
    // associations can be defined here
  };
  return address;
};