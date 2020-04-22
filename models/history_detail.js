'use strict';
module.exports = (sequelize, DataTypes) => {
  const history_detail = sequelize.define('history_detail', {
    user_id: DataTypes.STRING,
    produk_id: DataTypes.STRING,
    status_id: DataTypes.STRING
  }, {});
  history_detail.associate = function(models) {
    // associations can be defined here
  };
  return history_detail;
};