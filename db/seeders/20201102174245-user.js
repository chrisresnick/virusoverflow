"use strict";
const bcrypt = require("bcryptjs");
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"Users",
			[
				// {
				// 	username: "bob",
				// 	password: await bcrypt.hash("password", 10),
				// 	email: "bob@bob.com",
				// 	createdAt: new Date(),
				// 	updatedAt: new Date(),
				// },
				// {
				// 	username: "test",
				// 	password: await bcrypt.hash("password", 10),
				// 	email: "test@test.com",
				// 	createdAt: new Date(),
				// 	updatedAt: new Date(),
				// },
				// {
				// 	username: "demo",
				// 	password: await bcrypt.hash("supersecure", 10),
				// 	email: "givemeajob@yourcompany.com",
				// 	createdAt: new Date(),
				// 	updatedAt: new Date(),
				// },
				// {
				// 	username: "saadwho",
				// 	password: await bcrypt.hash("password", 10),
				// 	email: "saad@aol.com",
				// 	createdAt: new Date(),
				// 	updatedAt: new Date(),
				// },
				// {
				// 	username: "awesome",
				// 	password: await bcrypt.hash("password", 10),
				// 	email: "takejob@mycompany.com",
				// 	createdAt: new Date(),
				// 	updatedAt: new Date(),
				// },


    await queryInterface.bulkInsert('Users', [
      {
        username: 'bob',
        password: await bcrypt.hash("password", 10),
        email: "bob@bob.com",
        createdAt: new Date(),
        updatedAt: new Date()

      }, {
        username: "test",
        password: await bcrypt.hash("password", 10),
        email: "test@test.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },				{
					username: "goku",
					password: await bcrypt.hash("kamehameha", 10),
					email: "dragonball@Z.com",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					username: "Luffy",
					password: await bcrypt.hash("strawhat", 10),
					email: "one@piece.com",
					createdAt: new Date(),
					updatedAt: new Date(),
				},

				{
					username: "ian",
					password: await bcrypt.hash("password", 10),
					email: "ian@ian.com",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					username: "bryce",
					password: await bcrypt.hash("password", 10),
					email: "bryce@bryce.com",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
      {
        username: "demo",
        password: await bcrypt.hash("supersecure", 10),
        email: "givemeajob@yourcompany.com",
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

				{
					username: "Peppermint Patty",
					password: await bcrypt.hash("patty", 10),
					email: "peppermint@patty.com",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					username: "Tony Two Toes",
					password: await bcrypt.hash("tony", 10),
					email: "twotoes@tony.com",
					createdAt: new Date(),
					updatedAt: new Date(),
				},

				{
					username: "bob",
					password: await bcrypt.hash("password", 10),
					email: "bob@bob.com",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					username: "test",
					password: await bcrypt.hash("password", 10),
					email: "test@test.com",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					username: "demo",
					password: await bcrypt.hash("supersecure", 10),
					email: "givemeajob@yourcompany.com",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					username: "saadwho",
					password: await bcrypt.hash("password", 10),
					email: "givemejob@yourcompany.com",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					username: "awesome",
					password: await bcrypt.hash("password", 10),
					email: "takejob@mycompany.com",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("Users", null, {});
	},
};
