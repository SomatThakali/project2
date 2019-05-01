"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: { type: DataTypes.STRING, validate: { notEmpty: true } },
      lastName: { type: DataTypes.STRING, validate: { notEmpty: true } },
      email: { type: DataTypes.STRING, validate: { isEmail: true } },
      password: { type: DataTypes.STRING, validate: { notEmpty: true } },
      street: { type: DataTypes.STRING, validate: { notEmpty: true } },
      city: { type: DataTypes.STRING, validate: { notEmpty: true } },
      state: { type: DataTypes.STRING, validate: { notEmpty: true } },
      zipcode: { type: DataTypes.INTEGER, validate: { notEmpty: true } }
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Item, {
      // foreignKey: "userId",
      onDelete: "cascade"
    });
  };
  return User;
};
