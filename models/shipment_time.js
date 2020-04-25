'use strict';
module.exports = (sequelize, DataTypes) => {
  const shipment_time = sequelize.define('shipment_time', {
    name: DataTypes.STRING
  }, {});
  shipment_time.associate = function(models) {
    // associations can be defined here
  };
  return shipment_time;
};