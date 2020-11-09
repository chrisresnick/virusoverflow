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
      },
      {
        questionId: (await Question.findOne({ where: { title: "The virus is scary" } })).id,
        userId: (await User.findOne({ where: { username: "Tony Two Toes" } })).id,
        textField: "Most people who catch the virus, will have minimum symptoms if any at all. But if you have a any underlining issues you may have more complications if you are infected.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: (await Question.findOne({ where: { title: "It Started Where" } })).id,
        userId: (await User.findOne({ where: { username: "Peppermint Patty" } })).id,
        textField: "In the city of Wuhan in China, I believe.",
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Answers', null, {});

  }
};
