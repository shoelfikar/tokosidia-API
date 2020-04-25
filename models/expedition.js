'use strict';
module.exports = (sequelize, DataTypes) => {
  const expedition = sequelize.define('expedition', {
    time_id: DataTypes.STRING,
    expedition: DataTypes.STRING,
    price: DataTypes.STRING
  }, {});
  expedition.associate = function(models) {
    // associations can be defined here
  };
  return expedition;
};