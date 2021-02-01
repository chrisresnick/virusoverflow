"use strict";

const { Question, User } = require("../models/index");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		// await queryInterface.bulkInsert("Answers", [
		// 	{
		// 		questionId: (
		// 			await Question.findOne({ where: { title: "Mega Cough" } })
		// 		).id,
		// 		userId: (await User.findOne({ where: { username: "goku" } }))
		// 			.id,
		// 		textField: "I hear using lemon water helps!",
		// 		createdAt: new Date(),
		// 		updatedAt: new Date(),
		// 	},
		// ]);
	},

	down: async (queryInterface, Sequelize) => {
		// await queryInterface.bulkDelete("Answers", null, {});
	},
};
