"use strict";

const { User } = require("../models/index");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"Questions",
			[
				{
					userId: (
						await User.findOne({ where: { username: "goku" } })
					).id,
					title: "Mega Cough",
					textArea: "What's the best solution for a cough?",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					userId: (
						await User.findOne({ where: { username: "Luffy" } })
					).id,
					title: "Fatigue",
					textArea: "Should I be feeling tired all day?",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					userId: (await User.findOne({ where: { username: "ian" } }))
						.id,
					title: "Where did coronavirus come from",
					textArea: "Whence cometh coronavirus?",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					userId: (
						await User.findOne({ where: { username: "bryce" } })
					).id,
					title: "What can I do to keep from getting corona",
					textArea: "Will boardgames help?",
					createdAt: new Date(),
					updatedAt: new Date()
				},

				{
					userId: (
						await User.findOne({
							where: { username: "Peppermint Patty" }
						})
					).id,
					title: "The virus is scary",
					textArea:
						"When you get the virus, do you always have a chance of dying, or are some people okay?",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					userId: (
						await User.findOne({
							where: { username: "Tony Two Toes" }
						})
					).id,
					title: "It Started Where",
					textArea: "Where did coronavirus first get reported?",
					createdAt: new Date(),
					updatedAt: new Date()
				},

				{
					userId: (await User.findOne({ where: { username: "bob" } }))
						.id,
					title: "Children and masks",
					textArea: "Should children wear masks?",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					userId: (
						await User.findOne({ where: { username: "test" } })
					).id,
					title: "Hanging out with friends",
					textArea:
						"Can my child hang out with their friends during the pandemic?",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					userId: (
						await User.findOne({ where: { username: "awesome" } })
					).id,
					title: "COVID_19 at work",
					textArea: "How can I prepare for COVID-19 at work?",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					userId: (
						await User.findOne({ where: { username: "demo" } })
					).id,
					title: "Making my own sanitizer",
					textArea:
						"Should I make my own hand sanitizer if I can't find it in the stores?",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					userId: (
						await User.findOne({ where: { username: "saadwho" } })
					).id,
					title: "Getting tested",
					textArea: "Should I be tested for a current infection?",
					createdAt: new Date(),
					updatedAt: new Date()
				}
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("Questions", null, {});
	}
};
