"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "users",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        firstName: {
          type: Sequelize.STRING
        },
        lastName: {
          type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING
        },
        password: {
          type: Sequelize.STRING
        },
        created_at: {
          type: Sequelize.DATE(3),
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)")
        },
        updated_at: {
          type: Sequelize.DATE(3),
          defaultValue: Sequelize.literal(
            "CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)"
          )
        }
      },
      {
        paranoid: true
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  }
};
