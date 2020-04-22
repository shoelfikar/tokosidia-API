'use strict';
module.exports = (sequelize, DataTypes) => {
  const history = sequelize.define('history', {
    user_id: DataTypes.STRING,
    orderdetail_id: DataTypes.STRING,
    invoice: DataTypes.STRING,
    shipping: DataTypes.STRING,
    grand_total: DataTypes.INTEGER
  }, {});
  history.associate = function(models) {
    // associations can be defined here
  };
  return history;
};