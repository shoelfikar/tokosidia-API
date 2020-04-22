'use strict';
module.exports = (sequelize, DataTypes) => {
  const role_id = sequelize.define('role_id', {
    role: DataTypes.STRING
  }, {});
  role_id.associate = function(models) {
    // associations can be defined here
  };
  return role_id;
};