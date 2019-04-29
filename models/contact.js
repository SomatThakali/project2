"use strict";
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define("Contact", {
    messageCat: { type: DataTypes.STRING, validate: { notEmpty: true } },
    name: { type: DataTypes.STRING, validate: { notEmpty: true } },
    email: { type: DataTypes.STRING, validate: { isEmail: true } },
    message: { type: DataTypes.STRING, validate: { notEmpty: true } }
  });
  Contact.associate = function(models) {
    // associations can be defined here
  };
  return Contact;
};
