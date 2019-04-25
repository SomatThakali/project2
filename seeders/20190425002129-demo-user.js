"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Somat",
          lastName: "Thakali",
          email: "demo@demo.com",
          password: "test1"
        },
        {
          firstName: "aman",
          lastName: "Gurung",
          email: "test@test.com",
          password: "test2"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
