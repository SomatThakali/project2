'use strict';

module.exports = {
  up: (queryInterface, DATETIME, Sequelize) => {
    return queryInterface.bulkInsert('Items', [{
      name: 'hammer',
      category: 'Tools',
      description: 'Hammer in good condition',
      borrow_days: 3,
      isBorrowed: false,
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Items', null, {});
  }
};


///npx sequelize db:seed:all