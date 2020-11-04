'use strict';

const { User } = require("../models/index");

module.exports = {
  up: async (queryInterface, Sequelize) => {


    await queryInterface.bulkInsert('Questions', [
      {
        userId: (await User.findOne({ where: { username: "bob" }})).id,
        title: "Test",
        textArea: "Non et excepteur esse ea dolore et esse.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: (await User.findOne({ where: { username: "test" }})).id,
        title: "Test2",
        textArea: "Dolore voluptate irure non consequat sint nostrud elit magna ut adipisicing do ea veniam ea. et excepteur esse ea dolore et esse.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: (await User.findOne({ where: { username: "test" }})).id,
        title: "Test3",
        textArea: "Mollit pariatur ipsum magna eu duis commodo..",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {

      await queryInterface.bulkDelete('Questions', null, {});

  }
};
