'use strict';

const { User } = require("../models/index");

module.exports = {
  up: async (queryInterface, Sequelize) => {


    await queryInterface.bulkInsert('Questions', [
      {
        userId: (await User.findOne({ where: { username: "ian" }})).id,
        title: "Where did coronavirus come from",
        textArea: "Whence cometh coronavirus?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: (await User.findOne({ where: { username: "bryce" }})).id,
        title: "What can I do to keep from getting corona",
        textArea: "Will boardgames help?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {

      await queryInterface.bulkDelete('Questions', null, {});

  }
};
