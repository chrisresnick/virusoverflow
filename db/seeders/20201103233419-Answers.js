'use strict';

const { Question, User } = require("../models/index");


module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Answers', [
      {
        questionId: (await Question.findOne({ where: { title: "Test" } })).id,
        userId: (await User.findOne({ where: { username: "bob" } })).id,
        textField: "Duis eiusmod in velit officia.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: (await Question.findOne({ where: { title: "Test2" } })).id,
        userId: (await User.findOne({ where: { username: "bob" } })).id,
        textField: "Duis eiusmod in velit officia.",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        questionId: (await Question.findOne({ where: { title: "Mega Cough" } })).id,
        userId: (await User.findOne({ where: { username: "goku" } })).id,
        textField: "I hear using lemon water helps!",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        questionId: (await Question.findOne({ where: { title: "Fatigue" } })).id,
        userId: (await User.findOne({ where: { username: "Luffy" } })).id,
        textField: "Try exercising before taking any meds.",
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
