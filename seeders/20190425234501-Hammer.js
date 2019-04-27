'use strict';

module.exports = {
  up: (queryInterface, DATETIME, Sequelize) => {
    return queryInterface.bulkInsert('Items', 
    [{
      name: 'hammer',
      category: 'Tools',
      description: 'Hammer in good condition',
      borrow_days: 3,
      isBorrowed: false,
      created_at: Sequelize.literal("CURRENT_TIMESTAMP(3)"),
      update_at: Sequelize.literal("CURRENT_TIMESTAMP(3)")
    },
    {
      name: 'skrewdriver',
      category: 'Tools',
      description: 'In greatcondition',
      borrow_days: 7,
      isBorrowed: false,
      // created_at: Sequelize.literal("CURRENT_TIMESTAMP(3)"),
      // update_at: Sequelize.literal("CURRENT_TIMESTAMP(3)")
    },
    {
      name: 'hammer',
      category: 'Tools',
      description: 'Hammer in good condition',
      borrow_days: 3,
      isBorrowed: false,
      // created_at: Sequelize.literal("CURRENT_TIMESTAMP(3)"),
      // update_at: Sequelize.literal("CURRENT_TIMESTAMP(3)")
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Items', null, {});
  }
};


///npx sequelize db:seed:all