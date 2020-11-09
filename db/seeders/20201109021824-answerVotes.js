"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 */
		await queryInterface.bulkInsert(
			"AnswerVotes",
			[
				{
					name: "John Doe",
					isBetaMember: false,
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 */
		await queryInterface.bulkDelete("AnswerVotes", null, {});
	},
};
