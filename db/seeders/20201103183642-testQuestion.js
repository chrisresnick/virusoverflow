'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Questions', [{
       userId: 3,
       textArea: "blah blah blah",
       createdAt: new Date(),
       updatedAt: new Date()
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Questions', null, {});
  }
};
