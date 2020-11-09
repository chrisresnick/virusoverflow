'use strict';

const { User } = require("../models/index");

module.exports = {
  up: async (queryInterface, Sequelize) => {


    await queryInterface.bulkInsert('Questions', [
      {
        userId: (await User.findOne({ where: { username: "bob" } })).id,
        title: "Test",
        textArea: "Non et excepteur esse ea dolore et esse.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: (await User.findOne({ where: { username: "test" } })).id,
        title: "Test2",
        textArea: "Dolore voluptate irure non consequat sint nostrud elit magna ut adipisicing do ea veniam ea. et excepteur esse ea dolore et esse.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: (await User.findOne({ where: { username: "test" } })).id,
        title: "Test3",
        textArea: "Mollit pariatur ipsum magna eu duis commodo..",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: (await User.findOne({ where: { username: "Peppermint Patty" } })).id,
        title: "The virus is scary",
        textArea: "When you get the virus, do you always have a chance of dying, or are some people okay?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: (await User.findOne({ where: { username: "Tony Two Toes" } })).id,
        title: "It Started Where",
        textArea: "Where did coronavirus first get reported?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Questions', null, {});

  }
};
