'use strict';
module.exports = (sequelize, DataTypes) => {
  const Items = sequelize.define('Items', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    borrow_days: DataTypes.INTEGER,
    isBorrowed: DataTypes.BOOLEAN
  }, {});
  Items.associate = function(models) {
    // associations can be defined here
  };
  return Items;
};