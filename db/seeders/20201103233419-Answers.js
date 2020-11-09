'use strict';

const { Question, User } = require("../models/index");


module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Answers', [
      {
        questionId: (await Question.findOne({ where: { title: "What can I do to keep from getting corona" } })).id,
        userId: (await User.findOne({ where: { username: "bob" } })).id,
        textField: "No, but masks will.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: (await Question.findOne({ where: { title: "Where did coronavirus come from" } })).id,
        userId: (await User.findOne({ where: { username: "demo" } })).id,
        textField: "Borat",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        questionId: (await Question.findOne({ where: { title: "Where did coronavirus come from" } })).id,
        userId: (await User.findOne({ where: { username: "bryce" } })).id,
        textField: "Wuxan, China",
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
