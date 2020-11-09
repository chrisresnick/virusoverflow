"use strict";

const { Question, User } = require("../models/index");

module.exports = {
	
			
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Answers', [
  {
				questionId: (
					await Question.findOne({ where: { title: "Mega Cough" } })
				).id,
				userId: (await User.findOne({ where: { username: "goku" } }))
					.id,
				textField: "I hear using lemon water helps!",
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				questionId: (
					await Question.findOne({ where: { title: "Fatigue" } })
				).id,
				userId: (await User.findOne({ where: { username: "Luffy" } }))
					.id,
				textField: "Try exercising before taking any meds.",
				createdAt: new Date(),
				updatedAt: new Date()
			},
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


			{
				questionId: (
					await Question.findOne({
						where: {
							title: "What can I do to keep from getting corona"
						}
					})
				).id,
				userId: (await User.findOne({ where: { username: "bob" } })).id,
				textField: "No, but masks will.",
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				questionId: (
					await Question.findOne({
						where: { title: "Where did coronavirus come from" }
					})
				).id,
				userId: (await User.findOne({ where: { username: "demo" } }))
					.id,
				textField: "Borat",
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				questionId: (
					await Question.findOne({
						where: { title: "Where did coronavirus come from" }
					})
				).id,
				userId: (await User.findOne({ where: { username: "bryce" } }))
					.id,
				textField: "Wuxan, China",
				createdAt: new Date(),
				updatedAt: new Date()
			},

			{
				questionId: (
					await Question.findOne({
						where: { title: "The virus is scary" }
					})
				).id,
				userId: (
					await User.findOne({ where: { username: "Tony Two Toes" } })
				).id,
				textField:
					"Most people who catch the virus, will have minimum symptoms if any at all. But if you have a any underlying issues you may have more complications if you are infected.",
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				questionId: (
					await Question.findOne({
						where: { title: "It Started Where" }
					})
				).id,
				userId: (
					await User.findOne({
						where: { username: "Peppermint Patty" }
					})
				).id,
				textField: "In the city of Wuhan in China, I believe.",
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				questionId: (
					await Question.findOne({
						where: { title: "Children and masks" }
					})
				).id,
				userId: (await User.findOne({ where: { username: "bob" } })).id,
				textField:
					"In general, children 2 years and older should wear a mask. However, CDC recognizes that wearing masks may not be possible in every situation or for some people. Appropriate and consistent use of masks may be challenging for some children, such as children with certain disabilities, including cognitive, intellectual, developmental, sensory and behavioral disorders.",
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				questionId: (
					await Question.findOne({
						where: { title: "Hanging out with friends" }
					})
				).id,
				userId: (await User.findOne({ where: { username: "test" } }))
					.id,
				textField:
					"The more people your child interacts with, and the longer that interaction, the higher the risk of COVID-19 spread. While your child may spend time with other people when they return to childcare or school settings, reducing the number of people your child interacts with outside people within your household, childcare facility or school can reduce the risk of getting and spreading the virus that causes COVID-19. CDC recommends children 2 years of age and older wear a mask in public settings or when around people who do not live in their household, especially when it is difficult to stay at least 6 feet from others. However, masks should not be a substitute for other preventive measures such as frequent hand washing and staying at least 6 feet away from others.",
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				questionId: (
					await Question.findOne({
						where: { title: "Making my own sanitizer" }
					})
				).id,
				userId: (await User.findOne({ where: { username: "demo" } }))
					.id,
				textField:
					"CDC does not encourage the production and use of homemade hand sanitizer products because of concerns over the correct use of the ingredients and the need to work under sterile conditions to make the product. Local industries that are looking into producing hand sanitizer to fill in for commercial shortages can refer to the World Health Organization guidance. Organizations should revert to the use of commercially produced, FDA-approved product once such supplies again become available.",
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				questionId: (
					await Question.findOne({
						where: { title: "Getting tested" }
					})
				).id,
				userId: (await User.findOne({ where: { username: "saadwho" } }))
					.id,
				textField: `Maybe; not everyone needs to be tested for COVID-19.
					If you have symptoms of COVID-19 and want to get tested, call your healthcare provider first. Most people will have mild illness and can recover at home without medical care and may not need to be tested.
					CDC has guidance for who should be tested, but decisions about testing are made by state and local health departments and healthcare providers.
					You can also visit your state or local health department’s website to look for the latest local information on testing.`,
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);
	},

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Answers', null, {});

  }

};
