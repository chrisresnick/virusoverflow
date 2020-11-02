'use strict';
const bcrypt = require("bcryptjs")
module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('Users', [
        {
        username: 'bob',
        password: await bcrypt.hash("password", 10),
        email: "bob@bob.com",
        createdAt: new Date(),
        updatedAt: new Date()

      }, {
        username: "test",
        password: await bcrypt.hash("password", 10),
        email: "test@test.com",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
