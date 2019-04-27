'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contacts = sequelize.define('Contacts', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    message: DataTypes.TEXT
  }, {});
  Contacts.associate = function(models) {
    // associations can be defined here
  };
  return Contacts;
};