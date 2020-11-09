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
      }, {
        username: "demo",
        password: await bcrypt.hash("supersecure", 10),
        email: "givemeajob@yourcompany.com",
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        username: "Peppermint Patty",
        password: await bcrypt.hash("patty", 10),
        email: "peppermint@patty.com",
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        username: "Tony Two Toes",
        password: await bcrypt.hash("tony", 10),
        email: "twotoes@tony.com",
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
