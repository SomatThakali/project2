"use strict";
module.exports = (sequelize, DataTypes) => {
  const borrowItems = sequelize.define(
    "borrowItems",
    {
      name: DataTypes.STRING,
      category: DataTypes.STRING,
      description: DataTypes.STRING,
      borrow_days: DataTypes.INTEGER,
      isBorrowed: DataTypes.BOOLEAN
    },
    {}
  );
  borrowItems.associate = function(models) {
    borrowItems.belongsTo(models.User, {
      // foreignKey: {
      //   allowNull: false
      // }
      // UserId: {
      //   type: DataTypes.INTEGER,
      //   defaultValue: 1,
      //   references: "users", // <<< Note, its table's name, not object name
      //   referencesKey: "id" // <<< Note, its a column name
      // }
      //   foreignKey: "userId"
    });
  };
  return borrowItems;
};
